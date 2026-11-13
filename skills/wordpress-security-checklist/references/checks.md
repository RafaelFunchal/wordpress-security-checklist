# Checks for each checklist item

Each entry is keyed by the item ID from `checklist.md`. Entries use these labels:

- **Why:** the risk the item reduces. Use it when explaining the item.
- **Check:** how to verify it. **Files** means inspect the WordPress files, **WP-CLI** means run `wp` commands, **HTTP** means send `GET` or `HEAD` requests to a public URL the user is authorized to test, and **Manual** means only the user can confirm it.
- **Fix:** how to meet the item.

All checks are read-only. Follow the safety rules in `SKILL.md`, especially: never print secret values, and validate `<domain>` before using it in a command (a plain hostname, optionally with `:port`). Keep URLs single-quoted and passed with `--url`, as in the examples.

`scripts/sync-checklist-schema.py` in the website repository fails if this file and `checklist.md` list different IDs. When you add an item to the checklist, add its entry here too.

## wp-config

### wsc-wpconfig-secret-keys

- **Why:** The keys and salts sign login cookies and nonces. Default, empty, or leaked values let attackers forge sessions.
- **Check:** Files: in `wp-config.php`, confirm that all eight constants are defined: `AUTH_KEY`, `SECURE_AUTH_KEY`, `LOGGED_IN_KEY`, `NONCE_KEY`, `AUTH_SALT`, `SECURE_AUTH_SALT`, `LOGGED_IN_SALT`, and `NONCE_SALT`. Each value must be long (64 characters is standard), unique, and not `put your unique phrase here`. Report only the length and whether the value is the default; never print the values. If the keys are missing from the file, WordPress stores generated values in the database, which is acceptable but should be reported as ⚠️ Review.
- **Fix:** Generate new values with https://api.wordpress.org/secret-key/1.1/salt/ or run `wp config shuffle-salts`. This logs out every user, so plan it. Rotate them again after any suspected compromise.

### wsc-wpconfig-disallow-file-edit

- **Why:** The built-in theme and plugin editor lets anyone with an administrator session write PHP to the server, turning a stolen login into code execution.
- **Check:** Files: look for `define( 'DISALLOW_FILE_EDIT', true );` in `wp-config.php`. `DISALLOW_FILE_MODS` set to `true` also disables the editor. WP-CLI: `wp config get DISALLOW_FILE_EDIT`.
- **Fix:** Add `define( 'DISALLOW_FILE_EDIT', true );` to `wp-config.php` above the line `/* That's all, stop editing! */`.

### wsc-wpconfig-force-ssl-admin

- **Why:** Without HTTPS, login credentials and admin session cookies can be intercepted.
- **Check:** Files: look for `define( 'FORCE_SSL_ADMIN', true );`. WP-CLI: `wp option get siteurl` and `wp option get home` should start with `https://`. HTTP: `curl -sI --url 'http://<domain>/wp-login.php'` should redirect to `https://`. If the site is fully HTTPS and redirects all HTTP traffic, report ✅ Pass even without the constant.
- **Fix:** Enable HTTPS with the host (most offer free certificates), set the site URLs to `https://`, and add `define( 'FORCE_SSL_ADMIN', true );`.

### wsc-wpconfig-wp-debug-off

- **Why:** Debug output exposes file paths, queries, and plugin internals. A public `debug.log` can leak personal data and secrets.
- **Check:** Files: in `wp-config.php`, `WP_DEBUG` should be `false` or undefined in production. If it is `true`, `WP_DEBUG_DISPLAY` must be `false`, and `WP_DEBUG_LOG` should point outside the web root. Also look for a `wp-content/debug.log` file. HTTP: `curl -sI --url 'https://<domain>/wp-content/debug.log'` must not return `200`. Only report this item for production; on local or staging sites, mark it ⚠️ Review with a note.
- **Fix:** Set `define( 'WP_DEBUG', false );` in production. If you need logs, set `WP_DEBUG_DISPLAY` to `false`, write the log outside the web root, and delete any public `debug.log`.

## Login Page

### wsc-login-brute-rate-limit

