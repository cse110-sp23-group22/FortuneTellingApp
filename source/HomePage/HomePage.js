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
    event.preventDefault();
    let transitioner = new Transitioner();
    console.log(new URL(elWithLink.href).href);
    transitioner.seturl(new URL(elWithLink.href).href);
    transitioner.fadeBlackFadeIn(5);
    return;
  }
});

class Transitioner {
  constructor() {
    this.url = window.location.href;
  }

  seturl(url) {
    this.url = url;
  }

  /**
   * Fetches a page. Useful for obtaining page data for custom usage rather than
   * relying on the default behavior of loading a new page.
   * @date 5/31/2023 - 1:51:15 AM
   *
   * @async
   * @param {string} url
   * @returns {string}
   */
  async loadtext(url) {
    return (await fetch(url, { method: "GET" })).text();
  }

  async fadeBlackFadeIn(speed) {
    // history.pushState(null, null, this.url);
    const pagedata = await this.loadtext(this.url);
    // const response = await fetch(this.url, {method: "GET"});
    // const blob = await response.blob();
    // const bruh = URL.createObjectURL(blob);
    let wrapper = document.createElement('div');
    wrapper.innerHTML = pagedata;

    let newcontent = wrapper.querySelector('main');
    document.querySelector('main').innerHTML = newcontent.innerHTML;
  }
}
