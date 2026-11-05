import {validateManifest,publicUrl} from './v14-core.js';
import {AudioManager} from './audio-manager.js';
const audioManager=new AudioManager();
const legacyMusic=window.MFMusic;
const xcmTracks=[{"video": "tuK6n2Lkza0", "title": "Are You Gonna Be My Girl", "artist": "Jet"}, {"video": "LBr7kECsjcQ", "title": "Centuries", "artist": "Fall Out Boy"}, {"video": "fB8TyLTD7EE", "title": "RISE", "artist": "The Glitch Mob"}, {"video": "D9G1VOjN_84", "title": "Enemy", "artist": "Imagine Dragons"}, {"video": "vx2u5uUu3DE", "title": "Its My Life", "artist": "Bon Jovi"}, {"video": "5hDZbroaQDc", "title": "The Phoenix", "artist": "Fall Out Boy"}, {"video": "7wtfhZwyrcc", "title": "Believer", "artist": "Imagine Dragons"}, {"video": "btPJPFnesV4", "title": "Eye of the Tiger", "artist": "Survivor"}, {"video": "v2AC41dglnM", "title": "Thunderstruck", "artist": "AC/DC"}, {"video": "pAgnJDJN4VA", "title": "Back in Black", "artist": "AC/DC"}, {"video": "cxjvTXo9WWM", "title": "Unstoppable", "artist": "Sia"}, {"video": "xo1VInw-SKc", "title": "Fight Song", "artist": "Rachel Platten"}, {"video": "VBmMU_iwe6U", "title": "Run the World", "artist": "Beyoncé"}, {"video": "CevxZvSJLk8", "title": "Roar", "artist": "Katy Perry"}, {"video": "Xn676-fLq7I", "title": "Stronger", "artist": "Kelly Clarkson"}, {"video": "cwLRQn61oUY", "title": "Confident", "artist": "Demi Lovato"}, {"video": "J91ti_Mwf28", "title": "Girl on Fire", "artist": "Alicia Keys"}, {"video": "egMWlD3fGQ8", "title": "Born to be Wild", "artist": "Steppenwolf"}, {"video": "gEPmA3USJdI", "title": "Highway to Hell", "artist": "AC/DC"}, {"video": "CmXWkMlKF84", "title": "Kickstart My Heart", "artist": "Mötley Crüe"}, {"video": "ktvTqknDobU", "title": "Radioactive", "artist": "Imagine Dragons"}, {"video": "2zNSgSzhBf8", "title": "Cant Hold Us", "artist": "Macklemore"}, {"video": "mk48xRzuNvA", "title": "Hall of Fame", "artist": "The Script"}, {"video": "-tJYN-eG1zk", "title": "We Will Rock You", "artist": "Queen"}, {"video": "gOsM-SRoiSQ", "title": "Whatever It Takes", "artist": "Imagine Dragons"}, {"video": "VDvr08sCPOc", "title": "Remember the Name", "artist": "Fort Minor"}, {"video": "m_SV8YIDZJA", "title": "SONIC.EXE", "artist": "Drift Phonk"}];
if(legacyMusic){legacyMusic.init({mountPanel:'#mf-music-panel',heading:'Trilha do acervo · Prime Formatura',storageKey:'primeCerfloroAudio.v1',youtube:xcmTracks,autoplay:true});legacyMusic.mute(false);legacyMusic.setVolume(.25);legacyMusic.play();}
// One foreground source coordinates with the existing music player.
let voiceActive=false;
const foregroundVideos=new Set();
function syncMediaDucking(){legacyMusic?.duck(voiceActive||foregroundVideos.size>0);}
audioManager.onVoiceStart=()=>{
 voiceActive=true;
 document.querySelectorAll('video').forEach(v=>{if(!v.muted&&!v.paused)v.pause();});
 syncMediaDucking();
};
audioManager.onVoiceStop=()=>{voiceActive=false;syncMediaDucking();};
document.addEventListener('play',e=>{
 const v=e.target;
 if(!(v instanceof HTMLVideoElement)||v.muted)return;
 audioManager.stopVoice();
 document.querySelectorAll('video').forEach(other=>{if(other!==v&&!other.muted&&!other.paused)other.pause();});
 foregroundVideos.add(v);syncMediaDucking();
},true);
for(const type of ['pause','ended','emptied'])document.addEventListener(type,e=>{
 if(foregroundVideos.delete(e.target))syncMediaDucking();
},true);
document.addEventListener('pm-select-theme',()=>{
 audioManager.stopVoice();
 document.querySelectorAll('video').forEach(v=>{if(!v.muted&&!v.paused)v.pause();});
 syncMediaDucking();
});
const observedVideos=new WeakSet();
const videoVisibility=new IntersectionObserver(entries=>entries.forEach(({target:v,isIntersecting})=>{
 if(!isIntersecting&&!v.paused){v.dataset.pmResumeOnVisibility=String(v.autoplay&&v.muted);v.pause();}
 else if(isIntersecting&&v.dataset.pmResumeOnVisibility==='true'&&!document.hidden){delete v.dataset.pmResumeOnVisibility;v.play().catch(()=>{});}
}),{threshold:0.01});
function observeVideos(){document.querySelectorAll('video').forEach(v=>{if(!observedVideos.has(v)){observedVideos.add(v);videoVisibility.observe(v);}});}
observeVideos();
new MutationObserver(observeVideos).observe(document.body,{childList:true,subtree:true});
document.addEventListener('visibilitychange',()=>{if(document.hidden){document.querySelectorAll('video').forEach(v=>v.pause());audioManager.pauseAll();legacyMusic?.pause();}});

