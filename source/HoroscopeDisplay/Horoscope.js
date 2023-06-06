var birthday; //birthday input, got from local storage
var horoscopeArray; //array including the horoscope responses
var homeButton; //button used to go back to the home page

//init function on load of the page
window.addEventListener("load", init);

/**
 * @description init function used to fetch horoscope.json file and set up the home page
 * event listener behavior. Exit code 1 if successful, 0 if not.
 * @tutorial horoscope-tutorial
 * @class Horoscope
 * @author Nikan, Bill, Jennifer
 * @throws Fetch API failure errors
 */
async function init() {
  try {
    //fetch the horoscope json file and convert to an array
    //containing the responses
    horoscopeArray = await fetch("./horoscope.JSON");
    horoscopeArray = await horoscopeArray.json();
    horoscopeArray = horoscopeArray["data"];

    //get homeButton and set up event listener
    homeButton = document.getElementById("homeButton");
    homeButton.addEventListener("click", goHome);

    //Run Timer
    timer();
    //output the horoscope based on the birthday of the user
    outputHoroscope();
    //exit code
    return 1;
  } catch (error) {
    //catch errors with exit code 0
    console.error(error);
    return 0;
  }
}

/**
 * Timer Event -> ! This function Triggers ALL TIME BASED EVENTS
 */
async function timer() {
  //TODO: Start the ticking event (SOUND)
  concentricGradient();
  //After 10 seconds start blood red screen
  await new Promise((resolve) => setTimeout(resolve, 10000));
  pulseRedOverlay(1000);
  //Start shaking after 10 seconds
  await new Promise((resolve) => setTimeout(resolve, 10000));
  shake(1, 1);
}

/**
 * Shake Element shakes the body by translating X and rotating
 * @param {integer} shakeXAmount
 * @param {integer} RotateAmount
 * Both of these parameters determine the resulting shake look
 */
function shake(shakeXAmount, RotateAmount) {
  let body = document.getElementsByClassName("page-group")[0];
  body.classList.toggle("shakeElement");
  let shakeEle = document.getElementsByClassName("shakeElement")[0];
  let shakeAmount = shakeXAmount;
  let shakeRotate = RotateAmount;
  let shakeInterval = setInterval(() => {
    shakeEle.style.setProperty("--shakeAmount", `${shakeAmount}px`);
    shakeEle.style.setProperty("--shakeRotate", `${shakeRotate}deg`);
    shakeAmount++;
    //shakeRotate++;
  }, 1000);
}

/**
 * Slowly fades in closer and closer
 */
function concentricGradient() {
  let gradient = document.getElementById("gradient");
  let size = 2000;
  let floor = 500;
  let gradientInterval = setInterval(() => {
    gradient.style.background = `radial-gradient(${size}px,transparent, #000000)`;
    size -= 10;
    if (size < floor) size = floor;
  }, 100);
}

/**
 * Pulses the overlay div. This is supposed to be a blood screen
 * @param {integer} transitionTime
 * How long does the transition take. Also determines time between each pulse
 */
function pulseRedOverlay(transitionTime) {
  let overlay = document.getElementsByClassName("overlay")[0];
  let delay = transitionTime;
  let redColor = 255; //255 is the greatest saturation of red
  let interval = setInterval(() => {
    overlay.style.transition = `opacity ${delay / 1000}`; //Changes transition delay (From ms -> s)
    overlay.style.background = `rgb(${redColor},0,0)`;
    redColor -= 50; //* Change this to make it less or more darker each delay
    //delay *= 0.9; //Added delay in case you want to pulse faster
    overlay.classList.toggle("shown");
  }, delay * 2);
}
/*
 *expamle test function that returns the input
 */
function exampleTest(num) {
  return num;
}
/**
 * @description Based on the input name and birthday, a horoscope reading will be outputted to the user
 * @tutorial horoscope-tutorial
 * @author Nikan, Bill, Jennifer
 */
