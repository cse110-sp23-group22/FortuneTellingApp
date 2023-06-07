const cardElements = document.querySelectorAll(".card");
const cardImages = document.getElementsByTagName("img");

window.addEventListener("DOMContentLoaded", init);

let jobData, PersonalData, loveData;

/**
 * @description Fetches the Tarot Card Answer
 * @tutorial TarotDisplay
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
    cardImages[1].src = `./TarotCardGraphics/${jobData["TarotCard"]}.png`;
    cardImages[3].src = `./TarotCardGraphics/${PersonalData["TarotCard"]}.png`;
    cardImages[5].src = `./TarotCardGraphics/${loveData["TarotCard"]}.png`;
    //exit code
    return 1;
  } catch (error) {
    console.error(error);
    return 0;
  }
}

homeButton = document.getElementById("homeButton");
homeButton.addEventListener("click", goHome);

/**
 * @description changes the location of the window to the home page
 * @tutorial Tarot-tutorial
 * @class Horoscope
 * @author Nikan, Bill, Jennifer
 */
function goHome() {
  window.location.href = "../../index.html";
}

// Intended behavior or no?!
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
