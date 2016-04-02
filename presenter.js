/**
 * Simple presenter class that provides loading for templates and styles.
 *
 * @class Presenter
 */
define(function() {

    var renderTemplate = function(template) {
        if (template) {
            var fragment = document.createElement("div");
            fragment.innerHTML = template;
            this.el = fragment.childNodes[0];
        } else {
            this.el = document.createElement("div");
        }

        return this.el;
    };

    var renderStyle = function(style) {
        if (style && this.constructor.prototype.__style__ === undefined) {
            var styletag = document.createElement("style");
            styletag.textContent = style;
            this.constructor.prototype.__style__ = styletag;
            document.head.appendChild(styletag);
        }
    };

    var Presenter = function(options) {
        renderStyle.call(this, this.style);
        renderTemplate.call(this, this.template);
        this.init(options);
    }

    /**
     * Called when the "new" operator is used. 
     * Passes the constructor options as an argument.
     *
     * @method init
     * @param {Object} options
     */
    Presenter.prototype.init = function() {

    };

    /**
     * Attaches this presenter to the specified container.
     *
     * @method attach
     * @param {HTMLElement} container
     */
    Presenter.prototype.attach = function(container) {
        container.appendChild(this.el);
    };

    /**
     * Removes this presenter from its parent.
     *
     * @method detach
     */
    Presenter.prototype.detach = function() {
        this.el.parentNode.removeChild(this.el);
    };

    /**
     * Creates a new presenter class extended with the specified properties.
     *
     * @method extend
     * @static
     * @param {Object} props
     */
    Presenter.extend = function(props) {
        var parent = this.prototype;
        var prototype = new function(){}

        for (var prop in parent) {
            prototype[prop] = parent[prop];
        }

        for (var prop in props) {
            if (prototype[prop]) {
                prototype[prop] = (function(parentFn, childFn) {
                    return function() {
                        this.super = parentFn;
                        return childFn.apply(this, arguments);
                    }
                })(prototype[prop], props[prop])
            } else {
                prototype[prop] = props[prop];
            }
        }

        function __extended() {
            Presenter.apply(this, arguments);
        }

        __extended.prototype = prototype;
        __extended.prototype.constructor = __extended;
        __extended.extend = arguments.callee;
        return __extended;
    }

    return Presenter;

});