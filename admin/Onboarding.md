# Welcome Aboard the Horrorscope Development Team!

Welcome to the Horroscope development team. We are happy to have you work on our product. Here is a in-depth startup guide to get you up-to-date and accustomed to our repository and organization. 

## Accessing Our Repository
Presumably, if you are reading this, you have access to our repo. Nevertheless, there are a couple of ways to access our repository. 
The first way is through the link in the footer of the homepage of our Horrorscope web application linked here: [Horrorscope](https://cse110-sp23-group22.github.io/FortuneTellingApp/)

Additionally, you can search our organization, ```cse110-sp23-group22``` on Github and once inside, select the ```FortuneTellingApp``` repository from the list that shows up under the org. 

## Repository Organization
Now that you are getting ready to work on our application, here is a rundown of our repo organization:

### Root Directory
The root directory has a certain organization that is different from the rest of the repository to indicate the distinction. Important notes: 
- All files/directories in the root should be named using all lower case. For example, source, specs and admin directories are all lowercase as well as the index.html file. 
- We also have several config files in the root including
  - ESLint
  - Prettier
  - JSdocs
  - package.json
  - package-lock.json

- It is a goal of ours to compile the config files all in one place, but for now they sit in the root directory
Outside of that we have 4 main directories that are important to our project: 
- ```__test__```
- admin - all administrative documents including team branding, meeting notes, CI/CD pipeline updates and team videos
- source - all source code (html, css, JS) files as well as assets used to create the app
- specs - brainstorming notes, adrs, C4 and interface diagrams among other specification documents
Through these 4 directories, you can learn all there is to know about our app and its organization. 

### Admin Directory
When you enter the admin directory, there are 4 directories for you to choose from:
- Branding: holds our team branding materials. In this repo it only contains our logo, but more branding materials can be found in the repository linked on the README
- Meetings: This directory holds all the meeting notes for all major meetings that our team held. This spans meetings from sprint reviews to retrospectives to brainstorms. This is a great way to gain insight on our teams development. 
- Pipeline: This directory holds some basic updates for our CI/CD pipeline, including an update video. More information on the CI/CD pipeline can also be found below
- Videos: This directory holds team update videos that were created periodically. Currently they only hold the update videos after the first sprint and at the end of development for the quarter. 

### Docs Directory:
This directory stores all the scripts and files needed for JSDocs to generate our documentation as well as the actual JSDocs themselves. Our team's JSDocs can be viewed here: [Horrorscope JSDocs](https://cse110-sp23-group22.github.io/FortuneTellingApp/docs/)

### Source Directory:
#### Note the naming of the subdirectories: All files and directories that are not in the root are named in Pascal Case
This directory holds all the source files for our app. We divided the files based on the page in the app that the html, css, and JS files belonged to. Inside this directory you fill find the following directories: 
- Assets: Constains all images, sounds, transitions that were used in our application all stored in one place
- HomePage: Contains the CSS and JS files for the home page of our app, aka index.html
- HoroscopeDisplay: the CSS, HTML, JS, and JSON files that are part of the page of the app that displays the user's horoscope
- HoroscopeQuestionnaire: Contains the CSS, JS, and HTML files for the page where the user fills out information pertaining to their horoscope
- TarotCardDisplay: Contains the CSS, JS, HTML, and JSON files that pertatin to the Tarot Card Display page where the user can interact and view their tarot card reading and the meaning behind the cards.
- TarotForm: Contains the CSS, JS, and HTML files that pertain to the page that asks the user questions that pertain to their tarot card reading
- TransitionCanvas: Contains JS and HTML files that peratin to our Transition Canvas module which is used to create animations and transitions between pages. 
- Styles.css: overarching style sheet for our app

### Specs Directory:
The specs directory contains all written documentation of our planning for our application. The subdirectories include: 
- ADRs: As is in the name, contains the main ADRs for our group for things like tools we used, naming conventions and testing platforms amongst other thing. 
- Brainstorm: Contains our notes and diagrams from our brainstorming session about the features we should include in the app.
- C4: Contains our C4 diagram created at the beginning of the app development
- Pitch: Prior to breaking code ground, we needed to pitch our idea to our TA mentor and get it checked off. The markdown and pdf versions of the pitch are in this directory
- Roadmap: Contains a written document outlining our larger goals and timeline for our app. It was updated as we went along. 
- Users: Contains a document with user idenities that our team used to brainstorm what features people who use our app would appreciate. These are in addition to those mentioned in the pitch. 

### Tutorials Directory: 
Contains some simple tutorials for each facet of our app as well as our JSDocs that go along with other documentation. 

## CI/CD Pipeline and general workflow
Let's start with our branching structure:

For each feature in our app, we create a new branch. For our development during the quarter, this happened to be one per page in the app. We also have a staging branch named "prod" and a release branch named "main". 

ALl features should be developed solely on their own branches prior to being merged into prod, and subsequently into main once we want to issue a proper release. 

The rest of the CI/CD pipeline runs like this: 
1. Once a team (member) makes a change, locally, they push to the remote version of the feature branch they are working on
2. Once pushed, Prettier automatically reformats the code so that it matches across all source files and if there are tests for the feature they run as well. 
3. If satisfied with the changes and the outcome of the github actions, the team member creates a pull request to "prod", writes a comment on what they changed, and asks for review from the team leads or designated code reviewers
4. Once the PR has been made, more linting and Prettier checks, as well as other established tests run. The code reviewers review these checks as well as the code and its ability to be integrated
5. If the checks pass and the code can be integrated, the PR is completed and the changes are merged into prod
6. Once on prod, JSDocs are generated for the files and the github pages that our app is hosted on is re-deployed. 


## Linters and Testing
The linters that our application uses are ESLint and Prettier. We use Prettier to reformat our code so that it looks the same across different modules and different authors. 

We opted to use JEST and JEST-Puppetteer to run our unit and E2E testing for our app. More details on this decision can be found in their respective ADRs

Code Climate: To ensure that we minimize code smells, duplications and issues as well as calculate our code coverage, we connected Code Climate to our repo to give us those updates. You can view the Code Climate dashboard through the link in the README


Well, that's the gist of our repo and our organization. Hope you enjoy working on our app and we are glad to have you here!

