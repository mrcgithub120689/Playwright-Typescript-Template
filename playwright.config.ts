import { defineConfig, devices } from '@playwright/test';
import * as path from 'path';
import * as helper from './framework/helper'

const reportDate = helper.reporterDateTimeFormat();

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  // testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 5 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    [
      'html',
      {
        outputFolder: path.join(__dirname, `playwright-report`, `playwright-report-${reportDate}`),
        open: 'never',
      },
    ],
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',

    /* Screenshot on failure */ 
    screenshot: 'only-on-failure',
  
    /* default headless = true */ 
    // headless: false, 
  },

  /* Configure projects for major browsers */
  projects: [
    // Project for API tests
    // use code below to test match multiple files
    // testMatch: ['**/*.ui.spec.ts', '**/*.e2e.spec.ts'], // Match UI and E2E test files
    {
      name: 'api',
      testMatch: '**/*.api.spec.ts', // Match API test files
      use: {
        // You can specify any API-specific settings here
      },
    },

    // Project for UI tests in Chromium
    {
      name: 'chromium',
      testMatch: '**/*.ui.spec.ts', // Match UI test files
      // testMatch: ['**/*.ui.spec.ts', '**/*.integration.spec.ts'], // Match both UI and integration test files
      // testMatch: '**/*.(ui.spec|integration).ts', // Match both UI and integration test files
      use: { ...devices['Desktop Chrome'] },
    },

    // Project for UI tests in Firefox
    {
      name: 'firefox',
      testMatch: '**/*.ui.spec.ts', // Match UI test files
      use: { ...devices['Desktop Firefox'] },
    },

    // Project for UI tests in WebKit
    {
      name: 'webkit',
      testMatch: '**/*.ui.spec.ts', // Match UI test files
      use: { ...devices['Desktop Safari'] },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
