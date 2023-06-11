/**
 * This file contains the functions for the Horoscope Questionnaire
 * @module Questionnaire
 */

let userName = "";
let birthday = "";
let templateNum = 0;
let currentQuestion;
let questionFile;

window.addEventListener("DOMContentLoaded", init);

/**
 * @function init
 * @description An init function that starts up templates
 * @author Eric Chen, Jessica He, Chris Kim
 */
export async function init() {
  //Transition in
  let walkingSound = new Audio("../Assets/wood-creak-single-v3-14657.mp3");
  walkingSound.play();
  let overlay = document.getElementsByClassName("overlay")[0];
  let gradient = document.getElementById("gradient");
  gradient.style.opacity = 0;
  overlay.style.transition = "opacity 0.1s";
  overlay.classList.toggle("shown");
  await new Promise((resolve) => {
    setTimeout(resolve, 900);
  });
  let lighterSound = new Audio("../Assets/match.mp3");
  lighterSound.play();
  await new Promise((resolve) => {
    setTimeout(resolve, 100);
  });
  gradient.style.opacity = 0.8;
  overlay.style.transition = "opacity 1s";
  overlay.classList.toggle("shown");

  //Content Loading
  showContent(templateNum);
  questionFile = await fetch("./HoroscopeQuestions.JSON");
  questionFile = await questionFile.json();
}

/**
 * @function parseNumbers
 * @description A function that parses the input of all numbers
 * @param {string} string - The string of numbers to be parsed
 * @returns string with only valid letters
 * @author Eric Chen, Jessica He, Chris Kim
 */
export function parseNumbers(string) {
  return string.replace(/\d/g, "");
}

/**
 * @function showContent
 * @description Goes through all the questions in the questionnaire, displaying the questions one after another
 *                  based on when the user clicks the continue button.
 * @param templateNum - question set number
 * @author Eric Chen, Jessica He, Chris Kim
 */
export function showContent(templateNum) {
  // Animation that plays on showing the content (Probably moving text and lights blowing out to new text)
  // Set content
  if (templateNum <= 1) {
    let temp = document.getElementsByTagName("template")[templateNum];
    currentQuestion = temp.content.cloneNode(true);
    document.getElementById("questionnaire").appendChild(currentQuestion);
  }
  // Add event listeners based on templateNum
  // Made a switch statement in case we actually wanna make content
  if (templateNum == 0) {
    initNameBirth();
  }
  // } else {
  //   //Set HTML Element Data
  //   let labelOne = document.getElementById("question");
  //   labelOne.innerText = questionFile[templateNum - 1]["question"];
  // }
  // switch (templateNum) {
  //   case 0:
  //     initNameBirth();
  //     break;
  //   default:
  //     //Changing questions to match
  //     let labelOne = document.getElementById("question");
  //     break;
  // }
}

/**
 * @function initNameBirth
 * @description Initalizes the name and birthday Question
 * @author Eric Chen, Jessica He, Chris Kim
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
 * @function
 */
window.addEventListener("load", () => {
  const exitButton = document.getElementById("exitButton");
  let questionnaire;
  let questionnaireFinished = false;

  if (!exitButton) {
    console.log("exitButton is not found in the DOM");
  }

  exitButton.addEventListener("click", async () => {
    // Check user has inputted all required information
    if (userName == "" || birthday == "") {
      // Theorectically we have custom dialogs or something else that pops up to show that user hasn't inputted
      alert("Please fill out required fields!");
      // Idk play some spooky sound
      return;
    } else {
      //? Clear Local storage???
      localStorage.clear();
      //Store data into local storage
      localStorage.setItem("UserName", userName);
      localStorage.setItem("Birthday", birthday);
    }
    // Checks templateNum to see how far the user is to the end
    if (templateNum == 0) {
      pageTransition();
      templateNum++;
      document.getElementById("question").remove();
      showContent(templateNum);
      questionnaire = document.getElementById("questionnaire-interface");
    } else {
      // we are now on part operated by QuestionnaireInterface.
      pageTransition();
      await new Promise((resolve) => {
        setTimeout(resolve, 1000);
        questionnaire.updateScores();
        questionnaireFinished = !questionnaire.nextQuestion();
      });
      if (questionnaireFinished) {
        // Moves to next page (Currently submit is used to call window.onbeforeunload)
        questionnaire.loadScoresToLS();
        window.location.href = "../HoroscopeDisplay/Horoscope.html";
        console.log("Exiting page");
      }
      // templateNum++;
      // showContent(templateNum);
    }
  });
});

async function pageTransition() {
  let pageSound = new Audio("../Assets/page-turn.mp3");
  let lighterSound = new Audio("../Assets/match.mp3");
  let gradient = document.getElementById("gradient");
  gradient.style.opacity = 0;
  let overlay = document.getElementsByClassName("overlay")[0];
  overlay.style.transition = "opacity 0.1s";
  overlay.classList.toggle("shown");
  pageSound.play();
  await new Promise((resolve) => {
    setTimeout(resolve, 900);
  });
  lighterSound.play();
  await new Promise((resolve) => {
    setTimeout(resolve, 100);
  });
  overlay.style.transition = "opacity 1s";
  gradient.style.opacity = 0.8;
  overlay.classList.toggle("shown");
}
