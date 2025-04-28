import { expect } from '@playwright/test';
import { test } from '../../hub-fixture';
import { configEnv } from '../../../framework/configLoader';

test.describe(`Sample API Tests`, {tag: ['@API', '@Sample']}, () => {
    test(`Get Objects`, {tag: ['@Get']}, async({restfulApiDevApi}) => {
        let objects = await restfulApiDevApi.getObjects();
        console.log(process.env.ENV);
        console.log(JSON.stringify(configEnv, null, 2));
        expect(objects.length).toEqual(13);
    });

    test(`Get Objects By Id`, {tag: ['@GetById']}, async({restfulApiDevApi}) => {
        let object = await restfulApiDevApi.getObjectById("7");
        console.log(JSON.stringify(object, null, 2));
        expect(object.data.price).toEqual(1849.99);
    });
});