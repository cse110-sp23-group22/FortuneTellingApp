/**
 * @jest-environment jsdom
 */
const functions = require("../source/HoroscopeDisplay/horoscope.js");

//checks bottom of the if statement
test("tests the Index adjuster for the horoscope hardcoded values", () => {
  functions.init();
  expect(functions.adjustIndexForHorroscope(1, 0)).toBe(0);
});

//checks the last case when the dates loop back to jan
test("tests the Index adjuster for the horoscope hardcoded values", () => {
  functions.init();
  expect(functions.adjustIndexForHorroscope(31, 11)).toBe(0);
});

//checks top of the if statement
test("tests the Index adjuster for the horoscope hardcoded values", () => {
  functions.init();
  expect(functions.adjustIndexForHorroscope(18, 1)).toBe(1);
});
