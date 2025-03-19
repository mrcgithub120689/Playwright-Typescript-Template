import { test as base } from '@playwright/test';
import MyerCommonPage from './pages/Myer/myer-common-page';

type MyerFixture = {
    myerCommonPage: MyerCommonPage;
}

export const test = base.extend<MyerFixture> ({
    myerCommonPage: async({ page }, use) => {
        await use(new MyerCommonPage(page));
    },
});