function outputHoroscope() {
  //get birthday and name from local storage
  let customerBirthday = localStorage.getItem("Birthday");
  let customerName = localStorage.getItem("UserName");

  //set up birthdate in correct format and get numerical month
  //note: added time at noon, since date object would change
  //to EST if not specified and change the date by one
  birthday = new Date(`${customerBirthday}T12:00:00`);
  let birthdayMonth = birthday.getMonth();
  let birthdayDay = birthday.getDate();

  //the correct index corresponding to the horscope sign of the birthday
  let horoscopeSignIndex = adjustIndexForHorroscope(birthdayDay, birthdayMonth);
  console.log(horoscopeSignIndex);

  // get the current numereical day of the month for today
  let todayDate = new Date();
  let todayDay = todayDate.getDate();

  //randomize the responese of the horroscope by using the date of today to offset
  //the resopnse of the array
  let hashValue = (todayDay + horoscopeSignIndex) % 12;

  //get output elements from the horoscope.html file
  let horoscopeOutput = document.getElementById("horoscopeOutput");
  let nameOutput = document.getElementById("fname");
  let birthdayOutput = document.getElementById("birthday");
  let zodiacOutput = document.getElementById("zodiacSign");

  //display the output in the correct element
  nameOutput.innerHTML = customerName;
  birthdayOutput.innerHTML = customerBirthday;
  zodiacOutput.innerHTML = horoscopeArray[horoscopeSignIndex]["sign"];
  horoscopeOutput.innerHTML = `${horoscopeArray[hashValue]["horoscope"]}`;
}

/**
 * @description changes the location of the window to the home page
 * @tutorial horoscope-tutorial
 * @author Nikan, Bill, Jennifer
 */
function goHome() {
  window.location.href = "../../index.html";
}

/**
 * @description returns the index corresponding to the sign in the horoscope.JSON
 *                  file based on the input user birthday, using the hardcoded
 *                  date values.
 * @tutorial horoscope-tutorial
 * @param {int} day day of the user birthday
 * @param {int} month month of the user birthday
 * @returns index of the zodiac sign
 * @author Nikan
 */
function adjustIndexForHorroscope(day, month) {
  /*
    Aries (March 21 – April 19)
    Taurus (April 20 – May 20)
    Gemini (May 21 – June 20)
    Cancer (June 21 – July 22)
    Leo (July 23 – August 22)
    Virgo (August 23 – September 22)
    Libra (September 23 – October 22)
    Scorpio (October 23 – November 21)
    Sagittarius (November 22 – December 21)
    Capricorn (December 22 – January 19)
    Aquarius (January 20 – February 18)
    Pisces (February 19 – March 20)
    */

  let newIndex; //the index corresponding to the sign in the horoscope.JSON file

  //switch statement with the hardcoded values of the days.
  switch (month) {
    case 0: // January
      switch (true) {
        case day >= 1 && day <= 19:
          newIndex = 0;
          break;
        case day >= 20 && day <= 31:
          newIndex = 1;
          break;
      }
      break;

    case 1: // February
      switch (true) {
        case day >= 1 && day <= 18:
          newIndex = 1;
          break;
        case day >= 19 && day <= 28:
          newIndex = 2;
          break;
      }
      break;

    case 2: // March
      switch (true) {
        case day >= 1 && day <= 20:
          newIndex = 2;
          break;
        case day >= 21 && day <= 31:
          newIndex = 3;
          break;
      }
      break;

    case 3: // April
      switch (true) {
        case day >= 1 && day <= 19:
          newIndex = 3;
          break;
        case day >= 20 && day <= 30:
          newIndex = 4;
          break;
      }
      break;

    case 4: // May
      switch (true) {
        case day >= 1 && day <= 20:
          newIndex = 4;
          break;
        case day >= 21 && day <= 31:
          newIndex = 5;
          break;
      }
      break;

    case 5: // June
      switch (true) {
        case day >= 1 && day <= 20:
          newIndex = 5;
          break;
        case day >= 21 && day <= 30:
          newIndex = 6;
          break;
      }
      break;

    case 6: // July
      switch (true) {
        case day >= 1 && day <= 22:
          newIndex = 6;
          break;
        case day >= 23 && day <= 31:
          newIndex = 7;
          break;
      }
      break;

    case 7: // August
      switch (true) {
        case day >= 1 && day <= 22:
          newIndex = 7;
          break;
        case day >= 23 && day <= 31:
          newIndex = 8;
          break;
      }
      break;

    case 8: // September
      switch (true) {
        case day >= 1 && day <= 22:
          newIndex = 8;
          break;
        case day >= 23 && day <= 30:
          newIndex = 9;
          break;
      }
      break;

    case 9: // October
      switch (true) {
        case day >= 1 && day <= 22:
          newIndex = 9;
          break;
        case day >= 23 && day <= 31:
          newIndex = 10;
          break;
      }
      break;

    case 10: // November
      switch (true) {
        case day >= 1 && day <= 21:
          newIndex = 10;
          break;
        case day >= 22 && day <= 30:
          newIndex = 11;
          break;
      }
      break;

    case 11: // December
      switch (true) {
        case day >= 1 && day <= 21:
          newIndex = 11;
          break;
        case day >= 22 && day <= 31:
          newIndex = 0;
          break;
      }
      break;

    default:
      newIndex = null;
      break;
  }
  return newIndex;
}