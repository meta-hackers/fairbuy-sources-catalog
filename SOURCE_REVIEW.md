# Source quality review

## Outcome and scope — 2026-11-03

The catalog contains 445 entries across 26 country codes and 19 verticals.
This was a targeted semantic review, not a live verification of every source or
product listing. Schema validation alone cannot establish that a business still
operates, serves a country, or publishes purchasable offers.

Changed 14 existing entries: disabled seven unsuitable discovery hints, corrected
six marketplace classifications, and removed one unsupported country assignment.
There are now 438 enabled entries. Existing uncommitted additions were retained;
no sources were deleted and the schema is unchanged.

## Corrections and evidence

| Sources | Decision | Evidence |
|---|---|---|
| `just-eat.fr` | Disable: French operations ended on 2024-12-09. | [Official closure notice](https://www.just-eat.fr/en/), [company announcement](https://newsroom.justeattakeaway.com/en-WW/244843-just-eat-takeaway-com-confirms-decision-to-end-operations-in-france-following-consultation/) |
| `foodora.it` | Disable: exited Italy in 2018; Glovo is already listed. | [Reuters, 2026-02-26](https://www.reuters.com/sustainability/society-equity/italys-delivery-riders-keep-winning-court-losing-streets-2026-02-26), [acquisition context](https://techcrunch.com/2021/07/06/italys-dpa-fines-glovo-owned-foodinho-3m-orders-changes-to-algorithmic-management-of-riders/) |
| `microspot.ch` | Disable the duplicate legacy hint; use `interdiscount.ch`. | [Coop merger announcement](https://www.coop.ch/en/company/media/media-releases/2023/interdiscount-to-significantly-expand-its-online-offer.html), [subsequent redirect history](https://de.wikipedia.org/wiki/Microspot) |
| `mydeal.com.au` | Disable: ceased trading on 2025-09-30; support pages are not offers. | [Official transition FAQ](https://help.mydeal.com.au/hc/en-us/articles/13088870807183-MyDeal-is-moving-to-BIG-W-FAQ) |
| `riteaid.com` | Disable pending verification of a current retail offering. Store closures alone do not rule out a future online relaunch. | [Reported closure of all stores and removal of services](https://www.cnn.com/2025/10/04/business/rite-aid-closes-stores), [current records/relaunch information](https://riteaid.com/pharmacy-records) |
| `rossstores.com` | Disable: no online merchandise sales; representative imagery is not an offer. | [Official FAQ](https://www.rossstores.com/contact-us), [store-specific price caveat](https://www.rossstores.com) |
| `burlingtoncoatfactory.com` | Disable: legacy domain for an in-store merchandise business, not an online checkout source. | [End of e-commerce](https://www.npr.org/2021/02/17/968666255/how-a-retail-chain-without-a-website-powered-through-the-pandemic), [2025 confirmation](https://www.placer.ai/anchor/articles/tjx-burlington-and-ross-gear-up-for-a-blockbuster-holiday-season), [current store-focused website](https://www.burlington.com) |
| `bestbuy.com`, `bestbuy.ca` | Keep `seller`, add `marketplace`: both include third-party offers. | [US marketplace launch, 2025-08-19](https://corporate.bestbuy.com/2025/marketplace), [Canada partner portal](https://partners.bestbuy.com/canada/marketplace) |
| `newegg.com` | Keep `seller`, add `marketplace`. | [Official seller program](https://www.newegg.com/sellers) |
| `farfetch.com` | Use `marketplace`: listings come from partner boutiques and brands. | [Official partner directory](https://www.farfetch.com/boutiques) |
| `manomano.fr`, `manomano.it` | Use `marketplace`, not direct seller. | [Marketplace integration guide covering both countries](https://support.channelengine.com/hc/en-us/articles/4409503283997-ManoMano-marketplace-guide), [official country sites](https://www.manomano.com) |
| `glovoapp.com` | Remove France; retain Italy, Spain and Portugal. | [Official current delivery-country list](https://glovoapp.com) excludes France. Other supported countries were not added without a separate coverage review. |

Disabling is a discovery decision, not a new role or a URL blocklist. Existing
roles are preserved. As documented in the README, disabled entries retain their
roles for FairBuy's safety checks; disabling a `seller` does not itself make that
domain a forbidden offer URL.

## Remaining risks and next priorities

- **Regional domains:** verify the actual purchasing hostname for every country,
  especially multi-country entries such as Notino, Wayfair, Vinted and watch
  retailers. A separate country domain is not matched as a subdomain of `.com`.
  Do not equate brand presence with delivery eligibility.
- **Broad global coverage:** 19 seller/marketplace entries use `global`. Treat
  these as discovery hints, not proof that a listing ships to every destination.
  Replace with explicit country coverage only when supported by shipping policies.
- **Offer comparability:** membership prices, local grocery pricing, prescription
  restrictions, refurbished condition, and delivery fees require listing-level
  checks. A source's priority is not a guarantee of comparable prices.
- **Other mixed retailers:** audit remaining seller-only classifications for
  third-party listings. Confirm the merchant of record per offer even after a
  marketplace role is added.
- **Coverage is uneven:** office (4), eyewear (6), and music (8) had fewer entries
  than electronics (153) at the time of this review; the 2026-11-04 pass raised
  them to 9, 10 and 13. Counts include disabled sources and overlapping tags;
  they are not quality scores. Prefer verified local coverage over bulk additions.
- **No availability conclusions from HTTP errors:** bot protection, geolocation,
  and transient failures can return 403/429 or redirects. This review did not
  disable a source solely because an automated request failed.

## Repeatable review checklist

1. Confirm a current product listing and a purchase path, not just a homepage.
2. Check the country-specific hostname and shipping eligibility.
3. Identify whether the source is a seller, marketplace, or context-only site.
4. Verify that verticals reflect its current assortment; use priority 3 only for
   deliberately selected primary discovery sources.
5. Record dated evidence here and a short operational caveat in `note`.
6. Disable closed or unsuitable hints rather than deleting their history. Verify
   any proposed successor independently before adding or enabling it.
7. Update `updatedAt` and run `node scripts/validate.mjs`.

## Switzerland and watches expansion — 2026-11-03

Added 20 sources, bringing the catalog to 465 entries (458 enabled):
16 explicitly cover Switzerland, 15 cover watches, and 11 belong to both groups.
These are overlapping counts. Existing entries and priorities were left unchanged.
New shops default to secondary priority (2); QoQa and Time and Watches use 1.
Only the countries reviewed here are assigned; this is not an exhaustive list of
each brand's international delivery coverage.

| New domain | Scope and classification | Official evidence |
|---|---|---|
| `breitling.com` | Swiss official watch seller | [CHF listings with Add to bag](https://www.breitling.com/ch-en/watches/all/), [Swiss delivery eligibility](https://www.breitling.com/ch-en/terms-and-conditions) |
| `christ-swiss.ch` | Swiss watch/jewelry seller; distinct from German and Austrian CHRIST shops | [Watch shop](https://www.christ-swiss.ch/de/uhren/c/m_0200), [Swiss delivery policy](https://www.christ-swiss.ch/de/lieferungundabholung) |
| `exlibris.ch` | Swiss bookseller | [Online assortment and basket](https://www.exlibris.ch/de), [Swiss delivery FAQ](https://www.exlibris.ch/de/kontakt-hilfe/faq) |
| `jenni-uhren.ch` | Swiss watch seller, including pre-owned stock | [Priced Certina listings and online shop](https://www.jenni-uhren.ch/en/certina), [checkout/payment and Swiss shipping terms](https://www.jenni-uhren.ch/en/agb) |
| `jowissa.com` | Official Swiss watch/jewelry seller | [Swiss CHF storefront](https://www.jowissa.com/en-ch), [shipping policy](https://www.jowissa.com/en-ch/policies/shipping-policy) |
| `jumbo.ch` | Swiss DIY/home seller; unrelated to Chilean Jumbo | [Online shop](https://www.jumbo.ch/de), [delivery options](https://www.jumbo.ch/de/service/lieferung.html) |
| `landi.ch` | Swiss garden, home, pet, grocery, clothing and leisure seller | [Shop categories and ordering](https://www.landi.ch/shop), [delivery FAQ](https://www.landi.ch/laden/service/Haeufig-gestellte-Fragen-FAQ) |
| `manor.ch` | Swiss department-store seller and partner platform | [Watch listings](https://www.manor.ch/fr/shop/bijoux-montres/montres/c/watches), [assortment](https://www.manor.ch/fr), [delivery](https://www.manor.ch/fr/u/lieferbedingungen), [partner program](https://www.manor.ch/fr/u/marketplace) |
| `nettoshop.ch` | Swiss appliance/electronics seller | [Online shop](https://www.nettoshop.ch), [Swiss delivery terms](https://www.nettoshop.ch/agb), [installation extras](https://www.nettoshop.ch/lieferung_montage) |
| `ochsnersport.ch` | Swiss sports/clothing seller | [Online shop](https://www.ochsnersport.ch/de-ch), [Swiss delivery eligibility](https://www.ochsnersport.ch/de-ch/versand-lieferung), [partner direct-shipping FAQ](https://www.ochsnersport.ch/de-ch/faq) |
| `oris.ch` | Official watch seller for US and UK; **not tagged CH** | [Online catalog](https://www.oris.ch/en-US/product/watch), [sales terms naming US and Great Britain destinations](https://www.oris.ch/en-CH/conditions-sale) |
| `qoqa.ch` | Swiss limited-time deal seller, including occasional watches | [Current categories](https://www.qoqa.ch), [Swiss terms](https://www.qoqa.ch/fr/terms_of_use), [watch offer demonstrating reservation-only caveat](https://www.qoqa.ch/fr/offers/86125) |
| `theswisscollector.com` | Swiss pre-owned watch/jewelry seller | [Shop](https://theswisscollector.com/en), [Swiss delivery terms](https://theswisscollector.com/conditions-generales-de-ventes), [payments FAQ](https://theswisscollector.com/en/faq) |
| `timeandwatches.com` | Global watch editorial/review context, not offers | [News, reviews and mechanical watch coverage](https://www.timeandwatches.com/) |
| `tudorwatch.com` | Global official specifications, not a direct seller | [Official catalog](https://www.tudorwatch.com/en/watches), [online purchasing is through external authorized retailers](https://www.tudorwatch.com/en/buy/online/unitedstates) |
| `uhren-shop.ch` | Swiss watch/jewelry seller; also stocks clocks | [CHF prices, basket and checkout](https://www.uhren-shop.ch), [Basel operator and contact](https://www.uhren-shop.ch/de/kontaktieren-sie-uns-2018) |
| `uhrenschmuck24.ch` | Swiss watch/jewelry seller CHRISTIAN AG | [Priced assortment and checkout](https://www.uhrenschmuck24.ch), [shipping policy](https://www.uhrenschmuck24.ch/versand) |
| `victorinox.com` | Official Swiss watch, home and travel-gear seller | [Swiss storefront](https://www.victorinox.com/en-CH), [Swiss delivery policy](https://www.victorinox.com/en-CH/FAQ-Shipping/cms/service-faq-delivery) |
| `watchfinder.ch` | Swiss pre-owned watch seller on its own regional hostname | [Swiss shop](https://www.watchfinder.ch/en/), [Swiss delivery terms](https://www.watchfinder.ch/en/terms-and-conditions) |
| `wornandwound.com` | Global watch reviews/editorial, not offers | [Reviews](https://wornandwound.com/watch-reviews/), [about the publication](https://wornandwound.com/about-the-blog/) |

Manor is tagged both seller and marketplace to expose its external-partner
assortment, but its terms identify Manor as the contractual seller. Partner shipping
alone is not sufficient to classify every dropshipping retailer as a marketplace.
Worn & Wound has affiliated retail on another hostname; its editorial domain is
kept context-only. TUDOR's retailer links do not make its brand domain a seller.
Pre-owned watch listings must be compared by reference, condition, accessories,
service history and warranty rather than headline price alone.

## Disabled-entry removal — 2026-11-03

Removed the seven disabled entries at the maintainer's request:
`burlingtoncoatfactory.com`, `foodora.it`, `just-eat.fr`, `microspot.ch`,
`mydeal.com.au`, `riteaid.com` and `rossstores.com`. The catalog now contains
458 entries, all enabled. No enabled entries were changed or removed.
The earlier findings and evidence above are retained as historical review notes;
the removed entries no longer participate in catalog-based role checks.

## Automated accessibility check — 2026-11-03

Checked all 465 domains before the removal above using HTTPS homepage GETs,
following redirects, with a 20-second timeout and a `www` fallback on errors.
The first pass produced 275 successful HTTP responses, 168 HTTP error responses,
and 22 transport/TLS failures. Retried the 22 transport/TLS failures using HTTP/1.1
and a 15-second timeout; nine then returned HTTP 200 and four returned HTTP errors.

Remaining connection issues from this environment:

| Domain(s) | Observation |
|---|---|
| `seikoco.com` | DNS resolution failed for both bare and `www` hostnames. |
| `openicecat.com` | TLS certificate hostname mismatch on both hostnames. |
| `trony.it` | TLS certificate issuer-chain verification failed on both hostnames. This may depend on the client's trust store. |
| `uhrzeit.org` | Initial connection timeouts; HTTP/1.1 retry could not connect. |
| `bestbuy.com`, `johnlewis.com`, `kroger.com`, `tractorsupply.com`, `yodobashi.com` | HTTP/2 resets followed by HTTP/1.1 timeouts. |

These observations do not establish worldwide unavailability or business closure.
HTTP errors (including 403/429), bot challenges, geolocation redirects and homepage
404s are not proof that a retailer is inaccessible to shoppers. Successful homepage
responses do not verify product listings or checkout. No additional sources were
removed or disabled on the basis of this automated check.

## Accessibility follow-up and disabling — 2026-11-03

At the maintainer's request, disabled three discovery hints pending repair or
verification. The catalog retains 458 entries, of which 455 are enabled.

- `seikoco.com`: both [Google DNS](https://dns.google/resolve?name=seikoco.com&type=A)
  and [Cloudflare DNS](https://cloudflare-dns.com/dns-query?name=seikoco.com&type=A)
  returned NXDOMAIN for the bare and `www` hostnames.
- `openicecat.com`: repeated HTTPS certificate hostname mismatches on both
  hostnames. HTTP still redirects to `icecat.biz`, which responds with a bot
  challenge, so the service is not completely offline. Verify a replacement
  hostname separately before changing the catalog.
- `trony.it`: repeated HTTPS certificate issuer-chain verification failures.
  Disabled conservatively pending verification, not as a claim of worldwide
  unavailability or business closure; the failure may depend on the trust store.

Preserved names, roles, countries, verticals and priorities. Timeout-only and
HTTP-blocked sources remain enabled because these checks do not establish that
their websites are broken. Search results also show a shop at `www.uhrzeit.org`,
despite connection failures from this environment.

## Hostname, coverage and normalization review — 2026-11-04

The catalog now contains 473 entries across 29 country codes and 20 verticals;
466 are enabled and 7 are disabled. This pass corrected four stale hostnames,
added 12 verified sources in the under-covered office, eyewear and music
verticals, and made ordering and validation stricter. No entries were deleted;
four stale hints were disabled and three canonical hostnames were added.

### Hostname corrections

| Source | Decision | Evidence |
|---|---|---|
| `just-eat.it` → `justeat.it` | Disabled the legacy hyphenated hostname and added the canonical Italian storefront. | [`just-eat.it` returns a 301 to `www.justeat.it`](https://www.justeat.it/); Just Eat's newsroom identifies [`www.justeat.it`](https://newsroom.justeattakeaway.com/it-IT/246288-just-eat-svela-le-nuove-abitudini-alimentari-degli-italiani-gusto-e-salute-sono-la-nuova-normalita) as the Italian site. |
| `tiendanimal.com` → `tiendanimal.es` | Disabled the legacy `.com` hostname and added the Spanish storefront. Added `marketplace` because Tiendanimal operates a third-party marketplace. | [`tiendanimal.com` returns a 301 to `www.tiendanimal.es`](https://www.tiendanimal.es/); the official [marketplace page](https://www.tiendanimal.es/vender-en-tiendanimal) and [marketplace terms](https://www.tiendanimal.es/condiciones-marketplace.html) describe third-party sellers. |
| `dv247.com` → `musicstore.com` | Disabled DV247 and added the Music Store UK storefront. | Music Store's own [DV247 history page](https://www.musicstore.com/en_GB/GBP/history-of-dv247) documents the online transition from `dv247.com` to `musicstore.com`; `dv247.com` redirects to the UK storefront. |
| `fcw.ch` → `mueller.ch` | Disabled the separate Franz Carl Weber hint after its online shop closed; added `toys_baby` to the existing Müller Switzerland entry. | [SRF reports the conversion of Franz Carl Weber stores after the Müller acquisition](https://www.srf.ch/news/wirtschaft/drogerie-statt-spielzeugladen-viele-franz-carl-weber-filialen-verschwinden-mueller-zieht-ein); `fcw.ch` redirects to `mueller.ch`, whose [Swiss online shop lists a toy assortment](https://www.mueller.ch/c/spielwaren). |

The legacy domains remain in the catalog as disabled entries with explanatory
notes, preserving their roles for FairBuy's safety checks while preventing
duplicate discovery hints.

### New sources

| Domain | Scope | Official evidence |
|---|---|---|
| `staples.ca` | Office; CA | [Canadian storefront](https://www.staples.ca/) states that the site is intended for Canadian residents. |
| `officeworks.com.au` | Office; AU | [Australian office and stationery storefront](https://www.officeworks.com.au/) with online ordering, delivery and Click & Collect. |
| `ryman.co.uk` | Office; GB | [UK stationery and office supplies](https://www.ryman.co.uk/stationery) with basket and checkout. |
| `viking.de` | Office; DE | [German office-supply online shop](https://www.viking.de/de/). |
| `specsavers.co.uk` | Eyewear; GB | [UK prescription glasses](https://www.specsavers.co.uk/glasses) and online contact-lens ordering. |
| `specsavers.ie` | Eyewear; IE | [Irish optician](https://www.specsavers.ie/) with online contact-lens ordering. |
| `fielmann.de` | Eyewear; DE | [German optician](https://www.fielmann.de/) with online and in-store ordering. |
| `lenscrafters.com` | Eyewear; US | [US prescription glasses, sunglasses and contacts](https://www.lenscrafters.com/). |
| `andertons.co.uk` | Music; GB | [UK musical-instrument store](https://www.andertons.co.uk/). |
| `gear4music.com` | Music; 19 European markets plus the US | [Localized storefronts](https://www.gear4music.com/) and distribution centres in the UK, Ireland, Germany, Spain and Sweden. |
| `bax-shop.nl` | Music; NL | [Dutch music shop](https://www.bax-shop.nl/muziekinstrumenten); the site states delivery in the Netherlands and Belgium. |
| `bax-shop.be` | Music; BE | [Belgian Bax Music storefront](https://www.bax-shop.be/nl/muziekwinkel). |

All new shops use secondary priority (2). Online prices, delivery eligibility
and configured options still need to be checked at listing level. Gear4music's
country list follows the localized storefronts listed on its homepage; it is not
a guarantee that every item ships to every listed country. Office coverage rose
from 5 to 9 entries, eyewear from 6 to 10, and music from 8 to 13.

### Normalization and validation

- `sources.json` now sorts entries by domain, roles in canonical order, and
  verticals and countries alphabetically.
- `scripts/normalize.mjs` applies the canonical ordering; `--check` fails
  without writing when the file is not normalized.
- `scripts/validate.mjs` now rejects unsorted data, unknown ISO 3166-1 codes,
  disabled entries without a note, mixed context/offer roles, and non-UTC
  `updatedAt` values.
- The JSON Schema documents the same constraints. It cannot express array
  ordering, so the validator remains authoritative.
