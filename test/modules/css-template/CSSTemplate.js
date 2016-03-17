define([
    "presenter",
    "text!./CSSTemplate.html",
    "text!./CSSTemplate.css"
], function(Presenter, template, style) {
    
    return Presenter.extend({

        template: template,
        style: style

    })

})