require(["jquery","user/authentication"], function($, user)
{
    $(document).ready(function(){
        // save to server
        user.user.save({},{
            success: function(res){
        //        alert(res.id);
            },
            error: function(){ alert('error')}
        });

    })

});
