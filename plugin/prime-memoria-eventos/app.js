(()=>{'use strict';

const s=document.querySelector('.pm-shell');if(!s)return;

const base=window.PRIME_MEMORY_BASE||new URL('.',document.currentScript.src).href;

let data=null,day='all',cat='all',visible=12;

const MFX_EFFECTS=['fade','right','left','up','zoom','blur','flip','wipe'];

const safe=v=>{try{const u=new URL(v,location.href);return ['https:','http:'].includes(u.protocol)?u.href:null}catch{return null}};

const gallery=document.querySelector('#pm-gallery');



const render=()=>{

 if(!gallery||!data)return;

 const photos=data.media.filter(x=>x.status==='published'&&x.reviewed&&x.rightsConfirmed&&x.type==='photo'&&(day==='all'||x.day===day)&&(cat==='all'||x.category===cat)&&safe(x.preview));

 if(!photos.length){

  gallery.innerHTML='';

  const box=document.createElement('article');box.className='pm-empty';

  const h=document.createElement('h3');h.textContent='As fotografias estão em preparação.';

  const p=document.createElement('p');p.textContent=day==='2026-11-04'?'Os registros do segundo dia serão acrescentados após a cobertura.':'Volte a este mesmo endereço para acompanhar os próximos lotes.';

  box.append(h,p);gallery.append(box);return;

 }

 gallery.replaceChildren();

 photos.slice(0,visible).forEach(x=>{

  const b=document.createElement('button');b.type='button';b.className='pm-photo';

  const im=document.createElement('img');im.src=safe(x.preview);im.alt=x.alt||'Registro do II CERFloRO';im.loading='lazy';im.decoding='async';

  const c=document.createElement('span');c.textContent=x.caption||'II CERFloRO · 2026';

  b.append(im,c);

  b.onclick=()=>{

   const d=document.querySelector('#pm-lightbox');

   d.querySelector('img').src=safe(x.preview);

   d.querySelector('img').alt=im.alt;

   d.querySelector('p').textContent=x.caption||'';

   d.showModal();

  };

  gallery.append(b);

 });

 if(photos.length>visible){

  const more=document.createElement('button');more.type='button';more.className='pm-button pm-gallery-more';

  more.textContent='Mostrar mais fotografias ('+Math.min(visible,photos.length)+' de '+photos.length+')';

  more.onclick=()=>{visible+=12;render()};

  gallery.append(more);

 }

};



document.querySelectorAll('[data-day]').forEach(b=>b.onclick=()=>{

 day=b.dataset.day;cat='all';visible=12;

 document.querySelectorAll('[data-day]').forEach(t=>{t.classList.toggle('is-active',t===b);t.setAttribute('aria-pressed',String(t===b))});

 document.querySelectorAll('[data-cat]').forEach(t=>{const active=t.dataset.cat==='all';t.classList.toggle('is-active',active);t.setAttribute('aria-pressed',String(active))});

 render();

});



document.querySelectorAll('[data-cat]').forEach(b=>b.onclick=()=>{

 cat=b.dataset.cat;day='all';visible=12;

 document.querySelectorAll('[data-cat]').forEach(t=>{t.classList.toggle('is-active',t===b);t.setAttribute('aria-pressed',String(t===b))});

 document.querySelectorAll('[data-day]').forEach(t=>{const active=t.dataset.day==='all';t.classList.toggle('is-active',active);t.setAttribute('aria-pressed',String(active))});

 render();

});



document.querySelector('#pm-close')?.addEventListener('click',()=>document.querySelector('#pm-lightbox').close());

document.querySelector('#pm-motion')?.addEventListener('click',e=>{

 const reduced=s.classList.toggle('reduce-motion');

 e.currentTarget.setAttribute('aria-pressed',String(reduced));

 e.currentTarget.textContent=reduced?'Movimento reduzido':'Reduzir movimento';

 document.querySelectorAll('.pm-bg-drone-video').forEach(v=>{if(reduced)v.pause();else v.play().catch(()=>{});});

});



function renderPortraits(d){
 const dossierIds=new Set((d.speakers||[]).filter(s=>s.status==='published').map(s=>s.id));

 const photos=d.media.filter(m=>m.type==='photo'&&m.status==='published'&&m.reviewed&&m.rightsConfirmed&&m.portraitCard===true&&m.portraitReviewed===true&&safe(m.preview)).filter(m=>!dossierIds.has(m.speakerId));

 if(!photos.length)return;

 document.querySelector('#participantes')?.remove();

 const section=document.createElement('section');section.className='pm-section pm-portraits-section';section.id='participantes';

 const eyebrow=document.createElement('p');eyebrow.className='pm-eyebrow';eyebrow.textContent='PESSOAS DO CONGRESSO · FOTOS E TRILHAS';

 const title=document.createElement('h2');title.innerHTML='Pessoas que fizeram parte <em>desta história</em>';

 const intro=document.createElement('p');intro.className='pm-wide';intro.textContent='Explore os retratos pelas setas de cada cartão. Toque em Ouvir para escolher a trilha e consulte os dossiês para ver slides e falas.';

 const grid=document.createElement('div');grid.className='pm-portrait-grid chars-grid';



 photos.forEach((m,cardIdx)=>{

  const slides=(Array.isArray(m.cardPhotos)&&m.cardPhotos.length?m.cardPhotos.map(safe).filter(Boolean).slice(0,/AUTORIDADE/i.test(m.cardRole||'')?12:3):[safe(m.preview)]).filter(Boolean);

  let cur=0,fxStep=cardIdx%MFX_EFFECTS.length,hover=false;

  const card=document.createElement('article');card.className='pm-portrait-card mf-car mfx-live char-card';

  const frame=document.createElement('div');frame.className='mf-frame';



  const stage=document.createElement('div');stage.className='char-stage mf-stage';stage.dataset.mfx=MFX_EFFECTS[fxStep];

  const image=document.createElement('img');image.src=slides[0];image.alt=m.alt||'Retrato individual no II CERFloRO';image.loading='lazy';image.decoding='async';

  stage.append(image);



  const badge=document.createElement('span');badge.className='char-fx-badge';

  badge.textContent=`1/${slides.length} · ${MFX_EFFECTS[fxStep].toUpperCase()}`;

  stage.append(badge);



  const stepSlide=dir=>{

   if(slides.length<=1)return;

   cur=(cur+dir+slides.length)%slides.length;

   fxStep=(fxStep+1)%MFX_EFFECTS.length;

   const fx=MFX_EFFECTS[fxStep];

   stage.dataset.mfx=fx;

   image.classList.remove('mfx-enter');

   void image.offsetWidth;

   image.src=slides[cur];

   image.classList.add('mfx-enter');

   badge.textContent=`${cur+1}/${slides.length} · ${fx.toUpperCase()}`;

  };



  if(slides.length>1){

   const prevBtn=document.createElement('button');prevBtn.type='button';prevBtn.className='char-nav char-prev';prevBtn.textContent='‹';prevBtn.setAttribute('aria-label','Foto anterior deste participante');

   const nextBtn=document.createElement('button');nextBtn.type='button';nextBtn.className='char-nav char-next';nextBtn.textContent='›';nextBtn.setAttribute('aria-label','Próxima foto deste participante');

   prevBtn.onclick=e=>{e.stopPropagation();stepSlide(-1)};

   nextBtn.onclick=e=>{e.stopPropagation();stepSlide(1)};

   stage.append(prevBtn,nextBtn);

   setInterval(()=>{if(!hover&&!document.hidden&&!s.classList.contains('reduce-motion')&&!matchMedia('(prefers-reduced-motion: reduce)').matches)stepSlide(1)},7800+(cardIdx%7)*950);

  }

  card.addEventListener('pointerenter',()=>{hover=true});

  card.addEventListener('pointerleave',()=>{hover=false});



  const role=document.createElement('p');role.className='pm-eyebrow char-role';role.textContent=m.cardRole||'CONGRESSISTA · II CERFloRO';

  const label=document.createElement('h3');label.textContent=m.cardTitle||'Participante do II CERFloRO';



  const actions=document.createElement('div');actions.className='char-actions';

  const button=document.createElement('button');button.type='button';button.className='pm-btn-zoom';button.textContent='Ampliar retrato';

  button.onclick=()=>{

   const dialog=document.querySelector('#pm-lightbox');

   dialog.querySelector('img').src=slides[cur];

   dialog.querySelector('img').alt=image.alt;

   dialog.querySelector('p').textContent=m.caption||'II CERFloRO · 2026';

   dialog.showModal();

  };

  actions.append(button);



  if(m.musicTrackId){

   const musicBtn=document.createElement('button');musicBtn.type='button';musicBtn.className='btn-theme';

   musicBtn.textContent=`🎵 Ouvir: ${m.musicTitle||'Trilha'}`;

   musicBtn.onclick=()=>{

    const lists=window.MFMusic?.lists?.()?.youtube||[];

    const idx=lists.findIndex(t=>t.video===m.musicTrackId);

    if(idx>=0&&window.MFMusic){

     document.dispatchEvent(new Event("pm-select-theme"));

     window.MFMusic.selectTrack(idx);

     window.MFMusic.mute(false);

     window.MFMusic.play();

     document.querySelectorAll('.char-card').forEach(c=>c.classList.toggle('is-playing',c===card));

    }

   };

   actions.append(musicBtn);

  }



  const pairCard = document.createElement('div');

  pairCard.className = 'pm-delivery-pair pm-delivery-pair--card';



  const itemFotto = document.createElement('div');

  itemFotto.className = 'pm-delivery-item';

  const btnFotto = document.createElement('a');

  btnFotto.className = 'btn-delivery-card btn-fotto-card';

  btnFotto.href = 'https://www.fotto.com.br/ii-congresso-florestal-rondonia-unir-ceeja/e/475942';

  btnFotto.target = '_blank';

  btnFotto.rel = 'noopener';

  btnFotto.innerHTML = '<img class="pm-platform-logo" src="/wp-content/plugins/prime-memoria-eventos/fotto-logo-oficial.svg" alt="Fotto" width="78" height="24"> <span>100% grátis ↗</span>';

  const cupomFotto = document.createElement('div');

  cupomFotto.className = 'pm-coupon pm-coupon-fotto';

  cupomFotto.innerHTML = 'Cupom: <strong>DIgaX</strong>';

  itemFotto.append(btnFotto, cupomFotto);



  const itemBanlek = document.createElement('div');

  itemBanlek.className = 'pm-delivery-item';

  const btnBanlek = document.createElement('a');

  btnBanlek.className = 'btn-delivery-card btn-banlek-card';

  btnBanlek.href = 'https://banlek.com/album/2a556b';

  btnBanlek.target = '_blank';

  btnBanlek.rel = 'noopener';

  btnBanlek.innerHTML = '<img class="pm-platform-logo" src="/wp-content/plugins/prime-memoria-eventos/banlek-logo-oficial.svg" alt="Banlek" width="78" height="24"> <span>99% OFF ↗</span>';

  const cupomBanlek = document.createElement('div');

  cupomBanlek.className = 'pm-coupon pm-coupon-banlek';

  cupomBanlek.innerHTML = 'Cupom: <strong>digax2026</strong>';

  itemBanlek.append(btnBanlek, cupomBanlek);



  pairCard.append(itemFotto, itemBanlek);

  actions.append(pairCard);



  frame.append(stage,role,label,actions);

  card.append(frame);

  grid.append(card);

 });



 section.append(eyebrow,title,intro,grid);

 document.querySelector('#galeria')?.after(section);

}



fetch(new URL('event.public.json',base),{cache:'no-store'}).then(r=>{if(!r.ok)throw Error('manifest');return r.json()}).then(d=>{

 if(d.schema!=='prime-event-memory.v1'||!Array.isArray(d.media))throw Error('schema');

 data=d;

 renderPortraits(d);

 if(data.media.length)render();

 if(d.delivery.status==='published'&&d.delivery.providerVerified&&safe(d.delivery.url)){

  const a=document.querySelector('#pm-album');

  if(a){a.href=safe(d.delivery.url);a.target='_blank';a.rel='noopener';a.hidden=false;document.querySelector('#pm-delivery-status').textContent=d.delivery.label}

 }

}).catch(()=>{/* Editorial content remains usable without manifest or CRM. */});

})();



// Keep one event recording audible at a time.

for (const film of document.querySelectorAll(".pm-event-films video")) {

  film.addEventListener("play", () => {

    for (const other of document.querySelectorAll(".pm-event-films video")) if (other !== film) other.pause();

    window.MFMusic?.duck(true);

  });

  for (const event of ["ended", "pause"]) film.addEventListener(event, () => {

    const playing = [...document.querySelectorAll(".pm-event-films video")].some(v => !v.paused && !v.ended);

    window.MFMusic?.duck(playing);

  });

}

