import test from 'node:test';import assert from 'node:assert/strict';import {validateManifest,publicUrl} from '../src/v14-core.mjs';
const base=()=>({schema:'prime-event-memory.v1',media:[],speakers:[],sessions:[],timeline:[],delivery:{status:'preparing'}});
test('empty curated manifest is valid',()=>assert.deepEqual(validateManifest(base()),[]));
test('published speaker must have exactly three quotes',()=>{const d=base();d.speakers=[{id:'s1',status:'published',name:'Synthetic fixture',identityReviewed:true,sources:[{url:'https://example.org'}],quotes:[]}];assert.ok(validateManifest(d).includes('speaker.exactly_three_quotes'))});
test('unreviewed audio cannot be published',()=>{const d=base();d.speakers=[{id:'s1',status:'published',name:'Fixture',identityReviewed:true,sources:[{}],quotes:Array.from({length:3},()=>({text:'Test',reviewed:false,rightsConfirmed:true,audioUrl:'https://example.org/a.mp3',startMs:0,endMs:1000}))}];assert.ok(validateManifest(d).includes('quote.evidence'))});
test('nonpublic slots remain in curation with three empty slots',()=>{const d=base();d.speakers=[{id:'s1',status:'EM_CURADORIA',quotes:[{},{},{}]}];assert.deepEqual(validateManifest(d),[])});
test('external URL disallows script and plaintext',()=>{assert.equal(publicUrl('javascript:alert(1)'),null);assert.equal(publicUrl('http://example.org'),null)});
test('published photo needs rights and review',()=>{const d=base();d.media=[{status:'published',preview:'https://example.org/a.jpg',reviewed:true,rightsConfirmed:false}];assert.ok(validateManifest(d).includes('media.evidence'))});
test('unverified provider cannot be advertised as published delivery',()=>{const d=base();d.delivery={status:'published',url:'https://example.org/album',providerVerified:false};assert.ok(validateManifest(d).includes('delivery.evidence'))});

