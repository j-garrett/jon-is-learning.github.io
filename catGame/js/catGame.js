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
catGame.startGame = function(){};

//timing event that sets interval and calls the appropriate functions each second.
//appropriate functions: decrement gameTimer, chance to poach, add prey divs to HTML, etc.
catGame.timer = function(){};

//controls the playing field. adding the divs and animations to make the hunting more... interesting.
catGame.mapField = function(){};