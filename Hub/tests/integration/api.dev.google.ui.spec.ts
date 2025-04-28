import { expect } from "@playwright/test";
import { test } from "../../hub-fixture";

test.describe(`Sample Integration Tests`, {tag: ['@Integration', '@Sample']}, () => {
    test(`Get Objects`, {tag: ['@Get']}, async({restfulApiDevApi, googleCommonPage}) => {
        let objects = await restfulApiDevApi.getObjects();
        expect(objects.length).toEqual(13);
        let objectToSearch = objects[9].name;

        await googleCommonPage.goToUrl("https://www.google.com/");
        await googleCommonPage.search(objectToSearch);

        await expect(googleCommonPage.comboboxSearch).toBeHidden();
    });

    test(`Get Objects By Id`, {tag: ['@GetById']}, async({restfulApiDevApi, googleCommonPage}) => {
        let object = await restfulApiDevApi.getObjectById("7");
        console.log(JSON.stringify(object, null, 2));
        expect(object.data.price).toEqual(1849.99);
        let objectToSearch = object.name;

        await googleCommonPage.goToUrl("https://www.google.com/");
        await googleCommonPage.search(objectToSearch);

        await expect(googleCommonPage.comboboxSearch).toBeHidden();
    });
});