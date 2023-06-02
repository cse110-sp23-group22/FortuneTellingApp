var birthday; //birthday input, got from local storage
var horoscopeArray; //array including the horoscope responses
var homeButton; //button used to go back to the home page

//init function on load of the page
window.addEventListener("load", init);

/*
 *init function used to fetch horoscope.json file and set up the home page
 *event listener behavior. Exit code 1 if successful, 0 if not.
 */
async function init(){

    try{

        //fetch the horoscope json file and convert to an array
        //containing the responses
        horoscopeArray = await fetch('./horoscope.JSON');
        horoscopeArray = await horoscopeArray.json();
        horoscopeArray = horoscopeArray['data'];

        //get homeButton and set up event listener
        homeButton = document.getElementById("homeButton");
        homeButton.addEventListener('click', goHome);

        //Run Timer
        timer();
        //output the horoscope based on the birthday of the user
        outputHoroscope();
        //exit code
        return 1;
    }

    //catch errors  with exit code 0
    catch(error){
        console.error(error);
        return 0;
    }
}

/**
 * Timer Event -> ! This function Triggers ALL TIME BASED EVENTS
 */
async function timer(){
    //TODO: Start the ticking event (SOUND)
    concentricGradient();
    //After 10 seconds start blood red screen
    await new Promise((resolve) => setTimeout(resolve,10000));
    pulseRedOverlay(1000);
    //Start shaking after 10 seconds
    await new Promise((resolve) => setTimeout(resolve,10000));
    shake(1,1);
}

/**
 * Shake Element shakes the body by translating X and rotating
 * @param {integer} shakeXAmount
 * @param {integer} RotateAmount
 * Both of these parameters determine the resulting shake look
 */
function shake(shakeXAmount, RotateAmount){
    let body = document.getElementsByClassName("page-group")[0];    
    body.classList.toggle("shakeElement");
    let shakeEle = document.getElementsByClassName("shakeElement")[0];
    let shakeAmount = shakeXAmount;
    let shakeRotate = RotateAmount;
    let shakeInterval = setInterval(()=> {
        shakeEle.style.setProperty('--shakeAmount', `${shakeAmount}px`);
        shakeEle.style.setProperty('--shakeRotate', `${shakeRotate}deg`);
        shakeAmount++;
        shakeRotate++;
    },1000)
}

/**
 * Slowly fades in closer and closer
 */
function concentricGradient(){
    let gradient = document.getElementById("gradient");
    let size = 2000;
    let floor = 500;
    let gradientInterval = setInterval(()=> {
        gradient.style.background =  `radial-gradient(${size}px,transparent, #000000)`;
        size -= 10;
        if (size < floor) size = floor;
    },100)
}

/**
 * Pulses the overlay div. This is supposed to be a blood screen
 * @param {integer} transitionTime 
 * How long does the transition take. Also determines time between each pulse
 */
function pulseRedOverlay(transitionTime){
    let overlay = document.getElementsByClassName("overlay")[0];
    let delay = transitionTime;
    let redColor = 255; //255 is the greatest saturation of red
    let interval = setInterval(()=> {
        overlay.style.transition = `opacity ${delay/1000}`; //Changes transition delay (From ms -> s)
        overlay.style.background = `rgb(${redColor},0,0)`;
        redColor -= 50; //* Change this to make it less or more darker each delay
        //delay *= 0.9; //Added delay in case you want to pulse faster
        overlay.classList.toggle("shown");
    },delay * 2)
}
/*
 *expamle test function that returns the input
 */
function exampleTest(num){
    return num;
}
/**
 * Based on the input name and birthday, a horoscope reading will be outputted to the user
 * @tutorial horoscope-tutorial
 * @class Horoscope
 */
function outputHoroscope() {

    //get birthday and name from local storage
    let customerBirthday = localStorage.getItem('Birthday');
    let customerName = localStorage.getItem('UserName');

    //set up birthdate in correct format and get numerical month
    birthday = new Date(customerBirthday);
    let birthdayMonth = birthday.getMonth();

    // get the current numereical day of the month for today
    let todayDate = new Date();
    let todayDay = todayDate.getDate();
    
    //randomize the responese of the horroscope by using the date of today to offset
    //the resopnse of the array
    let hashValue = (todayDay+birthdayMonth)%12;
    console.log(hashValue);

    //get output elements from the horoscope.html file
    let horoscopeOutput = document.getElementById('horoscopeOutput');
    let nameOutput = document.getElementById('fname');
    let birthdayOutput = document.getElementById('birthday');
    let zodiacOutput = document.getElementById('zodiacSign');

    //display the output in the correct element
    nameOutput.innerHTML = customerName;
    birthdayOutput.innerHTML = customerBirthday;
    zodiacOutput.innerHTML = horoscopeArray[birthdayMonth]['sign'];
    console.log(horoscopeArray[hashValue]['horoscope']);
    console.log(horoscopeArray[birthdayMonth]['sign']);
    horoscopeOutput.innerHTML=`${horoscopeArray[hashValue]['horoscope']}`;    
}

/*
 * changes the location fo the window to the home page
 */
function goHome() {
    window.location.href = "../../index.html"; 
}

//module export statement used for JEST testing
module.exports = exampleTest;