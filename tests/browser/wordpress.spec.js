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
 const eventLogo=page.locator('.pm-event-logo-v2 img');await eventLogo.scrollIntoViewIfNeeded();await expect.poll(()=>eventLogo.evaluate(i=>i.complete&&i.naturalWidth>0)).toBeTruthy();expect(await eventLogo.evaluate(i=>i.currentSrc)).toContain(info.project.name==='webkit-mobile'?'cerfloro-logo-vertical-v2.png':'cerfloro-logo-horizontal-v2.png');
 await expect(page.locator('.pm-logo-motion img')).toBeVisible();await page.locator('#pm-tutorial-open').click();await expect(page.locator('#pm-tutorial')).toBeVisible();await page.keyboard.press('Escape');await expect(page.locator('#pm-tutorial')).not.toBeVisible();await expect(page.locator('#pm-tutorial-open')).toBeFocused();
 await page.locator('#pm-motion').click();await expect(page.locator('.pm-shell')).toHaveClass(/reduce-motion/);
 const dims=await page.evaluate(()=>({w:document.documentElement.clientWidth,s:document.documentElement.scrollWidth}));expect(dims.s).toBeLessThanOrEqual(dims.w);
 const data=await(await request.get('/wp-content/plugins/prime-memoria-eventos/event.public.json')).json();expect(data.speakers.every(x=>x.status==='published')).toBeTruthy();expect(data.media.every(x=>x.status==='published')).toBeTruthy();expect(JSON.stringify(data)).not.toMatch(/privatePath|rawAudio|embedding|internalToken/);
 expect(errors).toEqual([]);await page.screenshot({path:info.outputPath('wordpress.png'),fullPage:true});
});

 test('responsive logo boundary on live WordPress',async({page})=>{
 await page.goto('/fotos/ii-cerfloro-2026/',{waitUntil:'domcontentloaded'});
 for(const width of [320,375,390,599,600,601,768,1024,1440]){
 await page.setViewportSize({width,height:900});
 const logo=page.locator('.pm-event-logo-v2 img');
 await expect.poll(()=>logo.evaluate(i=>i.currentSrc)).toContain(width<=600?'cerfloro-logo-vertical-v2.png':'cerfloro-logo-horizontal-v2.png');
 await expect.poll(()=>logo.evaluate(i=>i.complete&&i.naturalWidth>0)).toBeTruthy();
 expect(await logo.evaluate(i=>getComputedStyle(i).objectFit)).toBe('contain');
 }
 });

test('live entrance deck navigates, pauses and supports keyboard',async({page})=>{
 await page.goto('/fotos/ii-cerfloro-2026/',{waitUntil:'domcontentloaded'});
 const deck=page.locator('#pm-hero-carousel');await expect(deck).toBeVisible();
 const current=()=>deck.locator('.pm-deck-dots [aria-current="true"]');await expect(current()).toHaveText('1');
 await deck.getByRole('button',{name:'Próxima →',exact:true}).click();await expect(current()).toHaveText('2');
 await page.keyboard.press('ArrowRight');await expect(current()).toHaveText('3');
 await deck.getByRole('button',{name:'Pausar apresentação',exact:true}).click();await expect(deck.getByRole('button',{name:'Retomar apresentação',exact:true})).toHaveAttribute('aria-pressed','true');
 await deck.getByRole('button',{name:'Mostrar cartão 1',exact:true}).click();await expect(current()).toHaveText('1');
});

test('final Banlek delivery button opens the supplied album',async({page})=>{
 await page.goto('/fotos/ii-cerfloro-2026/',{waitUntil:'domcontentloaded'});
 const album=page.locator('#pm-album');await expect(album).toBeVisible();await expect(album).toHaveAttribute('href','https://banlek.com/album/2a556b');await expect(album).toHaveAttribute('rel','noopener');
 await page.locator('#pm-tutorial-open').click();await expect(page.locator('#pm-tutorial a')).toHaveAttribute('href','https://banlek.com/album/2a556b');
});
