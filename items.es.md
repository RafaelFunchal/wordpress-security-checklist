---
layout:    page
title:     es-ES
permalink: /items/
---

> En la mayoría de las veces que un sitio con WordPress és invadido la culpa no es de WordPress, pero si de algunos fallos tontos que se podrían haber evitado durante su construcción.
> Esa es la idea de este proyecto: Ser una lista de acciones que se debe tomar para aumentar la seguridad de su sitio.

## wp-config<span class="items-counter"></span>
* <label><input type="checkbox" /> Cambie las claves de seguridad ([Generador facilitado por WordPress.org](https://api.wordpress.org/secret-key/1.1/salt/){:target="_blank"})</label>

## Página de ingreso<span class="items-counter"></span>

* <label><input type="checkbox" /> Bloquear varios intentos de inicio de sesión ([Login Lockdown](https://wordpress.org/plugins/login-lockdown/){:target="_blank"} o [iThemes Security](https://wordpress.org/plugins/better-wp-security/){:target="_blank"} )</label>
* <label><input type="checkbox" /> Habilitar la autenticación de 2 pasos ([Google Authenticator for WordPress](https://wordpress.org/plugins/wp-google-authenticator/){:target="_blank"})</label>
* <label><input type="checkbox" /> Utilice el correo electrónico para iniciar sesión en lugar de un nombre de usuario ([Force Email Login](https://wordpress.org/plugins/force-email-login/){:target="_blank"})</label>
* <label><input type="checkbox" /> Cambie la dirección de la página de login ([iThemes Security](https://wordpress.org/plugins/better-wp-security/){:target="_blank"} o directamente por el .htaccess)</label>
* <label><input type="checkbox" /> Retire enlaces para su página de ingreso (si lo hay en su tema)</label>
* <label><input type="checkbox" /> Utilice contraseñas seguras con letras mayúsculas y minúsculas, números y caracteres especiales en todas las cuentas ([generador de contraseñas](http://passwordsgenerator.net/){:target="_blank"})</label>
* <label><input type="checkbox" /> Cambie su contraseña con regularidad</label>
* <label><input type="checkbox" /> Deje genérico el mensaje de error de la página de ingreso (usuario/clave) ([tutorial](https://gist.github.com/zergiocosta/72f87176b236ed0c6e13){:target="_blank"})</label>

## Panel Administrativo<span class="items-counter"></span>

* <label><input type="checkbox" /> Proteger la carpeta wp-admin con contraseña  ([desbloquear sólo los archivos necesarios](https://gist.github.com/rafaelfunchal/f9a41ea72d80600d753a){:target="_blank"})</label>
* <label><input type="checkbox" /> Mantenga WordPress actualizado en su última versión</label>
* <label><input type="checkbox" /> No utilice una cuenta con nombre de usuario "admin". Si la hay, cree una una nueva cuenta y borre la vieja</label>
* <label><input type="checkbox" /> Crear una cuenta de editor y usarla sólo para publicar contenido</label>
* <label><input type="checkbox" /> Implemente SSL en toda la sección administrativa</label>
* <label><input type="checkbox" /> Instale un plugin para comprobar si algún archivo fue editado ([WP Security Scan](https://wordpress.org/plugins/wp-security-scan/){:target="_blank"}, [Wordfence](https://wordpress.org/plugins/wordfence/){:target="_blank"} o [iThemes Security](https://wordpress.org/plugins/better-wp-security/){:target="_blank"})</label>
* <label><input type="checkbox" /> Escanear el sitio en busca de virus, malware y agujeros de seguridad</label>

## Plantilla<span class="items-counter"></span>

* <label><input type="checkbox" /> Actualizar la plantilla activa para su última versión</label>
* <label><input type="checkbox" /> Elimine plantillas inactivas</label>
* <label><input type="checkbox" /> Sólo instale plantillas de fuentes confiables</label>
* <label><input type="checkbox" /> Quite la versión de WordPress de la plantilla ([tutorial](http://www.wpbeginner.com/wp-tutorials/the-right-way-to-remove-wordpress-version-number/){:target="_blank"})</label>

## Plugins<span class="items-counter"></span>

* <label><input type="checkbox" /> Actualice todos los plugins para sus últimas versiones</label>
* <label><input type="checkbox" /> Elimine plugins inactivos</label>
* <label><input type="checkbox" /> Sólo instale plugins de fuentes confiables</label>
* <label><input type="checkbox" /> Reemplace plugins desactualizados por versiones alternativa actualizadas</label>
* <label><input type="checkbox" /> Piense antes de instalar cientos de plugins</label>

## Base de datos<span class="items-counter"></span>

* <label><input type="checkbox" /> Cambia el prefijo de las tablas ([tutorial](http://www.maketecheasier.com/the-safe-way-to-change-your-wordpress-database-table-prefix){:target="_blank"})</label>
* <label><input type="checkbox" /> Establezca copias de seguridad semanales de su base de datos ([Backup WP](https://wordpress.org/plugins/backup-wp/){:target="_blank"}, [WP DB Backup](https://wordpress.org/plugins/wp-db-backup/){:target="_blank"} etc. )</label>
* <label><input type="checkbox" /> Utilice contraseñas seguras con letras mayúsculas y minúsculas, números y caracteres especiales en el usuario de la base de datos ([generador de contraseñas](http://passwordsgenerator.net/){:target="_blank"})</label>

## Alojamiento (hosting)<span class="items-counter"></span>

* <label><input type="checkbox" /> Contrate un hosting confiable</label>
* <label><input type="checkbox" /> Acceda a su servidor sólo por SFTP o SSH</label>
* <label><input type="checkbox" /> Establecer permisos 755 para las carpetas y 644 a los archivos ([según la documentación](http://codex.wordpress.org/Hardening_WordPress#File_Permissions){:target="_blank"})</label>
* <label><input type="checkbox" /> Asegúrese de que su archivo wp-config.php no sea accesible por otros</label>
* <label><input type="checkbox" /> Retire o bloquee a través del .htaccess los archivos license.txt, WP-config-sample.php y readme.html</label>
* <label><input type="checkbox" /> Desactivar el editor por el wp-config.php con el código: `define('DISALLOW_FILE_EDIT',true);`</label>
* <label><input type="checkbox" /> Impida la busca de directorios a través del .htaccess con el código: `Options All -Indexes`</label>
