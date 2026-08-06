# Portfolio — naguib.sys

Personal portfolio for **Ahmed Mohamed Naguib**, backend engineer.

The site is built around the idea that a backend engineer's portfolio should read like a
system: a live service-topology background, an interactive diagram of a real throughput
problem I solved at work, and project cards that pull their own metadata from the GitHub API.

**Stack:** hand-written HTML, CSS and JavaScript. No framework, no build step, no bundler —
three files and a photo.

## Features

- **Service-topology hero** — a canvas graph of nodes and packets, paused when off-screen or when the tab is hidden.
- **Command palette** — `⌘K` / `Ctrl+K` (or `/`) to jump to any section, project, or contact link.
- **Interactive case study** — toggle *Before* / *After* on the video-heartbeat pipeline to see the write path change.
- **Live GitHub data** — repo count, language and last-push time are fetched at runtime and degrade silently if the API is unavailable.
- **Light and dark themes** — remembered in `localStorage`, defaults to the OS preference.
- **Accessible** — semantic landmarks, skip link, visible focus rings, and a full `prefers-reduced-motion` path that disables the canvas, typing and reveal animations.
- **Print stylesheet** — the page prints as a clean document.

## Files

| File | Purpose |
|------|---------|
| `index.html` | All content and the inline SVG icon sprite |
| `style.css` | Design tokens, components, responsive and reduced-motion rules |
| `script.js` | Boot sequence, canvas, palette, filters, GitHub fetch |
| `images/` | Portrait |
| `resume.tex` | LaTeX source for the CV |
| `aboutme.md` | GitHub profile README source |

## Running locally

Any static server works:

```bash
python -m http.server 8000
# then open http://localhost:8000
```

## Contact

[Email](mailto:amnoe20052007@gmail.com) · [LinkedIn](https://www.linkedin.com/in/ahmed-naguib-075415328/) · [GitHub](https://github.com/AhmedNaguib01)
