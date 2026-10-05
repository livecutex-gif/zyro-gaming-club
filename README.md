# ZYRO Gaming Club — Website

One-page marketing site for **ZYRO Gaming Club**, a PS5 gaming lounge in Hansi, Haryana.

Built as a sales prototype: a live link to show the client before closing the deal.

---

## What's in it

| Section | Purpose |
|---|---|
| **Hero** | Full-screen venue video, live "open now" badge, ₹130/hour stat |
| **Games** | All 8 titles as glowing cards with per-game accent colors |
| **Pricing** | Full rate list — hourly, extra controller, Duo, Squad, marathon deal |
| **Gallery** | 10 venue photos in a masonry grid + 2 auto-playing reels |
| **Food** | ZORKO food-partner section with menu image |
| **Visit** | Address, both phone numbers, Instagram, embedded Google Map |
| **Sticky CTA** | WhatsApp booking button, always visible on mobile |

Every CTA opens WhatsApp with a pre-filled booking message.

---

## Tech

Plain HTML, CSS and JavaScript. No build step, no dependencies, no framework.

- `index.html` — markup and content
- `style.css` — all styling, custom properties at the top for theming
- `script.js` — nav state, mobile menu, scroll reveal, video autoplay control
- `assets/` — images and compressed video

Fonts load from Google Fonts (Outfit + Space Grotesk).

---

## Run it locally

Any static server works:

```bash
# Python
python -m http.server 8000

# Node
npx serve .
```

Then open `http://localhost:8000`.

Opening `index.html` directly also works, though the hero video may not autoplay from `file://` in some browsers.

---

## Deploy

Drag the folder onto [Netlify Drop](https://app.netlify.com/drop), or connect the repo to Vercel / Netlify / Cloudflare Pages. It is fully static — no configuration needed.

---

## Editing content

**Prices** live in `index.html` under the `#pricing` section. Each price is a `.price-card` or `.offer` block.

**Colors** are CSS custom properties at the top of `style.css`:

```css
--pink:   #ff2d95;
--purple: #8b00ff;
--cyan:   #00e5ff;
--grad:   linear-gradient(100deg, #ff2d95 0%, #a855f7 45%, #00e5ff 100%);
```

Change those and the whole site re-themes.

**Phone number** appears in several `tel:` and `wa.me` links — search for `8221939044` and replace all.

---

## Known limitations

- **Source media is vertical.** All photos and video were extracted from Instagram reels (9:16). Burned-in contact overlays were cropped out, but the gallery crops hard. A horizontal photo shoot would improve it significantly.
- **Hero video is grainy.** Low-light phone footage, compressed to 3 MB for web.
- **No backend.** The booking flow is WhatsApp, not a real booking system. A tournament signup form would need a backend or a form service.

---

## Client details

- **Address:** Bank Colony Main Road, near Vishal Copy Factory, Hansi, Haryana
- **Phone:** 8221939044 · 95184 02728
- **Instagram:** [@zyrogamingclub](https://www.instagram.com/zyrogamingclub/)
- **Owners:** @garvpahwaaa · @akshaybatrax
