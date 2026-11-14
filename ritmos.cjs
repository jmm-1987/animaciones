// Tiempos en segundos. La narración usa el mismo factor que la imagen.
function timing(voice=false){
 if(!voice)return {duration:32,marks:[0,4,8,15,23,32],audioRate:1};
 const audioRate=.8;
 const marks=[0,2.5,6.1,9.2,12.9,17.91].map(second=>second/audioRate);
 return {duration:marks[marks.length-1],marks,audioRate};
}
module.exports={timing};
