# Exclusive Gym

Landing estática en HTML, CSS y JavaScript, con fotografías reales aportadas por el usuario. Sin dependencias de ejecución ni instalación.

## Vista local

`npm run dev` abre el servidor en http://localhost:5173. `npm run check` verifica sintaxis, anclas y archivos. `npm run build` genera `dist/`.

## Configuración

Editar `config.js` para cambiar precios, modalidad, horarios, dirección, fotos y redes. WhatsApp está conectado al número del gimnasio: +54 9 11 3023-1999. Todos los botones abren WhatsApp con un mensaje específico y `whatsappIsPlaceholder` queda en `false`.

La cuota mensual y los precios de pase diario, promo horario y planes de 3, 6 y 12 meses provienen del cartel aportado el 15 de octubre de 2026. Los planes de varios meses muestran el precio total. La condición de inscripción de a dos para nuevos socios se mantiene del brief original. El cartel indica $48.000 para la promo de 11 a 15 hs; se muestra ese precio sin calcular descuentos adicionales.

## Vercel

Importar el repositorio en Vercel y usar la configuración incluida. El directorio de salida es `dist`; el comando es `npm run build`. Configurar `SITE_URL` con el dominio final, incluyendo `https://`, para generar sitemap, URL canónica y Open Graph absoluto. No requiere backend. La web no fue desplegada automáticamente.

## Imágenes y fuentes

Las cinco fotos están optimizadas a WebP; el logo PNG original conserva sus proporciones. Los archivos originales permanecen en su ubicación. Barlow y Barlow Condensed se sirven localmente desde `assets/`; licencia SIL Open Font License. Galería con diálogo nativo, navegación con flechas y cierre con Escape. Movimiento reducido respetado.
