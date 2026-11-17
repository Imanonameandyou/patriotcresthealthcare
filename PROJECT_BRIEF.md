# Patriot Crest Healthcare — Lander Project Brief

Digest of the foundational docs so a fresh session can get oriented fast. Full text lives in `docs/text/`; originals in `docs/source/`.

## What we're building
A single-page lander (`index.html`) for **Patriot Crest Healthcare**, an independent Florida health insurance agency (2-15 licensed). Copy is supplied by the user after setup.

- **Offer:** a no-obligation **Patriot Crest Coverage Review** with a licensed agent. It is *not* a policy. Say "free" only if confirmed free.
- **Primary CTA:** "Request a no-obligation coverage review"
- **Primary conversion event:** a completed, qualified review, not just a form fill.
- **Audience:** "Independent Ivan" — self-employed / small-business owner in Florida, ~35–55, variable income, no employer contribution. Secondary: families (separate campaign/avatar).
- **Tagline (approved, keep wording and punctuation exact):** "Fighting high insurance costs, one family at a time."
- **Preferred lead angle:** "Your premium is only part of the picture."
- **Big idea:** You shouldn't have to guess what your health insurance covers. Get a clear, personal review of the options, costs, and trade-offs first.
- **Metaphor:** "A map before the journey." The agent is a guide, not the insurer.
- **UMP (problem mechanism):** the *Coverage Confusion Gap*. People compare on premium, while deductibles, networks, exclusions, underwriting, and caps decide the real outcome.
- **UMS (solution mechanism):** the *Coverage Clarity Review*: Discover → Categorize → Compare → Clarify → Decide.
- **Market state:** problem/solution-aware, Stage 3–4 sophistication, skeptical of "save money" claims. Differentiate through transparency and trade-offs, not louder savings claims.

## 6 beliefs the page must install (`docs/text/necessary-beliefs.md`)
1. I need suitable coverage to protect my family and finances.
2. Premium alone doesn't tell me if a plan fits.
3. Coverage types are not interchangeable (ACA major medical vs underwritten vs short-term vs fixed-indemnity vs supplemental).
4. Better-suited options may exist, but I need help evaluating them. Marketplace isn't the only route, and private isn't automatically cheaper.
5. Patriot Crest's licensed agent will be honest, explain in plain English, and not pressure me.
6. Requesting a review is a worthwhile, no-obligation next step.

## Top objections to answer (FAQ / page body)
Legit or just a sales call? · Agent vs broker vs insurer, and how are you paid? · Is it really free / any obligation? · Will you push one carrier? · Is it ACA-compliant? · Pre-existing conditions? · Doctors/prescriptions in network? · Deductible/OOP max/exclusions/waiting periods? · Coverage gap when switching? · Marketplace subsidy impact? · Sensitive info (SSN/medical)? · "I've been burned by an agent." · No pressure / my info sold? · I need to think about it.

## Funnel context
Traffic (educational ads/content) → **Landing page** → minimal lead form (name, contact method, ZIP, coverage need, preferred contact time) → thank-you page → consultation. Form must **not** collect sensitive health details. Needs a privacy notice and call/text consent language.

## Brand (`brand_assets/`)
- **Look:** light, bright, patriotic. Mostly white and pale blue, navy anchors, red CTAs *sparingly*, gold as a restrained accent. Roughly 50 / 25 / 12 / 8 / 5 (white / navy / sky / red / gold).
- **Palette:** see `brand_assets/brand-tokens.css`. Navy `#12345B`, Heritage Blue `#2C6596`, Flag Red `#C92336`, Gold `#D6A33A`, Sky `#DCECF8`, Cloud `#F7FAFD`, Ink `#18324D`.
- **Type:** guidelines say **Montserrat 400 + 700 only**. See conflicts below.
- **Voice:** direct, empathetic, practical. Patriotic without being political. Plain language, define any jargon.
- **Logo:** `brand_assets/logo/patriot-crest-emblem.png` (1254×1254, **opaque off-white background**, so use on white or pale backgrounds; never recolor, glow, or stretch; clear space ≥ height of the gold star; ≥140 px wide). Compact mark: `brand_assets/favicon/`. Reference banner: `brand_assets/banner/family-banner.png` (2048×762) is the master for family imagery, flag treatment, and mood.
- **Imagery:** natural light, believable families, no AI glow/plastic skin, flags as context not clutter, leave clean space for copy.

## Compliance guardrails (apply to all copy and design)
- Never claim or imply: guaranteed savings / lowest price · everyone qualifies · "full coverage" · same as ACA for non-ACA products · all private plans cover pre-existing conditions · guaranteed acceptance, doctor access, or claim payment.
- Always distinguish ACA-compliant major medical, off-exchange ACA, medically underwritten, short-term, fixed-indemnity, supplemental, and health-sharing.
- No government/Medicare/carrier affiliation or logos unless authorized. No invented founder story, credentials, years in business, client counts, awards, carrier relationships, or testimonials.
- Customer quotes in the avatar and research docs are **public Reddit anecdotes, not testimonials**. Don't publish them as Patriot Crest reviews.
- Footer must carry licensing and disclosures. These are **placeholders until the owner supplies real details** (Florida 2-15 license no., legal name/DBA, appointments, privacy policy).
- Brand guidelines are not legal approval.

## Conflicts and decisions to confirm
1. **Typography:** CLAUDE.md says pair a display/serif with a sans. Brand guidelines say Montserrat 400/700 only. The banner artwork itself uses a serif wordmark and an italic serif tagline, but the guidelines' own HTML renders the tagline in Montserrat. **Working default: Montserrat only (brand guidelines win, as CLAUDE.md says to use exact brand values).** Contrast comes from weight, case, and tracking, not a second family.
2. **Colors:** CLAUDE.md bans default Tailwind palette. Compatible: use the brand palette via custom tokens/Tailwind config, never `blue-600`/`indigo-*`.
3. **Dark vs light:** CLAUDE.md's gradient, grain, and layered-shadow guidance still applies, but the brand is light and bright (white/pale blue base). Keep grain/gradients subtle and navy-tinted; no heavy dark moody look.
4. **Image overlay rule** (`from-black/60` + multiply) vs brand "no heavy gradients over photography": use a light navy-tinted treatment on the family banner/photos and keep it restrained.

## Open items the owner must confirm before launch
Free vs paid review · appointment format (phone/video/in person) · service area · carrier appointments · agent name/license no. · how agent is compensated (disclosure) · lead response time · privacy/consent language · form destination (where submissions go) · domain · real reviews/photos.

## Project layout
```
CLAUDE.md                    project rules (read first)
PROJECT_BRIEF.md             this file
index.html                   the lander (to be built; single file, Tailwind CDN)
serve.mjs                    dev server  -> node serve.mjs  (http://localhost:3000)
screenshot.mjs               node screenshot.mjs http://localhost:3000 [label] [--width=390] [--viewport]
brand_assets/
  brand-tokens.css           palette + font variables
  logo/                      patriot-crest-emblem.png
  favicon/                   favicon-source.png + 16/32/48/192/512 + apple-touch-icon.png (square, generated)
  banner/                    family-banner.png
  reference/                 brand-guidelines-v1.1.html (original, 11MB; images embedded)
docs/source/                 original .docx foundational docs
docs/text/                   plain-text versions of the same (easier to read/grep)
docs/competitor/             america-first-healthcare-lander.pdf: the successful competitor lander we're modeling (mobile-width full-page screenshot, no text layer)
copy/                        drop the supplied lander copy here
.claude/skills/              web-design-guidelines (UI review skill)
temporary screenshots/       auto-numbered output of screenshot.mjs
```
