/**
 * @description Retreives input from TarotCard/Questioinaire receives user input to be used by tarot card readings.
 * @module TarotCard/Questioinaire
 * @name module:TarotCard/Questioinaire
 * @tutorial Questionaire
 * @author Arjun Kumar, Ryan Lee, Byte Brokers
 * @since 06/11/2023
 */

let userName = "";
let creepyQuestion1 = "";
let creepyQuestion2 = "";
let readingType = "";
let numQuestionsAnswered = 0;

window.addEventListener("DOMContentLoaded", init);

let homeButton;
/**
 * @function
 * @description Exits back to main
 */
function goHome() {
  window.location.href = "../../index.html";
}
/**
 * @function
 * @description Initializes the questions for the Tarot Form
 * and checks that the homeButton is loaded properly
 */
function init() {
  initQuestions();
  homeButton = document.getElementById("homeButton");
  if (homeButton === null) {
    return;
  }
  homeButton.addEventListener("click", goHome);
}
/**
 * @function
 * @description Parses out numbers from name input
 */
function parseNumbers(string) {
  return string.replace(/\d/g, "");
}

/**
 * @function
 * @description Parses the name and questions in two separate text boxes from
 * creepyQuestion elements and stores in creepyQuestion1 and 2
 * Digits in name inputs are replaced.
 * @author Arjun Kumar, Ryan Lee
 */
function initQuestions() {
  const nameInput = document.getElementById("fname");
  const questionLeft = document.getElementById("creepyQuestion1");
  const questionRight = document.getElementById("creepyQuestion2");

  nameInput.addEventListener("change", (event) => {
    let name = parseNumbers(event.target.value);
    //Feature: Reject input not replace?
    nameInput.value = name;
    userName = nameInput.value;
    console.log("hello");
  });

  questionLeft.addEventListener("change", () => {
    creepyQuestion1 = questionLeft.value;
  });

  questionRight.addEventListener("change", () => {
    creepyQuestion2 = questionRight.value;
  });
}

/**
 * @description First check if all fields have been filled out, then save info
 * to local storage when continue button for Tarot Card Info Page is clicked
 * First checks that the questions on the left page are filled out prior to
 * letting the user continue to the left page. Alerts if questions aren't filled
 * out. Saves name and reading category answers prior to exiting the page.
 * @author Arjun Kumar, Ryan Lee
 * @event click
 */
let button = document.getElementById("exitButton");
button.addEventListener("click", function (event) {
  event.preventDefault();
  numQuestionsAnswered++;
  if (numQuestionsAnswered < 2) {
    if (userName == "" || creepyQuestion1 == "") {
      numQuestionsAnswered = 0;
      alert("Please fill out all fields!");
      return;
    }
    document.getElementById("form2Fieldset").hidden = false;
    document.getElementById("form1Fieldset").hidden = true;
  } else {
    let readingTypes = document.getElementsByName("TarotCatagory");
    for (let i = 0; i < readingTypes.length; i++) {
      if (readingTypes[i].checked) {
        readingType = readingTypes[i].value;
      }
    }
    if (readingTypes == "" || creepyQuestion2 == "") {
      numQuestionsAnswered = 1;
      alert("Please fill out all fields!");
      return;
    }
    localStorage.clear();

    localStorage.setItem("userName", userName);
    localStorage.setItem("readingType", readingType);
    window.location.href = "../TarotCardDisplay/TarotDisplay.html";
  }
});

module.exports = {
  initQuestions,
};
