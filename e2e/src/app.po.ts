import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl);
  }

  getTitleText() {
    return element(by.css('app-root h1')).getText();
  }

  enterSearchTerm(term: string) {
    element(by.css('app-search .term')).sendKeys(term);
  }

  startSearch() {
    element(by.css('app-search .btn')).click();
  }

  getResultItem() {
    return element(by.css('.result-item'));
  }

  getResultItemCount() {
    return element.all(by.css('.result-item')).count();
  }
}
