let userName = "";
let creepyQuestion1 = "";
let creepyQuestion2 = "";
let readingType = "";

window.addEventListener("DOMContentLoaded", init);

function init() {
  initQuesetions();
}
//Parses input of all numbers
function parseNumbers(string) {
  return string.replace(/\d/g, "");
}

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
 * @class Tarot Card Questionnaire
 * @author Arjun Kumar, Ryan Lee, Byte Brokers
 */
document
  .getElementById("exitButton")
  .addEventListener("click", function (event) {
    event.preventDefault();
    let name = document.getElementById("form1").elements[0].value;
    let readingTypes = document.getElementsByName("TarotCatagory");
    for (i = 0; i < readingTypes.length; i++) {
      if (readingTypes[i].checked) {
        readingType = readingTypes[i].value;
      }
    }

    if (readingTypes == "" || userName == "" || creepyQuestion1 == "") {
      alert("Please fill out all fields!");
      return;
    }

    window.location.href = "../../index.html";
    //alert("Form 1 submitted!\nName: " + name);
  });

window.onbeforeunload = function () {
  localStorage.clear();

  localStorage.setItem("userName", userName);
  localStorage.setItem("readingType", readingType);
};
