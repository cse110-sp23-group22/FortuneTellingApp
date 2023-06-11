/**
 * @date 6/10/2023 - 2:23:19 PM
 *
 * @extends {HTMLElement}
 */
export class QuestionnaireInterface extends HTMLElement {
  constructor() {
    super();

    // Create prompt view
    this.questionText = document.createElement("p");

    // create form. It is empty at creation, but it will be populated with radio inputs
    // when switching questions.
    this.formElement = document.createElement("form");

    this.scores = [0, 0, 0];
    this.questionIndex = -1;
  }

  connectedCallback() {
    this.appendChild(this.questionText);
    this.appendChild(this.formElement);
    let src;
    if (this.hasAttribute("src")) {
      src = this.getAttribute("src");
    }
    fetch(src).then(
      (response) => {
        response.json().then((finalJSON) => {
          this.questionsData = finalJSON;
          this.switchQuestions(0);
        });
      },
      (reject) => {
        console.error(
          "invalid question source, or could not find question source"
        );
        console.error(reject);
      }
    );
  }

  /**
   * Sets the number of radio elements in the form.
   * @param {number} newLength
   */
  #resizeForm(newLength) {
    const oldLength = this.formElement.childNodes.length;
    for (let i = 0; i < newLength - oldLength; i++) {
      const wrapper = document.createElement("p");
      this.formElement.append(wrapper);
      wrapper.append(document.createElement("input"));
      wrapper.append(document.createElement("label"));
    }

    for (let i = 0; i < this.formElement.childNodes.length - newLength; i++) {
      this.formElement.removeChild(this.formElement.lastChild);
    }
  }

  /**
   * Wrapper around switchQuestions. Always goes to the next question, and
   * sends a signal if we have reached the last element.
   * @returns true we have not tried to switch past the last question, false if not.
   */
  nextQuestion() {
    if (this.questionIndex == this.questionsData.length - 1) {
      this.dispatchEvent(
        new CustomEvent("questionnaire-switchedfromlast", {
          bubbles: true,
          details: { scores: this.scores },
        })
      );
      return false;
    }
    this.switchQuestions(++this.questionIndex);
    return true;
  }

  /**
   * Changes the QuestionInterface form to display the selected question and answers
   * @param {Number} index the index of the question within the question array to display
   */
  switchQuestions(index) {
    this.questionIndex = index;
    if (index < 0 || index >= this.questionsData.length);
    // Find the question you want
    const newQuestionData = this.questionsData[index];

    this.#resizeForm(newQuestionData.answers.length);

    // set attributes and content for the form elements so that they are unique to the question
    for (let i = 0; i < newQuestionData.answers.length; i++) {
      const answerWrap = this.formElement.childNodes[i];
      let radioElement = answerWrap.childNodes[0];
      let labelElement = answerWrap.childNodes[1];
      radioElement.setAttribute("id", `question-${index}-response-${i}`);
      radioElement.setAttribute("name", `question-${index}`);
      radioElement.setAttribute("type", "radio");
      radioElement.setAttribute("value", newQuestionData.personalityMap[i]);

      labelElement.setAttribute("for", `question${index}-response-${i}`);
      labelElement.innerText = newQuestionData.answers[i];
    }

    // set the content of the question and labels
    this.questionText.innerText = newQuestionData.question;
  }

  /**
   * If user has made a selection, updates the score stored by the questionnaire.
   * @returns true if an element has been selected and a score can therefore be recorded; false if there is no selection.
   */
  updateScores() {
    const formData = new FormData(this.formElement);
    const formResult = formData.get(`question-${this.questionIndex}`);
    if (formResult == null) {
      console.log("No input yet");
      return false;
    }
    // formData should only have one element in it containing the decision.
    this.scores[formResult] += 1;
    return true;
  }

  loadScoresToLS() {
    localStorage.setItem("questionnaireResults", JSON.stringify(this.scores));
  }
}

customElements.define("questionnaire-interface", QuestionnaireInterface);
