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
        var proto = {
            isSet: false
        },

        map = {};

        this.has = has;
        this.get = get;
        this.set = set;
        this.remove = remove;
        this.clear = clear;
        this.safeGet = safeGet;
        this.safeSet = safeSet;
        this.safeRemove = safeRemove;

        // Public method `has`.
        //
        // Returns a boolean indicating whether `key` is in the map.
        function has (key) {
            if (isProto(key)) {
                return proto.isSet;
            }

            return hasOwnProperty.call(map, key);
        }

        // Public method `get`.
        //
        // Returns the value associated with `key`, if `key` is in the map.
        // If `key` is not in the map, returns `defaultValue` (i.e. returns
        // `undefined` if no defaultValue argument is provided by the caller).
        function get (key, defaultValue) {
            if (isProto(key)) {
                return proto.value;
            }

            if (has(key)) {
                return map[key];
            }

            return defaultValue;
        }

        // Public method `set`.
        //
        // Sets a value to be associated with `key`, over-writing any former
        // value that may have been set for `key`.
        function set (key, value) {
            if (isProto(key)) {
                proto.isSet = true;
                proto.value = value;
            } else {
                map[key] = value;
            }
        }

        // Public method `remove`.
        //
        // Removes `key` from the map.
        function remove (key) {
            if (isProto(key)) {
                proto.isSet = false;
                delete proto.value;
            } else {
                delete map[key];
            }
        }

        // Public method `clear`.
        //
        // Removes all keys from the map.
        function clear () {
            map = {};
        }

        // Public method `safeGet`.
        //
        // Throwing version of `get`. No default value can be specified and,
        // if `key` is not in the map, an Error will be thrown.
        function safeGet (key) {
            if (hasnt(key)) {
                throw new Error('No value for key `' + key + '`');
            }

            return get(key);
        }

        function hasnt (key) {
            return has(key) === false;
        }

        // Public method `safeSet`.
        //
        // Throwing version of `set`. If `key` is already in the map, an
        // Error will be thrown.
        function safeSet (key, value) {
            if (has(key)) {
                throw new Error('Value exists for key `' + key + '`');
            }

            set(key, value);
        }

        // Public method `safeRemove`.
        //
        // Throwing version of `remove`. If `key` is not in the map, an
        // Error will be thrown.
        function safeRemove (key) {
            if (hasnt(key)) {
                throw new Error('No value for key `' + key + '`');
            }

            remove(key);
        }
    }

    function isProto (key) {
        return key === '__proto__';
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

