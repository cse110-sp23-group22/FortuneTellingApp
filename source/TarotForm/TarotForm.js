/**
 * @module TarotCardForm
 * @author Arjun Kumar, Ryan Lee, Byte Brokers
 * @tutorial Tarot
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

let homeButton;
/**
 * @function
 * @description Exits back to main
 * @author Chris
 */
function goHome() {
  window.location.href = "../../index.html";
}

function init() {
  initQuestions();
  homeButton = document.getElementById("homeButton");
  if (homeButton === null) {
    return;
  }
  homeButton.addEventListener("click", goHome);
}
/**
 * @description Parses our numbers from name input
 */
function parseNumbers(string) {
  return string.replace(/\d/g, "");
}

/**
 * @function
 * @description Receives name, and concern in two separate text boxes from
 * creepyQuestion elements and stores in questionLeft/QuestionRight
 * Digits in name inputs are replaced.
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
 * @author Arjun Kumar, Ryan Lee, Byte Brokers
 */
let button = document.getElementById("exitButton");
button.addEventListener("click", function (event) {
  event.preventDefault();
  //let name = document.getElementById("form1").elements[0].value;
  let readingTypes = document.getElementsByName("TarotCatagory");
  for (let i = 0; i < readingTypes.length; i++) {
    if (readingTypes[i].checked) {
      readingType = readingTypes[i].value;
    }
  }
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

    if (readingTypes == "" || userName == "" || creepyQuestion1 == "") {
      alert("Please fill out all fields!");
      return;
    }
    if (readingTypes == "" || creepyQuestion2 == "") {
      numQuestionsAnswered = 1;
      alert("Please fill out all fields!");
      return;
    }

    window.location.href = "../TarotCardDisplay/TarotDisplay.html";
  }
});

window.onbeforeunload = function () {
  localStorage.clear();

  localStorage.setItem("userName", userName);
  localStorage.setItem("readingType", readingType);
};

module.exports = {
  initQuestions,
};
