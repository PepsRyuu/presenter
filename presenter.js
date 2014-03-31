define(function() {

    var Presenter = function(options, container) {
        this.options = options;
        container.appendChild(this._renderTemplate(this.template));
        this._renderStyle(this.style);
        if (this.init) {
            this.init(options);
        }
    }

    Presenter.prototype = {

        _renderTemplate: function(template) {
            this.el = document.createElement("div");
            if (template) {
                this.el.innerHTML = template;
            }
            return this.el;
        },

        _renderStyle: function(style) {
            if (style && this.constructor.prototype.__style__ === undefined) {
                var styletag = document.createElement("style");
                styletag.textContent = style;
                this.constructor.prototype.__style__ = styletag;
                document.head.appendChild(styletag);
            }
        }

    };

    Presenter.extend = function(subobj) {
        var __extended = function() {
            Presenter.apply(this, arguments);
        }
        __extended.prototype = {};

        for (var prop in this.prototype) {
            __extended.prototype[prop] = this.prototype[prop];
        }

        for (var prop in subobj) {
            if (__extended.prototype[prop]) {
                __extended.prototype[prop] = (function(parentFn, childFn) {
                    return function() {
                        this.super = parentFn;
                        return childFn.apply(this, arguments);
                    }
                })(__extended.prototype[prop], subobj[prop])
            } else {
                __extended.prototype[prop] = subobj[prop];
            }
        }

        __extended.extend = Presenter.extend;
        return __extended;
    }

    return Presenter;

});