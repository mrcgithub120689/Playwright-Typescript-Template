import { Page, TestInfo } from '@playwright/test';

export default class BasePage {
    public readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /**
     * Navigate to url
     * @param url 
     */
    async goToUrl(url: string) {
        // 'load' means the navigation is complete when the 'load' event is fired
        await this.page.goto(url, { waitUntil: 'load' });
        await this.waitForPageTitleToBeNonEmpty();
    }
    /**
     * Take screenshot, save and attach the file
     * @param testInfo 
     * @param details (optional) any additional information
     */
    async screenshot(testInfo: TestInfo, details?: string) {
        // Create a base filename for the screenshot using the test title, replacing spaces with hyphens
        let completeFileName: string = (`${testInfo.title} screenshot`).replace(/\s/g, `-`);
    
        // If 'details' is provided and is a string, append it to the filename, replacing spaces with hyphens
        if (typeof details === `string`) {
            completeFileName = (`${testInfo.title} screenshot ${details}`).replace(/\s/g, `-`);
        }
    
        // Take a screenshot of the current page
        // 'fullPage: true' captures the entire page, not just the visible viewport
        const screenshot: Buffer = await this.page.screenshot({
            path: `test-results/screenshots/${completeFileName}.png`,
            fullPage: true
        });
    
        // Attach the screenshot to the test report
        await testInfo.attach(completeFileName, { body: screenshot, contentType: 'image/png' });
    }

    /**
     * Define an asynchronous function named 'delay' that takes a number of milliseconds as an argument
     * @param ms  
     */
    async delay(ms: number) {
        // Return a Promise that resolves after the specified number of milliseconds
        new Promise(resolve => setTimeout(resolve, ms));
    }

    // Wait for page Title to be not empty
    private async waitForPageTitleToBeNonEmpty() {
        // Use 'page.waitForFunction' to wait until the document's title is not null or an empty string
        await this.page.waitForFunction(
            // JavaScript function to be evaluated in the browser context
            () => document.title !== null && document.title.trim() !== '',
            { timeout: 10000 }
        );
    }
}