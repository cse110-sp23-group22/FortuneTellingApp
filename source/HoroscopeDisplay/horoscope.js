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