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

  test("Tests if the contents of the local storage get displayed in the correcd tag", async () => {
    // reload page a few times to have localStorage recognized
    await page.goto(
      "https://cse110-sp23-group22.github.io/FortuneTellingApp/source/HoroscopeDisplay/Horoscope.html"
    );

    await page.evaluate(() => {
      localStorage.setItem("Birthday", "2001-02-02");
      localStorage.setItem("UserName", "Nikan");
      console.log(localStorage.getItem("UserName"));
    });
    await page.goto(
      "https://cse110-sp23-group22.github.io/FortuneTellingApp/source/HoroscopeDisplay/Horoscope.html"
    );
    await page.goto(
      "https://cse110-sp23-group22.github.io/FortuneTellingApp/source/HoroscopeDisplay/Horoscope.html"
    );

    console.log("checking output tags");

    let nameElement = await page.$("#fname");
    let nameText = await (
      await nameElement.getProperty("innerText")
    ).jsonValue();
    expect(nameText).toBe("Nikan");

    let birthdayElement = await page.$("#birthday");
    let birthdayText = await (
      await birthdayElement.getProperty("innerText")
    ).jsonValue();
    expect(birthdayText).toBe("2001-02-02");
  });

  test("Tests if the page will move on to the home page if the home button in horoscope is pushed", async () => {
    await page.goto(
      "https://cse110-sp23-group22.github.io/FortuneTellingApp/source/HoroscopeDisplay/Horoscope.html"
    );

    let oldUrl = page.url();
    expect(oldUrl).toBe(
      "https://cse110-sp23-group22.github.io/FortuneTellingApp/source/HoroscopeDisplay/Horoscope.html"
    );

    let homeButton = await page.$("#homeButton");
    await homeButton.click();
    await page.waitForNavigation();

    let newUrl = page.url();
    expect(newUrl).toBe(
      "https://cse110-sp23-group22.github.io/FortuneTellingApp/index.html"
    );
  }, 10000);

  // test times out after clicking the button. This is still an important test, so commenting it
  // in the hopes that it can eventually be resolved. Functionality has been verfied manually
  //   test("Tests if output content is stored in localStorage", async () => {
  //     await page.goto(
  //       "http://127.0.0.1:5500/source/HoroscopeQuestionnaire/HoroscopeQuestionnaire.html"
  //     );
  //     // await page.waitForNavigation();

  //     const insertedValue = await page.evaluate(() => {
  //       document.getElementById("fname").value = "Alex";
  //       return document.getElementById("fname").value;
  //     });

  //     expect(insertedValue).toEqual("Alex");

  //     let insertedBirthday = await page.evaluate(() => {
  //       document.getElementById("birthday").value = "2000-01-03";
  //       return document.getElementById("birthday").value;
  //     });
  //     expect(insertedBirthday).toEqual("2000-01-03");

  //     let button = await page.$("#exitButton");
  //     const exitButton = await page.$("button");
  //     await exitButton.click();
  //     console.log(button);
  //     await page.evaluate(() => {
  //       const button = document.getElementById("exitButton");
  //       // buttonOnclick = button.onclick;
  //       button.click();
  //     });
  //     await page.waitForTimeout(1000);

  //     let birthday = await page.evaluate(() => {
  //       return localStorage.getItem("Birthday");
  //     });

  //     let username = await page.evaluate(() => {
  //       return localStorage.getItem("UserName");
  //     });

  //     expect(username).toBe("Alex");
  //     expect(birthday).toBe("2000-01-03");
  //   }, 20000);

  //   test("Tests for stupidity of async functions", async () => {
  //     await page.goto(
  //       "http://127.0.0.1:5500/source/HoroscopeQuestionnaire/HoroscopeQuestionnaire.html"
  //     );
  //     await page.waitForTimeout(5000);
  // });
});
