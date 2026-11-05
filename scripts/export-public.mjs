import fs from 'node:fs';import path from 'node:path';
const https=v=>{try{const u=new URL(v);return u.protocol==='https:'&&!u.username&&!u.password?u.href:null}catch{return null}};
const pick=(o,keys)=>Object.fromEntries(keys.filter(k=>o[k]!==undefined).map(k=>[k,o[k]]));
const approved=o=>o?.status==='published'&&o.reviewed===true&&o.rightsConfirmed===true;
export function exportPublic(d){
 const out=pick(d,['schema','eventId','brand','dates','photographer','brand_code','event_code']);
 out.media=(d.media||[]).filter(m=>approved(m)&&https(m.preview)).map(m=>({...pick(m,['id','type','day','sessionId','speakerId','status','preview','alt','caption','reviewed','rightsConfirmed','portraitCard','portraitReviewed','category','cardTitle','cardRole','musicTrackId','musicTitle','musicArtist']),...(m.portraitReviewed===true?{cardPhotos:(m.cardPhotos||[]).filter(x=>https(x))}: {})}));
 const ids=new Set(out.media.map(m=>m.id));
 out.speakers=(d.speakers||[]).filter(s=>s.status==='published'&&s.identityReviewed&&s.editorialApproved&&(s.quotes||[]).length===3&&s.quotes.every(q=>q.reviewed&&q.rightsConfirmed&&q.text&&https(q.audioUrl)&&q.endMs>q.startMs)).map(s=>({...pick(s,['id','status','name','institution','role','topic','biography','identityReviewed']),sources:(s.sources||[]).filter(r=>https(r.url)).map(r=>pick(r,['label','url'])),photoIds:(s.photoIds||[]).filter(id=>ids.has(id)),quotes:s.quotes.map(q=>pick(q,['text','context','audioUrl','startMs','endMs','reviewed','rightsConfirmed','textType','transcriptionReview'])),slides:(s.slides||[]).filter(x=>approved(x)&&https(x.preview)).map(x=>pick(x,['id','status','preview','caption','alt','reviewed','rightsConfirmed'])),questions:(s.questions||[]).filter(q=>q.reviewed&&q.permissionConfirmed).map(q=>pick(q,['participantName','question','answer','reviewed','permissionConfirmed'])),...(typeof s.musicTrackId==='string'&&/^[A-Za-z0-9_-]{11}$/.test(s.musicTrackId)&&s.musicTrackReviewed===true&&s.musicTrackRightsConfirmed===true?{musicTrackId:s.musicTrackId,musicTrackReviewed:true,musicTrackRightsConfirmed:true}:{}),music:s.music?.rightsConfirmed&&https(s.music.url)?pick(s.music,['url','rightsConfirmed','attribution']):null}));
 out.sessions=(d.sessions||[]).filter(s=>s.status==='published'&&s.reviewed&&s.sourceVerified).map(s=>pick(s,['id','day','time','title','description','speakerIds','status','reviewed','sourceVerified','sourceUrl']));
 out.timeline=(d.timeline||[]).filter(t=>https(t.source)).map(t=>pick(t,['year','title','description','source']));
 out.drone=d.drone?.reviewed&&d.drone?.rightsConfirmed&&https(d.drone.url)?pick(d.drone,['url','poster','reviewed','rightsConfirmed']):{};
 out.delivery=d.delivery?.status==='published'&&d.delivery.providerVerified&&https(d.delivery.url)?pick(d.delivery,['status','url','mode','label','providerVerified']):{status:'preparing',mode:'free',label:'Fotografias em alta resolução · acesso gratuito'};
 return out;
}
if(process.argv[1]&&import.meta.url===new URL('file:///'+process.argv[1].replaceAll('\\','/')).href){
 const [input,output]=process.argv.slice(2);if(!input||!output)throw Error('Use: node scripts/export-public.mjs <editorial-private-file> <public-output>');
 if(path.resolve(input).startsWith(path.resolve('plugin')))throw Error('Private source must be outside public plugin');
 const result=exportPublic(JSON.parse(fs.readFileSync(input,'utf8').replace(/^\uFEFF/,'')));fs.writeFileSync(output,JSON.stringify(result,null,2));console.log('Only allowlisted approved public fields exported');
}

