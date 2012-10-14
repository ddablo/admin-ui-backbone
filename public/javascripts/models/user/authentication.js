/**
 * Created with JetBrains WebStorm.
 * User: farin99
 * Date: 10/13/12
 * Time: 2:02 AM
 * To change this template use File | Settings | File Templates.
 */
// user model
var User = Backbone.Model.extend({
    authenticated:false,
    login:function(userName,pass){
        var form = $('form[name=login]')
        var model = this;
        $.post(form.attr('action'), form.serialize(), function(res){
            // Do something with the response `res`
            if(res.id){
                // update model
                model.set('userName',res.userName);
                model.set('authenticated', 'true');
                // raise event
                model.trigger('authenticated:true');
            }
            // Don't forget to hide the loading indicator!
        });

    }
})

// quick user view
var UserQuicView = Backbone.View.extend({
    tagName: 'a',

    initialize:function(){
        this.model.on('authenticated:true',this.render,this);
    },

    render:function(){
        this.setContent();
        return this;
    },

    setContent:function(){
        // cheack if auth
        this.$el.html(this.getTemplate());
    },

    getTemplate:function(){
        var template;
        if(!this.model.get('authenticated'))
            template = $('#quickUserNotLogin').html();
        else
            template = $('#quickUserLogin').html();
        // create template data
        var data = {
            userName:this.model.get('userName')
        };

        return  _.template(template,data);
    }
})

// login model view
LoginModelView = Backbone.View.extend({
    initialize:function(){
        this.model.on('authenticated:true',this.hideForm,this);
    },
    events:{
        'click .modelOk': 'handelClick'
    },

    render:function(){
        var template = $('#loginForm').html();
        var data = {};

        $('.loginViewForm').html(_.template(template,data));
        return this;
    },

    handelClick:function(){
        this.model.login();
    },

    hideForm:function(){
        $('#myModal').modal('hide')
    }

})

