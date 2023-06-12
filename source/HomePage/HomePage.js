/**
 * @module Homepage
 * @name module:Homepage
 * @description The module serves as a landing page for title, and feature selection.
 * User is greeted with an slightly obnoxious bell to set the mood.
 * Then, user may choose to enter Horoscope module or TarotCard module.
 * @see {@link module:Horoscope}, {@link module:TarotCard}
 * @author ByteBrokers
 * Final: DO NOT ALTER
 */
window.addEventListener("load", function () {
  let transCanv = document.querySelector(`canvas[is="transition-canvas"]`);
  let titlecard = document.getElementById("title-card");

  function enter() {
    transCanv.transitionIn();
    titlecard.style.display = "none";
    transCanv.playSfx();
  }

  if (this.localStorage.getItem("returnedHome") != null) {
    enter();
    this.localStorage.removeItem("returnedHome");
    return;
  }
  titlecard.addEventListener("click", function () {
    enter();
  });
});
