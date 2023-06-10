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
import * as questionnaire from "../source/TarotForm/TarotForm.js";

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
  
});
