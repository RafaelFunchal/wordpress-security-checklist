---
layout:    page
title:     Português
permalink: /br/items/
language: br
subset: root
checklist: true
---

{% assign ti = site.data.strings.locales | where: 'code', page.language | first %}

> Na maioria das vezes em que um site feito com WordPress é invadido, a culpa não é do WordPress, mas sim de alguma falha boba que poderia ter sido evitada durante a sua construção.
> Essa é a ideia deste projeto: um checklist de ações que você deve tomar para aumentar a segurança do seu site.

## wp-config<span class="items-counter"></span>
* <label><input type="checkbox" data-item-id="wsc-wpconfig-secret-keys" /> Altere as chaves de segurança ([Gerador disponibilizado pelo WordPress.org](https://api.wordpress.org/secret-key/1.1/salt/){:target="_blank" rel="noopener noreferrer"})</label>
* <label><input type="checkbox" data-item-id="wsc-wpconfig-disallow-file-edit" /> Desative o editor de arquivos com `define('DISALLOW_FILE_EDIT', true);` no `wp-config.php`</label>
* <label><input type="checkbox" data-item-id="wsc-wpconfig-force-ssl-admin" /> Force HTTPS no admin com `define('FORCE_SSL_ADMIN', true);`</label>
* <label><input type="checkbox" data-item-id="wsc-wpconfig-wp-debug-off" /> Em produção, mantenha `WP_DEBUG` desligado para não expor informações sensíveis</label>

## Página de login<span class="items-counter"></span>

* <label><input type="checkbox" data-item-id="wsc-login-brute-rate-limit" /> Ative proteção contra força bruta e limite de tentativas de login</label>
* <label><input type="checkbox" data-item-id="wsc-login-mfa-admins" /> Ative autenticação de múltiplos fatores para administradores (passkeys/WebAuthn preferencialmente)</label>
* <label><input type="checkbox" data-item-id="wsc-login-unique-usernames" /> Use nomes de usuário únicos (nunca `admin`) e evite contas compartilhadas</label>
* <label><input type="checkbox" data-item-id="wsc-login-remove-theme-links" /> Remova links para sua página de login (caso exista algum em seu tema)</label>
* <label><input type="checkbox" data-item-id="wsc-login-strong-passwords" /> Use senhas fortes e únicas em todas as contas (com gerenciador de senhas)</label>
* <label><input type="checkbox" data-item-id="wsc-login-revoke-sessions-rotate" /> Revogue sessões antigas e altere senhas após incidentes ou troca de equipe</label>
* <label><input type="checkbox" data-item-id="wsc-login-generic-errors" /> Faça com que a mensagem de erro de login seja genérica (user/pass) ([tutorial](https://gist.github.com/zergiocosta/72f87176b236ed0c6e13){:target="_blank" rel="noopener noreferrer"})</label>

## Painel Administrativo<span class="items-counter"></span>

* <label><input type="checkbox" data-item-id="wsc-admin-wpadmin-password" /> Proteja a pasta wp-admin com senha ([desbloqueie apenas os arquivos necessários](https://gist.github.com/rafaelfunchal/f9a41ea72d80600d753a){:target="_blank" rel="noopener noreferrer"})</label>
* <label><input type="checkbox" data-item-id="wsc-admin-core-plugins-updated" /> Atualize o WordPress para sua versão mais recente</label>
* <label><input type="checkbox" data-item-id="wsc-admin-no-default-admin-user" /> Não utilize uma conta com nome de usuário admin. Caso exista, crie uma nova conta e apague a antiga</label>
* <label><input type="checkbox" data-item-id="wsc-admin-editor-publishing-account" /> Crie uma conta Editor e use-a somente para publicar seu conteúdo</label>
* <label><input type="checkbox" data-item-id="wsc-admin-ssl-wp-admin" /> Implemente SSL em toda seção administrativa</label>
* <label><input type="checkbox" data-item-id="wsc-admin-review-admins-quarterly" /> Revise contas de administrador periodicamente e remova usuários inativos</label>
* <label><input type="checkbox" data-item-id="wsc-admin-malware-scheduled-scan" /> Escaneie o site regularmente em busca de malware e alterações inesperadas de arquivos</label>
* <label><input type="checkbox" data-item-id="wsc-admin-incident-response-plan" /> Tenha um plano de resposta a incidentes com contenção, recuperação e rotação de segredos</label>

## Tema<span class="items-counter"></span>

* <label><input type="checkbox" data-item-id="wsc-theme-keep-updated" /> Atualize o tema ativo para sua versão mais recente</label>
* <label><input type="checkbox" data-item-id="wsc-theme-remove-unused" /> Apague temas inativos</label>
* <label><input type="checkbox" data-item-id="wsc-theme-reputable-sources" /> Apenas instale temas de fontes confiáveis</label>
* <label><input type="checkbox" data-item-id="wsc-theme-active-maintenance" /> Prefira temas com manutenção ativa, changelog claro e correções de segurança recentes</label>

## Plugins<span class="items-counter"></span>

* <label><input type="checkbox" data-item-id="wsc-plugin-keep-updated" /> Atualize todos os plugins para suas versões mais recentes</label>
* <label><input type="checkbox" data-item-id="wsc-plugin-remove-unused" /> Apague plugins inativos</label>
* <label><input type="checkbox" data-item-id="wsc-plugin-reputable-sources" /> Apenas instale plugins de fontes confiáveis</label>
* <label><input type="checkbox" data-item-id="wsc-plugin-replace-abandoned" /> Substitua plugins desatualizados por versões alternativas atualizadas</label>
* <label><input type="checkbox" data-item-id="wsc-plugin-think-before-many" /> Pense bem antes de instalar uma centena de plugins</label>
* <label><input type="checkbox" data-item-id="wsc-plugin-audit-capabilities" /> Revise permissões dos plugins e remova os que pedem mais acesso do que você precisa</label>

## Banco de dados<span class="items-counter"></span>

* <label><input type="checkbox" data-item-id="wsc-db-strong-user-privileges" /> Use credenciais fortes e únicas para o banco e mantenha apenas os privilégios necessários</label>
* <label><input type="checkbox" data-item-id="wsc-db-backups-offsite" /> Configure backups automáticos com cópias externas (offsite)</label>
* <label><input type="checkbox" data-item-id="wsc-db-test-restores" /> Teste restauração de backup regularmente</label>
* <label><input type="checkbox" data-item-id="wsc-db-encrypt-backups" /> Criptografe backups em trânsito e em repouso</label>

## Hospedagem<span class="items-counter"></span>

* <label><input type="checkbox" data-item-id="wsc-hosting-reliable" /> Contrate uma hospedagem de confiança</label>
* <label><input type="checkbox" data-item-id="wsc-hosting-sftp-ssh-only" /> Acesse seu servidor apenas por SFTP ou SSH</label>
* <label><input type="checkbox" data-item-id="wsc-hosting-permissions-755-644" /> Configure as permissões das pastas para 755 e arquivos para 644 ([Guia de segurança e fortalecimento do WordPress](https://developer.wordpress.org/advanced-administration/security/hardening/){:target="_blank" rel="noopener noreferrer"})</label>
* <label><input type="checkbox" data-item-id="wsc-hosting-wpconfig-protected" /> Certifique-se de que seu arquivo wp-config.php não possa ser acessado por outras pessoas</label>
* <label><input type="checkbox" data-item-id="wsc-hosting-block-sensitive-files" /> Remova ou bloqueie via .htaccess os arquivos license.txt, wp-config-sample.php e readme.html</label>
* <label><input type="checkbox" data-item-id="wsc-hosting-no-directory-listing" /> Evite a listagem de diretórios via .htaccess com o código: `Options All -Indexes`</label>
* <label><input type="checkbox" data-item-id="wsc-hosting-waf-cdn" /> Use WAF/CDN com proteção contra bots e DDoS quando possível</label>
* <label><input type="checkbox" data-item-id="wsc-hosting-monitoring-alerts" /> Ative monitoramento e alertas (uptime, expiração de SSL, picos de login, malware)</label>
* <label><input type="checkbox" data-item-id="wsc-login-xmlrpc-off" /> Mantenha XML-RPC desativado, exceto se você realmente precisar dele</label>
* <label><input type="checkbox" data-item-id="wsc-login-block-author-enumeration" /> Evite enumeração de nomes de usuário via URL pública (por exemplo `?author=` com ID numérico que redireciona para o slug do autor): use regras no servidor (`.htaccess` no Apache, nginx), um plugin de segurança, ou desative arquivos públicos de autor se não precisar deles ([Guia de segurança e fortalecimento do WordPress](https://developer.wordpress.org/advanced-administration/security/hardening/){:target="_blank" rel="noopener noreferrer"}).</label>
    <details class="checklist-item-details">
    <summary>{{ ti.checklist_author_enum_details_summary }}</summary>
    <pre><code># Bloqueia varreduras com author= numérico (301 remove a query string)
RewriteEngine On
RewriteCond %{QUERY_STRING} ^author=\d [NC]
RewriteRule ^ %{REQUEST_URI}? [L,R=301]
</code></pre>
    </details>
