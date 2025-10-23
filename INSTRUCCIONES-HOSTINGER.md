# 📦 Instrucciones para Deploy en Hostinger

## ✅ Archivos Preparados
Tu sitio ha sido convertido a archivos estáticos (HTML, CSS, JS) y está 100% listo para Hostinger.

## 📋 Pasos para Subir a Hostinger

### 1️⃣ Accede a tu Panel de Hostinger
1. Ve a [https://hpanel.hostinger.com/](https://hpanel.hostinger.com/)
2. Inicia sesión con tu cuenta
3. Selecciona tu dominio (outdoornuble.cl)

### 2️⃣ Abre el Administrador de Archivos
1. En el panel, busca "Administrador de archivos" o "File Manager"
2. Haz clic para abrirlo
3. Navega a la carpeta `public_html` (esta es la carpeta raíz de tu sitio web)

### 3️⃣ Sube los Archivos
1. **IMPORTANTE**: Elimina cualquier archivo antiguo en `public_html` (excepto `.htaccess` si existe)
2. En tu computadora, ve a la carpeta: `E:\Proyectos Webs\Outdoor Ñuble\outdoor-nuble\out`
3. Selecciona **TODOS** los archivos y carpetas dentro de `out`:
   - `_next` (carpeta)
   - `images` (carpeta)
   - `contacto.html`
   - `favicon.ico`
   - `favicon.png`
   - `index.html`
   - `nosotros.html`
   - `send-email.php` ⭐ (MUY IMPORTANTE)
   - `sitemap.xml`
   - `robots.txt`
   - Todos los demás archivos
4. Arrastra y suelta todos los archivos a `public_html` en Hostinger

### 4️⃣ Configura el Archivo PHP
1. En el Administrador de Archivos de Hostinger, busca el archivo `send-email.php`
2. Haz clic derecho → "Editar" o "Edit"
3. Busca la línea 33 que dice:
   ```php
   $to = 'contacto@outdoornuble.cl';
   ```
4. **CAMBIA** este email por el email real donde quieres recibir los mensajes del formulario
5. Guarda el archivo (Ctrl+S o botón Save)

### 5️⃣ Verifica los Permisos
1. En el Administrador de Archivos, haz clic derecho en `send-email.php`
2. Selecciona "Permisos" o "Permissions"
3. Asegúrate que tenga permisos `644` o `755`
4. Guarda los cambios

### 6️⃣ Prueba tu Sitio
1. Abre tu navegador y ve a: `https://www.outdoornuble.cl`
2. Navega por el sitio:
   - ✅ Página principal debe cargar
   - ✅ Página "Nosotros" debe funcionar
   - ✅ Página "Contacto" debe funcionar
3. **Prueba el formulario de contacto**:
   - Llena todos los campos
   - Envía el formulario
   - Deberías recibir un email en la dirección que configuraste
   - Deberías ver mensaje de "¡Mensaje enviado con éxito!"

## 🔧 Solución de Problemas

### ❌ Si el formulario no envía emails:

**Problema 1: Email no configurado**
- Asegúrate de haber cambiado el email en `send-email.php` (línea 33)

**Problema 2: PHP deshabilitado**
- En Hostinger, ve a "PHP Configuration" o "Configuración de PHP"
- Asegúrate que PHP esté activado (versión 7.4 o superior recomendada)

**Problema 3: Función mail() bloqueada**
- Algunos planes de Hostinger requieren autenticación SMTP
- Contacta a soporte de Hostinger si el email no funciona
- Alternativa: Puedo modificar el PHP para usar SMTP autenticado

**Problema 4: Error 403 o 500**
- Verifica los permisos del archivo `send-email.php` (deben ser 644 o 755)
- Revisa el log de errores en Hostinger panel

### ❌ Si las páginas no cargan:

**Problema: Error 404**
- Verifica que todos los archivos estén en `public_html` (NO en una subcarpeta)
- El archivo principal debe llamarse `index.html`

**Problema: Imágenes no cargan**
- Asegúrate que la carpeta `images` esté completa en `public_html`
- Verifica que la carpeta `_next` también esté subida

## 📧 Email de Contacto

Recuerda configurar estas variables en `send-email.php`:

```php
// Línea 33 - Email donde recibirás los mensajes
$to = 'contacto@outdoornuble.cl'; // CAMBIA ESTO

// Líneas 177-178 - Email que se mostrará como remitente
$headers .= "From: Outdoor Ñuble <no-reply@outdoornuble.cl>\r\n";
```

**Recomendación**: Usa un email que exista en tu dominio, por ejemplo:
- `contacto@outdoornuble.cl`
- `info@outdoornuble.cl`

## 🚀 Actualizaciones Futuras

Cuando necesites hacer cambios:

1. Modifica los archivos en tu proyecto local
2. Ejecuta en la terminal:
   ```bash
   cd "E:\Proyectos Webs\Outdoor Ñuble\outdoor-nuble"
   pnpm build
   ```
3. Los archivos actualizados estarán en la carpeta `out`
4. Sube solo los archivos modificados a Hostinger

## 🔐 Seguridad

El archivo `send-email.php` incluye:
- ✅ Validación de campos requeridos
- ✅ Sanitización de datos para prevenir XSS
- ✅ Validación de email
- ✅ Headers CORS configurados
- ✅ Solo acepta método POST

## 📞 Soporte

Si tienes problemas:
1. Revisa los logs de error en Hostinger panel
2. Contacta al soporte de Hostinger (tienen chat 24/7)
3. Puedes pedirme ayuda para ajustar el código PHP si es necesario

---

## ✅ Checklist Final

Antes de dar por terminado el deploy:

- [ ] Todos los archivos de la carpeta `out` subidos a `public_html`
- [ ] Email configurado en `send-email.php` (línea 33)
- [ ] Permisos de `send-email.php` verificados (644 o 755)
- [ ] Sitio web carga correctamente en el navegador
- [ ] Página principal funciona
- [ ] Página Nosotros funciona
- [ ] Página Contacto funciona
- [ ] Formulario de contacto envía y recibe emails
- [ ] Favicon visible en el navegador
- [ ] Redes sociales en footer funcionan

¡Listo! Tu sitio está online en Hostinger 🎉
