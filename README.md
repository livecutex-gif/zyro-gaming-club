# ZYRO Gaming Club — Website

One-page site for **ZYRO Gaming Club**, a PS5 gaming lounge on Bank Colony Main Road, Hansi, Haryana.

---

## Structure

| Section | Content |
|---|---|
| Hero | Venue video, address line, two calls to action |
| Quick facts | Rate, consoles, group size, entry requirement |
| Games | The eight PS5 titles currently on the shelf |
| Rates | Hourly rates, extra controller, Duo and Squad combos |
| Inside | Ten venue photos plus two short clips |
| Food | ZORKO counter menu with starting prices |
| Finding us | Address, phone, timings note, Instagram, embedded map |
| Come play | WhatsApp and phone calls to action |

Every booking link opens WhatsApp with a pre-filled message asking for date, time and group size.

---

## Files

- `index.html` — markup and content
- `style.css` — all styling; theme values are CSS custom properties at the top
- `script.js` — nav state, mobile menu, scroll reveal, video autoplay control
- `assets/` — full-size images and compressed video
- `assets/sm/` — smaller image variants served to narrow screens via `srcset`

No build step, no framework, no dependencies beyond Google Fonts.

---

## Run locally

```bash
python -m http.server 8000
# or
npx serve .
```

---

## Editing

**Rates** live in `index.html` under `#pricing`, as `.rate-row` blocks.

**Colours** are custom properties at the top of `style.css`:

```css
--accent:      #ff2d95;  /* text, links, borders on dark */
--accent-fill: #d61a78;  /* button fills, so white text passes AA */
```

The pink is split into two tones on purpose: the brighter one is readable as text on the dark
background, the darker one keeps white button labels above the 4.5:1 contrast threshold.
Changing one without checking the other can break contrast.

**Phone number** appears in several `tel:` and `wa.me` links — search for `8221939044`.

---

## Known limitations

- **Source media is vertical.** Photos and video were extracted from Instagram reels (9:16).
  Burned-in contact overlays were cropped out, but the gallery still crops hard. A horizontal
  photo shoot would improve it noticeably.
- **Hero video is grainy.** Low-light phone footage, compressed to 3 MB for web.
- **No backend.** Booking runs through WhatsApp, not a reservation system.

---

## Business details still to confirm

1. **Opening hours** — not listed anywhere. The Timings card says so and links to a phone call.
2. **Extra controller charge** — the source said "+₹40 per person", which is ambiguous. The site
   shows the amount with "Ask at the counter" as the qualifier.
3. **4-hour session rate** — the original promo said "50% off" without a final price or a stated
   basis. The site shows "Ask" rather than a figure that cannot be verified.

---

## Client details

- **Address:** Bank Colony Main Road, near Vishal Copy Factory, Hansi, Haryana
- **Phone:** 8221939044 · 95184 02728
- **Instagram:** [@zyrogamingclub](https://www.instagram.com/zyrogamingclub/)
