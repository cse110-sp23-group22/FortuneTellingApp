//const sanitizer = new Sanitizer();

var birthday;
var horoscopeArray;
var submitButton;

window.addEventListener("load", init);
async function init(){
    try{
        horoscopeArray = await fetch('horoscope.json');
        horoscopeArray = await horoscopeArray.json();
        horoscopeArray = horoscopeArray['data'];
        //submitButton = document.getElementById("submitButton");

        //set birthday and name for testing purposes
        localStorage.setItem("UserName", 'nikan');
        localStorage.setItem("Birthday", '02/03/2005');
        outputHoroscope();
        return 1;
    }
    catch(error){
        console.error(error);
        return 0;
    }
}
function exampleTest(num){
    return num;
}
/*
 * Based on the input name and birthday, a horoscope reading
 * will be outputted to the user 
 */
function outputHoroscope() {
    //event.preventDefault();
    console.log("output");

    //get birthday and name from local storage
    let customerBirthday = localStorage.getItem('Birthday');
    let customerName = localStorage.getItem('UserName');
    birthday = new Date(customerBirthday);

    // Create a new Date object
    let todayDate = new Date();

    // Get the numerical day of the month
    let todayDay = todayDate.getDate();
    let birthdayMonth = birthday.getMonth();
    let hashValue = (todayDay+birthdayMonth)%12;
    console.log(hashValue);

   
    
    let horoscopeOutput = document.getElementById('horoscopeOutput');
    let nameOutput = document.getElementById('fname');
    let birthdayOutput = document.getElementById('birthday');
    let zodiacOutput = document.getElementById('zodiacSign');
    nameOutput.innerHTML = customerName;
    birthdayOutput.innerHTML = customerBirthday;
    zodiacOutput.innerHTML = horoscopeArray[birthdayMonth]['sign'];
    console.log(horoscopeArray[hashValue]['horoscope']);
    console.log(horoscopeArray[birthdayMonth]['sign']);
    horoscopeOutput.innerHTML=`${horoscopeArray[hashValue]['horoscope']}`;  
    
} 

//console.log(submitButton);
module.exports = exampleTest;
