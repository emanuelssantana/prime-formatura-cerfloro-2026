export const publicUrl=v=>{try{const u=new URL(v);return u.protocol==='https:'?u.href:null}catch{return null}};
export function validateManifest(d){
 const errors=[];if(d.schema!=='prime-event-memory.v1')errors.push('schema');
 for(const k of ['media','speakers','sessions','timeline'])if(!Array.isArray(d[k]))errors.push(k);
 for(const s of d.speakers||[]){
  if(!/^[a-z0-9-]+$/.test(s.id||''))errors.push('speaker.id');
  if(!Array.isArray(s.quotes)||s.quotes.length!==3)errors.push('speaker.exactly_three_quotes');
  if(s.status==='published'){
   if(!s.identityReviewed||!s.name||!s.sources?.length)errors.push('speaker.identity');
   for(const q of s.quotes||[])if(!q.text||!q.reviewed||!q.rightsConfirmed||!publicUrl(q.audioUrl)||!Number.isFinite(q.startMs)||!Number.isFinite(q.endMs)||q.startMs<0||q.endMs<=q.startMs)errors.push('quote.evidence');
   for(const slide of s.slides||[])if(slide.status==='published'&&(!slide.rightsConfirmed||!slide.reviewed||!publicUrl(slide.preview)))errors.push('slide.evidence');
  }
 }
 for(const m of d.media||[])if(m.status==='published'&&(!m.rightsConfirmed||!m.reviewed||!publicUrl(m.preview)))errors.push('media.evidence');
 if(d.delivery?.status==='published'&&(!d.delivery.providerVerified||!publicUrl(d.delivery.url)))errors.push('delivery.evidence');
 return [...new Set(errors)];
}
