**Authors:** Eric Chen, Jessica He, Chris Kim, Nikan Ostovan, Bill Chen, Jennifer Tanurdjaja
**Published:** 06/11/2023
**Documented**: Chris Kim

## Questionaire Module

In this tutorial, we will guide you through the code for the questionnaire pages. The questionnaire collects user input for the reading, including the user's name and creepy questions. It is meant to be a simple form to retreive user name and birth date to be incorporated into the app. It is intended to provide a more immersive experience to the horoscope reading.

## Step 1: Initialization and Home Button

The code begins by initializing variables and adding an event listener to the `DOMContentLoaded` event. In the `init` function, the home button is assigned to the `homeButton` variable, and a click event listener is attached to it. When the home button is clicked, it calls the `goHome` function, which redirects the user back to the main page.

## Step 2: Parsing Numbers from Name Input

The `parseNumbers` function is defined to remove any numbers from a given string. It utilizes the `replace` method with a regular expression (`/\d/g`) to replace all digits with an empty string. This function is later used to parse numbers from the user's name input.

## Step 3: Question Initialization

The `initQuestions` function is responsible for initializing the creepy questions and storing the user's name input. It retrieves the name input element, as well as the left and right creepy question input elements. Event listeners are added to the name input and both creepy question inputs to capture the user's input and store it in the corresponding variables.

## Step 4: Continue Button and Form Validation

The code includes an event listener for the "exitButton" (presumably the continue button) click event. When the button is clicked, it checks if all the fields have been filled out. If the left page questions are not filled out, an alert is displayed, and the form is not submitted. If the left page questions are filled out, the form is hidden, and the right page with additional questions is displayed.

## Step 5: Saving User Input and Navigation

Once the user fills out all the questions and clicks the continue button on the right page, the user's selected reading type is retrieved, and all the necessary user inputs (name, reading category) are saved to the local storage. Finally, the user is redirected to the Tarot card display page.

## Step 6: Exporting the `initQuestions` Function

The code exports the `initQuestions` function using the `module.exports` syntax. This allows other files or modules to import and use the `initQuestions` function if needed.