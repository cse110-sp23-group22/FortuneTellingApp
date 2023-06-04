---
status: accepted
date: 2023-06-14
deciders: Chris Kim, Jessica He, Eric Chen
informed: Ryan Lee, Arjun Kumar
---
# Flipping Effects for Tarot Card Display

## Context and Problem Statement
Our team wanted to add theatric effects to ensure the overall theme of the app is continued when displaying the tarot readings. We wanted to implement a card flipping animation initially pitched by other team members, we wanted to integrate the feature with apparopriate visuals.

## Decision Drivers 
* Visuals that are consistent with our cosmic horror theme
* Incorporates the flipping animation
* The readings are still readable

## Considered Options
* Card flips upon hover, with white fonts
* Card flips upon click, with red fonts.

## Decision Outcome
- Chosen option: We chose to **flip cards with click**, as it is a toggle to display the description of the particular tarot card. The hover would mean the user have to leave the cursor on the card to keep reading the description, which wasn't optimal.
- In addition, we've incorporated red fonts to follow the overal theme of the app.
- We've also added the tarot card image to fit type of the card the reading selects it to be.