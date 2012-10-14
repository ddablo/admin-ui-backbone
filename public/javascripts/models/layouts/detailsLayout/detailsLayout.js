var DetailsLayoutModel = Backbone.Model.extend({
    selectedTab:'places'
});

var DetailsLayoutView = Backbone.View.extend({
    tagName:'div',
    initialize:function(){
        this.model.bind('change',this.render,this);
    },
    render:function(){
        var selectedTabName = this.model.get('selectedTab');
        var template = $('#'+selectedTabName).html();
        // get dataHere
        var data = {};

        this.$el.html(_.template(template,data));
        return this;
    },
    modelChange:function(){
        alert('');
        this.render();
    }
})
