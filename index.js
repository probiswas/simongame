// definitions

const buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level=0;
var started=false;
// start-Of-The-Game
$(document).keypress(function(){
  if(!started)
  {
    $("h1").text("Level "+level);
    nextSequence();
    started=true; //keypress-will-deactivate-after-first-keypress
  }
});

$(".btn").click(function(){
  var selectedColor=$(this).attr("id");
  userClickedPattern.push(selectedColor);
  playSound(selectedColor);
  animatePress(selectedColor);
  checkAnswer(userClickedPattern.length-1);
});

// answer-checking

function checkAnswer(currentLevel){

  if(userClickedPattern[currentLevel]===gamePattern[currentLevel])
  {
    if(userClickedPattern.length===gamePattern.length)
    {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  }
  else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

      startOver();

  }
}

//adds random color to game sequence

function nextSequence()
{
  userClickedPattern=[];
  level++;
  $("h1").text("Level "+level);
  var randomNumber=Math.floor(Math.random()*4);
  var randomColor=buttonColors[randomNumber];
  gamePattern.push(randomColor);
  $("#"+randomColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomColor);
}

//plays sound of button color passed to it
function playSound(name) {
  var a = new Audio("sounds/"+name+".mp3");
  a.play();
}

//animates the button clicked by user

function animatePress(key){
  $("#"+key).addClass("pressed");
  setTimeout(function(){$("#"+key).removeClass("pressed");},100);
}

//restarts the whole game
function startOver()
{
  gamePattern=[];
  started=false;
  level=0;
}
