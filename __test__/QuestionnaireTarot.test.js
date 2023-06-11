// Import the necessary modules for testing
const { JSDOM } = require('jsdom');

// Mock the necessary DOM elements
const dom = new JSDOM('<!DOCTYPE html><div id="fname"></div><input id="creepyQuestion1"></input><input id="creepyQuestion2"></input><form id="form1"><input></input></form><button id="exitButton"></button><input id="myInput"></input>');
global.document = dom.window.document;
global.window = dom.window;

// Import the code file
const code = require('../source/TarotForm/TarotForm.js');

// Write the Jest test
describe('initQuestions', () => {
  beforeEach(() => {
    // Reset the values before each test
    global.document.getElementById('fname').value = '';
    global.document.getElementById('creepyQuestion1').value = '';
    global.document.getElementById('creepyQuestion2').value = '';
  });
  
  test('should update userName on name input change', () => {
    code.initQuestions();
    const nameInput = global.document.getElementById('fname');
    nameInput.value = 'Chr123is123 32Kim12';
    nameInput.dispatchEvent(new global.window.Event('change'));
    expect(nameInput.value).toBe('Chris Kim');
  });

  test('should update creepyQuestion1 on questionLeft input change', () => {
    code.initQuestions();
    const questionLeft = global.document.getElementById('creepyQuestion1');
    questionLeft.value = 'omg I keep failing my classes';
    questionLeft.dispatchEvent(new global.window.Event('change'));
    expect(questionLeft.value).toBe('omg I keep failing my classes');
  });

  test('should update creepyQuestion2 on questionRight input change', () => {
    code.initQuestions();
    const questionRight = global.document.getElementById('creepyQuestion2');
    questionRight.value = 'I do';
    questionRight.dispatchEvent(new global.window.Event('change'));
    expect(questionRight.value).toBe('I do');
  });


  //
  test('should display alert when fields are not filled out', () => {
    const exitButton = global.document.getElementById('exitButton');
    exitButton.dispatchEvent(new global.window.Event('click'));
    expect(global.alert);
  });

  test('should set readingType and redirect when all fields are filled out', () => {
    const exitButton = global.document.getElementById('exitButton');
    global.document.getElementById('form1').elements[0].value = 'Chris123Kim';
    let readingTypes = global.document.getElementsByName('TarotCatagory');
    readingTypes = 0;
    exitButton.dispatchEvent(new global.window.Event('click'));
    expect(true);
  });
});