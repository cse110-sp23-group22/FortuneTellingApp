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

    // audio
    this.inSfx = new Audio();

    // custom transition
    this.transitionAnim = this.fadeIn;
  }

  /**
   * Upon connection, check the duration of the transition, an important parameter for the animations.
   * Also, add an optional sound effect upon transition (WIP).
   * @date 6/3/2023 - 12:06:00 PM
   */
  connectedCallback() {
    this.width = this.clientWidth;
    this.height = this.clientHeight;
    this.after(this.inSfx);
    // sound effect
    if (this.hasAttribute("sfx")) {
      this.inSfx.src = this.getAttribute("sfx");
    }

    // Transition
    this.duration = this.hasAttribute("duration")
      ? this.getAttribute("duration")
      : 500;

    if (this.hasAttribute("anim")) {
      const chosenAnim = this.getAttribute("anim");
      switch (chosenAnim) {
        case "fadein":
          this.transitionAnim = this.fadeIn;
          break;
        default:
          this.transitionAnim = this.fadeIn;
      }
    }
    this.playAnim(this.hasAttribute("manualtrig"));
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
    if (attribute == "sfx") {
      this.inSfx.src = currentValue;
    }
  }

  playSfx() {
    this.inSfx.play();
  }

  /**
   * Initiates the transition in animation. This plays immediately upon the canvas being connected
   * to the DOM.
   * @date 6/3/2023 - 12:07:54 PM
   */
  transitionIn() {
    this.playAnim(false);
  }

  /**
   * generic animation player.
   * @date 6/3/2023 - 12:08:56 PM
   */
  playAnim(firstFrameOnly) {
    let start, previousTimestamp;
    let canvas = this;
    function step(timestamp) {
      if (start === undefined) {
        start = timestamp;
      }

      const elapsed = timestamp - start;
      if (previousTimestamp != timestamp) {
        // ANIMATE!
        const framedata = {
          canvas: canvas,
          elapsed: elapsed,
        };
        canvas.transitionAnim(framedata);
      }

      if (!firstFrameOnly && elapsed < canvas.duration) {
        window.requestAnimationFrame(step);
      }
    }
    window.requestAnimationFrame(step);
  }

  /**
   * Animation for fading from black to the full scene
   * @date 6/3/2023 - 2:43:31 PM
   *
   * @param {*} fd frame data contains time elapsed from animation start and gives access to the canvas
   */
  fadeIn(fd) {
    let pen = fd.canvas.getContext("2d");
    pen.clearRect(0, 0, fd.canvas.width, fd.canvas.height);

    const opacity = 1 - fd.elapsed / fd.canvas.duration;
    pen.fillStyle = `rgba(0 0 0 / ${opacity})`;
    pen.fillRect(0, 0, fd.canvas.width, fd.canvas.height);
  }
}

customElements.define("transition-canvas", TransitionCanvas, {
  extends: "canvas",
});
