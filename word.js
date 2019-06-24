var Letter = require("./letter.js");

var Word = function(word) {
  this.letterArr = [];
  for (var i = 0; i < word.length; i++) {
    this.letterArr.push(new Letter(word.charAt(i)));
  }
};

Word.prototype.toString = function() {
  var letters = [];
  for (var i = 0; i < this.letterArr.length; i++) {
    letters.push(this.letterArr[i].showValue());
  }

  return letters.join("");
};

Word.prototype.updateGuessed = function(char) {
  for (var i = 0; i < this.letterArr.length; i++) {
    this.letterArr[i].updateValue(char);
  }
};

module.exports = Word;
