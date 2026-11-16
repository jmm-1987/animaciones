# Vídeos de JM2

Abre `index.html`: biblioteca con el estilo aprobado, el vídeo de recepción de facturas y cuatro piezas sobre negocios.

## Planning y carruseles

`planning.html` reúne nueve publicaciones durante tres semanas, los lunes, miércoles y viernes: cinco vídeos y cuatro carruseles. Un quinto carrusel queda en reserva para sustituir un vídeo pendiente de voz o comenzar la semana siguiente. Indica qué vídeos tienen voz y cuáles siguen pendientes. No publica en redes ni reserva horas automáticamente.

Cada carrusel tiene seis imágenes PNG de 1080 × 1350, un ZIP descargable, vista previa y textos para Instagram y TikTok. Los archivos están en `carruseles/`; las páginas de revisión son `carrusel-*.html`.

- `contenido-social.cjs`: guiones de los carruseles y textos de publicación.
- `planning-datos.cjs`: fechas explícitas, temas y objetivos de las nueve publicaciones; los exportadores usan esas fechas también al cambiar de mes.
- `crear-planning.cjs`: genera páginas, textos, CSV y calendario ICS.
- `carruseles.css`: diseño de las diapositivas y vista previa.
- `exportar-carruseles.mjs`: exporta los PNG mediante el Chrome local de revisión en el puerto 9241.

Tras cambiar contenido, ejecuta `node crear-planning.cjs`, vuelve a exportar las imágenes y actualiza los ZIP. Cambiar el HTML no actualiza por sí solo los PNG ya exportados. `node construir-biblioteca.cjs` conserva el acceso al planning en la portada.

## Serie de negocios

- `video-fontanero.html`: preparar, revisar, emitir y enviar la factura después de una reparación.
- `video-climatizacion.html`: presupuestos con equipo, instalación y tarifas.
- `video-cobros.html`: pendientes, vencimientos y cobros confirmados, con el autónomo en su oficina.
- `video-taller-movil.html`: facturar mano de obra y recambios desde el móvil.

`negocios.cjs` contiene sus mensajes, guiones y textos de publicación; `escenas-negocios.cjs`, sus ilustraciones y demostraciones; `serie-negocios.css`, sus composiciones. Todas reutilizan la plantilla y la dirección visual aprobadas.

```powershell
node crear-negocios.cjs
```

Este comando reconstruye las cuatro piezas, sus guiones y la biblioteca. `node construir-biblioteca.cjs` reconstruye solo el índice. El estado de voz de cada tarjeta se obtiene del catálogo de audio. Las nuevas piezas duran 24 segundos de referencia, con guiones breves y apariciones rápidas. Al incorporar la voz se ajustan sus marcas, manteniendo una pronunciación natural.

## Trabajar en el vídeo

- `piloto-marca.cjs`: escenas, textos y locución de facturas.
- `piloto-marca.css`: dirección visual aprobada, fondo blanco y demostraciones.
- `piloto-marca.js`: sincronización de la recepción y aparición del registro.
- `plantilla-video.cjs` y `plantilla-video.css`: reproductor y página común para las siguientes piezas.
- `robot.cjs`: robot de taller con `brand_logo.png`.
- `audio/generados/facturas.mp3`: locución actual.
- `audio/generados/catalogo.json`: audio y tiempos; `audio/catalogo.js` es su copia para el navegador.
- `guiones/`: texto y subtítulos del vídeo actual.

Después de cambiar las escenas o los textos:

```powershell
node piloto-marca.cjs
```

La página conserva la sincronización guardada. Si cambia la voz, hay que volver a medir sus pausas y actualizar los tiempos.

## Criterio para los siguientes vídeos

Una situación concreta del cliente, la herramienta que creamos y el cambio que aporta. Mostrar el proceso con ejemplos visuales; textos breves; blanco como base; robot secundario; cierre y logotipo centrados. Sin cifras de ahorro inventadas ni clientes ficticios presentados como reales.

Para añadir otra pieza, reutilizar `createVideo(story, ending)` de `plantilla-video.cjs`, con su propio archivo, audio, marcas y escenas. Cada pieza debe incluir `story.publications.instagram` y `story.publications.tiktok`: textos específicos para publicar junto al vídeo, con sus hashtags. La plantilla exige ambos, los muestra en «Texto para publicar» con botones de copia y guarda los TXT en `guiones/`. Añadir su tarjeta al índice cuando esté lista. No se generan versiones alternativas ni series provisionales.

Los materiales anteriores se conservan únicamente en `archivo/versiones-anteriores.zip`, fuera de la biblioteca activa. No son necesarios para regenerar el vídeo actual.
