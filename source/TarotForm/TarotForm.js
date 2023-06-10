/**
 * @module TarotCardForm
 * @author Arjun Kumar, Ryan Lee, Byte Brokers
 */

let userName = "";
let creepyQuestion1 = "";
let creepyQuestion2 = "";
let readingType = "";
let numQuestionsAnswered = 0;

window.addEventListener("DOMContentLoaded", init);
// document.getElementById("myInput").addEventListener("keydown", function() {
//     typingAudio.pause();
//     typingAudio.currentTime = 0;
//     typingAudio.play();
// });

function init() {
  initQuesetions();
}
/**
 * @description Parses our numbers from name input
 */
function parseNumbers(string) {
  return string.replace(/\d/g, "");
}

/**
 * @description This function initializes the variables used to store the user
 * answers to the name and reading category questions in the Tarot form page
 */
function initQuesetions() {
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
 * @author Arjun Kumar, Ryan Lee, Byte Brokers
 */
document
  .getElementById("exitButton")
  .addEventListener("click", function (event) {
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

      window.location.href = "../TarotCardDisplay/TarotDisplay.html";
      //alert("Form 1 submitted!\nName: " + name);
    }
  });

window.onbeforeunload = function () {
  localStorage.clear();

  localStorage.setItem("userName", userName);
  localStorage.setItem("readingType", readingType);
};
