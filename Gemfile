source 'https://rubygems.org'

# Local builds only: GitHub Pages ignores this file and builds with its own
# pinned versions (https://pages.github.com/versions.json).
#
# These versions mirror github-pages 232 exactly, but we list them
# individually instead of using the `github-pages` meta-gem so we can leave
# out jekyll-remote-theme. That gem pins rubyzip < 3.0, which has a
# path-traversal vulnerability (fixed in rubyzip 3.4.0). This site does not
# use `remote_theme`, so the gem is not needed.
#
# When GitHub Pages bumps its versions, update these to match.
gem 'jekyll', '3.10.0'
gem 'kramdown', '2.4.0'
gem 'kramdown-parser-gfm', '1.1.0'
gem 'liquid', '4.0.4'
gem 'rouge', '3.30.0'
gem 'jekyll-commonmark-ghpages', '0.5.1'
gem 'jekyll-sass-converter', '1.5.2'
gem 'jemoji', '0.13.0'

group :jekyll_plugins do
  # GitHub Pages default plugins (always enabled in production).
  gem 'jekyll-coffeescript', '1.2.2'
  gem 'jekyll-default-layout', '0.1.5'
  gem 'jekyll-gist', '1.5.0'
  gem 'jekyll-github-metadata', '2.16.1'
  gem 'jekyll-optional-front-matter', '0.3.2'
  gem 'jekyll-paginate', '1.1.0'
  gem 'jekyll-readme-index', '0.3.0'
  gem 'jekyll-relative-links', '0.6.1'
  gem 'jekyll-titles-from-headings', '0.5.3'
end

gem 'webrick', '~> 1.8'