- **Why:** Automated password guessing against `wp-login.php` and XML-RPC is constant on the public internet.
- **Check:** WP-CLI: `wp plugin list --status=active` and look for a login protection plugin, such as Wordfence, Limit Login Attempts Reloaded, Jetpack (Brute Force Protection), Solid Security, All-In-One Security, or Loginizer. HTTP: response headers can reveal a web application firewall (WAF) that rate-limits logins (see `wsc-hosting-waf-cdn`). Otherwise, mark 📝 Manual and ask whether the host or server (for example, fail2ban) limits logins. Never test this by sending login attempts.
- **Fix:** Enable a login rate-limiting plugin, the host's brute-force protection, or WAF rules for `wp-login.php` and `xmlrpc.php`.

### wsc-login-mfa-admins

- **Why:** Multi-factor authentication stops most account takeovers that start with a stolen or reused password.
- **Check:** WP-CLI: look for an active two-factor plugin (Two Factor, Wordfence Login Security, WP 2FA, Solid Security, miniOrange) or single sign-on (SSO) that enforces two-factor at the identity provider. With the Two Factor plugin, run `wp user list --role=administrator --field=ID`, then `wp user meta get <ID> _two_factor_enabled_providers` for each ID. Any administrator without a provider is ❌ Fail. For other plugins, mark ⚠️ Review and ask the user to confirm enrollment in the plugin's settings.
- **Fix:** Install a two-factor plugin, require it for administrators (and ideally editors), and prefer passkeys or WebAuthn security keys, with authenticator-app codes (TOTP) as a fallback.

### wsc-login-unique-usernames

- **Why:** Predictable usernames such as `admin` give password-guessing attacks half of the credentials. Shared accounts make it impossible to trace or revoke one person's access.
- **Check:** WP-CLI: `wp user list --role=administrator --fields=ID,user_login,user_email,display_name`. Mark ❌ Fail if any login is `admin`, `administrator`, `root`, `test`, `user`, or the site or domain name. Mark ⚠️ Review for generic shared addresses such as `info@` or `webmaster@`. Mask other email addresses in the report.
- **Fix:** Create a new administrator with a unique username, sign in as that user, then delete the old account with `wp user delete <old-ID> --reassign=<new-ID>` so its content is kept.

### wsc-login-remove-theme-links

- **Why:** Login and admin links in the public theme advertise the login page to bots and visitors who do not need it.
- **Check:** Files: in the active theme (`wp theme list --status=active` or `wp option get stylesheet`), search for `wp_login_url`, `wp_loginout`, `wp_register`, `wp_meta`, `wp-login.php`, and links to `wp-admin`. WP-CLI: `wp widget list <sidebar-id>` for a `meta` widget, and look for the `core/loginout` block in block widgets or templates. Ignore links shown only to logged-in users.
- **Fix:** Remove the Meta widget, the Login/out block, and hard-coded login links from templates. If members need a login link, keep it on a dedicated page.

### wsc-login-strong-passwords

- **Why:** Weak or reused passwords are the most common way into WordPress accounts.
- **Check:** Manual. WordPress stores only password hashes. Never try to crack, guess, or test passwords. Ask whether every account uses a unique, password manager-generated password.
- **Fix:** Use a password manager. Force a reset for accounts that may have weak or reused passwords, and require two-factor for privileged roles.

### wsc-login-revoke-sessions-rotate

- **Why:** Sessions and credentials of former team members, or ones exposed during an incident, stay valid until revoked.
- **Check:** WP-CLI: `wp user session list <user>` for administrators shows active sessions and their age. Otherwise, mark 📝 Manual: ask whether there is a process to revoke access when people leave or after an incident.
- **Fix:** After an incident or team change, run `wp user session destroy <user> --all` (or `--all` for every user), reset the affected passwords, rotate the salts (`wsc-wpconfig-secret-keys`), and rotate any API keys or application passwords.

### wsc-login-generic-errors

- **Why:** By default, WordPress says whether the username or the password was wrong, which confirms valid usernames to attackers.
- **Check:** Files: search the active theme, `wp-content/mu-plugins`, and custom plugins for `add_filter( 'login_errors'`. A security plugin setting that hides login errors also counts. Never test this by attempting logins. If nothing is found, mark ⚠️ Review.
- **Fix:** Add a must-use plugin with `add_filter( 'login_errors', function () { return __( 'Invalid username or password.' ); } );`, or enable the equivalent security plugin setting.

## Administrative Panel

### wsc-admin-wpadmin-password

