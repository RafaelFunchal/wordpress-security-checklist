---
layout:    page
title:     ja-JP
permalink: /ja/items/
language: ja
subset: root
---

> WordPress で稼働しているウェブサイトがハッキングされる原因は WordPress にあるわけではなく、そのほとんどが開発中に回避できるいくつかの設定ミスによるものです。
> あなたのウェブサイトのセキュリティを高めるために取るべき行動のチェックリストであること、それがこのプロジェクトの考えです。

## ログイン画面<span class="items-counter"></span>

* <label><input type="checkbox" /> 繰り返しログインに失敗したらログイン画面にロックをかける ([Login Lockdown](https://wordpress.org/plugins/login-lockdown/){:target="_blank"} , [iThemes Security](https://wordpress.org/plugins/better-wp-security/){:target="_blank"} )</label>
* <label><input type="checkbox" /> 2段階認証を有効にする ([Google Authenticator](https://wordpress.org/plugins/google-authenticator/){:target="_blank"})</label>
* <label><input type="checkbox" /> ユーザー名の代わりにメールアドレスをログインに使う ([Force Login With Email](https://wordpress.org/plugins/force-login-with-email/){:target="_blank"})</label>
* <label><input type="checkbox" /> ログイン画面の URL を変更する ([iThemes Security](https://wordpress.org/plugins/better-wp-security/){:target="_blank"} または .htaccess に直接記述)</label>
* <label><input type="checkbox" /> テーマからログイン画面へのリンクを削除する (もし入っていれば)</label>
* <label><input type="checkbox" /> 全てのアカウントに対して大文字、小文字、数字、特殊文字を含む強力なパスワードを使う ([password generator](http://passwordsgenerator.net/){:target="_blank"})</label>
* <label><input type="checkbox" /> 定期的にパスワードを変更する</label>
* <label><input type="checkbox" /> ログインエラーメッセージを汎用的なものにする (ユーザー名/パスワード) ([チュートリアル](https://gist.github.com/zergiocosta/72f87176b236ed0c6e13){:target="_blank"})</label>

## 管理画面<span class="items-counter"></span>

* <label><input type="checkbox" /> wp-admin ディレクトリをパスワード保護する ([必要なファイルのみブロックを解除](https://gist.github.com/rafaelfunchal/f9a41ea72d80600d753a){:target="_blank"})</label>
* <label><input type="checkbox" /> WordPress を最新版にアップデートする</label>
* <label><input type="checkbox" /> admin という名前でユーザーを作成しない。もしある場合、そのアカウントは削除して新しい管理者ユーザーを作成する</label>
* <label><input type="checkbox" /> 編集者権限のユーザーを作成し、コンテンツの公開はそのユーザーを使用する</label>
* <label><input type="checkbox" /> 管理画面のアクセスには SSL を使用する</label>
* <label><input type="checkbox" /> ファイルの変更をチェックするプラグインをインストールする ([WP Security Scan](https://wordpress.org/plugins/wp-security-scan/){:target="_blank"}, [Wordfence](https://wordpress.org/plugins/wordfence/){:target="_blank"} , [iThemes Security](https://wordpress.org/plugins/better-wp-security/){:target="_blank"})</label>
* <label><input type="checkbox" /> ウィルス、マルウェア、セキュリティ侵害に対してウェブサイトをスキャンする</label>

## テーマ<span class="items-counter"></span>

* <label><input type="checkbox" /> テーマを最新版にアップデートする</label>
* <label><input type="checkbox" /> 使っていないテーマを削除する</label>
* <label><input type="checkbox" /> 信頼できるソースからテーマをダウンロードして使用する</label>
* <label><input type="checkbox" /> テーマから WordPress バージョンの表記を削除する ([チュートリアル](http://www.wpbeginner.com/wp-tutorials/the-right-way-to-remove-wordpress-version-number/){:target="_blank"})</label>

## プラグイン<span class="items-counter"></span>

* <label><input type="checkbox" /> 全てのプラグインを最新版にアップデートする</label>
* <label><input type="checkbox" /> 使っていないプラグインを削除する</label>
* <label><input type="checkbox" /> 信頼できるソースからプラグインをダウンロードして使用する</label>
* <label><input type="checkbox" /> 古いプラグインは代わりとなる新しいプラグインに置き換える</label>
* <label><input type="checkbox" /> たくさんプラグインをインストールする前によく考える</label>

## データベース<span class="items-counter"></span>

* <label><input type="checkbox" /> デフォルトのテーブル接頭辞を変更する ([チュートリアル](http://www.maketecheasier.com/the-safe-way-to-change-your-wordpress-database-table-prefix){:target="_blank"})</label>
* <label><input type="checkbox" /> データベースバックアップを週単位でスケジュールする ([Backup WP](https://wordpress.org/plugins/backup-wp/){:target="_blank"}, [WP DB Backup](https://wordpress.org/plugins/wp-db-backup/){:target="_blank"} など )</label>
* <label><input type="checkbox" /> データベースのユーザーに対して大文字、小文字、数字、特殊文字を含む強力なパスワードを使う ([password generator](http://passwordsgenerator.net/){:target="_blank"})</label>

## ホスティングサービス<span class="items-counter"></span>

* <label><input type="checkbox" /> 信頼できるホスティングサービスを借りる</label>
* <label><input type="checkbox" /> サーバへの接続は SFTP か SSH を使用する</label>
* <label><input type="checkbox" /> 全てのディレクトリのパーミッションを 755、ファイルのパーミッションを 644 に設定する ([Codex より](http://codex.wordpress.org/Hardening_WordPress#File_Permissions){:target="_blank"})</label>
* <label><input type="checkbox" /> wp-config.php ファイルが他者からアクセスできないことを確認する</label>
* <label><input type="checkbox" /> license.txt, wp-config-sample.php, readme.html ファイルは削除するか .htaccess でアクセスをブロックする</label>
* <label><input type="checkbox" /> wp-config.php に次のコードを追加してファイル編集機能を使用不可にする: `define('DISALLOW_FILE_EDIT',true);`</label>
* <label><input type="checkbox" /> .htaccess に次のコードを追加してディレクトリ一覧の表示を防ぐ: `Options All -Indexes`</label>
