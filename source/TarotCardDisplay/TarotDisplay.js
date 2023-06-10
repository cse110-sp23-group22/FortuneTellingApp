const cardElements = document.querySelectorAll(".card");
const cardImages = document.getElementsByTagName("img");

window.addEventListener("DOMContentLoaded", init);

let dataOne, dataTwo, dataThree;

/**
 * @module TarotDisplay
 * @description Fetches the Tarot Card Answer.
 * Returns 0 if error, 1 if successfully load tarot card descriptions.
 * Appends image corresponding to the selected tarot card.
 * @returns int
 * @throws Fetch API failure errors
 * @tutorial Tarot
 * @author Chris, Eric, Jessica
 */
async function init() {
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
    while (secondNum == tempNum)
      secondNum = Math.floor(Math.random() * tarotData[type].length);
    dataTwo = tarotData[type][secondNum];
    let thirdNum = Math.floor(Math.random() * tarotData[type].length);
    while ((thirdNum == tempNum) | (thirdNum == secondNum))
      thirdNum = Math.floor(Math.random() * tarotData[type].length);
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
 * @function
 * @description Exits back to main
 * @author Chris, Eric, Jessica
 */
function goHome() {
  window.location.href = "../../index.html";
}

/**
 * @function
 * @description Reveals Card by flipping the tarot card image and displaying meaning on the bottom row.
 * @author Chris, Eric, Jessica
 */
function revealCard(cardIndex) {
  const card = cardElements[cardIndex];
  // Unflipping the rest
  // cardElements.forEach((prevCard) => {
  //   if (prevCard.classList.contains("flipped")) {
  //     prevCard.classList.toggle("flipped");
  //   }
  // });
  if (card.classList.contains("flipped")) return;
  card.classList.toggle("flipped");

  // Setting data
  const cardTitle = document.getElementsByTagName("h2")[0];
  let data;
  var audio = new Audio("/source/Assets/woosh.mp3");
  switch (cardIndex) {
    case 0:
      audio.play();
      data = dataOne["Explanation"];
      cardTitle.textContent = dataOne["TarotCard"];
      cardElements[0].addEventListener("mouseover", () => {
        cardMeaning.style.display = "block";
        cardTitle.textContent = dataOne["TarotCard"];
        meaningText.innerText = dataOne["Explanation"];
      });
      break;
    case 1:
      audio.play();
      data = dataTwo["Explanation"];
      cardTitle.textContent = dataTwo["TarotCard"];
      cardElements[1].addEventListener("mouseover", () => {
        cardMeaning.style.display = "block";
        cardTitle.textContent = dataTwo["TarotCard"];
        meaningText.innerText = dataTwo["Explanation"];
      });
      break;
    case 2:
      audio.play();
      data = dataThree["Explanation"];
      cardTitle.textContent = dataThree["TarotCard"];
      cardElements[2].addEventListener("mouseover", () => {
        cardMeaning.style.display = "block";
        cardTitle.textContent = dataThree["TarotCard"];
        meaningText.innerText = dataThree["Explanation"];
      });
      break;
    default:
      console.error("This card Index does not currently exist yet!");
  }

  const cardMeaning = document.getElementById("cardMeaning");
  const meaningText = document.getElementById("meaningText");

  if (card.classList.contains("flipped")) {
    cardMeaning.style.display = "block";
    meaningText.innerText = data;
  }

  // else {
  //   cardMeaning.style.display = "none";
  //   meaningText.innerText = "";
  // }

  // cardElements[0].addEventListener('mouseout', () => {
  //   cardMeaning.style.display = 'none';
  // });
}
