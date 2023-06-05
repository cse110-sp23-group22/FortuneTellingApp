const exitButton = document.getElementById("exitButton");
//Import DOMSanitize

let userName = "";
let birthday = "";
let templateNum = 0;
let currentQuestion;
let totalNumQuestions = 1; //Counting starting from 0

window.addEventListener("DOMContentLoaded", init);

/**
 * Init function. Currently only starts up templates
 * @class Questionaire
 * @author Eric Chen, Jessica He, Chris Kim, Byte Brokers
 */
export function init() {
  showContent(templateNum);
}

//Parses input of all numbers
export function parseNumbers(string) {
  return string.replace(/\d/g, "");
}

/**
 * @function
 * Goes through all the questions in the questionnaire, displaying the questions one after another
 * based on when the user clicks the continue button.
 */
export function showContent(templateNum) {
  //Animation that plays on showing the content (Probably moving text and lights blowing out to new text)
  //Set content
  let temp = document.getElementsByTagName("template")[templateNum];
  currentQuestion = temp.content.cloneNode(true);
  document.getElementById("questionnaire").appendChild(currentQuestion);
  //Add event listeners based on templateNum
  //Made a switch statement in case we actually wanna make content
  switch (templateNum) {
    case 0:
      initNameBirth();
      break;
    default:
    //By Default none of the other options mean anything rn
  }
}

/**
 * @function Initalize the name and birthday Question
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
 * @function
 * This Exit button. This function checks:
 * - If the user has inputted all required information
 * - Creates UI to prompt the user to confirm their selection
 * - Moves to the next page after all checks
 */
window.addEventListener("DOMContentLoaded", (event) => {
  const exitButton = document.getElementById("exitButton");
  if (exitButton) {
    exitButton.addEventListener("click", async () => {
      //Check user has inputted all required information
      if (userName == "" || birthday == "") {
        //Theorectically we have custom dialogs or something else that pops up to show that user hasn't inputted
        alert("Please fill out required fields!");
        //Idk play some spooky sound
        return;
      }
      //Checks templateNum to see how far the user is to the end
      if (templateNum < totalNumQuestions) {
        //TODO: Add cutscene
        //console.log(noise.perlin3(time*0.05,0,0));
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
        //? Currently not planning on users being able to go back.
        templateNum++;
        document.getElementById("question").remove();
        showContent(templateNum);
      } else {
        //Moves to next page (Currently submit is used to call window.onbeforeunload)
        window.location.href = "../HoroscopeDisplay/horoscope.html";
        console.log("Exiting page");
      }
    });
  } else {
    console.log("exitButton is not found in the DOM");
  }
});
/**
 * On Exit Function -> Stores user data into local storage for further use
 */
window.onbeforeunload = function () {
  //? Clear Local storage???
  localStorage.clear();
  //Store data into local storage
  localStorage.setItem("UserName", userName);
  localStorage.setItem("Birthday", birthday);
};
