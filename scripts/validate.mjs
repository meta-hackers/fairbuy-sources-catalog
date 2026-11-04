import { readFileSync } from 'node:fs';

const ROLES = new Set(['seller', 'marketplace', 'spec', 'review', 'comparison']);
const ROLE_ORDER = ['seller', 'marketplace', 'spec', 'review', 'comparison'];
const CONTEXT_ROLES = new Set(['spec', 'review', 'comparison']);
const OFFER_ROLES = new Set(['seller', 'marketplace']);
const DOMAIN = /^(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,}$/;
const COUNTRY = /^[A-Z]{2}$/;
const COUNTRY_CODES = new Set(`
AD AE AF AG AI AL AM AO AQ AR AS AT AU AW AX AZ BA BB BD BE BF BG BH BI BJ BL BM BN BO BQ BR BS BT BV BW BY BZ
CA CC CD CF CG CH CI CK CL CM CN CO CR CU CV CW CX CY CZ DE DJ DK DM DO DZ EC EE EG EH ER ES ET FI FJ FK FM FO FR
GA GB GD GE GF GG GH GI GL GM GN GP GQ GR GS GT GU GW GY HK HM HN HR HT HU ID IE IL IM IN IO IQ IR IS IT JE JM JO JP
KE KG KH KI KM KN KP KR KW KY KZ LA LB LC LI LK LR LS LT LU LV LY MA MC MD ME MF MG MH MK ML MM MN MO MP MQ MR MS MT
MU MV MW MX MY MZ NA NC NE NF NG NI NL NO NP NR NU NZ OM PA PE PF PG PH PK PL PM PN PR PS PT PW PY QA RE RO RS RU RW
SA SB SC SD SE SG SH SI SJ SK SL SM SN SO SR SS ST SV SX SY SZ TC TD TF TG TH TJ TK TL TM TN TO TR TT TV TW TZ UA UG
UM US UY UZ VA VC VE VG VI VN VU WF WS YE YT ZA ZM ZW
`.trim().split(/\s+/));
const VERTICAL_KEY = /^[a-z][a-z0-9_]*$/;
const UPDATED_AT = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z$/;
const ENTRY_KEYS = new Set(['domain', 'name', 'roles', 'verticals', 'countries', 'priority', 'note', 'enabled']);
const PAYLOAD_KEYS = new Set(['schemaVersion', 'updatedAt', 'entries']);
const errors = [];
const fail = (path, message) => errors.push(`${path}: ${message}`);
const isString = value => typeof value === 'string';
const isUnique = values => new Set(values).size === values.length;
const isSorted = values => values.every((value, index) => index === 0 || values[index - 1] <= value);
const isRoleOrder = roles => roles.every((role, index) => index === 0 || ROLE_ORDER.indexOf(roles[index - 1]) <= ROLE_ORDER.indexOf(role));

let payload;
try {
  payload = JSON.parse(readFileSync(new URL('../sources.json', import.meta.url), 'utf8'));
} catch (error) {
  console.error('sources.json is missing or invalid JSON:', error instanceof Error ? error.message : error);
  process.exit(1);
}

if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
  console.error('sources.json must be an object.');
  process.exit(1);
}
for (const key of Object.keys(payload)) if (!PAYLOAD_KEYS.has(key)) fail('sources.json', `unknown key "${key}"`);
if (payload.schemaVersion !== 1) fail('schemaVersion', 'must be 1');
if (!isString(payload.updatedAt) || !UPDATED_AT.test(payload.updatedAt)) fail('updatedAt', 'must be an ISO 8601 UTC date-time such as 2026-11-04T00:00:00.000Z');
if (!Array.isArray(payload.entries)) fail('entries', 'must be an array');