- **Why:** A second password at the web server blocks bots and stolen sessions from reaching the admin area.
- **Check:** Files: look for HTTP authentication (`AuthType Basic`) in `wp-admin/.htaccess`, or for `auth_basic` in the nginx configuration if it is accessible. HTTP: `curl -sI --url 'https://<domain>/wp-admin/'` returning `401` means it is protected. A redirect to `wp-login.php` means it is not. Many managed hosts do not support this; mark ⚠️ Review there instead of ❌ Fail.
- **Fix:** Add HTTP authentication to `/wp-admin/`, but keep `admin-ajax.php` (and any assets the front end uses) accessible, or the public site breaks. The checklist links an example configuration for this.

### wsc-admin-core-plugins-updated

- **Why:** Most WordPress compromises exploit known vulnerabilities in outdated plugins, themes, or core.
- **Check:** WP-CLI: `wp core check-update`, `wp plugin list --update=available`, `wp theme list --update=available`, and `wp plugin auto-updates status --all`. Files only: read `$wp_version` from `wp-includes/version.php` and the `Version:` header of each plugin and theme, and compare them with the latest releases on WordPress.org. Any pending security release is ❌ Fail.
- **Fix:** Update everything (after a backup, and on staging first for large sites). Enable automatic updates for minor core releases and for plugins with a good update track record.

### wsc-admin-least-privilege-accounts

- **Why:** Every administrator account can install code. Fewer administrators means fewer accounts that can take over the site if compromised.
- **Check:** WP-CLI: `wp user list --fields=ID,user_login,roles` and count users per role. Compare administrators with who actually manages the site. An administrator who only publishes content should be an editor or author. Mark ⚠️ Review with the list, because only the user knows who needs which role.
- **Fix:** Downgrade accounts that do not need full access, for example with `wp user set-role <user> editor`. Use a separate administrator account only for maintenance.

### wsc-admin-review-admins-quarterly

- **Why:** Forgotten accounts of former staff, contractors, or agencies are an easy way in and are rarely monitored.
- **Check:** WP-CLI: `wp user list --role=administrator --fields=ID,user_login,user_email,user_registered`. WordPress does not record the last login date unless a plugin does. Flag accounts the user does not recognize, and mask their email addresses in the report. An unknown administrator is a possible compromise; follow the safety rules. Then mark 📝 Manual: ask whether the list is reviewed regularly.
- **Fix:** Review administrators every quarter, and immediately when someone leaves. Delete or downgrade stale accounts.

### wsc-admin-malware-scheduled-scan

- **Why:** Compromises often go unnoticed for months. Scheduled scans and file-change detection shorten that time.
- **Check:** WP-CLI: `wp core verify-checksums` and `wp plugin verify-checksums --all` (this only covers plugins from WordPress.org). Files: `find wp-content/uploads -name '*.php'` should return nothing. Any checksum mismatch or PHP file in uploads is a possible compromise; follow the safety rules in `SKILL.md`. For scheduling, look for a scanner plugin (Jetpack Scan, Wordfence, Sucuri, MalCare) or ask whether the host scans. If there is no scheduled scanning, mark ❌ Fail even if today's checks are clean.
- **Fix:** Enable scheduled malware scanning and file-change alerts through a plugin or the host.

### wsc-admin-incident-response-plan

- **Why:** During an incident, a written plan prevents missed steps, such as leaving a backdoor or an unrotated key.
- **Check:** Manual. Ask whether there is a written plan covering who to contact, how to take the site offline or into maintenance, where clean backups are, and which credentials to rotate (WordPress users, salts, database, hosting, SFTP/SSH, API keys, application passwords).
- **Fix:** Write a one-page plan with containment, recovery from a known-clean backup, a credential rotation list, and a post-incident review. Store it outside the website.

## Themes

### wsc-theme-keep-updated

- **Why:** Theme vulnerabilities are exploited just like plugin vulnerabilities, including in inactive themes.
- **Check:** WP-CLI: `wp theme list --fields=name,status,version,update,update_version`. Files only: compare the `Version:` header in each `style.css` with the latest release from the theme's source. Commercial themes may not report updates to WordPress; mark those ⚠️ Review.
- **Fix:** Update all themes, and turn on automatic updates or the vendor's update mechanism.

### wsc-theme-remove-unused

- **Why:** Inactive themes are still reachable on the server and can still be exploited.
- **Check:** WP-CLI: `wp theme list --status=inactive`. A theme with status `parent` is in use by a child theme; keep it. Keeping one current default theme as a fallback is reasonable; mark ⚠️ Review if that is the only inactive theme.
- **Fix:** Delete unused themes with `wp theme delete <theme>` after confirming nothing depends on them.

### wsc-theme-reputable-sources

