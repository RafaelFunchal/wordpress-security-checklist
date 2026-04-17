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
* <label><input type="checkbox" /> Altere as chaves de segurança ([Gerador disponibilizado pelo WordPress.org](https://api.wordpress.org/secret-key/1.1/salt/){:target="_blank" rel="noopener noreferrer"})</label>
* <label><input type="checkbox" /> Desative o editor de arquivos com `define('DISALLOW_FILE_EDIT', true);` no `wp-config.php`</label>
* <label><input type="checkbox" /> Force HTTPS no admin com `define('FORCE_SSL_ADMIN', true);`</label>
* <label><input type="checkbox" /> Em produção, mantenha `WP_DEBUG` desligado para não expor informações sensíveis</label>

## Página de login<span class="items-counter"></span>

* <label><input type="checkbox" /> Ative proteção contra força bruta e limite de tentativas de login</label>
* <label><input type="checkbox" /> Ative autenticação de múltiplos fatores para administradores (passkeys/WebAuthn preferencialmente)</label>
* <label><input type="checkbox" /> Use nomes de usuário únicos (nunca `admin`) e evite contas compartilhadas</label>
* <label><input type="checkbox" /> Remova links para sua página de login (caso exista algum em seu tema)</label>
* <label><input type="checkbox" /> Use senhas fortes e únicas em todas as contas (com gerenciador de senhas)</label>
* <label><input type="checkbox" /> Revogue sessões antigas e altere senhas após incidentes ou troca de equipe</label>
* <label><input type="checkbox" /> Faça com que a mensagem de erro de login seja genérica (user/pass) ([tutorial](https://gist.github.com/zergiocosta/72f87176b236ed0c6e13){:target="_blank" rel="noopener noreferrer"})</label>
* <label><input type="checkbox" /> Mantenha XML-RPC desativado, exceto se você realmente precisar dele</label>

## Painel Administrativo<span class="items-counter"></span>

* <label><input type="checkbox" /> Proteja a pasta wp-admin com senha ([desbloqueie apenas os arquivos necessários](https://gist.github.com/rafaelfunchal/f9a41ea72d80600d753a){:target="_blank" rel="noopener noreferrer"})</label>
* <label><input type="checkbox" /> Atualize o WordPress para sua versão mais recente</label>
* <label><input type="checkbox" /> Não utilize uma conta com nome de usuário admin. Caso exista, crie uma nova conta e apague a antiga</label>
* <label><input type="checkbox" /> Crie uma conta Editor e use-a somente para publicar seu conteúdo</label>
* <label><input type="checkbox" /> Implemente SSL em toda seção administrativa</label>
* <label><input type="checkbox" /> Revise contas de administrador periodicamente e remova usuários inativos</label>
* <label><input type="checkbox" /> Escaneie o site regularmente em busca de malware e alterações inesperadas de arquivos</label>
* <label><input type="checkbox" /> Tenha um plano de resposta a incidentes com contenção, recuperação e rotação de segredos</label>

## Tema<span class="items-counter"></span>

* <label><input type="checkbox" /> Atualize o tema ativo para sua versão mais recente</label>
* <label><input type="checkbox" /> Apague temas inativos</label>
* <label><input type="checkbox" /> Apenas instale temas de fontes confiáveis</label>
* <label><input type="checkbox" /> Prefira temas com manutenção ativa, changelog claro e correções de segurança recentes</label>

## Plugins<span class="items-counter"></span>

* <label><input type="checkbox" /> Atualize todos os plugins para suas versões mais recentes</label>
* <label><input type="checkbox" /> Apague plugins inativos</label>
* <label><input type="checkbox" /> Apenas instale plugins de fontes confiáveis</label>
* <label><input type="checkbox" /> Substitua plugins desatualizados por versões alternativas atualizadas</label>
* <label><input type="checkbox" /> Pense bem antes de instalar uma centena de plugins</label>
* <label><input type="checkbox" /> Revise permissões dos plugins e remova os que pedem mais acesso do que você precisa</label>

## Banco de dados<span class="items-counter"></span>

* <label><input type="checkbox" /> Use credenciais fortes e únicas para o banco e mantenha apenas os privilégios necessários</label>
* <label><input type="checkbox" /> Configure backups automáticos com cópias externas (offsite)</label>
* <label><input type="checkbox" /> Teste restauração de backup regularmente</label>
* <label><input type="checkbox" /> Criptografe backups em trânsito e em repouso</label>

## Hospedagem<span class="items-counter"></span>

* <label><input type="checkbox" /> Contrate uma hospedagem de confiança</label>
* <label><input type="checkbox" /> Acesse seu servidor apenas por SFTP ou SSH</label>
* <label><input type="checkbox" /> Configure as permissões das pastas para 755 e arquivos para 644 ([conforme a documentação](https://developer.wordpress.org/advanced-administration/security/hardening/){:target="_blank" rel="noopener noreferrer"})</label>
* <label><input type="checkbox" /> Certifique-se que seu arquivo wp-config.php não possa ser acessado por outras pessoas</label>
* <label><input type="checkbox" /> Remova ou bloqueie via .htaccess os arquivos license.txt, wp-config-sample.php e readme.html</label>
* <label><input type="checkbox" /> Previna a pesquisa de diretórios via .htaccess com o código: `Options All -Indexes`</label>
* <label><input type="checkbox" /> Use WAF/CDN com proteção contra bots e DDoS quando possível</label>
* <label><input type="checkbox" /> Ative monitoramento e alertas (uptime, expiração de SSL, picos de login, malware)</label>
