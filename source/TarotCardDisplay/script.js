const cardElements = document.querySelectorAll('.card');

function revealCard(cardIndex) {
  const card = cardElements[cardIndex];
  card.classList.toggle('flipped');

  const cardMeaning = document.getElementById('cardMeaning');
  const meaningText = document.getElementById('meaningText');

  if (card.classList.contains('flipped')) {
    cardMeaning.style.display = 'block';
    meaningText.innerText = getCardMeaning(cardIndex);
  } else {
    cardMeaning.style.display = 'none';
    meaningText.innerText = '';
  }
}

function getCardMeaning(cardIndex) {
  // Add your own logic to retrieve the meaning based on the card index
  // For demonstration purposes, a dummy meaning is returned here
  const meanings = [
    'Card 0 Meaning',
    'Card 1 Meaning',
    'Card 2 Meaning'
  ];

  return meanings[cardIndex];
}
