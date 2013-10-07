/*globals define, module */

(function (globals) {
    'use strict';

    var hasOwnProperty = Object.prototype.hasOwnProperty,

    messages = {
        noValue: 'No value',
        keyExists: 'Key exists',
        mustBeString: 'Key type must be string'
    },

    keys = Object.keys || function (object) {
        var count = 0, key;

        for (key in object) {
            if (hasOwnProperty.call(object, key)) {
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

        this.size = size;
        this.has = has;
        this.get = get;
        this.set = set;
        this.remove = remove;
        this.clear = clear;
        this.forEach = forEach;
        this.safeGet = safeGet;
        this.safeSet = safeSet;
        this.safeRemove = safeRemove;

        // Public method size
        //
        // Returns the number of items in the map.
        function size () {
            return keys(map).length + (proto.isSet ? 1 : 0);
        }

        // Public method `has`.
        //
        // Returns a boolean indicating whether `key` is in the map.
        function has (key) {
            checkKeyIsString(key);
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
            checkKeyIsString(key);
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
            checkKeyIsString(key);
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
            checkKeyIsString(key);
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
            remove('__proto__');
        }

        // Public method forEach
        //
        // Iterates over items in the map, calling `callback(key, value)`
        // for each item.
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

        // Public method `safeGet`.
        //
        // Throwing version of `get`. No default value can be specified and,
        // if `key` is not in the map, an Error will be thrown.
        function safeGet (key) {
            checkKeyIsString(key);
            if (hasnt(key)) {
                throwKeyError(messages.noValue, key);
            }

            return get(key);
        }

        function hasnt (key) {
            checkKeyIsString(key);
            return has(key) === false;
        }

        // Public method `safeSet`.
        //
        // Throwing version of `set`. If `key` is already in the map, an
        // Error will be thrown.
        function safeSet (key, value) {
            checkKeyIsString(key);
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
            checkKeyIsString(key);
            if (hasnt(key)) {
                throwKeyError(messages.noValue, key);
            }

            remove(key);
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

    function checkKeyIsString(arg1) {
        if (typeof arg1 !== 'string') {
            throwKeyError(messages.mustBeString, arg1);
        }
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

