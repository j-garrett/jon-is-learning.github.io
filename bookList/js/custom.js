    //navbar toggle collapse
    $('.nav a').click(function(){
        $('.nav-collapse').collapse('hide');
    });
    //read more read less function settings
    $('article').readmore({
        speed: 300,
        lessLink: '<a href="#"><em>...Read less</em></a>',
        moreLink: '<a href="#"><em>Read more...</em></a>'
    });
    //smooth scrolling for single page navigation
    $("a[href^='#']").on('click', function(e) {

       // prevent default anchor click behavior
       e.preventDefault();

       // store hash
       var hash = this.hash;

       // animate
       $('html, body').animate({
           scrollTop: $(hash).offset().top
         }, 1000, function(){

           // when done, add hash to url
           // (default click behaviour)
           window.location.hash = hash;
         });
    });