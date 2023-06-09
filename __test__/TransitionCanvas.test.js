/**
 * @jest-environment jsdom
 */

const {
  TransitionCanvas,
} = require("../source/TransitionCanvas/TransitionCanvas");

describe("general transition-canvas behavior", () => {
  let canvas, pen;
  beforeAll(() => {
    canvas = document.createElement("canvas", { is: "transition-canvas" });
    canvas.setAttribute("anim", "huguboogo");
    document.body.appendChild(canvas);
    pen = canvas.getContext("2d");
  });

  it("should be appended to the body", () => {
    expect(canvas.parentElement.nodeName).toEqual("BODY");
  });

  it("should have the appropriate properties", (done) => {
    window.addEventListener("load", () => {
      try {
        expect(canvas.duration).toBe(500);
        expect(canvas.inSfx.nodeName).toBe("AUDIO");
        expect(canvas.inSfx.src).toBe("");
        done();
      } catch (error) {
        done(error);
      }
    });
  });

  it("should match the width of its parent", () => {
    expect(canvas.clientWidth).toEqual(document.body.clientWidth);
    expect(canvas.clientHeight).toEqual(document.body.clientHeight);
  });

  it("should change the sfx source if the attribute is changed", () => {
    canvas.setAttribute("sfx", "./source/assets/somesound.mp3");
    expect(canvas.inSfx.src).toBe(
      "http://localhost/source/assets/somesound.mp3"
    );
  });

  it("should have the default animation", () => {
    expect(canvas.transitionAnim).toBe(canvas.fadeIn);
  });

  it("should play animations without error", function onEnd(done) {
    canvas.addEventListener("animationEnded", (animDetails) => {
      canvas.removeEventListener("animationEnded", onEnd);
      try {
        if (!animDetails.detail.firstFrame) {
          // console.log(animDetails.detail);
          expect(animDetails.detail.elapsed).toBeGreaterThanOrEqual(
            animDetails.detail.duration
          );
        }
        done();
      } catch (error) {
        done(error);
      }
    });
    canvas.transitionIn();
  });
});