const root=document.querySelector('.pm-shell');
let pendingTheme=null,selectedTheme=null,themeRequest=0;
const soundButton=document.querySelector('#pm-sound');
const soundStatus=document.querySelector('#pm-sound-status');
function soundState(playing,message){if(soundButton){soundButton.disabled=false;soundButton.setAttribute('aria-pressed',String(playing));soundButton.textContent=playing?'Pausar música':'Ativar som';}if(soundStatus)soundStatus.textContent=message;}
async function startTheme(s){
 document.dispatchEvent(new Event("pm-select-theme"));
 if(legacyMusic){const index=xcmTracks.findIndex(t=>t.video===s.musicTrackId);if(index<0||s.musicTrackReviewed!==true||s.musicTrackRightsConfirmed!==true)return;audioManager.stopVoice();legacyMusic.selectTrack(index);legacyMusic.mute(false);legacyMusic.play();document.querySelectorAll('.pm-speaker').forEach(c=>c.classList.toggle('is-playing',c.id==='speaker-'+s.id));return;}
 const url=s.music?.rightsConfirmed?publicUrl(s.music.url):null;if(!url)return;
 selectedTheme=s;pendingTheme=s;const request=++themeRequest;const ok=await audioManager.playMusic(s.id,url);if(request!==themeRequest)return;if(ok)pendingTheme=null;
 soundState(ok,ok?'Tocando: '+s.name:'Toque em Ativar som para ouvir a trilha.');
 document.querySelectorAll('.pm-speaker').forEach(c=>c.classList.toggle('is-playing',ok&&c.id==='speaker-'+s.id));
}
soundButton?.addEventListener('click',()=>{if(audioManager.music&&!audioManager.music.paused){themeRequest++;pendingTheme=null;audioManager.pauseAll();soundState(false,'Música pausada por você.');document.querySelectorAll('.pm-speaker').forEach(c=>c.classList.remove('is-playing'));}else{const s=pendingTheme||selectedTheme||manifest?.speakers.find(s=>s.status==='published'&&s.music?.rightsConfirmed&&publicUrl(s.music.url));if(s)startTheme(s);}});
function retryTheme(e){if(!pendingTheme||e.target.closest('button,a,input,select,textarea,summary,dialog'))return;const s=pendingTheme;pendingTheme=null;startTheme(s);}
document.addEventListener('pointerdown',retryTheme,{passive:true});
function prepareMusic(d){if(legacyMusic)return;const first=d.speakers.find(s=>s.status==='published'&&s.music?.rightsConfirmed&&publicUrl(s.music.url));if(first)startTheme(first);}

