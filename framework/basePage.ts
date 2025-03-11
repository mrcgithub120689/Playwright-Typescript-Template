import { Page, TestInfo } from '@playwright/test';

export default class BasePage {
    protected readonly page: Page; 

    constructor(page: Page) {
        this.page = page;
    }

    // go to baseURL
    async goToBaseUrl() {
        await this.page.goto(``);
    }

    // refresh page
    async refreshPage() {
        await this.page.reload();
    }

    /**
     * Takes a screenshot and attaches it to the test information.
     * 
     * @param testInfo - The test information object.
     * @param fileName - An optional file name to include in the screenshot file name.
     */
    async screenshot(testInfo: TestInfo, fileName?: string) {
        // Construct the base file name using the test title
        const baseFileName = fileName ? `${testInfo.title} ${fileName}` : testInfo.title;

        // Replace spaces with hyphens to create a valid file name
        const completeFileName = `${baseFileName} screenshot`.replace(/\s/g, '-');

        // Capture the screenshot and save it to the specified path
        const screenshot: Buffer = await this.page.screenshot({
            path: `test-results/screenshots/${completeFileName}.png`,
            fullPage: true
        });

        // Attach the screenshot to the test information
        await testInfo.attach(completeFileName, { body: screenshot, contentType: 'image/png' });
    }
}