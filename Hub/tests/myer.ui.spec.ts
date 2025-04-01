import { expect } from '@playwright/test';
import { test } from '../hub-fixture';

test.describe(`Myer Sample Tests`, {tag: ['@tag1', '@tag2'],}, () => {
    test(`Assert Myer Page Loaded`, {tag: ['@slow', '@vrt'],}, async({myerCommonPage}) => {
        await myerCommonPage.goToUrl('https://www.myer.com.au');
        
        await expect(myerCommonPage.header).toBeVisible();
        const title = await myerCommonPage.page.title();
        expect(title).toContain('MYER | Shop Fashion');
    });

    test(`Assert Myer Page Loaded with Screenshot`, {tag: ['@slow', '@vrt'],}, async({myerCommonPage}, testInfo) => {
        await myerCommonPage.goToUrl('https://www.myer.com.au');
        
        await expect(myerCommonPage.header).toBeVisible();
        const title = await myerCommonPage.page.title();
        expect(title).toContain('MYER | Shop Fashion');
        await myerCommonPage.screenshot(testInfo);
        await myerCommonPage.screenshot(testInfo, 'trial');
    });

    test(`Test Fail1`, async({myerCommonPage}) => {
        await myerCommonPage.goToUrl('https://www.myer.com.au');
        
        await expect(myerCommonPage.header).toBeVisible();
        const title = await myerCommonPage.page.title();
        expect(title).toContain('Fail1');
    });

    test(`Test Fail2`, async({myerCommonPage}) => {
        await myerCommonPage.goToUrl('https://www.google.com');
        
        await expect(myerCommonPage.header).toBeVisible();
        const title = await myerCommonPage.page.title();
        expect(title).toContain('Fail2');
    });
});