const el=(tag,text,cls)=>{const n=document.createElement(tag);if(text)n.textContent=text;if(cls)n.className=cls;return n};
const mediaId=new Map();let manifest;
function voice(s,q,button){const music=s.music?.rightsConfirmed?publicUrl(s.music.url):null;audioManager.playQuote(s.id,q,button,music);}
function picture(items,label){const wrap=el('div',null,'pm-carousel');wrap.setAttribute('aria-label',label);items.forEach(m=>{if(!publicUrl(m.preview))return;const f=el('figure');const b=el('button',null,'pm-photo');b.type='button';const img=el('img');img.src=m.preview;img.alt=m.alt||label;img.loading='lazy';b.append(img);b.onclick=()=>{const d=document.querySelector('#pm-lightbox');d.querySelector('img').src=m.preview;d.querySelector('img').alt=img.alt;d.querySelector('p').textContent=m.caption||'';d.showModal()};f.append(b,el('figcaption',m.caption||''));wrap.append(f)});return wrap;}
function renderSpeakerCarousel(photos, speakerName) {
  const wrap = el('div', null, 'mf-athlete-carousel');
  const slidesWrap = el('div', null, 'mf-carousel-slides');
  const dotsWrap = el('div', null, 'mf-carousel-dots');
  const slideEls = [];
  const dotEls = [];
  
  photos.forEach((m, idx) => {
    const slide = el('div', null, 'mf-photo-slide' + (idx === 0 ? ' active' : ''));
    const img = el('img');
    img.src = publicUrl(m.preview);
    img.alt = m.alt || `Fotografia de ${speakerName} (${idx + 1})`;
    img.loading = idx < 2 ? 'eager' : 'lazy';
    img.decoding = 'async';
    img.onclick = () => {
      const d = document.querySelector('#pm-lightbox');
      if (d) {
        d.querySelector('img').src = publicUrl(m.preview);
        d.querySelector('img').alt = img.alt;
        d.querySelector('p').textContent = m.caption || speakerName;
        d.showModal();
      }
    };
    slide.append(img);
    slidesWrap.append(slide);
    slideEls.push(slide);
    
    const dot = el('span', null, 'mf-dot' + (idx === 0 ? ' active' : ''));
    dot.onclick = () => goTo(idx);
    dotsWrap.append(dot);
    dotEls.push(dot);
  });
  
  let cur = 0;
  function goTo(n) {
    cur = (n + slideEls.length) % slideEls.length;
    slideEls.forEach((s, i) => s.classList.toggle('active', i === cur));
    dotEls.forEach((d, i) => d.classList.toggle('active', i === cur));
  }
  
  if (photos.length > 1) {
    const prev = el('button', '‹', 'mf-arrow prev');
    prev.type = 'button';
    prev.setAttribute('aria-label', 'Foto anterior');
    prev.onclick = (e) => { e.stopPropagation(); goTo(cur - 1); };
    
    const next = el('button', '›', 'mf-arrow next');
    next.type = 'button';
    next.setAttribute('aria-label', 'Próxima foto');
    next.onclick = (e) => { e.stopPropagation(); goTo(cur + 1); };
    
    wrap.append(slidesWrap, prev, next, dotsWrap);
  } else {
    wrap.append(slidesWrap);
  }
  return wrap;
}

