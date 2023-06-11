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
  
  test("Testing that the page was loaded", async () => {
    // Navigate to the desired website
    const url = 'https://cse110-sp23-group22.github.io/FortuneTellingApp/source/TarotCardDisplay/TarotDisplay.html';
    await page.goto(url);

    expect(page.url()).toBe(url);
  });

  test("Testing clicking on all cards", async () => {
    const url = 'https://cse110-sp23-group22.github.io/FortuneTellingApp/source/TarotCardDisplay/TarotDisplay.html';
    await page.goto(url);

    // Simulate clicking first card
    await page.evaluate(() => {
      const divElement = document.querySelector('div#card1.card');
      divElement.click();
    });

    
    let divSelectors = await page.$$eval('div', (divs) => divs.map((div) => div.getAttribute('class')));
    console.log('Div selectors:', divSelectors);

    let flippingCount = 0;
    for(let i = 0; i < divSelectors.length; i++){
      if(divSelectors[i]=='card flipped'){
        flippingCount = flippingCount + 1;
      }
    }

    expect(flippingCount).toBe(1);


    // Simulate clicking card #2
    await page.evaluate(() => {
      const divElement = document.querySelector('div#card2.card');
      divElement.click();
    });

    divSelectors = await page.$$eval('div', (divs) => divs.map((div) => div.getAttribute('class')));
    console.log('Div selectors:', divSelectors);
    
    flippingCount = 0;
    for(let i = 0; i < divSelectors.length; i++){
      if(divSelectors[i]=='card flipped'){
        flippingCount = flippingCount + 1;
      }
    }

    expect(flippingCount).toBe(2);

    // Simulate clicking third card
    await page.evaluate(() => {
      const divElement = document.querySelector('div#card3.card');
      divElement.click();
    });

    divSelectors = await page.$$eval('div', (divs) => divs.map((div) => div.getAttribute('class')));
    console.log('Div selectors:', divSelectors);
    
    flippingCount = 0;
    for(let i = 0; i < divSelectors.length; i++){
      if(divSelectors[i]=='card flipped'){
        flippingCount = flippingCount + 1;
      }
    }

    expect(flippingCount).toBe(3);
    
  });

  test("Testing clicking on all cards in reverse order", async () => {
    const url = 'https://cse110-sp23-group22.github.io/FortuneTellingApp/source/TarotCardDisplay/TarotDisplay.html';
    await page.goto(url);

    // Simulate clicking third card
    await page.evaluate(() => {
      const divElement = document.querySelector('div#card3.card');
      divElement.click();
    });

    
    let divSelectors = await page.$$eval('div', (divs) => divs.map((div) => div.getAttribute('class')));
    console.log('Div selectors:', divSelectors);

    let flippingCount = 0;
    for(let i = 0; i < divSelectors.length; i++){
      if(divSelectors[i]=='card flipped'){
        flippingCount = flippingCount + 1;
      }
    }

    expect(flippingCount).toBe(1);


    // Simulate clicking card #2
    await page.evaluate(() => {
      const divElement = document.querySelector('div#card2.card');
      divElement.click();
    });

    divSelectors = await page.$$eval('div', (divs) => divs.map((div) => div.getAttribute('class')));
    console.log('Div selectors:', divSelectors);
    
    flippingCount = 0;
    for(let i = 0; i < divSelectors.length; i++){
      if(divSelectors[i]=='card flipped'){
        flippingCount = flippingCount + 1;
      }
    }

    expect(flippingCount).toBe(2);

    // Simulate clicking first card
    await page.evaluate(() => {
      const divElement = document.querySelector('div#card1.card');
      divElement.click();
    });

    divSelectors = await page.$$eval('div', (divs) => divs.map((div) => div.getAttribute('class')));
    console.log('Div selectors:', divSelectors);
    
    flippingCount = 0;
    for(let i = 0; i < divSelectors.length; i++){
      if(divSelectors[i]=='card flipped'){
        flippingCount = flippingCount + 1;
      }
    }

    expect(flippingCount).toBe(3);
    
  });
});
