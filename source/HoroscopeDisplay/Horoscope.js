/**
 * @description This file contains the functions related to the horoscope feature. The module is entered upon finishing the questionaire.
 * @module Horoscope/Display
 * @name module:Horoscope/Display
 * @tutorial Horoscope
 * @author Nikan, Bill, Jennifer
 * @since 06/11/2023
 */

let birthday; // birthday input, got from local storage
let horoscopeArray; // array including the horoscope responses
let homeButton; // button used to go back to the home page
window.addEventListener("load", init); // init function on load of the page

/**
 * @description An init function used to fetch horoscope.json file and set up the home page
 * event listener behavior. Exit code 1 if successful, 0 if not.
 * @async
 * @function init
 * @throws Fetch API failure errors
 */
async function init() {
  try {
    // fetch the horoscope json file and convert to an array
    // containing the responses
    horoscopeArray = await fetch("./horoscope.JSON");
    horoscopeArray = await horoscopeArray.json();
    horoscopeArray = horoscopeArray["data"];

    // get homeButton and set up event listener
    homeButton = document.getElementById("homeButton");
    homeButton.addEventListener("click", goHome);

    timer(); // Run Timer
    outputHoroscope(); // output the horoscope based on the birthday of the user
    return 1; // exit code
  } catch (error) {
    console.error(error); // catch errors with exit code 0
    return 0;
  }
}

/**
 * @async
 * @function timer
 * @description A timer event that triggers all time based events
 * @author Eric, Ryan
 */
async function timer() {
  // TODO: Start the ticking event (SOUND)
  concentricGradient();
  // After 10 seconds start blood red screen
  await new Promise((resolve) => setTimeout(resolve, 10000));
  pulseRedOverlay(1000);
  // Start shaking after 10 seconds
  await new Promise((resolve) => setTimeout(resolve, 10000));
  shake(1, 1);
}

/**
 * @function shake
 * @description Shakes the body by translating X and rotating
 * @param {integer} shakeXAmount - The amount of times the shaking motion should occur
 * @param {integer} RotateAmount - The amount the shake should rotate
 * @author Eric, Ryan
 */
function shake(shakeXAmount, RotateAmount) {
  let body = document.getElementsByClassName("page-group")[0];
  body.classList.toggle("shakeElement");
  let shakeEle = document.getElementsByClassName("shakeElement")[0];
  let shakeAmount = shakeXAmount;
  let shakeRotate = RotateAmount;
  //let shakeInterval =
  setInterval(() => {
    shakeEle.style.setProperty("--shakeAmount", `${shakeAmount}px`);
    shakeEle.style.setProperty("--shakeRotate", `${shakeRotate}deg`);
    shakeAmount++;
    //shakeRotate++;
  }, 1000);
}

/**
 * @function concentricGradient
 * @description Slowly fades in closer and closer
 */
function concentricGradient() {
  let gradient = document.getElementById("gradient");
  if (gradient === null) {
    return;
  }
  let size = 2000;
  let floor = 500;
  //let gradientInterval =
  setInterval(() => {
    gradient.style.background = `radial-gradient(${size}px,transparent, #000000)`;
    size -= 10;
    if (size < floor) size = floor;
  }, 100);
}

/**
 * @function pulseRedOverlay
 * @description Responsible for pulses on overlay div for the blood screen affect
 * @param {integer} transitionTime - The length of transitions and time between each pulse
 */
function pulseRedOverlay(transitionTime) {
  let overlay = document.getElementsByClassName("overlay")[0];
  let delay = transitionTime;
  let redColor = 255; // 255 is the greatest saturation of red
  //let interval =
  setInterval(() => {
    overlay.style.transition = `opacity ${delay / 1000}`; // Changes transition delay (From ms -> s)
    overlay.style.background = `rgb(${redColor},0,0)`;
    redColor -= 50; //* Change this to make it less or more darker each delay
    // delay *= 0.9; //Added delay in case you want to pulse faster
    overlay.classList.toggle("shown");
  }, delay * 2);
}

/**
 * @function outputHoroscope
 * @description A horoscope reading is outputted based on the input name and birthday
 * @author Nikan, Bill, Jennifer
 */
function outputHoroscope() {
  // get birthday and name from local storage
  let customerBirthday = localStorage.getItem("Birthday");
  let customerName = localStorage.getItem("UserName");

  // set up birthdate in correct format and get numerical month
  // note: added time at noon, since date object would change
  // to EST if not specified and change the date by one
  birthday = new Date(`${customerBirthday}T12:00:00`);
  let birthdayMonth = birthday.getMonth();
  let birthdayDay = birthday.getDate();

  // the correct index corresponding to the horscope sign of the birthday
  let horoscopeSignIndex = adjustIndexForHorroscope(
    birthdayDay,
    birthdayMonth,
    horoscopeArray
  );
  //adjustIndexForHorroscope2(birthdayDay, birthdayMonth);
  console.log(horoscopeSignIndex);

  // get the current numereical day of the month for today
  let todayDate = new Date();
  let todayDay = todayDate.getDate();

  // randomize the responese of the horroscope by using the date of today to offset
  // the resopnse of the array
  let hashValue = (todayDay + horoscopeSignIndex) % 12;

  // get output elements from the horoscope.html file
  let horoscopeOutput = document.getElementById("horoscopeOutput");
  let nameOutput = document.getElementById("fname");
  let birthdayOutput = document.getElementById("birthday");
  let zodiacOutput = document.getElementById("zodiacSign");

  // display the output in the correct element
  nameOutput.innerHTML = customerName;
  birthdayOutput.innerHTML = customerBirthday;
  zodiacOutput.innerHTML = horoscopeArray[horoscopeSignIndex]["sign"];
  horoscopeOutput.innerHTML = `${horoscopeArray[hashValue]["horoscope"]}`;
}

/**
 * @function goHome
 * @description Changes the location of the window to the home page
 * @author Nikan, Bill, Jennifer
 */
function goHome() {
  window.location.href = "../../index.html";
}

/**
 * @function adjustIndexForHorroscope
 * @description returns the index corresponding to the sign in the horoscope.JSON
 * @param {int} day - day of the user birthday
 * @param {int} month - month of the user birthday
 * @returns index of the zodiac sign
 * @author Nikan
 */
function adjustIndexForHorroscope(day, month, horoscopeArray) {
  let endDate = horoscopeArray[month]["endDate"];
  let newIndex = 0;
  endDate = parseInt(endDate);
  if (day <= endDate) {
    newIndex = month;
  } else {
    newIndex = month + 1;
  }

  if (newIndex == 12) {
    newIndex = 0;
  }
  console.log(endDate);
  console.log(newIndex);
  return newIndex;
}

module.exports = {
  init,
  timer,
  shake,
  goHome,
  outputHoroscope,
  pulseRedOverlay,
  concentricGradient,
  adjustIndexForHorroscope,
};
