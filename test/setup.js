var _ = require('underscore')
var Backbone = require('backbone')

global._ = _
global.Backbone = Backbone

var jsdom;

before(function () {
  jsdom = require('jsdom-global')()
  Backbone.$ = global.$ = require('jquery')(window)
});

after(function () {
  jsdom()
})