const entries = Array.isArray(payload.entries) ? payload.entries : [];
if (!entries.length) fail('entries', 'must contain at least one source');
const seen = new Set();
let previousDomain = null;
entries.forEach((entry, index) => {
  const path = `entries[${index}]`;
  if (!entry || typeof entry !== 'object' || Array.isArray(entry)) { fail(path, 'must be an object'); return; }
  for (const key of Object.keys(entry)) if (!ENTRY_KEYS.has(key)) fail(path, `unknown key "${key}"`);
  if (!isString(entry.domain) || !DOMAIN.test(entry.domain)) fail(`${path}.domain`, 'must be a lowercase hostname such as shop.example.ch');
  else {
    if (previousDomain !== null && entry.domain < previousDomain) fail(path, 'entries must be sorted by domain');
    previousDomain = entry.domain;
    if (seen.has(entry.domain)) fail(`${path}.domain`, `duplicate domain "${entry.domain}"`);
    seen.add(entry.domain);
  }
  if (!isString(entry.name) || entry.name.trim().length < 1 || entry.name.length > 120) fail(`${path}.name`, 'must be 1-120 characters');
  else if (entry.name !== entry.name.trim()) fail(`${path}.name`, 'must not have leading or trailing whitespace');
  if (!Array.isArray(entry.roles) || !entry.roles.length || entry.roles.some(role => !ROLES.has(role)) || !isUnique(entry.roles)) {
    fail(`${path}.roles`, `must be a non-empty unique subset of ${[...ROLES].join(', ')}`);
  } else {
    if (!isRoleOrder(entry.roles)) fail(`${path}.roles`, `must follow the canonical order ${ROLE_ORDER.join(', ')}`);
    if (entry.roles.some(role => CONTEXT_ROLES.has(role)) && entry.roles.some(role => OFFER_ROLES.has(role))) {
      fail(`${path}.roles`, 'must not combine context-only roles with seller or marketplace');
    }
  }
  if (!Array.isArray(entry.verticals) || !entry.verticals.length || entry.verticals.length > 30
    || entry.verticals.some(vertical => !isString(vertical) || !VERTICAL_KEY.test(vertical) || vertical.length > 60)
    || !isUnique(entry.verticals)) {
    fail(`${path}.verticals`, 'must be a non-empty unique array of lowercase keys such as watches or home');
  } else if (!isSorted(entry.verticals)) {
    fail(`${path}.verticals`, 'must be sorted alphabetically');
  }
  if (entry.countries !== 'global') {
    if (!Array.isArray(entry.countries) || !entry.countries.length || entry.countries.length > 60
      || entry.countries.some(country => !isString(country) || !COUNTRY.test(country)) || !isUnique(entry.countries)) {
      fail(`${path}.countries`, 'must be "global" or a non-empty unique array of uppercase ISO two-letter codes');
    } else {
      if (!isSorted(entry.countries)) fail(`${path}.countries`, 'must be sorted alphabetically');
      for (const country of entry.countries) {
        if (!COUNTRY_CODES.has(country)) fail(`${path}.countries`, `unknown ISO 3166-1 alpha-2 code "${country}"`);
      }
    }
  }
  if (![1, 2, 3].includes(entry.priority)) fail(`${path}.priority`, 'must be 1, 2 or 3');
  if (entry.note !== undefined) {
    if (!isString(entry.note) || entry.note.length > 300 || !entry.note.trim().length) {
      fail(`${path}.note`, 'must be a non-empty string of at most 300 characters');
    } else if (entry.note !== entry.note.trim()) {
      fail(`${path}.note`, 'must not have leading or trailing whitespace');
    }
  }
  if (entry.enabled !== undefined && typeof entry.enabled !== 'boolean') fail(`${path}.enabled`, 'must be a boolean');
  if (entry.enabled === false && (!isString(entry.note) || !entry.note.trim().length)) {
    fail(`${path}.note`, 'is required when enabled is false');
  }
});

if (errors.length) {
  console.error(`sources.json has ${errors.length} validation error(s):`);
  for (const error of errors) console.error(`  - ${error}`);
  process.exit(1);
}

const count = predicate => entries.filter(predicate).length;
const countries = [...new Set(entries.flatMap(entry => entry.countries === 'global' ? [] : entry.countries))].sort();
console.log(`sources.json is valid: ${entries.length} entries`);
console.log(`  enabled:   ${count(e => e.enabled !== false)}, disabled ${count(e => e.enabled === false)}`);
console.log(`  roles:     seller ${count(e => e.roles.includes('seller'))}, marketplace ${count(e => e.roles.includes('marketplace'))}, spec ${count(e => e.roles.includes('spec'))}, review ${count(e => e.roles.includes('review'))}, comparison ${count(e => e.roles.includes('comparison'))}`);
console.log(`  countries: ${countries.join(', ')} (plus global)`);
const allVerticals = [...new Set(entries.flatMap(entry => entry.verticals))].sort();
for (const vertical of allVerticals) console.log(`  ${vertical.padEnd(14)} ${count(e => e.verticals.includes(vertical))}`);
