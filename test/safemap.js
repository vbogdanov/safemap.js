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

        test('get returns undefined', function () {
            assert.isUndefined(safemap.get('foo'));
        });

        test('get returns default value', function () {
            assert.strictEqual(safemap.get('foo', 'bar'), 'bar');
        });

        test('get undefined does not throw', function () {
            assert.doesNotThrow(function () {
                safemap.get(undefined);
            });
        });

        test('get undefined returns default value', function () {
            assert.strictEqual(safemap.get(undefined, 'foo'), 'foo');
        });

        test('set method exists', function () {
            assert.isFunction(safemap.set);
        });

        test('set does not throw', function () {
            assert.doesNotThrow(function () {
                safemap.set('foo', 'bar');
            });
        });

        test('set undefined does not throw', function () {
            assert.doesNotThrow(function () {
                safemap.set('foo', undefined);
            });
        });

        test('set object key does not throw', function () {
            assert.doesNotThrow(function () {
                safemap.set({}, 'foo');
            });
        });

        test('set undefined key does not throw', function () {
            assert.doesNotThrow(function () {
                safemap.set(undefined, 'foo');
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

        test('has undefined does not throw', function () {
            assert.doesNotThrow(function () {
                safemap.has(undefined);
            });
        });

        test('remove method exists', function () {
            assert.isFunction(safemap.remove);
        });

        test('remove does not throw', function () {
            assert.doesNotThrow(function () {
                safemap.remove('foo');
            });
        });

        test('remove undefined does not throw', function () {
            assert.doesNotThrow(function () {
                safemap.remove(undefined);
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

        test('safeSet method exists', function () {
            assert.isFunction(safemap.safeSet);
        });

        test('safeSet does not throw', function () {
            assert.doesNotThrow(function () {
                safemap.safeSet('foo', 'bar');
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

                    setup('clear:', function () {
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
                    });
                });
            });
        });
    });
});

