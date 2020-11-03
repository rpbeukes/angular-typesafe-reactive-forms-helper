import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('End-to-End tests', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display page header "test-package-with-ngXX"', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('test-package-with-ng9');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
