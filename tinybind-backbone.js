/* global define: true */
(function (root, factory) {
    'use strict';
    if (typeof exports === 'object') {
        // CommonJS
        factory(require('tinybind'), require('backbone'));
    } else if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['tinybind', 'backbone'], factory);
    } else {
        // Browser globals
        factory(root.tinybind, root.Backbone);
    }
})
(this, function (tinybind, Backbone) {
    'use strict';

    var Model = Backbone.Model,
        Collection = Backbone.Collection;

    /**
     * @param {Model}  model
     * @param {String} keypath
     * @param {*}      [value]
     *
     * @returns {*}
     */
    function getterSetter(obj, keypath, value) {
        if (!(obj instanceof Model) && !(obj instanceof Collection)) {
            return;
        }

        if (arguments.length === 3) {
            if (keypath === '*') {
                // setting all attributes
                // value should be an Object
                obj.set(value);
                return;
            }
            // setting the only attribute
            obj.set(keypath, value);
            return;
        }

        if (keypath === '*') {
            // all attributes
            value = obj.attributes;
        } else if (keypath === '') {
            // self
            value = obj
        } else {
            // one attribute
            value = obj.get(keypath);
        }

        return value;
    }

    /**
     * @param {String} action on or off
     * @returns {Function}
     */
    function onOffFactory(action) {

        /**
         * @param {obj}    obj
         * @param {String}   keypath
         * @param {Function} callback
         */
        return function (obj, keypath, callback) {
            if (!(obj instanceof Model) && !(obj instanceof Collection)) {
                return;
            }

            var value = keypath ? obj.get(keypath): obj;

            if (obj instanceof Model) {
              var eventName = 'change' + (keypath === '*' ? '' : (':' + keypath));
              obj[action](eventName, callback.sync, callback);
            }

            if (value instanceof Collection) {
                value[action]('add remove reset sort', callback.sync, callback);
            }
        };
    }

    // Configure tinybind data-bind for Backbone.js
    tinybind.adapters[':'] = {
        observe: onOffFactory('on'),
        unobserve: onOffFactory('off'),
        get: getterSetter,
        set: getterSetter
    };

    return tinybind;
});
