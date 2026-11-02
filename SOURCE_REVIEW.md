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
