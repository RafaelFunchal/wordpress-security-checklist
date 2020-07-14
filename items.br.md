---
layout:    page
title:     pt-BR
permalink: /br/items/
language: br
subset: root
---

> A maioria das vezes que um site feito com WordPress é invadido a culpa não é do WordPress, mas sim de alguma falha boba que poderia ter sido evitada durante a sua construção.
> Essa é a ideia desse projeto: Ser um checklist de ações que você deve tomar para aumentar a segurança do seu site.

## wp-config<span class="items-counter"></span>
* <label><input type="checkbox" /> Altere as chaves de segurança ([Gerador disponibilizado pelo WordPress.org](https://api.wordpress.org/secret-key/1.1/salt/){:target="_blank"})</label>

## Página de login<span class="items-counter"></span>

* <label><input type="checkbox" /> Bloqueie várias tentativas de login ([Login Lockdown](https://wordpress.org/plugins/login-lockdown/){:target="_blank"} ou [iThemes Security](https://wordpress.org/plugins/better-wp-security/){:target="_blank"} )</label>
* <label><input type="checkbox" /> Ative autenticação de 2 etapas ([Google Authenticator](https://wordpress.org/plugins/google-authenticator/){:target="_blank"})</label>
* <label><input type="checkbox" /> Use um e-mail para fazer login ao invés de um nome de usuário ([Force Login With Email](https://br.wordpress.org/plugins/force-login-with-email){:target="_blank"})</label>
* <label><input type="checkbox" /> Altere o endereço da sua página de login ([iThemes Security](https://wordpress.org/plugins/better-wp-security/){:target="_blank"} ou diretamente pelo .htaccess)</label>
* <label><input type="checkbox" /> Remova links para sua página de login (caso exista algum em seu tema)</label>
* <label><input type="checkbox" /> Use senhas fortes com letras maiúsculas e minúsculas, números e caracteres especiais em todas as contas (gerador de senhas [aleatório](http://passwordsgenerator.net/){:target="_blank"} ou [baseado em palavras]( https://www.safetydetectives.com/password-meter/){:target="_blank"})</label>
* <label><input type="checkbox" /> Altere sua senha periodicamente</label>
* <label><input type="checkbox" /> Faça com que a mensagem de erro de login seja genérica (user/pass) ([tutorial](https://gist.github.com/zergiocosta/72f87176b236ed0c6e13){:target="_blank"})</label>
* <label><input type="checkbox" /> Desabilite a API REST do WP caso não esteja utilizando. ([Disable REST API](https://br.wordpress.org/plugins/disable-json-api/){:target="_blank"})</label>

## Painel Administrativo<span class="items-counter"></span>

* <label><input type="checkbox" /> Proteja a pasta wp-admin com senha ([desbloqueie apenas os arquivos necessários](https://gist.github.com/rafaelfunchal/f9a41ea72d80600d753a){:target="_blank"})</label>
* <label><input type="checkbox" /> Atualize o WordPress para sua versão mais recente</label>
* <label><input type="checkbox" /> Não utilize uma conta com nome de usuário admin. Caso exista, crie uma nova conta e apague a antiga</label>
* <label><input type="checkbox" /> Crie uma conta Editor e use-a somente para publicar seu conteúdo</label>
* <label><input type="checkbox" /> Implemente SSL em toda seção administrativa</label>
* <label><input type="checkbox" /> Instale algum plugin para verificar se algum arquivo foi editado ([WP Security Scan](https://wordpress.org/plugins/wp-security-scan/){:target="_blank"}, [Wordfence](https://wordpress.org/plugins/wordfence/){:target="_blank"} ou [iThemes Security](https://wordpress.org/plugins/better-wp-security/){:target="_blank"})</label>
* <label><input type="checkbox" /> Escaneie o site a procura de vírus, malwares e falhas de segurança</label>

## Tema<span class="items-counter"></span>

* <label><input type="checkbox" /> Atualize o tema ativo para sua versão mais recente</label>
* <label><input type="checkbox" /> Apague temas inativos</label>
* <label><input type="checkbox" /> Apenas instale temas de fontes confiáveis</label>
* <label><input type="checkbox" /> Remova a versão do WordPress no tema ([tutorial](http://www.wpbeginner.com/wp-tutorials/the-right-way-to-remove-wordpress-version-number/){:target="_blank"})</label>

## Plugins<span class="items-counter"></span>

* <label><input type="checkbox" /> Atualize todos os plugins para suas versões mais recentes</label>
* <label><input type="checkbox" /> Apague plugins inativos</label>
* <label><input type="checkbox" /> Apenas instale plugins de fontes confiáveis</label>
* <label><input type="checkbox" /> Substitua plugins desatualizados por versões alternativas atualizadas</label>
* <label><input type="checkbox" /> Pense bem antes de instalar uma centena de plugins</label>

## Banco de dados<span class="items-counter"></span>

* <label><input type="checkbox" /> Altere o prefixo das tabelas ([tutorial](http://www.maketecheasier.com/the-safe-way-to-change-your-wordpress-database-table-prefix){:target="_blank"})</label>
* <label><input type="checkbox" /> Configure backups semanais do seu banco de dados ([Backup WP](https://wordpress.org/plugins/backup-wp/){:target="_blank"}, [WP DB Backup](https://wordpress.org/plugins/wp-db-backup/){:target="_blank"}, etc.)</label>
* <label><input type="checkbox" /> Use senhas fortes com letras maiúsculas e minúsculas, números e caracteres especiais no usuário do banco de dados ([Gerador de Senhas](http://passwordsgenerator.net/){:target="_blank"} ou or [Password Meter]( https://www.safetydetectives.com/password-meter/){:target="_blank"}))</label>

## Hospedagem<span class="items-counter"></span>

* <label><input type="checkbox" /> Contrate uma hospedagem de confiança</label>
* <label><input type="checkbox" /> Acesse seu servidor apenas por SFTP ou SSH</label>
* <label><input type="checkbox" /> Configure as permissões das pastas para 755 e arquivos para 644 ([conforme a documentação](http://codex.wordpress.org/Hardening_WordPress#File_Permissions){:target="_blank"})</label>
* <label><input type="checkbox" /> Certifique-se que seu arquivo wp-config.php não possa ser acessado por outras pessoas</label>
* <label><input type="checkbox" /> Remova ou bloqueie via .htaccess os arquivos license.txt, wp-config-sample.php e readme.html</label>
* <label><input type="checkbox" /> Desabilite o editor pelo wp-config.php com o código: `define('DISALLOW_FILE_EDIT',true);`</label>
* <label><input type="checkbox" /> Previna a pesquisa de diretórios via .htaccess com o código: `Options All -Indexes`</label>
