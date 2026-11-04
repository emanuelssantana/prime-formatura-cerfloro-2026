import{test,expect}from'@playwright/test';
test('WordPress live filters, FAQ, motion and public manifest',async({page,request},info)=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 const response=await page.goto('/fotos/ii-cerfloro-2026/',{waitUntil:'domcontentloaded'});expect(response.status()).toBe(200);
 await expect.poll(()=>page.evaluate(()=>window.MFMusic?.state()?.ready)).toBeTruthy();expect(await page.evaluate(()=>window.MFMusic.lists().youtube.length)).toBe(27);await expect(page.locator('#mf-music-panel iframe')).toHaveCount(1);
 await expect(page.locator('#pm-sound')).toBeDisabled();await expect(page.locator('#pm-sound-status')).toContainText('revisados');
 await expect(page.locator('#pm-timeline')).toContainText('2024');
 await page.locator('[data-day="2026-11-04"]').click();await expect(page.locator('[data-day="2026-11-04"]')).toHaveAttribute('aria-pressed','true');await expect(page.locator('#pm-gallery')).toContainText('segundo dia');
 await page.getByText('As fotos serão gratuitas?',{exact:true}).click();await expect(page.locator('details[open]')).toContainText('gratuita');
 await expect(page.locator('.pm-free-period')).toContainText('03 a 17 de novembro de 2026');await expect(page.locator('#equipe article')).toHaveCount(2);for(const image of await page.locator('#equipe img').all()){await image.scrollIntoViewIfNeeded();await expect.poll(()=>image.evaluate(i=>i.complete&&i.naturalWidth>0)).toBeTruthy();}
 await expect(page.locator('.pm-logo-motion img')).toBeVisible();await page.locator('#pm-tutorial-open').click();await expect(page.locator('#pm-tutorial')).toBeVisible();await page.keyboard.press('Escape');await expect(page.locator('#pm-tutorial')).not.toBeVisible();await expect(page.locator('#pm-tutorial-open')).toBeFocused();
 await page.locator('#pm-motion').click();await expect(page.locator('.pm-shell')).toHaveClass(/reduce-motion/);
 const dims=await page.evaluate(()=>({w:document.documentElement.clientWidth,s:document.documentElement.scrollWidth}));expect(dims.s).toBeLessThanOrEqual(dims.w);
 const data=await(await request.get('/wp-content/plugins/prime-memoria-eventos/event.public.json')).json();expect(data.speakers.every(x=>x.status==='published')).toBeTruthy();expect(data.media.every(x=>x.status==='published')).toBeTruthy();expect(JSON.stringify(data)).not.toMatch(/privatePath|rawAudio|embedding|internalToken/);
 expect(errors).toEqual([]);await page.screenshot({path:info.outputPath('wordpress.png'),fullPage:true});
});
