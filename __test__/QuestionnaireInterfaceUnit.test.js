/**
 * @jest-environment jsdom
 */

require("../source/QuestionnaireInterface/QuestionnaireInterface");

global.fetch = jest.fn((src) => {
  return src == undefined
    ? Promise.reject("Bruh")
    : Promise.resolve({
        json: () =>
          Promise.resolve([
            {
              question: "Question A",
              type: "choice",
              responses: ["Response A", "Response B", "Response C"],
              answers: ["Answer A", "Answer B", "Answer C"],
              personalityMap: [0, 1, 2],
              lsKey: "testquestionresponse",
            },
            {
              question: "Question B",
              type: "choice",
              responses: ["Response D", "Response E", "Response F"],
              answers: ["Answer D", "Answer E", "Answer F"],
              personalityMap: [2, 1, 0],
              lsKey: "hello",
            },
          ]),
      });
});

const log = jest.spyOn(console, "log");
const error = jest.spyOn(console, "error");

describe("Questionnaire Interface", () => {
  let qi, badqi;
  beforeAll((done) => {
    qi = document.createElement("questionnaire-interface");
    qi.setAttribute("src", "somethingToRunFetch");
    document.body.appendChild(qi);

    badqi = document.createElement("questionnaire-interface");
    document.body.appendChild(badqi);

    window.addEventListener("load", () => {
      done();
    });
  });
  afterAll(() => {
    log.mockReset();
  });
  it("should error when being added without a source", async () => {
    expect(badqi.hasAttribute("src")).toBe(false);
    expect(badqi.questionsData).toBe(undefined);
    expect(badqi.questionIndex).toBe(-1);
    expect(error).toHaveBeenCalledTimes(2);
  });
  it("should have a source attribute when properly run", () => {
    expect(qi.hasAttribute("src")).toBe(true);
    expect(qi.questionIndex).toBe(0);
  });
  it("should go to the next question properly when nextQuestion() is run", () => {
    qi.nextQuestion();
    expect(qi.questionIndex).toBe(1);
    expect(qi.questionText.innerText).toEqual("Question B");
    expect(qi.scores).toEqual([0, 0, 0]);
  });
  it("should switch questions properly", () => {
    qi.switchQuestions(0);
    expect(qi.questionIndex).toBe(0);
    expect(qi.questionText.innerText).toEqual("Question A");
    expect(qi.scores).toEqual([0, 0, 0]);
  });
  it("should report that nothing was selected if trying to update score", () => {
    qi.updateScores();
    expect(log).toHaveBeenCalledTimes(1);
  });
  it("should update scores properly", () => {
    let clickedRadio = qi.formElement.childNodes[1].childNodes[0];
    clickedRadio.click();
    qi.updateScores();
    expect(qi.scores).toEqual([0, 1, 0]);
  });
  it("should produce a false result when attempting to move to a question past the last one", () => {
    expect(qi.nextQuestion()).toBe(true);
    expect(qi.nextQuestion()).toBe(false);
  });
  it("should write scores to localStorage properly", () => {
    qi.loadScoresToLS();
    expect(localStorage.getItem("questionnaireResults")).toBe("[0,1,0]");
  });
});