window.openSlidesModal = function(speaker, slides) {
  if (!slides.length) return;
  let modal = document.querySelector('#pm-slides-modal');
  if (!modal) {
    modal = el('dialog', null, 'pm-slides-dialog');
    modal.id = 'pm-slides-modal';
    modal.setAttribute('aria-labelledby', 'pm-slides-modal-title');
    modal.innerHTML = `<div class="pm-slides-dialog-inner">
      <header class="pm-slides-dialog-header"><h3 id="pm-slides-modal-title"></h3>
      <form method="dialog"><button class="pm-slides-close-btn" aria-label="Fechar slides">Fechar ×</button></form></header>
      <div class="pm-slides-viewer"><img id="pm-slides-current-img" alt="">
      <button type="button" id="pm-slides-prev" class="pm-slides-nav prev" aria-label="Slide anterior">←</button>
      <button type="button" id="pm-slides-next" class="pm-slides-nav next" aria-label="Próximo slide">→</button></div>
      <p id="pm-slides-caption" class="pm-slides-caption" aria-live="polite"></p>
      <div id="pm-slides-thumbs" class="pm-slides-thumbs"></div></div>`;
    document.body.append(modal);
  }
  const title = document.querySelector('#pm-slides-modal-title');
  if (title) title.textContent = `Slides da Apresentação: ${speaker.name}`;
  const currentImg = document.querySelector('#pm-slides-current-img');
  const captionEl = document.querySelector('#pm-slides-caption');
  const thumbsWrap = document.querySelector('#pm-slides-thumbs');
  thumbsWrap.replaceChildren();
  
  let curSlide = 0;
  function showSlide(idx) {
    curSlide = (idx + slides.length) % slides.length;
    const s = slides[curSlide];
    if (currentImg) {
      currentImg.src = publicUrl(s.preview);
      currentImg.alt = s.alt || `Slide ${curSlide + 1} de ${speaker.name}`;
    }
    if (captionEl) {
      captionEl.textContent = `Slide ${curSlide + 1} de ${slides.length}${s.caption ? ' · ' + s.caption : ''}`;
    }
    thumbsWrap.querySelectorAll('.pm-slide-thumb').forEach((t, i) => {
      t.classList.toggle('active', i === curSlide);
    });
  }
  
  slides.forEach((s, idx) => {
    const thumb = el('img', null, 'pm-slide-thumb' + (idx === 0 ? ' active' : ''));
    thumb.src = publicUrl(s.preview);
    thumb.alt = `Miniatura slide ${idx + 1}`;
    thumb.loading = 'lazy';
    thumb.onclick = () => showSlide(idx);
    thumbsWrap.append(thumb);
  });
  
  const prevBtn = document.querySelector('#pm-slides-prev');
  if (prevBtn) prevBtn.onclick = () => showSlide(curSlide - 1);
  const nextBtn = document.querySelector('#pm-slides-next');
  if (nextBtn) nextBtn.onclick = () => showSlide(curSlide + 1);
  
  showSlide(0);
  modal.showModal();
};

function renderSpeakers(d){
 const host=document.querySelector('#pm-speakers');host.replaceChildren();
 const speakers=d.speakers.filter(x=>x.status==='published');
 if(!speakers.length){host.append(el('p','Dossiês dos palestrantes · EM CURADORIA','pm-curation'));return}
 for(const s of speakers){
  const card=el('article',null,'pm-speaker mf-car mfx-live');card.id='speaker-'+s.id;
  const frame=el('div',null,'mf-frame');
  frame.append(el('p',s.institution||'','pm-eyebrow'),el('h3',s.name),el('p',s.topic||'','pm-speaker-topic'),Object.assign(el('details',null,'pm-speaker-bio'),{innerHTML:'<summary>Trajetória e pesquisa</summary>'}));
  
  frame.querySelector('.pm-speaker-bio').append(el('p',s.biography||''));
  // Limitação curada: no máximo 9 fotos em carrossel compacto
  const allPhotos=(s.photoIds||[]).map(id=>mediaId.get(id)).filter(x=>x?.status==='published');
  const photos=allPhotos.slice(0, 2);
  if(photos.length){
    frame.append(el('h4',`Fotografias em destaque (${photos.length} fotografias selecionadas)`),renderSpeakerCarousel(photos, s.name));
  }
  
  // Ações de Entrega Direta com Cupons Diferenciados
  const deliveryActions=el('div',null,'pm-card-delivery-actions');
  const fottoBtn=el('a','⚡ Baixar no Fotto (Cupom 100% GRÁTIS: DIgaX) ↗','pm-button pm-btn-fotto-card pm-btn-pulse-subtle');
  fottoBtn.href='https://www.fotto.com.br/ii-congresso-florestal-rondonia-unir-ceeja/e/475942';fottoBtn.target='_blank';fottoBtn.rel='noopener';
  
  const banlekBtn=el('a','📷 Baixar no Banlek (Cupom 99%: digax2026) ↗','pm-button pm-btn-banlek-card');
  banlekBtn.href='https://banlek.com/album/2a556b';banlekBtn.target='_blank';banlekBtn.rel='noopener';
  
  deliveryActions.append(fottoBtn, banlekBtn);
  frame.append(deliveryActions);

  // Slides apresentados em modal lightbox nativo
  const slides=(s.slides||[]).filter(x=>x.status==='published'&&x.rightsConfirmed&&x.reviewed);
  if(slides.length){
    const slidesBtn=el('button',`📄 Ver Slides da Apresentação (${slides.length} lâminas) ↗`,'pm-button pm-btn-slides-card');
    slidesBtn.type='button';
    slidesBtn.onclick=()=>window.openSlidesModal(s, slides);
    frame.append(slidesBtn);
  }
  
  s.quotes.forEach((q,i)=>{
   const quote=el('section',null,'pm-quote');quote.id=`speaker-${s.id}-quote-${i+1}`;
   const block=el('details',null,'pm-quote-summary');
   block.append(el('summary','Síntese editorial · ler contexto'),el('p',q.text));
   const t=el('p',`${Math.floor(q.startMs/60000)}:${String(Math.floor(q.startMs/1000)%60).padStart(2,'0')} · ${q.context||s.topic||''}`);
   const b=el('button','Ouvir trecho original');b.type='button';b.onclick=()=>voice(s,q,b);
   const link=el('a','Link deste trecho');link.href='#'+quote.id;
   quote.append(block,t,b,link);frame.append(quote);
  });
  if(legacyMusic||(s.music?.rightsConfirmed&&publicUrl(s.music.url))){
   const trk=xcmTracks.find(t=>t.video===s.musicTrackId);
   const b=el('button',trk?`🎵 Ouvir trilha da sessão: ${trk.title}`:'🎵 Ouvir trilha da sessão','btn-theme');
   b.type='button';b.onclick=()=>{startTheme(s)};frame.append(b);
  }
  for(const q of s.questions||[]){
   if(!q.reviewed||!q.permissionConfirmed)continue;
   const dd=el('details');dd.append(el('summary',q.participantName||'Pergunta da plateia'),el('p',q.question),el('p',q.answer));frame.append(dd);
  }
  const sources=el('div',null,'pm-sources');
  for(const ref of s.sources){if(!publicUrl(ref.url))continue;const a=el('a',(ref.label||'Fonte')+' ↗');a.href=ref.url;a.target='_blank';a.rel='noopener';sources.append(a)}
  frame.append(sources);card.append(frame);host.append(card);
 }
}

