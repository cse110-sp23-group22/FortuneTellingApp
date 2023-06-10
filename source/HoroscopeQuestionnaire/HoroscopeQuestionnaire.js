/**
 * This file contains the functions for the Horoscope Questionnaire
 * @module HoroscopeQuestionnaire
 */

let userName = ""; 
let birthday = "";
let templateNum = 0;
let currentQuestion;
let totalNumQuestions = 1; //Counting starting from 0

window.addEventListener("DOMContentLoaded", init);

/**
 * @memberOf HoroscopeQuestionnaire
 * @function init
 * @description An init function that starts up templates
 * @author Eric Chen, Jessica He, Chris Kim
 */
export function init() {
  showContent(templateNum);
}

/**
 * @memberOf HoroscopeQuestionnaire
 * @function parseNumbers
 * @description A function that parses the input of all numbers
 * @param {string} string - string to be parsed (user's name)
 * @returns string with only valid letters
 * @author Eric, Jessica, Chris
 */
export function parseNumbers(string) {
  return string.replace(/\d/g, "");
}

/**
 * @memberOf HoroscopeQuestionnaire
 * @function showContent
 * @description Goes through all the questions in the questionnaire, displaying the questions one after another
 *                  based on when the user clicks the continue button.
 * @param templateNum - question set number
 * @author Eric, Jessica, Chris
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
 * @memberOf HoroscopeQuestionnaire
 * @function initNameBirth
 * @description Initalizes the name and birthday Question
 * @author Eric, Jessica, Chris
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
 * Event listener for exit button. This function checks:
 * - If the user has inputted all required information
 * - Creates UI to prompt the user to confirm their selection
 * - Moves to the next page after all checks
 */
window.addEventListener("DOMContentLoaded", () => {
  const exitButton = document.getElementById("exitButton");
  if (exitButton) {
    exitButton.addEventListener("click", async () => {
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
        await new Promise((resolve) => {
          setTimeout(resolve, 1000);
        });
        overlay.style.transition = "opacity 1s";
        overlay.classList.toggle("shown");
        book.classList.toggle("shakeElement");
        templateNum++;
        document.getElementById("question").remove();
        showContent(templateNum);
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
