/*globals define, module */

(function (globals) {
    'use strict';

    var hasOwnProperty = Object.prototype.hasOwnProperty;

    // Object `SafeMap`.
    //
    // A tiny, safe-for-all-property-names
    // map/dictionary implementation.
    function SafeMap () {
        var map = {};

        // Public method `get`.
        //
        // Returns the value associated with `key`, if `key` is in the map.
        // If `key` is not in the map, returns `defaultValue` (i.e. returns
        // `undefined` if no defaultValue argument is provided by the caller).
        this.get = function (key, defaultValue) {
        }

        // Public method `set`.
        //
        // Sets a value to be associated with `key`, over-writing any former
        // value that may have been set for `key`.
        this.set = function (key, value) {
        }

        // Public method `has`.
        //
        // Returns a boolean indicating whether `key` is in the map.
        this.has = function (key) {
        }

        // Public method `remove`.
        //
        // Removes `key` from the map.
        this.remove = function (key) {
        }

        // Public method `clear`.
        //
        // Removes all keys from the map.
        this.clear = function () {
        }

        // Public method `safeGet`.
        //
        // Throwing version of `get`. No default value can be specified and,
        // if `key` is not in the map, an Error will be thrown.
        this.safeGet = function (key) {
        }

        // Public method `safeSet`.
        //
        // Throwing version of `set`. If `key` is already in the map, an
        // Error will be thrown.
        this.safeSet = function (key, value) {
        }

        // Public method `safeRemove`.
        //
        // Throwing version of `remove`. If `key` is not in the map, an
        // Error will be thrown.
        this.safeRemove = function (key) {
        }
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

