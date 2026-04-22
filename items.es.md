---
layout:    page
title:     Español
permalink: /es/items/
language: es
subset: root
checklist: true
---

{% assign ti = site.data.strings.locales | where: 'code', page.language | first %}

> La mayoría de las veces, cuando un sitio con WordPress es comprometido, la culpa no es de WordPress, sino de fallos evitables durante su construcción.
> Esa es la idea de este proyecto: una lista de acciones que debe tomar para aumentar la seguridad de su sitio.

## wp-config<span class="items-counter"></span>
* <label><input type="checkbox" data-item-id="wsc-wpconfig-secret-keys" /> Cambie las claves de seguridad ([Generador de WordPress.org](https://api.wordpress.org/secret-key/1.1/salt/){:target="_blank" rel="noopener noreferrer"})</label>
* <label><input type="checkbox" data-item-id="wsc-wpconfig-disallow-file-edit" /> Desactive el editor de archivos con `define('DISALLOW_FILE_EDIT', true);` en `wp-config.php`</label>
* <label><input type="checkbox" data-item-id="wsc-wpconfig-force-ssl-admin" /> Fuerce HTTPS en el panel con `define('FORCE_SSL_ADMIN', true);`</label>
* <label><input type="checkbox" data-item-id="wsc-wpconfig-wp-debug-off" /> En producción, mantenga `WP_DEBUG` desactivado para no filtrar datos sensibles</label>

## Página de ingreso<span class="items-counter"></span>

* <label><input type="checkbox" data-item-id="wsc-login-brute-rate-limit" /> Active protección contra fuerza bruta y límite de intentos de acceso</label>
* <label><input type="checkbox" data-item-id="wsc-login-mfa-admins" /> Habilite autenticación multifactor para administradores (preferiblemente passkeys/WebAuthn)</label>
* <label><input type="checkbox" data-item-id="wsc-login-unique-usernames" /> Use usuarios únicos (nunca `admin`) y evite cuentas compartidas</label>
* <label><input type="checkbox" data-item-id="wsc-login-remove-theme-links" /> Retire enlaces para su página de ingreso (si lo hay en su tema)</label>
* <label><input type="checkbox" data-item-id="wsc-login-strong-passwords" /> Utilice contraseñas fuertes y únicas en todas las cuentas (idealmente generadas por gestor de contraseñas)</label>
* <label><input type="checkbox" data-item-id="wsc-login-periodic-password-change" /> Cambie su contraseña con regularidad</label>
* <label><input type="checkbox" data-item-id="wsc-login-revoke-sessions-rotate" /> Cierre sesiones antiguas y rote contraseñas después de incidentes o cambios de equipo</label>
* <label><input type="checkbox" data-item-id="wsc-login-generic-errors" /> Deje genérico el mensaje de error de la página de ingreso (usuario/clave) ([tutorial](https://gist.github.com/zergiocosta/72f87176b236ed0c6e13){:target="_blank" rel="noopener noreferrer"})</label>

## Panel Administrativo<span class="items-counter"></span>

* <label><input type="checkbox" data-item-id="wsc-admin-wpadmin-password" /> Proteja la carpeta wp-admin con contraseña ([desbloquear sólo los archivos necesarios](https://gist.github.com/rafaelfunchal/f9a41ea72d80600d753a){:target="_blank" rel="noopener noreferrer"})</label>
* <label><input type="checkbox" data-item-id="wsc-admin-core-plugins-updated" /> Mantenga WordPress actualizado en su última versión</label>
* <label><input type="checkbox" data-item-id="wsc-admin-no-default-admin-user" /> No utilice una cuenta con nombre de usuario "admin". Si la hay, cree una nueva cuenta y borre la antigua</label>
* <label><input type="checkbox" data-item-id="wsc-admin-editor-publishing-account" /> Cree una cuenta de editor y úsela sólo para publicar contenido</label>
* <label><input type="checkbox" data-item-id="wsc-admin-ssl-wp-admin" /> Implemente SSL en toda la sección administrativa</label>
* <label><input type="checkbox" data-item-id="wsc-admin-review-admins-quarterly" /> Revise cuentas de administrador cada trimestre y elimine usuarios inactivos</label>
* <label><input type="checkbox" data-item-id="wsc-admin-malware-scheduled-scan" /> Escanee el sitio periódicamente en busca de malware y cambios inesperados de archivos</label>
* <label><input type="checkbox" data-item-id="wsc-admin-incident-response-plan" /> Mantenga un plan de respuesta a incidentes (contención, recuperación y rotación de secretos)</label>

## Plantilla<span class="items-counter"></span>

* <label><input type="checkbox" data-item-id="wsc-theme-keep-updated" /> Actualice la plantilla activa a su última versión</label>
* <label><input type="checkbox" data-item-id="wsc-theme-remove-unused" /> Elimine plantillas inactivas</label>
* <label><input type="checkbox" data-item-id="wsc-theme-reputable-sources" /> Sólo instale plantillas de fuentes confiables</label>
* <label><input type="checkbox" data-item-id="wsc-theme-active-maintenance" /> Prefiera plantillas con mantenimiento activo, changelog y correcciones de seguridad recientes</label>

## Plugins<span class="items-counter"></span>

* <label><input type="checkbox" data-item-id="wsc-plugin-keep-updated" /> Actualice todos los plugins para sus últimas versiones</label>
* <label><input type="checkbox" data-item-id="wsc-plugin-remove-unused" /> Elimine plugins inactivos</label>
* <label><input type="checkbox" data-item-id="wsc-plugin-reputable-sources" /> Sólo instale plugins de fuentes confiables</label>
* <label><input type="checkbox" data-item-id="wsc-plugin-replace-abandoned" /> Reemplace plugins desactualizados por versiones alternativas actualizadas</label>
* <label><input type="checkbox" data-item-id="wsc-plugin-think-before-many" /> Piense antes de instalar cientos de plugins</label>
* <label><input type="checkbox" data-item-id="wsc-plugin-audit-capabilities" /> Audite permisos de plugins y quite los que piden más acceso del necesario</label>

## Base de datos<span class="items-counter"></span>

* <label><input type="checkbox" data-item-id="wsc-db-strong-user-privileges" /> Use credenciales fuertes y únicas para la base de datos, con privilegios mínimos</label>
* <label><input type="checkbox" data-item-id="wsc-db-backups-offsite" /> Configure copias de seguridad automáticas y guarde copias fuera del servidor (offsite)</label>
* <label><input type="checkbox" data-item-id="wsc-db-test-restores" /> Pruebe restauraciones de backup de forma periódica</label>
* <label><input type="checkbox" data-item-id="wsc-db-encrypt-backups" /> Cifre los backups en tránsito y en reposo</label>

## Alojamiento (hosting)<span class="items-counter"></span>

* <label><input type="checkbox" data-item-id="wsc-hosting-reliable" /> Contrate un hosting confiable</label>
* <label><input type="checkbox" data-item-id="wsc-hosting-sftp-ssh-only" /> Acceda a su servidor sólo por SFTP o SSH</label>
* <label><input type="checkbox" data-item-id="wsc-hosting-permissions-755-644" /> Establezca permisos 755 para carpetas y 644 para archivos ([Guía de seguridad y fortalecimiento de WordPress](https://developer.wordpress.org/advanced-administration/security/hardening/){:target="_blank" rel="noopener noreferrer"})</label>
* <label><input type="checkbox" data-item-id="wsc-hosting-wpconfig-protected" /> Asegúrese de que su archivo wp-config.php no sea accesible por otros</label>
* <label><input type="checkbox" data-item-id="wsc-hosting-block-sensitive-files" /> Retire o bloquee a través del .htaccess los archivos license.txt, wp-config-sample.php y readme.html</label>
* <label><input type="checkbox" data-item-id="wsc-hosting-no-directory-listing" /> Impida el listado de directorios a través del .htaccess con el código: `Options All -Indexes`</label>
* <label><input type="checkbox" data-item-id="wsc-hosting-waf-cdn" /> Use WAF/CDN con protección contra bots y DDoS cuando sea posible</label>
* <label><input type="checkbox" data-item-id="wsc-hosting-monitoring-alerts" /> Active monitoreo y alertas (uptime, SSL, intentos de login, malware)</label>
* <label><input type="checkbox" data-item-id="wsc-login-xmlrpc-off" /> Mantenga XML-RPC desactivado salvo que lo necesite explícitamente</label>
* <label><input type="checkbox" data-item-id="wsc-login-block-author-enumeration" /> Evite la enumeración de usuarios en peticiones públicas (por ejemplo `?author=` con ID numérico): reglas en el servidor (Apache `.htaccess`, nginx), un plugin de seguridad o desactive los archivos de autor públicos si no los necesita ([Guía de seguridad y fortalecimiento de WordPress](https://developer.wordpress.org/advanced-administration/security/hardening/){:target="_blank" rel="noopener noreferrer"}).</label>
    <details class="checklist-item-details">
    <summary>{{ ti.checklist_author_enum_details_summary }}</summary>
    <pre><code># Bloquea sondas con author= numérico (301 quita la query)
RewriteEngine On
RewriteCond %{QUERY_STRING} ^author=\d [NC]
RewriteRule ^ %{REQUEST_URI}? [L,R=301]
</code></pre>
    </details>
