/**
 * @jest-environment jsdom
 */
const { TextEncoder, TextDecoder } = require('text-encoding');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

var util = require('util');
var encoder = new util.TextEncoder('utf-8');
//import { JSDOM } from 'jsdom';
const { JSDOM } = require('jsdom');
// A simple setup for JSDOM

//const { window } = new JSDOM('<!doctype html><html><body><div id="exitButton"></div><template></template><div id="questionnaire"></div></body></html>');
const { window } = new JSDOM('<!doctype html><html><body><div id="exitButton"></div><template></template><div id="questionnaire"></div></body></html>', { url: "http://localhost/" });

global.jsdomWindow = window;
global.jsdomDocument = window.document;
global.jsdomLocalStorage = window.localStorage;

// Then import your js file, assuming it's named myModule.js
import * as questionnaire from './Questionnaire.js';

describe('questionnaire', () => {
    beforeEach(() => {
        // Reset the DOM and localStorage before each test
        while (document.body.firstChild) {
            document.body.firstChild.remove();
        }
        localStorage.clear();

        // Append necessary elements
        document.body.innerHTML = '<div id="exitButton"></div><template></template><div id="questionnaire"></div>';
    });

    test('parseNumbers function', () => {
        expect(questionnaire.parseNumbers("John123")).toBe("John");
    });

    test('initNameBirth function', () => {
        const template = document.createElement('template');
        template.innerHTML = `
      <input id="fname" type="text" value="John" />
      <input id="birthday" type="date" value="2000-01-01" />
    `;
        document.body.appendChild(template.content.cloneNode(true));

        // Call the init function which indirectly calls initNameBirth
        questionnaire.init();

        const nameInput = document.getElementById('fname');
        const birthdayInput = document.getElementById('birthday');

        // Check that non-numeric characters were removed from name input
        expect(nameInput.value).toBe('John');

        // Check that birthday value was set
        expect(birthdayInput.value).toBe('2000-01-01');
    });

});