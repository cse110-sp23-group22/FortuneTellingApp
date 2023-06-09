/**
 * @jest-environment jsdom
 */
const functions = require("../source/HoroscopeDisplay/horoscope.js");
const adjustIndexForHorroscopeJSON = [
  {
    month: "January",
    sign: "Capricorn",
    startDate: "1",
    endDate: "19",
    horoscope:
      "It's a new year and you're feeling ambitious! You're ready to take on new challenges and reach your goals. This is a time to focus on your career and make strides towards success. However, don't forget to take time for yourself and nurture your personal life.",
  },
  {
    month: "February",
    sign: "Aquarius",
    startDate: "1",
    endDate: "18",
    horoscope:
      "You're feeling a sense of independence and individuality this month. You may feel inspired to express yourself creatively or connect with like-minded individuals. This is a good time to pursue your passions and let your unique personality shine.",
  },
];

//checks bottom of the if statement
test("tests the Index adjuster for the horoscope hardcoded values: tests value of Jan 1", () => {
  functions.init();
  expect(
    functions.adjustIndexForHorroscope(1, 0, adjustIndexForHorroscopeJSON)
  ).toBe(0);
});

//checks the last case when the dates loop back to jan
test("tests the Index adjuster for the horoscope hardcoded values: tests first edge case of the first day after sign change", () => {
  functions.init();
  expect(
    functions.adjustIndexForHorroscope(19, 0, adjustIndexForHorroscopeJSON)
  ).toBe(0);
});

//checks top of the if statement
test("tests the Index adjuster for the horoscope hardcoded values: tests second edge case of day being on the end date", () => {
  functions.init();
  expect(
    functions.adjustIndexForHorroscope(18, 1, adjustIndexForHorroscopeJSON)
  ).toBe(1);
});
