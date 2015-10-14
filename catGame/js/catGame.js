//create catGame object to constrain scope (Global Abatement described in JS: the Good Parts)
var catGame = {};
//create catGame properties & methods:

//track the cuteness modifier
catGame.cuteness = 0;

//track and display remaining game time with this variable.
catGame.gameTimer = 0;

//track prey divs created and caught
catGame.preyCreated = 0;
catGame.preyKilled = 0;

//method to start the game. may have to nest other functions and whatnot inside?
catGame.startGame = function(event){
    //fade out settings modal
    $(elModalBackLayer).fadeOut(50);
    //LOAD THAT GAME responsive like now DELAY KEEPS FROM OVERLAPPING
    $(elCatGameContainer).delay(50).fadeIn(100);
    //Load game variables from user's input
    elplayerNameOutput.textContent = elPlayerNameInput.value;
    elUserCat.style.background = elCatColorChoice.value;
    //change value string to number
    var timerSet = Number($(elGameLength).val());
    //push variables to game settings
    elTimer.textContent = timerSet;

    //set interval needs to be named so it can be cleared at end
    var timerCounter = setInterval(timerIncrement,1000);
    //countdown to end of game function.
    function timerIncrement(){
        //check if time remains
        if(timerSet > 0){
            timerSet -= 1;
        }else{//if no time remains...
            clearInterval(timerCounter);
        }
        //update the displayed time
        elTimer.textContent = timerSet;
    }
};

//timing event that sets interval and calls the appropriate functions each second.
//appropriate functions: decrement gameTimer, chance to poach, add prey divs to HTML, etc.
catGame.timer = function(){};

//controls the playing field. adding the divs and animations to make the hunting more... interesting.
catGame.mapField = function(){};


//WORK WITH HTML PAGE:
//set DOM variables
var elModalBackLayer = document.getElementById('modalBackLayer2');
var elSettingsModal = document.getElementById('settingsModal');
//Will need another modal set up for game results... LATER-->
var elPlayerNameInput = document.getElementById('playerNameInput');
var elGameLength = document.getElementById('gameLength');
var elCatColorChoice = document.getElementById('catColorChoice');
//Cat choice function needs to be implemented.
//var elCatChoice = document.getElementById('catChoices');
var elStartButton = document.getElementById('startGameButton');
var elCatGameContainer = document.getElementById('catGameContainer');
var elUserCat = document.getElementById('userCat');
var elCutenessLevel = document.getElementById('cutenessLevel');
var elplayerNameOutput = document.getElementById('playerNameOutput');
var elcatChoiceName = document.getElementById('catChoiceName');
var elTimer = document.getElementById('timer');
var elKillCounter = document.getElementById('killCounter');
var successfulKills = 0;
var elCatGameField = document.getElementById('catGameField');
var elHungtingField = document.getElementById('huntingField');



//etc.

//add event listeners to DOM
//Compare the below event listener with the method used on codepen http://codepen.io/jon-is-learning/pen/xwgpXd?editors=001
//the Hunt and Kill Mice code pen puts listener on parent element as listener. is this better?
$(document).ready(function(){
    $(elModalBackLayer).fadeIn(100);
    $(elSettingsModal).fadeIn(250);
    console.log(successfulKills);
});
elStartButton.addEventListener("click", catGame.startGame, false);

//add prey divs to playing field!
function addDiv(){
    var newDiv = document.createElement('div');

    var parentDiv = elHungtingField;
    divCoordinates();
    //check CSS is setup to accept prey divs!
    newDiv.classList.add('hiddenPrey');
    newDiv.style.position = 'absolute';
    newDiv.style.top = yCoord+'px';
    newDiv.style.left = xCoord+'px';
    parentDiv.appendChild(newDiv);
};
//prey divs start wiggling on hover
//prey divs turn red and fadeOut when clicked
//if there are less than 4 prey divs on screen the addDiv() runs.
//check number of prey divs every second

//functions for finding prey!

//add mouseover event listener to parent div
elHungtingField.addEventListener("mouseover", spotPrey, false);
elHungtingField.addEventListener("click", killPrey, false);
function spotPrey(e){
    //element must be child of parent and NOT parent
    if (e.target !== e.currentTarget){
        var target = event.target;
        //add animated CSS to element that was activated
        //(so DON'T have other elements that could be accidentally activated)
        target.classList.add("foundPrey");
        //only give players 5 seconds to catch prey before it's gone
        $(target).delay(4000).fadeOut(1000);
    }
    e.stopPropagation();
}
function killPrey(e){
    //element must be child of parent and NOT parent
    if (e.target !== e.currentTarget){
        var target = event.target;
        //change background to bloody horror
        target.classList.add("caughtPrey");
        //remove wiggling... the prey will wiggle no more
        target.classList.remove("foundPrey");
        //This fadeOut is conflicting with the one from spotPrey. LOOK INTO
        $(target).fadeOut(500);
        successfulKills += 1;
        elKillCounter.textContent = successfulKills;
    }
    e.stopPropagation();
}