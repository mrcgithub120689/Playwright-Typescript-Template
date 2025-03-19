import { Page } from '@playwright/test';

export default class BasePage {
    public readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goToUrl(url: string)  {
        await this.page.goto(url, {waitUntil : "load"});
    }
}