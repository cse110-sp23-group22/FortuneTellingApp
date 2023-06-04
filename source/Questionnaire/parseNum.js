function parseNum(string){
  return string.replace(new RegExp("[0-9]", "g"), "");    ///\D/g
};

function potato()
{
  return "Potato";
}

module.exports = {parseNum, potato};
