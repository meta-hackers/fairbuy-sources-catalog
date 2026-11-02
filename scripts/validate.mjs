import { readFileSync } from 'node:fs';

const ROLES = new Set(['seller', 'marketplace', 'spec', 'review', 'comparison']);
const VERTICALS = new Set(['computers', 'electronics', 'food_delivery', 'fashion', 'watches', 'home', 'sports', 'books', 'auto', 'general']);
const DOMAIN = /^(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,}$/;
const COUNTRY = /^[A-Z]{2}$/;
const ENTRY_KEYS = new Set(['domain', 'name', 'roles', 'verticals', 'countries', 'priority', 'note', 'enabled']);
const PAYLOAD_KEYS = new Set(['schemaVersion', 'updatedAt', 'entries']);
const errors = [];
const fail = (path, message) => errors.push(`${path}: ${message}`);
const isString = value => typeof value === 'string';
const isUnique = values => new Set(values).size === values.length;

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
if (!isString(payload.updatedAt) || Number.isNaN(Date.parse(payload.updatedAt))) fail('updatedAt', 'must be an ISO date string');
if (!Array.isArray(payload.entries)) fail('entries', 'must be an array');

const entries = Array.isArray(payload.entries) ? payload.entries : [];
if (!entries.length) fail('entries', 'must contain at least one source');
const seen = new Set();
entries.forEach((entry, index) => {
  const path = `entries[${index}]`;
  if (!entry || typeof entry !== 'object' || Array.isArray(entry)) { fail(path, 'must be an object'); return; }
  for (const key of Object.keys(entry)) if (!ENTRY_KEYS.has(key)) fail(path, `unknown key "${key}"`);
  if (!isString(entry.domain) || !DOMAIN.test(entry.domain)) fail(`${path}.domain`, 'must be a lowercase hostname such as shop.example.ch');
  else {
    if (seen.has(entry.domain)) fail(`${path}.domain`, `duplicate domain "${entry.domain}"`);
    seen.add(entry.domain);
  }
  if (!isString(entry.name) || entry.name.trim().length < 1 || entry.name.length > 120) fail(`${path}.name`, 'must be 1-120 characters');
  if (!Array.isArray(entry.roles) || !entry.roles.length || entry.roles.some(role => !ROLES.has(role)) || !isUnique(entry.roles)) {
    fail(`${path}.roles`, `must be a non-empty unique subset of ${[...ROLES].join(', ')}`);
  }
  if (!Array.isArray(entry.verticals) || !entry.verticals.length || entry.verticals.some(vertical => !VERTICALS.has(vertical)) || !isUnique(entry.verticals)) {
    fail(`${path}.verticals`, `must be a non-empty unique subset of ${[...VERTICALS].join(', ')}`);
  }
  if (entry.countries !== 'global') {
    if (!Array.isArray(entry.countries) || !entry.countries.length || entry.countries.length > 60
      || entry.countries.some(country => !isString(country) || !COUNTRY.test(country)) || !isUnique(entry.countries)) {
      fail(`${path}.countries`, 'must be "global" or a non-empty unique array of uppercase ISO two-letter codes');
    }
  }
  if (![1, 2, 3].includes(entry.priority)) fail(`${path}.priority`, 'must be 1, 2 or 3');
  if (entry.note !== undefined && (!isString(entry.note) || entry.note.length > 300)) fail(`${path}.note`, 'must be at most 300 characters');
  if (entry.enabled !== undefined && typeof entry.enabled !== 'boolean') fail(`${path}.enabled`, 'must be a boolean');
});

if (errors.length) {
  console.error(`sources.json has ${errors.length} validation error(s):`);
  for (const error of errors) console.error(`  - ${error}`);
  process.exit(1);
}

const count = predicate => entries.filter(predicate).length;
const countries = [...new Set(entries.flatMap(entry => entry.countries === 'global' ? [] : entry.countries))].sort();
console.log(`sources.json is valid: ${entries.length} entries`);
console.log(`  roles:     seller ${count(e => e.roles.includes('seller'))}, marketplace ${count(e => e.roles.includes('marketplace'))}, spec ${count(e => e.roles.includes('spec'))}, review ${count(e => e.roles.includes('review'))}, comparison ${count(e => e.roles.includes('comparison'))}`);
console.log(`  countries: ${countries.join(', ')} (plus global)`);
for (const vertical of VERTICALS) console.log(`  ${vertical.padEnd(14)} ${count(e => e.verticals.includes(vertical))}`);