- **Why:** Pirated ("nulled") themes often contain backdoors, and unknown sources do not ship security fixes.
- **Check:** Files: read `Theme URI` and `Author` in `style.css`. Check whether the theme is on WordPress.org at `https://api.wordpress.org/themes/info/1.2/?action=theme_information&request[slug]=<slug>`, or sold by a known vendor. Look for obfuscation (`eval(`, `base64_decode(`, `gzinflate(`, `str_rot13(`) and removed license checks. Obfuscated code is a possible compromise; follow the safety rules. Otherwise, mark 📝 Manual for where a commercial theme was bought.
- **Fix:** Replace themes from unknown or pirated sources with versions from WordPress.org or the original vendor.

### wsc-theme-active-maintenance

- **Why:** An unmaintained theme will not receive fixes when a vulnerability is found.
- **Check:** For WordPress.org themes, read `last_updated` from the theme information API (see `wsc-theme-reputable-sources`). Mark ⚠️ Review if it is older than one year, and ❌ Fail if it is older than two years or the theme was removed from the directory. For commercial themes, check the vendor's changelog date.
- **Fix:** Move to an actively maintained theme with a public changelog and a history of security releases.

## Plugins

### wsc-plugin-keep-updated

- **Why:** Outdated plugins are the most common cause of hacked WordPress sites.
- **Check:** WP-CLI: `wp plugin list --fields=name,status,version,update,update_version,auto_update`. Also check `wp-content/mu-plugins` and drop-ins (`wp plugin list --status=must-use,dropin`), which do not show update notices. Any pending security update is ❌ Fail.
- **Fix:** Update all plugins, and enable automatic updates for plugins with a good track record.

### wsc-plugin-remove-unused

- **Why:** Deactivated plugins remain on the server, and some vulnerable files can be reached directly over HTTP.
- **Check:** WP-CLI: `wp plugin list --status=inactive`. Files only: compare the folders in `wp-content/plugins` with the active plugins, if that information is available.
- **Fix:** Delete plugins that are not needed with `wp plugin delete <plugin>`, instead of only deactivating them.

### wsc-plugin-reputable-sources

- **Why:** Pirated or unknown plugins often contain backdoors and miss security fixes.
- **Check:** Check each plugin against WordPress.org at `https://api.wordpress.org/plugins/info/1.2/?action=plugin_information&request[slug]=<slug>`, or confirm it is sold by a known vendor. Look for obfuscated code as described in `wsc-theme-reputable-sources`. Mark 📝 Manual for the source of commercial plugins.
- **Fix:** Replace plugins from unknown or pirated sources with official versions or alternatives.

### wsc-plugin-replace-abandoned

- **Why:** Abandoned plugins stay vulnerable forever. Plugins closed on WordPress.org are often closed because of an unfixed security issue.
- **Check:** For each WordPress.org plugin, use the plugin information API (see `wsc-plugin-reputable-sources`). An error saying the plugin is closed is ❌ Fail. A `last_updated` date older than two years is ❌ Fail, and older than one year is ⚠️ Review. Also compare `tested` with the current WordPress version.
- **Fix:** Replace closed or abandoned plugins with maintained alternatives, and remove them.

### wsc-plugin-think-before-many

- **Why:** Every plugin adds code that can be vulnerable. Overlapping plugins add risk without adding value.
- **Check:** WP-CLI: count active plugins and look for overlap, such as two security, caching, SEO, or backup plugins. There is no fixed limit, so mark ⚠️ Review with the count and any overlaps, or ✅ Pass if the list is lean.
- **Fix:** Remove overlapping or rarely used plugins, and use one well-maintained plugin per job.

### wsc-plugin-audit-capabilities

- **Why:** Plugins can add roles and capabilities that let lower-privileged users run risky actions.
- **Check:** WP-CLI: `wp role list`, then `wp cap list <role>` for each non-administrator role. Flag custom roles or non-administrator roles that have `unfiltered_html`, `edit_plugins`, `edit_themes`, `install_plugins`, `activate_plugins`, `edit_users`, `promote_users`, `create_users`, or `manage_options`. Also list application passwords with `wp user application-password list <user>` for administrators.
- **Fix:** Remove unneeded capabilities and roles (for example, `wp cap remove <role> <cap>`), and remove plugins that require more access than their job needs.

## Database

### wsc-db-strong-user-privileges

