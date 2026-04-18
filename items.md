---
layout:    page
title:     English
permalink: /items/
language: en
subset: root
checklist: true
---

{% assign ti = site.data.strings.locales | where: 'code', page.language | first %}

> Most of the time a website running WordPress is hacked the culprit is not WordPress, but of any silly misconfiguration that could be avoided during its development.
> That's the idea of this project: Being a checklist of actions that you should take to increase the security of your website.

## wp-config<span class="items-counter"></span>

* <label><input type="checkbox" data-item-id="wsc-wpconfig-secret-keys" /> Change Security Key ([Generator provided by WordPress.org](https://api.wordpress.org/secret-key/1.1/salt/){:target="_blank" rel="noopener noreferrer"})</label>
* <label><input type="checkbox" data-item-id="wsc-wpconfig-disallow-file-edit" /> Disable theme and plugin file editor by adding `define('DISALLOW_FILE_EDIT', true);` to `wp-config.php`</label>
* <label><input type="checkbox" data-item-id="wsc-wpconfig-force-ssl-admin" /> Force SSL for admin logins with `define('FORCE_SSL_ADMIN', true);` (when HTTPS is available)</label>
* <label><input type="checkbox" data-item-id="wsc-wpconfig-wp-debug-off" /> Set `WP_DEBUG` to `false` in production and never expose debug output publicly</label>

## Login Page<span class="items-counter"></span>

* <label><input type="checkbox" data-item-id="wsc-login-brute-rate-limit" /> Add brute-force protection and rate limiting for repetitive failed logins</label>
* <label><input type="checkbox" data-item-id="wsc-login-mfa-admins" /> Enable multi-factor authentication for all administrator accounts (passkeys/WebAuthn preferred, TOTP as fallback)</label>
* <label><input type="checkbox" data-item-id="wsc-login-unique-usernames" /> Use unique usernames (never `admin`) and avoid shared accounts</label>
* <label><input type="checkbox" data-item-id="wsc-login-remove-theme-links" /> Remove login links from the theme (if there's any)</label>
* <label><input type="checkbox" data-item-id="wsc-login-strong-passwords" /> Use strong unique passwords on every account (prefer password manager-generated credentials)</label>
* <label><input type="checkbox" data-item-id="wsc-login-revoke-sessions-rotate" /> Revoke old sessions and rotate passwords after incidents or team changes</label>
* <label><input type="checkbox" data-item-id="wsc-login-generic-errors" /> Make login error messages generic (user/pass) ([tutorial](https://gist.github.com/zergiocosta/72f87176b236ed0c6e13){:target="_blank" rel="noopener noreferrer"})</label>
* <label><input type="checkbox" data-item-id="wsc-login-xmlrpc-off" /> Keep XML-RPC disabled unless you explicitly need it</label>
* <label><input type="checkbox" data-item-id="wsc-login-block-author-enumeration" /> Block username enumeration from public requests (for example `?author=` queries that expose valid accounts): use web server rules (Apache `.htaccess` or nginx), a security plugin, or disable public author archives if you do not need them ([WordPress security hardening](https://developer.wordpress.org/advanced-administration/security/hardening/){:target="_blank" rel="noopener noreferrer"}).</label>
    <details class="checklist-item-details">
    <summary>{{ ti.checklist_author_enum_details_summary }}</summary>
    <pre><code># Block numeric author=… probes (redirect drops the query string)
RewriteEngine On
RewriteCond %{QUERY_STRING} ^author=\d [NC]
RewriteRule ^ %{REQUEST_URI}? [L,R=301]
</code></pre>
    </details>

## Administrative Panel<span class="items-counter"></span>

* <label><input type="checkbox" data-item-id="wsc-admin-wpadmin-password" /> Password protect the folder wp-admin ([unblock only the needed files](https://gist.github.com/rafaelfunchal/f9a41ea72d80600d753a){:target="_blank" rel="noopener noreferrer"})</label>
* <label><input type="checkbox" data-item-id="wsc-admin-core-plugins-updated" /> Keep WordPress core, themes, and plugins updated (enable auto-updates where appropriate)</label>
* <label><input type="checkbox" data-item-id="wsc-admin-least-privilege-accounts" /> Use least privilege: keep daily publishing accounts as Editor/Author and reserve Administrator only when needed</label>
* <label><input type="checkbox" data-item-id="wsc-admin-review-admins-quarterly" /> Review administrator accounts quarterly and remove stale users immediately</label>
* <label><input type="checkbox" data-item-id="wsc-admin-malware-scheduled-scan" /> Scan for malware and unexpected file changes on a schedule</label>
* <label><input type="checkbox" data-item-id="wsc-admin-incident-response-plan" /> Keep an incident response checklist with steps for containment, recovery, and password/API key rotation</label>

## Themes<span class="items-counter"></span>

* <label><input type="checkbox" data-item-id="wsc-theme-keep-updated" /> Keep the theme up-to-date</label>
* <label><input type="checkbox" data-item-id="wsc-theme-remove-unused" /> Delete and remove unused themes</label>
* <label><input type="checkbox" data-item-id="wsc-theme-reputable-sources" /> Download and use themes only from reputable sources</label>
* <label><input type="checkbox" data-item-id="wsc-theme-active-maintenance" /> Prefer themes with active maintenance, clear changelogs, and recent security fixes</label>

## Plugins<span class="items-counter"></span>

* <label><input type="checkbox" data-item-id="wsc-plugin-keep-updated" /> Keep all plugins up-to-date</label>
* <label><input type="checkbox" data-item-id="wsc-plugin-remove-unused" /> Delete and remove unused plugins</label>
* <label><input type="checkbox" data-item-id="wsc-plugin-reputable-sources" /> Download and use plugins only from reputable sources</label>
* <label><input type="checkbox" data-item-id="wsc-plugin-replace-abandoned" /> Replace abandoned plugins with actively maintained alternatives</label>
* <label><input type="checkbox" data-item-id="wsc-plugin-think-before-many" /> Think twice before installing a ton of plugins</label>
* <label><input type="checkbox" data-item-id="wsc-plugin-audit-capabilities" /> Audit plugin permissions and remove plugins that require capabilities you do not need</label>

## Database<span class="items-counter"></span>

* <label><input type="checkbox" data-item-id="wsc-db-strong-user-privileges" /> Use strong unique credentials for the database user and limit its privileges to the minimum needed</label>
* <label><input type="checkbox" data-item-id="wsc-db-backups-offsite" /> Schedule automated backups and store copies offsite</label>
* <label><input type="checkbox" data-item-id="wsc-db-test-restores" /> Test backup restores regularly (a backup is only useful if restore works)</label>
* <label><input type="checkbox" data-item-id="wsc-db-encrypt-backups" /> Encrypt backups at rest and in transit</label>

## Hosting provider<span class="items-counter"></span>

* <label><input type="checkbox" data-item-id="wsc-hosting-reliable" /> Hire a reliable hosting provider</label>
* <label><input type="checkbox" data-item-id="wsc-hosting-sftp-ssh-only" /> Connect to your server only through SFTP or SSH</label>
* <label><input type="checkbox" data-item-id="wsc-hosting-permissions-755-644" /> Set all folder permissions to 755 and files to 644 ([according to WordPress hardening docs](https://developer.wordpress.org/advanced-administration/security/hardening/){:target="_blank" rel="noopener noreferrer"})</label>
* <label><input type="checkbox" data-item-id="wsc-hosting-wpconfig-protected" /> Make sure the wp-config.php file is not accessible by others</label>
* <label><input type="checkbox" data-item-id="wsc-hosting-block-sensitive-files" /> Remove or block via .htaccess the files license.txt, wp-config-sample.php, and readme.html</label>
* <label><input type="checkbox" data-item-id="wsc-hosting-no-directory-listing" /> Prevent directory listing via .htaccess by adding the following code: `Options All -Indexes`</label>
* <label><input type="checkbox" data-item-id="wsc-hosting-waf-cdn" /> Put your site behind a WAF/CDN and enable DDoS/bot protection when possible</label>
* <label><input type="checkbox" data-item-id="wsc-hosting-monitoring-alerts" /> Enable uptime and security alerting (certificate expiry, file changes, login spikes, malware findings)</label>
