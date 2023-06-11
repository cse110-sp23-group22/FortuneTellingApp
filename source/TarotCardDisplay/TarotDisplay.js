const cardElements = document.querySelectorAll(".card");
const cardImages = document.getElementsByTagName("img");
const NUM_CARDS_DISPLAYED = 3;

window.addEventListener("DOMContentLoaded", init);

let selectedTarotData = [];

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
    let type = localStorage.getItem("readingType");
    let tarotData = await fetch("./TarotCardAnswer.JSON");
    tarotData = await tarotData.json();

    let usedIndices = [];
    while (usedIndices.length < NUM_CARDS_DISPLAYED) {
      let tempNum;
      do {
        tempNum = Math.floor(Math.random() * tarotData[type].length);
      } while (usedIndices.includes(tempNum));
      usedIndices.push(tempNum);
      selectedTarotData.push(tarotData[type][tempNum]);
    }

    //Set Card Images (Target: 1,3,5)
    for (let i = 0; i < NUM_CARDS_DISPLAYED; i++) {
      cardImages[
        2 * i + 1
      ].src = `../Assets/TarotCardGraphics/${selectedTarotData[i]["TarotCard"]}.png`;
    }
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
  localStorage.setItem("returnedHome", "t");
  window.location.href = "../../index.html";
}

/**
 * @function
 * @description Reveals Card by flipping the tarot card image and displaying meaning on the bottom row.
 * Upon click, it toggles the
 * @author Chris, Eric, Jessica
 */
function revealCard(cardIndex) {
  const card = cardElements[cardIndex];
  if (cardIndex < 0 || cardIndex > 2) {
    console.error("This card Index does not currently exist yet!");
    return;
  }

  if (card.classList.contains("flipped")) return;
  card.classList.toggle("flipped");

  // Setting data
  const cardTitle = document.getElementsByTagName("h2")[0];
  let data;
  var audio = new Audio("/source/Assets/woosh.mp3");
  audio.play();
  data = selectedTarotData[cardIndex]["Explanation"];
  cardTitle.textContent = selectedTarotData[cardIndex]["TarotCard"];
  cardElements[cardIndex].addEventListener("mouseover", () => {
    cardMeaning.style.display = "block";
    cardTitle.textContent = selectedTarotData[cardIndex]["TarotCard"];
    meaningText.innerText = selectedTarotData[cardIndex]["Explanation"];
  });
  const cardMeaning = document.getElementById("cardMeaning");
  const meaningText = document.getElementById("meaningText");

  if (card.classList.contains("flipped")) {
    cardMeaning.style.display = "block";
    meaningText.innerText = data;
  }
}

for (let i = 0; i < NUM_CARDS_DISPLAYED; i++) {
  // TODO
  const card = document.getElementById(`card${i + 1}`);
  card.addEventListener("click", function () {
    revealCard(i);
  });
}
