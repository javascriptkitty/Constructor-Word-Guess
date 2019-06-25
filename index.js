var Word = require("./word.js");
var inquirer = require("inquirer");

var categories = {
  animals: [
    "antilope",
    "kangaroo",
    "rooster",
    "octopus",
    "ostrich",
    "squirrel",
    "capybara",
    "hedgehog"
  ],
  food: [
    "cheesecake",
    "gingerbread",
    "dumplings",
    "marshmellow",
    "sandwich",
    "spaghetti",
    "fondue",
    "guacamole"
  ],
  at_the_beach: [
    "surfboard",
    "swimsuit",
    "sunglasses",
    "sunscreen",
    "sandcastle",
    "seagull",
    "seashells",
    "umbrella"
  ],
  vehicles: [
    "airplane",
    "motorcycle",
    "subway",
    "carriage",
    "skateboard",
    "helicopter",
    "scooter",
    "canoe"
  ]
};

function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

var randomWord;
var newWord;
var guessesLeft;

function reset() {
  guessesLeft = 12;

  return inquirer
    .prompt({
      type: "list",
      name: "usersChoice",
      message: "Choose a category!",
      choices: ["animals", "food", "at_the_beach", "vehicles"]
    })
    .then(function(getCategory) {
      var usersChoice = categories[getCategory.usersChoice];
      randomWord = getRandom(usersChoice);
      newWord = new Word(randomWord);
    })
    .then(askUser);
}

function askUser() {
  if (guessesLeft > 0) {
    return inquirer
      .prompt({
        type: "input",
        name: "usersGuess",
        message: "Guess a letter!",
        validate: function validateInput(name) {
          return name.length == 1;
        }
      })
      .then(function(guess) {
        guess = guess.usersGuess.toLowerCase();
        if (randomWord.indexOf(guess) != -1) {
          newWord.updateGuessed(guess);
          var newWordStr = newWord.toString();
          console.log("\n" + newWordStr + "\n");
          if (newWordStr.indexOf("_") == -1) {
            console.log("You got it right! Nexst word! \n");
            return reset();
          } else {
            console.log("CORRECT! \n");
          }
        } else {
          console.log("INCORRECT! \n");
          guessesLeft = guessesLeft - 1;
          console.log(newWord.toString() + "\n");
          console.log(guessesLeft + " guesses remaining! \n");
        }

        return askUser();
      });
  } else {
    console.log("YOU LOST! THE WORD IS " + randomWord + "\n");
    inquirer
      .prompt({
        type: "confirm",
        name: "playAgain",
        message: "Would you like to play again?"
      })
      .then(function(answer) {
        if (answer.playAgain) {
          reset();
        }
      });
  }
}
reset();
