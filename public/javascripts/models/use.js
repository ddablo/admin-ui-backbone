// Sets the use.js configuration for your application
use: {

    backbone: {
        deps: ["use!underscore", "jquery"],
            attach: "Backbone"  //attaches "Backbone" to the window object
    },

    underscore: {
        attach: "_" //attaches "_" to the window object
    }

} // end Use.js Configuration