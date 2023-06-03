// PREVENTS NORMAL LINK BEHAVIOR
// If there is a bug with links not working, it may be tracable to this.
document.addEventListener("click", function (event) {
  // If a link gets clicked, the target getting clicked may be a child of the
  // actual <a> element, so we check parents until we reach it.
  console.log("intercepted click on target " + event.target);
  let elWithLink = event.target;
  while (elWithLink && !elWithLink.href) {
    elWithLink = elWithLink.parentNode;
  }

  if (elWithLink) {
    // TODO: intercept clicks and play transCanv animation first before exiting
    let transCanv = document.querySelector(`canvas[is="transition-canvas]"`);
    if (transCanv === undefined) {
      return;
    }
  }
});

window.addEventListener("load", function () {
  let transCanv = document.querySelector(`canvas[is="transition-canvas"]`);
  console.log(transCanv);
  transCanv.transitionIn();
});
