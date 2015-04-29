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
    //twitter share button
    !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');