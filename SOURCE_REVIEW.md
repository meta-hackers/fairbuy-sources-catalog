# Source quality review — 2026-11-03

## Outcome and scope

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
- **Coverage is uneven:** office (4), eyewear (6), and music (8) have fewer entries
  than electronics (153). Counts include disabled sources and overlapping tags;
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
