import { test as base, Page } from '@playwright/test'; // Import Page type
import MyerCommonPage from './pages/myer/myer-common-page';
import RestfulApiDevApi from './api/restful-api-dev/restful-api-dev-api'; // Default import

type HubFixture = {
    myerCommonPage: MyerCommonPage;
    restfulApiDevApi: RestfulApiDevApi;
}

export const test = base.extend<HubFixture>({
    myerCommonPage: async ({ page }: { page: Page }, use: (arg: MyerCommonPage) => Promise<void>) => {
        await use(new MyerCommonPage(page));
    },

    restfulApiDevApi: async ({}, use: (arg: RestfulApiDevApi) => Promise<void>) => {
        await use(new RestfulApiDevApi());
    },
});