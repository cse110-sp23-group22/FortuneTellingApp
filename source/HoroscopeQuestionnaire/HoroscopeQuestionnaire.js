/**
 * @description This file contains the functions for the Horoscope Questionnaire
 * @module Horoscope/Questionnaire
 * @name module:Horoscope/Questionnaire
 * @tutorial Questionaire
 * @author Eric Chen, Jessica He, Chris Kim
 * @since 06/11/2023
 */

let userName = "";
let birthday = "";
let templateNum = 0;
let currentQuestion;
let totalNumQuestions = 1; //Counting starting from 0

window.addEventListener("load", init);

let homeButton;

/**
 * @function init
 * @description An init function that starts up templates
 */
export function init() {
  showContent(templateNum);
  homeButton = document.getElementById("homeButton");
  if (homeButton === null) {
    return;
  }
  homeButton.addEventListener("click", goHome);
}

/**
 * @function
 * @description Exits back to main
 * @author Chris
 */
function goHome() {
  window.location.href = "../../index.html";
}

/**
 * @function parseNumbers
 * @description A function that parses the input of all numbers
 * @param {string} string - string to be parsed (user's name)
 * @returns string with only valid letters
 */
export function parseNumbers(string) {
  return string.replace(/\d/g, "");
}

/**
 * @function showContent
 * @description Goes through all the questions in the questionnaire, displaying the questions one after another
 *              based on when the user clicks the continue button.
 * @param templateNum - question set number
 */
export function showContent(templateNum) {
  // Set content
  let temp = document.getElementsByTagName("template")[templateNum];
  currentQuestion = temp.content.cloneNode(true);
  document.getElementById("questionnaire").appendChild(currentQuestion);
  // Add event listeners based on templateNum
  // Made a switch statement in case we actually wanna make content
  switch (templateNum) {
    case 0:
      initNameBirth();
      break;
    default:
    // By Default none of the other options mean anything
  }
}

/**
 * @function initNameBirth
 * @description Initalizes the name and birthday Question
 */
export function initNameBirth() {
  const nameInput = document.getElementById("fname");
  const birthdayInput = document.getElementById("birthday");
  /**
   * The following event listeners looks for change within the input to
   * then store the information to the userAnswer
   */
  nameInput.addEventListener("input", (event) => {
    let name = parseNumbers(event.target.value);
    //Feature: Reject input not replace?
    nameInput.value = name;
    userName = name;
  });

  //Sets birthday value based on input
  birthdayInput.addEventListener("change", (event) => {
    birthday = event.target.value;
  });
}
/**
 * @description This Exit button. This function checks:
 * - If the user has inputted all required information
 * - Creates UI to prompt the user to confirm their selection
 * - Moves to the next page after all checks
 * @event clickHoroscopeQ
 */
window.addEventListener("DOMContentLoaded", () => {
  const exitButton = document.getElementById("exitButton");
  if (exitButton) {
    exitButton.addEventListener("click", () => {
      // Check user has inputted all required information
      if (userName == "" || birthday == "") {
        // Alert pops up asking them to fill everything out
        alert("Please fill out required fields!");
        return;
      } else {
        //? Clear Local storage???
        localStorage.clear();
        //Store data into local storage
        localStorage.setItem("UserName", userName);
        localStorage.setItem("Birthday", birthday);
      }
      // Checks templateNum to see how far the user is to the end
      if (templateNum < totalNumQuestions) {
        let book = document.getElementById("book");
        book.classList.toggle("shakeElement");
        let overlay = document.getElementsByClassName("overlay")[0];
        overlay.style.transition = "opacity 0.1s";
        overlay.classList.toggle("shown");
        setTimeout(() => {
          overlay.style.transition = "opacity 1s";
          overlay.classList.toggle("shown");
          book.classList.toggle("shakeElement");
          templateNum++;
          document.getElementById("question").remove();
          showContent(templateNum);
        }, 1000);
      } else {
        // Moves to next page
        window.location.href = "../HoroscopeDisplay/Horoscope.html";
        console.log("Exiting page");
      }
    });
  } else {
    //The DOM hasn't loaded correctly
    console.log("exitButton is not found in the DOM");
  }
});
