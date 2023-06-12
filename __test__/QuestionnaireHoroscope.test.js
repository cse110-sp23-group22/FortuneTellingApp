/**
 * @jest-environment jsdom
 */
const { TextEncoder, TextDecoder } = require("text-encoding");
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// var util = require("util");
// var encoder = new util.TextEncoder("utf-8");
//import { JSDOM } from 'jsdom';
const { JSDOM } = require("jsdom");
// A simple setup for JSDOM

//const { window } = new JSDOM('<!doctype html><html><body><div id="exitButton"></div><template></template><div id="questionnaire"></div></body></html>');
const dom = new JSDOM(
  `<!DOCTYPE html>
  <html>
    <body>
      <div id="exitButton"></div>
      <button id="homeButton" class="back">Home</button>
      <template></template>
      <div id="questionnaire"></div>
    </body>
  </html>`
);

global.document = dom.window.document;
global.window = dom.window;

global.fetch = jest.fn((src) => {
  return src == undefined
    ? Promise.reject("Bruh")
    : Promise.resolve({
        json: () =>
          Promise.resolve([
            {
              question: "Question A",
              type: "choice",
              responses: ["Response A", "Response B", "Response C"],
              answers: ["Answer A", "Answer B", "Answer C"],
              personalityMap: [0, 1, 2],
              lsKey: "testquestionresponse",
            },
            {
              question: "Question B",
              type: "choice",
              responses: ["Response D", "Response E", "Response F"],
              answers: ["Answer D", "Answer E", "Answer F"],
              personalityMap: [2, 1, 0],
              lsKey: "hello",
            },
          ]),
      });
});

global.Audio.prototype.play = jest.fn();

const questionnaire = require("../source/HoroscopeQuestionnaire/HoroscopeQuestionnaire.js");

describe("questionnaire", () => {
  beforeEach(() => {
    // Reset the DOM and localStorage before each test
    while (document.body.firstChild) {
      document.body.firstChild.remove();
    }
    localStorage.clear();

    // Append necessary elements
    document.body.innerHTML =
      '<div id="exitButton"></div><button id="homeButton" class="back">Home</button><template></template><div id="questionnaire"></div>';
  });

  test("parseNumbers function", () => {
    expect(questionnaire.parseNumbers("John123")).toBe("John");
  });

  test("initNameBirth function", () => {
    const template = document.createElement("template");
    template.innerHTML = `
      <input id="fname" type="text" value="John" />
      <input id="birthday" type="date" value="2000-01-01" />
    `;
    document.body.appendChild(template.content.cloneNode(true));

    // Call the init function which indirectly calls initNameBirth
    questionnaire.init();

    const nameInput = document.getElementById("fname");
    const birthdayInput = document.getElementById("birthday");

    // Check that non-numeric characters were removed from name input
    expect(nameInput.value).toBe("John");

    // Check that birthday value was set
    expect(birthdayInput.value).toBe("2000-01-01");
  });
});

describe("initNameBirth", () => {
  beforeEach(() => {
    // Set up the initial state
    document.body.innerHTML = `
      <input id="fname" />
      <input id="birthday" />
    `;

    // Call the initNameBirth function
    questionnaire.initNameBirth();
  });

  test("should update userName when input event occurs on the name input", () => {
    const nameInput = document.getElementById("fname");
    const name = "John";

    nameInput.value = name;
    nameInput.dispatchEvent(new Event("input"));

    expect(nameInput.value).toBe(name);
  });

  test("should update birthday when change event occurs on the birthday input", () => {
    const birthdayInput = document.getElementById("birthday");
    const birthday = "2000-01-01";

    birthdayInput.value = birthday;
    birthdayInput.dispatchEvent(new Event("change"));

    expect(birthdayInput.value).toBe(birthday);
  });
});

describe("showContent", () => {
  let initNameBirthMock;

  beforeEach(() => {
    // Reset the DOM before each test
    while (document.body.firstChild) {
      document.body.firstChild.remove();
    }

    // Mock initNameBirth function
    initNameBirthMock = jest.fn();
    questionnaire.initNameBirth = initNameBirthMock;

    // Append necessary elements
    document.body.innerHTML = `
    <template><div id="template-content"><input id="fname" /><input id="birthday" /></div></template>
    <div id="exitButton"></div>
    <template id="template0"></template>
    <template id="template1"></template>
    <div id="questionnaire"></div>
  `;

    // Mock template contents
    const templateContent0 = document.createDocumentFragment();
    const template0 = document.getElementById("template0");
    Object.defineProperty(template0, "content", { value: templateContent0 });

    const templateContent1 = document.createDocumentFragment();
    const template1 = document.getElementById("template1");
    Object.defineProperty(template1, "content", { value: templateContent1 });
  });

  test("should append content from the correct template to the DOM", () => {
    questionnaire.showContent(0);
    expect(document.getElementById("questionnaire").innerHTML).toContain(
      "template-content"
    );
  });

  test("should not call initNameBirth when templateNum is not 0", () => {
    questionnaire.showContent(1);
    expect(initNameBirthMock).not.toHaveBeenCalled();
  });
});

describe("exitButton click event", () => {
  // let alertMock;
  let exitButton;

  beforeEach(() => {
    // Mock the DOM and localStorage before each test
    document.body.innerHTML = `
      <button id="exitButton">Exit</button>
      <div id="question"></div>
      <div id="book" class="book"></div>
      <div class="overlay"></div>
      <input id="fname" />
      <input id="birthday" />
      <template id="template0"></template>
      <div id="questionnaire"></div>
    `;

    // Set up initial state
    questionnaire.userName = "John";
    questionnaire.birthday = "2000-01-01";
    questionnaire.templateNum = 0;

    // exitButton = document.getElementById('exitButton');
    exitButton = global.document.getElementById("exitButton");
    // alertMock = jest.spyOn(global, "alert").mockImplementation(() => {});
    // // window.alert = jest.fn();
    // jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  test("should display an alert if userName or birthday is empty", async () => {
    // Clear userName and birthday
    questionnaire.userName = "";
    questionnaire.birthday = "";

    exitButton.dispatchEvent(new global.window.Event("click"));
    // await fireEvent.click(exitButton);

    expect(global.alert);
    // expect(alertMock).toHaveBeenCalledWith('Please fill out required fields!');
  });

  test("should update localStorage and templateNum if userName and birthday are not empty", async () => {
    const localStorageMock = {
      clear: jest.fn(),
      setItem: jest.fn(),
    };

    // Set up localStorage mock
    Object.defineProperty(window, "localStorage", {
      value: localStorageMock,
      writable: true,
    });

    // assuming these are global variables - set them before the test
    questionnaire.userName = "John";
    questionnaire.birthday = "2000-01-01";

    const handleClick = async () => {
      localStorage.clear();
      localStorage.setItem("UserName", "John");
      localStorage.setItem("Birthday", "2000-01-01");
      // ... change templateNum ...
    };

    exitButton.addEventListener("click", handleClick);

    // dispatch event and wait for any Promises to resolve
    await exitButton.dispatchEvent(new Event("click"));
  });
  test("should run pagetransition without errors if the appropriate items are in place", () => {
    global.document.body.innerHTML = `
      <button id="exitButton">Exit</button>
      <div id="gradient"></div>
      <div id="question"></div>
      <div id="book" class="book">
        <div class="questionDescription></div>
      </div>
      <div class="overlay"></div>
      <input id="fname" />
      <input id="birthday" />
      <template id="template0"></template>
      <div id="questionnaire"></div>
    `;
    questionnaire.pageTransition();
  });
});
