/**
 * This file contains the functions related to the horoscope feature
 * @module Horoscope
 */

let birthday; // birthday input, got from local storage
let horoscopeArray; // array including the horoscope responses
let localArray;
let homeButton; // button used to go back to the home page
let locked = true; // Locks the home button to not go home

// init function on load of the page
window.addEventListener("load", init);

/**
 * @async
 * @function init
 * @description An init function used to fetch horoscope.json file and set up the home page
 * event listener behavior. Exit code 1 if successful, 0 if not.
 * @tutorial Horoscope
 * @author Nikan, Bill, Jennifer
 * @throws Fetch API failure errors
 */
async function init() {
  try {
    // fetch the horoscope json file and convert to an array
    // containing the responses
    horoscopeArray = await fetch("./horoscope.JSON");
    horoscopeArray = await horoscopeArray.json();
    localArray = horoscopeArray;
    horoscopeArray = horoscopeArray["data"];

    // get homeButton and set up event listener
    homeButton = document.getElementById("homeButton");
    homeButton.addEventListener("click", goHome);

    // Run Timer
    //timer();
    // output the horoscope based on the birthday of the user
    outputHoroscope();
    // exit code
    return 1;
  } catch (error) {
    // catch errors with exit code 0
    console.error(error);
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
  let cough = new Audio("../Assets/Light_cough.mp3");
  let heart = new Audio("../Assets/heart-beat.mp3");
  concentricGradient();
  await new Promise((resolve) => setTimeout(resolve, 5000));
  heart.play();
  await new Promise((resolve) => setTimeout(resolve, 5000));
  shake(1, 1);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  pulseRedOverlay(1000);
  await new Promise((resolve) => setTimeout(resolve, 1500));
  cough.play();
  //Start the ticking
  tickingSound();
  //Turn back on home button
  let homeButton = document.getElementById("homeButton");
  homeButton.removeAttribute("disabled");
  locked = false;
}

/**
 * @function tickingSound
 * @description creates a ticking sound for a set amount of time (8 secs)
 * @author Eric Chen
 */
function tickingSound() {
  let audio = new Audio("../Assets/clock-ticking.mp3");
  setInterval(() => {
    audio.play();
  }, 0);
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
 * @author ByteBrokers
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
async function goHome() {
  if (locked) {
    let whoosh = new Audio("../Assets/woosh.mp3");
    whoosh.play();
    let horoscopeOutput = document.getElementById("horoscopeOutput");
    horoscopeOutput.classList.toggle("hiddenOutput");
    await new Promise((resolve) => setTimeout(resolve, 500));
    let darken = document.getElementById("darken");
    darken.style.opacity = 0.5;
    await new Promise((resolve) => setTimeout(resolve, 1000));
    horoscopeOutput.classList.toggle("hiddenOutput");
    //Switch text
    //let zodiacOutput = document.getElementById("zodiacSign");
    let results = localStorage.getItem("questionnaireResults");
    let index = -1;
    if (results[1] > results[3] && results[1] > results[5]) index = 2;
    if (results[3] > results[1] && results[3] > results[5]) index = 1;
    if (results[5] > results[1] && results[5] > results[3]) index = 0;
    if (results[1] == results[3] && results[1] == results[5]) index = 0;
    console.log(results);
    console.log(`results: ${results[0]},${results[1]},${results[2]} `);
    horoscopeOutput.innerHTML = `${localArray["OldOnes"][index]["response"]}`;
    timer();
    //Gray out home button
    let homeButton = document.getElementById("homeButton");
    homeButton.setAttribute("disabled", true);
    return;
  }
  window.location.href = "../../index.html";
}

/**
 * @function adjustIndexForHorroscope
 * @description returns the index corresponding to the sign in the horoscope.JSON
 *                  file based on the input user birthday, using the hardcoded
 *                  date values. The following is how signs are selected:
 *                  Aries (March 21 – April 19)
 *                  Taurus (April 20 – May 20)
 *                  Gemini (May 21 – June 20)
 *                  Cancer (June 21 – July 22)
 *                  Leo (July 23 – August 22)
 *                  Virgo (August 23 – September 22)
 *                  Libra (September 23 – October 22)
 *                  Scorpio (October 23 – November 21)
 *                  Sagittarius (November 22 – December 21)
 *                  Capricorn (December 22 – January 19)
 *                  Aquarius (January 20 – February 18)
 *                  Pisces (February 19 – March 20)
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
