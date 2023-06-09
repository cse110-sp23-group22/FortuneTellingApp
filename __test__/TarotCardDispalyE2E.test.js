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
  test("Tests that clicking on new cards will turn one card at a time", async () => {
    await page.goto(
      "https://cse110-sp23-group22.github.io/FortuneTellingApp/source/TarotCardDisplay/TarotDisplay.html"
    );
    const cards = await page.$$('#cardContainer');

    for(let i = 0; i < cards.length; i++){
      const card = await cards[i].getProperty("alt").value;
      expect(card).toBe(`Card ${i} Back`);
    }

    for(let i = 0; i < cards.length; i++){
      const card = cards[i];
      expect(card.getProperty("alt").value).toBe(`Card ${i} Front`);

      await card.click();
      expect(card.getProperty("alt").value).toBe(`Card ${i} Back`);
      
      if(i >= 0){
        const prevCard = cards[i-1];
        expect(prevCard.getProperty("alt").value).toBe(`Card ${i} Front`);
      }
    }
    
  }, 99999);
});
