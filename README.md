# FairBuy source catalog

The public source catalog used by [FairBuy](https://github.com/meta-hackers/fairbuy) discovery.

- **Published page:** https://meta-hackers.github.io/fairbuy-sources-catalog/
- **Machine-readable JSON:** https://meta-hackers.github.io/fairbuy-sources-catalog/sources.json
- **Repository:** https://github.com/meta-hackers/fairbuy-sources-catalog

The catalog is a static JSON file. FairBuy fetches it only when an admin clicks **Sync from GitHub** in the backoffice, validates every entry, and keeps the last-known-good catalog if the fetch fails. Discovery never fetches this page directly.

## Files

| File | Purpose |
|---|---|
| `sources.json` | Canonical catalog data. Edit this. |
| `index.html` | Public read-only table with filters. |
| `scripts/validate.mjs` | Dependency-free schema validation used by CI. |
| `schema/source-catalog.schema.json` | JSON Schema for editors and AI tools. |
| `.github/workflows/pages.yml` | Validates on push and deploys GitHub Pages. |

## Adding or changing a source

1. Edit `sources.json`.
2. Run `node scripts/validate.mjs` locally.
3. Open a pull request. CI must pass.
4. After merge, GitHub Pages publishes the new JSON.
5. In FairBuy, an admin opens **Backoffice → Sources → Sync from GitHub**.

Do not edit `index.html` when adding a source; it reads `sources.json` at runtime.

## JSON shape

```json
{
  "schemaVersion": 1,
  "updatedAt": "2026-11-02T00:00:00.000Z",
  "entries": [
    {
      "domain": "galaxus.ch",
      "name": "Galaxus",
      "roles": ["seller"],
      "verticals": ["computers", "electronics", "home"],
      "countries": ["CH"],
      "priority": 3
    }
  ]
}
```

- `domain`: lowercase hostname, no scheme or path. Subdomains are matched on dot boundaries.
- `name`: display name.
- `roles`: one or more of `seller`, `marketplace`, `spec`, `review`, `comparison`.
- `verticals`: one or more of `computers`, `electronics`, `food_delivery`, `fashion`, `home`, `sports`, `books`, `auto`, `general`.
- `countries`: `"global"` or an array of uppercase ISO two-letter codes.
- `priority`: `1` occasional, `2` secondary, `3` primary.
- `note`: optional internal note, max 300 characters.
- `enabled`: optional boolean; absent means enabled.

## Roles

| Role | Meaning | May support an offer? |
|---|---|---|
| `seller` | A shop that sells directly | Yes |
| `marketplace` | A marketplace or classifieds site | Yes |
| `spec` | Datasheet or specification database, e.g. Open Icecat | No: attributes only |
| `review` | Independent tests and reviews | No: context only |
| `comparison` | Price-comparison site | No: discovery/context only |

`spec`, `review` and `comparison` domains are rejected by FairBuy as offer URLs and price sources. A disabled entry keeps its role for that safety check but is not used as a discovery hint.

## Validation

```sh
node scripts/validate.mjs
```

The validator checks the envelope, required fields, allowed roles/verticals, country format, priority range, duplicate domains and unknown keys. Invalid data fails CI before Pages publishes it.

The FairBuy backend validates the same shape again on every sync. The catalog is public but the app does not execute its content.

## How FairBuy consumes it

- The app keeps a bundled fallback snapshot so it still works when GitHub is unavailable.
- On startup, it optionally fetches the published JSON in the background.
- An admin can trigger a manual sync from the backoffice.
- A successful sync replaces the in-memory catalog atomically. A failed fetch or invalid payload leaves the previous catalog in place and shows the error.
- Discovery reads the cached catalog; it never waits on GitHub.

## Notes

- GitHub Pages can serve a cached copy for a short time after a deploy. If a manual sync shows the previous version, wait for the Pages deployment and retry.
- The catalog is public. Do not put credentials, personal data or unpublished seller terms in it.
- For `food_delivery`, menus and fees are per restaurant and delivery address; these entries are hints only and do not solve basket-level comparison.
