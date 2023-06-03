class TransitionCanvas extends HTMLCanvasElement {
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
  }

  connectedCallback() {
    this.duration = this.hasAttribute("duration")
      ? this.getAttribute("duration")
      : 500;
    this.transitionIn();
  }

  transitionIn() {
    // TODO
    const pen = this.getContext("2d");
    pen.clearRect(0, 0, this.width, this.height);
    pen.fillStyle = "black";
    pen.fillRect(0, 0, 100, 100);
    this.fadeIntoViewAnim();
  }

  fadeIntoViewAnim() {
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

      if (elapsed < duration) {
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
