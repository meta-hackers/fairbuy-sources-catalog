import { readFileSync, writeFileSync } from 'node:fs';

const ROLE_ORDER = ['seller', 'marketplace', 'spec', 'review', 'comparison'];
const CATALOG_URL = new URL('../sources.json', import.meta.url);
const checkOnly = process.argv.includes('--check');

const source = readFileSync(CATALOG_URL, 'utf8');
const payload = JSON.parse(source);

const byDomain = (a, b) => (a.domain < b.domain ? -1 : a.domain > b.domain ? 1 : 0);
const byRole = (a, b) => ROLE_ORDER.indexOf(a) - ROLE_ORDER.indexOf(b);

const normalized = {
  ...payload,
  entries: [...payload.entries].sort(byDomain).map(entry => ({
    ...entry,
    roles: [...entry.roles].sort(byRole),
    verticals: [...entry.verticals].sort(),
    countries: entry.countries === 'global' ? 'global' : [...entry.countries].sort(),
  })),
};

const output = `${JSON.stringify(normalized, null, 2)}\n`;

if (checkOnly) {
  if (output !== source) {
    console.error('sources.json is not normalized. Run "node scripts/normalize.mjs" and review the diff.');
    process.exit(1);
  }
  console.log('sources.json is normalized.');
} else {
  if (output === source) {
    console.log('sources.json is already normalized.');
  } else {
    writeFileSync(CATALOG_URL, output);
    console.log('Normalized sources.json: sorted entries, roles, verticals and countries.');
  }
}
