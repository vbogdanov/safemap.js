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

    test('instantiation without new does not throw', function () {
        assert.doesNotThrow(function () {
            SafeMap();
        });
    });

    test('instantiation with new returns object', function () {
        assert.isObject(new SafeMap);
    });

    test('instantiation without new returns object', function () {
        assert.isObject(SafeMap());
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

        test('get returns undefined', function () {
            assert.isUndefined(safemap.get('foo'));
        });

        test('get returns default value', function () {
            assert.strictEqual(safemap.get('foo', 'bar'), 'bar');
        });

        test('get undefined throws', function () {
            assert.throws(function () {
                safemap.get(undefined);
            });
        });

        test('get undefined throws regardless of default value', function () {
            assert.throws(function () {
                safemap.get(undefined, 'foo')
            });
        });

        test('get hasOwnProperty returns undefined', function () {
            assert.isUndefined(safemap.get('hasOwnProperty'));
        });

        test('get __proto__ returns undefined', function () {
            assert.isUndefined(safemap.get('__proto__'));
        });

        test('set method exists', function () {
            assert.isFunction(safemap.set);
        });

        test('set does not throw', function () {
            assert.doesNotThrow(function () {
                safemap.set('foo', 'bar');
            });
        });

        test('set undefined value does not throw', function () {
            assert.doesNotThrow(function () {
                safemap.set('foo', undefined);
            });
        });

        test('set undefined key throws', function () {
            assert.throws(function () {
                safemap.set(undefined, 'foo');
            });
        });

        test('set object key throws', function () {
            assert.throws(function () {
                safemap.set({}, 'foo');
            });
        });

        test('set null key throws', function () {
            assert.throws(function () {
                safemap.set(null, 'foo');
            });
        });

        test('set hasOwnProperty does not throw', function () {
            assert.doesNotThrow(function () {
                safemap.set('hasOwnProperty', 'foo');
            });
        });

        test('set __proto__ does not throw', function () {
            assert.doesNotThrow(function () {
                safemap.set('__proto__', 'foo');
            });
        });

        test('has method exists', function () {
            assert.isFunction(safemap.has);
        });

        test('has does not throw', function () {
            assert.doesNotThrow(function () {
                safemap.has('foo');
            });
        });

        test('has returns false', function () {
            assert.isFalse(safemap.has('foo'));
        });

        test('has undefined throws', function () {
            assert.throws(function () {
                safemap.has(undefined);
            });
        });

        test('has hasOwnProperty returns false', function () {
            assert.isFalse(safemap.has('hasOwnProperty'));
        });

        test('has __proto__ returns false', function () {
            assert.isFalse(safemap.has('__proto__'));
        });

        test('remove method exists', function () {
            assert.isFunction(safemap.remove);
        });

        test('remove does not throw', function () {
            assert.doesNotThrow(function () {
                safemap.remove('foo');
            });
        });

        test('remove undefined throws', function () {
            assert.throws(function () {
                safemap.remove(undefined);
            });
        });

        test('remove hasOwnProperty does not throw', function () {
            assert.doesNotThrow(function () {
                safemap.remove('hasOwnProperty');
            });
        });

        test('remove __proto__ does not throw', function () {
            assert.doesNotThrow(function () {
                safemap.remove('__proto__');
            });
        });

        test('clear method exists', function () {
            assert.isFunction(safemap.clear);
        });

        test('clear does not throw', function () {
            assert.doesNotThrow(function () {
                safemap.clear();
            });
        });

        test('safeGet method exists', function () {
            assert.isFunction(safemap.safeGet);
        });

        test('safeGet throws', function () {
            assert.throws(function () {
                safemap.safeGet('foo');
            });
        });

        test('safeGet hasOwnProperty throws', function () {
            assert.throws(function () {
                safemap.safeGet('hasOwnProperty');
            });
        });

        test('safeGet __proto__ throws', function () {
            assert.throws(function () {
                safemap.safeGet('__proto__');
            });
        });

        test('safeSet method exists', function () {
            assert.isFunction(safemap.safeSet);
        });

        test('safeSet does not throw', function () {
            assert.doesNotThrow(function () {
                safemap.safeSet('foo', 'bar');
            });
        });

        test('safeSet hasOwnProperty does not throw', function () {
            assert.doesNotThrow(function () {
                safemap.safeSet('hasOwnProperty', 'foo');
            });
        });

        test('safeSet __proto__ does not throw', function () {
            assert.doesNotThrow(function () {
                safemap.safeSet('__proto__', 'foo');
            });
        });

        test('safeRemove method exists', function () {
            assert.isFunction(safemap.safeRemove);
        });

        test('safeRemove throws', function () {
            assert.throws(function () {
                safemap.safeRemove('foo');
            });
        });

        test('safeRemove hasOwnProperty throws', function () {
            assert.throws(function () {
                safemap.safeRemove('hasOwnProperty');
            });
        });

        test('safeRemove __proto__ throws', function () {
            assert.throws(function () {
                safemap.safeRemove('__proto__');
            });
        });

        test('size method exists', function () {
            assert.isFunction(safemap.size);
        });

        test('size returns value 0', function () {
            assert.strictEqual(safemap.size(), 0);
        });

        test('forEach method exists', function () {
            assert.isFunction(safemap.forEach);
        });

        test('forEach with invalid arguments throws', function () {
            assert.throws(function () {
                safemap.forEach();
            });
            assert.throws(function () {
                safemap.forEach("not a function");
            });
        });

        test('forEach does not throw if function is passed', function () {
            assert.doesNotThrow(function () {
                safemap.forEach(function (key, value) {});
            });
        });

        suite('set:', function () {
            setup(function () {
                safemap.set('foo', 'bar');
            });

            test('has returns true', function () {
                assert.isTrue(safemap.has('foo'));
            });

            test('has returns false', function () {
                assert.isFalse(safemap.has('bar'));
            });

            test('get returns value', function () {
                assert.strictEqual(safemap.get('foo'), 'bar');
            });

            test('get returns default value', function () {
                assert.strictEqual(safemap.get('baz', 'qux'), 'qux');
            });

            test('set does not throw', function () {
                assert.doesNotThrow(function () {
                    safemap.set('foo', 'baz');
                });
            });

            test('safeGet does not throw', function () {
                assert.doesNotThrow(function () {
                    safemap.safeGet('foo');
                });
            });

            test('safeGet returns value', function () {
                assert.strictEqual(safemap.safeGet('foo'), 'bar');
            });

            test('safeGet throws', function () {
                assert.throws(function () {
                    safemap.safeGet('bar');
                });
            });

            test('safeSet throws', function () {
                assert.throws(function () {
                    safemap.safeSet('foo', 'bar');
                });
            });

            test('safeSet does not throw', function () {
                assert.doesNotThrow(function () {
                    safemap.safeSet('baz', 'qux');
                });
            });

            test('safeRemove does not throw', function () {
                assert.doesNotThrow(function () {
                    safemap.safeRemove('foo');
                });
            });

            test('safeRemove throws', function () {
                assert.throws(function () {
                    safemap.safeRemove('bar');
                });
            });

            test('size returns 1', function () {
                assert.strictEqual(safemap.size(), 1);
            });

            test('forEach invokes its argument once with key foo and value bar', function () {
                var callcount = 0;
                function callback (key, value) {
                    assert.strictEqual(key, 'foo');
                    assert.strictEqual(value, 'bar');
                    callcount += 1;
                }

                safemap.forEach(callback);

                assert.strictEqual(callcount, 1);
            });

            suite('set:', function () {
                setup(function () {
                    safemap.set('foo', 'baz');
                });

                test('has returns true', function () {
                    assert.isTrue(safemap.has('foo'));
                });

                test('get returns value', function () {
                    assert.strictEqual(safemap.get('foo', 'bar'), 'baz');
                });

                test('safeGet returns value', function () {
                    assert.strictEqual(safemap.safeGet('foo'), 'baz');
                });

                test('size returns 1', function () {
                    assert.strictEqual(safemap.size(), 1);
                });

                test('forEach invokes its argument once with key foo and value baz', function () {
                    var callcount = 0;
                    function callback (key, value) {
                        assert.strictEqual(key, 'foo');
                        assert.strictEqual(value, 'baz');
                        callcount += 1;
                    }

                    safemap.forEach(callback);

                    assert.strictEqual(callcount, 1);
                });

                suite('remove:', function () {
                    setup(function () {
                        safemap.remove('foo');
                    });

                    test('has returns false', function () {
                        assert.isFalse(safemap.has('foo'));
                    });

                    test('get returns undefined', function () {
                        assert.isUndefined(safemap.get('foo'));
                    });

                    test('safeGet throws', function () {
                        assert.throws(function () {
                            safemap.safeGet('foo');
                        });
                    });

                    test('safeSet does not throw', function () {
                        assert.doesNotThrow(function () {
                            safemap.safeSet('foo', 'bar');
                        });
                    });

                    test('safeRemove throws', function () {
                        assert.throws(function () {
                            safemap.safeRemove('foo');
                        });
                    });

                    test('size returns 0', function () {
                        assert.strictEqual(safemap.size(), 0);
                    });

                    test('forEach does not invoke the callback', function () {
                        var callcount = 0;
                        function callback (key, value) {
                            callcount += 1;
                        }

                        safemap.forEach(callback);

                        assert.strictEqual(callcount, 0);
                    });
                });

                suite('safeRemove:', function () {
                    setup(function () {
                        safemap.safeRemove('foo');
                    });

                    test('has returns false', function () {
                        assert.isFalse(safemap.has('foo'));
                    });

                    test('get returns undefined', function () {
                        assert.isUndefined(safemap.get('foo'));
                    });

                    test('safeGet throws', function () {
                        assert.throws(function () {
                            safemap.safeGet('foo');
                        });
                    });

                    test('safeSet does not throw', function () {
                        assert.doesNotThrow(function () {
                            safemap.safeSet('foo', 'bar');
                        });
                    });

                    test('safeRemove throws', function () {
                        assert.throws(function () {
                            safemap.safeRemove('foo');
                        });
                    });

                    test('size returns 0', function () {
                        assert.strictEqual(safemap.size(), 0);
                    });
                });

                suite('clear:', function () {
                    setup(function () {
                        safemap.clear();
                    });

                    test('has returns false', function () {
                        assert.isFalse(safemap.has('foo'));
                    });

                    test('get returns undefined', function () {
                        assert.isUndefined(safemap.get('foo'));
                    });

                    test('safeGet throws', function () {
                        assert.throws(function () {
                            safemap.safeGet('foo');
                        });
                    });

                    test('safeSet does not throw', function () {
                        assert.doesNotThrow(function () {
                            safemap.safeSet('foo', 'bar');
                        });
                    });

                    test('safeRemove throws', function () {
                        assert.throws(function () {
                            safemap.safeRemove('foo');
                        });
                    });

                    test('size returns 0', function () {
                        assert.strictEqual(safemap.size(), 0);
                    });
                });
            });

            suite('safeSet:', function () {
                setup(function () {
                    safemap.safeSet('baz', 'qux');
                });

                test('has returns true', function () {
                    assert.isTrue(safemap.has('foo'));
                });

                test('has returns true', function () {
                    assert.isTrue(safemap.has('baz'));
                });

                test('get returns value', function () {
                    assert.strictEqual(safemap.get('foo'), 'bar');
                });

                test('get returns value', function () {
                    assert.strictEqual(safemap.get('baz'), 'qux');
                });

                test('safeGet returns value', function () {
                    assert.strictEqual(safemap.safeGet('baz'), 'qux');
                });

                test('safeSet throws', function () {
                    assert.throws(function () {
                        safemap.safeSet('baz', 'qux');
                    });
                });

                test('safeRemove does not throw', function () {
                    assert.doesNotThrow(function () {
                        safemap.safeRemove('baz');
                    });
                });

                test('size returns value 2', function () {
                    assert.strictEqual(safemap.size(), 2);
                });
                
                suite('clear:', function () {
                    setup(function () {
                        safemap.clear();
                    });

                    test('has returns false', function () {
                        assert.isFalse(safemap.has('foo'));
                    });

                    test('has returns false', function () {
                        assert.isFalse(safemap.has('baz'));
                    });

                    test('get returns undefined', function () {
                        assert.isUndefined(safemap.get('foo'));
                    });

                    test('get returns undefined', function () {
                        assert.isUndefined(safemap.get('baz'));
                    });

                    test('safeGet throws', function () {
                        assert.throws(function () {
                            safemap.safeGet('foo');
                        });
                    });

                    test('safeGet throws', function () {
                        assert.throws(function () {
                            safemap.safeGet('baz');
                        });
                    });

                    test('safeSet does not throw', function () {
                        assert.doesNotThrow(function () {
                            safemap.safeSet('foo', 'bar');
                        });
                    });

                    test('safeSet does not throw', function () {
                        assert.doesNotThrow(function () {
                            safemap.safeSet('baz', 'qux');
                        });
                    });

                    test('safeRemove throws', function () {
                        assert.throws(function () {
                            safemap.safeRemove('foo');
                        });
                    });

                    test('safeRemove throws', function () {
                        assert.throws(function () {
                            safemap.safeRemove('qux');
                        });
                    });

                    test('size returns value 0', function () {
                        assert.strictEqual(safemap.size(), 0);
                    });
                });
            });
        });

        suite('set hasOwnProperty:', function () {
            setup(function () {
                safemap.set('hasOwnProperty', 'foo');
            });

            test('has returns true', function () {
                assert.isTrue(safemap.has('hasOwnProperty'));
            });

            test('get returns value', function () {
                assert.strictEqual(safemap.get('hasOwnProperty'), 'foo');
            });

            test('safeGet does not throw', function () {
                assert.doesNotThrow(function () {
                    safemap.safeGet('hasOwnProperty');
                });
            });

            test('safeGet returns value', function () {
                assert.strictEqual(safemap.safeGet('hasOwnProperty'), 'foo');
            });

            test('safeSet throws', function () {
                assert.throws(function () {
                    safemap.safeSet('hasOwnProperty', 'foo');
                });
            });

            test('safeRemove does not throw', function () {
                assert.doesNotThrow(function () {
                    safemap.safeRemove('hasOwnProperty');
                });
            });

            test('size returns value 1', function () {
                assert.strictEqual(safemap.size(), 1);
            });

            suite('remove:', function () {
                setup(function () {
                    safemap.remove('hasOwnProperty');
                });

                test('get returns undefined', function () {
                    assert.isUndefined(safemap.get('hasOwnProperty'));
                });

                test('set does not throw', function () {
                    assert.doesNotThrow(function () {
                        safemap.set('hasOwnProperty', 'foo');
                    });
                });

                test('has does not throw', function () {
                    assert.doesNotThrow(function () {
                        safemap.has('hasOwnProperty');
                    });
                });

                test('has returns false', function () {
                    assert.isFalse(safemap.has('hasOwnProperty'));
                });

                test('remove does not throw', function () {
                    assert.doesNotThrow(function () {
                        safemap.remove('hasOwnProperty');
                    });
                });

                test('safeGet throws', function () {
                    assert.throws(function () {
                        safemap.safeGet('hasOwnProperty');
                    });
                });

                test('safeSet does not throw', function () {
                    assert.doesNotThrow(function () {
                        safemap.safeSet('hasOwnProperty', 'foo');
                    });
                });

                test('safeRemove throws', function () {
                    assert.throws(function () {
                        safemap.safeRemove('hasOwnProperty');
                    });
                });

                test('size returns value 0', function () {
                    assert.strictEqual(safemap.size(), 0);
                });
            });
        });

        suite('set __proto__:', function () {
            setup(function () {
                safemap.set('__proto__', 'foo');
            });

            test('has returns true', function () {
                assert.isTrue(safemap.has('__proto__'));
            });

            test('get returns value', function () {
                assert.strictEqual(safemap.get('__proto__'), 'foo');
            });

            test('safeGet does not throw', function () {
                assert.doesNotThrow(function () {
                    safemap.safeGet('__proto__');
                });
            });

            test('safeGet returns value', function () {
                assert.strictEqual(safemap.safeGet('__proto__'), 'foo');
            });

            test('safeSet throws', function () {
                assert.throws(function () {
                    safemap.safeSet('__proto__', 'foo');
                });
            });

            test('safeRemove does not throw', function () {
                assert.doesNotThrow(function () {
                    safemap.safeRemove('__proto__');
                });
            });

            test('size returns value 1', function () {
                assert.strictEqual(safemap.size(), 1);
            });

            test('forEach invokes its argument once with key foo and value bar', function () {
                var callcount = 0;
                function callback (key, value) {
                    assert.strictEqual(key, '__proto__');
                    assert.strictEqual(value, 'foo');
                    callcount += 1;
                }

                safemap.forEach(callback);

                assert.strictEqual(callcount, 1);
            });


            suite('remove:', function () {
                setup(function () {
                    safemap.remove('__proto__');
                });

                test('get returns undefined', function () {
                    assert.isUndefined(safemap.get('__proto__'));
                });

                test('set does not throw', function () {
                    assert.doesNotThrow(function () {
                        safemap.set('__proto__', 'foo');
                    });
                });

                test('has does not throw', function () {
                    assert.doesNotThrow(function () {
                        safemap.has('__proto__');
                    });
                });

                test('has returns false', function () {
                    assert.isFalse(safemap.has('__proto__'));
                });

                test('remove does not throw', function () {
                    assert.doesNotThrow(function () {
                        safemap.remove('__proto__');
                    });
                });

                test('safeGet throws', function () {
                    assert.throws(function () {
                        safemap.safeGet('__proto__');
                    });
                });

                test('safeSet does not throw', function () {
                    assert.doesNotThrow(function () {
                        safemap.safeSet('__proto__', 'foo');
                    });
                });

                test('safeRemove throws', function () {
                    assert.throws(function () {
                        safemap.safeRemove('__proto__');
                    });
                });

                test('size returns value 0', function () {
                    assert.strictEqual(safemap.size(), 0);
                });
            });

            suite('clear:', function () {
                setup(function () {
                    safemap.clear();
                });

                test('get returns undefined', function () {
                    assert.isUndefined(safemap.get('__proto__'));
                });

                test('set does not throw', function () {
                    assert.doesNotThrow(function () {
                        safemap.set('__proto__', 'foo');
                    });
                });

                test('has does not throw', function () {
                    assert.doesNotThrow(function () {
                        safemap.has('__proto__');
                    });
                });

                test('has returns false', function () {
                    assert.isFalse(safemap.has('__proto__'));
                });

                test('remove does not throw', function () {
                    assert.doesNotThrow(function () {
                        safemap.remove('__proto__');
                    });
                });

                test('safeGet throws', function () {
                    assert.throws(function () {
                        safemap.safeGet('__proto__');
                    });
                });

                test('safeSet does not throw', function () {
                    assert.doesNotThrow(function () {
                        safemap.safeSet('__proto__', 'foo');
                    });
                });

                test('safeRemove throws', function () {
                    assert.throws(function () {
                        safemap.safeRemove('__proto__');
                    });
                });

                test('size returns value 0', function () {
                    assert.strictEqual(safemap.size(), 0);
                });
            });  
        });

        suite('set empty string:', function () {
            setup(function () {
                safemap.set('', 'baz');
            });

            test('has returns true', function () {
                assert.isTrue(safemap.has(''));
            });

            test('get returns value', function () {
                assert.strictEqual(safemap.get('', 'bar'), 'baz');
            });

            test('safeGet returns value', function () {
                assert.strictEqual(safemap.safeGet(''), 'baz');
            });

            test('size returns 1', function () {
                assert.strictEqual(safemap.size(), 1);
            });

            test('forEach invokes its argument once with key foo and value baz', function () {
                var callcount = 0;
                function callback (key, value) {
                    assert.strictEqual(key, '');
                    assert.strictEqual(value, 'baz');
                    callcount += 1;
                }

                safemap.forEach(callback);

                assert.strictEqual(callcount, 1);
            });
        });
    });

    suite('no new:', function () {
        var safemap;

        setup(function () {
            safemap = SafeMap();
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

    suite('new with initial values:', function () {
        var safemap, initialValues;

        setup(function () {
            initialValues = {
                foo: 'bar',
                baz: {
                    qux: 'foo'
                }
            };

            safemap = new SafeMap(initialValues);
        });

        teardown(function () {
            safemap = undefined;
        });

        test('has returns true', function () {
            assert.isTrue(safemap.has('foo'));
            assert.isTrue(safemap.has('baz'));
        });

        test('get returns values', function () {
            assert.strictEqual(safemap.get('foo'), 'bar');
            assert.isObject(safemap.get('baz'));
            assert.strictEqual(safemap.get('baz').qux, 'foo');
        });

        suite('clear:', function () {
            setup(function () {
                safemap.clear();
            });

            test('has returns false', function () {
                assert.isFalse(safemap.has('foo'));
                assert.isFalse(safemap.has('baz'));
            });

            test('initial values are unchanged', function () {
                assert.strictEqual(initialValues.foo, 'bar');
                assert.isObject(initialValues.baz);
                assert.strictEqual(initialValues.baz.qux, 'foo');
            });
        });
    });
});

