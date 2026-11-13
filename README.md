# Namkhang's personal desktop

A React/Vite portfolio that keeps the original personal-computer idea: a desktop, overlapping windows, a Dock and a typed Messages introduction. The earlier notebook candidate is superseded by this desktop revision.

## Run

Use Node 22 or newer. `npm ci`, then `npm run dev`. `npm run build` creates production output; `npm run preview` serves it locally.

## Apps and controls

- Messages: a clearly labeled prerecorded introduction and an email-draft composer. It opens your email client; it neither sends a message nor pretends Namkhang is online.
- Finder: project folders and a quick-look preview using existing owner-maintained project data. The clinical-impact numbers have been removed with owner confirmation.
- Work: the existing experience content, with the owner-confirmed NYC location.
- Writing: search and the full reader. `?post=<id>` links open Writing directly; browser Back restores the prior reader state.
- Desktop: drag a window's title button, or focus it and use arrow keys. Traffic-light controls close, minimize and maximize/restore. The Dock reopens minimized apps. Mobile shows the active app full-width, with the same Dock and controls.
- Window positions/open state last only for the current page session. They are not saved to an account or restored after reload. Closing an app clears its local UI state.

The desktop wallpaper is authored CSS/SVG texture, not a fetched image. Fonts are bundled through the existing OFL-licensed Fontsource packages. Existing project descriptions are owner-maintained source, not new verification of performance or endorsements.

## Tests

First run `npm run test:setup` to install the isolated browser-test dependencies and Chromium. If you already have Chrome, use `CHROME_PATH=/path/to/chrome npm run test:e2e` instead. Linux may need the OS packages documented by Playwright.

`npm run test:e2e` builds and serves the production app, then checks typed/reduced-motion introduction, project folders, pointer/keyboard movement, maximize/restore, minimize/reopen, close, direct post links/Back, mobile app switching and email-draft UI. Screenshots go under `tests/test-results/`.

`npx eslint src` checks active source. Full repository lint still reports inherited `_legacy_backup/uikit*.js` errors. Existing dependency audit findings are not remediated here. Tests use Chrome, not physical phones, Safari, Firefox or screen readers. Email-client dispatch and external project/contact destinations are not exercised.

## Deployment boundary

Merging the PR into main triggers the existing Pages workflow. This work only updates an unmerged PR branch: no merge, deployment, settings change or spending. The desktop revision restores the original hook; it is not proof of startup readiness, demand or a SOTA rating.
