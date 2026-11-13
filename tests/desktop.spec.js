import { test, expect } from '@playwright/test';
const app = (page, name) => page.getByRole('button', { name: `Open ${name}`, exact: true });
const ready = page => page.evaluate(async () => { await document.fonts.ready; await Promise.all(document.getAnimations().filter(a => a.effect?.getTiming().iterations !== Infinity).map(a => a.finished.catch(() => {}))); });

test('desktop keeps working windows, real content and honest Messages', async ({ page }, testInfo) => {
 await page.setViewportSize({ width: 1440, height: 1000 });
 const errors = []; page.on('pageerror', e => errors.push(e.message));
 await page.goto('/');
 await expect(page.locator('.os-bubble')).toHaveCount(3);
 await expect(page.getByText('A prerecorded introduction. Not a live chat.')).toBeVisible();
 await ready(page); await page.screenshot({ path: testInfo.outputPath('desktop-messages.png') });
 await app(page, 'Finder').click();
 await page.getByRole('button', { name: 'Capstone', exact: true }).click();
 await expect(page.locator('.os-file-preview')).toContainText('capstone prototype');
 await expect(page.locator('.os-file-preview')).not.toContainText('1,000');
 await ready(page); await page.screenshot({ path: testInfo.outputPath('desktop-finder.png') });
 const finder = page.getByRole('region', { name: 'Finder window' });
 const handle = page.getByRole('button', { name: 'Move Finder window. Use arrow keys to move, or drag.', exact: true });
 const before = await finder.getAttribute('style'); const box = await handle.boundingBox();
 await page.mouse.move(box.x + 100, box.y + 20); await page.mouse.down(); await page.mouse.move(box.x + 230, box.y + 70, { steps: 8 }); await page.mouse.up();
 expect(await finder.getAttribute('style')).not.toBe(before);
 await handle.focus(); await page.keyboard.press('ArrowRight');
 await page.getByRole('button', { name: 'Maximize Finder', exact: true }).click(); await expect(finder).toHaveClass(/os-window-full/);
 await page.getByRole('button', { name: 'Restore Finder', exact: true }).click();
 await page.getByRole('button', { name: 'Minimize Finder', exact: true }).click(); await expect(finder).toBeHidden();
 await app(page, 'Finder').click(); await expect(finder).toBeVisible();
 await page.getByRole('button', { name: 'Close Finder', exact: true }).click(); await expect(finder).toHaveCount(0);
 await app(page, 'Writing').click(); await page.locator('.posts a').first().click(); await expect(page).toHaveURL(/\?post=/);
 await page.getByRole('button', { name: 'All writing', exact: true }).click(); await expect(page).not.toHaveURL(/\?post=/);
 await page.goBack(); await expect(page.locator('.post')).toBeVisible();
 await app(page, 'Work').click(); await expect(page.getByRole('region', { name: 'Work window' })).toContainText('New York City');
 expect(errors).toEqual([]);
});

test('mobile apps switch, survive minimize and keep post links and drafts', async ({ page }, testInfo) => {
 await page.setViewportSize({ width: 390, height: 844 });
 await page.goto('/?post=obsession'); await expect(page.locator('.post h1')).toHaveText('Obsession');
 await ready(page); await page.screenshot({ path: testInfo.outputPath('mobile-writing.png') });
 await app(page, 'Messages').click(); await expect(page.locator('.os-bubble')).toHaveCount(3);
 await page.getByLabel('Write an email to Namkhang').fill('Hello'); await expect(page.getByRole('button', { name: 'Draft email' })).toBeEnabled();
 await ready(page); await page.screenshot({ path: testInfo.outputPath('mobile-messages.png') });
 await page.getByRole('button', { name: 'Minimize Messages', exact: true }).click(); await expect(page.getByRole('region', { name: 'Writing window' })).toBeVisible();
 await app(page, 'Finder').click(); await expect(page.locator('.os-finder')).toBeVisible();
 await ready(page); await page.screenshot({ path: testInfo.outputPath('mobile-finder.png') });
 expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
 await page.goto('/?post=not-real'); await expect(page.getByRole('region', { name: 'Messages window' })).toBeVisible();
});

test('reduced motion shows the whole introduction immediately', async ({ page }) => {
 await page.emulateMedia({ reducedMotion: 'reduce' }); await page.goto('/'); await expect(page.locator('.os-bubble')).toHaveCount(3); await expect(page.locator('.os-typing')).toHaveCount(0);
});
