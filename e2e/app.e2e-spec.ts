import { PrjPage } from './app.po';

describe('prj App', function() {
  let page: PrjPage;

  beforeEach(() => {
    page = new PrjPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
