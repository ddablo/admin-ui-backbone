// backbone models
var List = Backbone.Model.extend({});
var ListItem = Backbone.Model.extend({
    state:''
});

// backbone views
var ListView = Backbone.View.extend({
    tagName: 'ul',
    className: 'nav nav-list',
    initialize:function(){
        eventAgg.on('leftList:selectionChange',function(selectedModel){
           this.$el.find('li').removeClass('active');
        },this);
    },
    render: function(){
        this.populateItems();
        return this;
    },

    populateItems: function(){
        // get all listItems
        var items = this.model.get('items');
        // loop over all items
        var $el = this.$el;
        _(items).each(function(item){
            // create a view for each item
            var itemView = new ListItemView({
                model:item,
                className:item.get('state')
            });
            // render ItemView to list
            $el.append(itemView.render().el);
        });

    }
});

var ListItemView = Backbone.View.extend({
    tagName:'li',
    events:{
        'click':'onClick'
    },

    // functions
    render: function(){
        this.setContent();
        return this;
    },

    setContent: function(){
        // use template, get template by id
        var template = $('#linkTemplate').html();
        // create template data
        var data = {
            title:this.model.get('content'),
            href:this.model.get('content')
        };

        this.$el.html(_.template(template,data));
    },

    onClick:function(){
        //this.model.set('state','active');
        eventAgg.trigger('leftList:selectionChange',this.model);
        this.$el.addClass('active');
    }

});
