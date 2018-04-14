import { ClaudiaPereiraPage } from './app.po';

describe('claudia-pereira App', function() {
  let page: ClaudiaPereiraPage;

  beforeEach(() => {
    page = new ClaudiaPereiraPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
