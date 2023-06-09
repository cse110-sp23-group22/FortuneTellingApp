const puppeteer = require("puppeteer");

describe("My Puppeteer tests", () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
  });
  test("someting", async () => {});
});
