# safemap.js

[![Build status][ci-image]][ci-status]

A tiny, safe, ES3-compliant
map/dictionary implementation
in JavaScript.

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

### Calling the exported functions

A number of different functions are exported:

#### safemap.get (key [, defaultValue])


#### safemap.set (key, value)


#### safemap.has (key)


#### safemap.delete (key)


#### safemap.clear ()


#### safemap.safeGet (key)


#### safemap.safeSet (key, value)


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
[node]: http://nodejs.org/
[browserify]: http://browserify.org/
[require]: http://requirejs.org/
[npm]: https://npmjs.org/
[jake]: https://github.com/mde/jake
[jshint]: https://github.com/jshint/node-jshint
[mocha]: http://visionmedia.github.com/mocha
[chai]: http://chaijs.com/
[uglifyjs]: https://github.com/mishoo/UglifyJS

