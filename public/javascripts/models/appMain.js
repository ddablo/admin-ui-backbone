// main app
var eventAgg = _.extend({},Backbone.Events);
var MainApp = Backbone.Model.extend({});
var MainAppView = Backbone.View.extend({
    tagName:'div',
    className:'clearAll',
    render:function(){

        var mainMenuTemplate = $('#mainMenuTemplate').html();
        var mainLayoutTemplate = $('#mainLayoutTemplate').html();
        var modelTemplate = $('#modelTemplate').html();

        this.$el.append(_.template(mainMenuTemplate,{}));
        this.$el.append(_.template(mainLayoutTemplate,{}));
        this.$el.append(_.template(modelTemplate,{}));

        return this;
    }
})

var appView = new MainAppView({
    model:new MainApp()
})

$('body').prepend(appView.render().el);



/***** render user(authentication) views *****/
// user model
var user = new User();
// quickUserView
var userQuickView = new UserQuicView({
    model:user
});
// formView
var loginFormView = new LoginModelView({
    el:$('.loginView'),
    model:user
})

// render to index
$('.quickUserView').html(userQuickView.render().el);

loginFormView.render();

/***** render the left list view *****/
// models
var items = [
    new ListItem({
        content:'Headers',
        state:'nav-header'
    }),

    new ListItem({
        content:'places',
        state:'active'
    }),
    new ListItem({
        content:'events'
    }),
    new ListItem({
        content:'settings'
    })
];

// views
var list = new List({
    items:items
});
// create listView
var listView = new ListView({
    model:list
});

$('.leftMainMenu').append(listView.render().el);

/***** render detailsView view *****/
var detailsModel = new DetailsLayoutModel({
    selectedTab:'places'
})

var detailsLayoutView = new DetailsLayoutView({
    model:detailsModel
});
$('.detailsView').html(detailsLayoutView.render().el);