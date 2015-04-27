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