define([
    "presenter",
    "text!./Test1.html",
    "text!./Test1.css"
], function(Presenter, template, style) {

    return Presenter.extend({

        template: template,
        style: style,

        init: function() {
            console.log("Hello World!");
        }

    })

})