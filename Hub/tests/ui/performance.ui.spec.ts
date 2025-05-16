import { test } from "../../hub-fixture"; // Adjust the path as necessary
import { saveJsonToFile } from "../../../framework/helper";
import { reportDate } from "../../../playwright.config";
import { expect } from "@playwright/test";
import performanceSites from "../../data/performance-sites.json";

test.describe('Performance Test', () => {
    performanceSites.forEach(({ name, url }) => {
        test(`${name} should show performance results`, async ({ page }, testInfo) => {
            const testReference = `${testInfo.title.replace(/\s+/g, '-')}`;
            // show logs in page context
            // page.on('console', msg => console.log('PAGE LOG:', msg.text()));

            // Perform navigation to the URL
            await page.goto(url);

            // Start performance measurement for the search operation
            await page.evaluate((testReference) => {
                performance.mark(`${testReference}-ui-started`);
            }, testReference);

            // Optionally, wait for a specific element that indicates the page is fully rendered
            await expect(page.locator('body')).toBeVisible(); // Ensure the body is visible

            // Finish performance measurement for the search operation
            await page.evaluate((testReference) => {
                performance.mark(`${testReference}-ui-finished`);
                try {
                    performance.measure(`${testReference}-ui-duration`, `${testReference}-ui-started`, `${testReference}-ui-finished`);
                } catch (error) {
                    console.error('Error measuring performance:', error);
                }
            }, testReference);

            
            // Retrieve performance measure entries related to the test
            const performanceEntries = await page.evaluate(() => {
                return performance.getEntries();
            });

            // Save the performance measures
            saveJsonToFile(performanceEntries, `playwright-report/performance-entries-${testInfo.title.replace(/\s+/g, '-')}.json`);

            // Retrieve performance measure entries related to the test
            const performanceMeasures = await page.evaluate(() => {
                return performance.getEntriesByType('measure').filter(entry => entry.name.includes('duration'));
            });

            // Save the performance measures
            saveJsonToFile(performanceMeasures, `playwright-report/performance-measures-${testInfo.title.replace(/\s+/g, '-')}.json`);
        });
    });
});