# FairBuy source catalog

The public source catalog used by [FairBuy](https://github.com/meta-hackers/fairbuy) discovery.

- **Published page:** https://meta-hackers.github.io/fairbuy-sources-catalog/
- **Machine-readable JSON:** https://meta-hackers.github.io/fairbuy-sources-catalog/sources.json
- **JSON Schema:** https://meta-hackers.github.io/fairbuy-sources-catalog/schema/source-catalog.schema.json
- **Repository:** https://github.com/meta-hackers/fairbuy-sources-catalog

The catalog is a static JSON file. By default, FairBuy fetches it when an admin clicks **Sync from GitHub** in the backoffice. Deployments can also enable a background startup sync with `CATALOG_SYNC_ON_START=true`. Every sync validates the entries and preserves the last-known-good catalog on failure. Discovery never fetches this page directly.

## Files

| File | Purpose |
|---|---|
| `sources.json` | Canonical catalog data. Edit this. |
| `SOURCE_REVIEW.md` | Dated source-quality findings, evidence, and review checklist. |
| `index.html` | Public read-only table with filters. |
| `scripts/validate.mjs` | Dependency-free schema validation used by CI. |
| `scripts/normalize.mjs` | Sorts entries, roles, verticals and countries into canonical order. |
| `schema/source-catalog.schema.json` | JSON Schema for editors and AI tools. |
| `.github/workflows/pages.yml` | Validates on push and deploys GitHub Pages. |

## Adding or changing a source

1. Edit `sources.json`.
2. Run `node scripts/normalize.mjs` to apply canonical ordering.
3. Run `node scripts/validate.mjs` locally.
4. Open a pull request. CI must pass.
5. After merge, GitHub Pages publishes the new JSON.
6. In FairBuy, an admin opens **Backoffice → Sources → Sync from GitHub**.

Do not edit `index.html` when adding a source; it reads `sources.json` at runtime.

Before adding or re-enabling a discovery hint, verify a current product listing,
purchase path, country-specific hostname and shipping eligibility. Schema validity
does not establish source quality. See [the source review](SOURCE_REVIEW.md) for
evidence, known gaps and the review checklist. Disable closed or unsuitable hints
with an explanatory `note` instead of deleting their history.

## JSON shape

```json
{
  "schemaVersion": 1,
  "updatedAt": "2026-11-04T00:00:00.000Z",
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

- `domain`: lowercase hostname, no scheme or path. Subdomains are matched on dot boundaries. Entries are sorted by domain.
- `name`: display name, with no leading or trailing whitespace.
- `roles`: one or more of `seller`, `marketplace`, `spec`, `review`, `comparison`, in that canonical order. Do not combine `spec`, `review` or `comparison` with `seller` or `marketplace`.
- `verticals`: one or more lowercase keys, sorted alphabetically. Known values include `computers`, `electronics`, `food_delivery`, `groceries`, `fashion`, `watches`, `jewelry`, `eyewear`, `beauty`, `health`, `pets`, `toys_baby`, `home`, `sports`, `music`, `office`, `books`, `auto`, `general`. New keys are allowed and do not fail validation; FairBuy only uses a key its classifier can produce.
- `countries`: `"global"` or an array of uppercase ISO 3166-1 alpha-2 codes, sorted alphabetically.
- `priority`: `1` occasional, `2` secondary, `3` primary.
- `note`: optional internal note, max 300 characters. Required when `enabled` is `false`; no leading or trailing whitespace.
- `enabled`: optional boolean; absent means enabled.

## Roles

| Role | Meaning | May support an offer? |
|---|---|---|
| `seller` | A shop that sells directly | Yes |
| `marketplace` | A marketplace or classifieds site | Yes |
| `spec` | Datasheet or specification database, e.g. Open Icecat | No: attributes only |
| `review` | Independent tests and reviews | No: context only |
| `comparison` | Price-comparison site | No: discovery/context only |

`spec`, `review` and `comparison` domains are rejected by FairBuy as offer URLs and price sources. A disabled entry keeps its role for that safety check but is not used as a discovery hint. Do not combine a context-only role with `seller` or `marketplace`; the validator rejects mixed entries so an offer URL cannot silently inherit a context-only classification.

## Validation

```sh
node scripts/normalize.mjs
node scripts/validate.mjs
```

`normalize.mjs` sorts entries by domain and sorts roles, verticals and countries into canonical order. It also accepts `--check` to fail without writing when the file is not normalized.

The validator checks the envelope, the ISO 8601 UTC `updatedAt` timestamp, required fields, allowed roles, canonical role order, context/offer role separation, priority range, duplicate domains, unknown keys, ISO 3166-1 country codes, note requirements for disabled entries, and canonical sorting of entries, verticals and countries. Vertical keys are open-ended: the validator checks the lowercase format, not membership in a fixed list. Adding a new vertical will not break the app's catalog sync; FairBuy only uses a vertical its classifier can produce.

The FairBuy backend validates the same shape again on every sync. The catalog is public but the app does not execute its content.

## How FairBuy consumes it

- On startup, the app loads the last successfully synced catalog from its database. There is no bundled runtime fallback snapshot; before the first successful sync, the catalog is empty.
- `CATALOG_SYNC_ON_START` defaults to `false`. Setting it to `true` additionally fetches the published JSON in the background after the database catalog is loaded.
- An admin can trigger a manual sync from the backoffice with **Sync from GitHub**.
- A successful sync replaces the database catalog in one transaction, then updates the in-memory cache. A failed fetch, invalid payload or database write leaves the previous catalog in place and reports the error.
- Discovery reads the database-backed cache; it never waits on GitHub.

## Notes

- If the first workflow run fails at `actions/configure-pages`, enable Pages once in **Settings → Pages → Build and deployment → GitHub Actions**, then re-run the workflow.
- GitHub Pages can serve a cached copy for a short time after a deploy. If a manual sync shows the previous version, wait for the Pages deployment and retry.
- The catalog is public. Do not put credentials, personal data or unpublished seller terms in it.
- For `food_delivery`, menus and fees are per restaurant and delivery address; these entries are hints only and do not solve basket-level comparison.
- The same basket-level caveat applies to `groceries`: fresh-item prices and promotions vary by region and day.
- For `eyewear`, advertised frame prices usually exclude lenses; only configured prices are comparable.
- For `office`, business-account pricing, bulk packs and delivery surcharges can make headline prices non-comparable.
- For `music`, instrument condition, setup, warranty and shipping surcharges vary by listing.
- Refurbished marketplaces (Back Market, refurbed, Rebuy, Revendo) are tagged `computers`/`electronics`; condition, warranty and battery health differ per listing.
