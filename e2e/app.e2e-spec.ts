import { ProlificNewPage } from './app.po';

describe('prolific-new App', () => {
  let page: ProlificNewPage;

  beforeEach(() => {
    page = new ProlificNewPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
