# Initial Feature Brainstorm

### Put your name, the app you used and a short description of the feature you think is interesting, why, and how should we implement it(high level)

> Completed prior to first brainstorm meeting.

1. Arjun K:

- App: Forceteller
- Feature: horoscope: using the person's birthday and gender, we can get their horoscope for the day. Initially this can be just based on their astrological sign(or however horoscopes are made) but we can expand to sun and moon signs as well if we have the time
- Why we should implement it: it is a simple feature for people to understand/use and one that has grown in popularity in recent years, especially amongst teenagers and people in their 20's
- How to implement: most likely we will have a menu to input name, gender, birthday and time of birth (optional) then, using these values, input them into a system which we access to calculate their horoscope. Return their astrological sign as well as the horoscope for the day. Need to find an API or some sort of system that can return horoscopes to us. From Snapchat AI: Check out the Astrology API from RapidAPI. It provides horoscope data for all zodiac signs and is available for free. You can use this API to get daily, weekly, and monthly horoscope data.

2. Jennifer T:

- App: YesNo Tarot
- Feature: tarot cards: lets the user choose the category they want a fortune for. Then, displays cards laid face down in a row. Instructed the user to think of a yes/no question. The user can select any single card. Then, the card turns over with an image and an answer of yes or no with an explanation of how the image corresponds to the yes or no. The explanation also includes advice on how to get the fortune (ie. career tarot: keep networking, one person will stand out and give you wise counseling).
- Why we should implement: I think people like choosing their fate themselves and seeing how the image that appears seems to give them counseling. It gives people the sense that they are somewhat in control of their lives direction, but also gives them a sense of direction for the questions they want answered. Also, I think it's similar to collecting cards, you never know what you’re going to get, but it's exciting.
- How to implement: Generate random figures on cards. Give each figure some sort of meaning (negative/positive) along with an explanation of what getting them means. Then, lay out the cards and when selected, flip it over. Then, place a box with the answer and the explanation next to the image of the card.

3. Jessica He:

- App: Purple Ocean Psychic Readings
  Fracture: It is a mobile application that provides psychic readings, tarot card readings, and other spiritual services. The app allows users to connect with professional psychics and spiritual advisors who provide guidance and insights on various aspects of life, including love, relationships, career, and spirituality. Users can choose from a range of psychics, read reviews, and book a session directly through the app. The app also offers features like live chat, video calls, and in-app purchases for additional services.
- Why we should implement it: some people may find that the Purple Ocean app or similar services provide them with guidance and direction. Psychic readings and spiritual guidance can offer insights into different aspects of life, and some individuals may find this helpful in making decisions or gaining clarity on certain issues.
- How to implement it:
  User authentication: To allow users to create an account and log in, you would need to collect user input such as their name, email address, and password.
  Booking system: To allow users to book a psychic reading or spiritual service, you would need to collect user input such as the type of service they're interested in, the date and time they want to schedule the appointment, and their payment information.
  Live chat and video calls: To enable live chat and video calls between users and psychics, you would need to collect user input such as the user's preferred communication method, their device's camera and microphone settings, and their availability.

4. Chris K:

- App: Faladdin
- Liked Feature: Combines user supported personal/relationship characteristics and combines with a storyline using AI to give a unique fortune telling.
- Why to implement: Fortune telling applications like magic 8 ball can give cookie cutter answers. By providing readings based on user information, it is more likely to be relevant and “believable” to the user.
- How to implement: Perhaps apply real horoscope/tarot data and map it to user information that is relevant, and generate some prompts. Then, find a way to map the input job/relationship status to the relevant prompts.

5. Ryan L

- App: Palm Reading and Horoscopes
- Liked Features: AI (?) palm reading; you pick an option, enter some data about your palm, take a picture, and get info. Also provides data on Horoscopes/Zodiac signs
- Why: With regards to palm reading, probably a horrible idea without knowing how quickly we can work and whether any of us even knows about machine learning. However, it offers a unique avenue for users to determine their fortunes.
- How: We could attempt an actual AI model. We could also try just asking users for details about their hand. The app actually does this, then asks for a picture to “confirm,” which could just be placebo. We could try this too.

6. Eric C:

- App: Visionary I Ching Oracle
- Liked: Descriptions
- Why: Frankly put every other feature was terrible but the well done descriptions carried the app. It was vague enough to apply to the “allowed” ideas that were given, Subject, Idea, or decision, yet descriptive enough it made me think about the actual subject and to an extent how I should approach it.
- What was bad/what to avoid:
  User input: The app asks the user to take 3 deep breaths and while I could follow along asking the user to do anything is just a bad idea. I recommend if the app wants the user to take 3 deep breaths or whatever, force the user to do so through a cutscene or something.
- Lack of Weight: When the divination was revealed it was really lame and did not make me feel any mysticism at all. Basically this app did not build up for the climatic reveal of my divination.
- Microtransactions: I think this is self explanatory.
- Conclusion: Lol don’t take this app as inspiration, take it as caution. The descriptions were really nice though and I frankly think that a lengthy vague and thoughtful description is the most important in a divination app.
- Final Opinion: Divination is about seeking knowledge from the future. So big fat personal opinion alert here: I really think we should add more steps between the initial input and the final reveal. Or maybe just ask more questions. This way we can get more info on the user and theoretically get a result that is more meaningful due to the more accurate information and the user engagement. This option is hella more work though.

7. Vicky S:

- App: AURLA: Aura Photos & Readings
- Feature: it collects the user’s fingerprint information and then collects the user’s pic and then it will provide aura photography and readings. Aura photography captures a visual representation of the user’s aura. And the readings include the interpretations of the colors and patterns in the user’s aura, which could reveal information about their emotions, personality and overall health.
- Why we should implement it: based on the user’s personal information, it could potentially offer a unique and engaging way for users to explore their spiritual or holistic well-being. And the collection of fingerprint information and photos could also enhance the personalized nature of the readings.
- How to implement: the app claims it is built on an AI-driven biofeedback algorithm, but I am not quite sure how to implement it. But to make sure the user’s security is properly protected.

8. Jiapei Chen

- App: 2022 Fortune Teller
- Feature: Fortune Cookie. The user keeps clicking a button to crack/eat the fortune cookie until the paper inside shows up. What is written on the paper will show your fortune.
- Why should we implement it: It is one of many fortune telling games in this app. It is basically a fortune cookie version of magic 8 ball, but it makes some vague predictions of one’s fortune instead of answering questions. It is simple to implement, doesn’t need any input, and interesting.
- How to implement it: Prepare 5 pictures of fortune cookies eaten to different degrees. Show the next image after two clicks of the button. In the end, randomly select a prediction from a number of predictions.

9. Nikan Ostovan

- App: Tarot reading.
- Feature: After u enter the app there are a lot of specific prompts to use for tarot readings (specific relationship, monthly horoscope, etc…). but
- How we would implement: all of them would lead to pretty much the same 3 screens or tarot modes(one card, 3, 5 cards read). And the animation for the tarot card readings was the same for all cards. It used the same set of cards(information assets) for all of the modes, so pretty much the multiple prompts that the app has are just that, a bunch of random prompts.
  Basically the point is we try super hard for one thing and then wrap it in a bunch of different ways and pretend theyre new features lol.
  The animations for going through the cards looked cool and complicated but i have no idea if we will be able to replicate those animations.
