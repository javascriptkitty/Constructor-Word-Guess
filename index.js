var Word = require("./word.js");
var inquirer = require("inquirer");

var categories = {
  animals: [
    "antelope"
    // "kangaroo",
    // "rooster",
    // "octopus",
    // "ostrich",
    // "squirrel",
    // "capybara",
    // "hedgehog"
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
var count = 0;
var guessesLeft;
var randomWord;

function reset() {
  count = 0;
  guessesLeft = 12;
  randomWord = "word";

  inquirer
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

var askUser = function() {
  if (guessesLeft > 0) {
    return inquirer
      .prompt({
        type: "input",
        name: "usersGuess",
        message: "Guess a letter!",
        validate: function validateInput(name) {
          return name !== "";
        }
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
        return askUser();
      });
  } else {
    console.log("YOU LOST! THE WORD IS " + randomWord);
  }
};

reset();
