[collaborating]: https://docs.github.com/en/pull-requests/collaborating-with-pull-requests
[jekyll]: https://jekyllrb.com/
[bundler]: https://bundler.io/
[gem-download]: https://rubygems.org/pages/download
[github-pages]: https://pages.github.com/versions/

# WordPress Security Checklist

Static site and printable checklist for hardening WordPress—built with [Jekyll][jekyll], aligned with the [GitHub Pages][github-pages] stack (`github-pages` gem). Live site: **https://wpsecuritychecklist.org**

---

## Sobre (pt-BR)

Lista de ações para melhorar a segurança da sua instalação WordPress. O site é gerado com Jekyll e publicado no GitHub Pages. Para rodar localmente: `bundle install` e `bundle exec jekyll serve`. Conteúdo do checklist nos arquivos `items*.md`; textos da interface em `_data/strings.yml`.

---

## Repository layout

| Area | Location |
|------|-----------|
| Checklist (EN / pt / es / ja) | `items.md`, `items.br.md`, `items.es.md`, `items.ja.md` |
| UI strings (nav, hero, blog labels, …) | `_data/strings.yml` |
| English homepage (`/`) | `root-index.html` (permalink `/`, includes `home.html`) |
| Localized homepages | `br/index.html`, `es/index.html`, `ja/index.html` |
| Blog posts | `_posts/` — set `language: en` (or `br`, `es`, `ja`) in front matter |
| Layouts & includes | `_layouts/`, `_includes/` |
| Styles | `css/main.scss` → `_sass/` |
| Scripts | `js/script.js` (checklist checkboxes, theme toggle) |
| Site config | `_config.yml` (`languages`, `checklist_last_updated`, …) |
| Generated checklist data | `scripts/sync-checklist-schema.py` → `_data/checklist_schema.yml`, skill `references/checklist.md` |
| AI agent skill | `skills/wordpress-security-checklist/` (not published on the site), Claude Code marketplace in `.claude-plugin/marketplace.json` |

Locales are listed in `_config.yml` under `languages` and must stay in sync with `strings.yml` and the `items.*` / index files you care about.

---

## AI agent skill

The checklist is also available as an [Agent Skill](https://agentskills.io) for AI coding agents such as Claude Code and Codex. The skill has two modes:

- **Audit:** inspects a WordPress install (files, WP-CLI, and optionally a public URL you are authorized to test) and reports each checklist item as pass, fail, review, unknown, or manual, with evidence and fixes. Audits are read-only and non-intrusive.
- **Guide:** explains items and walks you through hardening your site, in English, Portuguese, Spanish, or Japanese.

### Install

You don't need to clone this repository. Pick one of these options:

**Any agent (Claude Code, Codex, Cursor, and others)** with the [`skills` CLI](https://github.com/vercel-labs/skills) (requires Node.js):

```bash
# Current project
npx skills add RafaelFunchal/wordpress-security-checklist

# All projects
npx skills add RafaelFunchal/wordpress-security-checklist -g
```

**Claude Code plugin**, which you can update with `/plugin update`:

```
/plugin install wordpress-security-checklist --marketplace RafaelFunchal/wordpress-security-checklist
```

On Claude Code versions before 2.1.275, run `/plugin marketplace add RafaelFunchal/wordpress-security-checklist` first, then `/plugin install wordpress-security-checklist@wordpress-security-checklist`.

**Without Node.js or git**, download only the skill folder:

```bash
# Claude Code: ~/.claude/skills   Codex: ~/.agents/skills
SKILLS_DIR=~/.claude/skills
mkdir -p "$SKILLS_DIR"
curl -sL https://codeload.github.com/RafaelFunchal/wordpress-security-checklist/tar.gz/main \
  | tar -xz -C "$SKILLS_DIR" --strip-components=2 \
    wordpress-security-checklist-main/skills/wordpress-security-checklist
```

Run the same command again to update.

### Use

Ask your agent, for example:

- "Audit this WordPress site against the security checklist."
- "Check https://example.com for the checklist items you can verify remotely. I own the site."
- "What does the XML-RPC item mean, and should I disable it?"
- "Me ajude a aplicar o checklist de segurança no meu site WordPress."

---

## Requirements

- **Ruby 3.1+** (GitHub Pages currently uses **3.3.4**; see [.ruby-version](.ruby-version) and [Pages dependency versions](https://pages.github.com/versions.json))
- RubyGems ([install RubyGems][gem-download] if needed)
- Bundler 2.x: `gem install bundler` (once per machine, if `bundle` is missing)

Jekyll is pulled in via the `github-pages` gem—**use [Bundler][bundler]** with the committed `Gemfile.lock` so local builds match production.

---

## Local preview

```bash
git clone https://github.com/rafaelfunchal/wordpress-security-checklist.git
cd wordpress-security-checklist
bundle install
bundle exec jekyll serve
```

Open the URL Jekyll prints (usually `http://localhost:4000`). Edit files; the server reloads on change.

Build only (writes to `_site/`):

```bash
bundle exec jekyll build
```

---

## Contributing

1. Fork the repository and create a branch for your change.
2. **Checklist wording or new items:** edit the appropriate `items*.md` (keep the same structure: headings, `<label><input type="checkbox" data-item-id="…" />…</label>` lines). Every locale must have the same item IDs in the same order. Then run `python3 scripts/sync-checklist-schema.py`, which regenerates the checklist data and fails if the locales differ. When you add an item, also add its audit entry to `skills/wordpress-security-checklist/references/checks.md`; the script fails until you do.
3. **Translations / UI copy:** update `_data/strings.yml` for the matching `code` (`en`, `br`, `es`, `ja`).
4. **Layout or styling:** `_layouts/`, `_includes/`, `_sass/`, or `css/main.scss`.
5. Open a **Pull Request** when ready.

More on collaboration: [GitHub Docs — Pull requests][collaborating].

---

## License

See [LICENSE](LICENSE) (GNU GPL v2).
