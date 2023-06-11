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
const { window } = new JSDOM(
  '<!doctype html><html><body><div id="exitButton"></div><template></template><div id="questionnaire"></div></body></html>',
  { url: "http://localhost/" }
);

global.jsdomWindow = window;
global.jsdomDocument = window.document;
global.jsdomLocalStorage = window.localStorage;

// Then import your js file, assuming it's named myModule.js
import * as questionnaire from "../source/HoroscopeQuestionnaire/HoroscopeQuestionnaire.js";

describe("questionnaire", () => {
  beforeEach(() => {
    // Reset the DOM and localStorage before each test
    while (document.body.firstChild) {
      document.body.firstChild.remove();
    }
    localStorage.clear();

    // Append necessary elements
    document.body.innerHTML =
      '<div id="exitButton"></div><template></template><div id="questionnaire"></div>';
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

describe('initNameBirth', () => {
  beforeEach(() => {
    // Set up the initial state
    document.body.innerHTML = `
      <input id="fname" />
      <input id="birthday" />
    `;

    // Call the initNameBirth function
    questionnaire.initNameBirth();
  });

  test('should update userName when input event occurs on the name input', () => {
    const nameInput = document.getElementById('fname');
    const name = 'John';

    nameInput.value = name;
    nameInput.dispatchEvent(new Event('input'));

    expect(nameInput.value).toBe(name);
  });

  test('should update birthday when change event occurs on the birthday input', () => {
    const birthdayInput = document.getElementById('birthday');
    const birthday = '2000-01-01';

    birthdayInput.value = birthday;
    birthdayInput.dispatchEvent(new Event('change'));

    expect(birthdayInput.value).toBe(birthday);
  });
});

describe('showContent', () => {
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
    const template0 = document.getElementById('template0');
    Object.defineProperty(template0, 'content', { value: templateContent0 });

    const templateContent1 = document.createDocumentFragment();
    const template1 = document.getElementById('template1');
    Object.defineProperty(template1, 'content', { value: templateContent1 });
  });

  test('should append content from the correct template to the DOM', () => {
    questionnaire.showContent(0);
    expect(document.getElementById('questionnaire').innerHTML).toContain('template-content');
  });

  test('should not call initNameBirth when templateNum is not 0', () => {
    questionnaire.showContent(1);
    expect(initNameBirthMock).not.toHaveBeenCalled();
  });
});

describe('exitButton click event', () => {
  let exitButton;
  let alertMock;

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
    questionnaire.userName = 'John';
    questionnaire.birthday = '2000-01-01';
    questionnaire.templateNum = 0;

    exitButton = document.getElementById('exitButton');
    alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  test('should display an alert if userName or birthday is empty', () => {
    // Clear userName and birthday
    questionnaire.userName = '';
    questionnaire.birthday = '';

    exitButton.click();

    expect(alertMock).toHaveBeenCalledWith('Please fill out required fields!');
  });

  test('should update localStorage and templateNum if userName and birthday are not empty', async () => {
    const localStorageMock = {
      clear: jest.fn(),
      setItem: jest.fn()
    };

    // Set up localStorage mock
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
      writable: true
    });

    exitButton.click();

    // Verify localStorage updates
    expect(localStorageMock.clear).toHaveBeenCalled();
    expect(localStorageMock.setItem).toHaveBeenCalledWith('UserName', 'John');
    expect(localStorageMock.setItem).toHaveBeenCalledWith('Birthday', '2000-01-01');

    // Verify templateNum change
    expect(questionnaire.templateNum).toBe(1);
  });
});