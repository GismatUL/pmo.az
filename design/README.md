# Design

- **Figma file:** [PMO.az redesign](https://www.figma.com/design/v7Aezfjo53lVmfoZdo7XB4/Untitled?node-id=0-1)
- **`figma-make-export/`** — the original Figma Make code export, kept as a
  reference only. The production frontend is `../frontend`, rebuilt from the
  Figma frames.

## Frames → routes

| Figma frame (desktop / mobile) | Node ids | Route |
| --- | --- | --- |
| PMO.az • Desktop / Mobile | 10:2 / 10:12 | `/` |
| Programs | 16:316 / 16:361 | `/programs` |
| Services | 16:142 / 16:188 | `/services` |
| Service detail | 16:568 / 16:615 | `/services/[slug]` |
| About | 16:228 / 16:275 | `/about` |
| Blog | 16:400 / 16:445 | `/blog` |
| Blog detail | 16:484 / 16:529 | `/blog/[slug]` |
| Contact | 16:56 / 16:102 | `/contact` |
| PMO.az • Foundations | 10:89 | tokens in `frontend/src/styles/base.css` |

## Foundations

| Token | Value | Use |
| --- | --- | --- |
| green | `#103E34` | primary surfaces, buttons |
| deep | `#0A2D26` | footer |
| lime | `#D4EF78` | accent, primary button, CTA bands |
| cream | `#F6F6EF` | page background |
| ink | `#153C33` | text on light |
| muted | `#64736C` | secondary text |
| line | `#DAE0D7` | dividers, card borders |

Type: Inter 400/500/600. Inner pages use the *PMO / Display 64, Heading 1 44,
Heading 2 32, Body 16, Label 14* styles at line-height 1.3; on mobile Display
→ 44 and Heading 1 → 32.
