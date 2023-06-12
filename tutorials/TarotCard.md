**Authors:** Eric Chen, Jessica He, Chris Kim
**Published:** 06/11/2023
**Documented**: Chris Kim

## TarotCard Module

In this tutorial, we will guide you through the code for a Tarot card reading portion. The form collects user input for their name and concern, and then displays three Tarot cards representing the past, present, and future. Let's explore the code!

## Step 1: Initialization and Fetching Tarot Card Answers

The code begins by initializing variables and adding an event listener to the `DOMContentLoaded` event. In the `init` function, the app fetches the Tarot card answers from a JSON file based on the selected reading type. It randomly selects three cards and stores the corresponding data in the `selectedTarotData` array. The card images are set using the fetched data.

## Step 2: Home Button

The code assigns the home button element to the `homeButton` variable and adds a click event listener to it. When the home button is clicked, it calls the `goHome` function, which redirects the user back to the main page.

## Step 3: Revealing Tarot Cards

The `revealCard` function is responsible for revealing a specific Tarot card when clicked. It toggles the class "flipped" on the card element, which triggers the CSS transition effect to flip the card. The corresponding card title and meaning are displayed at the bottom row. Audio is played when the card is revealed.

## Step 4: Event Listeners for Tarot Cards

The code adds click event listeners to each of the three Tarot cards. When a card is clicked, it calls the `revealCard` function with the corresponding index to reveal the card and display its meaning.

## Step 5: Exiting the App

The `goHome` function redirects the user back to the main page when the home button is clicked.
