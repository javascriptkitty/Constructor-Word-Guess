var Word = require("./word.js");
var inquirer = require("inquirer");

var guessesLeft = 12;
var randomWord = "word";
var newWord = new Word(randomWord);

var count = 0;
var askUser = function() {
  if (count < 12) {
    inquirer
      .prompt({
        type: "input",
        name: "usersGuess",
        message: "Guess a letter!"
      })
      .then(function(guess) {
        if (randomWord.indexOf(guess.usersGuess) != -1) {
          newWord.updateGuessed(guess.usersGuess);
          var newWordStr = newWord.toString();
          console.log(newWordStr);
          if (newWordStr.indexOf("_") == -1) {
            console.log("You got it right! Next word!");
            reset();
          } else {
            console.log("CORRECT!");
          }
        } else {
          console.log("INCORRECT!");
          guessesLeft = guessesLeft - 1;
          console.log(newWord.toString());
          console.log(guessesLeft + " guesses remaining!");
        }
        count++;
        askUser();
      });
  } else {
    console.log("YOU LOST! THE WORD IS " + randomWord);
  }
};

askUser();
