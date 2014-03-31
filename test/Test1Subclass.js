define([
    "./Test1"
], function(Test1) {

    return Test1.extend({
        init: function() {
            this.super();
            console.log("Hello World from Child!");
        }

    })

})