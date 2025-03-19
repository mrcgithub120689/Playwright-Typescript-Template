import { expect } from "@playwright/test";
import { test } from "../hub-fixture";

test.describe(`Myer Sample Tests`, () => {
    test(`Assert Myer Page Loaded`, async({myerCommonPage}) => {
        await myerCommonPage.goToUrl("https://www.myer.com.au");
        
        expect(myerCommonPage.header).toBeVisible();
        const title = await myerCommonPage.page.title();
        expect(title).toContain('MYER | Shop Fashion');
    });

    test(`Test Fail1`, async({myerCommonPage}) => {
        await myerCommonPage.goToUrl("https://www.myer.com.au");
        
        expect(myerCommonPage.header).toBeVisible();
        const title = await myerCommonPage.page.title();
        expect(title).toContain('Fail1');
    });

    test(`Test Fail2`, async({myerCommonPage}) => {
        await myerCommonPage.goToUrl("https://www.google.com");
        
        expect(myerCommonPage.header).toBeVisible();
        const title = await myerCommonPage.page.title();
        expect(title).toContain('Fail2');
    });
});