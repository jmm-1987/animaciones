# Audio del vídeo de facturas

## Bocatería

La locución aportada está en `audio/generados/bocateria.mp3` y dura 42,84 segundos. El vídeo de bocatería dura 46 segundos: la voz termina en «Tu carta adaptada a tu bocatería» y el precio y la invitación a escribir permanecen en el cierre visual. La grabación no lee el precio.

El MP3 original se conserva en local y está excluido de Git. La página reproduce la pista del MP4 publicado; `sourceAudio` del catálogo identifica el archivo local que usa el exportador. Para regenerar desde otra máquina hay que aportar ese archivo local.

`incorporar-audio-bocateria.cjs` registra el audio y sus diez intervalos en ambos catálogos y regenera el vídeo y la biblioteca. Las transiciones se han colocado en las pausas de la grabación. `bocateria-navegacion.js` ajusta el recorrido del móvil a esos intervalos. El exportador incorpora la misma pista al MP4, a velocidad natural, y añade silencio hasta el final visual. Para cambiar la grabación hay que volver a medir las pausas y actualizar las marcas, además de regenerar y exportar.

La locución aprobada está en `audio/generados/facturas.mp3`. El vídeo la carga directamente; no necesitas seleccionarla de nuevo.

Para sustituirla, guarda el nuevo MP3 con ese nombre. Después hay que medir las pausas y actualizar los tiempos en `audio/generados/catalogo.json`, su copia `audio/catalogo.js` y los momentos de recepción/lectura en `piloto-marca.js`. Cambia también el parámetro `v` de la ruta del audio para evitar que el navegador reproduzca una copia antigua.

Regenera la página y los guiones:

```powershell
node piloto-marca.cjs
```

En la página del vídeo, «Guion y audio» permite descargar o copiar el texto y probar otro archivo. Los archivos seleccionados ahí se guardan solo en ese navegador y tienen prioridad sobre la voz incorporada. «Quitar audio» recupera la voz del proyecto.

## Generación opcional mediante API

Requisitos: Node 18+, FFmpeg y ffprobe. Configura `ELEVENLABS_API_KEY` y `ELEVENLABS_VOICE_ID` en tu entorno local; nunca en los archivos públicos.

```powershell
node generar-audios.cjs --voices
node generar-audios.cjs --historia piloto-marca --plan
node generar-audios.cjs --historia piloto-marca
```

El primer comando consulta voces; el segundo solo muestra el plan. El tercero genera audio, consume créditos y sustituye la entrada del catálogo de este vídeo. Reutiliza escenas idénticas y adapta la duración del montaje. Las voces de la biblioteca requieren un plan compatible para usarlas por API. El flujo actual usa el MP3 descargado manualmente desde ElevenLabs.
