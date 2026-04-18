---
layout:    page
title:     日本語
permalink: /ja/items/
language: ja
subset: root
checklist: true
---

{% assign ti = site.data.strings.locales | where: 'code', page.language | first %}

> WordPress で稼働しているウェブサイトがハッキングされる原因は WordPress にあるわけではなく、そのほとんどが開発中に回避できるいくつかの設定ミスによるものです。
> あなたのウェブサイトのセキュリティを高めるために取るべき行動のチェックリストであること、それがこのプロジェクトの考えです。

## wp-config<span class="items-counter"></span>

* <label><input type="checkbox" data-item-id="wsc-wpconfig-secret-keys" /> セキュリティキーを更新する ([WordPress.org の生成ツール](https://api.wordpress.org/secret-key/1.1/salt/){:target="_blank" rel="noopener noreferrer"})</label>
* <label><input type="checkbox" data-item-id="wsc-wpconfig-disallow-file-edit" /> `wp-config.php` に `define('DISALLOW_FILE_EDIT', true);` を追加してファイル編集機能を無効化する</label>
* <label><input type="checkbox" data-item-id="wsc-wpconfig-force-ssl-admin" /> HTTPS 利用時は `define('FORCE_SSL_ADMIN', true);` を設定する</label>
* <label><input type="checkbox" data-item-id="wsc-wpconfig-wp-debug-off" /> 本番環境では `WP_DEBUG` を無効にし、デバッグ情報を公開しない</label>

## ログイン画面<span class="items-counter"></span>

* <label><input type="checkbox" data-item-id="wsc-login-brute-rate-limit" /> 総当たり攻撃対策としてログイン試行回数制限とレート制限を設定する</label>
* <label><input type="checkbox" data-item-id="wsc-login-mfa-admins" /> 管理者アカウントで多要素認証を有効化する (可能なら passkeys/WebAuthn を優先)</label>
* <label><input type="checkbox" data-item-id="wsc-login-unique-usernames" /> `admin` など推測されやすいユーザー名を使わず、共有アカウントを避ける</label>
* <label><input type="checkbox" data-item-id="wsc-login-remove-theme-links" /> テーマからログイン画面へのリンクを削除する (もし入っていれば)</label>
* <label><input type="checkbox" data-item-id="wsc-login-strong-passwords" /> すべてのアカウントで強力かつ一意のパスワードを使う (パスワードマネージャー推奨)</label>
* <label><input type="checkbox" data-item-id="wsc-login-revoke-sessions-rotate" /> インシデント発生時や担当変更時にセッション無効化とパスワードローテーションを実施する</label>
* <label><input type="checkbox" data-item-id="wsc-login-generic-errors" /> ログインエラーメッセージを汎用的なものにする (ユーザー名/パスワード) ([チュートリアル](https://gist.github.com/zergiocosta/72f87176b236ed0c6e13){:target="_blank" rel="noopener noreferrer"})</label>

## 管理画面<span class="items-counter"></span>

* <label><input type="checkbox" data-item-id="wsc-admin-wpadmin-password" /> wp-admin ディレクトリをパスワード保護する ([必要なファイルのみブロックを解除](https://gist.github.com/rafaelfunchal/f9a41ea72d80600d753a){:target="_blank" rel="noopener noreferrer"})</label>
* <label><input type="checkbox" data-item-id="wsc-admin-core-plugins-updated" /> WordPress を最新版にアップデートする</label>
* <label><input type="checkbox" data-item-id="wsc-admin-no-default-admin-user" /> admin という名前でユーザーを作成しない。もしある場合、そのアカウントは削除して新しい管理者ユーザーを作成する</label>
* <label><input type="checkbox" data-item-id="wsc-admin-editor-publishing-account" /> 編集者権限のユーザーを作成し、コンテンツの公開はそのユーザーを使用する</label>
* <label><input type="checkbox" data-item-id="wsc-admin-ssl-wp-admin" /> 管理画面のアクセスには SSL を使用する</label>
* <label><input type="checkbox" data-item-id="wsc-admin-review-admins-quarterly" /> 管理者アカウントを定期的に棚卸しし、不要ユーザーを削除する</label>
* <label><input type="checkbox" data-item-id="wsc-admin-malware-scheduled-scan" /> マルウェアスキャンと改ざん検知を定期実行する</label>
* <label><input type="checkbox" data-item-id="wsc-admin-incident-response-plan" /> 侵害時の対応手順 (封じ込め/復旧/秘密情報ローテーション) を用意する</label>

## テーマ<span class="items-counter"></span>

* <label><input type="checkbox" data-item-id="wsc-theme-keep-updated" /> テーマを最新版にアップデートする</label>
* <label><input type="checkbox" data-item-id="wsc-theme-remove-unused" /> 使っていないテーマを削除する</label>
* <label><input type="checkbox" data-item-id="wsc-theme-reputable-sources" /> 信頼できるソースからテーマをダウンロードして使用する</label>
* <label><input type="checkbox" data-item-id="wsc-theme-active-maintenance" /> 保守が継続され、更新履歴とセキュリティ修正が明確なテーマを選ぶ</label>

## プラグイン<span class="items-counter"></span>

* <label><input type="checkbox" data-item-id="wsc-plugin-keep-updated" /> 全てのプラグインを最新版にアップデートする</label>
* <label><input type="checkbox" data-item-id="wsc-plugin-remove-unused" /> 使っていないプラグインを削除する</label>
* <label><input type="checkbox" data-item-id="wsc-plugin-reputable-sources" /> 信頼できるソースからプラグインをダウンロードして使用する</label>
* <label><input type="checkbox" data-item-id="wsc-plugin-replace-abandoned" /> 古いプラグインは代わりとなる新しいプラグインに置き換える</label>
* <label><input type="checkbox" data-item-id="wsc-plugin-think-before-many" /> たくさんプラグインをインストールする前によく考える</label>
* <label><input type="checkbox" data-item-id="wsc-plugin-audit-capabilities" /> 不要な権限を要求するプラグインを見直して削除する</label>

## データベース<span class="items-counter"></span>

* <label><input type="checkbox" data-item-id="wsc-db-strong-user-privileges" /> DB ユーザーは強力で一意の認証情報を使用し、最小権限にする</label>
* <label><input type="checkbox" data-item-id="wsc-db-backups-offsite" /> 自動バックアップを設定し、オフサイトにも保存する</label>
* <label><input type="checkbox" data-item-id="wsc-db-test-restores" /> バックアップ復元テストを定期的に実施する</label>
* <label><input type="checkbox" data-item-id="wsc-db-encrypt-backups" /> バックアップは転送時/保管時ともに暗号化する</label>

## ホスティングサービス<span class="items-counter"></span>

* <label><input type="checkbox" data-item-id="wsc-hosting-reliable" /> 信頼できるホスティングサービスを借りる</label>
* <label><input type="checkbox" data-item-id="wsc-hosting-sftp-ssh-only" /> サーバへの接続は SFTP か SSH を使用する</label>
* <label><input type="checkbox" data-item-id="wsc-hosting-permissions-755-644" /> 全てのディレクトリを 755、ファイルを 644 に設定する ([WordPress hardening ガイド](https://developer.wordpress.org/advanced-administration/security/hardening/){:target="_blank" rel="noopener noreferrer"})</label>
* <label><input type="checkbox" data-item-id="wsc-hosting-wpconfig-protected" /> wp-config.php ファイルが他者からアクセスできないことを確認する</label>
* <label><input type="checkbox" data-item-id="wsc-hosting-block-sensitive-files" /> license.txt, wp-config-sample.php, readme.html ファイルは削除するか .htaccess でアクセスをブロックする</label>
* <label><input type="checkbox" data-item-id="wsc-hosting-no-directory-listing" /> .htaccess に次のコードを追加してディレクトリ一覧の表示を防ぐ: `Options All -Indexes`</label>
* <label><input type="checkbox" data-item-id="wsc-hosting-waf-cdn" /> 可能であれば WAF/CDN を導入し、Bot/DDoS 防御を有効化する</label>
* <label><input type="checkbox" data-item-id="wsc-hosting-monitoring-alerts" /> 稼働監視とセキュリティ通知 (SSL期限/ログイン急増/マルウェア) を設定する</label>
* <label><input type="checkbox" data-item-id="wsc-login-xmlrpc-off" /> 必要がない限り XML-RPC を無効化する</label>
* <label><input type="checkbox" data-item-id="wsc-login-block-author-enumeration" /> 公開リクエストによるユーザー名の列挙を防ぐ (`?author=` など): Web サーバーのルール (Apache `.htaccess`、nginx)、セキュリティプラグイン、または不要なら公開の著者アーカイブを無効化する ([WordPress のセキュリティ強化](https://developer.wordpress.org/advanced-administration/security/hardening/){:target="_blank" rel="noopener noreferrer"}).</label>
    <details class="checklist-item-details">
    <summary>{{ ti.checklist_author_enum_details_summary }}</summary>
    <pre><code># 数値の author= 列挙をブロック（301 でクエリを外す）
RewriteEngine On
RewriteCond %{QUERY_STRING} ^author=\d [NC]
RewriteRule ^ %{REQUEST_URI}? [L,R=301]
</code></pre>
    </details>
