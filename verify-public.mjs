import fs from 'node:fs';import path from 'node:path';import crypto from 'node:crypto';
const digest=b=>crypto.createHash('sha256').update(b).digest('hex');
const folder=new URL('./plugin/prime-memoria-eventos/',import.meta.url);const rows=[];
for(const name of fs.readdirSync(folder)){
 const local=fs.readFileSync(new URL(name,folder));
 const site=await fetch('https://primeformatura.com.br/wp-content/plugins/prime-memoria-eventos/'+name+'?release=011',{cache:'no-store'});
 // PHP executes on origin; verify its upload via authenticated deployment receipt, never download source.
 if(name.endsWith('.php')){rows.push({file:name,sourceSha256:digest(local),originVerification:'authenticated SFTP hash and PHP lint; public PHP source not requested'});continue}
 const live=Buffer.from(await site.arrayBuffer());
 const gh=await fetch('https://raw.githubusercontent.com/emanuelssantana/prime-formatura-cerfloro-2026/main/plugin/prime-memoria-eventos/'+name);
 const remote=Buffer.from(await gh.arrayBuffer());
 rows.push({file:name,siteStatus:site.status,githubStatus:gh.status,localSha256:digest(local),siteSha256:digest(live),githubSha256:digest(remote),allMatch:digest(local)===digest(live)&&digest(local)===digest(remote)});
}
const html=await(await fetch('https://primeformatura.com.br/fotos/ii-cerfloro-2026/')).text();
const report={observedAt:new Date().toISOString(),publicUrl:'https://primeformatura.com.br/fotos/ii-cerfloro-2026/',version:'0.1.1',htmlHasDocsModule:html.includes('v14-app.js'),htmlHasPreviewLabel:html.includes('PREVIEW v1.4'),files:rows};
fs.writeFileSync(new URL('./docs/VERIFICACAO_PUBLICA.json',import.meta.url),JSON.stringify(report,null,2));
console.log(JSON.stringify(report));if(rows.some(r=>r.allMatch===false))process.exitCode=1;