function drone(d){
 const h=document.querySelector('.pm-hero');
 if(!d.drone?.rightsConfirmed||!d.drone?.reviewed||!publicUrl(d.drone.url)){h.append(el('span','ABERTURA EM VÍDEO AUTORAL · EM CURADORIA','pm-video-state'));return}
 const v=el('video',null,'pm-drone pm-bg-drone-video');v.src=d.drone.url;if(publicUrl(d.drone.poster))v.poster=d.drone.poster;v.muted=true;v.playsInline=true;v.preload='metadata';v.loop=true;v.autoplay=true;
 const b=el('button','Pausar vídeo','pm-video-toggle');b.type='button';
 b.onclick=()=>{if(v.paused)v.play().then(()=>b.textContent='Pausar vídeo').catch(()=>b.textContent='Vídeo indisponível');else{v.pause();b.textContent='Reproduzir vídeo de abertura'}};
 h.prepend(v);h.append(b);
 if(!root.classList.contains('reduce-motion')&&!matchMedia('(prefers-reduced-motion: reduce)').matches){v.play().catch(()=>{b.textContent='Reproduzir vídeo de abertura'});}else{b.textContent='Reproduzir vídeo de abertura';}
 new IntersectionObserver(entries=>{if(!entries[0].isIntersecting)v.pause()}).observe(h);
 document.querySelector('#pm-motion')?.addEventListener('click',()=>{v.pause();b.textContent='Reproduzir vídeo de abertura'});
}
function timeline(d){const host=document.querySelector('#pm-timeline');host.replaceChildren();for(const t of d.timeline){const a=el('article');a.append(el('strong',t.year),el('h3',t.title),el('p',t.description));if(publicUrl(t.source)){const l=el('a','Fonte do registro ↗');l.href=t.source;l.target='_blank';l.rel='noopener';a.append(l)}host.append(a)}}
function sessions(d){const h=document.querySelector('#pm-sessions');h.replaceChildren();for(const s of d.sessions.filter(x=>x.status==='published'&&x.reviewed)){const a=el('article');a.append(el('p',`${s.day} · ${s.time||''}`,'pm-eyebrow'),el('h3',s.title),el('p',s.description||''));if(publicUrl(s.sourceUrl)){const link=el('a','Programação oficial ↗','pm-link');link.href=s.sourceUrl;link.target='_blank';link.rel='noopener';a.append(link)}h.append(a)}if(!h.children.length)h.append(el('p','Programação editorial por sessão · EM CURADORIA. Consulte a programação oficial na Even3.','pm-curation'))}
document.querySelector('#pm-pause-audio')?.addEventListener('click',()=>{themeRequest++;pendingTheme=null;audioManager.pauseAll();legacyMusic?.pause();if(soundButton&&!soundButton.disabled)soundState(false,'Áudio e música pausados por você.');document.querySelectorAll('.pm-speaker,.char-card').forEach(c=>c.classList.remove('is-playing'));});
fetch(new URL('event.public.json',import.meta.url),{cache:'no-store'}).then(r=>{if(!r.ok)throw Error('manifest');return r.json()}).then(d=>{const errors=validateManifest(d);if(errors.length)throw Error('invalid-manifest');manifest=d;renderHero(d);for(const m of d.media)mediaId.set(m.id,m);renderSpeakers(d);prepareMusic(d);drone(d);timeline(d);sessions(d);const search=document.querySelector('#pm-search');search?.addEventListener('input',()=>{const value=search.value.toLocaleLowerCase('pt-BR');document.querySelectorAll('.pm-speaker').forEach(card=>{card.hidden=!card.textContent.toLocaleLowerCase('pt-BR').includes(value)})});}).catch(()=>{document.querySelector('#pm-speakers').append(el('p','Conteúdo documental em curadoria. As informações básicas continuam disponíveis.'))});
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;if(!reduced&&'IntersectionObserver'in window){const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('pm-visible');observer.unobserve(e.target)}}),{threshold:.08});document.querySelectorAll('.pm-section').forEach(s=>{s.classList.add('pm-reveal');observer.observe(s)})}

