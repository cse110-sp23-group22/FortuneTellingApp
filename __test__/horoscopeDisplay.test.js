const puppeteer = require('puppeteer');

describe('My Puppeteer tests', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
  });

  test('Tests if the contents of the local storage get displayed in the correcd tag', async () => {
    
    await page.goto('https://cse110-sp23-group22.github.io/FortuneTellingApp/source/HoroscopeDisplay/horoscope.html');
    await page.evaluate(() => {
      localStorage.setItem('Birthday', '02/02/2001');
      localStorage.setItem('UserName', 'Nikan');
      console.log(localStorage.getItem('UserName'));
    });
    await page.goto('https://cse110-sp23-group22.github.io/FortuneTellingApp/source/HoroscopeDisplay/horoscope.html');

    console.log('checking output tags');
    
    let nameElement = await page.$('#fname');
    let nameText = await (await nameElement.getProperty('innerText')).jsonValue();
    expect(nameText).toBe("Nikan");

    let birthdayElement = await page.$('#birthday');
    let birthdayText = await (await birthdayElement.getProperty('innerText')).jsonValue();
    expect(birthdayText).toBe("02/02/2001");
  });

  test('Tests if the page will move on to the home page if the home button in horoscope is pushed', async () => {
    
    await page.goto('https://cse110-sp23-group22.github.io/FortuneTellingApp/source/HoroscopeDisplay/horoscope.html');

    let oldUrl = page.url();
    expect(oldUrl).toBe("https://cse110-sp23-group22.github.io/FortuneTellingApp/source/HoroscopeDisplay/horoscope.html");

    let homeButton = await page.$('#homeButton');
    await homeButton.click();
    await page.waitForNavigation();

    let newUrl = page.url();
    expect(newUrl).toBe("https://cse110-sp23-group22.github.io/FortuneTellingApp/index.html");
  });
});


/*
describe('Puppeteer Example', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
  });

  it('should take a screenshot of a website', async () => {
    await page.goto('https://example.com');
    await page.screenshot({ path: 'example.png' });
    expect(true).toBe(true); // Dummy expectation for demonstration purposes
  });

  it('should have the correct page title', async () => {
    await page.goto('https://example.com');
    const title = await page.title();
    expect(title).toBe('Example Domain');
  });
});
*/





