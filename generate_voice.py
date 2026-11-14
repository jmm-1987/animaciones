import asyncio
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent / '.voice-tools'))
import edge_tts

LINES = [
    '¿Otra mañana pasando facturas a mano?',
    'Abres una. Copias los datos. Y vuelta a empezar.',
    '¿Y si dejaras de hacerlo? El sistema las lee por ti.',
    'Extrae los datos y los deja listos. Tú solo revisas.',
    'Dedica tu tiempo a lo que importa. En jota eme dos, te ayudamos a automatizar.'
]

async def main():
    Path('audio').mkdir(exist_ok=True)
    for index, text in enumerate(LINES, 1):
        await edge_tts.Communicate(text, 'es-ES-ElviraNeural', rate='+0%').save(f'audio/scene-{index}.mp3')
        print(f'Escena {index}: generada', flush=True)

asyncio.run(main())
