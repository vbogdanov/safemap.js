// A tiny, safe-for-all-property-names map/dictionary implementation in JavaScript.

/*globals define, module */

(function (globals) {
    'use strict';

    var functions = {
        get: get,
        set: set,
        has: has,
        // Opted for `remove` rather than the WeakMap-like `delete`
        // to ease burden on callers in ES3 environments.
        remove: remove,
        clear: clear,
        safeGet: safeGet,
        safeSet: safeSet,
        safeRemove: safeRemove
    };

    // Public function `get`.
    //
    // Returns the value associated with `key`, if `key` is in the map.
    // If `key` is not in the map, returns `defaultValue` (i.e. returns
    // `undefined` if no defaultValue argument is provided by the caller).
    function get (key, defaultValue) {
    }

    // Public function `set`.
    //
    // Sets a value to be associated with `key`, over-writing any former
    // value that may have been set for `key`.
    function set (key, value) {
    }

    // Public function `has`.
    //
    // Returns a boolean indicating whether `key` is in the map.
    function has (key) {
    }

    // Public function `remove`.
    //
    // Removes `key` from the map.
    function remove (key) {
    }

    // Public function `clear`.
    //
    // Removes all keys from the map.
    function clear () {
    }

    // Public function `safeGet`.
    //
    // Throwing version of `get`. No default value can be specified and,
    // if `key` is not in the map, an Error will be thrown.
    function safeGet (key) {
    }

    // Public function `safeSet`.
    //
    // Throwing version of `set`. If `key` is already in the map, an
    // Error will be thrown.
    function safeSet (key, value) {
    }

    // Public function `safeRemove`.
    //
    // Throwing version of `remove`. If `key` is not in the map, an
    // Error will be thrown.
    function safeRemove (key) {
    }

    exportFunctions();

    function exportFunctions () {
        if (typeof define === 'function' && define.amd) {
            define(function () {
                return functions;
            });
        } else if (typeof module === 'object' || module !== null) {
            module.exports = functions;
        } else {
            globals.check = functions;
        }
    }
}(this));

