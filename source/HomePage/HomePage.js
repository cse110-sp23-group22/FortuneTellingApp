window.addEventListener("load", function () {
  let transCanv = document.querySelector(`canvas[is="transition-canvas"]`);
  let titlecard = document.getElementById("title-card");
  titlecard.addEventListener("click", function (event) {
    transCanv.transitionIn();
    titlecard.style.display = "none";
    transCanv.playSfx();
  });

  // PREVENTS NORMAL LINK BEHAVIOR
  // If there is a bug with links not working, it may be tracable to this.
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
});
