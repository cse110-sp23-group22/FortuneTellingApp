/**
 * Test file for Questionnaire.js
 * Tests Included:
 * 1.
 */
//import { memes } from "./parseNum";
const parse = require("./parseNum");

test('Checks if input has only valid things', () => {
  expect(parse.parseNum("Cr21ap")).toBe("Crap");
})

test('potato', () => {
  expect(parse.potato()).toBe("Potato");
})

/*
test('Meme check', ()=> {
  expect(memes()).toBe("Memes");
})*/