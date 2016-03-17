define([
    "presenter",
    "text!./BasicTemplate.html"
], function(Presenter, template) {
    
    return Presenter.extend({
        template: template
    });

})