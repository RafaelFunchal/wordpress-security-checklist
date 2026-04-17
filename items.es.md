---
layout:    page
title:     es-ES
permalink: /es/items/
language: es
subset: root
---

> En la mayoría de las veces que un sitio con WordPress és invadido la culpa no es de WordPress, pero si de algunos fallos tontos que se podrían haber evitado durante su construcción.
> Esa es la idea de este proyecto: Ser una lista de acciones que se debe tomar para aumentar la seguridad de su sitio.

## wp-config<span class="items-counter"></span>
* <label><input type="checkbox" /> Cambie las claves de seguridad ([Generador de WordPress.org](https://api.wordpress.org/secret-key/1.1/salt/){:target="_blank" rel="noopener noreferrer"})</label>
* <label><input type="checkbox" /> Desactive el editor de archivos con `define('DISALLOW_FILE_EDIT', true);` en `wp-config.php`</label>
* <label><input type="checkbox" /> Fuerce HTTPS en el panel con `define('FORCE_SSL_ADMIN', true);`</label>
* <label><input type="checkbox" /> En producción, mantenga `WP_DEBUG` desactivado para no filtrar datos sensibles</label>

## Página de ingreso<span class="items-counter"></span>

* <label><input type="checkbox" /> Active protección contra fuerza bruta y límite de intentos de acceso</label>
* <label><input type="checkbox" /> Habilite autenticación multifactor para administradores (preferiblemente passkeys/WebAuthn)</label>
* <label><input type="checkbox" /> Use usuarios únicos (nunca `admin`) y evite cuentas compartidas</label>
* <label><input type="checkbox" /> Retire enlaces para su página de ingreso (si lo hay en su tema)</label>
* <label><input type="checkbox" /> Utilice contraseñas fuertes y únicas en todas las cuentas (idealmente generadas por gestor de contraseñas)</label>
* <label><input type="checkbox" /> Cambie su contraseña con regularidad</label>
* <label><input type="checkbox" /> Cierre sesiones antiguas y rote contraseñas después de incidentes o cambios de equipo</label>
* <label><input type="checkbox" /> Deje genérico el mensaje de error de la página de ingreso (usuario/clave) ([tutorial](https://gist.github.com/zergiocosta/72f87176b236ed0c6e13){:target="_blank" rel="noopener noreferrer"})</label>
* <label><input type="checkbox" /> Mantenga XML-RPC desactivado salvo que lo necesite explícitamente</label>

## Panel Administrativo<span class="items-counter"></span>

* <label><input type="checkbox" /> Proteger la carpeta wp-admin con contraseña ([desbloquear sólo los archivos necesarios](https://gist.github.com/rafaelfunchal/f9a41ea72d80600d753a){:target="_blank" rel="noopener noreferrer"})</label>
* <label><input type="checkbox" /> Mantenga WordPress actualizado en su última versión</label>
* <label><input type="checkbox" /> No utilice una cuenta con nombre de usuario "admin". Si la hay, cree una una nueva cuenta y borre la vieja</label>
* <label><input type="checkbox" /> Crear una cuenta de editor y usarla sólo para publicar contenido</label>
* <label><input type="checkbox" /> Implemente SSL en toda la sección administrativa</label>
* <label><input type="checkbox" /> Revise cuentas de administrador cada trimestre y elimine usuarios inactivos</label>
* <label><input type="checkbox" /> Escanee el sitio periódicamente en busca de malware y cambios inesperados de archivos</label>
* <label><input type="checkbox" /> Mantenga un plan de respuesta a incidentes (contención, recuperación y rotación de secretos)</label>

## Plantilla<span class="items-counter"></span>

* <label><input type="checkbox" /> Actualizar la plantilla activa para su última versión</label>
* <label><input type="checkbox" /> Elimine plantillas inactivas</label>
* <label><input type="checkbox" /> Sólo instale plantillas de fuentes confiables</label>
* <label><input type="checkbox" /> Prefiera plantillas con mantenimiento activo, changelog y correcciones de seguridad recientes</label>

## Plugins<span class="items-counter"></span>

* <label><input type="checkbox" /> Actualice todos los plugins para sus últimas versiones</label>
* <label><input type="checkbox" /> Elimine plugins inactivos</label>
* <label><input type="checkbox" /> Sólo instale plugins de fuentes confiables</label>
* <label><input type="checkbox" /> Reemplace plugins desactualizados por versiones alternativa actualizadas</label>
* <label><input type="checkbox" /> Piense antes de instalar cientos de plugins</label>
* <label><input type="checkbox" /> Audite permisos de plugins y quite los que piden más acceso del necesario</label>

## Base de datos<span class="items-counter"></span>

* <label><input type="checkbox" /> Use credenciales fuertes y únicas para la base de datos, con privilegios mínimos</label>
* <label><input type="checkbox" /> Configure copias de seguridad automáticas y guarde copias fuera del servidor (offsite)</label>
* <label><input type="checkbox" /> Pruebe restauraciones de backup de forma periódica</label>
* <label><input type="checkbox" /> Cifre los backups en tránsito y en reposo</label>

## Alojamiento (hosting)<span class="items-counter"></span>

* <label><input type="checkbox" /> Contrate un hosting confiable</label>
* <label><input type="checkbox" /> Acceda a su servidor sólo por SFTP o SSH</label>
* <label><input type="checkbox" /> Establecer permisos 755 para carpetas y 644 para archivos ([según la documentación](https://developer.wordpress.org/advanced-administration/security/hardening/){:target="_blank" rel="noopener noreferrer"})</label>
* <label><input type="checkbox" /> Asegúrese de que su archivo wp-config.php no sea accesible por otros</label>
* <label><input type="checkbox" /> Retire o bloquee a través del .htaccess los archivos license.txt, WP-config-sample.php y readme.html</label>
* <label><input type="checkbox" /> Impida la busca de directorios a través del .htaccess con el código: `Options All -Indexes`</label>
* <label><input type="checkbox" /> Use WAF/CDN con protección contra bots y DDoS cuando sea posible</label>
* <label><input type="checkbox" /> Active monitoreo y alertas (uptime, SSL, intentos de login, malware)</label>
