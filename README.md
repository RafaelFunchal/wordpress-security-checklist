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

Locales are listed in `_config.yml` under `languages` and must stay in sync with `strings.yml` and the `items.*` / index files you care about.

---

## Requirements

- Ruby and RubyGems ([install RubyGems][gem-download] if needed)
- Bundler: `gem install bundler` (once per machine)

Jekyll is pulled in via the `github-pages` gem—**use [Bundler][bundler]** so your local versions match Pages.

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
2. **Checklist wording or new items:** edit the appropriate `items*.md` (keep the same structure: headings, `<label><input type="checkbox" />…</label>` lines).
3. **Translations / UI copy:** update `_data/strings.yml` for the matching `code` (`en`, `br`, `es`, `ja`).
4. **Layout or styling:** `_layouts/`, `_includes/`, `_sass/`, or `css/main.scss`.
5. Open a **Pull Request** when ready.

More on collaboration: [GitHub Docs — Pull requests][collaborating].

---

## License

See [LICENSE](LICENSE) (GNU GPL v2).
