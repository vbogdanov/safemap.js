/*globals define, module */

(function (globals) {
    'use strict';

    var hasOwnProperty = Object.prototype.hasOwnProperty,

    messages = {
        noValue: 'No value',
        keyExists: 'Key exists'
    };

    var keys = Object.keys || function (obj) {
        var count = 0;
        for (var key in obj) {
            if (hasOwnProperty.call(obj, key)) {
                count += 1;
            }
        }
        return count;
    };
    // Object `SafeMap`.
    //
    // A tiny, safe, ES3-compliant map/dictionary implementation.
    function SafeMap (initialValues) {
        var proto, map;

        if (this instanceof SafeMap === false) {
            return new SafeMap(initialValues);
        }

        proto = {
            isSet: false
        };

        map = {};

        if (typeof initialValues === 'object' && initialValues !== null) {
            initialiseMap(map, initialValues);
        }

        this.has = has;
        this.get = get;
        this.set = set;
        this.remove = remove;
        this.clear = clear;
        this.safeGet = safeGet;
        this.safeSet = safeSet;
        this.safeRemove = safeRemove;
        this.size = size;
        this.forEach = forEach;

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
            proto.isSet = false;
            delete proto.value;
        }

        // Public method `safeGet`.
        //
        // Throwing version of `get`. No default value can be specified and,
        // if `key` is not in the map, an Error will be thrown.
        function safeGet (key) {
            if (hasnt(key)) {
                throwKeyError(messages.noValue, key);
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
                throwKeyError(messages.keyExists, key);
            }

            set(key, value);
        }

        // Public method `safeRemove`.
        //
        // Throwing version of `remove`. If `key` is not in the map, an
        // Error will be thrown.
        function safeRemove (key) {
            if (hasnt(key)) {
                throwKeyError(messages.noValue, key);
            }

            remove(key);
        }

        //public method  forEach
        //
        // Iterates over the entries in the map
        // callback is passed 2 arguments - key and value - for each entry.
        // entry wit key '__proto__' is passed first if present
        // throws exception if passed an object that is not a function
        function forEach (callback) {
            if (typeof callback !== 'function') {
                throw new Error('Invalid Argument. function(key, value) is required, actual:' + callback);
            }
            if (proto.isSet) {
                callback('__proto__', proto.value);
            }
            for (var key in map) {
                if (hasOwnProperty.call(map, key)) {
                    callback(key, map[key]);
                }
            }
        }

        //public method  size
        //
        // displays the number of entries in the map.
        function size () {
            return keys(map).length + (proto.isSet? 1: 0);
        }
    }

    function initialiseMap (map, values) {
        var key;

        for (key in values) {
            if (hasOwnProperty.call(values, key)) {
                map[key] = values[key];
            }
        }
    }

    function isProto (key) {
        return key === '__proto__';
    }

    function throwKeyError (message, key) {
        throw new Error(message + ' for key `' + key + '`');
    }

    if (typeof define === 'function' && define.amd) {
        define(function () {
            return SafeMap;
        });
    } else if (typeof module !== 'undefined' && module !== null) {
        module.exports = SafeMap;
    } else {
        globals.SafeMap = SafeMap;
    }
}(this));

