import { expect } from "@playwright/test";
import { test } from "../../hub-fixture";
import { currentEnv } from "../../../framework/configLoader";

test.describe(`Sample Integration Performance Tests`, {tag: ['@Integration', '@Performance}']}, () => {    
    test(`Get Objects`, {tag: ['@Get']}, async({restfulApiDevApi, googleCommonPage}, testInfo) => {
        const testReference = (currentEnv + "-" + testInfo.project.name + "-" + testInfo.title).replace(" ", "-");

        performance.mark(testReference + "-api-started");
        let objects = await restfulApiDevApi.getObjects();
        expect(objects.length).toEqual(13);
        performance.mark(testReference + "-api-finished");
        performance.measure(testReference + "-api-duration", testReference + "-api-started", testReference + "-api-finished");

        performance.mark(testReference + "-ui-search-started");
        let objectToSearch = objects[9].name;
        await googleCommonPage.goToUrl("https://www.google.com/");
        await googleCommonPage.search(objectToSearch);
        await expect(googleCommonPage.comboboxSearch).toBeHidden();
        performance.mark(testReference + "-ui-search-finished");
        performance.measure(testReference + "-ui-search-duration", testReference + "-ui-search-started", testReference + "-ui-search-finished");
    });
});