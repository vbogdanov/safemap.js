# safemap.js

[![Build status][ci-image]][ci-status]

A tiny, safe, ES3-compliant
map/dictionary implementation
in JavaScript.

## Tiny?

4.3 kb, 1 kb minified, 0.5 kb gzipped

## Safe?

 * Internals are private;
 * Sane handling of `hasOwnProperty`
   and `__proto__`;
 * Initial values are cloned
   rather than passed by reference;
 * Constructor guards
   against missing `new` operator;
 * Throwing versions of
   `get`, `set` and `remove`
   methods provided for callers
   that wish to fail fast.

## ES3-compliant?

Doesn't rely
on any features
from more recent versions
of ECMAScript,
to enable straightforward usage
from legacy browser environments.

## What's not to like?

To enforce true privacy,
the methods are not set
on `SafeMap.prototype`,
they are set on each instance
by the constructor.
If you're creating
a large number of instances,
there is a chance that
you might be concerned about that.
It also means that
methods may not be sanely applied
to other objects.

The method name `remove`
is used rather than
the more idiomatically JavaScripty `delete`,
which is prevalent in
other map/dictionary APIs,
such as ES5's [WeakMap]
and others.

## What else could I use instead?

 * Plain old JavaScript objects;
 * [domenic/dict][dict];
 * [dherman/dictjs][dictjs];
 * [fabriziomoscon/node-hash][nodehash];
 * [rauschma/strmap][strmap].

## Installation

### Via NPM

```
npm install safemap
```

### Via Jam

```
jam install safemap
```

### Via Git

```
git clone git@github.com:philbooth/safemap.js.git
```

## Usage

### Loading the library

Both
CommonJS
(e.g.
if you're running on [Node.js][node]
or in the browser with [Browserify])
and AMD
(e.g. if you're using [Require.js][require])
loading styles are supported.
If neither system is detected,
the library defaults to
exporting its interface globally
as `SafeMap`.

### Instantiation

```
var safemap = new SafeMap();
```

```
var safemap = new SafeMap({
	// Initial values
	foo: 'bar'
	baz: 'qux'
});
```

```
var safemap = Object.create(SafeMap);
```

### Calling the methods

A number of methods are exported:

#### safemap.get (key [, defaultValue])

Returns the value
associated with `key` in the map,
or `defaultValue`
if the property is unset.

#### safemap.set (key, value)

Sets `value`
to be associated with `key`
in the map.

#### safemap.has (key)

Returns a boolean
indicating whether `key`
is in the map.

#### safemap.remove (key)

Removes `key`
from the map.

#### safemap.clear ()

Removes all keys
from the map.

#### safemap.safeGet (key)

Throwing version
of `get`.
No default value
may be specified and,
if `key` is not in the map,
an error will be thrown.

#### safemap.safeSet (key, value)

Throwing version
of `set`.
If `key` is already in the map,
an error will be thrown.

#### safemap.safeRemove (key)

Throwing version
of `remove`.
If `key` is not in the map,
an error will be thrown.

## Development

### Dependencies

The build environment relies on
Node.js,
[NPM],
[Jake],
[JSHint],
[Mocha],
[Chai] and
[UglifyJS].
Assuming that you already have Node.js and NPM set up,
you just need to run `npm install` to
install all of the dependencies as listed in `package.json`.

### Unit tests

The unit tests are in `test/safemap.js`.
You can run them with the command `npm test` or `jake test`.

[ci-image]: https://secure.travis-ci.org/philbooth/safemap.js.png?branch=master
[ci-status]: http://travis-ci.org/#!/philbooth/safemap.js
[weakmap]: https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/WeakMap
[dict]: https://github.com/domenic/dict
[dictjs]: https://github.com/dherman/dictjs
[nodehash]: https://github.com/fabriziomoscon/node-hash
[strmap]: https://github.com/rauschma/strmap
[node]: http://nodejs.org/
[browserify]: http://browserify.org/
[require]: http://requirejs.org/
[npm]: https://npmjs.org/
[jake]: https://github.com/mde/jake
[jshint]: https://github.com/jshint/node-jshint
[mocha]: http://visionmedia.github.com/mocha
[chai]: http://chaijs.com/
[uglifyjs]: https://github.com/mishoo/UglifyJS

