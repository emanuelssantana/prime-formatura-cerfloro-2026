export class AudioManager {
 constructor(makeAudio=()=>new Audio()){this.makeAudio=makeAudio;this.voice=null;this.music=null;this.speaker=null;this.label=null;this.serial=0;this.volume=.25;}
 resetLabel(){if(this.label){this.label.textContent='Ouvir trecho original';this.label.setAttribute?.('aria-pressed','false');this.label=null;}}
 stopVoice(){this.serial++;if(this.voice){this.voice.pause();this.voice=null;this.onVoiceStop?.();}this.resetLabel();if(this.music)this.music.volume=this.volume;}
 selectSpeaker(id,music){if(this.speaker!==id){this.stopVoice();if(this.music)this.music.pause();this.music=null;this.speaker=id;}if(music&&this.music?.src!==music){if(this.music)this.music.pause();this.music=this.makeAudio();this.music.src=music;this.music.preload='none';this.music.volume=this.volume;}}
 async playQuote(id,q,button,music){
  if(this.voice&&this.label===button){this.stopVoice();return;}
  this.stopVoice();this.selectSpeaker(id,music);const serial=++this.serial;
  const audio=this.makeAudio();this.voice=audio;this.onVoiceStart?.();this.label=button;audio.preload='metadata';audio.src=q.audioUrl;
  const complete=()=>{if(serial!==this.serial)return;this.stopVoice();};
  audio.addEventListener('loadedmetadata',()=>{if(serial===this.serial)audio.currentTime=q.startMs/1000;},{once:true});
  audio.addEventListener('timeupdate',()=>{if(audio.currentTime>=q.endMs/1000)complete();});
  audio.addEventListener('ended',complete);audio.addEventListener('error',complete);
  button.textContent='Pausar trecho';button.setAttribute?.('aria-pressed','true');if(this.music)this.music.volume=.035;
  // play is called synchronously inside the user gesture; metadata only performs seek.
  try{await audio.play();}catch{if(serial===this.serial){complete();button.textContent='Áudio indisponível · tentar novamente';}}
 }
 async playMusic(id,url){this.stopVoice();this.selectSpeaker(id,url);if(!this.music)return false;this.music.muted=false;this.music.loop=true;try{await this.music.play();return true;}catch{this.music.pause();return false;}}
 pauseAll(){this.stopVoice();if(this.music)this.music.pause();}
}
