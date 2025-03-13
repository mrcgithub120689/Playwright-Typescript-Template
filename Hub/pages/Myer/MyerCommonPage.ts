import { Locator, Page } from '@playwright/test';
import BasePage from '../../../framework/BasePage';

export default class MyerCommonPage extends BasePage  { 
    public readonly header: Locator;

    constructor(page: Page) {
        super(page);
        this.header = page.locator(`//*[@data-automation='desktop-header-container']`);
    }

    async navigateToMenu() {
        
    }
}