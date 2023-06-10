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

// Import the necessary functions to test
import { initQuestions } from '../source/TarotForm/TarotForm.js';

// Mock the necessary DOM elements
document.body.innerHTML = `
  <input id="fname" type="text">
  <input id="creepyQuestion1" type="text">
  <input id="creepyQuestion2" type="text">
`;

describe('initQuestions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should update userName when nameInput value changes', () => {
    // Arrange
    const nameInput = document.getElementById('fname');
    const mockEvent = { target: { value: 'John123' } };

    // Act
    initQuestions();
    nameInput.dispatchEvent(new Event('change', mockEvent));

    // Assert
    expect(nameInput.value).toBe('John');
    expect(userName).toBe('John');
  });

  test('should update creepyQuestion1 when questionLeft value changes', () => {
    // Arrange
    const questionLeft = document.getElementById('creepyQuestion1');
    const mockEvent = { target: { value: 'Question1' } };

    // Act
    initQuestions();
    questionLeft.dispatchEvent(new Event('change', mockEvent));

    // Assert
    expect(creepyQuestion1).toBe('Question1');
  });

  test('should update creepyQuestion2 when questionRight value changes', () => {
    // Arrange
    const questionRight = document.getElementById('creepyQuestion2');
    const mockEvent = { target: { value: 'Question2' } };

    // Act
    initQuestions();
    questionRight.dispatchEvent(new Event('change', mockEvent));

    // Assert
    expect(creepyQuestion2).toBe('Question2');
  });
});
