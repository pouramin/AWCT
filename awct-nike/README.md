# AWCT — Nike portable experiment

Exported from the complete original workspace. Source implementation files and local site assets are byte-for-byte copies. The original workspace was not changed.

## Requirements and launch

Use Node.js **24.22.1** and its bundled npm, the runtime used successfully for these experiments. The original Windows setup encountered failures with Node.js 26.8.2. Node and dependencies are not bundled.

Extract the whole folder, open a terminal inside it, then:

~~~sh
npm ci
npm run dev
~~~

Open http://127.0.0.1:3001/w/mens-shoes-nik1zy7ok . Routes: /, /w/mens-shoes-nik1zy7ok.

Production and validation:

~~~sh
npm run check
npm start
~~~

The check script runs ESLint, TypeScript and a production build. npm run build builds alone; npm run typecheck checks TypeScript. Initial installation requires internet. No secrets or environment variables are required for the local clone.

On Windows, ./launch.ps1 installs dependencies and launches development with project-local cache/temp settings. ./launch.ps1 -Action check installs and validates instead. Install Node.js 24.22.1 on PATH first. npm scripts also work on other supported operating systems.

## Contents

- src/: actual application and site components, unchanged.
- public/sites/nike/: local site assets, unchanged.
- docs/research/nike/: available research and comparison screenshots.
- experiment/original-prompts.md: available original user prompts.
- experiment/execution-notes.md: selected original user-visible execution notes.
- experiment/original-config/: original configuration evidence.
- experiment/cloning-workflow/: canonical cloning skill and supporting references.
- experiment/original-scripts/ and experiment/reference-inputs/: historical helpers and available extraction inputs, where applicable.
- EXPORT-VERIFICATION.json and FILE-MANIFEST.json: checks and SHA-256 inventory.

## Standalone export configuration

The app is flattened into this directory. The active package manifest and lockfile include the complete locked base template dependencies/toolchain, plus Apple's original locked hls.js where needed. This compatible superset avoids dependencies on an ancestor node_modules; it is not a minimized dependency set.

The exported next.config.ts traces only this directory and separates .next-dev from .next. npm scripts assign port 3001 and use webpack. tsconfig.json covers only this app. A hand-authored next-env.d.ts supplies type references before first launch. The original template's standalone deployment output setting is not carried over; npm start serves the local build. Original configs are archived. Implementation files were not edited.

Historical scripts are evidence, not setup commands: they retain original apps/... and temp/... path assumptions and require adaptation in a separate working copy. Optional screenshot comparison scripts require sharp. Python extraction helpers require BeautifulSoup4. None are needed to launch the clone. Available Apple extraction inputs are preserved under experiment/reference-inputs rather than copying temporary caches.

## Exclusions and privacy

No .git, node_modules, Next.js outputs, caches, environment files, runtime binaries, private settings or nested ZIPs are included. Machine-specific workspace paths in evidence were redacted. Public source website identities/links/content remain intentional. Screenshots are website research/comparison captures. Any redacted evidence is recorded in the export report.

## Limitations

A finite captured catalog; live inventory, stock, accounts, checkout and backend-dependent filters remain on Nike. Persian translation is partial.

Research and execution notes describe historical validation. EXPORT-VERIFICATION.json distinguishes new packaging checks. Public brand assets remain subject to their original rights; the export does not grant redistribution rights.
