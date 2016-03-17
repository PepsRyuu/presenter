presenter.js
=========

Simple presenter class that can be extended and can load CSS and templates.

## Example Usage

```
define([
    "presenter",
    "text!./MyModule.html",
    "text!./MyModule.css"
], function(Presenter, template, style) {
    
    return Presenter.extend({
        template: template,
        style: style,

        init: function(options) {
            this.el.textContent = options.message;
        }

    });

});
```

```
var instance = new MyModule({
    message: "Hello World!"
});
instance.attach(document.body);
```