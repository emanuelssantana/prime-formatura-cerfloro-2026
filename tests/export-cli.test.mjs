import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
const script=fileURLToPath(new URL('../scripts/export-public.mjs',import.meta.url));
test('CLI preserves previous output when projection omits a published speaker',()=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'cerfloro-export-'));
 try{
  const input=path.join(dir,'source.json'),output=path.join(dir,'public.json');
  fs.writeFileSync(input,JSON.stringify({media:[],speakers:[{id:'speaker-one',status:'published',identityReviewed:true}],sessions:[]}));
  const previous=JSON.stringify({media:[],speakers:[{id:'speaker-one'}],sessions:[]});fs.writeFileSync(output,previous);
  const run=spawnSync(process.execPath,[script,input,output],{encoding:'utf8'});
  assert.notEqual(run.status,0);assert.match(run.stderr,/speakers:speaker-one/);assert.equal(fs.readFileSync(output,'utf8'),previous);
 }finally{fs.rmSync(dir,{recursive:true,force:true});}
});
test('CLI writes a new projection when no published records are lost',()=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'cerfloro-export-'));
 try{
  const input=path.join(dir,'source.json'),output=path.join(dir,'public.json');fs.writeFileSync(input,JSON.stringify({media:[],speakers:[],sessions:[]}));
  const run=spawnSync(process.execPath,[script,input,output],{encoding:'utf8'});
  assert.equal(run.status,0,run.stderr);assert.deepEqual(JSON.parse(fs.readFileSync(output,'utf8')).speakers,[]);
 }finally{fs.rmSync(dir,{recursive:true,force:true});}
});