- **Why:** If the database user is `root`, or has privileges on every database, one SQL injection or leaked `wp-config.php` exposes the whole server.
- **Check:** Files: in `wp-config.php`, `DB_USER` must not be `root`, and `DB_PASSWORD` must be long and not empty. Report only its length. WP-CLI: `wp db query "SHOW GRANTS FOR CURRENT_USER();"`. Mark ❌ Fail for `ALL PRIVILEGES ON *.*` or `WITH GRANT OPTION`. Privileges limited to the site's own database are expected, because WordPress needs `CREATE` and `ALTER` for updates.
- **Fix:** Create a dedicated database user with privileges only on the site's database and a long random password, then update `wp-config.php`.

### wsc-db-backups-offsite

- **Why:** Without offsite backups, a compromise, ransomware, or a hosting failure can mean losing the site permanently.
- **Check:** WP-CLI: look for a backup plugin (Jetpack VaultPress Backup, UpdraftPlus, BackWPup, BlogVault, Duplicator) and check its destination in its settings. Files: search the web root for exposed backups, such as `*.sql`, `*.sql.gz`, `*.zip`, `*.tar.gz`, `*.bak`, `*.wpress`, `backup*/`, and `wp-content/updraft/`. HTTP: `HEAD` request any backup found inside the web root; a `200` response is ❌ Fail and should go first in the report. Otherwise, mark 📝 Manual and ask where backups are stored and how often they run.
- **Fix:** Schedule automatic backups of files and database to storage outside the hosting account, and remove backup files from the web root.

### wsc-db-test-restores

- **Why:** Backups often fail silently and are discovered to be broken only during an emergency.
- **Check:** Manual. Ask when a restore was last tested, and whether it was tested on a separate environment.
- **Fix:** Restore a backup to a staging site on a regular schedule, and confirm the site works.

### wsc-db-encrypt-backups

- **Why:** Backups contain user data, password hashes, and `wp-config.php` secrets. An unencrypted copy is a data breach waiting to happen.
- **Check:** Manual. Ask whether backups are encrypted where they are stored and sent over encrypted connections. Check the backup plugin's settings if available.
- **Fix:** Enable encryption in the backup tool or the storage service, and use encrypted transfer (HTTPS or SFTP).

## Hosting provider

### wsc-hosting-reliable

- **Why:** The host controls server patching, isolation between accounts, backups, and malware response.
- **Check:** Manual. Supporting evidence: WP-CLI `wp --info` or `php -v` shows the PHP version. A PHP version that no longer receives security fixes is ❌ Fail and should be reported. Ask about the host's security features, account isolation, and support.
- **Fix:** Use a host that keeps PHP and the server patched, isolates accounts, and offers backups, malware scanning, and a WAF. Upgrade to a supported PHP version.

### wsc-hosting-sftp-ssh-only

- **Why:** Plain FTP sends passwords and files unencrypted.
- **Check:** Files: in `wp-config.php`, `FTP_USER`, `FTP_PASS`, or `FS_METHOD` set to `ftpext` indicate plain FTP. Otherwise, mark 📝 Manual: ask how the user connects to the server. Do not scan ports.
- **Fix:** Disable FTP at the host and use SFTP or SSH keys. Remove plain FTP credentials from `wp-config.php`.

### wsc-hosting-permissions-755-644

- **Why:** World-writable files and folders let other accounts or compromised processes on the server change your site.
- **Check:** Files: from the WordPress root, `find . -type d -perm -o+w` and `find . -type f -perm -o+w` should return nothing (❌ Fail if they return anything). Then `find . -type d ! -perm 755` and `find . -type f ! -perm 644` show deviations. Stricter permissions are fine (for example, `640`, `600`, or `440` on `wp-config.php`), so mark those ✅ Pass. Some hosts manage permissions differently; note it.
- **Fix:** Set folders to `755` and files to `644` (`find . -type d -exec chmod 755 {} +` and `find . -type f -exec chmod 644 {} +`), then tighten `wp-config.php` to `640` or `600` if the host supports it.

### wsc-hosting-wpconfig-protected

- **Why:** `wp-config.php` holds the database password and salts. Exposing it, or a backup copy of it, gives away the site.
- **Check:** Files: its permissions should not be world-readable where the host allows it (`640`, `600`, or `440`). Look for copies such as `wp-config.php.bak`, `.old`, `.orig`, `.save`, `.txt`, `wp-config.php~`, and `.wp-config.php.swp`. HTTP: `curl -s --url 'https://<domain>/wp-config.php'` must return an empty body or `403`; any PHP source in the response is critical. Also `HEAD` request each backup copy found locally; a `200` response is critical.
- **Fix:** Delete backup copies, tighten permissions, and deny web access to `wp-config.php` in the server configuration. Moving it one directory above the web root is also supported by WordPress.

