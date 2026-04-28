# BG Green Yard — multi-page website creation prompt

Use this brief when extending or redesigning the site.

## Brand & positioning

- **Name:** BG Green Yard — landscaping and outdoor services with a **Sofia-first** focus.
- **Tone:** Trust, calm, professionalism; the client should picture the **final result** of well-maintained gardens and orderly outdoor spaces.
- **Audience:** Residential and commercial clients in Sofia and the surrounding area.

## Design language — Scandinavian (hygge)

- **Style:** Natural materials, warm minimalism, daylight clarity — inspired by modern Scandinavian homes and quiet gardens.
- **Palette:** White backgrounds with **primary accent `#70ae26`**; plenty of whitespace; subtle borders (`neutral/stone`), no clutter.
- **Typography:** Clean, modern **sans-serif**, strong hierarchy (display-like headings, readable body). Support **Bulgarian (Cyrillic)** and **English**.
- **Imagery:** Organic shapes; optional decorative plant motif (`plant.avif`) in corners for life and naturality.
- **Motion:** Subtle only — fade-in on scroll, soft transitions; **no** aggressive animations.

## UX & layout (WordPress-like clarity)

- Clear **primary navigation**, predictable sections, readable line length.
- **Mobile-first**, responsive: comfortable tap targets, collapsible nav on small screens.
- User journey: **brand → services → proof (gallery) → contact** (form + phone + map).

## Technical & assets

- **Locales:** `bg` (default) and `en` with a visible **language toggle** preserving the current path.
- **Hero (home):** Full-viewport **video background** using `public/main.mp4` (muted, loop, `playsInline`).
- **Logo:** `public/logo-removebg-preview.png` in **navbar**, **footer**, and **key branding sections**.
- **Gallery/media:** Use **all** images and videos under `public/` (e.g. JPG set, `garden.jpg`, `plant.avif`, `main.mp4`, `1000011543.mp4`).
- **Contact:** Inquiry form (fields + success state), hours/address, embedded **map** (Sofia).

## Site map & content hooks

| Route (localized) | Role |
|-------------------|------|
| Home | Video hero, trust pillars, brand strip with logo, CTA to services/contact |
| About | Mission, values, “why us”, optional indicative stats, CTA |
| Services | Snow removal; landscaping & lawn care; irrigation — emphasize Sofia |
| Gallery | Photo grid + video section(s) |
| Contact | Form + map + branding |

## Reference

- **Structure / content feel:** [mr-donchev.com — За компанията](https://mr-donchev.com/za-kompaniata/) — mission blocks, trust bullets, regional coverage, inquiry flow (adapt tone and copy for BG Green Yard; do not copy text verbatim).

## Deliverable expectation

A **finished**, production-ready marketing site suitable for a real Sofia-based landscaping business — consistent visuals, both languages, accessible navigation, and disciplined use of motion and layout.
