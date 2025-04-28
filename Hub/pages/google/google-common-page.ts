import { Locator, Page } from "@playwright/test";
import BasePage from "../../../framework/base-page";

export default class GoogleCommonPage extends BasePage  { 
    public readonly comboboxSearch: Locator;

    constructor(page: Page) {
        super(page);       
        this.comboboxSearch = page.getByRole('combobox', { name: 'Search' });
    }

    async search(something: string) {
        await this.comboboxSearch.click();
        await this.comboboxSearch.fill(something);
        await this.comboboxSearch.press("Enter");
    }
}