---
layout: page
title: pt-BR
permalink: /pt-BR/
---

> A maioria das vezes que um site feito com WordPress é invadido a culpa não é do WordPress, mas sim de alguma falha boba que poderia ter sido evitada durante a sua construção.
> Essa é a ideia desse projeto: Ser um checklist de ações que você deve tomar para aumentar a segurança do seu site.

## Página de login

* <label><input type="checkbox" /> Bloqueie várias tentativas de login ([Login Lockdown](https://wordpress.org/plugins/login-lockdown/) ou [iThemes Security](https://wordpress.org/plugins/better-wp-security/) )</label>
* <label><input type="checkbox" /> Ative autenticação de 2 etapas ([Google Authenticator for WordPress](https://wordpress.org/plugins/wp-google-authenticator/))</label>
* <label><input type="checkbox" /> Use um email para fazer login ao invés de um nome de usuário (WP Email Login)</label>
* <label><input type="checkbox" /> Altere o endereço da sua página de login ([iThemes Security](https://wordpress.org/plugins/better-wp-security/) ou diretamente pelo .htaccess)</label>
* <label><input type="checkbox" /> Remova links para sua página de login (caso exista algum em seu tema)</label>
* <label><input type="checkbox" /> Use senhas fortes com letras maiúsculas e minúsculas, números e caractéres especiais em todas as contas ([gerador de senhas](http://passwordsgenerator.net/))</label>
* <label><input type="checkbox" /> Altere sua senha periodicamente</label>
* <label><input type="checkbox" /> Faça com que a mensagem de erro de login seja genérica (user/pass) ([tutorial](https://gist.github.com/zergiocosta/72f87176b236ed0c6e13))</label>

## Painel Administrativo

* <label><input type="checkbox" /> Proteja a pasta wp-admin com senha</label>
* <label><input type="checkbox" /> Atualize o WordPress para sua versão mais recente</label>
* <label><input type="checkbox" /> Não utilize uma conta com nome de usuário admin. Caso exista, crie uma nova conta e apague a antiga</label>
* <label><input type="checkbox" /> Crie uma conta Editor e use-a somente para publicar seu conteúdo</label>
* <label><input type="checkbox" /> Implemente SSL em toda seção administrativa</label>
* <label><input type="checkbox" /> Instale algum plugin para verificar se algum arquivo foi editado ([WP Security Scan](https://wordpress.org/plugins/wp-security-scan/), [Wordfence](https://wordpress.org/plugins/wordfence/) ou [iThemes Security](https://wordpress.org/plugins/better-wp-security/))</label>
* <label><input type="checkbox" /> Scaneie o site a procura de vírus, malwares e falhas de segurança</label>

## Tema

* <label><input type="checkbox" /> Atualize o tema ativo para sua versão mais recente</label>
* <label><input type="checkbox" /> Apague temas inativos</label>
* <label><input type="checkbox" /> Apenas instale temas de fontes confiáveis</label>
* <label><input type="checkbox" /> Remova a versão do WordPress no tema ([tutorial](http://www.wpbeginner.com/wp-tutorials/the-right-way-to-remove-wordpress-version-number/))</label>

## Plugins

* <label><input type="checkbox" /> Atualize todos os plugins para suas versões mais recentes</label>
* <label><input type="checkbox" /> Apague plugins inativos</label>
* <label><input type="checkbox" /> Apenas instale plugins de fontes confiáveis</label>
* <label><input type="checkbox" /> Substitua plugins desatualizados por versões alternativas atualizadas</label>
* <label><input type="checkbox" /> Pense bem antes de instalar uma centena de plugins</label>

## Banco de dados

* <label><input type="checkbox" /> Altere o prefixo das tabelas ([tutorial](http://www.maketecheasier.com/the-safe-way-to-change-your-wordpress-database-table-prefix))</label>
* <label><input type="checkbox" /> Configure backups semanais do seu banco de dados ([Backup WP](https://wordpress.org/plugins/backup-wp/), [WP DB Backup](https://wordpress.org/plugins/wp-db-backup/) etc. )</label>
* <label><input type="checkbox" /> Use senhas fortes com letras maiúsculas e minúsculas, números e caractéres especiais no usuário do banco de dados ([gerador de senhas](http://passwordsgenerator.net/))</label>

## Hospedagem

* <label><input type="checkbox" /> Contrate uma hospedagem de confiança</label>
* <label><input type="checkbox" /> Acesse seu servidor apenas por SFTP ou SSH</label>
* <label><input type="checkbox" /> Configure as permissões das pastas para 755 e arquivos para 644 ([conforme a documentação](http://codex.wordpress.org/Hardening_WordPress#File_Permissions))</label>
* <label><input type="checkbox" /> Certifique-se que seu arquivo wp-config.php não possa ser acessado por outras pessoas</label>
* <label><input type="checkbox" /> Remova ou bloqueie via .htaccess os arquivos license.txt, wp-config-sample.php e readme.html</label>
* <label><input type="checkbox" /> Desabilite o editor pelo wp-config.php com o código: `define('DISALLOW_FILE_EDIT',true);`</label>
* <label><input type="checkbox" /> Previna a pesquisa de diretórios via .htaccess com o código: `Options All -IndexesOptions All -Indexes`</label>