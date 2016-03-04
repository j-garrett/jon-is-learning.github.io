var urlInput = $('#dencoder');
$("input").focus(function(){
    var $this=$(this);
    $this.select();
    $this.mouseup(function(){
        $this.unbind('mouseup');
        return false;
    });
});
urlInput.change(function(){
    var newValue = urlInput.val();
    newValue = newValue.replace('http://librarysurvey.berkeley.edu/librarysurvey/library.survey.logic?refUrl=','');
    newValue = newValue.replace(/\+/g,' ');
    $('#output').val(decodeURIComponent(newValue));
})