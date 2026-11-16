# Vídeos de JM2

Abre `index.html`: biblioteca con el estilo aprobado y el vídeo de facturas.

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