function renderHero(d){
 const host=document.querySelector('#pm-hero-carousel');if(!host)return;
 const photos=d.media.filter(m=>m.type==='photo'&&m.status==='published'&&m.reviewed&&m.rightsConfirmed&&publicUrl(m.preview)).slice(0,12);
 const artwork=!photos.length;
 const items=artwork?[
 {preview:new URL('cerfloro-logo-horizontal-v2.png',import.meta.url).href,alt:'II CERFloRO — memória acadêmica',caption:'Ciência, encontros e novas perspectivas'},
 {preview:new URL('cerfloro-logo-vertical-v2.png',import.meta.url).href,alt:'II CERFloRO — Rondônia',caption:'03 e 04 de novembro · 2026'},
 {preview:new URL('prime-logo.webp',import.meta.url).href,alt:'Prime Formaturas',caption:'Fotografia: Emanuel · Edição: Júlia'}]:photos;
 host.hidden=false;host.setAttribute('aria-label',artwork?'Apresentação do evento':'Fotografias em destaque');host.setAttribute('aria-roledescription','carrossel');
 let index=0,effect=0,timer=null,touchX=null,hover=false,focus=false,paused=false;
 const track=el('div',null,'pm-deck hero-deck-stage');const cards=items.map((p,i)=>{const card=el('button',null,'pm-deck-card hero-3d-card'+(artwork?' pm-art-card':''));card.type='button';card.setAttribute('aria-label',(i+1)+' de '+items.length+': '+p.alt);const img=el('img');img.src=p.preview;img.alt=p.alt||'II CERFloRO';img.decoding='async';img.loading='eager';card.append(img);if(p.caption)card.append(el('span',p.caption,'pm-deck-caption hero-card-badge'));card.onclick=()=>go(i);track.append(card);return card});
 const controls=el('div',null,'pm-deck-controls hero-deck-ctrls');const prev=el('button','← Anterior'),next=el('button','Próxima →'),pause=el('button','Pausar apresentação');prev.type=next.type=pause.type='button';prev.onclick=()=>go(index-1);next.onclick=()=>go(index+1);pause.onclick=()=>{paused=!paused;pause.textContent=paused?'Retomar apresentação':'Pausar apresentação';pause.setAttribute('aria-pressed',String(paused));schedule()};pause.setAttribute('aria-pressed','false');
 const dots=el('div',null,'pm-deck-dots hero-deck-dots');dots.setAttribute('aria-label','Escolher cartão');const buttons=items.map((p,i)=>{const dot=el('button',String(i+1));dot.type='button';dot.className='hero-dot';dot.textContent='';dot.setAttribute('aria-label','Mostrar cartão '+(i+1));dot.onclick=()=>go(i);dots.append(dot);return dot});
 for(const [button,symbol] of [[prev,'‹'],[next,'›']]){button.setAttribute('aria-label',button.textContent);button.textContent=symbol;button.className='hero-deck-btn'}controls.append(prev,dots,next,pause);host.replaceChildren(track,controls);
 function draw(){host.dataset.transition=String(effect%8);cards.forEach((c,i)=>{const o=((i-index+cards.length+Math.floor(cards.length/2))%cards.length)-Math.floor(cards.length/2);const n=Math.abs(o);const position=n>3?4:(o+12)%12;for(const cls of [...c.classList])if(/^pos-\d+$/.test(cls))c.classList.remove(cls);c.classList.add('pos-'+position);c.tabIndex=i===index?0:-1;buttons[i].classList.toggle('active',i===index);c.setAttribute('aria-pressed',String(i===index));buttons[i].setAttribute('aria-current',i===index?'true':'false')});}
 function go(i){index=(i+cards.length)%cards.length;effect++;draw();schedule()}
 function schedule(){clearTimeout(timer);if(paused||hover||focus||document.hidden||root.classList.contains('reduce-motion')||matchMedia('(prefers-reduced-motion: reduce)').matches)return;timer=setTimeout(()=>go(index+1),3200)}
 host.addEventListener('pointerenter',()=>{hover=true;schedule()});host.addEventListener('pointerleave',()=>{hover=false;schedule()});host.addEventListener('focusin',()=>{focus=true;schedule()});host.addEventListener('focusout',()=>setTimeout(()=>{focus=host.contains(document.activeElement);schedule()},0));document.addEventListener('visibilitychange',schedule);document.querySelector('#pm-motion')?.addEventListener('click',()=>setTimeout(schedule,0));matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change',schedule);
 track.addEventListener('touchstart',e=>{touchX=e.touches[0].clientX},{passive:true});track.addEventListener('touchend',e=>{if(touchX!==null){const delta=e.changedTouches[0].clientX-touchX;if(Math.abs(delta)>45)go(index+(delta<0?1:-1));touchX=null}},{passive:true});host.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();go(index+(e.key==='ArrowRight'?1:-1))}});draw();schedule();
}

