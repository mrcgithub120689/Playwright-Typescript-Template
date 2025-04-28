import { test as base, Page } from '@playwright/test'; // Import Page type
import MyerCommonPage from './pages/myer/myer-common-page';
import RestfulApiDevApi from './api/restful-api-dev/restful-api-dev-api'; // Default import
import GoogleCommonPage from './pages/google/google-common-page';

type HubFixture = {
    myerCommonPage: MyerCommonPage;
    restfulApiDevApi: RestfulApiDevApi;
    googleCommonPage: GoogleCommonPage;
}

export const test = base.extend<HubFixture>({
    myerCommonPage: async ({ page }: { page: Page }, use: (arg: MyerCommonPage) => Promise<void>) => {
        await use(new MyerCommonPage(page));
    },

    googleCommonPage: async ({ page }: { page: Page }, use: (arg: GoogleCommonPage) => Promise<void>) => {
        await use(new GoogleCommonPage(page));
    },

    restfulApiDevApi: async ({}, use: (arg: RestfulApiDevApi) => Promise<void>) => {
        await use(new RestfulApiDevApi());
    },
});