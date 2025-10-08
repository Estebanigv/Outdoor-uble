# Outdoor Ñuble - Rafting Landing Page

Landing page informativa para Outdoor Ñuble, empresa de rafting en el Río Ñuble, San Fabián, Chile.

## 🚀 Tecnologías

- **Framework:** Next.js 15 (App Router)
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS
- **Componentes UI:** shadcn/ui
- **Formularios:** React Hook Form + Zod
- **Email:** Resend
- **SEO:** next-sitemap

## 📋 Características

### Secciones de la Landing Page

- **Hero:** Presentación principal con CTA a WhatsApp
- **Sobre la Experiencia:** Descripción del tour y características principales
- **Itinerario:** Cronograma detallado del día
- **Qué Incluye:** Lista de servicios incluidos
- **Qué Traer:** Recomendaciones para participantes
- **Seguridad:** Información sobre medidas de seguridad
- **Galería:** Galería de fotos con lightbox
- **FAQ:** Preguntas frecuentes con acordeón
- **Contacto:** Formulario de contacto

### Funcionalidades

- ✅ Diseño responsive (móvil, tablet, desktop)
- ✅ Navegación por anclas con smooth scroll
- ✅ WhatsApp floating button con mensaje predefinido
- ✅ Formulario de contacto con validación
- ✅ Envío de emails vía Resend
- ✅ SEO optimizado
- ✅ Sitemap automático
- ✅ robots.txt configurado

## 🛠️ Instalación y Configuración

### 1. Instalar dependencias

```bash
pnpm install
```

### 2. Configurar variables de entorno

Edita el archivo `.env.local` con tus credenciales:

```env
# Resend API Key (obtener en https://resend.com/api-keys)
RESEND_API_KEY=tu_api_key_aqui

# Email que recibirá los mensajes del formulario
MAIL_TO=info@outdoornuble.cl

# Email remitente (debe estar verificado en Resend)
RESEND_FROM_EMAIL=Outdoor Ñuble <onboarding@resend.dev>

# URL del sitio
SITE_URL=https://www.outdoornuble.cl
```

### 3. Agregar imágenes de la galería

Coloca tus imágenes en `public/images/gallery/`:
- `rafting-1.jpg`
- `rafting-2.jpg`
- `rafting-3.jpg`
- `rafting-4.jpg`
- `rafting-5.jpg`
- `rafting-6.jpg`

**Tamaño recomendado:** 1200x800px

### 4. Iniciar servidor de desarrollo

```bash
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📦 Scripts Disponibles

```bash
pnpm dev          # Desarrollo con Turbopack
pnpm build        # Compilar para producción + generar sitemap
pnpm start        # Servidor de producción
pnpm lint         # Ejecutar ESLint
```

## 🎨 Personalización

### Modificar contenido

Edita `content/rafting.json` para cambiar:
- Textos de todas las secciones
- Teléfono de contacto
- Información del tour
- Preguntas frecuentes

### Modificar SEO

Edita la metadata en:
- `app/layout.tsx` - Metadata principal
- `next-sitemap.config.js` - Configuración del sitemap

## 📧 Configuración de Email (Resend)

1. Crea una cuenta en [resend.com](https://resend.com)
2. Obtén tu API Key en el dashboard
3. Agrégala a `.env.local`
4. (Opcional) Verifica tu dominio personalizado

## 🌐 Deployment

### Vercel (Recomendado)

1. Sube tu código a GitHub
2. Importa en [vercel.com](https://vercel.com)
3. Configura las variables de entorno
4. Deploy automático ✨

### Otras plataformas

Compatible con:
- Netlify
- Railway
- Render
- AWS Amplify

## 📝 Notas Importantes

- Las imágenes de galería son placeholders - reemplázalas con fotos reales
- Actualiza el teléfono en `content/rafting.json`
- El plan gratuito de Resend permite 100 emails/día
- Verifica que el email remitente esté autorizado en Resend

## 🐛 Troubleshooting

**El formulario no envía emails:**
- Verifica `RESEND_API_KEY` en `.env.local`
- Revisa que el email remitente esté verificado
- Revisa la consola del navegador

**Las imágenes no cargan:**
- Asegúrate de que existan en `public/images/gallery/`
- Verifica nombres en `content/rafting.json`

**Error de compilación:**
```bash
pnpm install
rm -rf .next
pnpm build
```
