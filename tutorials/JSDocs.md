**Authors:** Chris Kims
**Published:** 06/11/2023

## JS Docs Usage

JS Docs is a documentation tool for JavaScript code that allows you to write documentation comments in your code. These comments can be processed to generate API documentation. Here's a quick guide on how to use JS Docs:


### Writing Documentation Comments

In your JavaScript code, you can write documentation comments using a specific syntax that JS Docs recognizes. These comments provide information about your code, such as function descriptions, parameter types, return types, and examples.

Here's an example of a documentation comment for a function:

```javascript
/**
 * Calculates the sum of two numbers.
 * @param {number} num1 - The first number.
 * @param {number} num2 - The second number.
 * @returns {number} The sum of the two numbers.
 */
function calculateSum(num1, num2) {
  return num1 + num2;
}

Note that JSDocs generates html style documentation based on ***block comments*** (describing the function). In order for JSDocs to recognize the documentation, it must adhere to the following format.
* The @class, @module, @namespace tags will group the function descriptions to a single page. Otherwise, it defaults to the "Global" page.
* The @tutorials <filename> will add a link to the markdown/html file containing additional documentation (excluding the extension).