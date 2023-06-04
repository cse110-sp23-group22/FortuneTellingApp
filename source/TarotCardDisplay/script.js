const cardElements = document.querySelectorAll('.card');

window.addEventListener("load", init);

let jobData, PersonalData, loveData;

async function init() {
    //Eric Here: This is scuffed but necessary
    try {

        //fetch the horoscope json file and convert to an array
        //containing the responses
        let tarotData = await fetch('./TarotCardAnswer.JSON');
        tarotData = await tarotData.json();
        jobData = tarotData['job'][Math.floor(Math.random() * tarotData['job'].length)];
        PersonalData = tarotData['PersonalLife'][Math.floor(Math.random() * tarotData['PersonalLife'].length)];
        loveData = tarotData['love'][Math.floor(Math.random() * tarotData['love'].length)];

        //exit code
        return 1;
    } catch (error) {
        console.error(error);
        return 0;
    }
}

//TODO: A bug resulting in if we unflip a card the other 2 doesn't get shown
// Intended behavior or no?!
function revealCard(cardIndex) {
    const card = cardElements[cardIndex];
    //Unflipping the rest (COMMENT OUT IF THIS ISN'T INTENDED) but I find current behavior odd
    cardElements.forEach(prevCard => {
        if (prevCard.classList.contains('flipped')) {
            prevCard.classList.toggle('flipped');
        }
    });
    card.classList.toggle('flipped');

    //Setting data
    const cardTitle = document.getElementsByTagName('h2')[0];
    let data;
    switch (cardIndex) {
        case 0:
            data = jobData['Explanation'];
            cardTitle.textContent = jobData['TarotCard'];
            break;
        case 1:
            data = PersonalData['Explanation'];
            cardTitle.textContent = PersonalData['TarotCard'];
            break;
        case 2:
            data = loveData['Explanation'];
            cardTitle.textContent = loveData['TarotCard'];
            break;
        default:
            console.error("This card Index does not currently exist yet!");
    }

    const cardMeaning = document.getElementById('cardMeaning');
    const meaningText = document.getElementById('meaningText');

    if (card.classList.contains('flipped')) {
        cardMeaning.style.display = 'block';
        meaningText.innerText = data;
    } else {
        cardMeaning.style.display = 'none';
        meaningText.innerText = '';
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