#Project Roadmap - Horrorscope 
### A Fortune Telling App by Byte Brokers - Team 22 CSE 110 SP23, UCSD

## Project Overview:
The goal of this project is to create a fortune telling web application using vanilla CSS, Javascript and HTML. In a greater scope, we also want to explore and establish certain Agile practices throughout our development process. 

After the initial brainstorming session, the team has decided on the following characteristics of the application that will guide our development:
The theme of the application is Cosmic Horror - dark colors, eerie sounds, etc.
We will have 2 main features - modules - in our application
- A horoscope reading section
- A tarot card reading section
Based on the complexity difference between the two modules, we have agreed to develop the basics for the horoscope module before starting the tarot card module so that we have an MVP before we begin to iterate further. 

# Roadmap (Week 5):
As of week 5 in spring quarter of the 2022-2023 school year, our roadmap for the project, for the rest of this quarter and beyond is as follows:
- We expect there to be a total of 3 sprints in this quarter, the first one being the longest as there is a lot of setup to do as well as building the basic infrastructure of the app. The last two will be shorter but more focused on iterating and improving our app. 
## Sprint 1:
Our goals for sprint 1 are as follows: 
- We want to develop the base of our app including:
- a repo structure, branching, PR, etc.
- a basic CI/CD pipeline, - tests, linitng, documentation, etc (not all will be completed in this first sprint
- home page with simple CSS and placeholder graphics. We have 2 modules so there will be 2 buttons that lead to their respective modules along with the title of the app and any branding materials we decide to include
- a user questionnaire form to enhance the experience for the horoscope module. This will include simple CSS, JS as well as questions such as the user’s birthdate, name and any other questions we would like to ask in order to enhance the theme. 
- A horoscope display page where the user can read their horoscope that will be fetched (for now) from a JSON file that contains a set of horoscopes based on the User’s birthdate
- This can be iterated further either through a horoscope API or adding more horoscope options
## Sprint 2:
Our goals for sprint 2 are as follows:
- Integrate all parts of our current app (the horoscope module) and ensure that we have a working MVP
- Continue to improve on our CI/CD pipeline - ensure that JSDocs are properly created as well as any tests/linting services we employ
- Continue to iterate on our horoscope module: At this point, we should have a horoscope module that leads users from the home page, to the questionnaire page and once they have filled out all questions, leads them to the reveal of their horoscope. We can now implement better looking graphics, more accurate horoscope fetching, add in any animations(if the team deems it necessary) and begin to implement testing for this module
- Depending on the progress of the horoscope module, team should decide whether or not to stay with only the horoscope module or start to develop the Tarot Card module as well. 
- In the case we decide to develop the Tarot Card module, the module should look as follows: 
  - User goes from the home page to another questionnaire where they fill out information including which category they want their reading to be in. Categories could be love life, job, wealth, etc. This should be decided before implementing the graphics
  - From there, they are lead to 3 consecutive screens where they are presented with 3 cards on each screen. The user will pick one card from each of these screens. Then they will be lead to a final screen in which each card will be presented to them along with the explanation of each card based on the category they chose. 
  - These card explanations will also be saved in a JSON file where they can be fetched - another point of expansion is having multiple explanations for each card. 
## Sprint 3:
Our goals for sprint 3 are as follows: 
- At this point, we hope to have the basic functionality of both modules up and running. - At this point we will also be nearing the end of the quarter, which means that our main focus will probably be on testing and cleaning up our app and ensuring that the styling between all the pages match up and it looks like a cohesive app. 
- Things we will focus on: testing E2E and unit testing, code style and formatting and documentation, especially comments
- Note: these things should be in constant development, especially starting with sprint 2, but expected to really ramp up in Sprint 3. 

# Roadmap Update - Week 8:
After the completion of our first sprint, there are a couple updates to the roadmap that we are looking to make:

Things we have completed: 
- MVP of the horoscope module. As described above, we have completed the basic functionality of the horoscope module including the CSS and graphics and outputting a horoscope only based on the user’s birth month that rotates on a daily basis
- CI/CD pipeline: we have linters and basic tests setup for the horoscope modules that run upon push to our feature branches
- Our branching strategy is as follows: we have a main branch that holds all major releases. Then a staging branch called prod that integrates all the features. Then for each feature we have a separate branch where they can be developed and tested in isolation. 
- Additionally, we have connected our repo to code climate so that we can get a report on code smells and code quality and make changes to resolve them. 
Things we are looking to complete:
- We want to now iterate over the horoscope app - first thing is making the horoscopes more accurate to the user’s birthday. SInce zodiac signs can change within a month, it is critical to fetch the user’s zodiac sign based on their birthday as well as their month. Additionally, members were keen to add in more thematic elements into the module, so we will be including some simple animations and sounds to enhance the experience for this module
- Start developing on the tarot module. Based on the time it took to develop our horoscope module and the general commitments that members have in college, we have decided to simplify the Tarot Card module. It’s flow will be as follows: 
  - User enter the module from the homepage to a form page
  - They fill out the form page questions, including what category they want their reading to be about, then continue to the display page
  - The display page presents the user with 3 cards that they can interact with to get their reading
- The way the card explanations are stored and displayed should stay the same as the initial roadmap, but the amount of screens/cards the user sees are reduced to simplify the module so development can fit in the time available. 
- CI/CD pipeline: Now that we are integrating tests, we must continue to develop testing
- Additionally, we need to properly implement a JSDocs workflow so that they can be automatically generated upon push to prod. 
- We found that our linting workflows were not running properly, so we must fix these so that we can get accurate reports on how organized and well formatted our code is
# Roadmap Update - week 9:
After the completion of our second sprint, we have a couple more updates to the roadmap for the last week+ of the quarter:

Things we completed:
- For the horoscope module we were able to add in E2E testing, as well as properly fetch the horoscopes based on the users birth day and month as well as rotate them from day to day
- Additionally, transition animations and thematic animations were added on the horoscope module between pages. 
- The basic functionality, CSS, JS and graphics were implemented for the Tarot module, including a flip animation that plays upon click on the cards on the display page. 
- Additionally, we were able to complete the JSDocs and linting workflows and get them to run properly
Things we are looking to complete:
- Make the app pretty - this includes ensuring that all the pages have styles that match and the graphics on each page match as well. 
- Add comments and documentation - while we have made ADRs and comments for JSDocs throughout development, we want to improve these comments and ensure that each JS and CSS file has proper documentation
- Add more testing. Especially with the basic functionality complete, we want more code coverage through testing - we are using code climate as a guide to ensuring we have solid code coverage. 
- Iterate on the modules, with an emphasis on the Tarot Card module. Though with the time available, the likelihood of making any major changes is low, we can still continue to smooth out the functionality and aesthetics of the modules with an emphasis on the Tarot Card modules because that hasn’t been iterated on that much. 

# Beyond the quarter: 
Beyond the quarter, the roadmap looks slightly different:
- Now with basic functionality, CSS and some animations integrated into the app, we want to continue to developing on our modules - include more horoscopes, possibly include API’s to fetch actual horoscopes if we are not able to include them during this quarter’s development, add in more advanced CSS and animations that makes the app more fluid.
Continue to iterate on the outputs of both modules. For the tarot cards especially, we can continue to add more cards, and more explanations/categories for these cards. 
- We also want to enhance the user experience, so this would include creating more advanced/unique graphics and sounds as well. Things from creepy background music to jump-scare type animations. 
- Continue testing under even more extreme cases. Our goal should be to cover as many basic to intermediate cases as possible through our testing. But as we add more features and enhancements to our app, we have to continue testing and enlarging our test set. 
## Week 10 update:
At this point we have officially completed the app for this quarter. We have an app with basic transitions and animations, basic functionality and shared graphics throughout the two modules as well as simple sound effects that go along with each module. 

Things to continue implementing: 
- Thematic elements: at the end of our development period, we were able to develop more advanced animations, sfx and user interaction for the horoscope module. 
These changes are stored on the “thematic” branch on the repo and are functional. However, integrating these changes would create a large amount of issues and code smells and with the limited time to integrate them, we did not want to integrate code that would create a large amount of code smells and issues for the group talking up the project to have to deal with. 
- So main task moving forward, along with those listed above, is to clean up and properly integrate these changes
- Add more in depth testing: We have a decent amount of tests, over 50% code coverage officially on code climate along with a series of E2E tests that weren’t included in the coverage calculations but help to verify more functionality. With that said, our goal is to get to 90%+ code coverage so:
- Implement larger test cases and more in depth testing of modules and user interaction. 

