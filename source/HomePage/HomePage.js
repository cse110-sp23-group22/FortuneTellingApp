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
  titlecard.addEventListener("click", function () {
    transCanv.transitionIn();
    titlecard.style.display = "none";
    transCanv.playSfx();
  });

  // PREVENTS NORMAL LINK BEHAVIOR
  // If there is a bug with links not working, it may be tracable to this.
  /**
   * @event click
   * @description Upon clicking one of the three links, the page is transitioned.
   */
  document.addEventListener("click", function (event) {
    let transCanv = document.querySelector(`canvas[is="transition-canvas"]`);
    let elWithLink = event.target;
    while (elWithLink && !elWithLink.href) {
      elWithLink = elWithLink.parentNode;
    }

    if (elWithLink) {
      // TODO: intercept clicks and play transCanv animation first before exiting
      if (transCanv === undefined) {
        return;
      }
    }
  });

  /**
   * Event listener to end animation.
   */
  transCanv.addEventListener("animationEnded", () => {
    console.log("animation ended.");
  });
});
