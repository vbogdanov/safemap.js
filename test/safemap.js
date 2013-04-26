'use strict';

var assert = require('chai').assert,
    path = '../src/safemap';

suite('no setup:', function () {
    test('require does not throw', function () {
        assert.doesNotThrow(function () {
            require(path);
        });
    });

    test('require returns function', function () {
        assert.isFunction(require(path));
    });
});

suite('require:', function () {
    var SafeMap;

    setup(function () {
        SafeMap = require(path);
    });

    teardown(function () {
        SafeMap = undefined;
    });

    test('instantiation with new does not throw', function () {
        assert.doesNotThrow(function () {
            new SafeMap;
        });
    });

    test('instantiation with new returns object', function () {
        assert.isObject(new SafeMap);
    });

    suite('new:', function () {
        var safemap;

        setup(function () {
            safemap = new SafeMap;
        });

        teardown(function () {
            safemap = undefined;
        });

        test('get method exists', function () {
            assert.isFunction(safemap.get);
        });

        test('set method exists', function () {
            assert.isFunction(safemap.set);
        });

        test('has method exists', function () {
            assert.isFunction(safemap.has);
        });

        test('remove method exists', function () {
            assert.isFunction(safemap.remove);
        });

        test('clear method exists', function () {
            assert.isFunction(safemap.clear);
        });

        test('safeGet method exists', function () {
            assert.isFunction(safemap.safeGet);
        });

        test('safeSet method exists', function () {
            assert.isFunction(safemap.safeSet);
        });

        test('safeRemove method exists', function () {
            assert.isFunction(safemap.safeRemove);
        });
    });
});

