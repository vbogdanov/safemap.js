/*globals define, module */

(function (globals) {
    'use strict';

    var hasOwnProperty = Object.prototype.hasOwnProperty;

    // Object `SafeMap`.
    //
    // A tiny, safe-for-all-property-names
    // map/dictionary implementation.
    function SafeMap () {
        // TODO: Support initial properties (cloned, not by-reference).
        var __proto__ = {
            isSet: false
        },

        map = {};

        // Public method `get`.
        //
        // Returns the value associated with `key`, if `key` is in the map.
        // If `key` is not in the map, returns `defaultValue` (i.e. returns
        // `undefined` if no defaultValue argument is provided by the caller).
        this.get = function (key, defaultValue) {
            if (key === '__proto__') {
                return __proto__.value;
            }

            if (this.has(key)) {
                return map[key];
            }

            return defaultValue;
        };

        // Public method `set`.
        //
        // Sets a value to be associated with `key`, over-writing any former
        // value that may have been set for `key`.
        this.set = function (key, value) {
            if (key === '__proto__') {
                __proto__.isSet = true;
                __proto__.value = value;
            } else {
                map[key] = value;
            }
        };

        // Public method `has`.
        //
        // Returns a boolean indicating whether `key` is in the map.
        this.has = function (key) {
            if (key === '__proto__') {
                return __proto__.isSet;
            }

            return hasOwnProperty.call(map, key);
        };

        // Public method `remove`.
        //
        // Removes `key` from the map.
        this.remove = function (key) {
            if (key === '__proto__') {
                __proto__.isSet = false;
            } else {
                delete map[key];
            }
        };

        // Public method `clear`.
        //
        // Removes all keys from the map.
        this.clear = function () {
            map = {};
        };

        // Public method `safeGet`.
        //
        // Throwing version of `get`. No default value can be specified and,
        // if `key` is not in the map, an Error will be thrown.
        this.safeGet = function (key) {
            if (this.has(key)) {
                return map[key];
            }

            throw new Error('No value for key `' + key + '`');
        };

        // Public method `safeSet`.
        //
        // Throwing version of `set`. If `key` is already in the map, an
        // Error will be thrown.
        this.safeSet = function (key, value) {
            if (this.has(key)) {
                throw new Error('Value exists for key `' + key + '`');
            }

            map[key] = value;
        };

        // Public method `safeRemove`.
        //
        // Throwing version of `remove`. If `key` is not in the map, an
        // Error will be thrown.
        this.safeRemove = function (key) {
            if (this.has(key)) {
                delete map[key];
                return;
            }

            throw new Error('No value for key `' + key + '`');
        };
    }

    if (typeof define === 'function' && define.amd) {
        define(function () {
            return SafeMap;
        });
    } else if (typeof module === 'object' || module !== null) {
        module.exports = SafeMap;
    } else {
        globals.SafeMap = SafeMap;
    }
}(this));

