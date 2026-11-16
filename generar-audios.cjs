// Node 18+ y FFmpeg. La clave nunca se escribe en los archivos públicos.
const fs=require('node:fs');
const path=require('node:path');
const crypto=require('node:crypto');
const {execFileSync}=require('node:child_process');
const root=__dirname;
const args=process.argv.slice(2);
const option=name=>{const i=args.indexOf(name);return i<0?null:args[i+1]};
function run(cmd,args){return execFileSync(cmd,args,{encoding:'utf8',stdio:['ignore','pipe','pipe']});}
function stamp(s){return Number(s.split(':').reduce((n,v)=>n*60+Number(v),0));}
function readStory(name){
 const file=path.join(root,'guiones',name+'-creatify.txt');
 const text=fs.readFileSync(file,'utf8');
 const blocks=[...text.matchAll(/ESCENA \d+ · ([\d:.]+) → ([\d:.]+) \([^)]+\)\r?\n([\s\S]*?)(?=\r?\n\r?\nESCENA |$)/g)];
 if(!blocks.length)throw Error('No hay escenas en '+file);
 return blocks.map(m=>({start:stamp(m[1]),end:stamp(m[2]),text:m[3].trim()}));
}
async function main(){
 if(args.includes('--help')){console.log('node generar-audios.cjs --historia video-conciliacion [--plan] [--voz ID] [--modelo eleven_multilingual_v2]\n--todas procesa todos los guiones; --voices lista las voces de tu cuenta.\nVariables: ELEVENLABS_API_KEY y ELEVENLABS_VOICE_ID. Las escenas se reutilizan por contenido.');return;}
 const key=process.env.ELEVENLABS_API_KEY;
 if(args.includes('--voices')){
  if(!key)throw Error('Configura ELEVENLABS_API_KEY en tu entorno local.');
  const response=await fetch('https://api.elevenlabs.io/v1/voices',{headers:{'xi-api-key':key},signal:AbortSignal.timeout(30000)});
  if(!response.ok)throw Error('ElevenLabs: HTTP '+response.status);
  for(const v of (await response.json()).voices)console.log(v.voice_id+' · '+v.name+' · '+JSON.stringify(v.labels));return;
 }
 const names=args.includes('--todas')?fs.readdirSync(path.join(root,'guiones')).filter(n=>n.endsWith('-creatify.txt')).map(n=>n.replace('-creatify.txt','')):[option('--historia')||'piloto-marca'];
 const jobs=names.map(name=>{if(!/^[a-z0-9-]+$/.test(name))throw Error('Nombre de historia inválido');return {name,segments:readStory(name)}});
 if(args.includes('--plan')){for(const j of jobs)console.log(j.name+': '+j.segments.length+' escenas, '+j.segments.reduce((n,s)=>n+s.text.length,0)+' caracteres');return;}
 const voice=option('--voz')||process.env.ELEVENLABS_VOICE_ID;
 if(!key||!voice)throw Error('Faltan ELEVENLABS_API_KEY y/o ELEVENLABS_VOICE_ID. Consulta AUDIO.md.');
 run('ffmpeg',['-version']);run('ffprobe',['-version']);
 const out=path.join(root,'audio','generados');fs.mkdirSync(out,{recursive:true});
 const manifestPath=path.join(out,'catalogo.json');
 const catalog=fs.existsSync(manifestPath)?JSON.parse(fs.readFileSync(manifestPath,'utf8')):{};
 const model=option('--modelo')||'eleven_multilingual_v2';
 for(const {name,segments} of jobs){
  const folder=path.join(out,name);fs.mkdirSync(folder,{recursive:true});
  const marks=[0],clips=[];
  for(let i=0;i<segments.length;i++){
   const s=segments[i];
   const body={text:s.text,model_id:model,voice_settings:{stability:0.55,similarity_boost:0.75,style:0.15,use_speaker_boost:true},previous_text:segments[i-1]?.text||'',next_text:segments[i+1]?.text||''};
   const hash=crypto.createHash('sha256').update(voice+JSON.stringify(body)).digest('hex').slice(0,20);
   const raw=path.join(folder,hash+'.mp3');
   if(s.text&&!fs.existsSync(raw)){
    console.log(name+' · generando escena '+(i+1));
    const response=await fetch('https://api.elevenlabs.io/v1/text-to-speech/'+encodeURIComponent(voice)+'?output_format=mp3_44100_128',{method:'POST',headers:{'xi-api-key':key,'Content-Type':'application/json'},body:JSON.stringify(body),signal:AbortSignal.timeout(120000)});
    if(!response.ok){
     let reason='';
     try{
      const payload=await response.json();
      const detail=payload.detail;
      reason=typeof detail==='string'?detail:[detail?.status,detail?.message].filter(Boolean).join(' · ');
     }catch{}
     reason=reason.split(key).join('[clave oculta]').replace(/[\r\n]+/g,' ').slice(0,900);
     throw Error('ElevenLabs: HTTP '+response.status+(reason?' · '+reason:'')+'. No se reintenta automáticamente para evitar cargos duplicados.');
    }
    const bytes=Buffer.from(await response.arrayBuffer());
    fs.writeFileSync(raw+'.tmp',bytes);run('ffprobe',['-v','error',raw+'.tmp']);fs.renameSync(raw+'.tmp',raw);
   }
   const spoken=s.text?Number(run('ffprobe',['-v','error','-show_entries','format=duration','-of','default=noprint_wrappers=1:nokey=1',raw])):0;
   if(!Number.isFinite(spoken))throw Error('Duración de audio inválida');
   const duration=Math.max(s.end-s.start,spoken+0.35);
   const clip=path.join(folder,'escena-'+(i+1)+'.wav');
   const input=s.text?['-i',raw]:['-f','lavfi','-i','anullsrc=r=44100:cl=mono'];
   run('ffmpeg',['-y',...input,'-af',s.text?'loudnorm=I=-16:TP=-1.5:LRA=11,apad':'apad','-t',String(duration),'-ar','44100','-ac','1',clip]);
   clips.push(clip);marks.push(Number((marks.at(-1)+duration).toFixed(3)));
  }
  const output=path.join(out,name+'.mp3');
  const inputs=clips.flatMap(c=>['-i',c]);
  run('ffmpeg',['-y',...inputs,'-filter_complex',clips.map((_,i)=>'['+i+':a]').join('')+'concat=n='+clips.length+':v=0:a=1[a]','-map','[a]','-b:a','128k',output+'.tmp.mp3']);
  fs.renameSync(output+'.tmp.mp3',output);
  catalog[name+'.html']={builtinAudio:'audio/generados/'+name+'.mp3',marks,duration:marks.at(-1),audioRate:1};
  fs.writeFileSync(manifestPath,JSON.stringify(catalog,null,2)+'\n');
  fs.writeFileSync(path.join(root,'audio','catalogo.js'),'window.JM2_AUDIO_CATALOG='+JSON.stringify(catalog)+';\n');
  console.log('Listo: '+name+' · '+marks.at(-1)+' s');
 }
}
if(require.main===module)main().catch(error=>{console.error(error.message);process.exitCode=1});
module.exports={readStory};
