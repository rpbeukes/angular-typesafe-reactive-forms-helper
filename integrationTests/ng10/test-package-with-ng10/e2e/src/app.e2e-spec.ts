import * as puppeteer from 'puppeteer';

describe('End-to-End tests', () => {
  it('should render app-test-form', async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('http://localhost:4200');

    const headerEl = await page.$('app-test-form h1');
    const text = await page.evaluate(element => element.textContent, headerEl);
    expect(text).toEqual('test-package-with-ng10');
    await browser.close();
  });
});

// import { AppPage } from './app.po';
// import { browser, logging } from 'protractor';

// describe('End-to-End tests', () => {
//   let page: AppPage;

//   beforeEach(() => {
//     page = new AppPage();
//   });

//   it('should display page header "test-package-with-ngXX"', () => {
//     page.navigateTo();
//     expect(page.getTitleText()).toEqual('test-package-with-ng10');
//   });

//   afterEach(async () => {
//     // Assert that there are no errors emitted from the browser
//     const logs = await browser.manage().logs().get(logging.Type.BROWSER);
//     expect(logs).not.toContain(jasmine.objectContaining({
//       level: logging.Level.SEVERE,
//     } as logging.Entry));
//   });
// });
