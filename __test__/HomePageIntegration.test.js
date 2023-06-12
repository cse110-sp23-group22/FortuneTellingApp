const puppeteer = require("puppeteer");

describe("HomePage Script", () => {
  let browser, page;
  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.goto("https://cse110-sp23-group22.github.io/FortuneTellingApp/");
  });
  afterAll(async () => {
    await browser.close();
  });

  it("should cause title card to disappear on click", async () => {
    await page.click("#title-card");
    const titleDisplayStyle = await page.$eval("#title-card", (card) => {
      return card.style.display;
    });
    expect(titleDisplayStyle).toBe("none");
  });
});
