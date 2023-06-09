/**
 * @module TransitionCanvas
 */

/**
 * An extension of the canvas with extra functionality for playing animations.
 * The canvas covers the entire block it is contained in; it is intended to play
 * between transitions of "states" for that block element in the DOM.
 * @date 6/3/2023 - 12:07:15 PM
 * @extends {HTMLCanvasElement}
 */
export class TransitionCanvas extends HTMLCanvasElement {
  static get observedAttributes() {
    return ["sfx"];
  }

  /**
   * Creates an instance of TransitionCanvas and creates a reference
   * to the audio element.
   * @date 6/8/2023 - 10:00:18 PM
   *
   * @constructor
   */
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

    // status
    this.status = this.STATUS.START;
  }

  STATUS = {
    START: 1,
    PLAYING: 2,
    PAUSED: 3,
    END: 4,
  };

  /**
   * Upon attaching the element to the DOM, determine the duration of the transition from the attached attribute.
   * Also, assign the linked audio element its source based on the sfx attribute. Finally,
   * play only the first frame of the animation, so that something can appear on the screen.
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
          console.error("This animation doesn't exist, defaulting to fadeIn");
          this.transitionAnim = this.fadeIn;
      }
    }
    this.playAnim(this.hasAttribute("manualtrig"));
  }

  /**
   * If the sfx attribute were to be changed via script, this lifecycle callback
   * will change the sfx of the audio element linked to this transition-canvas.
   * Convenient for development using this canvas.
   * @date 6/3/2023 - 1:23:09 PM
   * @param {String} attribute the attribute modified
   * @param {String} previousValue the value of the attribute before modification
   * @param {String} currentValue the value that the attribute was just set to
   */
  attributeChangedCallback(attribute, previousValue, currentValue) {
    if (attribute == "sfx") {
      this.inSfx.src = currentValue;
    }
  }

  /**
   * Induces the linked audio element to play the referenced sound effect.
   * @date 6/8/2023 - 10:04:19 PM
   */
  playSfx() {
    this.inSfx.play();
  }

  /**
   * Initiates the transition in animation. This plays immediately upon the canvas being connected
   * to the DOM.
   * @date 6/3/2023 - 12:07:54 PM
   */
  transitionIn() {
    this.status = this.STATUS.PLAYING;
    this.playAnim(false);
  }

  /**
   * Generic animation player.
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
      } else if (canvas.status != canvas.STATUS.END) {
        // The canvas status doubles as a marker for whether we've dispatched the event already.
        // Without this check, there could be remaining animation requests on the queue, causing the
        // event to be sent multiple times.
        const animEndEvent = new CustomEvent("animationEnded", {
          bubbles: true,
          detail: {
            firstFrame: firstFrameOnly,
            elapsed: elapsed,
            duration: canvas.duration,
          },
        });
        canvas.status = canvas.STATUS.END;
        canvas.dispatchEvent(animEndEvent);
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
