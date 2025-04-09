import { expect } from '@playwright/test';
import { test } from '../../hub-fixture';

test.describe(`Myer Sample Tests`, {tag: ['@UI', '@Sample']}, () => {
    test(`Assert Myer Page Loaded`, {tag: ['@UI'],}, async({myerCommonPage}) => {
        await myerCommonPage.goToUrl('https://www.myer.com.au');
        
        await expect(myerCommonPage.header).toBeVisible();
        const title = await myerCommonPage.page.title();
        expect(title).toContain('MYER | Shop Fashion');
    });

    test(`Assert Myer Page Loaded with Screenshot`, {tag: ['@UI', '@Screenshot']}, async({myerCommonPage}, testInfo) => {
        await myerCommonPage.goToUrl('https://www.myer.com.au');
        
        await expect(myerCommonPage.header).toBeVisible();
        const title = await myerCommonPage.page.title();
        expect(title).toContain('MYER | Shop Fashion');
        await myerCommonPage.screenshot(testInfo);
        await myerCommonPage.screenshot(testInfo, 'trial');
    });

    test(`Test Fail1`, {tag: ['@Fail']}, async({myerCommonPage}) => {
        await myerCommonPage.goToUrl('https://www.myer.com.au');
        
        await expect(myerCommonPage.header).toBeVisible();
        const title = await myerCommonPage.page.title();
        expect(title).toContain('Fail1');
    });

    test(`Test Fail2`, {tag: ['@Fail']}, async({myerCommonPage}) => {
        await myerCommonPage.goToUrl('https://www.google.com');
        
        await expect(myerCommonPage.header).toBeVisible();
        const title = await myerCommonPage.page.title();
        expect(title).toContain('Fail2');
    });
});