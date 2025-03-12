import { Page, TestInfo } from '@playwright/test';

export default class BasePage {
    public readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }
}