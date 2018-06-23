# tinybind Backbone Adapter

Backbone.js adapter for tinybind.js data-bind with nested models and collections support.

## Features

 * Nested models support 
   * `rv-each-item="model:subModel:subSubModel:collection"`
 * `*`-keypaths (attributes accessor) 
   * `rv-value="model:* | json"` 
   * `rv-text="model.format < :*"`

[See example](http://blikblum.github.io/tinybind-backbone-adapter/example/index.html) and [code](example/index.html)
