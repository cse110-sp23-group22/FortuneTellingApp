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
    await page.goto(
      "https://cse110-sp23-group22.github.io/FortuneTellingApp/source/HoroscopeDisplay/Horoscope.html"
    );
    await page.evaluate(() => {
      localStorage.setItem("Birthday", "2001-02-02");
      localStorage.setItem("UserName", "Nikan");
      console.log(localStorage.getItem("UserName"));
    });
    // reload page a few times to have localStorage recognized
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
  });

  //test times out after clicking the button, even though by screenshot it is verified that the values have been inputed.
  test("Tests if output content is stored in localStorage", async () => {
    await page.goto(
      "http://127.0.0.1:5500/source/HoroscopeQuestionnaire/HoroscopeQuestionnaire.html"
    );

    await page.evaluate(() => {
      document.getElementById("fname").value = "Alex";
    });
    await page.evaluate(() => {
      document.getElementById("birthday").value = "2000-01-03";
    });

    console.log("before");
    let button = await page.$("#exitButton");

    await button.click();
    await page.screenshot({ path: "screenshot.png" });

    console.log("after pressing button");

    let birthday = await page.evaluate(() => {
      return localStorage.getItem("Birthday");
    });

    let username = await page.evaluate(() => {
      return localStorage.getItem("Username");
    });

    expect(username).toBe("Alex");
    expect(birthday).toBe("2000-01-03");
  });
});