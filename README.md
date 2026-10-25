# AWCT · TunnelLab

Bilingual English/Persian static research hub added as `index.html` to the repository root.

## Experiments
- `awct-pouramin` — personal homepage, Codex
- `awct-nike` — shoes catalog, Codex
- `awct-apple` — iPhone 18 Pro, Codex
- `AWCT-Apple-Claude` — iPhone 18 Pro, Claude Code

The research hub is plain HTML/CSS/JS; no build process, server, npm install or credentials are required. For the intended `pouramin.dev/AWCT/` path, the host must actually route that path to this static site. A GitHub repository alone does not configure a separate Cloudflare domain's URL path.

The repository includes `.github/workflows/awct-site.yml`. To activate deployment, go to **Settings → Pages → Build and deployment → Source → GitHub Actions**. Then open **Actions → Publish AWCT research website → Run workflow**. The workflow uploads only `index.html` and `.nojekyll`, not the copyrighted clone archives. The first run on October 25, 2026 failed at Configure Pages because GitHub Pages had not been enabled. Verify whether `pouramin.dev` is routed through GitHub Pages or Cloudflare before changing custom-domain settings. **Do not** add a `CNAME` claiming the domain without confirming the existing setup.

The site reads prompt markdown from the existing versioned files and uses existing research screenshots. No imaginary visual similarity percentages are presented. Claude's raw screenshots are not individually labeled by tab, so a fake before/after pairing is intentionally avoided.

**Rights:** The existing archived experiments include third-party copyrighted assets (including Apple and Nike material). Publishing code does not grant redistribution rights. Treat this research as commentary/education and review external assets separately.

