# Local Apple iPhone 18 Pro recreation

Preview: http://127.0.0.1:3002/iphone-18-pro/

The app is independent of the existing root portfolio and Nike app. Edit the React components and CSS under `src/components/sites/apple/`; `source.json`, `menus.json`, `footer.json` and `navigation.json` hold extracted source content. `i18n.ts` contains the requested local Persian UI translations. Static assets are in `public/sites/apple/`.

Use the repository-local Node.js runtime through `../../scripts/apple.ps1 dev` or `../../scripts/apple.ps1 check` from the repository root as `scripts/apple.ps1 dev` / `scripts/apple.ps1 check`. The script resolves its own root. Development uses port 3002 and `.next-dev`; production builds use `.next`.

See `../../docs/research/apple/README.md` for the route map, source evidence, validation, corrections and remaining differences. No deployment is configured or requested.
