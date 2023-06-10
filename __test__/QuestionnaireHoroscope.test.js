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

  test('parseNumbers function should return string without special characters', () => {
    const input = ',./abc';
    const output = questionnaire.parseNumbers(input);
    expect(output).toBe('abc');
  });

  test('parseNumbers function should return empty string when there is only space', () => {
    const input = '   ';
    const output = questionnaire.parseNumbers(input);
    expect(output).toBe('');
  });
  
  test('showContent should append content from the correct template to the DOM', () => {
    document.body.innerHTML = `<template><div id="template-content"></div></template><div id="questionnaire"></div>`;
    questionnaire.showContent(0);
    expect(document.getElementById('questionnaire').innerHTML).toContain('template-content');
  });

  test('initNameBirth should add an input event listener to nameInput', () => {
    document.body.innerHTML = `<input id="fname" /> <input id="birthday" />`;
    questionnaire.initNameBirth();
    const inputElement = document.getElementById('fname');
    const event = new Event('input');
    inputElement.dispatchEvent(event);
    expect(questionnaire.userName).toBe('');
  });
});

describe('LocalStorage Tests:', () => {
  // Create a mock localStorage
  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(),
        setItem: jest.fn(),
        clear: jest.fn()
      },
      writable: true
    });

    window.onbeforeunload = jest.fn().mockImplementation(() => {
      // Clear Local storage
      localStorage.clear();
      // Store data into local storage
      localStorage.setItem('UserName', questionnaire.userName);
      localStorage.setItem('Birthday', birthday);
    });
  });

  test('window.onbeforeunload function should store data to localStorage', () => {
    // Set the values of userName and birthday
    questionnaire.userName = 'John';
    birthday = '2000-01-01';
    // Trigger the unload event
    window.onbeforeunload();
    // Check if localStorage.setItem was called correctly
    expect(window.localStorage.setItem).toHaveBeenNthCalledWith(1, 'UserName', 'John');
    expect(window.localStorage.setItem).toHaveBeenNthCalledWith(2, 'Birthday', '2000-01-01');
  });
});