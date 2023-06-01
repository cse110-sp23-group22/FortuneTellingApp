/**
 * Add simple event listener to continue button for Tarot Card Info Page
 * @class Tarot Card Questionnaire
 * @author Arjun Kumar, Ryan Lee, Byte Brokers
 */
document.getElementById("exitButton").addEventListener("click", function(event) {
  event.preventDefault();
  var name = document.getElementById("form1").elements[0].value;
  alert("Form 1 submitted!\nName: " + name);
});


