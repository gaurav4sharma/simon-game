var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
clickNumber = -1;
var level = 0;

Array.prototype.equals = function (array) {
    if (!array)
        return false;

    if (this.length != array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        if (this[i] instanceof Array && array[i] instanceof Array) {
            if (!this[i].equals(array[i]))
                return false;
        }
        else if (this[i] != array[i]) {
            return false;
        }
    }
    return true;
}

$('.btn').click(function() {
  userClickedPattern.push($(this).attr("id"));
  console.log(userClickedPattern);
  playSound($(this).attr("id"));
  gotClicked($(this).attr("id"));
  clickNumber++;
  checkAnswer();
});

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function gotClicked(name) {
  $('#' + name).addClass('pressed');

  setTimeout(function () {
    $("#" + name).removeClass("pressed");
  }, 100);
}

function checkThroughRound () {
  if (!(gamePattern[clickNumber] == userClickedPattern[clickNumber])) {
    $('#level-title').text('Game Over, Press Any Key to Start Over');
    $('body').addClass('game-over');
    level = -1;
  }
}

function checkAnswer () {
 if (userClickedPattern.length == level) {

    if (userClickedPattern.equals(gamePattern)) {
      setTimeout(nextSequence, 1000);
    } else {
      $('#level-title').text('Game Over, Press Any Key to Start Over');
      $('body').addClass('game-over');
      level = -1;
    }
    userClickedPattern = [];
    clickNumber = -1;
} else checkThroughRound();

}

function nextSequence()  {
  var randomNumber = Math.floor(Math.random()*4);
  var randomColor = buttonColors[randomNumber];
  gamePattern.push(randomColor);
  playSound(randomColor);
  $('#' + randomColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  level++;
  $('#level-title').text('Level ' + level);
}


$(document).keypress(function(){
  if (level == -1) {
    gamePattern = [];
    level++;
    $('body').removeClass('game-over');
  }

  if (level == 0) {
    userClickedPattern = [];
    clickNumber = -1;
    nextSequence();
  }
});
