var Letter = function(value) {
  this.value = value;
  this.isGuessed = false;
};

Letter.prototype.showValue = function() {
  if (this.isGuessed === true) {
    return this.value;
  } else {
    return "_";
  }
};

Letter.prototype.updateValue = function(char) {
  if (this.value === char) {
    this.isGuessed = true;
  }
};

module.exports = Letter;
