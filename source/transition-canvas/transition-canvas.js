/**
 * An extension of the canvas with extra functionality for transitions between pages.
 * @date 6/3/2023 - 12:07:15 PM
 *
 * @class TransitionCanvas
 * @typedef {TransitionCanvas}
 * @extends {HTMLCanvasElement}
 */
class TransitionCanvas extends HTMLCanvasElement {
  static observedattributes = ["sfx"];
  constructor() {
    super();

    this.style.width = "100%";
    this.style.height = "100%";
    this.style.position = "fixed";
    this.style.left = 0;
    this.style.top = 0;
    this.style.pointerEvents = "none";
    // some arbitrarily high index. If we need to we can place objects over the canvas.
    this.style.zIndex = "100";

    // audio
    this.inSfx = new Audio();
  }

  /**
   * Upon connection, check the duration of the transition, an important parameter for the animations.
   * Also, add an optional sound effect upon transition (WIP).
   * @date 6/3/2023 - 12:06:00 PM
   */
  connectedCallback() {
    this.after(this.inSfx);
    // sound effect
    if (this.hasAttribute("sfx")) {
      this.inSfx.src = this.getAttribute("sfx");
    }

    // Transition
    this.duration = this.hasAttribute("duration")
      ? this.getAttribute("duration")
      : 500;
    this.fadeIntoViewAnim(true);
  }

  /**
   * If the sfx attribute were to be changed viaa script, this lifecycle callback
   * will change the sfx of the audio element linked to this transition-canvas.
   * Convenient for development using this canvas.
   * @date 6/3/2023 - 1:23:09 PM
   *
   * @param {*} attribute
   * @param {*} previousValue
   * @param {*} currentValue
   */
  attributeChangedCallback(attribute, previousValue, currentValue) {
    if ((attribute = "sfx")) {
      this.inSfx.src = currentValue;
    }
  }

  /**
   * Initiates the transition in animation. This plays immediately upon the canvas being connected
   * to the DOM.
   * @date 6/3/2023 - 12:07:54 PM
   */
  transitionIn() {
    // TODO
    const pen = this.getContext("2d");
    pen.clearRect(0, 0, this.width, this.height);
    pen.fillStyle = "black";
    pen.fillRect(0, 0, 100, 100);
    this.fadeIntoViewAnim(false);
  }

  /**
   * Definition for the animation of starting from a black screen and slowly lightening up to reveal the rest of the scene.
   * @date 6/3/2023 - 12:08:56 PM
   */
  fadeIntoViewAnim(firstFrameOnly) {
    let start, previousTimestamp;
    let duration = this.duration;
    let canvas = this;
    let width = this.width;
    let height = this.height;
    function step(timestamp) {
      if (start === undefined) {
        start = timestamp;
      }

      const elapsed = timestamp - start;
      if (previousTimestamp != timestamp) {
        // ANIMATE!
        const opacity = 1 - elapsed / duration;
        let pen = canvas.getContext("2d");
        pen.clearRect(0, 0, width, height);
        pen.fillStyle = `rgba(0, 0, 0, ${opacity})`;
        pen.fillRect(0, 0, width, height);
      }

      if (!firstFrameOnly && elapsed < duration) {
        window.requestAnimationFrame(step);
      }
    }
    window.requestAnimationFrame(step);
  }

  transitionOut() {
    // TODO
  }
}

customElements.define("transition-canvas", TransitionCanvas, {
  extends: "canvas",
});
