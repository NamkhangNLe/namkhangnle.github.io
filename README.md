# Namkhang Le - Personal Portfolio

A React/Vite portfolio redesigned as an engineering notebook: grid-paper canvas, cobalt accents, bundled typography and a readable single-page layout.

## Features
- Work experience accordion with accessible expanded states.
- Project category filters.
- Searchable writing and full posts with shareable `?post=<id>` links and browser-back support.
- Existing resume, LinkedIn, GitHub and email links.

Experience, project descriptions and posts are preserved from the existing owner source. The redesign does not independently verify those claims. Existing public assets and event pages are preserved.

## Run locally
Use Node 20.19+ or 22.12+, as required by the Vite 7 toolchain.

```bash
npm ci
npm run dev
npm run build
npx eslint src
```

Fonts are bundled through @fontsource-variable (Instrument Sans, JetBrains Mono and Space Grotesk), licensed OFL-1.1. No build-time Google Fonts request is needed.

## Verification and limits
Production build and redesigned-source lint pass. Headless Chrome checks at 1440px and 390px cover overflow after fonts load, experience accordion open/close, project filters, post search/empty state, post open/back and invalid deep-link fallback. Desktop/mobile screenshots and the detailed test plan are embedded in the redesign PR.

Full `npm run lint` still finds inherited errors in unchanged `_legacy_backup/uikit*.js` (24 errors, 1 warning). Dependency audit findings are not fixed by this design change. Safari, real mobile devices and the deployed site after merge are not tested.

The existing `.github/workflows/deploy.yml` deploys on pushes to main. Opening this PR does not merge or deploy it; merging main would trigger that workflow. Review that consequence before merging.

## Contact
- [LinkedIn](https://linkedin.com/in/namkhangnle)
- [GitHub](https://github.com/namkhangnle)
- NamkhangNLe@hotmail.com
