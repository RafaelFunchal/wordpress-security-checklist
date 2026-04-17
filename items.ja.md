---
layout:    page
title:     ja-JP
permalink: /ja/items/
language: ja
subset: root
---

> WordPress で稼働しているウェブサイトがハッキングされる原因は WordPress にあるわけではなく、そのほとんどが開発中に回避できるいくつかの設定ミスによるものです。
> あなたのウェブサイトのセキュリティを高めるために取るべき行動のチェックリストであること、それがこのプロジェクトの考えです。

## wp-config<span class="items-counter"></span>

* <label><input type="checkbox" /> セキュリティキーを更新する ([WordPress.org の生成ツール](https://api.wordpress.org/secret-key/1.1/salt/){:target="_blank" rel="noopener noreferrer"})</label>
* <label><input type="checkbox" /> `wp-config.php` に `define('DISALLOW_FILE_EDIT', true);` を追加してファイル編集機能を無効化する</label>
* <label><input type="checkbox" /> HTTPS 利用時は `define('FORCE_SSL_ADMIN', true);` を設定する</label>
* <label><input type="checkbox" /> 本番環境では `WP_DEBUG` を無効にし、デバッグ情報を公開しない</label>

## ログイン画面<span class="items-counter"></span>

* <label><input type="checkbox" /> 総当たり攻撃対策としてログイン試行回数制限とレート制限を設定する</label>
* <label><input type="checkbox" /> 管理者アカウントで多要素認証を有効化する (可能なら passkeys/WebAuthn を優先)</label>
* <label><input type="checkbox" /> `admin` など推測されやすいユーザー名を使わず、共有アカウントを避ける</label>
* <label><input type="checkbox" /> テーマからログイン画面へのリンクを削除する (もし入っていれば)</label>
* <label><input type="checkbox" /> すべてのアカウントで強力かつ一意のパスワードを使う (パスワードマネージャー推奨)</label>
* <label><input type="checkbox" /> インシデント発生時や担当変更時にセッション無効化とパスワードローテーションを実施する</label>
* <label><input type="checkbox" /> ログインエラーメッセージを汎用的なものにする (ユーザー名/パスワード) ([チュートリアル](https://gist.github.com/zergiocosta/72f87176b236ed0c6e13){:target="_blank" rel="noopener noreferrer"})</label>
* <label><input type="checkbox" /> 必要がない限り XML-RPC を無効化する</label>

## 管理画面<span class="items-counter"></span>

* <label><input type="checkbox" /> wp-admin ディレクトリをパスワード保護する ([必要なファイルのみブロックを解除](https://gist.github.com/rafaelfunchal/f9a41ea72d80600d753a){:target="_blank" rel="noopener noreferrer"})</label>
* <label><input type="checkbox" /> WordPress を最新版にアップデートする</label>
* <label><input type="checkbox" /> admin という名前でユーザーを作成しない。もしある場合、そのアカウントは削除して新しい管理者ユーザーを作成する</label>
* <label><input type="checkbox" /> 編集者権限のユーザーを作成し、コンテンツの公開はそのユーザーを使用する</label>
* <label><input type="checkbox" /> 管理画面のアクセスには SSL を使用する</label>
* <label><input type="checkbox" /> 管理者アカウントを定期的に棚卸しし、不要ユーザーを削除する</label>
* <label><input type="checkbox" /> マルウェアスキャンと改ざん検知を定期実行する</label>
* <label><input type="checkbox" /> 侵害時の対応手順 (封じ込め/復旧/秘密情報ローテーション) を用意する</label>

## テーマ<span class="items-counter"></span>

* <label><input type="checkbox" /> テーマを最新版にアップデートする</label>
* <label><input type="checkbox" /> 使っていないテーマを削除する</label>
* <label><input type="checkbox" /> 信頼できるソースからテーマをダウンロードして使用する</label>
* <label><input type="checkbox" /> 保守が継続され、更新履歴とセキュリティ修正が明確なテーマを選ぶ</label>

## プラグイン<span class="items-counter"></span>

* <label><input type="checkbox" /> 全てのプラグインを最新版にアップデートする</label>
* <label><input type="checkbox" /> 使っていないプラグインを削除する</label>
* <label><input type="checkbox" /> 信頼できるソースからプラグインをダウンロードして使用する</label>
* <label><input type="checkbox" /> 古いプラグインは代わりとなる新しいプラグインに置き換える</label>
* <label><input type="checkbox" /> たくさんプラグインをインストールする前によく考える</label>
* <label><input type="checkbox" /> 不要な権限を要求するプラグインを見直して削除する</label>

## データベース<span class="items-counter"></span>

* <label><input type="checkbox" /> DB ユーザーは強力で一意の認証情報を使用し、最小権限にする</label>
* <label><input type="checkbox" /> 自動バックアップを設定し、オフサイトにも保存する</label>
* <label><input type="checkbox" /> バックアップ復元テストを定期的に実施する</label>
* <label><input type="checkbox" /> バックアップは転送時/保管時ともに暗号化する</label>

## ホスティングサービス<span class="items-counter"></span>

* <label><input type="checkbox" /> 信頼できるホスティングサービスを借りる</label>
* <label><input type="checkbox" /> サーバへの接続は SFTP か SSH を使用する</label>
* <label><input type="checkbox" /> 全てのディレクトリを 755、ファイルを 644 に設定する ([WordPress hardening ガイド](https://developer.wordpress.org/advanced-administration/security/hardening/){:target="_blank" rel="noopener noreferrer"})</label>
* <label><input type="checkbox" /> wp-config.php ファイルが他者からアクセスできないことを確認する</label>
* <label><input type="checkbox" /> license.txt, wp-config-sample.php, readme.html ファイルは削除するか .htaccess でアクセスをブロックする</label>
* <label><input type="checkbox" /> wp-config.php に次のコードを追加してファイル編集機能を使用不可にする: `define('DISALLOW_FILE_EDIT',true);`</label>
* <label><input type="checkbox" /> .htaccess に次のコードを追加してディレクトリ一覧の表示を防ぐ: `Options All -Indexes`</label>
* <label><input type="checkbox" /> 可能であれば WAF/CDN を導入し、Bot/DDoS 防御を有効化する</label>
* <label><input type="checkbox" /> 稼働監視とセキュリティ通知 (SSL期限/ログイン急増/マルウェア) を設定する</label>
