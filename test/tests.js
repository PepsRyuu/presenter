var expect = chai.expect;

mocha.setup('bdd');

require.config({
    paths: {
        presenter: "../presenter"
    }
});

describe('Presenter', function() {
    it ("should load default <div> template if no template is provided", function(done) {
        require([
            "modules/default-template/DefaultTemplate"
        ], function(DefaultTemplate) {

            var instance = new DefaultTemplate();
            expect(instance.el.tagName.toLowerCase()).to.equal("div");
            expect(instance.el.textContent).to.equal("");
            done();

        })
    });

    it ("should load template if specified", function(done) {
        require([
            "modules/basic-template/BasicTemplate"
        ], function(BasicTemplate) {
            var instance = new BasicTemplate();
            expect(instance.el.tagName.toLowerCase()).to.equal("div");
            expect(instance.el.getAttribute("class")).to.equal("BasicTemplate");
            expect(instance.el.textContent).to.equal("BasicTemplate");
            done();
        })
    })

    it ("should load css if specified and should not be attached twice", function(done) {
        require([
            "modules/css-template/CSSTemplate",
            "text!modules/css-template/CSSTemplate.css"
        ], function(CSSTemplate, style) {
            var instance = new CSSTemplate();
            var instance2 = new CSSTemplate();
            var styleTags = document.querySelectorAll("style");
            var total = 0;

            [].forEach.call(styleTags, function(tag) {
                if (tag.textContent === style) {
                    total++;
                }
            });

            expect(total).to.equal(1);
            done();
        });
    });

    it ("should call the init method if defined", function(done) {
        require([
            "presenter"
        ], function(Presenter) {
            var called = false;
            var MyPresenter = Presenter.extend({
                init: function() {
                    called = true;
                }
            });

            var instance = new MyPresenter();
            expect(called).to.be.true;
            done();
        }); 
    });

    it ("init should receive options passed into constructor", function(done) {
        require([
            "presenter"
        ], function(Presenter) {
            var called = false;
            var MyPresenter = Presenter.extend({
                init: function(options) {
                    if (options.myprop) {
                        called = true;
                    }
                }
            });

            var instance = new MyPresenter({
                myprop: "myprop"
            });
            expect(called).to.be.true;
            done();
        }); 
    });

    it ("the attach() method should attach to the specified container", function(done) {
        require([
            "presenter"
        ], function(Presenter) {
            var MyPresenter = Presenter.extend({
                template: "<div class='MyPresenter'></div>"
            });

            var instance = new MyPresenter();

            var target = document.createElement("div");
            instance.attach(target);
            expect(target.childNodes[0]).to.equal(instance.el);
            done();
        });
    });

    it ("the detach() method removes the element", function(done) {
        require([
            "presenter"
        ], function(Presenter) {
            var MyPresenter = Presenter.extend({
                template: "<div class='MyPresenter'></div>"
            });

            var instance = new MyPresenter();

            var target = document.createElement("div");
            instance.attach(target);
            instance.detach();
            expect(target.childNodes[0]).to.be.undefined;
            done();
        });
    });

    it ("should be able to call super for extended classes", function(done) {
        require([
            "presenter"
        ], function(Presenter) {
            var parentTriggered = false;
            var childTriggered = false;

            var Parent = Presenter.extend({
                init: function() {
                    parentTriggered = true;
                }
            });

            var Child = Parent.extend({
                init: function() {
                    this.super();
                    childTriggered = true;
                }
            });

            var instance = new Child();
            expect(parentTriggered).to.be.true;
            expect(childTriggered).to.be.true;

            done();

        });
    });

    it ("methods which don't call super don't trigger parent method", function(done) {
        require([
            "presenter"
        ], function(Presenter) {
            var parentTriggered = false;
            var childTriggered = false;

            var Parent = Presenter.extend({
                init: function() {
                    parentTriggered = true;
                }
            });

            var Child = Parent.extend({
                init: function() {
                    childTriggered = true;
                }
            });

            var instance = new Child();
            expect(parentTriggered).to.be.false;
            expect(childTriggered).to.be.true;

            done();

        });
    });

    it ("this keyword still references the instance itself when executed inside method", function(done) {
        require([
            "presenter"
        ], function(Presenter) {
            var triggered = false;

            var MyPresenter = Presenter.extend({
                setTriggered: function() {
                    triggered = true;
                },

                myMethod: function() {
                    this.localVariable = true;
                    this.setTriggered();
                }
            })

            var instance = new MyPresenter();
            expect(triggered).to.be.false;
            instance.myMethod();
            expect(triggered).to.be.true;
            expect(instance.localVariable).to.be.true;
            done();
        })
    });

});

