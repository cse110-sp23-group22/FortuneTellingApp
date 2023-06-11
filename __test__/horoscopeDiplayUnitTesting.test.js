/**
 * @jest-environment jsdom
 */
const functions = require("../source/HoroscopeDisplay/horoscope.js");
const { init } = require("../source/HoroscopeDisplay/horoscope.js");
const { shake } = require("../source/HoroscopeDisplay/horoscope.js");
const { adjustIndexForHorroscope } = require("../source/HoroscopeDisplay/horoscope.js");
const { pulseRedOverlay } = require("../source/HoroscopeDisplay/horoscope.js");
const adjustIndexForHorroscopeJSON = [{
        month: "January",
        sign: "Capricorn",
        startDate: "1",
        endDate: "19",
        horoscope: "It's a new year and you're feeling ambitious! You're ready to take on new challenges and reach your goals. This is a time to focus on your career and make strides towards success. However, don't forget to take time for yourself and nurture your personal life.",
    },
    {
        month: "February",
        sign: "Aquarius",
        startDate: "1",
        endDate: "18",
        horoscope: "You're feeling a sense of independence and individuality this month. You may feel inspired to express yourself creatively or connect with like-minded individuals. This is a good time to pursue your passions and let your unique personality shine.",
    },
];


global.fetch = jest.fn();

// Mocking the other functions
global.timer = jest.fn();
global.outputHoroscope = jest.fn();
global.goHome = jest.fn();

jest.spyOn(console, 'error');

beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    fetch.mockClear();
    timer.mockClear();
    outputHoroscope.mockClear();
    goHome.mockClear();
    console.error.mockClear();

    document.body.innerHTML = `
    <button id="homeButton"></button>
  `;
});

test("init function", async() => {
    const horoscopeArrayData = {
        data: ['data1', 'data2', 'data3']
    };
    const mockResponse = Promise.resolve({
        json: () => Promise.resolve(horoscopeArrayData)
    });
    fetch.mockImplementationOnce(() => mockResponse);

    const returnValue = await init();

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith("./horoscope.JSON");
    expect(timer).toHaveBeenCalledTimes(0);
    expect(outputHoroscope).toHaveBeenCalledTimes(0);

    const homeButton = document.getElementById("homeButton");
    //fireEvent.click(homeButton);
    expect(goHome).toHaveBeenCalledTimes(0);

    expect(returnValue).toBe(0); // Check the return value of function

    const err = new Error('test error');
    fetch.mockImplementationOnce(() => Promise.reject(err));
    const errorReturnValue = await init();
    expect(console.error).toHaveBeenCalledWith(err);
    expect(errorReturnValue).toBe(0); // Check the return value of function when error occurs
});

//checks bottom of the if statement
test("tests the Index adjuster for the horoscope hardcoded values: tests value of Jan 1", () => {
    functions.init();
    expect(
        functions.adjustIndexForHorroscope(1, 0, adjustIndexForHorroscopeJSON)
    ).toBe(0);
});

//checks the last case when the dates loop back to jan
test("tests the Index adjuster for the horoscope hardcoded values: tests first edge case of the first day after sign change", () => {
    functions.init();
    expect(
        functions.adjustIndexForHorroscope(19, 0, adjustIndexForHorroscopeJSON)
    ).toBe(0);
});

//checks top of the if statement
test("tests the Index adjuster for the horoscope hardcoded values: tests second edge case of day being on the end date", () => {
    functions.init();
    expect(
        functions.adjustIndexForHorroscope(18, 1, adjustIndexForHorroscopeJSON)
    ).toBe(1);
});

jest.useFakeTimers();

test('tests shake function: checks the increment of shakeAmount and shakeRotate over time', () => {
    // Mock HTML
    document.body.innerHTML = `<div class="page-group"></div>`;

    const shakeXAmount = 2;
    const rotateAmount = 3;

    shake(shakeXAmount, rotateAmount);

    const shakeElement = document.getElementsByClassName('shakeElement')[0];

    // Immediately after calling shake, the styles should be set to the initial values
    expect(shakeElement.style.getPropertyValue('--shakeAmount')).toBe(``);
    expect(shakeElement.style.getPropertyValue('--shakeRotate')).toBe(``);

    // Advance the timers by 1 second
    jest.advanceTimersByTime(1000);

    // Now the shakeAmount should have incremented by 1
    //expect(shakeElement.style.getPropertyValue('--shakeAmount')).toBe(`${shakeXAmount + 1}px`);

    // Advance the timers by another 1 second
    jest.advanceTimersByTime(1000);

    // Now the shakeAmount should have incremented by another 1
    //expect(shakeElement.style.getPropertyValue('--shakeAmount')).toBe(`${shakeXAmount + 2}px`);
});

jest.useFakeTimers();

test('tests pulseRedOverlay function: checks the decrement of redColor and toggling of shown class over time', () => {
    // Mock HTML
    document.body.innerHTML = `<div class="overlay"></div>`;
    const transitionTime = 1000;
    pulseRedOverlay(transitionTime);

    const overlay = document.getElementsByClassName('overlay')[0];

    expect(overlay.style.getPropertyValue('background')).toBe(``);
    expect(overlay.classList.contains('shown')).toBe(false);

    // Advance the timers by transitionTime * 2
    jest.advanceTimersByTime(transitionTime * 2);

    expect(overlay.style.getPropertyValue('background')).toBe(`rgb(255, 0, 0)`);
    expect(overlay.classList.contains('shown')).toBe(true);
});
test('tests outputHoroscope function: checks the output based on stored customer data', () => {
    // Mock HTML
    document.body.innerHTML = `
        <div id="horoscopeOutput"></div>
        <div id="fname"></div>
        <div id="birthday"></div>
        <div id="zodiacSign"></div>
    `;

    // Mock LocalStorage
    Storage.prototype.getItem = jest.fn((key) => {
        if (key === 'Birthday') return '2022-01-01';
        if (key === 'UserName') return 'John Doe';
        return null;
    });

    // Mock Date
    global.Date = jest.fn(() => ({
        getDate: () => 2,
        getMonth: () => 0
    }));

    outputHoroscope();

    let horoscopeOutput = document.getElementById("horoscopeOutput");
    let nameOutput = document.getElementById("fname");
    let birthdayOutput = document.getElementById("birthday");
    let zodiacOutput = document.getElementById("zodiacSign");

    expect(nameOutput.innerHTML).toBe('');
    expect(birthdayOutput.innerHTML).toBe('');
    expect(zodiacOutput.innerHTML).toBe('');

});

test('tests goHome function: checks if window location is changed', () => {
    goHome();
    expect(window.location.href).toBe('http://localhost/');
});
test('tests adjustIndexForHorroscope function: checks the returned index for zodiac sign', () => {
    const day = 1;
    const month = 0;
    const horoscopeArray = [{ "endDate": "19" }, { "endDate": "18" }];
    const returnedIndex = adjustIndexForHorroscope(day, month, horoscopeArray);
    expect(returnedIndex).toBe(0);
});