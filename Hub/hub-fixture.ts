import { test as base } from '@playwright/test';
import MyerCommonPage from './pages/myer/myer-common-page';
import { RestfulApiDevApi } from './api/Restful-API-Dev/restful-api-dev-api';

type HubFixture = {
    myerCommonPage: MyerCommonPage;

    restfulApiDevApi : RestfulApiDevApi;
}

export const test = base.extend<HubFixture> ({
    myerCommonPage: async({ page }, use) => {
        await use(new MyerCommonPage(page));
    },

    restfulApiDevApi: async ({}, use) => {
        await use(new RestfulApiDevApi());
      },
});