(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["simpleMindMap"] = factory();
	else
		root["simpleMindMap"] = factory();
})((typeof self !== 'undefined' ? self : this), function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "fb15");
/******/ })
/************************************************************************/
/******/ ({

/***/ "00ee":
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__("b622");

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var test = {};

test[TO_STRING_TAG] = 'z';

module.exports = String(test) === '[object z]';


/***/ }),

/***/ "0366":
/***/ (function(module, exports, __webpack_require__) {

var aFunction = __webpack_require__("1c0b");

// optional / simple context binding
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 0: return function () {
      return fn.call(that);
    };
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ "03de":
/***/ (function(module, exports, __webpack_require__) {

var call = __webpack_require__("ef94");
var isObject = __webpack_require__("7313");
var isSymbol = __webpack_require__("e473");
var getMethod = __webpack_require__("d585");
var ordinaryToPrimitive = __webpack_require__("cbe7");
var wellKnownSymbol = __webpack_require__("df9f");

var $TypeError = TypeError;
var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');

// `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive
module.exports = function (input, pref) {
  if (!isObject(input) || isSymbol(input)) return input;
  var exoticToPrim = getMethod(input, TO_PRIMITIVE);
  var result;
  if (exoticToPrim) {
    if (pref === undefined) pref = 'default';
    result = call(exoticToPrim, input, pref);
    if (!isObject(result) || isSymbol(result)) return result;
    throw $TypeError("Can't convert object to primitive value");
  }
  if (pref === undefined) pref = 'number';
  return ordinaryToPrimitive(input, pref);
};


/***/ }),

/***/ "0427":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("b6b3");
var $map = __webpack_require__("a1d8").map;
var arrayMethodHasSpeciesSupport = __webpack_require__("1feb");

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('map');

// `Array.prototype.map` method
// https://tc39.es/ecma262/#sec-array.prototype.map
// with adding support of @@species
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
  map: function map(callbackfn /* , thisArg */) {
    return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ "0538":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var aFunction = __webpack_require__("1c0b");
var isObject = __webpack_require__("861d");

var slice = [].slice;
var factories = {};

var construct = function (C, argsLength, args) {
  if (!(argsLength in factories)) {
    for (var list = [], i = 0; i < argsLength; i++) list[i] = 'a[' + i + ']';
    // eslint-disable-next-line no-new-func -- we have no proper alternatives, IE8- only
    factories[argsLength] = Function('C,a', 'return new C(' + list.join(',') + ')');
  } return factories[argsLength](C, args);
};

// `Function.prototype.bind` method implementation
// https://tc39.es/ecma262/#sec-function.prototype.bind
module.exports = Function.bind || function bind(that /* , ...args */) {
  var fn = aFunction(this);
  var partArgs = slice.call(arguments, 1);
  var boundFunction = function bound(/* args... */) {
    var args = partArgs.concat(slice.call(arguments));
    return this instanceof boundFunction ? construct(fn, args.length, args) : fn.apply(that, args);
  };
  if (isObject(fn.prototype)) boundFunction.prototype = fn.prototype;
  return boundFunction;
};


/***/ }),

/***/ "057f":
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable es/no-object-getownpropertynames -- safe */
var toIndexedObject = __webpack_require__("fc6a");
var $getOwnPropertyNames = __webpack_require__("241c").f;

var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return $getOwnPropertyNames(it);
  } catch (error) {
    return windowNames.slice();
  }
};

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]'
    ? getWindowNames(it)
    : $getOwnPropertyNames(toIndexedObject(it));
};


/***/ }),

/***/ "06cf":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("83ab");
var propertyIsEnumerableModule = __webpack_require__("d1e7");
var createPropertyDescriptor = __webpack_require__("5c6c");
var toIndexedObject = __webpack_require__("fc6a");
var toPrimitive = __webpack_require__("c04e");
var has = __webpack_require__("5135");
var IE8_DOM_DEFINE = __webpack_require__("0cfb");

// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
exports.f = DESCRIPTORS ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return $getOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (has(O, P)) return createPropertyDescriptor(!propertyIsEnumerableModule.f.call(O, P), O[P]);
};


/***/ }),

/***/ "074d":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/brainImpairedPink.511fee22.jpg";

/***/ }),

/***/ "07b9":
/***/ (function(module, exports, __webpack_require__) {

var isCallable = __webpack_require__("ac9e");

var $String = String;
var $TypeError = TypeError;

module.exports = function (argument) {
  if (typeof argument == 'object' || isCallable(argument)) return argument;
  throw $TypeError("Can't set " + $String(argument) + ' as a prototype');
};


/***/ }),

/***/ "08be":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/vitalityOrange.5dd9014f.jpg";

/***/ }),

/***/ "0930":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/logicalStructure.624920ce.jpg";

/***/ }),

/***/ "0a5f":
/***/ (function(module, exports, __webpack_require__) {

// TODO: Remove this module from `core-js@4` since it's split to modules listed below
__webpack_require__("ab2c");
__webpack_require__("2296");
__webpack_require__("903b");
__webpack_require__("5397");
__webpack_require__("7f4d");
__webpack_require__("7beb");


/***/ }),

/***/ "0ba0":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("3903");
var wellKnownSymbol = __webpack_require__("df9f");
var IS_PURE = __webpack_require__("c009");

var ITERATOR = wellKnownSymbol('iterator');

module.exports = !fails(function () {
  // eslint-disable-next-line unicorn/relative-url-style -- required for testing
  var url = new URL('b?a=1&b=2&c=3', 'http://a');
  var searchParams = url.searchParams;
  var result = '';
  url.pathname = 'c%20d';
  searchParams.forEach(function (value, key) {
    searchParams['delete']('b');
    result += key + value;
  });
  return (IS_PURE && !url.toJSON)
    || !searchParams.sort
    || url.href !== 'http://a/c%20d?a=1&c=3'
    || searchParams.get('c') !== '3'
    || String(new URLSearchParams('?a=1')) !== 'a=1'
    || !searchParams[ITERATOR]
    // throws in Edge
    || new URL('https://a@b').username !== 'a'
    || new URLSearchParams(new URLSearchParams('a=b')).get('a') !== 'b'
    // not punycoded in Edge
    || new URL('http://тест').host !== 'xn--e1aybc'
    // not escaped in Chrome 62-
    || new URL('http://a#б').hash !== '#%D0%B1'
    // fails in Chrome 66-
    || result !== 'a1c3'
    // throws in Safari
    || new URL('http://x', undefined).host !== 'x';
});


/***/ }),

/***/ "0cfb":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("83ab");
var fails = __webpack_require__("d039");
var createElement = __webpack_require__("cc12");

// Thank's IE8 for his funny defineProperty
module.exports = !DESCRIPTORS && !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- requied for testing
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});


/***/ }),

/***/ "0d2c":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/classicBlue.4b8243c6.jpg";

/***/ }),

/***/ "0de9":
/***/ (function(module, exports, __webpack_require__) {

var uncurryThis = __webpack_require__("3545");

var toString = uncurryThis({}.toString);
var stringSlice = uncurryThis(''.slice);

module.exports = function (it) {
  return stringSlice(toString(it), 8, -1);
};


/***/ }),

/***/ "0e63":
/***/ (function(module, exports, __webpack_require__) {

var isArray = __webpack_require__("3b4d");
var isConstructor = __webpack_require__("7f3f");
var isObject = __webpack_require__("7313");
var wellKnownSymbol = __webpack_require__("df9f");

var SPECIES = wellKnownSymbol('species');
var $Array = Array;

// a part of `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate
module.exports = function (originalArray) {
  var C;
  if (isArray(originalArray)) {
    C = originalArray.constructor;
    // cross-realm fallback
    if (isConstructor(C) && (C === $Array || isArray(C.prototype))) C = undefined;
    else if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? $Array : C;
};


/***/ }),

/***/ "0e66":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("7313");

var $String = String;
var $TypeError = TypeError;

// `Assert: Type(argument) is Object`
module.exports = function (argument) {
  if (isObject(argument)) return argument;
  throw $TypeError($String(argument) + ' is not an object');
};


/***/ }),

/***/ "12c3":
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__("b6b3");
var fill = __webpack_require__("aed3");
var addToUnscopables = __webpack_require__("d5a6");

// `Array.prototype.fill` method
// https://tc39.es/ecma262/#sec-array.prototype.fill
$({ target: 'Array', proto: true }, {
  fill: fill
});

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('fill');


/***/ }),

/***/ "14ad":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("3903");

module.exports = !fails(function () {
  // eslint-disable-next-line es-x/no-function-prototype-bind -- safe
  var test = (function () { /* empty */ }).bind();
  // eslint-disable-next-line no-prototype-builtins -- safe
  return typeof test != 'function' || test.hasOwnProperty('prototype');
});


/***/ }),

/***/ "1524":
/***/ (function(module, exports) {

// eslint-disable-next-line es-x/no-object-getownpropertysymbols -- safe
exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ "159b":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var DOMIterables = __webpack_require__("fdbc");
var forEach = __webpack_require__("17c2");
var createNonEnumerableProperty = __webpack_require__("9112");

for (var COLLECTION_NAME in DOMIterables) {
  var Collection = global[COLLECTION_NAME];
  var CollectionPrototype = Collection && Collection.prototype;
  // some Chrome versions have non-configurable methods on DOMTokenList
  if (CollectionPrototype && CollectionPrototype.forEach !== forEach) try {
    createNonEnumerableProperty(CollectionPrototype, 'forEach', forEach);
  } catch (error) {
    CollectionPrototype.forEach = forEach;
  }
}


/***/ }),

/***/ "172e":
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__("df9f");

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var test = {};

test[TO_STRING_TAG] = 'z';

module.exports = String(test) === '[object z]';


/***/ }),

/***/ "17c2":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $forEach = __webpack_require__("b727").forEach;
var arrayMethodIsStrict = __webpack_require__("a640");

var STRICT_METHOD = arrayMethodIsStrict('forEach');

// `Array.prototype.forEach` method implementation
// https://tc39.es/ecma262/#sec-array.prototype.foreach
module.exports = !STRICT_METHOD ? function forEach(callbackfn /* , thisArg */) {
  return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
// eslint-disable-next-line es/no-array-prototype-foreach -- safe
} : [].forEach;


/***/ }),

/***/ "181c":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/dark.894c1d36.jpg";

/***/ }),

/***/ "18a2":
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__("df9f");

var ITERATOR = wellKnownSymbol('iterator');
var SAFE_CLOSING = false;

try {
  var called = 0;
  var iteratorWithReturn = {
    next: function () {
      return { done: !!called++ };
    },
    'return': function () {
      SAFE_CLOSING = true;
    }
  };
  iteratorWithReturn[ITERATOR] = function () {
    return this;
  };
  // eslint-disable-next-line es-x/no-array-from, no-throw-literal -- required for testing
  Array.from(iteratorWithReturn, function () { throw 2; });
} catch (error) { /* empty */ }

module.exports = function (exec, SKIP_CLOSING) {
  if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
  var ITERATION_SUPPORT = false;
  try {
    var object = {};
    object[ITERATOR] = function () {
      return {
        next: function () {
          return { done: ITERATION_SUPPORT = true };
        }
      };
    };
    exec(object);
  } catch (error) { /* empty */ }
  return ITERATION_SUPPORT;
};


/***/ }),

/***/ "19e3":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("0e66");
var isObject = __webpack_require__("7313");
var newPromiseCapability = __webpack_require__("dae8");

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),

/***/ "1a2e":
/***/ (function(module, exports, __webpack_require__) {

var NATIVE_WEAK_MAP = __webpack_require__("299c");
var global = __webpack_require__("92f7");
var uncurryThis = __webpack_require__("3545");
var isObject = __webpack_require__("7313");
var createNonEnumerableProperty = __webpack_require__("88a7");
var hasOwn = __webpack_require__("74c2");
var shared = __webpack_require__("c1de");
var sharedKey = __webpack_require__("7408");
var hiddenKeys = __webpack_require__("cc24");

var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
var TypeError = global.TypeError;
var WeakMap = global.WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP || shared.state) {
  var store = shared.state || (shared.state = new WeakMap());
  var wmget = uncurryThis(store.get);
  var wmhas = uncurryThis(store.has);
  var wmset = uncurryThis(store.set);
  set = function (it, metadata) {
    if (wmhas(store, it)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    wmset(store, it, metadata);
    return metadata;
  };
  get = function (it) {
    return wmget(store, it) || {};
  };
  has = function (it) {
    return wmhas(store, it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set = function (it, metadata) {
    if (hasOwn(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return hasOwn(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return hasOwn(it, STATE);
  };
}

module.exports = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};


/***/ }),

/***/ "1a34":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/earthYellow.c35e546d.jpg";

/***/ }),

/***/ "1ad0":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// TODO: in core-js@4, move /modules/ dependencies to public entries for better optimization by tools like `preset-env`
__webpack_require__("7f72");
var $ = __webpack_require__("b6b3");
var global = __webpack_require__("92f7");
var call = __webpack_require__("ef94");
var uncurryThis = __webpack_require__("3545");
var DESCRIPTORS = __webpack_require__("50ce");
var USE_NATIVE_URL = __webpack_require__("0ba0");
var defineBuiltIn = __webpack_require__("669c");
var defineBuiltIns = __webpack_require__("5dff");
var setToStringTag = __webpack_require__("9f8d");
var createIteratorConstructor = __webpack_require__("ffee");
var InternalStateModule = __webpack_require__("1a2e");
var anInstance = __webpack_require__("39e9");
var isCallable = __webpack_require__("ac9e");
var hasOwn = __webpack_require__("74c2");
var bind = __webpack_require__("ac86");
var classof = __webpack_require__("f4c8");
var anObject = __webpack_require__("0e66");
var isObject = __webpack_require__("7313");
var $toString = __webpack_require__("cc00");
var create = __webpack_require__("ad3e");
var createPropertyDescriptor = __webpack_require__("7234");
var getIterator = __webpack_require__("2d4d");
var getIteratorMethod = __webpack_require__("6f0f");
var validateArgumentsLength = __webpack_require__("7061");
var wellKnownSymbol = __webpack_require__("df9f");
var arraySort = __webpack_require__("6b42");

var ITERATOR = wellKnownSymbol('iterator');
var URL_SEARCH_PARAMS = 'URLSearchParams';
var URL_SEARCH_PARAMS_ITERATOR = URL_SEARCH_PARAMS + 'Iterator';
var setInternalState = InternalStateModule.set;
var getInternalParamsState = InternalStateModule.getterFor(URL_SEARCH_PARAMS);
var getInternalIteratorState = InternalStateModule.getterFor(URL_SEARCH_PARAMS_ITERATOR);
// eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Avoid NodeJS experimental warning
var safeGetBuiltIn = function (name) {
  if (!DESCRIPTORS) return global[name];
  var descriptor = getOwnPropertyDescriptor(global, name);
  return descriptor && descriptor.value;
};

var nativeFetch = safeGetBuiltIn('fetch');
var NativeRequest = safeGetBuiltIn('Request');
var Headers = safeGetBuiltIn('Headers');
var RequestPrototype = NativeRequest && NativeRequest.prototype;
var HeadersPrototype = Headers && Headers.prototype;
var RegExp = global.RegExp;
var TypeError = global.TypeError;
var decodeURIComponent = global.decodeURIComponent;
var encodeURIComponent = global.encodeURIComponent;
var charAt = uncurryThis(''.charAt);
var join = uncurryThis([].join);
var push = uncurryThis([].push);
var replace = uncurryThis(''.replace);
var shift = uncurryThis([].shift);
var splice = uncurryThis([].splice);
var split = uncurryThis(''.split);
var stringSlice = uncurryThis(''.slice);

var plus = /\+/g;
var sequences = Array(4);

var percentSequence = function (bytes) {
  return sequences[bytes - 1] || (sequences[bytes - 1] = RegExp('((?:%[\\da-f]{2}){' + bytes + '})', 'gi'));
};

var percentDecode = function (sequence) {
  try {
    return decodeURIComponent(sequence);
  } catch (error) {
    return sequence;
  }
};

var deserialize = function (it) {
  var result = replace(it, plus, ' ');
  var bytes = 4;
  try {
    return decodeURIComponent(result);
  } catch (error) {
    while (bytes) {
      result = replace(result, percentSequence(bytes--), percentDecode);
    }
    return result;
  }
};

var find = /[!'()~]|%20/g;

var replacements = {
  '!': '%21',
  "'": '%27',
  '(': '%28',
  ')': '%29',
  '~': '%7E',
  '%20': '+'
};

var replacer = function (match) {
  return replacements[match];
};

var serialize = function (it) {
  return replace(encodeURIComponent(it), find, replacer);
};

var URLSearchParamsIterator = createIteratorConstructor(function Iterator(params, kind) {
  setInternalState(this, {
    type: URL_SEARCH_PARAMS_ITERATOR,
    iterator: getIterator(getInternalParamsState(params).entries),
    kind: kind
  });
}, 'Iterator', function next() {
  var state = getInternalIteratorState(this);
  var kind = state.kind;
  var step = state.iterator.next();
  var entry = step.value;
  if (!step.done) {
    step.value = kind === 'keys' ? entry.key : kind === 'values' ? entry.value : [entry.key, entry.value];
  } return step;
}, true);

var URLSearchParamsState = function (init) {
  this.entries = [];
  this.url = null;

  if (init !== undefined) {
    if (isObject(init)) this.parseObject(init);
    else this.parseQuery(typeof init == 'string' ? charAt(init, 0) === '?' ? stringSlice(init, 1) : init : $toString(init));
  }
};

URLSearchParamsState.prototype = {
  type: URL_SEARCH_PARAMS,
  bindURL: function (url) {
    this.url = url;
    this.update();
  },
  parseObject: function (object) {
    var iteratorMethod = getIteratorMethod(object);
    var iterator, next, step, entryIterator, entryNext, first, second;

    if (iteratorMethod) {
      iterator = getIterator(object, iteratorMethod);
      next = iterator.next;
      while (!(step = call(next, iterator)).done) {
        entryIterator = getIterator(anObject(step.value));
        entryNext = entryIterator.next;
        if (
          (first = call(entryNext, entryIterator)).done ||
          (second = call(entryNext, entryIterator)).done ||
          !call(entryNext, entryIterator).done
        ) throw TypeError('Expected sequence with length 2');
        push(this.entries, { key: $toString(first.value), value: $toString(second.value) });
      }
    } else for (var key in object) if (hasOwn(object, key)) {
      push(this.entries, { key: key, value: $toString(object[key]) });
    }
  },
  parseQuery: function (query) {
    if (query) {
      var attributes = split(query, '&');
      var index = 0;
      var attribute, entry;
      while (index < attributes.length) {
        attribute = attributes[index++];
        if (attribute.length) {
          entry = split(attribute, '=');
          push(this.entries, {
            key: deserialize(shift(entry)),
            value: deserialize(join(entry, '='))
          });
        }
      }
    }
  },
  serialize: function () {
    var entries = this.entries;
    var result = [];
    var index = 0;
    var entry;
    while (index < entries.length) {
      entry = entries[index++];
      push(result, serialize(entry.key) + '=' + serialize(entry.value));
    } return join(result, '&');
  },
  update: function () {
    this.entries.length = 0;
    this.parseQuery(this.url.query);
  },
  updateURL: function () {
    if (this.url) this.url.update();
  }
};

// `URLSearchParams` constructor
// https://url.spec.whatwg.org/#interface-urlsearchparams
var URLSearchParamsConstructor = function URLSearchParams(/* init */) {
  anInstance(this, URLSearchParamsPrototype);
  var init = arguments.length > 0 ? arguments[0] : undefined;
  setInternalState(this, new URLSearchParamsState(init));
};

var URLSearchParamsPrototype = URLSearchParamsConstructor.prototype;

defineBuiltIns(URLSearchParamsPrototype, {
  // `URLSearchParams.prototype.append` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-append
  append: function append(name, value) {
    validateArgumentsLength(arguments.length, 2);
    var state = getInternalParamsState(this);
    push(state.entries, { key: $toString(name), value: $toString(value) });
    state.updateURL();
  },
  // `URLSearchParams.prototype.delete` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-delete
  'delete': function (name) {
    validateArgumentsLength(arguments.length, 1);
    var state = getInternalParamsState(this);
    var entries = state.entries;
    var key = $toString(name);
    var index = 0;
    while (index < entries.length) {
      if (entries[index].key === key) splice(entries, index, 1);
      else index++;
    }
    state.updateURL();
  },
  // `URLSearchParams.prototype.get` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-get
  get: function get(name) {
    validateArgumentsLength(arguments.length, 1);
    var entries = getInternalParamsState(this).entries;
    var key = $toString(name);
    var index = 0;
    for (; index < entries.length; index++) {
      if (entries[index].key === key) return entries[index].value;
    }
    return null;
  },
  // `URLSearchParams.prototype.getAll` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-getall
  getAll: function getAll(name) {
    validateArgumentsLength(arguments.length, 1);
    var entries = getInternalParamsState(this).entries;
    var key = $toString(name);
    var result = [];
    var index = 0;
    for (; index < entries.length; index++) {
      if (entries[index].key === key) push(result, entries[index].value);
    }
    return result;
  },
  // `URLSearchParams.prototype.has` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-has
  has: function has(name) {
    validateArgumentsLength(arguments.length, 1);
    var entries = getInternalParamsState(this).entries;
    var key = $toString(name);
    var index = 0;
    while (index < entries.length) {
      if (entries[index++].key === key) return true;
    }
    return false;
  },
  // `URLSearchParams.prototype.set` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-set
  set: function set(name, value) {
    validateArgumentsLength(arguments.length, 1);
    var state = getInternalParamsState(this);
    var entries = state.entries;
    var found = false;
    var key = $toString(name);
    var val = $toString(value);
    var index = 0;
    var entry;
    for (; index < entries.length; index++) {
      entry = entries[index];
      if (entry.key === key) {
        if (found) splice(entries, index--, 1);
        else {
          found = true;
          entry.value = val;
        }
      }
    }
    if (!found) push(entries, { key: key, value: val });
    state.updateURL();
  },
  // `URLSearchParams.prototype.sort` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-sort
  sort: function sort() {
    var state = getInternalParamsState(this);
    arraySort(state.entries, function (a, b) {
      return a.key > b.key ? 1 : -1;
    });
    state.updateURL();
  },
  // `URLSearchParams.prototype.forEach` method
  forEach: function forEach(callback /* , thisArg */) {
    var entries = getInternalParamsState(this).entries;
    var boundFunction = bind(callback, arguments.length > 1 ? arguments[1] : undefined);
    var index = 0;
    var entry;
    while (index < entries.length) {
      entry = entries[index++];
      boundFunction(entry.value, entry.key, this);
    }
  },
  // `URLSearchParams.prototype.keys` method
  keys: function keys() {
    return new URLSearchParamsIterator(this, 'keys');
  },
  // `URLSearchParams.prototype.values` method
  values: function values() {
    return new URLSearchParamsIterator(this, 'values');
  },
  // `URLSearchParams.prototype.entries` method
  entries: function entries() {
    return new URLSearchParamsIterator(this, 'entries');
  }
}, { enumerable: true });

// `URLSearchParams.prototype[@@iterator]` method
defineBuiltIn(URLSearchParamsPrototype, ITERATOR, URLSearchParamsPrototype.entries, { name: 'entries' });

// `URLSearchParams.prototype.toString` method
// https://url.spec.whatwg.org/#urlsearchparams-stringification-behavior
defineBuiltIn(URLSearchParamsPrototype, 'toString', function toString() {
  return getInternalParamsState(this).serialize();
}, { enumerable: true });

setToStringTag(URLSearchParamsConstructor, URL_SEARCH_PARAMS);

$({ global: true, constructor: true, forced: !USE_NATIVE_URL }, {
  URLSearchParams: URLSearchParamsConstructor
});

// Wrap `fetch` and `Request` for correct work with polyfilled `URLSearchParams`
if (!USE_NATIVE_URL && isCallable(Headers)) {
  var headersHas = uncurryThis(HeadersPrototype.has);
  var headersSet = uncurryThis(HeadersPrototype.set);

  var wrapRequestOptions = function (init) {
    if (isObject(init)) {
      var body = init.body;
      var headers;
      if (classof(body) === URL_SEARCH_PARAMS) {
        headers = init.headers ? new Headers(init.headers) : new Headers();
        if (!headersHas(headers, 'content-type')) {
          headersSet(headers, 'content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
        }
        return create(init, {
          body: createPropertyDescriptor(0, $toString(body)),
          headers: createPropertyDescriptor(0, headers)
        });
      }
    } return init;
  };

  if (isCallable(nativeFetch)) {
    $({ global: true, enumerable: true, dontCallGetSet: true, forced: true }, {
      fetch: function fetch(input /* , init */) {
        return nativeFetch(input, arguments.length > 1 ? wrapRequestOptions(arguments[1]) : {});
      }
    });
  }

  if (isCallable(NativeRequest)) {
    var RequestConstructor = function Request(input /* , init */) {
      anInstance(this, RequestPrototype);
      return new NativeRequest(input, arguments.length > 1 ? wrapRequestOptions(arguments[1]) : {});
    };

    RequestPrototype.constructor = RequestConstructor;
    RequestConstructor.prototype = RequestPrototype;

    $({ global: true, constructor: true, dontCallGetSet: true, forced: true }, {
      Request: RequestConstructor
    });
  }
}

module.exports = {
  URLSearchParams: URLSearchParamsConstructor,
  getState: getInternalParamsState
};


/***/ }),

/***/ "1be4":
/***/ (function(module, exports, __webpack_require__) {

var getBuiltIn = __webpack_require__("d066");

module.exports = getBuiltIn('document', 'documentElement');


/***/ }),

/***/ "1c0b":
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') {
    throw TypeError(String(it) + ' is not a function');
  } return it;
};


/***/ }),

/***/ "1c7e":
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__("b622");

var ITERATOR = wellKnownSymbol('iterator');
var SAFE_CLOSING = false;

try {
  var called = 0;
  var iteratorWithReturn = {
    next: function () {
      return { done: !!called++ };
    },
    'return': function () {
      SAFE_CLOSING = true;
    }
  };
  iteratorWithReturn[ITERATOR] = function () {
    return this;
  };
  // eslint-disable-next-line es/no-array-from, no-throw-literal -- required for testing
  Array.from(iteratorWithReturn, function () { throw 2; });
} catch (error) { /* empty */ }

module.exports = function (exec, SKIP_CLOSING) {
  if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
  var ITERATION_SUPPORT = false;
  try {
    var object = {};
    object[ITERATOR] = function () {
      return {
        next: function () {
          return { done: ITERATION_SUPPORT = true };
        }
      };
    };
    exec(object);
  } catch (error) { /* empty */ }
  return ITERATION_SUPPORT;
};


/***/ }),

/***/ "1d80":
/***/ (function(module, exports) {

// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on " + it);
  return it;
};


/***/ }),

/***/ "1dde":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("d039");
var wellKnownSymbol = __webpack_require__("b622");
var V8_VERSION = __webpack_require__("2d00");

var SPECIES = wellKnownSymbol('species');

module.exports = function (METHOD_NAME) {
  // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/677
  return V8_VERSION >= 51 || !fails(function () {
    var array = [];
    var constructor = array.constructor = {};
    constructor[SPECIES] = function () {
      return { foo: 1 };
    };
    return array[METHOD_NAME](Boolean).foo !== 1;
  });
};


/***/ }),

/***/ "1feb":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("3903");
var wellKnownSymbol = __webpack_require__("df9f");
var V8_VERSION = __webpack_require__("7fa2");

var SPECIES = wellKnownSymbol('species');

module.exports = function (METHOD_NAME) {
  // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/677
  return V8_VERSION >= 51 || !fails(function () {
    var array = [];
    var constructor = array.constructor = {};
    constructor[SPECIES] = function () {
      return { foo: 1 };
    };
    return array[METHOD_NAME](Boolean).foo !== 1;
  });
};


/***/ }),

/***/ "2137":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("b6b3");
var uncurryThis = __webpack_require__("3545");
var IndexedObject = __webpack_require__("e561");
var toIndexedObject = __webpack_require__("f11f");
var arrayMethodIsStrict = __webpack_require__("56bf");

var un$Join = uncurryThis([].join);

var ES3_STRINGS = IndexedObject != Object;
var STRICT_METHOD = arrayMethodIsStrict('join', ',');

// `Array.prototype.join` method
// https://tc39.es/ecma262/#sec-array.prototype.join
$({ target: 'Array', proto: true, forced: ES3_STRINGS || !STRICT_METHOD }, {
  join: function join(separator) {
    return un$Join(toIndexedObject(this), separator === undefined ? ',' : separator);
  }
});


/***/ }),

/***/ "2296":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("b6b3");
var call = __webpack_require__("ef94");
var aCallable = __webpack_require__("50a9");
var newPromiseCapabilityModule = __webpack_require__("dae8");
var perform = __webpack_require__("df11");
var iterate = __webpack_require__("fe22");
var PROMISE_STATICS_INCORRECT_ITERATION = __webpack_require__("321b");

// `Promise.all` method
// https://tc39.es/ecma262/#sec-promise.all
$({ target: 'Promise', stat: true, forced: PROMISE_STATICS_INCORRECT_ITERATION }, {
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapabilityModule.f(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var $promiseResolve = aCallable(C.resolve);
      var values = [];
      var counter = 0;
      var remaining = 1;
      iterate(iterable, function (promise) {
        var index = counter++;
        var alreadyCalled = false;
        remaining++;
        call($promiseResolve, C, promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.error) reject(result.value);
    return capability.promise;
  }
});


/***/ }),

/***/ "23ab":
/***/ (function(module, exports, __webpack_require__) {

var call = __webpack_require__("ef94");
var anObject = __webpack_require__("0e66");
var getMethod = __webpack_require__("d585");

module.exports = function (iterator, kind, value) {
  var innerResult, innerError;
  anObject(iterator);
  try {
    innerResult = getMethod(iterator, 'return');
    if (!innerResult) {
      if (kind === 'throw') throw value;
      return value;
    }
    innerResult = call(innerResult, iterator);
  } catch (error) {
    innerError = true;
    innerResult = error;
  }
  if (kind === 'throw') throw value;
  if (innerError) throw innerResult;
  anObject(innerResult);
  return value;
};


/***/ }),

/***/ "23cb":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("a691");

var max = Math.max;
var min = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
module.exports = function (index, length) {
  var integer = toInteger(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};


/***/ }),

/***/ "23e7":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var getOwnPropertyDescriptor = __webpack_require__("06cf").f;
var createNonEnumerableProperty = __webpack_require__("9112");
var redefine = __webpack_require__("6eeb");
var setGlobal = __webpack_require__("ce4e");
var copyConstructorProperties = __webpack_require__("e893");
var isForced = __webpack_require__("94ca");

/*
  options.target      - name of the target object
  options.global      - target is the global object
  options.stat        - export as static methods of target
  options.proto       - export as prototype methods of target
  options.real        - real prototype method for the `pure` version
  options.forced      - export even if the native feature is available
  options.bind        - bind methods to the target, required for the `pure` version
  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
  options.sham        - add a flag to not completely full polyfills
  options.enumerable  - export as enumerable property
  options.noTargetGet - prevent calling a getter on target
*/
module.exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global;
  } else if (STATIC) {
    target = global[TARGET] || setGlobal(TARGET, {});
  } else {
    target = (global[TARGET] || {}).prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.noTargetGet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty === typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty(sourceProperty, 'sham', true);
    }
    // extend global
    redefine(target, key, sourceProperty, options);
  }
};


/***/ }),

/***/ "241c":
/***/ (function(module, exports, __webpack_require__) {

var internalObjectKeys = __webpack_require__("ca84");
var enumBugKeys = __webpack_require__("7839");

var hiddenKeys = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es/no-object-getownpropertynames -- safe
exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};


/***/ }),

/***/ "267a":
/***/ (function(module, exports, __webpack_require__) {

var uncurryThis = __webpack_require__("3545");

var id = 0;
var postfix = Math.random();
var toString = uncurryThis(1.0.toString);

module.exports = function (key) {
  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString(++id + postfix, 36);
};


/***/ }),

/***/ "299c":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("92f7");
var isCallable = __webpack_require__("ac9e");
var inspectSource = __webpack_require__("ab8d");

var WeakMap = global.WeakMap;

module.exports = isCallable(WeakMap) && /native code/.test(inspectSource(WeakMap));


/***/ }),

/***/ "2a62":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("825a");

module.exports = function (iterator) {
  var returnMethod = iterator['return'];
  if (returnMethod !== undefined) {
    return anObject(returnMethod.call(iterator)).value;
  }
};


/***/ }),

/***/ "2ab6":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("b6b3");
var $includes = __webpack_require__("64e0").includes;
var fails = __webpack_require__("3903");
var addToUnscopables = __webpack_require__("d5a6");

// FF99+ bug
var BROKEN_ON_SPARSE = fails(function () {
  return !Array(1).includes();
});

// `Array.prototype.includes` method
// https://tc39.es/ecma262/#sec-array.prototype.includes
$({ target: 'Array', proto: true, forced: BROKEN_ON_SPARSE }, {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('includes');


/***/ }),

/***/ "2b70":
/***/ (function(module, exports, __webpack_require__) {

var uncurryThis = __webpack_require__("3545");

module.exports = uncurryThis({}.isPrototypeOf);


/***/ }),

/***/ "2d00":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var userAgent = __webpack_require__("342f");

var process = global.process;
var versions = process && process.versions;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  version = match[0] < 4 ? 1 : match[0] + match[1];
} else if (userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) version = match[1];
  }
}

module.exports = version && +version;


/***/ }),

/***/ "2d4d":
/***/ (function(module, exports, __webpack_require__) {

var call = __webpack_require__("ef94");
var aCallable = __webpack_require__("50a9");
var anObject = __webpack_require__("0e66");
var tryToString = __webpack_require__("9401");
var getIteratorMethod = __webpack_require__("6f0f");

var $TypeError = TypeError;

module.exports = function (argument, usingIterator) {
  var iteratorMethod = arguments.length < 2 ? getIteratorMethod(argument) : usingIterator;
  if (aCallable(iteratorMethod)) return anObject(call(iteratorMethod, argument));
  throw $TypeError(tryToString(argument) + ' is not iterable');
};


/***/ }),

/***/ "30bf":
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__("0de9");
var global = __webpack_require__("92f7");

module.exports = classof(global.process) == 'process';


/***/ }),

/***/ "3106":
/***/ (function(module, exports, __webpack_require__) {

var uncurryThis = __webpack_require__("3545");

module.exports = uncurryThis([].slice);


/***/ }),

/***/ "31af":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("b6b3");
var $filter = __webpack_require__("a1d8").filter;
var arrayMethodHasSpeciesSupport = __webpack_require__("1feb");

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('filter');

// `Array.prototype.filter` method
// https://tc39.es/ecma262/#sec-array.prototype.filter
// with adding support of @@species
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
  filter: function filter(callbackfn /* , thisArg */) {
    return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ "321b":
/***/ (function(module, exports, __webpack_require__) {

var NativePromiseConstructor = __webpack_require__("4835");
var checkCorrectnessOfIteration = __webpack_require__("18a2");
var FORCED_PROMISE_CONSTRUCTOR = __webpack_require__("b93c").CONSTRUCTOR;

module.exports = FORCED_PROMISE_CONSTRUCTOR || !checkCorrectnessOfIteration(function (iterable) {
  NativePromiseConstructor.all(iterable).then(undefined, function () { /* empty */ });
});


/***/ }),

/***/ "3380":
/***/ (function(module, exports, __webpack_require__) {

var toPrimitive = __webpack_require__("03de");
var isSymbol = __webpack_require__("e473");

// `ToPropertyKey` abstract operation
// https://tc39.es/ecma262/#sec-topropertykey
module.exports = function (argument) {
  var key = toPrimitive(argument, 'string');
  return isSymbol(key) ? key : key + '';
};


/***/ }),

/***/ "3410":
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__("23e7");
var fails = __webpack_require__("d039");
var toObject = __webpack_require__("7b0b");
var nativeGetPrototypeOf = __webpack_require__("e163");
var CORRECT_PROTOTYPE_GETTER = __webpack_require__("e177");

var FAILS_ON_PRIMITIVES = fails(function () { nativeGetPrototypeOf(1); });

// `Object.getPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.getprototypeof
$({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES, sham: !CORRECT_PROTOTYPE_GETTER }, {
  getPrototypeOf: function getPrototypeOf(it) {
    return nativeGetPrototypeOf(toObject(it));
  }
});



/***/ }),

/***/ "342f":
/***/ (function(module, exports, __webpack_require__) {

var getBuiltIn = __webpack_require__("d066");

module.exports = getBuiltIn('navigator', 'userAgent') || '';


/***/ }),

/***/ "3545":
/***/ (function(module, exports, __webpack_require__) {

var NATIVE_BIND = __webpack_require__("14ad");

var FunctionPrototype = Function.prototype;
var bind = FunctionPrototype.bind;
var call = FunctionPrototype.call;
var uncurryThis = NATIVE_BIND && bind.bind(call, call);

module.exports = NATIVE_BIND ? function (fn) {
  return fn && uncurryThis(fn);
} : function (fn) {
  return fn && function () {
    return call.apply(fn, arguments);
  };
};


/***/ }),

/***/ "3556":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/default.1312a3ba.jpg";

/***/ }),

/***/ "35a1":
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__("f5df");
var Iterators = __webpack_require__("3f8c");
var wellKnownSymbol = __webpack_require__("b622");

var ITERATOR = wellKnownSymbol('iterator');

module.exports = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),

/***/ "362c":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toPropertyKey = __webpack_require__("3380");
var definePropertyModule = __webpack_require__("eae2");
var createPropertyDescriptor = __webpack_require__("7234");

module.exports = function (object, key, value) {
  var propertyKey = toPropertyKey(key);
  if (propertyKey in object) definePropertyModule.f(object, propertyKey, createPropertyDescriptor(0, value));
  else object[propertyKey] = value;
};


/***/ }),

/***/ "3768":
/***/ (function(module, exports, __webpack_require__) {

var internalObjectKeys = __webpack_require__("a988");
var enumBugKeys = __webpack_require__("757f");

var hiddenKeys = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es-x/no-object-getownpropertynames -- safe
exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};


/***/ }),

/***/ "37ce":
/***/ (function(module, exports, __webpack_require__) {

var isConstructor = __webpack_require__("7f3f");
var tryToString = __webpack_require__("9401");

var $TypeError = TypeError;

// `Assert: IsConstructor(argument) is true`
module.exports = function (argument) {
  if (isConstructor(argument)) return argument;
  throw $TypeError(tryToString(argument) + ' is not a constructor');
};


/***/ }),

/***/ "37e8":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("83ab");
var definePropertyModule = __webpack_require__("9bf2");
var anObject = __webpack_require__("825a");
var objectKeys = __webpack_require__("df75");

// `Object.defineProperties` method
// https://tc39.es/ecma262/#sec-object.defineproperties
// eslint-disable-next-line es/no-object-defineproperties -- safe
module.exports = DESCRIPTORS ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) definePropertyModule.f(O, key = keys[index++], Properties[key]);
  return O;
};


/***/ }),

/***/ "387a":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("92f7");

module.exports = function (a, b) {
  var console = global.console;
  if (console && console.error) {
    arguments.length == 1 ? console.error(a) : console.error(a, b);
  }
};


/***/ }),

/***/ "389a":
/***/ (function(module, exports) {

// iterable DOM collections
// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
module.exports = {
  CSSRuleList: 0,
  CSSStyleDeclaration: 0,
  CSSValueList: 0,
  ClientRectList: 0,
  DOMRectList: 0,
  DOMStringList: 0,
  DOMTokenList: 1,
  DataTransferItemList: 0,
  FileList: 0,
  HTMLAllCollection: 0,
  HTMLCollection: 0,
  HTMLFormElement: 0,
  HTMLSelectElement: 0,
  MediaList: 0,
  MimeTypeArray: 0,
  NamedNodeMap: 0,
  NodeList: 1,
  PaintRequestList: 0,
  Plugin: 0,
  PluginArray: 0,
  SVGLengthList: 0,
  SVGNumberList: 0,
  SVGPathSegList: 0,
  SVGPointList: 0,
  SVGStringList: 0,
  SVGTransformList: 0,
  SourceBufferList: 0,
  StyleSheetList: 0,
  TextTrackCueList: 0,
  TextTrackList: 0,
  TouchList: 0
};


/***/ }),

/***/ "3903":
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};


/***/ }),

/***/ "39e9":
/***/ (function(module, exports, __webpack_require__) {

var isPrototypeOf = __webpack_require__("2b70");

var $TypeError = TypeError;

module.exports = function (it, Prototype) {
  if (isPrototypeOf(Prototype, it)) return it;
  throw $TypeError('Incorrect invocation');
};


/***/ }),

/***/ "3b4d":
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__("0de9");

// `IsArray` abstract operation
// https://tc39.es/ecma262/#sec-isarray
// eslint-disable-next-line es-x/no-array-isarray -- safe
module.exports = Array.isArray || function isArray(argument) {
  return classof(argument) == 'Array';
};


/***/ }),

/***/ "3bbe":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("861d");

module.exports = function (it) {
  if (!isObject(it) && it !== null) {
    throw TypeError("Can't set " + String(it) + ' as a prototype');
  } return it;
};


/***/ }),

/***/ "3ca3":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var charAt = __webpack_require__("6547").charAt;
var InternalStateModule = __webpack_require__("69f3");
var defineIterator = __webpack_require__("7dd0");

var STRING_ITERATOR = 'String Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(STRING_ITERATOR);

// `String.prototype[@@iterator]` method
// https://tc39.es/ecma262/#sec-string.prototype-@@iterator
defineIterator(String, 'String', function (iterated) {
  setInternalState(this, {
    type: STRING_ITERATOR,
    string: String(iterated),
    index: 0
  });
// `%StringIteratorPrototype%.next` method
// https://tc39.es/ecma262/#sec-%stringiteratorprototype%.next
}, function next() {
  var state = getInternalState(this);
  var string = state.string;
  var index = state.index;
  var point;
  if (index >= string.length) return { value: undefined, done: true };
  point = charAt(string, index);
  state.index += point.length;
  return { value: point, done: false };
});


/***/ }),

/***/ "3def":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// based on https://github.com/bestiejs/punycode.js/blob/master/punycode.js
var uncurryThis = __webpack_require__("3545");

var maxInt = 2147483647; // aka. 0x7FFFFFFF or 2^31-1
var base = 36;
var tMin = 1;
var tMax = 26;
var skew = 38;
var damp = 700;
var initialBias = 72;
var initialN = 128; // 0x80
var delimiter = '-'; // '\x2D'
var regexNonASCII = /[^\0-\u007E]/; // non-ASCII chars
var regexSeparators = /[.\u3002\uFF0E\uFF61]/g; // RFC 3490 separators
var OVERFLOW_ERROR = 'Overflow: input needs wider integers to process';
var baseMinusTMin = base - tMin;

var $RangeError = RangeError;
var exec = uncurryThis(regexSeparators.exec);
var floor = Math.floor;
var fromCharCode = String.fromCharCode;
var charCodeAt = uncurryThis(''.charCodeAt);
var join = uncurryThis([].join);
var push = uncurryThis([].push);
var replace = uncurryThis(''.replace);
var split = uncurryThis(''.split);
var toLowerCase = uncurryThis(''.toLowerCase);

/**
 * Creates an array containing the numeric code points of each Unicode
 * character in the string. While JavaScript uses UCS-2 internally,
 * this function will convert a pair of surrogate halves (each of which
 * UCS-2 exposes as separate characters) into a single code point,
 * matching UTF-16.
 */
var ucs2decode = function (string) {
  var output = [];
  var counter = 0;
  var length = string.length;
  while (counter < length) {
    var value = charCodeAt(string, counter++);
    if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
      // It's a high surrogate, and there is a next character.
      var extra = charCodeAt(string, counter++);
      if ((extra & 0xFC00) == 0xDC00) { // Low surrogate.
        push(output, ((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
      } else {
        // It's an unmatched surrogate; only append this code unit, in case the
        // next code unit is the high surrogate of a surrogate pair.
        push(output, value);
        counter--;
      }
    } else {
      push(output, value);
    }
  }
  return output;
};

/**
 * Converts a digit/integer into a basic code point.
 */
var digitToBasic = function (digit) {
  //  0..25 map to ASCII a..z or A..Z
  // 26..35 map to ASCII 0..9
  return digit + 22 + 75 * (digit < 26);
};

/**
 * Bias adaptation function as per section 3.4 of RFC 3492.
 * https://tools.ietf.org/html/rfc3492#section-3.4
 */
var adapt = function (delta, numPoints, firstTime) {
  var k = 0;
  delta = firstTime ? floor(delta / damp) : delta >> 1;
  delta += floor(delta / numPoints);
  while (delta > baseMinusTMin * tMax >> 1) {
    delta = floor(delta / baseMinusTMin);
    k += base;
  }
  return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
};

/**
 * Converts a string of Unicode symbols (e.g. a domain name label) to a
 * Punycode string of ASCII-only symbols.
 */
var encode = function (input) {
  var output = [];

  // Convert the input in UCS-2 to an array of Unicode code points.
  input = ucs2decode(input);

  // Cache the length.
  var inputLength = input.length;

  // Initialize the state.
  var n = initialN;
  var delta = 0;
  var bias = initialBias;
  var i, currentValue;

  // Handle the basic code points.
  for (i = 0; i < input.length; i++) {
    currentValue = input[i];
    if (currentValue < 0x80) {
      push(output, fromCharCode(currentValue));
    }
  }

  var basicLength = output.length; // number of basic code points.
  var handledCPCount = basicLength; // number of code points that have been handled;

  // Finish the basic string with a delimiter unless it's empty.
  if (basicLength) {
    push(output, delimiter);
  }

  // Main encoding loop:
  while (handledCPCount < inputLength) {
    // All non-basic code points < n have been handled already. Find the next larger one:
    var m = maxInt;
    for (i = 0; i < input.length; i++) {
      currentValue = input[i];
      if (currentValue >= n && currentValue < m) {
        m = currentValue;
      }
    }

    // Increase `delta` enough to advance the decoder's <n,i> state to <m,0>, but guard against overflow.
    var handledCPCountPlusOne = handledCPCount + 1;
    if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
      throw $RangeError(OVERFLOW_ERROR);
    }

    delta += (m - n) * handledCPCountPlusOne;
    n = m;

    for (i = 0; i < input.length; i++) {
      currentValue = input[i];
      if (currentValue < n && ++delta > maxInt) {
        throw $RangeError(OVERFLOW_ERROR);
      }
      if (currentValue == n) {
        // Represent delta as a generalized variable-length integer.
        var q = delta;
        var k = base;
        while (true) {
          var t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
          if (q < t) break;
          var qMinusT = q - t;
          var baseMinusT = base - t;
          push(output, fromCharCode(digitToBasic(t + qMinusT % baseMinusT)));
          q = floor(qMinusT / baseMinusT);
          k += base;
        }

        push(output, fromCharCode(digitToBasic(q)));
        bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
        delta = 0;
        handledCPCount++;
      }
    }

    delta++;
    n++;
  }
  return join(output, '');
};

module.exports = function (input) {
  var encoded = [];
  var labels = split(replace(toLowerCase(input), regexSeparators, '\u002E'), '.');
  var i, label;
  for (i = 0; i < labels.length; i++) {
    label = labels[i];
    push(encoded, exec(regexNonASCII, label) ? 'xn--' + encode(label) : label);
  }
  return join(encoded, '.');
};


/***/ }),

/***/ "3f8c":
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "3fb6":
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable es-x/no-symbol -- required for testing */
var V8_VERSION = __webpack_require__("7fa2");
var fails = __webpack_require__("3903");

// eslint-disable-next-line es-x/no-object-getownpropertysymbols -- required for testing
module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  var symbol = Symbol();
  // Chrome 38 Symbol has incorrect toString conversion
  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
  return !String(symbol) || !(Object(symbol) instanceof Symbol) ||
    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    !Symbol.sham && V8_VERSION && V8_VERSION < 41;
});


/***/ }),

/***/ "3fc6":
/***/ (function(module, exports, __webpack_require__) {

var uncurryThis = __webpack_require__("3545");
var toObject = __webpack_require__("40f9");

var floor = Math.floor;
var charAt = uncurryThis(''.charAt);
var replace = uncurryThis(''.replace);
var stringSlice = uncurryThis(''.slice);
var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d{1,2}|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d{1,2})/g;

// `GetSubstitution` abstract operation
// https://tc39.es/ecma262/#sec-getsubstitution
module.exports = function (matched, str, position, captures, namedCaptures, replacement) {
  var tailPos = position + matched.length;
  var m = captures.length;
  var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
  if (namedCaptures !== undefined) {
    namedCaptures = toObject(namedCaptures);
    symbols = SUBSTITUTION_SYMBOLS;
  }
  return replace(replacement, symbols, function (match, ch) {
    var capture;
    switch (charAt(ch, 0)) {
      case '$': return '$';
      case '&': return matched;
      case '`': return stringSlice(str, 0, position);
      case "'": return stringSlice(str, tailPos);
      case '<':
        capture = namedCaptures[stringSlice(ch, 1, -1)];
        break;
      default: // \d\d?
        var n = +ch;
        if (n === 0) return match;
        if (n > m) {
          var f = floor(n / 10);
          if (f === 0) return match;
          if (f <= m) return captures[f - 1] === undefined ? charAt(ch, 1) : captures[f - 1] + charAt(ch, 1);
          return match;
        }
        capture = captures[n - 1];
    }
    return capture === undefined ? '' : capture;
  });
};


/***/ }),

/***/ "40f9":
/***/ (function(module, exports, __webpack_require__) {

var requireObjectCoercible = __webpack_require__("9522");

var $Object = Object;

// `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject
module.exports = function (argument) {
  return $Object(requireObjectCoercible(argument));
};


/***/ }),

/***/ "428f":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");

module.exports = global;


/***/ }),

/***/ "42c9":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/dark2.c49dc11c.jpg";

/***/ }),

/***/ "43f9":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/classicGreen.c2ae7bde.jpg";

/***/ }),

/***/ "44ad":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("d039");
var classof = __webpack_require__("c6b6");

var split = ''.split;

// fallback for non-array-like ES3 and non-enumerable old V8 strings
module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) == 'String' ? split.call(it, '') : Object(it);
} : Object;


/***/ }),

/***/ "44d2":
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__("b622");
var create = __webpack_require__("7c73");
var definePropertyModule = __webpack_require__("9bf2");

var UNSCOPABLES = wellKnownSymbol('unscopables');
var ArrayPrototype = Array.prototype;

// Array.prototype[@@unscopables]
// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
if (ArrayPrototype[UNSCOPABLES] == undefined) {
  definePropertyModule.f(ArrayPrototype, UNSCOPABLES, {
    configurable: true,
    value: create(null)
  });
}

// add a key to Array.prototype[@@unscopables]
module.exports = function (key) {
  ArrayPrototype[UNSCOPABLES][key] = true;
};


/***/ }),

/***/ "458e":
/***/ (function(module, exports) {

var $TypeError = TypeError;
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF; // 2 ** 53 - 1 == 9007199254740991

module.exports = function (it) {
  if (it > MAX_SAFE_INTEGER) throw $TypeError('Maximum allowed index exceeded');
  return it;
};


/***/ }),

/***/ "45ac":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("3903");
var global = __webpack_require__("92f7");

// babel-minify and Closure Compiler transpiles RegExp('.', 's') -> /./s and it causes SyntaxError
var $RegExp = global.RegExp;

module.exports = fails(function () {
  var re = $RegExp('.', 's');
  return !(re.dotAll && re.exec('\n') && re.flags === 's');
});


/***/ }),

/***/ "4835":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("92f7");

module.exports = global.Promise;


/***/ }),

/***/ "4930":
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable es/no-symbol -- required for testing */
var V8_VERSION = __webpack_require__("2d00");
var fails = __webpack_require__("d039");

// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  var symbol = Symbol();
  // Chrome 38 Symbol has incorrect toString conversion
  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
  return !String(symbol) || !(Object(symbol) instanceof Symbol) ||
    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    !Symbol.sham && V8_VERSION && V8_VERSION < 41;
});


/***/ }),

/***/ "4ae1":
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__("23e7");
var getBuiltIn = __webpack_require__("d066");
var aFunction = __webpack_require__("1c0b");
var anObject = __webpack_require__("825a");
var isObject = __webpack_require__("861d");
var create = __webpack_require__("7c73");
var bind = __webpack_require__("0538");
var fails = __webpack_require__("d039");

var nativeConstruct = getBuiltIn('Reflect', 'construct');

// `Reflect.construct` method
// https://tc39.es/ecma262/#sec-reflect.construct
// MS Edge supports only 2 arguments and argumentsList argument is optional
// FF Nightly sets third argument as `new.target`, but does not create `this` from it
var NEW_TARGET_BUG = fails(function () {
  function F() { /* empty */ }
  return !(nativeConstruct(function () { /* empty */ }, [], F) instanceof F);
});
var ARGS_BUG = !fails(function () {
  nativeConstruct(function () { /* empty */ });
});
var FORCED = NEW_TARGET_BUG || ARGS_BUG;

$({ target: 'Reflect', stat: true, forced: FORCED, sham: FORCED }, {
  construct: function construct(Target, args /* , newTarget */) {
    aFunction(Target);
    anObject(args);
    var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
    if (ARGS_BUG && !NEW_TARGET_BUG) return nativeConstruct(Target, args, newTarget);
    if (Target == newTarget) {
      // w/o altered newTarget, optimization for 0-4 arguments
      switch (args.length) {
        case 0: return new Target();
        case 1: return new Target(args[0]);
        case 2: return new Target(args[0], args[1]);
        case 3: return new Target(args[0], args[1], args[2]);
        case 4: return new Target(args[0], args[1], args[2], args[3]);
      }
      // w/o altered newTarget, lot of arguments case
      var $args = [null];
      $args.push.apply($args, args);
      return new (bind.apply(Target, $args))();
    }
    // with altered newTarget, not support built-in constructors
    var proto = newTarget.prototype;
    var instance = create(isObject(proto) ? proto : Object.prototype);
    var result = Function.apply.call(Target, instance, args);
    return isObject(result) ? result : instance;
  }
});


/***/ }),

/***/ "4d64":
/***/ (function(module, exports, __webpack_require__) {

var toIndexedObject = __webpack_require__("fc6a");
var toLength = __webpack_require__("50c4");
var toAbsoluteIndex = __webpack_require__("23cb");

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare -- NaN check
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare -- NaN check
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

module.exports = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};


/***/ }),

/***/ "4de4":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var $filter = __webpack_require__("b727").filter;
var arrayMethodHasSpeciesSupport = __webpack_require__("1dde");

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('filter');

// `Array.prototype.filter` method
// https://tc39.es/ecma262/#sec-array.prototype.filter
// with adding support of @@species
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
  filter: function filter(callbackfn /* , thisArg */) {
    return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ "4df4":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var bind = __webpack_require__("0366");
var toObject = __webpack_require__("7b0b");
var callWithSafeIterationClosing = __webpack_require__("9bdd");
var isArrayIteratorMethod = __webpack_require__("e95a");
var toLength = __webpack_require__("50c4");
var createProperty = __webpack_require__("8418");
var getIteratorMethod = __webpack_require__("35a1");

// `Array.from` method implementation
// https://tc39.es/ecma262/#sec-array.from
module.exports = function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
  var O = toObject(arrayLike);
  var C = typeof this == 'function' ? this : Array;
  var argumentsLength = arguments.length;
  var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
  var mapping = mapfn !== undefined;
  var iteratorMethod = getIteratorMethod(O);
  var index = 0;
  var length, result, step, iterator, next, value;
  if (mapping) mapfn = bind(mapfn, argumentsLength > 2 ? arguments[2] : undefined, 2);
  // if the target is not iterable or it's an array with the default iterator - use a simple case
  if (iteratorMethod != undefined && !(C == Array && isArrayIteratorMethod(iteratorMethod))) {
    iterator = iteratorMethod.call(O);
    next = iterator.next;
    result = new C();
    for (;!(step = next.call(iterator)).done; index++) {
      value = mapping ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true) : step.value;
      createProperty(result, index, value);
    }
  } else {
    length = toLength(O.length);
    result = new C(length);
    for (;length > index; index++) {
      value = mapping ? mapfn(O[index], index) : O[index];
      createProperty(result, index, value);
    }
  }
  result.length = index;
  return result;
};


/***/ }),

/***/ "4e83":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("92f7");
var DOMIterables = __webpack_require__("389a");
var DOMTokenListPrototype = __webpack_require__("fc7f");
var ArrayIteratorMethods = __webpack_require__("7f72");
var createNonEnumerableProperty = __webpack_require__("88a7");
var wellKnownSymbol = __webpack_require__("df9f");

var ITERATOR = wellKnownSymbol('iterator');
var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var ArrayValues = ArrayIteratorMethods.values;

var handlePrototype = function (CollectionPrototype, COLLECTION_NAME) {
  if (CollectionPrototype) {
    // some Chrome versions have non-configurable methods on DOMTokenList
    if (CollectionPrototype[ITERATOR] !== ArrayValues) try {
      createNonEnumerableProperty(CollectionPrototype, ITERATOR, ArrayValues);
    } catch (error) {
      CollectionPrototype[ITERATOR] = ArrayValues;
    }
    if (!CollectionPrototype[TO_STRING_TAG]) {
      createNonEnumerableProperty(CollectionPrototype, TO_STRING_TAG, COLLECTION_NAME);
    }
    if (DOMIterables[COLLECTION_NAME]) for (var METHOD_NAME in ArrayIteratorMethods) {
      // some Chrome versions have non-configurable methods on DOMTokenList
      if (CollectionPrototype[METHOD_NAME] !== ArrayIteratorMethods[METHOD_NAME]) try {
        createNonEnumerableProperty(CollectionPrototype, METHOD_NAME, ArrayIteratorMethods[METHOD_NAME]);
      } catch (error) {
        CollectionPrototype[METHOD_NAME] = ArrayIteratorMethods[METHOD_NAME];
      }
    }
  }
};

for (var COLLECTION_NAME in DOMIterables) {
  handlePrototype(global[COLLECTION_NAME] && global[COLLECTION_NAME].prototype, COLLECTION_NAME);
}

handlePrototype(DOMTokenListPrototype, 'DOMTokenList');


/***/ }),

/***/ "50a9":
/***/ (function(module, exports, __webpack_require__) {

var isCallable = __webpack_require__("ac9e");
var tryToString = __webpack_require__("9401");

var $TypeError = TypeError;

// `Assert: IsCallable(argument) is true`
module.exports = function (argument) {
  if (isCallable(argument)) return argument;
  throw $TypeError(tryToString(argument) + ' is not a function');
};


/***/ }),

/***/ "50c4":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("a691");

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength
module.exports = function (argument) {
  return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};


/***/ }),

/***/ "50ce":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("3903");

// Detect IE8's incomplete defineProperty implementation
module.exports = !fails(function () {
  // eslint-disable-next-line es-x/no-object-defineproperty -- required for testing
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
});


/***/ }),

/***/ "5135":
/***/ (function(module, exports, __webpack_require__) {

var toObject = __webpack_require__("7b0b");

var hasOwnProperty = {}.hasOwnProperty;

module.exports = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty.call(toObject(it), key);
};


/***/ }),

/***/ "5397":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("b6b3");
var call = __webpack_require__("ef94");
var aCallable = __webpack_require__("50a9");
var newPromiseCapabilityModule = __webpack_require__("dae8");
var perform = __webpack_require__("df11");
var iterate = __webpack_require__("fe22");
var PROMISE_STATICS_INCORRECT_ITERATION = __webpack_require__("321b");

// `Promise.race` method
// https://tc39.es/ecma262/#sec-promise.race
$({ target: 'Promise', stat: true, forced: PROMISE_STATICS_INCORRECT_ITERATION }, {
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapabilityModule.f(C);
    var reject = capability.reject;
    var result = perform(function () {
      var $promiseResolve = aCallable(C.resolve);
      iterate(iterable, function (promise) {
        call($promiseResolve, C, promise).then(capability.resolve, reject);
      });
    });
    if (result.error) reject(result.value);
    return capability.promise;
  }
});


/***/ }),

/***/ "5692":
/***/ (function(module, exports, __webpack_require__) {

var IS_PURE = __webpack_require__("c430");
var store = __webpack_require__("c6cd");

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.14.0',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2021 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ "569f":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $forEach = __webpack_require__("a1d8").forEach;
var arrayMethodIsStrict = __webpack_require__("56bf");

var STRICT_METHOD = arrayMethodIsStrict('forEach');

// `Array.prototype.forEach` method implementation
// https://tc39.es/ecma262/#sec-array.prototype.foreach
module.exports = !STRICT_METHOD ? function forEach(callbackfn /* , thisArg */) {
  return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
// eslint-disable-next-line es-x/no-array-prototype-foreach -- safe
} : [].forEach;


/***/ }),

/***/ "56bf":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__("3903");

module.exports = function (METHOD_NAME, argument) {
  var method = [][METHOD_NAME];
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call -- required for testing
    method.call(null, argument || function () { return 1; }, 1);
  });
};


/***/ }),

/***/ "56ef":
/***/ (function(module, exports, __webpack_require__) {

var getBuiltIn = __webpack_require__("d066");
var getOwnPropertyNamesModule = __webpack_require__("241c");
var getOwnPropertySymbolsModule = __webpack_require__("7418");
var anObject = __webpack_require__("825a");

// all object keys, includes non-enumerable and symbols
module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
};


/***/ }),

/***/ "58c5":
/***/ (function(module, exports, __webpack_require__) {

var internalObjectKeys = __webpack_require__("a988");
var enumBugKeys = __webpack_require__("757f");

// `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
// eslint-disable-next-line es-x/no-object-keys -- safe
module.exports = Object.keys || function keys(O) {
  return internalObjectKeys(O, enumBugKeys);
};


/***/ }),

/***/ "5c6c":
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "5dc1":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("3903");
var isCallable = __webpack_require__("ac9e");

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true
    : value == NATIVE ? false
    : isCallable(detection) ? fails(detection)
    : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';

module.exports = isForced;


/***/ }),

/***/ "5dff":
/***/ (function(module, exports, __webpack_require__) {

var defineBuiltIn = __webpack_require__("669c");

module.exports = function (target, src, options) {
  for (var key in src) defineBuiltIn(target, key, src[key], options);
  return target;
};


/***/ }),

/***/ "6487":
/***/ (function(module, exports, __webpack_require__) {

var getBuiltIn = __webpack_require__("fe3e");

module.exports = getBuiltIn('navigator', 'userAgent') || '';


/***/ }),

/***/ "64e0":
/***/ (function(module, exports, __webpack_require__) {

var toIndexedObject = __webpack_require__("f11f");
var toAbsoluteIndex = __webpack_require__("d909");
var lengthOfArrayLike = __webpack_require__("7b32");

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = lengthOfArrayLike(O);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare -- NaN check
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare -- NaN check
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

module.exports = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};


/***/ }),

/***/ "6547":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("a691");
var requireObjectCoercible = __webpack_require__("1d80");

// `String.prototype.{ codePointAt, at }` methods implementation
var createMethod = function (CONVERT_TO_STRING) {
  return function ($this, pos) {
    var S = String(requireObjectCoercible($this));
    var position = toInteger(pos);
    var size = S.length;
    var first, second;
    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
    first = S.charCodeAt(position);
    return first < 0xD800 || first > 0xDBFF || position + 1 === size
      || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF
        ? CONVERT_TO_STRING ? S.charAt(position) : first
        : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
  };
};

module.exports = {
  // `String.prototype.codePointAt` method
  // https://tc39.es/ecma262/#sec-string.prototype.codepointat
  codeAt: createMethod(false),
  // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at
  charAt: createMethod(true)
};


/***/ }),

/***/ "65f0":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("861d");
var isArray = __webpack_require__("e8b5");
var wellKnownSymbol = __webpack_require__("b622");

var SPECIES = wellKnownSymbol('species');

// `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate
module.exports = function (originalArray, length) {
  var C;
  if (isArray(originalArray)) {
    C = originalArray.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    else if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
};


/***/ }),

/***/ "669c":
/***/ (function(module, exports, __webpack_require__) {

var isCallable = __webpack_require__("ac9e");
var definePropertyModule = __webpack_require__("eae2");
var makeBuiltIn = __webpack_require__("e7a6");
var defineGlobalProperty = __webpack_require__("9d4a");

module.exports = function (O, key, value, options) {
  if (!options) options = {};
  var simple = options.enumerable;
  var name = options.name !== undefined ? options.name : key;
  if (isCallable(value)) makeBuiltIn(value, name, options);
  if (options.global) {
    if (simple) O[key] = value;
    else defineGlobalProperty(key, value);
  } else {
    try {
      if (!options.unsafe) delete O[key];
      else if (O[key]) simple = true;
    } catch (error) { /* empty */ }
    if (simple) O[key] = value;
    else definePropertyModule.f(O, key, {
      value: value,
      enumerable: false,
      configurable: !options.nonConfigurable,
      writable: !options.nonWritable
    });
  } return O;
};


/***/ }),

/***/ "682c":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isMergeableObject = function isMergeableObject(value) {
	return isNonNullObject(value)
		&& !isSpecial(value)
};

function isNonNullObject(value) {
	return !!value && typeof value === 'object'
}

function isSpecial(value) {
	var stringValue = Object.prototype.toString.call(value);

	return stringValue === '[object RegExp]'
		|| stringValue === '[object Date]'
		|| isReactElement(value)
}

// see https://github.com/facebook/react/blob/b5ac963fb791d1298e7f396236383bc955f916c1/src/isomorphic/classic/element/ReactElement.js#L21-L25
var canUseSymbol = typeof Symbol === 'function' && Symbol.for;
var REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for('react.element') : 0xeac7;

function isReactElement(value) {
	return value.$$typeof === REACT_ELEMENT_TYPE
}

function emptyTarget(val) {
    return Array.isArray(val) ? [] : {}
}

function cloneIfNecessary(value, optionsArgument) {
    var clone = optionsArgument && optionsArgument.clone === true;
    return (clone && isMergeableObject(value)) ? deepmerge(emptyTarget(value), value, optionsArgument) : value
}

function defaultArrayMerge(target, source, optionsArgument) {
    var destination = target.slice();
    source.forEach(function(e, i) {
        if (typeof destination[i] === 'undefined') {
            destination[i] = cloneIfNecessary(e, optionsArgument);
        } else if (isMergeableObject(e)) {
            destination[i] = deepmerge(target[i], e, optionsArgument);
        } else if (target.indexOf(e) === -1) {
            destination.push(cloneIfNecessary(e, optionsArgument));
        }
    });
    return destination
}

function mergeObject(target, source, optionsArgument) {
    var destination = {};
    if (isMergeableObject(target)) {
        Object.keys(target).forEach(function(key) {
            destination[key] = cloneIfNecessary(target[key], optionsArgument);
        });
    }
    Object.keys(source).forEach(function(key) {
        if (!isMergeableObject(source[key]) || !target[key]) {
            destination[key] = cloneIfNecessary(source[key], optionsArgument);
        } else {
            destination[key] = deepmerge(target[key], source[key], optionsArgument);
        }
    });
    return destination
}

function deepmerge(target, source, optionsArgument) {
    var sourceIsArray = Array.isArray(source);
    var targetIsArray = Array.isArray(target);
    var options = optionsArgument || { arrayMerge: defaultArrayMerge };
    var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;

    if (!sourceAndTargetTypesMatch) {
        return cloneIfNecessary(source, optionsArgument)
    } else if (sourceIsArray) {
        var arrayMerge = options.arrayMerge || defaultArrayMerge;
        return arrayMerge(target, source, optionsArgument)
    } else {
        return mergeObject(target, source, optionsArgument)
    }
}

deepmerge.all = function deepmergeAll(array, optionsArgument) {
    if (!Array.isArray(array) || array.length < 2) {
        throw new Error('first argument should be an array with at least two elements')
    }

    // we are sure there are at least 2 values, so it is safe to have no initial value
    return array.reduce(function(prev, next) {
        return deepmerge(prev, next, optionsArgument)
    })
};

var deepmerge_1 = deepmerge;

module.exports = deepmerge_1;


/***/ }),

/***/ "6967":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/organizationStructure.8064f4da.jpg";

/***/ }),

/***/ "69f3":
/***/ (function(module, exports, __webpack_require__) {

var NATIVE_WEAK_MAP = __webpack_require__("7f9a");
var global = __webpack_require__("da84");
var isObject = __webpack_require__("861d");
var createNonEnumerableProperty = __webpack_require__("9112");
var objectHas = __webpack_require__("5135");
var shared = __webpack_require__("c6cd");
var sharedKey = __webpack_require__("f772");
var hiddenKeys = __webpack_require__("d012");

var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
var WeakMap = global.WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP || shared.state) {
  var store = shared.state || (shared.state = new WeakMap());
  var wmget = store.get;
  var wmhas = store.has;
  var wmset = store.set;
  set = function (it, metadata) {
    if (wmhas.call(store, it)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    wmset.call(store, it, metadata);
    return metadata;
  };
  get = function (it) {
    return wmget.call(store, it) || {};
  };
  has = function (it) {
    return wmhas.call(store, it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set = function (it, metadata) {
    if (objectHas(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return objectHas(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return objectHas(it, STATE);
  };
}

module.exports = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};


/***/ }),

/***/ "6b42":
/***/ (function(module, exports, __webpack_require__) {

var arraySlice = __webpack_require__("be18");

var floor = Math.floor;

var mergeSort = function (array, comparefn) {
  var length = array.length;
  var middle = floor(length / 2);
  return length < 8 ? insertionSort(array, comparefn) : merge(
    array,
    mergeSort(arraySlice(array, 0, middle), comparefn),
    mergeSort(arraySlice(array, middle), comparefn),
    comparefn
  );
};

var insertionSort = function (array, comparefn) {
  var length = array.length;
  var i = 1;
  var element, j;

  while (i < length) {
    j = i;
    element = array[i];
    while (j && comparefn(array[j - 1], element) > 0) {
      array[j] = array[--j];
    }
    if (j !== i++) array[j] = element;
  } return array;
};

var merge = function (array, left, right, comparefn) {
  var llength = left.length;
  var rlength = right.length;
  var lindex = 0;
  var rindex = 0;

  while (lindex < llength || rindex < rlength) {
    array[lindex + rindex] = (lindex < llength && rindex < rlength)
      ? comparefn(left[lindex], right[rindex]) <= 0 ? left[lindex++] : right[rindex++]
      : lindex < llength ? left[lindex++] : right[rindex++];
  } return array;
};

module.exports = mergeSort;


/***/ }),

/***/ "6d8c":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("92f7");
var DOMIterables = __webpack_require__("389a");
var DOMTokenListPrototype = __webpack_require__("fc7f");
var forEach = __webpack_require__("569f");
var createNonEnumerableProperty = __webpack_require__("88a7");

var handlePrototype = function (CollectionPrototype) {
  // some Chrome versions have non-configurable methods on DOMTokenList
  if (CollectionPrototype && CollectionPrototype.forEach !== forEach) try {
    createNonEnumerableProperty(CollectionPrototype, 'forEach', forEach);
  } catch (error) {
    CollectionPrototype.forEach = forEach;
  }
};

for (var COLLECTION_NAME in DOMIterables) {
  if (DOMIterables[COLLECTION_NAME]) {
    handlePrototype(global[COLLECTION_NAME] && global[COLLECTION_NAME].prototype);
  }
}

handlePrototype(DOMTokenListPrototype);


/***/ }),

/***/ "6e52":
/***/ (function(module, exports, __webpack_require__) {

var arraySpeciesConstructor = __webpack_require__("0e63");

// `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate
module.exports = function (originalArray, length) {
  return new (arraySpeciesConstructor(originalArray))(length === 0 ? 0 : length);
};


/***/ }),

/***/ "6e9e":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__("3903");
var isCallable = __webpack_require__("ac9e");
var create = __webpack_require__("ad3e");
var getPrototypeOf = __webpack_require__("c503");
var defineBuiltIn = __webpack_require__("669c");
var wellKnownSymbol = __webpack_require__("df9f");
var IS_PURE = __webpack_require__("c009");

var ITERATOR = wellKnownSymbol('iterator');
var BUGGY_SAFARI_ITERATORS = false;

// `%IteratorPrototype%` object
// https://tc39.es/ecma262/#sec-%iteratorprototype%-object
var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

/* eslint-disable es-x/no-array-prototype-keys -- safe */
if ([].keys) {
  arrayIterator = [].keys();
  // Safari 8 has buggy iterators w/o `next`
  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
  else {
    PrototypeOfArrayIteratorPrototype = getPrototypeOf(getPrototypeOf(arrayIterator));
    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
  }
}

var NEW_ITERATOR_PROTOTYPE = IteratorPrototype == undefined || fails(function () {
  var test = {};
  // FF44- legacy iterators case
  return IteratorPrototype[ITERATOR].call(test) !== test;
});

if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype = {};
else if (IS_PURE) IteratorPrototype = create(IteratorPrototype);

// `%IteratorPrototype%[@@iterator]()` method
// https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator
if (!isCallable(IteratorPrototype[ITERATOR])) {
  defineBuiltIn(IteratorPrototype, ITERATOR, function () {
    return this;
  });
}

module.exports = {
  IteratorPrototype: IteratorPrototype,
  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
};


/***/ }),

/***/ "6eeb":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var createNonEnumerableProperty = __webpack_require__("9112");
var has = __webpack_require__("5135");
var setGlobal = __webpack_require__("ce4e");
var inspectSource = __webpack_require__("8925");
var InternalStateModule = __webpack_require__("69f3");

var getInternalState = InternalStateModule.get;
var enforceInternalState = InternalStateModule.enforce;
var TEMPLATE = String(String).split('String');

(module.exports = function (O, key, value, options) {
  var unsafe = options ? !!options.unsafe : false;
  var simple = options ? !!options.enumerable : false;
  var noTargetGet = options ? !!options.noTargetGet : false;
  var state;
  if (typeof value == 'function') {
    if (typeof key == 'string' && !has(value, 'name')) {
      createNonEnumerableProperty(value, 'name', key);
    }
    state = enforceInternalState(value);
    if (!state.source) {
      state.source = TEMPLATE.join(typeof key == 'string' ? key : '');
    }
  }
  if (O === global) {
    if (simple) O[key] = value;
    else setGlobal(key, value);
    return;
  } else if (!unsafe) {
    delete O[key];
  } else if (!noTargetGet && O[key]) {
    simple = true;
  }
  if (simple) O[key] = value;
  else createNonEnumerableProperty(O, key, value);
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, 'toString', function toString() {
  return typeof this == 'function' && getInternalState(this).source || inspectSource(this);
});


/***/ }),

/***/ "6ef5":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/gold.3093b3c8.jpg";

/***/ }),

/***/ "6f0f":
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__("f4c8");
var getMethod = __webpack_require__("d585");
var Iterators = __webpack_require__("ae74");
var wellKnownSymbol = __webpack_require__("df9f");

var ITERATOR = wellKnownSymbol('iterator');

module.exports = function (it) {
  if (it != undefined) return getMethod(it, ITERATOR)
    || getMethod(it, '@@iterator')
    || Iterators[classof(it)];
};


/***/ }),

/***/ "6fb7":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var bind = __webpack_require__("ac86");
var call = __webpack_require__("ef94");
var toObject = __webpack_require__("40f9");
var callWithSafeIterationClosing = __webpack_require__("ecaa");
var isArrayIteratorMethod = __webpack_require__("e5a5");
var isConstructor = __webpack_require__("7f3f");
var lengthOfArrayLike = __webpack_require__("7b32");
var createProperty = __webpack_require__("362c");
var getIterator = __webpack_require__("2d4d");
var getIteratorMethod = __webpack_require__("6f0f");

var $Array = Array;

// `Array.from` method implementation
// https://tc39.es/ecma262/#sec-array.from
module.exports = function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
  var O = toObject(arrayLike);
  var IS_CONSTRUCTOR = isConstructor(this);
  var argumentsLength = arguments.length;
  var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
  var mapping = mapfn !== undefined;
  if (mapping) mapfn = bind(mapfn, argumentsLength > 2 ? arguments[2] : undefined);
  var iteratorMethod = getIteratorMethod(O);
  var index = 0;
  var length, result, step, iterator, next, value;
  // if the target is not iterable or it's an array with the default iterator - use a simple case
  if (iteratorMethod && !(this === $Array && isArrayIteratorMethod(iteratorMethod))) {
    iterator = getIterator(O, iteratorMethod);
    next = iterator.next;
    result = IS_CONSTRUCTOR ? new this() : [];
    for (;!(step = call(next, iterator)).done; index++) {
      value = mapping ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true) : step.value;
      createProperty(result, index, value);
    }
  } else {
    length = lengthOfArrayLike(O);
    result = IS_CONSTRUCTOR ? new this(length) : $Array(length);
    for (;length > index; index++) {
      value = mapping ? mapfn(O[index], index) : O[index];
      createProperty(result, index, value);
    }
  }
  result.length = index;
  return result;
};


/***/ }),

/***/ "7037":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("a4d3");

__webpack_require__("e01a");

__webpack_require__("d3b7");

__webpack_require__("d28b");

__webpack_require__("3ca3");

__webpack_require__("ddb0");

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return typeof obj;
    };

    module.exports["default"] = module.exports, module.exports.__esModule = true;
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };

    module.exports["default"] = module.exports, module.exports.__esModule = true;
  }

  return _typeof(obj);
}

module.exports = _typeof;
module.exports["default"] = module.exports, module.exports.__esModule = true;

/***/ }),

/***/ "7061":
/***/ (function(module, exports) {

var $TypeError = TypeError;

module.exports = function (passed, required) {
  if (passed < required) throw $TypeError('Not enough arguments');
  return passed;
};


/***/ }),

/***/ "7234":
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "72ed":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/greenLeaf.6789e8fc.jpg";

/***/ }),

/***/ "730c":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("b6b3");
var exec = __webpack_require__("ee0d");

// `RegExp.prototype.exec` method
// https://tc39.es/ecma262/#sec-regexp.prototype.exec
$({ target: 'RegExp', proto: true, forced: /./.exec !== exec }, {
  exec: exec
});


/***/ }),

/***/ "7313":
/***/ (function(module, exports, __webpack_require__) {

var isCallable = __webpack_require__("ac9e");

module.exports = function (it) {
  return typeof it == 'object' ? it !== null : isCallable(it);
};


/***/ }),

/***/ "7408":
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__("b802");
var uid = __webpack_require__("267a");

var keys = shared('keys');

module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};


/***/ }),

/***/ "7418":
/***/ (function(module, exports) {

// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ "746f":
/***/ (function(module, exports, __webpack_require__) {

var path = __webpack_require__("428f");
var has = __webpack_require__("5135");
var wrappedWellKnownSymbolModule = __webpack_require__("e538");
var defineProperty = __webpack_require__("9bf2").f;

module.exports = function (NAME) {
  var Symbol = path.Symbol || (path.Symbol = {});
  if (!has(Symbol, NAME)) defineProperty(Symbol, NAME, {
    value: wrappedWellKnownSymbolModule.f(NAME)
  });
};


/***/ }),

/***/ "74c2":
/***/ (function(module, exports, __webpack_require__) {

var uncurryThis = __webpack_require__("3545");
var toObject = __webpack_require__("40f9");

var hasOwnProperty = uncurryThis({}.hasOwnProperty);

// `HasOwnProperty` abstract operation
// https://tc39.es/ecma262/#sec-hasownproperty
// eslint-disable-next-line es-x/no-object-hasown -- safe
module.exports = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty(toObject(it), key);
};


/***/ }),

/***/ "757f":
/***/ (function(module, exports) {

// IE8- don't enum bug keys
module.exports = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];


/***/ }),

/***/ "7839":
/***/ (function(module, exports) {

// IE8- don't enum bug keys
module.exports = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];


/***/ }),

/***/ "7b0b":
/***/ (function(module, exports, __webpack_require__) {

var requireObjectCoercible = __webpack_require__("1d80");

// `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject
module.exports = function (argument) {
  return Object(requireObjectCoercible(argument));
};


/***/ }),

/***/ "7b32":
/***/ (function(module, exports, __webpack_require__) {

var toLength = __webpack_require__("fcce");

// `LengthOfArrayLike` abstract operation
// https://tc39.es/ecma262/#sec-lengthofarraylike
module.exports = function (obj) {
  return toLength(obj.length);
};


/***/ }),

/***/ "7beb":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("b6b3");
var getBuiltIn = __webpack_require__("fe3e");
var IS_PURE = __webpack_require__("c009");
var NativePromiseConstructor = __webpack_require__("4835");
var FORCED_PROMISE_CONSTRUCTOR = __webpack_require__("b93c").CONSTRUCTOR;
var promiseResolve = __webpack_require__("19e3");

var PromiseConstructorWrapper = getBuiltIn('Promise');
var CHECK_WRAPPER = IS_PURE && !FORCED_PROMISE_CONSTRUCTOR;

// `Promise.resolve` method
// https://tc39.es/ecma262/#sec-promise.resolve
$({ target: 'Promise', stat: true, forced: IS_PURE || FORCED_PROMISE_CONSTRUCTOR }, {
  resolve: function resolve(x) {
    return promiseResolve(CHECK_WRAPPER && this === PromiseConstructorWrapper ? NativePromiseConstructor : this, x);
  }
});


/***/ }),

/***/ "7c05":
/***/ (function(module, exports, __webpack_require__) {

var userAgent = __webpack_require__("6487");
var global = __webpack_require__("92f7");

module.exports = /ipad|iphone|ipod/i.test(userAgent) && global.Pebble !== undefined;


/***/ }),

/***/ "7c73":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("825a");
var defineProperties = __webpack_require__("37e8");
var enumBugKeys = __webpack_require__("7839");
var hiddenKeys = __webpack_require__("d012");
var html = __webpack_require__("1be4");
var documentCreateElement = __webpack_require__("cc12");
var sharedKey = __webpack_require__("f772");

var GT = '>';
var LT = '<';
var PROTOTYPE = 'prototype';
var SCRIPT = 'script';
var IE_PROTO = sharedKey('IE_PROTO');

var EmptyConstructor = function () { /* empty */ };

var scriptTag = function (content) {
  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
};

// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
var NullProtoObjectViaActiveX = function (activeXDocument) {
  activeXDocument.write(scriptTag(''));
  activeXDocument.close();
  var temp = activeXDocument.parentWindow.Object;
  activeXDocument = null; // avoid memory leak
  return temp;
};

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var NullProtoObjectViaIFrame = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var JS = 'java' + SCRIPT + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe);
  // https://github.com/zloirock/core-js/issues/475
  iframe.src = String(JS);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(scriptTag('document.F=Object'));
  iframeDocument.close();
  return iframeDocument.F;
};

// Check for document.domain and active x support
// No need to use active x approach when document.domain is not set
// see https://github.com/es-shims/es5-shim/issues/150
// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
// avoid IE GC bug
var activeXDocument;
var NullProtoObject = function () {
  try {
    /* global ActiveXObject -- old IE */
    activeXDocument = document.domain && new ActiveXObject('htmlfile');
  } catch (error) { /* ignore */ }
  NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
  var length = enumBugKeys.length;
  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
  return NullProtoObject();
};

hiddenKeys[IE_PROTO] = true;

// `Object.create` method
// https://tc39.es/ecma262/#sec-object.create
module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    EmptyConstructor[PROTOTYPE] = anObject(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = NullProtoObject();
  return Properties === undefined ? result : defineProperties(result, Properties);
};


/***/ }),

/***/ "7dd0":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var createIteratorConstructor = __webpack_require__("9ed3");
var getPrototypeOf = __webpack_require__("e163");
var setPrototypeOf = __webpack_require__("d2bb");
var setToStringTag = __webpack_require__("d44e");
var createNonEnumerableProperty = __webpack_require__("9112");
var redefine = __webpack_require__("6eeb");
var wellKnownSymbol = __webpack_require__("b622");
var IS_PURE = __webpack_require__("c430");
var Iterators = __webpack_require__("3f8c");
var IteratorsCore = __webpack_require__("ae93");

var IteratorPrototype = IteratorsCore.IteratorPrototype;
var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
var ITERATOR = wellKnownSymbol('iterator');
var KEYS = 'keys';
var VALUES = 'values';
var ENTRIES = 'entries';

var returnThis = function () { return this; };

module.exports = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
  createIteratorConstructor(IteratorConstructor, NAME, next);

  var getIterationMethod = function (KIND) {
    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
    if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype) return IterablePrototype[KIND];
    switch (KIND) {
      case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
      case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
      case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
    } return function () { return new IteratorConstructor(this); };
  };

  var TO_STRING_TAG = NAME + ' Iterator';
  var INCORRECT_VALUES_NAME = false;
  var IterablePrototype = Iterable.prototype;
  var nativeIterator = IterablePrototype[ITERATOR]
    || IterablePrototype['@@iterator']
    || DEFAULT && IterablePrototype[DEFAULT];
  var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
  var CurrentIteratorPrototype, methods, KEY;

  // fix native
  if (anyNativeIterator) {
    CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));
    if (IteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
      if (!IS_PURE && getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
        if (setPrototypeOf) {
          setPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);
        } else if (typeof CurrentIteratorPrototype[ITERATOR] != 'function') {
          createNonEnumerableProperty(CurrentIteratorPrototype, ITERATOR, returnThis);
        }
      }
      // Set @@toStringTag to native iterators
      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
      if (IS_PURE) Iterators[TO_STRING_TAG] = returnThis;
    }
  }

  // fix Array.prototype.{ values, @@iterator }.name in V8 / FF
  if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
    INCORRECT_VALUES_NAME = true;
    defaultIterator = function values() { return nativeIterator.call(this); };
  }

  // define iterator
  if ((!IS_PURE || FORCED) && IterablePrototype[ITERATOR] !== defaultIterator) {
    createNonEnumerableProperty(IterablePrototype, ITERATOR, defaultIterator);
  }
  Iterators[NAME] = defaultIterator;

  // export additional methods
  if (DEFAULT) {
    methods = {
      values: getIterationMethod(VALUES),
      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
      entries: getIterationMethod(ENTRIES)
    };
    if (FORCED) for (KEY in methods) {
      if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
        redefine(IterablePrototype, KEY, methods[KEY]);
      }
    } else $({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
  }

  return methods;
};


/***/ }),

/***/ "7dda":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/freshGreen.0e344e3e.jpg";

/***/ }),

/***/ "7f3f":
/***/ (function(module, exports, __webpack_require__) {

var uncurryThis = __webpack_require__("3545");
var fails = __webpack_require__("3903");
var isCallable = __webpack_require__("ac9e");
var classof = __webpack_require__("f4c8");
var getBuiltIn = __webpack_require__("fe3e");
var inspectSource = __webpack_require__("ab8d");

var noop = function () { /* empty */ };
var empty = [];
var construct = getBuiltIn('Reflect', 'construct');
var constructorRegExp = /^\s*(?:class|function)\b/;
var exec = uncurryThis(constructorRegExp.exec);
var INCORRECT_TO_STRING = !constructorRegExp.exec(noop);

var isConstructorModern = function isConstructor(argument) {
  if (!isCallable(argument)) return false;
  try {
    construct(noop, empty, argument);
    return true;
  } catch (error) {
    return false;
  }
};

var isConstructorLegacy = function isConstructor(argument) {
  if (!isCallable(argument)) return false;
  switch (classof(argument)) {
    case 'AsyncFunction':
    case 'GeneratorFunction':
    case 'AsyncGeneratorFunction': return false;
  }
  try {
    // we can't check .prototype since constructors produced by .bind haven't it
    // `Function#toString` throws on some built-it function in some legacy engines
    // (for example, `DOMQuad` and similar in FF41-)
    return INCORRECT_TO_STRING || !!exec(constructorRegExp, inspectSource(argument));
  } catch (error) {
    return true;
  }
};

isConstructorLegacy.sham = true;

// `IsConstructor` abstract operation
// https://tc39.es/ecma262/#sec-isconstructor
module.exports = !construct || fails(function () {
  var called;
  return isConstructorModern(isConstructorModern.call)
    || !isConstructorModern(Object)
    || !isConstructorModern(function () { called = true; })
    || called;
}) ? isConstructorLegacy : isConstructorModern;


/***/ }),

/***/ "7f4d":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("b6b3");
var call = __webpack_require__("ef94");
var newPromiseCapabilityModule = __webpack_require__("dae8");
var FORCED_PROMISE_CONSTRUCTOR = __webpack_require__("b93c").CONSTRUCTOR;

// `Promise.reject` method
// https://tc39.es/ecma262/#sec-promise.reject
$({ target: 'Promise', stat: true, forced: FORCED_PROMISE_CONSTRUCTOR }, {
  reject: function reject(r) {
    var capability = newPromiseCapabilityModule.f(this);
    call(capability.reject, undefined, r);
    return capability.promise;
  }
});


/***/ }),

/***/ "7f72":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toIndexedObject = __webpack_require__("f11f");
var addToUnscopables = __webpack_require__("d5a6");
var Iterators = __webpack_require__("ae74");
var InternalStateModule = __webpack_require__("1a2e");
var defineProperty = __webpack_require__("eae2").f;
var defineIterator = __webpack_require__("f7da");
var IS_PURE = __webpack_require__("c009");
var DESCRIPTORS = __webpack_require__("50ce");

var ARRAY_ITERATOR = 'Array Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(ARRAY_ITERATOR);

// `Array.prototype.entries` method
// https://tc39.es/ecma262/#sec-array.prototype.entries
// `Array.prototype.keys` method
// https://tc39.es/ecma262/#sec-array.prototype.keys
// `Array.prototype.values` method
// https://tc39.es/ecma262/#sec-array.prototype.values
// `Array.prototype[@@iterator]` method
// https://tc39.es/ecma262/#sec-array.prototype-@@iterator
// `CreateArrayIterator` internal method
// https://tc39.es/ecma262/#sec-createarrayiterator
module.exports = defineIterator(Array, 'Array', function (iterated, kind) {
  setInternalState(this, {
    type: ARRAY_ITERATOR,
    target: toIndexedObject(iterated), // target
    index: 0,                          // next index
    kind: kind                         // kind
  });
// `%ArrayIteratorPrototype%.next` method
// https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next
}, function () {
  var state = getInternalState(this);
  var target = state.target;
  var kind = state.kind;
  var index = state.index++;
  if (!target || index >= target.length) {
    state.target = undefined;
    return { value: undefined, done: true };
  }
  if (kind == 'keys') return { value: index, done: false };
  if (kind == 'values') return { value: target[index], done: false };
  return { value: [index, target[index]], done: false };
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values%
// https://tc39.es/ecma262/#sec-createunmappedargumentsobject
// https://tc39.es/ecma262/#sec-createmappedargumentsobject
var values = Iterators.Arguments = Iterators.Array;

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

// V8 ~ Chrome 45- bug
if (!IS_PURE && DESCRIPTORS && values.name !== 'values') try {
  defineProperty(values, 'name', { value: 'values' });
} catch (error) { /* empty */ }


/***/ }),

/***/ "7f82":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/skyGreen.4cfa829a.jpg";

/***/ }),

/***/ "7f9a":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var inspectSource = __webpack_require__("8925");

var WeakMap = global.WeakMap;

module.exports = typeof WeakMap === 'function' && /native code/.test(inspectSource(WeakMap));


/***/ }),

/***/ "7fa2":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("92f7");
var userAgent = __webpack_require__("6487");

var process = global.process;
var Deno = global.Deno;
var versions = process && process.versions || Deno && Deno.version;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  // in old Chrome, versions of V8 isn't V8 = Chrome / 10
  // but their correct versions are not interesting for us
  version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
}

// BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
// so check `userAgent` even if `.v8` exists, but 0
if (!version && userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) version = +match[1];
  }
}

module.exports = version;


/***/ }),

/***/ "7fbc":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("b6b3");
var fails = __webpack_require__("3903");
var isArray = __webpack_require__("3b4d");
var isObject = __webpack_require__("7313");
var toObject = __webpack_require__("40f9");
var lengthOfArrayLike = __webpack_require__("7b32");
var doesNotExceedSafeInteger = __webpack_require__("458e");
var createProperty = __webpack_require__("362c");
var arraySpeciesCreate = __webpack_require__("6e52");
var arrayMethodHasSpeciesSupport = __webpack_require__("1feb");
var wellKnownSymbol = __webpack_require__("df9f");
var V8_VERSION = __webpack_require__("7fa2");

var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');

// We can't use this feature detection in V8 since it causes
// deoptimization and serious performance degradation
// https://github.com/zloirock/core-js/issues/679
var IS_CONCAT_SPREADABLE_SUPPORT = V8_VERSION >= 51 || !fails(function () {
  var array = [];
  array[IS_CONCAT_SPREADABLE] = false;
  return array.concat()[0] !== array;
});

var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat');

var isConcatSpreadable = function (O) {
  if (!isObject(O)) return false;
  var spreadable = O[IS_CONCAT_SPREADABLE];
  return spreadable !== undefined ? !!spreadable : isArray(O);
};

var FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;

// `Array.prototype.concat` method
// https://tc39.es/ecma262/#sec-array.prototype.concat
// with adding support of @@isConcatSpreadable and @@species
$({ target: 'Array', proto: true, arity: 1, forced: FORCED }, {
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  concat: function concat(arg) {
    var O = toObject(this);
    var A = arraySpeciesCreate(O, 0);
    var n = 0;
    var i, k, length, len, E;
    for (i = -1, length = arguments.length; i < length; i++) {
      E = i === -1 ? O : arguments[i];
      if (isConcatSpreadable(E)) {
        len = lengthOfArrayLike(E);
        doesNotExceedSafeInteger(n + len);
        for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
      } else {
        doesNotExceedSafeInteger(n + 1);
        createProperty(A, n++, E);
      }
    }
    A.length = n;
    return A;
  }
});


/***/ }),

/***/ "825a":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("861d");

module.exports = function (it) {
  if (!isObject(it)) {
    throw TypeError(String(it) + ' is not an object');
  } return it;
};


/***/ }),

/***/ "83ab":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("d039");

// Detect IE8's incomplete defineProperty implementation
module.exports = !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
});


/***/ }),

/***/ "8418":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toPrimitive = __webpack_require__("c04e");
var definePropertyModule = __webpack_require__("9bf2");
var createPropertyDescriptor = __webpack_require__("5c6c");

module.exports = function (object, key, value) {
  var propertyKey = toPrimitive(key);
  if (propertyKey in object) definePropertyModule.f(object, propertyKey, createPropertyDescriptor(0, value));
  else object[propertyKey] = value;
};


/***/ }),

/***/ "843c":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("3903");
var global = __webpack_require__("92f7");

// babel-minify and Closure Compiler transpiles RegExp('(?<a>b)', 'g') -> /(?<a>b)/g and it causes SyntaxError
var $RegExp = global.RegExp;

module.exports = fails(function () {
  var re = $RegExp('(?<a>b)', 'g');
  return re.exec('b').groups.a !== 'b' ||
    'b'.replace(re, '$<a>c') !== 'bc';
});


/***/ }),

/***/ "84e7":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("50ce");
var call = __webpack_require__("ef94");
var propertyIsEnumerableModule = __webpack_require__("eda6");
var createPropertyDescriptor = __webpack_require__("7234");
var toIndexedObject = __webpack_require__("f11f");
var toPropertyKey = __webpack_require__("3380");
var hasOwn = __webpack_require__("74c2");
var IE8_DOM_DEFINE = __webpack_require__("c344");

// eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
exports.f = DESCRIPTORS ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPropertyKey(P);
  if (IE8_DOM_DEFINE) try {
    return $getOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (hasOwn(O, P)) return createPropertyDescriptor(!call(propertyIsEnumerableModule.f, O, P), O[P]);
};


/***/ }),

/***/ "8617":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/classic.733f273c.jpg";

/***/ }),

/***/ "861d":
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ "875d":
/***/ (function(module, exports, __webpack_require__) {

var makeBuiltIn = __webpack_require__("e7a6");
var defineProperty = __webpack_require__("eae2");

module.exports = function (target, name, descriptor) {
  if (descriptor.get) makeBuiltIn(descriptor.get, name, { getter: true });
  if (descriptor.set) makeBuiltIn(descriptor.set, name, { setter: true });
  return defineProperty.f(target, name, descriptor);
};


/***/ }),

/***/ "8875":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// addapted from the document.currentScript polyfill by Adam Miller
// MIT license
// source: https://github.com/amiller-gh/currentScript-polyfill

// added support for Firefox https://bugzilla.mozilla.org/show_bug.cgi?id=1620505

(function (root, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
}(typeof self !== 'undefined' ? self : this, function () {
  function getCurrentScript () {
    var descriptor = Object.getOwnPropertyDescriptor(document, 'currentScript')
    // for chrome
    if (!descriptor && 'currentScript' in document && document.currentScript) {
      return document.currentScript
    }

    // for other browsers with native support for currentScript
    if (descriptor && descriptor.get !== getCurrentScript && document.currentScript) {
      return document.currentScript
    }
  
    // IE 8-10 support script readyState
    // IE 11+ & Firefox support stack trace
    try {
      throw new Error();
    }
    catch (err) {
      // Find the second match for the "at" string to get file src url from stack.
      var ieStackRegExp = /.*at [^(]*\((.*):(.+):(.+)\)$/ig,
        ffStackRegExp = /@([^@]*):(\d+):(\d+)\s*$/ig,
        stackDetails = ieStackRegExp.exec(err.stack) || ffStackRegExp.exec(err.stack),
        scriptLocation = (stackDetails && stackDetails[1]) || false,
        line = (stackDetails && stackDetails[2]) || false,
        currentLocation = document.location.href.replace(document.location.hash, ''),
        pageSource,
        inlineScriptSourceRegExp,
        inlineScriptSource,
        scripts = document.getElementsByTagName('script'); // Live NodeList collection
  
      if (scriptLocation === currentLocation) {
        pageSource = document.documentElement.outerHTML;
        inlineScriptSourceRegExp = new RegExp('(?:[^\\n]+?\\n){0,' + (line - 2) + '}[^<]*<script>([\\d\\D]*?)<\\/script>[\\d\\D]*', 'i');
        inlineScriptSource = pageSource.replace(inlineScriptSourceRegExp, '$1').trim();
      }
  
      for (var i = 0; i < scripts.length; i++) {
        // If ready state is interactive, return the script tag
        if (scripts[i].readyState === 'interactive') {
          return scripts[i];
        }
  
        // If src matches, return the script tag
        if (scripts[i].src === scriptLocation) {
          return scripts[i];
        }
  
        // If inline source matches, return the script tag
        if (
          scriptLocation === currentLocation &&
          scripts[i].innerHTML &&
          scripts[i].innerHTML.trim() === inlineScriptSource
        ) {
          return scripts[i];
        }
      }
  
      // If no match, return null
      return null;
    }
  };

  return getCurrentScript
}));


/***/ }),

/***/ "88a7":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("50ce");
var definePropertyModule = __webpack_require__("eae2");
var createPropertyDescriptor = __webpack_require__("7234");

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "8925":
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__("c6cd");

var functionToString = Function.toString;

// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
if (typeof store.inspectSource != 'function') {
  store.inspectSource = function (it) {
    return functionToString.call(it);
  };
}

module.exports = store.inspectSource;


/***/ }),

/***/ "8bf2":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("3903");
var global = __webpack_require__("92f7");

// babel-minify and Closure Compiler transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
var $RegExp = global.RegExp;

var UNSUPPORTED_Y = fails(function () {
  var re = $RegExp('a', 'y');
  re.lastIndex = 2;
  return re.exec('abcd') != null;
});

// UC Browser bug
// https://github.com/zloirock/core-js/issues/1008
var MISSED_STICKY = UNSUPPORTED_Y || fails(function () {
  return !$RegExp('a', 'y').sticky;
});

var BROKEN_CARET = UNSUPPORTED_Y || fails(function () {
  // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
  var re = $RegExp('^r', 'gy');
  re.lastIndex = 2;
  return re.exec('str') != null;
});

module.exports = {
  BROKEN_CARET: BROKEN_CARET,
  MISSED_STICKY: MISSED_STICKY,
  UNSUPPORTED_Y: UNSUPPORTED_Y
};


/***/ }),

/***/ "8bfc":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("92f7");
var bind = __webpack_require__("ac86");
var getOwnPropertyDescriptor = __webpack_require__("84e7").f;
var macrotask = __webpack_require__("cd12").set;
var IS_IOS = __webpack_require__("e8e2");
var IS_IOS_PEBBLE = __webpack_require__("7c05");
var IS_WEBOS_WEBKIT = __webpack_require__("c4b2");
var IS_NODE = __webpack_require__("30bf");

var MutationObserver = global.MutationObserver || global.WebKitMutationObserver;
var document = global.document;
var process = global.process;
var Promise = global.Promise;
// Node.js 11 shows ExperimentalWarning on getting `queueMicrotask`
var queueMicrotaskDescriptor = getOwnPropertyDescriptor(global, 'queueMicrotask');
var queueMicrotask = queueMicrotaskDescriptor && queueMicrotaskDescriptor.value;

var flush, head, last, notify, toggle, node, promise, then;

// modern engines have queueMicrotask method
if (!queueMicrotask) {
  flush = function () {
    var parent, fn;
    if (IS_NODE && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (error) {
        if (head) notify();
        else last = undefined;
        throw error;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // browsers with MutationObserver, except iOS - https://github.com/zloirock/core-js/issues/339
  // also except WebOS Webkit https://github.com/zloirock/core-js/issues/898
  if (!IS_IOS && !IS_NODE && !IS_WEBOS_WEBKIT && MutationObserver && document) {
    toggle = true;
    node = document.createTextNode('');
    new MutationObserver(flush).observe(node, { characterData: true });
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (!IS_IOS_PEBBLE && Promise && Promise.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    promise = Promise.resolve(undefined);
    // workaround of WebKit ~ iOS Safari 10.1 bug
    promise.constructor = Promise;
    then = bind(promise.then, promise);
    notify = function () {
      then(flush);
    };
  // Node.js without promises
  } else if (IS_NODE) {
    notify = function () {
      process.nextTick(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessage
  // - onreadystatechange
  // - setTimeout
  } else {
    // strange IE + webpack dev server bug - use .bind(global)
    macrotask = bind(macrotask, global);
    notify = function () {
      macrotask(flush);
    };
  }
}

module.exports = queueMicrotask || function (fn) {
  var task = { fn: fn, next: undefined };
  if (last) last.next = task;
  if (!head) {
    head = task;
    notify();
  } last = task;
};


/***/ }),

/***/ "8d65":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("50ce");
var fails = __webpack_require__("3903");

// V8 ~ Chrome 36-
// https://bugs.chromium.org/p/v8/issues/detail?id=3334
module.exports = DESCRIPTORS && fails(function () {
  // eslint-disable-next-line es-x/no-object-defineproperty -- required for testing
  return Object.defineProperty(function () { /* empty */ }, 'prototype', {
    value: 42,
    writable: false
  }).prototype != 42;
});


/***/ }),

/***/ "902b":
/***/ (function(module, exports) {

module.exports = typeof window == 'object' && typeof Deno != 'object';


/***/ }),

/***/ "903b":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("b6b3");
var IS_PURE = __webpack_require__("c009");
var FORCED_PROMISE_CONSTRUCTOR = __webpack_require__("b93c").CONSTRUCTOR;
var NativePromiseConstructor = __webpack_require__("4835");
var getBuiltIn = __webpack_require__("fe3e");
var isCallable = __webpack_require__("ac9e");
var defineBuiltIn = __webpack_require__("669c");

var NativePromisePrototype = NativePromiseConstructor && NativePromiseConstructor.prototype;

// `Promise.prototype.catch` method
// https://tc39.es/ecma262/#sec-promise.prototype.catch
$({ target: 'Promise', proto: true, forced: FORCED_PROMISE_CONSTRUCTOR, real: true }, {
  'catch': function (onRejected) {
    return this.then(undefined, onRejected);
  }
});

// makes sure that native promise-based APIs `Promise#catch` properly works with patched `Promise#then`
if (!IS_PURE && isCallable(NativePromiseConstructor)) {
  var method = getBuiltIn('Promise').prototype['catch'];
  if (NativePromisePrototype['catch'] !== method) {
    defineBuiltIn(NativePromisePrototype, 'catch', method, { unsafe: true });
  }
}


/***/ }),

/***/ "90e3":
/***/ (function(module, exports) {

var id = 0;
var postfix = Math.random();

module.exports = function (key) {
  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
};


/***/ }),

/***/ "9112":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("83ab");
var definePropertyModule = __webpack_require__("9bf2");
var createPropertyDescriptor = __webpack_require__("5c6c");

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "9186":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("b6b3");
var isArray = __webpack_require__("3b4d");
var isConstructor = __webpack_require__("7f3f");
var isObject = __webpack_require__("7313");
var toAbsoluteIndex = __webpack_require__("d909");
var lengthOfArrayLike = __webpack_require__("7b32");
var toIndexedObject = __webpack_require__("f11f");
var createProperty = __webpack_require__("362c");
var wellKnownSymbol = __webpack_require__("df9f");
var arrayMethodHasSpeciesSupport = __webpack_require__("1feb");
var un$Slice = __webpack_require__("3106");

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('slice');

var SPECIES = wellKnownSymbol('species');
var $Array = Array;
var max = Math.max;

// `Array.prototype.slice` method
// https://tc39.es/ecma262/#sec-array.prototype.slice
// fallback for not array-like ES3 strings and DOM objects
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
  slice: function slice(start, end) {
    var O = toIndexedObject(this);
    var length = lengthOfArrayLike(O);
    var k = toAbsoluteIndex(start, length);
    var fin = toAbsoluteIndex(end === undefined ? length : end, length);
    // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible
    var Constructor, result, n;
    if (isArray(O)) {
      Constructor = O.constructor;
      // cross-realm fallback
      if (isConstructor(Constructor) && (Constructor === $Array || isArray(Constructor.prototype))) {
        Constructor = undefined;
      } else if (isObject(Constructor)) {
        Constructor = Constructor[SPECIES];
        if (Constructor === null) Constructor = undefined;
      }
      if (Constructor === $Array || Constructor === undefined) {
        return un$Slice(O, k, fin);
      }
    }
    result = new (Constructor === undefined ? $Array : Constructor)(max(fin - k, 0));
    for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k]);
    result.length = n;
    return result;
  }
});


/***/ }),

/***/ "91d2":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var has = Object.prototype.hasOwnProperty
  , prefix = '~';

/**
 * Constructor to create a storage for our `EE` objects.
 * An `Events` instance is a plain object whose properties are event names.
 *
 * @constructor
 * @private
 */
function Events() {}

//
// We try to not inherit from `Object.prototype`. In some engines creating an
// instance in this way is faster than calling `Object.create(null)` directly.
// If `Object.create(null)` is not supported we prefix the event names with a
// character to make sure that the built-in object properties are not
// overridden or used as an attack vector.
//
if (Object.create) {
  Events.prototype = Object.create(null);

  //
  // This hack is needed because the `__proto__` property is still inherited in
  // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
  //
  if (!new Events().__proto__) prefix = false;
}

/**
 * Representation of a single event listener.
 *
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
 * @constructor
 * @private
 */
function EE(fn, context, once) {
  this.fn = fn;
  this.context = context;
  this.once = once || false;
}

/**
 * Add a listener for a given event.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} once Specify if the listener is a one-time listener.
 * @returns {EventEmitter}
 * @private
 */
function addListener(emitter, event, fn, context, once) {
  if (typeof fn !== 'function') {
    throw new TypeError('The listener must be a function');
  }

  var listener = new EE(fn, context || emitter, once)
    , evt = prefix ? prefix + event : event;

  if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
  else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
  else emitter._events[evt] = [emitter._events[evt], listener];

  return emitter;
}

/**
 * Clear event by name.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} evt The Event name.
 * @private
 */
function clearEvent(emitter, evt) {
  if (--emitter._eventsCount === 0) emitter._events = new Events();
  else delete emitter._events[evt];
}

/**
 * Minimal `EventEmitter` interface that is molded against the Node.js
 * `EventEmitter` interface.
 *
 * @constructor
 * @public
 */
function EventEmitter() {
  this._events = new Events();
  this._eventsCount = 0;
}

/**
 * Return an array listing the events for which the emitter has registered
 * listeners.
 *
 * @returns {Array}
 * @public
 */
EventEmitter.prototype.eventNames = function eventNames() {
  var names = []
    , events
    , name;

  if (this._eventsCount === 0) return names;

  for (name in (events = this._events)) {
    if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
  }

  if (Object.getOwnPropertySymbols) {
    return names.concat(Object.getOwnPropertySymbols(events));
  }

  return names;
};

/**
 * Return the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Array} The registered listeners.
 * @public
 */
EventEmitter.prototype.listeners = function listeners(event) {
  var evt = prefix ? prefix + event : event
    , handlers = this._events[evt];

  if (!handlers) return [];
  if (handlers.fn) return [handlers.fn];

  for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
    ee[i] = handlers[i].fn;
  }

  return ee;
};

/**
 * Return the number of listeners listening to a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Number} The number of listeners.
 * @public
 */
EventEmitter.prototype.listenerCount = function listenerCount(event) {
  var evt = prefix ? prefix + event : event
    , listeners = this._events[evt];

  if (!listeners) return 0;
  if (listeners.fn) return 1;
  return listeners.length;
};

/**
 * Calls each of the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Boolean} `true` if the event had listeners, else `false`.
 * @public
 */
EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return false;

  var listeners = this._events[evt]
    , len = arguments.length
    , args
    , i;

  if (listeners.fn) {
    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);

    switch (len) {
      case 1: return listeners.fn.call(listeners.context), true;
      case 2: return listeners.fn.call(listeners.context, a1), true;
      case 3: return listeners.fn.call(listeners.context, a1, a2), true;
      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
    }

    for (i = 1, args = new Array(len -1); i < len; i++) {
      args[i - 1] = arguments[i];
    }

    listeners.fn.apply(listeners.context, args);
  } else {
    var length = listeners.length
      , j;

    for (i = 0; i < length; i++) {
      if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);

      switch (len) {
        case 1: listeners[i].fn.call(listeners[i].context); break;
        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
        case 4: listeners[i].fn.call(listeners[i].context, a1, a2, a3); break;
        default:
          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
            args[j - 1] = arguments[j];
          }

          listeners[i].fn.apply(listeners[i].context, args);
      }
    }
  }

  return true;
};

/**
 * Add a listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.on = function on(event, fn, context) {
  return addListener(this, event, fn, context, false);
};

/**
 * Add a one-time listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.once = function once(event, fn, context) {
  return addListener(this, event, fn, context, true);
};

/**
 * Remove the listeners of a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn Only remove the listeners that match this function.
 * @param {*} context Only remove the listeners that have this context.
 * @param {Boolean} once Only remove one-time listeners.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return this;
  if (!fn) {
    clearEvent(this, evt);
    return this;
  }

  var listeners = this._events[evt];

  if (listeners.fn) {
    if (
      listeners.fn === fn &&
      (!once || listeners.once) &&
      (!context || listeners.context === context)
    ) {
      clearEvent(this, evt);
    }
  } else {
    for (var i = 0, events = [], length = listeners.length; i < length; i++) {
      if (
        listeners[i].fn !== fn ||
        (once && !listeners[i].once) ||
        (context && listeners[i].context !== context)
      ) {
        events.push(listeners[i]);
      }
    }

    //
    // Reset the array, or remove it completely if we have no more listeners.
    //
    if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
    else clearEvent(this, evt);
  }

  return this;
};

/**
 * Remove all listeners, or those of the specified event.
 *
 * @param {(String|Symbol)} [event] The event name.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
  var evt;

  if (event) {
    evt = prefix ? prefix + event : event;
    if (this._events[evt]) clearEvent(this, evt);
  } else {
    this._events = new Events();
    this._eventsCount = 0;
  }

  return this;
};

//
// Alias methods names because people roll like that.
//
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
EventEmitter.prototype.addListener = EventEmitter.prototype.on;

//
// Expose the prefix.
//
EventEmitter.prefixed = prefix;

//
// Allow `EventEmitter` to be imported as module namespace.
//
EventEmitter.EventEmitter = EventEmitter;

//
// Expose the module.
//
if (true) {
  module.exports = EventEmitter;
}


/***/ }),

/***/ "92f7":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
module.exports =
  // eslint-disable-next-line es-x/no-global-this -- safe
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == 'object' && self) ||
  check(typeof global == 'object' && global) ||
  // eslint-disable-next-line no-new-func -- fallback
  (function () { return this; })() || Function('return this')();

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("c8ba")))

/***/ }),

/***/ "9401":
/***/ (function(module, exports) {

var $String = String;

module.exports = function (argument) {
  try {
    return $String(argument);
  } catch (error) {
    return 'Object';
  }
};


/***/ }),

/***/ "9419":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var tryToString = __webpack_require__("9401");

var $TypeError = TypeError;

module.exports = function (O, P) {
  if (!delete O[P]) throw $TypeError('Cannot delete property ' + tryToString(P) + ' of ' + tryToString(O));
};


/***/ }),

/***/ "94ca":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("d039");

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true
    : value == NATIVE ? false
    : typeof detection == 'function' ? fails(detection)
    : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';

module.exports = isForced;


/***/ }),

/***/ "9513":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("50ce");
var hasOwn = __webpack_require__("74c2");

var FunctionPrototype = Function.prototype;
// eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
var getDescriptor = DESCRIPTORS && Object.getOwnPropertyDescriptor;

var EXISTS = hasOwn(FunctionPrototype, 'name');
// additional protection from minified / mangled / dropped function names
var PROPER = EXISTS && (function something() { /* empty */ }).name === 'something';
var CONFIGURABLE = EXISTS && (!DESCRIPTORS || (DESCRIPTORS && getDescriptor(FunctionPrototype, 'name').configurable));

module.exports = {
  EXISTS: EXISTS,
  PROPER: PROPER,
  CONFIGURABLE: CONFIGURABLE
};


/***/ }),

/***/ "9522":
/***/ (function(module, exports) {

var $TypeError = TypeError;

// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
module.exports = function (it) {
  if (it == undefined) throw $TypeError("Can't call method on " + it);
  return it;
};


/***/ }),

/***/ "9753":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("0e66");
var aConstructor = __webpack_require__("37ce");
var wellKnownSymbol = __webpack_require__("df9f");

var SPECIES = wellKnownSymbol('species');

// `SpeciesConstructor` abstract operation
// https://tc39.es/ecma262/#sec-speciesconstructor
module.exports = function (O, defaultConstructor) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? defaultConstructor : aConstructor(S);
};


/***/ }),

/***/ "9910":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/mindMap.223b38aa.jpg";

/***/ }),

/***/ "9b01":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var anObject = __webpack_require__("0e66");

// `RegExp.prototype.flags` getter implementation
// https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.hasIndices) result += 'd';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.dotAll) result += 's';
  if (that.unicode) result += 'u';
  if (that.unicodeSets) result += 'v';
  if (that.sticky) result += 'y';
  return result;
};


/***/ }),

/***/ "9bdd":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("825a");
var iteratorClose = __webpack_require__("2a62");

// call something on iterator step with safe closing on error
module.exports = function (iterator, fn, value, ENTRIES) {
  try {
    return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);
  } catch (error) {
    iteratorClose(iterator);
    throw error;
  }
};


/***/ }),

/***/ "9bf2":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("83ab");
var IE8_DOM_DEFINE = __webpack_require__("0cfb");
var anObject = __webpack_require__("825a");
var toPrimitive = __webpack_require__("c04e");

// eslint-disable-next-line es/no-object-defineproperty -- safe
var $defineProperty = Object.defineProperty;

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
exports.f = DESCRIPTORS ? $defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return $defineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "9d4a":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("92f7");

// eslint-disable-next-line es-x/no-object-defineproperty -- safe
var defineProperty = Object.defineProperty;

module.exports = function (key, value) {
  try {
    defineProperty(global, key, { value: value, configurable: true, writable: true });
  } catch (error) {
    global[key] = value;
  } return value;
};


/***/ }),

/***/ "9ed3":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var IteratorPrototype = __webpack_require__("ae93").IteratorPrototype;
var create = __webpack_require__("7c73");
var createPropertyDescriptor = __webpack_require__("5c6c");
var setToStringTag = __webpack_require__("d44e");
var Iterators = __webpack_require__("3f8c");

var returnThis = function () { return this; };

module.exports = function (IteratorConstructor, NAME, next) {
  var TO_STRING_TAG = NAME + ' Iterator';
  IteratorConstructor.prototype = create(IteratorPrototype, { next: createPropertyDescriptor(1, next) });
  setToStringTag(IteratorConstructor, TO_STRING_TAG, false, true);
  Iterators[TO_STRING_TAG] = returnThis;
  return IteratorConstructor;
};


/***/ }),

/***/ "9f29":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("50ce");
var FUNCTION_NAME_EXISTS = __webpack_require__("9513").EXISTS;
var uncurryThis = __webpack_require__("3545");
var defineProperty = __webpack_require__("eae2").f;

var FunctionPrototype = Function.prototype;
var functionToString = uncurryThis(FunctionPrototype.toString);
var nameRE = /function\b(?:\s|\/\*[\S\s]*?\*\/|\/\/[^\n\r]*[\n\r]+)*([^\s(/]*)/;
var regExpExec = uncurryThis(nameRE.exec);
var NAME = 'name';

// Function instances `.name` property
// https://tc39.es/ecma262/#sec-function-instances-name
if (DESCRIPTORS && !FUNCTION_NAME_EXISTS) {
  defineProperty(FunctionPrototype, NAME, {
    configurable: true,
    get: function () {
      try {
        return regExpExec(nameRE, functionToString(this))[1];
      } catch (error) {
        return '';
      }
    }
  });
}


/***/ }),

/***/ "9f8d":
/***/ (function(module, exports, __webpack_require__) {

var defineProperty = __webpack_require__("eae2").f;
var hasOwn = __webpack_require__("74c2");
var wellKnownSymbol = __webpack_require__("df9f");

var TO_STRING_TAG = wellKnownSymbol('toStringTag');

module.exports = function (target, TAG, STATIC) {
  if (target && !STATIC) target = target.prototype;
  if (target && !hasOwn(target, TO_STRING_TAG)) {
    defineProperty(target, TO_STRING_TAG, { configurable: true, value: TAG });
  }
};


/***/ }),

/***/ "a071":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("b6b3");
var toObject = __webpack_require__("40f9");
var toAbsoluteIndex = __webpack_require__("d909");
var toIntegerOrInfinity = __webpack_require__("f0c6");
var lengthOfArrayLike = __webpack_require__("7b32");
var doesNotExceedSafeInteger = __webpack_require__("458e");
var arraySpeciesCreate = __webpack_require__("6e52");
var createProperty = __webpack_require__("362c");
var deletePropertyOrThrow = __webpack_require__("9419");
var arrayMethodHasSpeciesSupport = __webpack_require__("1feb");

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('splice');

var max = Math.max;
var min = Math.min;

// `Array.prototype.splice` method
// https://tc39.es/ecma262/#sec-array.prototype.splice
// with adding support of @@species
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
  splice: function splice(start, deleteCount /* , ...items */) {
    var O = toObject(this);
    var len = lengthOfArrayLike(O);
    var actualStart = toAbsoluteIndex(start, len);
    var argumentsLength = arguments.length;
    var insertCount, actualDeleteCount, A, k, from, to;
    if (argumentsLength === 0) {
      insertCount = actualDeleteCount = 0;
    } else if (argumentsLength === 1) {
      insertCount = 0;
      actualDeleteCount = len - actualStart;
    } else {
      insertCount = argumentsLength - 2;
      actualDeleteCount = min(max(toIntegerOrInfinity(deleteCount), 0), len - actualStart);
    }
    doesNotExceedSafeInteger(len + insertCount - actualDeleteCount);
    A = arraySpeciesCreate(O, actualDeleteCount);
    for (k = 0; k < actualDeleteCount; k++) {
      from = actualStart + k;
      if (from in O) createProperty(A, k, O[from]);
    }
    A.length = actualDeleteCount;
    if (insertCount < actualDeleteCount) {
      for (k = actualStart; k < len - actualDeleteCount; k++) {
        from = k + actualDeleteCount;
        to = k + insertCount;
        if (from in O) O[to] = O[from];
        else deletePropertyOrThrow(O, to);
      }
      for (k = len; k > len - actualDeleteCount + insertCount; k--) deletePropertyOrThrow(O, k - 1);
    } else if (insertCount > actualDeleteCount) {
      for (k = len - actualDeleteCount; k > actualStart; k--) {
        from = k + actualDeleteCount - 1;
        to = k + insertCount - 1;
        if (from in O) O[to] = O[from];
        else deletePropertyOrThrow(O, to);
      }
    }
    for (k = 0; k < insertCount; k++) {
      O[k + actualStart] = arguments[k + 2];
    }
    O.length = len - actualDeleteCount + insertCount;
    return A;
  }
});


/***/ }),

/***/ "a11c":
/***/ (function(module, exports, __webpack_require__) {

var NATIVE_BIND = __webpack_require__("14ad");

var FunctionPrototype = Function.prototype;
var apply = FunctionPrototype.apply;
var call = FunctionPrototype.call;

// eslint-disable-next-line es-x/no-reflect -- safe
module.exports = typeof Reflect == 'object' && Reflect.apply || (NATIVE_BIND ? call.bind(apply) : function () {
  return call.apply(apply, arguments);
});


/***/ }),

/***/ "a1d8":
/***/ (function(module, exports, __webpack_require__) {

var bind = __webpack_require__("ac86");
var uncurryThis = __webpack_require__("3545");
var IndexedObject = __webpack_require__("e561");
var toObject = __webpack_require__("40f9");
var lengthOfArrayLike = __webpack_require__("7b32");
var arraySpeciesCreate = __webpack_require__("6e52");

var push = uncurryThis([].push);

// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterReject }` methods implementation
var createMethod = function (TYPE) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var IS_FILTER_REJECT = TYPE == 7;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  return function ($this, callbackfn, that, specificCreate) {
    var O = toObject($this);
    var self = IndexedObject(O);
    var boundFunction = bind(callbackfn, that);
    var length = lengthOfArrayLike(self);
    var index = 0;
    var create = specificCreate || arraySpeciesCreate;
    var target = IS_MAP ? create($this, length) : IS_FILTER || IS_FILTER_REJECT ? create($this, 0) : undefined;
    var value, result;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      value = self[index];
      result = boundFunction(value, index, O);
      if (TYPE) {
        if (IS_MAP) target[index] = result; // map
        else if (result) switch (TYPE) {
          case 3: return true;              // some
          case 5: return value;             // find
          case 6: return index;             // findIndex
          case 2: push(target, value);      // filter
        } else switch (TYPE) {
          case 4: return false;             // every
          case 7: push(target, value);      // filterReject
        }
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
  };
};

module.exports = {
  // `Array.prototype.forEach` method
  // https://tc39.es/ecma262/#sec-array.prototype.foreach
  forEach: createMethod(0),
  // `Array.prototype.map` method
  // https://tc39.es/ecma262/#sec-array.prototype.map
  map: createMethod(1),
  // `Array.prototype.filter` method
  // https://tc39.es/ecma262/#sec-array.prototype.filter
  filter: createMethod(2),
  // `Array.prototype.some` method
  // https://tc39.es/ecma262/#sec-array.prototype.some
  some: createMethod(3),
  // `Array.prototype.every` method
  // https://tc39.es/ecma262/#sec-array.prototype.every
  every: createMethod(4),
  // `Array.prototype.find` method
  // https://tc39.es/ecma262/#sec-array.prototype.find
  find: createMethod(5),
  // `Array.prototype.findIndex` method
  // https://tc39.es/ecma262/#sec-array.prototype.findIndex
  findIndex: createMethod(6),
  // `Array.prototype.filterReject` method
  // https://github.com/tc39/proposal-array-filtering
  filterReject: createMethod(7)
};


/***/ }),

/***/ "a3a6":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/classic2.cdfe2a8d.jpg";

/***/ }),

/***/ "a4c4":
/***/ (function(module, exports) {

/* global Deno -- Deno case */
module.exports = typeof Deno == 'object' && Deno && typeof Deno.version == 'object';


/***/ }),

/***/ "a4d3":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var global = __webpack_require__("da84");
var getBuiltIn = __webpack_require__("d066");
var IS_PURE = __webpack_require__("c430");
var DESCRIPTORS = __webpack_require__("83ab");
var NATIVE_SYMBOL = __webpack_require__("4930");
var USE_SYMBOL_AS_UID = __webpack_require__("fdbf");
var fails = __webpack_require__("d039");
var has = __webpack_require__("5135");
var isArray = __webpack_require__("e8b5");
var isObject = __webpack_require__("861d");
var anObject = __webpack_require__("825a");
var toObject = __webpack_require__("7b0b");
var toIndexedObject = __webpack_require__("fc6a");
var toPrimitive = __webpack_require__("c04e");
var createPropertyDescriptor = __webpack_require__("5c6c");
var nativeObjectCreate = __webpack_require__("7c73");
var objectKeys = __webpack_require__("df75");
var getOwnPropertyNamesModule = __webpack_require__("241c");
var getOwnPropertyNamesExternal = __webpack_require__("057f");
var getOwnPropertySymbolsModule = __webpack_require__("7418");
var getOwnPropertyDescriptorModule = __webpack_require__("06cf");
var definePropertyModule = __webpack_require__("9bf2");
var propertyIsEnumerableModule = __webpack_require__("d1e7");
var createNonEnumerableProperty = __webpack_require__("9112");
var redefine = __webpack_require__("6eeb");
var shared = __webpack_require__("5692");
var sharedKey = __webpack_require__("f772");
var hiddenKeys = __webpack_require__("d012");
var uid = __webpack_require__("90e3");
var wellKnownSymbol = __webpack_require__("b622");
var wrappedWellKnownSymbolModule = __webpack_require__("e538");
var defineWellKnownSymbol = __webpack_require__("746f");
var setToStringTag = __webpack_require__("d44e");
var InternalStateModule = __webpack_require__("69f3");
var $forEach = __webpack_require__("b727").forEach;

var HIDDEN = sharedKey('hidden');
var SYMBOL = 'Symbol';
var PROTOTYPE = 'prototype';
var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(SYMBOL);
var ObjectPrototype = Object[PROTOTYPE];
var $Symbol = global.Symbol;
var $stringify = getBuiltIn('JSON', 'stringify');
var nativeGetOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
var nativeDefineProperty = definePropertyModule.f;
var nativeGetOwnPropertyNames = getOwnPropertyNamesExternal.f;
var nativePropertyIsEnumerable = propertyIsEnumerableModule.f;
var AllSymbols = shared('symbols');
var ObjectPrototypeSymbols = shared('op-symbols');
var StringToSymbolRegistry = shared('string-to-symbol-registry');
var SymbolToStringRegistry = shared('symbol-to-string-registry');
var WellKnownSymbolsStore = shared('wks');
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var USE_SETTER = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDescriptor = DESCRIPTORS && fails(function () {
  return nativeObjectCreate(nativeDefineProperty({}, 'a', {
    get: function () { return nativeDefineProperty(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (O, P, Attributes) {
  var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor(ObjectPrototype, P);
  if (ObjectPrototypeDescriptor) delete ObjectPrototype[P];
  nativeDefineProperty(O, P, Attributes);
  if (ObjectPrototypeDescriptor && O !== ObjectPrototype) {
    nativeDefineProperty(ObjectPrototype, P, ObjectPrototypeDescriptor);
  }
} : nativeDefineProperty;

var wrap = function (tag, description) {
  var symbol = AllSymbols[tag] = nativeObjectCreate($Symbol[PROTOTYPE]);
  setInternalState(symbol, {
    type: SYMBOL,
    tag: tag,
    description: description
  });
  if (!DESCRIPTORS) symbol.description = description;
  return symbol;
};

var isSymbol = USE_SYMBOL_AS_UID ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return Object(it) instanceof $Symbol;
};

var $defineProperty = function defineProperty(O, P, Attributes) {
  if (O === ObjectPrototype) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
  anObject(O);
  var key = toPrimitive(P, true);
  anObject(Attributes);
  if (has(AllSymbols, key)) {
    if (!Attributes.enumerable) {
      if (!has(O, HIDDEN)) nativeDefineProperty(O, HIDDEN, createPropertyDescriptor(1, {}));
      O[HIDDEN][key] = true;
    } else {
      if (has(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
      Attributes = nativeObjectCreate(Attributes, { enumerable: createPropertyDescriptor(0, false) });
    } return setSymbolDescriptor(O, key, Attributes);
  } return nativeDefineProperty(O, key, Attributes);
};

var $defineProperties = function defineProperties(O, Properties) {
  anObject(O);
  var properties = toIndexedObject(Properties);
  var keys = objectKeys(properties).concat($getOwnPropertySymbols(properties));
  $forEach(keys, function (key) {
    if (!DESCRIPTORS || $propertyIsEnumerable.call(properties, key)) $defineProperty(O, key, properties[key]);
  });
  return O;
};

var $create = function create(O, Properties) {
  return Properties === undefined ? nativeObjectCreate(O) : $defineProperties(nativeObjectCreate(O), Properties);
};

var $propertyIsEnumerable = function propertyIsEnumerable(V) {
  var P = toPrimitive(V, true);
  var enumerable = nativePropertyIsEnumerable.call(this, P);
  if (this === ObjectPrototype && has(AllSymbols, P) && !has(ObjectPrototypeSymbols, P)) return false;
  return enumerable || !has(this, P) || !has(AllSymbols, P) || has(this, HIDDEN) && this[HIDDEN][P] ? enumerable : true;
};

var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
  var it = toIndexedObject(O);
  var key = toPrimitive(P, true);
  if (it === ObjectPrototype && has(AllSymbols, key) && !has(ObjectPrototypeSymbols, key)) return;
  var descriptor = nativeGetOwnPropertyDescriptor(it, key);
  if (descriptor && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) {
    descriptor.enumerable = true;
  }
  return descriptor;
};

var $getOwnPropertyNames = function getOwnPropertyNames(O) {
  var names = nativeGetOwnPropertyNames(toIndexedObject(O));
  var result = [];
  $forEach(names, function (key) {
    if (!has(AllSymbols, key) && !has(hiddenKeys, key)) result.push(key);
  });
  return result;
};

var $getOwnPropertySymbols = function getOwnPropertySymbols(O) {
  var IS_OBJECT_PROTOTYPE = O === ObjectPrototype;
  var names = nativeGetOwnPropertyNames(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject(O));
  var result = [];
  $forEach(names, function (key) {
    if (has(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || has(ObjectPrototype, key))) {
      result.push(AllSymbols[key]);
    }
  });
  return result;
};

// `Symbol` constructor
// https://tc39.es/ecma262/#sec-symbol-constructor
if (!NATIVE_SYMBOL) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor');
    var description = !arguments.length || arguments[0] === undefined ? undefined : String(arguments[0]);
    var tag = uid(description);
    var setter = function (value) {
      if (this === ObjectPrototype) setter.call(ObjectPrototypeSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDescriptor(this, tag, createPropertyDescriptor(1, value));
    };
    if (DESCRIPTORS && USE_SETTER) setSymbolDescriptor(ObjectPrototype, tag, { configurable: true, set: setter });
    return wrap(tag, description);
  };

  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return getInternalState(this).tag;
  });

  redefine($Symbol, 'withoutSetter', function (description) {
    return wrap(uid(description), description);
  });

  propertyIsEnumerableModule.f = $propertyIsEnumerable;
  definePropertyModule.f = $defineProperty;
  getOwnPropertyDescriptorModule.f = $getOwnPropertyDescriptor;
  getOwnPropertyNamesModule.f = getOwnPropertyNamesExternal.f = $getOwnPropertyNames;
  getOwnPropertySymbolsModule.f = $getOwnPropertySymbols;

  wrappedWellKnownSymbolModule.f = function (name) {
    return wrap(wellKnownSymbol(name), name);
  };

  if (DESCRIPTORS) {
    // https://github.com/tc39/proposal-Symbol-description
    nativeDefineProperty($Symbol[PROTOTYPE], 'description', {
      configurable: true,
      get: function description() {
        return getInternalState(this).description;
      }
    });
    if (!IS_PURE) {
      redefine(ObjectPrototype, 'propertyIsEnumerable', $propertyIsEnumerable, { unsafe: true });
    }
  }
}

$({ global: true, wrap: true, forced: !NATIVE_SYMBOL, sham: !NATIVE_SYMBOL }, {
  Symbol: $Symbol
});

$forEach(objectKeys(WellKnownSymbolsStore), function (name) {
  defineWellKnownSymbol(name);
});

$({ target: SYMBOL, stat: true, forced: !NATIVE_SYMBOL }, {
  // `Symbol.for` method
  // https://tc39.es/ecma262/#sec-symbol.for
  'for': function (key) {
    var string = String(key);
    if (has(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
    var symbol = $Symbol(string);
    StringToSymbolRegistry[string] = symbol;
    SymbolToStringRegistry[symbol] = string;
    return symbol;
  },
  // `Symbol.keyFor` method
  // https://tc39.es/ecma262/#sec-symbol.keyfor
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol');
    if (has(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];
  },
  useSetter: function () { USE_SETTER = true; },
  useSimple: function () { USE_SETTER = false; }
});

$({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL, sham: !DESCRIPTORS }, {
  // `Object.create` method
  // https://tc39.es/ecma262/#sec-object.create
  create: $create,
  // `Object.defineProperty` method
  // https://tc39.es/ecma262/#sec-object.defineproperty
  defineProperty: $defineProperty,
  // `Object.defineProperties` method
  // https://tc39.es/ecma262/#sec-object.defineproperties
  defineProperties: $defineProperties,
  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.es/ecma262/#sec-object.getownpropertydescriptors
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor
});

$({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL }, {
  // `Object.getOwnPropertyNames` method
  // https://tc39.es/ecma262/#sec-object.getownpropertynames
  getOwnPropertyNames: $getOwnPropertyNames,
  // `Object.getOwnPropertySymbols` method
  // https://tc39.es/ecma262/#sec-object.getownpropertysymbols
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
// https://bugs.chromium.org/p/v8/issues/detail?id=3443
$({ target: 'Object', stat: true, forced: fails(function () { getOwnPropertySymbolsModule.f(1); }) }, {
  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
    return getOwnPropertySymbolsModule.f(toObject(it));
  }
});

// `JSON.stringify` method behavior with symbols
// https://tc39.es/ecma262/#sec-json.stringify
if ($stringify) {
  var FORCED_JSON_STRINGIFY = !NATIVE_SYMBOL || fails(function () {
    var symbol = $Symbol();
    // MS Edge converts symbol values to JSON as {}
    return $stringify([symbol]) != '[null]'
      // WebKit converts symbol values to JSON as null
      || $stringify({ a: symbol }) != '{}'
      // V8 throws on boxed symbols
      || $stringify(Object(symbol)) != '{}';
  });

  $({ target: 'JSON', stat: true, forced: FORCED_JSON_STRINGIFY }, {
    // eslint-disable-next-line no-unused-vars -- required for `.length`
    stringify: function stringify(it, replacer, space) {
      var args = [it];
      var index = 1;
      var $replacer;
      while (arguments.length > index) args.push(arguments[index++]);
      $replacer = replacer;
      if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
      if (!isArray(replacer)) replacer = function (key, value) {
        if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
        if (!isSymbol(value)) return value;
      };
      args[1] = replacer;
      return $stringify.apply(null, args);
    }
  });
}

// `Symbol.prototype[@@toPrimitive]` method
// https://tc39.es/ecma262/#sec-symbol.prototype-@@toprimitive
if (!$Symbol[PROTOTYPE][TO_PRIMITIVE]) {
  createNonEnumerableProperty($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
}
// `Symbol.prototype[@@toStringTag]` property
// https://tc39.es/ecma262/#sec-symbol.prototype-@@tostringtag
setToStringTag($Symbol, SYMBOL);

hiddenKeys[HIDDEN] = true;


/***/ }),

/***/ "a630":
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__("23e7");
var from = __webpack_require__("4df4");
var checkCorrectnessOfIteration = __webpack_require__("1c7e");

var INCORRECT_ITERATION = !checkCorrectnessOfIteration(function (iterable) {
  // eslint-disable-next-line es/no-array-from -- required for testing
  Array.from(iterable);
});

// `Array.from` method
// https://tc39.es/ecma262/#sec-array.from
$({ target: 'Array', stat: true, forced: INCORRECT_ITERATION }, {
  from: from
});


/***/ }),

/***/ "a640":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__("d039");

module.exports = function (METHOD_NAME, argument) {
  var method = [][METHOD_NAME];
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call,no-throw-literal -- required for testing
    method.call(null, argument || function () { throw 1; }, 1);
  });
};


/***/ }),

/***/ "a691":
/***/ (function(module, exports) {

var ceil = Math.ceil;
var floor = Math.floor;

// `ToInteger` abstract operation
// https://tc39.es/ecma262/#sec-tointeger
module.exports = function (argument) {
  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
};


/***/ }),

/***/ "a6d2":
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable no-proto -- safe */
var uncurryThis = __webpack_require__("3545");
var anObject = __webpack_require__("0e66");
var aPossiblePrototype = __webpack_require__("07b9");

// `Object.setPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.
// eslint-disable-next-line es-x/no-object-setprototypeof -- safe
module.exports = Object.setPrototypeOf || ('__proto__' in {} ? function () {
  var CORRECT_SETTER = false;
  var test = {};
  var setter;
  try {
    // eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
    setter = uncurryThis(Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set);
    setter(test, []);
    CORRECT_SETTER = test instanceof Array;
  } catch (error) { /* empty */ }
  return function setPrototypeOf(O, proto) {
    anObject(O);
    aPossiblePrototype(proto);
    if (CORRECT_SETTER) setter(O, proto);
    else O.__proto__ = proto;
    return O;
  };
}() : undefined);


/***/ }),

/***/ "a7da":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var charAt = __webpack_require__("aac4").charAt;
var toString = __webpack_require__("cc00");
var InternalStateModule = __webpack_require__("1a2e");
var defineIterator = __webpack_require__("f7da");

var STRING_ITERATOR = 'String Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(STRING_ITERATOR);

// `String.prototype[@@iterator]` method
// https://tc39.es/ecma262/#sec-string.prototype-@@iterator
defineIterator(String, 'String', function (iterated) {
  setInternalState(this, {
    type: STRING_ITERATOR,
    string: toString(iterated),
    index: 0
  });
// `%StringIteratorPrototype%.next` method
// https://tc39.es/ecma262/#sec-%stringiteratorprototype%.next
}, function next() {
  var state = getInternalState(this);
  var string = state.string;
  var index = state.index;
  var point;
  if (index >= string.length) return { value: undefined, done: true };
  point = charAt(string, index);
  state.index += point.length;
  return { value: point, done: false };
});


/***/ }),

/***/ "a988":
/***/ (function(module, exports, __webpack_require__) {

var uncurryThis = __webpack_require__("3545");
var hasOwn = __webpack_require__("74c2");
var toIndexedObject = __webpack_require__("f11f");
var indexOf = __webpack_require__("64e0").indexOf;
var hiddenKeys = __webpack_require__("cc24");

var push = uncurryThis([].push);

module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !hasOwn(hiddenKeys, key) && hasOwn(O, key) && push(result, key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (hasOwn(O, key = names[i++])) {
    ~indexOf(result, key) || push(result, key);
  }
  return result;
};


/***/ }),

/***/ "aac4":
/***/ (function(module, exports, __webpack_require__) {

var uncurryThis = __webpack_require__("3545");
var toIntegerOrInfinity = __webpack_require__("f0c6");
var toString = __webpack_require__("cc00");
var requireObjectCoercible = __webpack_require__("9522");

var charAt = uncurryThis(''.charAt);
var charCodeAt = uncurryThis(''.charCodeAt);
var stringSlice = uncurryThis(''.slice);

var createMethod = function (CONVERT_TO_STRING) {
  return function ($this, pos) {
    var S = toString(requireObjectCoercible($this));
    var position = toIntegerOrInfinity(pos);
    var size = S.length;
    var first, second;
    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
    first = charCodeAt(S, position);
    return first < 0xD800 || first > 0xDBFF || position + 1 === size
      || (second = charCodeAt(S, position + 1)) < 0xDC00 || second > 0xDFFF
        ? CONVERT_TO_STRING
          ? charAt(S, position)
          : first
        : CONVERT_TO_STRING
          ? stringSlice(S, position, position + 2)
          : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
  };
};

module.exports = {
  // `String.prototype.codePointAt` method
  // https://tc39.es/ecma262/#sec-string.prototype.codepointat
  codeAt: createMethod(false),
  // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at
  charAt: createMethod(true)
};


/***/ }),

/***/ "ab2c":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("b6b3");
var IS_PURE = __webpack_require__("c009");
var IS_NODE = __webpack_require__("30bf");
var global = __webpack_require__("92f7");
var call = __webpack_require__("ef94");
var defineBuiltIn = __webpack_require__("669c");
var setPrototypeOf = __webpack_require__("a6d2");
var setToStringTag = __webpack_require__("9f8d");
var setSpecies = __webpack_require__("ad0f");
var aCallable = __webpack_require__("50a9");
var isCallable = __webpack_require__("ac9e");
var isObject = __webpack_require__("7313");
var anInstance = __webpack_require__("39e9");
var speciesConstructor = __webpack_require__("9753");
var task = __webpack_require__("cd12").set;
var microtask = __webpack_require__("8bfc");
var hostReportErrors = __webpack_require__("387a");
var perform = __webpack_require__("df11");
var Queue = __webpack_require__("afaf");
var InternalStateModule = __webpack_require__("1a2e");
var NativePromiseConstructor = __webpack_require__("4835");
var PromiseConstructorDetection = __webpack_require__("b93c");
var newPromiseCapabilityModule = __webpack_require__("dae8");

var PROMISE = 'Promise';
var FORCED_PROMISE_CONSTRUCTOR = PromiseConstructorDetection.CONSTRUCTOR;
var NATIVE_PROMISE_REJECTION_EVENT = PromiseConstructorDetection.REJECTION_EVENT;
var NATIVE_PROMISE_SUBCLASSING = PromiseConstructorDetection.SUBCLASSING;
var getInternalPromiseState = InternalStateModule.getterFor(PROMISE);
var setInternalState = InternalStateModule.set;
var NativePromisePrototype = NativePromiseConstructor && NativePromiseConstructor.prototype;
var PromiseConstructor = NativePromiseConstructor;
var PromisePrototype = NativePromisePrototype;
var TypeError = global.TypeError;
var document = global.document;
var process = global.process;
var newPromiseCapability = newPromiseCapabilityModule.f;
var newGenericPromiseCapability = newPromiseCapability;

var DISPATCH_EVENT = !!(document && document.createEvent && global.dispatchEvent);
var UNHANDLED_REJECTION = 'unhandledrejection';
var REJECTION_HANDLED = 'rejectionhandled';
var PENDING = 0;
var FULFILLED = 1;
var REJECTED = 2;
var HANDLED = 1;
var UNHANDLED = 2;

var Internal, OwnPromiseCapability, PromiseWrapper, nativeThen;

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && isCallable(then = it.then) ? then : false;
};

var callReaction = function (reaction, state) {
  var value = state.value;
  var ok = state.state == FULFILLED;
  var handler = ok ? reaction.ok : reaction.fail;
  var resolve = reaction.resolve;
  var reject = reaction.reject;
  var domain = reaction.domain;
  var result, then, exited;
  try {
    if (handler) {
      if (!ok) {
        if (state.rejection === UNHANDLED) onHandleUnhandled(state);
        state.rejection = HANDLED;
      }
      if (handler === true) result = value;
      else {
        if (domain) domain.enter();
        result = handler(value); // can throw
        if (domain) {
          domain.exit();
          exited = true;
        }
      }
      if (result === reaction.promise) {
        reject(TypeError('Promise-chain cycle'));
      } else if (then = isThenable(result)) {
        call(then, result, resolve, reject);
      } else resolve(result);
    } else reject(value);
  } catch (error) {
    if (domain && !exited) domain.exit();
    reject(error);
  }
};

var notify = function (state, isReject) {
  if (state.notified) return;
  state.notified = true;
  microtask(function () {
    var reactions = state.reactions;
    var reaction;
    while (reaction = reactions.get()) {
      callReaction(reaction, state);
    }
    state.notified = false;
    if (isReject && !state.rejection) onUnhandled(state);
  });
};

var dispatchEvent = function (name, promise, reason) {
  var event, handler;
  if (DISPATCH_EVENT) {
    event = document.createEvent('Event');
    event.promise = promise;
    event.reason = reason;
    event.initEvent(name, false, true);
    global.dispatchEvent(event);
  } else event = { promise: promise, reason: reason };
  if (!NATIVE_PROMISE_REJECTION_EVENT && (handler = global['on' + name])) handler(event);
  else if (name === UNHANDLED_REJECTION) hostReportErrors('Unhandled promise rejection', reason);
};

var onUnhandled = function (state) {
  call(task, global, function () {
    var promise = state.facade;
    var value = state.value;
    var IS_UNHANDLED = isUnhandled(state);
    var result;
    if (IS_UNHANDLED) {
      result = perform(function () {
        if (IS_NODE) {
          process.emit('unhandledRejection', value, promise);
        } else dispatchEvent(UNHANDLED_REJECTION, promise, value);
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      state.rejection = IS_NODE || isUnhandled(state) ? UNHANDLED : HANDLED;
      if (result.error) throw result.value;
    }
  });
};

var isUnhandled = function (state) {
  return state.rejection !== HANDLED && !state.parent;
};

var onHandleUnhandled = function (state) {
  call(task, global, function () {
    var promise = state.facade;
    if (IS_NODE) {
      process.emit('rejectionHandled', promise);
    } else dispatchEvent(REJECTION_HANDLED, promise, state.value);
  });
};

var bind = function (fn, state, unwrap) {
  return function (value) {
    fn(state, value, unwrap);
  };
};

var internalReject = function (state, value, unwrap) {
  if (state.done) return;
  state.done = true;
  if (unwrap) state = unwrap;
  state.value = value;
  state.state = REJECTED;
  notify(state, true);
};

var internalResolve = function (state, value, unwrap) {
  if (state.done) return;
  state.done = true;
  if (unwrap) state = unwrap;
  try {
    if (state.facade === value) throw TypeError("Promise can't be resolved itself");
    var then = isThenable(value);
    if (then) {
      microtask(function () {
        var wrapper = { done: false };
        try {
          call(then, value,
            bind(internalResolve, wrapper, state),
            bind(internalReject, wrapper, state)
          );
        } catch (error) {
          internalReject(wrapper, error, state);
        }
      });
    } else {
      state.value = value;
      state.state = FULFILLED;
      notify(state, false);
    }
  } catch (error) {
    internalReject({ done: false }, error, state);
  }
};

// constructor polyfill
if (FORCED_PROMISE_CONSTRUCTOR) {
  // 25.4.3.1 Promise(executor)
  PromiseConstructor = function Promise(executor) {
    anInstance(this, PromisePrototype);
    aCallable(executor);
    call(Internal, this);
    var state = getInternalPromiseState(this);
    try {
      executor(bind(internalResolve, state), bind(internalReject, state));
    } catch (error) {
      internalReject(state, error);
    }
  };

  PromisePrototype = PromiseConstructor.prototype;

  // eslint-disable-next-line no-unused-vars -- required for `.length`
  Internal = function Promise(executor) {
    setInternalState(this, {
      type: PROMISE,
      done: false,
      notified: false,
      parent: false,
      reactions: new Queue(),
      rejection: false,
      state: PENDING,
      value: undefined
    });
  };

  // `Promise.prototype.then` method
  // https://tc39.es/ecma262/#sec-promise.prototype.then
  Internal.prototype = defineBuiltIn(PromisePrototype, 'then', function then(onFulfilled, onRejected) {
    var state = getInternalPromiseState(this);
    var reaction = newPromiseCapability(speciesConstructor(this, PromiseConstructor));
    state.parent = true;
    reaction.ok = isCallable(onFulfilled) ? onFulfilled : true;
    reaction.fail = isCallable(onRejected) && onRejected;
    reaction.domain = IS_NODE ? process.domain : undefined;
    if (state.state == PENDING) state.reactions.add(reaction);
    else microtask(function () {
      callReaction(reaction, state);
    });
    return reaction.promise;
  });

  OwnPromiseCapability = function () {
    var promise = new Internal();
    var state = getInternalPromiseState(promise);
    this.promise = promise;
    this.resolve = bind(internalResolve, state);
    this.reject = bind(internalReject, state);
  };

  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === PromiseConstructor || C === PromiseWrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };

  if (!IS_PURE && isCallable(NativePromiseConstructor) && NativePromisePrototype !== Object.prototype) {
    nativeThen = NativePromisePrototype.then;

    if (!NATIVE_PROMISE_SUBCLASSING) {
      // make `Promise#then` return a polyfilled `Promise` for native promise-based APIs
      defineBuiltIn(NativePromisePrototype, 'then', function then(onFulfilled, onRejected) {
        var that = this;
        return new PromiseConstructor(function (resolve, reject) {
          call(nativeThen, that, resolve, reject);
        }).then(onFulfilled, onRejected);
      // https://github.com/zloirock/core-js/issues/640
      }, { unsafe: true });
    }

    // make `.constructor === Promise` work for native promise-based APIs
    try {
      delete NativePromisePrototype.constructor;
    } catch (error) { /* empty */ }

    // make `instanceof Promise` work for native promise-based APIs
    if (setPrototypeOf) {
      setPrototypeOf(NativePromisePrototype, PromisePrototype);
    }
  }
}

$({ global: true, constructor: true, wrap: true, forced: FORCED_PROMISE_CONSTRUCTOR }, {
  Promise: PromiseConstructor
});

setToStringTag(PromiseConstructor, PROMISE, false, true);
setSpecies(PROMISE);


/***/ }),

/***/ "ab8d":
/***/ (function(module, exports, __webpack_require__) {

var uncurryThis = __webpack_require__("3545");
var isCallable = __webpack_require__("ac9e");
var store = __webpack_require__("c1de");

var functionToString = uncurryThis(Function.toString);

// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
if (!isCallable(store.inspectSource)) {
  store.inspectSource = function (it) {
    return functionToString(it);
  };
}

module.exports = store.inspectSource;


/***/ }),

/***/ "abf2":
/***/ (function(module, exports, __webpack_require__) {

var getBuiltIn = __webpack_require__("fe3e");

module.exports = getBuiltIn('document', 'documentElement');


/***/ }),

/***/ "ac18":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/catalogOrganization.380bb277.jpg";

/***/ }),

/***/ "ac86":
/***/ (function(module, exports, __webpack_require__) {

var uncurryThis = __webpack_require__("3545");
var aCallable = __webpack_require__("50a9");
var NATIVE_BIND = __webpack_require__("14ad");

var bind = uncurryThis(uncurryThis.bind);

// optional / simple context binding
module.exports = function (fn, that) {
  aCallable(fn);
  return that === undefined ? fn : NATIVE_BIND ? bind(fn, that) : function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ "ac9e":
/***/ (function(module, exports) {

// `IsCallable` abstract operation
// https://tc39.es/ecma262/#sec-iscallable
module.exports = function (argument) {
  return typeof argument == 'function';
};


/***/ }),

/***/ "ad0f":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var getBuiltIn = __webpack_require__("fe3e");
var definePropertyModule = __webpack_require__("eae2");
var wellKnownSymbol = __webpack_require__("df9f");
var DESCRIPTORS = __webpack_require__("50ce");

var SPECIES = wellKnownSymbol('species');

module.exports = function (CONSTRUCTOR_NAME) {
  var Constructor = getBuiltIn(CONSTRUCTOR_NAME);
  var defineProperty = definePropertyModule.f;

  if (DESCRIPTORS && Constructor && !Constructor[SPECIES]) {
    defineProperty(Constructor, SPECIES, {
      configurable: true,
      get: function () { return this; }
    });
  }
};


/***/ }),

/***/ "ad3e":
/***/ (function(module, exports, __webpack_require__) {

/* global ActiveXObject -- old IE, WSH */
var anObject = __webpack_require__("0e66");
var definePropertiesModule = __webpack_require__("c4dd");
var enumBugKeys = __webpack_require__("757f");
var hiddenKeys = __webpack_require__("cc24");
var html = __webpack_require__("abf2");
var documentCreateElement = __webpack_require__("eaef");
var sharedKey = __webpack_require__("7408");

var GT = '>';
var LT = '<';
var PROTOTYPE = 'prototype';
var SCRIPT = 'script';
var IE_PROTO = sharedKey('IE_PROTO');

var EmptyConstructor = function () { /* empty */ };

var scriptTag = function (content) {
  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
};

// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
var NullProtoObjectViaActiveX = function (activeXDocument) {
  activeXDocument.write(scriptTag(''));
  activeXDocument.close();
  var temp = activeXDocument.parentWindow.Object;
  activeXDocument = null; // avoid memory leak
  return temp;
};

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var NullProtoObjectViaIFrame = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var JS = 'java' + SCRIPT + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe);
  // https://github.com/zloirock/core-js/issues/475
  iframe.src = String(JS);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(scriptTag('document.F=Object'));
  iframeDocument.close();
  return iframeDocument.F;
};

// Check for document.domain and active x support
// No need to use active x approach when document.domain is not set
// see https://github.com/es-shims/es5-shim/issues/150
// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
// avoid IE GC bug
var activeXDocument;
var NullProtoObject = function () {
  try {
    activeXDocument = new ActiveXObject('htmlfile');
  } catch (error) { /* ignore */ }
  NullProtoObject = typeof document != 'undefined'
    ? document.domain && activeXDocument
      ? NullProtoObjectViaActiveX(activeXDocument) // old IE
      : NullProtoObjectViaIFrame()
    : NullProtoObjectViaActiveX(activeXDocument); // WSH
  var length = enumBugKeys.length;
  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
  return NullProtoObject();
};

hiddenKeys[IE_PROTO] = true;

// `Object.create` method
// https://tc39.es/ecma262/#sec-object.create
// eslint-disable-next-line es-x/no-object-create -- safe
module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    EmptyConstructor[PROTOTYPE] = anObject(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = NullProtoObject();
  return Properties === undefined ? result : definePropertiesModule.f(result, Properties);
};


/***/ }),

/***/ "ae74":
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "ae93":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__("d039");
var getPrototypeOf = __webpack_require__("e163");
var createNonEnumerableProperty = __webpack_require__("9112");
var has = __webpack_require__("5135");
var wellKnownSymbol = __webpack_require__("b622");
var IS_PURE = __webpack_require__("c430");

var ITERATOR = wellKnownSymbol('iterator');
var BUGGY_SAFARI_ITERATORS = false;

var returnThis = function () { return this; };

// `%IteratorPrototype%` object
// https://tc39.es/ecma262/#sec-%iteratorprototype%-object
var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

/* eslint-disable es/no-array-prototype-keys -- safe */
if ([].keys) {
  arrayIterator = [].keys();
  // Safari 8 has buggy iterators w/o `next`
  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
  else {
    PrototypeOfArrayIteratorPrototype = getPrototypeOf(getPrototypeOf(arrayIterator));
    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
  }
}

var NEW_ITERATOR_PROTOTYPE = IteratorPrototype == undefined || fails(function () {
  var test = {};
  // FF44- legacy iterators case
  return IteratorPrototype[ITERATOR].call(test) !== test;
});

if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype = {};

// `%IteratorPrototype%[@@iterator]()` method
// https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator
if ((!IS_PURE || NEW_ITERATOR_PROTOTYPE) && !has(IteratorPrototype, ITERATOR)) {
  createNonEnumerableProperty(IteratorPrototype, ITERATOR, returnThis);
}

module.exports = {
  IteratorPrototype: IteratorPrototype,
  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
};


/***/ }),

/***/ "aed3":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toObject = __webpack_require__("40f9");
var toAbsoluteIndex = __webpack_require__("d909");
var lengthOfArrayLike = __webpack_require__("7b32");

// `Array.prototype.fill` method implementation
// https://tc39.es/ecma262/#sec-array.prototype.fill
module.exports = function fill(value /* , start = 0, end = @length */) {
  var O = toObject(this);
  var length = lengthOfArrayLike(O);
  var argumentsLength = arguments.length;
  var index = toAbsoluteIndex(argumentsLength > 1 ? arguments[1] : undefined, length);
  var end = argumentsLength > 2 ? arguments[2] : undefined;
  var endPos = end === undefined ? length : toAbsoluteIndex(end, length);
  while (endPos > index) O[index++] = value;
  return O;
};


/***/ }),

/***/ "afaf":
/***/ (function(module, exports) {

var Queue = function () {
  this.head = null;
  this.tail = null;
};

Queue.prototype = {
  add: function (item) {
    var entry = { item: item, next: null };
    if (this.head) this.tail.next = entry;
    else this.head = entry;
    this.tail = entry;
  },
  get: function () {
    var entry = this.head;
    if (entry) {
      this.head = entry.next;
      if (this.tail === entry) this.tail = null;
      return entry.item;
    }
  }
};

module.exports = Queue;


/***/ }),

/***/ "b041":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var TO_STRING_TAG_SUPPORT = __webpack_require__("00ee");
var classof = __webpack_require__("f5df");

// `Object.prototype.toString` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.tostring
module.exports = TO_STRING_TAG_SUPPORT ? {}.toString : function toString() {
  return '[object ' + classof(this) + ']';
};


/***/ }),

/***/ "b0c0":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("83ab");
var defineProperty = __webpack_require__("9bf2").f;

var FunctionPrototype = Function.prototype;
var FunctionPrototypeToString = FunctionPrototype.toString;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// Function instances `.name` property
// https://tc39.es/ecma262/#sec-function-instances-name
if (DESCRIPTORS && !(NAME in FunctionPrototype)) {
  defineProperty(FunctionPrototype, NAME, {
    configurable: true,
    get: function () {
      try {
        return FunctionPrototypeToString.call(this).match(nameRE)[1];
      } catch (error) {
        return '';
      }
    }
  });
}


/***/ }),

/***/ "b11f":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var TO_STRING_TAG_SUPPORT = __webpack_require__("172e");
var classof = __webpack_require__("f4c8");

// `Object.prototype.toString` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.tostring
module.exports = TO_STRING_TAG_SUPPORT ? {}.toString : function toString() {
  return '[object ' + classof(this) + ']';
};


/***/ }),

/***/ "b19f":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("b6b3");
var uncurryThis = __webpack_require__("3545");
var notARegExp = __webpack_require__("ba65");
var requireObjectCoercible = __webpack_require__("9522");
var toString = __webpack_require__("cc00");
var correctIsRegExpLogic = __webpack_require__("c453");

var stringIndexOf = uncurryThis(''.indexOf);

// `String.prototype.includes` method
// https://tc39.es/ecma262/#sec-string.prototype.includes
$({ target: 'String', proto: true, forced: !correctIsRegExpLogic('includes') }, {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~stringIndexOf(
      toString(requireObjectCoercible(this)),
      toString(notARegExp(searchString)),
      arguments.length > 1 ? arguments[1] : undefined
    );
  }
});


/***/ }),

/***/ "b2e8":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/pinkGrape.32c2587b.jpg";

/***/ }),

/***/ "b533":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/blueSky.3c7f8ccb.jpg";

/***/ }),

/***/ "b622":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var shared = __webpack_require__("5692");
var has = __webpack_require__("5135");
var uid = __webpack_require__("90e3");
var NATIVE_SYMBOL = __webpack_require__("4930");
var USE_SYMBOL_AS_UID = __webpack_require__("fdbf");

var WellKnownSymbolsStore = shared('wks');
var Symbol = global.Symbol;
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol : Symbol && Symbol.withoutSetter || uid;

module.exports = function (name) {
  if (!has(WellKnownSymbolsStore, name) || !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name] == 'string')) {
    if (NATIVE_SYMBOL && has(Symbol, name)) {
      WellKnownSymbolsStore[name] = Symbol[name];
    } else {
      WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
    }
  } return WellKnownSymbolsStore[name];
};


/***/ }),

/***/ "b64b":
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__("23e7");
var toObject = __webpack_require__("7b0b");
var nativeKeys = __webpack_require__("df75");
var fails = __webpack_require__("d039");

var FAILS_ON_PRIMITIVES = fails(function () { nativeKeys(1); });

// `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
$({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES }, {
  keys: function keys(it) {
    return nativeKeys(toObject(it));
  }
});


/***/ }),

/***/ "b693":
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   true ? module.exports : undefined
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}


/***/ }),

/***/ "b6b3":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("92f7");
var getOwnPropertyDescriptor = __webpack_require__("84e7").f;
var createNonEnumerableProperty = __webpack_require__("88a7");
var defineBuiltIn = __webpack_require__("669c");
var defineGlobalProperty = __webpack_require__("9d4a");
var copyConstructorProperties = __webpack_require__("e560");
var isForced = __webpack_require__("5dc1");

/*
  options.target         - name of the target object
  options.global         - target is the global object
  options.stat           - export as static methods of target
  options.proto          - export as prototype methods of target
  options.real           - real prototype method for the `pure` version
  options.forced         - export even if the native feature is available
  options.bind           - bind methods to the target, required for the `pure` version
  options.wrap           - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe         - use the simple assignment of property instead of delete + defineProperty
  options.sham           - add a flag to not completely full polyfills
  options.enumerable     - export as enumerable property
  options.dontCallGetSet - prevent calling a getter on target
  options.name           - the .name of the function if it does not match the key
*/
module.exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global;
  } else if (STATIC) {
    target = global[TARGET] || defineGlobalProperty(TARGET, {});
  } else {
    target = (global[TARGET] || {}).prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.dontCallGetSet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty == typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty(sourceProperty, 'sham', true);
    }
    defineBuiltIn(target, key, sourceProperty, options);
  }
};


/***/ }),

/***/ "b727":
/***/ (function(module, exports, __webpack_require__) {

var bind = __webpack_require__("0366");
var IndexedObject = __webpack_require__("44ad");
var toObject = __webpack_require__("7b0b");
var toLength = __webpack_require__("50c4");
var arraySpeciesCreate = __webpack_require__("65f0");

var push = [].push;

// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterOut }` methods implementation
var createMethod = function (TYPE) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var IS_FILTER_OUT = TYPE == 7;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  return function ($this, callbackfn, that, specificCreate) {
    var O = toObject($this);
    var self = IndexedObject(O);
    var boundFunction = bind(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var create = specificCreate || arraySpeciesCreate;
    var target = IS_MAP ? create($this, length) : IS_FILTER || IS_FILTER_OUT ? create($this, 0) : undefined;
    var value, result;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      value = self[index];
      result = boundFunction(value, index, O);
      if (TYPE) {
        if (IS_MAP) target[index] = result; // map
        else if (result) switch (TYPE) {
          case 3: return true;              // some
          case 5: return value;             // find
          case 6: return index;             // findIndex
          case 2: push.call(target, value); // filter
        } else switch (TYPE) {
          case 4: return false;             // every
          case 7: push.call(target, value); // filterOut
        }
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
  };
};

module.exports = {
  // `Array.prototype.forEach` method
  // https://tc39.es/ecma262/#sec-array.prototype.foreach
  forEach: createMethod(0),
  // `Array.prototype.map` method
  // https://tc39.es/ecma262/#sec-array.prototype.map
  map: createMethod(1),
  // `Array.prototype.filter` method
  // https://tc39.es/ecma262/#sec-array.prototype.filter
  filter: createMethod(2),
  // `Array.prototype.some` method
  // https://tc39.es/ecma262/#sec-array.prototype.some
  some: createMethod(3),
  // `Array.prototype.every` method
  // https://tc39.es/ecma262/#sec-array.prototype.every
  every: createMethod(4),
  // `Array.prototype.find` method
  // https://tc39.es/ecma262/#sec-array.prototype.find
  find: createMethod(5),
  // `Array.prototype.findIndex` method
  // https://tc39.es/ecma262/#sec-array.prototype.findIndex
  findIndex: createMethod(6),
  // `Array.prototype.filterOut` method
  // https://github.com/tc39/proposal-array-filtering
  filterOut: createMethod(7)
};


/***/ }),

/***/ "b802":
/***/ (function(module, exports, __webpack_require__) {

var IS_PURE = __webpack_require__("c009");
var store = __webpack_require__("c1de");

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.24.0',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2014-2022 Denis Pushkarev (zloirock.ru)',
  license: 'https://github.com/zloirock/core-js/blob/v3.24.0/LICENSE',
  source: 'https://github.com/zloirock/core-js'
});


/***/ }),

/***/ "b93c":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("92f7");
var NativePromiseConstructor = __webpack_require__("4835");
var isCallable = __webpack_require__("ac9e");
var isForced = __webpack_require__("5dc1");
var inspectSource = __webpack_require__("ab8d");
var wellKnownSymbol = __webpack_require__("df9f");
var IS_BROWSER = __webpack_require__("902b");
var IS_DENO = __webpack_require__("a4c4");
var IS_PURE = __webpack_require__("c009");
var V8_VERSION = __webpack_require__("7fa2");

var NativePromisePrototype = NativePromiseConstructor && NativePromiseConstructor.prototype;
var SPECIES = wellKnownSymbol('species');
var SUBCLASSING = false;
var NATIVE_PROMISE_REJECTION_EVENT = isCallable(global.PromiseRejectionEvent);

var FORCED_PROMISE_CONSTRUCTOR = isForced('Promise', function () {
  var PROMISE_CONSTRUCTOR_SOURCE = inspectSource(NativePromiseConstructor);
  var GLOBAL_CORE_JS_PROMISE = PROMISE_CONSTRUCTOR_SOURCE !== String(NativePromiseConstructor);
  // V8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
  // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
  // We can't detect it synchronously, so just check versions
  if (!GLOBAL_CORE_JS_PROMISE && V8_VERSION === 66) return true;
  // We need Promise#{ catch, finally } in the pure version for preventing prototype pollution
  if (IS_PURE && !(NativePromisePrototype['catch'] && NativePromisePrototype['finally'])) return true;
  // We can't use @@species feature detection in V8 since it causes
  // deoptimization and performance degradation
  // https://github.com/zloirock/core-js/issues/679
  if (V8_VERSION < 51 || !/native code/.test(PROMISE_CONSTRUCTOR_SOURCE)) {
    // Detect correctness of subclassing with @@species support
    var promise = new NativePromiseConstructor(function (resolve) { resolve(1); });
    var FakePromise = function (exec) {
      exec(function () { /* empty */ }, function () { /* empty */ });
    };
    var constructor = promise.constructor = {};
    constructor[SPECIES] = FakePromise;
    SUBCLASSING = promise.then(function () { /* empty */ }) instanceof FakePromise;
    if (!SUBCLASSING) return true;
  // Unhandled rejections tracking support, NodeJS Promise without it fails @@species test
  } return !GLOBAL_CORE_JS_PROMISE && (IS_BROWSER || IS_DENO) && !NATIVE_PROMISE_REJECTION_EVENT;
});

module.exports = {
  CONSTRUCTOR: FORCED_PROMISE_CONSTRUCTOR,
  REJECTION_EVENT: NATIVE_PROMISE_REJECTION_EVENT,
  SUBCLASSING: SUBCLASSING
};


/***/ }),

/***/ "b9b1":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// TODO: Remove from `core-js@4` since it's moved to entry points
__webpack_require__("730c");
var uncurryThis = __webpack_require__("3545");
var defineBuiltIn = __webpack_require__("669c");
var regexpExec = __webpack_require__("ee0d");
var fails = __webpack_require__("3903");
var wellKnownSymbol = __webpack_require__("df9f");
var createNonEnumerableProperty = __webpack_require__("88a7");

var SPECIES = wellKnownSymbol('species');
var RegExpPrototype = RegExp.prototype;

module.exports = function (KEY, exec, FORCED, SHAM) {
  var SYMBOL = wellKnownSymbol(KEY);

  var DELEGATES_TO_SYMBOL = !fails(function () {
    // String methods call symbol-named RegEp methods
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  });

  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;

    if (KEY === 'split') {
      // We can't use real regex here since it causes deoptimization
      // and serious performance degradation in V8
      // https://github.com/zloirock/core-js/issues/306
      re = {};
      // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.
      re.constructor = {};
      re.constructor[SPECIES] = function () { return re; };
      re.flags = '';
      re[SYMBOL] = /./[SYMBOL];
    }

    re.exec = function () { execCalled = true; return null; };

    re[SYMBOL]('');
    return !execCalled;
  });

  if (
    !DELEGATES_TO_SYMBOL ||
    !DELEGATES_TO_EXEC ||
    FORCED
  ) {
    var uncurriedNativeRegExpMethod = uncurryThis(/./[SYMBOL]);
    var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
      var uncurriedNativeMethod = uncurryThis(nativeMethod);
      var $exec = regexp.exec;
      if ($exec === regexpExec || $exec === RegExpPrototype.exec) {
        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
          // The native String method already delegates to @@method (this
          // polyfilled function), leasing to infinite recursion.
          // We avoid it by directly calling the native @@method method.
          return { done: true, value: uncurriedNativeRegExpMethod(regexp, str, arg2) };
        }
        return { done: true, value: uncurriedNativeMethod(str, regexp, arg2) };
      }
      return { done: false };
    });

    defineBuiltIn(String.prototype, KEY, methods[0]);
    defineBuiltIn(RegExpPrototype, SYMBOL, methods[1]);
  }

  if (SHAM) createNonEnumerableProperty(RegExpPrototype[SYMBOL], 'sham', true);
};


/***/ }),

/***/ "ba65":
/***/ (function(module, exports, __webpack_require__) {

var isRegExp = __webpack_require__("ead7");

var $TypeError = TypeError;

module.exports = function (it) {
  if (isRegExp(it)) {
    throw $TypeError("The method doesn't accept regular expressions");
  } return it;
};


/***/ }),

/***/ "bd63":
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable es-x/no-symbol -- required for testing */
var NATIVE_SYMBOL = __webpack_require__("3fb6");

module.exports = NATIVE_SYMBOL
  && !Symbol.sham
  && typeof Symbol.iterator == 'symbol';


/***/ }),

/***/ "be18":
/***/ (function(module, exports, __webpack_require__) {

var toAbsoluteIndex = __webpack_require__("d909");
var lengthOfArrayLike = __webpack_require__("7b32");
var createProperty = __webpack_require__("362c");

var $Array = Array;
var max = Math.max;

module.exports = function (O, start, end) {
  var length = lengthOfArrayLike(O);
  var k = toAbsoluteIndex(start, length);
  var fin = toAbsoluteIndex(end === undefined ? length : end, length);
  var result = $Array(max(fin - k, 0));
  for (var n = 0; k < fin; k++, n++) createProperty(result, n, O[k]);
  result.length = n;
  return result;
};


/***/ }),

/***/ "c009":
/***/ (function(module, exports) {

module.exports = false;


/***/ }),

/***/ "c04e":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("861d");

// `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (input, PREFERRED_STRING) {
  if (!isObject(input)) return input;
  var fn, val;
  if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
  if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "c0d1":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var apply = __webpack_require__("a11c");
var call = __webpack_require__("ef94");
var uncurryThis = __webpack_require__("3545");
var fixRegExpWellKnownSymbolLogic = __webpack_require__("b9b1");
var isRegExp = __webpack_require__("ead7");
var anObject = __webpack_require__("0e66");
var requireObjectCoercible = __webpack_require__("9522");
var speciesConstructor = __webpack_require__("9753");
var advanceStringIndex = __webpack_require__("f8d1");
var toLength = __webpack_require__("fcce");
var toString = __webpack_require__("cc00");
var getMethod = __webpack_require__("d585");
var arraySlice = __webpack_require__("be18");
var callRegExpExec = __webpack_require__("e411");
var regexpExec = __webpack_require__("ee0d");
var stickyHelpers = __webpack_require__("8bf2");
var fails = __webpack_require__("3903");

var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y;
var MAX_UINT32 = 0xFFFFFFFF;
var min = Math.min;
var $push = [].push;
var exec = uncurryThis(/./.exec);
var push = uncurryThis($push);
var stringSlice = uncurryThis(''.slice);

// Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
// Weex JS has frozen built-in prototypes, so use try / catch wrapper
var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails(function () {
  // eslint-disable-next-line regexp/no-empty-group -- required for testing
  var re = /(?:)/;
  var originalExec = re.exec;
  re.exec = function () { return originalExec.apply(this, arguments); };
  var result = 'ab'.split(re);
  return result.length !== 2 || result[0] !== 'a' || result[1] !== 'b';
});

// @@split logic
fixRegExpWellKnownSymbolLogic('split', function (SPLIT, nativeSplit, maybeCallNative) {
  var internalSplit;
  if (
    'abbc'.split(/(b)*/)[1] == 'c' ||
    // eslint-disable-next-line regexp/no-empty-group -- required for testing
    'test'.split(/(?:)/, -1).length != 4 ||
    'ab'.split(/(?:ab)*/).length != 2 ||
    '.'.split(/(.?)(.?)/).length != 4 ||
    // eslint-disable-next-line regexp/no-empty-capturing-group, regexp/no-empty-group -- required for testing
    '.'.split(/()()/).length > 1 ||
    ''.split(/.?/).length
  ) {
    // based on es5-shim implementation, need to rework it
    internalSplit = function (separator, limit) {
      var string = toString(requireObjectCoercible(this));
      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
      if (lim === 0) return [];
      if (separator === undefined) return [string];
      // If `separator` is not a regex, use native split
      if (!isRegExp(separator)) {
        return call(nativeSplit, string, separator, lim);
      }
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var match, lastIndex, lastLength;
      while (match = call(regexpExec, separatorCopy, string)) {
        lastIndex = separatorCopy.lastIndex;
        if (lastIndex > lastLastIndex) {
          push(output, stringSlice(string, lastLastIndex, match.index));
          if (match.length > 1 && match.index < string.length) apply($push, output, arraySlice(match, 1));
          lastLength = match[0].length;
          lastLastIndex = lastIndex;
          if (output.length >= lim) break;
        }
        if (separatorCopy.lastIndex === match.index) separatorCopy.lastIndex++; // Avoid an infinite loop
      }
      if (lastLastIndex === string.length) {
        if (lastLength || !exec(separatorCopy, '')) push(output, '');
      } else push(output, stringSlice(string, lastLastIndex));
      return output.length > lim ? arraySlice(output, 0, lim) : output;
    };
  // Chakra, V8
  } else if ('0'.split(undefined, 0).length) {
    internalSplit = function (separator, limit) {
      return separator === undefined && limit === 0 ? [] : call(nativeSplit, this, separator, limit);
    };
  } else internalSplit = nativeSplit;

  return [
    // `String.prototype.split` method
    // https://tc39.es/ecma262/#sec-string.prototype.split
    function split(separator, limit) {
      var O = requireObjectCoercible(this);
      var splitter = separator == undefined ? undefined : getMethod(separator, SPLIT);
      return splitter
        ? call(splitter, separator, O, limit)
        : call(internalSplit, toString(O), separator, limit);
    },
    // `RegExp.prototype[@@split]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@split
    //
    // NOTE: This cannot be properly polyfilled in engines that don't support
    // the 'y' flag.
    function (string, limit) {
      var rx = anObject(this);
      var S = toString(string);
      var res = maybeCallNative(internalSplit, rx, S, limit, internalSplit !== nativeSplit);

      if (res.done) return res.value;

      var C = speciesConstructor(rx, RegExp);

      var unicodeMatching = rx.unicode;
      var flags = (rx.ignoreCase ? 'i' : '') +
                  (rx.multiline ? 'm' : '') +
                  (rx.unicode ? 'u' : '') +
                  (UNSUPPORTED_Y ? 'g' : 'y');

      // ^(? + rx + ) is needed, in combination with some S slicing, to
      // simulate the 'y' flag.
      var splitter = new C(UNSUPPORTED_Y ? '^(?:' + rx.source + ')' : rx, flags);
      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
      if (lim === 0) return [];
      if (S.length === 0) return callRegExpExec(splitter, S) === null ? [S] : [];
      var p = 0;
      var q = 0;
      var A = [];
      while (q < S.length) {
        splitter.lastIndex = UNSUPPORTED_Y ? 0 : q;
        var z = callRegExpExec(splitter, UNSUPPORTED_Y ? stringSlice(S, q) : S);
        var e;
        if (
          z === null ||
          (e = min(toLength(splitter.lastIndex + (UNSUPPORTED_Y ? q : 0)), S.length)) === p
        ) {
          q = advanceStringIndex(S, q, unicodeMatching);
        } else {
          push(A, stringSlice(S, p, q));
          if (A.length === lim) return A;
          for (var i = 1; i <= z.length - 1; i++) {
            push(A, z[i]);
            if (A.length === lim) return A;
          }
          q = p = e;
        }
      }
      push(A, stringSlice(S, p));
      return A;
    }
  ];
}, !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC, UNSUPPORTED_Y);


/***/ }),

/***/ "c0d2":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/classic3.19d6c347.jpg";

/***/ }),

/***/ "c1de":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("92f7");
var defineGlobalProperty = __webpack_require__("9d4a");

var SHARED = '__core-js_shared__';
var store = global[SHARED] || defineGlobalProperty(SHARED, {});

module.exports = store;


/***/ }),

/***/ "c27e":
/***/ (function(module, exports, __webpack_require__) {

var getBuiltIn = __webpack_require__("fe3e");
var uncurryThis = __webpack_require__("3545");
var getOwnPropertyNamesModule = __webpack_require__("3768");
var getOwnPropertySymbolsModule = __webpack_require__("1524");
var anObject = __webpack_require__("0e66");

var concat = uncurryThis([].concat);

// all object keys, includes non-enumerable and symbols
module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(it)) : keys;
};


/***/ }),

/***/ "c344":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("50ce");
var fails = __webpack_require__("3903");
var createElement = __webpack_require__("eaef");

// Thanks to IE8 for its funny defineProperty
module.exports = !DESCRIPTORS && !fails(function () {
  // eslint-disable-next-line es-x/no-object-defineproperty -- required for testing
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});


/***/ }),

/***/ "c430":
/***/ (function(module, exports) {

module.exports = false;


/***/ }),

/***/ "c453":
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__("df9f");

var MATCH = wellKnownSymbol('match');

module.exports = function (METHOD_NAME) {
  var regexp = /./;
  try {
    '/./'[METHOD_NAME](regexp);
  } catch (error1) {
    try {
      regexp[MATCH] = false;
      return '/./'[METHOD_NAME](regexp);
    } catch (error2) { /* empty */ }
  } return false;
};


/***/ }),

/***/ "c4b2":
/***/ (function(module, exports, __webpack_require__) {

var userAgent = __webpack_require__("6487");

module.exports = /web0s(?!.*chrome)/i.test(userAgent);


/***/ }),

/***/ "c4dd":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("50ce");
var V8_PROTOTYPE_DEFINE_BUG = __webpack_require__("8d65");
var definePropertyModule = __webpack_require__("eae2");
var anObject = __webpack_require__("0e66");
var toIndexedObject = __webpack_require__("f11f");
var objectKeys = __webpack_require__("58c5");

// `Object.defineProperties` method
// https://tc39.es/ecma262/#sec-object.defineproperties
// eslint-disable-next-line es-x/no-object-defineproperties -- safe
exports.f = DESCRIPTORS && !V8_PROTOTYPE_DEFINE_BUG ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var props = toIndexedObject(Properties);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) definePropertyModule.f(O, key = keys[index++], props[key]);
  return O;
};


/***/ }),

/***/ "c503":
/***/ (function(module, exports, __webpack_require__) {

var hasOwn = __webpack_require__("74c2");
var isCallable = __webpack_require__("ac9e");
var toObject = __webpack_require__("40f9");
var sharedKey = __webpack_require__("7408");
var CORRECT_PROTOTYPE_GETTER = __webpack_require__("c5d7");

var IE_PROTO = sharedKey('IE_PROTO');
var $Object = Object;
var ObjectPrototype = $Object.prototype;

// `Object.getPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.getprototypeof
// eslint-disable-next-line es-x/no-object-getprototypeof -- safe
module.exports = CORRECT_PROTOTYPE_GETTER ? $Object.getPrototypeOf : function (O) {
  var object = toObject(O);
  if (hasOwn(object, IE_PROTO)) return object[IE_PROTO];
  var constructor = object.constructor;
  if (isCallable(constructor) && object instanceof constructor) {
    return constructor.prototype;
  } return object instanceof $Object ? ObjectPrototype : null;
};


/***/ }),

/***/ "c5d7":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("3903");

module.exports = !fails(function () {
  function F() { /* empty */ }
  F.prototype.constructor = null;
  // eslint-disable-next-line es-x/no-object-getprototypeof -- required for testing
  return Object.getPrototypeOf(new F()) !== F.prototype;
});


/***/ }),

/***/ "c612":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/romanticPurple.7607e58a.jpg";

/***/ }),

/***/ "c6b6":
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ "c6cd":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var setGlobal = __webpack_require__("ce4e");

var SHARED = '__core-js_shared__';
var store = global[SHARED] || setGlobal(SHARED, {});

module.exports = store;


/***/ }),

/***/ "c8ba":
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "c8d3":
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__("b6b3");
var toObject = __webpack_require__("40f9");
var nativeKeys = __webpack_require__("58c5");
var fails = __webpack_require__("3903");

var FAILS_ON_PRIMITIVES = fails(function () { nativeKeys(1); });

// `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
$({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES }, {
  keys: function keys(it) {
    return nativeKeys(toObject(it));
  }
});


/***/ }),

/***/ "ca62":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/freshRed.1c5bde77.jpg";

/***/ }),

/***/ "ca84":
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__("5135");
var toIndexedObject = __webpack_require__("fc6a");
var indexOf = __webpack_require__("4d64").indexOf;
var hiddenKeys = __webpack_require__("d012");

module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~indexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),

/***/ "cbe7":
/***/ (function(module, exports, __webpack_require__) {

var call = __webpack_require__("ef94");
var isCallable = __webpack_require__("ac9e");
var isObject = __webpack_require__("7313");

var $TypeError = TypeError;

// `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive
module.exports = function (input, pref) {
  var fn, val;
  if (pref === 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  if (isCallable(fn = input.valueOf) && !isObject(val = call(fn, input))) return val;
  if (pref !== 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  throw $TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "cc00":
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__("f4c8");

var $String = String;

module.exports = function (argument) {
  if (classof(argument) === 'Symbol') throw TypeError('Cannot convert a Symbol value to a string');
  return $String(argument);
};


/***/ }),

/***/ "cc12":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var isObject = __webpack_require__("861d");

var document = global.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};


/***/ }),

/***/ "cc24":
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "cd12":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("92f7");
var apply = __webpack_require__("a11c");
var bind = __webpack_require__("ac86");
var isCallable = __webpack_require__("ac9e");
var hasOwn = __webpack_require__("74c2");
var fails = __webpack_require__("3903");
var html = __webpack_require__("abf2");
var arraySlice = __webpack_require__("3106");
var createElement = __webpack_require__("eaef");
var validateArgumentsLength = __webpack_require__("7061");
var IS_IOS = __webpack_require__("e8e2");
var IS_NODE = __webpack_require__("30bf");

var set = global.setImmediate;
var clear = global.clearImmediate;
var process = global.process;
var Dispatch = global.Dispatch;
var Function = global.Function;
var MessageChannel = global.MessageChannel;
var String = global.String;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var location, defer, channel, port;

try {
  // Deno throws a ReferenceError on `location` access without `--location` flag
  location = global.location;
} catch (error) { /* empty */ }

var run = function (id) {
  if (hasOwn(queue, id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};

var runner = function (id) {
  return function () {
    run(id);
  };
};

var listener = function (event) {
  run(event.data);
};

var post = function (id) {
  // old engines have not location.origin
  global.postMessage(String(id), location.protocol + '//' + location.host);
};

// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!set || !clear) {
  set = function setImmediate(handler) {
    validateArgumentsLength(arguments.length, 1);
    var fn = isCallable(handler) ? handler : Function(handler);
    var args = arraySlice(arguments, 1);
    queue[++counter] = function () {
      apply(fn, undefined, args);
    };
    defer(counter);
    return counter;
  };
  clear = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (IS_NODE) {
    defer = function (id) {
      process.nextTick(runner(id));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(runner(id));
    };
  // Browsers with MessageChannel, includes WebWorkers
  // except iOS - https://github.com/zloirock/core-js/issues/624
  } else if (MessageChannel && !IS_IOS) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = bind(port.postMessage, port);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (
    global.addEventListener &&
    isCallable(global.postMessage) &&
    !global.importScripts &&
    location && location.protocol !== 'file:' &&
    !fails(post)
  ) {
    defer = post;
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in createElement('script')) {
    defer = function (id) {
      html.appendChild(createElement('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(runner(id), 0);
    };
  }
}

module.exports = {
  set: set,
  clear: clear
};


/***/ }),

/***/ "ce4e":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var createNonEnumerableProperty = __webpack_require__("9112");

module.exports = function (key, value) {
  try {
    createNonEnumerableProperty(global, key, value);
  } catch (error) {
    global[key] = value;
  } return value;
};


/***/ }),

/***/ "d012":
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "d039":
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};


/***/ }),

/***/ "d066":
/***/ (function(module, exports, __webpack_require__) {

var path = __webpack_require__("428f");
var global = __webpack_require__("da84");

var aFunction = function (variable) {
  return typeof variable == 'function' ? variable : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global[namespace])
    : path[namespace] && path[namespace][method] || global[namespace] && global[namespace][method];
};


/***/ }),

/***/ "d1e7":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $propertyIsEnumerable = {}.propertyIsEnumerable;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !$propertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable;


/***/ }),

/***/ "d28b":
/***/ (function(module, exports, __webpack_require__) {

var defineWellKnownSymbol = __webpack_require__("746f");

// `Symbol.iterator` well-known symbol
// https://tc39.es/ecma262/#sec-symbol.iterator
defineWellKnownSymbol('iterator');


/***/ }),

/***/ "d2bb":
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable no-proto -- safe */
var anObject = __webpack_require__("825a");
var aPossiblePrototype = __webpack_require__("3bbe");

// `Object.setPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.
// eslint-disable-next-line es/no-object-setprototypeof -- safe
module.exports = Object.setPrototypeOf || ('__proto__' in {} ? function () {
  var CORRECT_SETTER = false;
  var test = {};
  var setter;
  try {
    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
    setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
    setter.call(test, []);
    CORRECT_SETTER = test instanceof Array;
  } catch (error) { /* empty */ }
  return function setPrototypeOf(O, proto) {
    anObject(O);
    aPossiblePrototype(proto);
    if (CORRECT_SETTER) setter.call(O, proto);
    else O.__proto__ = proto;
    return O;
  };
}() : undefined);


/***/ }),

/***/ "d3b7":
/***/ (function(module, exports, __webpack_require__) {

var TO_STRING_TAG_SUPPORT = __webpack_require__("00ee");
var redefine = __webpack_require__("6eeb");
var toString = __webpack_require__("b041");

// `Object.prototype.toString` method
// https://tc39.es/ecma262/#sec-object.prototype.tostring
if (!TO_STRING_TAG_SUPPORT) {
  redefine(Object.prototype, 'toString', toString, { unsafe: true });
}


/***/ }),

/***/ "d44e":
/***/ (function(module, exports, __webpack_require__) {

var defineProperty = __webpack_require__("9bf2").f;
var has = __webpack_require__("5135");
var wellKnownSymbol = __webpack_require__("b622");

var TO_STRING_TAG = wellKnownSymbol('toStringTag');

module.exports = function (it, TAG, STATIC) {
  if (it && !has(it = STATIC ? it : it.prototype, TO_STRING_TAG)) {
    defineProperty(it, TO_STRING_TAG, { configurable: true, value: TAG });
  }
};


/***/ }),

/***/ "d585":
/***/ (function(module, exports, __webpack_require__) {

var aCallable = __webpack_require__("50a9");

// `GetMethod` abstract operation
// https://tc39.es/ecma262/#sec-getmethod
module.exports = function (V, P) {
  var func = V[P];
  return func == null ? undefined : aCallable(func);
};


/***/ }),

/***/ "d5a6":
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__("df9f");
var create = __webpack_require__("ad3e");
var defineProperty = __webpack_require__("eae2").f;

var UNSCOPABLES = wellKnownSymbol('unscopables');
var ArrayPrototype = Array.prototype;

// Array.prototype[@@unscopables]
// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
if (ArrayPrototype[UNSCOPABLES] == undefined) {
  defineProperty(ArrayPrototype, UNSCOPABLES, {
    configurable: true,
    value: create(null)
  });
}

// add a key to Array.prototype[@@unscopables]
module.exports = function (key) {
  ArrayPrototype[UNSCOPABLES][key] = true;
};


/***/ }),

/***/ "d909":
/***/ (function(module, exports, __webpack_require__) {

var toIntegerOrInfinity = __webpack_require__("f0c6");

var max = Math.max;
var min = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
module.exports = function (index, length) {
  var integer = toIntegerOrInfinity(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};


/***/ }),

/***/ "da84":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
module.exports =
  // eslint-disable-next-line es/no-global-this -- safe
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == 'object' && self) ||
  check(typeof global == 'object' && global) ||
  // eslint-disable-next-line no-new-func -- fallback
  (function () { return this; })() || Function('return this')();

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("c8ba")))

/***/ }),

/***/ "dae8":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var aCallable = __webpack_require__("50a9");

var PromiseCapability = function (C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aCallable(resolve);
  this.reject = aCallable(reject);
};

// `NewPromiseCapability` abstract operation
// https://tc39.es/ecma262/#sec-newpromisecapability
module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),

/***/ "db73":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/mint.7933f60a.jpg";

/***/ }),

/***/ "dbb4":
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__("23e7");
var DESCRIPTORS = __webpack_require__("83ab");
var ownKeys = __webpack_require__("56ef");
var toIndexedObject = __webpack_require__("fc6a");
var getOwnPropertyDescriptorModule = __webpack_require__("06cf");
var createProperty = __webpack_require__("8418");

// `Object.getOwnPropertyDescriptors` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptors
$({ target: 'Object', stat: true, sham: !DESCRIPTORS }, {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
    var O = toIndexedObject(object);
    var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
    var keys = ownKeys(O);
    var result = {};
    var index = 0;
    var key, descriptor;
    while (keys.length > index) {
      descriptor = getOwnPropertyDescriptor(O, key = keys[index++]);
      if (descriptor !== undefined) createProperty(result, key, descriptor);
    }
    return result;
  }
});


/***/ }),

/***/ "ddb0":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var DOMIterables = __webpack_require__("fdbc");
var ArrayIteratorMethods = __webpack_require__("e260");
var createNonEnumerableProperty = __webpack_require__("9112");
var wellKnownSymbol = __webpack_require__("b622");

var ITERATOR = wellKnownSymbol('iterator');
var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var ArrayValues = ArrayIteratorMethods.values;

for (var COLLECTION_NAME in DOMIterables) {
  var Collection = global[COLLECTION_NAME];
  var CollectionPrototype = Collection && Collection.prototype;
  if (CollectionPrototype) {
    // some Chrome versions have non-configurable methods on DOMTokenList
    if (CollectionPrototype[ITERATOR] !== ArrayValues) try {
      createNonEnumerableProperty(CollectionPrototype, ITERATOR, ArrayValues);
    } catch (error) {
      CollectionPrototype[ITERATOR] = ArrayValues;
    }
    if (!CollectionPrototype[TO_STRING_TAG]) {
      createNonEnumerableProperty(CollectionPrototype, TO_STRING_TAG, COLLECTION_NAME);
    }
    if (DOMIterables[COLLECTION_NAME]) for (var METHOD_NAME in ArrayIteratorMethods) {
      // some Chrome versions have non-configurable methods on DOMTokenList
      if (CollectionPrototype[METHOD_NAME] !== ArrayIteratorMethods[METHOD_NAME]) try {
        createNonEnumerableProperty(CollectionPrototype, METHOD_NAME, ArrayIteratorMethods[METHOD_NAME]);
      } catch (error) {
        CollectionPrototype[METHOD_NAME] = ArrayIteratorMethods[METHOD_NAME];
      }
    }
  }
}


/***/ }),

/***/ "df11":
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return { error: false, value: exec() };
  } catch (error) {
    return { error: true, value: error };
  }
};


/***/ }),

/***/ "df75":
/***/ (function(module, exports, __webpack_require__) {

var internalObjectKeys = __webpack_require__("ca84");
var enumBugKeys = __webpack_require__("7839");

// `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
// eslint-disable-next-line es/no-object-keys -- safe
module.exports = Object.keys || function keys(O) {
  return internalObjectKeys(O, enumBugKeys);
};


/***/ }),

/***/ "df8c":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("b6b3");
var $find = __webpack_require__("a1d8").find;
var addToUnscopables = __webpack_require__("d5a6");

var FIND = 'find';
var SKIPS_HOLES = true;

// Shouldn't skip holes
if (FIND in []) Array(1)[FIND](function () { SKIPS_HOLES = false; });

// `Array.prototype.find` method
// https://tc39.es/ecma262/#sec-array.prototype.find
$({ target: 'Array', proto: true, forced: SKIPS_HOLES }, {
  find: function find(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables(FIND);


/***/ }),

/***/ "df9f":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("92f7");
var shared = __webpack_require__("b802");
var hasOwn = __webpack_require__("74c2");
var uid = __webpack_require__("267a");
var NATIVE_SYMBOL = __webpack_require__("3fb6");
var USE_SYMBOL_AS_UID = __webpack_require__("bd63");

var WellKnownSymbolsStore = shared('wks');
var Symbol = global.Symbol;
var symbolFor = Symbol && Symbol['for'];
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol : Symbol && Symbol.withoutSetter || uid;

module.exports = function (name) {
  if (!hasOwn(WellKnownSymbolsStore, name) || !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name] == 'string')) {
    var description = 'Symbol.' + name;
    if (NATIVE_SYMBOL && hasOwn(Symbol, name)) {
      WellKnownSymbolsStore[name] = Symbol[name];
    } else if (USE_SYMBOL_AS_UID && symbolFor) {
      WellKnownSymbolsStore[name] = symbolFor(description);
    } else {
      WellKnownSymbolsStore[name] = createWellKnownSymbol(description);
    }
  } return WellKnownSymbolsStore[name];
};


/***/ }),

/***/ "e01a":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// `Symbol.prototype.description` getter
// https://tc39.es/ecma262/#sec-symbol.prototype.description

var $ = __webpack_require__("23e7");
var DESCRIPTORS = __webpack_require__("83ab");
var global = __webpack_require__("da84");
var has = __webpack_require__("5135");
var isObject = __webpack_require__("861d");
var defineProperty = __webpack_require__("9bf2").f;
var copyConstructorProperties = __webpack_require__("e893");

var NativeSymbol = global.Symbol;

if (DESCRIPTORS && typeof NativeSymbol == 'function' && (!('description' in NativeSymbol.prototype) ||
  // Safari 12 bug
  NativeSymbol().description !== undefined
)) {
  var EmptyStringDescriptionStore = {};
  // wrap Symbol constructor for correct work with undefined description
  var SymbolWrapper = function Symbol() {
    var description = arguments.length < 1 || arguments[0] === undefined ? undefined : String(arguments[0]);
    var result = this instanceof SymbolWrapper
      ? new NativeSymbol(description)
      // in Edge 13, String(Symbol(undefined)) === 'Symbol(undefined)'
      : description === undefined ? NativeSymbol() : NativeSymbol(description);
    if (description === '') EmptyStringDescriptionStore[result] = true;
    return result;
  };
  copyConstructorProperties(SymbolWrapper, NativeSymbol);
  var symbolPrototype = SymbolWrapper.prototype = NativeSymbol.prototype;
  symbolPrototype.constructor = SymbolWrapper;

  var symbolToString = symbolPrototype.toString;
  var native = String(NativeSymbol('test')) == 'Symbol(test)';
  var regexp = /^Symbol\((.*)\)[^)]+$/;
  defineProperty(symbolPrototype, 'description', {
    configurable: true,
    get: function description() {
      var symbol = isObject(this) ? this.valueOf() : this;
      var string = symbolToString.call(symbol);
      if (has(EmptyStringDescriptionStore, symbol)) return '';
      var desc = native ? string.slice(7, -1) : string.replace(regexp, '$1');
      return desc === '' ? undefined : desc;
    }
  });

  $({ global: true, forced: true }, {
    Symbol: SymbolWrapper
  });
}


/***/ }),

/***/ "e163":
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__("5135");
var toObject = __webpack_require__("7b0b");
var sharedKey = __webpack_require__("f772");
var CORRECT_PROTOTYPE_GETTER = __webpack_require__("e177");

var IE_PROTO = sharedKey('IE_PROTO');
var ObjectPrototype = Object.prototype;

// `Object.getPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.getprototypeof
// eslint-disable-next-line es/no-object-getprototypeof -- safe
module.exports = CORRECT_PROTOTYPE_GETTER ? Object.getPrototypeOf : function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectPrototype : null;
};


/***/ }),

/***/ "e177":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("d039");

module.exports = !fails(function () {
  function F() { /* empty */ }
  F.prototype.constructor = null;
  // eslint-disable-next-line es/no-object-getprototypeof -- required for testing
  return Object.getPrototypeOf(new F()) !== F.prototype;
});


/***/ }),

/***/ "e260":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toIndexedObject = __webpack_require__("fc6a");
var addToUnscopables = __webpack_require__("44d2");
var Iterators = __webpack_require__("3f8c");
var InternalStateModule = __webpack_require__("69f3");
var defineIterator = __webpack_require__("7dd0");

var ARRAY_ITERATOR = 'Array Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(ARRAY_ITERATOR);

// `Array.prototype.entries` method
// https://tc39.es/ecma262/#sec-array.prototype.entries
// `Array.prototype.keys` method
// https://tc39.es/ecma262/#sec-array.prototype.keys
// `Array.prototype.values` method
// https://tc39.es/ecma262/#sec-array.prototype.values
// `Array.prototype[@@iterator]` method
// https://tc39.es/ecma262/#sec-array.prototype-@@iterator
// `CreateArrayIterator` internal method
// https://tc39.es/ecma262/#sec-createarrayiterator
module.exports = defineIterator(Array, 'Array', function (iterated, kind) {
  setInternalState(this, {
    type: ARRAY_ITERATOR,
    target: toIndexedObject(iterated), // target
    index: 0,                          // next index
    kind: kind                         // kind
  });
// `%ArrayIteratorPrototype%.next` method
// https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next
}, function () {
  var state = getInternalState(this);
  var target = state.target;
  var kind = state.kind;
  var index = state.index++;
  if (!target || index >= target.length) {
    state.target = undefined;
    return { value: undefined, done: true };
  }
  if (kind == 'keys') return { value: index, done: false };
  if (kind == 'values') return { value: target[index], done: false };
  return { value: [index, target[index]], done: false };
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values%
// https://tc39.es/ecma262/#sec-createunmappedargumentsobject
// https://tc39.es/ecma262/#sec-createmappedargumentsobject
Iterators.Arguments = Iterators.Array;

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),

/***/ "e411":
/***/ (function(module, exports, __webpack_require__) {

var call = __webpack_require__("ef94");
var anObject = __webpack_require__("0e66");
var isCallable = __webpack_require__("ac9e");
var classof = __webpack_require__("0de9");
var regexpExec = __webpack_require__("ee0d");

var $TypeError = TypeError;

// `RegExpExec` abstract operation
// https://tc39.es/ecma262/#sec-regexpexec
module.exports = function (R, S) {
  var exec = R.exec;
  if (isCallable(exec)) {
    var result = call(exec, R, S);
    if (result !== null) anObject(result);
    return result;
  }
  if (classof(R) === 'RegExp') return call(regexpExec, R, S);
  throw $TypeError('RegExp#exec called on incompatible receiver');
};


/***/ }),

/***/ "e439":
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__("23e7");
var fails = __webpack_require__("d039");
var toIndexedObject = __webpack_require__("fc6a");
var nativeGetOwnPropertyDescriptor = __webpack_require__("06cf").f;
var DESCRIPTORS = __webpack_require__("83ab");

var FAILS_ON_PRIMITIVES = fails(function () { nativeGetOwnPropertyDescriptor(1); });
var FORCED = !DESCRIPTORS || FAILS_ON_PRIMITIVES;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
$({ target: 'Object', stat: true, forced: FORCED, sham: !DESCRIPTORS }, {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(it, key) {
    return nativeGetOwnPropertyDescriptor(toIndexedObject(it), key);
  }
});


/***/ }),

/***/ "e473":
/***/ (function(module, exports, __webpack_require__) {

var getBuiltIn = __webpack_require__("fe3e");
var isCallable = __webpack_require__("ac9e");
var isPrototypeOf = __webpack_require__("2b70");
var USE_SYMBOL_AS_UID = __webpack_require__("bd63");

var $Object = Object;

module.exports = USE_SYMBOL_AS_UID ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  var $Symbol = getBuiltIn('Symbol');
  return isCallable($Symbol) && isPrototypeOf($Symbol.prototype, $Object(it));
};


/***/ }),

/***/ "e538":
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__("b622");

exports.f = wellKnownSymbol;


/***/ }),

/***/ "e560":
/***/ (function(module, exports, __webpack_require__) {

var hasOwn = __webpack_require__("74c2");
var ownKeys = __webpack_require__("c27e");
var getOwnPropertyDescriptorModule = __webpack_require__("84e7");
var definePropertyModule = __webpack_require__("eae2");

module.exports = function (target, source, exceptions) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!hasOwn(target, key) && !(exceptions && hasOwn(exceptions, key))) {
      defineProperty(target, key, getOwnPropertyDescriptor(source, key));
    }
  }
};


/***/ }),

/***/ "e561":
/***/ (function(module, exports, __webpack_require__) {

var uncurryThis = __webpack_require__("3545");
var fails = __webpack_require__("3903");
var classof = __webpack_require__("0de9");

var $Object = Object;
var split = uncurryThis(''.split);

// fallback for non-array-like ES3 and non-enumerable old V8 strings
module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !$Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) == 'String' ? split(it, '') : $Object(it);
} : $Object;


/***/ }),

/***/ "e5a5":
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__("df9f");
var Iterators = __webpack_require__("ae74");

var ITERATOR = wellKnownSymbol('iterator');
var ArrayPrototype = Array.prototype;

// check on default Array iterator
module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayPrototype[ITERATOR] === it);
};


/***/ }),

/***/ "e790":
/***/ (function(module, exports, __webpack_require__) {

var TO_STRING_TAG_SUPPORT = __webpack_require__("172e");
var defineBuiltIn = __webpack_require__("669c");
var toString = __webpack_require__("b11f");

// `Object.prototype.toString` method
// https://tc39.es/ecma262/#sec-object.prototype.tostring
if (!TO_STRING_TAG_SUPPORT) {
  defineBuiltIn(Object.prototype, 'toString', toString, { unsafe: true });
}


/***/ }),

/***/ "e7a6":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("3903");
var isCallable = __webpack_require__("ac9e");
var hasOwn = __webpack_require__("74c2");
var DESCRIPTORS = __webpack_require__("50ce");
var CONFIGURABLE_FUNCTION_NAME = __webpack_require__("9513").CONFIGURABLE;
var inspectSource = __webpack_require__("ab8d");
var InternalStateModule = __webpack_require__("1a2e");

var enforceInternalState = InternalStateModule.enforce;
var getInternalState = InternalStateModule.get;
// eslint-disable-next-line es-x/no-object-defineproperty -- safe
var defineProperty = Object.defineProperty;

var CONFIGURABLE_LENGTH = DESCRIPTORS && !fails(function () {
  return defineProperty(function () { /* empty */ }, 'length', { value: 8 }).length !== 8;
});

var TEMPLATE = String(String).split('String');

var makeBuiltIn = module.exports = function (value, name, options) {
  if (String(name).slice(0, 7) === 'Symbol(') {
    name = '[' + String(name).replace(/^Symbol\(([^)]*)\)/, '$1') + ']';
  }
  if (options && options.getter) name = 'get ' + name;
  if (options && options.setter) name = 'set ' + name;
  if (!hasOwn(value, 'name') || (CONFIGURABLE_FUNCTION_NAME && value.name !== name)) {
    if (DESCRIPTORS) defineProperty(value, 'name', { value: name, configurable: true });
    else value.name = name;
  }
  if (CONFIGURABLE_LENGTH && options && hasOwn(options, 'arity') && value.length !== options.arity) {
    defineProperty(value, 'length', { value: options.arity });
  }
  try {
    if (options && hasOwn(options, 'constructor') && options.constructor) {
      if (DESCRIPTORS) defineProperty(value, 'prototype', { writable: false });
    // in V8 ~ Chrome 53, prototypes of some methods, like `Array.prototype.values`, are non-writable
    } else if (value.prototype) value.prototype = undefined;
  } catch (error) { /* empty */ }
  var state = enforceInternalState(value);
  if (!hasOwn(state, 'source')) {
    state.source = TEMPLATE.join(typeof name == 'string' ? name : '');
  } return value;
};

// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
// eslint-disable-next-line no-extend-native -- required
Function.prototype.toString = makeBuiltIn(function toString() {
  return isCallable(this) && getInternalState(this).source || inspectSource(this);
}, 'toString');


/***/ }),

/***/ "e893":
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__("5135");
var ownKeys = __webpack_require__("56ef");
var getOwnPropertyDescriptorModule = __webpack_require__("06cf");
var definePropertyModule = __webpack_require__("9bf2");

module.exports = function (target, source) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
  }
};


/***/ }),

/***/ "e8b5":
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__("c6b6");

// `IsArray` abstract operation
// https://tc39.es/ecma262/#sec-isarray
// eslint-disable-next-line es/no-array-isarray -- safe
module.exports = Array.isArray || function isArray(arg) {
  return classof(arg) == 'Array';
};


/***/ }),

/***/ "e8e2":
/***/ (function(module, exports, __webpack_require__) {

var userAgent = __webpack_require__("6487");

module.exports = /(?:ipad|iphone|ipod).*applewebkit/i.test(userAgent);


/***/ }),

/***/ "e911":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/classic4.087902fc.jpg";

/***/ }),

/***/ "e95a":
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__("b622");
var Iterators = __webpack_require__("3f8c");

var ITERATOR = wellKnownSymbol('iterator');
var ArrayPrototype = Array.prototype;

// check on default Array iterator
module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayPrototype[ITERATOR] === it);
};


/***/ }),

/***/ "ead7":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("7313");
var classof = __webpack_require__("0de9");
var wellKnownSymbol = __webpack_require__("df9f");

var MATCH = wellKnownSymbol('match');

// `IsRegExp` abstract operation
// https://tc39.es/ecma262/#sec-isregexp
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classof(it) == 'RegExp');
};


/***/ }),

/***/ "eae2":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("50ce");
var IE8_DOM_DEFINE = __webpack_require__("c344");
var V8_PROTOTYPE_DEFINE_BUG = __webpack_require__("8d65");
var anObject = __webpack_require__("0e66");
var toPropertyKey = __webpack_require__("3380");

var $TypeError = TypeError;
// eslint-disable-next-line es-x/no-object-defineproperty -- safe
var $defineProperty = Object.defineProperty;
// eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var ENUMERABLE = 'enumerable';
var CONFIGURABLE = 'configurable';
var WRITABLE = 'writable';

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
exports.f = DESCRIPTORS ? V8_PROTOTYPE_DEFINE_BUG ? function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);
  if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
    var current = $getOwnPropertyDescriptor(O, P);
    if (current && current[WRITABLE]) {
      O[P] = Attributes.value;
      Attributes = {
        configurable: CONFIGURABLE in Attributes ? Attributes[CONFIGURABLE] : current[CONFIGURABLE],
        enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
        writable: false
      };
    }
  } return $defineProperty(O, P, Attributes);
} : $defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return $defineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw $TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "eaef":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("92f7");
var isObject = __webpack_require__("7313");

var document = global.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};


/***/ }),

/***/ "ecaa":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("0e66");
var iteratorClose = __webpack_require__("23ab");

// call something on iterator step with safe closing on error
module.exports = function (iterator, fn, value, ENTRIES) {
  try {
    return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);
  } catch (error) {
    iteratorClose(iterator, 'throw', error);
  }
};


/***/ }),

/***/ "ed76":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// TODO: in core-js@4, move /modules/ dependencies to public entries for better optimization by tools like `preset-env`
__webpack_require__("a7da");
var $ = __webpack_require__("b6b3");
var DESCRIPTORS = __webpack_require__("50ce");
var USE_NATIVE_URL = __webpack_require__("0ba0");
var global = __webpack_require__("92f7");
var bind = __webpack_require__("ac86");
var uncurryThis = __webpack_require__("3545");
var defineBuiltIn = __webpack_require__("669c");
var defineBuiltInAccessor = __webpack_require__("875d");
var anInstance = __webpack_require__("39e9");
var hasOwn = __webpack_require__("74c2");
var assign = __webpack_require__("f6aa");
var arrayFrom = __webpack_require__("6fb7");
var arraySlice = __webpack_require__("be18");
var codeAt = __webpack_require__("aac4").codeAt;
var toASCII = __webpack_require__("3def");
var $toString = __webpack_require__("cc00");
var setToStringTag = __webpack_require__("9f8d");
var validateArgumentsLength = __webpack_require__("7061");
var URLSearchParamsModule = __webpack_require__("1ad0");
var InternalStateModule = __webpack_require__("1a2e");

var setInternalState = InternalStateModule.set;
var getInternalURLState = InternalStateModule.getterFor('URL');
var URLSearchParams = URLSearchParamsModule.URLSearchParams;
var getInternalSearchParamsState = URLSearchParamsModule.getState;

var NativeURL = global.URL;
var TypeError = global.TypeError;
var parseInt = global.parseInt;
var floor = Math.floor;
var pow = Math.pow;
var charAt = uncurryThis(''.charAt);
var exec = uncurryThis(/./.exec);
var join = uncurryThis([].join);
var numberToString = uncurryThis(1.0.toString);
var pop = uncurryThis([].pop);
var push = uncurryThis([].push);
var replace = uncurryThis(''.replace);
var shift = uncurryThis([].shift);
var split = uncurryThis(''.split);
var stringSlice = uncurryThis(''.slice);
var toLowerCase = uncurryThis(''.toLowerCase);
var unshift = uncurryThis([].unshift);

var INVALID_AUTHORITY = 'Invalid authority';
var INVALID_SCHEME = 'Invalid scheme';
var INVALID_HOST = 'Invalid host';
var INVALID_PORT = 'Invalid port';

var ALPHA = /[a-z]/i;
// eslint-disable-next-line regexp/no-obscure-range -- safe
var ALPHANUMERIC = /[\d+-.a-z]/i;
var DIGIT = /\d/;
var HEX_START = /^0x/i;
var OCT = /^[0-7]+$/;
var DEC = /^\d+$/;
var HEX = /^[\da-f]+$/i;
/* eslint-disable regexp/no-control-character -- safe */
var FORBIDDEN_HOST_CODE_POINT = /[\0\t\n\r #%/:<>?@[\\\]^|]/;
var FORBIDDEN_HOST_CODE_POINT_EXCLUDING_PERCENT = /[\0\t\n\r #/:<>?@[\\\]^|]/;
var LEADING_AND_TRAILING_C0_CONTROL_OR_SPACE = /^[\u0000-\u0020]+|[\u0000-\u0020]+$/g;
var TAB_AND_NEW_LINE = /[\t\n\r]/g;
/* eslint-enable regexp/no-control-character -- safe */
var EOF;

// https://url.spec.whatwg.org/#ipv4-number-parser
var parseIPv4 = function (input) {
  var parts = split(input, '.');
  var partsLength, numbers, index, part, radix, number, ipv4;
  if (parts.length && parts[parts.length - 1] == '') {
    parts.length--;
  }
  partsLength = parts.length;
  if (partsLength > 4) return input;
  numbers = [];
  for (index = 0; index < partsLength; index++) {
    part = parts[index];
    if (part == '') return input;
    radix = 10;
    if (part.length > 1 && charAt(part, 0) == '0') {
      radix = exec(HEX_START, part) ? 16 : 8;
      part = stringSlice(part, radix == 8 ? 1 : 2);
    }
    if (part === '') {
      number = 0;
    } else {
      if (!exec(radix == 10 ? DEC : radix == 8 ? OCT : HEX, part)) return input;
      number = parseInt(part, radix);
    }
    push(numbers, number);
  }
  for (index = 0; index < partsLength; index++) {
    number = numbers[index];
    if (index == partsLength - 1) {
      if (number >= pow(256, 5 - partsLength)) return null;
    } else if (number > 255) return null;
  }
  ipv4 = pop(numbers);
  for (index = 0; index < numbers.length; index++) {
    ipv4 += numbers[index] * pow(256, 3 - index);
  }
  return ipv4;
};

// https://url.spec.whatwg.org/#concept-ipv6-parser
// eslint-disable-next-line max-statements -- TODO
var parseIPv6 = function (input) {
  var address = [0, 0, 0, 0, 0, 0, 0, 0];
  var pieceIndex = 0;
  var compress = null;
  var pointer = 0;
  var value, length, numbersSeen, ipv4Piece, number, swaps, swap;

  var chr = function () {
    return charAt(input, pointer);
  };

  if (chr() == ':') {
    if (charAt(input, 1) != ':') return;
    pointer += 2;
    pieceIndex++;
    compress = pieceIndex;
  }
  while (chr()) {
    if (pieceIndex == 8) return;
    if (chr() == ':') {
      if (compress !== null) return;
      pointer++;
      pieceIndex++;
      compress = pieceIndex;
      continue;
    }
    value = length = 0;
    while (length < 4 && exec(HEX, chr())) {
      value = value * 16 + parseInt(chr(), 16);
      pointer++;
      length++;
    }
    if (chr() == '.') {
      if (length == 0) return;
      pointer -= length;
      if (pieceIndex > 6) return;
      numbersSeen = 0;
      while (chr()) {
        ipv4Piece = null;
        if (numbersSeen > 0) {
          if (chr() == '.' && numbersSeen < 4) pointer++;
          else return;
        }
        if (!exec(DIGIT, chr())) return;
        while (exec(DIGIT, chr())) {
          number = parseInt(chr(), 10);
          if (ipv4Piece === null) ipv4Piece = number;
          else if (ipv4Piece == 0) return;
          else ipv4Piece = ipv4Piece * 10 + number;
          if (ipv4Piece > 255) return;
          pointer++;
        }
        address[pieceIndex] = address[pieceIndex] * 256 + ipv4Piece;
        numbersSeen++;
        if (numbersSeen == 2 || numbersSeen == 4) pieceIndex++;
      }
      if (numbersSeen != 4) return;
      break;
    } else if (chr() == ':') {
      pointer++;
      if (!chr()) return;
    } else if (chr()) return;
    address[pieceIndex++] = value;
  }
  if (compress !== null) {
    swaps = pieceIndex - compress;
    pieceIndex = 7;
    while (pieceIndex != 0 && swaps > 0) {
      swap = address[pieceIndex];
      address[pieceIndex--] = address[compress + swaps - 1];
      address[compress + --swaps] = swap;
    }
  } else if (pieceIndex != 8) return;
  return address;
};

var findLongestZeroSequence = function (ipv6) {
  var maxIndex = null;
  var maxLength = 1;
  var currStart = null;
  var currLength = 0;
  var index = 0;
  for (; index < 8; index++) {
    if (ipv6[index] !== 0) {
      if (currLength > maxLength) {
        maxIndex = currStart;
        maxLength = currLength;
      }
      currStart = null;
      currLength = 0;
    } else {
      if (currStart === null) currStart = index;
      ++currLength;
    }
  }
  if (currLength > maxLength) {
    maxIndex = currStart;
    maxLength = currLength;
  }
  return maxIndex;
};

// https://url.spec.whatwg.org/#host-serializing
var serializeHost = function (host) {
  var result, index, compress, ignore0;
  // ipv4
  if (typeof host == 'number') {
    result = [];
    for (index = 0; index < 4; index++) {
      unshift(result, host % 256);
      host = floor(host / 256);
    } return join(result, '.');
  // ipv6
  } else if (typeof host == 'object') {
    result = '';
    compress = findLongestZeroSequence(host);
    for (index = 0; index < 8; index++) {
      if (ignore0 && host[index] === 0) continue;
      if (ignore0) ignore0 = false;
      if (compress === index) {
        result += index ? ':' : '::';
        ignore0 = true;
      } else {
        result += numberToString(host[index], 16);
        if (index < 7) result += ':';
      }
    }
    return '[' + result + ']';
  } return host;
};

var C0ControlPercentEncodeSet = {};
var fragmentPercentEncodeSet = assign({}, C0ControlPercentEncodeSet, {
  ' ': 1, '"': 1, '<': 1, '>': 1, '`': 1
});
var pathPercentEncodeSet = assign({}, fragmentPercentEncodeSet, {
  '#': 1, '?': 1, '{': 1, '}': 1
});
var userinfoPercentEncodeSet = assign({}, pathPercentEncodeSet, {
  '/': 1, ':': 1, ';': 1, '=': 1, '@': 1, '[': 1, '\\': 1, ']': 1, '^': 1, '|': 1
});

var percentEncode = function (chr, set) {
  var code = codeAt(chr, 0);
  return code > 0x20 && code < 0x7F && !hasOwn(set, chr) ? chr : encodeURIComponent(chr);
};

// https://url.spec.whatwg.org/#special-scheme
var specialSchemes = {
  ftp: 21,
  file: null,
  http: 80,
  https: 443,
  ws: 80,
  wss: 443
};

// https://url.spec.whatwg.org/#windows-drive-letter
var isWindowsDriveLetter = function (string, normalized) {
  var second;
  return string.length == 2 && exec(ALPHA, charAt(string, 0))
    && ((second = charAt(string, 1)) == ':' || (!normalized && second == '|'));
};

// https://url.spec.whatwg.org/#start-with-a-windows-drive-letter
var startsWithWindowsDriveLetter = function (string) {
  var third;
  return string.length > 1 && isWindowsDriveLetter(stringSlice(string, 0, 2)) && (
    string.length == 2 ||
    ((third = charAt(string, 2)) === '/' || third === '\\' || third === '?' || third === '#')
  );
};

// https://url.spec.whatwg.org/#single-dot-path-segment
var isSingleDot = function (segment) {
  return segment === '.' || toLowerCase(segment) === '%2e';
};

// https://url.spec.whatwg.org/#double-dot-path-segment
var isDoubleDot = function (segment) {
  segment = toLowerCase(segment);
  return segment === '..' || segment === '%2e.' || segment === '.%2e' || segment === '%2e%2e';
};

// States:
var SCHEME_START = {};
var SCHEME = {};
var NO_SCHEME = {};
var SPECIAL_RELATIVE_OR_AUTHORITY = {};
var PATH_OR_AUTHORITY = {};
var RELATIVE = {};
var RELATIVE_SLASH = {};
var SPECIAL_AUTHORITY_SLASHES = {};
var SPECIAL_AUTHORITY_IGNORE_SLASHES = {};
var AUTHORITY = {};
var HOST = {};
var HOSTNAME = {};
var PORT = {};
var FILE = {};
var FILE_SLASH = {};
var FILE_HOST = {};
var PATH_START = {};
var PATH = {};
var CANNOT_BE_A_BASE_URL_PATH = {};
var QUERY = {};
var FRAGMENT = {};

var URLState = function (url, isBase, base) {
  var urlString = $toString(url);
  var baseState, failure, searchParams;
  if (isBase) {
    failure = this.parse(urlString);
    if (failure) throw TypeError(failure);
    this.searchParams = null;
  } else {
    if (base !== undefined) baseState = new URLState(base, true);
    failure = this.parse(urlString, null, baseState);
    if (failure) throw TypeError(failure);
    searchParams = getInternalSearchParamsState(new URLSearchParams());
    searchParams.bindURL(this);
    this.searchParams = searchParams;
  }
};

URLState.prototype = {
  type: 'URL',
  // https://url.spec.whatwg.org/#url-parsing
  // eslint-disable-next-line max-statements -- TODO
  parse: function (input, stateOverride, base) {
    var url = this;
    var state = stateOverride || SCHEME_START;
    var pointer = 0;
    var buffer = '';
    var seenAt = false;
    var seenBracket = false;
    var seenPasswordToken = false;
    var codePoints, chr, bufferCodePoints, failure;

    input = $toString(input);

    if (!stateOverride) {
      url.scheme = '';
      url.username = '';
      url.password = '';
      url.host = null;
      url.port = null;
      url.path = [];
      url.query = null;
      url.fragment = null;
      url.cannotBeABaseURL = false;
      input = replace(input, LEADING_AND_TRAILING_C0_CONTROL_OR_SPACE, '');
    }

    input = replace(input, TAB_AND_NEW_LINE, '');

    codePoints = arrayFrom(input);

    while (pointer <= codePoints.length) {
      chr = codePoints[pointer];
      switch (state) {
        case SCHEME_START:
          if (chr && exec(ALPHA, chr)) {
            buffer += toLowerCase(chr);
            state = SCHEME;
          } else if (!stateOverride) {
            state = NO_SCHEME;
            continue;
          } else return INVALID_SCHEME;
          break;

        case SCHEME:
          if (chr && (exec(ALPHANUMERIC, chr) || chr == '+' || chr == '-' || chr == '.')) {
            buffer += toLowerCase(chr);
          } else if (chr == ':') {
            if (stateOverride && (
              (url.isSpecial() != hasOwn(specialSchemes, buffer)) ||
              (buffer == 'file' && (url.includesCredentials() || url.port !== null)) ||
              (url.scheme == 'file' && !url.host)
            )) return;
            url.scheme = buffer;
            if (stateOverride) {
              if (url.isSpecial() && specialSchemes[url.scheme] == url.port) url.port = null;
              return;
            }
            buffer = '';
            if (url.scheme == 'file') {
              state = FILE;
            } else if (url.isSpecial() && base && base.scheme == url.scheme) {
              state = SPECIAL_RELATIVE_OR_AUTHORITY;
            } else if (url.isSpecial()) {
              state = SPECIAL_AUTHORITY_SLASHES;
            } else if (codePoints[pointer + 1] == '/') {
              state = PATH_OR_AUTHORITY;
              pointer++;
            } else {
              url.cannotBeABaseURL = true;
              push(url.path, '');
              state = CANNOT_BE_A_BASE_URL_PATH;
            }
          } else if (!stateOverride) {
            buffer = '';
            state = NO_SCHEME;
            pointer = 0;
            continue;
          } else return INVALID_SCHEME;
          break;

        case NO_SCHEME:
          if (!base || (base.cannotBeABaseURL && chr != '#')) return INVALID_SCHEME;
          if (base.cannotBeABaseURL && chr == '#') {
            url.scheme = base.scheme;
            url.path = arraySlice(base.path);
            url.query = base.query;
            url.fragment = '';
            url.cannotBeABaseURL = true;
            state = FRAGMENT;
            break;
          }
          state = base.scheme == 'file' ? FILE : RELATIVE;
          continue;

        case SPECIAL_RELATIVE_OR_AUTHORITY:
          if (chr == '/' && codePoints[pointer + 1] == '/') {
            state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
            pointer++;
          } else {
            state = RELATIVE;
            continue;
          } break;

        case PATH_OR_AUTHORITY:
          if (chr == '/') {
            state = AUTHORITY;
            break;
          } else {
            state = PATH;
            continue;
          }

        case RELATIVE:
          url.scheme = base.scheme;
          if (chr == EOF) {
            url.username = base.username;
            url.password = base.password;
            url.host = base.host;
            url.port = base.port;
            url.path = arraySlice(base.path);
            url.query = base.query;
          } else if (chr == '/' || (chr == '\\' && url.isSpecial())) {
            state = RELATIVE_SLASH;
          } else if (chr == '?') {
            url.username = base.username;
            url.password = base.password;
            url.host = base.host;
            url.port = base.port;
            url.path = arraySlice(base.path);
            url.query = '';
            state = QUERY;
          } else if (chr == '#') {
            url.username = base.username;
            url.password = base.password;
            url.host = base.host;
            url.port = base.port;
            url.path = arraySlice(base.path);
            url.query = base.query;
            url.fragment = '';
            state = FRAGMENT;
          } else {
            url.username = base.username;
            url.password = base.password;
            url.host = base.host;
            url.port = base.port;
            url.path = arraySlice(base.path);
            url.path.length--;
            state = PATH;
            continue;
          } break;

        case RELATIVE_SLASH:
          if (url.isSpecial() && (chr == '/' || chr == '\\')) {
            state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
          } else if (chr == '/') {
            state = AUTHORITY;
          } else {
            url.username = base.username;
            url.password = base.password;
            url.host = base.host;
            url.port = base.port;
            state = PATH;
            continue;
          } break;

        case SPECIAL_AUTHORITY_SLASHES:
          state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
          if (chr != '/' || charAt(buffer, pointer + 1) != '/') continue;
          pointer++;
          break;

        case SPECIAL_AUTHORITY_IGNORE_SLASHES:
          if (chr != '/' && chr != '\\') {
            state = AUTHORITY;
            continue;
          } break;

        case AUTHORITY:
          if (chr == '@') {
            if (seenAt) buffer = '%40' + buffer;
            seenAt = true;
            bufferCodePoints = arrayFrom(buffer);
            for (var i = 0; i < bufferCodePoints.length; i++) {
              var codePoint = bufferCodePoints[i];
              if (codePoint == ':' && !seenPasswordToken) {
                seenPasswordToken = true;
                continue;
              }
              var encodedCodePoints = percentEncode(codePoint, userinfoPercentEncodeSet);
              if (seenPasswordToken) url.password += encodedCodePoints;
              else url.username += encodedCodePoints;
            }
            buffer = '';
          } else if (
            chr == EOF || chr == '/' || chr == '?' || chr == '#' ||
            (chr == '\\' && url.isSpecial())
          ) {
            if (seenAt && buffer == '') return INVALID_AUTHORITY;
            pointer -= arrayFrom(buffer).length + 1;
            buffer = '';
            state = HOST;
          } else buffer += chr;
          break;

        case HOST:
        case HOSTNAME:
          if (stateOverride && url.scheme == 'file') {
            state = FILE_HOST;
            continue;
          } else if (chr == ':' && !seenBracket) {
            if (buffer == '') return INVALID_HOST;
            failure = url.parseHost(buffer);
            if (failure) return failure;
            buffer = '';
            state = PORT;
            if (stateOverride == HOSTNAME) return;
          } else if (
            chr == EOF || chr == '/' || chr == '?' || chr == '#' ||
            (chr == '\\' && url.isSpecial())
          ) {
            if (url.isSpecial() && buffer == '') return INVALID_HOST;
            if (stateOverride && buffer == '' && (url.includesCredentials() || url.port !== null)) return;
            failure = url.parseHost(buffer);
            if (failure) return failure;
            buffer = '';
            state = PATH_START;
            if (stateOverride) return;
            continue;
          } else {
            if (chr == '[') seenBracket = true;
            else if (chr == ']') seenBracket = false;
            buffer += chr;
          } break;

        case PORT:
          if (exec(DIGIT, chr)) {
            buffer += chr;
          } else if (
            chr == EOF || chr == '/' || chr == '?' || chr == '#' ||
            (chr == '\\' && url.isSpecial()) ||
            stateOverride
          ) {
            if (buffer != '') {
              var port = parseInt(buffer, 10);
              if (port > 0xFFFF) return INVALID_PORT;
              url.port = (url.isSpecial() && port === specialSchemes[url.scheme]) ? null : port;
              buffer = '';
            }
            if (stateOverride) return;
            state = PATH_START;
            continue;
          } else return INVALID_PORT;
          break;

        case FILE:
          url.scheme = 'file';
          if (chr == '/' || chr == '\\') state = FILE_SLASH;
          else if (base && base.scheme == 'file') {
            if (chr == EOF) {
              url.host = base.host;
              url.path = arraySlice(base.path);
              url.query = base.query;
            } else if (chr == '?') {
              url.host = base.host;
              url.path = arraySlice(base.path);
              url.query = '';
              state = QUERY;
            } else if (chr == '#') {
              url.host = base.host;
              url.path = arraySlice(base.path);
              url.query = base.query;
              url.fragment = '';
              state = FRAGMENT;
            } else {
              if (!startsWithWindowsDriveLetter(join(arraySlice(codePoints, pointer), ''))) {
                url.host = base.host;
                url.path = arraySlice(base.path);
                url.shortenPath();
              }
              state = PATH;
              continue;
            }
          } else {
            state = PATH;
            continue;
          } break;

        case FILE_SLASH:
          if (chr == '/' || chr == '\\') {
            state = FILE_HOST;
            break;
          }
          if (base && base.scheme == 'file' && !startsWithWindowsDriveLetter(join(arraySlice(codePoints, pointer), ''))) {
            if (isWindowsDriveLetter(base.path[0], true)) push(url.path, base.path[0]);
            else url.host = base.host;
          }
          state = PATH;
          continue;

        case FILE_HOST:
          if (chr == EOF || chr == '/' || chr == '\\' || chr == '?' || chr == '#') {
            if (!stateOverride && isWindowsDriveLetter(buffer)) {
              state = PATH;
            } else if (buffer == '') {
              url.host = '';
              if (stateOverride) return;
              state = PATH_START;
            } else {
              failure = url.parseHost(buffer);
              if (failure) return failure;
              if (url.host == 'localhost') url.host = '';
              if (stateOverride) return;
              buffer = '';
              state = PATH_START;
            } continue;
          } else buffer += chr;
          break;

        case PATH_START:
          if (url.isSpecial()) {
            state = PATH;
            if (chr != '/' && chr != '\\') continue;
          } else if (!stateOverride && chr == '?') {
            url.query = '';
            state = QUERY;
          } else if (!stateOverride && chr == '#') {
            url.fragment = '';
            state = FRAGMENT;
          } else if (chr != EOF) {
            state = PATH;
            if (chr != '/') continue;
          } break;

        case PATH:
          if (
            chr == EOF || chr == '/' ||
            (chr == '\\' && url.isSpecial()) ||
            (!stateOverride && (chr == '?' || chr == '#'))
          ) {
            if (isDoubleDot(buffer)) {
              url.shortenPath();
              if (chr != '/' && !(chr == '\\' && url.isSpecial())) {
                push(url.path, '');
              }
            } else if (isSingleDot(buffer)) {
              if (chr != '/' && !(chr == '\\' && url.isSpecial())) {
                push(url.path, '');
              }
            } else {
              if (url.scheme == 'file' && !url.path.length && isWindowsDriveLetter(buffer)) {
                if (url.host) url.host = '';
                buffer = charAt(buffer, 0) + ':'; // normalize windows drive letter
              }
              push(url.path, buffer);
            }
            buffer = '';
            if (url.scheme == 'file' && (chr == EOF || chr == '?' || chr == '#')) {
              while (url.path.length > 1 && url.path[0] === '') {
                shift(url.path);
              }
            }
            if (chr == '?') {
              url.query = '';
              state = QUERY;
            } else if (chr == '#') {
              url.fragment = '';
              state = FRAGMENT;
            }
          } else {
            buffer += percentEncode(chr, pathPercentEncodeSet);
          } break;

        case CANNOT_BE_A_BASE_URL_PATH:
          if (chr == '?') {
            url.query = '';
            state = QUERY;
          } else if (chr == '#') {
            url.fragment = '';
            state = FRAGMENT;
          } else if (chr != EOF) {
            url.path[0] += percentEncode(chr, C0ControlPercentEncodeSet);
          } break;

        case QUERY:
          if (!stateOverride && chr == '#') {
            url.fragment = '';
            state = FRAGMENT;
          } else if (chr != EOF) {
            if (chr == "'" && url.isSpecial()) url.query += '%27';
            else if (chr == '#') url.query += '%23';
            else url.query += percentEncode(chr, C0ControlPercentEncodeSet);
          } break;

        case FRAGMENT:
          if (chr != EOF) url.fragment += percentEncode(chr, fragmentPercentEncodeSet);
          break;
      }

      pointer++;
    }
  },
  // https://url.spec.whatwg.org/#host-parsing
  parseHost: function (input) {
    var result, codePoints, index;
    if (charAt(input, 0) == '[') {
      if (charAt(input, input.length - 1) != ']') return INVALID_HOST;
      result = parseIPv6(stringSlice(input, 1, -1));
      if (!result) return INVALID_HOST;
      this.host = result;
    // opaque host
    } else if (!this.isSpecial()) {
      if (exec(FORBIDDEN_HOST_CODE_POINT_EXCLUDING_PERCENT, input)) return INVALID_HOST;
      result = '';
      codePoints = arrayFrom(input);
      for (index = 0; index < codePoints.length; index++) {
        result += percentEncode(codePoints[index], C0ControlPercentEncodeSet);
      }
      this.host = result;
    } else {
      input = toASCII(input);
      if (exec(FORBIDDEN_HOST_CODE_POINT, input)) return INVALID_HOST;
      result = parseIPv4(input);
      if (result === null) return INVALID_HOST;
      this.host = result;
    }
  },
  // https://url.spec.whatwg.org/#cannot-have-a-username-password-port
  cannotHaveUsernamePasswordPort: function () {
    return !this.host || this.cannotBeABaseURL || this.scheme == 'file';
  },
  // https://url.spec.whatwg.org/#include-credentials
  includesCredentials: function () {
    return this.username != '' || this.password != '';
  },
  // https://url.spec.whatwg.org/#is-special
  isSpecial: function () {
    return hasOwn(specialSchemes, this.scheme);
  },
  // https://url.spec.whatwg.org/#shorten-a-urls-path
  shortenPath: function () {
    var path = this.path;
    var pathSize = path.length;
    if (pathSize && (this.scheme != 'file' || pathSize != 1 || !isWindowsDriveLetter(path[0], true))) {
      path.length--;
    }
  },
  // https://url.spec.whatwg.org/#concept-url-serializer
  serialize: function () {
    var url = this;
    var scheme = url.scheme;
    var username = url.username;
    var password = url.password;
    var host = url.host;
    var port = url.port;
    var path = url.path;
    var query = url.query;
    var fragment = url.fragment;
    var output = scheme + ':';
    if (host !== null) {
      output += '//';
      if (url.includesCredentials()) {
        output += username + (password ? ':' + password : '') + '@';
      }
      output += serializeHost(host);
      if (port !== null) output += ':' + port;
    } else if (scheme == 'file') output += '//';
    output += url.cannotBeABaseURL ? path[0] : path.length ? '/' + join(path, '/') : '';
    if (query !== null) output += '?' + query;
    if (fragment !== null) output += '#' + fragment;
    return output;
  },
  // https://url.spec.whatwg.org/#dom-url-href
  setHref: function (href) {
    var failure = this.parse(href);
    if (failure) throw TypeError(failure);
    this.searchParams.update();
  },
  // https://url.spec.whatwg.org/#dom-url-origin
  getOrigin: function () {
    var scheme = this.scheme;
    var port = this.port;
    if (scheme == 'blob') try {
      return new URLConstructor(scheme.path[0]).origin;
    } catch (error) {
      return 'null';
    }
    if (scheme == 'file' || !this.isSpecial()) return 'null';
    return scheme + '://' + serializeHost(this.host) + (port !== null ? ':' + port : '');
  },
  // https://url.spec.whatwg.org/#dom-url-protocol
  getProtocol: function () {
    return this.scheme + ':';
  },
  setProtocol: function (protocol) {
    this.parse($toString(protocol) + ':', SCHEME_START);
  },
  // https://url.spec.whatwg.org/#dom-url-username
  getUsername: function () {
    return this.username;
  },
  setUsername: function (username) {
    var codePoints = arrayFrom($toString(username));
    if (this.cannotHaveUsernamePasswordPort()) return;
    this.username = '';
    for (var i = 0; i < codePoints.length; i++) {
      this.username += percentEncode(codePoints[i], userinfoPercentEncodeSet);
    }
  },
  // https://url.spec.whatwg.org/#dom-url-password
  getPassword: function () {
    return this.password;
  },
  setPassword: function (password) {
    var codePoints = arrayFrom($toString(password));
    if (this.cannotHaveUsernamePasswordPort()) return;
    this.password = '';
    for (var i = 0; i < codePoints.length; i++) {
      this.password += percentEncode(codePoints[i], userinfoPercentEncodeSet);
    }
  },
  // https://url.spec.whatwg.org/#dom-url-host
  getHost: function () {
    var host = this.host;
    var port = this.port;
    return host === null ? ''
      : port === null ? serializeHost(host)
      : serializeHost(host) + ':' + port;
  },
  setHost: function (host) {
    if (this.cannotBeABaseURL) return;
    this.parse(host, HOST);
  },
  // https://url.spec.whatwg.org/#dom-url-hostname
  getHostname: function () {
    var host = this.host;
    return host === null ? '' : serializeHost(host);
  },
  setHostname: function (hostname) {
    if (this.cannotBeABaseURL) return;
    this.parse(hostname, HOSTNAME);
  },
  // https://url.spec.whatwg.org/#dom-url-port
  getPort: function () {
    var port = this.port;
    return port === null ? '' : $toString(port);
  },
  setPort: function (port) {
    if (this.cannotHaveUsernamePasswordPort()) return;
    port = $toString(port);
    if (port == '') this.port = null;
    else this.parse(port, PORT);
  },
  // https://url.spec.whatwg.org/#dom-url-pathname
  getPathname: function () {
    var path = this.path;
    return this.cannotBeABaseURL ? path[0] : path.length ? '/' + join(path, '/') : '';
  },
  setPathname: function (pathname) {
    if (this.cannotBeABaseURL) return;
    this.path = [];
    this.parse(pathname, PATH_START);
  },
  // https://url.spec.whatwg.org/#dom-url-search
  getSearch: function () {
    var query = this.query;
    return query ? '?' + query : '';
  },
  setSearch: function (search) {
    search = $toString(search);
    if (search == '') {
      this.query = null;
    } else {
      if ('?' == charAt(search, 0)) search = stringSlice(search, 1);
      this.query = '';
      this.parse(search, QUERY);
    }
    this.searchParams.update();
  },
  // https://url.spec.whatwg.org/#dom-url-searchparams
  getSearchParams: function () {
    return this.searchParams.facade;
  },
  // https://url.spec.whatwg.org/#dom-url-hash
  getHash: function () {
    var fragment = this.fragment;
    return fragment ? '#' + fragment : '';
  },
  setHash: function (hash) {
    hash = $toString(hash);
    if (hash == '') {
      this.fragment = null;
      return;
    }
    if ('#' == charAt(hash, 0)) hash = stringSlice(hash, 1);
    this.fragment = '';
    this.parse(hash, FRAGMENT);
  },
  update: function () {
    this.query = this.searchParams.serialize() || null;
  }
};

// `URL` constructor
// https://url.spec.whatwg.org/#url-class
var URLConstructor = function URL(url /* , base */) {
  var that = anInstance(this, URLPrototype);
  var base = validateArgumentsLength(arguments.length, 1) > 1 ? arguments[1] : undefined;
  var state = setInternalState(that, new URLState(url, false, base));
  if (!DESCRIPTORS) {
    that.href = state.serialize();
    that.origin = state.getOrigin();
    that.protocol = state.getProtocol();
    that.username = state.getUsername();
    that.password = state.getPassword();
    that.host = state.getHost();
    that.hostname = state.getHostname();
    that.port = state.getPort();
    that.pathname = state.getPathname();
    that.search = state.getSearch();
    that.searchParams = state.getSearchParams();
    that.hash = state.getHash();
  }
};

var URLPrototype = URLConstructor.prototype;

var accessorDescriptor = function (getter, setter) {
  return {
    get: function () {
      return getInternalURLState(this)[getter]();
    },
    set: setter && function (value) {
      return getInternalURLState(this)[setter](value);
    },
    configurable: true,
    enumerable: true
  };
};

if (DESCRIPTORS) {
  // `URL.prototype.href` accessors pair
  // https://url.spec.whatwg.org/#dom-url-href
  defineBuiltInAccessor(URLPrototype, 'href', accessorDescriptor('serialize', 'setHref'));
  // `URL.prototype.origin` getter
  // https://url.spec.whatwg.org/#dom-url-origin
  defineBuiltInAccessor(URLPrototype, 'origin', accessorDescriptor('getOrigin'));
  // `URL.prototype.protocol` accessors pair
  // https://url.spec.whatwg.org/#dom-url-protocol
  defineBuiltInAccessor(URLPrototype, 'protocol', accessorDescriptor('getProtocol', 'setProtocol'));
  // `URL.prototype.username` accessors pair
  // https://url.spec.whatwg.org/#dom-url-username
  defineBuiltInAccessor(URLPrototype, 'username', accessorDescriptor('getUsername', 'setUsername'));
  // `URL.prototype.password` accessors pair
  // https://url.spec.whatwg.org/#dom-url-password
  defineBuiltInAccessor(URLPrototype, 'password', accessorDescriptor('getPassword', 'setPassword'));
  // `URL.prototype.host` accessors pair
  // https://url.spec.whatwg.org/#dom-url-host
  defineBuiltInAccessor(URLPrototype, 'host', accessorDescriptor('getHost', 'setHost'));
  // `URL.prototype.hostname` accessors pair
  // https://url.spec.whatwg.org/#dom-url-hostname
  defineBuiltInAccessor(URLPrototype, 'hostname', accessorDescriptor('getHostname', 'setHostname'));
  // `URL.prototype.port` accessors pair
  // https://url.spec.whatwg.org/#dom-url-port
  defineBuiltInAccessor(URLPrototype, 'port', accessorDescriptor('getPort', 'setPort'));
  // `URL.prototype.pathname` accessors pair
  // https://url.spec.whatwg.org/#dom-url-pathname
  defineBuiltInAccessor(URLPrototype, 'pathname', accessorDescriptor('getPathname', 'setPathname'));
  // `URL.prototype.search` accessors pair
  // https://url.spec.whatwg.org/#dom-url-search
  defineBuiltInAccessor(URLPrototype, 'search', accessorDescriptor('getSearch', 'setSearch'));
  // `URL.prototype.searchParams` getter
  // https://url.spec.whatwg.org/#dom-url-searchparams
  defineBuiltInAccessor(URLPrototype, 'searchParams', accessorDescriptor('getSearchParams'));
  // `URL.prototype.hash` accessors pair
  // https://url.spec.whatwg.org/#dom-url-hash
  defineBuiltInAccessor(URLPrototype, 'hash', accessorDescriptor('getHash', 'setHash'));
}

// `URL.prototype.toJSON` method
// https://url.spec.whatwg.org/#dom-url-tojson
defineBuiltIn(URLPrototype, 'toJSON', function toJSON() {
  return getInternalURLState(this).serialize();
}, { enumerable: true });

// `URL.prototype.toString` method
// https://url.spec.whatwg.org/#URL-stringification-behavior
defineBuiltIn(URLPrototype, 'toString', function toString() {
  return getInternalURLState(this).serialize();
}, { enumerable: true });

if (NativeURL) {
  var nativeCreateObjectURL = NativeURL.createObjectURL;
  var nativeRevokeObjectURL = NativeURL.revokeObjectURL;
  // `URL.createObjectURL` method
  // https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL
  if (nativeCreateObjectURL) defineBuiltIn(URLConstructor, 'createObjectURL', bind(nativeCreateObjectURL, NativeURL));
  // `URL.revokeObjectURL` method
  // https://developer.mozilla.org/en-US/docs/Web/API/URL/revokeObjectURL
  if (nativeRevokeObjectURL) defineBuiltIn(URLConstructor, 'revokeObjectURL', bind(nativeRevokeObjectURL, NativeURL));
}

setToStringTag(URLConstructor, 'URL');

$({ global: true, constructor: true, forced: !USE_NATIVE_URL, sham: !DESCRIPTORS }, {
  URL: URLConstructor
});


/***/ }),

/***/ "eda6":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $propertyIsEnumerable = {}.propertyIsEnumerable;
// eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !$propertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable;


/***/ }),

/***/ "ee0d":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* eslint-disable regexp/no-empty-capturing-group, regexp/no-empty-group, regexp/no-lazy-ends -- testing */
/* eslint-disable regexp/no-useless-quantifier -- testing */
var call = __webpack_require__("ef94");
var uncurryThis = __webpack_require__("3545");
var toString = __webpack_require__("cc00");
var regexpFlags = __webpack_require__("9b01");
var stickyHelpers = __webpack_require__("8bf2");
var shared = __webpack_require__("b802");
var create = __webpack_require__("ad3e");
var getInternalState = __webpack_require__("1a2e").get;
var UNSUPPORTED_DOT_ALL = __webpack_require__("45ac");
var UNSUPPORTED_NCG = __webpack_require__("843c");

var nativeReplace = shared('native-string-replace', String.prototype.replace);
var nativeExec = RegExp.prototype.exec;
var patchedExec = nativeExec;
var charAt = uncurryThis(''.charAt);
var indexOf = uncurryThis(''.indexOf);
var replace = uncurryThis(''.replace);
var stringSlice = uncurryThis(''.slice);

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/;
  var re2 = /b*/g;
  call(nativeExec, re1, 'a');
  call(nativeExec, re2, 'a');
  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
})();

var UNSUPPORTED_Y = stickyHelpers.BROKEN_CARET;

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y || UNSUPPORTED_DOT_ALL || UNSUPPORTED_NCG;

if (PATCH) {
  patchedExec = function exec(string) {
    var re = this;
    var state = getInternalState(re);
    var str = toString(string);
    var raw = state.raw;
    var result, reCopy, lastIndex, match, i, object, group;

    if (raw) {
      raw.lastIndex = re.lastIndex;
      result = call(patchedExec, raw, str);
      re.lastIndex = raw.lastIndex;
      return result;
    }

    var groups = state.groups;
    var sticky = UNSUPPORTED_Y && re.sticky;
    var flags = call(regexpFlags, re);
    var source = re.source;
    var charsAdded = 0;
    var strCopy = str;

    if (sticky) {
      flags = replace(flags, 'y', '');
      if (indexOf(flags, 'g') === -1) {
        flags += 'g';
      }

      strCopy = stringSlice(str, re.lastIndex);
      // Support anchored sticky behavior.
      if (re.lastIndex > 0 && (!re.multiline || re.multiline && charAt(str, re.lastIndex - 1) !== '\n')) {
        source = '(?: ' + source + ')';
        strCopy = ' ' + strCopy;
        charsAdded++;
      }
      // ^(? + rx + ) is needed, in combination with some str slicing, to
      // simulate the 'y' flag.
      reCopy = new RegExp('^(?:' + source + ')', flags);
    }

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

    match = call(nativeExec, sticky ? reCopy : re, strCopy);

    if (sticky) {
      if (match) {
        match.input = stringSlice(match.input, charsAdded);
        match[0] = stringSlice(match[0], charsAdded);
        match.index = re.lastIndex;
        re.lastIndex += match[0].length;
      } else re.lastIndex = 0;
    } else if (UPDATES_LAST_INDEX_WRONG && match) {
      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn't work for /(.?)?/
      call(nativeReplace, match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    if (match && groups) {
      match.groups = object = create(null);
      for (i = 0; i < groups.length; i++) {
        group = groups[i];
        object[group[0]] = match[group[1]];
      }
    }

    return match;
  };
}

module.exports = patchedExec;


/***/ }),

/***/ "eeb7":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("b6b3");
var $findIndex = __webpack_require__("a1d8").findIndex;
var addToUnscopables = __webpack_require__("d5a6");

var FIND_INDEX = 'findIndex';
var SKIPS_HOLES = true;

// Shouldn't skip holes
if (FIND_INDEX in []) Array(1)[FIND_INDEX](function () { SKIPS_HOLES = false; });

// `Array.prototype.findIndex` method
// https://tc39.es/ecma262/#sec-array.prototype.findindex
$({ target: 'Array', proto: true, forced: SKIPS_HOLES }, {
  findIndex: function findIndex(callbackfn /* , that = undefined */) {
    return $findIndex(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables(FIND_INDEX);


/***/ }),

/***/ "ef94":
/***/ (function(module, exports, __webpack_require__) {

var NATIVE_BIND = __webpack_require__("14ad");

var call = Function.prototype.call;

module.exports = NATIVE_BIND ? call.bind(call) : function () {
  return call.apply(call, arguments);
};


/***/ }),

/***/ "f0c6":
/***/ (function(module, exports, __webpack_require__) {

var trunc = __webpack_require__("f1ec");

// `ToIntegerOrInfinity` abstract operation
// https://tc39.es/ecma262/#sec-tointegerorinfinity
module.exports = function (argument) {
  var number = +argument;
  // eslint-disable-next-line no-self-compare -- NaN check
  return number !== number || number === 0 ? 0 : trunc(number);
};


/***/ }),

/***/ "f11f":
/***/ (function(module, exports, __webpack_require__) {

// toObject with fallback for non-array-like ES3 strings
var IndexedObject = __webpack_require__("e561");
var requireObjectCoercible = __webpack_require__("9522");

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};


/***/ }),

/***/ "f188":
/***/ (function(module, exports, __webpack_require__) {

// TODO: Remove this module from `core-js@4` since it's replaced to module below
__webpack_require__("ed76");


/***/ }),

/***/ "f1ec":
/***/ (function(module, exports) {

var ceil = Math.ceil;
var floor = Math.floor;

// `Math.trunc` method
// https://tc39.es/ecma262/#sec-math.trunc
// eslint-disable-next-line es-x/no-math-trunc -- safe
module.exports = Math.trunc || function trunc(x) {
  var n = +x;
  return (n > 0 ? floor : ceil)(n);
};


/***/ }),

/***/ "f260":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/minions.c2a93f9e.jpg";

/***/ }),

/***/ "f3e5":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var apply = __webpack_require__("a11c");
var call = __webpack_require__("ef94");
var uncurryThis = __webpack_require__("3545");
var fixRegExpWellKnownSymbolLogic = __webpack_require__("b9b1");
var fails = __webpack_require__("3903");
var anObject = __webpack_require__("0e66");
var isCallable = __webpack_require__("ac9e");
var toIntegerOrInfinity = __webpack_require__("f0c6");
var toLength = __webpack_require__("fcce");
var toString = __webpack_require__("cc00");
var requireObjectCoercible = __webpack_require__("9522");
var advanceStringIndex = __webpack_require__("f8d1");
var getMethod = __webpack_require__("d585");
var getSubstitution = __webpack_require__("3fc6");
var regExpExec = __webpack_require__("e411");
var wellKnownSymbol = __webpack_require__("df9f");

var REPLACE = wellKnownSymbol('replace');
var max = Math.max;
var min = Math.min;
var concat = uncurryThis([].concat);
var push = uncurryThis([].push);
var stringIndexOf = uncurryThis(''.indexOf);
var stringSlice = uncurryThis(''.slice);

var maybeToString = function (it) {
  return it === undefined ? it : String(it);
};

// IE <= 11 replaces $0 with the whole match, as if it was $&
// https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0
var REPLACE_KEEPS_$0 = (function () {
  // eslint-disable-next-line regexp/prefer-escape-replacement-dollar-char -- required for testing
  return 'a'.replace(/./, '$0') === '$0';
})();

// Safari <= 13.0.3(?) substitutes nth capture where n>m with an empty string
var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = (function () {
  if (/./[REPLACE]) {
    return /./[REPLACE]('a', '$0') === '';
  }
  return false;
})();

var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
  var re = /./;
  re.exec = function () {
    var result = [];
    result.groups = { a: '7' };
    return result;
  };
  // eslint-disable-next-line regexp/no-useless-dollar-replacements -- false positive
  return ''.replace(re, '$<a>') !== '7';
});

// @@replace logic
fixRegExpWellKnownSymbolLogic('replace', function (_, nativeReplace, maybeCallNative) {
  var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? '$' : '$0';

  return [
    // `String.prototype.replace` method
    // https://tc39.es/ecma262/#sec-string.prototype.replace
    function replace(searchValue, replaceValue) {
      var O = requireObjectCoercible(this);
      var replacer = searchValue == undefined ? undefined : getMethod(searchValue, REPLACE);
      return replacer
        ? call(replacer, searchValue, O, replaceValue)
        : call(nativeReplace, toString(O), searchValue, replaceValue);
    },
    // `RegExp.prototype[@@replace]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@replace
    function (string, replaceValue) {
      var rx = anObject(this);
      var S = toString(string);

      if (
        typeof replaceValue == 'string' &&
        stringIndexOf(replaceValue, UNSAFE_SUBSTITUTE) === -1 &&
        stringIndexOf(replaceValue, '$<') === -1
      ) {
        var res = maybeCallNative(nativeReplace, rx, S, replaceValue);
        if (res.done) return res.value;
      }

      var functionalReplace = isCallable(replaceValue);
      if (!functionalReplace) replaceValue = toString(replaceValue);

      var global = rx.global;
      if (global) {
        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
      }
      var results = [];
      while (true) {
        var result = regExpExec(rx, S);
        if (result === null) break;

        push(results, result);
        if (!global) break;

        var matchStr = toString(result[0]);
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
      }

      var accumulatedResult = '';
      var nextSourcePosition = 0;
      for (var i = 0; i < results.length; i++) {
        result = results[i];

        var matched = toString(result[0]);
        var position = max(min(toIntegerOrInfinity(result.index), S.length), 0);
        var captures = [];
        // NOTE: This is equivalent to
        //   captures = result.slice(1).map(maybeToString)
        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
        for (var j = 1; j < result.length; j++) push(captures, maybeToString(result[j]));
        var namedCaptures = result.groups;
        if (functionalReplace) {
          var replacerArgs = concat([matched], captures, position, S);
          if (namedCaptures !== undefined) push(replacerArgs, namedCaptures);
          var replacement = toString(apply(replaceValue, undefined, replacerArgs));
        } else {
          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
        }
        if (position >= nextSourcePosition) {
          accumulatedResult += stringSlice(S, nextSourcePosition, position) + replacement;
          nextSourcePosition = position + matched.length;
        }
      }
      return accumulatedResult + stringSlice(S, nextSourcePosition);
    }
  ];
}, !REPLACE_SUPPORTS_NAMED_GROUPS || !REPLACE_KEEPS_$0 || REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE);


/***/ }),

/***/ "f4c8":
/***/ (function(module, exports, __webpack_require__) {

var TO_STRING_TAG_SUPPORT = __webpack_require__("172e");
var isCallable = __webpack_require__("ac9e");
var classofRaw = __webpack_require__("0de9");
var wellKnownSymbol = __webpack_require__("df9f");

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var $Object = Object;

// ES3 wrong here
var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) { /* empty */ }
};

// getting tag from ES6+ `Object.prototype.toString`
module.exports = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (tag = tryGet(O = $Object(it), TO_STRING_TAG)) == 'string' ? tag
    // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw(O)
    // ES3 arguments fallback
    : (result = classofRaw(O)) == 'Object' && isCallable(O.callee) ? 'Arguments' : result;
};


/***/ }),

/***/ "f5df":
/***/ (function(module, exports, __webpack_require__) {

var TO_STRING_TAG_SUPPORT = __webpack_require__("00ee");
var classofRaw = __webpack_require__("c6b6");
var wellKnownSymbol = __webpack_require__("b622");

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
// ES3 wrong here
var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) { /* empty */ }
};

// getting tag from ES6+ `Object.prototype.toString`
module.exports = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG)) == 'string' ? tag
    // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw(O)
    // ES3 arguments fallback
    : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
};


/***/ }),

/***/ "f6aa":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var DESCRIPTORS = __webpack_require__("50ce");
var uncurryThis = __webpack_require__("3545");
var call = __webpack_require__("ef94");
var fails = __webpack_require__("3903");
var objectKeys = __webpack_require__("58c5");
var getOwnPropertySymbolsModule = __webpack_require__("1524");
var propertyIsEnumerableModule = __webpack_require__("eda6");
var toObject = __webpack_require__("40f9");
var IndexedObject = __webpack_require__("e561");

// eslint-disable-next-line es-x/no-object-assign -- safe
var $assign = Object.assign;
// eslint-disable-next-line es-x/no-object-defineproperty -- required for testing
var defineProperty = Object.defineProperty;
var concat = uncurryThis([].concat);

// `Object.assign` method
// https://tc39.es/ecma262/#sec-object.assign
module.exports = !$assign || fails(function () {
  // should have correct order of operations (Edge bug)
  if (DESCRIPTORS && $assign({ b: 1 }, $assign(defineProperty({}, 'a', {
    enumerable: true,
    get: function () {
      defineProperty(this, 'b', {
        value: 3,
        enumerable: false
      });
    }
  }), { b: 2 })).b !== 1) return true;
  // should work with symbols and should have deterministic property order (V8 bug)
  var A = {};
  var B = {};
  // eslint-disable-next-line es-x/no-symbol -- safe
  var symbol = Symbol();
  var alphabet = 'abcdefghijklmnopqrst';
  A[symbol] = 7;
  alphabet.split('').forEach(function (chr) { B[chr] = chr; });
  return $assign({}, A)[symbol] != 7 || objectKeys($assign({}, B)).join('') != alphabet;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars -- required for `.length`
  var T = toObject(target);
  var argumentsLength = arguments.length;
  var index = 1;
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  var propertyIsEnumerable = propertyIsEnumerableModule.f;
  while (argumentsLength > index) {
    var S = IndexedObject(arguments[index++]);
    var keys = getOwnPropertySymbols ? concat(objectKeys(S), getOwnPropertySymbols(S)) : objectKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) {
      key = keys[j++];
      if (!DESCRIPTORS || call(propertyIsEnumerable, S, key)) T[key] = S[key];
    }
  } return T;
} : $assign;


/***/ }),

/***/ "f772":
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__("5692");
var uid = __webpack_require__("90e3");

var keys = shared('keys');

module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};


/***/ }),

/***/ "f7da":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("b6b3");
var call = __webpack_require__("ef94");
var IS_PURE = __webpack_require__("c009");
var FunctionName = __webpack_require__("9513");
var isCallable = __webpack_require__("ac9e");
var createIteratorConstructor = __webpack_require__("ffee");
var getPrototypeOf = __webpack_require__("c503");
var setPrototypeOf = __webpack_require__("a6d2");
var setToStringTag = __webpack_require__("9f8d");
var createNonEnumerableProperty = __webpack_require__("88a7");
var defineBuiltIn = __webpack_require__("669c");
var wellKnownSymbol = __webpack_require__("df9f");
var Iterators = __webpack_require__("ae74");
var IteratorsCore = __webpack_require__("6e9e");

var PROPER_FUNCTION_NAME = FunctionName.PROPER;
var CONFIGURABLE_FUNCTION_NAME = FunctionName.CONFIGURABLE;
var IteratorPrototype = IteratorsCore.IteratorPrototype;
var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
var ITERATOR = wellKnownSymbol('iterator');
var KEYS = 'keys';
var VALUES = 'values';
var ENTRIES = 'entries';

var returnThis = function () { return this; };

module.exports = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
  createIteratorConstructor(IteratorConstructor, NAME, next);

  var getIterationMethod = function (KIND) {
    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
    if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype) return IterablePrototype[KIND];
    switch (KIND) {
      case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
      case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
      case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
    } return function () { return new IteratorConstructor(this); };
  };

  var TO_STRING_TAG = NAME + ' Iterator';
  var INCORRECT_VALUES_NAME = false;
  var IterablePrototype = Iterable.prototype;
  var nativeIterator = IterablePrototype[ITERATOR]
    || IterablePrototype['@@iterator']
    || DEFAULT && IterablePrototype[DEFAULT];
  var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
  var CurrentIteratorPrototype, methods, KEY;

  // fix native
  if (anyNativeIterator) {
    CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));
    if (CurrentIteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
      if (!IS_PURE && getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
        if (setPrototypeOf) {
          setPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);
        } else if (!isCallable(CurrentIteratorPrototype[ITERATOR])) {
          defineBuiltIn(CurrentIteratorPrototype, ITERATOR, returnThis);
        }
      }
      // Set @@toStringTag to native iterators
      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
      if (IS_PURE) Iterators[TO_STRING_TAG] = returnThis;
    }
  }

  // fix Array.prototype.{ values, @@iterator }.name in V8 / FF
  if (PROPER_FUNCTION_NAME && DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
    if (!IS_PURE && CONFIGURABLE_FUNCTION_NAME) {
      createNonEnumerableProperty(IterablePrototype, 'name', VALUES);
    } else {
      INCORRECT_VALUES_NAME = true;
      defaultIterator = function values() { return call(nativeIterator, this); };
    }
  }

  // export additional methods
  if (DEFAULT) {
    methods = {
      values: getIterationMethod(VALUES),
      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
      entries: getIterationMethod(ENTRIES)
    };
    if (FORCED) for (KEY in methods) {
      if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
        defineBuiltIn(IterablePrototype, KEY, methods[KEY]);
      }
    } else $({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
  }

  // define iterator
  if ((!IS_PURE || FORCED) && IterablePrototype[ITERATOR] !== defaultIterator) {
    defineBuiltIn(IterablePrototype, ITERATOR, defaultIterator, { name: DEFAULT });
  }
  Iterators[NAME] = defaultIterator;

  return methods;
};


/***/ }),

/***/ "f8d1":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var charAt = __webpack_require__("aac4").charAt;

// `AdvanceStringIndex` abstract operation
// https://tc39.es/ecma262/#sec-advancestringindex
module.exports = function (S, index, unicode) {
  return index + (unicode ? charAt(S, index).length : 1);
};


/***/ }),

/***/ "fb15":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  var currentScript = window.document.currentScript
  if (true) {
    var getCurrentScript = __webpack_require__("8875")
    currentScript = getCurrentScript()

    // for backward compatibility, because previously we directly included the polyfill
    if (!('currentScript' in document)) {
      Object.defineProperty(document, 'currentScript', { get: getCurrentScript })
    }
  }

  var src = currentScript && currentScript.src.match(/(.+\/)[^/]+\.js(\?.*)?$/)
  if (src) {
    __webpack_require__.p = src[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.to-string.js
var es_object_to_string = __webpack_require__("d3b7");

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/classCallCheck.js
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/createClass.js
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}
// EXTERNAL MODULE: ../simple-mind-map/node_modules/regenerator-runtime/runtime.js
var runtime = __webpack_require__("b693");

// EXTERNAL MODULE: E:/node_modules/core-js/modules/es.array.includes.js
var es_array_includes = __webpack_require__("2ab6");

// EXTERNAL MODULE: E:/node_modules/core-js/modules/es.string.includes.js
var es_string_includes = __webpack_require__("b19f");

// EXTERNAL MODULE: E:/node_modules/core-js/modules/es.array.concat.js
var es_array_concat = __webpack_require__("7fbc");

// EXTERNAL MODULE: E:/node_modules/core-js/modules/es.regexp.exec.js
var es_regexp_exec = __webpack_require__("730c");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.keys.js
var es_object_keys = __webpack_require__("b64b");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.symbol.js
var es_symbol = __webpack_require__("a4d3");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.filter.js
var es_array_filter = __webpack_require__("4de4");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.get-own-property-descriptor.js
var es_object_get_own_property_descriptor = __webpack_require__("e439");

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.for-each.js
var web_dom_collections_for_each = __webpack_require__("159b");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.get-own-property-descriptors.js
var es_object_get_own_property_descriptors = __webpack_require__("dbb4");

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/defineProperty.js
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js








function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);

    if (enumerableOnly) {
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }

    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}
// EXTERNAL MODULE: E:/node_modules/core-js/modules/web.dom-collections.for-each.js
var modules_web_dom_collections_for_each = __webpack_require__("6d8c");

// EXTERNAL MODULE: E:/node_modules/core-js/modules/es.object.keys.js
var modules_es_object_keys = __webpack_require__("c8d3");

// CONCATENATED MODULE: ../simple-mind-map/src/View.js






/** 
 * javascript comment 
 * @Author: 王林25 
 * @Date: 2021-04-07 14:45:24 
 * @Desc: 视图操作类 
 */
var View_View = /*#__PURE__*/function () {
  /** 
   * javascript comment 
   * @Author: 王林25 
   * @Date: 2021-04-07 14:45:40 
   * @Desc: 构造函数 
   */
  function View() {
    var opt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, View);

    this.opt = opt;
    this.mindMap = this.opt.mindMap;
    this.scale = 1;
    this.sx = 0;
    this.sy = 0;
    this.x = 0;
    this.y = 0;
    this.firstDrag = true;
    this.setTransformData(this.mindMap.opt.viewData);
    this.bind();
  }
  /** 
   * javascript comment 
   * @Author: 王林25 
   * @Date: 2021-04-07 15:38:51 
   * @Desc: 绑定 
   */


  _createClass(View, [{
    key: "bind",
    value: function bind() {
      var _this = this;

      // 快捷键
      this.mindMap.keyCommand.addShortcut('Control+=', function () {
        _this.enlarge();
      });
      this.mindMap.keyCommand.addShortcut('Control+-', function () {
        _this.narrow();
      });
      this.mindMap.keyCommand.addShortcut('Control+Enter', function () {
        _this.reset();
      });
      this.mindMap.svg.on('dblclick', function () {
        _this.reset();
      }); // 拖动视图

      this.mindMap.event.on('mousedown', function () {
        _this.sx = _this.x;
        _this.sy = _this.y;
      });
      this.mindMap.event.on('drag', function (e, event) {
        if (_this.firstDrag) {
          _this.firstDrag = false; // 清除激活节点

          _this.mindMap.execCommand('CLEAR_ACTIVE_NODE');
        }

        _this.x = _this.sx + event.mousemoveOffset.x;
        _this.y = _this.sy + event.mousemoveOffset.y;

        _this.transform();
      });
      this.mindMap.event.on('mouseup', function () {
        _this.firstDrag = true;
      }); // 放大缩小视图

      this.mindMap.event.on('mousewheel', function (e, dir) {
        // // 放大
        if (dir === 'down') {
          _this.enlarge();
        } else {
          // 缩小
          _this.narrow();
        }
      });
    }
    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-11-22 18:30:24 
     * @Desc: 获取当前变换状态数据 
     */

  }, {
    key: "getTransformData",
    value: function getTransformData() {
      return {
        transform: this.mindMap.draw.transform(),
        state: {
          scale: this.scale,
          x: this.x,
          y: this.y,
          sx: this.sx,
          sy: this.sy
        }
      };
    }
    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-11-22 19:54:17 
     * @Desc: 动态设置变换状态数据 
     */

  }, {
    key: "setTransformData",
    value: function setTransformData(viewData) {
      var _this2 = this;

      if (viewData) {
        Object.keys(viewData.state).forEach(function (prop) {
          _this2[prop] = viewData.state[prop];
        });
        this.mindMap.draw.transform(_objectSpread2({}, viewData.transform));
        this.mindMap.emit('view_data_change', this.getTransformData());
        this.mindMap.emit('scale', this.scale);
      }
    }
    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-07-13 15:49:06 
     * @Desc: 平移x方向 
     */

  }, {
    key: "translateX",
    value: function translateX(step) {
      this.x += step;
      this.transform();
    }
    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-07-13 15:48:52 
     * @Desc: 平移y方向 
     */

  }, {
    key: "translateY",
    value: function translateY(step) {
      this.y += step;
      this.transform();
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-07-04 17:13:14 
     * @Desc:  应用变换
     */

  }, {
    key: "transform",
    value: function transform() {
      this.mindMap.draw.transform({
        scale: this.scale,
        // origin: 'center center',
        translate: [this.x, this.y]
      });
      this.mindMap.emit('view_data_change', this.getTransformData());
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-07-11 17:41:35 
     * @Desc: 恢复
     */

  }, {
    key: "reset",
    value: function reset() {
      this.scale = 1;
      this.x = 0;
      this.y = 0;
      this.transform();
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-07-04 17:10:34 
     * @Desc: 缩小 
     */

  }, {
    key: "narrow",
    value: function narrow() {
      if (this.scale - this.mindMap.opt.scaleRatio > 0.1) {
        this.scale -= this.mindMap.opt.scaleRatio;
      } else {
        this.scale = 0.1;
      }

      this.transform();
      this.mindMap.emit('scale', this.scale);
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-07-04 17:10:41 
     * @Desc: 放大 
     */

  }, {
    key: "enlarge",
    value: function enlarge() {
      this.scale += this.mindMap.opt.scaleRatio;
      this.transform();
      this.mindMap.emit('scale', this.scale);
    }
  }]);

  return View;
}();

/* harmony default export */ var src_View = (View_View);
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/inherits.js

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.reflect.construct.js
var es_reflect_construct = __webpack_require__("4ae1");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.get-prototype-of.js
var es_object_get_prototype_of = __webpack_require__("3410");

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/isNativeReflectConstruct.js

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/typeof.js
var helpers_typeof = __webpack_require__("7037");
var typeof_default = /*#__PURE__*/__webpack_require__.n(helpers_typeof);

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js


function _possibleConstructorReturn(self, call) {
  if (call && (typeof_default()(call) === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/createSuper.js




function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}
// EXTERNAL MODULE: ../simple-mind-map/node_modules/eventemitter3/index.js
var eventemitter3 = __webpack_require__("91d2");
var eventemitter3_default = /*#__PURE__*/__webpack_require__.n(eventemitter3);

// CONCATENATED MODULE: ../simple-mind-map/src/Event.js





/** 
 * javascript comment 
 * @Author: 王林25 
 * @Date: 2021-04-07 14:53:09 
 * @Desc: 事件类 
 */

var Event_Event = /*#__PURE__*/function (_EventEmitter) {
  _inherits(Event, _EventEmitter);

  var _super = _createSuper(Event);

  /** 
   * javascript comment 
   * @Author: 王林25 
   * @Date: 2021-04-07 14:53:25 
   * @Desc: 构造函数 
   */
  function Event() {
    var _this;

    var opt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Event);

    _this = _super.call(this);
    _this.opt = opt;
    _this.mindMap = opt.mindMap;
    _this.isLeftMousedown = false;
    _this.mousedownPos = {
      x: 0,
      y: 0
    };
    _this.mousemovePos = {
      x: 0,
      y: 0
    };
    _this.mousemoveOffset = {
      x: 0,
      y: 0
    };

    _this.bindFn();

    _this.bind();

    return _this;
  }
  /** 
   * javascript comment 
   * @Author: 王林25 
   * @Date: 2021-04-07 15:52:24 
   * @Desc: 绑定函数上下文 
   */


  _createClass(Event, [{
    key: "bindFn",
    value: function bindFn() {
      this.onDrawClick = this.onDrawClick.bind(this);
      this.onMousedown = this.onMousedown.bind(this);
      this.onMousemove = this.onMousemove.bind(this);
      this.onMouseup = this.onMouseup.bind(this);
      this.onMousewheel = this.onMousewheel.bind(this);
      this.onContextmenu = this.onContextmenu.bind(this);
      this.onSvgMousedown = this.onSvgMousedown.bind(this);
    }
    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-04-07 14:53:43 
     * @Desc: 绑定事件 
     */

  }, {
    key: "bind",
    value: function bind() {
      this.mindMap.svg.on('click', this.onDrawClick);
      this.mindMap.el.addEventListener('mousedown', this.onMousedown);
      this.mindMap.svg.on('mousedown', this.onSvgMousedown);
      window.addEventListener('mousemove', this.onMousemove);
      window.addEventListener('mouseup', this.onMouseup); // 兼容火狐浏览器

      if (window.navigator.userAgent.toLowerCase().indexOf("firefox") != -1) {
        this.mindMap.el.addEventListener('DOMMouseScroll', this.onMousewheel);
      } else {
        this.mindMap.el.addEventListener('mousewheel', this.onMousewheel);
      }

      this.mindMap.svg.on('contextmenu', this.onContextmenu);
    }
    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-04-07 15:40:51 
     * @Desc: 解绑事件 
     */

  }, {
    key: "unbind",
    value: function unbind() {
      this.mindMap.svg.off('click', this.onDrawClick);
      this.mindMap.el.removeEventListener('mousedown', this.onMousedown);
      window.removeEventListener('mousemove', this.onMousemove);
      window.removeEventListener('mouseup', this.onMouseup);
      this.mindMap.el.removeEventListener('mousewheel', this.onMousewheel);
      this.mindMap.svg.off('contextmenu', this.onContextmenu);
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-04-24 13:19:39 
     * @Desc:  画布的单击事件
     */

  }, {
    key: "onDrawClick",
    value: function onDrawClick(e) {
      this.emit('draw_click', e);
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-07-16 13:37:30 
     * @Desc:  svg画布的鼠标按下事件
     */

  }, {
    key: "onSvgMousedown",
    value: function onSvgMousedown(e) {
      this.emit('svg_mousedown', e);
    }
    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-04-07 15:17:35 
     * @Desc: 鼠标按下事件 
     */

  }, {
    key: "onMousedown",
    value: function onMousedown(e) {
      // e.preventDefault()
      // 鼠标左键
      if (e.which === 1) {
        this.isLeftMousedown = true;
      }

      this.mousedownPos.x = e.clientX;
      this.mousedownPos.y = e.clientY;
      this.emit('mousedown', e, this);
    }
    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-04-07 15:18:32 
     * @Desc: 鼠标移动事件 
     */

  }, {
    key: "onMousemove",
    value: function onMousemove(e) {
      // e.preventDefault()
      this.mousemovePos.x = e.clientX;
      this.mousemovePos.y = e.clientY;
      this.mousemoveOffset.x = e.clientX - this.mousedownPos.x;
      this.mousemoveOffset.y = e.clientY - this.mousedownPos.y;
      this.emit('mousemove', e, this);

      if (this.isLeftMousedown) {
        this.emit('drag', e, this);
      }
    }
    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-04-07 15:18:57 
     * @Desc: 鼠标松开事件 
     */

  }, {
    key: "onMouseup",
    value: function onMouseup(e) {
      this.isLeftMousedown = false;
      this.emit('mouseup', e, this);
    }
    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-04-07 15:46:27 
     * @Desc: 鼠标滚动 
     */

  }, {
    key: "onMousewheel",
    value: function onMousewheel(e) {
      e.stopPropagation();
      e.preventDefault();
      var dir;

      if ((e.wheelDeltaY || e.detail) > 0) {
        dir = 'up';
      } else {
        dir = 'down';
      }

      this.emit('mousewheel', e, dir, this);
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-07-10 22:34:13 
     * @Desc: 鼠标右键菜单事件 
     */

  }, {
    key: "onContextmenu",
    value: function onContextmenu(e) {
      e.preventDefault();
      this.emit('contextmenu', e);
    }
  }]);

  return Event;
}(eventemitter3_default.a);

/* harmony default export */ var src_Event = (Event_Event);
// EXTERNAL MODULE: E:/node_modules/core-js/modules/es.array.splice.js
var es_array_splice = __webpack_require__("a071");

// EXTERNAL MODULE: E:/node_modules/core-js/modules/es.array.find-index.js
var es_array_find_index = __webpack_require__("eeb7");

// EXTERNAL MODULE: ../simple-mind-map/node_modules/deepmerge/dist/cjs.js
var cjs = __webpack_require__("682c");
var cjs_default = /*#__PURE__*/__webpack_require__.n(cjs);

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.symbol.description.js
var es_symbol_description = __webpack_require__("e01a");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.symbol.iterator.js
var es_symbol_iterator = __webpack_require__("d28b");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.iterator.js
var es_string_iterator = __webpack_require__("3ca3");

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.iterator.js
var web_dom_collections_iterator = __webpack_require__("ddb0");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.from.js
var es_array_from = __webpack_require__("a630");

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/iterableToArray.js







function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.slice.js
var es_array_slice = __webpack_require__("fb6a");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.function.name.js
var es_function_name = __webpack_require__("b0c0");

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js






function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js




function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
// EXTERNAL MODULE: E:/node_modules/core-js/modules/es.array.map.js
var es_array_map = __webpack_require__("0427");

// EXTERNAL MODULE: E:/node_modules/core-js/modules/es.string.split.js
var es_string_split = __webpack_require__("c0d1");

// EXTERNAL MODULE: E:/node_modules/core-js/modules/es.array.fill.js
var es_array_fill = __webpack_require__("12c3");

// EXTERNAL MODULE: E:/node_modules/core-js/modules/es.array.slice.js
var modules_es_array_slice = __webpack_require__("9186");

// EXTERNAL MODULE: E:/node_modules/core-js/modules/es.array.find.js
var es_array_find = __webpack_require__("df8c");

// CONCATENATED MODULE: ../simple-mind-map/src/utils/constant.js
/** 
 * @Author: 王林 
 * @Date: 2021-06-24 21:42:07 
 * @Desc: 标签颜色列表 
 */
var tagColorList = [{
  color: 'rgb(77, 65, 0)',
  background: 'rgb(255, 244, 179)'
}, {
  color: 'rgb(0, 50, 77)',
  background: 'rgb(179, 229, 255)'
}, {
  color: 'rgb(77, 0, 73)',
  background: 'rgb(255, 179, 251)'
}, {
  color: 'rgb(57, 77, 0)',
  background: 'rgb(236, 255, 179)'
}, {
  color: 'rgb(0, 77, 47)',
  background: 'rgb(179, 255, 226)'
}];
/** 
 * javascript comment 
 * @Author: 王林25 
 * @Date: 2021-07-13 15:56:28 
 * @Desc: 布局结构列表 
 */

var layoutList = [{
  name: '逻辑结构图',
  value: 'logicalStructure',
  img: __webpack_require__("0930")
}, {
  name: '思维导图',
  value: 'mindMap',
  img: __webpack_require__("9910")
}, {
  name: '组织结构图',
  value: 'organizationStructure',
  img: __webpack_require__("6967")
}, {
  name: '目录组织图',
  value: 'catalogOrganization',
  img: __webpack_require__("ac18")
}];
var layoutValueList = ['logicalStructure', 'mindMap', 'catalogOrganization', 'organizationStructure'];
/** 
 * @Author: 王林 
 * @Date: 2021-06-24 22:58:42 
 * @Desc: 主题列表 
 */

var themeList = [{
  name: '默认',
  value: 'default',
  img: __webpack_require__("3556")
}, {
  name: '脑图经典',
  value: 'classic',
  img: __webpack_require__("8617")
}, {
  name: '小黄人',
  value: 'minions',
  img: __webpack_require__("f260")
}, {
  name: '粉红葡萄',
  value: 'pinkGrape',
  img: __webpack_require__("b2e8")
}, {
  name: '薄荷',
  value: 'mint',
  img: __webpack_require__("db73")
}, {
  name: '金色vip',
  value: 'gold',
  img: __webpack_require__("6ef5")
}, {
  name: '活力橙',
  value: 'vitalityOrange',
  img: __webpack_require__("08be")
}, {
  name: '绿叶',
  value: 'greenLeaf',
  img: __webpack_require__("72ed")
}, {
  name: '暗色2',
  value: 'dark2',
  img: __webpack_require__("42c9")
}, {
  name: '天清绿',
  value: 'skyGreen',
  img: __webpack_require__("7f82")
}, {
  name: '脑图经典2',
  value: 'classic2',
  img: __webpack_require__("a3a6")
}, {
  name: '脑图经典3',
  value: 'classic3',
  img: __webpack_require__("c0d2")
}, {
  name: '脑图经典4',
  value: 'classic4',
  img: __webpack_require__("e911")
}, {
  name: '经典绿',
  value: 'classicGreen',
  img: __webpack_require__("43f9")
}, {
  name: '经典蓝',
  value: 'classicBlue',
  img: __webpack_require__("0d2c")
}, {
  name: '天空蓝',
  value: 'blueSky',
  img: __webpack_require__("b533")
}, {
  name: '脑残粉',
  value: 'brainImpairedPink',
  img: __webpack_require__("074d")
}, {
  name: '暗色',
  value: 'dark',
  img: __webpack_require__("181c")
}, {
  name: '泥土黄',
  value: 'earthYellow',
  img: __webpack_require__("1a34")
}, {
  name: '清新绿',
  value: 'freshGreen',
  img: __webpack_require__("7dda")
}, {
  name: '清新红',
  value: 'freshRed',
  img: __webpack_require__("ca62")
}, {
  name: '浪漫紫',
  value: 'romanticPurple',
  img: __webpack_require__("c612")
}];
// CONCATENATED MODULE: ../simple-mind-map/src/Style.js





var rootProp = ['paddingX', 'paddingY'];
/** 
 * @Author: 王林 
 * @Date: 2021-04-11 10:09:08 
 * @Desc: 样式类 
 */

var Style_Style = /*#__PURE__*/function () {
  /** 
   * @Author: 王林 
   * @Date: 2021-04-11 10:10:11 
   * @Desc: 构造函数 
   */
  function Style(ctx, themeConfig) {
    _classCallCheck(this, Style);

    this.ctx = ctx;
    this.themeConfig = themeConfig;
  }
  /** 
   * @Author: 王林 
   * @Date: 2021-07-12 07:40:14 
   * @Desc: 更新主题配置 
   */


  _createClass(Style, [{
    key: "updateThemeConfig",
    value: function updateThemeConfig(themeConfig) {
      this.themeConfig = themeConfig;
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-04-11 12:02:55 
     * @Desc: 合并样式 
     */

  }, {
    key: "merge",
    value: function merge(prop, root, isActive) {
      // 三级及以下节点
      var defaultConfig = this.themeConfig.node;

      if (root || rootProp.includes(prop)) {
        // 直接使用最外层样式
        defaultConfig = this.themeConfig;
      } else if (this.ctx.isGeneralization) {
        // 概要节点
        defaultConfig = this.themeConfig.generalization;
      } else if (this.ctx.layerIndex === 0) {
        // 根节点
        defaultConfig = this.themeConfig.root;
      } else if (this.ctx.layerIndex === 1) {
        // 二级节点
        defaultConfig = this.themeConfig.second;
      } // 激活状态


      if (isActive !== undefined ? isActive : this.ctx.nodeData.data.isActive) {
        if (this.ctx.nodeData.data.activeStyle && this.ctx.nodeData.data.activeStyle[prop] !== undefined) {
          return this.ctx.nodeData.data.activeStyle[prop];
        } else if (defaultConfig.active && defaultConfig.active[prop]) {
          return defaultConfig.active[prop];
        }
      } // 优先使用节点本身的样式


      return this.ctx.nodeData.data[prop] !== undefined ? this.ctx.nodeData.data[prop] : defaultConfig[prop];
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-04-11 10:12:56 
     * @Desc: 矩形 
     */

  }, {
    key: "rect",
    value: function rect(node) {
      node.fill({
        color: this.merge('fillColor')
      }).stroke({
        color: this.merge('borderColor'),
        width: this.merge('borderWidth'),
        dasharray: this.merge('borderDasharray')
      }).radius(this.merge('borderRadius'));
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-04-11 12:07:59 
     * @Desc: 文字 
     */

  }, {
    key: "text",
    value: function text(node) {
      node.fill({
        color: this.merge('color')
      }).css({
        'font-family': this.merge('fontFamily'),
        'font-size': this.merge('fontSize'),
        'font-weight': this.merge('fontWeight'),
        'font-style': this.merge('fontStyle'),
        'text-decoration': this.merge('textDecoration')
      });
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-04-13 08:14:34 
     * @Desc: html文字节点 
     */

  }, {
    key: "domText",
    value: function domText(node) {
      var fontSizeScale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      node.style.fontFamily = this.merge('fontFamily');
      node.style.fontSize = this.merge('fontSize') * fontSizeScale + 'px';
      node.style.fontWeight = this.merge('fontWeight') || 'normal';
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-06-20 20:02:18 
     * @Desc: 标签文字 
     */

  }, {
    key: "tagText",
    value: function tagText(node, index) {
      node.fill({
        color: tagColorList[index].color
      }).css({
        'font-size': '12px'
      });
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-06-20 21:04:11 
     * @Desc: 标签矩形 
     */

  }, {
    key: "tagRect",
    value: function tagRect(node, index) {
      node.fill({
        color: tagColorList[index].background
      });
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-07-03 22:37:19 
     * @Desc: 内置图标 
     */

  }, {
    key: "iconNode",
    value: function iconNode(node) {
      node.attr({
        fill: this.merge('color')
      });
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-04-11 14:50:49 
     * @Desc: 连线 
     */

  }, {
    key: "line",
    value: function line(node) {
      node.stroke({
        width: this.merge('lineWidth', true),
        color: this.merge('lineColor', true)
      }).fill({
        color: 'none'
      });
    }
    /** 
     * @Author: 王林 
     * @Date: 2022-07-30 16:19:03 
     * @Desc: 概要连线 
     */

  }, {
    key: "generalizationLine",
    value: function generalizationLine(node) {
      node.stroke({
        width: this.merge('generalizationLineWidth', true),
        color: this.merge('generalizationLineColor', true)
      }).fill({
        color: 'none'
      });
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-04-11 20:03:59 
     * @Desc: 按钮 
     */

  }, {
    key: "iconBtn",
    value: function iconBtn(node, fillNode) {
      node.fill({
        color: '#808080'
      });
      fillNode.fill({
        color: '#fff'
      });
    }
  }], [{
    key: "setBackgroundStyle",
    value:
    /** 
     * @Author: 王林 
     * @Date: 2021-04-11 16:01:53 
     * @Desc:  设置背景样式
     */
    function setBackgroundStyle(el, themeConfig) {
      var backgroundColor = themeConfig.backgroundColor,
          backgroundImage = themeConfig.backgroundImage,
          backgroundRepeat = themeConfig.backgroundRepeat;
      el.style.backgroundColor = backgroundColor;

      if (backgroundImage) {
        el.style.backgroundImage = "url(".concat(backgroundImage, ")");
        el.style.backgroundRepeat = backgroundRepeat;
      }
    }
  }]);

  return Style;
}();

/* harmony default export */ var src_Style = (Style_Style);
// EXTERNAL MODULE: E:/node_modules/core-js/modules/es.object.to-string.js
var modules_es_object_to_string = __webpack_require__("e790");

// EXTERNAL MODULE: E:/node_modules/core-js/modules/es.promise.js
var es_promise = __webpack_require__("0a5f");

// EXTERNAL MODULE: E:/node_modules/core-js/modules/es.string.replace.js
var es_string_replace = __webpack_require__("f3e5");

// CONCATENATED MODULE: ../simple-mind-map/src/utils/index.js






/** 
 * javascript comment 
 * @Author: 王林25 
 * @Date: 2021-04-06 14:13:17 
 * @Desc: 深度优先遍历树 
 */
var walk = function walk(root, parent, beforeCallback, afterCallback, isRoot) {
  var layerIndex = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;
  var index = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 0;
  var stop = false;

  if (beforeCallback) {
    stop = beforeCallback(root, parent, isRoot, layerIndex, index);
  }

  if (!stop && root.children && root.children.length > 0) {
    var _layerIndex = layerIndex + 1;

    root.children.forEach(function (node, nodeIndex) {
      walk(node, root, beforeCallback, afterCallback, false, _layerIndex, nodeIndex);
    });
  }

  afterCallback && afterCallback(root, parent, isRoot, layerIndex, index);
};
/** 
 * javascript comment 
 * @Author: 王林25 
 * @Date: 2021-04-07 18:47:20 
 * @Desc: 广度优先遍历树 
 */

var bfsWalk = function bfsWalk(root, callback) {
  callback(root);
  var stack = [root];
  var isStop = false;

  while (stack.length) {
    if (isStop) {
      break;
    }

    var cur = stack.shift();

    if (cur.children && cur.children.length) {
      cur.children.forEach(function (item) {
        stack.push(item);

        if (callback(item) === 'stop') {
          isStop = true;
        }
      });
    }
  }
};
/** 
 * javascript comment 
 * @Author: 王林25 
 * @Date: 2021-04-09 10:44:54 
 * @Desc: 缩放图片尺寸 
 */

var resizeImgSize = function resizeImgSize(width, height, maxWidth, maxHeight) {
  var nRatio = width / height;
  var arr = [];

  if (maxWidth && maxHeight) {
    if (width <= maxWidth && height <= maxHeight) {
      arr = [width, height];
    } else {
      var mRatio = maxWidth / maxHeight;

      if (nRatio > mRatio) {
        // 固定高度
        arr = [nRatio * maxHeight, maxHeight];
      } else {
        // 固定宽度
        arr = [maxWidth, maxWidth / nRatio];
      }
    }
  } else if (maxWidth) {
    if (width <= maxWidth) {
      arr = [width, height];
    } else {
      arr = [maxWidth, maxWidth / nRatio];
    }
  } else if (maxHeight) {
    if (height <= maxHeight) {
      arr = [width, height];
    } else {
      arr = [nRatio * maxHeight, maxHeight];
    }
  }

  return arr;
};
/** 
 * javascript comment 
 * @Author: 王林25 
 * @Date: 2021-04-09 10:18:42 
 * @Desc: 缩放图片 
 */

var resizeImg = function resizeImg(imgUrl, maxWidth, maxHeight) {
  return new Promise(function (resolve, reject) {
    var img = new Image();
    img.src = imgUrl;

    img.onload = function () {
      var arr = resizeImgSize(img.naturalWidth, img.naturalHeight, maxWidth, maxHeight);
      resolve(arr);
    };

    img.onerror = function (e) {
      reject(e);
    };
  });
};
/** 
 * @Author: 王林 
 * @Date: 2021-05-04 12:26:56 
 * @Desc: 从头html结构字符串里获取带换行符的字符串 
 */

var getStrWithBrFromHtml = function getStrWithBrFromHtml(str) {
  str = str.replace(/<br>/img, '\n');
  var el = document.createElement('div');
  el.innerHTML = str;
  str = el.textContent;
  return str;
};
/** 
 * @Author: 王林 
 * @Date: 2021-05-04 14:45:39 
 * @Desc: 极简的深拷贝 
 */

var simpleDeepClone = function simpleDeepClone(data) {
  try {
    return JSON.parse(JSON.stringify(data));
  } catch (error) {
    return null;
  }
};
/** 
 * @Author: 王林 
 * @Date: 2021-05-04 14:40:11 
 * @Desc: 复制渲染树数据 
 */

var copyRenderTree = function copyRenderTree(tree, root) {
  tree.data = simpleDeepClone(root.data);
  tree.children = [];

  if (root.children && root.children.length > 0) {
    root.children.forEach(function (item, index) {
      tree.children[index] = copyRenderTree({}, item);
    });
  }

  return tree;
};
/** 
 * @Author: 王林 
 * @Date: 2021-05-04 14:40:11 
 * @Desc: 复制节点树数据 
 */

var copyNodeTree = function copyNodeTree(tree, root) {
  tree.data = simpleDeepClone(root.nodeData.data); // tree.data.isActive = false

  tree.children = [];

  if (root.children && root.children.length > 0) {
    root.children.forEach(function (item, index) {
      tree.children[index] = copyNodeTree({}, item);
    });
  }

  return tree;
};
/** 
 * @Author: 王林 
 * @Date: 2021-07-04 09:08:43 
 * @Desc: 图片转成dataURL 
 */

var imgToDataUrl = function imgToDataUrl(src) {
  return new Promise(function (resolve, reject) {
    var img = new Image(); // 跨域图片需要添加这个属性，否则画布被污染了无法导出图片

    img.setAttribute('crossOrigin', 'anonymous');

    img.onload = function () {
      try {
        var canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext('2d'); // 图片绘制到canvas里

        ctx.drawImage(img, 0, 0, img.width, img.height);
        resolve(canvas.toDataURL());
      } catch (e) {
        reject(e);
      }
    };

    img.onerror = function (e) {
      reject(e);
    };

    img.src = src;
  });
};
/** 
 * @Author: 王林 
 * @Date: 2021-07-04 16:20:06 
 * @Desc: 下载文件 
 */

var downloadFile = function downloadFile(file, fileName) {
  var a = document.createElement('a');
  a.href = file;
  a.download = fileName;
  a.click();
};
/** 
 * @Author: 王林 
 * @Date: 2021-07-11 10:36:47 
 * @Desc: 节流函数 
 */

var throttle = function throttle(fn) {
  var time = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 300;
  var ctx = arguments.length > 2 ? arguments[2] : undefined;
  var timer = null;
  return function () {
    if (timer) {
      return;
    }

    timer = setTimeout(function () {
      fn.call(ctx);
      timer = null;
    }, 300);
  };
};
/** 
 * javascript comment 
 * @Author: 王林25 
 * @Date: 2021-07-12 10:27:36 
 * @Desc: 异步执行任务队列 
 */

var asyncRun = function asyncRun(taskList) {
  var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
  var index = 0;
  var len = taskList.length;

  if (len <= 0) {
    return callback();
  }

  var loop = function loop() {
    if (index >= len) {
      callback();
      return;
    }

    taskList[index]();
    setTimeout(function () {
      index++;
      loop();
    }, 0);
  };

  loop();
};
// CONCATENATED MODULE: ../simple-mind-map/node_modules/@svgdotjs/svg.js/dist/svg.esm.js
/*!
* @svgdotjs/svg.js - A lightweight library for manipulating and animating SVG.
* @version 3.1.0
* https://svgjs.dev/
*
* @copyright Wout Fierens <wout@mick-wout.com>
* @license MIT
*
* BUILT: Mon Jun 14 2021 00:55:04 GMT+0200 (Mitteleuropäische Sommerzeit)
*/;
const methods$1 = {};
const names = [];
function registerMethods(name, m) {
  if (Array.isArray(name)) {
    for (const _name of name) {
      registerMethods(_name, m);
    }

    return;
  }

  if (typeof name === 'object') {
    for (const _name in name) {
      registerMethods(_name, name[_name]);
    }

    return;
  }

  addMethodNames(Object.getOwnPropertyNames(m));
  methods$1[name] = Object.assign(methods$1[name] || {}, m);
}
function getMethodsFor(name) {
  return methods$1[name] || {};
}
function getMethodNames() {
  return [...new Set(names)];
}
function addMethodNames(_names) {
  names.push(..._names);
}

// Map function
function map(array, block) {
  let i;
  const il = array.length;
  const result = [];

  for (i = 0; i < il; i++) {
    result.push(block(array[i]));
  }

  return result;
} // Filter function

function filter(array, block) {
  let i;
  const il = array.length;
  const result = [];

  for (i = 0; i < il; i++) {
    if (block(array[i])) {
      result.push(array[i]);
    }
  }

  return result;
} // Degrees to radians

function radians(d) {
  return d % 360 * Math.PI / 180;
} // Radians to degrees

function degrees(r) {
  return r * 180 / Math.PI % 360;
} // Convert dash-separated-string to camelCase

function camelCase(s) {
  return s.toLowerCase().replace(/-(.)/g, function (m, g) {
    return g.toUpperCase();
  });
} // Convert camel cased string to dash separated

function unCamelCase(s) {
  return s.replace(/([A-Z])/g, function (m, g) {
    return '-' + g.toLowerCase();
  });
} // Capitalize first letter of a string

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
} // Calculate proportional width and height values when necessary

function proportionalSize(element, width, height, box) {
  if (width == null || height == null) {
    box = box || element.bbox();

    if (width == null) {
      width = box.width / box.height * height;
    } else if (height == null) {
      height = box.height / box.width * width;
    }
  }

  return {
    width: width,
    height: height
  };
}
/**
 * This function adds support for string origins.
 * It searches for an origin in o.origin o.ox and o.originX.
 * This way, origin: {x: 'center', y: 50} can be passed as well as ox: 'center', oy: 50
**/

function getOrigin(o, element) {
  const origin = o.origin; // First check if origin is in ox or originX

  let ox = o.ox != null ? o.ox : o.originX != null ? o.originX : 'center';
  let oy = o.oy != null ? o.oy : o.originY != null ? o.originY : 'center'; // Then check if origin was used and overwrite in that case

  if (origin != null) {
    [ox, oy] = Array.isArray(origin) ? origin : typeof origin === 'object' ? [origin.x, origin.y] : [origin, origin];
  } // Make sure to only call bbox when actually needed


  const condX = typeof ox === 'string';
  const condY = typeof oy === 'string';

  if (condX || condY) {
    const {
      height,
      width,
      x,
      y
    } = element.bbox(); // And only overwrite if string was passed for this specific axis

    if (condX) {
      ox = ox.includes('left') ? x : ox.includes('right') ? x + width : x + width / 2;
    }

    if (condY) {
      oy = oy.includes('top') ? y : oy.includes('bottom') ? y + height : y + height / 2;
    }
  } // Return the origin as it is if it wasn't a string


  return [ox, oy];
}

var utils = {
  __proto__: null,
  map: map,
  filter: filter,
  radians: radians,
  degrees: degrees,
  camelCase: camelCase,
  unCamelCase: unCamelCase,
  capitalize: capitalize,
  proportionalSize: proportionalSize,
  getOrigin: getOrigin
};

// Default namespaces
const svg_esm_svg = 'http://www.w3.org/2000/svg';
const html = 'http://www.w3.org/1999/xhtml';
const xmlns = 'http://www.w3.org/2000/xmlns/';
const xlink = 'http://www.w3.org/1999/xlink';
const svgjs = 'http://svgjs.dev/svgjs';

var namespaces = {
  __proto__: null,
  svg: svg_esm_svg,
  html: html,
  xmlns: xmlns,
  xlink: xlink,
  svgjs: svgjs
};

const globals = {
  window: typeof window === 'undefined' ? null : window,
  document: typeof document === 'undefined' ? null : document
};
function registerWindow(win = null, doc = null) {
  globals.window = win;
  globals.document = doc;
}
const save = {};
function saveWindow() {
  save.window = globals.window;
  save.document = globals.document;
}
function restoreWindow() {
  globals.window = save.window;
  globals.document = save.document;
}
function withWindow(win, fn) {
  saveWindow();
  registerWindow(win, win.document);
  fn(win, win.document);
  restoreWindow();
}
function getWindow() {
  return globals.window;
}

class svg_esm_Base {// constructor (node/*, {extensions = []} */) {
  //   // this.tags = []
  //   //
  //   // for (let extension of extensions) {
  //   //   extension.setup.call(this, node)
  //   //   this.tags.push(extension.name)
  //   // }
  // }
}

const svg_esm_elements = {};
const root = '___SYMBOL___ROOT___'; // Method for element creation

function create(name, ns = svg_esm_svg) {
  // create element
  return globals.document.createElementNS(ns, name);
}
function makeInstance(element, isHTML = false) {
  if (element instanceof svg_esm_Base) return element;

  if (typeof element === 'object') {
    return adopter(element);
  }

  if (element == null) {
    return new svg_esm_elements[root]();
  }

  if (typeof element === 'string' && element.charAt(0) !== '<') {
    return adopter(globals.document.querySelector(element));
  } // Make sure, that HTML elements are created with the correct namespace


  const wrapper = isHTML ? globals.document.createElement('div') : create('svg');
  wrapper.innerHTML = element; // We can use firstChild here because we know,
  // that the first char is < and thus an element

  element = adopter(wrapper.firstChild); // make sure, that element doesnt have its wrapper attached

  wrapper.removeChild(wrapper.firstChild);
  return element;
}
function nodeOrNew(name, node) {
  return node instanceof globals.window.Node ? node : create(name);
} // Adopt existing svg elements

function adopt(node) {
  // check for presence of node
  if (!node) return null; // make sure a node isn't already adopted

  if (node.instance instanceof svg_esm_Base) return node.instance;

  if (node.nodeName === '#document-fragment') {
    return new svg_esm_elements.Fragment(node);
  } // initialize variables


  let className = capitalize(node.nodeName || 'Dom'); // Make sure that gradients are adopted correctly

  if (className === 'LinearGradient' || className === 'RadialGradient') {
    className = 'Gradient'; // Fallback to Dom if element is not known
  } else if (!svg_esm_elements[className]) {
    className = 'Dom';
  }

  return new svg_esm_elements[className](node);
}
let adopter = adopt;
function mockAdopt(mock = adopt) {
  adopter = mock;
}
function register(element, name = element.name, asRoot = false) {
  svg_esm_elements[name] = element;
  if (asRoot) svg_esm_elements[root] = element;
  addMethodNames(Object.getOwnPropertyNames(element.prototype));
  return element;
}
function getClass(name) {
  return svg_esm_elements[name];
} // Element id sequence

let did = 1000; // Get next named element id

function eid(name) {
  return 'Svgjs' + capitalize(name) + did++;
} // Deep new id assignment

function assignNewId(node) {
  // do the same for SVG child nodes as well
  for (let i = node.children.length - 1; i >= 0; i--) {
    assignNewId(node.children[i]);
  }

  if (node.id) {
    node.id = eid(node.nodeName);
    return node;
  }

  return node;
} // Method for extending objects

function extend(modules, methods) {
  let key, i;
  modules = Array.isArray(modules) ? modules : [modules];

  for (i = modules.length - 1; i >= 0; i--) {
    for (key in methods) {
      modules[i].prototype[key] = methods[key];
    }
  }
}
function wrapWithAttrCheck(fn) {
  return function (...args) {
    const o = args[args.length - 1];

    if (o && o.constructor === Object && !(o instanceof Array)) {
      return fn.apply(this, args.slice(0, -1)).attr(o);
    } else {
      return fn.apply(this, args);
    }
  };
}

function siblings() {
  return this.parent().children();
} // Get the current position siblings

function position() {
  return this.parent().index(this);
} // Get the next element (will return null if there is none)

function next() {
  return this.siblings()[this.position() + 1];
} // Get the next element (will return null if there is none)

function prev() {
  return this.siblings()[this.position() - 1];
} // Send given element one step forward

function svg_esm_forward() {
  const i = this.position();
  const p = this.parent(); // move node one step forward

  p.add(this.remove(), i + 1);
  return this;
} // Send given element one step backward

function backward() {
  const i = this.position();
  const p = this.parent();
  p.add(this.remove(), i ? i - 1 : 0);
  return this;
} // Send given element all the way to the front

function front() {
  const p = this.parent(); // Move node forward

  p.add(this.remove());
  return this;
} // Send given element all the way to the back

function svg_esm_back() {
  const p = this.parent(); // Move node back

  p.add(this.remove(), 0);
  return this;
} // Inserts a given element before the targeted element

function before(element) {
  element = makeInstance(element);
  element.remove();
  const i = this.position();
  this.parent().add(element, i);
  return this;
} // Inserts a given element after the targeted element

function after(element) {
  element = makeInstance(element);
  element.remove();
  const i = this.position();
  this.parent().add(element, i + 1);
  return this;
}
function insertBefore(element) {
  element = makeInstance(element);
  element.before(this);
  return this;
}
function insertAfter(element) {
  element = makeInstance(element);
  element.after(this);
  return this;
}
registerMethods('Dom', {
  siblings,
  position,
  next,
  prev,
  forward: svg_esm_forward,
  backward,
  front,
  back: svg_esm_back,
  before,
  after,
  insertBefore,
  insertAfter
});

// Parse unit value
const numberAndUnit = /^([+-]?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?)([a-z%]*)$/i; // Parse hex value

const hex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i; // Parse rgb value

const rgb = /rgb\((\d+),(\d+),(\d+)\)/; // Parse reference id

const reference = /(#[a-z_][a-z0-9\-_]*)/i; // splits a transformation chain

const transforms = /\)\s*,?\s*/; // Whitespace

const whitespace = /\s/g; // Test hex value

const isHex = /^#[a-f0-9]{3}$|^#[a-f0-9]{6}$/i; // Test rgb value

const isRgb = /^rgb\(/; // Test for blank string

const isBlank = /^(\s+)?$/; // Test for numeric string

const isNumber = /^[+-]?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i; // Test for image url

const isImage = /\.(jpg|jpeg|png|gif|svg)(\?[^=]+.*)?/i; // split at whitespace and comma

const delimiter = /[\s,]+/; // Test for path letter

const isPathLetter = /[MLHVCSQTAZ]/i;

var regex = {
  __proto__: null,
  numberAndUnit: numberAndUnit,
  hex: hex,
  rgb: rgb,
  reference: reference,
  transforms: transforms,
  whitespace: whitespace,
  isHex: isHex,
  isRgb: isRgb,
  isBlank: isBlank,
  isNumber: isNumber,
  isImage: isImage,
  delimiter: delimiter,
  isPathLetter: isPathLetter
};

function classes() {
  const attr = this.attr('class');
  return attr == null ? [] : attr.trim().split(delimiter);
} // Return true if class exists on the node, false otherwise

function hasClass(name) {
  return this.classes().indexOf(name) !== -1;
} // Add class to the node

function addClass(name) {
  if (!this.hasClass(name)) {
    const array = this.classes();
    array.push(name);
    this.attr('class', array.join(' '));
  }

  return this;
} // Remove class from the node

function removeClass(name) {
  if (this.hasClass(name)) {
    this.attr('class', this.classes().filter(function (c) {
      return c !== name;
    }).join(' '));
  }

  return this;
} // Toggle the presence of a class on the node

function toggleClass(name) {
  return this.hasClass(name) ? this.removeClass(name) : this.addClass(name);
}
registerMethods('Dom', {
  classes,
  hasClass,
  addClass,
  removeClass,
  toggleClass
});

function css(style, val) {
  const ret = {};

  if (arguments.length === 0) {
    // get full style as object
    this.node.style.cssText.split(/\s*;\s*/).filter(function (el) {
      return !!el.length;
    }).forEach(function (el) {
      const t = el.split(/\s*:\s*/);
      ret[t[0]] = t[1];
    });
    return ret;
  }

  if (arguments.length < 2) {
    // get style properties as array
    if (Array.isArray(style)) {
      for (const name of style) {
        const cased = camelCase(name);
        ret[cased] = this.node.style[cased];
      }

      return ret;
    } // get style for property


    if (typeof style === 'string') {
      return this.node.style[camelCase(style)];
    } // set styles in object


    if (typeof style === 'object') {
      for (const name in style) {
        // set empty string if null/undefined/'' was given
        this.node.style[camelCase(name)] = style[name] == null || isBlank.test(style[name]) ? '' : style[name];
      }
    }
  } // set style for property


  if (arguments.length === 2) {
    this.node.style[camelCase(style)] = val == null || isBlank.test(val) ? '' : val;
  }

  return this;
} // Show element

function svg_esm_show() {
  return this.css('display', '');
} // Hide element

function svg_esm_hide() {
  return this.css('display', 'none');
} // Is element visible?

function visible() {
  return this.css('display') !== 'none';
}
registerMethods('Dom', {
  css,
  show: svg_esm_show,
  hide: svg_esm_hide,
  visible
});

function svg_esm_data(a, v, r) {
  if (a == null) {
    // get an object of attributes
    return this.data(map(filter(this.node.attributes, el => el.nodeName.indexOf('data-') === 0), el => el.nodeName.slice(5)));
  } else if (a instanceof Array) {
    const data = {};

    for (const key of a) {
      data[key] = this.data(key);
    }

    return data;
  } else if (typeof a === 'object') {
    for (v in a) {
      this.data(v, a[v]);
    }
  } else if (arguments.length < 2) {
    try {
      return JSON.parse(this.attr('data-' + a));
    } catch (e) {
      return this.attr('data-' + a);
    }
  } else {
    this.attr('data-' + a, v === null ? null : r === true || typeof v === 'string' || typeof v === 'number' ? v : JSON.stringify(v));
  }

  return this;
}
registerMethods('Dom', {
  data: svg_esm_data
});

function remember(k, v) {
  // remember every item in an object individually
  if (typeof arguments[0] === 'object') {
    for (const key in k) {
      this.remember(key, k[key]);
    }
  } else if (arguments.length === 1) {
    // retrieve memory
    return this.memory()[k];
  } else {
    // store memory
    this.memory()[k] = v;
  }

  return this;
} // Erase a given memory

function forget() {
  if (arguments.length === 0) {
    this._memory = {};
  } else {
    for (let i = arguments.length - 1; i >= 0; i--) {
      delete this.memory()[arguments[i]];
    }
  }

  return this;
} // This triggers creation of a new hidden class which is not performant
// However, this function is not rarely used so it will not happen frequently
// Return local memory object

function memory() {
  return this._memory = this._memory || {};
}
registerMethods('Dom', {
  remember,
  forget,
  memory
});

function sixDigitHex(hex) {
  return hex.length === 4 ? ['#', hex.substring(1, 2), hex.substring(1, 2), hex.substring(2, 3), hex.substring(2, 3), hex.substring(3, 4), hex.substring(3, 4)].join('') : hex;
}

function componentHex(component) {
  const integer = Math.round(component);
  const bounded = Math.max(0, Math.min(255, integer));
  const hex = bounded.toString(16);
  return hex.length === 1 ? '0' + hex : hex;
}

function is(object, space) {
  for (let i = space.length; i--;) {
    if (object[space[i]] == null) {
      return false;
    }
  }

  return true;
}

function getParameters(a, b) {
  const params = is(a, 'rgb') ? {
    _a: a.r,
    _b: a.g,
    _c: a.b,
    _d: 0,
    space: 'rgb'
  } : is(a, 'xyz') ? {
    _a: a.x,
    _b: a.y,
    _c: a.z,
    _d: 0,
    space: 'xyz'
  } : is(a, 'hsl') ? {
    _a: a.h,
    _b: a.s,
    _c: a.l,
    _d: 0,
    space: 'hsl'
  } : is(a, 'lab') ? {
    _a: a.l,
    _b: a.a,
    _c: a.b,
    _d: 0,
    space: 'lab'
  } : is(a, 'lch') ? {
    _a: a.l,
    _b: a.c,
    _c: a.h,
    _d: 0,
    space: 'lch'
  } : is(a, 'cmyk') ? {
    _a: a.c,
    _b: a.m,
    _c: a.y,
    _d: a.k,
    space: 'cmyk'
  } : {
    _a: 0,
    _b: 0,
    _c: 0,
    space: 'rgb'
  };
  params.space = b || params.space;
  return params;
}

function cieSpace(space) {
  if (space === 'lab' || space === 'xyz' || space === 'lch') {
    return true;
  } else {
    return false;
  }
}

function hueToRgb(p, q, t) {
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  if (t < 1 / 6) return p + (q - p) * 6 * t;
  if (t < 1 / 2) return q;
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
  return p;
}

class Color {
  constructor(...inputs) {
    this.init(...inputs);
  } // Test if given value is a color


  static isColor(color) {
    return color && (color instanceof Color || this.isRgb(color) || this.test(color));
  } // Test if given value is an rgb object


  static isRgb(color) {
    return color && typeof color.r === 'number' && typeof color.g === 'number' && typeof color.b === 'number';
  }
  /*
  Generating random colors
  */


  static random(mode = 'vibrant', t, u) {
    // Get the math modules
    const {
      random,
      round,
      sin,
      PI: pi
    } = Math; // Run the correct generator

    if (mode === 'vibrant') {
      const l = (81 - 57) * random() + 57;
      const c = (83 - 45) * random() + 45;
      const h = 360 * random();
      const color = new Color(l, c, h, 'lch');
      return color;
    } else if (mode === 'sine') {
      t = t == null ? random() : t;
      const r = round(80 * sin(2 * pi * t / 0.5 + 0.01) + 150);
      const g = round(50 * sin(2 * pi * t / 0.5 + 4.6) + 200);
      const b = round(100 * sin(2 * pi * t / 0.5 + 2.3) + 150);
      const color = new Color(r, g, b);
      return color;
    } else if (mode === 'pastel') {
      const l = (94 - 86) * random() + 86;
      const c = (26 - 9) * random() + 9;
      const h = 360 * random();
      const color = new Color(l, c, h, 'lch');
      return color;
    } else if (mode === 'dark') {
      const l = 10 + 10 * random();
      const c = (125 - 75) * random() + 86;
      const h = 360 * random();
      const color = new Color(l, c, h, 'lch');
      return color;
    } else if (mode === 'rgb') {
      const r = 255 * random();
      const g = 255 * random();
      const b = 255 * random();
      const color = new Color(r, g, b);
      return color;
    } else if (mode === 'lab') {
      const l = 100 * random();
      const a = 256 * random() - 128;
      const b = 256 * random() - 128;
      const color = new Color(l, a, b, 'lab');
      return color;
    } else if (mode === 'grey') {
      const grey = 255 * random();
      const color = new Color(grey, grey, grey);
      return color;
    } else {
      throw new Error('Unsupported random color mode');
    }
  } // Test if given value is a color string


  static test(color) {
    return typeof color === 'string' && (isHex.test(color) || isRgb.test(color));
  }

  cmyk() {
    // Get the rgb values for the current color
    const {
      _a,
      _b,
      _c
    } = this.rgb();
    const [r, g, b] = [_a, _b, _c].map(v => v / 255); // Get the cmyk values in an unbounded format

    const k = Math.min(1 - r, 1 - g, 1 - b);

    if (k === 1) {
      // Catch the black case
      return new Color(0, 0, 0, 1, 'cmyk');
    }

    const c = (1 - r - k) / (1 - k);
    const m = (1 - g - k) / (1 - k);
    const y = (1 - b - k) / (1 - k); // Construct the new color

    const color = new Color(c, m, y, k, 'cmyk');
    return color;
  }

  hsl() {
    // Get the rgb values
    const {
      _a,
      _b,
      _c
    } = this.rgb();
    const [r, g, b] = [_a, _b, _c].map(v => v / 255); // Find the maximum and minimum values to get the lightness

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const l = (max + min) / 2; // If the r, g, v values are identical then we are grey

    const isGrey = max === min; // Calculate the hue and saturation

    const delta = max - min;
    const s = isGrey ? 0 : l > 0.5 ? delta / (2 - max - min) : delta / (max + min);
    const h = isGrey ? 0 : max === r ? ((g - b) / delta + (g < b ? 6 : 0)) / 6 : max === g ? ((b - r) / delta + 2) / 6 : max === b ? ((r - g) / delta + 4) / 6 : 0; // Construct and return the new color

    const color = new Color(360 * h, 100 * s, 100 * l, 'hsl');
    return color;
  }

  init(a = 0, b = 0, c = 0, d = 0, space = 'rgb') {
    // This catches the case when a falsy value is passed like ''
    a = !a ? 0 : a; // Reset all values in case the init function is rerun with new color space

    if (this.space) {
      for (const component in this.space) {
        delete this[this.space[component]];
      }
    }

    if (typeof a === 'number') {
      // Allow for the case that we don't need d...
      space = typeof d === 'string' ? d : space;
      d = typeof d === 'string' ? 0 : d; // Assign the values straight to the color

      Object.assign(this, {
        _a: a,
        _b: b,
        _c: c,
        _d: d,
        space
      }); // If the user gave us an array, make the color from it
    } else if (a instanceof Array) {
      this.space = b || (typeof a[3] === 'string' ? a[3] : a[4]) || 'rgb';
      Object.assign(this, {
        _a: a[0],
        _b: a[1],
        _c: a[2],
        _d: a[3] || 0
      });
    } else if (a instanceof Object) {
      // Set the object up and assign its values directly
      const values = getParameters(a, b);
      Object.assign(this, values);
    } else if (typeof a === 'string') {
      if (isRgb.test(a)) {
        const noWhitespace = a.replace(whitespace, '');
        const [_a, _b, _c] = rgb.exec(noWhitespace).slice(1, 4).map(v => parseInt(v));
        Object.assign(this, {
          _a,
          _b,
          _c,
          _d: 0,
          space: 'rgb'
        });
      } else if (isHex.test(a)) {
        const hexParse = v => parseInt(v, 16);

        const [, _a, _b, _c] = hex.exec(sixDigitHex(a)).map(hexParse);
        Object.assign(this, {
          _a,
          _b,
          _c,
          _d: 0,
          space: 'rgb'
        });
      } else throw Error('Unsupported string format, can\'t construct Color');
    } // Now add the components as a convenience


    const {
      _a,
      _b,
      _c,
      _d
    } = this;
    const components = this.space === 'rgb' ? {
      r: _a,
      g: _b,
      b: _c
    } : this.space === 'xyz' ? {
      x: _a,
      y: _b,
      z: _c
    } : this.space === 'hsl' ? {
      h: _a,
      s: _b,
      l: _c
    } : this.space === 'lab' ? {
      l: _a,
      a: _b,
      b: _c
    } : this.space === 'lch' ? {
      l: _a,
      c: _b,
      h: _c
    } : this.space === 'cmyk' ? {
      c: _a,
      m: _b,
      y: _c,
      k: _d
    } : {};
    Object.assign(this, components);
  }

  lab() {
    // Get the xyz color
    const {
      x,
      y,
      z
    } = this.xyz(); // Get the lab components

    const l = 116 * y - 16;
    const a = 500 * (x - y);
    const b = 200 * (y - z); // Construct and return a new color

    const color = new Color(l, a, b, 'lab');
    return color;
  }

  lch() {
    // Get the lab color directly
    const {
      l,
      a,
      b
    } = this.lab(); // Get the chromaticity and the hue using polar coordinates

    const c = Math.sqrt(a ** 2 + b ** 2);
    let h = 180 * Math.atan2(b, a) / Math.PI;

    if (h < 0) {
      h *= -1;
      h = 360 - h;
    } // Make a new color and return it


    const color = new Color(l, c, h, 'lch');
    return color;
  }
  /*
  Conversion Methods
  */


  rgb() {
    if (this.space === 'rgb') {
      return this;
    } else if (cieSpace(this.space)) {
      // Convert to the xyz color space
      let {
        x,
        y,
        z
      } = this;

      if (this.space === 'lab' || this.space === 'lch') {
        // Get the values in the lab space
        let {
          l,
          a,
          b
        } = this;

        if (this.space === 'lch') {
          const {
            c,
            h
          } = this;
          const dToR = Math.PI / 180;
          a = c * Math.cos(dToR * h);
          b = c * Math.sin(dToR * h);
        } // Undo the nonlinear function


        const yL = (l + 16) / 116;
        const xL = a / 500 + yL;
        const zL = yL - b / 200; // Get the xyz values

        const ct = 16 / 116;
        const mx = 0.008856;
        const nm = 7.787;
        x = 0.95047 * (xL ** 3 > mx ? xL ** 3 : (xL - ct) / nm);
        y = 1.00000 * (yL ** 3 > mx ? yL ** 3 : (yL - ct) / nm);
        z = 1.08883 * (zL ** 3 > mx ? zL ** 3 : (zL - ct) / nm);
      } // Convert xyz to unbounded rgb values


      const rU = x * 3.2406 + y * -1.5372 + z * -0.4986;
      const gU = x * -0.9689 + y * 1.8758 + z * 0.0415;
      const bU = x * 0.0557 + y * -0.2040 + z * 1.0570; // Convert the values to true rgb values

      const pow = Math.pow;
      const bd = 0.0031308;
      const r = rU > bd ? 1.055 * pow(rU, 1 / 2.4) - 0.055 : 12.92 * rU;
      const g = gU > bd ? 1.055 * pow(gU, 1 / 2.4) - 0.055 : 12.92 * gU;
      const b = bU > bd ? 1.055 * pow(bU, 1 / 2.4) - 0.055 : 12.92 * bU; // Make and return the color

      const color = new Color(255 * r, 255 * g, 255 * b);
      return color;
    } else if (this.space === 'hsl') {
      // https://bgrins.github.io/TinyColor/docs/tinycolor.html
      // Get the current hsl values
      let {
        h,
        s,
        l
      } = this;
      h /= 360;
      s /= 100;
      l /= 100; // If we are grey, then just make the color directly

      if (s === 0) {
        l *= 255;
        const color = new Color(l, l, l);
        return color;
      } // TODO I have no idea what this does :D If you figure it out, tell me!


      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q; // Get the rgb values

      const r = 255 * hueToRgb(p, q, h + 1 / 3);
      const g = 255 * hueToRgb(p, q, h);
      const b = 255 * hueToRgb(p, q, h - 1 / 3); // Make a new color

      const color = new Color(r, g, b);
      return color;
    } else if (this.space === 'cmyk') {
      // https://gist.github.com/felipesabino/5066336
      // Get the normalised cmyk values
      const {
        c,
        m,
        y,
        k
      } = this; // Get the rgb values

      const r = 255 * (1 - Math.min(1, c * (1 - k) + k));
      const g = 255 * (1 - Math.min(1, m * (1 - k) + k));
      const b = 255 * (1 - Math.min(1, y * (1 - k) + k)); // Form the color and return it

      const color = new Color(r, g, b);
      return color;
    } else {
      return this;
    }
  }

  toArray() {
    const {
      _a,
      _b,
      _c,
      _d,
      space
    } = this;
    return [_a, _b, _c, _d, space];
  }

  toHex() {
    const [r, g, b] = this._clamped().map(componentHex);

    return `#${r}${g}${b}`;
  }

  toRgb() {
    const [rV, gV, bV] = this._clamped();

    const string = `rgb(${rV},${gV},${bV})`;
    return string;
  }

  toString() {
    return this.toHex();
  }

  xyz() {
    // Normalise the red, green and blue values
    const {
      _a: r255,
      _b: g255,
      _c: b255
    } = this.rgb();
    const [r, g, b] = [r255, g255, b255].map(v => v / 255); // Convert to the lab rgb space

    const rL = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
    const gL = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
    const bL = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92; // Convert to the xyz color space without bounding the values

    const xU = (rL * 0.4124 + gL * 0.3576 + bL * 0.1805) / 0.95047;
    const yU = (rL * 0.2126 + gL * 0.7152 + bL * 0.0722) / 1.00000;
    const zU = (rL * 0.0193 + gL * 0.1192 + bL * 0.9505) / 1.08883; // Get the proper xyz values by applying the bounding

    const x = xU > 0.008856 ? Math.pow(xU, 1 / 3) : 7.787 * xU + 16 / 116;
    const y = yU > 0.008856 ? Math.pow(yU, 1 / 3) : 7.787 * yU + 16 / 116;
    const z = zU > 0.008856 ? Math.pow(zU, 1 / 3) : 7.787 * zU + 16 / 116; // Make and return the color

    const color = new Color(x, y, z, 'xyz');
    return color;
  }
  /*
  Input and Output methods
  */


  _clamped() {
    const {
      _a,
      _b,
      _c
    } = this.rgb();
    const {
      max,
      min,
      round
    } = Math;

    const format = v => max(0, min(round(v), 255));

    return [_a, _b, _c].map(format);
  }
  /*
  Constructing colors
  */


}

class Point {
  // Initialize
  constructor(...args) {
    this.init(...args);
  } // Clone point


  clone() {
    return new Point(this);
  }

  init(x, y) {
    const base = {
      x: 0,
      y: 0
    }; // ensure source as object

    const source = Array.isArray(x) ? {
      x: x[0],
      y: x[1]
    } : typeof x === 'object' ? {
      x: x.x,
      y: x.y
    } : {
      x: x,
      y: y
    }; // merge source

    this.x = source.x == null ? base.x : source.x;
    this.y = source.y == null ? base.y : source.y;
    return this;
  }

  toArray() {
    return [this.x, this.y];
  }

  transform(m) {
    return this.clone().transformO(m);
  } // Transform point with matrix


  transformO(m) {
    if (!Matrix.isMatrixLike(m)) {
      m = new Matrix(m);
    }

    const {
      x,
      y
    } = this; // Perform the matrix multiplication

    this.x = m.a * x + m.c * y + m.e;
    this.y = m.b * x + m.d * y + m.f;
    return this;
  }

}
function point(x, y) {
  return new Point(x, y).transform(this.screenCTM().inverse());
}

function closeEnough(a, b, threshold) {
  return Math.abs(b - a) < (threshold || 1e-6);
}

class Matrix {
  constructor(...args) {
    this.init(...args);
  }

  static formatTransforms(o) {
    // Get all of the parameters required to form the matrix
    const flipBoth = o.flip === 'both' || o.flip === true;
    const flipX = o.flip && (flipBoth || o.flip === 'x') ? -1 : 1;
    const flipY = o.flip && (flipBoth || o.flip === 'y') ? -1 : 1;
    const skewX = o.skew && o.skew.length ? o.skew[0] : isFinite(o.skew) ? o.skew : isFinite(o.skewX) ? o.skewX : 0;
    const skewY = o.skew && o.skew.length ? o.skew[1] : isFinite(o.skew) ? o.skew : isFinite(o.skewY) ? o.skewY : 0;
    const scaleX = o.scale && o.scale.length ? o.scale[0] * flipX : isFinite(o.scale) ? o.scale * flipX : isFinite(o.scaleX) ? o.scaleX * flipX : flipX;
    const scaleY = o.scale && o.scale.length ? o.scale[1] * flipY : isFinite(o.scale) ? o.scale * flipY : isFinite(o.scaleY) ? o.scaleY * flipY : flipY;
    const shear = o.shear || 0;
    const theta = o.rotate || o.theta || 0;
    const origin = new Point(o.origin || o.around || o.ox || o.originX, o.oy || o.originY);
    const ox = origin.x;
    const oy = origin.y; // We need Point to be invalid if nothing was passed because we cannot default to 0 here. Thats why NaN

    const position = new Point(o.position || o.px || o.positionX || NaN, o.py || o.positionY || NaN);
    const px = position.x;
    const py = position.y;
    const translate = new Point(o.translate || o.tx || o.translateX, o.ty || o.translateY);
    const tx = translate.x;
    const ty = translate.y;
    const relative = new Point(o.relative || o.rx || o.relativeX, o.ry || o.relativeY);
    const rx = relative.x;
    const ry = relative.y; // Populate all of the values

    return {
      scaleX,
      scaleY,
      skewX,
      skewY,
      shear,
      theta,
      rx,
      ry,
      tx,
      ty,
      ox,
      oy,
      px,
      py
    };
  }

  static fromArray(a) {
    return {
      a: a[0],
      b: a[1],
      c: a[2],
      d: a[3],
      e: a[4],
      f: a[5]
    };
  }

  static isMatrixLike(o) {
    return o.a != null || o.b != null || o.c != null || o.d != null || o.e != null || o.f != null;
  } // left matrix, right matrix, target matrix which is overwritten


  static matrixMultiply(l, r, o) {
    // Work out the product directly
    const a = l.a * r.a + l.c * r.b;
    const b = l.b * r.a + l.d * r.b;
    const c = l.a * r.c + l.c * r.d;
    const d = l.b * r.c + l.d * r.d;
    const e = l.e + l.a * r.e + l.c * r.f;
    const f = l.f + l.b * r.e + l.d * r.f; // make sure to use local variables because l/r and o could be the same

    o.a = a;
    o.b = b;
    o.c = c;
    o.d = d;
    o.e = e;
    o.f = f;
    return o;
  }

  around(cx, cy, matrix) {
    return this.clone().aroundO(cx, cy, matrix);
  } // Transform around a center point


  aroundO(cx, cy, matrix) {
    const dx = cx || 0;
    const dy = cy || 0;
    return this.translateO(-dx, -dy).lmultiplyO(matrix).translateO(dx, dy);
  } // Clones this matrix


  clone() {
    return new Matrix(this);
  } // Decomposes this matrix into its affine parameters


  decompose(cx = 0, cy = 0) {
    // Get the parameters from the matrix
    const a = this.a;
    const b = this.b;
    const c = this.c;
    const d = this.d;
    const e = this.e;
    const f = this.f; // Figure out if the winding direction is clockwise or counterclockwise

    const determinant = a * d - b * c;
    const ccw = determinant > 0 ? 1 : -1; // Since we only shear in x, we can use the x basis to get the x scale
    // and the rotation of the resulting matrix

    const sx = ccw * Math.sqrt(a * a + b * b);
    const thetaRad = Math.atan2(ccw * b, ccw * a);
    const theta = 180 / Math.PI * thetaRad;
    const ct = Math.cos(thetaRad);
    const st = Math.sin(thetaRad); // We can then solve the y basis vector simultaneously to get the other
    // two affine parameters directly from these parameters

    const lam = (a * c + b * d) / determinant;
    const sy = c * sx / (lam * a - b) || d * sx / (lam * b + a); // Use the translations

    const tx = e - cx + cx * ct * sx + cy * (lam * ct * sx - st * sy);
    const ty = f - cy + cx * st * sx + cy * (lam * st * sx + ct * sy); // Construct the decomposition and return it

    return {
      // Return the affine parameters
      scaleX: sx,
      scaleY: sy,
      shear: lam,
      rotate: theta,
      translateX: tx,
      translateY: ty,
      originX: cx,
      originY: cy,
      // Return the matrix parameters
      a: this.a,
      b: this.b,
      c: this.c,
      d: this.d,
      e: this.e,
      f: this.f
    };
  } // Check if two matrices are equal


  equals(other) {
    if (other === this) return true;
    const comp = new Matrix(other);
    return closeEnough(this.a, comp.a) && closeEnough(this.b, comp.b) && closeEnough(this.c, comp.c) && closeEnough(this.d, comp.d) && closeEnough(this.e, comp.e) && closeEnough(this.f, comp.f);
  } // Flip matrix on x or y, at a given offset


  flip(axis, around) {
    return this.clone().flipO(axis, around);
  }

  flipO(axis, around) {
    return axis === 'x' ? this.scaleO(-1, 1, around, 0) : axis === 'y' ? this.scaleO(1, -1, 0, around) : this.scaleO(-1, -1, axis, around || axis); // Define an x, y flip point
  } // Initialize


  init(source) {
    const base = Matrix.fromArray([1, 0, 0, 1, 0, 0]); // ensure source as object

    source = source instanceof Element ? source.matrixify() : typeof source === 'string' ? Matrix.fromArray(source.split(delimiter).map(parseFloat)) : Array.isArray(source) ? Matrix.fromArray(source) : typeof source === 'object' && Matrix.isMatrixLike(source) ? source : typeof source === 'object' ? new Matrix().transform(source) : arguments.length === 6 ? Matrix.fromArray([].slice.call(arguments)) : base; // Merge the source matrix with the base matrix

    this.a = source.a != null ? source.a : base.a;
    this.b = source.b != null ? source.b : base.b;
    this.c = source.c != null ? source.c : base.c;
    this.d = source.d != null ? source.d : base.d;
    this.e = source.e != null ? source.e : base.e;
    this.f = source.f != null ? source.f : base.f;
    return this;
  }

  inverse() {
    return this.clone().inverseO();
  } // Inverses matrix


  inverseO() {
    // Get the current parameters out of the matrix
    const a = this.a;
    const b = this.b;
    const c = this.c;
    const d = this.d;
    const e = this.e;
    const f = this.f; // Invert the 2x2 matrix in the top left

    const det = a * d - b * c;
    if (!det) throw new Error('Cannot invert ' + this); // Calculate the top 2x2 matrix

    const na = d / det;
    const nb = -b / det;
    const nc = -c / det;
    const nd = a / det; // Apply the inverted matrix to the top right

    const ne = -(na * e + nc * f);
    const nf = -(nb * e + nd * f); // Construct the inverted matrix

    this.a = na;
    this.b = nb;
    this.c = nc;
    this.d = nd;
    this.e = ne;
    this.f = nf;
    return this;
  }

  lmultiply(matrix) {
    return this.clone().lmultiplyO(matrix);
  }

  lmultiplyO(matrix) {
    const r = this;
    const l = matrix instanceof Matrix ? matrix : new Matrix(matrix);
    return Matrix.matrixMultiply(l, r, this);
  } // Left multiplies by the given matrix


  multiply(matrix) {
    return this.clone().multiplyO(matrix);
  }

  multiplyO(matrix) {
    // Get the matrices
    const l = this;
    const r = matrix instanceof Matrix ? matrix : new Matrix(matrix);
    return Matrix.matrixMultiply(l, r, this);
  } // Rotate matrix


  rotate(r, cx, cy) {
    return this.clone().rotateO(r, cx, cy);
  }

  rotateO(r, cx = 0, cy = 0) {
    // Convert degrees to radians
    r = radians(r);
    const cos = Math.cos(r);
    const sin = Math.sin(r);
    const {
      a,
      b,
      c,
      d,
      e,
      f
    } = this;
    this.a = a * cos - b * sin;
    this.b = b * cos + a * sin;
    this.c = c * cos - d * sin;
    this.d = d * cos + c * sin;
    this.e = e * cos - f * sin + cy * sin - cx * cos + cx;
    this.f = f * cos + e * sin - cx * sin - cy * cos + cy;
    return this;
  } // Scale matrix


  scale(x, y, cx, cy) {
    return this.clone().scaleO(...arguments);
  }

  scaleO(x, y = x, cx = 0, cy = 0) {
    // Support uniform scaling
    if (arguments.length === 3) {
      cy = cx;
      cx = y;
      y = x;
    }

    const {
      a,
      b,
      c,
      d,
      e,
      f
    } = this;
    this.a = a * x;
    this.b = b * y;
    this.c = c * x;
    this.d = d * y;
    this.e = e * x - cx * x + cx;
    this.f = f * y - cy * y + cy;
    return this;
  } // Shear matrix


  shear(a, cx, cy) {
    return this.clone().shearO(a, cx, cy);
  }

  shearO(lx, cx = 0, cy = 0) {
    const {
      a,
      b,
      c,
      d,
      e,
      f
    } = this;
    this.a = a + b * lx;
    this.c = c + d * lx;
    this.e = e + f * lx - cy * lx;
    return this;
  } // Skew Matrix


  skew(x, y, cx, cy) {
    return this.clone().skewO(...arguments);
  }

  skewO(x, y = x, cx = 0, cy = 0) {
    // support uniformal skew
    if (arguments.length === 3) {
      cy = cx;
      cx = y;
      y = x;
    } // Convert degrees to radians


    x = radians(x);
    y = radians(y);
    const lx = Math.tan(x);
    const ly = Math.tan(y);
    const {
      a,
      b,
      c,
      d,
      e,
      f
    } = this;
    this.a = a + b * lx;
    this.b = b + a * ly;
    this.c = c + d * lx;
    this.d = d + c * ly;
    this.e = e + f * lx - cy * lx;
    this.f = f + e * ly - cx * ly;
    return this;
  } // SkewX


  skewX(x, cx, cy) {
    return this.skew(x, 0, cx, cy);
  } // SkewY


  skewY(y, cx, cy) {
    return this.skew(0, y, cx, cy);
  }

  toArray() {
    return [this.a, this.b, this.c, this.d, this.e, this.f];
  } // Convert matrix to string


  toString() {
    return 'matrix(' + this.a + ',' + this.b + ',' + this.c + ',' + this.d + ',' + this.e + ',' + this.f + ')';
  } // Transform a matrix into another matrix by manipulating the space


  transform(o) {
    // Check if o is a matrix and then left multiply it directly
    if (Matrix.isMatrixLike(o)) {
      const matrix = new Matrix(o);
      return matrix.multiplyO(this);
    } // Get the proposed transformations and the current transformations


    const t = Matrix.formatTransforms(o);
    const current = this;
    const {
      x: ox,
      y: oy
    } = new Point(t.ox, t.oy).transform(current); // Construct the resulting matrix

    const transformer = new Matrix().translateO(t.rx, t.ry).lmultiplyO(current).translateO(-ox, -oy).scaleO(t.scaleX, t.scaleY).skewO(t.skewX, t.skewY).shearO(t.shear).rotateO(t.theta).translateO(ox, oy); // If we want the origin at a particular place, we force it there

    if (isFinite(t.px) || isFinite(t.py)) {
      const origin = new Point(ox, oy).transform(transformer); // TODO: Replace t.px with isFinite(t.px)
      // Doesnt work because t.px is also 0 if it wasnt passed

      const dx = isFinite(t.px) ? t.px - origin.x : 0;
      const dy = isFinite(t.py) ? t.py - origin.y : 0;
      transformer.translateO(dx, dy);
    } // Translate now after positioning


    transformer.translateO(t.tx, t.ty);
    return transformer;
  } // Translate matrix


  translate(x, y) {
    return this.clone().translateO(x, y);
  }

  translateO(x, y) {
    this.e += x || 0;
    this.f += y || 0;
    return this;
  }

  valueOf() {
    return {
      a: this.a,
      b: this.b,
      c: this.c,
      d: this.d,
      e: this.e,
      f: this.f
    };
  }

}
function ctm() {
  return new Matrix(this.node.getCTM());
}
function screenCTM() {
  /* https://bugzilla.mozilla.org/show_bug.cgi?id=1344537
     This is needed because FF does not return the transformation matrix
     for the inner coordinate system when getScreenCTM() is called on nested svgs.
     However all other Browsers do that */
  if (typeof this.isRoot === 'function' && !this.isRoot()) {
    const rect = this.rect(1, 1);
    const m = rect.node.getScreenCTM();
    rect.remove();
    return new Matrix(m);
  }

  return new Matrix(this.node.getScreenCTM());
}
register(Matrix, 'Matrix');

function parser() {
  // Reuse cached element if possible
  if (!parser.nodes) {
    const svg = makeInstance().size(2, 0);
    svg.node.style.cssText = ['opacity: 0', 'position: absolute', 'left: -100%', 'top: -100%', 'overflow: hidden'].join(';');
    svg.attr('focusable', 'false');
    svg.attr('aria-hidden', 'true');
    const path = svg.path().node;
    parser.nodes = {
      svg,
      path
    };
  }

  if (!parser.nodes.svg.node.parentNode) {
    const b = globals.document.body || globals.document.documentElement;
    parser.nodes.svg.addTo(b);
  }

  return parser.nodes;
}

function isNulledBox(box) {
  return !box.width && !box.height && !box.x && !box.y;
}
function domContains(node) {
  return node === globals.document || (globals.document.documentElement.contains || function (node) {
    // This is IE - it does not support contains() for top-level SVGs
    while (node.parentNode) {
      node = node.parentNode;
    }

    return node === globals.document;
  }).call(globals.document.documentElement, node);
}
class Box {
  constructor(...args) {
    this.init(...args);
  }

  addOffset() {
    // offset by window scroll position, because getBoundingClientRect changes when window is scrolled
    this.x += globals.window.pageXOffset;
    this.y += globals.window.pageYOffset;
    return new Box(this);
  }

  init(source) {
    const base = [0, 0, 0, 0];
    source = typeof source === 'string' ? source.split(delimiter).map(parseFloat) : Array.isArray(source) ? source : typeof source === 'object' ? [source.left != null ? source.left : source.x, source.top != null ? source.top : source.y, source.width, source.height] : arguments.length === 4 ? [].slice.call(arguments) : base;
    this.x = source[0] || 0;
    this.y = source[1] || 0;
    this.width = this.w = source[2] || 0;
    this.height = this.h = source[3] || 0; // Add more bounding box properties

    this.x2 = this.x + this.w;
    this.y2 = this.y + this.h;
    this.cx = this.x + this.w / 2;
    this.cy = this.y + this.h / 2;
    return this;
  }

  isNulled() {
    return isNulledBox(this);
  } // Merge rect box with another, return a new instance


  merge(box) {
    const x = Math.min(this.x, box.x);
    const y = Math.min(this.y, box.y);
    const width = Math.max(this.x + this.width, box.x + box.width) - x;
    const height = Math.max(this.y + this.height, box.y + box.height) - y;
    return new Box(x, y, width, height);
  }

  toArray() {
    return [this.x, this.y, this.width, this.height];
  }

  toString() {
    return this.x + ' ' + this.y + ' ' + this.width + ' ' + this.height;
  }

  transform(m) {
    if (!(m instanceof Matrix)) {
      m = new Matrix(m);
    }

    let xMin = Infinity;
    let xMax = -Infinity;
    let yMin = Infinity;
    let yMax = -Infinity;
    const pts = [new Point(this.x, this.y), new Point(this.x2, this.y), new Point(this.x, this.y2), new Point(this.x2, this.y2)];
    pts.forEach(function (p) {
      p = p.transform(m);
      xMin = Math.min(xMin, p.x);
      xMax = Math.max(xMax, p.x);
      yMin = Math.min(yMin, p.y);
      yMax = Math.max(yMax, p.y);
    });
    return new Box(xMin, yMin, xMax - xMin, yMax - yMin);
  }

}

function getBox(el, getBBoxFn, retry) {
  let box;

  try {
    // Try to get the box with the provided function
    box = getBBoxFn(el.node); // If the box is worthless and not even in the dom, retry
    // by throwing an error here...

    if (isNulledBox(box) && !domContains(el.node)) {
      throw new Error('Element not in the dom');
    }
  } catch (e) {
    // ... and calling the retry handler here
    box = retry(el);
  }

  return box;
}

function bbox() {
  // Function to get bbox is getBBox()
  const getBBox = node => node.getBBox(); // Take all measures so that a stupid browser renders the element
  // so we can get the bbox from it when we try again


  const retry = el => {
    try {
      const clone = el.clone().addTo(parser().svg).show();
      const box = clone.node.getBBox();
      clone.remove();
      return box;
    } catch (e) {
      // We give up...
      throw new Error(`Getting bbox of element "${el.node.nodeName}" is not possible: ${e.toString()}`);
    }
  };

  const box = getBox(this, getBBox, retry);
  const bbox = new Box(box);
  return bbox;
}
function rbox(el) {
  const getRBox = node => node.getBoundingClientRect();

  const retry = el => {
    // There is no point in trying tricks here because if we insert the element into the dom ourselves
    // it obviously will be at the wrong position
    throw new Error(`Getting rbox of element "${el.node.nodeName}" is not possible`);
  };

  const box = getBox(this, getRBox, retry);
  const rbox = new Box(box); // If an element was passed, we want the bbox in the coordinate system of that element

  if (el) {
    return rbox.transform(el.screenCTM().inverseO());
  } // Else we want it in absolute screen coordinates
  // Therefore we need to add the scrollOffset


  return rbox.addOffset();
} // Checks whether the given point is inside the bounding box

function inside(x, y) {
  const box = this.bbox();
  return x > box.x && y > box.y && x < box.x + box.width && y < box.y + box.height;
}
registerMethods({
  viewbox: {
    viewbox(x, y, width, height) {
      // act as getter
      if (x == null) return new Box(this.attr('viewBox')); // act as setter

      return this.attr('viewBox', new Box(x, y, width, height));
    },

    zoom(level, point) {
      // Its best to rely on the attributes here and here is why:
      // clientXYZ: Doesn't work on non-root svgs because they dont have a CSSBox (silly!)
      // getBoundingClientRect: Doesn't work because Chrome just ignores width and height of nested svgs completely
      //                        that means, their clientRect is always as big as the content.
      //                        Furthermore this size is incorrect if the element is further transformed by its parents
      // computedStyle: Only returns meaningful values if css was used with px. We dont go this route here!
      // getBBox: returns the bounding box of its content - that doesnt help!
      let {
        width,
        height
      } = this.attr(['width', 'height']); // Width and height is a string when a number with a unit is present which we can't use
      // So we try clientXYZ

      if (!width && !height || typeof width === 'string' || typeof height === 'string') {
        width = this.node.clientWidth;
        height = this.node.clientHeight;
      } // Giving up...


      if (!width || !height) {
        throw new Error('Impossible to get absolute width and height. Please provide an absolute width and height attribute on the zooming element');
      }

      const v = this.viewbox();
      const zoomX = width / v.width;
      const zoomY = height / v.height;
      const zoom = Math.min(zoomX, zoomY);

      if (level == null) {
        return zoom;
      }

      let zoomAmount = zoom / level; // Set the zoomAmount to the highest value which is safe to process and recover from
      // The * 100 is a bit of wiggle room for the matrix transformation

      if (zoomAmount === Infinity) zoomAmount = Number.MAX_SAFE_INTEGER / 100;
      point = point || new Point(width / 2 / zoomX + v.x, height / 2 / zoomY + v.y);
      const box = new Box(v).transform(new Matrix({
        scale: zoomAmount,
        origin: point
      }));
      return this.viewbox(box);
    }

  }
});
register(Box, 'Box');

class List extends Array {
  constructor(arr = [], ...args) {
    super(arr, ...args);
    if (typeof arr === 'number') return this;
    this.length = 0;
    this.push(...arr);
  }

}
extend([List], {
  each(fnOrMethodName, ...args) {
    if (typeof fnOrMethodName === 'function') {
      return this.map((el, i, arr) => {
        return fnOrMethodName.call(el, el, i, arr);
      });
    } else {
      return this.map(el => {
        return el[fnOrMethodName](...args);
      });
    }
  },

  toArray() {
    return Array.prototype.concat.apply([], this);
  }

});
const reserved = ['toArray', 'constructor', 'each'];

List.extend = function (methods) {
  methods = methods.reduce((obj, name) => {
    // Don't overwrite own methods
    if (reserved.includes(name)) return obj; // Don't add private methods

    if (name[0] === '_') return obj; // Relay every call to each()

    obj[name] = function (...attrs) {
      return this.each(name, ...attrs);
    };

    return obj;
  }, {});
  extend([List], methods);
};

function baseFind(query, parent) {
  return new List(map((parent || globals.document).querySelectorAll(query), function (node) {
    return adopt(node);
  }));
} // Scoped find method

function find(query) {
  return baseFind(query, this.node);
}
function findOne(query) {
  return adopt(this.node.querySelector(query));
}

let listenerId = 0;
const windowEvents = {};
function getEvents(instance) {
  let n = instance.getEventHolder(); // We dont want to save events in global space

  if (n === globals.window) n = windowEvents;
  if (!n.events) n.events = {};
  return n.events;
}
function getEventTarget(instance) {
  return instance.getEventTarget();
}
function clearEvents(instance) {
  let n = instance.getEventHolder();
  if (n === globals.window) n = windowEvents;
  if (n.events) n.events = {};
} // Add event binder in the SVG namespace

function on(node, events, listener, binding, options) {
  const l = listener.bind(binding || node);
  const instance = makeInstance(node);
  const bag = getEvents(instance);
  const n = getEventTarget(instance); // events can be an array of events or a string of events

  events = Array.isArray(events) ? events : events.split(delimiter); // add id to listener

  if (!listener._svgjsListenerId) {
    listener._svgjsListenerId = ++listenerId;
  }

  events.forEach(function (event) {
    const ev = event.split('.')[0];
    const ns = event.split('.')[1] || '*'; // ensure valid object

    bag[ev] = bag[ev] || {};
    bag[ev][ns] = bag[ev][ns] || {}; // reference listener

    bag[ev][ns][listener._svgjsListenerId] = l; // add listener

    n.addEventListener(ev, l, options || false);
  });
} // Add event unbinder in the SVG namespace

function off(node, events, listener, options) {
  const instance = makeInstance(node);
  const bag = getEvents(instance);
  const n = getEventTarget(instance); // listener can be a function or a number

  if (typeof listener === 'function') {
    listener = listener._svgjsListenerId;
    if (!listener) return;
  } // events can be an array of events or a string or undefined


  events = Array.isArray(events) ? events : (events || '').split(delimiter);
  events.forEach(function (event) {
    const ev = event && event.split('.')[0];
    const ns = event && event.split('.')[1];
    let namespace, l;

    if (listener) {
      // remove listener reference
      if (bag[ev] && bag[ev][ns || '*']) {
        // removeListener
        n.removeEventListener(ev, bag[ev][ns || '*'][listener], options || false);
        delete bag[ev][ns || '*'][listener];
      }
    } else if (ev && ns) {
      // remove all listeners for a namespaced event
      if (bag[ev] && bag[ev][ns]) {
        for (l in bag[ev][ns]) {
          off(n, [ev, ns].join('.'), l);
        }

        delete bag[ev][ns];
      }
    } else if (ns) {
      // remove all listeners for a specific namespace
      for (event in bag) {
        for (namespace in bag[event]) {
          if (ns === namespace) {
            off(n, [event, ns].join('.'));
          }
        }
      }
    } else if (ev) {
      // remove all listeners for the event
      if (bag[ev]) {
        for (namespace in bag[ev]) {
          off(n, [ev, namespace].join('.'));
        }

        delete bag[ev];
      }
    } else {
      // remove all listeners on a given node
      for (event in bag) {
        off(n, event);
      }

      clearEvents(instance);
    }
  });
}
function dispatch(node, event, data, options) {
  const n = getEventTarget(node); // Dispatch event

  if (event instanceof globals.window.Event) {
    n.dispatchEvent(event);
  } else {
    event = new globals.window.CustomEvent(event, {
      detail: data,
      cancelable: true,
      ...options
    });
    n.dispatchEvent(event);
  }

  return event;
}

class EventTarget extends svg_esm_Base {
  addEventListener() {}

  dispatch(event, data, options) {
    return dispatch(this, event, data, options);
  }

  dispatchEvent(event) {
    const bag = this.getEventHolder().events;
    if (!bag) return true;
    const events = bag[event.type];

    for (const i in events) {
      for (const j in events[i]) {
        events[i][j](event);
      }
    }

    return !event.defaultPrevented;
  } // Fire given event


  fire(event, data, options) {
    this.dispatch(event, data, options);
    return this;
  }

  getEventHolder() {
    return this;
  }

  getEventTarget() {
    return this;
  } // Unbind event from listener


  off(event, listener) {
    off(this, event, listener);
    return this;
  } // Bind given event to listener


  on(event, listener, binding, options) {
    on(this, event, listener, binding, options);
    return this;
  }

  removeEventListener() {}

}
register(EventTarget, 'EventTarget');

function noop() {} // Default animation values

const timeline = {
  duration: 400,
  ease: '>',
  delay: 0
}; // Default attribute values

const attrs = {
  // fill and stroke
  'fill-opacity': 1,
  'stroke-opacity': 1,
  'stroke-width': 0,
  'stroke-linejoin': 'miter',
  'stroke-linecap': 'butt',
  fill: '#000000',
  stroke: '#000000',
  opacity: 1,
  // position
  x: 0,
  y: 0,
  cx: 0,
  cy: 0,
  // size
  width: 0,
  height: 0,
  // radius
  r: 0,
  rx: 0,
  ry: 0,
  // gradient
  offset: 0,
  'stop-opacity': 1,
  'stop-color': '#000000',
  // text
  'text-anchor': 'start'
};

var defaults = {
  __proto__: null,
  noop: noop,
  timeline: timeline,
  attrs: attrs
};

class SVGArray extends Array {
  constructor(...args) {
    super(...args);
    this.init(...args);
  }

  clone() {
    return new this.constructor(this);
  }

  init(arr) {
    // This catches the case, that native map tries to create an array with new Array(1)
    if (typeof arr === 'number') return this;
    this.length = 0;
    this.push(...this.parse(arr));
    return this;
  } // Parse whitespace separated string


  parse(array = []) {
    // If already is an array, no need to parse it
    if (array instanceof Array) return array;
    return array.trim().split(delimiter).map(parseFloat);
  }

  toArray() {
    return Array.prototype.concat.apply([], this);
  }

  toSet() {
    return new Set(this);
  }

  toString() {
    return this.join(' ');
  } // Flattens the array if needed


  valueOf() {
    const ret = [];
    ret.push(...this);
    return ret;
  }

}

class SVGNumber {
  // Initialize
  constructor(...args) {
    this.init(...args);
  }

  convert(unit) {
    return new SVGNumber(this.value, unit);
  } // Divide number


  divide(number) {
    number = new SVGNumber(number);
    return new SVGNumber(this / number, this.unit || number.unit);
  }

  init(value, unit) {
    unit = Array.isArray(value) ? value[1] : unit;
    value = Array.isArray(value) ? value[0] : value; // initialize defaults

    this.value = 0;
    this.unit = unit || ''; // parse value

    if (typeof value === 'number') {
      // ensure a valid numeric value
      this.value = isNaN(value) ? 0 : !isFinite(value) ? value < 0 ? -3.4e+38 : +3.4e+38 : value;
    } else if (typeof value === 'string') {
      unit = value.match(numberAndUnit);

      if (unit) {
        // make value numeric
        this.value = parseFloat(unit[1]); // normalize

        if (unit[5] === '%') {
          this.value /= 100;
        } else if (unit[5] === 's') {
          this.value *= 1000;
        } // store unit


        this.unit = unit[5];
      }
    } else {
      if (value instanceof SVGNumber) {
        this.value = value.valueOf();
        this.unit = value.unit;
      }
    }

    return this;
  } // Subtract number


  minus(number) {
    number = new SVGNumber(number);
    return new SVGNumber(this - number, this.unit || number.unit);
  } // Add number


  plus(number) {
    number = new SVGNumber(number);
    return new SVGNumber(this + number, this.unit || number.unit);
  } // Multiply number


  times(number) {
    number = new SVGNumber(number);
    return new SVGNumber(this * number, this.unit || number.unit);
  }

  toArray() {
    return [this.value, this.unit];
  }

  toJSON() {
    return this.toString();
  }

  toString() {
    return (this.unit === '%' ? ~~(this.value * 1e8) / 1e6 : this.unit === 's' ? this.value / 1e3 : this.value) + this.unit;
  }

  valueOf() {
    return this.value;
  }

}

const hooks = [];
function registerAttrHook(fn) {
  hooks.push(fn);
} // Set svg element attribute

function attr(attr, val, ns) {
  // act as full getter
  if (attr == null) {
    // get an object of attributes
    attr = {};
    val = this.node.attributes;

    for (const node of val) {
      attr[node.nodeName] = isNumber.test(node.nodeValue) ? parseFloat(node.nodeValue) : node.nodeValue;
    }

    return attr;
  } else if (attr instanceof Array) {
    // loop through array and get all values
    return attr.reduce((last, curr) => {
      last[curr] = this.attr(curr);
      return last;
    }, {});
  } else if (typeof attr === 'object' && attr.constructor === Object) {
    // apply every attribute individually if an object is passed
    for (val in attr) this.attr(val, attr[val]);
  } else if (val === null) {
    // remove value
    this.node.removeAttribute(attr);
  } else if (val == null) {
    // act as a getter if the first and only argument is not an object
    val = this.node.getAttribute(attr);
    return val == null ? attrs[attr] : isNumber.test(val) ? parseFloat(val) : val;
  } else {
    // Loop through hooks and execute them to convert value
    val = hooks.reduce((_val, hook) => {
      return hook(attr, _val, this);
    }, val); // ensure correct numeric values (also accepts NaN and Infinity)

    if (typeof val === 'number') {
      val = new SVGNumber(val);
    } else if (Color.isColor(val)) {
      // ensure full hex color
      val = new Color(val);
    } else if (val.constructor === Array) {
      // Check for plain arrays and parse array values
      val = new SVGArray(val);
    } // if the passed attribute is leading...


    if (attr === 'leading') {
      // ... call the leading method instead
      if (this.leading) {
        this.leading(val);
      }
    } else {
      // set given attribute on node
      typeof ns === 'string' ? this.node.setAttributeNS(ns, attr, val.toString()) : this.node.setAttribute(attr, val.toString());
    } // rebuild if required


    if (this.rebuild && (attr === 'font-size' || attr === 'x')) {
      this.rebuild();
    }
  }

  return this;
}

class Dom extends EventTarget {
  constructor(node, attrs) {
    super();
    this.node = node;
    this.type = node.nodeName;

    if (attrs && node !== attrs) {
      this.attr(attrs);
    }
  } // Add given element at a position


  add(element, i) {
    element = makeInstance(element); // If non-root svg nodes are added we have to remove their namespaces

    if (element.removeNamespace && this.node instanceof globals.window.SVGElement) {
      element.removeNamespace();
    }

    if (i == null) {
      this.node.appendChild(element.node);
    } else if (element.node !== this.node.childNodes[i]) {
      this.node.insertBefore(element.node, this.node.childNodes[i]);
    }

    return this;
  } // Add element to given container and return self


  addTo(parent, i) {
    return makeInstance(parent).put(this, i);
  } // Returns all child elements


  children() {
    return new List(map(this.node.children, function (node) {
      return adopt(node);
    }));
  } // Remove all elements in this container


  clear() {
    // remove children
    while (this.node.hasChildNodes()) {
      this.node.removeChild(this.node.lastChild);
    }

    return this;
  } // Clone element


  clone(deep = true) {
    // write dom data to the dom so the clone can pickup the data
    this.writeDataToDom(); // clone element and assign new id

    return new this.constructor(assignNewId(this.node.cloneNode(deep)));
  } // Iterates over all children and invokes a given block


  each(block, deep) {
    const children = this.children();
    let i, il;

    for (i = 0, il = children.length; i < il; i++) {
      block.apply(children[i], [i, children]);

      if (deep) {
        children[i].each(block, deep);
      }
    }

    return this;
  }

  element(nodeName, attrs) {
    return this.put(new Dom(create(nodeName), attrs));
  } // Get first child


  first() {
    return adopt(this.node.firstChild);
  } // Get a element at the given index


  get(i) {
    return adopt(this.node.childNodes[i]);
  }

  getEventHolder() {
    return this.node;
  }

  getEventTarget() {
    return this.node;
  } // Checks if the given element is a child


  has(element) {
    return this.index(element) >= 0;
  }

  html(htmlOrFn, outerHTML) {
    return this.xml(htmlOrFn, outerHTML, html);
  } // Get / set id


  id(id) {
    // generate new id if no id set
    if (typeof id === 'undefined' && !this.node.id) {
      this.node.id = eid(this.type);
    } // don't set directly with this.node.id to make `null` work correctly


    return this.attr('id', id);
  } // Gets index of given element


  index(element) {
    return [].slice.call(this.node.childNodes).indexOf(element.node);
  } // Get the last child


  last() {
    return adopt(this.node.lastChild);
  } // matches the element vs a css selector


  matches(selector) {
    const el = this.node;
    const matcher = el.matches || el.matchesSelector || el.msMatchesSelector || el.mozMatchesSelector || el.webkitMatchesSelector || el.oMatchesSelector || null;
    return matcher && matcher.call(el, selector);
  } // Returns the parent element instance


  parent(type) {
    let parent = this; // check for parent

    if (!parent.node.parentNode) return null; // get parent element

    parent = adopt(parent.node.parentNode);
    if (!type) return parent; // loop trough ancestors if type is given

    do {
      if (typeof type === 'string' ? parent.matches(type) : parent instanceof type) return parent;
    } while (parent = adopt(parent.node.parentNode));

    return parent;
  } // Basically does the same as `add()` but returns the added element instead


  put(element, i) {
    element = makeInstance(element);
    this.add(element, i);
    return element;
  } // Add element to given container and return container


  putIn(parent, i) {
    return makeInstance(parent).add(this, i);
  } // Remove element


  remove() {
    if (this.parent()) {
      this.parent().removeElement(this);
    }

    return this;
  } // Remove a given child


  removeElement(element) {
    this.node.removeChild(element.node);
    return this;
  } // Replace this with element


  replace(element) {
    element = makeInstance(element);

    if (this.node.parentNode) {
      this.node.parentNode.replaceChild(element.node, this.node);
    }

    return element;
  }

  round(precision = 2, map = null) {
    const factor = 10 ** precision;
    const attrs = this.attr(map);

    for (const i in attrs) {
      if (typeof attrs[i] === 'number') {
        attrs[i] = Math.round(attrs[i] * factor) / factor;
      }
    }

    this.attr(attrs);
    return this;
  } // Import / Export raw svg


  svg(svgOrFn, outerSVG) {
    return this.xml(svgOrFn, outerSVG, svg_esm_svg);
  } // Return id on string conversion


  toString() {
    return this.id();
  }

  words(text) {
    // This is faster than removing all children and adding a new one
    this.node.textContent = text;
    return this;
  }

  wrap(node) {
    const parent = this.parent();

    if (!parent) {
      return this.addTo(node);
    }

    const position = parent.index(this);
    return parent.put(node, position).put(this);
  } // write svgjs data to the dom


  writeDataToDom() {
    // dump variables recursively
    this.each(function () {
      this.writeDataToDom();
    });
    return this;
  } // Import / Export raw svg


  xml(xmlOrFn, outerXML, ns) {
    if (typeof xmlOrFn === 'boolean') {
      ns = outerXML;
      outerXML = xmlOrFn;
      xmlOrFn = null;
    } // act as getter if no svg string is given


    if (xmlOrFn == null || typeof xmlOrFn === 'function') {
      // The default for exports is, that the outerNode is included
      outerXML = outerXML == null ? true : outerXML; // write svgjs data to the dom

      this.writeDataToDom();
      let current = this; // An export modifier was passed

      if (xmlOrFn != null) {
        current = adopt(current.node.cloneNode(true)); // If the user wants outerHTML we need to process this node, too

        if (outerXML) {
          const result = xmlOrFn(current);
          current = result || current; // The user does not want this node? Well, then he gets nothing

          if (result === false) return '';
        } // Deep loop through all children and apply modifier


        current.each(function () {
          const result = xmlOrFn(this);

          const _this = result || this; // If modifier returns false, discard node


          if (result === false) {
            this.remove(); // If modifier returns new node, use it
          } else if (result && this !== _this) {
            this.replace(_this);
          }
        }, true);
      } // Return outer or inner content


      return outerXML ? current.node.outerHTML : current.node.innerHTML;
    } // Act as setter if we got a string
    // The default for import is, that the current node is not replaced


    outerXML = outerXML == null ? false : outerXML; // Create temporary holder

    const well = create('wrapper', ns);
    const fragment = globals.document.createDocumentFragment(); // Dump raw svg

    well.innerHTML = xmlOrFn; // Transplant nodes into the fragment

    for (let len = well.children.length; len--;) {
      fragment.appendChild(well.firstElementChild);
    }

    const parent = this.parent(); // Add the whole fragment at once

    return outerXML ? this.replace(fragment) && parent : this.add(fragment);
  }

}
extend(Dom, {
  attr,
  find,
  findOne
});
register(Dom, 'Dom');

class Element extends Dom {
  constructor(node, attrs) {
    super(node, attrs); // initialize data object

    this.dom = {}; // create circular reference

    this.node.instance = this;

    if (node.hasAttribute('svgjs:data')) {
      // pull svgjs data from the dom (getAttributeNS doesn't work in html5)
      this.setData(JSON.parse(node.getAttribute('svgjs:data')) || {});
    }
  } // Move element by its center


  center(x, y) {
    return this.cx(x).cy(y);
  } // Move by center over x-axis


  cx(x) {
    return x == null ? this.x() + this.width() / 2 : this.x(x - this.width() / 2);
  } // Move by center over y-axis


  cy(y) {
    return y == null ? this.y() + this.height() / 2 : this.y(y - this.height() / 2);
  } // Get defs


  defs() {
    const root = this.root();
    return root && root.defs();
  } // Relative move over x and y axes


  dmove(x, y) {
    return this.dx(x).dy(y);
  } // Relative move over x axis


  dx(x = 0) {
    return this.x(new SVGNumber(x).plus(this.x()));
  } // Relative move over y axis


  dy(y = 0) {
    return this.y(new SVGNumber(y).plus(this.y()));
  }

  getEventHolder() {
    return this;
  } // Set height of element


  height(height) {
    return this.attr('height', height);
  } // Move element to given x and y values


  move(x, y) {
    return this.x(x).y(y);
  } // return array of all ancestors of given type up to the root svg


  parents(until = this.root()) {
    until = makeInstance(until);
    const parents = new List();
    let parent = this;

    while ((parent = parent.parent()) && parent.node !== globals.document && parent.nodeName !== '#document-fragment') {
      parents.push(parent);

      if (parent.node === until.node) {
        break;
      }
    }

    return parents;
  } // Get referenced element form attribute value


  reference(attr) {
    attr = this.attr(attr);
    if (!attr) return null;
    const m = (attr + '').match(reference);
    return m ? makeInstance(m[1]) : null;
  } // Get parent document


  root() {
    const p = this.parent(getClass(root));
    return p && p.root();
  } // set given data to the elements data property


  setData(o) {
    this.dom = o;
    return this;
  } // Set element size to given width and height


  size(width, height) {
    const p = proportionalSize(this, width, height);
    return this.width(new SVGNumber(p.width)).height(new SVGNumber(p.height));
  } // Set width of element


  width(width) {
    return this.attr('width', width);
  } // write svgjs data to the dom


  writeDataToDom() {
    // remove previously set data
    this.node.removeAttribute('svgjs:data');

    if (Object.keys(this.dom).length) {
      this.node.setAttribute('svgjs:data', JSON.stringify(this.dom)); // see #428
    }

    return super.writeDataToDom();
  } // Move over x-axis


  x(x) {
    return this.attr('x', x);
  } // Move over y-axis


  y(y) {
    return this.attr('y', y);
  }

}
extend(Element, {
  bbox,
  rbox,
  inside,
  point,
  ctm,
  screenCTM
});
register(Element, 'Element');

const sugar = {
  stroke: ['color', 'width', 'opacity', 'linecap', 'linejoin', 'miterlimit', 'dasharray', 'dashoffset'],
  fill: ['color', 'opacity', 'rule'],
  prefix: function (t, a) {
    return a === 'color' ? t : t + '-' + a;
  }
} // Add sugar for fill and stroke
;
['fill', 'stroke'].forEach(function (m) {
  const extension = {};
  let i;

  extension[m] = function (o) {
    if (typeof o === 'undefined') {
      return this.attr(m);
    }

    if (typeof o === 'string' || o instanceof Color || Color.isRgb(o) || o instanceof Element) {
      this.attr(m, o);
    } else {
      // set all attributes from sugar.fill and sugar.stroke list
      for (i = sugar[m].length - 1; i >= 0; i--) {
        if (o[sugar[m][i]] != null) {
          this.attr(sugar.prefix(m, sugar[m][i]), o[sugar[m][i]]);
        }
      }
    }

    return this;
  };

  registerMethods(['Element', 'Runner'], extension);
});
registerMethods(['Element', 'Runner'], {
  // Let the user set the matrix directly
  matrix: function (mat, b, c, d, e, f) {
    // Act as a getter
    if (mat == null) {
      return new Matrix(this);
    } // Act as a setter, the user can pass a matrix or a set of numbers


    return this.attr('transform', new Matrix(mat, b, c, d, e, f));
  },
  // Map rotation to transform
  rotate: function (angle, cx, cy) {
    return this.transform({
      rotate: angle,
      ox: cx,
      oy: cy
    }, true);
  },
  // Map skew to transform
  skew: function (x, y, cx, cy) {
    return arguments.length === 1 || arguments.length === 3 ? this.transform({
      skew: x,
      ox: y,
      oy: cx
    }, true) : this.transform({
      skew: [x, y],
      ox: cx,
      oy: cy
    }, true);
  },
  shear: function (lam, cx, cy) {
    return this.transform({
      shear: lam,
      ox: cx,
      oy: cy
    }, true);
  },
  // Map scale to transform
  scale: function (x, y, cx, cy) {
    return arguments.length === 1 || arguments.length === 3 ? this.transform({
      scale: x,
      ox: y,
      oy: cx
    }, true) : this.transform({
      scale: [x, y],
      ox: cx,
      oy: cy
    }, true);
  },
  // Map translate to transform
  translate: function (x, y) {
    return this.transform({
      translate: [x, y]
    }, true);
  },
  // Map relative translations to transform
  relative: function (x, y) {
    return this.transform({
      relative: [x, y]
    }, true);
  },
  // Map flip to transform
  flip: function (direction = 'both', origin = 'center') {
    if ('xybothtrue'.indexOf(direction) === -1) {
      origin = direction;
      direction = 'both';
    }

    return this.transform({
      flip: direction,
      origin: origin
    }, true);
  },
  // Opacity
  opacity: function (value) {
    return this.attr('opacity', value);
  }
});
registerMethods('radius', {
  // Add x and y radius
  radius: function (x, y = x) {
    const type = (this._element || this).type;
    return type === 'radialGradient' ? this.attr('r', new SVGNumber(x)) : this.rx(x).ry(y);
  }
});
registerMethods('Path', {
  // Get path length
  length: function () {
    return this.node.getTotalLength();
  },
  // Get point at length
  pointAt: function (length) {
    return new Point(this.node.getPointAtLength(length));
  }
});
registerMethods(['Element', 'Runner'], {
  // Set font
  font: function (a, v) {
    if (typeof a === 'object') {
      for (v in a) this.font(v, a[v]);

      return this;
    }

    return a === 'leading' ? this.leading(v) : a === 'anchor' ? this.attr('text-anchor', v) : a === 'size' || a === 'family' || a === 'weight' || a === 'stretch' || a === 'variant' || a === 'style' ? this.attr('font-' + a, v) : this.attr(a, v);
  }
}); // Add events to elements

const methods = ['click', 'dblclick', 'mousedown', 'mouseup', 'mouseover', 'mouseout', 'mousemove', 'mouseenter', 'mouseleave', 'touchstart', 'touchmove', 'touchleave', 'touchend', 'touchcancel'].reduce(function (last, event) {
  // add event to Element
  const fn = function (f) {
    if (f === null) {
      this.off(event);
    } else {
      this.on(event, f);
    }

    return this;
  };

  last[event] = fn;
  return last;
}, {});
registerMethods('Element', methods);

function untransform() {
  return this.attr('transform', null);
} // merge the whole transformation chain into one matrix and returns it

function matrixify() {
  const matrix = (this.attr('transform') || ''). // split transformations
  split(transforms).slice(0, -1).map(function (str) {
    // generate key => value pairs
    const kv = str.trim().split('(');
    return [kv[0], kv[1].split(delimiter).map(function (str) {
      return parseFloat(str);
    })];
  }).reverse() // merge every transformation into one matrix
  .reduce(function (matrix, transform) {
    if (transform[0] === 'matrix') {
      return matrix.lmultiply(Matrix.fromArray(transform[1]));
    }

    return matrix[transform[0]].apply(matrix, transform[1]);
  }, new Matrix());
  return matrix;
} // add an element to another parent without changing the visual representation on the screen

function toParent(parent, i) {
  if (this === parent) return this;
  const ctm = this.screenCTM();
  const pCtm = parent.screenCTM().inverse();
  this.addTo(parent, i).untransform().transform(pCtm.multiply(ctm));
  return this;
} // same as above with parent equals root-svg

function toRoot(i) {
  return this.toParent(this.root(), i);
} // Add transformations

function transform(o, relative) {
  // Act as a getter if no object was passed
  if (o == null || typeof o === 'string') {
    const decomposed = new Matrix(this).decompose();
    return o == null ? decomposed : decomposed[o];
  }

  if (!Matrix.isMatrixLike(o)) {
    // Set the origin according to the defined transform
    o = { ...o,
      origin: getOrigin(o, this)
    };
  } // The user can pass a boolean, an Element or an Matrix or nothing


  const cleanRelative = relative === true ? this : relative || false;
  const result = new Matrix(cleanRelative).transform(o);
  return this.attr('transform', result);
}
registerMethods('Element', {
  untransform,
  matrixify,
  toParent,
  toRoot,
  transform
});

class Container extends Element {
  flatten(parent = this, index) {
    this.each(function () {
      if (this instanceof Container) {
        return this.flatten().ungroup();
      }
    });
    return this;
  }

  ungroup(parent = this.parent(), index = parent.index(this)) {
    // when parent != this, we want append all elements to the end
    index = index === -1 ? parent.children().length : index;
    this.each(function (i, children) {
      // reverse each
      return children[children.length - i - 1].toParent(parent, index);
    });
    return this.remove();
  }

}
register(Container, 'Container');

class Defs extends Container {
  constructor(node, attrs = node) {
    super(nodeOrNew('defs', node), attrs);
  }

  flatten() {
    return this;
  }

  ungroup() {
    return this;
  }

}
register(Defs, 'Defs');

class Shape extends Element {}
register(Shape, 'Shape');

function rx(rx) {
  return this.attr('rx', rx);
} // Radius y value

function ry(ry) {
  return this.attr('ry', ry);
} // Move over x-axis

function x$3(x) {
  return x == null ? this.cx() - this.rx() : this.cx(x + this.rx());
} // Move over y-axis

function y$3(y) {
  return y == null ? this.cy() - this.ry() : this.cy(y + this.ry());
} // Move by center over x-axis

function cx$1(x) {
  return this.attr('cx', x);
} // Move by center over y-axis

function cy$1(y) {
  return this.attr('cy', y);
} // Set width of element

function width$2(width) {
  return width == null ? this.rx() * 2 : this.rx(new SVGNumber(width).divide(2));
} // Set height of element

function height$2(height) {
  return height == null ? this.ry() * 2 : this.ry(new SVGNumber(height).divide(2));
}

var circled = {
  __proto__: null,
  rx: rx,
  ry: ry,
  x: x$3,
  y: y$3,
  cx: cx$1,
  cy: cy$1,
  width: width$2,
  height: height$2
};

class Ellipse extends Shape {
  constructor(node, attrs = node) {
    super(nodeOrNew('ellipse', node), attrs);
  }

  size(width, height) {
    const p = proportionalSize(this, width, height);
    return this.rx(new SVGNumber(p.width).divide(2)).ry(new SVGNumber(p.height).divide(2));
  }

}
extend(Ellipse, circled);
registerMethods('Container', {
  // Create an ellipse
  ellipse: wrapWithAttrCheck(function (width = 0, height = width) {
    return this.put(new Ellipse()).size(width, height).move(0, 0);
  })
});
register(Ellipse, 'Ellipse');

class Fragment extends Dom {
  constructor(node = globals.document.createDocumentFragment()) {
    super(node);
  } // Import / Export raw xml


  xml(xmlOrFn, outerXML, ns) {
    if (typeof xmlOrFn === 'boolean') {
      ns = outerXML;
      outerXML = xmlOrFn;
      xmlOrFn = null;
    } // because this is a fragment we have to put all elements into a wrapper first
    // before we can get the innerXML from it


    if (xmlOrFn == null || typeof xmlOrFn === 'function') {
      const wrapper = new Dom(create('wrapper', ns));
      wrapper.add(this.node.cloneNode(true));
      return wrapper.xml(false, ns);
    } // Act as setter if we got a string


    return super.xml(xmlOrFn, false, ns);
  }

}

register(Fragment, 'Fragment');

function from(x, y) {
  return (this._element || this).type === 'radialGradient' ? this.attr({
    fx: new SVGNumber(x),
    fy: new SVGNumber(y)
  }) : this.attr({
    x1: new SVGNumber(x),
    y1: new SVGNumber(y)
  });
}
function to(x, y) {
  return (this._element || this).type === 'radialGradient' ? this.attr({
    cx: new SVGNumber(x),
    cy: new SVGNumber(y)
  }) : this.attr({
    x2: new SVGNumber(x),
    y2: new SVGNumber(y)
  });
}

var gradiented = {
  __proto__: null,
  from: from,
  to: to
};

class Gradient extends Container {
  constructor(type, attrs) {
    super(nodeOrNew(type + 'Gradient', typeof type === 'string' ? null : type), attrs);
  } // custom attr to handle transform


  attr(a, b, c) {
    if (a === 'transform') a = 'gradientTransform';
    return super.attr(a, b, c);
  }

  bbox() {
    return new Box();
  }

  targets() {
    return baseFind('svg [fill*="' + this.id() + '"]');
  } // Alias string conversion to fill


  toString() {
    return this.url();
  } // Update gradient


  update(block) {
    // remove all stops
    this.clear(); // invoke passed block

    if (typeof block === 'function') {
      block.call(this, this);
    }

    return this;
  } // Return the fill id


  url() {
    return 'url("#' + this.id() + '")';
  }

}
extend(Gradient, gradiented);
registerMethods({
  Container: {
    // Create gradient element in defs
    gradient(...args) {
      return this.defs().gradient(...args);
    }

  },
  // define gradient
  Defs: {
    gradient: wrapWithAttrCheck(function (type, block) {
      return this.put(new Gradient(type)).update(block);
    })
  }
});
register(Gradient, 'Gradient');

class Pattern extends Container {
  // Initialize node
  constructor(node, attrs = node) {
    super(nodeOrNew('pattern', node), attrs);
  } // custom attr to handle transform


  attr(a, b, c) {
    if (a === 'transform') a = 'patternTransform';
    return super.attr(a, b, c);
  }

  bbox() {
    return new Box();
  }

  targets() {
    return baseFind('svg [fill*="' + this.id() + '"]');
  } // Alias string conversion to fill


  toString() {
    return this.url();
  } // Update pattern by rebuilding


  update(block) {
    // remove content
    this.clear(); // invoke passed block

    if (typeof block === 'function') {
      block.call(this, this);
    }

    return this;
  } // Return the fill id


  url() {
    return 'url("#' + this.id() + '")';
  }

}
registerMethods({
  Container: {
    // Create pattern element in defs
    pattern(...args) {
      return this.defs().pattern(...args);
    }

  },
  Defs: {
    pattern: wrapWithAttrCheck(function (width, height, block) {
      return this.put(new Pattern()).update(block).attr({
        x: 0,
        y: 0,
        width: width,
        height: height,
        patternUnits: 'userSpaceOnUse'
      });
    })
  }
});
register(Pattern, 'Pattern');

class svg_esm_Image extends Shape {
  constructor(node, attrs = node) {
    super(nodeOrNew('image', node), attrs);
  } // (re)load image


  load(url, callback) {
    if (!url) return this;
    const img = new globals.window.Image();
    on(img, 'load', function (e) {
      const p = this.parent(Pattern); // ensure image size

      if (this.width() === 0 && this.height() === 0) {
        this.size(img.width, img.height);
      }

      if (p instanceof Pattern) {
        // ensure pattern size if not set
        if (p.width() === 0 && p.height() === 0) {
          p.size(this.width(), this.height());
        }
      }

      if (typeof callback === 'function') {
        callback.call(this, e);
      }
    }, this);
    on(img, 'load error', function () {
      // dont forget to unbind memory leaking events
      off(img);
    });
    return this.attr('href', img.src = url, xlink);
  }

}
registerAttrHook(function (attr, val, _this) {
  // convert image fill and stroke to patterns
  if (attr === 'fill' || attr === 'stroke') {
    if (isImage.test(val)) {
      val = _this.root().defs().image(val);
    }
  }

  if (val instanceof svg_esm_Image) {
    val = _this.root().defs().pattern(0, 0, pattern => {
      pattern.add(val);
    });
  }

  return val;
});
registerMethods({
  Container: {
    // create image element, load image and set its size
    image: wrapWithAttrCheck(function (source, callback) {
      return this.put(new svg_esm_Image()).size(0, 0).load(source, callback);
    })
  }
});
register(svg_esm_Image, 'Image');

class PointArray extends SVGArray {
  // Get bounding box of points
  bbox() {
    let maxX = -Infinity;
    let maxY = -Infinity;
    let minX = Infinity;
    let minY = Infinity;
    this.forEach(function (el) {
      maxX = Math.max(el[0], maxX);
      maxY = Math.max(el[1], maxY);
      minX = Math.min(el[0], minX);
      minY = Math.min(el[1], minY);
    });
    return new Box(minX, minY, maxX - minX, maxY - minY);
  } // Move point string


  move(x, y) {
    const box = this.bbox(); // get relative offset

    x -= box.x;
    y -= box.y; // move every point

    if (!isNaN(x) && !isNaN(y)) {
      for (let i = this.length - 1; i >= 0; i--) {
        this[i] = [this[i][0] + x, this[i][1] + y];
      }
    }

    return this;
  } // Parse point string and flat array


  parse(array = [0, 0]) {
    const points = []; // if it is an array, we flatten it and therefore clone it to 1 depths

    if (array instanceof Array) {
      array = Array.prototype.concat.apply([], array);
    } else {
      // Else, it is considered as a string
      // parse points
      array = array.trim().split(delimiter).map(parseFloat);
    } // validate points - https://svgwg.org/svg2-draft/shapes.html#DataTypePoints
    // Odd number of coordinates is an error. In such cases, drop the last odd coordinate.


    if (array.length % 2 !== 0) array.pop(); // wrap points in two-tuples

    for (let i = 0, len = array.length; i < len; i = i + 2) {
      points.push([array[i], array[i + 1]]);
    }

    return points;
  } // Resize poly string


  size(width, height) {
    let i;
    const box = this.bbox(); // recalculate position of all points according to new size

    for (i = this.length - 1; i >= 0; i--) {
      if (box.width) this[i][0] = (this[i][0] - box.x) * width / box.width + box.x;
      if (box.height) this[i][1] = (this[i][1] - box.y) * height / box.height + box.y;
    }

    return this;
  } // Convert array to line object


  toLine() {
    return {
      x1: this[0][0],
      y1: this[0][1],
      x2: this[1][0],
      y2: this[1][1]
    };
  } // Convert array to string


  toString() {
    const array = []; // convert to a poly point string

    for (let i = 0, il = this.length; i < il; i++) {
      array.push(this[i].join(','));
    }

    return array.join(' ');
  }

  transform(m) {
    return this.clone().transformO(m);
  } // transform points with matrix (similar to Point.transform)


  transformO(m) {
    if (!Matrix.isMatrixLike(m)) {
      m = new Matrix(m);
    }

    for (let i = this.length; i--;) {
      // Perform the matrix multiplication
      const [x, y] = this[i];
      this[i][0] = m.a * x + m.c * y + m.e;
      this[i][1] = m.b * x + m.d * y + m.f;
    }

    return this;
  }

}

const MorphArray = PointArray; // Move by left top corner over x-axis

function x$2(x) {
  return x == null ? this.bbox().x : this.move(x, this.bbox().y);
} // Move by left top corner over y-axis

function y$2(y) {
  return y == null ? this.bbox().y : this.move(this.bbox().x, y);
} // Set width of element

function width$1(width) {
  const b = this.bbox();
  return width == null ? b.width : this.size(width, b.height);
} // Set height of element

function height$1(height) {
  const b = this.bbox();
  return height == null ? b.height : this.size(b.width, height);
}

var pointed = {
  __proto__: null,
  MorphArray: MorphArray,
  x: x$2,
  y: y$2,
  width: width$1,
  height: height$1
};

class Line extends Shape {
  // Initialize node
  constructor(node, attrs = node) {
    super(nodeOrNew('line', node), attrs);
  } // Get array


  array() {
    return new PointArray([[this.attr('x1'), this.attr('y1')], [this.attr('x2'), this.attr('y2')]]);
  } // Move by left top corner


  move(x, y) {
    return this.attr(this.array().move(x, y).toLine());
  } // Overwrite native plot() method


  plot(x1, y1, x2, y2) {
    if (x1 == null) {
      return this.array();
    } else if (typeof y1 !== 'undefined') {
      x1 = {
        x1,
        y1,
        x2,
        y2
      };
    } else {
      x1 = new PointArray(x1).toLine();
    }

    return this.attr(x1);
  } // Set element size to given width and height


  size(width, height) {
    const p = proportionalSize(this, width, height);
    return this.attr(this.array().size(p.width, p.height).toLine());
  }

}
extend(Line, pointed);
registerMethods({
  Container: {
    // Create a line element
    line: wrapWithAttrCheck(function (...args) {
      // make sure plot is called as a setter
      // x1 is not necessarily a number, it can also be an array, a string and a PointArray
      return Line.prototype.plot.apply(this.put(new Line()), args[0] != null ? args : [0, 0, 0, 0]);
    })
  }
});
register(Line, 'Line');

class Marker extends Container {
  // Initialize node
  constructor(node, attrs = node) {
    super(nodeOrNew('marker', node), attrs);
  } // Set height of element


  height(height) {
    return this.attr('markerHeight', height);
  }

  orient(orient) {
    return this.attr('orient', orient);
  } // Set marker refX and refY


  ref(x, y) {
    return this.attr('refX', x).attr('refY', y);
  } // Return the fill id


  toString() {
    return 'url(#' + this.id() + ')';
  } // Update marker


  update(block) {
    // remove all content
    this.clear(); // invoke passed block

    if (typeof block === 'function') {
      block.call(this, this);
    }

    return this;
  } // Set width of element


  width(width) {
    return this.attr('markerWidth', width);
  }

}
registerMethods({
  Container: {
    marker(...args) {
      // Create marker element in defs
      return this.defs().marker(...args);
    }

  },
  Defs: {
    // Create marker
    marker: wrapWithAttrCheck(function (width, height, block) {
      // Set default viewbox to match the width and height, set ref to cx and cy and set orient to auto
      return this.put(new Marker()).size(width, height).ref(width / 2, height / 2).viewbox(0, 0, width, height).attr('orient', 'auto').update(block);
    })
  },
  marker: {
    // Create and attach markers
    marker(marker, width, height, block) {
      let attr = ['marker']; // Build attribute name

      if (marker !== 'all') attr.push(marker);
      attr = attr.join('-'); // Set marker attribute

      marker = arguments[1] instanceof Marker ? arguments[1] : this.defs().marker(width, height, block);
      return this.attr(attr, marker);
    }

  }
});
register(Marker, 'Marker');

/***
Base Class
==========
The base stepper class that will be
***/

function makeSetterGetter(k, f) {
  return function (v) {
    if (v == null) return this[k];
    this[k] = v;
    if (f) f.call(this);
    return this;
  };
}

const easing = {
  '-': function (pos) {
    return pos;
  },
  '<>': function (pos) {
    return -Math.cos(pos * Math.PI) / 2 + 0.5;
  },
  '>': function (pos) {
    return Math.sin(pos * Math.PI / 2);
  },
  '<': function (pos) {
    return -Math.cos(pos * Math.PI / 2) + 1;
  },
  bezier: function (x1, y1, x2, y2) {
    // see https://www.w3.org/TR/css-easing-1/#cubic-bezier-algo
    return function (t) {
      if (t < 0) {
        if (x1 > 0) {
          return y1 / x1 * t;
        } else if (x2 > 0) {
          return y2 / x2 * t;
        } else {
          return 0;
        }
      } else if (t > 1) {
        if (x2 < 1) {
          return (1 - y2) / (1 - x2) * t + (y2 - x2) / (1 - x2);
        } else if (x1 < 1) {
          return (1 - y1) / (1 - x1) * t + (y1 - x1) / (1 - x1);
        } else {
          return 1;
        }
      } else {
        return 3 * t * (1 - t) ** 2 * y1 + 3 * t ** 2 * (1 - t) * y2 + t ** 3;
      }
    };
  },
  // see https://www.w3.org/TR/css-easing-1/#step-timing-function-algo
  steps: function (steps, stepPosition = 'end') {
    // deal with "jump-" prefix
    stepPosition = stepPosition.split('-').reverse()[0];
    let jumps = steps;

    if (stepPosition === 'none') {
      --jumps;
    } else if (stepPosition === 'both') {
      ++jumps;
    } // The beforeFlag is essentially useless


    return (t, beforeFlag = false) => {
      // Step is called currentStep in referenced url
      let step = Math.floor(t * steps);
      const jumping = t * step % 1 === 0;

      if (stepPosition === 'start' || stepPosition === 'both') {
        ++step;
      }

      if (beforeFlag && jumping) {
        --step;
      }

      if (t >= 0 && step < 0) {
        step = 0;
      }

      if (t <= 1 && step > jumps) {
        step = jumps;
      }

      return step / jumps;
    };
  }
};
class Stepper {
  done() {
    return false;
  }

}
/***
Easing Functions
================
***/

class Ease extends Stepper {
  constructor(fn = timeline.ease) {
    super();
    this.ease = easing[fn] || fn;
  }

  step(from, to, pos) {
    if (typeof from !== 'number') {
      return pos < 1 ? from : to;
    }

    return from + (to - from) * this.ease(pos);
  }

}
/***
Controller Types
================
***/

class Controller extends Stepper {
  constructor(fn) {
    super();
    this.stepper = fn;
  }

  done(c) {
    return c.done;
  }

  step(current, target, dt, c) {
    return this.stepper(current, target, dt, c);
  }

}

function recalculate() {
  // Apply the default parameters
  const duration = (this._duration || 500) / 1000;
  const overshoot = this._overshoot || 0; // Calculate the PID natural response

  const eps = 1e-10;
  const pi = Math.PI;
  const os = Math.log(overshoot / 100 + eps);
  const zeta = -os / Math.sqrt(pi * pi + os * os);
  const wn = 3.9 / (zeta * duration); // Calculate the Spring values

  this.d = 2 * zeta * wn;
  this.k = wn * wn;
}

class Spring extends Controller {
  constructor(duration = 500, overshoot = 0) {
    super();
    this.duration(duration).overshoot(overshoot);
  }

  step(current, target, dt, c) {
    if (typeof current === 'string') return current;
    c.done = dt === Infinity;
    if (dt === Infinity) return target;
    if (dt === 0) return current;
    if (dt > 100) dt = 16;
    dt /= 1000; // Get the previous velocity

    const velocity = c.velocity || 0; // Apply the control to get the new position and store it

    const acceleration = -this.d * velocity - this.k * (current - target);
    const newPosition = current + velocity * dt + acceleration * dt * dt / 2; // Store the velocity

    c.velocity = velocity + acceleration * dt; // Figure out if we have converged, and if so, pass the value

    c.done = Math.abs(target - newPosition) + Math.abs(velocity) < 0.002;
    return c.done ? target : newPosition;
  }

}
extend(Spring, {
  duration: makeSetterGetter('_duration', recalculate),
  overshoot: makeSetterGetter('_overshoot', recalculate)
});
class PID extends Controller {
  constructor(p = 0.1, i = 0.01, d = 0, windup = 1000) {
    super();
    this.p(p).i(i).d(d).windup(windup);
  }

  step(current, target, dt, c) {
    if (typeof current === 'string') return current;
    c.done = dt === Infinity;
    if (dt === Infinity) return target;
    if (dt === 0) return current;
    const p = target - current;
    let i = (c.integral || 0) + p * dt;
    const d = (p - (c.error || 0)) / dt;
    const windup = this._windup; // antiwindup

    if (windup !== false) {
      i = Math.max(-windup, Math.min(i, windup));
    }

    c.error = p;
    c.integral = i;
    c.done = Math.abs(p) < 0.001;
    return c.done ? target : current + (this.P * p + this.I * i + this.D * d);
  }

}
extend(PID, {
  windup: makeSetterGetter('_windup'),
  p: makeSetterGetter('P'),
  i: makeSetterGetter('I'),
  d: makeSetterGetter('D')
});

const segmentParameters = {
  M: 2,
  L: 2,
  H: 1,
  V: 1,
  C: 6,
  S: 4,
  Q: 4,
  T: 2,
  A: 7,
  Z: 0
};
const pathHandlers = {
  M: function (c, p, p0) {
    p.x = p0.x = c[0];
    p.y = p0.y = c[1];
    return ['M', p.x, p.y];
  },
  L: function (c, p) {
    p.x = c[0];
    p.y = c[1];
    return ['L', c[0], c[1]];
  },
  H: function (c, p) {
    p.x = c[0];
    return ['H', c[0]];
  },
  V: function (c, p) {
    p.y = c[0];
    return ['V', c[0]];
  },
  C: function (c, p) {
    p.x = c[4];
    p.y = c[5];
    return ['C', c[0], c[1], c[2], c[3], c[4], c[5]];
  },
  S: function (c, p) {
    p.x = c[2];
    p.y = c[3];
    return ['S', c[0], c[1], c[2], c[3]];
  },
  Q: function (c, p) {
    p.x = c[2];
    p.y = c[3];
    return ['Q', c[0], c[1], c[2], c[3]];
  },
  T: function (c, p) {
    p.x = c[0];
    p.y = c[1];
    return ['T', c[0], c[1]];
  },
  Z: function (c, p, p0) {
    p.x = p0.x;
    p.y = p0.y;
    return ['Z'];
  },
  A: function (c, p) {
    p.x = c[5];
    p.y = c[6];
    return ['A', c[0], c[1], c[2], c[3], c[4], c[5], c[6]];
  }
};
const mlhvqtcsaz = 'mlhvqtcsaz'.split('');

for (let i = 0, il = mlhvqtcsaz.length; i < il; ++i) {
  pathHandlers[mlhvqtcsaz[i]] = function (i) {
    return function (c, p, p0) {
      if (i === 'H') c[0] = c[0] + p.x;else if (i === 'V') c[0] = c[0] + p.y;else if (i === 'A') {
        c[5] = c[5] + p.x;
        c[6] = c[6] + p.y;
      } else {
        for (let j = 0, jl = c.length; j < jl; ++j) {
          c[j] = c[j] + (j % 2 ? p.y : p.x);
        }
      }
      return pathHandlers[i](c, p, p0);
    };
  }(mlhvqtcsaz[i].toUpperCase());
}

function makeAbsolut(parser) {
  const command = parser.segment[0];
  return pathHandlers[command](parser.segment.slice(1), parser.p, parser.p0);
}

function segmentComplete(parser) {
  return parser.segment.length && parser.segment.length - 1 === segmentParameters[parser.segment[0].toUpperCase()];
}

function startNewSegment(parser, token) {
  parser.inNumber && finalizeNumber(parser, false);
  const pathLetter = isPathLetter.test(token);

  if (pathLetter) {
    parser.segment = [token];
  } else {
    const lastCommand = parser.lastCommand;
    const small = lastCommand.toLowerCase();
    const isSmall = lastCommand === small;
    parser.segment = [small === 'm' ? isSmall ? 'l' : 'L' : lastCommand];
  }

  parser.inSegment = true;
  parser.lastCommand = parser.segment[0];
  return pathLetter;
}

function finalizeNumber(parser, inNumber) {
  if (!parser.inNumber) throw new Error('Parser Error');
  parser.number && parser.segment.push(parseFloat(parser.number));
  parser.inNumber = inNumber;
  parser.number = '';
  parser.pointSeen = false;
  parser.hasExponent = false;

  if (segmentComplete(parser)) {
    finalizeSegment(parser);
  }
}

function finalizeSegment(parser) {
  parser.inSegment = false;

  if (parser.absolute) {
    parser.segment = makeAbsolut(parser);
  }

  parser.segments.push(parser.segment);
}

function isArcFlag(parser) {
  if (!parser.segment.length) return false;
  const isArc = parser.segment[0].toUpperCase() === 'A';
  const length = parser.segment.length;
  return isArc && (length === 4 || length === 5);
}

function isExponential(parser) {
  return parser.lastToken.toUpperCase() === 'E';
}

function pathParser(d, toAbsolute = true) {
  let index = 0;
  let token = '';
  const parser = {
    segment: [],
    inNumber: false,
    number: '',
    lastToken: '',
    inSegment: false,
    segments: [],
    pointSeen: false,
    hasExponent: false,
    absolute: toAbsolute,
    p0: new Point(),
    p: new Point()
  };

  while (parser.lastToken = token, token = d.charAt(index++)) {
    if (!parser.inSegment) {
      if (startNewSegment(parser, token)) {
        continue;
      }
    }

    if (token === '.') {
      if (parser.pointSeen || parser.hasExponent) {
        finalizeNumber(parser, false);
        --index;
        continue;
      }

      parser.inNumber = true;
      parser.pointSeen = true;
      parser.number += token;
      continue;
    }

    if (!isNaN(parseInt(token))) {
      if (parser.number === '0' || isArcFlag(parser)) {
        parser.inNumber = true;
        parser.number = token;
        finalizeNumber(parser, true);
        continue;
      }

      parser.inNumber = true;
      parser.number += token;
      continue;
    }

    if (token === ' ' || token === ',') {
      if (parser.inNumber) {
        finalizeNumber(parser, false);
      }

      continue;
    }

    if (token === '-') {
      if (parser.inNumber && !isExponential(parser)) {
        finalizeNumber(parser, false);
        --index;
        continue;
      }

      parser.number += token;
      parser.inNumber = true;
      continue;
    }

    if (token.toUpperCase() === 'E') {
      parser.number += token;
      parser.hasExponent = true;
      continue;
    }

    if (isPathLetter.test(token)) {
      if (parser.inNumber) {
        finalizeNumber(parser, false);
      } else if (!segmentComplete(parser)) {
        throw new Error('parser Error');
      } else {
        finalizeSegment(parser);
      }

      --index;
    }
  }

  if (parser.inNumber) {
    finalizeNumber(parser, false);
  }

  if (parser.inSegment && segmentComplete(parser)) {
    finalizeSegment(parser);
  }

  return parser.segments;
}

function arrayToString(a) {
  let s = '';

  for (let i = 0, il = a.length; i < il; i++) {
    s += a[i][0];

    if (a[i][1] != null) {
      s += a[i][1];

      if (a[i][2] != null) {
        s += ' ';
        s += a[i][2];

        if (a[i][3] != null) {
          s += ' ';
          s += a[i][3];
          s += ' ';
          s += a[i][4];

          if (a[i][5] != null) {
            s += ' ';
            s += a[i][5];
            s += ' ';
            s += a[i][6];

            if (a[i][7] != null) {
              s += ' ';
              s += a[i][7];
            }
          }
        }
      }
    }
  }

  return s + ' ';
}

class PathArray extends SVGArray {
  // Get bounding box of path
  bbox() {
    parser().path.setAttribute('d', this.toString());
    return new Box(parser.nodes.path.getBBox());
  } // Move path string


  move(x, y) {
    // get bounding box of current situation
    const box = this.bbox(); // get relative offset

    x -= box.x;
    y -= box.y;

    if (!isNaN(x) && !isNaN(y)) {
      // move every point
      for (var l, i = this.length - 1; i >= 0; i--) {
        l = this[i][0];

        if (l === 'M' || l === 'L' || l === 'T') {
          this[i][1] += x;
          this[i][2] += y;
        } else if (l === 'H') {
          this[i][1] += x;
        } else if (l === 'V') {
          this[i][1] += y;
        } else if (l === 'C' || l === 'S' || l === 'Q') {
          this[i][1] += x;
          this[i][2] += y;
          this[i][3] += x;
          this[i][4] += y;

          if (l === 'C') {
            this[i][5] += x;
            this[i][6] += y;
          }
        } else if (l === 'A') {
          this[i][6] += x;
          this[i][7] += y;
        }
      }
    }

    return this;
  } // Absolutize and parse path to array


  parse(d = 'M0 0') {
    if (Array.isArray(d)) {
      d = Array.prototype.concat.apply([], d).toString();
    }

    return pathParser(d);
  } // Resize path string


  size(width, height) {
    // get bounding box of current situation
    const box = this.bbox();
    let i, l; // If the box width or height is 0 then we ignore
    // transformations on the respective axis

    box.width = box.width === 0 ? 1 : box.width;
    box.height = box.height === 0 ? 1 : box.height; // recalculate position of all points according to new size

    for (i = this.length - 1; i >= 0; i--) {
      l = this[i][0];

      if (l === 'M' || l === 'L' || l === 'T') {
        this[i][1] = (this[i][1] - box.x) * width / box.width + box.x;
        this[i][2] = (this[i][2] - box.y) * height / box.height + box.y;
      } else if (l === 'H') {
        this[i][1] = (this[i][1] - box.x) * width / box.width + box.x;
      } else if (l === 'V') {
        this[i][1] = (this[i][1] - box.y) * height / box.height + box.y;
      } else if (l === 'C' || l === 'S' || l === 'Q') {
        this[i][1] = (this[i][1] - box.x) * width / box.width + box.x;
        this[i][2] = (this[i][2] - box.y) * height / box.height + box.y;
        this[i][3] = (this[i][3] - box.x) * width / box.width + box.x;
        this[i][4] = (this[i][4] - box.y) * height / box.height + box.y;

        if (l === 'C') {
          this[i][5] = (this[i][5] - box.x) * width / box.width + box.x;
          this[i][6] = (this[i][6] - box.y) * height / box.height + box.y;
        }
      } else if (l === 'A') {
        // resize radii
        this[i][1] = this[i][1] * width / box.width;
        this[i][2] = this[i][2] * height / box.height; // move position values

        this[i][6] = (this[i][6] - box.x) * width / box.width + box.x;
        this[i][7] = (this[i][7] - box.y) * height / box.height + box.y;
      }
    }

    return this;
  } // Convert array to string


  toString() {
    return arrayToString(this);
  }

}

const getClassForType = value => {
  const type = typeof value;

  if (type === 'number') {
    return SVGNumber;
  } else if (type === 'string') {
    if (Color.isColor(value)) {
      return Color;
    } else if (delimiter.test(value)) {
      return isPathLetter.test(value) ? PathArray : SVGArray;
    } else if (numberAndUnit.test(value)) {
      return SVGNumber;
    } else {
      return NonMorphable;
    }
  } else if (morphableTypes.indexOf(value.constructor) > -1) {
    return value.constructor;
  } else if (Array.isArray(value)) {
    return SVGArray;
  } else if (type === 'object') {
    return ObjectBag;
  } else {
    return NonMorphable;
  }
};

class Morphable {
  constructor(stepper) {
    this._stepper = stepper || new Ease('-');
    this._from = null;
    this._to = null;
    this._type = null;
    this._context = null;
    this._morphObj = null;
  }

  at(pos) {
    const _this = this;

    return this._morphObj.fromArray(this._from.map(function (i, index) {
      return _this._stepper.step(i, _this._to[index], pos, _this._context[index], _this._context);
    }));
  }

  done() {
    const complete = this._context.map(this._stepper.done).reduce(function (last, curr) {
      return last && curr;
    }, true);

    return complete;
  }

  from(val) {
    if (val == null) {
      return this._from;
    }

    this._from = this._set(val);
    return this;
  }

  stepper(stepper) {
    if (stepper == null) return this._stepper;
    this._stepper = stepper;
    return this;
  }

  to(val) {
    if (val == null) {
      return this._to;
    }

    this._to = this._set(val);
    return this;
  }

  type(type) {
    // getter
    if (type == null) {
      return this._type;
    } // setter


    this._type = type;
    return this;
  }

  _set(value) {
    if (!this._type) {
      this.type(getClassForType(value));
    }

    let result = new this._type(value);

    if (this._type === Color) {
      result = this._to ? result[this._to[4]]() : this._from ? result[this._from[4]]() : result;
    }

    if (this._type === ObjectBag) {
      result = this._to ? result.align(this._to) : this._from ? result.align(this._from) : result;
    }

    result = result.toArray();
    this._morphObj = this._morphObj || new this._type();
    this._context = this._context || Array.apply(null, Array(result.length)).map(Object).map(function (o) {
      o.done = true;
      return o;
    });
    return result;
  }

}
class NonMorphable {
  constructor(...args) {
    this.init(...args);
  }

  init(val) {
    val = Array.isArray(val) ? val[0] : val;
    this.value = val;
    return this;
  }

  toArray() {
    return [this.value];
  }

  valueOf() {
    return this.value;
  }

}
class TransformBag {
  constructor(...args) {
    this.init(...args);
  }

  init(obj) {
    if (Array.isArray(obj)) {
      obj = {
        scaleX: obj[0],
        scaleY: obj[1],
        shear: obj[2],
        rotate: obj[3],
        translateX: obj[4],
        translateY: obj[5],
        originX: obj[6],
        originY: obj[7]
      };
    }

    Object.assign(this, TransformBag.defaults, obj);
    return this;
  }

  toArray() {
    const v = this;
    return [v.scaleX, v.scaleY, v.shear, v.rotate, v.translateX, v.translateY, v.originX, v.originY];
  }

}
TransformBag.defaults = {
  scaleX: 1,
  scaleY: 1,
  shear: 0,
  rotate: 0,
  translateX: 0,
  translateY: 0,
  originX: 0,
  originY: 0
};

const sortByKey = (a, b) => {
  return a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0;
};

class ObjectBag {
  constructor(...args) {
    this.init(...args);
  }

  align(other) {
    for (let i = 0, il = this.values.length; i < il; ++i) {
      if (this.values[i] === Color) {
        const space = other[i + 6];
        const color = new Color(this.values.splice(i + 2, 5))[space]().toArray();
        this.values.splice(i + 2, 0, ...color);
      }
    }

    return this;
  }

  init(objOrArr) {
    this.values = [];

    if (Array.isArray(objOrArr)) {
      this.values = objOrArr.slice();
      return;
    }

    objOrArr = objOrArr || {};
    const entries = [];

    for (const i in objOrArr) {
      const Type = getClassForType(objOrArr[i]);
      const val = new Type(objOrArr[i]).toArray();
      entries.push([i, Type, val.length, ...val]);
    }

    entries.sort(sortByKey);
    this.values = entries.reduce((last, curr) => last.concat(curr), []);
    return this;
  }

  toArray() {
    return this.values;
  }

  valueOf() {
    const obj = {};
    const arr = this.values; // for (var i = 0, len = arr.length; i < len; i += 2) {

    while (arr.length) {
      const key = arr.shift();
      const Type = arr.shift();
      const num = arr.shift();
      const values = arr.splice(0, num);
      obj[key] = new Type(values).valueOf();
    }

    return obj;
  }

}
const morphableTypes = [NonMorphable, TransformBag, ObjectBag];
function registerMorphableType(type = []) {
  morphableTypes.push(...[].concat(type));
}
function makeMorphable() {
  extend(morphableTypes, {
    to(val) {
      return new Morphable().type(this.constructor).from(this.valueOf()).to(val);
    },

    fromArray(arr) {
      this.init(arr);
      return this;
    }

  });
}

class Path extends Shape {
  // Initialize node
  constructor(node, attrs = node) {
    super(nodeOrNew('path', node), attrs);
  } // Get array


  array() {
    return this._array || (this._array = new PathArray(this.attr('d')));
  } // Clear array cache


  clear() {
    delete this._array;
    return this;
  } // Set height of element


  height(height) {
    return height == null ? this.bbox().height : this.size(this.bbox().width, height);
  } // Move by left top corner


  move(x, y) {
    return this.attr('d', this.array().move(x, y));
  } // Plot new path


  plot(d) {
    return d == null ? this.array() : this.clear().attr('d', typeof d === 'string' ? d : this._array = new PathArray(d));
  } // Set element size to given width and height


  size(width, height) {
    const p = proportionalSize(this, width, height);
    return this.attr('d', this.array().size(p.width, p.height));
  } // Set width of element


  width(width) {
    return width == null ? this.bbox().width : this.size(width, this.bbox().height);
  } // Move by left top corner over x-axis


  x(x) {
    return x == null ? this.bbox().x : this.move(x, this.bbox().y);
  } // Move by left top corner over y-axis


  y(y) {
    return y == null ? this.bbox().y : this.move(this.bbox().x, y);
  }

} // Define morphable array

Path.prototype.MorphArray = PathArray; // Add parent method

registerMethods({
  Container: {
    // Create a wrapped path element
    path: wrapWithAttrCheck(function (d) {
      // make sure plot is called as a setter
      return this.put(new Path()).plot(d || new PathArray());
    })
  }
});
register(Path, 'Path');

function array() {
  return this._array || (this._array = new PointArray(this.attr('points')));
} // Clear array cache

function clear() {
  delete this._array;
  return this;
} // Move by left top corner

function move$2(x, y) {
  return this.attr('points', this.array().move(x, y));
} // Plot new path

function plot(p) {
  return p == null ? this.array() : this.clear().attr('points', typeof p === 'string' ? p : this._array = new PointArray(p));
} // Set element size to given width and height

function size$1(width, height) {
  const p = proportionalSize(this, width, height);
  return this.attr('points', this.array().size(p.width, p.height));
}

var poly = {
  __proto__: null,
  array: array,
  clear: clear,
  move: move$2,
  plot: plot,
  size: size$1
};

class Polygon extends Shape {
  // Initialize node
  constructor(node, attrs = node) {
    super(nodeOrNew('polygon', node), attrs);
  }

}
registerMethods({
  Container: {
    // Create a wrapped polygon element
    polygon: wrapWithAttrCheck(function (p) {
      // make sure plot is called as a setter
      return this.put(new Polygon()).plot(p || new PointArray());
    })
  }
});
extend(Polygon, pointed);
extend(Polygon, poly);
register(Polygon, 'Polygon');

class Polyline extends Shape {
  // Initialize node
  constructor(node, attrs = node) {
    super(nodeOrNew('polyline', node), attrs);
  }

}
registerMethods({
  Container: {
    // Create a wrapped polygon element
    polyline: wrapWithAttrCheck(function (p) {
      // make sure plot is called as a setter
      return this.put(new Polyline()).plot(p || new PointArray());
    })
  }
});
extend(Polyline, pointed);
extend(Polyline, poly);
register(Polyline, 'Polyline');

class Rect extends Shape {
  // Initialize node
  constructor(node, attrs = node) {
    super(nodeOrNew('rect', node), attrs);
  }

}
extend(Rect, {
  rx,
  ry
});
registerMethods({
  Container: {
    // Create a rect element
    rect: wrapWithAttrCheck(function (width, height) {
      return this.put(new Rect()).size(width, height);
    })
  }
});
register(Rect, 'Rect');

class Queue {
  constructor() {
    this._first = null;
    this._last = null;
  } // Shows us the first item in the list


  first() {
    return this._first && this._first.value;
  } // Shows us the last item in the list


  last() {
    return this._last && this._last.value;
  }

  push(value) {
    // An item stores an id and the provided value
    const item = typeof value.next !== 'undefined' ? value : {
      value: value,
      next: null,
      prev: null
    }; // Deal with the queue being empty or populated

    if (this._last) {
      item.prev = this._last;
      this._last.next = item;
      this._last = item;
    } else {
      this._last = item;
      this._first = item;
    } // Return the current item


    return item;
  } // Removes the item that was returned from the push


  remove(item) {
    // Relink the previous item
    if (item.prev) item.prev.next = item.next;
    if (item.next) item.next.prev = item.prev;
    if (item === this._last) this._last = item.prev;
    if (item === this._first) this._first = item.next; // Invalidate item

    item.prev = null;
    item.next = null;
  }

  shift() {
    // Check if we have a value
    const remove = this._first;
    if (!remove) return null; // If we do, remove it and relink things

    this._first = remove.next;
    if (this._first) this._first.prev = null;
    this._last = this._first ? this._last : null;
    return remove.value;
  }

}

const Animator = {
  nextDraw: null,
  frames: new Queue(),
  timeouts: new Queue(),
  immediates: new Queue(),
  timer: () => globals.window.performance || globals.window.Date,
  transforms: [],

  frame(fn) {
    // Store the node
    const node = Animator.frames.push({
      run: fn
    }); // Request an animation frame if we don't have one

    if (Animator.nextDraw === null) {
      Animator.nextDraw = globals.window.requestAnimationFrame(Animator._draw);
    } // Return the node so we can remove it easily


    return node;
  },

  timeout(fn, delay) {
    delay = delay || 0; // Work out when the event should fire

    const time = Animator.timer().now() + delay; // Add the timeout to the end of the queue

    const node = Animator.timeouts.push({
      run: fn,
      time: time
    }); // Request another animation frame if we need one

    if (Animator.nextDraw === null) {
      Animator.nextDraw = globals.window.requestAnimationFrame(Animator._draw);
    }

    return node;
  },

  immediate(fn) {
    // Add the immediate fn to the end of the queue
    const node = Animator.immediates.push(fn); // Request another animation frame if we need one

    if (Animator.nextDraw === null) {
      Animator.nextDraw = globals.window.requestAnimationFrame(Animator._draw);
    }

    return node;
  },

  cancelFrame(node) {
    node != null && Animator.frames.remove(node);
  },

  clearTimeout(node) {
    node != null && Animator.timeouts.remove(node);
  },

  cancelImmediate(node) {
    node != null && Animator.immediates.remove(node);
  },

  _draw(now) {
    // Run all the timeouts we can run, if they are not ready yet, add them
    // to the end of the queue immediately! (bad timeouts!!! [sarcasm])
    let nextTimeout = null;
    const lastTimeout = Animator.timeouts.last();

    while (nextTimeout = Animator.timeouts.shift()) {
      // Run the timeout if its time, or push it to the end
      if (now >= nextTimeout.time) {
        nextTimeout.run();
      } else {
        Animator.timeouts.push(nextTimeout);
      } // If we hit the last item, we should stop shifting out more items


      if (nextTimeout === lastTimeout) break;
    } // Run all of the animation frames


    let nextFrame = null;
    const lastFrame = Animator.frames.last();

    while (nextFrame !== lastFrame && (nextFrame = Animator.frames.shift())) {
      nextFrame.run(now);
    }

    let nextImmediate = null;

    while (nextImmediate = Animator.immediates.shift()) {
      nextImmediate();
    } // If we have remaining timeouts or frames, draw until we don't anymore


    Animator.nextDraw = Animator.timeouts.first() || Animator.frames.first() ? globals.window.requestAnimationFrame(Animator._draw) : null;
  }

};

const makeSchedule = function (runnerInfo) {
  const start = runnerInfo.start;
  const duration = runnerInfo.runner.duration();
  const end = start + duration;
  return {
    start: start,
    duration: duration,
    end: end,
    runner: runnerInfo.runner
  };
};

const defaultSource = function () {
  const w = globals.window;
  return (w.performance || w.Date).now();
};

class Timeline extends EventTarget {
  // Construct a new timeline on the given element
  constructor(timeSource = defaultSource) {
    super();
    this._timeSource = timeSource; // Store the timing variables

    this._startTime = 0;
    this._speed = 1.0; // Determines how long a runner is hold in memory. Can be a dt or true/false

    this._persist = 0; // Keep track of the running animations and their starting parameters

    this._nextFrame = null;
    this._paused = true;
    this._runners = [];
    this._runnerIds = [];
    this._lastRunnerId = -1;
    this._time = 0;
    this._lastSourceTime = 0;
    this._lastStepTime = 0; // Make sure that step is always called in class context

    this._step = this._stepFn.bind(this, false);
    this._stepImmediate = this._stepFn.bind(this, true);
  }

  active() {
    return !!this._nextFrame;
  }

  finish() {
    // Go to end and pause
    this.time(this.getEndTimeOfTimeline() + 1);
    return this.pause();
  } // Calculates the end of the timeline


  getEndTime() {
    const lastRunnerInfo = this.getLastRunnerInfo();
    const lastDuration = lastRunnerInfo ? lastRunnerInfo.runner.duration() : 0;
    const lastStartTime = lastRunnerInfo ? lastRunnerInfo.start : this._time;
    return lastStartTime + lastDuration;
  }

  getEndTimeOfTimeline() {
    const endTimes = this._runners.map(i => i.start + i.runner.duration());

    return Math.max(0, ...endTimes);
  }

  getLastRunnerInfo() {
    return this.getRunnerInfoById(this._lastRunnerId);
  }

  getRunnerInfoById(id) {
    return this._runners[this._runnerIds.indexOf(id)] || null;
  }

  pause() {
    this._paused = true;
    return this._continue();
  }

  persist(dtOrForever) {
    if (dtOrForever == null) return this._persist;
    this._persist = dtOrForever;
    return this;
  }

  play() {
    // Now make sure we are not paused and continue the animation
    this._paused = false;
    return this.updateTime()._continue();
  }

  reverse(yes) {
    const currentSpeed = this.speed();
    if (yes == null) return this.speed(-currentSpeed);
    const positive = Math.abs(currentSpeed);
    return this.speed(yes ? -positive : positive);
  } // schedules a runner on the timeline


  schedule(runner, delay, when) {
    if (runner == null) {
      return this._runners.map(makeSchedule);
    } // The start time for the next animation can either be given explicitly,
    // derived from the current timeline time or it can be relative to the
    // last start time to chain animations directly


    let absoluteStartTime = 0;
    const endTime = this.getEndTime();
    delay = delay || 0; // Work out when to start the animation

    if (when == null || when === 'last' || when === 'after') {
      // Take the last time and increment
      absoluteStartTime = endTime;
    } else if (when === 'absolute' || when === 'start') {
      absoluteStartTime = delay;
      delay = 0;
    } else if (when === 'now') {
      absoluteStartTime = this._time;
    } else if (when === 'relative') {
      const runnerInfo = this.getRunnerInfoById(runner.id);

      if (runnerInfo) {
        absoluteStartTime = runnerInfo.start + delay;
        delay = 0;
      }
    } else if (when === 'with-last') {
      const lastRunnerInfo = this.getLastRunnerInfo();
      const lastStartTime = lastRunnerInfo ? lastRunnerInfo.start : this._time;
      absoluteStartTime = lastStartTime;
    } else {
      throw new Error('Invalid value for the "when" parameter');
    } // Manage runner


    runner.unschedule();
    runner.timeline(this);
    const persist = runner.persist();
    const runnerInfo = {
      persist: persist === null ? this._persist : persist,
      start: absoluteStartTime + delay,
      runner
    };
    this._lastRunnerId = runner.id;

    this._runners.push(runnerInfo);

    this._runners.sort((a, b) => a.start - b.start);

    this._runnerIds = this._runners.map(info => info.runner.id);

    this.updateTime()._continue();

    return this;
  }

  seek(dt) {
    return this.time(this._time + dt);
  }

  source(fn) {
    if (fn == null) return this._timeSource;
    this._timeSource = fn;
    return this;
  }

  speed(speed) {
    if (speed == null) return this._speed;
    this._speed = speed;
    return this;
  }

  stop() {
    // Go to start and pause
    this.time(0);
    return this.pause();
  }

  time(time) {
    if (time == null) return this._time;
    this._time = time;
    return this._continue(true);
  } // Remove the runner from this timeline


  unschedule(runner) {
    const index = this._runnerIds.indexOf(runner.id);

    if (index < 0) return this;

    this._runners.splice(index, 1);

    this._runnerIds.splice(index, 1);

    runner.timeline(null);
    return this;
  } // Makes sure, that after pausing the time doesn't jump


  updateTime() {
    if (!this.active()) {
      this._lastSourceTime = this._timeSource();
    }

    return this;
  } // Checks if we are running and continues the animation


  _continue(immediateStep = false) {
    Animator.cancelFrame(this._nextFrame);
    this._nextFrame = null;
    if (immediateStep) return this._stepImmediate();
    if (this._paused) return this;
    this._nextFrame = Animator.frame(this._step);
    return this;
  }

  _stepFn(immediateStep = false) {
    // Get the time delta from the last time and update the time
    const time = this._timeSource();

    let dtSource = time - this._lastSourceTime;
    if (immediateStep) dtSource = 0;
    const dtTime = this._speed * dtSource + (this._time - this._lastStepTime);
    this._lastSourceTime = time; // Only update the time if we use the timeSource.
    // Otherwise use the current time

    if (!immediateStep) {
      // Update the time
      this._time += dtTime;
      this._time = this._time < 0 ? 0 : this._time;
    }

    this._lastStepTime = this._time;
    this.fire('time', this._time); // This is for the case that the timeline was seeked so that the time
    // is now before the startTime of the runner. Thats why we need to set
    // the runner to position 0
    // FIXME:
    // However, reseting in insertion order leads to bugs. Considering the case,
    // where 2 runners change the same attribute but in different times,
    // reseting both of them will lead to the case where the later defined
    // runner always wins the reset even if the other runner started earlier
    // and therefore should win the attribute battle
    // this can be solved by reseting them backwards

    for (let k = this._runners.length; k--;) {
      // Get and run the current runner and ignore it if its inactive
      const runnerInfo = this._runners[k];
      const runner = runnerInfo.runner; // Make sure that we give the actual difference
      // between runner start time and now

      const dtToStart = this._time - runnerInfo.start; // Dont run runner if not started yet
      // and try to reset it

      if (dtToStart <= 0) {
        runner.reset();
      }
    } // Run all of the runners directly


    let runnersLeft = false;

    for (let i = 0, len = this._runners.length; i < len; i++) {
      // Get and run the current runner and ignore it if its inactive
      const runnerInfo = this._runners[i];
      const runner = runnerInfo.runner;
      let dt = dtTime; // Make sure that we give the actual difference
      // between runner start time and now

      const dtToStart = this._time - runnerInfo.start; // Dont run runner if not started yet

      if (dtToStart <= 0) {
        runnersLeft = true;
        continue;
      } else if (dtToStart < dt) {
        // Adjust dt to make sure that animation is on point
        dt = dtToStart;
      }

      if (!runner.active()) continue; // If this runner is still going, signal that we need another animation
      // frame, otherwise, remove the completed runner

      const finished = runner.step(dt).done;

      if (!finished) {
        runnersLeft = true; // continue
      } else if (runnerInfo.persist !== true) {
        // runner is finished. And runner might get removed
        const endTime = runner.duration() - runner.time() + this._time;

        if (endTime + runnerInfo.persist < this._time) {
          // Delete runner and correct index
          runner.unschedule();
          --i;
          --len;
        }
      }
    } // Basically: we continue when there are runners right from us in time
    // when -->, and when runners are left from us when <--


    if (runnersLeft && !(this._speed < 0 && this._time === 0) || this._runnerIds.length && this._speed < 0 && this._time > 0) {
      this._continue();
    } else {
      this.pause();
      this.fire('finished');
    }

    return this;
  }

}
registerMethods({
  Element: {
    timeline: function (timeline) {
      if (timeline == null) {
        this._timeline = this._timeline || new Timeline();
        return this._timeline;
      } else {
        this._timeline = timeline;
        return this;
      }
    }
  }
});

class Runner extends EventTarget {
  constructor(options) {
    super(); // Store a unique id on the runner, so that we can identify it later

    this.id = Runner.id++; // Ensure a default value

    options = options == null ? timeline.duration : options; // Ensure that we get a controller

    options = typeof options === 'function' ? new Controller(options) : options; // Declare all of the variables

    this._element = null;
    this._timeline = null;
    this.done = false;
    this._queue = []; // Work out the stepper and the duration

    this._duration = typeof options === 'number' && options;
    this._isDeclarative = options instanceof Controller;
    this._stepper = this._isDeclarative ? options : new Ease(); // We copy the current values from the timeline because they can change

    this._history = {}; // Store the state of the runner

    this.enabled = true;
    this._time = 0;
    this._lastTime = 0; // At creation, the runner is in reseted state

    this._reseted = true; // Save transforms applied to this runner

    this.transforms = new Matrix();
    this.transformId = 1; // Looping variables

    this._haveReversed = false;
    this._reverse = false;
    this._loopsDone = 0;
    this._swing = false;
    this._wait = 0;
    this._times = 1;
    this._frameId = null; // Stores how long a runner is stored after beeing done

    this._persist = this._isDeclarative ? true : null;
  }

  static sanitise(duration, delay, when) {
    // Initialise the default parameters
    let times = 1;
    let swing = false;
    let wait = 0;
    duration = duration || timeline.duration;
    delay = delay || timeline.delay;
    when = when || 'last'; // If we have an object, unpack the values

    if (typeof duration === 'object' && !(duration instanceof Stepper)) {
      delay = duration.delay || delay;
      when = duration.when || when;
      swing = duration.swing || swing;
      times = duration.times || times;
      wait = duration.wait || wait;
      duration = duration.duration || timeline.duration;
    }

    return {
      duration: duration,
      delay: delay,
      swing: swing,
      times: times,
      wait: wait,
      when: when
    };
  }

  active(enabled) {
    if (enabled == null) return this.enabled;
    this.enabled = enabled;
    return this;
  }
  /*
  Private Methods
  ===============
  Methods that shouldn't be used externally
  */


  addTransform(transform, index) {
    this.transforms.lmultiplyO(transform);
    return this;
  }

  after(fn) {
    return this.on('finished', fn);
  }

  animate(duration, delay, when) {
    const o = Runner.sanitise(duration, delay, when);
    const runner = new Runner(o.duration);
    if (this._timeline) runner.timeline(this._timeline);
    if (this._element) runner.element(this._element);
    return runner.loop(o).schedule(o.delay, o.when);
  }

  clearTransform() {
    this.transforms = new Matrix();
    return this;
  } // TODO: Keep track of all transformations so that deletion is faster


  clearTransformsFromQueue() {
    if (!this.done || !this._timeline || !this._timeline._runnerIds.includes(this.id)) {
      this._queue = this._queue.filter(item => {
        return !item.isTransform;
      });
    }
  }

  delay(delay) {
    return this.animate(0, delay);
  }

  duration() {
    return this._times * (this._wait + this._duration) - this._wait;
  }

  during(fn) {
    return this.queue(null, fn);
  }

  ease(fn) {
    this._stepper = new Ease(fn);
    return this;
  }
  /*
  Runner Definitions
  ==================
  These methods help us define the runtime behaviour of the Runner or they
  help us make new runners from the current runner
  */


  element(element) {
    if (element == null) return this._element;
    this._element = element;

    element._prepareRunner();

    return this;
  }

  finish() {
    return this.step(Infinity);
  }

  loop(times, swing, wait) {
    // Deal with the user passing in an object
    if (typeof times === 'object') {
      swing = times.swing;
      wait = times.wait;
      times = times.times;
    } // Sanitise the values and store them


    this._times = times || Infinity;
    this._swing = swing || false;
    this._wait = wait || 0; // Allow true to be passed

    if (this._times === true) {
      this._times = Infinity;
    }

    return this;
  }

  loops(p) {
    const loopDuration = this._duration + this._wait;

    if (p == null) {
      const loopsDone = Math.floor(this._time / loopDuration);
      const relativeTime = this._time - loopsDone * loopDuration;
      const position = relativeTime / this._duration;
      return Math.min(loopsDone + position, this._times);
    }

    const whole = Math.floor(p);
    const partial = p % 1;
    const time = loopDuration * whole + this._duration * partial;
    return this.time(time);
  }

  persist(dtOrForever) {
    if (dtOrForever == null) return this._persist;
    this._persist = dtOrForever;
    return this;
  }

  position(p) {
    // Get all of the variables we need
    const x = this._time;
    const d = this._duration;
    const w = this._wait;
    const t = this._times;
    const s = this._swing;
    const r = this._reverse;
    let position;

    if (p == null) {
      /*
      This function converts a time to a position in the range [0, 1]
      The full explanation can be found in this desmos demonstration
        https://www.desmos.com/calculator/u4fbavgche
      The logic is slightly simplified here because we can use booleans
      */
      // Figure out the value without thinking about the start or end time
      const f = function (x) {
        const swinging = s * Math.floor(x % (2 * (w + d)) / (w + d));
        const backwards = swinging && !r || !swinging && r;
        const uncliped = Math.pow(-1, backwards) * (x % (w + d)) / d + backwards;
        const clipped = Math.max(Math.min(uncliped, 1), 0);
        return clipped;
      }; // Figure out the value by incorporating the start time


      const endTime = t * (w + d) - w;
      position = x <= 0 ? Math.round(f(1e-5)) : x < endTime ? f(x) : Math.round(f(endTime - 1e-5));
      return position;
    } // Work out the loops done and add the position to the loops done


    const loopsDone = Math.floor(this.loops());
    const swingForward = s && loopsDone % 2 === 0;
    const forwards = swingForward && !r || r && swingForward;
    position = loopsDone + (forwards ? p : 1 - p);
    return this.loops(position);
  }

  progress(p) {
    if (p == null) {
      return Math.min(1, this._time / this.duration());
    }

    return this.time(p * this.duration());
  }
  /*
  Basic Functionality
  ===================
  These methods allow us to attach basic functions to the runner directly
  */


  queue(initFn, runFn, retargetFn, isTransform) {
    this._queue.push({
      initialiser: initFn || noop,
      runner: runFn || noop,
      retarget: retargetFn,
      isTransform: isTransform,
      initialised: false,
      finished: false
    });

    const timeline = this.timeline();
    timeline && this.timeline()._continue();
    return this;
  }

  reset() {
    if (this._reseted) return this;
    this.time(0);
    this._reseted = true;
    return this;
  }

  reverse(reverse) {
    this._reverse = reverse == null ? !this._reverse : reverse;
    return this;
  }

  schedule(timeline, delay, when) {
    // The user doesn't need to pass a timeline if we already have one
    if (!(timeline instanceof Timeline)) {
      when = delay;
      delay = timeline;
      timeline = this.timeline();
    } // If there is no timeline, yell at the user...


    if (!timeline) {
      throw Error('Runner cannot be scheduled without timeline');
    } // Schedule the runner on the timeline provided


    timeline.schedule(this, delay, when);
    return this;
  }

  step(dt) {
    // If we are inactive, this stepper just gets skipped
    if (!this.enabled) return this; // Update the time and get the new position

    dt = dt == null ? 16 : dt;
    this._time += dt;
    const position = this.position(); // Figure out if we need to run the stepper in this frame

    const running = this._lastPosition !== position && this._time >= 0;
    this._lastPosition = position; // Figure out if we just started

    const duration = this.duration();
    const justStarted = this._lastTime <= 0 && this._time > 0;
    const justFinished = this._lastTime < duration && this._time >= duration;
    this._lastTime = this._time;

    if (justStarted) {
      this.fire('start', this);
    } // Work out if the runner is finished set the done flag here so animations
    // know, that they are running in the last step (this is good for
    // transformations which can be merged)


    const declarative = this._isDeclarative;
    this.done = !declarative && !justFinished && this._time >= duration; // Runner is running. So its not in reseted state anymore

    this._reseted = false;
    let converged = false; // Call initialise and the run function

    if (running || declarative) {
      this._initialise(running); // clear the transforms on this runner so they dont get added again and again


      this.transforms = new Matrix();
      converged = this._run(declarative ? dt : position);
      this.fire('step', this);
    } // correct the done flag here
    // declaritive animations itself know when they converged


    this.done = this.done || converged && declarative;

    if (justFinished) {
      this.fire('finished', this);
    }

    return this;
  }
  /*
  Runner animation methods
  ========================
  Control how the animation plays
  */


  time(time) {
    if (time == null) {
      return this._time;
    }

    const dt = time - this._time;
    this.step(dt);
    return this;
  }

  timeline(timeline) {
    // check explicitly for undefined so we can set the timeline to null
    if (typeof timeline === 'undefined') return this._timeline;
    this._timeline = timeline;
    return this;
  }

  unschedule() {
    const timeline = this.timeline();
    timeline && timeline.unschedule(this);
    return this;
  } // Run each initialise function in the runner if required


  _initialise(running) {
    // If we aren't running, we shouldn't initialise when not declarative
    if (!running && !this._isDeclarative) return; // Loop through all of the initialisers

    for (let i = 0, len = this._queue.length; i < len; ++i) {
      // Get the current initialiser
      const current = this._queue[i]; // Determine whether we need to initialise

      const needsIt = this._isDeclarative || !current.initialised && running;
      running = !current.finished; // Call the initialiser if we need to

      if (needsIt && running) {
        current.initialiser.call(this);
        current.initialised = true;
      }
    }
  } // Save a morpher to the morpher list so that we can retarget it later


  _rememberMorpher(method, morpher) {
    this._history[method] = {
      morpher: morpher,
      caller: this._queue[this._queue.length - 1]
    }; // We have to resume the timeline in case a controller
    // is already done without being ever run
    // This can happen when e.g. this is done:
    //    anim = el.animate(new SVG.Spring)
    // and later
    //    anim.move(...)

    if (this._isDeclarative) {
      const timeline = this.timeline();
      timeline && timeline.play();
    }
  } // Try to set the target for a morpher if the morpher exists, otherwise
  // Run each run function for the position or dt given


  _run(positionOrDt) {
    // Run all of the _queue directly
    let allfinished = true;

    for (let i = 0, len = this._queue.length; i < len; ++i) {
      // Get the current function to run
      const current = this._queue[i]; // Run the function if its not finished, we keep track of the finished
      // flag for the sake of declarative _queue

      const converged = current.runner.call(this, positionOrDt);
      current.finished = current.finished || converged === true;
      allfinished = allfinished && current.finished;
    } // We report when all of the constructors are finished


    return allfinished;
  } // do nothing and return false


  _tryRetarget(method, target, extra) {
    if (this._history[method]) {
      // if the last method wasnt even initialised, throw it away
      if (!this._history[method].caller.initialised) {
        const index = this._queue.indexOf(this._history[method].caller);

        this._queue.splice(index, 1);

        return false;
      } // for the case of transformations, we use the special retarget function
      // which has access to the outer scope


      if (this._history[method].caller.retarget) {
        this._history[method].caller.retarget.call(this, target, extra); // for everything else a simple morpher change is sufficient

      } else {
        this._history[method].morpher.to(target);
      }

      this._history[method].caller.finished = false;
      const timeline = this.timeline();
      timeline && timeline.play();
      return true;
    }

    return false;
  }

}
Runner.id = 0;
class FakeRunner {
  constructor(transforms = new Matrix(), id = -1, done = true) {
    this.transforms = transforms;
    this.id = id;
    this.done = done;
  }

  clearTransformsFromQueue() {}

}
extend([Runner, FakeRunner], {
  mergeWith(runner) {
    return new FakeRunner(runner.transforms.lmultiply(this.transforms), runner.id);
  }

}); // FakeRunner.emptyRunner = new FakeRunner()

const lmultiply = (last, curr) => last.lmultiplyO(curr);

const getRunnerTransform = runner => runner.transforms;

function mergeTransforms() {
  // Find the matrix to apply to the element and apply it
  const runners = this._transformationRunners.runners;
  const netTransform = runners.map(getRunnerTransform).reduce(lmultiply, new Matrix());
  this.transform(netTransform);

  this._transformationRunners.merge();

  if (this._transformationRunners.length() === 1) {
    this._frameId = null;
  }
}

class RunnerArray {
  constructor() {
    this.runners = [];
    this.ids = [];
  }

  add(runner) {
    if (this.runners.includes(runner)) return;
    const id = runner.id + 1;
    this.runners.push(runner);
    this.ids.push(id);
    return this;
  }

  clearBefore(id) {
    const deleteCnt = this.ids.indexOf(id + 1) || 1;
    this.ids.splice(0, deleteCnt, 0);
    this.runners.splice(0, deleteCnt, new FakeRunner()).forEach(r => r.clearTransformsFromQueue());
    return this;
  }

  edit(id, newRunner) {
    const index = this.ids.indexOf(id + 1);
    this.ids.splice(index, 1, id + 1);
    this.runners.splice(index, 1, newRunner);
    return this;
  }

  getByID(id) {
    return this.runners[this.ids.indexOf(id + 1)];
  }

  length() {
    return this.ids.length;
  }

  merge() {
    let lastRunner = null;

    for (let i = 0; i < this.runners.length; ++i) {
      const runner = this.runners[i];
      const condition = lastRunner && runner.done && lastRunner.done // don't merge runner when persisted on timeline
      && (!runner._timeline || !runner._timeline._runnerIds.includes(runner.id)) && (!lastRunner._timeline || !lastRunner._timeline._runnerIds.includes(lastRunner.id));

      if (condition) {
        // the +1 happens in the function
        this.remove(runner.id);
        const newRunner = runner.mergeWith(lastRunner);
        this.edit(lastRunner.id, newRunner);
        lastRunner = newRunner;
        --i;
      } else {
        lastRunner = runner;
      }
    }

    return this;
  }

  remove(id) {
    const index = this.ids.indexOf(id + 1);
    this.ids.splice(index, 1);
    this.runners.splice(index, 1);
    return this;
  }

}
registerMethods({
  Element: {
    animate(duration, delay, when) {
      const o = Runner.sanitise(duration, delay, when);
      const timeline = this.timeline();
      return new Runner(o.duration).loop(o).element(this).timeline(timeline.play()).schedule(o.delay, o.when);
    },

    delay(by, when) {
      return this.animate(0, by, when);
    },

    // this function searches for all runners on the element and deletes the ones
    // which run before the current one. This is because absolute transformations
    // overwfrite anything anyway so there is no need to waste time computing
    // other runners
    _clearTransformRunnersBefore(currentRunner) {
      this._transformationRunners.clearBefore(currentRunner.id);
    },

    _currentTransform(current) {
      return this._transformationRunners.runners // we need the equal sign here to make sure, that also transformations
      // on the same runner which execute before the current transformation are
      // taken into account
      .filter(runner => runner.id <= current.id).map(getRunnerTransform).reduce(lmultiply, new Matrix());
    },

    _addRunner(runner) {
      this._transformationRunners.add(runner); // Make sure that the runner merge is executed at the very end of
      // all Animator functions. Thats why we use immediate here to execute
      // the merge right after all frames are run


      Animator.cancelImmediate(this._frameId);
      this._frameId = Animator.immediate(mergeTransforms.bind(this));
    },

    _prepareRunner() {
      if (this._frameId == null) {
        this._transformationRunners = new RunnerArray().add(new FakeRunner(new Matrix(this)));
      }
    }

  }
}); // Will output the elements from array A that are not in the array B

const difference = (a, b) => a.filter(x => !b.includes(x));

extend(Runner, {
  attr(a, v) {
    return this.styleAttr('attr', a, v);
  },

  // Add animatable styles
  css(s, v) {
    return this.styleAttr('css', s, v);
  },

  styleAttr(type, nameOrAttrs, val) {
    if (typeof nameOrAttrs === 'string') {
      return this.styleAttr(type, {
        [nameOrAttrs]: val
      });
    }

    let attrs = nameOrAttrs;
    if (this._tryRetarget(type, attrs)) return this;
    let morpher = new Morphable(this._stepper).to(attrs);
    let keys = Object.keys(attrs);
    this.queue(function () {
      morpher = morpher.from(this.element()[type](keys));
    }, function (pos) {
      this.element()[type](morpher.at(pos).valueOf());
      return morpher.done();
    }, function (newToAttrs) {
      // Check if any new keys were added
      const newKeys = Object.keys(newToAttrs);
      const differences = difference(newKeys, keys); // If their are new keys, initialize them and add them to morpher

      if (differences.length) {
        // Get the values
        const addedFromAttrs = this.element()[type](differences); // Get the already initialized values

        const oldFromAttrs = new ObjectBag(morpher.from()).valueOf(); // Merge old and new

        Object.assign(oldFromAttrs, addedFromAttrs);
        morpher.from(oldFromAttrs);
      } // Get the object from the morpher


      const oldToAttrs = new ObjectBag(morpher.to()).valueOf(); // Merge in new attributes

      Object.assign(oldToAttrs, newToAttrs); // Change morpher target

      morpher.to(oldToAttrs); // Make sure that we save the work we did so we don't need it to do again

      keys = newKeys;
      attrs = newToAttrs;
    });

    this._rememberMorpher(type, morpher);

    return this;
  },

  zoom(level, point) {
    if (this._tryRetarget('zoom', level, point)) return this;
    let morpher = new Morphable(this._stepper).to(new SVGNumber(level));
    this.queue(function () {
      morpher = morpher.from(this.element().zoom());
    }, function (pos) {
      this.element().zoom(morpher.at(pos), point);
      return morpher.done();
    }, function (newLevel, newPoint) {
      point = newPoint;
      morpher.to(newLevel);
    });

    this._rememberMorpher('zoom', morpher);

    return this;
  },

  /**
   ** absolute transformations
   **/
  //
  // M v -----|-----(D M v = F v)------|----->  T v
  //
  // 1. define the final state (T) and decompose it (once)
  //    t = [tx, ty, the, lam, sy, sx]
  // 2. on every frame: pull the current state of all previous transforms
  //    (M - m can change)
  //   and then write this as m = [tx0, ty0, the0, lam0, sy0, sx0]
  // 3. Find the interpolated matrix F(pos) = m + pos * (t - m)
  //   - Note F(0) = M
  //   - Note F(1) = T
  // 4. Now you get the delta matrix as a result: D = F * inv(M)
  transform(transforms, relative, affine) {
    // If we have a declarative function, we should retarget it if possible
    relative = transforms.relative || relative;

    if (this._isDeclarative && !relative && this._tryRetarget('transform', transforms)) {
      return this;
    } // Parse the parameters


    const isMatrix = Matrix.isMatrixLike(transforms);
    affine = transforms.affine != null ? transforms.affine : affine != null ? affine : !isMatrix; // Create a morepher and set its type

    const morpher = new Morphable(this._stepper).type(affine ? TransformBag : Matrix);
    let origin;
    let element;
    let current;
    let currentAngle;
    let startTransform;

    function setup() {
      // make sure element and origin is defined
      element = element || this.element();
      origin = origin || getOrigin(transforms, element);
      startTransform = new Matrix(relative ? undefined : element); // add the runner to the element so it can merge transformations

      element._addRunner(this); // Deactivate all transforms that have run so far if we are absolute


      if (!relative) {
        element._clearTransformRunnersBefore(this);
      }
    }

    function run(pos) {
      // clear all other transforms before this in case something is saved
      // on this runner. We are absolute. We dont need these!
      if (!relative) this.clearTransform();
      const {
        x,
        y
      } = new Point(origin).transform(element._currentTransform(this));
      let target = new Matrix({ ...transforms,
        origin: [x, y]
      });
      let start = this._isDeclarative && current ? current : startTransform;

      if (affine) {
        target = target.decompose(x, y);
        start = start.decompose(x, y); // Get the current and target angle as it was set

        const rTarget = target.rotate;
        const rCurrent = start.rotate; // Figure out the shortest path to rotate directly

        const possibilities = [rTarget - 360, rTarget, rTarget + 360];
        const distances = possibilities.map(a => Math.abs(a - rCurrent));
        const shortest = Math.min(...distances);
        const index = distances.indexOf(shortest);
        target.rotate = possibilities[index];
      }

      if (relative) {
        // we have to be careful here not to overwrite the rotation
        // with the rotate method of Matrix
        if (!isMatrix) {
          target.rotate = transforms.rotate || 0;
        }

        if (this._isDeclarative && currentAngle) {
          start.rotate = currentAngle;
        }
      }

      morpher.from(start);
      morpher.to(target);
      const affineParameters = morpher.at(pos);
      currentAngle = affineParameters.rotate;
      current = new Matrix(affineParameters);
      this.addTransform(current);

      element._addRunner(this);

      return morpher.done();
    }

    function retarget(newTransforms) {
      // only get a new origin if it changed since the last call
      if ((newTransforms.origin || 'center').toString() !== (transforms.origin || 'center').toString()) {
        origin = getOrigin(newTransforms, element);
      } // overwrite the old transformations with the new ones


      transforms = { ...newTransforms,
        origin
      };
    }

    this.queue(setup, run, retarget, true);
    this._isDeclarative && this._rememberMorpher('transform', morpher);
    return this;
  },

  // Animatable x-axis
  x(x, relative) {
    return this._queueNumber('x', x);
  },

  // Animatable y-axis
  y(y) {
    return this._queueNumber('y', y);
  },

  dx(x = 0) {
    return this._queueNumberDelta('x', x);
  },

  dy(y = 0) {
    return this._queueNumberDelta('y', y);
  },

  dmove(x, y) {
    return this.dx(x).dy(y);
  },

  _queueNumberDelta(method, to) {
    to = new SVGNumber(to); // Try to change the target if we have this method already registerd

    if (this._tryRetarget(method, to)) return this; // Make a morpher and queue the animation

    const morpher = new Morphable(this._stepper).to(to);
    let from = null;
    this.queue(function () {
      from = this.element()[method]();
      morpher.from(from);
      morpher.to(from + to);
    }, function (pos) {
      this.element()[method](morpher.at(pos));
      return morpher.done();
    }, function (newTo) {
      morpher.to(from + new SVGNumber(newTo));
    }); // Register the morpher so that if it is changed again, we can retarget it

    this._rememberMorpher(method, morpher);

    return this;
  },

  _queueObject(method, to) {
    // Try to change the target if we have this method already registerd
    if (this._tryRetarget(method, to)) return this; // Make a morpher and queue the animation

    const morpher = new Morphable(this._stepper).to(to);
    this.queue(function () {
      morpher.from(this.element()[method]());
    }, function (pos) {
      this.element()[method](morpher.at(pos));
      return morpher.done();
    }); // Register the morpher so that if it is changed again, we can retarget it

    this._rememberMorpher(method, morpher);

    return this;
  },

  _queueNumber(method, value) {
    return this._queueObject(method, new SVGNumber(value));
  },

  // Animatable center x-axis
  cx(x) {
    return this._queueNumber('cx', x);
  },

  // Animatable center y-axis
  cy(y) {
    return this._queueNumber('cy', y);
  },

  // Add animatable move
  move(x, y) {
    return this.x(x).y(y);
  },

  // Add animatable center
  center(x, y) {
    return this.cx(x).cy(y);
  },

  // Add animatable size
  size(width, height) {
    // animate bbox based size for all other elements
    let box;

    if (!width || !height) {
      box = this._element.bbox();
    }

    if (!width) {
      width = box.width / box.height * height;
    }

    if (!height) {
      height = box.height / box.width * width;
    }

    return this.width(width).height(height);
  },

  // Add animatable width
  width(width) {
    return this._queueNumber('width', width);
  },

  // Add animatable height
  height(height) {
    return this._queueNumber('height', height);
  },

  // Add animatable plot
  plot(a, b, c, d) {
    // Lines can be plotted with 4 arguments
    if (arguments.length === 4) {
      return this.plot([a, b, c, d]);
    }

    if (this._tryRetarget('plot', a)) return this;
    const morpher = new Morphable(this._stepper).type(this._element.MorphArray).to(a);
    this.queue(function () {
      morpher.from(this._element.array());
    }, function (pos) {
      this._element.plot(morpher.at(pos));

      return morpher.done();
    });

    this._rememberMorpher('plot', morpher);

    return this;
  },

  // Add leading method
  leading(value) {
    return this._queueNumber('leading', value);
  },

  // Add animatable viewbox
  viewbox(x, y, width, height) {
    return this._queueObject('viewbox', new Box(x, y, width, height));
  },

  update(o) {
    if (typeof o !== 'object') {
      return this.update({
        offset: arguments[0],
        color: arguments[1],
        opacity: arguments[2]
      });
    }

    if (o.opacity != null) this.attr('stop-opacity', o.opacity);
    if (o.color != null) this.attr('stop-color', o.color);
    if (o.offset != null) this.attr('offset', o.offset);
    return this;
  }

});
extend(Runner, {
  rx,
  ry,
  from,
  to
});
register(Runner, 'Runner');

class Svg extends Container {
  constructor(node, attrs = node) {
    super(nodeOrNew('svg', node), attrs);
    this.namespace();
  } // Creates and returns defs element


  defs() {
    if (!this.isRoot()) return this.root().defs();
    return adopt(this.node.querySelector('defs')) || this.put(new Defs());
  }

  isRoot() {
    return !this.node.parentNode || !(this.node.parentNode instanceof globals.window.SVGElement) && this.node.parentNode.nodeName !== '#document-fragment';
  } // Add namespaces


  namespace() {
    if (!this.isRoot()) return this.root().namespace();
    return this.attr({
      xmlns: svg_esm_svg,
      version: '1.1'
    }).attr('xmlns:xlink', xlink, xmlns).attr('xmlns:svgjs', svgjs, xmlns);
  }

  removeNamespace() {
    return this.attr({
      xmlns: null,
      version: null
    }).attr('xmlns:xlink', null, xmlns).attr('xmlns:svgjs', null, xmlns);
  } // Check if this is a root svg
  // If not, call root() from this element


  root() {
    if (this.isRoot()) return this;
    return super.root();
  }

}
registerMethods({
  Container: {
    // Create nested svg document
    nested: wrapWithAttrCheck(function () {
      return this.put(new Svg());
    })
  }
});
register(Svg, 'Svg', true);

class svg_esm_Symbol extends Container {
  // Initialize node
  constructor(node, attrs = node) {
    super(nodeOrNew('symbol', node), attrs);
  }

}
registerMethods({
  Container: {
    symbol: wrapWithAttrCheck(function () {
      return this.put(new svg_esm_Symbol());
    })
  }
});
register(svg_esm_Symbol, 'Symbol');

function plain(text) {
  // clear if build mode is disabled
  if (this._build === false) {
    this.clear();
  } // create text node


  this.node.appendChild(globals.document.createTextNode(text));
  return this;
} // Get length of text element

function svg_esm_length() {
  return this.node.getComputedTextLength();
} // Move over x-axis
// Text is moved by its bounding box
// text-anchor does NOT matter

function x$1(x, box = this.bbox()) {
  if (x == null) {
    return box.x;
  }

  return this.attr('x', this.attr('x') + x - box.x);
} // Move over y-axis

function y$1(y, box = this.bbox()) {
  if (y == null) {
    return box.y;
  }

  return this.attr('y', this.attr('y') + y - box.y);
}
function move$1(x, y, box = this.bbox()) {
  return this.x(x, box).y(y, box);
} // Move center over x-axis

function cx(x, box = this.bbox()) {
  if (x == null) {
    return box.cx;
  }

  return this.attr('x', this.attr('x') + x - box.cx);
} // Move center over y-axis

function cy(y, box = this.bbox()) {
  if (y == null) {
    return box.cy;
  }

  return this.attr('y', this.attr('y') + y - box.cy);
}
function center(x, y, box = this.bbox()) {
  return this.cx(x, box).cy(y, box);
}
function ax(x) {
  return this.attr('x', x);
}
function ay(y) {
  return this.attr('y', y);
}
function amove(x, y) {
  return this.ax(x).ay(y);
} // Enable / disable build mode

function build(build) {
  this._build = !!build;
  return this;
}

var textable = {
  __proto__: null,
  plain: plain,
  length: svg_esm_length,
  x: x$1,
  y: y$1,
  move: move$1,
  cx: cx,
  cy: cy,
  center: center,
  ax: ax,
  ay: ay,
  amove: amove,
  build: build
};

class Text extends Shape {
  // Initialize node
  constructor(node, attrs = node) {
    super(nodeOrNew('text', node), attrs);
    this.dom.leading = new SVGNumber(1.3); // store leading value for rebuilding

    this._rebuild = true; // enable automatic updating of dy values

    this._build = false; // disable build mode for adding multiple lines
  } // Set / get leading


  leading(value) {
    // act as getter
    if (value == null) {
      return this.dom.leading;
    } // act as setter


    this.dom.leading = new SVGNumber(value);
    return this.rebuild();
  } // Rebuild appearance type


  rebuild(rebuild) {
    // store new rebuild flag if given
    if (typeof rebuild === 'boolean') {
      this._rebuild = rebuild;
    } // define position of all lines


    if (this._rebuild) {
      const self = this;
      let blankLineOffset = 0;
      const leading = this.dom.leading;
      this.each(function (i) {
        const fontSize = globals.window.getComputedStyle(this.node).getPropertyValue('font-size');
        const dy = leading * new SVGNumber(fontSize);

        if (this.dom.newLined) {
          this.attr('x', self.attr('x'));

          if (this.text() === '\n') {
            blankLineOffset += dy;
          } else {
            this.attr('dy', i ? dy + blankLineOffset : 0);
            blankLineOffset = 0;
          }
        }
      });
      this.fire('rebuild');
    }

    return this;
  } // overwrite method from parent to set data properly


  setData(o) {
    this.dom = o;
    this.dom.leading = new SVGNumber(o.leading || 1.3);
    return this;
  } // Set the text content


  text(text) {
    // act as getter
    if (text === undefined) {
      const children = this.node.childNodes;
      let firstLine = 0;
      text = '';

      for (let i = 0, len = children.length; i < len; ++i) {
        // skip textPaths - they are no lines
        if (children[i].nodeName === 'textPath') {
          if (i === 0) firstLine = 1;
          continue;
        } // add newline if its not the first child and newLined is set to true


        if (i !== firstLine && children[i].nodeType !== 3 && adopt(children[i]).dom.newLined === true) {
          text += '\n';
        } // add content of this node


        text += children[i].textContent;
      }

      return text;
    } // remove existing content


    this.clear().build(true);

    if (typeof text === 'function') {
      // call block
      text.call(this, this);
    } else {
      // store text and make sure text is not blank
      text = (text + '').split('\n'); // build new lines

      for (let j = 0, jl = text.length; j < jl; j++) {
        this.newLine(text[j]);
      }
    } // disable build mode and rebuild lines


    return this.build(false).rebuild();
  }

}
extend(Text, textable);
registerMethods({
  Container: {
    // Create text element
    text: wrapWithAttrCheck(function (text = '') {
      return this.put(new Text()).text(text);
    }),
    // Create plain text element
    plain: wrapWithAttrCheck(function (text = '') {
      return this.put(new Text()).plain(text);
    })
  }
});
register(Text, 'Text');

class Tspan extends Shape {
  // Initialize node
  constructor(node, attrs = node) {
    super(nodeOrNew('tspan', node), attrs);
    this._build = false; // disable build mode for adding multiple lines
  } // Shortcut dx


  dx(dx) {
    return this.attr('dx', dx);
  } // Shortcut dy


  dy(dy) {
    return this.attr('dy', dy);
  } // Create new line


  newLine() {
    // mark new line
    this.dom.newLined = true; // fetch parent

    const text = this.parent(); // early return in case we are not in a text element

    if (!(text instanceof Text)) {
      return this;
    }

    const i = text.index(this);
    const fontSize = globals.window.getComputedStyle(this.node).getPropertyValue('font-size');
    const dy = text.dom.leading * new SVGNumber(fontSize); // apply new position

    return this.dy(i ? dy : 0).attr('x', text.x());
  } // Set text content


  text(text) {
    if (text == null) return this.node.textContent + (this.dom.newLined ? '\n' : '');

    if (typeof text === 'function') {
      this.clear().build(true);
      text.call(this, this);
      this.build(false);
    } else {
      this.plain(text);
    }

    return this;
  }

}
extend(Tspan, textable);
registerMethods({
  Tspan: {
    tspan: wrapWithAttrCheck(function (text = '') {
      const tspan = new Tspan(); // clear if build mode is disabled

      if (!this._build) {
        this.clear();
      } // add new tspan


      return this.put(tspan).text(text);
    })
  },
  Text: {
    newLine: function (text = '') {
      return this.tspan(text).newLine();
    }
  }
});
register(Tspan, 'Tspan');

class Circle extends Shape {
  constructor(node, attrs = node) {
    super(nodeOrNew('circle', node), attrs);
  }

  radius(r) {
    return this.attr('r', r);
  } // Radius x value


  rx(rx) {
    return this.attr('r', rx);
  } // Alias radius x value


  ry(ry) {
    return this.rx(ry);
  }

  size(size) {
    return this.radius(new SVGNumber(size).divide(2));
  }

}
extend(Circle, {
  x: x$3,
  y: y$3,
  cx: cx$1,
  cy: cy$1,
  width: width$2,
  height: height$2
});
registerMethods({
  Container: {
    // Create circle element
    circle: wrapWithAttrCheck(function (size = 0) {
      return this.put(new Circle()).size(size).move(0, 0);
    })
  }
});
register(Circle, 'Circle');

class ClipPath extends Container {
  constructor(node, attrs = node) {
    super(nodeOrNew('clipPath', node), attrs);
  } // Unclip all clipped elements and remove itself


  remove() {
    // unclip all targets
    this.targets().forEach(function (el) {
      el.unclip();
    }); // remove clipPath from parent

    return super.remove();
  }

  targets() {
    return baseFind('svg [clip-path*="' + this.id() + '"]');
  }

}
registerMethods({
  Container: {
    // Create clipping element
    clip: wrapWithAttrCheck(function () {
      return this.defs().put(new ClipPath());
    })
  },
  Element: {
    // Distribute clipPath to svg element
    clipper() {
      return this.reference('clip-path');
    },

    clipWith(element) {
      // use given clip or create a new one
      const clipper = element instanceof ClipPath ? element : this.parent().clip().add(element); // apply mask

      return this.attr('clip-path', 'url("#' + clipper.id() + '")');
    },

    // Unclip element
    unclip() {
      return this.attr('clip-path', null);
    }

  }
});
register(ClipPath, 'ClipPath');

class ForeignObject extends Element {
  constructor(node, attrs = node) {
    super(nodeOrNew('foreignObject', node), attrs);
  }

}
registerMethods({
  Container: {
    foreignObject: wrapWithAttrCheck(function (width, height) {
      return this.put(new ForeignObject()).size(width, height);
    })
  }
});
register(ForeignObject, 'ForeignObject');

function dmove(dx, dy) {
  this.children().forEach((child, i) => {
    let bbox; // We have to wrap this for elements that dont have a bbox
    // e.g. title and other descriptive elements

    try {
      // Get the childs bbox
      bbox = child.bbox();
    } catch (e) {
      return;
    } // Get childs matrix


    const m = new Matrix(child); // Translate childs matrix by amount and
    // transform it back into parents space

    const matrix = m.translate(dx, dy).transform(m.inverse()); // Calculate new x and y from old box

    const p = new Point(bbox.x, bbox.y).transform(matrix); // Move element

    child.move(p.x, p.y);
  });
  return this;
}
function dx(dx) {
  return this.dmove(dx, 0);
}
function dy(dy) {
  return this.dmove(0, dy);
}
function svg_esm_height(height, box = this.bbox()) {
  if (height == null) return box.height;
  return this.size(box.width, height, box);
}
function move(x = 0, y = 0, box = this.bbox()) {
  const dx = x - box.x;
  const dy = y - box.y;
  return this.dmove(dx, dy);
}
function size(width, height, box = this.bbox()) {
  const p = proportionalSize(this, width, height, box);
  const scaleX = p.width / box.width;
  const scaleY = p.height / box.height;
  this.children().forEach((child, i) => {
    const o = new Point(box).transform(new Matrix(child).inverse());
    child.scale(scaleX, scaleY, o.x, o.y);
  });
  return this;
}
function svg_esm_width(width, box = this.bbox()) {
  if (width == null) return box.width;
  return this.size(width, box.height, box);
}
function x(x, box = this.bbox()) {
  if (x == null) return box.x;
  return this.move(x, box.y, box);
}
function y(y, box = this.bbox()) {
  if (y == null) return box.y;
  return this.move(box.x, y, box);
}

var containerGeometry = {
  __proto__: null,
  dmove: dmove,
  dx: dx,
  dy: dy,
  height: svg_esm_height,
  move: move,
  size: size,
  width: svg_esm_width,
  x: x,
  y: y
};

class G extends Container {
  constructor(node, attrs = node) {
    super(nodeOrNew('g', node), attrs);
  }

}
extend(G, containerGeometry);
registerMethods({
  Container: {
    // Create a group element
    group: wrapWithAttrCheck(function () {
      return this.put(new G());
    })
  }
});
register(G, 'G');

class A extends Container {
  constructor(node, attrs = node) {
    super(nodeOrNew('a', node), attrs);
  } // Link target attribute


  target(target) {
    return this.attr('target', target);
  } // Link url


  to(url) {
    return this.attr('href', url, xlink);
  }

}
extend(A, containerGeometry);
registerMethods({
  Container: {
    // Create a hyperlink element
    link: wrapWithAttrCheck(function (url) {
      return this.put(new A()).to(url);
    })
  },
  Element: {
    unlink() {
      const link = this.linker();
      if (!link) return this;
      const parent = link.parent();

      if (!parent) {
        return this.remove();
      }

      const index = parent.index(link);
      parent.add(this, index);
      link.remove();
      return this;
    },

    linkTo(url) {
      // reuse old link if possible
      let link = this.linker();

      if (!link) {
        link = new A();
        this.wrap(link);
      }

      if (typeof url === 'function') {
        url.call(link, link);
      } else {
        link.to(url);
      }

      return this;
    },

    linker() {
      const link = this.parent();

      if (link && link.node.nodeName.toLowerCase() === 'a') {
        return link;
      }

      return null;
    }

  }
});
register(A, 'A');

class Mask extends Container {
  // Initialize node
  constructor(node, attrs = node) {
    super(nodeOrNew('mask', node), attrs);
  } // Unmask all masked elements and remove itself


  remove() {
    // unmask all targets
    this.targets().forEach(function (el) {
      el.unmask();
    }); // remove mask from parent

    return super.remove();
  }

  targets() {
    return baseFind('svg [mask*="' + this.id() + '"]');
  }

}
registerMethods({
  Container: {
    mask: wrapWithAttrCheck(function () {
      return this.defs().put(new Mask());
    })
  },
  Element: {
    // Distribute mask to svg element
    masker() {
      return this.reference('mask');
    },

    maskWith(element) {
      // use given mask or create a new one
      const masker = element instanceof Mask ? element : this.parent().mask().add(element); // apply mask

      return this.attr('mask', 'url("#' + masker.id() + '")');
    },

    // Unmask element
    unmask() {
      return this.attr('mask', null);
    }

  }
});
register(Mask, 'Mask');

class Stop extends Element {
  constructor(node, attrs = node) {
    super(nodeOrNew('stop', node), attrs);
  } // add color stops


  update(o) {
    if (typeof o === 'number' || o instanceof SVGNumber) {
      o = {
        offset: arguments[0],
        color: arguments[1],
        opacity: arguments[2]
      };
    } // set attributes


    if (o.opacity != null) this.attr('stop-opacity', o.opacity);
    if (o.color != null) this.attr('stop-color', o.color);
    if (o.offset != null) this.attr('offset', new SVGNumber(o.offset));
    return this;
  }

}
registerMethods({
  Gradient: {
    // Add a color stop
    stop: function (offset, color, opacity) {
      return this.put(new Stop()).update(offset, color, opacity);
    }
  }
});
register(Stop, 'Stop');

function cssRule(selector, rule) {
  if (!selector) return '';
  if (!rule) return selector;
  let ret = selector + '{';

  for (const i in rule) {
    ret += unCamelCase(i) + ':' + rule[i] + ';';
  }

  ret += '}';
  return ret;
}

class svg_esm_Style extends Element {
  constructor(node, attrs = node) {
    super(nodeOrNew('style', node), attrs);
  }

  addText(w = '') {
    this.node.textContent += w;
    return this;
  }

  font(name, src, params = {}) {
    return this.rule('@font-face', {
      fontFamily: name,
      src: src,
      ...params
    });
  }

  rule(selector, obj) {
    return this.addText(cssRule(selector, obj));
  }

}
registerMethods('Dom', {
  style(selector, obj) {
    return this.put(new svg_esm_Style()).rule(selector, obj);
  },

  fontface(name, src, params) {
    return this.put(new svg_esm_Style()).font(name, src, params);
  }

});
register(svg_esm_Style, 'Style');

class TextPath extends Text {
  // Initialize node
  constructor(node, attrs = node) {
    super(nodeOrNew('textPath', node), attrs);
  } // return the array of the path track element


  array() {
    const track = this.track();
    return track ? track.array() : null;
  } // Plot path if any


  plot(d) {
    const track = this.track();
    let pathArray = null;

    if (track) {
      pathArray = track.plot(d);
    }

    return d == null ? pathArray : this;
  } // Get the path element


  track() {
    return this.reference('href');
  }

}
registerMethods({
  Container: {
    textPath: wrapWithAttrCheck(function (text, path) {
      // Convert text to instance if needed
      if (!(text instanceof Text)) {
        text = this.text(text);
      }

      return text.path(path);
    })
  },
  Text: {
    // Create path for text to run on
    path: wrapWithAttrCheck(function (track, importNodes = true) {
      const textPath = new TextPath(); // if track is a path, reuse it

      if (!(track instanceof Path)) {
        // create path element
        track = this.defs().path(track);
      } // link textPath to path and add content


      textPath.attr('href', '#' + track, xlink); // Transplant all nodes from text to textPath

      let node;

      if (importNodes) {
        while (node = this.node.firstChild) {
          textPath.node.appendChild(node);
        }
      } // add textPath element as child node and return textPath


      return this.put(textPath);
    }),

    // Get the textPath children
    textPath() {
      return this.findOne('textPath');
    }

  },
  Path: {
    // creates a textPath from this path
    text: wrapWithAttrCheck(function (text) {
      // Convert text to instance if needed
      if (!(text instanceof Text)) {
        text = new Text().addTo(this.parent()).text(text);
      } // Create textPath from text and path and return


      return text.path(this);
    }),

    targets() {
      return baseFind('svg textPath').filter(node => {
        return (node.attr('href') || '').includes(this.id());
      }); // Does not work in IE11. Use when IE support is dropped
      // return baseFind('svg textPath[*|href*="' + this.id() + '"]')
    }

  }
});
TextPath.prototype.MorphArray = PathArray;
register(TextPath, 'TextPath');

class Use extends Shape {
  constructor(node, attrs = node) {
    super(nodeOrNew('use', node), attrs);
  } // Use element as a reference


  use(element, file) {
    // Set lined element
    return this.attr('href', (file || '') + '#' + element, xlink);
  }

}
registerMethods({
  Container: {
    // Create a use element
    use: wrapWithAttrCheck(function (element, file) {
      return this.put(new Use()).use(element, file);
    })
  }
});
register(Use, 'Use');

/* Optional Modules */
const SVG = makeInstance;
extend([Svg, svg_esm_Symbol, svg_esm_Image, Pattern, Marker], getMethodsFor('viewbox'));
extend([Line, Polyline, Polygon, Path], getMethodsFor('marker'));
extend(Text, getMethodsFor('Text'));
extend(Path, getMethodsFor('Path'));
extend(Defs, getMethodsFor('Defs'));
extend([Text, Tspan], getMethodsFor('Tspan'));
extend([Rect, Ellipse, Gradient, Runner], getMethodsFor('radius'));
extend(EventTarget, getMethodsFor('EventTarget'));
extend(Dom, getMethodsFor('Dom'));
extend(Element, getMethodsFor('Element'));
extend(Shape, getMethodsFor('Shape'));
extend([Container, Fragment], getMethodsFor('Container'));
extend(Gradient, getMethodsFor('Gradient'));
extend(Runner, getMethodsFor('Runner'));
List.extend(getMethodNames());
registerMorphableType([SVGNumber, Color, Box, Matrix, SVGArray, PointArray, PathArray]);
makeMorphable();


//# sourceMappingURL=svg.esm.js.map

// CONCATENATED MODULE: ../simple-mind-map/src/svg/btns.js
/** 
 * @Author: 王林 
 * @Date: 2021-04-11 19:46:10 
 * @Desc: 展开按钮 
 */
var btns_open = "<svg t=\"1618141562310\" class=\"icon\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"13476\" width=\"200\" height=\"200\"><path d=\"M475.136 327.168v147.968h-147.968v74.24h147.968v147.968h74.24v-147.968h147.968v-74.24h-147.968v-147.968h-74.24z m36.864-222.208c225.28 0 407.04 181.76 407.04 407.04s-181.76 407.04-407.04 407.04-407.04-181.76-407.04-407.04 181.76-407.04 407.04-407.04z m0-74.24c-265.216 0-480.768 215.552-480.768 480.768s215.552 480.768 480.768 480.768 480.768-215.552 480.768-480.768-215.552-480.768-480.768-480.768z\" p-id=\"13477\"></path></svg>";
/** 
 * @Author: 王林 
 * @Date: 2021-04-11 19:46:23 
 * @Desc: 收缩按钮 
 */

var btns_close = "<svg t=\"1618141589243\" class=\"icon\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"13611\" width=\"200\" height=\"200\"><path d=\"M512 105.472c225.28 0 407.04 181.76 407.04 407.04s-181.76 407.04-407.04 407.04-407.04-181.76-407.04-407.04 181.76-407.04 407.04-407.04z m0-74.24c-265.216 0-480.768 215.552-480.768 480.768s215.552 480.768 480.768 480.768 480.768-215.552 480.768-480.768-215.552-480.768-480.768-480.768z\" p-id=\"13612\"></path><path d=\"M252.928 474.624h518.144v74.24h-518.144z\" p-id=\"13613\"></path></svg>";
/* harmony default export */ var btns = ({
  open: btns_open,
  close: btns_close
});
// EXTERNAL MODULE: E:/node_modules/core-js/modules/es.function.name.js
var modules_es_function_name = __webpack_require__("9f29");

// CONCATENATED MODULE: ../simple-mind-map/src/svg/icons.js




// 超链接图标
var icons_hyperlink = '<svg t="1624174958075" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7982" ><path d="M435.484444 251.733333v68.892445L295.822222 320.682667a168.504889 168.504889 0 0 0-2.844444 336.952889h142.506666v68.892444H295.822222a237.397333 237.397333 0 0 1 0-474.794667h139.662222z m248.945778 0a237.397333 237.397333 0 0 1 0 474.851556H544.654222v-69.006222l139.776 0.056889a168.504889 168.504889 0 0 0 2.844445-336.952889H544.597333V251.676444h139.776z m-25.827555 203.946667a34.474667 34.474667 0 0 1 0 68.892444H321.649778a34.474667 34.474667 0 0 1 0-68.892444h336.952889z" p-id="7983"></path></svg>'; // 备注图标

var note = '<svg t="1624195132675" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8792" ><path d="M152.768 985.984 152.768 49.856l434.56 0 66.816 0 234.048 267.392 0 66.816 0 601.92L152.768 985.984 152.768 985.984zM654.144 193.088l0 124.16 108.736 0L654.144 193.088 654.144 193.088zM821.312 384.064l-167.168 0L587.328 384.064 587.328 317.312 587.328 116.736 219.584 116.736 219.584 919.04l601.728 0L821.312 384.064 821.312 384.064zM386.688 517.888 319.808 517.888 319.808 450.944l66.816 0L386.624 517.888 386.688 517.888zM386.688 651.584 319.808 651.584 319.808 584.704l66.816 0L386.624 651.584 386.688 651.584zM386.688 785.344 319.808 785.344l0-66.88 66.816 0L386.624 785.344 386.688 785.344zM721.024 517.888 453.632 517.888 453.632 450.944l267.392 0L721.024 517.888 721.024 517.888zM654.144 651.584 453.632 651.584 453.632 584.704l200.512 0L654.144 651.584 654.144 651.584zM620.672 785.344l-167.04 0 0-66.88 167.04 0L620.672 785.344 620.672 785.344z" p-id="8793"></path></svg>'; // 节点icon

var nodeIconList = [{
  name: '优先级图标',
  type: 'priority',
  list: [{
    name: '1',
    icon: "<svg viewBox=\"0 0 1024 1024\"><path d=\"M512.042667 1024C229.248 1024 0 794.794667 0 511.957333 0 229.205333 229.248 0 512.042667 0 794.752 0 1024 229.205333 1024 511.957333 1024 794.794667 794.752 1024 512.042667 1024z\" fill=\"#E93B30\"></path><path d=\"M580.309333 256h-75.52c-10.666667 29.824-30.165333 55.765333-58.709333 78.165333-28.416 22.314667-54.869333 37.418667-79.146667 45.397334v84.608a320 320 0 0 0 120.234667-70.698667v352.085333H580.266667V256z\" fill=\"#FFFFFF\"></path></svg>"
  }, {
    name: '2',
    icon: "<svg viewBox=\"0 0 1024 1024\"><path d=\"M511.957333 1024C229.248 1024 0 794.752 0 512S229.248 0 511.957333 0C794.752 0 1024 229.248 1024 512s-229.248 512-512.042667 512z\" fill=\"#FA8D2E\"></path><path d=\"M667.946667 658.602667h-185.301334c4.864-8.533333 11.178667-17.066667 19.072-25.984 7.808-8.874667 26.453333-26.837333 55.936-53.888 29.525333-27.008 49.877333-47.786667 61.226667-62.165334 16.981333-21.717333 29.44-42.453333 37.290667-62.293333 7.808-19.84 11.776-40.746667 11.776-62.677333 0-38.570667-13.738667-70.741333-41.088-96.725334C599.466667 268.928 561.706667 256 513.834667 256c-43.690667 0-80.128 11.136-109.354667 33.578667-29.098667 22.4-46.506667 59.306667-52.010667 110.805333l93.184 9.301333c1.792-27.349333 8.405333-46.890667 19.754667-58.624 11.434667-11.776 26.837333-17.664 46.165333-17.664 19.541333 0 34.858667 5.589333 45.909334 16.768 11.136 11.264 16.682667 27.221333 16.682666 48.042667 0 18.858667-6.4 37.930667-19.242666 57.258667-9.472 14.037333-35.157333 40.533333-77.098667 79.872-52.096 48.554667-87.04 87.509333-104.704 116.821333A226.688 226.688 0 0 0 341.333333 745.429333h326.613334v-86.826666z\" fill=\"#FFFFFF\"></path></svg>"
  }, {
    name: '3',
    icon: "<svg viewBox=\"0 0 1024 1024\"><path d=\"M512 0C229.248 0 0 229.248 0 512s229.248 512 512 512 512-229.248 512-512S794.752 0 512 0z\" fill=\"#2E66FA\"></path><path d=\"M627.754667 731.733333c-29.354667 25.088-66.901333 37.632-112.725334 37.632-44.928 0-81.792-11.52-110.592-34.773333-33.066667-26.538667-49.877333-64.469333-50.304-114.133333h92.16c0.426667 21.76 7.552 38.314667 21.333334 49.664 12.288 10.88 28.117333 16.341333 47.402666 16.341333 20.309333 0 36.778667-6.101333 49.322667-18.432 12.544-12.330667 18.773333-29.568 18.773333-51.797333 0-21.290667-6.229333-38.186667-18.773333-50.773334-12.544-12.501333-29.866667-18.773333-52.138667-18.773333h-13.525333v-80.042667H512c42.112 0 63.274667-21.034667 63.274667-63.146666 0-20.309333-5.888-36.096-17.706667-47.445334a60.757333 60.757333 0 0 0-43.818667-17.066666c-17.493333 0-32 5.504-43.434666 16.298666-11.562667 10.88-17.792 25.728-18.773334 44.714667H359.68c0.981333-43.946667 16.042667-78.976 45.397333-104.96 29.354667-25.941333 65.706667-39.04 109.226667-39.04 44.928 0 81.792 13.525333 110.592 40.490667 28.8 26.922667 43.306667 61.610667 43.306667 104.149333 0 48.213333-19.413333 82.688-58.154667 103.552 43.52 23.125333 65.28 61.44 65.28 114.858667 0 48.128-15.957333 85.76-47.573333 112.682666z\" fill=\"#FFFFFF\"></path></svg>"
  }, {
    name: '4',
    icon: "<svg viewBox=\"0 0 1024 1024\"><path d=\"M512.042667 1024C229.248 1024 0 794.794667 0 512.042667 0 229.205333 229.248 0 512.042667 0 794.752 0 1024 229.205333 1024 512.042667 1024 794.794667 794.752 1024 512.042667 1024z\" fill=\"#6D768D\"></path><path d=\"M600.96 256v309.802667h60.117333v81.536h-60.16v98.218666h-90.154666v-98.218666H311.466667v-81.237334L522.666667 256h78.293333zM510.72 399.104l-112.042667 166.698667h112.042667V399.104z\" fill=\"#FFFFFF\"></path></svg>"
  }, {
    name: '5',
    icon: "<svg viewBox=\"0 0 1024 1024\"><path d=\"M512.042667 1024C229.248 1024 0 794.794667 0 512.042667 0 229.205333 229.248 0 512.042667 0 794.752 0 1024 229.205333 1024 512.042667 1024 794.794667 794.752 1024 512.042667 1024z\" fill=\"#6D768D\"></path><path d=\"M470.912 343.552h175.786667V256H400.256l-47.786667 253.952 75.434667 10.837333c21.205333-23.552 45.269333-35.413333 72.021333-35.413333 21.546667 0 38.997333 7.509333 52.437334 22.4 13.312 15.018667 20.053333 37.418667 20.053333 67.328 0 31.872-6.741333 55.765333-20.181333 71.552-13.397333 15.872-29.866667 23.765333-49.237334 23.765333-17.066667 0-32.085333-6.186667-45.013333-18.432-13.013333-12.373333-20.821333-29.013333-23.466667-50.133333L341.333333 611.498667c5.546667 40.874667 22.485333 73.429333 50.730667 97.621333 28.330667 24.32 64.938667 36.437333 109.866667 36.437333 56.149333 0 100.053333-21.546667 131.754666-64.554666a176.64 176.64 0 0 0 34.816-107.52c0-48.042667-14.378667-87.210667-43.221333-117.333334-28.8-30.208-63.957333-45.312-105.514667-45.312-21.674667 0-42.922667 5.248-63.829333 15.616l14.976-82.901333z\" fill=\"#FFFFFF\"></path></svg>"
  }, {
    name: '6',
    icon: "<svg viewBox=\"0 0 1024 1024\"><path d=\"M512 1024C229.248 1024 0 794.794667 0 512.042667 0 229.205333 229.248 0 512 0c282.88 0 512 229.205333 512 512.042667C1024 794.794667 794.88 1024 512 1024z\" fill=\"#6D768D\"></path><path d=\"M519.210667 256c36.992 0 67.626667 10.368 91.776 31.189333 24.192 20.821333 39.68 51.029333 46.293333 90.709334l-90.197333 9.984c-2.176-18.56-7.978667-32.298667-17.28-41.173334-9.258667-8.874667-21.418667-13.226667-36.224-13.226666-19.754667 0-36.437333 8.789333-50.048 26.453333-13.696 17.664-22.314667 54.613333-25.856 110.549333 23.296-27.52 52.138667-41.258667 86.656-41.258666 38.997333 0 72.362667 14.805333 100.181333 44.544 27.733333 29.696 41.685333 68.010667 41.685333 114.858666 0 49.877333-14.634667 89.856-43.818666 119.936-29.226667 30.208-66.730667 45.226667-112.554667 45.226667-49.066667 0-89.429333-19.072-121.130667-57.344C357.12 658.218667 341.333333 595.541333 341.333333 508.416c0-89.344 16.469333-153.813333 49.493334-193.194667C423.722667 275.754667 466.56 256 519.168 256z m-9.472 241.834667c-17.962667 0-33.066667 6.997333-45.525334 21.12-12.330667 14.037333-18.56 34.858667-18.56 62.293333 0 30.421333 6.912 53.76 20.906667 70.4 13.952 16.469333 29.866667 24.746667 47.786667 24.746667 17.28 0 31.701333-6.826667 43.178666-20.309334 11.52-13.525333 17.237333-35.669333 17.237334-66.56 0-31.658667-6.186667-54.869333-18.517334-69.546666a58.197333 58.197333 0 0 0-46.506666-22.144z\" fill=\"#FFFFFF\"></path></svg>"
  }, {
    name: '7',
    icon: "<svg viewBox=\"0 0 1024 1024\"><path d=\"M512.042667 1024C229.248 1024 0 794.752 0 512S229.248 0 512.042667 0C794.752 0 1024 229.248 1024 512s-229.248 512-511.957333 512z\" fill=\"#6D768D\"></path><path d=\"M673.024 273.066667H354.133333v86.869333h212.224a691.2 691.2 0 0 0-104.746666 187.989333c-26.026667 70.101333-39.978667 138.88-41.429334 206.293334h89.6c-0.298667-42.922667 6.698667-91.776 21.034667-146.474667a654.72 654.72 0 0 1 62.08-154.965333c27.136-48.554667 53.888-85.76 80.128-111.701334V273.066667z\" fill=\"#FFFFFF\"></path></svg>"
  }, {
    name: '8',
    icon: "<svg viewBox=\"0 0 1024 1024\"><path d=\"M512 1024C229.248 1024 0 794.752 0 512S229.248 0 512 0s512 229.248 512 512-229.248 512-512 512z\" fill=\"#6D768D\"></path><path d=\"M512.426667 256c46.208 0 82.048 11.861333 107.605333 35.541333 25.6 23.68 38.314667 53.674667 38.314667 89.898667 0 22.613333-5.802667 42.666667-17.578667 60.330667a111.445333 111.445333 0 0 1-49.450667 40.277333c26.965333 10.837333 47.36 26.752 61.312 47.658667 13.994667 20.906667 21.034667 45.013333 21.034667 72.362666 0 45.098667-14.336 81.834667-42.965333 109.952-28.586667 28.245333-66.602667 42.368-114.090667 42.368-44.245333 0-81.066667-11.648-110.464-34.986666-34.645333-27.52-52.010667-65.28-52.010667-113.365334 0-26.368 6.528-50.645333 19.626667-72.746666 13.056-22.144 33.578667-39.210667 61.696-51.242667-24.064-10.154667-41.557333-24.192-52.48-41.941333a109.824 109.824 0 0 1-16.512-58.666667c0-36.224 12.757333-66.218667 37.973333-89.898667 25.386667-23.68 61.354667-35.541333 108.032-35.541333z m1.28 265.429333c-22.784 0-39.722667 7.978667-50.901334 23.893334-11.136 15.786667-16.64 33.066667-16.64 51.498666 0 25.984 6.485333 46.208 19.712 60.714667 13.098667 14.506667 29.525333 21.802667 49.152 21.802667 19.242667 0 35.157333-6.997333 47.786667-20.992 12.629333-13.909333 18.858667-34.048 18.858667-60.416 0-23.082667-6.314667-41.557333-19.2-55.466667a63.274667 63.274667 0 0 0-48.725334-21.034667z m-0.341334-191.488c-17.792 0-32 5.333333-42.581333 16-10.538667 10.666667-15.872 24.746667-15.872 42.325334 0 18.645333 5.248 33.152 15.701333 43.648 10.453333 10.453333 24.362667 15.658667 41.770667 15.658666 17.664 0 31.658667-5.290667 42.24-15.872 10.538667-10.581333 15.872-25.173333 15.872-43.818666 0-17.493333-5.248-31.573333-15.701333-42.154667s-24.277333-15.786667-41.429334-15.786667z\" fill=\"#FFFFFF\"></path></svg>"
  }, {
    name: '9',
    icon: "<svg viewBox=\"0 0 1024 1024\"><path d=\"M512 1024C229.248 1024 0 794.794667 0 512.042667 0 229.333333 229.248 0 512 0c282.88 0 512 229.333333 512 512.042667C1024 794.794667 794.88 1024 512 1024z\" fill=\"#6D768D\"></path><path d=\"M497.28 256c49.365333 0 89.856 19.157333 121.429333 57.429333 31.701333 38.229333 47.488 101.205333 47.488 188.842667 0 89.173333-16.384 153.386667-49.365333 192.853333-32.853333 39.594667-75.605333 59.264-128.426667 59.264-37.888 0-68.608-10.154667-91.989333-30.506666s-38.4-50.816-45.013333-91.306667l90.112-9.984c2.261333 18.474667 8.021333 32.085333 17.28 41.088 9.173333 8.874667 21.418667 13.312 36.608 13.312 19.2 0 35.541333-8.874667 48.981333-26.752 13.44-17.749333 22.016-54.613333 25.770667-110.549333-23.466667 27.264-52.821333 40.874667-88.064 40.874666-38.314667 0-71.253333-14.72-99.114667-44.330666C355.242667 506.709333 341.333333 468.224 341.333333 420.864c0-49.493333 14.592-89.258667 43.946667-119.466667C414.549333 271.104 451.925333 256 497.237333 256z m-4.352 77.482667c-17.237333 0-31.658667 6.826667-43.008 20.437333-11.477333 13.653333-17.194667 35.84-17.194667 66.816 0 31.402667 6.229333 54.485333 18.645334 69.205333 12.458667 14.72 27.946667 22.101333 46.592 22.101334 18.005333 0 33.066667-7.082667 45.44-21.205334 12.330667-14.208 18.432-35.029333 18.432-62.506666 0-29.994667-6.912-53.376-20.821334-69.973334-13.824-16.597333-29.866667-24.874667-48.085333-24.874666z\" fill=\"#FFFFFF\"></path></svg>"
  }, {
    name: '10',
    icon: "<svg viewBox=\"0 0 1024 1024\"><path d=\"M512.042667 1024C229.248 1024 0 794.794667 0 511.957333 0 229.205333 229.248 0 512.042667 0 794.752 0 1024 229.205333 1024 511.957333 1024 794.794667 794.752 1024 512.042667 1024z\" fill=\"#6D768D\"></path><path d=\"M619.946667 273.066667c46.976 0 83.754667 16.042667 110.250666 48.042666 31.573333 37.973333 47.36 100.864 47.36 188.672 0 87.722667-15.829333 150.698667-47.658666 189.056-26.325333 31.616-62.976 47.36-109.952 47.36-47.274667 0-85.418667-17.237333-114.346667-51.968-28.885333-34.602667-43.392-96.426667-43.392-185.386666 0-87.168 15.872-150.016 47.701333-188.416 26.282667-31.488 62.933333-47.36 110.037334-47.36z m-207.488 12.8v452.266666H325.504V411.690667A299.904 299.904 0 0 1 213.333333 476.373333V398.933333c22.656-7.296 47.36-21.12 73.856-41.514666 26.624-20.522667 44.842667-44.288 54.784-71.552h70.485334z m207.488 60.842666c-11.306667 0-21.461333 3.413333-30.336 10.24-8.874667 6.826667-15.786667 19.157333-20.693334 36.864-6.4 22.997333-9.642667 61.653333-9.642666 115.968 0 54.442667 2.944 91.733333 8.661333 112.128 5.802667 20.352 13.098667 33.877333 21.845333 40.618667 8.789333 6.741333 18.858667 10.154667 30.165334 10.154667 11.349333 0 21.376-3.498667 30.250666-10.325334 8.874667-6.826667 15.786667-19.157333 20.693334-36.778666 6.4-22.826667 9.642667-61.354667 9.642666-115.797334 0-54.314667-2.858667-91.648-8.661333-112.042666-5.802667-20.352-13.013333-33.962667-21.76-40.789334a47.616 47.616 0 0 0-30.165333-10.24z\" fill=\"#FFFFFF\"></path></svg>"
  }]
}, {
  name: '进度图标',
  type: 'progress',
  list: [{
    name: '1',
    icon: "<svg viewBox=\"0 0 1024 1024\"><path d=\"M512 0C229.248 0 0 229.248 0 512s229.248 512 512 512 512-229.248 512-512S794.752 0 512 0z\" fill=\"#12BB37\"></path><path d=\"M512 928c-229.76 0-416-186.24-416-416S282.24 96 512 96V512l294.144-294.144A414.72 414.72 0 0 1 928 512c0 229.76-186.24 416-416 416z\" fill=\"#FFFFFF\"></path></svg>"
  }, {
    name: '2',
    icon: "<svg viewBox=\"0 0 1024 1024\"><path d=\"M512 0C229.248 0 0 229.248 0 512s229.248 512 512 512 512-229.248 512-512S794.752 0 512 0z\" fill=\"#12BB37\"></path><path d=\"M512 928c-229.76 0-416-186.24-416-416S282.24 96 512 96V512h416c0 229.76-186.24 416-416 416z\" fill=\"#FFFFFF\"></path></svg>"
  }, {
    name: '3',
    icon: "<svg viewBox=\"0 0 1024 1024\"><path d=\"M512 0C229.248 0 0 229.248 0 512s229.248 512 512 512 512-229.248 512-512S794.752 0 512 0z\" fill=\"#12BB37\"></path><path d=\"M512 928c-229.76 0-416-186.24-416-416S282.24 96 512 96V512l294.144 294.144A414.72 414.72 0 0 1 512 928z\" fill=\"#FFFFFF\"></path></svg>"
  }, {
    name: '4',
    icon: "<svg viewBox=\"0 0 1024 1024\"><path d=\"M512 0C229.248 0 0 229.248 0 512s229.248 512 512 512 512-229.248 512-512S794.752 0 512 0z\" fill=\"#12BB37\"></path><path d=\"M512 928c-229.76 0-416-186.24-416-416S282.24 96 512 96v832z\" fill=\"#FFFFFF\"></path></svg>"
  }, {
    name: '5',
    icon: "<svg viewBox=\"0 0 1024 1024\"><path d=\"M512 0C229.248 0 0 229.248 0 512s229.248 512 512 512 512-229.248 512-512S794.752 0 512 0z\" fill=\"#12BB37\"></path><path d=\"M512 512l-294.144 294.144A414.72 414.72 0 0 1 96 512c0-229.76 186.24-416 416-416V512z\" fill=\"#FFFFFF\"></path></svg>"
  }, {
    name: '6',
    icon: "<svg viewBox=\"0 0 1024 1024\"><path d=\"M512 0C229.248 0 0 229.248 0 512s229.248 512 512 512 512-229.248 512-512S794.752 0 512 0z\" fill=\"#12BB37\"></path><path d=\"M512 512H96c0-229.76 186.24-416 416-416V512z\" fill=\"#FFFFFF\"></path></svg>"
  }, {
    name: '7',
    icon: "<svg viewBox=\"0 0 1024 1024\"><path d=\"M512 0C229.248 0 0 229.248 0 512s229.248 512 512 512 512-229.248 512-512S794.752 0 512 0z\" fill=\"#12BB37\"></path><path d=\"M512 512L217.856 217.856A414.72 414.72 0 0 1 512 96V512z\" fill=\"#FFFFFF\"></path></svg>"
  }, {
    name: '8',
    icon: "<svg viewBox=\"0 0 1024 1024\"><path d=\"M0 512c0 282.752 229.248 512 512 512s512-229.248 512-512S794.752 0 512 0 0 229.248 0 512z\" fill=\"#12BB37\"></path><path d=\"M716.629333 341.333333h-51.328a35.072 35.072 0 0 0-28.330666 14.293334l-171.989334 233.984-77.909333-106.026667a35.2 35.2 0 0 0-28.330667-14.293333H307.413333c-7.082667 0-11.264 7.936-7.082666 13.653333l136.32 185.472a35.2 35.2 0 0 0 56.533333 0l230.4-313.429333a8.533333 8.533333 0 0 0-6.954667-13.653334z\" fill=\"#FFFFFF\"></path></svg>"
  }]
}, {
  name: '表情图标',
  type: 'expression',
  list: [{
    name: '1',
    icon: "<svg t=\"1624457751393\" class=\"icon\" viewBox=\"0 0 1026 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"12255\"><path d=\"M1.097856 1.097642h1021.804717v1021.804716H1.097856z\" fill=\"#F09495\" p-id=\"12256\"></path><path d=\"M1024.000214 1024H0.000214V0h1024v1024z m-1021.804716-2.195284h1019.609433V2.195284H2.195498v1019.609432z\" fill=\"#FFFFFF\" p-id=\"12257\"></path><path d=\"M234.695985 335.179887m-27.341259 0a27.341259 27.341259 0 1 0 54.682518 0 27.341259 27.341259 0 1 0-54.682518 0Z\" fill=\"#040000\" p-id=\"12258\"></path><path d=\"M234.695985 363.519002c-15.666342 0-28.339115-12.772559-28.339115-28.339115 0-15.666342 12.772559-28.339115 28.339115-28.339115s28.339115 12.772559 28.339115 28.339115c0.099786 15.666342-12.672773 28.339115-28.339115 28.339115z m0-54.582732c-14.468914 0-26.243617 11.774703-26.243617 26.243617s11.774703 26.243617 26.243617 26.243617 26.243617-11.774703 26.243617-26.243617-11.774703-26.243617-26.243617-26.243617z\" fill=\"#FFFFFF\" p-id=\"12259\"></path><path d=\"M776.232528 335.179887m-27.341259 0a27.341259 27.341259 0 1 0 54.682518 0 27.341259 27.341259 0 1 0-54.682518 0Z\" fill=\"#040000\" p-id=\"12260\"></path><path d=\"M776.232528 363.519002c-15.666342 0-28.339115-12.772559-28.339115-28.339115 0-15.666342 12.772559-28.339115 28.339115-28.339115 15.666342 0 28.339115 12.772559 28.339115 28.339115 0 15.666342-12.772559 28.339115-28.339115 28.339115z m0-54.582732c-14.468914 0-26.243617 11.774703-26.243617 26.243617s11.774703 26.243617 26.243617 26.243617 26.243617-11.774703 26.243617-26.243617c-0.099786-14.468914-11.874488-26.243617-26.243617-26.243617z\" fill=\"#FFFFFF\" p-id=\"12261\"></path><path d=\"M512.000214 671.656987c-52.58702 0-105.872539-17.961411-105.872539-52.387449S459.413194 566.882089 512.000214 566.882089s105.872539 17.961411 105.87254 52.387449S564.587234 671.656987 512.000214 671.656987z m0-74.240499c-21.952836 0-43.207172 3.592282-58.2748 9.77899-13.870201 5.68778-17.06334 11.275775-17.06334 12.07406s3.19314 6.386279 17.06334 12.07406c15.067628 6.186708 36.321965 9.77899 58.2748 9.77899s43.207172-3.592282 58.274801-9.77899c13.870201-5.68778 17.06334-11.275775 17.06334-12.07406s-3.19314-6.386279-17.06334-12.07406c-15.067628-6.286494-36.321965-9.77899-58.274801-9.77899z\" fill=\"#040000\" p-id=\"12262\"></path></svg>"
  }, {
    name: '2',
    icon: "<svg t=\"1624457767572\" class=\"icon\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"1048\"><path d=\"M0 0h1024v1024H0z\" fill=\"#E6A6C9\" p-id=\"1049\"></path><path d=\"M315.1 368.1c-23.9 0-43.3-19.4-43.3-43.3s19.4-43.3 43.3-43.3 43.3 19.4 43.3 43.3-19.4 43.3-43.3 43.3z m0-74.7c-17.3 0-31.3 14.1-31.3 31.3 0 17.3 14.1 31.3 31.3 31.3 17.3 0 31.3-14.1 31.3-31.3 0-17.2-14-31.3-31.3-31.3zM738.7 368.1c-23.9 0-43.3-19.4-43.3-43.3s19.4-43.3 43.3-43.3 43.3 19.4 43.3 43.3-19.4 43.3-43.3 43.3z m0-74.7c-17.3 0-31.3 14.1-31.3 31.3 0 17.3 14.1 31.3 31.3 31.3 17.3 0 31.3-14.1 31.3-31.3 0-17.2-14-31.3-31.3-31.3zM293.5 698.8l-14.5-1.3c0.1-0.6 1.5-14.6 15.1-27.9 17.2-16.7 45-24.8 82.7-24 4.9-0.1 10.9-10.5 16.1-19.6 8.4-14.7 19-33.1 37.9-34.3 19.4-1.2 42.2 16.4 71.5 55.4 9.9 5.2 16.5 11.2 21.8 16.1 8.4 7.7 13.1 11.9 25.1 10.8 14.9-1.4 38.9-11.1 77.5-31.4 26.8-28.4 56.4-41.4 83.5-36.6 27.9 4.9 50.6 27.6 67.5 67.5l-13.4 5.7c-14.7-34.5-34.3-54.9-56.7-58.8-22.3-3.9-47.6 7.8-71.2 33.1l-0.8 0.9-1.1 0.6c-85.6 45.1-99.4 38-120.2 19.1-5.5-5-11.2-10.2-20.1-14.7l-1.5-0.8-1-1.4c-32.2-43.2-50.4-51.6-60-51-11.1 0.7-18.8 14-26.2 27-7.6 13.2-15.4 26.9-28.8 26.9h-0.2c-78.4-1.6-83 38.3-83 38.7z\" fill=\"#040000\" p-id=\"1050\"></path></svg>"
  }, {
    name: '3',
    icon: "<svg t=\"1624457776082\" class=\"icon\" viewBox=\"0 0 1026 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"1204\" ><path d=\"M1.1 1.097642h1021.804716v1021.804716H1.1z\" fill=\"#F7E983\" p-id=\"1205\"></path><path d=\"M1024.002358 1024H0.002358V0h1024v1024z m-1021.804716-2.195284h1019.609433V2.195284H2.197642v1019.609432z\" fill=\"#FFFFFF\" p-id=\"1206\"></path><path d=\"M329.174412 344.491728a38.118106 10.277919 57.6 1 0 17.355867-11.014369 38.118106 10.277919 57.6 1 0-17.355867 11.014369Z\" fill=\"#040000\" p-id=\"1207\"></path><path d=\"M644.769475 355.956059a11.175989 36.321965 30 1 0 36.321965-62.911488 11.175989 36.321965 30 1 0-36.321965 62.911488Z\" fill=\"#040000\" p-id=\"1208\"></path><path d=\"M569.678445 671.158059c-26.343403 0-51.190021-5.288638-70.049503-14.967843-20.755408-10.577275-32.230754-25.445332-32.230755-41.710388 0-16.265056 11.475346-31.133112 32.230755-41.710387 18.859482-9.579419 43.805886-14.967843 70.049503-14.967843s51.190021 5.288638 70.049503 14.967843c20.755408 10.577275 32.230754 25.445332 32.230754 41.710387 0 16.265056-11.475346 31.133112-32.230754 41.710388-18.859482 9.679205-43.805886 14.967843-70.049503 14.967843z m0-95.095693c-49.693237 0-84.318846 20.356266-84.318846 38.517248s34.625609 38.517248 84.318846 38.517248 84.318846-20.356266 84.318846-38.517248-34.725395-38.517248-84.318846-38.517248z\" fill=\"#040000\" p-id=\"1209\"></path></svg>"
  }, {
    name: '4',
    icon: "<svg t=\"1624457781889\" class=\"icon\" viewBox=\"0 0 1026 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"1363\" ><path d=\"M1.1 1.097642h1021.804716v1021.804716H1.1z\" fill=\"#A6D9E2\" p-id=\"1364\"></path><path d=\"M1024.002358 1024H0.002358V0h1024v1024z m-1021.804716-2.195284h1019.609433V2.195284H2.197642v1019.609432z\" fill=\"#FFFFFF\" p-id=\"1365\"></path><path d=\"M376.194134 348.950302m-23.44962 0a23.44962 23.44962 0 1 0 46.89924 0 23.44962 23.44962 0 1 0-46.89924 0Z\" fill=\"#040000\" p-id=\"1366\"></path><path d=\"M629.150672 348.950302m-24.647047 0a24.647047 24.647047 0 1 0 49.294095 0 24.647047 24.647047 0 1 0-49.294095 0Z\" fill=\"#040000\" p-id=\"1367\"></path><path d=\"M397.847613 603.503411c13.471058 8.282206 28.738258 14.468914 43.7061 19.458195 29.835899 9.978562 62.266225 14.169558 93.299551 7.483921 21.054765-4.490353 40.213604-14.369129 56.778016-28.039758 6.785422-5.587995-2.893783-15.167414-9.579419-9.579419-46.999026 38.916391-112.258819 31.033327-163.847983 6.086922-4.590138-2.195284-9.080491-4.490353-13.371272-7.184564-7.583707-4.590138-14.468914 7.184564-6.984993 11.774703z\" fill=\"#040000\" p-id=\"1368\"></path><path d=\"M627.753674 534.052621c-31.033327 24.048334-58.474371 68.253362-37.419607 106.970182 10.577275 19.35841 29.835899 32.629897 48.795167 42.708244 7.982849 4.190996 15.067628-7.883064 7.084779-12.07406-25.245761-13.271487-53.485091-35.324108-49.094524-66.557006 2.793997-20.156695 15.766127-37.319821 29.736114-51.190022 3.392711-3.392711 6.984993-6.785422 10.776847-9.77899 2.993569-2.295069 2.394855-7.483921 0-9.878776-2.893783-3.19314-6.885208-2.49464-9.878776-0.199572z\" fill=\"#040000\" p-id=\"1369\"></path></svg>"
  }, {
    name: '5',
    icon: "<svg t=\"1624457787809\" class=\"icon\" viewBox=\"0 0 1026 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"1523\" ><path d=\"M1.1 1.097642h1021.804716v1021.804716H1.1z\" fill=\"#AD6F59\" p-id=\"1524\"></path><path d=\"M1024.002358 1024H0.002358V0h1024v1024z m-1021.804716-2.195284h1019.609433V2.195284H2.197642v1019.609432z\" fill=\"#FFFFFF\" p-id=\"1525\"></path><path d=\"M411.829832 330.730879a38.118106 10.277919 57.6 1 0 17.355867-11.014368 38.118106 10.277919 57.6 1 0-17.355867 11.014368Z\" fill=\"#040000\" p-id=\"1526\"></path><path d=\"M480.669675 609.989476c11.774703-25.844475 27.740401-51.788735 44.60417-73.342429 13.770415-17.462483 29.237186-33.92711 47.897096-44.803742 17.262912-10.078347 35.324108-13.67063 54.283376-6.58585 11.974274 4.390567 23.948548 14.468914 33.128825 24.547261 14.369129 15.865913 25.145975 34.625609 34.725394 53.684662 4.290782 8.581563 17.262912 0.997856 12.972131-7.583707-15.167414-30.334828-35.224323-63.763009-66.157864-80.327421-21.054765-11.37556-44.504385-11.475346-66.157864-1.895927-21.054765 9.280062-38.617034 25.644904-53.485091 42.907815-14.468914 16.863769-27.041902 35.324108-38.217891 54.582733-5.887351 10.178133-11.674917 20.555837-16.464627 31.232898-1.696355 3.692068-0.997856 7.982849 2.694212 10.277918 3.19314 1.895927 8.581563 0.898071 10.178133-2.694211z\" fill=\"#040000\" p-id=\"1527\"></path><path d=\"M663.863649 338.091735a14.468914 33.727538 30 1 0 33.727538-58.417811 14.468914 33.727538 30 1 0-33.727538 58.417811Z\" fill=\"#040000\" p-id=\"1528\"></path></svg>"
  }, {
    name: '6',
    icon: "<svg t=\"1624457794933\" class=\"icon\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"1680\" ><path d=\"M762.9 77.4H261.1L10.2 512l250.9 434.6h501.8L1013.8 512z\" fill=\"#83CEE3\" p-id=\"1681\"></path><path d=\"M369 375.8m-34.6 0a34.6 34.6 0 1 0 69.2 0 34.6 34.6 0 1 0-69.2 0Z\" fill=\"#040000\" p-id=\"1682\"></path><path d=\"M369 411.7c-19.8 0-36-16.1-36-36s16.1-36 36-36 36 16.1 36 36-16.1 36-36 36z m0-69.1c-18.3 0-33.2 14.9-33.2 33.2S350.7 409 369 409s33.2-14.9 33.2-33.2-14.9-33.2-33.2-33.2z\" fill=\"#FFFFFF\" p-id=\"1683\"></path><path d=\"M672.2 333.6c-15.1 7.6-30.2 15.6-44.3 25-5.9 3.9-17 10.4-14.6 19.1 1.8 6.5 12 11.2 17.3 14.3 15.7 9.3 32.1 17.6 48.3 25.9 8.6 4.4 16.2-8.5 7.6-13-14.1-7.3-28.3-14.5-42.1-22.3-3.9-2.2-7.9-4.5-11.7-6.9-1.2-0.8-2.4-1.5-3.5-2.4-0.6-0.4-1.1-0.8-1.6-1.2 2.2 1.7-0.3-0.3-0.3-0.3-0.9 0.1-1.5-3.2-0.2 0.5 0.9 2.4 1.1 3.8 0.3 5.8 0.6-1.5-0.9 0.8-0.1 0 0.5-0.5 1-1.1 1.6-1.6 0.5-0.5 1-0.9 1.6-1.3 0.6-0.5 0 0 1.2-0.9 1.7-1.3 3.5-2.5 5.3-3.6 8.4-5.5 17.2-10.4 26-15.2 5.6-3 11.2-6 16.8-8.9 8.6-4.4 1-17.3-7.6-13zM578.2 720.9c-12.5-96.7-33.3-154.7-55.6-155.6-8.8 3.9-22.3 17.5-37.7 60.1-10.8 29.8-18.4 62.2-23 81.6-1.2 5.1-2.1 9.1-2.9 11.8l-9.3-2.4c0.7-2.6 1.6-6.6 2.8-11.6 14.9-63 36-136.8 67.5-148.8l0.8-0.3h0.8c18.2-0.4 33.2 19.5 45.8 60.8 10.2 33.3 16.7 74.6 20.5 103.3l-9.7 1.1z\" fill=\"#040000\" p-id=\"1684\"></path></svg>"
  }, {
    name: '7',
    icon: "<svg t=\"1624457802025\" class=\"icon\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"1838\" ><path d=\"M762.9 77.4H261.1L10.2 512l250.9 434.6h501.8L1013.8 512z\" fill=\"#8CC66D\" p-id=\"1839\"></path><path d=\"M375.778679 404.47473a14.5 33.8 30 1 0 33.8-58.543317 14.5 33.8 30 1 0-33.8 58.543317Z\" fill=\"#040000\" p-id=\"1840\"></path><path d=\"M627.220263 374.211388a43.1 11.6 57.6 1 0 19.588408-12.431182 43.1 11.6 57.6 1 0-19.588408 12.431182Z\" fill=\"#040000\" p-id=\"1841\"></path><path d=\"M451.1 548.5c17.6-9.3 63.9-30 105.3-16.2 17 20.3 32.7 98.8 28.8 138.1-27.5 10.2-82.5 10.2-106.1 5.8-8.3-10.5-32.7-81.8-35.3-114.6-0.4-5.5 2.5-10.6 7.3-13.1z\" fill=\"#040000\" p-id=\"1842\"></path></svg>"
  }, {
    name: '8',
    icon: "<svg t=\"1624457816632\" class=\"icon\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"1996\" ><path d=\"M762.9 77.4H261.1L10.2 512l250.9 434.6h501.8L1013.8 512z\" fill=\"#5A74B8\" p-id=\"1997\"></path><path d=\"M357.7 400m-34.6 0a34.6 34.6 0 1 0 69.2 0 34.6 34.6 0 1 0-69.2 0Z\" fill=\"#040000\" p-id=\"1998\"></path><path d=\"M357.7 436c-19.8 0-36-16.1-36-36s16.1-36 36-36 36 16.1 36 36-16.2 36-36 36z m0-69.2c-18.3 0-33.2 14.9-33.2 33.2s14.9 33.2 33.2 33.2 33.2-14.9 33.2-33.2-14.9-33.2-33.2-33.2z\" fill=\"#FFFFFF\" p-id=\"1999\"></path><path d=\"M676 400m-34.6 0a34.6 34.6 0 1 0 69.2 0 34.6 34.6 0 1 0-69.2 0Z\" fill=\"#040000\" p-id=\"2000\"></path><path d=\"M676 436c-19.8 0-36-16.1-36-36s16.1-36 36-36 36 16.1 36 36-16.2 36-36 36z m0-69.2c-18.3 0-33.2 14.9-33.2 33.2s14.9 33.2 33.2 33.2c18.3 0 33.2-14.9 33.2-33.2s-14.9-33.2-33.2-33.2z\" fill=\"#FFFFFF\" p-id=\"2001\"></path><path d=\"M347.6 684.1c0.3-0.9 0.6-1.7 0.9-2.6 0.2-0.5 1.4-3.2 0.3-0.8 0.6-1.4 1.3-2.9 2-4.3 3.2-6.3 6-10.7 10.9-15.3 4.3-4 10.8-7.5 17.1-6.1 3.9 0.9 7.9 4.9 11.1 7.2 3.1 2.2 6.3 4.5 9.7 6.2 7.5 3.8 15.3 4.4 23.4 1.9 4.7-1.5 9.2-3.6 13.6-5.9 5-2.6 10.7-5 14.2-9.5 4.5-5.7 6.1-8.5 11.4-14.1 1-1 2-2 3.1-3 0.2-0.2 2.2-1.7 0.6-0.5 0.6-0.4 1.2-0.9 1.8-1.3 1-0.6 2.1-1.3 3.2-1.7-2 0.8 0.2 0 0.6-0.1 2.3-0.7-0.3-0.2 1.2-0.3 2.8-0.1 3.6 0 5.5 1 3.8 1.9 6.6 4.7 9.5 7.8 4.5 5 7.5 11.1 11.7 16.2 1.8 2.2 3.7 4.3 5.4 6.5 8.1 10.3 17.7 22.2 32.2 22 8.8-0.1 16.6-5.2 22.6-11.2 4.2-4.1 7.7-8.9 11-13.7 2.9-4.2 4.6-9.9 6.2-13.5 3.2-7.1 7.2-13.1 13-18.1 4.8-4.2 11.1-6.5 16.7-5.3 10.5 2.4 17.2 12.1 23.1 20.2 4.7 6.5 9.8 13 16 18.2 7.8 6.4 17.1 11.4 27.5 11.1 14.1-0.4 25.5-9.5 34.2-19.9 3-3.6 3.6-8.8 0-12.4-3.1-3.1-9.4-3.7-12.4 0-6.3 7.6-14.7 15.9-24.9 14.7-2.2-0.3-5.3-1.5-7.9-3.1-3.5-2.1-6.1-4.4-9.1-7.5-4.9-5.1-6.8-8.1-10.9-13.8-7.3-10.1-16.1-19.6-28.2-23.7-18.5-6.3-35.7 5.6-46 20.1-2.4 3.3-4.4 6.9-6.1 10.6-1.8 3.9-2.7 8.5-5.2 11.9-3.1 4.4-6.2 8.8-10.2 12.5-3 2.8-5.7 4.4-8.6 5.1-0.4 0.1-1.7 0.1 0.1 0h-2.2c2.1 0.1 0 0-0.5-0.1-0.7-0.2-1.4-0.4-2-0.6 1.8 0.7-1.8-1.1-2.4-1.5l-1.2-0.9c1.5 1.2-0.9-0.9-1.2-1.1-4.7-4.3-8.4-9.5-12.3-14.4-10.9-13.6-20.9-34-41-34.9-14.2-0.6-24.5 10.6-32.4 20.8-1.2 1.6-2.5 3.2-3.7 4.8-1.5 1.9 1.1-1.4-0.4 0.5-0.4 0.5-0.8 1.2-1.3 1.6-1.7 1.4-4.6 2.6-6.6 3.6-2.9 1.6-5.9 3.2-9 4.5-1.6 0.7-3.4 1.2-5.1 1.7-2.2 0.6-0.7 0.5-2.8 0.4-2.8 0-3.9-0.4-6.6-1.9-3.9-2.2-7.5-4.9-11.1-7.5-5.6-4-10-6.9-17-7.5-10.5-0.9-20.3 3.2-28.2 9.9-9.4 8.1-16.4 20.2-20.1 32-3.6 11.2 13.3 15.8 16.8 5.1z\" fill=\"#040000\" p-id=\"2002\"></path></svg>"
  }, {
    name: '9',
    icon: "<svg t=\"1624457826949\" class=\"icon\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"2156\" ><path d=\"M762.9 77.4H261.1L10.2 512l250.9 434.6h501.8L1013.8 512z\" fill=\"#F0884F\" p-id=\"2157\"></path><path d=\"M287.2 382c6.4 2.3 11.6-3.7 15.4-7.9 5.1-5.5 10.2-11 16-15.9 0.8-0.7 1.7-1.4 2.5-2.1 1.2-0.9-1.7 1.3 0.2-0.2l1.2-0.9c2.1-1.5 4.3-2.9 6.5-4.3 2-1.2 4-2.2 6.1-3.2 0.6-0.3 1.2-0.6 1.9-0.9-0.3 0.2-1.5 0.6 0.2-0.1 1.3-0.5 2.6-1 4-1.5 11.2-3.7 21.8-4 33.4-1.1 19.5 4.9 36.4 17 51.2 30.2 8.6 7.7 21.4-5 12.7-12.7-25.2-22.6-57.1-42.1-92.2-36.2-20.4 3.4-37.7 16.1-51.6 30.9-2.3 2.4-4.5 5-6.8 7.4-0.7 0.7-1.9 1.5-2.4 2.4-0.5 0.8 2.3-1.5 0.8-0.7 1.3-0.7 3.9-1.4 5.8-0.7-11.1-3.7-15.8 13.7-4.9 17.5zM598 382c6.4 2.3 11.6-3.7 15.4-7.9 5.1-5.5 10.2-11 16-15.9 0.8-0.7 1.7-1.4 2.5-2.1 1.2-0.9-1.7 1.3 0.2-0.2l1.2-0.9c2.1-1.5 4.3-2.9 6.5-4.3 2-1.2 4-2.2 6.1-3.2 0.6-0.3 1.2-0.6 1.9-0.9-0.3 0.2-1.5 0.6 0.2-0.1 1.3-0.5 2.6-1 4-1.5 11.2-3.7 21.8-4 33.4-1.1 19.5 4.9 36.4 17 51.2 30.2 8.6 7.7 21.4-5 12.7-12.7-25.2-22.6-57.1-42.1-92.2-36.2-20.4 3.4-37.7 16.1-51.6 30.9-2.3 2.4-4.5 5-6.8 7.4-0.7 0.7-1.9 1.5-2.4 2.4-0.5 0.8 2.3-1.5 0.8-0.7 1.3-0.7 3.9-1.4 5.8-0.7-11.1-3.7-15.8 13.7-4.9 17.5zM505.9 527.1c3.4 0.7 6.8 1.7 10.2 2.8 6.7 2.2 10.4 3.5 16.6 7.7 1.6 1.1-0.5-0.5 0.6 0.5 0.6 0.5 1.1 1.1 1.7 1.6 1.5 1.4-0.1-0.4 0.5 0.6 0.4 0.6 0.7 1.2 1 1.8-1-2 0.1 0 0 0.5 0.1-2-0.1 0-0.1 0-0.1 0.8 0 0.7 0.1-0.5-0.1 0.4-0.1 0.7-0.3 1.1-0.6 1 0.7-0.9-0.4 1-1.6 2.5-4.6 5.4-8.1 7.8-6.8 4.6-14.4 8.2-22 11.4-7 3-7.4 11.9 0 14.8 7.4 2.8 15 5.3 22.4 8.1 3.1 1.1 4.2 1.5 6.9 2.9 1.1 0.6 2.1 1.2 3.2 1.8 1.2 0.8-0.7-0.5 0.1 0 0.4 0.3 0.8 0.7 1.1 1.1 0.6 0.8-1.1-1.2-0.2-0.2 0.8 0.9-0.3-1.4-0.1-0.2 0.1 0.9 0.2-1.9 0-0.9-0.1 0.5-0.8 1.8 0 0.2-0.2 0.5-0.5 1-0.8 1.4-0.3 0.3-0.9 1.3-0.3 0.5-0.5 0.7-1.1 1.3-1.7 1.9-6.9 7.3-15.9 12.8-24.4 18.1-8.3 5.3-0.6 18.5 7.7 13.2 9.9-6.3 20.9-12.8 28.6-21.8 4.8-5.5 8.1-12.9 4.2-19.9-3.4-6-10.5-8.9-16.6-11.4-8.6-3.5-17.5-6.2-26.2-9.5v14.8c14.4-6.1 47.2-18.8 41.2-40.3-3.5-12.9-19.4-18.9-30.8-22.6-3.4-1.1-6.9-2.1-10.5-2.9-9.1-2.2-13.3 12.5-3.6 14.6z\" fill=\"#040000\" p-id=\"2158\"></path></svg>"
  }, {
    name: '10',
    icon: "<svg t=\"1624457835383\" class=\"icon\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"2312\" ><path d=\"M762.9 77.4H261.1L10.2 512l250.9 434.6h501.8L1013.8 512z\" fill=\"#F6F180\" p-id=\"2313\"></path><path d=\"M342.9 400.6m-29.5 0a29.5 29.5 0 1 0 59 0 29.5 29.5 0 1 0-59 0Z\" fill=\"#040000\" p-id=\"2314\"></path><path d=\"M342.9 431.3c-16.9 0-30.7-13.8-30.7-30.7s13.8-30.7 30.7-30.7 30.7 13.8 30.7 30.7-13.7 30.7-30.7 30.7z m0-59c-15.6 0-28.3 12.7-28.3 28.3s12.7 28.3 28.3 28.3 28.3-12.7 28.3-28.3-12.6-28.3-28.3-28.3z\" fill=\"#FFFFFF\" p-id=\"2315\"></path><path d=\"M702 400.6m-29.5 0a29.5 29.5 0 1 0 59 0 29.5 29.5 0 1 0-59 0Z\" fill=\"#040000\" p-id=\"2316\"></path><path d=\"M702 431.3c-16.9 0-30.7-13.8-30.7-30.7s13.8-30.7 30.7-30.7 30.7 13.8 30.7 30.7-13.8 30.7-30.7 30.7z m0-59c-15.6 0-28.3 12.7-28.3 28.3s12.7 28.3 28.3 28.3 28.3-12.7 28.3-28.3-12.7-28.3-28.3-28.3z\" fill=\"#FFFFFF\" p-id=\"2317\"></path><path d=\"M358.7 519.9c20 22 45.5 40.4 71.3 54.8 51.2 28.5 111.7 39.9 168 19.5 44.3-16.1 80.7-47.8 110.2-83.9 3-3.7 3.6-8.9 0-12.5-3.1-3.1-9.5-3.7-12.5 0-25.5 31.4-56.2 59.7-93.7 76-27.1 11.7-56.6 15.7-85.8 12.2-24.7-2.9-49.5-11.8-71.5-23.4-18.7-9.8-36.6-22.2-51.1-34.3-7.8-6.5-15.5-13.3-22.4-20.9-7.7-8.5-20.1 4.1-12.5 12.5z\" p-id=\"2318\"></path></svg>"
  }, {
    name: '11',
    icon: "<svg t=\"1624457841751\" class=\"icon\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"2472\" ><path d=\"M48.2 844.9c-68.5-210.6 186-782.1 409.1-795.4 6.3-0.4 12.5 0.2 18.6 1.6C665.1 94.6 985.4 515 987.1 821.3c0.1 20-12.9 37.9-22.4 43.1-162.7 89.8-605.8 179.7-884.4 30.9-15-7.9-24.2-26.1-32.1-50.4z\" fill=\"#F0884F\" p-id=\"2473\"></path><path d=\"M401 352.1m-52.4 0a52.4 52.4 0 1 0 104.8 0 52.4 52.4 0 1 0-104.8 0Z\" fill=\"#FFFFFF\" p-id=\"2474\"></path><path d=\"M408.7 329m-29.3 0a29.3 29.3 0 1 0 58.6 0 29.3 29.3 0 1 0-58.6 0Z\" fill=\"#040000\" p-id=\"2475\"></path><path d=\"M527.5 352.1m-52.4 0a52.4 52.4 0 1 0 104.8 0 52.4 52.4 0 1 0-104.8 0Z\" fill=\"#FFFFFF\" p-id=\"2476\"></path><path d=\"M527.5 329m-29.3 0a29.3 29.3 0 1 0 58.6 0 29.3 29.3 0 1 0-58.6 0Z\" fill=\"#040000\" p-id=\"2477\"></path><path d=\"M450.7 517c1.1-8.2 3.2-16.4 6.1-24.1 0.1-0.3 1-2.5 0.5-1.4s0.3-0.7 0.5-1c0.7-1.4 1.4-2.8 2.2-4.1 0.4-0.8 2.8-3.9 1.3-2.1 0.8-1 1.7-1.9 2.6-2.8 1-1-1.5 1 0.1 0 0.5-0.3 1-0.6 1.5-0.8-1.3 0.7-1.2 0.3 0 0.1 1.9-0.3-1.8 0.3 0.1 0 1.2-0.2 1.5 0.3 0-0.1 0.6 0.2 1.3 0.3 1.9 0.5 0.3 0.1-1.3-0.7 0.2 0.1 0.8 0.5 1.6 0.9 2.4 1.4 1.4 1 0-0.1 1.4 1.1 0.9 0.8 1.8 1.7 2.6 2.6 1.8 1.9 3.5 3.9 5 6.1 5.1 7.1 9.3 14.8 13.2 22.6 3.5 6.9 13.7 4.7 15.8-2.1 2.6-8.7 4.8-17.4 7.4-26.1 0.9-3.2 1.9-6.4 3.2-9.4-0.7 1.6 0.8-1.6 1.2-2.2l0.9-1.5c0.7-1.2-1.4 0.7 0.1-0.1 1.7-0.9-1.2 0.3-0.3 0.1 0.8-0.2 1-1.2 0.3-0.3-0.6 0.8 0.6 0-0.5 0.2-2 0.3 2.4 0.5-1.1 0 0.5 0.1 1.2 0.2 1.6 0.4-1.1-0.8-0.8-0.4 0.2 0.2 0.7 0.4 3.4 2.3 2.7 1.8 8.9 7.1 15.9 16.9 22.5 26 2.8 3.8 7.5 5.6 11.8 3.1 3.7-2.2 5.9-8 3.1-11.8-8.2-11.1-16.6-23-27.7-31.4-6.3-4.7-14.5-7.6-21.7-3-6.7 4.2-9.6 12.5-11.9 19.6-3.2 9.9-5.5 20-8.6 29.9 5.3-0.7 10.5-1.4 15.8-2.1-7.8-15.5-24.8-50.1-48-41.7-14.1 5.1-19.7 23-22.9 36.2-0.9 3.8-1.8 7.7-2.3 11.6-0.6 4.6 1.1 9.3 6 10.6 4.2 1 10.2-1.5 10.8-6.1z\" fill=\"#040000\" p-id=\"2478\"></path></svg>"
  }, {
    name: '12',
    icon: "<svg t=\"1624457847424\" class=\"icon\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"2632\" ><path d=\"M485.538528 993.072489a362.00362 481.804818 3.149 1 0 52.933731-962.15464 362.00362 481.804818 3.149 1 0-52.933731 962.15464Z\" fill=\"#AADCF0\" p-id=\"2633\"></path><path d=\"M688.2 334.1c-15.1 7.6-30.2 15.6-44.3 25-5.9 3.9-17 10.4-14.6 19.1 1.8 6.5 12 11.2 17.3 14.3 15.7 9.3 32.1 17.6 48.3 25.9 8.6 4.4 16.2-8.5 7.6-13-14.1-7.3-28.3-14.5-42.1-22.3-3.9-2.2-7.9-4.5-11.7-6.9-1.2-0.8-2.4-1.5-3.5-2.4-0.6-0.4-1.1-0.8-1.6-1.2 2.2 1.7-0.3-0.3-0.3-0.3-0.9 0.1-1.5-3.2-0.2 0.5 0.9 2.4 1.1 3.8 0.3 5.8 0.6-1.5-0.9 0.8-0.1 0 0.5-0.5 1-1.1 1.6-1.6 0.5-0.5 1-0.9 1.6-1.3 0.6-0.5 0 0 1.2-0.9 1.7-1.3 3.5-2.5 5.3-3.6 8.4-5.5 17.2-10.4 26-15.2 5.6-3 11.2-6 16.8-8.9 8.6-4.4 1-17.4-7.6-13zM375.8 347c13.4 6.8 26.7 14 39.5 21.9 1.8 1.2 3.7 2.3 5.5 3.5 0.9 0.6 1.7 1.2 2.6 1.8 0.9 0.6 1.9 1.4 1.6 1.1 1.1 0.9 2.1 1.9 3.1 2.8 1.2 1 0-0.3 0.1 0 0-0.2-0.8-2.4-0.3-4.1 1.5-5.5 2.3-2.7 0.8-2-0.4 0.2-0.9 0.8-1.3 1.1 1.7-1.4-1.6 1.1-2.3 1.6-3.4 2.3-6.9 4.4-10.4 6.4-14.9 8.6-30.3 16.4-45.6 24.3-8.6 4.4-1 17.4 7.6 13 15-7.7 30.1-15.4 44.8-23.8 6.2-3.6 13.8-7.3 18.7-12.7 7.6-8.3-3.8-16.6-9.9-20.9-8.7-6.1-18-11.3-27.3-16.4-6.5-3.6-13-7.1-19.6-10.4-8.6-4.5-16.3 8.5-7.6 12.8zM412.8 570.9c13.5 7.7 28.5 13.3 43.3 17.9 29.8 9.2 61.7 13.1 92.6 7.3 20.6-3.9 40-12.5 56.6-25.2 2.8-2.2 4.3-5.6 2.3-9-1.6-2.8-6.2-4.5-9-2.3-48.3 36.9-113.3 30-165.6 6.7-4.6-2.1-9.2-4.2-13.7-6.7-7.3-4.2-13.9 7.2-6.5 11.3z\" fill=\"#040000\" p-id=\"2634\"></path><path d=\"M644.6 505.2c-30.1 21.5-60.6 62.5-39.1 99.8 10.7 18.6 30.3 30.9 49.1 40.1 7.8 3.8 14.6-7.9 6.8-11.7-23.6-11.5-53.7-31.4-49.4-60.9 2.8-18.9 15.8-34.6 29.5-47.2 2.5-2.3 5.1-4.6 7.8-6.7 0.5-0.4 0.9-0.7 1.4-1.1-0.4 0.3-1.2 0.9-0.1 0.1l0.9-0.6c6.9-5.1 0.2-16.8-6.9-11.8z\" fill=\"#040000\" p-id=\"2635\"></path></svg>"
  }, {
    name: '13',
    icon: "<svg t=\"1624457855182\" class=\"icon\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"2789\" ><path d=\"M235.1 76.9c75.6-26.5 297.3-90.1 514.2-16.6 16.3 5.5 29.8 17.4 37.1 33 57.5 122.4 127.1 602.1 62.1 785.6a62.58 62.58 0 0 1-32.5 35.8c-109.5 51.8-428.1 136.7-609.3 37.2-14.4-7.9-25-21.3-29.7-37.1-41.9-140.6-37-627.7 19.1-798 6.1-18.7 20.5-33.4 39-39.9z\" fill=\"#F9DABD\" p-id=\"2790\"></path><path d=\"M392.2 360.2m-35.2 0a35.2 35.2 0 1 0 70.4 0 35.2 35.2 0 1 0-70.4 0Z\" fill=\"#040000\" p-id=\"2791\"></path><path d=\"M618.6 360.2m-35.2 0a35.2 35.2 0 1 0 70.4 0 35.2 35.2 0 1 0-70.4 0Z\" fill=\"#040000\" p-id=\"2792\"></path><path d=\"M512 562.6c-36 0-65.3-29.3-65.3-65.3S476 432 512 432s65.3 29.3 65.3 65.3-29.3 65.3-65.3 65.3z m0-122.9c-31.7 0-57.6 25.8-57.6 57.6s25.8 57.6 57.6 57.6c31.7 0 57.6-25.8 57.6-57.6s-25.9-57.6-57.6-57.6z\" fill=\"#040000\" p-id=\"2793\"></path></svg>"
  }, {
    name: '14',
    icon: "<svg t=\"1624457863444\" class=\"icon\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"2947\" ><path d=\"M178.1 971.5c38.1 15.9 98.7 26.6 171.3-12.3 3.7-2 8.4-1.6 11.6 1.1 43.3 35.9 123.3 80.8 236 10.9 3.8-2.4 8.7-2.4 12.6-0.2 41.8 23.9 191.6 58.2 246.6 14.2 4.4-3.5 9.1-6.6 14.5-8.5C1065 909.5 678.2-652 194.3 351c-37.5 77.8-38.4 94.1-71.9 211.3-27.6 96.3-29.1 231.3 1.4 348.1 7.2 27.3 27.3 49.9 54.3 61.1z\" fill=\"#ABAAAA\" p-id=\"2948\"></path><path d=\"M468.9 349H418c-6.1 0-11.1-5-11.1-11.1V336c0-6.1 5-11.1 11.1-11.1h50.9c6.1 0 11.1 5 11.1 11.1v1.9c0 6.1-5 11.1-11.1 11.1zM643 471.9H390c-6.6 0-12-5.4-12-12s5.4-12 12-12h253c6.6 0 12 5.4 12 12s-5.4 12-12 12zM609 349h-61.2c-6 0-11-4.9-11-11v-2.1c0-6 4.9-11 11-11H609c6 0 11 4.9 11 11v2.1c0 6.1-4.9 11-11 11z\" fill=\"#040000\" p-id=\"2949\"></path></svg>"
  }, {
    name: '15',
    icon: "<svg t=\"1624457870536\" class=\"icon\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"3103\" ><path d=\"M673.1 318.7c3.7-17.5 5.6-35.7 5.6-54.4 0-137.9-105.5-249.7-235.6-249.7S207.4 126.4 207.4 264.3c0 55.4 17.1 106.7 45.9 148.1-55.2 63.3-88.6 145.9-88.6 236.3 0 199.2 162.1 360.6 362.1 360.6 200 0 362.1-161.5 362.1-360.6 0.1-147.3-88.7-274-215.8-330z\" fill=\"#4F8A54\" p-id=\"3104\"></path><path d=\"M392 246.2m-47.1 0a47.1 47.1 0 1 0 94.2 0 47.1 47.1 0 1 0-94.2 0Z\" fill=\"#FFFFFF\" p-id=\"3105\"></path><path d=\"M386 252.8m-26.4 0a26.4 26.4 0 1 0 52.8 0 26.4 26.4 0 1 0-52.8 0Z\" fill=\"#040000\" p-id=\"3106\"></path><path d=\"M505.6 246.2m-47.1 0a47.1 47.1 0 1 0 94.2 0 47.1 47.1 0 1 0-94.2 0Z\" fill=\"#FFFFFF\" p-id=\"3107\"></path><path d=\"M501.4 252.8m-26.4 0a26.4 26.4 0 1 0 52.8 0 26.4 26.4 0 1 0-52.8 0Z\" fill=\"#040000\" p-id=\"3108\"></path><path d=\"M474.3 364.8h-50.9c-6.1 0-11.1-5-11.1-11.1v-1.9c0-6.1 5-11.1 11.1-11.1h50.9c6.1 0 11.1 5 11.1 11.1v1.9c0 6.2-5 11.1-11.1 11.1z\" fill=\"#040000\" p-id=\"3109\"></path></svg>"
  }, {
    name: '16',
    icon: "<svg t=\"1624457876371\" class=\"icon\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"3263\" ><path d=\"M246.4 227.6c-166.9 101.1-461.9 344 87 564.1 1.5 0.6 2.9 1.1 4.4 1.6 80.7 27.7 392.8 165.4 641-198.1 40-58.6 38.5-136.2-3.7-193.3C892 289.5 727 201.1 429.1 182.7c-64.1-4-127.8 11.6-182.7 44.9z\" fill=\"#CF92BE\" p-id=\"3264\"></path><path d=\"M617.1 393.4c-17.4 8.8-34.9 18.1-51.2 28.9-6.9 4.6-20.3 12.3-17.4 22.6 1.2 4.3 5.6 7 9 9.5 3.7 2.7 7.6 5 11.5 7.3 18.2 10.8 37.1 20.3 55.9 30 10 5.1 18.9-10 8.8-15.1-16.4-8.4-32.9-16.9-49-26-4.5-2.6-9.1-5.2-13.5-8l-4.5-3c-0.7-0.5-1.3-1-2-1.5 1.6 1.2 0.7 0.4-0.2-0.2-1.3-0.9-0.3-0.9-0.5-0.3 0.2 0.2 0.4 0.5 0.6 0.7 1 1.9 1.3 3.7 0.8 5.7 0.1-0.6 0.7-1.4-0.6 1.3 0.7-1.5-0.1 0-0.2 0.1 0.6-0.6 1.2-1.3 1.9-1.9l1.8-1.5c1.8-1.6-0.6 0.3 1.2-0.9 2-1.5 4.1-2.9 6.2-4.3 10-6.5 20.4-12.4 30.9-18 6.5-3.5 13.1-7 19.7-10.4 9.6-5 0.8-20.1-9.2-15zM323.1 408.5c15.9 8.1 31.7 16.5 46.8 26 2.2 1.4 4.3 2.8 6.5 4.2 1 0.7 1.9 1.3 2.8 2 0.5 0.3 1 0.7 1.4 1.1-1.1-0.9-0.3-0.3 0.3 0.3 1.1 1 2.2 2.2 3.3 3.1 1.4 1.1-1-1.7-0.1-0.1-0.6-1.1-0.9-4.1 0.3-6.7 2.2-4.8 0.7 0.1 0-0.5 0 0-1.1 0.9-1.3 1 2.3-1.9 0 0-0.5 0.4-0.8 0.5-1.5 1.1-2.3 1.6-4 2.7-8.1 5.1-12.3 7.5-17.3 10-35.1 19.1-52.8 28.2-10 5.1-1.2 20.2 8.8 15.1 17.5-9 35-17.9 52-27.7 7.3-4.2 15.9-8.6 21.8-14.7 9.3-9.7-4.3-19.7-11.5-24.7-10.1-7.1-20.9-13.1-31.7-19-7.6-4.2-15.2-8.2-22.9-12.1-9.7-5.2-18.6 9.9-8.6 15zM513 592.1c-12.2 0-24.6-1.4-36.3-4.3-8-2-13.9-8.2-15.4-16.2s1.7-15.8 8.4-20.5c23.2-16.3 60.5-31.9 106.2-13 6.4 2.6 11 8.3 12.3 15.1 1.3 6.7-0.8 13.6-5.7 18.3-13.5 13.1-40.9 20.6-69.5 20.6z m-37.4-32.5c-3.4 2.4-4.9 6.2-4.2 10.2 0.8 4.1 3.6 7.1 7.7 8.1 39.1 9.7 81.2 0.7 96.1-13.7 2.4-2.3 3.4-5.6 2.7-8.9-0.7-3.4-2.9-6.2-6.1-7.5-41.2-17.2-75.1-3.1-96.2 11.8z\" fill=\"#040000\" p-id=\"3265\"></path></svg>"
  }, {
    name: '17',
    icon: "<svg t=\"1624457881793\" class=\"icon\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"3419\" ><path d=\"M1008.6 465.7c0-124.9-95.5-226.2-213.4-226.2-12 0-23.8 1.1-35.2 3.1v-3.1c0-124.9-95.5-226.2-213.4-226.2S333.4 114.6 333.4 239.5c0 2.4 0 4.8 0.1 7.2-17.1-4.7-35-7.2-53.4-7.2-117.8 0-213.4 101.3-213.4 226.2 0 92.1 51.9 171.3 126.3 206.6-13.7 29.9-21.4 63.4-21.4 98.8 0 124.9 95.5 226.2 213.4 226.2 68.8 0 130-34.5 169-88.1 39 53.6 100.2 88.1 169 88.1 117.8 0 213.4-101.3 213.4-226.2 0-41.2-10.4-79.9-28.6-113.1 60.5-39.9 100.8-111.1 100.8-192.3z\" fill=\"#8CC66D\" p-id=\"3420\"></path><path d=\"M437.8 400.7m-24.7 0a24.7 24.7 0 1 0 49.4 0 24.7 24.7 0 1 0-49.4 0Z\" fill=\"#040000\" p-id=\"3421\"></path><path d=\"M649.7 400.7m-24.7 0a24.7 24.7 0 1 0 49.4 0 24.7 24.7 0 1 0-49.4 0Z\" fill=\"#040000\" p-id=\"3422\"></path><path d=\"M527.3 625.9c6.3-14.2 13.1-28.3 17.9-43 6.2-19 8.3-38.6 10.5-58.3l2.1-19.2c0.7-6.2-9-6.1-9.7 0-1.7 16.3-2.8 32.8-5.7 48.9-4.2 23.7-13.8 45-23.5 66.7-2.5 5.6 5.9 10.5 8.4 4.9z\" fill=\"#252525\" p-id=\"3423\"></path><path d=\"M447.7 522.3c20.3-0.1 40.6-0.2 61-0.4l96.6-0.6c7.5 0 14.9-0.1 22.4-0.1 16.6-0.1 16.7-25.9 0-25.8-20.3 0.1-40.6 0.2-61 0.4l-96.6 0.6c-7.5 0-14.9 0.1-22.4 0.1-16.6 0.1-16.7 25.9 0 25.8z\" fill=\"#040000\" p-id=\"3424\"></path><path d=\"M495.4 508.2c-10.3 3.8-9.2 20.9-9.2 29.5 0.1 16 2.1 32.3 6.1 47.8 3.5 13.7 8.7 29.9 20.6 38.7 12.9 9.5 27.6 2.1 37.6-7.9 10.2-10.3 17.8-23 24.7-35.6 11.6-21.3 20.9-43.8 29.7-66.4 3-7.8-9.5-11.1-12.5-3.4-7.4 19.1-15.3 38.1-24.7 56.4-5.9 11.5-12.2 23-20.3 33.1-2.8 3.5-5.8 6.9-9.2 9.8-1.9 1.7-1.4 1.3-3.3 2.5-1.3 0.8-2.6 1.6-3.9 2.2-0.7 0.3 1-0.2-0.8 0.3-0.6 0.2-1.2 0.3-1.8 0.5-1.1 0.3-1.2 0.2-0.5 0.1-0.6 0-1.3 0-1.9 0.1-2.2 0.1 0.6 0.5-1.8-0.2l-1.8-0.6c1.5 0.5 0.2 0.1-0.5-0.3-0.8-0.5-2.9-2.1-1.7-1.1-1-0.9-2-1.7-2.8-2.7-0.4-0.5-0.9-1-1.3-1.5 0.4 0.5 0.1 0.2-0.5-0.7-0.8-1.3-1.7-2.5-2.4-3.9-0.7-1.3-1.4-2.5-2-3.8-0.4-0.8-0.8-1.6-1.1-2.4-0.1-0.2-0.5-1.1 0 0l-0.6-1.5a86.8 86.8 0 0 1-3.3-9.8c-4.4-14.9-6.2-27.9-6.8-42.8-0.3-6.6-0.3-13.1 0.4-19.7 0.2-1.5-0.3 1.5 0.1-0.5l0.3-1.8c0.2-0.9 0.5-1.8 0.7-2.8 0.4-1.9-0.7 1.1 0.3-0.7 0.5-1-1.3 1.2-0.3 0.5-0.3 0.3-1.1 0.8-2 1.1 7.7-2.9 4.3-15.4-3.5-12.5z\" fill=\"#040000\" p-id=\"3425\"></path></svg>"
  }, {
    name: '18',
    icon: "<svg t=\"1624457899440\" class=\"icon\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"3579\" ><path d=\"M75.4 739.8c-78.7-134.4-194-455.7 401.4-579.6 9.8-2 19.2-6.2 29.2-7.5C656.8 133 947.3 205 1000.1 578.4c42.6 223.8 29.7 392.1-822 233.6-43.1-8-80.6-34.4-102.7-72.2z\" fill=\"#F09495\" p-id=\"3580\"></path><path d=\"M704.6 875.4c-129 0-301.8-20.5-526.6-62.3-43.5-8.1-81.2-34.6-103.5-72.7-19.3-32.9-44.8-84.3-57.1-142.5-13.9-65.1-8.8-125.3 15.1-179.2 54.3-122.3 203.7-209.6 444-259.6 4.1-0.9 8.3-2.1 12.3-3.4 5.5-1.7 11.1-3.4 16.9-4.2 29-3.8 75.7-5.9 133.8 5.7 54.5 10.9 105.3 31 150.8 59.9C843.7 251 888.2 296 922.7 351c39.7 63.1 66.1 139.6 78.5 227.3 8.1 42.4 15.2 87.3 12.5 127.9-2.8 42.6-16.4 75.5-41.5 100.7-42.5 42.7-120.3 65-237.8 68.1-9.6 0.2-19.6 0.4-29.8 0.4zM76.3 739.3c22 37.6 59.2 63.7 102.1 71.7 242.5 45.1 424.4 65.3 556.1 61.9 116.9-3.1 194.1-25.2 236.3-67.5 55.4-55.6 44.4-142.5 28.3-226.7C976 415.8 903.4 291.5 789.2 219c-124-78.7-248.1-69.9-283.2-65.3-5.6 0.7-11.2 2.4-16.6 4.1-4.1 1.2-8.3 2.5-12.5 3.4C237.3 211.1 88.5 298 34.5 419.6c-54.6 122.8 2.8 253 41.8 319.7z\" fill=\"#FFFFFF\" p-id=\"3581\"></path><path d=\"M424.1 442.5m-24.7 0a24.7 24.7 0 1 0 49.4 0 24.7 24.7 0 1 0-49.4 0Z\" fill=\"#040000\" p-id=\"3582\"></path><path d=\"M635.9 442.5m-24.7 0a24.7 24.7 0 1 0 49.4 0 24.7 24.7 0 1 0-49.4 0Z\" fill=\"#040000\" p-id=\"3583\"></path><path d=\"M426.2 543.3c17.1 7.9 36.6 26 25.5 46.1-6.9 12.5-19.8 21.2-31.7 28.4-4.5 2.7-0.4 9.8 4.1 7.1 17.4-10.5 41.6-27.6 39-51.1-1.6-14-12.4-24.8-23.5-32.3-3-2-6.1-3.9-9.3-5.4-4.8-2.1-8.9 5-4.1 7.2zM629.5 535.4c-21.8 11.7-40.6 37-25.7 61.3 8.2 13.4 22.2 22.7 35.7 30.3 4.7 2.7 8.9-4.6 4.2-7.2-15.5-8.7-39.9-23.9-36.9-45.2 1.6-11.4 10.7-20.7 19.6-27.2 2.4-1.7 4.8-3.4 7.4-4.8 4.7-2.5 0.4-9.8-4.3-7.2z\" fill=\"#040000\" p-id=\"3584\"></path><path d=\"M457.2 584.6c25.6 25.6 66.7 41 101.8 28.3 18.2-6.6 33.2-19.1 45.5-33.8 4.2-5.1-3-12.4-7.3-7.3-18.5 22-43.3 38.1-73 35-18.6-1.9-36.2-10.8-50.9-22-2.9-2.2-6.1-4.8-8.8-7.5-4.7-4.7-12 2.6-7.3 7.3z\" fill=\"#040000\" p-id=\"3585\"></path></svg>"
  }, {
    name: '19',
    icon: "<svg t=\"1624457904464\" class=\"icon\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"3739\" ><path d=\"M915.9 510.5c8.4-19 13.1-39.8 13.1-61.7 0-90-78.9-162.9-176.2-162.9-3.2 0-6.3 0.1-9.5 0.2v-0.2c0-94.8-116.2-171.6-259.6-171.6S224 191.2 224 286v2c-96.2 0-174.1 72-174.1 160.9 0 38 14.3 73 38.2 100.5-41.8 29.4-68.8 75.9-68.8 128.2 0 88.9 78 160.9 174.1 160.9 17.1 0 33.6-2.3 49.3-6.5 28.9 46.1 88.7 77.7 157.6 77.7 49.4 0 94-16.2 126-42.3 32 26.1 76.6 42.3 126 42.3 77.3 0 143-39.7 166.7-95 3.1 0.2 6.3 0.2 9.5 0.2 97.3 0 176.2-72.9 176.2-162.9 0-60.6-35.7-113.4-88.8-141.5z\" fill=\"#5A74B8\" p-id=\"3740\"></path><path d=\"M357.6 449.5a46.6 73.2 0 1 0 93.2 0 46.6 73.2 0 1 0-93.2 0Z\" fill=\"#FEFEFD\" p-id=\"3741\"></path><path d=\"M357.5 449.5a25.1 39.4 0 1 0 50.2 0 25.1 39.4 0 1 0-50.2 0Z\" fill=\"#040000\" p-id=\"3742\"></path><path d=\"M531.3 449.5a46.6 73.2 0 1 0 93.2 0 46.6 73.2 0 1 0-93.2 0Z\" fill=\"#FEFEFD\" p-id=\"3743\"></path><path d=\"M531.2 449.5a25.1 39.4 0 1 0 50.2 0 25.1 39.4 0 1 0-50.2 0Z\" fill=\"#040000\" p-id=\"3744\"></path><path d=\"M426.7 574.6c20.9 29.9 59.7 52.2 96.2 38.6 19.2-7.2 34.7-21.2 47.6-36.9 2.8-3.5 3.4-8.3 0-11.7-2.9-2.9-8.9-3.5-11.7 0-16.5 20.2-40.9 40.9-68.1 35.5-17.3-3.4-31-13.2-42.9-25.9-2-2.2-3.9-4.4-5.8-6.7-1.6-1.9 1.1 1.5-0.4-0.6-0.2-0.2-0.3-0.5-0.5-0.7-6.2-8.7-20.6-0.4-14.4 8.4z\" fill=\"#040000\" p-id=\"3745\"></path></svg>"
  }, {
    name: '20',
    icon: "<svg t=\"1624457910321\" class=\"icon\" viewBox=\"0 0 1024 1024\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" p-id=\"3899\" ><path d=\"M792.8 301.4c-8.2 0-16.2 0.4-24.2 1.3-12.3-81.8-129.2-145.9-271.8-145.9-137.1 0-250.5 59.3-269.9 136.6C105.3 295.5 7.4 391.2 7.4 508.9c0 119.1 100.2 215.6 223.7 215.6 5.3 0 10.6-0.2 15.8-0.5 14.4 80.5 130.4 143.2 271.3 143.2 135.9 0 248.6-58.3 269.4-134.6 1.7 0 3.4 0.1 5.1 0.1 123.6 0 223.7-96.5 223.7-215.6s-100-215.7-223.6-215.7z\" fill=\"#F6CD50\" p-id=\"3900\"></path><path d=\"M435.9 431.5m-52.2 0a52.2 52.2 0 1 0 104.4 0 52.2 52.2 0 1 0-104.4 0Z\" fill=\"#FAFAFA\" p-id=\"3901\"></path><path d=\"M588.1 431.5m-52.2 0a52.2 52.2 0 1 0 104.4 0 52.2 52.2 0 1 0-104.4 0Z\" fill=\"#FAFAFA\" p-id=\"3902\"></path><path d=\"M435.9 431.5m-27.8 0a27.8 27.8 0 1 0 55.6 0 27.8 27.8 0 1 0-55.6 0Z\" fill=\"#040000\" p-id=\"3903\"></path><path d=\"M601.9 407.4c-5.7 2.9-11.3 5.9-16.9 9-6.8 3.8-15.3 7.8-20.5 13.8-5.6 6.5 1.6 11.1 6.7 14.4 11.2 7.1 23.3 13 35.1 19 5.7 2.9 10.8-5.7 5.1-8.6-10.9-5.6-21.9-11.1-32.4-17.4-2.4-1.4-4.6-3.1-7-4.6 1 0.6-0.4-0.4-0.4-0.4-1.9-0.3-0.5 4.2 0.5 4.1-0.1 0-0.6 0.3 0.3-0.3 0.5-0.3 1-0.9 1.5-1.3 9.7-7.9 21.9-13.5 33.1-19.2 5.7-2.7 0.6-11.4-5.1-8.5zM406.6 547.6c11.5 14.4 27 26.7 42.7 36.3 32.2 19.8 71.2 27.2 107.6 15.4 29.5-9.6 54.6-29.1 75.5-51.6 10.8-11.6-6.6-29.1-17.5-17.5-9.4 10.1-19.5 19.7-30.8 27.7-4.6 3.2-9.3 6.2-14.2 8.9-5 2.8-9.9 5.1-14.1 6.7-4.6 1.7-9.3 3.2-14.1 4.4-2.2 0.5-4.4 1-6.6 1.4-1 0.2-2 0.3-2.9 0.5 2.6-0.4-2.1 0.2-2.5 0.3-4.1 0.4-8.3 0.5-12.5 0.4-2.2-0.1-4.4-0.2-6.6-0.4-1.1-0.1-2.2-0.2-3.2-0.3-1.5-0.2-1.4-0.2 0.1 0l-2.1-0.3c-7.8-1.3-15.4-3.4-22.8-6.2-0.9-0.4-1.8-0.7-2.8-1.1-3.1-1.2 2.3 1.1-0.7-0.3-1.5-0.7-2.9-1.3-4.4-2-3.7-1.8-7.2-3.7-10.8-5.8-5.7-3.4-11.1-7.1-16.4-11.1 3 2.3-1.1-0.9-1.8-1.5-1.1-0.9-2.1-1.7-3.1-2.6-2.1-1.8-4.2-3.7-6.3-5.6-4.4-4.1-8.7-8.4-12.4-13.1-4.2-5.2-13.1-4.3-17.5 0-5 5.1-4 12.2 0.2 17.4z\" fill=\"#040000\" p-id=\"3904\"></path></svg>"
  }]
}, {
  name: '标记图标',
  type: 'sign',
  list: [{
    name: '1',
    icon: "<svg viewBox=\"0 0 1024 1024\"><path d=\"M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z\" fill=\"#6D768D\"></path><path d=\"M809.728 429.696a18.901333 18.901333 0 0 0-15.274667-12.885333l-183.466666-26.624-81.92-166.272a18.901333 18.901333 0 0 0-34.005334 0l-81.92 166.272-183.594666 26.624a19.029333 19.029333 0 0 0-10.496 32.298666l132.693333 129.536-31.274667 182.741334a18.816 18.816 0 0 0 27.477334 19.84l164.138666-86.186667 164.096 86.058667a18.773333 18.773333 0 1 0 27.434667-19.84l-31.36-182.741334 132.693333-129.408a18.901333 18.901333 0 0 0 4.778667-19.413333z\" fill=\"#FFFFFF\"></path></svg>"
  }, {
    name: '2',
    icon: "<svg viewBox=\"0 0 1024 1024\"><path d=\"M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z\" fill=\"#6D768D\"></path><path d=\"M644.565333 306.901333c32.128 0 65.834667-5.76 101.077334-17.237333a17.066667 17.066667 0 0 1 22.357333 16.213333v328.32c-1.109333 0.768 10.325333 27.093333-99.370667 19.84-109.653333-7.210667-181.76-45.098667-246.869333-45.098666-65.152 0-49.322667 2.688-74.154667 8.405333v168.064a24.746667 24.746667 0 0 1-24.490666 25.258667 22.528 22.528 0 0 1-17.28-7.253334 24.149333 24.149333 0 0 1-7.168-18.005333V281.258667C299.776 280.490667 328.106667 256 421.76 256s164.437333 50.901333 222.805333 50.901333z\" fill=\"#FFFFFF\"></path></svg>"
  }, {
    name: '3',
    icon: "<svg viewBox=\"0 0 1024 1024\"><path d=\"M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z\" fill=\"#6D768D\"></path><path d=\"M524.074667 225.408l274.517333 274.517333a17.066667 17.066667 0 0 1 0 24.149334l-274.517333 274.517333a17.066667 17.066667 0 0 1-24.149334 0l-274.517333-274.517333a17.066667 17.066667 0 0 1 0-24.149334l274.517333-274.517333a17.066667 17.066667 0 0 1 24.149334 0z\" fill=\"#FFFFFF\"></path></svg>"
  }, {
    name: '4',
    icon: "<svg viewBox=\"0 0 1024 1024\"><path d=\"M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z\" fill=\"#6D768D\"></path><path d=\"M317.866667 300.8h388.266666c9.386667 0 17.066667 7.68 17.066667 17.066667v388.266666a17.066667 17.066667 0 0 1-17.066667 17.066667h-388.266666a17.066667 17.066667 0 0 1-17.066667-17.066667v-388.266666c0-9.386667 7.68-17.066667 17.066667-17.066667z\" fill=\"#FFFFFF\"></path></svg>"
  }, {
    name: '5',
    icon: "<svg viewBox=\"0 0 1024 1024\"><path d=\"M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z\" fill=\"#6D768D\"></path><path d=\"M498.346667 279.082667L248.789333 701.44a15.829333 15.829333 0 0 0 13.653334 23.893333h499.114666a15.829333 15.829333 0 0 0 13.653334-23.893333l-249.6-422.357333a15.829333 15.829333 0 0 0-27.264 0z\" fill=\"#FFFFFF\"></path></svg>"
  }, {
    name: '6',
    icon: "<svg viewBox=\"0 0 1024 1024\"><path d=\"M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z\" fill=\"#6D768D\"></path><path d=\"M497.749333 798.549333l-31.445333-28.501333C313.941333 631.722667 213.333333 540.501333 213.333333 428.8a160.981333 160.981333 0 0 1 162.730667-162.730667c51.498667 0 100.906667 23.978667 133.12 61.696a177.536 177.536 0 0 1 133.162667-61.696 160.981333 160.981333 0 0 1 162.730666 162.730667c0 111.701333-100.608 202.965333-252.970666 341.333333l-31.445334 28.458667a17.066667 17.066667 0 0 1-22.912 0z\" fill=\"#FFFFFF\"></path><path d=\"M634.538667 487.808L555.050667 426.24 507.306667 256a201.002667 201.002667 0 0 0-23.594667 20.394667l-0.256-0.256L525.653333 426.666667l-133.290666 59.946666a14.08 14.08 0 0 0-8.021334 15.957334l28.757334 126.378666a14.208 14.208 0 0 0 27.733333-6.229333l-26.24-115.114667 126.037333-56.704 76.416 59.136a14.250667 14.250667 0 0 0 19.968-2.474666 14.08 14.08 0 0 0-2.474666-19.797334z\" fill=\"#6D768D\"></path></svg>"
  }, {
    name: '7',
    icon: "<svg viewBox=\"0 0 1024 1024\"><path d=\"M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z\" fill=\"#6D768D\"></path><path d=\"M497.749333 798.549333l-31.445333-28.501333C313.941333 631.722667 213.333333 540.501333 213.333333 428.8a160.981333 160.981333 0 0 1 162.730667-162.730667c51.498667 0 100.906667 23.978667 133.12 61.696a177.536 177.536 0 0 1 133.162667-61.696 160.981333 160.981333 0 0 1 162.730666 162.730667c0 111.701333-100.608 202.965333-252.970666 341.333333l-31.445334 28.458667a17.066667 17.066667 0 0 1-22.912 0z\" fill=\"#FFFFFF\"></path></svg>"
  }, {
    name: '8',
    icon: "<svg viewBox=\"0 0 1024 1024\"><path d=\"M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z\" fill=\"#6D768D\"></path><path d=\"M374.656 273.194667c5.973333 4.48 12.117333 9.6 18.346667 15.36 6.272 5.717333 11.904 12.373333 16.896 19.84 2.517333 4.010667 5.504 8.490667 9.002666 13.482666a529.493333 529.493333 0 0 1 20.266667 32.213334h155.221333a169.813333 169.813333 0 0 0 9.770667-15.744c2.474667-4.48 5.248-8.96 8.234667-13.482667a460.842667 460.842667 0 0 1 23.253333-31.829333c4.992-6.229333 12.245333-12.373333 21.76-18.346667a34.261333 34.261333 0 0 0 10.112-9.728 31.274667 31.274667 0 0 0 5.248-11.989333 18.56 18.56 0 0 0-1.536-11.605334 17.664 17.664 0 0 0-10.112-8.618666c-4.48-1.493333-8.362667-2.005333-11.605333-1.493334a46.933333 46.933333 0 0 0-9.770667 2.602667c-3.242667 1.28-6.613333 2.645333-10.112 4.138667a32.426667 32.426667 0 0 1-12.757333 2.261333 26.026667 26.026667 0 0 1-12.373334-2.645333 45.653333 45.653333 0 0 1-8.96-6.357334l-8.661333-7.850666a30.336 30.336 0 0 0-11.989333-6.4c-9.984-3.968-18.005333-4.693333-24.021334-2.218667-5.973333 2.474667-11.946667 6.485333-17.962666 11.946667a88.618667 88.618667 0 0 1-11.989334 10.496 7.338667 7.338667 0 0 1-3.754666 1.493333 46.165333 46.165333 0 0 1-8.277334-5.205333 71.808 71.808 0 0 1-7.125333-4.906667 37.973333 37.973333 0 0 1-6.4-6.357333c-3.968-3.968-9.941333-6.613333-17.92-7.850667a31.061333 31.061333 0 0 0-21.76 4.138667c-8.533333 5.461333-14.506667 10.069333-18.048 13.824a29.354667 29.354667 0 0 1-15.744 7.893333 23.978667 23.978667 0 0 1-13.098667-0.768 987.733333 987.733333 0 0 0-14.634666-4.48 80.725333 80.725333 0 0 0-14.250667-2.986667 16.768 16.768 0 0 0-11.989333 2.986667c-6.997333 5.461333-9.258667 12.074667-6.741334 19.84a34.56 34.56 0 0 0 13.482667 18.346667z\" fill=\"#FFFFFF\"></path><path d=\"M780.757333 545.152a219.306667 219.306667 0 0 0-19.882666-65.536 224.981333 224.981333 0 0 0-33.365334-49.792 430.336 430.336 0 0 0-37.12-37.12c-14.506667-11.946667-27.264-23.296-38.272-34.048a544.512 544.512 0 0 1-27.733333-28.842667 305.28 305.28 0 0 1-22.485333-26.197333h-168.746667c-6.485333 8.490667-13.994667 17.493333-22.485333 26.965333a360.96 360.96 0 0 1-26.24 28.074667c-10.538667 10.24-22.272 21.12-35.285334 32.597333a305.493333 305.493333 0 0 0-41.6 44.16 250.026667 250.026667 0 0 0-49.493333 117.589334 216.106667 216.106667 0 0 0 1.877333 70.4 220.586667 220.586667 0 0 0 75.349334 126.549333c21.248 18.005333 47.146667 32.597333 77.653333 43.818667 30.464 11.264 65.493333 16.853333 104.96 16.853333 38.528 0 72.874667-4.864 103.125333-14.592a265.045333 265.045333 0 0 0 78.378667-39.338667c21.973333-16.469333 39.594667-35.797333 52.864-58.026666 13.226667-22.186667 22.101333-45.824 26.624-70.784 4.992-30.421333 5.632-58.026667 1.877333-82.773334z\" fill=\"#FFFFFF\"></path><path d=\"M593.322667 647.509333a20.48 20.48 0 0 1-11.861334 3.2h-50.133333v14.165334c0 4.266667-1.792 8.362667-5.376 12.373333a15.914667 15.914667 0 0 1-13.952 5.333333 24.917333 24.917333 0 0 1-14.336-3.882666c-3.84-2.602667-5.973333-7.210667-6.4-13.824v-14.165334h-48.725333a17.792 17.792 0 0 1-11.818667-3.882666 10.24 10.24 0 0 1-3.968-9.6c0-4.266667 1.578667-7.68 4.693333-10.24a16.768 16.768 0 0 1 11.093334-3.925334h48.682666v-24.789333h-48.682666a15.573333 15.573333 0 0 1-11.52-4.266667 13.525333 13.525333 0 0 1-4.266667-9.941333 15.36 15.36 0 0 1 4.693333-10.624 14.72 14.72 0 0 1 11.093334-4.949333h48.682666l0.725334-14.890667a1053.568 1053.568 0 0 1-40.832-42.538667l-10.752-9.898666a41.216 41.216 0 0 1-6.442667-11.690667c-1.92-4.992-0.938667-10.069333 2.858667-15.274667a13.653333 13.653333 0 0 1 15.786666-3.84c6.186667 2.090667 11.221333 4.821333 15.018667 8.106667 1.92 2.389333 5.248 5.888 10.026667 10.666667l15.061333 14.848 19.328 19.157333 22.186667-20.565333a987.605333 987.605333 0 0 1 29.397333-25.514667 21.162667 21.162667 0 0 1 14.293333-5.674667c5.290667 0 9.557333 2.133333 12.928 6.4 6.186667 7.082667 3.84 15.36-7.168 24.789334a179.072 179.072 0 0 0-12.885333 12.373333c-5.76 5.973333-11.52 11.733333-17.194667 17.408-6.698667 7.082667-14.08 14.378667-22.186666 21.973333v13.44h46.506666c6.698667 0 11.605333 1.536 14.72 4.608a14.165333 14.165333 0 0 1 4.650667 10.282667c0 4.266667-1.450667 7.936-4.309333 11.008-2.858667 3.029333-7.637333 4.352-14.336 3.84l-46.506667 0.768-0.768 24.064h45.866667c13.354667 0 20.053333 4.992 20.053333 14.933333 0.469333 4.693333-0.853333 8.106667-3.925333 10.24z\" fill=\"#6D768D\"></path></svg>"
  }, {
    name: '9',
    icon: "<svg viewBox=\"0 0 1024 1024\"><path d=\"M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z\" fill=\"#6D768D\"></path><path d=\"M512 213.333333l234.666667 341.333334h-128v213.333333h-213.333334v-213.333333h-128L512 213.333333z\" fill=\"#FFFFFF\"></path></svg>"
  }, {
    name: '10',
    icon: "<svg viewBox=\"0 0 1024 1024\"><path d=\"M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z\" fill=\"#6D768D\"></path><path d=\"M533.333333 810.666667L298.666667 469.333333h128V256h213.333333v213.333333h128l-234.666667 341.333334z\" fill=\"#FFFFFF\"></path></svg>"
  }, {
    name: '11',
    icon: "<svg viewBox=\"0 0 1024 1024\"><path d=\"M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z\" fill=\"#6D768D\"></path><path d=\"M213.333333 533.333333L554.666667 298.666667v128h213.333333v213.333333h-213.333333v128l-341.333334-234.666667z\" fill=\"#FFFFFF\"></path></svg>"
  }, {
    name: '12',
    icon: "<svg viewBox=\"0 0 1024 1024\"><path d=\"M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z\" fill=\"#6D768D\"></path><path d=\"M810.666667 533.333333L469.333333 768v-128H256v-213.333333h213.333333V298.666667l341.333334 234.666666z\" fill=\"#FFFFFF\"></path></svg>"
  }, {
    name: '13',
    icon: "<svg viewBox=\"0 0 1024 1024\"><path d=\"M0 512c0 282.752 229.248 512 512 512s512-229.248 512-512S794.752 0 512 0 0 229.248 0 512z\" fill=\"#6D768D\"></path><path d=\"M571.349333 508.586667l162.389334-162.346667a44.330667 44.330667 0 1 0-62.72-62.72l-162.389334 162.389333-162.517333-162.389333a44.330667 44.330667 0 1 0-62.72 62.72l162.389333 162.389333-162.389333 162.474667a44.330667 44.330667 0 1 0 62.72 62.72l162.389333-162.346667 162.389334 162.389334a44.330667 44.330667 0 1 0 62.72-62.72l-162.261334-162.56z\" fill=\"#FFFFFF\"></path></svg>"
  }, {
    name: '14',
    icon: "<svg viewBox=\"0 0 1024 1024\"><path d=\"M512 0C233.386667 0 0 225.877333 0 512s225.877333 512 512 512 512-225.877333 512-512S790.613333 0 512 0z\" fill=\"#6D768D\"></path><path d=\"M726.144 311.210667l-277.333333 305.066666-124.8-124.8c-13.866667-13.866667-41.6-13.866667-55.466667 0-13.866667 13.866667-13.866667 41.6 0 55.466667l159.445333 152.533333c13.866667 13.866667 41.6 13.866667 55.466667 0l305.066667-332.8c13.866667-13.866667 13.866667-41.6 0-55.466666-20.778667-13.866667-48.512-13.866667-62.378667 0z\" fill=\"#FFFFFF\"></path></svg>"
  }, {
    name: '15',
    icon: "<svg viewBox=\"0 0 1024 1024\"><path d=\"M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z\" fill=\"#6D768D\"></path><path d=\"M541.952 755.626667a40.618667 40.618667 0 0 1-29.824 12.373333 41.344 41.344 0 0 1-30.122667-12.373333 40.106667 40.106667 0 0 1-12.672-30.122667c0-11.605333 4.096-21.845333 12.672-30.122667a40.405333 40.405333 0 0 1 30.122667-12.714666c11.605333 0 21.546667 4.138667 29.824 12.714666a40.32 40.32 0 0 1 12.714667 30.122667c0 11.861333-4.096 21.76-12.714667 30.122667zM450.986667 241.28A77.866667 77.866667 0 0 1 512.256 213.333333c24.874667 0 45.354667 8.917333 61.354667 27.946667 15.488 18.432 23.722667 41.685333 23.722666 69.674667 0 23.765333-33.152 200.533333-44.672 329.045333h-80.128C463.146667 511.402667 426.666667 334.677333 426.666667 310.954667c0-27.392 8.277333-50.645333 24.32-69.674667z\" fill=\"#FFFFFF\"></path></svg>"
  }, {
    name: '16',
    icon: "<svg viewBox=\"0 0 1024 1024\"><path d=\"M512 0C229.248 0 0 229.248 0 512s229.248 512 512 512 512-229.248 512-512S794.794667 0 512 0z\" fill=\"#6D768D\"></path><path d=\"M490.666667 682.666667a64 64 0 1 1 0 128 64 64 0 0 1 0-128z m13.994666-490.752c61.397333 0 112.341333 14.634667 153.002667 43.946666 40.533333 29.269333 60.885333 72.618667 60.885333 130.133334 0 35.242667-12.373333 64.938667-29.952 89.045333-10.282667 14.677333-33.664 33.408-62.890666 56.192l-32.426667 22.357333c-15.701333 12.202667-29.696 26.453333-34.858667 42.666667-1.706667 5.546667-3.072 14.677333-3.968 24.533333-0.426667 4.949333-4.864 15.018667-15.232 15.018667h-83.328c-13.568 0-15.957333-10.581333-15.744-15.786667 1.493333-34.005333 4.608-64.213333 18.474667-80.469333 28.074667-32.896 91.904-73.813333 91.904-73.813333a104.106667 104.106667 0 0 0 23.552-24.021334c10.837333-14.933333 19.797333-31.317333 19.797333-49.237333 0-20.565333-6.016-39.338667-18.090666-56.32-12.032-16.938667-34.090667-25.386667-66.005334-25.386667-31.445333 0-53.76 10.410667-66.901333 31.274667-9.685333 15.445333-15.786667 29.610667-18.346667 45.013333-0.853333 5.461333-4.394667 16.981333-16.042666 16.981334H327.210667c-17.322667 0-21.12-11.221333-20.650667-16.64 6.272-68.138667 32.896-114.688 80-144.597334 32-20.565333 71.381333-30.890667 118.101333-30.890666z\" fill=\"#FFFFFF\"></path></svg>"
  }, {
    name: '17',
    icon: "<svg viewBox=\"0 0 1024 1024\"><path d=\"M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z\" fill=\"#6D768D\"></path><path d=\"M336.256 410.026667H253.312a40.021333 40.021333 0 0 0-39.850667 43.264l23.296 278.101333c1.706667 20.693333 19.072 36.608 39.850667 36.608h59.648c11.050667 0 20.010667-8.96 20.010667-19.968v-318.037333a19.968 19.968 0 0 0-20.010667-19.968z m434.432 0h-178.944C653.312 182.314667 548.949333 170.666667 548.949333 170.666667c-44.288 0-35.114667 34.986667-38.442666 40.832 0 84.48-68.010667 155.093333-101.034667 184.362666a39.552 39.552 0 0 0-13.226667 29.653334v322.56c0 11.008 8.96 19.925333 20.010667 19.925333h233.728c30.378667 0 58.154667-17.152 71.68-44.373333 18.176-36.736 40.448-90.112 54.656-133.973334 13.781333-42.410667 26.24-94.976 33.578667-131.968a39.850667 39.850667 0 0 0-39.253334-47.658666z\" fill=\"#FFFFFF\"></path></svg>"
  }, {
    name: '18',
    icon: "<svg viewBox=\"0 0 1024 1024\"><path d=\"M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z\" fill=\"#6D768D\"></path><path d=\"M796.16 413.909333c-31.146667-0.298667-115.626667-0.085333-146.858667-0.085333h-158.464c8.533333-7.68 15.914667-14.506667 23.594667-20.906667 29.781333-24.874667 25.813333-71.082667-14.208-88.874666-22.954667-10.24-44.970667-5.632-64 11.52-34.944 31.274667-69.632 62.677333-104.277333 93.994666a15.488 15.488 0 0 1-11.178667 4.437334c-11.221333-0.085333-26.88-0.128-46.933333-0.170667a17.066667 17.066667 0 0 0-17.109334 17.066667L256 719.701333a17.066667 17.066667 0 0 0 17.066667 17.152l49.578666-0.085333c3.968 0 7.466667 0.768 10.88 2.602667 15.829333 8.832 31.701333 17.493333 47.616 26.24a18.133333 18.133333 0 0 0 9.301334 2.346666h168.405333c6.186667 0 11.946667-0.981333 17.834667-2.56 29.44-7.253333 40.021333-30.293333 38.528-52.565333-0.768-9.728-4.266667-18.346667-9.984-26.24 19.626667-5.76 35.114667-16.213333 42.112-36.096 7.125333-20.394667 1.621333-38.4-12.672-53.333333 28.16-19.754667 34.858667-44.672 18.645333-75.648h140.458667c6.570667 0 13.013333-0.597333 19.370666-2.645334 31.957333-9.813333 48.810667-42.88 35.626667-71.552-10.154667-22.186667-28.629333-33.152-52.608-33.450666z\" fill=\"#FFFFFF\"></path></svg>"
  }, {
    name: '19',
    icon: "<svg viewBox=\"0 0 1024 1024\"><path d=\"M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z\" fill=\"#6D768D\"></path><path d=\"M270.506667 413.909333c31.146667-0.298667 115.626667-0.085333 146.858666-0.085333h158.464c-8.533333-7.68-15.914667-14.506667-23.594666-20.906667-29.781333-24.874667-25.813333-71.082667 14.208-88.874666 22.954667-10.24 44.970667-5.632 64 11.52 34.944 31.274667 69.632 62.677333 104.277333 93.994666 3.413333 2.986667 6.528 4.437333 11.178667 4.437334 11.221333-0.085333 26.88-0.128 46.933333-0.170667a17.066667 17.066667 0 0 1 17.109333 17.066667l0.682667 288.853333a17.066667 17.066667 0 0 1-17.066667 17.152l-49.578666-0.085333a22.101333 22.101333 0 0 0-10.88 2.602666c-15.829333 8.832-31.701333 17.493333-47.616 26.24a18.133333 18.133333 0 0 1-9.301334 2.346667h-168.405333a68.693333 68.693333 0 0 1-17.834667-2.56c-29.44-7.253333-40.021333-30.293333-38.528-52.565333 0.768-9.728 4.266667-18.346667 9.984-26.24-19.626667-5.76-35.114667-16.213333-42.112-36.096-7.125333-20.394667-1.621333-38.4 12.672-53.333334-28.16-19.754667-34.858667-44.672-18.645333-75.648H272.853333c-6.570667 0-13.013333-0.597333-19.370666-2.645333-31.957333-9.813333-48.810667-42.88-35.626667-71.552 10.154667-22.186667 28.629333-33.152 52.608-33.450667z\" fill=\"#FFFFFF\"></path></svg>"
  }, {
    name: '20',
    icon: "<svg viewBox=\"0 0 1024 1024\"><path d=\"M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z\" fill=\"#6D768D\"></path><path d=\"M667.733333 480.128H400v-111.36a97.706667 97.706667 0 0 1 97.621333-97.621333 97.706667 97.706667 0 0 1 97.578667 97.621333 28.885333 28.885333 0 0 0 57.813333 0A155.605333 155.605333 0 0 0 497.621333 213.333333a155.605333 155.605333 0 0 0-155.392 155.434667v111.36h-14.677333A28.885333 28.885333 0 0 0 298.666667 509.013333v292.010667a28.885333 28.885333 0 0 0 28.885333 28.885333h340.138667a28.885333 28.885333 0 0 0 28.928-28.885333V509.013333a28.885333 28.885333 0 0 0-28.928-28.885333z\" fill=\"#FFFFFF\"></path></svg>"
  }, {
    name: '21',
    icon: "<svg viewBox=\"0 0 1024 1024\"><path d=\"M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z\" fill=\"#6D768D\"></path><path d=\"M400.042667 437.461333v-111.36a97.706667 97.706667 0 0 1 97.621333-97.621333 97.706667 97.706667 0 0 1 97.578667 97.621333 28.885333 28.885333 0 0 0 57.813333 0A155.605333 155.605333 0 0 0 497.621333 170.666667a155.605333 155.605333 0 0 0-155.392 155.434666v111.36h-14.677333A28.885333 28.885333 0 0 0 298.666667 466.346667v292.010666a28.885333 28.885333 0 0 0 28.885333 28.885334h340.138667a28.885333 28.885333 0 0 0 28.928-28.885334V466.346667a28.885333 28.885333 0 0 0-28.928-28.885334H400.042667z\" fill=\"#FFFFFF\"></path><path d=\"M595.242667 437.461333v-111.36a97.706667 97.706667 0 0 0-97.621334-97.621333 97.706667 97.706667 0 0 0-97.578666 97.621333 28.885333 28.885333 0 0 1-57.813334 0A155.605333 155.605333 0 0 1 497.621333 170.666667a155.605333 155.605333 0 0 1 155.434667 155.434666v111.36h14.634667c16 0 28.928 12.928 28.928 28.885334v292.010666a28.885333 28.885333 0 0 1-28.928 28.885334H327.552A28.885333 28.885333 0 0 1 298.666667 758.357333V466.346667c0-15.957333 12.928-28.885333 28.885333-28.885334h267.690667z\" fill=\"#FFFFFF\"></path></svg>"
  }, {
    name: '22',
    icon: "<svg viewBox=\"0 0 1024 1024\"><path d=\"M511.999787 512.000213m-511.999787 0a511.999787 511.999787 0 1 0 1023.999573 0 511.999787 511.999787 0 1 0-1023.999573 0Z\" fill=\"#6D768D\"></path><path d=\"M381.354508 364.586941c0 54.015977 29.013321 103.935957 75.946635 130.986613a152.53327 152.53327 0 0 0 151.935936 0 151.12527 151.12527 0 0 0 75.946636-130.986613A151.594604 151.594604 0 0 0 533.333111 213.333671a151.594604 151.594604 0 0 0-151.89327 151.25327zM660.479725 498.901552a185.258589 185.258589 0 0 1-127.146614 50.346646c-49.066646 0-93.866628-19.199992-127.06128-50.346646C317.141201 544.853533 255.999893 637.440161 255.999893 744.106783c0 13.183995 10.709329 23.850657 23.978657 23.850657h506.709122a23.893323 23.893323 0 0 0 23.978657-23.893323c0-106.538622-61.098641-199.25325-150.186604-245.205232z\" fill=\"#FFFFFF\"></path></svg>"
  }, {
    name: '23',
    icon: "<svg viewBox=\"0 0 1024 1024\"><path d=\"M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z\" fill=\"#6D768D\"></path><path d=\"M445.610667 401.578667a129.322667 129.322667 0 1 0 258.645333 0 129.322667 129.322667 0 0 0-258.645333 0z m237.568 114.901333a157.354667 157.354667 0 0 1-216.362667 0 236.373333 236.373333 0 0 0-127.957333 209.706667c0 11.264 9.130667 20.394667 20.394666 20.394666h431.402667a20.394667 20.394667 0 0 0 20.394667-20.394666 236.373333 236.373333 0 0 0-127.872-209.706667zM409.813333 401.578667c0-40.362667 14.592-77.397333 38.698667-106.112a112.725333 112.725333 0 0 0-29.013333-3.925334 112.64 112.64 0 0 0-112.426667 112.469334 112.64 112.64 0 0 0 144.853333 107.648 164.693333 164.693333 0 0 1-42.112-110.08z m-18.602666 136.704a136.533333 136.533333 0 0 1-65.706667-34.474667 205.44 205.44 0 0 0-111.232 182.4c0 9.813333 7.936 17.706667 17.706667 17.706667H303.36a273.621333 273.621333 0 0 1 87.893333-165.632z\" fill=\"#FFFFFF\"></path></svg>"
  }]
}];
/** 
 * @Author: 王林 
 * @Date: 2021-06-23 22:36:56 
 * @Desc: 获取nodeIconList icon内容 
 */

var getNodeIconListIcon = function getNodeIconListIcon(name) {
  var arr = name.split('_');
  var typeData = nodeIconList.find(function (item) {
    return item.type === arr[0];
  });
  return typeData.list.find(function (item) {
    return item.name === arr[1];
  }).icon;
};

/* harmony default export */ var icons = ({
  hyperlink: icons_hyperlink,
  note: note,
  nodeIconList: nodeIconList,
  getNodeIconListIcon: getNodeIconListIcon
});
// CONCATENATED MODULE: ../simple-mind-map/src/Node.js















/** 
 * javascript comment 
 * @Author: 王林25 
 * @Date: 2021-04-06 11:26:00 
 * @Desc: 节点类
 */

var Node_Node = /*#__PURE__*/function () {
  /** 
   * javascript comment 
   * @Author: 王林25 
   * @Date: 2021-04-06 11:26:17 
   * @Desc: 构造函数 
   */
  function Node() {
    var opt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Node);

    // 节点数据
    this.nodeData = this.handleData(opt.data || {}); // id

    this.uid = opt.uid; // 控制实例

    this.mindMap = opt.mindMap; // 渲染实例

    this.renderer = opt.renderer; // 渲染器

    this.draw = opt.draw || null; // 主题配置

    this.themeConfig = this.mindMap.themeConfig; // 样式实例

    this.style = new src_Style(this, this.themeConfig); // 是否是根节点

    this.isRoot = opt.isRoot === undefined ? false : opt.isRoot; // 是否是概要节点

    this.isGeneralization = opt.isGeneralization === undefined ? false : opt.isGeneralization;
    this.generalizationBelongNode = null; // 节点层级

    this.layerIndex = opt.layerIndex === undefined ? 0 : opt.layerIndex; // 节点宽

    this.width = opt.width || 0; // 节点高

    this.height = opt.height || 0; // left

    this._left = opt.left || 0; // top

    this._top = opt.top || 0; // 自定义位置

    this.customLeft = opt.data.data.customLeft || undefined;
    this.customTop = opt.data.data.customTop || undefined; // 是否正在拖拽中

    this.isDrag = false; // 父节点

    this.parent = opt.parent || null; // 子节点

    this.children = opt.children || []; // 节点内容的容器

    this.group = null; // 节点内容对象

    this._imgData = null;
    this._iconData = null;
    this._textData = null;
    this._hyperlinkData = null;
    this._tagData = null;
    this._noteData = null;
    this.noteEl = null;
    this._expandBtn = null;
    this._lines = [];
    this._generalizationLine = null;
    this._generalizationNode = null; // 尺寸信息

    this._rectInfo = {
      imgContentWidth: 0,
      imgContentHeight: 0,
      textContentWidth: 0,
      textContentHeight: 0
    }; // 概要节点的宽高

    this._generalizationNodeWidth = 0;
    this._generalizationNodeHeight = 0; // 各种文字信息的间距

    this.textContentItemMargin = this.mindMap.opt.textContentMargin; // 图片和文字节点的间距

    this.blockContentMargin = this.mindMap.opt.imgTextMargin; // 展开收缩按钮尺寸

    this.expandBtnSize = this.mindMap.opt.expandBtnSize; // 初始渲染

    this.initRender = true; // 初始化
    // this.createNodeData()

    this.getSize();
  } // 支持自定义位置


  _createClass(Node, [{
    key: "left",
    get: function get() {
      return this.customLeft || this._left;
    },
    set: function set(val) {
      this._left = val;
    }
  }, {
    key: "top",
    get: function get() {
      return this.customTop || this._top;
    },
    set: function set(val) {
      this._top = val;
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-07-12 07:40:47 
     * @Desc: 更新主题配置 
     */

  }, {
    key: "updateThemeConfig",
    value: function updateThemeConfig() {
      // 主题配置
      this.themeConfig = this.mindMap.themeConfig; // 样式实例

      this.style.updateThemeConfig(this.themeConfig);
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-07-05 23:11:39 
     * @Desc: 复位部分布局时会重新设置的数据 
     */

  }, {
    key: "reset",
    value: function reset() {
      this.children = [];
      this.parent = null;
      this.isRoot = false;
      this.layerIndex = 0;
      this.left = 0;
      this.top = 0;
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-06-20 10:12:31 
     * @Desc: 处理数据 
     */

  }, {
    key: "handleData",
    value: function handleData(data) {
      data.data.expand = data.data.expand === false ? false : true;
      data.data.isActive = data.data.isActive === true ? true : false;
      data.children = data.children || [];
      return data;
    }
    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2022-08-02 19:53:40 
     * @Desc: 检查节点是否存在自定义数据 
     */

  }, {
    key: "hasCustomPosition",
    value: function hasCustomPosition() {
      return this.customLeft !== undefined && this.customTop !== undefined;
    }
    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2022-08-04 09:06:56 
     * @Desc: 检查节点是否存在自定义位置的祖先节点 
     */

  }, {
    key: "ancestorHasCustomPosition",
    value: function ancestorHasCustomPosition() {
      var node = this;

      while (node) {
        if (node.hasCustomPosition()) {
          return true;
        }

        node = node.parent;
      }

      return false;
    }
    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-04-06 15:55:04 
     * @Desc: 添加子节点 
     */

  }, {
    key: "addChildren",
    value: function addChildren(node) {
      this.children.push(node);
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-07-06 22:08:09 
     * @Desc: 创建节点的各个内容对象数据
     */

  }, {
    key: "createNodeData",
    value: function createNodeData() {
      this._imgData = this.createImgNode();
      this._iconData = this.createIconNode();
      this._textData = this.createTextNode();
      this._hyperlinkData = this.createHyperlinkNode();
      this._tagData = this.createTagNode();
      this._noteData = this.createNoteNode();
      this.createGeneralizationNode();
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-07-10 09:20:02 
     * @Desc: 解绑所有事件 
     */

  }, {
    key: "removeAllEvent",
    value: function removeAllEvent() {
      if (this._noteData) {
        this._noteData.node.off(['mouseover', 'mouseout']);
      }

      if (this._expandBtn) {
        this._expandBtn.off(['mouseover', 'mouseout', 'click']);
      }

      if (this.group) {
        this.group.off(['click', 'dblclick', 'contextmenu', 'mousedown', 'mouseup']);
      }
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-07-07 21:27:24 
     * @Desc: 移除节点内容
     */

  }, {
    key: "removeAllNode",
    value: function removeAllNode() {
      // 节点内的内容
      ;
      [this._imgData, this._iconData, this._textData, this._hyperlinkData, this._tagData, this._noteData].forEach(function (item) {
        if (item && item.node) item.node.remove();
      });
      this._imgData = null;
      this._iconData = null;
      this._textData = null;
      this._hyperlinkData = null;
      this._tagData = null;
      this._noteData = null; // 展开收缩按钮

      if (this._expandBtn) {
        this._expandBtn.remove();

        this._expandBtn = null;
      } // 组


      if (this.group) {
        this.group.clear();
        this.group.remove();
        this.group = null;
      } // 概要


      this.removeGeneralization();
    }
    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-04-09 09:46:23 
     * @Desc: 计算节点的宽高 
     */

  }, {
    key: "getSize",
    value: function getSize() {
      this.removeAllNode();
      this.createNodeData();

      var _this$getNodeRect = this.getNodeRect(),
          width = _this$getNodeRect.width,
          height = _this$getNodeRect.height; // 判断节点尺寸是否有变化


      var changed = this.width !== width || this.height !== height;
      this.width = width;
      this.height = height;
      return changed;
    }
    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-04-06 14:52:17 
     * @Desc: 计算节点尺寸信息 
     */

  }, {
    key: "getNodeRect",
    value: function getNodeRect() {
      var _this = this;

      // 宽高
      var imgContentWidth = 0;
      var imgContentHeight = 0;
      var textContentWidth = 0;
      var textContentHeight = 0; // 存在图片

      if (this._imgData) {
        this._rectInfo.imgContentWidth = imgContentWidth = this._imgData.width;
        this._rectInfo.imgContentHeight = imgContentHeight = this._imgData.height;
      } // 图标


      if (this._iconData.length > 0) {
        textContentWidth += this._iconData.reduce(function (sum, cur) {
          textContentHeight = Math.max(textContentHeight, cur.height);
          return sum += cur.width + _this.textContentItemMargin;
        }, 0);
      } // 文字


      if (this._textData) {
        textContentWidth += this._textData.width;
        textContentHeight = Math.max(textContentHeight, this._textData.height);
      } // 超链接


      if (this._hyperlinkData) {
        textContentWidth += this._hyperlinkData.width;
        textContentHeight = Math.max(textContentHeight, this._hyperlinkData.height);
      } // 标签


      if (this._tagData.length > 0) {
        textContentWidth += this._tagData.reduce(function (sum, cur) {
          textContentHeight = Math.max(textContentHeight, cur.height);
          return sum += cur.width + _this.textContentItemMargin;
        }, 0);
      } // 备注


      if (this._noteData) {
        textContentWidth += this._noteData.width;
        textContentHeight = Math.max(textContentHeight, this._noteData.height);
      } // 文字内容部分的尺寸


      this._rectInfo.textContentWidth = textContentWidth;
      this._rectInfo.textContentHeight = textContentHeight; // 间距

      var margin = imgContentHeight > 0 && textContentHeight > 0 ? this.blockContentMargin : 0;

      var _this$getPaddingVale = this.getPaddingVale(),
          paddingX = _this$getPaddingVale.paddingX,
          paddingY = _this$getPaddingVale.paddingY;

      return {
        width: Math.max(imgContentWidth, textContentWidth) + paddingX * 2,
        height: imgContentHeight + textContentHeight + paddingY * 2 + margin
      };
    }
    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-04-09 14:06:17 
     * @Desc: 创建图片节点 
     */

  }, {
    key: "createImgNode",
    value: function createImgNode() {
      var _Image$load;

      var img = this.nodeData.data.image;

      if (!img) {
        return;
      }

      var imgSize = this.getImgShowSize();

      var node = (_Image$load = new svg_esm_Image().load(img)).size.apply(_Image$load, _toConsumableArray(imgSize));

      if (this.nodeData.data.imageTitle) {
        node.attr('title', this.nodeData.data.imageTitle);
      }

      return {
        node: node,
        width: imgSize[0],
        height: imgSize[1]
      };
    }
    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-04-09 10:12:51 
     * @Desc: 获取图片显示宽高 
     */

  }, {
    key: "getImgShowSize",
    value: function getImgShowSize() {
      return resizeImgSize(this.nodeData.data.imageSize.width, this.nodeData.data.imageSize.height, this.themeConfig.imgMaxWidth, this.themeConfig.imgMaxHeight);
    }
    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-04-09 14:10:48 
     * @Desc: 创建icon节点 
     */

  }, {
    key: "createIconNode",
    value: function createIconNode() {
      var _data = this.nodeData.data;

      if (!_data.icon || _data.icon.length <= 0) {
        return [];
      }

      var iconSize = this.themeConfig.iconSize;
      return _data.icon.map(function (item) {
        return {
          node: SVG(icons.getNodeIconListIcon(item)).size(iconSize, iconSize),
          width: iconSize,
          height: iconSize
        };
      });
    }
    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-04-09 14:08:56 
     * @Desc: 创建文本节点 
     */

  }, {
    key: "createTextNode",
    value: function createTextNode() {
      var _this2 = this;

      var g = new G();
      var fontSize = this.getStyle('fontSize', this.isRoot, this.nodeData.data.isActive);
      var lineHeight = this.getStyle('lineHeight', this.isRoot, this.nodeData.data.isActive);
      this.nodeData.data.text.split(/\n/img).forEach(function (item, index) {
        var node = new Text().text(item);

        _this2.style.text(node);

        node.y(fontSize * lineHeight * index);
        g.add(node);
      });

      var _g$bbox = g.bbox(),
          width = _g$bbox.width,
          height = _g$bbox.height;

      return {
        node: g,
        width: width,
        height: height
      };
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-06-20 15:28:54 
     * @Desc: 创建超链接节点 
     */

  }, {
    key: "createHyperlinkNode",
    value: function createHyperlinkNode() {
      var _this$nodeData$data = this.nodeData.data,
          hyperlink = _this$nodeData$data.hyperlink,
          hyperlinkTitle = _this$nodeData$data.hyperlinkTitle;

      if (!hyperlink) {
        return;
      }

      var iconSize = this.themeConfig.iconSize;
      var node = new SVG(); // 超链接节点

      var a = new A().to(hyperlink).target('_blank');
      a.node.addEventListener('click', function (e) {
        e.stopPropagation();
      });

      if (hyperlinkTitle) {
        a.attr('title', hyperlinkTitle);
      } // 添加一个透明的层，作为鼠标区域


      a.rect(iconSize, iconSize).fill({
        color: 'transparent'
      }); // 超链接图标

      var iconNode = SVG(icons.hyperlink).size(iconSize, iconSize);
      this.style.iconNode(iconNode);
      a.add(iconNode);
      node.add(a);
      return {
        node: node,
        width: iconSize,
        height: iconSize
      };
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-06-20 19:49:15 
     * @Desc: 创建标签节点 
     */

  }, {
    key: "createTagNode",
    value: function createTagNode() {
      var _this3 = this;

      var tagData = this.nodeData.data.tag;

      if (!tagData || tagData.length <= 0) {
        return [];
      }

      var nodes = [];
      tagData.slice(0, this.mindMap.opt.maxTag).forEach(function (item, index) {
        var tag = new G(); // 标签文本

        var text = new Text().text(item).x(8).cy(10);

        _this3.style.tagText(text, index);

        var _text$bbox = text.bbox(),
            width = _text$bbox.width,
            height = _text$bbox.height; // 标签矩形


        var rect = new Rect().size(width + 16, 20);

        _this3.style.tagRect(rect, index);

        tag.add(rect).add(text);
        nodes.push({
          node: tag,
          width: width + 16,
          height: 20
        });
      });
      return nodes;
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-06-20 21:19:36 
     * @Desc: 创建备注节点 
     */

  }, {
    key: "createNoteNode",
    value: function createNoteNode() {
      var _this4 = this;

      if (!this.nodeData.data.note) {
        return null;
      }

      var iconSize = this.themeConfig.iconSize;
      var node = new SVG().attr('cursor', 'pointer'); // 透明的层，用来作为鼠标区域

      node.add(new Rect().size(iconSize, iconSize).fill({
        color: 'transparent'
      })); // 备注图标

      var iconNode = SVG(icons.note).size(iconSize, iconSize);
      this.style.iconNode(iconNode);
      node.add(iconNode); // 备注tooltip

      if (!this.mindMap.opt.customNoteContentShow) {
        if (!this.noteEl) {
          this.noteEl = document.createElement('div');
          this.noteEl.style.cssText = "\n                    position: absolute;\n                    padding: 10px;\n                    border-radius: 5px;\n                    box-shadow: 0 2px 5px rgb(0 0 0 / 10%);\n                    display: none;\n                    background-color: #fff;\n                ";
          document.body.appendChild(this.noteEl);
        }

        this.noteEl.innerText = this.nodeData.data.note;
      }

      node.on('mouseover', function () {
        var _node$node$getBoundin = node.node.getBoundingClientRect(),
            left = _node$node$getBoundin.left,
            top = _node$node$getBoundin.top;

        if (!_this4.mindMap.opt.customNoteContentShow) {
          _this4.noteEl.style.left = left + 'px';
          _this4.noteEl.style.top = top + iconSize + 'px';
          _this4.noteEl.style.display = 'block';
        } else {
          _this4.mindMap.opt.customNoteContentShow.show(_this4.nodeData.data.note, left, top + iconSize);
        }
      });
      node.on('mouseout', function () {
        if (!_this4.mindMap.opt.customNoteContentShow) {
          _this4.noteEl.style.display = 'none';
        } else {
          _this4.mindMap.opt.customNoteContentShow.hide();
        }
      });
      return {
        node: node,
        width: iconSize,
        height: iconSize
      };
    }
    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-04-09 11:10:11 
     * @Desc: 定位节点内容
     */

  }, {
    key: "layout",
    value: function layout() {
      var _this5 = this;

      var width = this.width,
          height = this.height,
          textContentItemMargin = this.textContentItemMargin;

      var _this$getPaddingVale2 = this.getPaddingVale(),
          paddingY = _this$getPaddingVale2.paddingY; // 创建组


      this.group = new G(); // 概要节点添加一个带所属节点id的类名

      if (this.isGeneralization && this.generalizationBelongNode) {
        this.group.addClass('generalization_' + this.generalizationBelongNode.uid);
      }

      this.draw.add(this.group);
      this.update(true); // 节点矩形

      this.style.rect(this.group.rect(width, height)); // 图片节点

      var imgHeight = 0;

      if (this._imgData) {
        imgHeight = this._imgData.height;
        this.group.add(this._imgData.node);

        this._imgData.node.cx(width / 2).y(paddingY);
      } // 内容节点


      var textContentNested = new G();
      var textContentOffsetX = 0; // icon

      var iconNested = new G();

      if (this._iconData && this._iconData.length > 0) {
        var iconLeft = 0;

        this._iconData.forEach(function (item) {
          item.node.x(textContentOffsetX + iconLeft).y((_this5._rectInfo.textContentHeight - item.height) / 2);
          iconNested.add(item.node);
          iconLeft += item.width + textContentItemMargin;
        });

        textContentNested.add(iconNested);
        textContentOffsetX += iconLeft;
      } // 文字


      if (this._textData) {
        this._textData.node.x(textContentOffsetX).y(0);

        textContentNested.add(this._textData.node);
        textContentOffsetX += this._textData.width + textContentItemMargin;
      } // 超链接


      if (this._hyperlinkData) {
        this._hyperlinkData.node.x(textContentOffsetX).y((this._rectInfo.textContentHeight - this._hyperlinkData.height) / 2);

        textContentNested.add(this._hyperlinkData.node);
        textContentOffsetX += this._hyperlinkData.width + textContentItemMargin;
      } // 标签


      var tagNested = new G();

      if (this._tagData && this._tagData.length > 0) {
        var tagLeft = 0;

        this._tagData.forEach(function (item) {
          item.node.x(textContentOffsetX + tagLeft).y((_this5._rectInfo.textContentHeight - item.height) / 2);
          tagNested.add(item.node);
          tagLeft += item.width + textContentItemMargin;
        });

        textContentNested.add(tagNested);
        textContentOffsetX += tagLeft;
      } // 备注


      if (this._noteData) {
        this._noteData.node.x(textContentOffsetX).y((this._rectInfo.textContentHeight - this._noteData.height) / 2);

        textContentNested.add(this._noteData.node);
        textContentOffsetX += this._noteData.width;
      } // 文字内容整体


      textContentNested.translate(width / 2 - textContentNested.bbox().width / 2, imgHeight + paddingY + (imgHeight > 0 && this._rectInfo.textContentHeight > 0 ? this.blockContentMargin : 0));
      this.group.add(textContentNested); // 单击事件，选中节点

      this.group.on('click', function (e) {
        _this5.mindMap.emit('node_click', _this5, e);

        _this5.active(e);
      });
      this.group.on('mousedown', function (e) {
        e.stopPropagation();

        _this5.mindMap.emit('node_mousedown', _this5, e);
      });
      this.group.on('mouseup', function (e) {
        e.stopPropagation();

        _this5.mindMap.emit('node_mouseup', _this5, e);
      }); // 双击事件

      this.group.on('dblclick', function (e) {
        if (_this5.mindMap.opt.readonly) {
          return;
        }

        e.stopPropagation();

        _this5.mindMap.emit('node_dblclick', _this5, e);
      }); // 右键菜单事件

      this.group.on('contextmenu', function (e) {
        if (_this5.mindMap.opt.readonly || _this5.isGeneralization) {
          return;
        }

        e.stopPropagation();
        e.preventDefault();

        if (_this5.nodeData.data.isActive) {
          _this5.renderer.clearActive();
        }

        _this5.active(e);

        _this5.mindMap.emit('node_contextmenu', e, _this5);
      });
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-07-10 16:44:22 
     * @Desc: 激活节点 
     */

  }, {
    key: "active",
    value: function active(e) {
      if (this.mindMap.opt.readonly) {
        return;
      }

      e.stopPropagation();

      if (this.nodeData.data.isActive) {
        return;
      }

      this.mindMap.emit('before_node_active', this, this.renderer.activeNodeList);
      this.renderer.clearActive();
      this.mindMap.execCommand('SET_NODE_ACTIVE', this, true);
      this.renderer.addActiveNode(this);
      this.mindMap.emit('node_active', this, this.renderer.activeNodeList);
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-07-04 20:20:09 
     * @Desc: 渲染节点到画布，会移除旧的，创建新的
     */

  }, {
    key: "renderNode",
    value: function renderNode() {
      this.removeAllEvent();
      this.removeAllNode();
      this.createNodeData();
      this.layout();
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-07-04 22:47:01 
     * @Desc: 更新节点
     */

  }, {
    key: "update",
    value: function update() {
      var layout = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (!this.group) {
        return;
      } // 需要移除展开收缩按钮


      if (this._expandBtn && this.nodeData.children.length <= 0) {
        this.removeExpandBtn();
      } else if (!this._expandBtn && this.nodeData.children.length > 0) {
        // 需要添加展开收缩按钮
        this.renderExpandBtn();
      } else {
        this.updateExpandBtnPos();
      }

      this.renderGeneralization();
      var t = this.group.transform();

      if (!layout) {
        this.group.animate(300).translate(this.left - t.translateX, this.top - t.translateY);
      } else {
        this.group.translate(this.left - t.translateX, this.top - t.translateY);
      }
    }
    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-04-07 13:55:58 
     * @Desc: 递归渲染 
     */

  }, {
    key: "render",
    value: function render() {
      // 连线
      this.renderLine(); // 节点

      if (this.initRender) {
        this.initRender = false;
        this.renderNode();
      } else {
        this.update();
      } // 子节点


      if (this.children && this.children.length && this.nodeData.data.expand !== false) {
        asyncRun(this.children.map(function (item) {
          return function () {
            item.render();
          };
        }));
      }
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-07-10 09:24:55 
     * @Desc: 递归删除 
     */

  }, {
    key: "remove",
    value: function remove() {
      this.initRender = true;
      this.removeAllEvent();
      this.removeAllNode();
      this.removeLine(); // 子节点

      if (this.children && this.children.length) {
        asyncRun(this.children.map(function (item) {
          return function () {
            item.remove();
          };
        }));
      }
    }
    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-11-23 18:39:14 
     * @Desc: 隐藏节点 
     */

  }, {
    key: "hide",
    value: function hide() {
      this.group.hide();
      this.hideGeneralization();

      if (this.parent) {
        var index = this.parent.children.indexOf(this);

        this.parent._lines[index].hide();
      } // 子节点


      if (this.children && this.children.length) {
        asyncRun(this.children.map(function (item) {
          return function () {
            item.hide();
          };
        }));
      }
    }
    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-11-23 18:39:14 
     * @Desc: 显示节点 
     */

  }, {
    key: "show",
    value: function show() {
      if (!this.group) {
        return;
      }

      this.group.show();
      this.showGeneralization();

      if (this.parent) {
        var index = this.parent.children.indexOf(this);

        this.parent._lines[index].show();
      } // 子节点


      if (this.children && this.children.length) {
        asyncRun(this.children.map(function (item) {
          return function () {
            item.show();
          };
        }));
      }
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-04-10 22:01:53 
     * @Desc: 连线 
     */

  }, {
    key: "renderLine",
    value: function renderLine() {
      var _this6 = this;

      if (this.nodeData.data.expand === false) {
        return;
      }

      var childrenLen = this.nodeData.children.length;

      if (childrenLen > this._lines.length) {
        // 创建缺少的线
        new Array(childrenLen - this._lines.length).fill(0).forEach(function () {
          _this6._lines.push(_this6.draw.path());
        });
      } else if (childrenLen < this._lines.length) {
        // 删除多余的线
        this._lines.slice(childrenLen).forEach(function (line) {
          line.remove();
        });

        this._lines = this._lines.slice(0, childrenLen);
      } // 画线


      this.renderer.layout.renderLine(this, this._lines); // 添加样式

      this._lines.forEach(function (line) {
        _this6.style.line(line);
      });
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-07-10 16:40:21 
     * @Desc: 移除连线 
     */

  }, {
    key: "removeLine",
    value: function removeLine() {
      this._lines.forEach(function (line) {
        line.remove();
      });

      this._lines = [];
    }
    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2022-08-01 09:27:30 
     * @Desc: 检查是否存在概要 
     */

  }, {
    key: "checkHasGeneralization",
    value: function checkHasGeneralization() {
      return !!this.nodeData.data.generalization;
    }
    /** 
     * @Author: 王林 
     * @Date: 2022-07-31 09:41:28 
     * @Desc: 创建概要节点 
     */

  }, {
    key: "createGeneralizationNode",
    value: function createGeneralizationNode() {
      if (this.isGeneralization || !this.checkHasGeneralization()) {
        return;
      }

      if (!this._generalizationLine) {
        this._generalizationLine = this.draw.path();
      }

      if (!this._generalizationNode) {
        this._generalizationNode = new Node({
          data: {
            data: this.nodeData.data.generalization
          },
          uid: this.mindMap.uid++,
          renderer: this.renderer,
          mindMap: this.mindMap,
          draw: this.draw,
          isGeneralization: true
        });
        this._generalizationNodeWidth = this._generalizationNode.width;
        this._generalizationNodeHeight = this._generalizationNode.height;
        this._generalizationNode.generalizationBelongNode = this;

        if (this.nodeData.data.generalization.isActive) {
          this.renderer.addActiveNode(this._generalizationNode);
        }
      }
    }
    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2022-08-01 15:38:52 
     * @Desc: 更新概要节点 
     */

  }, {
    key: "updateGeneralization",
    value: function updateGeneralization() {
      this.removeGeneralization();
      this.createGeneralizationNode();
    }
    /** 
     * @Author: 王林 
     * @Date: 2022-07-30 08:35:51 
     * @Desc: 渲染概要节点 
     */

  }, {
    key: "renderGeneralization",
    value: function renderGeneralization() {
      if (this.isGeneralization) {
        return;
      }

      if (!this.checkHasGeneralization()) {
        this.removeGeneralization();
        this._generalizationNodeWidth = 0;
        this._generalizationNodeHeight = 0;
        return;
      }

      if (this.nodeData.data.expand === false) {
        this.removeGeneralization();
        return;
      }

      this.createGeneralizationNode();
      this.renderer.layout.renderGeneralization(this, this._generalizationLine, this._generalizationNode);
      this.style.generalizationLine(this._generalizationLine);

      this._generalizationNode.render();
    }
    /** 
     * @Author: 王林 
     * @Date: 2022-07-30 13:11:27 
     * @Desc: 删除概要节点 
     */

  }, {
    key: "removeGeneralization",
    value: function removeGeneralization() {
      if (this._generalizationLine) {
        this._generalizationLine.remove();

        this._generalizationLine = null;
      }

      if (this._generalizationNode) {
        // 删除概要节点时要同步从激活节点里删除
        this.renderer.removeActiveNode(this._generalizationNode);

        this._generalizationNode.remove();

        this._generalizationNode = null;
      } // hack修复当激活一个节点时创建概要，然后立即激活创建的概要节点后会重复创建概要节点并且无法删除的问题


      if (this.generalizationBelongNode) {
        this.draw.find('.generalization_' + this.generalizationBelongNode.uid).remove();
      }
    }
    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2022-08-01 09:56:46 
     * @Desc: 隐藏概要节点 
     */

  }, {
    key: "hideGeneralization",
    value: function hideGeneralization() {
      if (this._generalizationLine) {
        this._generalizationLine.hide();
      }

      if (this._generalizationNode) {
        this._generalizationNode.hide();
      }
    }
    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2022-08-01 09:57:42 
     * @Desc: 显示概要节点 
     */

  }, {
    key: "showGeneralization",
    value: function showGeneralization() {
      if (this._generalizationLine) {
        this._generalizationLine.show();
      }

      if (this._generalizationNode) {
        this._generalizationNode.show();
      }
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-07-10 17:59:14 
     * @Desc: 创建或更新展开收缩按钮内容 
     */

  }, {
    key: "updateExpandBtnNode",
    value: function updateExpandBtnNode() {
      if (this._expandBtn) {
        this._expandBtn.clear();
      }

      var iconSvg;

      if (this.nodeData.data.expand === false) {
        iconSvg = btns.open;
      } else {
        iconSvg = btns.close;
      }

      var node = SVG(iconSvg).size(this.expandBtnSize, this.expandBtnSize);
      var fillNode = new Circle().size(this.expandBtnSize);
      node.x(0).y(-this.expandBtnSize / 2);
      fillNode.x(0).y(-this.expandBtnSize / 2);
      this.style.iconBtn(node, fillNode);

      this._expandBtn.add(fillNode).add(node);
    }
    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-07-12 18:18:13 
     * @Desc: 更新展开收缩按钮位置 
     */

  }, {
    key: "updateExpandBtnPos",
    value: function updateExpandBtnPos() {
      if (!this._expandBtn) {
        return;
      }

      this.renderer.layout.renderExpandBtn(this, this._expandBtn);
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-04-11 19:47:01 
     * @Desc: 展开收缩按钮 
     */

  }, {
    key: "renderExpandBtn",
    value: function renderExpandBtn() {
      var _this7 = this;

      if (!this.nodeData.children || this.nodeData.children.length <= 0 || this.isRoot) {
        return;
      }

      this._expandBtn = new G();
      this.updateExpandBtnNode();

      this._expandBtn.on('mouseover', function (e) {
        e.stopPropagation();

        _this7._expandBtn.css({
          cursor: 'pointer'
        });
      });

      this._expandBtn.on('mouseout', function (e) {
        e.stopPropagation();

        _this7._expandBtn.css({
          cursor: 'auto'
        });
      });

      this._expandBtn.on('click', function (e) {
        e.stopPropagation(); // 展开收缩

        _this7.mindMap.execCommand('SET_NODE_EXPAND', _this7, !_this7.nodeData.data.expand);

        _this7.mindMap.emit('expand_btn_click', _this7);
      });

      this.group.add(this._expandBtn);
      this.updateExpandBtnPos();
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-07-11 13:26:00 
     * @Desc: 移除展开收缩按钮 
     */

  }, {
    key: "removeExpandBtn",
    value: function removeExpandBtn() {
      if (this._expandBtn) {
        this._expandBtn.off(['mouseover', 'mouseout', 'click']);

        this._expandBtn.clear();

        this._expandBtn.remove();

        this._expandBtn = null;
      }
    }
    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-11-25 09:51:37 
     * @Desc: 检测当前节点是否是某个节点的祖先节点
     */

  }, {
    key: "isParent",
    value: function isParent(node) {
      if (this === node) {
        return false;
      }

      var parent = node.parent;

      while (parent) {
        if (this === parent) {
          return true;
        }

        parent = parent.parent;
      }

      return false;
    }
    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-11-25 10:32:34 
     * @Desc: 检测当前节点是否是某个节点的兄弟节点
     */

  }, {
    key: "isBrother",
    value: function isBrother(node) {
      if (!this.parent || this === node) {
        return false;
      }

      return this.parent.children.find(function (item) {
        return item === node;
      });
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-06-20 22:51:57 
     * @Desc: 获取padding值 
     */

  }, {
    key: "getPaddingVale",
    value: function getPaddingVale() {
      return {
        paddingX: this.getStyle('paddingX', true, this.nodeData.data.isActive),
        paddingY: this.getStyle('paddingY', true, this.nodeData.data.isActive)
      };
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-05-04 21:48:49 
     * @Desc: 获取某个样式 
     */

  }, {
    key: "getStyle",
    value: function getStyle(prop, root, isActive) {
      var v = this.style.merge(prop, root, isActive);
      return v === undefined ? '' : v;
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-05-04 22:18:07 
     * @Desc: 修改某个样式 
     */

  }, {
    key: "setStyle",
    value: function setStyle(prop, value, isActive) {
      this.mindMap.execCommand('SET_NODE_STYLE', this, prop, value, isActive);
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-06-22 22:04:02 
     * @Desc: 获取数据 
     */

  }, {
    key: "getData",
    value: function getData(key) {
      return key ? this.nodeData.data[key] || '' : this.nodeData.data;
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-06-22 22:12:01 
     * @Desc: 设置数据 
     */

  }, {
    key: "setData",
    value: function setData() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      this.mindMap.execCommand('SET_NODE_DATA', this, data);
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-07-10 08:41:28 
     * @Desc: 设置文本 
     */

  }, {
    key: "setText",
    value: function setText(text) {
      this.mindMap.execCommand('SET_NODE_TEXT', this, text);
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-07-10 08:42:19 
     * @Desc: 设置图片 
     */

  }, {
    key: "setImage",
    value: function setImage(imgData) {
      this.mindMap.execCommand('SET_NODE_IMAGE', this, imgData);
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-07-10 08:47:29 
     * @Desc: 设置图标 
     */

  }, {
    key: "setIcon",
    value: function setIcon(icons) {
      this.mindMap.execCommand('SET_NODE_ICON', this, icons);
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-07-10 08:50:41 
     * @Desc: 设置超链接 
     */

  }, {
    key: "setHyperlink",
    value: function setHyperlink(link, title) {
      this.mindMap.execCommand('SET_NODE_HYPERLINK', this, link, title);
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-07-10 08:53:24 
     * @Desc: 设置备注 
     */

  }, {
    key: "setNote",
    value: function setNote(note) {
      this.mindMap.execCommand('SET_NODE_NOTE', this, note);
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-07-10 08:55:08 
     * @Desc: 设置标签 
     */

  }, {
    key: "setTag",
    value: function setTag(tag) {
      this.mindMap.execCommand('SET_NODE_TAG', this, tag);
    }
  }]);

  return Node;
}();

/* harmony default export */ var src_Node = (Node_Node);
// CONCATENATED MODULE: ../simple-mind-map/src/layouts/Base.js






/** 
 * @Author: 王林 
 * @Date: 2021-04-12 22:24:30 
 * @Desc: 布局基类 
 */

var Base_Base = /*#__PURE__*/function () {
  /** 
   * @Author: 王林 
   * @Date: 2021-04-12 22:25:16 
   * @Desc: 构造函数 
   */
  function Base(renderer) {
    _classCallCheck(this, Base);

    // 渲染实例
    this.renderer = renderer; // 控制实例

    this.mindMap = renderer.mindMap; // 绘图对象

    this.draw = this.mindMap.draw; // 根节点

    this.root = null;
  }
  /** 
   * @Author: 王林 
   * @Date: 2021-04-12 22:39:50 
   * @Desc: 计算节点位置 
   */


  _createClass(Base, [{
    key: "doLayout",
    value: function doLayout() {
      throw new Error('【computed】方法为必要方法，需要子类进行重写！');
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-04-12 22:41:04 
     * @Desc: 连线 
     */

  }, {
    key: "renderLine",
    value: function renderLine() {
      throw new Error('【renderLine】方法为必要方法，需要子类进行重写！');
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-04-12 22:42:08 
     * @Desc: 定位展开收缩按钮 
     */

  }, {
    key: "renderExpandBtn",
    value: function renderExpandBtn() {
      throw new Error('【renderExpandBtn】方法为必要方法，需要子类进行重写！');
    }
    /** 
     * @Author: 王林 
     * @Date: 2022-07-30 22:49:28 
     * @Desc: 概要节点 
     */

  }, {
    key: "renderGeneralization",
    value: function renderGeneralization() {}
    /** 
     * @Author: 王林 
     * @Date: 2021-07-10 21:30:54 
     * @Desc: 创建节点实例 
     */

  }, {
    key: "createNode",
    value: function createNode(data, parent, isRoot, layerIndex) {
      // 创建节点
      var newNode = null; // 复用节点

      if (data && data._node && !this.renderer.reRender) {
        newNode = data._node;
        newNode.reset();
        newNode.layerIndex = layerIndex;
      } else {
        // 创建新节点
        newNode = new src_Node({
          data: data,
          uid: this.mindMap.uid++,
          renderer: this.renderer,
          mindMap: this.mindMap,
          draw: this.draw,
          layerIndex: layerIndex
        });
        newNode.getSize(); // 数据关联实际节点

        data._node = newNode;

        if (data.data.isActive) {
          this.renderer.addActiveNode(newNode);
        }
      } // 根节点


      if (isRoot) {
        newNode.isRoot = true;
        this.root = newNode;
      } else {
        // 互相收集
        newNode.parent = parent._node;

        parent._node.addChildren(newNode);
      }

      return newNode;
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-07-16 13:48:43 
     * @Desc: 定位节点到画布中间 
     */

  }, {
    key: "setNodeCenter",
    value: function setNodeCenter(node) {
      node.left = (this.mindMap.width - node.width) / 2;
      node.top = (this.mindMap.height - node.height) / 2;
    }
    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-04-07 11:25:52 
     * @Desc: 更新子节点属性 
     */

  }, {
    key: "updateChildren",
    value: function updateChildren(children, prop, offset) {
      var _this = this;

      children.forEach(function (item) {
        item[prop] += offset;

        if (item.children && item.children.length && !item.hasCustomPosition()) {
          // 适配自定义位置
          _this.updateChildren(item.children, prop, offset);
        }
      });
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-04-11 15:05:01 
     * @Desc: 二次贝塞尔曲线 
     */

  }, {
    key: "quadraticCurvePath",
    value: function quadraticCurvePath(x1, y1, x2, y2) {
      var cx = x1 + (x2 - x1) * 0.2;
      var cy = y1 + (y2 - y1) * 0.8;
      return "M ".concat(x1, ",").concat(y1, " Q ").concat(cx, ",").concat(cy, " ").concat(x2, ",").concat(y2);
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-04-11 15:05:18 
     * @Desc: 三次贝塞尔曲线 
     */

  }, {
    key: "cubicBezierPath",
    value: function cubicBezierPath(x1, y1, x2, y2) {
      var cx1 = x1 + (x2 - x1) / 2;
      var cy1 = y1;
      var cx2 = cx1;
      var cy2 = y2;
      return "M ".concat(x1, ",").concat(y1, " C ").concat(cx1, ",").concat(cy1, " ").concat(cx2, ",").concat(cy2, " ").concat(x2, ",").concat(y2);
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-06-27 19:00:07 
     * @Desc:  获取节点的marginX
     */

  }, {
    key: "getMarginX",
    value: function getMarginX(layerIndex) {
      return layerIndex === 1 ? this.mindMap.themeConfig.second.marginX : this.mindMap.themeConfig.node.marginX;
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-04-11 15:34:20 
     * @Desc: 获取节点的marginY
     */

  }, {
    key: "getMarginY",
    value: function getMarginY(layerIndex) {
      return layerIndex === 1 ? this.mindMap.themeConfig.second.marginY : this.mindMap.themeConfig.node.marginY;
    }
    /** 
     * @Author: 王林 
     * @Date: 2022-07-31 20:53:12 
     * @Desc: 获取节点包括概要在内的宽度 
     */

  }, {
    key: "getNodeWidthWithGeneralization",
    value: function getNodeWidthWithGeneralization(node) {
      return Math.max(node.width, node.checkHasGeneralization() ? node._generalizationNodeWidth : 0);
    }
    /** 
     * @Author: 王林 
     * @Date: 2022-07-31 20:53:12 
     * @Desc: 获取节点包括概要在内的高度 
     */

  }, {
    key: "getNodeHeightWithGeneralization",
    value: function getNodeHeightWithGeneralization(node) {
      return Math.max(node.height, node.checkHasGeneralization() ? node._generalizationNodeHeight : 0);
    }
    /** 
     * @Author: 王林 
     * @Date: 2022-07-31 09:14:03 
     * @Desc: 获取节点的边界值 
     * dir：生长方向，h（水平）、v（垂直）
     * isLeft：是否向左生长
     */

  }, {
    key: "getNodeBoundaries",
    value: function getNodeBoundaries(node, dir, isLeft) {
      var _this$mindMap$themeCo = this.mindMap.themeConfig,
          generalizationLineMargin = _this$mindMap$themeCo.generalizationLineMargin,
          generalizationNodeMargin = _this$mindMap$themeCo.generalizationNodeMargin;

      var walk = function walk(root) {
        var _left = Infinity;

        var _right = -Infinity;

        var _top = Infinity;

        var _bottom = -Infinity;

        if (root.children && root.children.length > 0) {
          root.children.forEach(function (child) {
            var _walk = walk(child),
                left = _walk.left,
                right = _walk.right,
                top = _walk.top,
                bottom = _walk.bottom; // 概要内容的宽度


            var generalizationWidth = child.checkHasGeneralization() && child.nodeData.data.expand ? child._generalizationNodeWidth + generalizationNodeMargin : 0; // 概要内容的高度

            var generalizationHeight = child.checkHasGeneralization() && child.nodeData.data.expand ? child._generalizationNodeHeight + generalizationNodeMargin : 0;

            if (left - (dir === 'h' ? generalizationWidth : 0) < _left) {
              _left = left - (dir === 'h' ? generalizationWidth : 0);
            }

            if (right + (dir === 'h' ? generalizationWidth : 0) > _right) {
              _right = right + (dir === 'h' ? generalizationWidth : 0);
            }

            if (top < _top) {
              _top = top;
            }

            if (bottom + (dir === 'v' ? generalizationHeight : 0) > _bottom) {
              _bottom = bottom + (dir === 'v' ? generalizationHeight : 0);
            }
          });
        }

        var cur = {
          left: root.left,
          right: root.left + root.width,
          top: root.top,
          bottom: root.top + root.height
        };
        return {
          left: cur.left < _left ? cur.left : _left,
          right: cur.right > _right ? cur.right : _right,
          top: cur.top < _top ? cur.top : _top,
          bottom: cur.bottom > _bottom ? cur.bottom : _bottom
        };
      };

      var _walk2 = walk(node),
          left = _walk2.left,
          right = _walk2.right,
          top = _walk2.top,
          bottom = _walk2.bottom;

      return {
        left: left,
        right: right,
        top: top,
        bottom: bottom,
        generalizationLineMargin: generalizationLineMargin,
        generalizationNodeMargin: generalizationNodeMargin
      };
    }
  }]);

  return Base;
}();

/* harmony default export */ var layouts_Base = (Base_Base);
// CONCATENATED MODULE: ../simple-mind-map/src/layouts/LogicalStructure.js









/** 
 * @Author: 王林 
 * @Date: 2021-04-12 22:25:58 
 * @Desc: 逻辑结构图 
 */

var LogicalStructure_LogicalStructure = /*#__PURE__*/function (_Base) {
  _inherits(LogicalStructure, _Base);

  var _super = _createSuper(LogicalStructure);

  /** 
   * @Author: 王林 
   * @Date: 2021-04-12 22:26:31 
   * @Desc: 构造函数 
   */
  function LogicalStructure() {
    var opt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, LogicalStructure);

    return _super.call(this, opt);
  }
  /** 
   * javascript comment 
   * @Author: 王林25 
   * @Date: 2021-04-06 14:04:20 
   * @Desc: 布局
   */


  _createClass(LogicalStructure, [{
    key: "doLayout",
    value: function doLayout(callback) {
      var _this = this;

      var task = [function () {
        _this.computedBaseValue();
      }, function () {
        _this.computedTopValue();
      }, function () {
        _this.adjustTopValue();
      }, function () {
        callback(_this.root);
      }];
      asyncRun(task);
    }
    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-04-08 09:49:32 
     * @Desc: 遍历数据计算节点的left、width、height
     */

  }, {
    key: "computedBaseValue",
    value: function computedBaseValue() {
      var _this2 = this;

      walk(this.renderer.renderTree, null, function (cur, parent, isRoot, layerIndex) {
        var newNode = _this2.createNode(cur, parent, isRoot, layerIndex); // 根节点定位在画布中心位置


        if (isRoot) {
          _this2.setNodeCenter(newNode);
        } else {
          // 非根节点
          // 定位到父节点右侧
          newNode.left = parent._node.left + parent._node.width + _this2.getMarginX(layerIndex);
        }

        if (!cur.data.expand) {
          return true;
        }
      }, function (cur, parent, isRoot, layerIndex) {
        // 返回时计算节点的areaHeight，也就是子节点所占的高度之和，包括外边距
        var len = cur.data.expand === false ? 0 : cur._node.children.length;
        cur._node.childrenAreaHeight = len ? cur._node.children.reduce(function (h, item) {
          return h + item.height;
        }, 0) + (len + 1) * _this2.getMarginY(layerIndex + 1) : 0;
      }, true, 0);
    }
    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-04-08 09:59:25 
     * @Desc: 遍历节点树计算节点的top 
     */

  }, {
    key: "computedTopValue",
    value: function computedTopValue() {
      var _this3 = this;

      walk(this.root, null, function (node, parent, isRoot, layerIndex) {
        if (node.nodeData.data.expand && node.children && node.children.length) {
          var marginY = _this3.getMarginY(layerIndex + 1); // 第一个子节点的top值 = 该节点中心的top值 - 子节点的高度之和的一半


          var top = node.top + node.height / 2 - node.childrenAreaHeight / 2;
          var totalTop = top + marginY;
          node.children.forEach(function (cur) {
            cur.top = totalTop;
            totalTop += cur.height + marginY;
          });
        }
      }, null, true);
    }
    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-04-08 10:04:05 
     * @Desc: 调整节点top 
     */

  }, {
    key: "adjustTopValue",
    value: function adjustTopValue() {
      var _this4 = this;

      walk(this.root, null, function (node, parent, isRoot, layerIndex) {
        if (!node.nodeData.data.expand) {
          return;
        } // 判断子节点所占的高度之和是否大于该节点自身，大于则需要调整位置


        var difference = node.childrenAreaHeight - _this4.getMarginY(layerIndex + 1) * 2 - node.height;

        if (difference > 0) {
          _this4.updateBrothers(node, difference / 2);
        }
      }, null, true);
    }
    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-04-07 14:26:03 
     * @Desc: 更新兄弟节点的top
     */

  }, {
    key: "updateBrothers",
    value: function updateBrothers(node, addHeight) {
      var _this5 = this;

      if (node.parent) {
        var childrenList = node.parent.children;
        var index = childrenList.findIndex(function (item) {
          return item === node;
        });
        childrenList.forEach(function (item, _index) {
          if (item === node || item.hasCustomPosition()) {
            // 适配自定义位置
            return;
          }

          var _offset = 0; // 上面的节点往上移

          if (_index < index) {
            _offset = -addHeight;
          } else if (_index > index) {
            // 下面的节点往下移
            _offset = addHeight;
          }

          item.top += _offset; // 同步更新子节点的位置

          if (item.children && item.children.length) {
            _this5.updateChildren(item.children, 'top', _offset);
          }
        }); // 更新父节点的位置

        this.updateBrothers(node.parent, addHeight);
      }
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-04-11 14:42:48 
     * @Desc: 绘制连线，连接该节点到其子节点
     */

  }, {
    key: "renderLine",
    value: function renderLine(node, lines) {
      var _this6 = this;

      if (node.children.length <= 0) {
        return [];
      }

      var left = node.left,
          top = node.top,
          width = node.width,
          height = node.height,
          expandBtnSize = node.expandBtnSize;
      node.children.forEach(function (item, index) {
        var x1 = node.layerIndex === 0 ? left + width / 2 : left + width + expandBtnSize;
        var y1 = top + height / 2;
        var x2 = item.left;
        var y2 = item.top + item.height / 2;
        var path = '';

        if (node.isRoot) {
          path = _this6.quadraticCurvePath(x1, y1, x2, y2);
        } else {
          path = _this6.cubicBezierPath(x1, y1, x2, y2);
        }

        lines[index].plot(path);
      });
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-04-11 19:54:26 
     * @Desc: 渲染按钮 
     */

  }, {
    key: "renderExpandBtn",
    value: function renderExpandBtn(node, btn) {
      var width = node.width,
          height = node.height;

      var _btn$transform = btn.transform(),
          translateX = _btn$transform.translateX,
          translateY = _btn$transform.translateY;

      btn.translate(width - translateX, height / 2 - translateY);
    }
    /** 
     * @Author: 王林 
     * @Date: 2022-07-30 08:30:35 
     * @Desc: 创建概要节点 
     */

  }, {
    key: "renderGeneralization",
    value: function renderGeneralization(node, gLine, gNode) {
      var _this$getNodeBoundari = this.getNodeBoundaries(node, 'h'),
          top = _this$getNodeBoundari.top,
          bottom = _this$getNodeBoundari.bottom,
          right = _this$getNodeBoundari.right,
          generalizationLineMargin = _this$getNodeBoundari.generalizationLineMargin,
          generalizationNodeMargin = _this$getNodeBoundari.generalizationNodeMargin;

      var x1 = right + generalizationLineMargin;
      var y1 = top;
      var x2 = right + generalizationLineMargin;
      var y2 = bottom;
      var cx = x1 + 20;
      var cy = y1 + (y2 - y1) / 2;
      var path = "M ".concat(x1, ",").concat(y1, " Q ").concat(cx, ",").concat(cy, " ").concat(x2, ",").concat(y2);
      gLine.plot(path);
      gNode.left = right + generalizationNodeMargin;
      gNode.top = top + (bottom - top - gNode.height) / 2;
    }
  }]);

  return LogicalStructure;
}(layouts_Base);

/* harmony default export */ var layouts_LogicalStructure = (LogicalStructure_LogicalStructure);
// EXTERNAL MODULE: E:/node_modules/core-js/modules/es.array.filter.js
var modules_es_array_filter = __webpack_require__("31af");

// CONCATENATED MODULE: ../simple-mind-map/src/layouts/MindMap.js










/** 
 * @Author: 王林 
 * @Date: 2021-04-12 22:25:58 
 * @Desc: 思维导图 
 * 在逻辑结构图的基础上增加一个变量来记录生长方向，向左还是向右，同时在计算left的时候根据方向来计算、调整top时只考虑同方向的节点即可
 */

var MindMap_MindMap = /*#__PURE__*/function (_Base) {
  _inherits(MindMap, _Base);

  var _super = _createSuper(MindMap);

  /** 
   * @Author: 王林 
   * @Date: 2021-04-12 22:26:31 
   * @Desc: 构造函数 
   */
  function MindMap() {
    var opt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, MindMap);

    return _super.call(this, opt);
  }
  /** 
   * javascript comment 
   * @Author: 王林25 
   * @Date: 2021-04-06 14:04:20 
   * @Desc: 布局
   */


  _createClass(MindMap, [{
    key: "doLayout",
    value: function doLayout(callback) {
      var _this = this;

      var task = [function () {
        _this.computedBaseValue();
      }, function () {
        _this.computedTopValue();
      }, function () {
        _this.adjustTopValue();
      }, function () {
        callback(_this.root);
      }];
      asyncRun(task);
    }
    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-04-08 09:49:32 
     * @Desc: 遍历数据计算节点的left、width、height
     */

  }, {
    key: "computedBaseValue",
    value: function computedBaseValue() {
      var _this2 = this;

      walk(this.renderer.renderTree, null, function (cur, parent, isRoot, layerIndex, index) {
        var newNode = _this2.createNode(cur, parent, isRoot, layerIndex); // 根节点定位在画布中心位置


        if (isRoot) {
          _this2.setNodeCenter(newNode);
        } else {
          // 非根节点
          // 三级及以下节点以上级为准
          if (parent._node.dir) {
            newNode.dir = parent._node.dir;
          } else {
            // 节点生长方向
            newNode.dir = index % 2 === 0 ? 'right' : 'left';
          } // 根据生长方向定位到父节点的左侧或右侧


          newNode.left = newNode.dir === 'right' ? parent._node.left + parent._node.width + _this2.getMarginX(layerIndex) : parent._node.left - _this2.getMarginX(layerIndex) - newNode.width;
        }

        if (!cur.data.expand) {
          return true;
        }
      }, function (cur, parent, isRoot, layerIndex) {
        // 返回时计算节点的leftChildrenAreaHeight和rightChildrenAreaHeight，也就是左侧和右侧子节点所占的高度之和，包括外边距
        if (!cur.data.expand) {
          cur._node.leftChildrenAreaHeight = 0;
          cur._node.rightChildrenAreaHeight = 0;
          return;
        } // 理论上只有根节点是存在两个方向的子节点的，其他节点的子节点一定全都是同方向，但是为了逻辑统一，就不按特殊处理的方式来写了


        var leftLen = 0;
        var rightLen = 0;
        var leftChildrenAreaHeight = 0;
        var rightChildrenAreaHeight = 0;

        cur._node.children.forEach(function (item) {
          if (item.dir === 'left') {
            leftLen++;
            leftChildrenAreaHeight += item.height;
          } else {
            rightLen++;
            rightChildrenAreaHeight += item.height;
          }
        });

        cur._node.leftChildrenAreaHeight = leftChildrenAreaHeight + (leftLen + 1) * _this2.getMarginY(layerIndex + 1);
        cur._node.rightChildrenAreaHeight = rightChildrenAreaHeight + (rightLen + 1) * _this2.getMarginY(layerIndex + 1);
      }, true, 0);
    }
    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-04-08 09:59:25 
     * @Desc: 遍历节点树计算节点的top 
     */

  }, {
    key: "computedTopValue",
    value: function computedTopValue() {
      var _this3 = this;

      walk(this.root, null, function (node, parent, isRoot, layerIndex) {
        if (node.nodeData.data.expand && node.children && node.children.length) {
          var marginY = _this3.getMarginY(layerIndex + 1);

          var baseTop = node.top + node.height / 2 + marginY; // 第一个子节点的top值 = 该节点中心的top值 - 子节点的高度之和的一半

          var leftTotalTop = baseTop - node.leftChildrenAreaHeight / 2;
          var rightTotalTop = baseTop - node.rightChildrenAreaHeight / 2;
          node.children.forEach(function (cur) {
            if (cur.dir === 'left') {
              cur.top = leftTotalTop;
              leftTotalTop += cur.height + marginY;
            } else {
              cur.top = rightTotalTop;
              rightTotalTop += cur.height + marginY;
            }
          });
        }
      }, null, true);
    }
    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-04-08 10:04:05 
     * @Desc: 调整节点top 
     */

  }, {
    key: "adjustTopValue",
    value: function adjustTopValue() {
      var _this4 = this;

      walk(this.root, null, function (node, parent, isRoot, layerIndex) {
        if (!node.nodeData.data.expand) {
          return;
        } // 判断子节点所占的高度之和是否大于该节点自身，大于则需要调整位置


        var base = _this4.getMarginY(layerIndex + 1) * 2 + node.height;
        var leftDifference = node.leftChildrenAreaHeight - base;
        var rightDifference = node.rightChildrenAreaHeight - base;

        if (leftDifference > 0 || rightDifference > 0) {
          _this4.updateBrothers(node, leftDifference / 2, rightDifference / 2);
        }
      }, null, true);
    }
    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-04-07 14:26:03 
     * @Desc: 更新兄弟节点的top
     */

  }, {
    key: "updateBrothers",
    value: function updateBrothers(node, leftAddHeight, rightAddHeight) {
      var _this5 = this;

      if (node.parent) {
        // 过滤出和自己同方向的节点
        var childrenList = node.parent.children.filter(function (item) {
          return item.dir === node.dir;
        });
        var index = childrenList.findIndex(function (item) {
          return item === node;
        });
        childrenList.forEach(function (item, _index) {
          if (item.hasCustomPosition()) {
            // 适配自定义位置
            return;
          }

          var _offset = 0;
          var addHeight = item.dir === 'left' ? leftAddHeight : rightAddHeight; // 上面的节点往上移

          if (_index < index) {
            _offset = -addHeight;
          } else if (_index > index) {
            // 下面的节点往下移
            _offset = addHeight;
          }

          item.top += _offset; // 同步更新子节点的位置

          if (item.children && item.children.length) {
            _this5.updateChildren(item.children, 'top', _offset);
          }
        }); // 更新父节点的位置

        this.updateBrothers(node.parent, leftAddHeight, rightAddHeight);
      }
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-04-11 14:42:48 
     * @Desc: 绘制连线，连接该节点到其子节点
     */

  }, {
    key: "renderLine",
    value: function renderLine(node, lines) {
      var _this6 = this;

      if (node.children.length <= 0) {
        return [];
      }

      var left = node.left,
          top = node.top,
          width = node.width,
          height = node.height,
          expandBtnSize = node.expandBtnSize;
      node.children.forEach(function (item, index) {
        var x1 = node.layerIndex === 0 ? left + width / 2 : item.dir === 'left' ? left - expandBtnSize : left + width + 20;
        var y1 = top + height / 2;
        var x2 = item.dir === 'left' ? item.left + item.width : item.left;
        var y2 = item.top + item.height / 2;
        var path = '';

        if (node.isRoot) {
          path = _this6.quadraticCurvePath(x1, y1, x2, y2);
        } else {
          path = _this6.cubicBezierPath(x1, y1, x2, y2);
        }

        lines[index].plot(path);
      });
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-04-11 19:54:26 
     * @Desc: 渲染按钮 
     */

  }, {
    key: "renderExpandBtn",
    value: function renderExpandBtn(node, btn) {
      var width = node.width,
          height = node.height,
          expandBtnSize = node.expandBtnSize;

      var _btn$transform = btn.transform(),
          translateX = _btn$transform.translateX,
          translateY = _btn$transform.translateY;

      var x = (node.dir === 'left' ? 0 - expandBtnSize : width) - translateX;
      var y = height / 2 - translateY;
      btn.translate(x, y);
    }
    /** 
     * @Author: 王林 
     * @Date: 2022-07-30 08:30:35 
     * @Desc: 创建概要节点 
     */

  }, {
    key: "renderGeneralization",
    value: function renderGeneralization(node, gLine, gNode) {
      var isLeft = node.dir === 'left';

      var _this$getNodeBoundari = this.getNodeBoundaries(node, 'h', isLeft),
          top = _this$getNodeBoundari.top,
          bottom = _this$getNodeBoundari.bottom,
          left = _this$getNodeBoundari.left,
          right = _this$getNodeBoundari.right,
          generalizationLineMargin = _this$getNodeBoundari.generalizationLineMargin,
          generalizationNodeMargin = _this$getNodeBoundari.generalizationNodeMargin;

      var x = isLeft ? left - generalizationLineMargin : right + generalizationLineMargin;
      var x1 = x;
      var y1 = top;
      var x2 = x;
      var y2 = bottom;
      var cx = x1 + (isLeft ? -20 : 20);
      var cy = y1 + (y2 - y1) / 2;
      var path = "M ".concat(x1, ",").concat(y1, " Q ").concat(cx, ",").concat(cy, " ").concat(x2, ",").concat(y2);
      gLine.plot(path);
      gNode.left = x + (isLeft ? -generalizationNodeMargin : generalizationNodeMargin) - (isLeft ? gNode.width : 0);
      gNode.top = top + (bottom - top - gNode.height) / 2;
    }
  }]);

  return MindMap;
}(layouts_Base);

/* harmony default export */ var layouts_MindMap = (MindMap_MindMap);
// CONCATENATED MODULE: ../simple-mind-map/src/layouts/CatalogOrganization.js









/** 
 * @Author: 王林 
 * @Date: 2021-04-12 22:25:58 
 * @Desc: 目录组织图 
 */

var CatalogOrganization_CatalogOrganization = /*#__PURE__*/function (_Base) {
  _inherits(CatalogOrganization, _Base);

  var _super = _createSuper(CatalogOrganization);

  /** 
   * @Author: 王林 
   * @Date: 2021-04-12 22:26:31 
   * @Desc: 构造函数 
   */
  function CatalogOrganization() {
    var opt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, CatalogOrganization);

    return _super.call(this, opt);
  }
  /** 
   * javascript comment 
   * @Author: 王林25 
   * @Date: 2021-04-06 14:04:20 
   * @Desc: 布局
   */


  _createClass(CatalogOrganization, [{
    key: "doLayout",
    value: function doLayout(callback) {
      var _this = this;

      var task = [function () {
        _this.computedBaseValue();
      }, function () {
        _this.computedLeftTopValue();
      }, function () {
        _this.adjustLeftTopValue();
      }, function () {
        callback(_this.root);
      }];
      asyncRun(task);
    }
    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-04-08 09:49:32 
     * @Desc: 遍历数据计算节点的left、width、height
     */

  }, {
    key: "computedBaseValue",
    value: function computedBaseValue() {
      var _this2 = this;

      walk(this.renderer.renderTree, null, function (cur, parent, isRoot, layerIndex) {
        var newNode = _this2.createNode(cur, parent, isRoot, layerIndex); // 根节点定位在画布中心位置


        if (isRoot) {
          _this2.setNodeCenter(newNode);
        } else {
          // 非根节点
          if (parent._node.isRoot) {
            newNode.top = parent._node.top + parent._node.height + _this2.getMarginX(layerIndex);
          }
        }

        if (!cur.data.expand) {
          return true;
        }
      }, function (cur, parent, isRoot, layerIndex) {
        if (isRoot) {
          var len = cur.data.expand === false ? 0 : cur._node.children.length;
          cur._node.childrenAreaWidth = len ? cur._node.children.reduce(function (h, item) {
            return h + item.width;
          }, 0) + (len + 1) * _this2.getMarginX(layerIndex + 1) : 0;
        }
      }, true, 0);
    }
    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-04-08 09:59:25 
     * @Desc: 遍历节点树计算节点的left、top
     */

  }, {
    key: "computedLeftTopValue",
    value: function computedLeftTopValue() {
      var _this3 = this;

      walk(this.root, null, function (node, parent, isRoot, layerIndex) {
        if (node.nodeData.data.expand && node.children && node.children.length) {
          var marginX = _this3.getMarginX(layerIndex + 1);

          var marginY = _this3.getMarginY(layerIndex + 1);

          if (isRoot) {
            var left = node.left + node.width / 2 - node.childrenAreaWidth / 2;
            var totalLeft = left + marginX;
            node.children.forEach(function (cur) {
              cur.left = totalLeft;
              totalLeft += cur.width + marginX;
            });
          } else {
            var totalTop = node.top + node.height + marginY + node.expandBtnSize;
            node.children.forEach(function (cur) {
              cur.left = node.left + node.width * 0.5;
              cur.top = totalTop;
              totalTop += cur.height + marginY + node.expandBtnSize;
            });
          }
        }
      }, null, true);
    }
    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-04-08 10:04:05 
     * @Desc: 调整节点left、top
     */

  }, {
    key: "adjustLeftTopValue",
    value: function adjustLeftTopValue() {
      var _this4 = this;

      walk(this.root, null, function (node, parent, isRoot, layerIndex) {
        if (!node.nodeData.data.expand) {
          return;
        } // 调整left


        if (parent && parent.isRoot) {
          var areaWidth = _this4.getNodeAreaWidth(node);

          var difference = areaWidth - node.width;

          if (difference > 0) {
            _this4.updateBrothersLeft(node, difference / 2);
          }
        } // 调整top


        var len = node.children.length;

        if (parent && !parent.isRoot && len > 0) {
          var marginY = _this4.getMarginY(layerIndex + 1);

          var totalHeight = node.children.reduce(function (h, item) {
            return h + item.height;
          }, 0) + (len + 1) * marginY + len * node.expandBtnSize;

          _this4.updateBrothersTop(node, totalHeight);
        }
      }, null, true);
    }
    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-04-12 18:55:03 
     * @Desc: 递归计算节点的宽度
     */

  }, {
    key: "getNodeAreaWidth",
    value: function getNodeAreaWidth(node) {
      var widthArr = [];

      var loop = function loop(node, width) {
        if (node.children.length) {
          width += node.width / 2;
          node.children.forEach(function (item) {
            loop(item, width);
          });
        } else {
          width += node.width;
          widthArr.push(width);
        }
      };

      loop(node, 0);
      return Math.max.apply(Math, widthArr);
    }
    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-07-13 11:12:51 
     * @Desc: 调整兄弟节点的left 
     */

  }, {
    key: "updateBrothersLeft",
    value: function updateBrothersLeft(node, addWidth) {
      var _this5 = this;

      if (node.parent) {
        var childrenList = node.parent.children;
        var index = childrenList.findIndex(function (item) {
          return item === node;
        }); // 存在大于一个节点时，第一个或最后一个节点自身也需要移动，否则两边不对称

        if ((index === 0 || index === childrenList.length - 1) && childrenList.length > 1) {
          var _offset = index === 0 ? -addWidth : addWidth;

          node.left += _offset;

          if (node.children && node.children.length && !node.hasCustomPosition()) {
            this.updateChildren(node.children, 'left', _offset);
          }
        }

        childrenList.forEach(function (item, _index) {
          if (item.hasCustomPosition()) {
            // 适配自定义位置
            return;
          }

          var _offset = 0;

          if (_index < index) {
            // 左边的节点往左移
            _offset = -addWidth;
          } else if (_index > index) {
            // 右边的节点往右移
            _offset = addWidth;
          }

          item.left += _offset; // 同步更新子节点的位置

          if (item.children && item.children.length) {
            _this5.updateChildren(item.children, 'left', _offset);
          }
        }); // 更新父节点的位置

        this.updateBrothersLeft(node.parent, addWidth);
      }
    }
    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-04-07 14:26:03 
     * @Desc: 调整兄弟节点的top
     */

  }, {
    key: "updateBrothersTop",
    value: function updateBrothersTop(node, addHeight) {
      var _this6 = this;

      if (node.parent && !node.parent.isRoot) {
        var childrenList = node.parent.children;
        var index = childrenList.findIndex(function (item) {
          return item === node;
        });
        childrenList.forEach(function (item, _index) {
          if (item.hasCustomPosition()) {
            // 适配自定义位置
            return;
          }

          var _offset = 0; // 下面的节点往下移

          if (_index > index) {
            _offset = addHeight;
          }

          item.top += _offset; // 同步更新子节点的位置

          if (item.children && item.children.length) {
            _this6.updateChildren(item.children, 'top', _offset);
          }
        }); // 更新父节点的位置

        this.updateBrothersTop(node.parent, addHeight);
      }
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-04-11 14:42:48 
     * @Desc: 绘制连线，连接该节点到其子节点
     */

  }, {
    key: "renderLine",
    value: function renderLine(node, lines) {
      if (node.children.length <= 0) {
        return [];
      }

      var left = node.left,
          top = node.top,
          width = node.width,
          height = node.height,
          expandBtnSize = node.expandBtnSize;
      var len = node.children.length;
      var marginX = this.getMarginX(node.layerIndex + 1);

      if (node.isRoot) {
        // 根节点
        var x1 = left + width / 2;
        var y1 = top + height;
        var s1 = marginX * 0.7;
        var minx = Infinity;
        var maxx = -Infinity;
        node.children.forEach(function (item, index) {
          var x2 = item.left + item.width / 2;
          var y2 = item.top;

          if (x2 < minx) {
            minx = x2;
          }

          if (x2 > maxx) {
            maxx = x2;
          }

          var path = "M ".concat(x2, ",").concat(y1 + s1, " L ").concat(x2, ",").concat(y1 + s1 > y2 ? y2 + item.height : y2); // 竖线

          lines[index].plot(path);
        });
        minx = Math.min(minx, x1);
        maxx = Math.max(maxx, x1); // 父节点的竖线

        var line1 = this.draw.path();
        node.style.line(line1);
        line1.plot("M ".concat(x1, ",").concat(y1, " L ").concat(x1, ",").concat(y1 + s1));

        node._lines.push(line1); // 水平线


        if (len > 0) {
          var lin2 = this.draw.path();
          node.style.line(lin2);
          lin2.plot("M ".concat(minx, ",").concat(y1 + s1, " L ").concat(maxx, ",").concat(y1 + s1));

          node._lines.push(lin2);
        }
      } else {
        // 非根节点
        var _y = top + height;

        var maxy = -Infinity;
        var x2 = node.left + node.width * 0.3;
        node.children.forEach(function (item, index) {
          // 为了适配自定义位置，下面做了各种位置的兼容
          var y2 = item.top + item.height / 2;

          if (y2 > maxy) {
            maxy = y2;
          } // 水平线


          var path = '';
          var _left = item.left;

          var _isLeft = item.left + item.width < x2;

          var _isXCenter = false;

          if (_isLeft) {
            // 水平位置在父节点左边
            _left = item.left + item.width;
          } else if (item.left < x2 && item.left + item.width > x2) {
            // 水平位置在父节点之间
            _isXCenter = true;
            y2 = item.top;
            maxy = y2;
          }

          if (y2 > top && y2 < _y) {
            // 自定义位置的情况：垂直位置节点在父节点之间
            path = "M ".concat(_isLeft ? node.left : node.left + node.width, ",").concat(y2, " L ").concat(_left, ",").concat(y2);
          } else if (y2 < _y) {
            // 自定义位置的情况：垂直位置节点在父节点上面
            if (_isXCenter) {
              y2 = item.top + item.height;
              _left = x2;
            }

            path = "M ".concat(x2, ",").concat(top, " L ").concat(x2, ",").concat(y2, " L ").concat(_left, ",").concat(y2);
          } else {
            if (_isXCenter) {
              _left = x2;
            }

            path = "M ".concat(x2, ",").concat(y2, " L ").concat(_left, ",").concat(y2);
          }

          lines[index].plot(path);
        }); // 竖线

        if (len > 0) {
          var _lin = this.draw.path();

          expandBtnSize = len > 0 ? expandBtnSize : 0;
          node.style.line(_lin);

          if (maxy < _y + expandBtnSize) {
            _lin.hide();
          } else {
            _lin.plot("M ".concat(x2, ",").concat(_y + expandBtnSize, " L ").concat(x2, ",").concat(maxy));

            _lin.show();
          }

          node._lines.push(_lin);
        }
      }
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-04-11 19:54:26 
     * @Desc: 渲染按钮 
     */

  }, {
    key: "renderExpandBtn",
    value: function renderExpandBtn(node, btn) {
      var width = node.width,
          height = node.height,
          expandBtnSize = node.expandBtnSize,
          isRoot = node.isRoot;

      if (!isRoot) {
        var _btn$transform = btn.transform(),
            translateX = _btn$transform.translateX,
            translateY = _btn$transform.translateY;

        btn.translate(width * 0.3 - expandBtnSize / 2 - translateX, height + expandBtnSize / 2 - translateY);
      }
    }
    /** 
     * @Author: 王林 
     * @Date: 2022-07-30 08:30:35 
     * @Desc: 创建概要节点 
     */

  }, {
    key: "renderGeneralization",
    value: function renderGeneralization(node, gLine, gNode) {
      var _this$getNodeBoundari = this.getNodeBoundaries(node, 'h'),
          top = _this$getNodeBoundari.top,
          bottom = _this$getNodeBoundari.bottom,
          right = _this$getNodeBoundari.right,
          generalizationLineMargin = _this$getNodeBoundari.generalizationLineMargin,
          generalizationNodeMargin = _this$getNodeBoundari.generalizationNodeMargin;

      var x1 = right + generalizationLineMargin;
      var y1 = top;
      var x2 = right + generalizationLineMargin;
      var y2 = bottom;
      var cx = x1 + 20;
      var cy = y1 + (y2 - y1) / 2;
      var path = "M ".concat(x1, ",").concat(y1, " Q ").concat(cx, ",").concat(cy, " ").concat(x2, ",").concat(y2);
      gLine.plot(path);
      gNode.left = right + generalizationNodeMargin;
      gNode.top = top + (bottom - top - gNode.height) / 2;
    }
  }]);

  return CatalogOrganization;
}(layouts_Base);

/* harmony default export */ var layouts_CatalogOrganization = (CatalogOrganization_CatalogOrganization);
// CONCATENATED MODULE: ../simple-mind-map/src/layouts/OrganizationStructure.js









/** 
 * @Author: 王林 
 * @Date: 2021-04-12 22:25:58 
 * @Desc: 组织结构图
 * 和逻辑结构图基本一样，只是方向变成向下生长，所以先计算节点的top，后计算节点的left、最后调整节点的left即可
 */

var OrganizationStructure_OrganizationStructure = /*#__PURE__*/function (_Base) {
  _inherits(OrganizationStructure, _Base);

  var _super = _createSuper(OrganizationStructure);

  /** 
   * @Author: 王林 
   * @Date: 2021-04-12 22:26:31 
   * @Desc: 构造函数 
   */
  function OrganizationStructure() {
    var opt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, OrganizationStructure);

    return _super.call(this, opt);
  }
  /** 
   * javascript comment 
   * @Author: 王林25 
   * @Date: 2021-04-06 14:04:20 
   * @Desc: 布局
   */


  _createClass(OrganizationStructure, [{
    key: "doLayout",
    value: function doLayout(callback) {
      var _this = this;

      var task = [function () {
        _this.computedBaseValue();
      }, function () {
        _this.computedLeftValue();
      }, function () {
        _this.adjustLeftValue();
      }, function () {
        callback(_this.root);
      }];
      asyncRun(task);
    }
    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-04-08 09:49:32 
     * @Desc: 遍历数据计算节点的left、width、height
     */

  }, {
    key: "computedBaseValue",
    value: function computedBaseValue() {
      var _this2 = this;

      walk(this.renderer.renderTree, null, function (cur, parent, isRoot, layerIndex) {
        var newNode = _this2.createNode(cur, parent, isRoot, layerIndex); // 根节点定位在画布中心位置


        if (isRoot) {
          _this2.setNodeCenter(newNode);
        } else {
          // 非根节点
          // 定位到父节点下方
          newNode.top = parent._node.top + parent._node.height + _this2.getMarginX(layerIndex);
        }

        if (!cur.data.expand) {
          return true;
        }
      }, function (cur, parent, isRoot, layerIndex) {
        // 返回时计算节点的areaWidth，也就是子节点所占的宽度之和，包括外边距
        var len = cur.data.expand === false ? 0 : cur._node.children.length;
        cur._node.childrenAreaWidth = len ? cur._node.children.reduce(function (h, item) {
          return h + item.width;
        }, 0) + (len + 1) * _this2.getMarginY(layerIndex + 1) : 0;
      }, true, 0);
    }
    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-04-08 09:59:25 
     * @Desc: 遍历节点树计算节点的left
     */

  }, {
    key: "computedLeftValue",
    value: function computedLeftValue() {
      var _this3 = this;

      walk(this.root, null, function (node, parent, isRoot, layerIndex) {
        if (node.nodeData.data.expand && node.children && node.children.length) {
          var marginX = _this3.getMarginY(layerIndex + 1); // 第一个子节点的left值 = 该节点中心的left值 - 子节点的宽度之和的一半


          var left = node.left + node.width / 2 - node.childrenAreaWidth / 2;
          var totalLeft = left + marginX;
          node.children.forEach(function (cur) {
            cur.left = totalLeft;
            totalLeft += cur.width + marginX;
          });
        }
      }, null, true);
    }
    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-04-08 10:04:05 
     * @Desc: 调整节点left
     */

  }, {
    key: "adjustLeftValue",
    value: function adjustLeftValue() {
      var _this4 = this;

      walk(this.root, null, function (node, parent, isRoot, layerIndex) {
        if (!node.nodeData.data.expand) {
          return;
        } // 判断子节点所占的宽度之和是否大于该节点自身，大于则需要调整位置


        var difference = node.childrenAreaWidth - _this4.getMarginY(layerIndex + 1) * 2 - node.width;

        if (difference > 0) {
          _this4.updateBrothers(node, difference / 2);
        }
      }, null, true);
    }
    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-04-07 14:26:03 
     * @Desc: 更新兄弟节点的left
     */

  }, {
    key: "updateBrothers",
    value: function updateBrothers(node, addWidth) {
      var _this5 = this;

      if (node.parent) {
        var childrenList = node.parent.children;
        var index = childrenList.findIndex(function (item) {
          return item === node;
        });
        childrenList.forEach(function (item, _index) {
          if (item.hasCustomPosition()) {
            // 适配自定义位置
            return;
          }

          var _offset = 0; // 上面的节点往上移

          if (_index < index) {
            _offset = -addWidth;
          } else if (_index > index) {
            // 下面的节点往下移
            _offset = addWidth;
          }

          item.left += _offset; // 同步更新子节点的位置

          if (item.children && item.children.length) {
            _this5.updateChildren(item.children, 'left', _offset);
          }
        }); // 更新父节点的位置

        this.updateBrothers(node.parent, addWidth);
      }
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-04-11 14:42:48 
     * @Desc: 绘制连线，连接该节点到其子节点
     */

  }, {
    key: "renderLine",
    value: function renderLine(node, lines) {
      if (node.children.length <= 0) {
        return [];
      }

      var left = node.left,
          top = node.top,
          width = node.width,
          height = node.height,
          expandBtnSize = node.expandBtnSize,
          isRoot = node.isRoot;
      var x1 = left + width / 2;
      var y1 = top + height;
      var marginX = this.getMarginX(node.layerIndex + 1);
      var s1 = marginX * 0.7;
      var minx = Infinity;
      var maxx = -Infinity;
      var len = node.children.length;
      node.children.forEach(function (item, index) {
        var x2 = item.left + item.width / 2;
        var y2 = y1 + s1 > item.top ? item.top + item.height : item.top;

        if (x2 < minx) {
          minx = x2;
        }

        if (x2 > maxx) {
          maxx = x2;
        }

        var path = "M ".concat(x2, ",").concat(y1 + s1, " L ").concat(x2, ",").concat(y2);
        lines[index].plot(path);
      });
      minx = Math.min(x1, minx);
      maxx = Math.max(x1, maxx); // 父节点的竖线

      var line1 = this.draw.path();
      node.style.line(line1);
      expandBtnSize = len > 0 && !isRoot ? expandBtnSize : 0;
      line1.plot("M ".concat(x1, ",").concat(y1 + expandBtnSize, " L ").concat(x1, ",").concat(y1 + s1));

      node._lines.push(line1); // 水平线


      if (len > 0) {
        var lin2 = this.draw.path();
        node.style.line(lin2);
        lin2.plot("M ".concat(minx, ",").concat(y1 + s1, " L ").concat(maxx, ",").concat(y1 + s1));

        node._lines.push(lin2);
      }
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-04-11 19:54:26 
     * @Desc: 渲染按钮 
     */

  }, {
    key: "renderExpandBtn",
    value: function renderExpandBtn(node, btn) {
      var width = node.width,
          height = node.height,
          expandBtnSize = node.expandBtnSize;

      var _btn$transform = btn.transform(),
          translateX = _btn$transform.translateX,
          translateY = _btn$transform.translateY;

      btn.translate(width / 2 - expandBtnSize / 2 - translateX, height + expandBtnSize / 2 - translateY);
    }
    /** 
     * @Author: 王林 
     * @Date: 2022-07-30 08:30:35 
     * @Desc: 创建概要节点 
     */

  }, {
    key: "renderGeneralization",
    value: function renderGeneralization(node, gLine, gNode) {
      var _this$getNodeBoundari = this.getNodeBoundaries(node, 'v'),
          bottom = _this$getNodeBoundari.bottom,
          left = _this$getNodeBoundari.left,
          right = _this$getNodeBoundari.right,
          generalizationLineMargin = _this$getNodeBoundari.generalizationLineMargin,
          generalizationNodeMargin = _this$getNodeBoundari.generalizationNodeMargin;

      var x1 = left;
      var y1 = bottom + generalizationLineMargin;
      var x2 = right;
      var y2 = bottom + generalizationLineMargin;
      var cx = x1 + (x2 - x1) / 2;
      var cy = y1 + 20;
      var path = "M ".concat(x1, ",").concat(y1, " Q ").concat(cx, ",").concat(cy, " ").concat(x2, ",").concat(y2);
      gLine.plot(path);
      gNode.top = bottom + generalizationNodeMargin;
      gNode.left = left + (right - left - gNode.width) / 2;
    }
  }]);

  return OrganizationStructure;
}(layouts_Base);

/* harmony default export */ var layouts_OrganizationStructure = (OrganizationStructure_OrganizationStructure);
// EXTERNAL MODULE: E:/node_modules/core-js/modules/es.array.join.js
var es_array_join = __webpack_require__("2137");

// CONCATENATED MODULE: ../simple-mind-map/src/TextEdit.js







/** 
 * javascript comment 
 * @Author: 王林25 
 * @Date: 2021-06-19 11:11:28 
 * @Desc: 节点文字编辑类 
 */

var TextEdit_TextEdit = /*#__PURE__*/function () {
  /** 
   * javascript comment 
   * @Author: 王林25 
   * @Date: 2021-06-19 11:22:57 
   * @Desc: 构造函数 
   */
  function TextEdit(renderer) {
    _classCallCheck(this, TextEdit);

    this.renderer = renderer;
    this.mindMap = renderer.mindMap; // 文本编辑框

    this.textEditNode = null; // 文本编辑框是否显示

    this.showTextEdit = false;
    this.bindEvent();
  }
  /** 
   * @Author: 王林 
   * @Date: 2021-04-24 13:27:04 
   * @Desc: 事件 
   */


  _createClass(TextEdit, [{
    key: "bindEvent",
    value: function bindEvent() {
      var _this = this;

      this.show = this.show.bind(this); // 节点双击事件

      this.mindMap.on('node_dblclick', this.show); // 点击事件

      this.mindMap.on('draw_click', function () {
        // 隐藏文本编辑框
        _this.hideEditTextBox();
      }); // 展开收缩按钮点击事件

      this.mindMap.on('expand_btn_click', function () {
        _this.hideEditTextBox();
      }); // 节点激活前事件

      this.mindMap.on('before_node_active', function () {
        _this.hideEditTextBox();
      }); // 注册回车快捷键

      this.mindMap.keyCommand.addShortcut('Enter', function () {
        _this.hideEditTextBox();
      }); // 注册编辑快捷键

      this.mindMap.keyCommand.addShortcut('F2', function () {
        if (_this.renderer.activeNodeList.length <= 0) {
          return;
        }

        _this.show(_this.renderer.activeNodeList[0]);
      });
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-04-13 22:15:56 
     * @Desc: 显示文本编辑框 
     */

  }, {
    key: "show",
    value: function show(node) {
      this.showEditTextBox(node, node._textData.node.node.getBoundingClientRect());
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-04-13 22:13:02 
     * @Desc: 显示文本编辑框 
     */

  }, {
    key: "showEditTextBox",
    value: function showEditTextBox(node, rect) {
      this.mindMap.emit('before_show_text_edit');

      if (!this.textEditNode) {
        this.textEditNode = document.createElement('div');
        this.textEditNode.style.cssText = "position:fixed;box-sizing: border-box;background-color:#fff;box-shadow: 0 0 20px rgba(0,0,0,.5);padding: 3px 5px;margin-left: -5px;margin-top: -3px;outline: none;";
        this.textEditNode.setAttribute('contenteditable', true);
        document.body.appendChild(this.textEditNode);
      }

      node.style.domText(this.textEditNode, this.mindMap.view.scale);
      this.textEditNode.innerHTML = node.nodeData.data.text.split(/\n/img).join('<br>');
      this.textEditNode.style.minWidth = rect.width + 10 + 'px';
      this.textEditNode.style.minHeight = rect.height + 6 + 'px';
      this.textEditNode.style.left = rect.left + 'px';
      this.textEditNode.style.top = rect.top + 'px';
      this.textEditNode.style.display = 'block';
      this.showTextEdit = true; // 选中文本

      this.selectNodeText();
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-08-02 23:13:50 
     * @Desc: 选中文本 
     */

  }, {
    key: "selectNodeText",
    value: function selectNodeText() {
      var selection = window.getSelection();
      var range = document.createRange();
      range.selectNodeContents(this.textEditNode);
      selection.removeAllRanges();
      selection.addRange(range);
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-04-24 13:48:16 
     * @Desc: 隐藏文本编辑框 
     */

  }, {
    key: "hideEditTextBox",
    value: function hideEditTextBox() {
      var _this2 = this;

      if (!this.showTextEdit) {
        return;
      }

      this.renderer.activeNodeList.forEach(function (node) {
        var str = getStrWithBrFromHtml(_this2.textEditNode.innerHTML);

        _this2.mindMap.execCommand('SET_NODE_TEXT', node, str);

        if (node.isGeneralization) {
          // 概要节点
          node.generalizationBelongNode.updateGeneralization();
        }

        _this2.mindMap.render();
      });
      this.mindMap.emit('hide_text_edit', this.textEditNode, this.renderer.activeNodeList);
      this.textEditNode.style.display = 'none';
      this.textEditNode.innerHTML = '';
      this.textEditNode.style.fontFamily = 'inherit';
      this.textEditNode.style.fontSize = 'inherit';
      this.textEditNode.style.fontWeight = 'normal';
      this.showTextEdit = false;
    }
  }]);

  return TextEdit;
}();


// CONCATENATED MODULE: ../simple-mind-map/src/Render.js














 // 布局列表

var layouts = {
  // 逻辑结构图
  logicalStructure: layouts_LogicalStructure,
  // 思维导图
  mindMap: layouts_MindMap,
  // 目录组织图
  catalogOrganization: layouts_CatalogOrganization,
  // 组织结构图
  organizationStructure: layouts_OrganizationStructure
};
/** 
 * javascript comment 
 * @Author: 王林25 
 * @Date: 2021-04-08 16:25:07 
 * @Desc: 渲染
 */

var Render_Render = /*#__PURE__*/function () {
  /** 
   * javascript comment 
   * @Author: 王林25 
   * @Date: 2021-04-08 16:25:32 
   * @Desc: 构造函数 
   */
  function Render() {
    var opt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Render);

    this.opt = opt;
    this.mindMap = opt.mindMap;
    this.themeConfig = this.mindMap.themeConfig;
    this.draw = this.mindMap.draw; // 渲染树，操作过程中修改的都是这里的数据

    this.renderTree = cjs_default()({}, this.mindMap.opt.data || {}); // 是否重新渲染

    this.reRender = false; // 当前激活的节点列表

    this.activeNodeList = []; // 根节点

    this.root = null; // 文本编辑框，需要再bindEvent之前实例化，否则单击事件只能触发隐藏文本编辑框，而无法保存文本修改

    this.textEdit = new TextEdit_TextEdit(this); // 布局

    this.setLayout(); // 绑定事件

    this.bindEvent(); // 注册命令

    this.registerCommands(); // 注册快捷键

    this.registerShortcutKeys();
  }
  /** 
   * javascript comment 
   * @Author: 王林25 
   * @Date: 2021-07-13 16:20:07 
   * @Desc: 设置布局结构 
   */


  _createClass(Render, [{
    key: "setLayout",
    value: function setLayout() {
      this.layout = new (layouts[this.mindMap.opt.layout] ? layouts[this.mindMap.opt.layout] : layouts.logicalStructure)(this);
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-06-20 10:34:06 
     * @Desc:  绑定事件
     */

  }, {
    key: "bindEvent",
    value: function bindEvent() {
      var _this = this;

      // 点击事件
      this.mindMap.on('draw_click', function () {
        // 清除激活状态
        if (_this.activeNodeList.length > 0) {
          _this.mindMap.execCommand('CLEAR_ACTIVE_NODE');
        }
      });
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-05-04 13:19:06 
     * @Desc: 注册命令 
     */

  }, {
    key: "registerCommands",
    value: function registerCommands() {
      // 全选
      this.selectAll = this.selectAll.bind(this);
      this.mindMap.command.add('SELECT_ALL', this.selectAll); // 回退

      this.back = this.back.bind(this);
      this.mindMap.command.add('BACK', this.back); // 前进

      this.forward = this.forward.bind(this);
      this.mindMap.command.add('FORWARD', this.forward); // 插入同级节点

      this.insertNode = this.insertNode.bind(this);
      this.mindMap.command.add('INSERT_NODE', this.insertNode); // 插入子节点

      this.insertChildNode = this.insertChildNode.bind(this);
      this.mindMap.command.add('INSERT_CHILD_NODE', this.insertChildNode); // 上移节点

      this.upNode = this.upNode.bind(this);
      this.mindMap.command.add('UP_NODE', this.upNode); // 下移节点

      this.downNode = this.downNode.bind(this);
      this.mindMap.command.add('DOWN_NODE', this.downNode); // 移动节点

      this.insertAfter = this.insertAfter.bind(this);
      this.mindMap.command.add('INSERT_AFTER', this.insertAfter);
      this.insertBefore = this.insertBefore.bind(this);
      this.mindMap.command.add('INSERT_BEFORE', this.insertBefore);
      this.moveNodeTo = this.moveNodeTo.bind(this);
      this.mindMap.command.add('MOVE_NODE_TO', this.moveNodeTo); // 删除节点

      this.removeNode = this.removeNode.bind(this);
      this.mindMap.command.add('REMOVE_NODE', this.removeNode); // 粘贴节点

      this.pasteNode = this.pasteNode.bind(this);
      this.mindMap.command.add('PASTE_NODE', this.pasteNode); // 剪切节点

      this.cutNode = this.cutNode.bind(this);
      this.mindMap.command.add('CUT_NODE', this.cutNode); // 修改节点样式

      this.setNodeStyle = this.setNodeStyle.bind(this);
      this.mindMap.command.add('SET_NODE_STYLE', this.setNodeStyle); // 切换节点是否激活

      this.setNodeActive = this.setNodeActive.bind(this);
      this.mindMap.command.add('SET_NODE_ACTIVE', this.setNodeActive); // 清除所有激活节点

      this.clearAllActive = this.clearAllActive.bind(this);
      this.mindMap.command.add('CLEAR_ACTIVE_NODE', this.clearAllActive); // 切换节点是否展开

      this.setNodeExpand = this.setNodeExpand.bind(this);
      this.mindMap.command.add('SET_NODE_EXPAND', this.setNodeExpand); // 展开所有节点

      this.expandAllNode = this.expandAllNode.bind(this);
      this.mindMap.command.add('EXPAND_ALL', this.expandAllNode); // 收起所有节点

      this.unexpandAllNode = this.unexpandAllNode.bind(this);
      this.mindMap.command.add('UNEXPAND_ALL', this.unexpandAllNode); // 设置节点数据

      this.setNodeData = this.setNodeData.bind(this);
      this.mindMap.command.add('SET_NODE_DATA', this.setNodeData); // 设置节点文本

      this.setNodeText = this.setNodeText.bind(this);
      this.mindMap.command.add('SET_NODE_TEXT', this.setNodeText); // 设置节点图片

      this.setNodeImage = this.setNodeImage.bind(this);
      this.mindMap.command.add('SET_NODE_IMAGE', this.setNodeImage); // 设置节点图标

      this.setNodeIcon = this.setNodeIcon.bind(this);
      this.mindMap.command.add('SET_NODE_ICON', this.setNodeIcon); // 设置节点超链接

      this.setNodeHyperlink = this.setNodeHyperlink.bind(this);
      this.mindMap.command.add('SET_NODE_HYPERLINK', this.setNodeHyperlink); // 设置节点备注

      this.setNodeNote = this.setNodeNote.bind(this);
      this.mindMap.command.add('SET_NODE_NOTE', this.setNodeNote); // 设置节点标签

      this.setNodeTag = this.setNodeTag.bind(this);
      this.mindMap.command.add('SET_NODE_TAG', this.setNodeTag); // 添加节点概要

      this.addGeneralization = this.addGeneralization.bind(this);
      this.mindMap.command.add('ADD_GENERALIZATION', this.addGeneralization); // 删除节点概要

      this.removeGeneralization = this.removeGeneralization.bind(this);
      this.mindMap.command.add('REMOVE_GENERALIZATION', this.removeGeneralization); // 设置节点自定义位置

      this.setNodeCustomPosition = this.setNodeCustomPosition.bind(this);
      this.mindMap.command.add('SET_NODE_CUSTOM_POSITION', this.setNodeCustomPosition); // 一键整理布局

      this.resetLayout = this.resetLayout.bind(this);
      this.mindMap.command.add('RESET_LAYOUT', this.resetLayout);
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-07-11 16:55:44 
     * @Desc: 注册快捷键 
     */

  }, {
    key: "registerShortcutKeys",
    value: function registerShortcutKeys() {
      var _this2 = this;

      // 插入下级节点
      this.mindMap.keyCommand.addShortcut('Tab', function () {
        _this2.mindMap.execCommand('INSERT_CHILD_NODE');
      }); // 插入同级节点

      this.insertNodeWrap = function () {
        if (_this2.textEdit.showTextEdit) {
          return;
        }

        _this2.mindMap.execCommand('INSERT_NODE');
      };

      this.mindMap.keyCommand.addShortcut('Enter', this.insertNodeWrap); // 插入概要

      this.mindMap.keyCommand.addShortcut('Shift+s', this.addGeneralization); // 展开/收起节点

      this.mindMap.keyCommand.addShortcut('/', function () {
        _this2.activeNodeList.forEach(function (node) {
          if (node.nodeData.children.length <= 0) {
            return;
          }

          _this2.toggleNodeExpand(node);
        });
      }); // 删除节点

      this.removeNodeWrap = function () {
        _this2.mindMap.execCommand('REMOVE_NODE');
      };

      this.mindMap.keyCommand.addShortcut('Del|Backspace', this.removeNodeWrap); // 节点编辑时某些快捷键会存在冲突，需要暂时去除

      this.mindMap.on('before_show_text_edit', function () {
        _this2.startTextEdit();
      });
      this.mindMap.on('hide_text_edit', function () {
        _this2.endTextEdit();
      }); // 全选

      this.mindMap.keyCommand.addShortcut('Control+a', function () {
        _this2.mindMap.execCommand('SELECT_ALL');
      }); // 一键整理布局

      this.mindMap.keyCommand.addShortcut('Shift+l', this.resetLayout); // 上移节点

      this.mindMap.keyCommand.addShortcut('Control+Up', this.upNode); // 下移节点

      this.mindMap.keyCommand.addShortcut('Control+Down', this.downNode); // 复制节点、剪切节点、粘贴节点的快捷键需开发者自行注册实现，可参考demo
    }
    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2022-05-09 10:43:52 
     * @Desc: 开启文字编辑，会禁用回车键和删除键相关快捷键防止冲突 
     */

  }, {
    key: "startTextEdit",
    value: function startTextEdit() {
      this.mindMap.keyCommand.removeShortcut('Del|Backspace');
      this.mindMap.keyCommand.removeShortcut('Enter', this.insertNodeWrap);
    }
    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2022-05-09 10:45:11 
     * @Desc: 结束文字编辑，会恢复回车键和删除键相关快捷键
     */

  }, {
    key: "endTextEdit",
    value: function endTextEdit() {
      this.mindMap.keyCommand.addShortcut('Del|Backspace', this.removeNodeWrap);
      this.mindMap.keyCommand.addShortcut('Enter', this.insertNodeWrap);
    }
    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-04-08 16:27:55 
     * @Desc:  渲染
     */

  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      if (this.reRender) {
        this.clearActive();
      }

      this.layout.doLayout(function (root) {
        _this3.root = root;

        _this3.root.render();
      });
      this.mindMap.emit('node_active', null, this.activeNodeList);
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-04-12 22:45:01 
     * @Desc: 清除当前激活的节点 
     */

  }, {
    key: "clearActive",
    value: function clearActive() {
      var _this4 = this;

      this.activeNodeList.forEach(function (item) {
        _this4.setNodeActive(item, false);
      });
      this.activeNodeList = [];
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-08-03 23:14:34 
     * @Desc: 清除当前所有激活节点，并会触发事件 
     */

  }, {
    key: "clearAllActive",
    value: function clearAllActive() {
      if (this.activeNodeList.length <= 0) {
        return;
      }

      this.clearActive();
      this.mindMap.emit('node_active', null, []);
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-07-11 10:54:00 
     * @Desc:  添加节点到激活列表里
     */

  }, {
    key: "addActiveNode",
    value: function addActiveNode(node) {
      var index = this.findActiveNodeIndex(node);

      if (index === -1) {
        this.activeNodeList.push(node);
      }
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-07-10 10:04:04 
     * @Desc: 在激活列表里移除某个节点 
     */

  }, {
    key: "removeActiveNode",
    value: function removeActiveNode(node) {
      var index = this.findActiveNodeIndex(node);

      if (index === -1) {
        return;
      }

      this.activeNodeList.splice(index, 1);
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-07-11 10:55:23 
     * @Desc: 检索某个节点在激活列表里的索引 
     */

  }, {
    key: "findActiveNodeIndex",
    value: function findActiveNodeIndex(node) {
      return this.activeNodeList.findIndex(function (item) {
        return item === node;
      });
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-05-04 13:46:08 
     * @Desc: 获取节点在同级里的索引位置 
     */

  }, {
    key: "getNodeIndex",
    value: function getNodeIndex(node) {
      return node.parent ? node.parent.children.findIndex(function (item) {
        return item === node;
      }) : 0;
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-08-04 23:54:52 
     * @Desc: 全选 
     */

  }, {
    key: "selectAll",
    value: function selectAll() {
      var _this5 = this;

      walk(this.root, null, function (node) {
        if (!node.nodeData.data.isActive) {
          node.nodeData.data.isActive = true;

          _this5.addActiveNode(node);

          setTimeout(function () {
            node.renderNode();
          }, 0);
        }
      }, null, true, 0, 0);
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-07-11 22:34:12 
     * @Desc: 回退 
     */

  }, {
    key: "back",
    value: function back(step) {
      this.clearAllActive();
      var data = this.mindMap.command.back(step);

      if (data) {
        this.renderTree = data;
        this.mindMap.reRender();
      }
    }
    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-07-12 10:44:51 
     * @Desc: 前进 
     */

  }, {
    key: "forward",
    value: function forward(step) {
      this.clearAllActive();
      var data = this.mindMap.command.forward(step);

      if (data) {
        this.renderTree = data;
        this.mindMap.reRender();
      }
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-05-04 13:19:54 
     * @Desc: 插入同级节点，多个节点只会操作第一个节点
     */

  }, {
    key: "insertNode",
    value: function insertNode() {
      if (this.activeNodeList.length <= 0) {
        return;
      }

      var first = this.activeNodeList[0];

      if (first.isRoot) {
        this.insertChildNode();
      } else {
        var text = first.layerIndex === 1 ? '二级节点' : '分支主题';

        if (first.layerIndex === 1) {
          first.parent.initRender = true;
        }

        var index = this.getNodeIndex(first);
        first.parent.nodeData.children.splice(index + 1, 0, {
          "data": {
            "text": text,
            "expand": true
          },
          "children": []
        });
        this.mindMap.render();
      }
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-05-04 13:31:02 
     * @Desc: 插入子节点 
     */

  }, {
    key: "insertChildNode",
    value: function insertChildNode() {
      if (this.activeNodeList.length <= 0) {
        return;
      }

      this.activeNodeList.forEach(function (node, index) {
        if (!node.nodeData.children) {
          node.nodeData.children = [];
        }

        var text = node.isRoot ? '二级节点' : '分支主题';
        node.nodeData.children.push({
          "data": {
            "text": text,
            "expand": true
          },
          "children": []
        });

        if (node.isRoot) {
          node.initRender = true; // this.mindMap.batchExecution.push('renderNode' + index, () => {
          //     node.renderNode()
          // })
        }
      });
      this.mindMap.render();
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-07-14 23:34:14 
     * @Desc: 上移节点，多个节点只会操作第一个节点
     */

  }, {
    key: "upNode",
    value: function upNode() {
      if (this.activeNodeList.length <= 0) {
        return;
      }

      var node = this.activeNodeList[0];

      if (node.isRoot) {
        return;
      }

      var parent = node.parent;
      var childList = parent.children;
      var index = childList.findIndex(function (item) {
        return item === node;
      });

      if (index === -1 || index === 0) {
        return;
      }

      var insertIndex = index - 1; // 节点实例

      childList.splice(index, 1);
      childList.splice(insertIndex, 0, node); // 节点数据

      parent.nodeData.children.splice(index, 1);
      parent.nodeData.children.splice(insertIndex, 0, node.nodeData);
      this.mindMap.render();
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-07-14 23:34:18 
     * @Desc: 下移节点，多个节点只会操作第一个节点 
     */

  }, {
    key: "downNode",
    value: function downNode() {
      if (this.activeNodeList.length <= 0) {
        return;
      }

      var node = this.activeNodeList[0];

      if (node.isRoot) {
        return;
      }

      var parent = node.parent;
      var childList = parent.children;
      var index = childList.findIndex(function (item) {
        return item === node;
      });

      if (index === -1 || index === childList.length - 1) {
        return;
      }

      var insertIndex = index + 1; // 节点实例

      childList.splice(index, 1);
      childList.splice(insertIndex, 0, node); // 节点数据

      parent.nodeData.children.splice(index, 1);
      parent.nodeData.children.splice(insertIndex, 0, node.nodeData);
      this.mindMap.render();
    }
    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-11-25 10:51:34 
     * @Desc: 将节点移动到另一个节点的前面
     */

  }, {
    key: "insertBefore",
    value: function insertBefore(node, exist) {
      if (node.isRoot) {
        return;
      }

      var parent = node.parent;
      var childList = parent.children; // 要移动节点的索引

      var index = childList.findIndex(function (item) {
        return item === node;
      });

      if (index === -1) {
        return;
      } // 目标节点的索引


      var existIndex = childList.findIndex(function (item) {
        return item === exist;
      });

      if (existIndex === -1) {
        return;
      } // 当前节点在目标节点前面


      if (index < existIndex) {
        existIndex = existIndex - 1;
      } else {
        existIndex = existIndex;
      } // 节点实例


      childList.splice(index, 1);
      childList.splice(existIndex, 0, node); // 节点数据

      parent.nodeData.children.splice(index, 1);
      parent.nodeData.children.splice(existIndex, 0, node.nodeData);
      this.mindMap.render();
    }
    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-11-25 10:51:34 
     * @Desc: 将节点移动到另一个节点的后面
     */

  }, {
    key: "insertAfter",
    value: function insertAfter(node, exist) {
      if (node.isRoot) {
        return;
      }

      var parent = node.parent;
      var childList = parent.children; // 要移动节点的索引

      var index = childList.findIndex(function (item) {
        return item === node;
      });

      if (index === -1) {
        return;
      } // 目标节点的索引


      var existIndex = childList.findIndex(function (item) {
        return item === exist;
      });

      if (existIndex === -1) {
        return;
      } // 当前节点在目标节点前面


      if (index < existIndex) {
        existIndex = existIndex;
      } else {
        existIndex = existIndex + 1;
      } // 节点实例


      childList.splice(index, 1);
      childList.splice(existIndex, 0, node); // 节点数据

      parent.nodeData.children.splice(index, 1);
      parent.nodeData.children.splice(existIndex, 0, node.nodeData);
      this.mindMap.render();
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-05-04 13:40:39 
     * @Desc: 移除节点 
     */

  }, {
    key: "removeNode",
    value: function removeNode() {
      if (this.activeNodeList.length <= 0) {
        return;
      }

      for (var i = 0; i < this.activeNodeList.length; i++) {
        var node = this.activeNodeList[i];

        if (node.isGeneralization) {
          // 删除概要节点
          this.setNodeData(node.generalizationBelongNode, {
            generalization: null
          });
          node.generalizationBelongNode.update();
          this.removeActiveNode(node);
          i--;
        } else if (node.isRoot) {
          node.children.forEach(function (child) {
            child.remove();
          });
          node.children = [];
          node.nodeData.children = [];
          break;
        } else {
          this.removeActiveNode(node);
          this.removeOneNode(node);
          i--;
        }
      }

      this.mindMap.emit('node_active', null, []);
      this.mindMap.render();
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-07-15 22:46:27 
     * @Desc: 移除某个指定节点 
     */

  }, {
    key: "removeOneNode",
    value: function removeOneNode(node) {
      var index = this.getNodeIndex(node);
      node.remove();
      node.parent.children.splice(index, 1);
      node.parent.nodeData.children.splice(index, 1);
    }
    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-07-15 09:53:23 
     * @Desc: 复制节点，多个节点只会操作第一个节点 
     */

  }, {
    key: "copyNode",
    value: function copyNode() {
      if (this.activeNodeList.length <= 0) {
        return;
      }

      return copyNodeTree({}, this.activeNodeList[0]);
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-07-15 22:36:45 
     * @Desc: 剪切节点，多个节点只会操作第一个节点
     */

  }, {
    key: "cutNode",
    value: function cutNode(callback) {
      if (this.activeNodeList.length <= 0) {
        return;
      }

      var node = this.activeNodeList[0];

      if (node.isRoot) {
        return null;
      }

      var copyData = copyNodeTree({}, node);
      this.removeActiveNode(node);
      this.removeOneNode(node);
      this.mindMap.emit('node_active', null, this.activeNodeList);
      this.mindMap.render();

      if (callback && typeof callback === 'function') {
        callback(copyData);
      }
    }
    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-11-24 16:54:01 
     * @Desc: 移动一个节点作为另一个节点的子节点 
     */

  }, {
    key: "moveNodeTo",
    value: function moveNodeTo(node, toNode) {
      if (node.isRoot) {
        return;
      }

      var copyData = copyNodeTree({}, node);
      this.removeActiveNode(node);
      this.removeOneNode(node);
      this.mindMap.emit('node_active', null, this.activeNodeList);
      toNode.nodeData.children.push(copyData);
      this.mindMap.render();
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-07-15 20:09:39 
     * @Desc:  粘贴节点到节点
     */

  }, {
    key: "pasteNode",
    value: function pasteNode(data) {
      if (this.activeNodeList.length <= 0) {
        return;
      }

      this.activeNodeList.forEach(function (item) {
        item.nodeData.children.push(simpleDeepClone(data));
      });
      this.mindMap.render();
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-07-08 21:54:30 
     * @Desc: 设置节点样式 
     */

  }, {
    key: "setNodeStyle",
    value: function setNodeStyle(node, prop, value, isActive) {
      var data = {};

      if (isActive) {
        data = {
          activeStyle: _objectSpread2(_objectSpread2({}, node.nodeData.data.activeStyle || {}), {}, _defineProperty({}, prop, value))
        };
      } else {
        data = _defineProperty({}, prop, value);
      }

      this.setNodeDataRender(node, data);
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-07-08 22:13:03 
     * @Desc: 设置节点是否激活 
     */

  }, {
    key: "setNodeActive",
    value: function setNodeActive(node, active) {
      this.setNodeData(node, {
        isActive: active
      });
      node.renderNode();
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-07-10 16:52:41 
     * @Desc: 设置节点是否展开 
     */

  }, {
    key: "setNodeExpand",
    value: function setNodeExpand(node, expand) {
      this.setNodeData(node, {
        expand: expand
      });

      if (expand) {
        // 展开
        node.children.forEach(function (item) {
          item.render();
        });
        node.renderLine();
        node.updateExpandBtnNode();
      } else {
        // 收缩
        node.children.forEach(function (item) {
          item.remove();
        });
        node.removeLine();
        node.updateExpandBtnNode();
      }

      this.mindMap.render();
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-07-15 23:23:37 
     * @Desc: 展开所有 
     */

  }, {
    key: "expandAllNode",
    value: function expandAllNode() {
      walk(this.renderTree, null, function (node) {
        if (!node.data.expand) {
          node.data.expand = true;
        }
      }, null, true, 0, 0);
      this.mindMap.render();
      this.root.children.forEach(function (item) {
        item.updateExpandBtnNode();
      });
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-07-15 23:27:14 
     * @Desc: 收起所有 
     */

  }, {
    key: "unexpandAllNode",
    value: function unexpandAllNode() {
      var _this6 = this;

      this.root.children.forEach(function (item) {
        _this6.setNodeExpand(item, false);
      });
      walk(this.renderTree, null, function (node, parent, isRoot) {
        if (!isRoot) {
          node.data.expand = false;
        }
      }, null, true, 0, 0);
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-07-11 17:15:33 
     * @Desc: 切换节点展开状态 
     */

  }, {
    key: "toggleNodeExpand",
    value: function toggleNodeExpand(node) {
      this.mindMap.execCommand('SET_NODE_EXPAND', node, !node.nodeData.data.expand);
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-07-09 22:04:19 
     * @Desc: 设置节点文本 
     */

  }, {
    key: "setNodeText",
    value: function setNodeText(node, text) {
      this.setNodeDataRender(node, {
        text: text
      });
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-07-10 08:37:40 
     * @Desc: 设置节点图片 
     */

  }, {
    key: "setNodeImage",
    value: function setNodeImage(node, _ref) {
      var url = _ref.url,
          title = _ref.title,
          width = _ref.width,
          height = _ref.height;
      this.setNodeDataRender(node, {
        image: url,
        imageTitle: title || '',
        imageSize: {
          width: width,
          height: height
        }
      });
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-07-10 08:44:06 
     * @Desc: 设置节点图标 
     */

  }, {
    key: "setNodeIcon",
    value: function setNodeIcon(node, icons) {
      this.setNodeDataRender(node, {
        icon: icons
      });
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-07-10 08:49:33 
     * @Desc: 设置节点超链接 
     */

  }, {
    key: "setNodeHyperlink",
    value: function setNodeHyperlink(node, link) {
      var title = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
      this.setNodeDataRender(node, {
        hyperlink: link,
        hyperlinkTitle: title
      });
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-07-10 08:52:59 
     * @Desc: 设置节点备注 
     */

  }, {
    key: "setNodeNote",
    value: function setNodeNote(node, note) {
      this.setNodeDataRender(node, {
        note: note
      });
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-07-10 08:54:53 
     * @Desc: 设置节点标签 
     */

  }, {
    key: "setNodeTag",
    value: function setNodeTag(node, tag) {
      this.setNodeDataRender(node, {
        tag: tag
      });
    }
    /** 
     * @Author: 王林 
     * @Date: 2022-07-30 20:52:42 
     * @Desc: 添加节点概要
     */

  }, {
    key: "addGeneralization",
    value: function addGeneralization(data) {
      var _this7 = this;

      if (this.activeNodeList.length <= 0) {
        return;
      }

      this.activeNodeList.forEach(function (node) {
        if (node.nodeData.data.generalization || node.isRoot) {
          return;
        }

        _this7.setNodeData(node, {
          generalization: data || {
            text: '概要'
          }
        });

        node.update();
      });
      this.mindMap.render();
    }
    /** 
     * @Author: 王林 
     * @Date: 2022-07-30 21:16:33 
     * @Desc: 删除节点概要
     */

  }, {
    key: "removeGeneralization",
    value: function removeGeneralization() {
      var _this8 = this;

      if (this.activeNodeList.length <= 0) {
        return;
      }

      this.activeNodeList.forEach(function (node) {
        if (!node.nodeData.data.generalization) {
          return;
        }

        _this8.setNodeData(node, {
          generalization: null
        });

        node.update();
      });
      this.mindMap.render();
    }
    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2022-08-02 19:04:24 
     * @Desc: 设置节点自定义位置 
     */

  }, {
    key: "setNodeCustomPosition",
    value: function setNodeCustomPosition(node) {
      var _this9 = this;

      var left = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var top = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
      var nodeList = [node] || false;
      nodeList.forEach(function (item) {
        _this9.setNodeData(item, {
          customLeft: left,
          customTop: top
        });
      });
    }
    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2022-08-02 20:02:50 
     * @Desc: 一键整理布局，即去除自定义位置 
     */

  }, {
    key: "resetLayout",
    value: function resetLayout() {
      var _this10 = this;

      walk(this.root, null, function (node) {
        node.customLeft = undefined;
        node.customTop = undefined;

        _this10.setNodeData(node, {
          customLeft: undefined,
          customTop: undefined
        });

        _this10.mindMap.render();
      }, null, true, 0, 0);
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-05-04 14:19:48 
     * @Desc: 更新节点数据 
     */

  }, {
    key: "setNodeData",
    value: function setNodeData(node, data) {
      Object.keys(data).forEach(function (key) {
        node.nodeData.data[key] = data[key];
      });
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-07-10 08:45:48 
     * @Desc: 设置节点数据，并判断是否渲染 
     */

  }, {
    key: "setNodeDataRender",
    value: function setNodeDataRender(node, data) {
      this.setNodeData(node, data);
      var changed = node.getSize();
      node.renderNode();

      if (changed) {
        if (node.isGeneralization) {
          // 概要节点
          node.generalizationBelongNode.updateGeneralization();
        }

        this.mindMap.render();
      }
    }
  }]);

  return Render;
}();

/* harmony default export */ var src_Render = (Render_Render);
// CONCATENATED MODULE: ../simple-mind-map/src/themes/default.js
/** 
 * @Author: 王林 
 * @Date: 2021-04-11 10:19:55 
 * @Desc: 默认主题 
 */
/* harmony default export */ var themes_default = ({
  // 节点内边距
  paddingX: 15,
  paddingY: 5,
  // 图片显示的最大宽度
  imgMaxWidth: 100,
  // 图片显示的最大高度
  imgMaxHeight: 100,
  // icon的大小
  iconSize: 20,
  // 连线的粗细
  lineWidth: 1,
  // 连线的颜色
  lineColor: '#549688',
  // 概要连线的粗细
  generalizationLineWidth: 1,
  // 概要连线的颜色
  generalizationLineColor: '#549688',
  // 概要曲线距节点的距离
  generalizationLineMargin: 0,
  // 概要节点距节点的距离
  generalizationNodeMargin: 20,
  // 背景颜色
  backgroundColor: '#fafafa',
  // 背景图片
  backgroundImage: 'none',
  // 背景重复
  backgroundRepeat: 'no-repeat',
  // 根节点样式
  root: {
    fillColor: '#549688',
    fontFamily: '微软雅黑, Microsoft YaHei',
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    fontStyle: 'normal',
    lineHeight: 1.5,
    borderColor: 'transparent',
    borderWidth: 0,
    borderDasharray: 'none',
    borderRadius: 5,
    textDecoration: 'none',
    active: {
      borderColor: 'rgb(57, 80, 96)',
      borderWidth: 3,
      borderDasharray: 'none'
    }
  },
  // 二级节点样式
  second: {
    marginX: 100,
    marginY: 40,
    fillColor: '#fff',
    fontFamily: '微软雅黑, Microsoft YaHei',
    color: '#565656',
    fontSize: 16,
    fontWeight: 'noraml',
    fontStyle: 'normal',
    lineHeight: 1.5,
    borderColor: '#549688',
    borderWidth: 1,
    borderDasharray: 'none',
    borderRadius: 5,
    textDecoration: 'none',
    active: {
      borderColor: 'rgb(57, 80, 96)',
      borderWidth: 3,
      borderDasharray: 'none'
    }
  },
  // 三级及以下节点样式
  node: {
    marginX: 50,
    marginY: 0,
    fillColor: 'transparent',
    fontFamily: '微软雅黑, Microsoft YaHei',
    color: '#6a6d6c',
    fontSize: 14,
    fontWeight: 'noraml',
    fontStyle: 'normal',
    lineHeight: 1.5,
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: 5,
    borderDasharray: 'none',
    textDecoration: 'none',
    active: {
      borderColor: 'rgb(57, 80, 96)',
      borderWidth: 3,
      borderDasharray: 'none'
    }
  },
  // 概要节点样式
  generalization: {
    marginX: 100,
    marginY: 40,
    fillColor: '#fff',
    fontFamily: '微软雅黑, Microsoft YaHei',
    color: '#565656',
    fontSize: 16,
    fontWeight: 'noraml',
    fontStyle: 'normal',
    lineHeight: 1.5,
    borderColor: '#549688',
    borderWidth: 1,
    borderDasharray: 'none',
    borderRadius: 5,
    textDecoration: 'none',
    active: {
      borderColor: 'rgb(57, 80, 96)',
      borderWidth: 3,
      borderDasharray: 'none'
    }
  }
});
// CONCATENATED MODULE: ../simple-mind-map/src/themes/freshGreen.js


/** 
 * @Author: 王林 
 * @Date: 2021-04-11 15:22:18 
 * @Desc: 清新绿 
 */

/* harmony default export */ var freshGreen = (cjs_default()(themes_default, {
  // 连线的颜色
  lineColor: '#333',
  // 背景颜色
  backgroundColor: '#d1f6ec',
  // 概要连线的粗细
  generalizationLineWidth: 1,
  // 概要连线的颜色
  generalizationLineColor: '#333',
  // 根节点样式
  root: {
    fillColor: '#1fb27d'
  },
  // 二级节点样式
  second: {
    fillColor: '#fff',
    color: '#565656',
    borderColor: 'transparent',
    borderWidth: 0
  },
  // 概要节点样式
  generalization: {
    fillColor: '#fff',
    borderColor: '#333',
    color: '#333',
    active: {
      borderColor: 'rgb(57, 80, 96)',
      borderWidth: 3,
      borderDasharray: 'none'
    }
  }
}));
// CONCATENATED MODULE: ../simple-mind-map/src/themes/blueSky.js


/** 
 * @Author: 王林 
 * @Date: 2021-04-11 15:22:18 
 * @Desc: 天空蓝
 */

/* harmony default export */ var blueSky = (cjs_default()(themes_default, {
  // 连线的颜色
  lineColor: 'rgb(115, 161, 191)',
  // 背景颜色
  backgroundColor: 'rgb(251, 251, 251)',
  // 概要连线的粗细
  generalizationLineWidth: 1,
  // 概要连线的颜色
  generalizationLineColor: '#333',
  // 根节点样式
  root: {
    fillColor: 'rgb(115, 161, 191)',
    active: {
      borderColor: 'rgb(57, 80, 96)'
    }
  },
  // 二级节点样式
  second: {
    fillColor: 'rgb(238, 243, 246)',
    color: '#333',
    borderColor: 'rgb(115, 161, 191)',
    borderWidth: 1,
    fontSize: 14,
    active: {
      borderColor: 'rgb(57, 80, 96)'
    }
  },
  // 三级及以下节点样式
  node: {
    fontSize: 12,
    color: '#333',
    active: {
      borderColor: 'rgb(57, 80, 96)'
    }
  },
  // 概要节点样式
  generalization: {
    fillColor: '#fff',
    borderColor: '#333',
    color: '#333',
    active: {
      borderColor: 'rgb(57, 80, 96)'
    }
  }
}));
// CONCATENATED MODULE: ../simple-mind-map/src/themes/brainImpairedPink.js


/** 
 * @Author: 王林 
 * @Date: 2021-04-11 15:22:18 
 * @Desc: 脑残粉
 */

/* harmony default export */ var brainImpairedPink = (cjs_default()(themes_default, {
  // 连线的颜色
  lineColor: 'rgb(191, 115, 148)',
  // 背景颜色
  backgroundColor: 'rgb(251, 251, 251)',
  // 概要连线的粗细
  generalizationLineWidth: 1,
  // 概要连线的颜色
  generalizationLineColor: '#333',
  // 根节点样式
  root: {
    fillColor: 'rgb(191, 115, 148)',
    active: {
      borderColor: 'rgb(96, 57, 74)'
    }
  },
  // 二级节点样式
  second: {
    fillColor: 'rgb(246, 238, 242)',
    color: '#333',
    borderColor: 'rgb(191, 115, 148)',
    borderWidth: 1,
    fontSize: 14,
    active: {
      borderColor: 'rgb(96, 57, 74)'
    }
  },
  // 三级及以下节点样式
  node: {
    fontSize: 12,
    color: '#333',
    active: {
      borderColor: 'rgb(96, 57, 74)'
    }
  },
  // 概要节点样式
  generalization: {
    fillColor: '#fff',
    borderColor: '#333',
    color: '#333',
    active: {
      borderColor: 'rgb(96, 57, 74)'
    }
  }
}));
// CONCATENATED MODULE: ../simple-mind-map/src/themes/romanticPurple.js


/** 
 * @Author: 王林 
 * @Date: 2021-04-11 15:22:18 
 * @Desc: 浪漫紫
 */

/* harmony default export */ var romanticPurple = (cjs_default()(themes_default, {
  // 连线的颜色
  lineColor: 'rgb(123, 115, 191)',
  // 背景颜色
  backgroundColor: 'rgb(251, 251, 251)',
  // 概要连线的粗细
  generalizationLineWidth: 1,
  // 概要连线的颜色
  generalizationLineColor: '#333',
  // 根节点样式
  root: {
    fillColor: 'rgb(123, 115, 191)',
    active: {
      borderColor: 'rgb(61, 57, 96)'
    }
  },
  // 二级节点样式
  second: {
    fillColor: 'rgb(239, 238, 246)',
    color: '#333',
    borderColor: 'rgb(123, 115, 191)',
    borderWidth: 1,
    fontSize: 14,
    active: {
      borderColor: 'rgb(61, 57, 96)'
    }
  },
  // 三级及以下节点样式
  node: {
    fontSize: 12,
    color: '#333',
    active: {
      borderColor: 'rgb(61, 57, 96)'
    }
  },
  // 概要节点样式
  generalization: {
    fillColor: '#fff',
    borderColor: '#333',
    color: '#333',
    active: {
      borderColor: 'rgb(61, 57, 96)'
    }
  }
}));
// CONCATENATED MODULE: ../simple-mind-map/src/themes/freshRed.js


/** 
 * @Author: 王林 
 * @Date: 2021-04-11 15:22:18 
 * @Desc: 清新红
 */

/* harmony default export */ var freshRed = (cjs_default()(themes_default, {
  // 连线的颜色
  lineColor: 'rgb(191, 115, 115)',
  // 背景颜色
  backgroundColor: 'rgb(251, 251, 251)',
  // 概要连线的粗细
  generalizationLineWidth: 1,
  // 概要连线的颜色
  generalizationLineColor: '#333',
  // 根节点样式
  root: {
    fillColor: 'rgb(191, 115, 115)',
    active: {
      borderColor: 'rgb(96, 57, 57)'
    }
  },
  // 二级节点样式
  second: {
    fillColor: 'rgb(246, 238, 238)',
    color: '#333',
    borderColor: 'rgb(191, 115, 115)',
    borderWidth: 1,
    fontSize: 14,
    active: {
      borderColor: 'rgb(96, 57, 57)'
    }
  },
  // 三级及以下节点样式
  node: {
    fontSize: 12,
    color: '#333',
    active: {
      borderColor: 'rgb(96, 57, 57)'
    }
  },
  // 概要节点样式
  generalization: {
    fillColor: '#fff',
    borderColor: '#333',
    color: '#333',
    active: {
      borderColor: 'rgb(96, 57, 57)'
    }
  }
}));
// CONCATENATED MODULE: ../simple-mind-map/src/themes/earthYellow.js


/** 
 * @Author: 王林 
 * @Date: 2021-04-11 15:22:18 
 * @Desc: 泥土黄
 */

/* harmony default export */ var earthYellow = (cjs_default()(themes_default, {
  // 连线的颜色
  lineColor: 'rgb(191, 147, 115)',
  // 背景颜色
  backgroundColor: 'rgb(251, 251, 251)',
  // 概要连线的粗细
  generalizationLineWidth: 1,
  // 概要连线的颜色
  generalizationLineColor: '#333',
  // 根节点样式
  root: {
    fillColor: 'rgb(191, 147, 115)',
    active: {
      borderColor: 'rgb(96, 73, 57)'
    }
  },
  // 二级节点样式
  second: {
    fillColor: 'rgb(246, 242, 238)',
    color: '#333',
    borderColor: 'rgb(191, 147, 115)',
    borderWidth: 1,
    fontSize: 14,
    active: {
      borderColor: 'rgb(96, 73, 57)'
    }
  },
  // 三级及以下节点样式
  node: {
    fontSize: 12,
    color: '#333',
    active: {
      borderColor: 'rgb(96, 73, 57)'
    }
  },
  // 概要节点样式
  generalization: {
    fillColor: '#fff',
    borderColor: '#333',
    color: '#333',
    active: {
      borderColor: 'rgb(96, 73, 57)'
    }
  }
}));
// CONCATENATED MODULE: ../simple-mind-map/src/themes/classic.js


/** 
 * @Author: 王林 
 * @Date: 2021-04-11 15:22:18 
 * @Desc: 脑图经典
 */

/* harmony default export */ var classic = (cjs_default()(themes_default, {
  // 连线的颜色
  lineColor: '#fff',
  // 连线的粗细
  lineWidth: 3,
  // 概要连线的粗细
  generalizationLineWidth: 3,
  // 概要连线的颜色
  generalizationLineColor: '#fff',
  // 背景颜色
  backgroundColor: 'rgb(58, 65, 68)',
  // 背景图片
  backgroundImage: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAIAAAACDbGyAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDowQzg5QTQ0NDhENzgxMUUzOENGREE4QTg0RDgzRTZDNyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDowQzg5QTQ0NThENzgxMUUzOENGREE4QTg0RDgzRTZDNyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkMwOEQ1NDRGOEQ3NzExRTM4Q0ZEQThBODREODNFNkM3IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkMwOEQ1NDUwOEQ3NzExRTM4Q0ZEQThBODREODNFNkM3Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+e9P33AAAACVJREFUeNpisXJ0YUACTAyoAMr/+eM7EGGRZ4FQ7BycEAZAgAEAHbEGtkoQm/wAAAAASUVORK5CYII=',
  // 背景重复
  backgroundRepeat: 'repeat',
  // 根节点样式
  root: {
    fillColor: 'rgb(233, 223, 152)',
    color: '#333',
    fontSize: 24,
    borderRadius: 21,
    active: {
      fillColor: 'rgb(254, 219, 0)',
      borderColor: 'transparent'
    }
  },
  // 二级节点样式
  second: {
    fillColor: 'rgb(164, 197, 192)',
    borderColor: 'transparent',
    color: '#333',
    fontSize: 16,
    borderRadius: 10,
    active: {
      fillColor: 'rgb(254, 219, 0)',
      borderColor: 'transparent'
    }
  },
  // 三级及以下节点样式
  node: {
    fontSize: 12,
    color: '#fff',
    fontWeight: 'bold',
    active: {
      fillColor: 'rgb(254, 219, 0)',
      borderColor: 'transparent'
    }
  },
  // 概要节点样式
  generalization: {
    fillColor: '#fff',
    borderColor: 'transparent',
    color: '#333',
    active: {
      fillColor: 'rgb(254, 219, 0)',
      borderColor: 'transparent'
    }
  }
}));
// CONCATENATED MODULE: ../simple-mind-map/src/themes/classic2.js


/** 
 * @Author: 王林 
 * @Date: 2021-04-11 15:22:18 
 * @Desc: 经典2
 */

/* harmony default export */ var classic2 = (cjs_default()(themes_default, {
  // 连线的颜色
  lineColor: 'rgb(51, 51, 51)',
  // 连线的粗细
  lineWidth: 2,
  // 概要连线的粗细
  generalizationLineWidth: 3,
  // 概要连线的颜色
  generalizationLineColor: 'rgb(51, 51, 51)',
  // 背景颜色
  backgroundColor: '#fff',
  // 根节点样式
  root: {
    fillColor: 'rgb(18, 187, 55)',
    color: '#fff',
    fontSize: 24,
    borderRadius: 10,
    active: {
      borderColor: 'rgb(51, 51, 51)'
    }
  },
  // 二级节点样式
  second: {
    fillColor: 'rgb(241, 242, 241)',
    borderColor: 'transparent',
    color: '#1a1a1a',
    fontSize: 18,
    borderRadius: 10,
    active: {
      borderColor: 'rgb(51, 51, 51)'
    }
  },
  // 三级及以下节点样式
  node: {
    fontSize: 14,
    color: '#1a1a1a',
    active: {
      borderColor: 'rgb(51, 51, 51)'
    }
  },
  // 概要节点样式
  generalization: {
    fillColor: '#fff',
    borderColor: 'rgb(51, 51, 51)',
    borderWidth: 2,
    color: '#1a1a1a',
    active: {
      borderColor: 'rgb(18, 187, 55)'
    }
  }
}));
// CONCATENATED MODULE: ../simple-mind-map/src/themes/classic3.js


/** 
 * @Author: 王林 
 * @Date: 2021-04-11 15:22:18 
 * @Desc: 经典3
 */

/* harmony default export */ var classic3 = (cjs_default()(themes_default, {
  // 连线的颜色
  lineColor: 'rgb(94, 202, 110)',
  // 连线的粗细
  lineWidth: 2,
  // 概要连线的粗细
  generalizationLineWidth: 3,
  // 概要连线的颜色
  generalizationLineColor: '#1a1a1a',
  // 背景颜色
  backgroundColor: 'rgb(241, 241, 241)',
  // 根节点样式
  root: {
    fillColor: 'rgb(255, 245, 214)',
    color: '#1a1a1a',
    fontSize: 24,
    borderRadius: 10,
    borderColor: 'rgb(249, 199, 84)',
    borderWidth: 1,
    active: {
      borderColor: 'rgb(94, 202, 110)'
    }
  },
  // 二级节点样式
  second: {
    fillColor: 'rgb(255, 245, 214)',
    borderColor: 'rgb(249, 199, 84)',
    borderWidth: 1,
    color: '#1a1a1a',
    fontSize: 18,
    borderRadius: 10,
    active: {
      borderColor: 'rgb(94, 202, 110)'
    }
  },
  // 三级及以下节点样式
  node: {
    fontSize: 14,
    color: '#1a1a1a',
    active: {
      borderColor: 'rgb(94, 202, 110)'
    }
  },
  // 概要节点样式
  generalization: {
    fillColor: '#fff',
    borderColor: '#1a1a1a',
    color: '#1a1a1a',
    borderWidth: 2,
    active: {
      borderColor: 'rgb(94, 202, 110)'
    }
  }
}));
// CONCATENATED MODULE: ../simple-mind-map/src/themes/classic4.js


/** 
 * @Author: 王林 
 * @Date: 2021-04-11 15:22:18 
 * @Desc: 经典4
 */

/* harmony default export */ var classic4 = (cjs_default()(themes_default, {
  // 连线的颜色
  lineColor: 'rgb(30, 53, 86)',
  // 连线的粗细
  lineWidth: 2,
  // 概要连线的粗细
  generalizationLineWidth: 2,
  // 概要连线的颜色
  generalizationLineColor: 'rgb(56, 123, 233)',
  // 背景颜色
  backgroundColor: 'rgb(241, 241, 241)',
  // 根节点样式
  root: {
    fillColor: 'rgb(30, 53, 86)',
    color: '#fff',
    fontSize: 24,
    borderRadius: 10,
    borderColor: 'rgb(189, 197, 201)',
    borderWidth: 2,
    active: {
      borderColor: 'rgb(169, 218, 218)'
    }
  },
  // 二级节点样式
  second: {
    fillColor: 'rgb(169, 218, 218)',
    borderColor: 'rgb(30, 53, 86)',
    borderWidth: 2,
    color: '#fff',
    fontSize: 18,
    borderRadius: 10,
    active: {
      borderColor: 'rgb(56, 123, 233)'
    }
  },
  // 三级及以下节点样式
  node: {
    fontSize: 14,
    color: 'rgb(30, 53, 86)',
    borderColor: 'rgb(30, 53, 86)',
    borderWidth: 1,
    marginY: 20,
    active: {
      borderColor: 'rgb(169, 218, 218)'
    }
  },
  // 概要节点样式
  generalization: {
    fillColor: 'rgb(56, 123, 233)',
    borderColor: 'rgb(56, 123, 233)',
    color: '#fff',
    borderWidth: 0,
    active: {
      borderColor: 'rgb(169, 218, 218)'
    }
  }
}));
// CONCATENATED MODULE: ../simple-mind-map/src/themes/dark.js


/** 
 * @Author: 王林 
 * @Date: 2021-04-11 15:22:18 
 * @Desc: 暗色
 */

/* harmony default export */ var dark = (cjs_default()(themes_default, {
  // 连线的颜色
  lineColor: 'rgb(17, 68, 23)',
  // 连线的粗细
  lineWidth: 2,
  // 概要连线的粗细
  generalizationLineWidth: 2,
  // 概要连线的颜色
  generalizationLineColor: '#fff',
  // 背景颜色
  backgroundColor: 'rgb(15, 16, 17)',
  // 根节点样式
  root: {
    fillColor: 'rgb(28, 178, 43)',
    color: '#fff',
    fontSize: 24,
    borderRadius: 10,
    active: {
      borderColor: 'rgb(17, 68, 23)'
    }
  },
  // 二级节点样式
  second: {
    fillColor: 'rgb(55, 56, 58)',
    color: 'rgb(147,148,149)',
    fontSize: 18,
    borderRadius: 10,
    borderWidth: 0,
    active: {
      borderColor: 'rgb(17, 68, 23)'
    }
  },
  // 三级及以下节点样式
  node: {
    fontSize: 14,
    color: 'rgb(147, 148, 149)',
    active: {
      borderColor: 'rgb(17, 68, 23)'
    }
  },
  // 概要节点样式
  generalization: {
    fillColor: '#fff',
    borderColor: 'transparent',
    color: '#333',
    active: {
      borderColor: 'rgb(17, 68, 23)'
    }
  }
}));
// CONCATENATED MODULE: ../simple-mind-map/src/themes/classicGreen.js


/** 
 * @Author: 王林 
 * @Date: 2021-04-11 15:22:18 
 * @Desc: 经典绿
 */

/* harmony default export */ var classicGreen = (cjs_default()(themes_default, {
  // 连线的颜色
  lineColor: 'rgb(123, 199, 120)',
  // 背景颜色
  backgroundColor: 'rgb(236, 245, 231)',
  // 概要连线的粗细
  generalizationLineWidth: 2,
  // 概要连线的颜色
  generalizationLineColor: 'rgb(123, 199, 120)',
  // 根节点样式
  root: {
    fillColor: 'rgb(253, 244, 217)',
    color: '#222',
    active: {
      borderColor: 'rgb(94, 199, 248)'
    }
  },
  // 二级节点样式
  second: {
    fillColor: 'rgb(253, 244, 217)',
    color: '#222',
    borderColor: 'rgb(242, 200, 104)',
    borderWidth: 1,
    fontSize: 14,
    active: {
      borderColor: 'rgb(94, 199, 248)'
    }
  },
  // 三级及以下节点样式
  node: {
    fontSize: 12,
    color: '#333',
    active: {
      borderColor: 'rgb(94, 199, 248)'
    }
  },
  // 概要节点样式
  generalization: {
    fillColor: 'rgb(123, 199, 120)',
    borderColor: 'transparent',
    borderWidth: 2,
    color: '#fff',
    active: {
      borderColor: 'rgb(94, 199, 248)'
    }
  }
}));
// CONCATENATED MODULE: ../simple-mind-map/src/themes/classicBlue.js


/** 
 * @Author: 王林 
 * @Date: 2021-04-11 15:22:18 
 * @Desc: 经典蓝
 */

/* harmony default export */ var classicBlue = (cjs_default()(themes_default, {
  // 连线的颜色
  lineColor: 'rgb(51, 51, 51)',
  // 连线的粗细
  lineWidth: 2,
  // 概要连线的粗细
  generalizationLineWidth: 2,
  // 概要连线的颜色
  generalizationLineColor: 'rgb(51, 51, 51)',
  // 背景颜色
  backgroundColor: 'rgb(239, 248, 250)',
  // 根节点样式
  root: {
    fillColor: 'rgb(255, 255, 255)',
    color: '#222',
    active: {
      borderColor: 'rgb(94, 199, 248)'
    }
  },
  // 二级节点样式
  second: {
    fillColor: 'rgb(255, 255, 255)',
    color: '#222',
    borderColor: 'rgb(255, 255, 255)',
    borderWidth: 1,
    fontSize: 14,
    active: {
      borderColor: 'rgb(94, 199, 248)'
    }
  },
  // 三级及以下节点样式
  node: {
    fontSize: 12,
    color: '#333',
    active: {
      borderColor: 'rgb(94, 199, 248)'
    }
  },
  // 概要节点样式
  generalization: {
    fillColor: '#fff',
    borderColor: 'rgb(51, 51, 51)',
    color: '#333',
    active: {
      borderColor: 'rgb(94, 199, 248)'
    }
  }
}));
// CONCATENATED MODULE: ../simple-mind-map/src/themes/minions.js


/** 
 * @Author: 王林 
 * @Date: 2021-04-11 15:22:18 
 * @Desc: 小黄人
 */

/* harmony default export */ var minions = (cjs_default()(themes_default, {
  // 连线的颜色
  lineColor: 'rgb(51, 51, 51)',
  lineWidth: 3,
  // 概要连线的粗细
  generalizationLineWidth: 3,
  // 概要连线的颜色
  generalizationLineColor: '#222',
  // 背景颜色
  backgroundColor: 'rgb(248, 215, 49)',
  // 根节点样式
  root: {
    fillColor: 'rgb(55, 165, 255)',
    borderColor: 'rgb(51, 51, 51)',
    borderWidth: 3,
    active: {
      borderColor: 'rgb(255, 160, 36)'
    }
  },
  // 二级节点样式
  second: {
    fillColor: 'rgb(255, 160, 36)',
    color: '#222',
    borderColor: 'rgb(51, 51, 51)',
    borderWidth: 3,
    fontSize: 14,
    active: {
      borderColor: 'rgb(55, 165, 255)'
    }
  },
  // 三级及以下节点样式
  node: {
    fontSize: 12,
    color: '#222',
    active: {
      borderColor: 'rgb(55, 165, 255)'
    }
  },
  // 概要节点样式
  generalization: {
    borderColor: '#222',
    borderWidth: 3,
    color: '#222',
    active: {
      borderColor: 'rgb(55, 165, 255)'
    }
  }
}));
// CONCATENATED MODULE: ../simple-mind-map/src/themes/pinkGrape.js


/** 
 * @Author: 王林 
 * @Date: 2021-04-11 15:22:18 
 * @Desc: 粉红葡萄
 */

/* harmony default export */ var pinkGrape = (cjs_default()(themes_default, {
  // 连线的颜色
  lineColor: 'rgb(166, 101, 106)',
  lineWidth: 3,
  // 概要连线的粗细
  generalizationLineWidth: 3,
  // 概要连线的颜色
  generalizationLineColor: '#fff',
  // 背景颜色
  backgroundColor: 'rgb(255, 208, 211)',
  // 根节点样式
  root: {
    fillColor: 'rgb(139, 109, 225)',
    borderColor: '',
    borderWidth: 0,
    active: {
      borderColor: 'rgb(243, 104, 138)',
      borderWidth: 2
    }
  },
  // 二级节点样式
  second: {
    fillColor: 'rgb(243, 104, 138)',
    color: '#fff',
    borderColor: '',
    borderWidth: 0,
    fontSize: 14,
    active: {
      borderColor: 'rgb(139, 109, 225)',
      borderWidth: 2
    }
  },
  // 三级及以下节点样式
  node: {
    fontSize: 12,
    color: '#222',
    active: {
      borderColor: 'rgb(139, 109, 225)'
    }
  },
  // 概要节点样式
  generalization: {
    fillColor: '#fff',
    borderColor: 'transparent',
    color: '#222',
    active: {
      borderColor: 'rgb(139, 109, 225)',
      borderWidth: 2
    }
  }
}));
// CONCATENATED MODULE: ../simple-mind-map/src/themes/mint.js


/** 
 * @Author: 王林 
 * @Date: 2021-04-11 15:22:18 
 * @Desc: 薄荷
 */

/* harmony default export */ var mint = (cjs_default()(themes_default, {
  // 连线的颜色
  lineColor: 'rgb(104, 204, 202)',
  lineWidth: 3,
  // 概要连线的粗细
  generalizationLineWidth: 3,
  // 概要连线的颜色
  generalizationLineColor: 'rgb(90, 206, 241)',
  // 背景颜色
  backgroundColor: 'rgb(239, 255, 255)',
  // 根节点样式
  root: {
    fillColor: 'rgb(0, 192, 184)',
    borderColor: '',
    borderWidth: 0,
    active: {
      borderColor: 'rgb(255, 160, 36)',
      borderWidth: 3
    }
  },
  // 二级节点样式
  second: {
    fillColor: '#fff',
    color: '#222',
    borderColor: 'rgb(184, 235, 233)',
    borderWidth: 2,
    fontSize: 14,
    active: {
      borderColor: 'rgb(0, 192, 184)'
    }
  },
  // 三级及以下节点样式
  node: {
    fontSize: 12,
    color: '#222',
    active: {
      borderColor: 'rgb(0, 192, 184)'
    }
  },
  // 概要节点样式
  generalization: {
    fillColor: 'rgb(90, 206, 241)',
    borderColor: 'transparent',
    color: '#fff',
    active: {
      borderColor: 'rgb(0, 192, 184)'
    }
  }
}));
// CONCATENATED MODULE: ../simple-mind-map/src/themes/gold.js


/** 
 * @Author: 王林 
 * @Date: 2021-04-11 15:22:18 
 * @Desc: 金色vip
 */

/* harmony default export */ var gold = (cjs_default()(themes_default, {
  // 连线的颜色
  lineColor: 'rgb(51, 56, 62)',
  lineWidth: 3,
  // 概要连线的粗细
  generalizationLineWidth: 3,
  // 概要连线的颜色
  generalizationLineColor: 'rgb(127, 93, 64)',
  // 背景颜色
  backgroundColor: '#fff',
  // 根节点样式
  root: {
    fillColor: 'rgb(51, 56, 62)',
    color: 'rgb(247, 208, 160)',
    borderColor: '',
    borderWidth: 0,
    active: {
      borderColor: 'rgb(247, 208, 160)',
      borderWidth: 3
    }
  },
  // 二级节点样式
  second: {
    fillColor: 'rgb(239, 209, 176)',
    color: 'rgb(81, 58, 42)',
    borderColor: '',
    borderWidth: 0,
    fontSize: 14,
    active: {
      borderColor: 'rgb(51, 56, 62)',
      borderWidth: 2
    }
  },
  // 三级及以下节点样式
  node: {
    fontSize: 12,
    color: '#222',
    active: {
      borderColor: 'rgb(0, 192, 184)'
    }
  },
  // 概要节点样式
  generalization: {
    fillColor: 'rgb(127, 93, 64)',
    borderColor: 'transparent',
    color: 'rgb(255, 214, 175)',
    active: {
      borderColor: 'rgb(51, 56, 62)'
    }
  }
}));
// CONCATENATED MODULE: ../simple-mind-map/src/themes/vitalityOrange.js


/** 
 * @Author: 王林 
 * @Date: 2021-04-11 15:22:18 
 * @Desc: 活力橙
 */

/* harmony default export */ var vitalityOrange = (cjs_default()(themes_default, {
  // 连线的颜色
  lineColor: 'rgb(254, 146, 0)',
  lineWidth: 3,
  // 概要连线的粗细
  generalizationLineWidth: 3,
  // 概要连线的颜色
  generalizationLineColor: 'rgb(255, 222, 69)',
  // 背景颜色
  backgroundColor: 'rgb(255, 246, 243)',
  // 根节点样式
  root: {
    fillColor: 'rgb(255, 112, 52)',
    color: '#fff',
    borderColor: '',
    borderWidth: 0,
    active: {
      borderColor: 'rgb(51, 51, 51)',
      borderWidth: 3
    }
  },
  // 二级节点样式
  second: {
    fillColor: '#fff',
    color: 'rgb(51, 51, 51)',
    borderColor: '',
    borderWidth: 0,
    fontSize: 14,
    active: {
      borderColor: 'rgb(255, 112, 52)',
      borderWidth: 2
    }
  },
  // 三级及以下节点样式
  node: {
    fontSize: 12,
    color: '#222',
    active: {
      borderColor: 'rgb(255, 112, 52)'
    }
  },
  // 概要节点样式
  generalization: {
    fillColor: 'rgb(255, 222, 69)',
    borderColor: 'transparent',
    color: 'rgb(51, 51, 51)',
    active: {
      borderColor: 'rgb(255, 112, 52)'
    }
  }
}));
// CONCATENATED MODULE: ../simple-mind-map/src/themes/greenLeaf.js


/** 
 * @Author: 王林 
 * @Date: 2021-04-11 15:22:18 
 * @Desc: 绿叶
 */

/* harmony default export */ var greenLeaf = (cjs_default()(themes_default, {
  // 连线的颜色
  lineColor: 'rgb(40, 193, 84)',
  lineWidth: 3,
  // 概要连线的粗细
  generalizationLineWidth: 3,
  // 概要连线的颜色
  generalizationLineColor: 'rgb(251, 158, 0)',
  // 背景颜色
  backgroundColor: 'rgb(238, 255, 243)',
  // 根节点样式
  root: {
    fillColor: 'rgb(25, 193, 73)',
    color: '#fff',
    borderColor: '',
    borderWidth: 0,
    active: {
      borderColor: '#222',
      borderWidth: 3
    }
  },
  // 二级节点样式
  second: {
    fillColor: '#fff',
    color: 'rgb(69, 149, 96)',
    borderColor: '',
    borderWidth: 0,
    fontSize: 14,
    active: {
      borderColor: 'rgb(25, 193, 73)',
      borderWidth: 2
    }
  },
  // 三级及以下节点样式
  node: {
    fontSize: 12,
    color: '#222',
    active: {
      borderColor: 'rgb(25, 193, 73)'
    }
  },
  // 概要节点样式
  generalization: {
    fillColor: '#fff',
    borderColor: 'rgb(251, 158, 0)',
    borderWidth: 2,
    color: 'rgb(51, 51, 51)',
    active: {
      borderColor: 'rgb(25, 193, 73)'
    }
  }
}));
// CONCATENATED MODULE: ../simple-mind-map/src/themes/dark2.js


/** 
 * @Author: 王林 
 * @Date: 2021-04-11 15:22:18 
 * @Desc: 暗色2
 */

/* harmony default export */ var dark2 = (cjs_default()(themes_default, {
  // 连线的颜色
  lineColor: 'rgb(75, 81, 78)',
  lineWidth: 3,
  // 概要连线的粗细
  generalizationLineWidth: 3,
  // 概要连线的颜色
  generalizationLineColor: 'rgb(255, 119, 34)',
  // 背景颜色
  backgroundColor: 'rgb(27, 31, 34)',
  // 根节点样式
  root: {
    fillColor: 'rgb(36, 179, 96)',
    color: '#fff',
    borderColor: '',
    borderWidth: 0,
    active: {
      borderColor: 'rgb(254, 199, 13)',
      borderWidth: 3
    }
  },
  // 二级节点样式
  second: {
    fillColor: 'rgb(254, 199, 13)',
    color: 'rgb(0, 0, 0)',
    borderColor: '',
    borderWidth: 0,
    fontSize: 14,
    active: {
      borderColor: 'rgb(36, 179, 96)',
      borderWidth: 2
    }
  },
  // 三级及以下节点样式
  node: {
    fontSize: 12,
    color: 'rgb(204, 204, 204)',
    active: {
      borderColor: 'rgb(254, 199, 13)'
    }
  },
  // 概要节点样式
  generalization: {
    fillColor: 'transparent',
    borderColor: 'rgb(255, 119, 34)',
    borderWidth: 2,
    color: 'rgb(204, 204, 204)',
    active: {
      borderColor: 'rgb(254, 199, 13)'
    }
  }
}));
// CONCATENATED MODULE: ../simple-mind-map/src/themes/skyGreen.js


/** 
 * @Author: 王林 
 * @Date: 2021-04-11 15:22:18 
 * @Desc: 天清绿
 */

/* harmony default export */ var skyGreen = (cjs_default()(themes_default, {
  // 连线的颜色
  lineColor: '#fff',
  lineWidth: 3,
  // 概要连线的粗细
  generalizationLineWidth: 3,
  // 概要连线的颜色
  generalizationLineColor: '#fff',
  // 背景颜色
  backgroundColor: 'rgb(80, 156, 170)',
  // 根节点样式
  root: {
    fillColor: '#fff',
    borderColor: '',
    borderWidth: 0,
    color: 'rgb(65, 89, 158)',
    active: {
      borderColor: 'rgb(251, 227, 188)',
      borderWidth: 3
    }
  },
  // 二级节点样式
  second: {
    fillColor: 'rgb(251, 227, 188)',
    color: 'rgb(65, 89, 158)',
    borderColor: '',
    borderWidth: 0,
    fontSize: 14,
    active: {
      borderColor: '#fff',
      borderWidth: 2
    }
  },
  // 三级及以下节点样式
  node: {
    fontSize: 12,
    color: 'rgb(65, 89, 158)',
    active: {
      borderColor: 'rgb(251, 227, 188)'
    }
  },
  // 概要节点样式
  generalization: {
    fillColor: '#fff',
    borderColor: 'transparent',
    color: 'rgb(65, 89, 158)',
    active: {
      borderColor: 'rgb(251, 227, 188)'
    }
  }
}));
// CONCATENATED MODULE: ../simple-mind-map/src/themes/index.js






















/* harmony default export */ var themes = ({
  default: themes_default,
  freshGreen: freshGreen,
  blueSky: blueSky,
  brainImpairedPink: brainImpairedPink,
  romanticPurple: romanticPurple,
  freshRed: freshRed,
  earthYellow: earthYellow,
  classic: classic,
  classic2: classic2,
  classic3: classic3,
  classic4: classic4,
  dark: dark,
  classicGreen: classicGreen,
  classicBlue: classicBlue,
  minions: minions,
  pinkGrape: pinkGrape,
  mint: mint,
  gold: gold,
  vitalityOrange: vitalityOrange,
  greenLeaf: greenLeaf,
  dark2: dark2,
  skyGreen: skyGreen
});
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/typeof.js






function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}
// CONCATENATED MODULE: ../simple-mind-map/src/utils/keyMap.js



var keyMap_map = {
  'Backspace': 8,
  'Tab': 9,
  'Enter': 13,
  'Shift': 16,
  'Control': 17,
  'Alt': 18,
  'CapsLock': 20,
  'Esc': 27,
  'Spacebar': 32,
  'PageUp': 33,
  'PageDown': 34,
  'End': 35,
  'Home': 36,
  'Insert': 45,
  'Left': 37,
  'Up': 38,
  'Right': 39,
  'Down': 40,
  'Del': 46,
  'NumLock': 144,
  'Cmd': 91,
  'CmdFF': 224,
  'F1': 112,
  'F2': 113,
  'F3': 114,
  'F4': 115,
  'F5': 116,
  'F6': 117,
  'F7': 118,
  'F8': 119,
  'F9': 120,
  'F10': 121,
  'F11': 122,
  'F12': 123,
  '`': 192,
  '=': 187,
  '-': 189,
  '/': 191,
  '.': 190
}; // 数字

for (var keyMap_i = 0; keyMap_i <= 9; keyMap_i++) {
  keyMap_map[keyMap_i] = keyMap_i + 48;
} // 字母


'abcdefghijklmnopqrstuvwxyz'.split('').forEach(function (n, index) {
  keyMap_map[n] = index + 65;
});
var keyMap = keyMap_map;
var keyMap_isKey = function isKey(e, key) {
  var code = _typeof(e) === 'object' ? e.keyCode : e;
  return keyMap_map[key] === code;
};
// CONCATENATED MODULE: ../simple-mind-map/src/KeyCommand.js











/** 
 * @Author: 王林 
 * @Date: 2021-04-24 15:20:46 
 * @Desc: 快捷按键、命令处理类 
 */

var KeyCommand_KeyCommand = /*#__PURE__*/function () {
  /** 
   * @Author: 王林 
   * @Date: 2021-04-24 15:21:32 
   * @Desc: 构造函数 
   */
  function KeyCommand(opt) {
    _classCallCheck(this, KeyCommand);

    this.opt = opt;
    this.mindMap = opt.mindMap;
    this.shortcutMap = {//Enter: [fn]
    };
    this.bindEvent();
  }
  /** 
   * @Author: 王林 
   * @Date: 2021-04-24 15:23:22 
   * @Desc: 绑定事件 
   */


  _createClass(KeyCommand, [{
    key: "bindEvent",
    value: function bindEvent() {
      var _this = this;

      window.addEventListener('keydown', function (e) {
        Object.keys(_this.shortcutMap).forEach(function (key) {
          if (_this.checkKey(e, key)) {
            e.stopPropagation();
            e.preventDefault();

            _this.shortcutMap[key].forEach(function (fn) {
              fn();
            });
          }
        });
      });
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-04-24 19:24:53 
     * @Desc: 检查键值是否符合 
     */

  }, {
    key: "checkKey",
    value: function checkKey(e, key) {
      var o = this.getOriginEventCodeArr(e);
      var k = this.getKeyCodeArr(key);

      if (o.length !== k.length) {
        return false;
      }

      var _loop = function _loop(i) {
        var index = k.findIndex(function (item) {
          return item === o[i];
        });

        if (index === -1) {
          return {
            v: false
          };
        } else {
          k.splice(index, 1);
        }
      };

      for (var i = 0; i < o.length; i++) {
        var _ret = _loop(i);

        if (_typeof(_ret) === "object") return _ret.v;
      }

      return true;
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-04-24 19:15:19 
     * @Desc: 获取事件对象里的键值数组 
     */

  }, {
    key: "getOriginEventCodeArr",
    value: function getOriginEventCodeArr(e) {
      var arr = [];

      if (e.ctrlKey || e.metaKey) {
        arr.push(keyMap['Control']);
      }

      if (e.altKey) {
        arr.push(keyMap['Alt']);
      }

      if (e.shiftKey) {
        arr.push(keyMap['Shift']);
      }

      if (!arr.includes(e.keyCode)) {
        arr.push(e.keyCode);
      }

      return arr;
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-04-24 19:40:11 
     * @Desc: 获取快捷键对应的键值数组 
     */

  }, {
    key: "getKeyCodeArr",
    value: function getKeyCodeArr(key) {
      var keyArr = key.split(/\s*\+\s*/);
      var arr = [];
      keyArr.forEach(function (item) {
        arr.push(keyMap[item]);
      });
      return arr;
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-04-24 15:23:00 
     * @Desc: 添加快捷键命令 
     * Enter
     * Tab | Insert
     * Shift + a
     */

  }, {
    key: "addShortcut",
    value: function addShortcut(key, fn) {
      var _this2 = this;

      key.split(/\s*\|\s*/).forEach(function (item) {
        if (_this2.shortcutMap[item]) {
          _this2.shortcutMap[item].push(fn);
        } else {
          _this2.shortcutMap[item] = [fn];
        }
      });
    }
    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-07-27 14:06:16 
     * @Desc: 移除快捷键命令 
     */

  }, {
    key: "removeShortcut",
    value: function removeShortcut(key, fn) {
      var _this3 = this;

      key.split(/\s*\|\s*/).forEach(function (item) {
        if (_this3.shortcutMap[item]) {
          if (fn) {
            var index = _this3.shortcutMap[item].findIndex(function (f) {
              return f === fn;
            });

            if (index !== -1) {
              _this3.shortcutMap[item].splice(index, 1);
            }
          } else {
            _this3.shortcutMap[item] = [];
            delete _this3.shortcutMap[item];
          }
        }
      });
    }
  }]);

  return KeyCommand;
}();


// CONCATENATED MODULE: ../simple-mind-map/src/Command.js






/** 
 * @Author: 王林 
 * @Date: 2021-05-04 13:10:06 
 * @Desc: 命令类 
 */

var Command_Command = /*#__PURE__*/function () {
  /** 
   * @Author: 王林 
   * @Date: 2021-05-04 13:10:24 
   * @Desc: 构造函数 
   */
  function Command() {
    var opt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Command);

    this.opt = opt;
    this.mindMap = opt.mindMap;
    this.commands = {};
    this.history = [];
    this.activeHistoryIndex = 0; // 注册快捷键

    this.registerShortcutKeys();
  }
  /** 
   * @Author: 王林 
   * @Date: 2021-08-03 23:06:55 
   * @Desc: 清空历史数据 
   */


  _createClass(Command, [{
    key: "clearHistory",
    value: function clearHistory() {
      this.history = [];
      this.activeHistoryIndex = 0;
      this.mindMap.emit('back_forward', 0, 0);
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-08-02 23:23:19 
     * @Desc: 注册快捷键 
     */

  }, {
    key: "registerShortcutKeys",
    value: function registerShortcutKeys() {
      var _this = this;

      this.mindMap.keyCommand.addShortcut('Control+z', function () {
        _this.mindMap.execCommand('BACK');
      });
      this.mindMap.keyCommand.addShortcut('Control+y', function () {
        _this.mindMap.execCommand('FORWARD');
      });
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-05-04 13:12:30 
     * @Desc: 执行命令 
     */

  }, {
    key: "exec",
    value: function exec(name) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      if (this.commands[name]) {
        this.commands[name].forEach(function (fn) {
          fn.apply(void 0, args);
        });

        if (name === 'BACK' || name === 'FORWARD') {
          return;
        }

        this.addHistory();
      }
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-05-04 13:13:01 
     * @Desc: 添加命令 
     */

  }, {
    key: "add",
    value: function add(name, fn) {
      if (this.commands[name]) {
        this.commands[name].push(fn);
      } else {
        this.commands[name] = [fn];
      }
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-07-15 23:02:41 
     * @Desc: 移除命令 
     */

  }, {
    key: "remove",
    value: function remove(name, fn) {
      if (!this.commands[name]) {
        return;
      }

      if (!fn) {
        this.commands[name] = [];
        delete this.commands[name];
      } else {
        var index = this.commands[name].find(function (item) {
          return item === fn;
        });

        if (index !== -1) {
          this.commands[name].splice(index, 1);
        }
      }
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-05-04 14:35:43 
     * @Desc: 添加回退数据 
     */

  }, {
    key: "addHistory",
    value: function addHistory() {
      var data = this.getCopyData();
      this.history.push(simpleDeepClone(data));
      this.activeHistoryIndex = this.history.length - 1;
      this.mindMap.emit('data_change', data);
      this.mindMap.emit('back_forward', this.activeHistoryIndex, this.history.length);
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-07-11 22:34:53 
     * @Desc: 回退 
     */

  }, {
    key: "back",
    value: function back() {
      var step = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

      if (this.activeHistoryIndex - step >= 0) {
        this.activeHistoryIndex -= step;
        this.mindMap.emit('back_forward', this.activeHistoryIndex, this.history.length);
        return simpleDeepClone(this.history[this.activeHistoryIndex]);
      }
    }
    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-07-12 10:45:31 
     * @Desc: 前进 
     */

  }, {
    key: "forward",
    value: function forward() {
      var step = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      var len = this.history.length;

      if (this.activeHistoryIndex + step <= len - 1) {
        this.activeHistoryIndex += step;
        this.mindMap.emit('back_forward', this.activeHistoryIndex);
        return simpleDeepClone(this.history[this.activeHistoryIndex]);
      }
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-05-04 15:02:58 
     * @Desc: 获取渲染树数据副本 
     */

  }, {
    key: "getCopyData",
    value: function getCopyData() {
      return copyRenderTree({}, this.mindMap.renderer.renderTree);
    }
  }]);

  return Command;
}();

/* harmony default export */ var src_Command = (Command_Command);
// CONCATENATED MODULE: ../simple-mind-map/src/BatchExecution.js






/** 
 * @Author: 王林 
 * @Date: 2021-06-27 13:16:23 
 * @Desc: 在下一个事件循环里执行任务 
 */
var nextTick = function nextTick(fn, ctx) {
  var pending = false;
  var timerFunc = null;

  var handle = function handle() {
    pending = false;
    ctx ? fn.call(ctx) : fn();
  }; // 支持MutationObserver接口的话使用MutationObserver


  if (typeof MutationObserver !== 'undefined') {
    var counter = 1;
    var observer = new MutationObserver(handle);
    var textNode = document.createTextNode(counter);
    observer.observe(textNode, {
      characterData: true // 设为 true 表示监视指定目标节点或子节点树中节点所包含的字符数据的变化

    });

    timerFunc = function timerFunc() {
      counter = (counter + 1) % 2; // counter会在0和1两者循环变化

      textNode.data = counter; // 节点变化会触发回调handle，
    };
  } else {
    // 否则使用定时器
    timerFunc = setTimeout;
  }

  return function (cb, ctx) {
    if (pending) return;
    pending = true;
    timerFunc(handle, 0);
  };
};
/** 
 * @Author: 王林 
 * @Date: 2021-06-26 22:40:52 
 * @Desc: 批量执行 
 */


var BatchExecution_BatchExecution = /*#__PURE__*/function () {
  /** 
   * @Author: 王林 
   * @Date: 2021-06-26 22:41:41 
   * @Desc: 构造函数 
   */
  function BatchExecution() {
    _classCallCheck(this, BatchExecution);

    this.has = {};
    this.queue = [];
    this.nextTick = nextTick(this.flush, this);
  }
  /** 
   * @Author: 王林 
   * @Date: 2021-06-27 12:54:04 
   * @Desc: 添加任务 
   */


  _createClass(BatchExecution, [{
    key: "push",
    value: function push(name, fn) {
      if (this.has[name]) {
        return;
      }

      this.has[name] = true;
      this.queue.push({
        name: name,
        fn: fn
      });
      this.nextTick();
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-06-27 13:09:24 
     * @Desc:  执行队列
     */

  }, {
    key: "flush",
    value: function flush() {
      var _this = this;

      var fns = this.queue.slice(0);
      this.queue = [];
      fns.forEach(function (_ref) {
        var name = _ref.name,
            fn = _ref.fn;
        _this.has[name] = false;
        fn();
      });
    }
  }]);

  return BatchExecution;
}();

/* harmony default export */ var src_BatchExecution = (BatchExecution_BatchExecution);
// EXTERNAL MODULE: E:/node_modules/core-js/modules/es.array.iterator.js
var es_array_iterator = __webpack_require__("7f72");

// EXTERNAL MODULE: E:/node_modules/core-js/modules/es.string.iterator.js
var modules_es_string_iterator = __webpack_require__("a7da");

// EXTERNAL MODULE: E:/node_modules/core-js/modules/web.dom-collections.iterator.js
var modules_web_dom_collections_iterator = __webpack_require__("4e83");

// EXTERNAL MODULE: E:/node_modules/core-js/modules/web.url.js
var web_url = __webpack_require__("f188");

// CONCATENATED MODULE: ../simple-mind-map/src/Export.js














var URL = window.URL || window.webkitURL || window;
/** 
 * @Author: 王林 
 * @Date: 2021-07-01 22:05:16 
 * @Desc: 导出类 
 */

var Export_Export = /*#__PURE__*/function () {
  /** 
   * @Author: 王林 
   * @Date: 2021-07-01 22:05:42 
   * @Desc: 构造函数 
   */
  function Export(opt) {
    _classCallCheck(this, Export);

    this.mindMap = opt.mindMap;
    this.exportPadding = this.mindMap.opt.exportPadding;
  }
  /** 
   * @Author: 王林 
   * @Date: 2021-07-02 07:44:06 
   * @Desc: 导出 
   */


  _createClass(Export, [{
    key: "export",
    value: function () {
      var _export2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(type) {
        var isDownload,
            name,
            result,
            _args = arguments;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                isDownload = _args.length > 1 && _args[1] !== undefined ? _args[1] : true;
                name = _args.length > 2 && _args[2] !== undefined ? _args[2] : '思维导图';

                if (!this[type]) {
                  _context.next = 10;
                  break;
                }

                _context.next = 5;
                return this[type]();

              case 5:
                result = _context.sent;

                if (isDownload) {
                  downloadFile(result, name + '.' + type);
                }

                return _context.abrupt("return", result);

              case 10:
                return _context.abrupt("return", null);

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function _export(_x) {
        return _export2.apply(this, arguments);
      }

      return _export;
    }()
    /** 
     * @Author: 王林 
     * @Date: 2021-07-04 14:57:40 
     * @Desc: 获取svg数据 
     */

  }, {
    key: "getSvgData",
    value: function () {
      var _getSvgData = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var svg, draw, origWidth, origHeight, origTransform, elRect, rect, clone, imageList, task;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                svg = this.mindMap.svg;
                draw = this.mindMap.draw; // 保存原始信息

                origWidth = svg.width();
                origHeight = svg.height();
                origTransform = draw.transform();
                elRect = this.mindMap.el.getBoundingClientRect(); // 去除放大缩小的变换效果

                draw.scale(1 / origTransform.scaleX, 1 / origTransform.scaleY); // 获取变换后的位置尺寸信息，其实是getBoundingClientRect方法的包装方法

                rect = draw.rbox(); // 将svg设置为实际内容的宽高

                svg.size(rect.width, rect.height); // 把实际内容变换

                draw.translate(-rect.x + elRect.left, -rect.y + elRect.top); // 克隆一份数据

                clone = svg.clone(); // 恢复原先的大小和变换信息

                svg.size(origWidth, origHeight);
                draw.transform(origTransform); // 把图片的url转换成data:url类型，否则导出会丢失图片

                imageList = clone.find('image');
                task = imageList.map( /*#__PURE__*/function () {
                  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(item) {
                    var imgUlr, imgData;
                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                      while (1) {
                        switch (_context2.prev = _context2.next) {
                          case 0:
                            imgUlr = item.attr('href') || item.attr('xlink:href');
                            _context2.next = 3;
                            return imgToDataUrl(imgUlr);

                          case 3:
                            imgData = _context2.sent;
                            item.attr('href', imgData);

                          case 5:
                          case "end":
                            return _context2.stop();
                        }
                      }
                    }, _callee2);
                  }));

                  return function (_x2) {
                    return _ref.apply(this, arguments);
                  };
                }());
                _context3.next = 17;
                return Promise.all(task);

              case 17:
                return _context3.abrupt("return", {
                  node: clone,
                  str: clone.svg()
                });

              case 18:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getSvgData() {
        return _getSvgData.apply(this, arguments);
      }

      return getSvgData;
    }()
    /** 
     * @Author: 王林 
     * @Date: 2021-07-04 15:25:19 
     * @Desc:  svg转png
     */

  }, {
    key: "svgToPng",
    value: function svgToPng(svgSrc) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        var img = new Image(); // 跨域图片需要添加这个属性，否则画布被污染了无法导出图片

        img.setAttribute('crossOrigin', 'anonymous');
        img.onload = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
          var canvas, ctx;
          return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  _context4.prev = 0;
                  canvas = document.createElement('canvas');
                  canvas.width = img.width + _this.exportPadding * 2;
                  canvas.height = img.height + _this.exportPadding * 2;
                  ctx = canvas.getContext('2d'); // 绘制背景

                  _context4.next = 7;
                  return _this.drawBackgroundToCanvas(ctx, canvas.width, canvas.height);

                case 7:
                  // 图片绘制到canvas里
                  ctx.drawImage(img, 0, 0, img.width, img.height, _this.exportPadding, _this.exportPadding, img.width, img.height);
                  resolve(canvas.toDataURL());
                  _context4.next = 14;
                  break;

                case 11:
                  _context4.prev = 11;
                  _context4.t0 = _context4["catch"](0);
                  reject(_context4.t0);

                case 14:
                case "end":
                  return _context4.stop();
              }
            }
          }, _callee4, null, [[0, 11]]);
        }));

        img.onerror = function (e) {
          reject(e);
        };

        img.src = svgSrc;
      });
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-07-04 15:32:07 
     * @Desc: 在canvas上绘制思维导图背景
     */

  }, {
    key: "drawBackgroundToCanvas",
    value: function drawBackgroundToCanvas(ctx, width, height) {
      var _this2 = this;

      return new Promise(function (resolve, rejct) {
        var _this2$mindMap$themeC = _this2.mindMap.themeConfig,
            _this2$mindMap$themeC2 = _this2$mindMap$themeC.backgroundColor,
            backgroundColor = _this2$mindMap$themeC2 === void 0 ? '#fff' : _this2$mindMap$themeC2,
            backgroundImage = _this2$mindMap$themeC.backgroundImage,
            _this2$mindMap$themeC3 = _this2$mindMap$themeC.backgroundRepeat,
            backgroundRepeat = _this2$mindMap$themeC3 === void 0 ? "repeat" : _this2$mindMap$themeC3; // 背景颜色

        ctx.save();
        ctx.rect(0, 0, width, height);
        ctx.fillStyle = backgroundColor;
        ctx.fill();
        ctx.restore(); // 背景图片

        if (backgroundImage && backgroundImage !== 'none') {
          ctx.save();
          var img = new Image();
          img.src = backgroundImage;

          img.onload = function () {
            var pat = ctx.createPattern(img, backgroundRepeat);
            ctx.rect(0, 0, width, height);
            ctx.fillStyle = pat;
            ctx.fill();
            ctx.restore();
            resolve();
          };

          img.onerror = function (e) {
            rejct(e);
          };
        } else {
          resolve();
        }
      });
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-07-01 22:09:51 
     * @Desc: 导出为png 
     * 方法1.把svg的图片都转化成data:url格式，再转换
     * 方法2.把svg的图片提取出来再挨个绘制到canvas里，最后一起转换
     */

  }, {
    key: "png",
    value: function () {
      var _png = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        var _yield$this$getSvgDat, str, blob, svgUrl, imgDataUrl;

        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this.getSvgData();

              case 2:
                _yield$this$getSvgDat = _context5.sent;
                str = _yield$this$getSvgDat.str;
                // 转换成blob数据
                blob = new Blob([str], {
                  type: 'image/svg+xml'
                }); // 转换成data:url数据

                svgUrl = URL.createObjectURL(blob); // 绘制到canvas上

                _context5.next = 8;
                return this.svgToPng(svgUrl);

              case 8:
                imgDataUrl = _context5.sent;
                URL.revokeObjectURL(svgUrl);
                return _context5.abrupt("return", imgDataUrl);

              case 11:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function png() {
        return _png.apply(this, arguments);
      }

      return png;
    }()
    /** 
     * @Author: 王林 
     * @Date: 2021-07-04 15:32:07 
     * @Desc: 在svg上绘制思维导图背景
     */

  }, {
    key: "drawBackgroundToSvg",
    value: function drawBackgroundToSvg(svg) {
      var _this3 = this;

      return new Promise( /*#__PURE__*/function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(resolve, rejct) {
          var _this3$mindMap$themeC, _this3$mindMap$themeC2, backgroundColor, backgroundImage, _this3$mindMap$themeC3, backgroundRepeat, imgDataUrl;

          return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
              switch (_context6.prev = _context6.next) {
                case 0:
                  _this3$mindMap$themeC = _this3.mindMap.themeConfig, _this3$mindMap$themeC2 = _this3$mindMap$themeC.backgroundColor, backgroundColor = _this3$mindMap$themeC2 === void 0 ? '#fff' : _this3$mindMap$themeC2, backgroundImage = _this3$mindMap$themeC.backgroundImage, _this3$mindMap$themeC3 = _this3$mindMap$themeC.backgroundRepeat, backgroundRepeat = _this3$mindMap$themeC3 === void 0 ? "repeat" : _this3$mindMap$themeC3; // 背景颜色

                  svg.css('background-color', backgroundColor); // 背景图片

                  if (!(backgroundImage && backgroundImage !== 'none')) {
                    _context6.next = 11;
                    break;
                  }

                  _context6.next = 5;
                  return imgToDataUrl(backgroundImage);

                case 5:
                  imgDataUrl = _context6.sent;
                  svg.css('background-image', "url(".concat(imgDataUrl, ")"));
                  svg.css('background-repeat', backgroundRepeat);
                  resolve();
                  _context6.next = 12;
                  break;

                case 11:
                  resolve();

                case 12:
                case "end":
                  return _context6.stop();
              }
            }
          }, _callee6);
        }));

        return function (_x3, _x4) {
          return _ref3.apply(this, arguments);
        };
      }());
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-07-04 14:54:07 
     * @Desc: 导出为svg 
     */

  }, {
    key: "svg",
    value: function () {
      var _svg = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
        var _yield$this$getSvgDat2, node, str, blob;

        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return this.getSvgData();

              case 2:
                _yield$this$getSvgDat2 = _context7.sent;
                node = _yield$this$getSvgDat2.node;
                _context7.next = 6;
                return this.drawBackgroundToSvg(node);

              case 6:
                str = node.svg(); // 转换成blob数据

                blob = new Blob([str], {
                  type: 'image/svg+xml'
                });
                return _context7.abrupt("return", URL.createObjectURL(blob));

              case 9:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function svg() {
        return _svg.apply(this, arguments);
      }

      return svg;
    }()
    /** 
     * @Author: 王林 
     * @Date: 2021-08-03 22:19:17 
     * @Desc: 导出为json 
     */

  }, {
    key: "json",
    value: function json() {
      var data = this.mindMap.command.getCopyData();
      var str = JSON.stringify(data);
      var blob = new Blob([str]);
      return URL.createObjectURL(blob);
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-08-03 22:24:24 
     * @Desc: 专有文件，其实就是json文件 
     */

  }, {
    key: "smm",
    value: function smm() {
      return this.json();
    }
  }]);

  return Export;
}();

/* harmony default export */ var src_Export = (Export_Export);
// CONCATENATED MODULE: ../simple-mind-map/src/Select.js




/** 
 * @Author: 王林 
 * @Date: 2021-07-10 22:34:51 
 * @Desc: 选择节点类 
 */

var Select_Select = /*#__PURE__*/function () {
  /** 
   * @Author: 王林 
   * @Date: 2021-07-10 22:35:16 
   * @Desc: 构造函数 
   */
  function Select(_ref) {
    var mindMap = _ref.mindMap;

    _classCallCheck(this, Select);

    this.mindMap = mindMap;
    this.rect = null;
    this.isMousedown = false;
    this.mouseDownX = 0;
    this.mouseDownY = 0;
    this.mouseMoveX = 0;
    this.mouseMoveY = 0;
    this.bindEvent();
  }
  /** 
   * @Author: 王林 
   * @Date: 2021-07-10 22:36:36 
   * @Desc: 绑定事件 
   */


  _createClass(Select, [{
    key: "bindEvent",
    value: function bindEvent() {
      var _this = this;

      this.checkInNodes = throttle(this.checkInNodes, 500, this);
      this.mindMap.on('mousedown', function (e) {
        if (_this.mindMap.opt.readonly) {
          return;
        }

        if (e.which !== 3) {
          return;
        }

        _this.isMousedown = true;

        var _this$mindMap$toPos = _this.mindMap.toPos(e.clientX, e.clientY),
            x = _this$mindMap$toPos.x,
            y = _this$mindMap$toPos.y;

        _this.mouseDownX = x;
        _this.mouseDownY = y;

        _this.createRect(x, y);
      });
      this.mindMap.on('mousemove', function (e) {
        if (_this.mindMap.opt.readonly) {
          return;
        }

        if (!_this.isMousedown) {
          return;
        }

        var _this$mindMap$toPos2 = _this.mindMap.toPos(e.clientX, e.clientY),
            x = _this$mindMap$toPos2.x,
            y = _this$mindMap$toPos2.y;

        _this.mouseMoveX = x;
        _this.mouseMoveY = y;

        if (Math.abs(x - _this.mouseDownX) <= 10 && Math.abs(y - _this.mouseDownY) <= 10) {
          return;
        }

        clearTimeout(_this.autoMoveTimer);

        _this.onMove(x, y);
      });
      this.mindMap.on('mouseup', function (e) {
        if (_this.mindMap.opt.readonly) {
          return;
        }

        if (!_this.isMousedown) {
          return;
        }

        _this.mindMap.emit('node_active', null, _this.mindMap.renderer.activeNodeList);

        clearTimeout(_this.autoMoveTimer);
        _this.isMousedown = false;
        if (_this.rect) _this.rect.remove();
        _this.rect = null;
      });
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-07-13 07:55:49 
     * @Desc: 鼠标移动事件
     */

  }, {
    key: "onMove",
    value: function onMove(x, y) {
      // 绘制矩形
      this.rect.plot([[this.mouseDownX, this.mouseDownY], [this.mouseMoveX, this.mouseDownY], [this.mouseMoveX, this.mouseMoveY], [this.mouseDownX, this.mouseMoveY]]);
      this.checkInNodes(); // 检测边缘移动

      var step = this.mindMap.opt.selectTranslateStep;
      var limit = this.mindMap.opt.selectTranslateLimit;
      var count = 0; // 左边缘

      if (x <= this.mindMap.elRect.left + limit) {
        this.mouseDownX += step;
        this.mindMap.view.translateX(step);
        count++;
      } // 右边缘


      if (x >= this.mindMap.elRect.right - limit) {
        this.mouseDownX -= step;
        this.mindMap.view.translateX(-step);
        count++;
      } // 上边缘


      if (y <= this.mindMap.elRect.top + limit) {
        this.mouseDownY += step;
        this.mindMap.view.translateY(step);
        count++;
      } // 下边缘


      if (y >= this.mindMap.elRect.bottom - limit) {
        this.mouseDownY -= step;
        this.mindMap.view.translateY(-step);
        count++;
      }

      if (count > 0) {
        this.startAutoMove(x, y);
      }
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-07-22 08:02:23 
     * @Desc: 开启自动移动 
     */

  }, {
    key: "startAutoMove",
    value: function startAutoMove(x, y) {
      var _this2 = this;

      this.autoMoveTimer = setTimeout(function () {
        _this2.onMove(x, y);
      }, 20);
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-07-11 10:19:37 
     * @Desc: 创建矩形 
     */

  }, {
    key: "createRect",
    value: function createRect(x, y) {
      this.rect = this.mindMap.svg.polygon().stroke({
        color: '#0984e3'
      }).fill({
        color: 'rgba(9,132,227,0.3)'
      }).plot([[x, y]]);
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-07-11 10:20:43 
     * @Desc: 检测在选区里的节点 
     */

  }, {
    key: "checkInNodes",
    value: function checkInNodes() {
      var _this3 = this;

      var _this$mindMap$draw$tr = this.mindMap.draw.transform(),
          scaleX = _this$mindMap$draw$tr.scaleX,
          scaleY = _this$mindMap$draw$tr.scaleY,
          translateX = _this$mindMap$draw$tr.translateX,
          translateY = _this$mindMap$draw$tr.translateY;

      var minx = Math.min(this.mouseDownX, this.mouseMoveX);
      var miny = Math.min(this.mouseDownY, this.mouseMoveY);
      var maxx = Math.max(this.mouseDownX, this.mouseMoveX);
      var maxy = Math.max(this.mouseDownY, this.mouseMoveY);
      bfsWalk(this.mindMap.renderer.root, function (node) {
        var left = node.left,
            top = node.top,
            width = node.width,
            height = node.height;
        var right = (left + width) * scaleX + translateX;
        var bottom = (top + height) * scaleY + translateY;
        left = left * scaleX + translateX;
        top = top * scaleY + translateY;

        if (left >= minx && right <= maxx && top >= miny && bottom <= maxy) {
          _this3.mindMap.batchExecution.push('activeNode' + node.uid, function () {
            if (node.nodeData.data.isActive) {
              return;
            }

            _this3.mindMap.renderer.setNodeActive(node, true);

            _this3.mindMap.renderer.addActiveNode(node);
          });
        } else if (node.nodeData.data.isActive) {
          _this3.mindMap.batchExecution.push('activeNode' + node.uid, function () {
            if (!node.nodeData.data.isActive) {
              return;
            }

            _this3.mindMap.renderer.setNodeActive(node, false);

            _this3.mindMap.renderer.removeActiveNode(node);
          });
        }
      });
    }
  }]);

  return Select;
}();

/* harmony default export */ var src_Select = (Select_Select);
// CONCATENATED MODULE: ../simple-mind-map/src/Drag.js







/** 
 * javascript comment 
 * @Author: 王林25 
 * @Date: 2021-11-23 17:38:55 
 * @Desc: 节点拖动类 
 */

var Drag_Drag = /*#__PURE__*/function (_Base) {
  _inherits(Drag, _Base);

  var _super = _createSuper(Drag);

  /** 
   * @Author: 王林 
   * @Date: 2021-07-10 22:35:16 
   * @Desc: 构造函数 
   */
  function Drag(_ref) {
    var _this;

    var mindMap = _ref.mindMap;

    _classCallCheck(this, Drag);

    _this = _super.call(this, mindMap.renderer);
    _this.mindMap = mindMap;

    _this.reset();

    _this.bindEvent();

    return _this;
  }
  /** 
   * javascript comment 
   * @Author: 王林25 
   * @Date: 2021-11-23 19:33:56 
   * @Desc: 复位 
   */


  _createClass(Drag, [{
    key: "reset",
    value: function reset() {
      // 当前拖拽节点
      this.node = null; // 当前重叠节点

      this.overlapNode = null; // 当前上一个同级节点

      this.prevNode = null; // 当前下一个同级节点

      this.nextNode = null; // 画布的变换数据

      this.drawTransform = null; // 克隆节点

      this.clone = null; // 连接线

      this.line = null; // 同级位置占位符

      this.placeholder = null; // 鼠标按下位置和节点左上角的偏移量

      this.offsetX = 0;
      this.offsetY = 0; // 克隆节点左上角的坐标

      this.cloneNodeLeft = 0;
      this.cloneNodeTop = 0; // 当前鼠标是否按下

      this.isMousedown = false; // 拖拽的鼠标位置变量

      this.mouseDownX = 0;
      this.mouseDownY = 0;
      this.mouseMoveX = 0;
      this.mouseMoveY = 0;
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-07-10 22:36:36 
     * @Desc: 绑定事件 
     */

  }, {
    key: "bindEvent",
    value: function bindEvent() {
      var _this2 = this;

      this.checkOverlapNode = throttle(this.checkOverlapNode, 300, this);
      this.mindMap.on('node_mousedown', function (node, e) {
        if (_this2.mindMap.opt.readonly || node.isGeneralization) {
          return;
        }

        if (e.which !== 1 || node.isRoot) {
          return;
        }

        e.preventDefault(); // 计算鼠标按下的位置距离节点左上角的距离

        _this2.drawTransform = _this2.mindMap.draw.transform();
        var _this2$drawTransform = _this2.drawTransform,
            scaleX = _this2$drawTransform.scaleX,
            scaleY = _this2$drawTransform.scaleY,
            translateX = _this2$drawTransform.translateX,
            translateY = _this2$drawTransform.translateY;
        _this2.offsetX = e.clientX - (node.left * scaleX + translateX);
        _this2.offsetY = e.clientY - (node.top * scaleY + translateY); // 

        _this2.node = node;
        _this2.isMousedown = true;

        var _this2$mindMap$toPos = _this2.mindMap.toPos(e.clientX, e.clientY),
            x = _this2$mindMap$toPos.x,
            y = _this2$mindMap$toPos.y;

        _this2.mouseDownX = x;
        _this2.mouseDownY = y;
      });
      this.mindMap.on('mousemove', function (e) {
        if (_this2.mindMap.opt.readonly) {
          return;
        }

        if (!_this2.isMousedown) {
          return;
        }

        e.preventDefault();

        var _this2$mindMap$toPos2 = _this2.mindMap.toPos(e.clientX, e.clientY),
            x = _this2$mindMap$toPos2.x,
            y = _this2$mindMap$toPos2.y;

        _this2.mouseMoveX = x;
        _this2.mouseMoveY = y;

        if (Math.abs(x - _this2.mouseDownX) <= 10 && Math.abs(y - _this2.mouseDownY) <= 10 && !_this2.node.isDrag) {
          return;
        }

        _this2.mindMap.renderer.clearAllActive();

        _this2.onMove(x, y);
      });
      this.onMouseup = this.onMouseup.bind(this);
      this.mindMap.on('node_mouseup', this.onMouseup);
      this.mindMap.on('mouseup', this.onMouseup);
    }
    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-11-23 19:38:02 
     * @Desc: 鼠标松开事件 
     */

  }, {
    key: "onMouseup",
    value: function onMouseup(e) {
      if (!this.isMousedown) {
        return;
      }

      this.isMousedown = false;
      var _nodeIsDrag = this.node.isDrag;
      this.node.isDrag = false;
      this.node.show();
      this.removeCloneNode(); // 存在重叠子节点，则移动作为其子节点

      if (this.overlapNode) {
        this.mindMap.renderer.setNodeActive(this.overlapNode, false);
        this.mindMap.execCommand('MOVE_NODE_TO', this.node, this.overlapNode);
      } else if (this.prevNode) {
        // 存在前一个相邻节点，作为其下一个兄弟节点
        this.mindMap.renderer.setNodeActive(this.prevNode, false);
        this.mindMap.execCommand('INSERT_AFTER', this.node, this.prevNode);
      } else if (this.nextNode) {
        // 存在下一个相邻节点，作为其前一个兄弟节点
        this.mindMap.renderer.setNodeActive(this.nextNode, false);
        this.mindMap.execCommand('INSERT_BEFORE', this.node, this.nextNode);
      } else if (_nodeIsDrag) {
        // 自定义位置
        var _this$mindMap$toPos = this.mindMap.toPos(e.clientX - this.offsetX, e.clientY - this.offsetY),
            x = _this$mindMap$toPos.x,
            y = _this$mindMap$toPos.y;

        var _this$drawTransform = this.drawTransform,
            scaleX = _this$drawTransform.scaleX,
            scaleY = _this$drawTransform.scaleY,
            translateX = _this$drawTransform.translateX,
            translateY = _this$drawTransform.translateY;
        x = (x - translateX) / scaleX;
        y = (y - translateY) / scaleY;
        this.node.left = x;
        this.node.top = y;
        this.node.customLeft = x;
        this.node.customTop = y;
        this.mindMap.execCommand('SET_NODE_CUSTOM_POSITION', this.node, x, y);
        this.mindMap.render();
      }

      this.reset();
    }
    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-11-23 19:34:53 
     * @Desc: 创建克隆节点 
     */

  }, {
    key: "createCloneNode",
    value: function createCloneNode() {
      if (!this.clone) {
        // 节点
        this.clone = this.node.group.clone();
        this.clone.opacity(0.5);
        this.clone.css('z-index', 99999);
        this.node.isDrag = true;
        this.node.hide(); // 连接线

        this.line = this.draw.path();
        this.line.opacity(0.5);
        this.node.style.line(this.line); // 同级位置占位符

        this.placeholder = this.draw.rect().fill({
          color: this.node.style.merge('lineColor', true)
        });
        this.mindMap.draw.add(this.clone);
      }
    }
    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-11-23 19:35:16 
     * @Desc: 移除克隆节点 
     */

  }, {
    key: "removeCloneNode",
    value: function removeCloneNode() {
      if (!this.clone) {
        return;
      }

      this.clone.remove();
      this.line.remove();
      this.placeholder.remove();
    }
    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-11-23 18:53:47 
     * @Desc: 拖动中 
     */

  }, {
    key: "onMove",
    value: function onMove(x, y) {
      if (!this.isMousedown) {
        return;
      }

      this.createCloneNode();
      var _this$drawTransform2 = this.drawTransform,
          scaleX = _this$drawTransform2.scaleX,
          scaleY = _this$drawTransform2.scaleY,
          translateX = _this$drawTransform2.translateX,
          translateY = _this$drawTransform2.translateY;
      this.cloneNodeLeft = x - this.offsetX;
      this.cloneNodeTop = y - this.offsetY;
      x = (this.cloneNodeLeft - translateX) / scaleX;
      y = (this.cloneNodeTop - translateY) / scaleY;
      var t = this.clone.transform();
      this.clone.translate(x - t.translateX, y - t.translateY); // 连接线

      var parent = this.node.parent;
      this.line.plot(this.quadraticCurvePath(parent.left + parent.width / 2, parent.top + parent.height / 2, x + this.node.width / 2, y + this.node.height / 2));
      this.checkOverlapNode();
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-07-11 10:20:43 
     * @Desc: 检测重叠节点 
     */

  }, {
    key: "checkOverlapNode",
    value: function checkOverlapNode() {
      var _this3 = this;

      if (!this.drawTransform) {
        return;
      }

      var _this$drawTransform3 = this.drawTransform,
          scaleX = _this$drawTransform3.scaleX,
          scaleY = _this$drawTransform3.scaleY,
          translateX = _this$drawTransform3.translateX,
          translateY = _this$drawTransform3.translateY;
      var checkRight = this.cloneNodeLeft + this.node.width * scaleX;
      var checkBottom = this.cloneNodeTop + this.node.height * scaleX;
      this.overlapNode = null;
      this.prevNode = null;
      this.nextNode = null;
      this.placeholder.size(0, 0);
      bfsWalk(this.mindMap.renderer.root, function (node) {
        if (node.nodeData.data.isActive) {
          _this3.mindMap.renderer.setNodeActive(node, false);
        }

        if (node === _this3.node || _this3.node.isParent(node)) {
          return;
        }

        if (_this3.overlapNode || _this3.prevNode && _this3.nextNode) {
          return;
        }

        var left = node.left,
            top = node.top,
            width = node.width,
            height = node.height;
        var _left = left;
        var _top = top;

        var _bottom = top + height;

        var right = (left + width) * scaleX + translateX;
        var bottom = (top + height) * scaleY + translateY;
        left = left * scaleX + translateX;
        top = top * scaleY + translateY; // 检测是否重叠

        if (!_this3.overlapNode) {
          if (left <= checkRight && right >= _this3.cloneNodeLeft && top <= checkBottom && bottom >= _this3.cloneNodeTop) {
            _this3.overlapNode = node;
          }
        } // 检测兄弟节点位置


        if (!_this3.prevNode && !_this3.nextNode && _this3.node.isBrother(node)) {
          if (left <= checkRight && right >= _this3.cloneNodeLeft) {
            if (_this3.cloneNodeTop > bottom && _this3.cloneNodeTop <= bottom + 10) {
              _this3.prevNode = node;

              _this3.placeholder.size(node.width, 10).move(_left, _bottom);
            } else if (checkBottom < top && checkBottom >= top - 10) {
              _this3.nextNode = node;

              _this3.placeholder.size(node.width, 10).move(_left, _top - 10);
            }
          }
        }
      });

      if (this.overlapNode) {
        this.mindMap.renderer.setNodeActive(this.overlapNode, true);
      }
    }
  }]);

  return Drag;
}(layouts_Base);

/* harmony default export */ var src_Drag = (Drag_Drag);
// CONCATENATED MODULE: ../simple-mind-map/index.js





















 // 默认选项配置

var defaultOpt = {
  // 是否只读
  readonly: false,
  // 布局
  layout: 'logicalStructure',
  // 主题
  theme: 'default',
  // 内置主题：default（默认主题）
  // 主题配置，会和所选择的主题进行合并
  themeConfig: {},
  // 放大缩小的增量比例
  scaleRatio: 0.1,
  // 最多显示几个标签
  maxTag: 5,
  // 导出图片时的内边距
  exportPadding: 20,
  // 展开收缩按钮尺寸
  expandBtnSize: 20,
  // 节点里图片和文字的间距
  imgTextMargin: 5,
  // 节点里各种文字信息的间距，如图标和文字的间距
  textContentMargin: 2,
  // 多选节点时鼠标移动到边缘时的画布移动偏移量
  selectTranslateStep: 3,
  // 多选节点时鼠标移动距边缘多少距离时开始偏移
  selectTranslateLimit: 20,
  // 自定义节点备注内容显示
  customNoteContentShow: null
  /*
      {
          show(){},
          hide(){}
      }
  */

};
/** 
 * javascript comment 
 * @Author: 王林25 
 * @Date: 2021-04-06 11:18:47 
 * @Desc: 思维导图 
 */

var simple_mind_map_MindMap = /*#__PURE__*/function () {
  /** 
   * javascript comment 
   * @Author: 王林25 
   * @Date: 2021-04-06 11:19:01 
   * @Desc: 构造函数 
   */
  function MindMap() {
    var _this = this;

    var opt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, MindMap);

    // 合并选项
    this.opt = this.handleOpt(cjs_default()(defaultOpt, opt)); // 容器元素

    this.el = this.opt.el;
    this.elRect = this.el.getBoundingClientRect(); // 画布宽高

    this.width = this.elRect.width;
    this.height = this.elRect.height; // 画布

    this.svg = SVG().addTo(this.el).size(this.width, this.height);
    this.draw = this.svg.group(); // 节点id

    this.uid = 0; // 初始化主题

    this.initTheme(); // 事件类

    this.event = new src_Event({
      mindMap: this
    }); // 按键类

    this.keyCommand = new KeyCommand_KeyCommand({
      mindMap: this
    }); // 命令类

    this.command = new src_Command({
      mindMap: this
    }); // 渲染类

    this.renderer = new src_Render({
      mindMap: this
    }); // 视图操作类

    this.view = new src_View({
      mindMap: this,
      draw: this.draw
    }); // 导出类

    this.doExport = new src_Export({
      mindMap: this
    }); // 选择类

    this.select = new src_Select({
      mindMap: this
    }); // 拖动类

    this.drag = new src_Drag({
      mindMap: this
    }); // 批量执行类

    this.batchExecution = new src_BatchExecution(); // 初始渲染

    this.reRender();
    setTimeout(function () {
      _this.command.addHistory();
    }, 0);
  }
  /** 
   * @Author: 王林 
   * @Date: 2021-07-01 22:15:22 
   * @Desc: 配置参数处理 
   */


  _createClass(MindMap, [{
    key: "handleOpt",
    value: function handleOpt(opt) {
      // 检查布局配置
      if (!layoutValueList.includes(opt.layout)) {
        opt.layout = 'logicalStructure';
      } // 检查主题配置


      opt.theme = opt.theme && themes[opt.theme] ? opt.theme : 'default';
      return opt;
    }
    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-04-06 18:47:29 
     * @Desc: 渲染，部分渲染
     */

  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      this.batchExecution.push('render', function () {
        _this2.initTheme();

        _this2.renderer.reRender = false;

        _this2.renderer.render();
      });
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-07-08 22:05:11 
     * @Desc: 重新渲染 
     */

  }, {
    key: "reRender",
    value: function reRender() {
      var _this3 = this;

      this.batchExecution.push('render', function () {
        _this3.draw.clear();

        _this3.initTheme();

        _this3.renderer.reRender = true;

        _this3.renderer.render();
      });
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-07-11 21:16:52 
     * @Desc: 容器尺寸变化，调整尺寸 
     */

  }, {
    key: "resize",
    value: function resize() {
      this.elRect = this.el.getBoundingClientRect();
      this.width = this.elRect.width;
      this.height = this.elRect.height;
      this.svg.size(this.width, this.height);
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-04-24 13:25:50 
     * @Desc: 监听事件 
     */

  }, {
    key: "on",
    value: function on(event, fn) {
      this.event.on(event, fn);
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-04-24 13:51:35 
     * @Desc: 触发事件 
     */

  }, {
    key: "emit",
    value: function emit(event) {
      var _this$event;

      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      (_this$event = this.event).emit.apply(_this$event, [event].concat(args));
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-04-24 13:53:54 
     * @Desc: 解绑事件 
     */

  }, {
    key: "off",
    value: function off(event, fn) {
      this.event.off(event, fn);
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-05-05 13:32:43 
     * @Desc: 设置主题
     */

  }, {
    key: "initTheme",
    value: function initTheme() {
      // 合并主题配置
      this.themeConfig = cjs_default()(themes[this.opt.theme], this.opt.themeConfig); // 设置背景样式

      src_Style.setBackgroundStyle(this.el, this.themeConfig);
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-05-05 13:52:08 
     * @Desc: 设置主题 
     */

  }, {
    key: "setTheme",
    value: function setTheme(theme) {
      this.renderer.clearAllActive();
      this.opt.theme = theme;
      this.reRender();
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-06-25 23:52:37 
     * @Desc: 获取当前主题 
     */

  }, {
    key: "getTheme",
    value: function getTheme() {
      return this.opt.theme;
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-05-05 13:50:17 
     * @Desc: 设置主题配置 
     */

  }, {
    key: "setThemeConfig",
    value: function setThemeConfig(config) {
      this.opt.themeConfig = config;
      this.reRender();
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-08-01 10:38:34 
     * @Desc: 获取自定义主题配置 
     */

  }, {
    key: "getCustomThemeConfig",
    value: function getCustomThemeConfig() {
      return this.opt.themeConfig;
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-05-05 14:01:29 
     * @Desc: 获取某个主题配置值 
     */

  }, {
    key: "getThemeConfig",
    value: function getThemeConfig(prop) {
      return prop === undefined ? this.themeConfig : this.themeConfig[prop];
    }
    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-07-13 16:17:06 
     * @Desc: 获取当前布局结构 
     */

  }, {
    key: "getLayout",
    value: function getLayout() {
      return this.opt.layout;
    }
    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2021-07-13 16:17:33 
     * @Desc: 设置布局结构 
     */

  }, {
    key: "setLayout",
    value: function setLayout(layout) {
      // 检查布局配置
      if (!layoutValueList.includes(layout)) {
        layout = 'logicalStructure';
      }

      this.opt.layout = layout;
      this.renderer.setLayout();
      this.render();
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-05-04 13:01:00 
     * @Desc: 执行命令 
     */

  }, {
    key: "execCommand",
    value: function execCommand() {
      var _this$command;

      (_this$command = this.command).exec.apply(_this$command, arguments);
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-08-03 22:58:12 
     * @Desc: 动态设置思维导图数据 
     */

  }, {
    key: "setData",
    value: function setData(data) {
      this.execCommand('CLEAR_ACTIVE_NODE');
      this.command.clearHistory();
      this.renderer.renderTree = data;
      this.reRender();
    }
    /** 
     * @Author: 王林 
     * @Date: 2021-07-01 22:06:38 
     * @Desc: 导出 
     */

  }, {
    key: "export",
    value: function () {
      var _export2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _this$doExport;

        var result,
            _args = arguments;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return (_this$doExport = this.doExport).export.apply(_this$doExport, _args);

              case 2:
                result = _context.sent;
                return _context.abrupt("return", result);

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function _export() {
        return _export2.apply(this, arguments);
      }

      return _export;
    }()
    /** 
     * @Author: 王林 
     * @Date: 2021-07-11 09:20:03 
     * @Desc: 转换位置 
     */

  }, {
    key: "toPos",
    value: function toPos(x, y) {
      return {
        x: x - this.elRect.left,
        y: y - this.elRect.top
      };
    }
    /** 
     * javascript comment 
     * @Author: 王林25 
     * @Date: 2022-06-08 14:12:38 
     * @Desc: 设置只读模式、编辑模式 
     */

  }, {
    key: "setMode",
    value: function setMode(mode) {
      if (!['readonly', 'edit'].includes(mode)) {
        return;
      }

      this.opt.readonly = mode === 'readonly';

      if (this.opt.readonly) {
        // 取消当前激活的元素
        this.renderer.clearAllActive();
      }

      this.emit('mode_change', mode);
    }
  }]);

  return MindMap;
}();

/* harmony default export */ var simple_mind_map = (simple_mind_map_MindMap);
// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js


/* harmony default export */ var entry_lib = __webpack_exports__["default"] = (simple_mind_map);



/***/ }),

/***/ "fb6a":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var isObject = __webpack_require__("861d");
var isArray = __webpack_require__("e8b5");
var toAbsoluteIndex = __webpack_require__("23cb");
var toLength = __webpack_require__("50c4");
var toIndexedObject = __webpack_require__("fc6a");
var createProperty = __webpack_require__("8418");
var wellKnownSymbol = __webpack_require__("b622");
var arrayMethodHasSpeciesSupport = __webpack_require__("1dde");

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('slice');

var SPECIES = wellKnownSymbol('species');
var nativeSlice = [].slice;
var max = Math.max;

// `Array.prototype.slice` method
// https://tc39.es/ecma262/#sec-array.prototype.slice
// fallback for not array-like ES3 strings and DOM objects
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
  slice: function slice(start, end) {
    var O = toIndexedObject(this);
    var length = toLength(O.length);
    var k = toAbsoluteIndex(start, length);
    var fin = toAbsoluteIndex(end === undefined ? length : end, length);
    // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible
    var Constructor, result, n;
    if (isArray(O)) {
      Constructor = O.constructor;
      // cross-realm fallback
      if (typeof Constructor == 'function' && (Constructor === Array || isArray(Constructor.prototype))) {
        Constructor = undefined;
      } else if (isObject(Constructor)) {
        Constructor = Constructor[SPECIES];
        if (Constructor === null) Constructor = undefined;
      }
      if (Constructor === Array || Constructor === undefined) {
        return nativeSlice.call(O, k, fin);
      }
    }
    result = new (Constructor === undefined ? Array : Constructor)(max(fin - k, 0));
    for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k]);
    result.length = n;
    return result;
  }
});


/***/ }),

/***/ "fc6a":
/***/ (function(module, exports, __webpack_require__) {

// toObject with fallback for non-array-like ES3 strings
var IndexedObject = __webpack_require__("44ad");
var requireObjectCoercible = __webpack_require__("1d80");

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};


/***/ }),

/***/ "fc7f":
/***/ (function(module, exports, __webpack_require__) {

// in old WebKit versions, `element.classList` is not an instance of global `DOMTokenList`
var documentCreateElement = __webpack_require__("eaef");

var classList = documentCreateElement('span').classList;
var DOMTokenListPrototype = classList && classList.constructor && classList.constructor.prototype;

module.exports = DOMTokenListPrototype === Object.prototype ? undefined : DOMTokenListPrototype;


/***/ }),

/***/ "fcce":
/***/ (function(module, exports, __webpack_require__) {

var toIntegerOrInfinity = __webpack_require__("f0c6");

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength
module.exports = function (argument) {
  return argument > 0 ? min(toIntegerOrInfinity(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};


/***/ }),

/***/ "fdbc":
/***/ (function(module, exports) {

// iterable DOM collections
// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
module.exports = {
  CSSRuleList: 0,
  CSSStyleDeclaration: 0,
  CSSValueList: 0,
  ClientRectList: 0,
  DOMRectList: 0,
  DOMStringList: 0,
  DOMTokenList: 1,
  DataTransferItemList: 0,
  FileList: 0,
  HTMLAllCollection: 0,
  HTMLCollection: 0,
  HTMLFormElement: 0,
  HTMLSelectElement: 0,
  MediaList: 0,
  MimeTypeArray: 0,
  NamedNodeMap: 0,
  NodeList: 1,
  PaintRequestList: 0,
  Plugin: 0,
  PluginArray: 0,
  SVGLengthList: 0,
  SVGNumberList: 0,
  SVGPathSegList: 0,
  SVGPointList: 0,
  SVGStringList: 0,
  SVGTransformList: 0,
  SourceBufferList: 0,
  StyleSheetList: 0,
  TextTrackCueList: 0,
  TextTrackList: 0,
  TouchList: 0
};


/***/ }),

/***/ "fdbf":
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable es/no-symbol -- required for testing */
var NATIVE_SYMBOL = __webpack_require__("4930");

module.exports = NATIVE_SYMBOL
  && !Symbol.sham
  && typeof Symbol.iterator == 'symbol';


/***/ }),

/***/ "fe22":
/***/ (function(module, exports, __webpack_require__) {

var bind = __webpack_require__("ac86");
var call = __webpack_require__("ef94");
var anObject = __webpack_require__("0e66");
var tryToString = __webpack_require__("9401");
var isArrayIteratorMethod = __webpack_require__("e5a5");
var lengthOfArrayLike = __webpack_require__("7b32");
var isPrototypeOf = __webpack_require__("2b70");
var getIterator = __webpack_require__("2d4d");
var getIteratorMethod = __webpack_require__("6f0f");
var iteratorClose = __webpack_require__("23ab");

var $TypeError = TypeError;

var Result = function (stopped, result) {
  this.stopped = stopped;
  this.result = result;
};

var ResultPrototype = Result.prototype;

module.exports = function (iterable, unboundFunction, options) {
  var that = options && options.that;
  var AS_ENTRIES = !!(options && options.AS_ENTRIES);
  var IS_RECORD = !!(options && options.IS_RECORD);
  var IS_ITERATOR = !!(options && options.IS_ITERATOR);
  var INTERRUPTED = !!(options && options.INTERRUPTED);
  var fn = bind(unboundFunction, that);
  var iterator, iterFn, index, length, result, next, step;

  var stop = function (condition) {
    if (iterator) iteratorClose(iterator, 'normal', condition);
    return new Result(true, condition);
  };

  var callFn = function (value) {
    if (AS_ENTRIES) {
      anObject(value);
      return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]);
    } return INTERRUPTED ? fn(value, stop) : fn(value);
  };

  if (IS_RECORD) {
    iterator = iterable.iterator;
  } else if (IS_ITERATOR) {
    iterator = iterable;
  } else {
    iterFn = getIteratorMethod(iterable);
    if (!iterFn) throw $TypeError(tryToString(iterable) + ' is not iterable');
    // optimisation for array iterators
    if (isArrayIteratorMethod(iterFn)) {
      for (index = 0, length = lengthOfArrayLike(iterable); length > index; index++) {
        result = callFn(iterable[index]);
        if (result && isPrototypeOf(ResultPrototype, result)) return result;
      } return new Result(false);
    }
    iterator = getIterator(iterable, iterFn);
  }

  next = IS_RECORD ? iterable.next : iterator.next;
  while (!(step = call(next, iterator)).done) {
    try {
      result = callFn(step.value);
    } catch (error) {
      iteratorClose(iterator, 'throw', error);
    }
    if (typeof result == 'object' && result && isPrototypeOf(ResultPrototype, result)) return result;
  } return new Result(false);
};


/***/ }),

/***/ "fe3e":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("92f7");
var isCallable = __webpack_require__("ac9e");

var aFunction = function (argument) {
  return isCallable(argument) ? argument : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(global[namespace]) : global[namespace] && global[namespace][method];
};


/***/ }),

/***/ "ffee":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var IteratorPrototype = __webpack_require__("6e9e").IteratorPrototype;
var create = __webpack_require__("ad3e");
var createPropertyDescriptor = __webpack_require__("7234");
var setToStringTag = __webpack_require__("9f8d");
var Iterators = __webpack_require__("ae74");

var returnThis = function () { return this; };

module.exports = function (IteratorConstructor, NAME, next, ENUMERABLE_NEXT) {
  var TO_STRING_TAG = NAME + ' Iterator';
  IteratorConstructor.prototype = create(IteratorPrototype, { next: createPropertyDescriptor(+!ENUMERABLE_NEXT, next) });
  setToStringTag(IteratorConstructor, TO_STRING_TAG, false, true);
  Iterators[TO_STRING_TAG] = returnThis;
  return IteratorConstructor;
};


/***/ })

/******/ });
});