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
