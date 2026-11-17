# Vídeos de JM2

## Facturación a medida para oficios

`video-facturacion-oficios.html` y su MP4 muestran una demo de 60 segundos dirigida a fontaneros, electricistas, instaladores y pintores. Empieza con el trabajo terminado y apuntes pendientes; después muestra selección de cliente, mano de obra y materiales, importes, revisión, emisión simulada, presupuesto convertible a factura y PDF. Incluye ilustraciones originales de los cuatro oficios y un móvil realista. No lleva precio comercial ni voz incorporada.

La demostración se basa en las funciones descritas en el proyecto `Trabajos/Facturas` y en la serie existente. Usa datos ficticios, no accede a su base de datos, no emite facturas fiscales y no envía documentos. Las cantidades e impuestos son un ejemplo visual, no una tarifa para el cliente.

`node crear-facturacion-oficios.cjs` regenera el vídeo, los guiones y la biblioteca. `oficios-arte.cjs` contiene las ilustraciones y `facturacion-oficios.js` sincroniza la demostración. Con el servidor local en 8767 y Chrome de revisión en 9243, `node revisar-facturacion.mjs` comprueba el recorrido y los cálculos. `node exportar-bocateria.mjs --file=video-facturacion-oficios.html` exporta el MP4; `--review-only` comprueba el encuadre sin exportar.

## Bocaterías y carta de bares

`video-bocateria.html` empieza con comandas manuscritas difíciles de leer y una llamada que se alarga entre cambios y dudas. Después muestra el recorrido real de la demo de `menus`: carta, cantidades, total, recogida o domicilio y mensaje preparado para WhatsApp. Incluye una bocatería ilustrada y animada, el encargado atendiendo y la entrada de pedidos de ejemplo al WhatsApp del negocio. Los móviles tienen carcasa, cámara, barra de estado y botones laterales. Mantiene el precio de 50 € de desarrollo inicial y 10 €/mes. El MP4 descargable es `video-bocateria.mp4` (1080 × 1920, 46 segundos, con locución); guion y SRT están en `guiones/`. `bocateria-problema.cjs` contiene las escenas iniciales y `movil-realista.cjs` el teléfono compartido.

`carta-bar/bar.html` es una carta original para bares, con local ilustrado, comida en color, categorías, alérgenos ilustrativos, cantidades y preparación de pedidos para mesa o recogida. Los platos y precios son ejemplos. La demo permite ver y copiar el mensaje y representar cómo llega al negocio; no envía pedidos reales. `productos.json` contiene la carta editable. Esta misma carta se incorpora al proyecto `menus` como `bar.html`. La ilustración original compartida está en `local-comida.cjs`; `crear-comida-visual.cjs` genera las imágenes SVG de las categorías. `bar-local.js` controla la recepción simulada de pedidos.

La aplicación del móvil navega durante el vídeo: categorías, desplazamiento, productos, cambios de cantidades y total, apertura del carrito y escritura de datos. `bocateria-navegacion.js` sincroniza los tres planos con el reproductor; `demo-bocateria/navegacion.js` aplica el recorrido a la carta real y muestra las pulsaciones. El recorrido también funciona al pausar, avanzar y rebobinar. `node revisar-navegacion.mjs` comprueba categorías, importes, datos, modalidades y rebobinado con el servidor y Chrome de revisión activos. No se realizan envíos.

La recepción se representa en tres escenas separadas: WhatsApp en móvil, panel propio en ordenador y panel en tablet. Las dos vistas de panel son propuestas visuales de una opción a desarrollar, no una integración implementada en `menus`. `bocateria-recepcion.cjs` y `bocateria-recepcion.css` contienen los tres dispositivos y el pedido de ejemplo. El vídeo tiene diez escenas ajustadas a la locución y dura 46 segundos.

Para regenerar: `node crear-comida-visual.cjs`, `node crear-bocateria.cjs`, `node crear-carta-bar.cjs`, `node construir-biblioteca.cjs` y `node publicar-preparar.cjs`. `node servir-preview.cjs` sirve la revisión local en 8767. `node revisar-bar.mjs` revisa el diseño, las imágenes y el pedido con Chrome de revisión en 9243 (o `CHROME_REVIEW_PORT`). `node exportar-bocateria.mjs` exporta el movimiento de las diez escenas mediante ese Chrome y FFmpeg; `--review-only` solo comprueba encuadres y captura las escenas.

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

## Carruseles de LinkedIn

`linkedin.html` es el apartado específico, enlazado desde la biblioteca y el planning. Incluye tres guías prácticas de seis diapositivas, su PDF para documento de LinkedIn, PNG individuales y texto de publicación. Los ejemplos se identifican como ilustrativos.

`node crear-linkedin.cjs` regenera las páginas y textos. Con Chrome de revisión en el puerto 9241, `node exportar-linkedin.mjs` exporta las 18 imágenes y tres PDF, comprueba solapamientos y revisa las páginas en móvil. Tras cambiar contenido o estilos, ejecutar ambos comandos para actualizar también los descargables.
