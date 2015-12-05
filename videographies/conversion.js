$(document).ready(function(){
//NOW TURN CALL NUMBERS INTO PROPER LINKS!
  //create variable for regular expression that finds all call numbers
  var callNumberSearch = new RegExp(/([vV]ideo\/C|DVD|v\/c|sound\/d|s\/d)(\s?)(x|z|(999)?)\s?:?(\s?)(\d{1,4})/ig);
  //turn DOM into array so you can iterate over it
  var elems = document.getElementsByTagName('dd');
  //convert NodeList to an Array
  var elemArray = jQuery.makeArray(elems);
  //for each tag, grab element's HTML so you can replace call numbers with new html
  //iterate the code for each <dd> to find all call numbers
  $.each(elemArray,function(){
    //create variable for current node's html
    var html = $(this).html();
    //Search for call number using regex and turn result into usable variable
    //test if there was a match before attempting the rest. this saves from erroring out if no match.
    if (html.match(callNumberSearch)){
      var callNumbersArray = html.match(callNumberSearch);
      //callNumber is smooshing the array into string. we need to perform this business below for EACH element
      //tried to do .each, but it didn't work properly. Take a closer look at how array is formed
      console.log(callNumbersArray);
      //the tricky part may be putting it BACK into the DOM after doing the work on each bit.
      //Look closer at Array.prototype.join() for building the array back up and returning to DOM after iterating
      var callNumber = html.match(callNumberSearch).toString();
      //Swap out that slash for %2F so the Video/C call numbers work in query Url
      var callNumberReplace1 = callNumber.replace('/', '%2F');
      //Swap out the space for a + for the same reasons
      var callNumberReplace2 = callNumberReplace1.replace(' ', '+');
      //Concatenate into URL
      var callNumberUrl = 'http://oskicat.berkeley.edu/search~S1?/e' + callNumberReplace2;
      //create replacement element with proper linking
      var newElem = '<a href="' + callNumberUrl + '">' + callNumber + '</a>';
      //first parameter searches for match, second parameter is a string that replaces it
      //$& inserts the matched text
      //THE URL NEEDS TO BE ENCODED SO THE SPACE BECOMES A PLUS SIGN
      //THIS WILL BE IN FUNCTION THAT IS LOOPED OVER FOR EACH <dd> using toArray.each()
      $(this).html(html.replace(callNumberSearch, newElem));
    }
  });

  //use jQuery to add metadata then copy chrome's HTML interpretation from devtools to get tidied HTML to boot.
  $('dl').each(function(i){ //each <dt> will look up the dom for previous header elements so they can be added to the <dt>'s metadata
      //LINTED HTML turned everything into individual lists so now we search using <dl> as base element.
      for (var i = 0 ; i <=3 ; i++){ //loop through h1 - h3 elements using i variable to increment header size
          var upToEl = 'h' + i; //selector argument for prevUntil()
          var returnEl = 'h' + ( i + 1 ); //filter argument for prevUntil()
          var metaAdd = $(this).prevUntil( upToEl , returnEl ).slice( 0 , 1 ).text(); //limit text added to only the closest header element
          if(metaAdd){ //check if there is a value to add so extra unique strings don't clutter
              $(this).append( '<td>' + metaAdd + '</td>' ); //add header and unique string for future delimiter sort
          }
      }
  });

//Transform LISTS into TABLES for eventual export
  $('dl').replaceWith(function(){
    return $("<tr />", {html: $(this).html()});
  });
  $('dt').replaceWith(function(){
    return $("<td />", {html: $(this).html()});
  });
  $('dd').replaceWith(function(){
    return $("<td />", {html: $(this).html()});
  });
});