### wsc-hosting-block-sensitive-files

- **Why:** `readme.html` and `license.txt` reveal that the site runs WordPress and help fingerprint the version. `wp-config-sample.php` is not needed in production.
- **Check:** Files: look for `readme.html`, `license.txt`, and `wp-config-sample.php` in the WordPress root. HTTP: `curl -sI` each file; `200` is ❌ Fail and `403` or `404` is ✅ Pass. Core updates restore `readme.html` and `license.txt`, so a web server rule is more durable than deleting them.
- **Fix:** Block them with a web server rule (Apache `<FilesMatch>` with `Require all denied`, or an nginx `location` with `deny all`), or delete them after each core update.

### wsc-hosting-no-directory-listing

- **Why:** Directory listings reveal plugin versions, backups, and uploaded files that should not be browsable.
- **Check:** HTTP: `curl -s --url 'https://<domain>/wp-content/uploads/'` and `https://<domain>/wp-includes/`. An `Index of /` page is ❌ Fail. Files: look for `Options -Indexes` (or `Options All -Indexes`) in `.htaccess`, or `autoindex on` in the nginx configuration if it is accessible.
- **Fix:** Apache: add `Options -Indexes` to `.htaccess`. nginx: make sure `autoindex` is off (it is off by default).

### wsc-hosting-waf-cdn

- **Why:** A web application firewall blocks common exploit traffic and abusive bots before they reach WordPress.
- **Check:** HTTP: `curl -sI --url 'https://<domain>/'` and look for signs of a WAF or CDN, such as `cf-ray` or `server: cloudflare` (Cloudflare), `x-sucuri-id` (Sucuri), Fastly or Akamai headers, or the host's edge headers. Security plugins with a firewall (such as Wordfence) count, but report them as ⚠️ Review, because they run inside WordPress. If nothing is found, mark ❔ Unknown and ask.
- **Fix:** Put the site behind a WAF or CDN with bot and DDoS protection, through the host or a provider such as Cloudflare or Sucuri.

### wsc-hosting-monitoring-alerts

- **Why:** Alerts for downtime, expiring certificates, file changes, and login spikes are how incidents are noticed early.
- **Check:** Manual. Supporting evidence: a monitoring plugin or service (Jetpack Monitor, Wordfence alerts, an uptime service). HTTP: check the certificate expiry date with `curl -vI --url 'https://<domain>/' 2>&1 | grep -i 'expire'`. Ask who receives the alerts.
- **Fix:** Enable uptime monitoring, certificate expiry alerts, file-change alerts, and failed-login alerts, and send them to someone who will act on them.

### wsc-login-xmlrpc-off

- **Why:** XML-RPC allows many password guesses in one request (`system.multicall`) and is often abused for pingback attacks.
- **Check:** HTTP: `curl -s --url 'https://<domain>/xmlrpc.php'`. The response `XML-RPC server accepts POST requests only.` means it is reachable. A `403` or `404` response means it is blocked. Do not send XML-RPC method calls. Files: look for `add_filter( 'xmlrpc_enabled', '__return_false' )` or a server rule that blocks `xmlrpc.php`. That filter only disables authenticated methods, so a reachable endpoint with the filter is ⚠️ Review. Jetpack and some mobile apps need XML-RPC; ask before recommending a full block.
- **Fix:** Block `xmlrpc.php` at the web server or WAF if nothing needs it. If Jetpack needs it, allow only Jetpack's IP ranges.

### wsc-login-block-author-enumeration

- **Why:** Revealing valid usernames does half of a password-guessing attack's work.
- **Check:** HTTP: `curl -sI --url 'https://<domain>/?author=1'` without following redirects. A `Location` header with `/author/<slug>/` reveals a username and is ❌ Fail. Also run `curl -s --url 'https://<domain>/wp-json/wp/v2/users'`. A list of users with their `slug` values also reveals usernames; report it under this item. Files: look for the rewrite rule from the checklist in `.htaccess`, an equivalent nginx rule, or a security plugin setting.
- **Fix:** Add the checklist's `.htaccess` rule (or an nginx equivalent), and restrict the REST API users endpoint to logged-in users with a filter or a security plugin. Making usernames differ from display names also reduces the exposure.
