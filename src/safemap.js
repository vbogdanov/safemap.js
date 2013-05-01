/*globals define, module */

(function (globals) {
    /*jshint nomen:false */

    'use strict';

    var hasOwnProperty = Object.prototype.hasOwnProperty,

    messages = {
        noValue: 'No value',
        keyExists: 'Key exists'
    };

    // Object `SafeMap`.
    //
    // A tiny, safe, ES3-compliant map/dictionary implementation.
    function SafeMap () {
        // TODO: Support initial properties (cloned, not by-reference).
        var self = this instanceof SafeMap ? this : new SafeMap(),

        proto = {
            isSet: false
        },

        map = {};

        self._SafeMap__getImplementation = getImplementation;
        self._SafeMap__getProtoState = getProtoState;

        return self;

        function getImplementation () {
            return map;
        }

        function getProtoState () {
            return proto;
        }
    }

    // Public method `has`.
    //
    // Returns a boolean indicating whether `key` is in the map.
    SafeMap.prototype.has = function has (key) {
        if (isProto(key)) {
            return isProtoSet(this);
        }

        return hasValue(this, key);
    };

    function isProtoSet (self) {
        return getProtoState(self).isSet;
    }

    function getProtoState (self) {
        return self._SafeMap__getProtoState();
    }

    function hasValue(self, key) {
        return hasOwnProperty.call(getMap(self), key);
    }

    function getMap (self) {
        return self._SafeMap__getImplementation();
    }

    // Public method `get`.
    //
    // Returns the value associated with `key`, if `key` is in the map.
    // If `key` is not in the map, returns `defaultValue` (i.e. returns
    // `undefined` if no defaultValue argument is provided by the caller).
    SafeMap.prototype.get = function (key, defaultValue) {
        if (isProto(key)) {
            return getProtoValue(this);
        }

        if (this.has(key)) {
            return getValue(this, key);
        }

        return defaultValue;
    };

    function getProtoValue (self) {
        return getProtoState(self).value;
    }

    function getValue (self, key) {
        return getMap(self)[key];
    }

    // Public method `set`.
    //
    // Sets a value to be associated with `key`, over-writing any former
    // value that may have been set for `key`.
    SafeMap.prototype.set = function (key, value) {
        if (isProto(key)) {
            setProtoValue(this, value);
        } else {
            setValue(this, key, value);
        }
    };

    function setProtoValue (self, value) {
        var proto = getProtoState(self);

        proto.isSet = true;
        proto.value = value;
    }

    function setValue (self, key, value) {
        getMap(self)[key] = value;
    }

    // Public method `remove`.
    //
    // Removes `key` from the map.
    SafeMap.prototype.remove = function (key) {
        if (isProto(key)) {
            deleteProtoValue(this);
        } else {
            deleteValue(this, key);
        }
    };

    function deleteProtoValue (self) {
        var proto = getProtoState(self);

        proto.isSet = false;
        delete proto.value;
    }

    function deleteValue (self, key) {
        delete getMap(self)[key];
    }

    // Public method `clear`.
    //
    // Removes all keys from the map.
    SafeMap.prototype.clear = function () {
        clearValues(this);
    };

    function clearValues (self) {
        var map = getMap(self), key;

        for (key in map) {
            if (hasOwnProperty.call(map, key)) {
                delete map[key];
            }
        }
    }

    // Public method `safeGet`.
    //
    // Throwing version of `get`. No default value can be specified and,
    // if `key` is not in the map, an Error will be thrown.
    SafeMap.prototype.safeGet = function (key) {
        if (hasnt(this, key)) {
            throwKeyError(messages.noValue, key);
        }

        return this.get(key);
    };

   function hasnt (self, key) {
        return self.has(key) === false;
    }

    // Public method `safeSet`.
    //
    // Throwing version of `set`. If `key` is already in the map, an
    // Error will be thrown.
    SafeMap.prototype.safeSet = function (key, value) {
        if (this.has(key)) {
            throwKeyError(messages.keyExists, key);
        }

        this.set(key, value);
    };

    // Public method `safeRemove`.
    //
    // Throwing version of `remove`. If `key` is not in the map, an
    // Error will be thrown.
    SafeMap.prototype.safeRemove = function (key) {
        if (hasnt(this, key)) {
            throwKeyError(messages.noValue, key);
        }

        this.remove(key);
    };

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
    } else if (typeof module === 'object' || module !== null) {
        module.exports = SafeMap;
    } else {
        globals.SafeMap = SafeMap;
    }
}(this));

