# Editorial Ledger Design Language

## Purpose

Use this system for blogs and essays that should feel precise, intelligent, calm, and evidence-led. The visual personality is a **digital research ledger**: high information density, strict structure, and almost no decoration.

It is not tied to a specific menu, subject, or accent color. A long-form article, a research note, a newsletter archive, or a personal essay should all feel related when built from these rules.

## Core idea

**Treat every page as a sheet of paper inside a clear structural frame.**

- White space is intentional, not empty.
- Borders, alignment, type scale, and labels do the visual work.
- Use color to communicate state or emphasis, never to decorate.
- Let the article be the visual focus; interface elements should feel quiet and useful.

## Visual character

| Attribute | Rule |
| --- | --- |
| Mood | Analytical, editorial, calm, slightly severe |
| Surface | Predominantly white or warm off-white |
| Depth | Flat; use thin borders rather than shadows |
| Shape | Mostly square or very slightly rounded corners |
| Density | Compact metadata and navigation; generous reading space |
| Decoration | Abstract signals, dividers, small blocks, and rules—not illustrations by default |

## Typography

Use a two-voice type system.

### Primary reading type: IBM Plex Sans

Use **IBM Plex Sans** for article titles, section headings, summaries, body copy, and button labels when a human, editorial voice is needed.

- Headlines: 600 weight, tight tracking (`-0.04em` to `-0.075em`), line-height `0.9–1.0`.
- Section headings: 600 weight, line-height `0.95–1.05`.
- Body: 400 weight, 17–19px desktop, 16–17px mobile, line-height `1.55–1.7`.
- Avoid overly light weights; the design should remain legible and matter-of-fact.

### Interface type: IBM Plex Mono

Use **IBM Plex Mono** for utility text: navigation, breadcrumbs, labels, section numbers, metadata, captions, table headings, source lists, buttons, and compact calls to action.

- Default utility size: 10–12px.
- Use uppercase sparingly for labels and include modest letter spacing (`0.04em–0.08em`).
- Keep labels short and factual: `ESSAY / 04`, `READING TIME`, `SOURCE LEDGER`.

### Hierarchy

1. The article title should be dramatically larger than everything else.
2. Section headings should feel editorial, not like UI panels.
3. Mono labels establish structure without competing with prose.
4. Body copy should sit in a narrow, comfortable reading column even when the page itself is wide.

## Color system

The default is almost monochrome. Accent colors are **replaceable tokens**, not part of the brand identity.

```css
:root {
  --paper: #ffffff;
  --ink: #111111;
  --muted: #666666;
  --line: #151515;
  --soft: #ecece8;

  /* Choose these per site or per article. */
  --accent: #245cff;
  --alert: #c23a31;
}
```

### Rules

- Use `--paper` for the main page surface.
- Use `--ink` for headings, primary body text, and important borders.
- Use `--muted` for source notes and secondary metadata.
- Use `--soft` for quiet fills, table headers, and low-emphasis dividers.
- Choose **one accent** for active states, section markers, data highlights, and links that need emphasis.
- Choose an optional **alert color** only for uncertainty, caveats, warnings, or explicitly negative status.
- Never use the accent and alert colors as general decoration. Most pages should remain 90–95% monochrome.

### Accent examples

| Tone | Accent | Alert / caveat |
| --- | --- | --- |
| Cobalt | `#245CFF` | `#C23A31` |
| Forest | `#1E6B52` | `#9C3E26` |
| Aubergine | `#663A73` | `#B2443E` |
| Ochre | `#A76A00` | `#9C3E26` |
| Slate | `#46606E` | `#8F3E35` |

## Layout framework

### Outer shell

On desktop, the page is a centered content sheet with left and right 1px borders. It should feel like a contained publication, not a floating marketing landing page.

```css
.site-shell {
  max-width: 1440px;
  margin: 0 auto;
  background: var(--paper);
  border-inline: 1px solid var(--line);
}
```

On mobile, remove the outer rails. Preserve internal rules and spacing.

### Page anatomy

Use this order when it makes sense:

1. Utility header / navigation
2. Breadcrumbs or small context line (optional)
3. Hero: label, title, summary, one action
4. Signal strip or metadata strip (optional)
5. A data, quote, or key-idea module (optional)
6. Main article body with optional desktop index
7. Sources, notes, related reading, or author footer
8. Small utility footer

Not every page needs every module. The shared language comes from the rules, borders, types, and rhythm—not a fixed page template.

### Grid and columns

- Main horizontal padding: `5.5%` desktop; `20px` mobile.
- Hero: wide, almost full-shell title.
- Reading column: max `680–720px` for body copy.
- Desktop article layout: optional `240–280px` index column + reading column.
- Split explanatory sections: one large editorial column and one smaller note column.
- Use grids only when they explain a relationship; never use a card grid just to fill a page.

## Navigation, menus, and breadcrumbs

The navigation may change completely, but it must follow the same utility logic.

### Header

- Height: about `56–60px`.
- Bottom border: `1px solid var(--line)`.
- Wordmark or section name at left in mono, typically uppercase or slash-separated.
- Navigation links are small, plain text—not large pills.
- One quiet outlined control may sit at right: `INDEX`, `MENU`, `SEARCH`, `ARCHIVE`.
- Avoid logos, gradients, oversized icons, or multiple primary buttons.

### Breadcrumbs

Place them immediately below the header or at the top of the hero.

