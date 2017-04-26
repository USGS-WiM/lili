import { LideLimsPage } from './app.po';

describe('lide-lims App', () => {
  let page: LideLimsPage;

  beforeEach(() => {
    page = new LideLimsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
