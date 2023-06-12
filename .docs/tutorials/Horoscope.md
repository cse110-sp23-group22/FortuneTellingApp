**Authors:** Nikan Ostovan, Bill Chen, Jennifer Tanurdjaja
**Published:** 06/11/2023
**Documented**: Chris Kim

## Horoscope Module

Welcome to the Horoscope App tutorial! In this tutorial, we will guide you through the process of creating a horoscope app that provides daily readings based on the user's zodiac sign. Let's get started!

### Step 1: Gathering User Input

The first step is to collect the user's name and date of birth. You can create a simple form where the user can enter their name and select their birth date from a dropdown or a date picker. Make sure to validate the input to ensure accurate results.

### Step 2: Determining the Zodiac Sign

Once you have the user's birth date, you need to determine their zodiac sign. You can use the birth date information and compare it with the constellations in the provided table. Based on the date range, assign the corresponding zodiac sign to the user. The following table is stored in a separate JSON file.

| Constellation | Birth Date                 |
| ------------- | -------------------------- |
| Aries         | March 21 – April 19        |
| Taurus        | April 20 – May 20          |
| Gemini        | May 21 – June 20           |
| Cancer        | June 21 – July 22          |
| Leo           | July 23 – August 22        |
| Virgo         | August 23 – September 22   |
| Libra         | September 23 – October 22  |
| Scorpio       | October 23 – November 21   |
| Sagittarius   | November 22 – December 21  |
| Capricorn     | December 22 – January 19   |
| Aquarius      | January 20 – February 18   |
| Pisces        | February 19 – March 20     |

### Step 3: Retrieving the Daily Reading

Now that you have the user's zodiac sign, it's time to retrieve the daily reading for that sign. You can fetch the readings from various sources such as astrology websites or APIs. Make sure to provide accurate and up-to-date readings to enhance the user experience.
*Currently, we have only provided single readings for each birthdate ane constellation.*

### Step 4: Displaying the Horoscope

In this step, you will display the horoscope reading to the user. Create a visually appealing and user-friendly layout for your app. On the left side of the page, display the daily reading for the user's zodiac sign. On the right side, provide additional information about the zodiac sign, such as personality traits, compatibility, and lucky numbers.


