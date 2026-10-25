# Prompts (verbatim)

These are the user prompts given in the Claude Code session (Claude desktop app, Code tab, model
Claude Opus 5.5). Nothing else was supplied by the user. Tool calls and intermediate
assistant messages are not reproduced here; see EXECUTION-NOTES.md for a summary.

## Prompt 1 — build the clone (2026-10-25)

```
/clone-website https://www.apple.com/iphone-18-pro

Use the repository's official clone-website skill.

Use the built-in Browser to inspect the original site visually, including desktop and mobile layouts.

Requirements:
1. Recreate the actual layout, typography, colors, assets, and content.
2. Reproduce visible menus, buttons, navigation, and language switching.
3. Inspect interactions before implementing them.
4. Preserve proper Persian RTL and English LTR layouts.
5. Create editable, maintainable code.
6. Do not replace the implementation with screenshots.
7. Do not invent backend functionality.
8. Start the local preview and inspect it using Browser.
9. Compare the original and clone at identical viewport sizes.
10. Fix major differences and test interactions.
11. Run the project's validation checks.

Do not publish or deploy the clone.

Report what was successfully reproduced, what failed, and what required manual correction.

Complete the work through the graphical application. Execute technical commands internally without asking me to use a terminal.
```

## Prompt 2 — create this archive (2026-10-25)

```
Create a complete, clean, and portable archive of the Apple iPhone 18 Pro website cloning experiment.

This package will be used for an independent comparison between Claude Code and OpenAI Codex in the TunnelLab AWCT project.

IMPORTANT:
- Preserve the existing project exactly as it is.
- Do not modify, delete, or move original files.
- Do not redesign or improve the clone.
- Do not deploy or publish anything.

PACKAGE CONTENTS:

1. Complete source code of the Apple website clone.
2. All required components, styles, and configuration files.
3. All locally stored images, fonts, videos, SVGs, and other assets.
4. Package manifests and dependency lockfiles.
5. Research notes and asset mappings.
6. Original website inspection screenshots, if available.
7. Local clone screenshots, if available.
8. Original prompts and execution notes, if available. Do not fabricate missing conversation history.
9. A README.md explaining:
   - Project structure
   - Installation requirements
   - How to run the clone locally
   - Original Apple URL
   - Implemented interactions
   - Known limitations
   - External dependencies

CLEANUP RULES:
- Exclude node_modules.
- Exclude .next and generated build outputs.
- Exclude temporary files and caches.
- Exclude credentials, tokens, and private data.
- Preserve all files necessary to reconstruct the clone.

VALIDATION:
- Verify that all required source files exist.
- Check local asset references.
- Verify that the project can be installed and built independently, if possible.
- Identify any dependencies on the original workspace.
- Do not modify source code to fix issues during packaging.

OUTPUT:
- Create a ZIP named AWCT-Apple-Claude.zip.
- Save it outside the original project folder.
- Provide the full ZIP file path.
- Report the final archive size.
- List any missing files or portability limitations.

This is a private research archive. Do not push it to GitHub or distribute copyrighted Apple assets publicly.
```
