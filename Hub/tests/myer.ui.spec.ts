import { expect } from "@playwright/test";
import { test } from "../HubFixture";

test.describe(`Myer UI Tests`, () => {
    test(`Assert Myer Page Loaded`, async({myerCommonPage}, testInfo) => {
        await myerCommonPage.page.goto("https://www.myer.com.au");
        
        expect(myerCommonPage.header).toBeVisible();
        const title = await myerCommonPage.page.title();
        expect(title).toContain('MYER | Shop Fashion');
    });
});