const progress=document.querySelector('.pm-reading-progress');const updateProgress=()=>{const max=document.documentElement.scrollHeight-innerHeight;if(progress)progress.style.transform=`scaleX(${max>0?scrollY/max:0})`};addEventListener('scroll',updateProgress,{passive:true});document.querySelector('#pm-share-page')?.addEventListener('click',async()=>{const status=document.querySelector('#pm-share-status');try{await navigator.clipboard.writeText(location.origin+location.pathname);status.textContent='Link copiado. Compartilhe com sua turma.'}catch{status.textContent=location.origin+location.pathname}});

const tutorial=document.querySelector('#pm-tutorial');let tutorialFocus;
document.querySelector('#pm-tutorial-open')?.addEventListener('click',e=>{tutorialFocus=e.currentTarget;audioManager.pauseAll();legacyMusic?.duck(true);tutorial.showModal();});
document.querySelector('#pm-tutorial-close')?.addEventListener('click',()=>tutorial.close());tutorial?.addEventListener('close',()=>{legacyMusic?.duck(false);tutorialFocus?.focus();});

// Preserve direct links into sections that are collapsed initially.
function revealLinkedContent(hash,scroll=false){
 if(!hash||hash==='#')return;
 let id;try{id=decodeURIComponent(hash.slice(1));}catch{return;}
 const target=document.getElementById(id);if(!target)return;
 for(let parent=target;parent;parent=parent.parentElement){if(parent instanceof HTMLDetailsElement)parent.open=true;}
 if(scroll)requestAnimationFrame(()=>target.scrollIntoView({block:'start'}));
}
document.addEventListener('click',e=>{
 const link=e.target.closest?.('a[href]');if(!link)return;
 const url=new URL(link.href,location.href);
 if(url.origin===location.origin&&url.pathname===location.pathname)revealLinkedContent(url.hash);
});
window.addEventListener('hashchange',()=>revealLinkedContent(location.hash,true));
window.addEventListener('pm-content-ready',()=>revealLinkedContent(location.hash,true));
revealLinkedContent(location.hash);
