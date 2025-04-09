import { expect } from '@playwright/test';
import { test } from '../../hub-fixture';

test.describe(`Sample API Tests`, {tag: ['@API', '@Sample']}, () => {
    test(`Get Objects`, {tag: ['@Get'],}, async({restfulApiDevApi}) => {
        let objects = await restfulApiDevApi.getObjects();
        console.log(JSON.stringify(objects, null, 2));
        expect(objects.length).toEqual(13);
    });
});