import{test,expect}from'@playwright/test';
test('WordPress live filters, FAQ, motion and public manifest',async({page,request},info)=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 const response=await page.goto('/fotos/ii-cerfloro-2026/',{waitUntil:'networkidle'});expect(response.status()).toBe(200);
 await expect(page.locator('#pm-timeline')).toContainText('2024');
 await page.locator('[data-day="2026-11-04"]').click();await expect(page.locator('[data-day="2026-11-04"]')).toHaveAttribute('aria-pressed','true');await expect(page.locator('#pm-gallery')).toContainText('segundo dia');
 await page.getByText('As fotos serão gratuitas?',{exact:true}).click();await expect(page.locator('details[open]')).toContainText('gratuita');
 await page.locator('#pm-motion').click();await expect(page.locator('.pm-shell')).toHaveClass(/reduce-motion/);
 const dims=await page.evaluate(()=>({w:document.documentElement.clientWidth,s:document.documentElement.scrollWidth}));expect(dims.s).toBeLessThanOrEqual(dims.w);
 const data=await(await request.get('/wp-content/plugins/prime-memoria-eventos/event.public.json')).json();expect(data.speakers.every(x=>x.status==='published')).toBeTruthy();expect(data.media.every(x=>x.status==='published')).toBeTruthy();expect(JSON.stringify(data)).not.toMatch(/privatePath|rawAudio|embedding|internalToken/);
 expect(errors).toEqual([]);await page.screenshot({path:info.outputPath('wordpress.png'),fullPage:true});
});
