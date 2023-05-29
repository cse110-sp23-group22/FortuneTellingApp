const simpleReturn = require('./simpleTest');
test('return the input', () => {
   expect(simpleReturn(5)).toBe(5);
});

const horoscopeTest = require('./source/HoroscopeDisplay/horoscope');
test('return exit code 1 if success', () => {
    expect(horoscopeTest(1)).toBe(1);
});

/*
//this is the syntax for exporting more than one function from the same file
module.exports = {};
module.exports.sum = function sum(a, b) {
  return a + b;
}
module.exports.multiply = function multiply(a, b) {
  return a * b;
}
module.exports.subtract = function subtract(a, b) {
  return a - b;
}

or like this if u already declared the function.

module.exports.sum = sum
module.exports.multiply = multiply

this is how you import them to the jest file:

var MyMathModule = require('./my_math_module');
MyMathModule.sum(a, b);
MyMathModule.multiply(a, b);
MyMathModule.subtract(a, b);
*/