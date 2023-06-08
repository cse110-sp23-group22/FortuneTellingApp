const cardElements = document.querySelectorAll(".card");
const cardImages = document.getElementsByTagName("img");

window.addEventListener("DOMContentLoaded", init);

let dataOne, dataTwo,dataThree;

/**
 * @description Fetches the Tarot Card Answer
 * @tutorial Tarot-tutorial
 * @class Tarot Card
 * @author Chris, Eric, Jessica
 */
async function init() {
  //Eric Here: This is scuffed but necessary
  try {
    //fetch the horoscope json file and convert to an array
    //containing the responses
    //TODO: Fix this with local storage
    let type = localStorage.getItem("readingType");
    let tarotData = await fetch("./TarotCardAnswer.JSON");
    tarotData = await tarotData.json();
    let tempNum = Math.floor(Math.random() * tarotData[type].length);
    dataOne = tarotData[type][tempNum];
    let secondNum = Math.floor(Math.random() * tarotData[type].length);
    while (secondNum == tempNum) secondNum = Math.floor(Math.random() * tarotData[type].length);
    dataTwo = tarotData[type][secondNum];
    let thirdNum = Math.floor(Math.random() * tarotData[type].length);
    while (thirdNum == tempNum | thirdNum == secondNum) thirdNum = Math.floor(Math.random() * tarotData[type].length);
    dataThree = tarotData[type][thirdNum];

    
    //Set Card Images (Target: 1,3,5)
    cardImages[1].src = `../Assets/TarotCardGraphics/${dataOne["TarotCard"]}.png`;
    cardImages[3].src = `../Assets/TarotCardGraphics/${dataTwo["TarotCard"]}.png`;
    cardImages[5].src = `../Assets/TarotCardGraphics/${dataThree["TarotCard"]}.png`;
    //exit code
    return 1;
  } catch (error) {
    console.error(error);
    return 0;
  }
}

let homeButton = document.getElementById("homeButton");
homeButton.addEventListener("click", goHome);

/**
 * @description Brings back to the main screen
 * @tutorial Tarot-tutorial
 * @class Tarot Card
 * @author Chris, Eric, Jessica
 */
function goHome() {
  window.location.href = "../../index.html";
}

/**
 * @description Reveals the card
 * @tutorial Tarot-tutorial
 * @class Tarot Card
 * @author Chris, Eric, Jessica
 */
function revealCard(cardIndex) {
  const card = cardElements[cardIndex];
  //Unflipping the rest (COMMENT OUT IF THIS ISN'T INTENDED) but I find current behavior odd
  cardElements.forEach((prevCard) => {
    if (prevCard.classList.contains("flipped")) {
      prevCard.classList.toggle("flipped");
    }
  });
  card.classList.toggle("flipped");

  //Setting data
  const cardTitle = document.getElementsByTagName("h2")[0];
  let data;
  switch (cardIndex) {
    case 0:
      data = dataOne["Explanation"];
      cardTitle.textContent = dataOne["TarotCard"];
      break;
    case 1:
      data = dataTwo["Explanation"];
      cardTitle.textContent = dataTwo["TarotCard"];
      break;
    case 2:
      data = dataThree["Explanation"];
      cardTitle.textContent = dataThree["TarotCard"];
      break;
    default:
      console.error("This card Index does not currently exist yet!");
  }

  const cardMeaning = document.getElementById("cardMeaning");
  const meaningText = document.getElementById("meaningText");

  if (card.classList.contains("flipped")) {
    cardMeaning.style.display = "block";
    meaningText.innerText = data;
  } else {
    cardMeaning.style.display = "none";
    meaningText.innerText = "";
  }
}

//Eric Here: So apparently we get this from localStorage or atleast they want me to so imma comment this out
//Local storage is dumb currently I am ripping off horoscope display and taking it from the JSON we have
/*
function getCardMeaning(cardIndex) {
  // Add your own logic to retrieve the meaning based on the card index
  // For demonstration purposes, a dummy meaning is returned here
  const meanings = [
    'Card 0 Meaning',
    'Card 1 Meaning',
    'Card 2 Meaning'
  ];

  return meanings[cardIndex];
}*/
