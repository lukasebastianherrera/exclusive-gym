# Exclusive Gym design

El diseño deriva del logo negro y dorado y de las fotos reales, incluyendo la iluminación roja que ya existe en el salón.

## Tokens

Fondo #111111, superficies #1B1B1B y #161616, acento #D4AF37, hover #F1D77A, lectura #FFFFFF y secundaria #BDBDBD. Barlow Condensed 700 para títulos y precios; Barlow para interfaz y cuerpo. Títulos hasta 96 px en desktop, 42 px en mobile. Contenido máximo 1240 px, márgenes de 20 px en mobile. Secciones con 112 px de padding desktop y 66 px mobile. Radio de 4 px en botones y fotos; 12 px en precios, mapa y diálogos.

## Composición y comportamiento

Portada a sangre con superposición oscura y título a la izquierda. Franja de promoción debajo. Presentación en dos columnas, galería asimétrica de cinco fotos, dos tarifas con mayor énfasis en nuevos socios, horarios en filas, dirección con mapa y cierre fotográfico. Header fijo, menú móvil bajo 640 px, galería por diálogo nativo y contacto de demostración mientras falte el número. Hero con entrada única y hover discreto. Movimiento reducido anula animación y scroll suave.

## Verificación

Se comprobaron portada en escritorio y mobile, navegación hamburguesa, cambio de fotografía, cierre de diálogo y aviso de contacto. No se detectaron errores JavaScript en consola. Mapas depende del servicio externo; dirección y marcador deben validarse antes de publicación. Tarifas sin modalidad mensual asumida. Datos de ejemplo de WhatsApp aislados en config.js.
