const cardElements = document.querySelectorAll(".card");
const cardImages = document.getElementsByTagName("img");

window.addEventListener("DOMContentLoaded", init);

let jobData, PersonalData, loveData;

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
    let tarotData = await fetch("./TarotCardAnswer.JSON");
    tarotData = await tarotData.json();
    jobData =
      tarotData["job"][Math.floor(Math.random() * tarotData["job"].length)];
    PersonalData =
      tarotData["PersonalLife"][
        Math.floor(Math.random() * tarotData["PersonalLife"].length)
      ];
    loveData =
      tarotData["love"][Math.floor(Math.random() * tarotData["love"].length)];
    //Set Card Images (Target: 1,3,5)
    cardImages[1].src = `../Assets/TarotCardGraphics/${jobData["TarotCard"]}.png`;
    cardImages[3].src = `../Assets/TarotCardGraphics/${PersonalData["TarotCard"]}.png`;
    cardImages[5].src = `../Assets/TarotCardGraphics/${loveData["TarotCard"]}.png`;
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
      data = jobData["Explanation"];
      cardTitle.textContent = jobData["TarotCard"];
      break;
    case 1:
      data = PersonalData["Explanation"];
      cardTitle.textContent = PersonalData["TarotCard"];
      break;
    case 2:
      data = loveData["Explanation"];
      cardTitle.textContent = loveData["TarotCard"];
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
