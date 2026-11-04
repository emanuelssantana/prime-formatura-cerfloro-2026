import {test,expect} from '@playwright/test';
import fs from 'node:fs';
test('gallery batches, day filters, portrait cards and lightbox before photo publication',async({page,request})=>{
 const manifest=await(await request.get('/wp-content/plugins/prime-memoria-eventos/event.public.json')).json();
 const preview='https://primeformatura.com.br/wp-content/plugins/prime-memoria-eventos/prime-logo.webp';
 manifest.media=Array.from({length:85},(_,i)=>({id:'qa-'+i,type:'photo',day:i<80?'2026-11-03':'2026-11-04',status:'published',reviewed:true,rightsConfirmed:true,preview,alt:'Technical fixture '+i,caption:'Technical fixture '+i,portraitCard:i<2,portraitReviewed:i<2}));
 // Browser-only fixtures never reach WordPress storage or public manifests.
 await page.route('**/event.public.json*',route=>route.fulfill({json:manifest}));
 const source=fs.readFileSync(new URL('../../plugin/prime-memoria-eventos/app.js',import.meta.url),'utf8');
 await page.route('**/app.js*',route=>route.fulfill({contentType:'text/javascript',body:source}));
 await page.goto('/fotos/ii-cerfloro-2026/',{waitUntil:'domcontentloaded'});
 await expect(page.locator('#pm-gallery .pm-photo')).toHaveCount(40);
 await page.locator('.pm-gallery-more').click();await expect(page.locator('#pm-gallery .pm-photo')).toHaveCount(80);
 await page.locator('[data-day="2026-11-04"]').click();await expect(page.locator('#pm-gallery .pm-photo')).toHaveCount(5);await expect(page.locator('.pm-gallery-more')).toHaveCount(0);
 await page.locator('#pm-gallery .pm-photo').first().click();await expect(page.locator('#pm-lightbox')).toBeVisible();await expect(page.locator('#pm-lightbox p')).toContainText('Technical fixture 80');await page.keyboard.press('Escape');await expect(page.locator('#pm-lightbox')).not.toBeVisible();
 await expect(page.locator('.pm-portrait-card')).toHaveCount(2);await expect(page.locator('.pm-portrait-card h3').first()).toHaveText('Participante do II CERFloRO');
});
