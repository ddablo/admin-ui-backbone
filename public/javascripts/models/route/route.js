// router
var DocumentRouter = Backbone.Router.extend({
    routes:{
        'contents': 'contents',
        'places': 'places',
        'myApps': 'myapps',
        'mainView/:viewId': 'mainView',
        'detailsView/:tabId': 'detailsView',
        'places/:tabId': 'placesView',
        'model/:login': 'modelView'
    },
    contents:function(){
        // render contents to main view here
    },
    places:function(){
       // render places to main view here
    },
    myapps:function(){

    },
    mainView:function(viewId){
        alert(viewId);
        eventAgg.trigger('route:mainViewChange',viewId);
    },
    detailsView:function(tabId){
        detailsModel.set('selectedTab',tabId);
        eventAgg.trigger('route:detailsViewChange',tabId);
    },
    placesView:function(tabId){

    },
    modelView:function(){

    }
})

var router = new DocumentRouter();
Backbone.history.start();
router.navigate('contents',{trigger:true});
