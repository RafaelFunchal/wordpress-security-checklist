---
layout:    page
title:     en-US
permalink: /items/
---

> Most of the time a website running WordPress is hacked the culprit is not WordPress, but of any silly misconfiguration that could be avoided during its development.
> That's the idea of this project: Being a checklist of actions that you should take to increase the security of your website.

## wp-config

* <label><input type="checkbox" /> Change Security Key ([Generator provided by WordPress.org](https://api.wordpress.org/secret-key/1.1/salt/){:target="_blank"})</label>

## Login Page

* <label><input type="checkbox" /> Lockdown the login page for repetitive failed login ([Login Lockdown](https://wordpress.org/plugins/login-lockdown/){:target="_blank"} or [iThemes Security](https://wordpress.org/plugins/better-wp-security/){:target="_blank"} )</label>
* <label><input type="checkbox" /> Activate 2 factor authentication ([Google Authenticator for WordPress](https://wordpress.org/plugins/wp-google-authenticator/){:target="_blank"})</label>
* <label><input type="checkbox" /> Use email address to login instead of username ([Force Email Login](https://wordpress.org/plugins/force-email-login/){:target="_blank"})</label>
* <label><input type="checkbox" /> Rename the URL of your login page ([iThemes Security](https://wordpress.org/plugins/better-wp-security/){:target="_blank"} or directly on .htaccess)</label>
* <label><input type="checkbox" /> Remove login links from the theme (if there's any)</label>
* <label><input type="checkbox" /> Use a strong password contaning uppercase, lowercase, numbers, and special characters on all accounts ([password generator](http://passwordsgenerator.net/){:target="_blank"})</label>
* <label><input type="checkbox" /> Change the passwords regularly</label>
* <label><input type="checkbox" /> Make the login error messages more generical (user/pass) ([tutorial](https://gist.github.com/zergiocosta/72f87176b236ed0c6e13){:target="_blank"})</label>
* <label><input type="checkbox" /> Disable the WP REST API, if you aren't using it. ([Disable REST API](https://br.wordpress.org/plugins/disable-json-api/){:target="_blank"})</label>

## Administrative Panel

* <label><input type="checkbox" /> Password protect the folder wp-admin ([unblock only the needed files](https://gist.github.com/rafaelfunchal/f9a41ea72d80600d753a){:target="_blank"})</label>
* <label><input type="checkbox" /> Keep WordPress up-to-date</label>
* <label><input type="checkbox" /> Do not create an account with username admin. If there is any, create a new Administrator account and delete the old one</label>
* <label><input type="checkbox" /> Create an Editor account and use it solely to publish content</label>
* <label><input type="checkbox" /> Implement SSL for the WordPress admin section</label>
* <label><input type="checkbox" /> Install any plugins to check file changes ([WP Security Scan](https://wordpress.org/plugins/wp-security-scan/){:target="_blank"}, [Wordfence](https://wordpress.org/plugins/wordfence/){:target="_blank"} or [iThemes Security](https://wordpress.org/plugins/better-wp-security/){:target="_blank"})</label>
* <label><input type="checkbox" /> Scan the website for viruses, malware, and security breaches</label>

## Themes

* <label><input type="checkbox" /> Keep the theme up-to-date</label>
* <label><input type="checkbox" /> Delete and remove unused themes</label>
* <label><input type="checkbox" /> Download and use themes only from reputable sources</label>
* <label><input type="checkbox" /> Remove the WordPress version from the theme ([tutorial](http://www.wpbeginner.com/wp-tutorials/the-right-way-to-remove-wordpress-version-number/){:target="_blank"})</label>

## Plugins

* <label><input type="checkbox" /> Keep all plugins up-to-date</label>
* <label><input type="checkbox" /> Delete and remove unused plugins</label>
* <label><input type="checkbox" /> Download and use plugins only from reputable sources</label>
* <label><input type="checkbox" /> Replace outdated plugins for alternative newer plugins</label>
* <label><input type="checkbox" /> Think twice before installing a ton of plugins</label>

## Database

* <label><input type="checkbox" /> Change the default table prefix ([tutorial](http://www.maketecheasier.com/the-safe-way-to-change-your-wordpress-database-table-prefix){:target="_blank"})</label>
* <label><input type="checkbox" /> Schedule weekly backup of the database ([Backup WP](https://wordpress.org/plugins/backup-wp/){:target="_blank"}, [WP DB Backup](https://wordpress.org/plugins/wp-db-backup/){:target="_blank"} etc. )</label>
* <label><input type="checkbox" /> Use a strong password contaning uppercase, lowercase, numbers, and special characters for the database user ([password generator](http://passwordsgenerator.net/){:target="_blank"})</label>

## Hosting provider

* <label><input type="checkbox" /> Hire a reliable hosting provider</label>
* <label><input type="checkbox" /> Connect to your server only through SFTP or SSH</label>
* <label><input type="checkbox" /> Set all folder permission to 755 and files to 644 ([accourding to the Codex](http://codex.wordpress.org/Hardening_WordPress#File_Permissions){:target="_blank"})</label>
* <label><input type="checkbox" /> Make sure the wp-config.php file is not accessible by others</label>
* <label><input type="checkbox" /> Remove or block via .htaccess the files license.txt, wp-config-sample.php, and readme.html</label>
* <label><input type="checkbox" /> Disable file edit via wp-config.php by adding the following code: `define('DISALLOW_FILE_EDIT',true);`</label>
* <label><input type="checkbox" /> Prevent directory listing via .htaccess by adding the following code: `Options All -Indexes`</label>
