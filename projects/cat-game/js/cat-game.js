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
    event.preventDefault();
    //form validation. look for truthy values then run function if all found
    //should this validation be a separate function? may make easier to reuse...
    if ( $(elGameLength).val() && elPlayerNameInput.value){
        elGameLength.classList.remove('goodHighlight','badHighlight');
        elPlayerNameInput.classList.remove('goodHighlight','badHighlight');
        //fade out settings modal
        $(elModalBackLayer).fadeOut(500);
        //LOAD THAT GAME responsive like now DELAY KEEPS FROM OVERLAPPING
        $(elCatGameContainer).delay(500).fadeIn(1000);
        //Load game variables from user's input
        elplayerNameOutput.textContent = (elPlayerNameInput.value +" is " || "You are ");
        elUserCat.style.background = elCatColorChoice.value;
        //change value string to number
        var timerSet = (Number($(elGameLength).val()) || 45);
        //push variables to game settings
        elTimer.textContent = timerSet;
        //can't have two setIntervals so we will use a counter to decide if we add divs
        var addDivsTimer = 0;

        //countdown to end of game function.
        //set interval needs to be named so it can be cleared at end
        var timerCounter = setInterval(function(){
            //increment addDivsTimer to see if it's time to add divs
            addDivsTimer +=1;
            //check if time remains
            if(timerSet > 0){
                    //if addDivsTimer has reached a number divisible by 3 (i.e. 3 seconds have passed)
                    //then it is time to...
                    if( addDivsTimer%3 === 0 ){
                        //remove Previous prey divs
                        removePrey();
                        //call addDiv function to add prey to map!
                        addDivs(3);
                    }
                //decrement timer if time remains
                timerSet -= 1;

            }else{//if no time remains...
                clearInterval(timerCounter);
                $(elHungtingField).hide();
                $('#gameResults').html("<h1>Sand Cat "+ elPlayerNameInput.value+' caught '+successfulKills+" mice!</h1><h2><a href=\"../cat-game\">Play Again</a></h2>");
                $('#gameResults').fadeIn();
            }
            //update the displayed time
            elTimer.textContent = timerSet;
        },1000);


    }else{
        //check with parts of the form are failing the above check and highlight ALL elements accordingly
        elGameLength.classList.add( elGameLength.value ? 'goodHighlight' : 'badHighlight');
        elPlayerNameInput.classList.add( elPlayerNameInput.value ? 'goodHighlight' : 'badHighlight');
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
    $(elModalBackLayer).fadeIn(1000);
    $(elSettingsModal).fadeIn(2500);
    console.log(successfulKills);
});

//add event listener to button
elStartButton.addEventListener("click", catGame.startGame, false);



//add prey divs to playing field!
function addDivs(amount){
    //pulls given amount and creates that many divs by looping through process
    for(amount;amount>0;amount--){
        catGame.preyCreated += 1;
        var newDiv = document.createElement('div');
        newDiv.classList.add('prey','hiddenPrey');
        var parentDiv = elHungtingField;
        divCoordinates();
        //check CSS is setup to accept prey divs!
        newDiv.style.top = yCoord+'px';
        newDiv.style.left = xCoord+'px';
        parentDiv.appendChild(newDiv);
    }
};


function divCoordinates(){
    var windowHeight = document.documentElement.clientHeight;
    var windowWidth = document.documentElement.clientWidth;
    var heightModifier = ((Math.floor(Math.random() * 81))*.01);
    var widthModifier = ((Math.floor(Math.random() * 81))*.01);
    yCoord = windowHeight * heightModifier;
    xCoord = windowWidth * widthModifier;
    return yCoord;
    return xCoord;
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
        var target = e.target;
        target.classList.remove("hiddenPrey");
        //add animated CSS to element that was activated
        //(so DON'T have other elements that could be accidentally activated)
        target.classList.add("foundPrey");
        //only give players 5 seconds to catch prey before it's gone
        //do above comment with CSS animation
    }
    e.stopPropagation();
}
function killPrey(e){
    //element must be child of parent and NOT parent
    if (e.target !== e.currentTarget){
        var target = e.target;
        //remove other classes to avoid confusion!
        //remove wiggling... the prey will wiggle no more
        target.classList.remove('hiddenPrey');
        target.classList.remove("foundPrey");
        //This fadeOut is conflicting with the one from spotPrey. LOOK INTO
        //$(target).fadeOut(500);
        //going to use CSS animation to transform to display:none
        //change background to bloody horror
        target.classList.add("caughtPrey");
        successfulKills += 1;
        elKillCounter.textContent = successfulKills;
    }
    e.stopPropagation();
}
//the CSS is hiding divs, but they can still be interacted with! GET THEM GONE
function removePrey(){
    console.log('removePrey is called');
    $('.prey').addClass('divsToRemove');
    $('.prey').removeClass('prey');
    $('.divsToRemove').fadeOut();
    $('.divsToRemove').delay(1500).remove('.divsToRemove');
}
