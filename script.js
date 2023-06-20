let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;
let score = 0;

$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").on("click", function (event){
  userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

checkAnswer = (currentLevel) => {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    score = Number.parseInt(score);
    
    $("#level-title").fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    $("#level-title").html(
      "Score: " + (score - 1) + "<br>Game Over<br>Press Any Key to Restart"
    );
    startOver();
  }
};

function nextSequence() {
  userClickedPattern = [];
  level++;
  score++;
  $("#level-title").text("Level " + level);
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);
}

playSound = (name) => {
  let sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
};

animatePress = (currentColour) => {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
};

startOver = () => {
  level = 0;
  score = 0;
  gamePattern = [];
  started = false;
}
