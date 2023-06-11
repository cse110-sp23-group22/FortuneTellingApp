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
