Design Brief — Personal Site (Editorial Blog + Photography Portfolio)

A brief for Claude Code. Read the whole thing, then confirm the open decisions at the
bottom before scaffolding anything. Build in milestones, not all at once.


1. One-line thesis

A personal home on the web that reads like a well-set literary journal and shows
photographs like a printed monograph — writing-forward, image-forward, quietly crafted,
and built to last.

The site does two jobs at once and must not feel like two bolted-together sites:


Writing — long-form essays and shorter notes, set for sustained, pleasurable reading.
Photography — portrait and travel work, presented as deliberate series, not a dump.


It also quietly serves as a portfolio (the owner is reapplying to universities and shares
work publicly), so polish, restraint, and a sense of authorship matter more than cleverness.


2. What "editorial" means here (and what it doesn't)

Take the right thing from each reference and explicitly leave the rest.

ReferenceBorrow thisLeave thisgwern.netThe reading machine: real typographic hierarchy, side/margin notes, footnotes, hover link-previews, collapsible sections, a table of contents, dropcaps used sparingly, light/dark/reader modes, a "durable static document" mentality.The density and visual austerity. This site has fewer, more cared-for pages, not thousands of dense ones.garden.bradwoods.ioCraft and a little play: tasteful scroll-triggered reveals, view transitions between pages, hand-made detail, the sense that a person built this.Heavy three.js/shader theatrics, the full non-linear "digital garden" map, and the dark-by-default creative-coding vibe. Motion here is a seasoning, not the meal.dooceVoice-first intimacy: a strong narrative register, the writer's own photographs embedded in the prose, a memorable site name/tagline, archives that feel personal.Sidebar/widget clutter and ad-era blog chrome.

The synthesis: gwern's discipline as the skeleton, dooce's voice as the soul, and a
restrained dose of brad woods' craft as the finish.


3. Visual language


Anti-default warning. The obvious move for "editorial" is warm-cream background
(~#F4F1EA) + high-contrast Didone serif + terracotta accent. Do not build that.
It is the current AI-design house style and reads as templated. The direction below is
deliberately different and is also better for photography.



3a. Palette — darkroom neutral

The interface is near-monochrome on purpose: the photographs supply all the colour, so
the chrome must never compete with them. Surfaces are cool-neutral, not cream.

Light mode
  --paper      #FAFAF9   page surface (barely-there warmth, NOT cream)
  --ink        #161616   primary text
  --ink-soft   #6A6A68   secondary text, captions
  --hairline   #E4E4E1   rules, borders, dividers
  --mat        #0D0D0D   gallery/photo "mat" — dark in BOTH modes so prints sing

Dark mode
  --paper      #121212
  --ink        #ECECE8
  --ink-soft   #9A9A96
  --hairline   #2A2A28
  --mat        #0A0A0A

Accent (use it almost nowhere)
  --safelight  #8E3B2E   a deep darkroom-safelight red; links/active/focus only

Keep accent usage minimal — links, hover, focus rings, the occasional eyebrow. If in
doubt, leave colour to the photos.

3b. Type

Pair faces deliberately; don't reach for the usual suspects. Self-host as woff2
(longevity + performance), do not load from a CDN. Variable fonts preferred.


Reading + display — Newsreader (free, variable, true optical sizes and a real
italic). One literary serif doing both body and headings, gwern-style, sized by optical
axis rather than swapping families. A bought alternative if budget allows: Lyon,
Tiempos, or Freight Text.
Captions, labels, EXIF/photo metadata — a monospace (e.g. JetBrains Mono or
Berkeley Mono). This is a content-driven choice, not decoration: camera data is data,
so it gets a data face. Mono also cleanly distinguishes marginalia from prose.
Optional utility grotesque for nav only if the mono feels too technical there — but try
to live with two families.


Set a real type scale (roughly 1.2–1.25 ratio), generous line-height for body (~1.6),
tighter for display. Measure for prose: 62–72 characters.

3c. Layout — column + margin

A reading column with a true margin track, so notes, captions, and small figures live
beside the text (gwern's best idea), and photographs can break out wider.

 wide screens
┌──────────────────────────────────────────────────────┐
│  nav                                                   │
│                                                        │
│        ┌────────────────────────┐   ┌──────────────┐  │
│        │  reading column        │   │  margin:     │  │
│        │  (prose, ~65ch)        │   │  sidenotes,  │  │
│        │                        │   │  captions,   │  │
│        │   ┌──────────────────┐ │   │  small figs  │  │
│        │   │ figure (in-column)│ │   └──────────────┘  │
│        │   └──────────────────┘ │                      │
│        │                        │                      │
│   ┌────┴────────────────────────┴────┐  ← full-bleed   │
│   │  photograph breaks the measure    │     figure      │
│   └───────────────────────────────────┘                │
│        │  …prose continues…     │                      │
│        └────────────────────────┘                      │
└──────────────────────────────────────────────────────┘

 narrow screens: single column; sidenotes collapse to tap-to-expand footnotes;
 figures go full-width.

Figures have three modes the writer can choose per image: in-column, margin-anchored,
and full-bleed.

3d. Signature — the latent image

Spend the boldness in exactly one place. The owner's working name ideas all play on light
and photography (Holding to the Light, Trick of the Light, Latent Image). Build the
signature around that:


Photographs load as a latent state — a low-resolution, slightly low-contrast
placeholder (the LQIP/blur-up you'd build for performance anyway) — and develop into
full clarity as they enter the viewport. The signature is a performance technique wearing
a costume, which is why it earns its place.
The wordmark/logotype is the second half of the signature: set the site name to play on
light (e.g. a subtle exposure/over-print treatment, or a glyph that resolves on load).
Keep it to one gesture.


Reduced motion: when prefers-reduced-motion is set, skip the develop animation —
images simply appear developed. The signature must never be load-bearing for legibility.


4. Information architecture

Few pages, each composed — not a CMS feed.


Home — not a reverse-chron list. A composed landing: one strong full-bleed
photograph + the wordmark + a one-sentence statement of what this place is, then a short
"latest writing" list and one or two featured photo series. The hero is the thesis: lead
with the single most characteristic image.
Writing — index (essays + notes, with a clear sense of recency and theme) and the
reading-machine post template.
Photography — index of series (each a small monograph), a series/gallery template,
and a single-image lightbox view.
About / Colophon — who the writer is, plus a colophon documenting how the site is
built (typefaces, stack, principles). The colophon reinforces the craft ethos and reads
well to an admissions or editor audience.
Phase 2 (optional): a /now page, shortform notes, on-site search, backlinks.


Every page has a valid RSS feed entry. Clean, readable URLs (/writing/<slug>,
/photography/<series>).


5. Component inventory

Reading system


Post template with optical-size display headings and a TOC for longer pieces
(intersection-observer driven, brad-woods style).
Sidenotes / margin notes that fall back to tap-to-expand footnotes on mobile.
Footnotes, optional per-post dropcap, blockquotes/pull-quotes, code blocks if needed.
Reading-progress indicator (subtle).
Phase 2: hover link-preview popups (gwern's annotations) and backlinks.


Photography system


Responsive <figure> in three modes (in-column / margin / full-bleed) with width+height
set to prevent layout shift.
Justified-rows or masonry gallery grid that preserves aspect ratios.
Lightbox with keyboard nav (←/→/Esc), swipe on touch, and zoom; no layout shift; URL
updates so a single image is shareable.
Caption + optional EXIF (camera / lens / focal / shutter / ISO) set in mono.
Series intro block (title, short text, date/place).


Global


Theme toggle: light / dark / auto, persisted, with no flash of wrong theme on
load (inline the theme script in <head>).
Nav, footer/colophon, RSS, view-transition page navigation.
Phase 2: search.



6. Photography handling (the part the references don't solve)

This is where most "blog + portfolio" builds fall down. Get it right.


Pipeline. Decide based on volume (see decisions). Either (a) source images in-repo,
processed at build by astro:assets/sharp into AVIF + WebP with responsive srcset; or
(b) an image CDN (Cloudflare Images / imgix / Cloudinary) to keep the repo light if there
are many large files. Default recommendation: (a) for ≲150 images, (b) beyond that.
Colour. Export and serve sRGB with the profile embedded. Only attempt Display-P3
wide-gamut if the owner specifically wants it and is willing to handle the fallback — it's
an advanced extra, not a default.
Placeholders. Generate a tiny blurred LQIP per image at build — this doubles as the
"latent" state for the signature reveal. No loading="lazy" images without intrinsic
dimensions (prevent CLS).
Captions as marginalia, EXIF in mono, alt text required on every image.



7. Tech stack

Recommended: Astro + MDX, static output.


Astro content collections: posts (essays), notes (shortform), series (photo
monographs). Content lives as MDX/Markdown files in git — durable, versioned, trivial
for Claude Code to edit, and faithful to the "built to last" ethos.
MDX for essays so figures/sidenotes/components drop into prose.
astro:assets for the image pipeline.
Islands only where needed — lightbox, TOC, theme toggle, (phase 2) link-popups. Use
vanilla/Web Components or a tiny React island; avoid shipping a full SPA.
Styling: CSS custom properties for the token layer above; Tailwind optional on top, but
the tokens are the source of truth.
Deploy: static to Cloudflare Pages / Netlify / Vercel.


Alternative: Next.js (what brad woods uses) — fine if app-like dynamism is wanted or
it's simply preferred. Heavier; only worth it for genuinely dynamic needs.

Skip for v1: a database / Supabase / headless CMS. The content is files; a backend adds
operational burden and undercuts durability. Add a headless CMS later only if a
non-technical editing workflow is ever needed.


8. Build order (milestones)


Confirm the open decisions below. Do not scaffold until these are answered.
Foundation — Astro scaffold, token layer (CSS variables), typography, base layout,
light/dark with no-flash theme script, view transitions.
Reading system — post template, MDX wiring, sidenotes/footnotes, TOC, dropcap;
typeset one real essay end-to-end (not lorem ipsum).
Photography system — image pipeline, the three figure modes, one real series + gallery

lightbox, blur-up/latent reveal.



Composition — home page, nav, about/colophon, RSS.
Polish — signature reveal, micro-interactions, performance pass, accessibility pass,
reduced-motion, full responsive check; screenshot and self-critique.
Phase 2 (later) — link-preview popups, search, backlinks, /now, notes.


Critique at the end of milestones 2, 3, and 5 — take a screenshot and remove one thing.


9. Quality floor (non-negotiable)


Responsive down to small mobile; sidenotes degrade to footnotes gracefully.
Visible keyboard focus; full keyboard operability for nav and lightbox.
prefers-reduced-motion respected everywhere; motion never required for meaning.
Semantic HTML; alt text on every image; valid RSS.
No cumulative layout shift from images (always set dimensions).
No flash of unstyled content or wrong theme on load.
Self-hosted fonts; performance budget kept (fast LCP, lean JS).



10. Decisions to confirm before building

Claude Code: ask the owner these and wait for answers. Recommendations in bold.


Site name — which of the light-metaphor candidates (Holding to the Light /
Trick of the Light / Latent Image), or another? This drives the wordmark and signature.
Default mode — light reading surface + true dark mode + dark gallery mat in both
modes is recommended. Confirm, or go dark-first?
Stack — Astro + MDX as above? Or Next.js?
Image hosting — roughly how many photographs at launch? (Drives in-repo build vs CDN.)
Interconnection — mostly linear blog + portfolio with light marginalia/backlinks
is recommended over a full digital-garden map. Confirm, or do you want the garden?
Domain — what will it live at?

