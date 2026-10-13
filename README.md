# Exclusive Gym

Landing estática en HTML, CSS y JavaScript, con fotografías reales aportadas por el usuario. Sin dependencias de ejecución ni instalación.

## Vista local

`npm run dev` abre el servidor en http://localhost:5173. `npm run check` verifica sintaxis, anclas y archivos. `npm run build` genera `dist/`.

## Configuración

Editar `config.js` para cambiar precios, modalidad, horarios, dirección, fotos y redes. El número `5491100000000` es un ejemplo. Los botones muestran un aviso de demostración mientras `whatsappIsPlaceholder` sea `true`, evitando enviar consultas a un número desconocido. Al ingresar el número real, poner esa propiedad en `false`: todos los botones abrirán WhatsApp con su mensaje específico.

No se asume que los precios sean mensuales. Completar `pricePeriod` cuando se confirme. Las tarifas y los horarios son los del brief; validar con el gimnasio antes de publicar. El mapa busca la dirección suministrada; comprobar el marcador antes del lanzamiento.

## Vercel

Importar el repositorio en Vercel y usar la configuración incluida. El directorio de salida es `dist`; el comando es `npm run build`. Configurar `SITE_URL` con el dominio final, incluyendo `https://`, para generar sitemap, URL canónica y Open Graph absoluto. No requiere backend. La web no fue desplegada automáticamente.

## Imágenes y fuentes

Las cinco fotos están optimizadas a WebP; el logo PNG original conserva sus proporciones. Los archivos originales permanecen en su ubicación. Barlow y Barlow Condensed se sirven localmente desde `assets/`; licencia SIL Open Font License. Galería con diálogo nativo, navegación con flechas y cierre con Escape. Movimiento reducido respetado.