```text
JOURNAL / TECHNOLOGY / AI & CLIMATE
```

- IBM Plex Mono, 10–11px.
- Use slash separators or a simple `→`.
- Keep the current page readable but not emphasized like a headline.
- Do not put breadcrumbs inside rounded pills.

### Alternate menu patterns

These all belong to the system:

- A centered three-link nav.
- A left wordmark + a right `MENU` control.
- A horizontal category ledger below the header.
- A compact table-of-contents rail beside the article.
- A temporary overlay index with 1px border and white background.

For every pattern: retain mono type, hairline rules, white surface, concise labels, and no ornamental icons.

## Components

### Rules and dividers

Rules are the primary organizing device.

- Standard: 1px solid `var(--line)`.
- Quiet internal divider: 1px solid `var(--soft)`.
- Use full-width horizontal rules between major systems.
- Use vertical rules only when a column needs to feel structurally separate.

### Cards

Cards are evidence containers, not decorative tiles.

```css
.ledger-card {
  background: var(--paper);
  border: 1px solid var(--line);
  border-radius: 0;
  padding: 16px 18px;
}
```

- Keep cards slim and purposeful.
- Default to square corners. If the project needs softness, use no more than `8px` radius consistently.
- No drop shadows.
- A card should contain one idea: a data point, caveat, quote, source, or action.
- Avoid stacking cards inside cards.

### Data strips and comparison tables

Use tables, rows, bars, or simple sequences of squares to make relationships immediately legible.

- Use a bordered outer frame.
- Use 1px row dividers.
- Set labels and units in mono.
- Align numerical values to the right.
- Use the accent color for the selected or focal value; use alert only for a genuine warning/caveat.
- Prefer abstract bars over elaborate charts.

### Status markers

- Small circle: 7–8px diameter.
- Accent dot = active, selected, current, validated, or key idea.
- Alert dot = uncertainty, risk, incomplete evidence, or anomaly.
- Pair every dot with text; do not rely on color alone.

### Buttons and links

- Primary action: solid black fill, white mono text.
- Secondary action: white fill, 1px black border, black mono text.
- Links are generally plain text with no permanent underline; add underline on hover or focus.
- Use arrows sparingly as a directional cue: `READ ESSAY ↓`, `NEXT NOTE →`.

### Quotes and notes

- Quote: mono type, soft gray background, strong left border in the accent color.
- Caveat/note: thin black border, normal sans body text, compact mono label if needed.
- Keep the language direct and attributable.

## Spacing rhythm

Use intentional contrast: tight inside a module; generous between modules.

| Situation | Recommended spacing |
| --- | --- |
| Header interior | 16–22px |
| Label to title | 18–24px |
| Title to summary | 28–42px |
| Paragraphs | 18–24px |
| Between article sections | 70–100px desktop; 56–72px mobile |
| Inside cards | 16–20px |
| Major section padding | 64–105px desktop; 54–72px mobile |

## Responsive behavior

- Desktop rails and side indexes can disappear on small screens.
- Preserve the hierarchy; do not merely shrink desktop proportions.
- Turn multi-column data strips into stacked rows.
- Tables may become two-column rows, with a full-width bar or note below.
- Keep page padding at 20px on small screens.
- Mobile titles can remain bold and compact, but must not become unreadable; use `clamp()` rather than separate arbitrary sizes.
- Touch controls need a comfortable target even if their visual design stays small.

## Accessibility and interaction

- Keep body text at a readable size and contrast.
- Never encode meaning with color alone; pair markers with labels.
- Buttons must look and behave like buttons.
- Use visible keyboard focus states, ideally an outline in `--accent`.
- Do not hide essential reading navigation behind hover.
- External links should be identifiable in context.
- Motion should be minimal: small color, underline, or opacity transitions only. No parallax or large entrance animations.

## Content and UX principles

- Lead with a provocative or clear editorial claim, then immediately state what the page helps the reader understand.
- Give readers a fast orientation through labels, numbered sections, a source count, or a contents rail.
- Make evidence scannable: comparisons, definitions, caveats, and sources deserve their own structured treatment.
- Keep actions few. An essay generally needs one primary path: read, continue, view sources, or return to index.
- Let long-form reading stay uninterrupted. Place interactive modules between sections, not inside every paragraph.
- Be transparent about uncertainty; a clearly labeled caveat is a feature, not clutter.

## Avoid

- Large gradients, atmospheric photography, glass effects, or glossy dashboard styling.
- Heavy shadows, floating cards, or excessive rounded pills.
- More than one primary accent color and one optional alert color.
- Decorative icon sets when a text label is clearer.
- Center-aligned body copy.
- Generic marketing phrases or oversized call-to-action blocks inside an essay.
- Dense visual charts when a simple table or bar answers the question.
- Treating every paragraph as a card.

## Implementation checklist

Before shipping a new blog page, check:

- [ ] The page remains mostly white/monochrome.
- [ ] IBM Plex Sans carries reading; IBM Plex Mono carries structure.
- [ ] Important containers are separated with 1px rules, not shadows.
- [ ] Accent colors are meaningful and easily replaceable.
- [ ] Navigation or breadcrumbs feel like compact editorial metadata.
- [ ] The hero establishes a strong reading hierarchy.
- [ ] The article column is comfortable to read.
- [ ] Cards are slim and functional.
- [ ] Data, sources, and caveats use structured modules.
- [ ] Mobile preserves the system rather than simply shrinking it.

