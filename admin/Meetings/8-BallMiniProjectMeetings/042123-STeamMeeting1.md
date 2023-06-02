# 8-Ball Stable Team Meeting 1
### Setting:
> 4/21/2023 4:00pm, Zoom

### Type:
Program Feature Discussion and development

### Attendance:
- Arjun 
- Nikan
- Jinshi
- Jennifer
- Jiapei
- Xin
## Team Progress:
- Evaluated AI code, saw what was working, what was not
- Came up with additional ideas/features for the program
- Started implementing + debugging new simple features
## Agenda:
- Look over what explore team has already acquired from AI
- Check for possible bugs, places we can improve
- Brainstorm additional features/content that we want explore to see if they can get from AI
- Implement human code into the AI code to see how we can improve it

## Discussion Notes:
- How do we determine if the question is valid for the 8-ball?
- Check certain words in the question to determine if a question is yes/no
- Start with “Will..”? What other key words are there
- Chat gpt API(not really)
- What part(s) of AI code works:
- Solid starting skeleton
- Basic functionality is there - though a little boring 

### What part(s) of AI code do we need to change:
- add some visual effects to the words popping up
- fix the fact that 8-ball would respond to empty question
- Add in a shake style/action through CSS
- Change where the answer outputs - add in graphics as well
- Change div tags to output and section tags
- Change const variable declarations to let declarations.
- Rename files to reflect their functions - change file structure
- Have separate folders for style sheets 
- Change how the user asks the 8-ball - do they just click the 8-ball picture? 
- Would this be intuitive?
- Add labels to the inputs - accessibility features - AI doesn’t include good labels
### Features Added:
- Shake button shakes when pressed
- Name box to personalize responses
- Name gets put in response - problem: name is logged but response doesn’t update with name. 
- Both name box and question box must be filled before shaking
- Checking for valid question - question must have at least 2 words in it. 
### Additional Features We Should Add:
- Additional languages for the output
- Optionally request name in form (near prompt), insert name into answer.
- Make user put their name in first before shaking 8-ball
- Ball shakes when we click it
- Sound plays when clicking on the ball?
- History of responses that the 8-ball gave - good idea for fortune telling as well
- Use local storage - store as a JSON

### Action Items:
- Ask explore team for graphics for the page
- Figure out how to properly input name into answer
- Ask explore to use AI to get code for features
- Continue implementing/improving on AI code. 	

### Next Meeting Time (For Stable team only):
Saturday 4/22 @ 5:30pm, Zoom

### End Time: 
5:05pm
