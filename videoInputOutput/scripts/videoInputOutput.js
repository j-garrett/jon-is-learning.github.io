$(document).ready(function(){
    $('form').on('submit',function(event){
        event.preventDefault();
        $.ajax('../videoInputOutput.html/videoOutput', {
            type:'POST',
            dataType: 'json',
            data: $('form').serialize,
            success: function(result){
                alert(result);
            },
            contentType: 'application/json'
        })
    })
})