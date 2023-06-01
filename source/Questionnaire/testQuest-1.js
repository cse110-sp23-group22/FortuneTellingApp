import { JSDOM } from 'jsdom';

//setup for JSDOM
const { window } = new JSDOM('<!doctype html><html><body><div id="exitButton"></div><template></template><div id="questionnaire"></div></body></html>');
global.window = window;
global.document = window.document;
global.localStorage = window.localStorage;

import * as myModule from './myModule.js';

describe('myModule', () => {
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
        expect(myModule.parseNumbers("John123")).toBe("John");
    });

    test('initNameBirth function', () => {
        const template = document.createElement('template');
        template.innerHTML = `
      <input id="fname" type="text" value="John123" />
      <input id="birthday" type="date" value="2000-01-01" />
    `;
        document.body.appendChild(template.content.cloneNode(true));

        // Call the init function which indirectly calls initNameBirth
        myModule.init();

        const nameInput = document.getElementById('fname');
        const birthdayInput = document.getElementById('birthday');

        // Check that non-numeric characters were removed from name input
        expect(nameInput.value).toBe('John');

        // Check that birthday value was set
        expect(birthdayInput.value).toBe('2000-01-01');
    });

    test('showContent function', () => {
        // Create a template in the DOM
        const template = document.createElement('template');
        template.innerHTML = '<div>Test Template</div>';
        document.body.appendChild(template);

        // Call showContent
        myModule.showContent(0);

        // Expect the template's content to have been cloned into the questionnaire div
        expect(document.getElementById('questionnaire').innerHTML).toContain('Test Template');
    });

    test('window.onbeforeunload function', () => {
        // Assuming that you export the userName and birthday variables from myModule
        myModule.userName = 'John';
        myModule.birthday = '2000-01-01';

        window.onbeforeunload();

        // Test that the values were stored in localStorage
        expect(localStorage.getItem('UserName')).toBe('John');
        expect(localStorage.getItem('Birthday')).toBe('2000-01-01');
    });
});