# Byte Brokers Sprint 2 Review Meeting
### Setting:
> 6/4/2023 2:00pm, Zoom

### Type:
Sprint Review Meeting

## Attendance:
- Arjun
- Nikan
- Ryan
- Jennifer
- Jiaxin
- Chris
- Jinshi
- Eric
- Vicky
## Agenda:
- Review Goals for Sprint
- Get progress updates from subteams
# Discussion Notes:
## Goals for this sprint:
- Work on Tarot Cards
  - System Diagrams Team: 
    - Do E2E Testing for horoscope module
  - Interface Doc Team
    - Tarot Card Display; display categories and store infomration on which one user chooses; display cards and play animations when user selects them
  - ADR team
    - Obtain visuals for the Tarot Cards; write readings for Tarot cards
  - Leaders
    -  Ryan: aesthetic
    - Arjun: Tarot form page
  - Visuals
## What we were able to accomplish as a team(as a whole)
- Able to get Tarot module up and running - basic functionality with card flipping and Tarot form to save information to local storage
- Got a very cool set of graphics for tarot cards that fit the theme
- Implemented a few E2E tests for horoscope module - more to come
- Animations and asthetics for the horoscope module.

## Progress updates from subteams:
- Arjun & Ryan: 
  - When page opens, a transition into the page plays
  - Transitions are customizable for developers
  - ```<transition-canvas>```
  - TODO: add documentation for it
  - Transition-canvas can play sfx
  - Make Tarot card form page, similarly to Horoscope
    - Added thematic questions
    - Categories for readings are presented and selections stored in localStorage
    - Questionnaire should be responsive to screen size
- Jessica, Chris, Eric: 
  - Currently considering only on-click to reveal tarot cards
  - Changed font to match theme and colors
  - Currently we have categories for past, present and future. Should be changed to categories like job/work, personal life/health, love life, but user can pick 3 cards that suggest things about that category’s past, present and future.
- Jennifer, Nikan, Bill:
  - 3 Testing Options
  - First test fails on the first one/few run(s) if run locally, and succeeds afterwards. Works fine on Github Actions.
  - Third option is being worked on: if you click submit after entering everything, we want to display everything input. Issue is that checking localStorage contents tends to be unexpected.
  - If we set the output of localStorage, something should display the correct output. The questionnaire has an event “beforeunload,” that is when the localStorage is done. Puppeteer and Jest has a headless browser, which never triggers beforeunload. 
  - Could be done on click instead of beforeunload to resolve.
  - Better JSDocs for horoscope.js such as author and better descriptions, as well as tutorial/English description for how to use the app.
- Peter & Vicky: 
  - Got Tarot card graphics, use ChatGPT to generate responses for Tarot cards. Did styling and css for horoscope pages as well. 
## Action Items:
- Check if decisions on Tarot Cards are properly communicated
- Diagnose the reason the first test fails locally
- Implement and improve thematic elements further



## Next Meeting Time:
Sunday 6/11 @ 2:00pm, Zoom

End Time: 
3:00 pm

