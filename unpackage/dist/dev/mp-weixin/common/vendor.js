(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;
  while (len--) {
    var page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }
  return -1;
}

var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }
    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  } };


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


// import navigateTo from 'uni-helpers/navigate-to'

function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}
var protocols = {
  redirectTo: redirectTo,
  // navigateTo,  // 由于在微信开发者工具的页面参数，会显示__id__参数，因此暂时关闭mp-weixin对于navigateTo的AOP
  previewImage: previewImage,
  getSystemInfo: {
    returnValue: addSafeAreaInsets },

  getSystemInfoSync: {
    returnValue: addSafeAreaInsets } };


var todos = [
'vibrate',
'preloadPage',
'unPreloadPage',
'loadSubPackage'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F ".concat(methodName, "\u6682\u4E0D\u652F\u6301").concat(key));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F \u6682\u4E0D\u652F\u6301".concat(methodName));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      var returnValue = wx[methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail:\u6682\u4E0D\u652F\u6301 ").concat(name, " \u65B9\u6CD5") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail:服务[' + service + ']不存在' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}

Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('onLoad', options);
  return MPPage(options);
};

Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('created', options);
  return MPComponent(options);
};

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onAddToFavorites',
'onShareTimeline',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"NODE_ENV":"development","VUE_APP_NAME":"driver1234","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    // 用于字节跳动小程序模拟抽象节点
    properties.generic = {
      type: Object,
      value: null };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            if (event.detail && event.detail.__args__) {
              extraObj['$' + index] = event.detail.__args__;
            } else {
              extraObj['$' + index] = [event];
            }
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (handlerCtx.$options.generic) {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName);

          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          // eslint-disable-next-line no-sparse-arrays
          ret.push(handler.apply(handlerCtx, (Array.isArray(params) ? params : []).concat([,,,,,,,,,, event])));
        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound',
'onThemeChange',
'onUnhandledRejection'];


function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;

      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (!wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function selectAllComponents(mpInstance, selector, $refs) {
  var components = mpInstance.selectAllComponents(selector);
  components.forEach(function (component) {
    var ref = component.dataset.ref;
    $refs[ref] = component.$vm || component;
    {
      if (component.dataset.vueGeneric === 'scoped') {
        component.selectAllComponents('.scoped-ref').forEach(function (scopedComponent) {
          selectAllComponents(scopedComponent, selector, $refs);
        });
      }
    }
  });
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      selectAllComponents(mpInstance, '.vue-ref', $refs);
      // TODO 暂不考虑 for 中的 scoped
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

var eventChannels = {};

var eventChannelStack = [];

function getEventChannel(id) {
  if (id) {
    var eventChannel = eventChannels[id];
    delete eventChannels[id];
    return eventChannel;
  }
  return eventChannelStack.shift();
}

function createApp(vm) {
  _vue.default.prototype.getOpenerEventChannel = function () {
    // 微信小程序使用自身getOpenerEventChannel
    {
      return this.$scope.getOpenerEventChannel();
    }
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
  App(parseApp(vm));
  return vm;
}

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {return '%' + c.charCodeAt(0).toString(16);};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {return encodeURIComponent(str).
  replace(encodeReserveRE, encodeReserveReplacer).
  replace(commaRE, ',');};

function stringifyQuery(obj) {var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return '';
    }

    if (val === null) {
      return encodeStr(key);
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }

    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {return x.length > 0;}).join('&') : null;
  return res ? "?".concat(res) : '';
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery) };

    this.$vm.$mp.query = query; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', query);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),

/***/ 11:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 12:
/*!*****************************************************************!*\
  !*** /Users/mac/code/driver1234/node_modules/uview-ui/index.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;
var _mixin = _interopRequireDefault(__webpack_require__(/*! ./libs/mixin/mixin.js */ 13));



var _request = _interopRequireDefault(__webpack_require__(/*! ./libs/request */ 14));




















var _queryParams = _interopRequireDefault(__webpack_require__(/*! ./libs/function/queryParams.js */ 18));

var _route = _interopRequireDefault(__webpack_require__(/*! ./libs/function/route.js */ 19));

var _timeFormat = _interopRequireDefault(__webpack_require__(/*! ./libs/function/timeFormat.js */ 23));

var _timeFrom = _interopRequireDefault(__webpack_require__(/*! ./libs/function/timeFrom.js */ 24));

var _colorGradient = _interopRequireDefault(__webpack_require__(/*! ./libs/function/colorGradient.js */ 25));

var _guid = _interopRequireDefault(__webpack_require__(/*! ./libs/function/guid.js */ 26));

var _color = _interopRequireDefault(__webpack_require__(/*! ./libs/function/color.js */ 27));

var _type2icon = _interopRequireDefault(__webpack_require__(/*! ./libs/function/type2icon.js */ 28));

var _randomArray = _interopRequireDefault(__webpack_require__(/*! ./libs/function/randomArray.js */ 29));

var _deepClone = _interopRequireDefault(__webpack_require__(/*! ./libs/function/deepClone.js */ 16));

var _deepMerge = _interopRequireDefault(__webpack_require__(/*! ./libs/function/deepMerge.js */ 15));

var _addUnit = _interopRequireDefault(__webpack_require__(/*! ./libs/function/addUnit.js */ 30));


var _test = _interopRequireDefault(__webpack_require__(/*! ./libs/function/test.js */ 17));

var _random = _interopRequireDefault(__webpack_require__(/*! ./libs/function/random.js */ 31));

var _trim = _interopRequireDefault(__webpack_require__(/*! ./libs/function/trim.js */ 32));

var _toast = _interopRequireDefault(__webpack_require__(/*! ./libs/function/toast.js */ 33));

var _getParent = _interopRequireDefault(__webpack_require__(/*! ./libs/function/getParent.js */ 34));

var _$parent = _interopRequireDefault(__webpack_require__(/*! ./libs/function/$parent.js */ 35));



var _sys = __webpack_require__(/*! ./libs/function/sys.js */ 36);

var _debounce = _interopRequireDefault(__webpack_require__(/*! ./libs/function/debounce.js */ 37));

var _throttle = _interopRequireDefault(__webpack_require__(/*! ./libs/function/throttle.js */ 38));



var _config = _interopRequireDefault(__webpack_require__(/*! ./libs/config/config.js */ 39));

var _zIndex = _interopRequireDefault(__webpack_require__(/*! ./libs/config/zIndex.js */ 40));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // 引入全局mixin
// 引入关于是否mixin集成小程序分享的配置
// import wxshare from './libs/mixin/mpShare.js'
// 全局挂载引入http相关请求拦截插件
function wranning(str) {// 开发环境进行信息输出,主要是一些报错信息
  // 这个环境的来由是在程序编写时候,点击hx编辑器运行调试代码的时候,详见:
  // 	https://uniapp.dcloud.io/frame?id=%e5%bc%80%e5%8f%91%e7%8e%af%e5%a2%83%e5%92%8c%e7%94%9f%e4%ba%a7%e7%8e%af%e5%a2%83
  if (true) {console.warn(str);}} // 尝试判断在根目录的/store中是否有$u.mixin.js，此文件uView默认为需要挂在到全局的vuex的state变量
// HX2.6.11版本,放到try中,控制台依然会警告,暂时不用此方式，
// let vuexStore = {};
// try {
// 	vuexStore = require("@/store/$u.mixin.js");
// } catch (e) {
// 	//TODO handle the exception
// }
// post类型对象参数转为get类型url参数
var $u = { queryParams: _queryParams.default, route: _route.default, timeFormat: _timeFormat.default, date: _timeFormat.default, // 另名date
  timeFrom: _timeFrom.default, colorGradient: _colorGradient.default.colorGradient, colorToRgba: _colorGradient.default.colorToRgba, guid: _guid.default, color: _color.default, sys: _sys.sys, os: _sys.os, type2icon: _type2icon.default, randomArray: _randomArray.default, wranning: wranning, get: _request.default.get,
  post: _request.default.post,
  put: _request.default.put,
  'delete': _request.default.delete,
  hexToRgb: _colorGradient.default.hexToRgb,
  rgbToHex: _colorGradient.default.rgbToHex,
  test: _test.default,
  random: _random.default,
  deepClone: _deepClone.default,
  deepMerge: _deepMerge.default,
  getParent: _getParent.default,
  $parent: _$parent.default,
  addUnit: _addUnit.default,
  trim: _trim.default,
  type: ['primary', 'success', 'error', 'warning', 'info'],
  http: _request.default,
  toast: _toast.default,
  config: _config.default, // uView配置信息相关，比如版本号
  zIndex: _zIndex.default,
  debounce: _debounce.default,
  throttle: _throttle.default };


// $u挂载到uni对象上
uni.$u = $u;

var install = function install(Vue) {
  Vue.mixin(_mixin.default);
  if (Vue.prototype.openShare) {
    Vue.mixin(mpShare);
  }
  // Vue.mixin(vuexStore);
  // 时间格式化，同时两个名称，date和timeFormat
  Vue.filter('timeFormat', function (timestamp, format) {
    return (0, _timeFormat.default)(timestamp, format);
  });
  Vue.filter('date', function (timestamp, format) {
    return (0, _timeFormat.default)(timestamp, format);
  });
  // 将多久以前的方法，注入到全局过滤器
  Vue.filter('timeFrom', function (timestamp, format) {
    return (0, _timeFrom.default)(timestamp, format);
  });
  Vue.prototype.$u = $u;
};var _default =

{
  install: install };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 13:
/*!****************************************************************************!*\
  !*** /Users/mac/code/driver1234/node_modules/uview-ui/libs/mixin/mixin.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(uni) {module.exports = {
  data: function data() {
    return {};
  },
  onLoad: function onLoad() {
    // getRect挂载到$u上，因为这方法需要使用in(this)，所以无法把它独立成一个单独的文件导出
    this.$u.getRect = this.$uGetRect;
  },
  methods: {
    // 查询节点信息
    // 目前此方法在支付宝小程序中无法获取组件跟接点的尺寸，为支付宝的bug(2020-07-21)
    // 解决办法为在组件根部再套一个没有任何作用的view元素
    $uGetRect: function $uGetRect(selector, all) {var _this = this;
      return new Promise(function (resolve) {
        uni.createSelectorQuery().
        in(_this)[all ? 'selectAll' : 'select'](selector).
        boundingClientRect(function (rect) {
          if (all && Array.isArray(rect) && rect.length) {
            resolve(rect);
          }
          if (!all && rect) {
            resolve(rect);
          }
        }).
        exec();
      });
    },
    getParentData: function getParentData() {var _this2 = this;var parentName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      // 避免在created中去定义parent变量
      if (!this.parent) this.parent = false;
      // 这里的本质原理是，通过获取父组件实例(也即u-radio-group的this)
      // 将父组件this中对应的参数，赋值给本组件(u-radio的this)的parentData对象中对应的属性
      // 之所以需要这么做，是因为所有端中，头条小程序不支持通过this.parent.xxx去监听父组件参数的变化
      this.parent = this.$u.$parent.call(this, parentName);
      if (this.parent) {
        // 历遍parentData中的属性，将parent中的同名属性赋值给parentData
        Object.keys(this.parentData).map(function (key) {
          _this2.parentData[key] = _this2.parent[key];
        });
      }
    },
    // 阻止事件冒泡
    preventEvent: function preventEvent(e) {
      e && e.stopPropagation && e.stopPropagation();
    } },

  onReachBottom: function onReachBottom() {
    uni.$emit('uOnReachBottom');
  },
  beforeDestroy: function beforeDestroy() {var _this3 = this;
    // 判断当前页面是否存在parent和chldren，一般在checkbox和checkbox-group父子联动的场景会有此情况
    // 组件销毁时，移除子组件在父组件children数组中的实例，释放资源，避免数据混乱
    if (this.parent && uni.$u.test.array(this.parent.children)) {
      // 组件销毁时，移除父组件中的children数组中对应的实例
      var childrenList = this.parent.children;
      childrenList.map(function (child, index) {
        // 如果相等，则移除
        if (child === _this3) {
          childrenList.splice(index, 1);
        }
      });
    }
  } };
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 14:
/*!******************************************************************************!*\
  !*** /Users/mac/code/driver1234/node_modules/uview-ui/libs/request/index.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _deepMerge = _interopRequireDefault(__webpack_require__(/*! ../function/deepMerge */ 15));
var _test = _interopRequireDefault(__webpack_require__(/*! ../function/test */ 17));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}var
Request = /*#__PURE__*/function () {_createClass(Request, [{ key: "setConfig",
    // 设置全局默认配置
    value: function setConfig(customConfig) {
      // 深度合并对象，否则会造成对象深层属性丢失
      this.config = (0, _deepMerge.default)(this.config, customConfig);
    }

    // 主要请求部分
  }, { key: "request", value: function request() {var _this = this;var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      // 检查请求拦截
      if (this.interceptor.request && typeof this.interceptor.request === 'function') {
        var tmpConfig = {};
        var interceptorRequest = this.interceptor.request(options);
        if (interceptorRequest === false) {
          // 返回一个处于pending状态中的Promise，来取消原promise，避免进入then()回调
          return new Promise(function () {});
        }
        this.options = interceptorRequest;
      }
      options.dataType = options.dataType || this.config.dataType;
      options.responseType = options.responseType || this.config.responseType;
      options.url = options.url || '';
      options.params = options.params || {};
      options.header = Object.assign({}, this.config.header, options.header);
      options.method = options.method || this.config.method;

      return new Promise(function (resolve, reject) {
        options.complete = function (response) {
          // 请求返回后，隐藏loading(如果请求返回快的话，可能会没有loading)
          uni.hideLoading();
          // 清除定时器，如果请求回来了，就无需loading
          clearTimeout(_this.config.timer);
          _this.config.timer = null;
          // 判断用户对拦截返回数据的要求，如果originalData为true，返回所有的数据(response)到拦截器，否则只返回response.data
          if (_this.config.originalData) {
            // 判断是否存在拦截器
            if (_this.interceptor.response && typeof _this.interceptor.response === 'function') {
              var resInterceptors = _this.interceptor.response(response);
              // 如果拦截器不返回false，就将拦截器返回的内容给this.$u.post的then回调
              if (resInterceptors !== false) {
                resolve(resInterceptors);
              } else {
                // 如果拦截器返回false，意味着拦截器定义者认为返回有问题，直接接入catch回调
                reject(response);
              }
            } else {
              // 如果要求返回原始数据，就算没有拦截器，也返回最原始的数据
              resolve(response);
            }
          } else {
            if (response.statusCode == 200) {
              if (_this.interceptor.response && typeof _this.interceptor.response === 'function') {
                var _resInterceptors = _this.interceptor.response(response.data);
                if (_resInterceptors !== false) {
                  resolve(_resInterceptors);
                } else {
                  reject(response.data);
                }
              } else {
                // 如果不是返回原始数据(originalData=false)，且没有拦截器的情况下，返回纯数据给then回调
                resolve(response.data);
              }
            } else {
              // 不返回原始数据的情况下，服务器状态码不为200，modal弹框提示
              // if(response.errMsg) {
              // 	uni.showModal({
              // 		title: response.errMsg
              // 	});
              // }
              reject(response);
            }
          }
        };

        // 判断用户传递的URL是否/开头,如果不是,加上/，这里使用了uView的test.js验证库的url()方法
        options.url = _test.default.url(options.url) ? options.url : _this.config.baseUrl + (options.url.indexOf('/') == 0 ?
        options.url : '/' + options.url);

        // 是否显示loading
        // 加一个是否已有timer定时器的判断，否则有两个同时请求的时候，后者会清除前者的定时器id
        // 而没有清除前者的定时器，导致前者超时，一直显示loading
        if (_this.config.showLoading && !_this.config.timer) {
          _this.config.timer = setTimeout(function () {
            uni.showLoading({
              title: _this.config.loadingText,
              mask: _this.config.loadingMask });

            _this.config.timer = null;
          }, _this.config.loadingTime);
        }
        uni.request(options);
      });
      // .catch(res => {
      // 	// 如果返回reject()，不让其进入this.$u.post().then().catch()后面的catct()
      // 	// 因为很多人都会忘了写后面的catch()，导致报错捕获不到catch
      // 	return new Promise(()=>{});
      // })
    } }]);

  function Request() {var _this2 = this;_classCallCheck(this, Request);
    this.config = {
      baseUrl: '', // 请求的根域名
      // 默认的请求头
      header: {},
      method: 'POST',
      // 设置为json，返回后uni.request会对数据进行一次JSON.parse
      dataType: 'json',
      // 此参数无需处理，因为5+和支付宝小程序不支持，默认为text即可
      responseType: 'text',
      showLoading: true, // 是否显示请求中的loading
      loadingText: '请求中...',
      loadingTime: 800, // 在此时间内，请求还没回来的话，就显示加载中动画，单位ms
      timer: null, // 定时器
      originalData: false, // 是否在拦截器中返回服务端的原始数据，见文档说明
      loadingMask: true // 展示loading的时候，是否给一个透明的蒙层，防止触摸穿透
    };

    // 拦截器
    this.interceptor = {
      // 请求前的拦截
      request: null,
      // 请求后的拦截
      response: null };


    // get请求
    this.get = function (url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _this2.request({
        method: 'GET',
        url: url,
        header: header,
        data: data });

    };

    // post请求
    this.post = function (url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _this2.request({
        url: url,
        method: 'POST',
        header: header,
        data: data });

    };

    // put请求，不支持支付宝小程序(HX2.6.15)
    this.put = function (url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _this2.request({
        url: url,
        method: 'PUT',
        header: header,
        data: data });

    };

    // delete请求，不支持支付宝和头条小程序(HX2.6.15)
    this.delete = function (url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _this2.request({
        url: url,
        method: 'DELETE',
        header: header,
        data: data });

    };
  }return Request;}();var _default =

new Request();exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 15:
/*!***********************************************************************************!*\
  !*** /Users/mac/code/driver1234/node_modules/uview-ui/libs/function/deepMerge.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _deepClone = _interopRequireDefault(__webpack_require__(/*! ./deepClone */ 16));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

// JS对象深度合并
function deepMerge() {var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var source = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  target = (0, _deepClone.default)(target);
  if (typeof target !== 'object' || typeof source !== 'object') return false;
  for (var prop in source) {
    if (!source.hasOwnProperty(prop)) continue;
    if (prop in target) {
      if (typeof target[prop] !== 'object') {
        target[prop] = source[prop];
      } else {
        if (typeof source[prop] !== 'object') {
          target[prop] = source[prop];
        } else {
          if (target[prop].concat && source[prop].concat) {
            target[prop] = target[prop].concat(source[prop]);
          } else {
            target[prop] = deepMerge(target[prop], source[prop]);
          }
        }
      }
    } else {
      target[prop] = source[prop];
    }
  }
  return target;
}var _default =

deepMerge;exports.default = _default;

/***/ }),

/***/ 16:
/*!***********************************************************************************!*\
  !*** /Users/mac/code/driver1234/node_modules/uview-ui/libs/function/deepClone.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 判断arr是否为一个数组，返回一个bool值
function isArray(arr) {
  return Object.prototype.toString.call(arr) === '[object Array]';
}

// 深度克隆
function deepClone(obj) {
  // 对常见的“非”值，直接返回原来值
  if ([null, undefined, NaN, false].includes(obj)) return obj;
  if (typeof obj !== "object" && typeof obj !== 'function') {
    //原始类型直接返回
    return obj;
  }
  var o = isArray(obj) ? [] : {};
  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      o[i] = typeof obj[i] === "object" ? deepClone(obj[i]) : obj[i];
    }
  }
  return o;
}var _default =

deepClone;exports.default = _default;

/***/ }),

/***/ 17:
/*!******************************************************************************!*\
  !*** /Users/mac/code/driver1234/node_modules/uview-ui/libs/function/test.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 验证电子邮箱格式
                                                                                                      */
function email(value) {
  return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(value);
}

/**
   * 验证手机格式
   */
function mobile(value) {
  return /^1[23456789]\d{9}$/.test(value);
}

/**
   * 验证URL格式
   */
function url(value) {
  return /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w-.\/?%&=]*)?/.test(value);
}

/**
   * 验证日期格式
   */
function date(value) {
  return !/Invalid|NaN/.test(new Date(value).toString());
}

/**
   * 验证ISO类型的日期格式
   */
function dateISO(value) {
  return /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(value);
}

/**
   * 验证十进制数字
   */
function number(value) {
  return /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value);
}

/**
   * 验证整数
   */
function digits(value) {
  return /^\d+$/.test(value);
}

/**
   * 验证身份证号码
   */
function idCard(value) {
  return /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(
  value);
}

/**
   * 是否车牌号
   */
function carNo(value) {
  // 新能源车牌
  var xreg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/;
  // 旧车牌
  var creg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/;
  if (value.length === 7) {
    return creg.test(value);
  } else if (value.length === 8) {
    return xreg.test(value);
  } else {
    return false;
  }
}

/**
   * 金额,只允许2位小数
   */
function amount(value) {
  //金额，只允许保留两位小数
  return /^[1-9]\d*(,\d{3})*(\.\d{1,2})?$|^0\.\d{1,2}$/.test(value);
}

/**
   * 中文
   */
function chinese(value) {
  var reg = /^[\u4e00-\u9fa5]+$/gi;
  return reg.test(value);
}

/**
   * 只能输入字母
   */
function letter(value) {
  return /^[a-zA-Z]*$/.test(value);
}

/**
   * 只能是字母或者数字
   */
function enOrNum(value) {
  //英文或者数字
  var reg = /^[0-9a-zA-Z]*$/g;
  return reg.test(value);
}

/**
   * 验证是否包含某个值
   */
function contains(value, param) {
  return value.indexOf(param) >= 0;
}

/**
   * 验证一个值范围[min, max]
   */
function range(value, param) {
  return value >= param[0] && value <= param[1];
}

/**
   * 验证一个长度范围[min, max]
   */
function rangeLength(value, param) {
  return value.length >= param[0] && value.length <= param[1];
}

/**
   * 是否固定电话
   */
function landline(value) {
  var reg = /^\d{3,4}-\d{7,8}(-\d{3,4})?$/;
  return reg.test(value);
}

/**
   * 判断是否为空
   */
function empty(value) {
  switch (typeof value) {
    case 'undefined':
      return true;
    case 'string':
      if (value.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, '').length == 0) return true;
      break;
    case 'boolean':
      if (!value) return true;
      break;
    case 'number':
      if (0 === value || isNaN(value)) return true;
      break;
    case 'object':
      if (null === value || value.length === 0) return true;
      for (var i in value) {
        return false;
      }
      return true;}

  return false;
}

/**
   * 是否json字符串
   */
function jsonString(value) {
  if (typeof value == 'string') {
    try {
      var obj = JSON.parse(value);
      if (typeof obj == 'object' && obj) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  }
  return false;
}


/**
   * 是否数组
   */
function array(value) {
  if (typeof Array.isArray === "function") {
    return Array.isArray(value);
  } else {
    return Object.prototype.toString.call(value) === "[object Array]";
  }
}

/**
   * 是否对象
   */
function object(value) {
  return Object.prototype.toString.call(value) === '[object Object]';
}

/**
   * 是否短信验证码
   */
function code(value) {var len = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 6;
  return new RegExp("^\\d{".concat(len, "}$")).test(value);
}var _default =


{
  email: email,
  mobile: mobile,
  url: url,
  date: date,
  dateISO: dateISO,
  number: number,
  digits: digits,
  idCard: idCard,
  carNo: carNo,
  amount: amount,
  chinese: chinese,
  letter: letter,
  enOrNum: enOrNum,
  contains: contains,
  range: range,
  rangeLength: rangeLength,
  empty: empty,
  isEmpty: empty,
  jsonString: jsonString,
  landline: landline,
  object: object,
  array: array,
  code: code };exports.default = _default;

/***/ }),

/***/ 18:
/*!*************************************************************************************!*\
  !*** /Users/mac/code/driver1234/node_modules/uview-ui/libs/function/queryParams.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 对象转url参数
                                                                                                      * @param {*} data,对象
                                                                                                      * @param {*} isPrefix,是否自动加上"?"
                                                                                                      */
function queryParams() {var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var isPrefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;var arrayFormat = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'brackets';
  var prefix = isPrefix ? '?' : '';
  var _result = [];
  if (['indices', 'brackets', 'repeat', 'comma'].indexOf(arrayFormat) == -1) arrayFormat = 'brackets';var _loop = function _loop(
  key) {
    var value = data[key];
    // 去掉为空的参数
    if (['', undefined, null].indexOf(value) >= 0) {
      return "continue";
    }
    // 如果值为数组，另行处理
    if (value.constructor === Array) {
      // e.g. {ids: [1, 2, 3]}
      switch (arrayFormat) {
        case 'indices':
          // 结果: ids[0]=1&ids[1]=2&ids[2]=3
          for (var i = 0; i < value.length; i++) {
            _result.push(key + '[' + i + ']=' + value[i]);
          }
          break;
        case 'brackets':
          // 结果: ids[]=1&ids[]=2&ids[]=3
          value.forEach(function (_value) {
            _result.push(key + '[]=' + _value);
          });
          break;
        case 'repeat':
          // 结果: ids=1&ids=2&ids=3
          value.forEach(function (_value) {
            _result.push(key + '=' + _value);
          });
          break;
        case 'comma':
          // 结果: ids=1,2,3
          var commaStr = "";
          value.forEach(function (_value) {
            commaStr += (commaStr ? "," : "") + _value;
          });
          _result.push(key + '=' + commaStr);
          break;
        default:
          value.forEach(function (_value) {
            _result.push(key + '[]=' + _value);
          });}

    } else {
      _result.push(key + '=' + value);
    }};for (var key in data) {var _ret = _loop(key);if (_ret === "continue") continue;
  }
  return _result.length ? prefix + _result.join('&') : '';
}var _default =

queryParams;exports.default = _default;

/***/ }),

/***/ 19:
/*!*******************************************************************************!*\
  !*** /Users/mac/code/driver1234/node_modules/uview-ui/libs/function/route.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 20));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;} /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  * 路由跳转方法，该方法相对于直接使用uni.xxx的好处是使用更加简单快捷
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  * 并且带有路由拦截功能
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  */var

Router = /*#__PURE__*/function () {
  function Router() {_classCallCheck(this, Router);
    // 原始属性定义
    this.config = {
      type: 'navigateTo',
      url: '',
      delta: 1, // navigateBack页面后退时,回退的层数
      params: {}, // 传递的参数
      animationType: 'pop-in', // 窗口动画,只在APP有效
      animationDuration: 300, // 窗口动画持续时间,单位毫秒,只在APP有效
      intercept: false // 是否需要拦截
    };
    // 因为route方法是需要对外赋值给另外的对象使用，同时route内部有使用this，会导致route失去上下文
    // 这里在构造函数中进行this绑定
    this.route = this.route.bind(this);
  }

  // 判断url前面是否有"/"，如果没有则加上，否则无法跳转
  _createClass(Router, [{ key: "addRootPath", value: function addRootPath(url) {
      return url[0] === '/' ? url : "/".concat(url);
    }

    // 整合路由参数
  }, { key: "mixinParam", value: function mixinParam(url, params) {
      url = url && this.addRootPath(url);

      // 使用正则匹配，主要依据是判断是否有"/","?","="等，如“/page/index/index?name=mary"
      // 如果有url中有get参数，转换后无需带上"?"
      var query = '';
      if (/.*\/.*\?.*=.*/.test(url)) {
        // object对象转为get类型的参数
        query = uni.$u.queryParams(params, false);
        // 因为已有get参数,所以后面拼接的参数需要带上"&"隔开
        return url += "&" + query;
      } else {
        // 直接拼接参数，因为此处url中没有后面的query参数，也就没有"?/&"之类的符号
        query = uni.$u.queryParams(params);
        return url += query;
      }
    }

    // 对外的方法名称
  }, { key: "route", value: function () {var _route = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee() {var options,params,mergeConfig,isNext,_args = arguments;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:options = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};params = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
                // 合并用户的配置和内部的默认配置
                mergeConfig = {};

                if (typeof options === 'string') {
                  // 如果options为字符串，则为route(url, params)的形式
                  mergeConfig.url = this.mixinParam(options, params);
                  mergeConfig.type = 'navigateTo';
                } else {
                  mergeConfig = uni.$u.deepClone(options, this.config);
                  // 否则正常使用mergeConfig中的url和params进行拼接
                  mergeConfig.url = this.mixinParam(options.url, options.params);
                }

                if (params.intercept) {
                  this.config.intercept = params.intercept;
                }
                // params参数也带给拦截器
                mergeConfig.params = params;
                // 合并内外部参数
                mergeConfig = uni.$u.deepMerge(this.config, mergeConfig);
                // 判断用户是否定义了拦截器
                if (!(typeof uni.$u.routeIntercept === 'function')) {_context.next = 14;break;}_context.next = 10;return (

                  new Promise(function (resolve, reject) {
                    uni.$u.routeIntercept(mergeConfig, resolve);
                  }));case 10:isNext = _context.sent;
                // 如果isNext为true，则执行路由跳转
                isNext && this.openPage(mergeConfig);_context.next = 15;break;case 14:

                this.openPage(mergeConfig);case 15:case "end":return _context.stop();}}}, _callee, this);}));function route() {return _route.apply(this, arguments);}return route;}()



    // 执行路由跳转
  }, { key: "openPage", value: function openPage(config) {
      // 解构参数
      var
      url =




      config.url,type = config.type,delta = config.delta,animationType = config.animationType,animationDuration = config.animationDuration;
      if (config.type == 'navigateTo' || config.type == 'to') {
        uni.navigateTo({
          url: url,
          animationType: animationType,
          animationDuration: animationDuration });

      }
      if (config.type == 'redirectTo' || config.type == 'redirect') {
        uni.redirectTo({
          url: url });

      }
      if (config.type == 'switchTab' || config.type == 'tab') {
        uni.switchTab({
          url: url });

      }
      if (config.type == 'reLaunch' || config.type == 'launch') {
        uni.reLaunch({
          url: url });

      }
      if (config.type == 'navigateBack' || config.type == 'back') {
        uni.navigateBack({
          delta: delta });

      }
    } }]);return Router;}();var _default =


new Router().route;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 2:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2020 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
  Dep.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
  Dep.target = Dep.SharedObject.target;
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i++, i)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"NODE_ENV":"development","VUE_APP_NAME":"driver1234","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"NODE_ENV":"development","VUE_APP_NAME":"driver1234","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"NODE_ENV":"development","VUE_APP_NAME":"driver1234","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var compositionApiState = vm.__composition_api_state__ || vm.__secret_vfa_state__;
  var rawBindings = compositionApiState && compositionApiState.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }

  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"NODE_ENV":"development","VUE_APP_NAME":"driver1234","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // 第一个参数暂时仍和小程序一致
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 20:
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ 21);

/***/ }),

/***/ 21:
/*!************************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime-module.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(/*! ./runtime */ 22);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),

/***/ 22:
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

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
  runtime.wrap = wrap;

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
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
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
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
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
        return new Promise(function(resolve, reject) {
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
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
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
        if (delegate.iterator.return) {
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

  Gp[toStringTagSymbol] = "Generator";

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

  runtime.keys = function(object) {
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
  runtime.values = values;

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
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);


/***/ }),

/***/ 23:
/*!************************************************************************************!*\
  !*** /Users/mac/code/driver1234/node_modules/uview-ui/libs/function/timeFormat.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // padStart 的 polyfill，因为某些机型或情况，还无法支持es7的padStart，比如电脑版的微信小程序
// 所以这里做一个兼容polyfill的兼容处理
if (!String.prototype.padStart) {
  // 为了方便表示这里 fillString 用了ES6 的默认参数，不影响理解
  String.prototype.padStart = function (maxLength) {var fillString = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ' ';
    if (Object.prototype.toString.call(fillString) !== "[object String]") throw new TypeError(
    'fillString must be String');
    var str = this;
    // 返回 String(str) 这里是为了使返回的值是字符串字面量，在控制台中更符合直觉
    if (str.length >= maxLength) return String(str);

    var fillLength = maxLength - str.length,
    times = Math.ceil(fillLength / fillString.length);
    while (times >>= 1) {
      fillString += fillString;
      if (times === 1) {
        fillString += fillString;
      }
    }
    return fillString.slice(0, fillLength) + str;
  };
}

// 其他更多是格式化有如下:
// yyyy:mm:dd|yyyy:mm|yyyy年mm月dd日|yyyy年mm月dd日 hh时MM分等,可自定义组合
function timeFormat() {var dateTime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;var fmt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'yyyy-mm-dd';
  // 如果为null,则格式化当前时间
  if (!dateTime) dateTime = Number(new Date());
  // 如果dateTime长度为10或者13，则为秒和毫秒的时间戳，如果超过13位，则为其他的时间格式
  if (dateTime.toString().length == 10) dateTime *= 1000;
  var date = new Date(dateTime);
  var ret;
  var opt = {
    "y+": date.getFullYear().toString(), // 年
    "m+": (date.getMonth() + 1).toString(), // 月
    "d+": date.getDate().toString(), // 日
    "h+": date.getHours().toString(), // 时
    "M+": date.getMinutes().toString(), // 分
    "s+": date.getSeconds().toString() // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (var k in opt) {
    ret = new RegExp("(" + k + ")").exec(fmt);
    if (ret) {
      fmt = fmt.replace(ret[1], ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0"));
    };
  };
  return fmt;
}var _default =

timeFormat;exports.default = _default;

/***/ }),

/***/ 232:
/*!*******************************************************************************!*\
  !*** /Users/mac/code/driver1234/node_modules/html2canvas/dist/html2canvas.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * html2canvas 1.0.0-rc.7 <https://html2canvas.hertzen.com>
 * Copyright (c) 2020 Niklas von Hertzen <https://hertzen.com>
 * Released under MIT License
 */
(function (global, factory) {
   true ? module.exports = factory() :
  undefined;
})(this, function () {'use strict';

  /*! *****************************************************************************
                                    Copyright (c) Microsoft Corporation. All rights reserved.
                                    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
                                    this file except in compliance with the License. You may obtain a copy of the
                                    License at http://www.apache.org/licenses/LICENSE-2.0
                                     THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
                                    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
                                    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
                                    MERCHANTABLITY OR NON-INFRINGEMENT.
                                     See the Apache Version 2.0 License for specific language governing permissions
                                    and limitations under the License.
                                    ***************************************************************************** */


  /* global Reflect, Promise */

  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf ||
    { __proto__: [] } instanceof Array && function (d, b) {d.__proto__ = b;} ||
    function (d, b) {for (var p in b) {if (b.hasOwnProperty(p)) d[p] = b[p];}};
    return _extendStatics(d, b);
  };

  function __extends(d, b) {
    _extendStatics(d, b);
    function __() {this.constructor = d;}
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  }

  var _assign = function __assign() {
    _assign = Object.assign || function __assign(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) {if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];}
      }
      return t;
    };
    return _assign.apply(this, arguments);
  };

  function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {try {step(generator.next(value));} catch (e) {reject(e);}}
      function rejected(value) {try {step(generator["throw"](value));} catch (e) {reject(e);}}
      function step(result) {result.done ? resolve(result.value) : new P(function (resolve) {resolve(result.value);}).then(fulfilled, rejected);}
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  }

  function __generator(thisArg, body) {
    var _ = { label: 0, sent: function sent() {if (t[0] & 1) throw t[1];return t[1];}, trys: [], ops: [] },f,y,t,g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {return this;}), g;
    function verb(n) {return function (v) {return step([n, v]);};}
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while (_) {try {
          if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          if (y = 0, t) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:case 1:t = op;break;
            case 4:_.label++;return { value: op[1], done: false };
            case 5:_.label++;y = op[1];op = [0];continue;
            case 7:op = _.ops.pop();_.trys.pop();continue;
            default:
              if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {_ = 0;continue;}
              if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {_.label = op[1];break;}
              if (op[0] === 6 && _.label < t[1]) {_.label = t[1];t = op;break;}
              if (t && _.label < t[2]) {_.label = t[2];_.ops.push(op);break;}
              if (t[2]) _.ops.pop();
              _.trys.pop();continue;}

          op = body.call(thisArg, _);
        } catch (e) {op = [6, e];y = 0;} finally {f = t = 0;}}
      if (op[0] & 5) throw op[1];return { value: op[0] ? op[1] : void 0, done: true };
    }
  }

  var Bounds = /** @class */function () {
    function Bounds(x, y, w, h) {
      this.left = x;
      this.top = y;
      this.width = w;
      this.height = h;
    }
    Bounds.prototype.add = function (x, y, w, h) {
      return new Bounds(this.left + x, this.top + y, this.width + w, this.height + h);
    };
    Bounds.fromClientRect = function (clientRect) {
      return new Bounds(clientRect.left, clientRect.top, clientRect.width, clientRect.height);
    };
    return Bounds;
  }();
  var parseBounds = function parseBounds(node) {
    return Bounds.fromClientRect(node.getBoundingClientRect());
  };
  var parseDocumentSize = function parseDocumentSize(document) {
    var body = document.body;
    var documentElement = document.documentElement;
    if (!body || !documentElement) {
      throw new Error("Unable to get document size");
    }
    var width = Math.max(Math.max(body.scrollWidth, documentElement.scrollWidth), Math.max(body.offsetWidth, documentElement.offsetWidth), Math.max(body.clientWidth, documentElement.clientWidth));
    var height = Math.max(Math.max(body.scrollHeight, documentElement.scrollHeight), Math.max(body.offsetHeight, documentElement.offsetHeight), Math.max(body.clientHeight, documentElement.clientHeight));
    return new Bounds(0, 0, width, height);
  };

  /*
      * css-line-break 1.1.1 <https://github.com/niklasvh/css-line-break#readme>
      * Copyright (c) 2019 Niklas von Hertzen <https://hertzen.com>
      * Released under MIT License
      */
  var toCodePoints = function toCodePoints(str) {
    var codePoints = [];
    var i = 0;
    var length = str.length;
    while (i < length) {
      var value = str.charCodeAt(i++);
      if (value >= 0xd800 && value <= 0xdbff && i < length) {
        var extra = str.charCodeAt(i++);
        if ((extra & 0xfc00) === 0xdc00) {
          codePoints.push(((value & 0x3ff) << 10) + (extra & 0x3ff) + 0x10000);
        } else
        {
          codePoints.push(value);
          i--;
        }
      } else
      {
        codePoints.push(value);
      }
    }
    return codePoints;
  };
  var fromCodePoint = function fromCodePoint() {
    var codePoints = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      codePoints[_i] = arguments[_i];
    }
    if (String.fromCodePoint) {
      return String.fromCodePoint.apply(String, codePoints);
    }
    var length = codePoints.length;
    if (!length) {
      return '';
    }
    var codeUnits = [];
    var index = -1;
    var result = '';
    while (++index < length) {
      var codePoint = codePoints[index];
      if (codePoint <= 0xffff) {
        codeUnits.push(codePoint);
      } else
      {
        codePoint -= 0x10000;
        codeUnits.push((codePoint >> 10) + 0xd800, codePoint % 0x400 + 0xdc00);
      }
      if (index + 1 === length || codeUnits.length > 0x4000) {
        result += String.fromCharCode.apply(String, codeUnits);
        codeUnits.length = 0;
      }
    }
    return result;
  };
  var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  // Use a lookup table to find the index.
  var lookup = typeof Uint8Array === 'undefined' ? [] : new Uint8Array(256);
  for (var i = 0; i < chars.length; i++) {
    lookup[chars.charCodeAt(i)] = i;
  }
  var decode = function decode(base64) {
    var bufferLength = base64.length * 0.75,len = base64.length,i,p = 0,encoded1,encoded2,encoded3,encoded4;
    if (base64[base64.length - 1] === '=') {
      bufferLength--;
      if (base64[base64.length - 2] === '=') {
        bufferLength--;
      }
    }
    var buffer = typeof ArrayBuffer !== 'undefined' &&
    typeof Uint8Array !== 'undefined' &&
    typeof Uint8Array.prototype.slice !== 'undefined' ?
    new ArrayBuffer(bufferLength) :
    new Array(bufferLength);
    var bytes = Array.isArray(buffer) ? buffer : new Uint8Array(buffer);
    for (i = 0; i < len; i += 4) {
      encoded1 = lookup[base64.charCodeAt(i)];
      encoded2 = lookup[base64.charCodeAt(i + 1)];
      encoded3 = lookup[base64.charCodeAt(i + 2)];
      encoded4 = lookup[base64.charCodeAt(i + 3)];
      bytes[p++] = encoded1 << 2 | encoded2 >> 4;
      bytes[p++] = (encoded2 & 15) << 4 | encoded3 >> 2;
      bytes[p++] = (encoded3 & 3) << 6 | encoded4 & 63;
    }
    return buffer;
  };
  var polyUint16Array = function polyUint16Array(buffer) {
    var length = buffer.length;
    var bytes = [];
    for (var i = 0; i < length; i += 2) {
      bytes.push(buffer[i + 1] << 8 | buffer[i]);
    }
    return bytes;
  };
  var polyUint32Array = function polyUint32Array(buffer) {
    var length = buffer.length;
    var bytes = [];
    for (var i = 0; i < length; i += 4) {
      bytes.push(buffer[i + 3] << 24 | buffer[i + 2] << 16 | buffer[i + 1] << 8 | buffer[i]);
    }
    return bytes;
  };

  /** Shift size for getting the index-2 table offset. */
  var UTRIE2_SHIFT_2 = 5;
  /** Shift size for getting the index-1 table offset. */
  var UTRIE2_SHIFT_1 = 6 + 5;
  /**
                               * Shift size for shifting left the index array values.
                               * Increases possible data size with 16-bit index values at the cost
                               * of compactability.
                               * This requires data blocks to be aligned by UTRIE2_DATA_GRANULARITY.
                               */
  var UTRIE2_INDEX_SHIFT = 2;
  /**
                               * Difference between the two shift sizes,
                               * for getting an index-1 offset from an index-2 offset. 6=11-5
                               */
  var UTRIE2_SHIFT_1_2 = UTRIE2_SHIFT_1 - UTRIE2_SHIFT_2;
  /**
                                                           * The part of the index-2 table for U+D800..U+DBFF stores values for
                                                           * lead surrogate code _units_ not code _points_.
                                                           * Values for lead surrogate code _points_ are indexed with this portion of the table.
                                                           * Length=32=0x20=0x400>>UTRIE2_SHIFT_2. (There are 1024=0x400 lead surrogates.)
                                                           */
  var UTRIE2_LSCP_INDEX_2_OFFSET = 0x10000 >> UTRIE2_SHIFT_2;
  /** Number of entries in a data block. 32=0x20 */
  var UTRIE2_DATA_BLOCK_LENGTH = 1 << UTRIE2_SHIFT_2;
  /** Mask for getting the lower bits for the in-data-block offset. */
  var UTRIE2_DATA_MASK = UTRIE2_DATA_BLOCK_LENGTH - 1;
  var UTRIE2_LSCP_INDEX_2_LENGTH = 0x400 >> UTRIE2_SHIFT_2;
  /** Count the lengths of both BMP pieces. 2080=0x820 */
  var UTRIE2_INDEX_2_BMP_LENGTH = UTRIE2_LSCP_INDEX_2_OFFSET + UTRIE2_LSCP_INDEX_2_LENGTH;
  /**
                                                                                            * The 2-byte UTF-8 version of the index-2 table follows at offset 2080=0x820.
                                                                                            * Length 32=0x20 for lead bytes C0..DF, regardless of UTRIE2_SHIFT_2.
                                                                                            */
  var UTRIE2_UTF8_2B_INDEX_2_OFFSET = UTRIE2_INDEX_2_BMP_LENGTH;
  var UTRIE2_UTF8_2B_INDEX_2_LENGTH = 0x800 >> 6; /* U+0800 is the first code point after 2-byte UTF-8 */
  /**
                                                                                                           * The index-1 table, only used for supplementary code points, at offset 2112=0x840.
                                                                                                           * Variable length, for code points up to highStart, where the last single-value range starts.
                                                                                                           * Maximum length 512=0x200=0x100000>>UTRIE2_SHIFT_1.
                                                                                                           * (For 0x100000 supplementary code points U+10000..U+10ffff.)
                                                                                                           *
                                                                                                           * The part of the index-2 table for supplementary code points starts
                                                                                                           * after this index-1 table.
                                                                                                           *
                                                                                                           * Both the index-1 table and the following part of the index-2 table
                                                                                                           * are omitted completely if there is only BMP data.
                                                                                                           */
  var UTRIE2_INDEX_1_OFFSET = UTRIE2_UTF8_2B_INDEX_2_OFFSET + UTRIE2_UTF8_2B_INDEX_2_LENGTH;
  /**
                                                                                              * Number of index-1 entries for the BMP. 32=0x20
                                                                                              * This part of the index-1 table is omitted from the serialized form.
                                                                                              */
  var UTRIE2_OMITTED_BMP_INDEX_1_LENGTH = 0x10000 >> UTRIE2_SHIFT_1;
  /** Number of entries in an index-2 block. 64=0x40 */
  var UTRIE2_INDEX_2_BLOCK_LENGTH = 1 << UTRIE2_SHIFT_1_2;
  /** Mask for getting the lower bits for the in-index-2-block offset. */
  var UTRIE2_INDEX_2_MASK = UTRIE2_INDEX_2_BLOCK_LENGTH - 1;
  var slice16 = function slice16(view, start, end) {
    if (view.slice) {
      return view.slice(start, end);
    }
    return new Uint16Array(Array.prototype.slice.call(view, start, end));
  };
  var slice32 = function slice32(view, start, end) {
    if (view.slice) {
      return view.slice(start, end);
    }
    return new Uint32Array(Array.prototype.slice.call(view, start, end));
  };
  var createTrieFromBase64 = function createTrieFromBase64(base64) {
    var buffer = decode(base64);
    var view32 = Array.isArray(buffer) ? polyUint32Array(buffer) : new Uint32Array(buffer);
    var view16 = Array.isArray(buffer) ? polyUint16Array(buffer) : new Uint16Array(buffer);
    var headerLength = 24;
    var index = slice16(view16, headerLength / 2, view32[4] / 2);
    var data = view32[5] === 2 ?
    slice16(view16, (headerLength + view32[4]) / 2) :
    slice32(view32, Math.ceil((headerLength + view32[4]) / 4));
    return new Trie(view32[0], view32[1], view32[2], view32[3], index, data);
  };
  var Trie = /** @class */function () {
    function Trie(initialValue, errorValue, highStart, highValueIndex, index, data) {
      this.initialValue = initialValue;
      this.errorValue = errorValue;
      this.highStart = highStart;
      this.highValueIndex = highValueIndex;
      this.index = index;
      this.data = data;
    }
    /**
       * Get the value for a code point as stored in the Trie.
       *
       * @param codePoint the code point
       * @return the value
       */
    Trie.prototype.get = function (codePoint) {
      var ix;
      if (codePoint >= 0) {
        if (codePoint < 0x0d800 || codePoint > 0x0dbff && codePoint <= 0x0ffff) {
          // Ordinary BMP code point, excluding leading surrogates.
          // BMP uses a single level lookup.  BMP index starts at offset 0 in the Trie2 index.
          // 16 bit data is stored in the index array itself.
          ix = this.index[codePoint >> UTRIE2_SHIFT_2];
          ix = (ix << UTRIE2_INDEX_SHIFT) + (codePoint & UTRIE2_DATA_MASK);
          return this.data[ix];
        }
        if (codePoint <= 0xffff) {
          // Lead Surrogate Code Point.  A Separate index section is stored for
          // lead surrogate code units and code points.
          //   The main index has the code unit data.
          //   For this function, we need the code point data.
          // Note: this expression could be refactored for slightly improved efficiency, but
          //       surrogate code points will be so rare in practice that it's not worth it.
          ix = this.index[UTRIE2_LSCP_INDEX_2_OFFSET + (codePoint - 0xd800 >> UTRIE2_SHIFT_2)];
          ix = (ix << UTRIE2_INDEX_SHIFT) + (codePoint & UTRIE2_DATA_MASK);
          return this.data[ix];
        }
        if (codePoint < this.highStart) {
          // Supplemental code point, use two-level lookup.
          ix = UTRIE2_INDEX_1_OFFSET - UTRIE2_OMITTED_BMP_INDEX_1_LENGTH + (codePoint >> UTRIE2_SHIFT_1);
          ix = this.index[ix];
          ix += codePoint >> UTRIE2_SHIFT_2 & UTRIE2_INDEX_2_MASK;
          ix = this.index[ix];
          ix = (ix << UTRIE2_INDEX_SHIFT) + (codePoint & UTRIE2_DATA_MASK);
          return this.data[ix];
        }
        if (codePoint <= 0x10ffff) {
          return this.data[this.highValueIndex];
        }
      }
      // Fall through.  The code point is outside of the legal range of 0..0x10ffff.
      return this.errorValue;
    };
    return Trie;
  }();

  var base64 = 'KwAAAAAAAAAACA4AIDoAAPAfAAACAAAAAAAIABAAGABAAEgAUABYAF4AZgBeAGYAYABoAHAAeABeAGYAfACEAIAAiACQAJgAoACoAK0AtQC9AMUAXgBmAF4AZgBeAGYAzQDVAF4AZgDRANkA3gDmAOwA9AD8AAQBDAEUARoBIgGAAIgAJwEvATcBPwFFAU0BTAFUAVwBZAFsAXMBewGDATAAiwGTAZsBogGkAawBtAG8AcIBygHSAdoB4AHoAfAB+AH+AQYCDgIWAv4BHgImAi4CNgI+AkUCTQJTAlsCYwJrAnECeQKBAk0CiQKRApkCoQKoArACuALAAsQCzAIwANQC3ALkAjAA7AL0AvwCAQMJAxADGAMwACADJgMuAzYDPgOAAEYDSgNSA1IDUgNaA1oDYANiA2IDgACAAGoDgAByA3YDfgOAAIQDgACKA5IDmgOAAIAAogOqA4AAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAK8DtwOAAIAAvwPHA88D1wPfAyAD5wPsA/QD/AOAAIAABAQMBBIEgAAWBB4EJgQuBDMEIAM7BEEEXgBJBCADUQRZBGEEaQQwADAAcQQ+AXkEgQSJBJEEgACYBIAAoASoBK8EtwQwAL8ExQSAAIAAgACAAIAAgACgAM0EXgBeAF4AXgBeAF4AXgBeANUEXgDZBOEEXgDpBPEE+QQBBQkFEQUZBSEFKQUxBTUFPQVFBUwFVAVcBV4AYwVeAGsFcwV7BYMFiwWSBV4AmgWgBacFXgBeAF4AXgBeAKsFXgCyBbEFugW7BcIFwgXIBcIFwgXQBdQF3AXkBesF8wX7BQMGCwYTBhsGIwYrBjMGOwZeAD8GRwZNBl4AVAZbBl4AXgBeAF4AXgBeAF4AXgBeAF4AXgBeAGMGXgBqBnEGXgBeAF4AXgBeAF4AXgBeAF4AXgB5BoAG4wSGBo4GkwaAAIADHgR5AF4AXgBeAJsGgABGA4AAowarBrMGswagALsGwwbLBjAA0wbaBtoG3QbaBtoG2gbaBtoG2gblBusG8wb7BgMHCwcTBxsHCwcjBysHMAc1BzUHOgdCB9oGSgdSB1oHYAfaBloHaAfaBlIH2gbaBtoG2gbaBtoG2gbaBjUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHbQdeAF4ANQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQd1B30HNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1B4MH2gaKB68EgACAAIAAgACAAIAAgACAAI8HlwdeAJ8HpweAAIAArwe3B14AXgC/B8UHygcwANAH2AfgB4AA6AfwBz4B+AcACFwBCAgPCBcIogEYAR8IJwiAAC8INwg/CCADRwhPCFcIXwhnCEoDGgSAAIAAgABvCHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIfQh3CHgIeQh6CHsIfAh9CHcIeAh5CHoIewh8CH0Idwh4CHkIegh7CHwIhAiLCI4IMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlggwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAANQc1BzUHNQc1BzUHNQc1BzUHNQc1B54INQc1B6II2gaqCLIIugiAAIAAvgjGCIAAgACAAIAAgACAAIAAgACAAIAAywiHAYAA0wiAANkI3QjlCO0I9Aj8CIAAgACAAAIJCgkSCRoJIgknCTYHLwk3CZYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiWCJYIlgiAAIAAAAFAAXgBeAGAAcABeAHwAQACQAKAArQC9AJ4AXgBeAE0A3gBRAN4A7AD8AMwBGgEAAKcBNwEFAUwBXAF4QkhCmEKnArcCgAHHAsABz4LAAcABwAHAAd+C6ABoAG+C/4LAAcABwAHAAc+DF4MAAcAB54M3gweDV4Nng3eDaABoAGgAaABoAGgAaABoAGgAaABoAGgAaABoAGgAaABoAGgAaABoAEeDqABVg6WDqABoQ6gAaABoAHXDvcONw/3DvcO9w73DvcO9w73DvcO9w73DvcO9w73DvcO9w73DvcO9w73DvcO9w73DvcO9w73DvcO9w73DvcO9w73DncPAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcAB7cPPwlGCU4JMACAAIAAgABWCV4JYQmAAGkJcAl4CXwJgAkwADAAMAAwAIgJgACLCZMJgACZCZ8JowmrCYAAswkwAF4AXgB8AIAAuwkABMMJyQmAAM4JgADVCTAAMAAwADAAgACAAIAAgACAAIAAgACAAIAAqwYWBNkIMAAwADAAMADdCeAJ6AnuCR4E9gkwAP4JBQoNCjAAMACAABUK0wiAAB0KJAosCjQKgAAwADwKQwqAAEsKvQmdCVMKWwowADAAgACAALcEMACAAGMKgABrCjAAMAAwADAAMAAwADAAMAAwADAAMAAeBDAAMAAwADAAMAAwADAAMAAwADAAMAAwAIkEPQFzCnoKiQSCCooKkAqJBJgKoAqkCokEGAGsCrQKvArBCjAAMADJCtEKFQHZCuEK/gHpCvEKMAAwADAAMACAAIwE+QowAIAAPwEBCzAAMAAwADAAMACAAAkLEQswAIAAPwEZCyELgAAOCCkLMAAxCzkLMAAwADAAMAAwADAAXgBeAEELMAAwADAAMAAwADAAMAAwAEkLTQtVC4AAXAtkC4AAiQkwADAAMAAwADAAMAAwADAAbAtxC3kLgAuFC4sLMAAwAJMLlwufCzAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAApwswADAAMACAAIAAgACvC4AAgACAAIAAgACAALcLMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAvwuAAMcLgACAAIAAgACAAIAAyguAAIAAgACAAIAA0QswADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAANkLgACAAIAA4AswADAAMAAwADAAMAAwADAAMAAwADAAMAAwAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACJCR4E6AswADAAhwHwC4AA+AsADAgMEAwwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMACAAIAAGAwdDCUMMAAwAC0MNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQw1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHPQwwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADUHNQc1BzUHNQc1BzUHNQc2BzAAMAA5DDUHNQc1BzUHNQc1BzUHNQc1BzUHNQdFDDAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAgACAAIAATQxSDFoMMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAF4AXgBeAF4AXgBeAF4AYgxeAGoMXgBxDHkMfwxeAIUMXgBeAI0MMAAwADAAMAAwAF4AXgCVDJ0MMAAwADAAMABeAF4ApQxeAKsMswy7DF4Awgy9DMoMXgBeAF4AXgBeAF4AXgBeAF4AXgDRDNkMeQBqCeAM3Ax8AOYM7Az0DPgMXgBeAF4AXgBeAF4AXgBeAF4AXgBeAF4AXgBeAF4AXgCgAAANoAAHDQ4NFg0wADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAeDSYNMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAIAAgACAAIAAgACAAC4NMABeAF4ANg0wADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAD4NRg1ODVYNXg1mDTAAbQ0wADAAMAAwADAAMAAwADAA2gbaBtoG2gbaBtoG2gbaBnUNeg3CBYANwgWFDdoGjA3aBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gaUDZwNpA2oDdoG2gawDbcNvw3HDdoG2gbPDdYN3A3fDeYN2gbsDfMN2gbaBvoN/g3aBgYODg7aBl4AXgBeABYOXgBeACUG2gYeDl4AJA5eACwO2w3aBtoGMQ45DtoG2gbaBtoGQQ7aBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gZJDjUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1B1EO2gY1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQdZDjUHNQc1BzUHNQc1B2EONQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHaA41BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1B3AO2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gY1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1BzUHNQc1B2EO2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gZJDtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBtoG2gbaBkkOeA6gAKAAoAAwADAAMAAwAKAAoACgAKAAoACgAKAAgA4wADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAD//wQABAAEAAQABAAEAAQABAAEAA0AAwABAAEAAgAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAKABMAFwAeABsAGgAeABcAFgASAB4AGwAYAA8AGAAcAEsASwBLAEsASwBLAEsASwBLAEsAGAAYAB4AHgAeABMAHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAFgAbABIAHgAeAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQABYADQARAB4ABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsABAAEAAQABAAEAAUABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAkAFgAaABsAGwAbAB4AHQAdAB4ATwAXAB4ADQAeAB4AGgAbAE8ATwAOAFAAHQAdAB0ATwBPABcATwBPAE8AFgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAB4AHgAeAB4AUABQAFAAUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAB4AHgAeAFAATwBAAE8ATwBPAEAATwBQAFAATwBQAB4AHgAeAB4AHgAeAB0AHQAdAB0AHgAdAB4ADgBQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgBQAB4AUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAJAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAkACQAJAAkACQAJAAkABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgAeAFAAHgAeAB4AKwArAFAAUABQAFAAGABQACsAKwArACsAHgAeAFAAHgBQAFAAUAArAFAAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAEAAQABAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAUAAeAB4AHgAeAB4AHgArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwAYAA0AKwArAB4AHgAbACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQADQAEAB4ABAAEAB4ABAAEABMABAArACsAKwArACsAKwArACsAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAKwArACsAKwArAFYAVgBWAB4AHgArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AGgAaABoAGAAYAB4AHgAEAAQABAAEAAQABAAEAAQABAAEAAQAEwAEACsAEwATAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABLAEsASwBLAEsASwBLAEsASwBLABoAGQAZAB4AUABQAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQABMAUAAEAAQABAAEAAQABAAEAB4AHgAEAAQABAAEAAQABABQAFAABAAEAB4ABAAEAAQABABQAFAASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUAAeAB4AUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAFAABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQAUABQAB4AHgAYABMAUAArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAFAABAAEAAQABAAEAFAABAAEAAQAUAAEAAQABAAEAAQAKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAArACsAHgArAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABABQAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAFAABAAEAAQABAAEAAQABABQAFAAUABQAFAAUABQAFAAUABQAAQABAANAA0ASwBLAEsASwBLAEsASwBLAEsASwAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQAKwBQAFAAUABQAFAAUABQAFAAKwArAFAAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUAArAFAAKwArACsAUABQAFAAUAArACsABABQAAQABAAEAAQABAAEAAQAKwArAAQABAArACsABAAEAAQAUAArACsAKwArACsAKwArACsABAArACsAKwArAFAAUAArAFAAUABQAAQABAArACsASwBLAEsASwBLAEsASwBLAEsASwBQAFAAGgAaAFAAUABQAFAAUABMAB4AGwBQAB4AKwArACsABAAEAAQAKwBQAFAAUABQAFAAUAArACsAKwArAFAAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUAArAFAAUAArAFAAUAArAFAAUAArACsABAArAAQABAAEAAQABAArACsAKwArAAQABAArACsABAAEAAQAKwArACsABAArACsAKwArACsAKwArAFAAUABQAFAAKwBQACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwAEAAQAUABQAFAABAArACsAKwArACsAKwArACsAKwArACsABAAEAAQAKwBQAFAAUABQAFAAUABQAFAAUAArAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUAArAFAAUAArAFAAUABQAFAAUAArACsABABQAAQABAAEAAQABAAEAAQABAArAAQABAAEACsABAAEAAQAKwArAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAAQABAArACsASwBLAEsASwBLAEsASwBLAEsASwAeABsAKwArACsAKwArACsAKwBQAAQABAAEAAQABAAEACsABAAEAAQAKwBQAFAAUABQAFAAUABQAFAAKwArAFAAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQAKwArAAQABAArACsABAAEAAQAKwArACsAKwArACsAKwArAAQABAArACsAKwArAFAAUAArAFAAUABQAAQABAArACsASwBLAEsASwBLAEsASwBLAEsASwAeAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwAEAFAAKwBQAFAAUABQAFAAUAArACsAKwBQAFAAUAArAFAAUABQAFAAKwArACsAUABQACsAUAArAFAAUAArACsAKwBQAFAAKwArACsAUABQAFAAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwAEAAQABAAEAAQAKwArACsABAAEAAQAKwAEAAQABAAEACsAKwBQACsAKwArACsAKwArAAQAKwArACsAKwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLAFAAUABQAB4AHgAeAB4AHgAeABsAHgArACsAKwArACsABAAEAAQABAArAFAAUABQAFAAUABQAFAAUAArAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAFAABAAEAAQABAAEAAQABAArAAQABAAEACsABAAEAAQABAArACsAKwArACsAKwArAAQABAArAFAAUABQACsAKwArACsAKwBQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAB4AUAAEAAQABAArAFAAUABQAFAAUABQAFAAUAArAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQACsAKwAEAFAABAAEAAQABAAEAAQABAArAAQABAAEACsABAAEAAQABAArACsAKwArACsAKwArAAQABAArACsAKwArACsAKwArAFAAKwBQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAFAABAAEAAQABAAEAAQABAArAAQABAAEACsABAAEAAQABABQAB4AKwArACsAKwBQAFAAUAAEAFAAUABQAFAAUABQAFAAUABQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLAFAAUABQAFAAUABQAFAAUABQABoAUABQAFAAUABQAFAAKwArAAQABAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQACsAUAArACsAUABQAFAAUABQAFAAUAArACsAKwAEACsAKwArACsABAAEAAQABAAEAAQAKwAEACsABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArAAQABAAeACsAKwArACsAKwArACsAKwArACsAKwArAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAAqAFwAXAAqACoAKgAqACoAKgAqACsAKwArACsAGwBcAFwAXABcAFwAXABcACoAKgAqACoAKgAqACoAKgAeAEsASwBLAEsASwBLAEsASwBLAEsADQANACsAKwArACsAKwBcAFwAKwBcACsAKwBcAFwAKwBcACsAKwBcACsAKwArACsAKwArAFwAXABcAFwAKwBcAFwAXABcAFwAXABcACsAXABcAFwAKwBcACsAXAArACsAXABcACsAXABcAFwAXAAqAFwAXAAqACoAKgAqACoAKgArACoAKgBcACsAKwBcAFwAXABcAFwAKwBcACsAKgAqACoAKgAqACoAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArAFwAXABcAFwAUAAOAA4ADgAOAB4ADgAOAAkADgAOAA0ACQATABMAEwATABMACQAeABMAHgAeAB4ABAAEAB4AHgAeAB4AHgAeAEsASwBLAEsASwBLAEsASwBLAEsAUABQAFAAUABQAFAAUABQAFAAUAANAAQAHgAEAB4ABAAWABEAFgARAAQABABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAANAAQABAAEAAQABAANAAQABABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsADQANAB4AHgAeAB4AHgAeAAQAHgAeAB4AHgAeAB4AKwAeAB4ADgAOAA0ADgAeAB4AHgAeAB4ACQAJACsAKwArACsAKwBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqAFwASwBLAEsASwBLAEsASwBLAEsASwANAA0AHgAeAB4AHgBcAFwAXABcAFwAXAAqACoAKgAqAFwAXABcAFwAKgAqACoAXAAqACoAKgBcAFwAKgAqACoAKgAqACoAKgBcAFwAXAAqACoAKgAqAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKgAqACoAKgAqACoAKgAqACoAKgAqACoAXAAqAEsASwBLAEsASwBLAEsASwBLAEsAKgAqACoAKgAqACoAUABQAFAAUABQAFAAKwBQACsAKwArACsAKwBQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAFAAUABQAFAAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQACsAKwBQAFAAUABQAFAAUABQACsAUAArAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUAArACsAUABQAFAAUABQAFAAUAArAFAAKwBQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwAEAAQABAAeAA0AHgAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAB4AHgAeAB4AHgAeAB4AHgAeACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAFAAUABQAFAAUABQACsAKwANAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAA0AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQABYAEQArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAADQANAA0AUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAABAAEAAQAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAA0ADQArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQACsABAAEACsAKwArACsAKwArACsAKwArACsAKwArAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoADQANABUAXAANAB4ADQAbAFwAKgArACsASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArAB4AHgATABMADQANAA4AHgATABMAHgAEAAQABAAJACsASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAUABQAFAAUABQAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABABQACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwAeACsAKwArABMAEwBLAEsASwBLAEsASwBLAEsASwBLAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACsAKwBcAFwAXABcAFwAKwArACsAKwArACsAKwArACsAKwArAFwAXABcAFwAXABcAFwAXABcAFwAXABcACsAKwArACsAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwBcACsAKwArACoAKgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEACsAKwAeAB4AXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKgAqACoAKgAqACoAKgAqACoAKgArACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgArACsABABLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAKgAqACoAKgAqACoAKgBcACoAKgAqACoAKgAqACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArAAQABAAEAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQAUABQAFAAUABQAFAAUAArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsADQANAB4ADQANAA0ADQAeAB4AHgAeAB4AHgAeAB4AHgAeAAQABAAEAAQABAAEAAQABAAEAB4AHgAeAB4AHgAeAB4AHgAeACsAKwArAAQABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAUABQAEsASwBLAEsASwBLAEsASwBLAEsAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwArACsAKwArACsAHgAeAB4AHgBQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwANAA0ADQANAA0ASwBLAEsASwBLAEsASwBLAEsASwArACsAKwBQAFAAUABLAEsASwBLAEsASwBLAEsASwBLAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAANAA0AUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsABAAEAAQAHgAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAFAAUABQAFAABABQAFAAUABQAAQABAAEAFAAUAAEAAQABAArACsAKwArACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwAEAAQABAAEAAQAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAUABQAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUAArAFAAKwBQACsAUAArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAHgAeAB4AHgAeAB4AHgAeAFAAHgAeAB4AUABQAFAAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAUABQAFAAKwArAB4AHgAeAB4AHgAeACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAUABQAFAAKwAeAB4AHgAeAB4AHgAeAA4AHgArAA0ADQANAA0ADQANAA0ACQANAA0ADQAIAAQACwAEAAQADQAJAA0ADQAMAB0AHQAeABcAFwAWABcAFwAXABYAFwAdAB0AHgAeABQAFAAUAA0AAQABAAQABAAEAAQABAAJABoAGgAaABoAGgAaABoAGgAeABcAFwAdABUAFQAeAB4AHgAeAB4AHgAYABYAEQAVABUAFQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgANAB4ADQANAA0ADQAeAA0ADQANAAcAHgAeAB4AHgArAAQABAAEAAQABAAEAAQABAAEAAQAUABQACsAKwBPAFAAUABQAFAAUAAeAB4AHgAWABEATwBQAE8ATwBPAE8AUABQAFAAUABQAB4AHgAeABYAEQArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAGwAbABsAGwAbABsAGwAaABsAGwAbABsAGwAbABsAGwAbABsAGwAbABsAGwAaABsAGwAbABsAGgAbABsAGgAbABsAGwAbABsAGwAbABsAGwAbABsAGwAbABsAGwAbABsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAB4AHgBQABoAHgAdAB4AUAAeABoAHgAeAB4AHgAeAB4AHgAeAB4ATwAeAFAAGwAeAB4AUABQAFAAUABQAB4AHgAeAB0AHQAeAFAAHgBQAB4AUAAeAFAATwBQAFAAHgAeAB4AHgAeAB4AHgBQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAB4AUABQAFAAUABPAE8AUABQAFAAUABQAE8AUABQAE8AUABPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBQAFAAUABQAE8ATwBPAE8ATwBPAE8ATwBPAE8AUABQAFAAUABQAFAAUABQAFAAHgAeAFAAUABQAFAATwAeAB4AKwArACsAKwAdAB0AHQAdAB0AHQAdAB0AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB4AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAeAB0AHQAeAB4AHgAdAB0AHgAeAB0AHgAeAB4AHQAeAB0AGwAbAB4AHQAeAB4AHgAeAB0AHgAeAB0AHQAdAB0AHgAeAB0AHgAdAB4AHQAdAB0AHQAdAB0AHgAdAB4AHgAeAB4AHgAdAB0AHQAdAB4AHgAeAB4AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAeAB4AHgAdAB4AHgAeAB4AHgAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAdAB4AHgAdAB0AHQAdAB4AHgAdAB0AHgAeAB0AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHgAeAB0AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAeAB4AHQAeAB4AHgAeAB4AHgAeAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeABQAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAWABEAFgARAB4AHgAeAB4AHgAeAB0AHgAeAB4AHgAeAB4AHgAlACUAHgAeAB4AHgAeAB4AHgAeAB4AFgARAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBQAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB4AHgAeAB4AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHgAeAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHgAdAB0AHQAdAB0AHQAdAB4AHgAeAB4AHgAeAB4AHgAdAB0AHgAeAB0AHQAeAB4AHgAeAB0AHQAeAB4AHgAeAB0AHQAdAB4AHgAdAB4AHgAdAB0AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAdAB0AHQAeAB4AHgAeAB4AHgAeAB4AHgAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAeAB0AHQAeAB4AHQAeAB4AHgAeAB0AHQAeAB4AHgAeACUAJQAdAB0AJQAeACUAJQAlACAAJQAlAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAHgAeAB4AHgAdAB4AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAdAB4AHQAdAB0AHgAdACUAHQAdAB4AHQAdAB4AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAlACUAJQAlACUAJQAlACUAHQAdAB0AHQAlAB4AJQAlACUAHQAlACUAHQAdAB0AJQAlAB0AHQAlAB0AHQAlACUAJQAeAB0AHgAeAB4AHgAdAB0AJQAdAB0AHQAdAB0AHQAlACUAJQAlACUAHQAlACUAIAAlAB0AHQAlACUAJQAlACUAJQAlACUAHgAeAB4AJQAlACAAIAAgACAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB4AHgAeABcAFwAXABcAFwAXAB4AEwATACUAHgAeAB4AFgARABYAEQAWABEAFgARABYAEQAWABEAFgARAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAWABEAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AFgARABYAEQAWABEAFgARABYAEQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeABYAEQAWABEAFgARABYAEQAWABEAFgARABYAEQAWABEAFgARABYAEQAWABEAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AFgARABYAEQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeABYAEQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAdAB0AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwArAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAEAAQABAAeAB4AKwArACsAKwArABMADQANAA0AUAATAA0AUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAUAANACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAA0ADQANAA0ADQANAA0ADQAeAA0AFgANAB4AHgAXABcAHgAeABcAFwAWABEAFgARABYAEQAWABEADQANAA0ADQATAFAADQANAB4ADQANAB4AHgAeAB4AHgAMAAwADQANAA0AHgANAA0AFgANAA0ADQANAA0ADQANACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAKwArACsAKwArACsAKwArACsAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAlACUAJQAlACUAJQAlACUAJQAlACUAJQArACsAKwArAA0AEQARACUAJQBHAFcAVwAWABEAFgARABYAEQAWABEAFgARACUAJQAWABEAFgARABYAEQAWABEAFQAWABEAEQAlAFcAVwBXAFcAVwBXAFcAVwBXAAQABAAEAAQABAAEACUAVwBXAFcAVwA2ACUAJQBXAFcAVwBHAEcAJQAlACUAKwBRAFcAUQBXAFEAVwBRAFcAUQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFEAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBRAFcAUQBXAFEAVwBXAFcAVwBXAFcAUQBXAFcAVwBXAFcAVwBRAFEAKwArAAQABAAVABUARwBHAFcAFQBRAFcAUQBXAFEAVwBRAFcAUQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFEAVwBRAFcAUQBXAFcAVwBXAFcAVwBRAFcAVwBXAFcAVwBXAFEAUQBXAFcAVwBXABUAUQBHAEcAVwArACsAKwArACsAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwArAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwArACUAJQBXAFcAVwBXACUAJQAlACUAJQAlACUAJQAlACUAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwArACsAKwArACUAJQAlACUAKwArACsAKwArACsAKwArACsAKwArACsAUQBRAFEAUQBRAFEAUQBRAFEAUQBRAFEAUQBRAFEAUQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACsAVwBXAFcAVwBXAFcAVwBXAFcAVwAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAE8ATwBPAE8ATwBPAE8ATwAlAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQAlACUAJQAlACUAJQAlACUAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAEcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAADQATAA0AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABLAEsASwBLAEsASwBLAEsASwBLAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAABAAEAAQABAAeAAQABAAEAAQABAAEAAQABAAEAAQAHgBQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AUABQAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAeAA0ADQANAA0ADQArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAB4AHgAeAB4AHgAeAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAAQAUABQAFAABABQAFAAUABQAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAeAB4AHgAeACsAKwArACsAUABQAFAAUABQAFAAHgAeABoAHgArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAADgAOABMAEwArACsAKwArACsAKwArACsABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwANAA0ASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAFAAUAAeAB4AHgBQAA4AUAArACsAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAA0ADQBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArACsAKwArACsAKwArAB4AWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYACsAKwArAAQAHgAeAB4AHgAeAB4ADQANAA0AHgAeAB4AHgArAFAASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArAB4AHgBcAFwAXABcAFwAKgBcAFwAXABcAFwAXABcAFwAXABcAEsASwBLAEsASwBLAEsASwBLAEsAXABcAFwAXABcACsAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArAFAAUABQAAQAUABQAFAAUABQAFAAUABQAAQABAArACsASwBLAEsASwBLAEsASwBLAEsASwArACsAHgANAA0ADQBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKgAqACoAXAAqACoAKgBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAAqAFwAKgAqACoAXABcACoAKgBcAFwAXABcAFwAKgAqAFwAKgBcACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFwAXABcACoAKgBQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAA0ADQBQAFAAUAAEAAQAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUAArACsAUABQAFAAUABQAFAAKwArAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQADQAEAAQAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAVABVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBUAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVACsAKwArACsAKwArACsAKwArACsAKwArAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAKwArACsAKwBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAKwArACsAKwAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAKwArACsAKwArAFYABABWAFYAVgBWAFYAVgBWAFYAVgBWAB4AVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgArAFYAVgBWAFYAVgArAFYAKwBWAFYAKwBWAFYAKwBWAFYAVgBWAFYAVgBWAFYAVgBWAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAEQAWAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUAAaAB4AKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAGAARABEAGAAYABMAEwAWABEAFAArACsAKwArACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACUAJQAlACUAJQAWABEAFgARABYAEQAWABEAFgARABYAEQAlACUAFgARACUAJQAlACUAJQAlACUAEQAlABEAKwAVABUAEwATACUAFgARABYAEQAWABEAJQAlACUAJQAlACUAJQAlACsAJQAbABoAJQArACsAKwArAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAcAKwATACUAJQAbABoAJQAlABYAEQAlACUAEQAlABEAJQBXAFcAVwBXAFcAVwBXAFcAVwBXABUAFQAlACUAJQATACUAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXABYAJQARACUAJQAlAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwAWACUAEQAlABYAEQARABYAEQARABUAVwBRAFEAUQBRAFEAUQBRAFEAUQBRAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAEcARwArACsAVwBXAFcAVwBXAFcAKwArAFcAVwBXAFcAVwBXACsAKwBXAFcAVwBXAFcAVwArACsAVwBXAFcAKwArACsAGgAbACUAJQAlABsAGwArAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwAEAAQABAAQAB0AKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsADQANAA0AKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAB4AHgAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsADQBQAFAAUABQACsAKwArACsAUABQAFAAUABQAFAAUABQAA0AUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUAArACsAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQACsAKwArAFAAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAA0AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgBQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsADQBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwBQAFAAUABQAFAABAAEAAQAKwAEAAQAKwArACsAKwArAAQABAAEAAQAUABQAFAAUAArAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsABAAEAAQAKwArACsAKwAEAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsADQANAA0ADQANAA0ADQANAB4AKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AUABQAFAAUABQAFAAUABQAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEACsAKwArACsAUABQAFAAUABQAA0ADQANAA0ADQANABQAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwANAA0ADQANAA0ADQANAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAHgAeAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwBQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAA0ADQAeAB4AHgAeAB4AKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgANAA0ADQANACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAKwArAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsASwBLAEsASwBLAEsASwBLAEsASwANAA0ADQANACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAeAA4AUAArACsAKwArACsAKwArACsAKwAEAFAAUABQAFAADQANAB4ADQAeAAQABAAEAB4AKwArAEsASwBLAEsASwBLAEsASwBLAEsAUAAOAFAADQANAA0AKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAANAA0AHgANAA0AHgAEACsAUABQAFAAUABQAFAAUAArAFAAKwBQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAA0AKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsABAAEAAQABAArAFAAUABQAFAAUABQAFAAUAArACsAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAArACsABAAEACsAKwAEAAQABAArACsAUAArACsAKwArACsAKwAEACsAKwArACsAKwBQAFAAUABQAFAABAAEACsAKwAEAAQABAAEAAQABAAEACsAKwArAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwArACsABAAEAAQABAAEAAQABABQAFAAUABQAA0ADQANAA0AHgBLAEsASwBLAEsASwBLAEsASwBLACsADQArAB4AKwArAAQABAAEAAQAUABQAB4AUAArACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEACsAKwAEAAQABAAEAAQABAAEAAQABAAOAA0ADQATABMAHgAeAB4ADQANAA0ADQANAA0ADQANAA0ADQANAA0ADQANAA0AUABQAFAAUAAEAAQAKwArAAQADQANAB4AUAArACsAKwArACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAArACsAKwAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAXABcAA0ADQANACoASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwBQAFAABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAFAABAAEAAQABAAOAB4ADQANAA0ADQAOAB4ABAArACsAKwArACsAKwArACsAUAAEAAQABAAEAAQABAAEAAQABAAEAAQAUABQAFAAUAArACsAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAA0ADQANACsADgAOAA4ADQANACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEACsABAAEAAQABAAEAAQABAAEAFAADQANAA0ADQANACsAKwArACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwAOABMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQACsAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAArACsAKwAEACsABAAEACsABAAEAAQABAAEAAQABABQAAQAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsADQANAA0ADQANACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAASABIAEgAQwBDAEMAUABQAFAAUABDAFAAUABQAEgAQwBIAEMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAASABDAEMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABIAEMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwANAA0AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAQABAAEAAQABAANACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAA0ADQANAB4AHgAeAB4AHgAeAFAAUABQAFAADQAeACsAKwArACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsABAAEAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAEcARwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwArACsAKwArACsAKwArACsAKwArACsAKwArAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQACsAKwAeAAQABAANAAQABAAEAAQAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAEAB4AHgAeAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAHgAeAAQABAAEAAQABAAEAAQAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAEAAQABAAEAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAB4AHgAEAAQABAAeACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAFAAUAArACsAUAArACsAUABQACsAKwBQAFAAUABQACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwBQACsAUABQAFAAUABQAFAAUAArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAKwAeAB4AUABQAFAAUABQACsAUAArACsAKwBQAFAAUABQAFAAUABQACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AKwArAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAB4AHgAeAB4ABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAB4AHgAeAB4AHgAeAB4AHgAEAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAeAB4ADQANAA0ADQAeACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsABAAEAAQABAAEAAQABAArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsABAAEAAQABAAEAAQABAArAAQABAArAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAEAAQABAAEAAQABAAEACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAFgAWAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUAArAFAAKwArAFAAKwBQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUAArAFAAKwBQACsAKwArACsAKwArAFAAKwArACsAKwBQACsAUAArAFAAKwBQAFAAUAArAFAAUAArAFAAKwArAFAAKwBQACsAUAArAFAAKwBQACsAUABQACsAUAArACsAUABQAFAAUAArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQACsAUABQAFAAUAArAFAAKwBQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwBQAFAAUAArAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwArACsATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwAlACUAJQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAeACUAHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHgAeACUAJQAlACUAHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQAlACUAJQAlACUAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAB4AHgAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAeACUAJQAlACUAJQAeACUAJQAlACUAJQAgACAAIAAlACUAIAAlACUAIAAgACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAIQAhACEAIQAhACUAJQAgACAAJQAlACAAIAAgACAAIAAgACAAIAAgACAAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAIAAgACAAIAAlACUAJQAlACAAJQAgACAAIAAgACAAIAAgACAAIAAlACUAJQAgACUAJQAlACUAIAAgACAAJQAgACAAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeACUAHgAlAB4AJQAlACUAJQAlACAAJQAlACUAJQAeACUAHgAeACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAIAAgACUAJQAlACUAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAIAAlACUAJQAlACAAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAIAAgACAAJQAlACUAIAAgACAAIAAgAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AFwAXABcAFQAVABUAHgAeAB4AHgAlACUAJQAgACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAIAAgACAAJQAlACUAJQAlACUAJQAlACUAIAAlACUAJQAlACUAJQAlACUAJQAlACUAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAlACUAJQAlAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAgACAAIAAlACAAIAAlACUAJQAlACUAJQAgACUAJQAlACUAJQAlACUAJQAlACAAIAAgACAAIAAgACAAIAAgACAAJQAlACUAIAAgACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACsAKwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAJQAlACUAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAJQAlACUAJQAlAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQArAAQAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsA';

  /* @flow */
  var LETTER_NUMBER_MODIFIER = 50;
  // Non-tailorable Line Breaking Classes
  var BK = 1; //  Cause a line break (after)
  var CR = 2; //  Cause a line break (after), except between CR and LF
  var LF = 3; //  Cause a line break (after)
  var CM = 4; //  Prohibit a line break between the character and the preceding character
  var NL = 5; //  Cause a line break (after)
  var WJ = 7; //  Prohibit line breaks before and after
  var ZW = 8; //  Provide a break opportunity
  var GL = 9; //  Prohibit line breaks before and after
  var SP = 10; // Enable indirect line breaks
  var ZWJ = 11; // Prohibit line breaks within joiner sequences
  // Break Opportunities
  var B2 = 12; //  Provide a line break opportunity before and after the character
  var BA = 13; //  Generally provide a line break opportunity after the character
  var BB = 14; //  Generally provide a line break opportunity before the character
  var HY = 15; //  Provide a line break opportunity after the character, except in numeric context
  var CB = 16; //   Provide a line break opportunity contingent on additional information
  // Characters Prohibiting Certain Breaks
  var CL = 17; //  Prohibit line breaks before
  var CP = 18; //  Prohibit line breaks before
  var EX = 19; //  Prohibit line breaks before
  var IN = 20; //  Allow only indirect line breaks between pairs
  var NS = 21; //  Allow only indirect line breaks before
  var OP = 22; //  Prohibit line breaks after
  var QU = 23; //  Act like they are both opening and closing
  // Numeric Context
  var IS = 24; //  Prevent breaks after any and before numeric
  var NU = 25; //  Form numeric expressions for line breaking purposes
  var PO = 26; //  Do not break following a numeric expression
  var PR = 27; //  Do not break in front of a numeric expression
  var SY = 28; //  Prevent a break before; and allow a break after
  // Other Characters
  var AI = 29; //  Act like AL when the resolvedEAW is N; otherwise; act as ID
  var AL = 30; //  Are alphabetic characters or symbols that are used with alphabetic characters
  var CJ = 31; //  Treat as NS or ID for strict or normal breaking.
  var EB = 32; //  Do not break from following Emoji Modifier
  var EM = 33; //  Do not break from preceding Emoji Base
  var H2 = 34; //  Form Korean syllable blocks
  var H3 = 35; //  Form Korean syllable blocks
  var HL = 36; //  Do not break around a following hyphen; otherwise act as Alphabetic
  var ID = 37; //  Break before or after; except in some numeric context
  var JL = 38; //  Form Korean syllable blocks
  var JV = 39; //  Form Korean syllable blocks
  var JT = 40; //  Form Korean syllable blocks
  var RI = 41; //  Keep pairs together. For pairs; break before and after other classes
  var SA = 42; //  Provide a line break opportunity contingent on additional, language-specific context analysis
  var XX = 43; //  Have as yet unknown line breaking behavior or unassigned code positions
  var BREAK_MANDATORY = '!';
  var BREAK_NOT_ALLOWED = '×';
  var BREAK_ALLOWED = '÷';
  var UnicodeTrie = createTrieFromBase64(base64);
  var ALPHABETICS = [AL, HL];
  var HARD_LINE_BREAKS = [BK, CR, LF, NL];
  var SPACE = [SP, ZW];
  var PREFIX_POSTFIX = [PR, PO];
  var LINE_BREAKS = HARD_LINE_BREAKS.concat(SPACE);
  var KOREAN_SYLLABLE_BLOCK = [JL, JV, JT, H2, H3];
  var HYPHEN = [HY, BA];
  var codePointsToCharacterClasses = function codePointsToCharacterClasses(codePoints, lineBreak) {
    if (lineBreak === void 0) {lineBreak = 'strict';}
    var types = [];
    var indicies = [];
    var categories = [];
    codePoints.forEach(function (codePoint, index) {
      var classType = UnicodeTrie.get(codePoint);
      if (classType > LETTER_NUMBER_MODIFIER) {
        categories.push(true);
        classType -= LETTER_NUMBER_MODIFIER;
      } else
      {
        categories.push(false);
      }
      if (['normal', 'auto', 'loose'].indexOf(lineBreak) !== -1) {
        // U+2010, – U+2013, 〜 U+301C, ゠ U+30A0
        if ([0x2010, 0x2013, 0x301c, 0x30a0].indexOf(codePoint) !== -1) {
          indicies.push(index);
          return types.push(CB);
        }
      }
      if (classType === CM || classType === ZWJ) {
        // LB10 Treat any remaining combining mark or ZWJ as AL.
        if (index === 0) {
          indicies.push(index);
          return types.push(AL);
        }
        // LB9 Do not break a combining character sequence; treat it as if it has the line breaking class of
        // the base character in all of the following rules. Treat ZWJ as if it were CM.
        var prev = types[index - 1];
        if (LINE_BREAKS.indexOf(prev) === -1) {
          indicies.push(indicies[index - 1]);
          return types.push(prev);
        }
        indicies.push(index);
        return types.push(AL);
      }
      indicies.push(index);
      if (classType === CJ) {
        return types.push(lineBreak === 'strict' ? NS : ID);
      }
      if (classType === SA) {
        return types.push(AL);
      }
      if (classType === AI) {
        return types.push(AL);
      }
      // For supplementary characters, a useful default is to treat characters in the range 10000..1FFFD as AL
      // and characters in the ranges 20000..2FFFD and 30000..3FFFD as ID, until the implementation can be revised
      // to take into account the actual line breaking properties for these characters.
      if (classType === XX) {
        if (codePoint >= 0x20000 && codePoint <= 0x2fffd || codePoint >= 0x30000 && codePoint <= 0x3fffd) {
          return types.push(ID);
        } else
        {
          return types.push(AL);
        }
      }
      types.push(classType);
    });
    return [indicies, types, categories];
  };
  var isAdjacentWithSpaceIgnored = function isAdjacentWithSpaceIgnored(a, b, currentIndex, classTypes) {
    var current = classTypes[currentIndex];
    if (Array.isArray(a) ? a.indexOf(current) !== -1 : a === current) {
      var i = currentIndex;
      while (i <= classTypes.length) {
        i++;
        var next = classTypes[i];
        if (next === b) {
          return true;
        }
        if (next !== SP) {
          break;
        }
      }
    }
    if (current === SP) {
      var i = currentIndex;
      while (i > 0) {
        i--;
        var prev = classTypes[i];
        if (Array.isArray(a) ? a.indexOf(prev) !== -1 : a === prev) {
          var n = currentIndex;
          while (n <= classTypes.length) {
            n++;
            var next = classTypes[n];
            if (next === b) {
              return true;
            }
            if (next !== SP) {
              break;
            }
          }
        }
        if (prev !== SP) {
          break;
        }
      }
    }
    return false;
  };
  var previousNonSpaceClassType = function previousNonSpaceClassType(currentIndex, classTypes) {
    var i = currentIndex;
    while (i >= 0) {
      var type = classTypes[i];
      if (type === SP) {
        i--;
      } else
      {
        return type;
      }
    }
    return 0;
  };
  var _lineBreakAtIndex = function _lineBreakAtIndex(codePoints, classTypes, indicies, index, forbiddenBreaks) {
    if (indicies[index] === 0) {
      return BREAK_NOT_ALLOWED;
    }
    var currentIndex = index - 1;
    if (Array.isArray(forbiddenBreaks) && forbiddenBreaks[currentIndex] === true) {
      return BREAK_NOT_ALLOWED;
    }
    var beforeIndex = currentIndex - 1;
    var afterIndex = currentIndex + 1;
    var current = classTypes[currentIndex];
    // LB4 Always break after hard line breaks.
    // LB5 Treat CR followed by LF, as well as CR, LF, and NL as hard line breaks.
    var before = beforeIndex >= 0 ? classTypes[beforeIndex] : 0;
    var next = classTypes[afterIndex];
    if (current === CR && next === LF) {
      return BREAK_NOT_ALLOWED;
    }
    if (HARD_LINE_BREAKS.indexOf(current) !== -1) {
      return BREAK_MANDATORY;
    }
    // LB6 Do not break before hard line breaks.
    if (HARD_LINE_BREAKS.indexOf(next) !== -1) {
      return BREAK_NOT_ALLOWED;
    }
    // LB7 Do not break before spaces or zero width space.
    if (SPACE.indexOf(next) !== -1) {
      return BREAK_NOT_ALLOWED;
    }
    // LB8 Break before any character following a zero-width space, even if one or more spaces intervene.
    if (previousNonSpaceClassType(currentIndex, classTypes) === ZW) {
      return BREAK_ALLOWED;
    }
    // LB8a Do not break between a zero width joiner and an ideograph, emoji base or emoji modifier.
    if (UnicodeTrie.get(codePoints[currentIndex]) === ZWJ && (next === ID || next === EB || next === EM)) {
      return BREAK_NOT_ALLOWED;
    }
    // LB11 Do not break before or after Word joiner and related characters.
    if (current === WJ || next === WJ) {
      return BREAK_NOT_ALLOWED;
    }
    // LB12 Do not break after NBSP and related characters.
    if (current === GL) {
      return BREAK_NOT_ALLOWED;
    }
    // LB12a Do not break before NBSP and related characters, except after spaces and hyphens.
    if ([SP, BA, HY].indexOf(current) === -1 && next === GL) {
      return BREAK_NOT_ALLOWED;
    }
    // LB13 Do not break before ‘]’ or ‘!’ or ‘;’ or ‘/’, even after spaces.
    if ([CL, CP, EX, IS, SY].indexOf(next) !== -1) {
      return BREAK_NOT_ALLOWED;
    }
    // LB14 Do not break after ‘[’, even after spaces.
    if (previousNonSpaceClassType(currentIndex, classTypes) === OP) {
      return BREAK_NOT_ALLOWED;
    }
    // LB15 Do not break within ‘”[’, even with intervening spaces.
    if (isAdjacentWithSpaceIgnored(QU, OP, currentIndex, classTypes)) {
      return BREAK_NOT_ALLOWED;
    }
    // LB16 Do not break between closing punctuation and a nonstarter (lb=NS), even with intervening spaces.
    if (isAdjacentWithSpaceIgnored([CL, CP], NS, currentIndex, classTypes)) {
      return BREAK_NOT_ALLOWED;
    }
    // LB17 Do not break within ‘——’, even with intervening spaces.
    if (isAdjacentWithSpaceIgnored(B2, B2, currentIndex, classTypes)) {
      return BREAK_NOT_ALLOWED;
    }
    // LB18 Break after spaces.
    if (current === SP) {
      return BREAK_ALLOWED;
    }
    // LB19 Do not break before or after quotation marks, such as ‘ ” ’.
    if (current === QU || next === QU) {
      return BREAK_NOT_ALLOWED;
    }
    // LB20 Break before and after unresolved CB.
    if (next === CB || current === CB) {
      return BREAK_ALLOWED;
    }
    // LB21 Do not break before hyphen-minus, other hyphens, fixed-width spaces, small kana, and other non-starters, or after acute accents.
    if ([BA, HY, NS].indexOf(next) !== -1 || current === BB) {
      return BREAK_NOT_ALLOWED;
    }
    // LB21a Don't break after Hebrew + Hyphen.
    if (before === HL && HYPHEN.indexOf(current) !== -1) {
      return BREAK_NOT_ALLOWED;
    }
    // LB21b Don’t break between Solidus and Hebrew letters.
    if (current === SY && next === HL) {
      return BREAK_NOT_ALLOWED;
    }
    // LB22 Do not break between two ellipses, or between letters, numbers or exclamations and ellipsis.
    if (next === IN && ALPHABETICS.concat(IN, EX, NU, ID, EB, EM).indexOf(current) !== -1) {
      return BREAK_NOT_ALLOWED;
    }
    // LB23 Do not break between digits and letters.
    if (ALPHABETICS.indexOf(next) !== -1 && current === NU || ALPHABETICS.indexOf(current) !== -1 && next === NU) {
      return BREAK_NOT_ALLOWED;
    }
    // LB23a Do not break between numeric prefixes and ideographs, or between ideographs and numeric postfixes.
    if (current === PR && [ID, EB, EM].indexOf(next) !== -1 ||
    [ID, EB, EM].indexOf(current) !== -1 && next === PO) {
      return BREAK_NOT_ALLOWED;
    }
    // LB24 Do not break between numeric prefix/postfix and letters, or between letters and prefix/postfix.
    if (ALPHABETICS.indexOf(current) !== -1 && PREFIX_POSTFIX.indexOf(next) !== -1 ||
    PREFIX_POSTFIX.indexOf(current) !== -1 && ALPHABETICS.indexOf(next) !== -1) {
      return BREAK_NOT_ALLOWED;
    }
    // LB25 Do not break between the following pairs of classes relevant to numbers:
    if (
    // (PR | PO) × ( OP | HY )? NU
    [PR, PO].indexOf(current) !== -1 && (
    next === NU || [OP, HY].indexOf(next) !== -1 && classTypes[afterIndex + 1] === NU) ||
    // ( OP | HY ) × NU
    [OP, HY].indexOf(current) !== -1 && next === NU ||
    // NU ×	(NU | SY | IS)
    current === NU && [NU, SY, IS].indexOf(next) !== -1) {
      return BREAK_NOT_ALLOWED;
    }
    // NU (NU | SY | IS)* × (NU | SY | IS | CL | CP)
    if ([NU, SY, IS, CL, CP].indexOf(next) !== -1) {
      var prevIndex = currentIndex;
      while (prevIndex >= 0) {
        var type = classTypes[prevIndex];
        if (type === NU) {
          return BREAK_NOT_ALLOWED;
        } else
        if ([SY, IS].indexOf(type) !== -1) {
          prevIndex--;
        } else
        {
          break;
        }
      }
    }
    // NU (NU | SY | IS)* (CL | CP)? × (PO | PR))
    if ([PR, PO].indexOf(next) !== -1) {
      var prevIndex = [CL, CP].indexOf(current) !== -1 ? beforeIndex : currentIndex;
      while (prevIndex >= 0) {
        var type = classTypes[prevIndex];
        if (type === NU) {
          return BREAK_NOT_ALLOWED;
        } else
        if ([SY, IS].indexOf(type) !== -1) {
          prevIndex--;
        } else
        {
          break;
        }
      }
    }
    // LB26 Do not break a Korean syllable.
    if (JL === current && [JL, JV, H2, H3].indexOf(next) !== -1 ||
    [JV, H2].indexOf(current) !== -1 && [JV, JT].indexOf(next) !== -1 ||
    [JT, H3].indexOf(current) !== -1 && next === JT) {
      return BREAK_NOT_ALLOWED;
    }
    // LB27 Treat a Korean Syllable Block the same as ID.
    if (KOREAN_SYLLABLE_BLOCK.indexOf(current) !== -1 && [IN, PO].indexOf(next) !== -1 ||
    KOREAN_SYLLABLE_BLOCK.indexOf(next) !== -1 && current === PR) {
      return BREAK_NOT_ALLOWED;
    }
    // LB28 Do not break between alphabetics (“at”).
    if (ALPHABETICS.indexOf(current) !== -1 && ALPHABETICS.indexOf(next) !== -1) {
      return BREAK_NOT_ALLOWED;
    }
    // LB29 Do not break between numeric punctuation and alphabetics (“e.g.”).
    if (current === IS && ALPHABETICS.indexOf(next) !== -1) {
      return BREAK_NOT_ALLOWED;
    }
    // LB30 Do not break between letters, numbers, or ordinary symbols and opening or closing parentheses.
    if (ALPHABETICS.concat(NU).indexOf(current) !== -1 && next === OP ||
    ALPHABETICS.concat(NU).indexOf(next) !== -1 && current === CP) {
      return BREAK_NOT_ALLOWED;
    }
    // LB30a Break between two regional indicator symbols if and only if there are an even number of regional
    // indicators preceding the position of the break.
    if (current === RI && next === RI) {
      var i = indicies[currentIndex];
      var count = 1;
      while (i > 0) {
        i--;
        if (classTypes[i] === RI) {
          count++;
        } else
        {
          break;
        }
      }
      if (count % 2 !== 0) {
        return BREAK_NOT_ALLOWED;
      }
    }
    // LB30b Do not break between an emoji base and an emoji modifier.
    if (current === EB && next === EM) {
      return BREAK_NOT_ALLOWED;
    }
    return BREAK_ALLOWED;
  };
  var cssFormattedClasses = function cssFormattedClasses(codePoints, options) {
    if (!options) {
      options = { lineBreak: 'normal', wordBreak: 'normal' };
    }
    var _a = codePointsToCharacterClasses(codePoints, options.lineBreak),indicies = _a[0],classTypes = _a[1],isLetterNumber = _a[2];
    if (options.wordBreak === 'break-all' || options.wordBreak === 'break-word') {
      classTypes = classTypes.map(function (type) {return [NU, AL, SA].indexOf(type) !== -1 ? ID : type;});
    }
    var forbiddenBreakpoints = options.wordBreak === 'keep-all' ?
    isLetterNumber.map(function (letterNumber, i) {
      return letterNumber && codePoints[i] >= 0x4e00 && codePoints[i] <= 0x9fff;
    }) :
    undefined;
    return [indicies, classTypes, forbiddenBreakpoints];
  };
  var Break = /** @class */function () {
    function Break(codePoints, lineBreak, start, end) {
      this.codePoints = codePoints;
      this.required = lineBreak === BREAK_MANDATORY;
      this.start = start;
      this.end = end;
    }
    Break.prototype.slice = function () {
      return fromCodePoint.apply(void 0, this.codePoints.slice(this.start, this.end));
    };
    return Break;
  }();
  var LineBreaker = function LineBreaker(str, options) {
    var codePoints = toCodePoints(str);
    var _a = cssFormattedClasses(codePoints, options),indicies = _a[0],classTypes = _a[1],forbiddenBreakpoints = _a[2];
    var length = codePoints.length;
    var lastEnd = 0;
    var nextIndex = 0;
    return {
      next: function next() {
        if (nextIndex >= length) {
          return { done: true, value: null };
        }
        var lineBreak = BREAK_NOT_ALLOWED;
        while (nextIndex < length &&
        (lineBreak = _lineBreakAtIndex(codePoints, classTypes, indicies, ++nextIndex, forbiddenBreakpoints)) ===
        BREAK_NOT_ALLOWED) {}
        if (lineBreak !== BREAK_NOT_ALLOWED || nextIndex === length) {
          var value = new Break(codePoints, lineBreak, lastEnd, nextIndex);
          lastEnd = nextIndex;
          return { value: value, done: false };
        }
        return { done: true, value: null };
      } };

  };

  // https://www.w3.org/TR/css-syntax-3
  var TokenType;
  (function (TokenType) {
    TokenType[TokenType["STRING_TOKEN"] = 0] = "STRING_TOKEN";
    TokenType[TokenType["BAD_STRING_TOKEN"] = 1] = "BAD_STRING_TOKEN";
    TokenType[TokenType["LEFT_PARENTHESIS_TOKEN"] = 2] = "LEFT_PARENTHESIS_TOKEN";
    TokenType[TokenType["RIGHT_PARENTHESIS_TOKEN"] = 3] = "RIGHT_PARENTHESIS_TOKEN";
    TokenType[TokenType["COMMA_TOKEN"] = 4] = "COMMA_TOKEN";
    TokenType[TokenType["HASH_TOKEN"] = 5] = "HASH_TOKEN";
    TokenType[TokenType["DELIM_TOKEN"] = 6] = "DELIM_TOKEN";
    TokenType[TokenType["AT_KEYWORD_TOKEN"] = 7] = "AT_KEYWORD_TOKEN";
    TokenType[TokenType["PREFIX_MATCH_TOKEN"] = 8] = "PREFIX_MATCH_TOKEN";
    TokenType[TokenType["DASH_MATCH_TOKEN"] = 9] = "DASH_MATCH_TOKEN";
    TokenType[TokenType["INCLUDE_MATCH_TOKEN"] = 10] = "INCLUDE_MATCH_TOKEN";
    TokenType[TokenType["LEFT_CURLY_BRACKET_TOKEN"] = 11] = "LEFT_CURLY_BRACKET_TOKEN";
    TokenType[TokenType["RIGHT_CURLY_BRACKET_TOKEN"] = 12] = "RIGHT_CURLY_BRACKET_TOKEN";
    TokenType[TokenType["SUFFIX_MATCH_TOKEN"] = 13] = "SUFFIX_MATCH_TOKEN";
    TokenType[TokenType["SUBSTRING_MATCH_TOKEN"] = 14] = "SUBSTRING_MATCH_TOKEN";
    TokenType[TokenType["DIMENSION_TOKEN"] = 15] = "DIMENSION_TOKEN";
    TokenType[TokenType["PERCENTAGE_TOKEN"] = 16] = "PERCENTAGE_TOKEN";
    TokenType[TokenType["NUMBER_TOKEN"] = 17] = "NUMBER_TOKEN";
    TokenType[TokenType["FUNCTION"] = 18] = "FUNCTION";
    TokenType[TokenType["FUNCTION_TOKEN"] = 19] = "FUNCTION_TOKEN";
    TokenType[TokenType["IDENT_TOKEN"] = 20] = "IDENT_TOKEN";
    TokenType[TokenType["COLUMN_TOKEN"] = 21] = "COLUMN_TOKEN";
    TokenType[TokenType["URL_TOKEN"] = 22] = "URL_TOKEN";
    TokenType[TokenType["BAD_URL_TOKEN"] = 23] = "BAD_URL_TOKEN";
    TokenType[TokenType["CDC_TOKEN"] = 24] = "CDC_TOKEN";
    TokenType[TokenType["CDO_TOKEN"] = 25] = "CDO_TOKEN";
    TokenType[TokenType["COLON_TOKEN"] = 26] = "COLON_TOKEN";
    TokenType[TokenType["SEMICOLON_TOKEN"] = 27] = "SEMICOLON_TOKEN";
    TokenType[TokenType["LEFT_SQUARE_BRACKET_TOKEN"] = 28] = "LEFT_SQUARE_BRACKET_TOKEN";
    TokenType[TokenType["RIGHT_SQUARE_BRACKET_TOKEN"] = 29] = "RIGHT_SQUARE_BRACKET_TOKEN";
    TokenType[TokenType["UNICODE_RANGE_TOKEN"] = 30] = "UNICODE_RANGE_TOKEN";
    TokenType[TokenType["WHITESPACE_TOKEN"] = 31] = "WHITESPACE_TOKEN";
    TokenType[TokenType["EOF_TOKEN"] = 32] = "EOF_TOKEN";
  })(TokenType || (TokenType = {}));
  var FLAG_UNRESTRICTED = 1 << 0;
  var FLAG_ID = 1 << 1;
  var FLAG_INTEGER = 1 << 2;
  var FLAG_NUMBER = 1 << 3;
  var LINE_FEED = 0x000a;
  var SOLIDUS = 0x002f;
  var REVERSE_SOLIDUS = 0x005c;
  var CHARACTER_TABULATION = 0x0009;
  var SPACE$1 = 0x0020;
  var QUOTATION_MARK = 0x0022;
  var EQUALS_SIGN = 0x003d;
  var NUMBER_SIGN = 0x0023;
  var DOLLAR_SIGN = 0x0024;
  var PERCENTAGE_SIGN = 0x0025;
  var APOSTROPHE = 0x0027;
  var LEFT_PARENTHESIS = 0x0028;
  var RIGHT_PARENTHESIS = 0x0029;
  var LOW_LINE = 0x005f;
  var HYPHEN_MINUS = 0x002d;
  var EXCLAMATION_MARK = 0x0021;
  var LESS_THAN_SIGN = 0x003c;
  var GREATER_THAN_SIGN = 0x003e;
  var COMMERCIAL_AT = 0x0040;
  var LEFT_SQUARE_BRACKET = 0x005b;
  var RIGHT_SQUARE_BRACKET = 0x005d;
  var CIRCUMFLEX_ACCENT = 0x003d;
  var LEFT_CURLY_BRACKET = 0x007b;
  var QUESTION_MARK = 0x003f;
  var RIGHT_CURLY_BRACKET = 0x007d;
  var VERTICAL_LINE = 0x007c;
  var TILDE = 0x007e;
  var CONTROL = 0x0080;
  var REPLACEMENT_CHARACTER = 0xfffd;
  var ASTERISK = 0x002a;
  var PLUS_SIGN = 0x002b;
  var COMMA = 0x002c;
  var COLON = 0x003a;
  var SEMICOLON = 0x003b;
  var FULL_STOP = 0x002e;
  var NULL = 0x0000;
  var BACKSPACE = 0x0008;
  var LINE_TABULATION = 0x000b;
  var SHIFT_OUT = 0x000e;
  var INFORMATION_SEPARATOR_ONE = 0x001f;
  var DELETE = 0x007f;
  var EOF = -1;
  var ZERO = 0x0030;
  var a = 0x0061;
  var e = 0x0065;
  var f = 0x0066;
  var u = 0x0075;
  var z = 0x007a;
  var A = 0x0041;
  var E = 0x0045;
  var F = 0x0046;
  var U = 0x0055;
  var Z = 0x005a;
  var isDigit = function isDigit(codePoint) {return codePoint >= ZERO && codePoint <= 0x0039;};
  var isSurrogateCodePoint = function isSurrogateCodePoint(codePoint) {return codePoint >= 0xd800 && codePoint <= 0xdfff;};
  var isHex = function isHex(codePoint) {
    return isDigit(codePoint) || codePoint >= A && codePoint <= F || codePoint >= a && codePoint <= f;
  };
  var isLowerCaseLetter = function isLowerCaseLetter(codePoint) {return codePoint >= a && codePoint <= z;};
  var isUpperCaseLetter = function isUpperCaseLetter(codePoint) {return codePoint >= A && codePoint <= Z;};
  var isLetter = function isLetter(codePoint) {return isLowerCaseLetter(codePoint) || isUpperCaseLetter(codePoint);};
  var isNonASCIICodePoint = function isNonASCIICodePoint(codePoint) {return codePoint >= CONTROL;};
  var isWhiteSpace = function isWhiteSpace(codePoint) {
    return codePoint === LINE_FEED || codePoint === CHARACTER_TABULATION || codePoint === SPACE$1;
  };
  var isNameStartCodePoint = function isNameStartCodePoint(codePoint) {
    return isLetter(codePoint) || isNonASCIICodePoint(codePoint) || codePoint === LOW_LINE;
  };
  var isNameCodePoint = function isNameCodePoint(codePoint) {
    return isNameStartCodePoint(codePoint) || isDigit(codePoint) || codePoint === HYPHEN_MINUS;
  };
  var isNonPrintableCodePoint = function isNonPrintableCodePoint(codePoint) {
    return codePoint >= NULL && codePoint <= BACKSPACE ||
    codePoint === LINE_TABULATION ||
    codePoint >= SHIFT_OUT && codePoint <= INFORMATION_SEPARATOR_ONE ||
    codePoint === DELETE;
  };
  var isValidEscape = function isValidEscape(c1, c2) {
    if (c1 !== REVERSE_SOLIDUS) {
      return false;
    }
    return c2 !== LINE_FEED;
  };
  var isIdentifierStart = function isIdentifierStart(c1, c2, c3) {
    if (c1 === HYPHEN_MINUS) {
      return isNameStartCodePoint(c2) || isValidEscape(c2, c3);
    } else
    if (isNameStartCodePoint(c1)) {
      return true;
    } else
    if (c1 === REVERSE_SOLIDUS && isValidEscape(c1, c2)) {
      return true;
    }
    return false;
  };
  var isNumberStart = function isNumberStart(c1, c2, c3) {
    if (c1 === PLUS_SIGN || c1 === HYPHEN_MINUS) {
      if (isDigit(c2)) {
        return true;
      }
      return c2 === FULL_STOP && isDigit(c3);
    }
    if (c1 === FULL_STOP) {
      return isDigit(c2);
    }
    return isDigit(c1);
  };
  var stringToNumber = function stringToNumber(codePoints) {
    var c = 0;
    var sign = 1;
    if (codePoints[c] === PLUS_SIGN || codePoints[c] === HYPHEN_MINUS) {
      if (codePoints[c] === HYPHEN_MINUS) {
        sign = -1;
      }
      c++;
    }
    var integers = [];
    while (isDigit(codePoints[c])) {
      integers.push(codePoints[c++]);
    }
    var _int = integers.length ? parseInt(fromCodePoint.apply(void 0, integers), 10) : 0;
    if (codePoints[c] === FULL_STOP) {
      c++;
    }
    var fraction = [];
    while (isDigit(codePoints[c])) {
      fraction.push(codePoints[c++]);
    }
    var fracd = fraction.length;
    var frac = fracd ? parseInt(fromCodePoint.apply(void 0, fraction), 10) : 0;
    if (codePoints[c] === E || codePoints[c] === e) {
      c++;
    }
    var expsign = 1;
    if (codePoints[c] === PLUS_SIGN || codePoints[c] === HYPHEN_MINUS) {
      if (codePoints[c] === HYPHEN_MINUS) {
        expsign = -1;
      }
      c++;
    }
    var exponent = [];
    while (isDigit(codePoints[c])) {
      exponent.push(codePoints[c++]);
    }
    var exp = exponent.length ? parseInt(fromCodePoint.apply(void 0, exponent), 10) : 0;
    return sign * (_int + frac * Math.pow(10, -fracd)) * Math.pow(10, expsign * exp);
  };
  var LEFT_PARENTHESIS_TOKEN = {
    type: TokenType.LEFT_PARENTHESIS_TOKEN };

  var RIGHT_PARENTHESIS_TOKEN = {
    type: TokenType.RIGHT_PARENTHESIS_TOKEN };

  var COMMA_TOKEN = { type: TokenType.COMMA_TOKEN };
  var SUFFIX_MATCH_TOKEN = { type: TokenType.SUFFIX_MATCH_TOKEN };
  var PREFIX_MATCH_TOKEN = { type: TokenType.PREFIX_MATCH_TOKEN };
  var COLUMN_TOKEN = { type: TokenType.COLUMN_TOKEN };
  var DASH_MATCH_TOKEN = { type: TokenType.DASH_MATCH_TOKEN };
  var INCLUDE_MATCH_TOKEN = { type: TokenType.INCLUDE_MATCH_TOKEN };
  var LEFT_CURLY_BRACKET_TOKEN = {
    type: TokenType.LEFT_CURLY_BRACKET_TOKEN };

  var RIGHT_CURLY_BRACKET_TOKEN = {
    type: TokenType.RIGHT_CURLY_BRACKET_TOKEN };

  var SUBSTRING_MATCH_TOKEN = { type: TokenType.SUBSTRING_MATCH_TOKEN };
  var BAD_URL_TOKEN = { type: TokenType.BAD_URL_TOKEN };
  var BAD_STRING_TOKEN = { type: TokenType.BAD_STRING_TOKEN };
  var CDO_TOKEN = { type: TokenType.CDO_TOKEN };
  var CDC_TOKEN = { type: TokenType.CDC_TOKEN };
  var COLON_TOKEN = { type: TokenType.COLON_TOKEN };
  var SEMICOLON_TOKEN = { type: TokenType.SEMICOLON_TOKEN };
  var LEFT_SQUARE_BRACKET_TOKEN = {
    type: TokenType.LEFT_SQUARE_BRACKET_TOKEN };

  var RIGHT_SQUARE_BRACKET_TOKEN = {
    type: TokenType.RIGHT_SQUARE_BRACKET_TOKEN };

  var WHITESPACE_TOKEN = { type: TokenType.WHITESPACE_TOKEN };
  var EOF_TOKEN = { type: TokenType.EOF_TOKEN };
  var Tokenizer = /** @class */function () {
    function Tokenizer() {
      this._value = [];
    }
    Tokenizer.prototype.write = function (chunk) {
      this._value = this._value.concat(toCodePoints(chunk));
    };
    Tokenizer.prototype.read = function () {
      var tokens = [];
      var token = this.consumeToken();
      while (token !== EOF_TOKEN) {
        tokens.push(token);
        token = this.consumeToken();
      }
      return tokens;
    };
    Tokenizer.prototype.consumeToken = function () {
      var codePoint = this.consumeCodePoint();
      switch (codePoint) {
        case QUOTATION_MARK:
          return this.consumeStringToken(QUOTATION_MARK);
        case NUMBER_SIGN:
          var c1 = this.peekCodePoint(0);
          var c2 = this.peekCodePoint(1);
          var c3 = this.peekCodePoint(2);
          if (isNameCodePoint(c1) || isValidEscape(c2, c3)) {
            var flags = isIdentifierStart(c1, c2, c3) ? FLAG_ID : FLAG_UNRESTRICTED;
            var value = this.consumeName();
            return { type: TokenType.HASH_TOKEN, value: value, flags: flags };
          }
          break;
        case DOLLAR_SIGN:
          if (this.peekCodePoint(0) === EQUALS_SIGN) {
            this.consumeCodePoint();
            return SUFFIX_MATCH_TOKEN;
          }
          break;
        case APOSTROPHE:
          return this.consumeStringToken(APOSTROPHE);
        case LEFT_PARENTHESIS:
          return LEFT_PARENTHESIS_TOKEN;
        case RIGHT_PARENTHESIS:
          return RIGHT_PARENTHESIS_TOKEN;
        case ASTERISK:
          if (this.peekCodePoint(0) === EQUALS_SIGN) {
            this.consumeCodePoint();
            return SUBSTRING_MATCH_TOKEN;
          }
          break;
        case PLUS_SIGN:
          if (isNumberStart(codePoint, this.peekCodePoint(0), this.peekCodePoint(1))) {
            this.reconsumeCodePoint(codePoint);
            return this.consumeNumericToken();
          }
          break;
        case COMMA:
          return COMMA_TOKEN;
        case HYPHEN_MINUS:
          var e1 = codePoint;
          var e2 = this.peekCodePoint(0);
          var e3 = this.peekCodePoint(1);
          if (isNumberStart(e1, e2, e3)) {
            this.reconsumeCodePoint(codePoint);
            return this.consumeNumericToken();
          }
          if (isIdentifierStart(e1, e2, e3)) {
            this.reconsumeCodePoint(codePoint);
            return this.consumeIdentLikeToken();
          }
          if (e2 === HYPHEN_MINUS && e3 === GREATER_THAN_SIGN) {
            this.consumeCodePoint();
            this.consumeCodePoint();
            return CDC_TOKEN;
          }
          break;
        case FULL_STOP:
          if (isNumberStart(codePoint, this.peekCodePoint(0), this.peekCodePoint(1))) {
            this.reconsumeCodePoint(codePoint);
            return this.consumeNumericToken();
          }
          break;
        case SOLIDUS:
          if (this.peekCodePoint(0) === ASTERISK) {
            this.consumeCodePoint();
            while (true) {
              var c = this.consumeCodePoint();
              if (c === ASTERISK) {
                c = this.consumeCodePoint();
                if (c === SOLIDUS) {
                  return this.consumeToken();
                }
              }
              if (c === EOF) {
                return this.consumeToken();
              }
            }
          }
          break;
        case COLON:
          return COLON_TOKEN;
        case SEMICOLON:
          return SEMICOLON_TOKEN;
        case LESS_THAN_SIGN:
          if (this.peekCodePoint(0) === EXCLAMATION_MARK &&
          this.peekCodePoint(1) === HYPHEN_MINUS &&
          this.peekCodePoint(2) === HYPHEN_MINUS) {
            this.consumeCodePoint();
            this.consumeCodePoint();
            return CDO_TOKEN;
          }
          break;
        case COMMERCIAL_AT:
          var a1 = this.peekCodePoint(0);
          var a2 = this.peekCodePoint(1);
          var a3 = this.peekCodePoint(2);
          if (isIdentifierStart(a1, a2, a3)) {
            var value = this.consumeName();
            return { type: TokenType.AT_KEYWORD_TOKEN, value: value };
          }
          break;
        case LEFT_SQUARE_BRACKET:
          return LEFT_SQUARE_BRACKET_TOKEN;
        case REVERSE_SOLIDUS:
          if (isValidEscape(codePoint, this.peekCodePoint(0))) {
            this.reconsumeCodePoint(codePoint);
            return this.consumeIdentLikeToken();
          }
          break;
        case RIGHT_SQUARE_BRACKET:
          return RIGHT_SQUARE_BRACKET_TOKEN;
        case CIRCUMFLEX_ACCENT:
          if (this.peekCodePoint(0) === EQUALS_SIGN) {
            this.consumeCodePoint();
            return PREFIX_MATCH_TOKEN;
          }
          break;
        case LEFT_CURLY_BRACKET:
          return LEFT_CURLY_BRACKET_TOKEN;
        case RIGHT_CURLY_BRACKET:
          return RIGHT_CURLY_BRACKET_TOKEN;
        case u:
        case U:
          var u1 = this.peekCodePoint(0);
          var u2 = this.peekCodePoint(1);
          if (u1 === PLUS_SIGN && (isHex(u2) || u2 === QUESTION_MARK)) {
            this.consumeCodePoint();
            this.consumeUnicodeRangeToken();
          }
          this.reconsumeCodePoint(codePoint);
          return this.consumeIdentLikeToken();
        case VERTICAL_LINE:
          if (this.peekCodePoint(0) === EQUALS_SIGN) {
            this.consumeCodePoint();
            return DASH_MATCH_TOKEN;
          }
          if (this.peekCodePoint(0) === VERTICAL_LINE) {
            this.consumeCodePoint();
            return COLUMN_TOKEN;
          }
          break;
        case TILDE:
          if (this.peekCodePoint(0) === EQUALS_SIGN) {
            this.consumeCodePoint();
            return INCLUDE_MATCH_TOKEN;
          }
          break;
        case EOF:
          return EOF_TOKEN;}

      if (isWhiteSpace(codePoint)) {
        this.consumeWhiteSpace();
        return WHITESPACE_TOKEN;
      }
      if (isDigit(codePoint)) {
        this.reconsumeCodePoint(codePoint);
        return this.consumeNumericToken();
      }
      if (isNameStartCodePoint(codePoint)) {
        this.reconsumeCodePoint(codePoint);
        return this.consumeIdentLikeToken();
      }
      return { type: TokenType.DELIM_TOKEN, value: fromCodePoint(codePoint) };
    };
    Tokenizer.prototype.consumeCodePoint = function () {
      var value = this._value.shift();
      return typeof value === 'undefined' ? -1 : value;
    };
    Tokenizer.prototype.reconsumeCodePoint = function (codePoint) {
      this._value.unshift(codePoint);
    };
    Tokenizer.prototype.peekCodePoint = function (delta) {
      if (delta >= this._value.length) {
        return -1;
      }
      return this._value[delta];
    };
    Tokenizer.prototype.consumeUnicodeRangeToken = function () {
      var digits = [];
      var codePoint = this.consumeCodePoint();
      while (isHex(codePoint) && digits.length < 6) {
        digits.push(codePoint);
        codePoint = this.consumeCodePoint();
      }
      var questionMarks = false;
      while (codePoint === QUESTION_MARK && digits.length < 6) {
        digits.push(codePoint);
        codePoint = this.consumeCodePoint();
        questionMarks = true;
      }
      if (questionMarks) {
        var start_1 = parseInt(fromCodePoint.apply(void 0, digits.map(function (digit) {return digit === QUESTION_MARK ? ZERO : digit;})), 16);
        var end = parseInt(fromCodePoint.apply(void 0, digits.map(function (digit) {return digit === QUESTION_MARK ? F : digit;})), 16);
        return { type: TokenType.UNICODE_RANGE_TOKEN, start: start_1, end: end };
      }
      var start = parseInt(fromCodePoint.apply(void 0, digits), 16);
      if (this.peekCodePoint(0) === HYPHEN_MINUS && isHex(this.peekCodePoint(1))) {
        this.consumeCodePoint();
        codePoint = this.consumeCodePoint();
        var endDigits = [];
        while (isHex(codePoint) && endDigits.length < 6) {
          endDigits.push(codePoint);
          codePoint = this.consumeCodePoint();
        }
        var end = parseInt(fromCodePoint.apply(void 0, endDigits), 16);
        return { type: TokenType.UNICODE_RANGE_TOKEN, start: start, end: end };
      } else
      {
        return { type: TokenType.UNICODE_RANGE_TOKEN, start: start, end: start };
      }
    };
    Tokenizer.prototype.consumeIdentLikeToken = function () {
      var value = this.consumeName();
      if (value.toLowerCase() === 'url' && this.peekCodePoint(0) === LEFT_PARENTHESIS) {
        this.consumeCodePoint();
        return this.consumeUrlToken();
      } else
      if (this.peekCodePoint(0) === LEFT_PARENTHESIS) {
        this.consumeCodePoint();
        return { type: TokenType.FUNCTION_TOKEN, value: value };
      }
      return { type: TokenType.IDENT_TOKEN, value: value };
    };
    Tokenizer.prototype.consumeUrlToken = function () {
      var value = [];
      this.consumeWhiteSpace();
      if (this.peekCodePoint(0) === EOF) {
        return { type: TokenType.URL_TOKEN, value: '' };
      }
      var next = this.peekCodePoint(0);
      if (next === APOSTROPHE || next === QUOTATION_MARK) {
        var stringToken = this.consumeStringToken(this.consumeCodePoint());
        if (stringToken.type === TokenType.STRING_TOKEN) {
          this.consumeWhiteSpace();
          if (this.peekCodePoint(0) === EOF || this.peekCodePoint(0) === RIGHT_PARENTHESIS) {
            this.consumeCodePoint();
            return { type: TokenType.URL_TOKEN, value: stringToken.value };
          }
        }
        this.consumeBadUrlRemnants();
        return BAD_URL_TOKEN;
      }
      while (true) {
        var codePoint = this.consumeCodePoint();
        if (codePoint === EOF || codePoint === RIGHT_PARENTHESIS) {
          return { type: TokenType.URL_TOKEN, value: fromCodePoint.apply(void 0, value) };
        } else
        if (isWhiteSpace(codePoint)) {
          this.consumeWhiteSpace();
          if (this.peekCodePoint(0) === EOF || this.peekCodePoint(0) === RIGHT_PARENTHESIS) {
            this.consumeCodePoint();
            return { type: TokenType.URL_TOKEN, value: fromCodePoint.apply(void 0, value) };
          }
          this.consumeBadUrlRemnants();
          return BAD_URL_TOKEN;
        } else
        if (codePoint === QUOTATION_MARK ||
        codePoint === APOSTROPHE ||
        codePoint === LEFT_PARENTHESIS ||
        isNonPrintableCodePoint(codePoint)) {
          this.consumeBadUrlRemnants();
          return BAD_URL_TOKEN;
        } else
        if (codePoint === REVERSE_SOLIDUS) {
          if (isValidEscape(codePoint, this.peekCodePoint(0))) {
            value.push(this.consumeEscapedCodePoint());
          } else
          {
            this.consumeBadUrlRemnants();
            return BAD_URL_TOKEN;
          }
        } else
        {
          value.push(codePoint);
        }
      }
    };
    Tokenizer.prototype.consumeWhiteSpace = function () {
      while (isWhiteSpace(this.peekCodePoint(0))) {
        this.consumeCodePoint();
      }
    };
    Tokenizer.prototype.consumeBadUrlRemnants = function () {
      while (true) {
        var codePoint = this.consumeCodePoint();
        if (codePoint === RIGHT_PARENTHESIS || codePoint === EOF) {
          return;
        }
        if (isValidEscape(codePoint, this.peekCodePoint(0))) {
          this.consumeEscapedCodePoint();
        }
      }
    };
    Tokenizer.prototype.consumeStringSlice = function (count) {
      var SLICE_STACK_SIZE = 60000;
      var value = '';
      while (count > 0) {
        var amount = Math.min(SLICE_STACK_SIZE, count);
        value += fromCodePoint.apply(void 0, this._value.splice(0, amount));
        count -= amount;
      }
      this._value.shift();
      return value;
    };
    Tokenizer.prototype.consumeStringToken = function (endingCodePoint) {
      var value = '';
      var i = 0;
      do {
        var codePoint = this._value[i];
        if (codePoint === EOF || codePoint === undefined || codePoint === endingCodePoint) {
          value += this.consumeStringSlice(i);
          return { type: TokenType.STRING_TOKEN, value: value };
        }
        if (codePoint === LINE_FEED) {
          this._value.splice(0, i);
          return BAD_STRING_TOKEN;
        }
        if (codePoint === REVERSE_SOLIDUS) {
          var next = this._value[i + 1];
          if (next !== EOF && next !== undefined) {
            if (next === LINE_FEED) {
              value += this.consumeStringSlice(i);
              i = -1;
              this._value.shift();
            } else
            if (isValidEscape(codePoint, next)) {
              value += this.consumeStringSlice(i);
              value += fromCodePoint(this.consumeEscapedCodePoint());
              i = -1;
            }
          }
        }
        i++;
      } while (true);
    };
    Tokenizer.prototype.consumeNumber = function () {
      var repr = [];
      var type = FLAG_INTEGER;
      var c1 = this.peekCodePoint(0);
      if (c1 === PLUS_SIGN || c1 === HYPHEN_MINUS) {
        repr.push(this.consumeCodePoint());
      }
      while (isDigit(this.peekCodePoint(0))) {
        repr.push(this.consumeCodePoint());
      }
      c1 = this.peekCodePoint(0);
      var c2 = this.peekCodePoint(1);
      if (c1 === FULL_STOP && isDigit(c2)) {
        repr.push(this.consumeCodePoint(), this.consumeCodePoint());
        type = FLAG_NUMBER;
        while (isDigit(this.peekCodePoint(0))) {
          repr.push(this.consumeCodePoint());
        }
      }
      c1 = this.peekCodePoint(0);
      c2 = this.peekCodePoint(1);
      var c3 = this.peekCodePoint(2);
      if ((c1 === E || c1 === e) && ((c2 === PLUS_SIGN || c2 === HYPHEN_MINUS) && isDigit(c3) || isDigit(c2))) {
        repr.push(this.consumeCodePoint(), this.consumeCodePoint());
        type = FLAG_NUMBER;
        while (isDigit(this.peekCodePoint(0))) {
          repr.push(this.consumeCodePoint());
        }
      }
      return [stringToNumber(repr), type];
    };
    Tokenizer.prototype.consumeNumericToken = function () {
      var _a = this.consumeNumber(),number = _a[0],flags = _a[1];
      var c1 = this.peekCodePoint(0);
      var c2 = this.peekCodePoint(1);
      var c3 = this.peekCodePoint(2);
      if (isIdentifierStart(c1, c2, c3)) {
        var unit = this.consumeName();
        return { type: TokenType.DIMENSION_TOKEN, number: number, flags: flags, unit: unit };
      }
      if (c1 === PERCENTAGE_SIGN) {
        this.consumeCodePoint();
        return { type: TokenType.PERCENTAGE_TOKEN, number: number, flags: flags };
      }
      return { type: TokenType.NUMBER_TOKEN, number: number, flags: flags };
    };
    Tokenizer.prototype.consumeEscapedCodePoint = function () {
      var codePoint = this.consumeCodePoint();
      if (isHex(codePoint)) {
        var hex = fromCodePoint(codePoint);
        while (isHex(this.peekCodePoint(0)) && hex.length < 6) {
          hex += fromCodePoint(this.consumeCodePoint());
        }
        if (isWhiteSpace(this.peekCodePoint(0))) {
          this.consumeCodePoint();
        }
        var hexCodePoint = parseInt(hex, 16);
        if (hexCodePoint === 0 || isSurrogateCodePoint(hexCodePoint) || hexCodePoint > 0x10ffff) {
          return REPLACEMENT_CHARACTER;
        }
        return hexCodePoint;
      }
      if (codePoint === EOF) {
        return REPLACEMENT_CHARACTER;
      }
      return codePoint;
    };
    Tokenizer.prototype.consumeName = function () {
      var result = '';
      while (true) {
        var codePoint = this.consumeCodePoint();
        if (isNameCodePoint(codePoint)) {
          result += fromCodePoint(codePoint);
        } else
        if (isValidEscape(codePoint, this.peekCodePoint(0))) {
          result += fromCodePoint(this.consumeEscapedCodePoint());
        } else
        {
          this.reconsumeCodePoint(codePoint);
          return result;
        }
      }
    };
    return Tokenizer;
  }();

  var Parser = /** @class */function () {
    function Parser(tokens) {
      this._tokens = tokens;
    }
    Parser.create = function (value) {
      var tokenizer = new Tokenizer();
      tokenizer.write(value);
      return new Parser(tokenizer.read());
    };
    Parser.parseValue = function (value) {
      return Parser.create(value).parseComponentValue();
    };
    Parser.parseValues = function (value) {
      return Parser.create(value).parseComponentValues();
    };
    Parser.prototype.parseComponentValue = function () {
      var token = this.consumeToken();
      while (token.type === TokenType.WHITESPACE_TOKEN) {
        token = this.consumeToken();
      }
      if (token.type === TokenType.EOF_TOKEN) {
        throw new SyntaxError("Error parsing CSS component value, unexpected EOF");
      }
      this.reconsumeToken(token);
      var value = this.consumeComponentValue();
      do {
        token = this.consumeToken();
      } while (token.type === TokenType.WHITESPACE_TOKEN);
      if (token.type === TokenType.EOF_TOKEN) {
        return value;
      }
      throw new SyntaxError("Error parsing CSS component value, multiple values found when expecting only one");
    };
    Parser.prototype.parseComponentValues = function () {
      var values = [];
      while (true) {
        var value = this.consumeComponentValue();
        if (value.type === TokenType.EOF_TOKEN) {
          return values;
        }
        values.push(value);
        values.push();
      }
    };
    Parser.prototype.consumeComponentValue = function () {
      var token = this.consumeToken();
      switch (token.type) {
        case TokenType.LEFT_CURLY_BRACKET_TOKEN:
        case TokenType.LEFT_SQUARE_BRACKET_TOKEN:
        case TokenType.LEFT_PARENTHESIS_TOKEN:
          return this.consumeSimpleBlock(token.type);
        case TokenType.FUNCTION_TOKEN:
          return this.consumeFunction(token);}

      return token;
    };
    Parser.prototype.consumeSimpleBlock = function (type) {
      var block = { type: type, values: [] };
      var token = this.consumeToken();
      while (true) {
        if (token.type === TokenType.EOF_TOKEN || isEndingTokenFor(token, type)) {
          return block;
        }
        this.reconsumeToken(token);
        block.values.push(this.consumeComponentValue());
        token = this.consumeToken();
      }
    };
    Parser.prototype.consumeFunction = function (functionToken) {
      var cssFunction = {
        name: functionToken.value,
        values: [],
        type: TokenType.FUNCTION };

      while (true) {
        var token = this.consumeToken();
        if (token.type === TokenType.EOF_TOKEN || token.type === TokenType.RIGHT_PARENTHESIS_TOKEN) {
          return cssFunction;
        }
        this.reconsumeToken(token);
        cssFunction.values.push(this.consumeComponentValue());
      }
    };
    Parser.prototype.consumeToken = function () {
      var token = this._tokens.shift();
      return typeof token === 'undefined' ? EOF_TOKEN : token;
    };
    Parser.prototype.reconsumeToken = function (token) {
      this._tokens.unshift(token);
    };
    return Parser;
  }();
  var isDimensionToken = function isDimensionToken(token) {return token.type === TokenType.DIMENSION_TOKEN;};
  var isNumberToken = function isNumberToken(token) {return token.type === TokenType.NUMBER_TOKEN;};
  var isIdentToken = function isIdentToken(token) {return token.type === TokenType.IDENT_TOKEN;};
  var isStringToken = function isStringToken(token) {return token.type === TokenType.STRING_TOKEN;};
  var isIdentWithValue = function isIdentWithValue(token, value) {
    return isIdentToken(token) && token.value === value;
  };
  var nonWhiteSpace = function nonWhiteSpace(token) {return token.type !== TokenType.WHITESPACE_TOKEN;};
  var nonFunctionArgSeparator = function nonFunctionArgSeparator(token) {
    return token.type !== TokenType.WHITESPACE_TOKEN && token.type !== TokenType.COMMA_TOKEN;
  };
  var parseFunctionArgs = function parseFunctionArgs(tokens) {
    var args = [];
    var arg = [];
    tokens.forEach(function (token) {
      if (token.type === TokenType.COMMA_TOKEN) {
        if (arg.length === 0) {
          throw new Error("Error parsing function args, zero tokens for arg");
        }
        args.push(arg);
        arg = [];
        return;
      }
      if (token.type !== TokenType.WHITESPACE_TOKEN) {
        arg.push(token);
      }
    });
    if (arg.length) {
      args.push(arg);
    }
    return args;
  };
  var isEndingTokenFor = function isEndingTokenFor(token, type) {
    if (type === TokenType.LEFT_CURLY_BRACKET_TOKEN && token.type === TokenType.RIGHT_CURLY_BRACKET_TOKEN) {
      return true;
    }
    if (type === TokenType.LEFT_SQUARE_BRACKET_TOKEN && token.type === TokenType.RIGHT_SQUARE_BRACKET_TOKEN) {
      return true;
    }
    return type === TokenType.LEFT_PARENTHESIS_TOKEN && token.type === TokenType.RIGHT_PARENTHESIS_TOKEN;
  };

  var isLength = function isLength(token) {
    return token.type === TokenType.NUMBER_TOKEN || token.type === TokenType.DIMENSION_TOKEN;
  };

  var isLengthPercentage = function isLengthPercentage(token) {
    return token.type === TokenType.PERCENTAGE_TOKEN || isLength(token);
  };
  var parseLengthPercentageTuple = function parseLengthPercentageTuple(tokens) {
    return tokens.length > 1 ? [tokens[0], tokens[1]] : [tokens[0]];
  };
  var ZERO_LENGTH = {
    type: TokenType.NUMBER_TOKEN,
    number: 0,
    flags: FLAG_INTEGER };

  var FIFTY_PERCENT = {
    type: TokenType.PERCENTAGE_TOKEN,
    number: 50,
    flags: FLAG_INTEGER };

  var HUNDRED_PERCENT = {
    type: TokenType.PERCENTAGE_TOKEN,
    number: 100,
    flags: FLAG_INTEGER };

  var getAbsoluteValueForTuple = function getAbsoluteValueForTuple(tuple, width, height) {
    var x = tuple[0],y = tuple[1];
    return [getAbsoluteValue(x, width), getAbsoluteValue(typeof y !== 'undefined' ? y : x, height)];
  };
  var getAbsoluteValue = function getAbsoluteValue(token, parent) {
    if (token.type === TokenType.PERCENTAGE_TOKEN) {
      return token.number / 100 * parent;
    }
    if (isDimensionToken(token)) {
      switch (token.unit) {
        case 'rem':
        case 'em':
          return 16 * token.number; // TODO use correct font-size
        case 'px':
        default:
          return token.number;}

    }
    return token.number;
  };

  var DEG = 'deg';
  var GRAD = 'grad';
  var RAD = 'rad';
  var TURN = 'turn';
  var angle = {
    name: 'angle',
    parse: function parse(value) {
      if (value.type === TokenType.DIMENSION_TOKEN) {
        switch (value.unit) {
          case DEG:
            return Math.PI * value.number / 180;
          case GRAD:
            return Math.PI / 200 * value.number;
          case RAD:
            return value.number;
          case TURN:
            return Math.PI * 2 * value.number;}

      }
      throw new Error("Unsupported angle type");
    } };

  var isAngle = function isAngle(value) {
    if (value.type === TokenType.DIMENSION_TOKEN) {
      if (value.unit === DEG || value.unit === GRAD || value.unit === RAD || value.unit === TURN) {
        return true;
      }
    }
    return false;
  };
  var parseNamedSide = function parseNamedSide(tokens) {
    var sideOrCorner = tokens.
    filter(isIdentToken).
    map(function (ident) {return ident.value;}).
    join(' ');
    switch (sideOrCorner) {
      case 'to bottom right':
      case 'to right bottom':
      case 'left top':
      case 'top left':
        return [ZERO_LENGTH, ZERO_LENGTH];
      case 'to top':
      case 'bottom':
        return deg(0);
      case 'to bottom left':
      case 'to left bottom':
      case 'right top':
      case 'top right':
        return [ZERO_LENGTH, HUNDRED_PERCENT];
      case 'to right':
      case 'left':
        return deg(90);
      case 'to top left':
      case 'to left top':
      case 'right bottom':
      case 'bottom right':
        return [HUNDRED_PERCENT, HUNDRED_PERCENT];
      case 'to bottom':
      case 'top':
        return deg(180);
      case 'to top right':
      case 'to right top':
      case 'left bottom':
      case 'bottom left':
        return [HUNDRED_PERCENT, ZERO_LENGTH];
      case 'to left':
      case 'right':
        return deg(270);}

    return 0;
  };
  var deg = function deg(_deg) {return Math.PI * _deg / 180;};

  var color = {
    name: 'color',
    parse: function parse(value) {
      if (value.type === TokenType.FUNCTION) {
        var colorFunction = SUPPORTED_COLOR_FUNCTIONS[value.name];
        if (typeof colorFunction === 'undefined') {
          throw new Error("Attempting to parse an unsupported color function \"" + value.name + "\"");
        }
        return colorFunction(value.values);
      }
      if (value.type === TokenType.HASH_TOKEN) {
        if (value.value.length === 3) {
          var r = value.value.substring(0, 1);
          var g = value.value.substring(1, 2);
          var b = value.value.substring(2, 3);
          return pack(parseInt(r + r, 16), parseInt(g + g, 16), parseInt(b + b, 16), 1);
        }
        if (value.value.length === 4) {
          var r = value.value.substring(0, 1);
          var g = value.value.substring(1, 2);
          var b = value.value.substring(2, 3);
          var a = value.value.substring(3, 4);
          return pack(parseInt(r + r, 16), parseInt(g + g, 16), parseInt(b + b, 16), parseInt(a + a, 16) / 255);
        }
        if (value.value.length === 6) {
          var r = value.value.substring(0, 2);
          var g = value.value.substring(2, 4);
          var b = value.value.substring(4, 6);
          return pack(parseInt(r, 16), parseInt(g, 16), parseInt(b, 16), 1);
        }
        if (value.value.length === 8) {
          var r = value.value.substring(0, 2);
          var g = value.value.substring(2, 4);
          var b = value.value.substring(4, 6);
          var a = value.value.substring(6, 8);
          return pack(parseInt(r, 16), parseInt(g, 16), parseInt(b, 16), parseInt(a, 16) / 255);
        }
      }
      if (value.type === TokenType.IDENT_TOKEN) {
        var namedColor = COLORS[value.value.toUpperCase()];
        if (typeof namedColor !== 'undefined') {
          return namedColor;
        }
      }
      return COLORS.TRANSPARENT;
    } };

  var isTransparent = function isTransparent(color) {return (0xff & color) === 0;};
  var asString = function asString(color) {
    var alpha = 0xff & color;
    var blue = 0xff & color >> 8;
    var green = 0xff & color >> 16;
    var red = 0xff & color >> 24;
    return alpha < 255 ? "rgba(" + red + "," + green + "," + blue + "," + alpha / 255 + ")" : "rgb(" + red + "," + green + "," + blue + ")";
  };
  var pack = function pack(r, g, b, a) {
    return (r << 24 | g << 16 | b << 8 | Math.round(a * 255) << 0) >>> 0;
  };
  var getTokenColorValue = function getTokenColorValue(token, i) {
    if (token.type === TokenType.NUMBER_TOKEN) {
      return token.number;
    }
    if (token.type === TokenType.PERCENTAGE_TOKEN) {
      var max = i === 3 ? 1 : 255;
      return i === 3 ? token.number / 100 * max : Math.round(token.number / 100 * max);
    }
    return 0;
  };
  var rgb = function rgb(args) {
    var tokens = args.filter(nonFunctionArgSeparator);
    if (tokens.length === 3) {
      var _a = tokens.map(getTokenColorValue),r = _a[0],g = _a[1],b = _a[2];
      return pack(r, g, b, 1);
    }
    if (tokens.length === 4) {
      var _b = tokens.map(getTokenColorValue),r = _b[0],g = _b[1],b = _b[2],a = _b[3];
      return pack(r, g, b, a);
    }
    return 0;
  };
  function hue2rgb(t1, t2, hue) {
    if (hue < 0) {
      hue += 1;
    }
    if (hue >= 1) {
      hue -= 1;
    }
    if (hue < 1 / 6) {
      return (t2 - t1) * hue * 6 + t1;
    } else
    if (hue < 1 / 2) {
      return t2;
    } else
    if (hue < 2 / 3) {
      return (t2 - t1) * 6 * (2 / 3 - hue) + t1;
    } else
    {
      return t1;
    }
  }
  var hsl = function hsl(args) {
    var tokens = args.filter(nonFunctionArgSeparator);
    var hue = tokens[0],saturation = tokens[1],lightness = tokens[2],alpha = tokens[3];
    var h = (hue.type === TokenType.NUMBER_TOKEN ? deg(hue.number) : angle.parse(hue)) / (Math.PI * 2);
    var s = isLengthPercentage(saturation) ? saturation.number / 100 : 0;
    var l = isLengthPercentage(lightness) ? lightness.number / 100 : 0;
    var a = typeof alpha !== 'undefined' && isLengthPercentage(alpha) ? getAbsoluteValue(alpha, 1) : 1;
    if (s === 0) {
      return pack(l * 255, l * 255, l * 255, 1);
    }
    var t2 = l <= 0.5 ? l * (s + 1) : l + s - l * s;
    var t1 = l * 2 - t2;
    var r = hue2rgb(t1, t2, h + 1 / 3);
    var g = hue2rgb(t1, t2, h);
    var b = hue2rgb(t1, t2, h - 1 / 3);
    return pack(r * 255, g * 255, b * 255, a);
  };
  var SUPPORTED_COLOR_FUNCTIONS = {
    hsl: hsl,
    hsla: hsl,
    rgb: rgb,
    rgba: rgb };

  var COLORS = {
    ALICEBLUE: 0xf0f8ffff,
    ANTIQUEWHITE: 0xfaebd7ff,
    AQUA: 0x00ffffff,
    AQUAMARINE: 0x7fffd4ff,
    AZURE: 0xf0ffffff,
    BEIGE: 0xf5f5dcff,
    BISQUE: 0xffe4c4ff,
    BLACK: 0x000000ff,
    BLANCHEDALMOND: 0xffebcdff,
    BLUE: 0x0000ffff,
    BLUEVIOLET: 0x8a2be2ff,
    BROWN: 0xa52a2aff,
    BURLYWOOD: 0xdeb887ff,
    CADETBLUE: 0x5f9ea0ff,
    CHARTREUSE: 0x7fff00ff,
    CHOCOLATE: 0xd2691eff,
    CORAL: 0xff7f50ff,
    CORNFLOWERBLUE: 0x6495edff,
    CORNSILK: 0xfff8dcff,
    CRIMSON: 0xdc143cff,
    CYAN: 0x00ffffff,
    DARKBLUE: 0x00008bff,
    DARKCYAN: 0x008b8bff,
    DARKGOLDENROD: 0xb886bbff,
    DARKGRAY: 0xa9a9a9ff,
    DARKGREEN: 0x006400ff,
    DARKGREY: 0xa9a9a9ff,
    DARKKHAKI: 0xbdb76bff,
    DARKMAGENTA: 0x8b008bff,
    DARKOLIVEGREEN: 0x556b2fff,
    DARKORANGE: 0xff8c00ff,
    DARKORCHID: 0x9932ccff,
    DARKRED: 0x8b0000ff,
    DARKSALMON: 0xe9967aff,
    DARKSEAGREEN: 0x8fbc8fff,
    DARKSLATEBLUE: 0x483d8bff,
    DARKSLATEGRAY: 0x2f4f4fff,
    DARKSLATEGREY: 0x2f4f4fff,
    DARKTURQUOISE: 0x00ced1ff,
    DARKVIOLET: 0x9400d3ff,
    DEEPPINK: 0xff1493ff,
    DEEPSKYBLUE: 0x00bfffff,
    DIMGRAY: 0x696969ff,
    DIMGREY: 0x696969ff,
    DODGERBLUE: 0x1e90ffff,
    FIREBRICK: 0xb22222ff,
    FLORALWHITE: 0xfffaf0ff,
    FORESTGREEN: 0x228b22ff,
    FUCHSIA: 0xff00ffff,
    GAINSBORO: 0xdcdcdcff,
    GHOSTWHITE: 0xf8f8ffff,
    GOLD: 0xffd700ff,
    GOLDENROD: 0xdaa520ff,
    GRAY: 0x808080ff,
    GREEN: 0x008000ff,
    GREENYELLOW: 0xadff2fff,
    GREY: 0x808080ff,
    HONEYDEW: 0xf0fff0ff,
    HOTPINK: 0xff69b4ff,
    INDIANRED: 0xcd5c5cff,
    INDIGO: 0x4b0082ff,
    IVORY: 0xfffff0ff,
    KHAKI: 0xf0e68cff,
    LAVENDER: 0xe6e6faff,
    LAVENDERBLUSH: 0xfff0f5ff,
    LAWNGREEN: 0x7cfc00ff,
    LEMONCHIFFON: 0xfffacdff,
    LIGHTBLUE: 0xadd8e6ff,
    LIGHTCORAL: 0xf08080ff,
    LIGHTCYAN: 0xe0ffffff,
    LIGHTGOLDENRODYELLOW: 0xfafad2ff,
    LIGHTGRAY: 0xd3d3d3ff,
    LIGHTGREEN: 0x90ee90ff,
    LIGHTGREY: 0xd3d3d3ff,
    LIGHTPINK: 0xffb6c1ff,
    LIGHTSALMON: 0xffa07aff,
    LIGHTSEAGREEN: 0x20b2aaff,
    LIGHTSKYBLUE: 0x87cefaff,
    LIGHTSLATEGRAY: 0x778899ff,
    LIGHTSLATEGREY: 0x778899ff,
    LIGHTSTEELBLUE: 0xb0c4deff,
    LIGHTYELLOW: 0xffffe0ff,
    LIME: 0x00ff00ff,
    LIMEGREEN: 0x32cd32ff,
    LINEN: 0xfaf0e6ff,
    MAGENTA: 0xff00ffff,
    MAROON: 0x800000ff,
    MEDIUMAQUAMARINE: 0x66cdaaff,
    MEDIUMBLUE: 0x0000cdff,
    MEDIUMORCHID: 0xba55d3ff,
    MEDIUMPURPLE: 0x9370dbff,
    MEDIUMSEAGREEN: 0x3cb371ff,
    MEDIUMSLATEBLUE: 0x7b68eeff,
    MEDIUMSPRINGGREEN: 0x00fa9aff,
    MEDIUMTURQUOISE: 0x48d1ccff,
    MEDIUMVIOLETRED: 0xc71585ff,
    MIDNIGHTBLUE: 0x191970ff,
    MINTCREAM: 0xf5fffaff,
    MISTYROSE: 0xffe4e1ff,
    MOCCASIN: 0xffe4b5ff,
    NAVAJOWHITE: 0xffdeadff,
    NAVY: 0x000080ff,
    OLDLACE: 0xfdf5e6ff,
    OLIVE: 0x808000ff,
    OLIVEDRAB: 0x6b8e23ff,
    ORANGE: 0xffa500ff,
    ORANGERED: 0xff4500ff,
    ORCHID: 0xda70d6ff,
    PALEGOLDENROD: 0xeee8aaff,
    PALEGREEN: 0x98fb98ff,
    PALETURQUOISE: 0xafeeeeff,
    PALEVIOLETRED: 0xdb7093ff,
    PAPAYAWHIP: 0xffefd5ff,
    PEACHPUFF: 0xffdab9ff,
    PERU: 0xcd853fff,
    PINK: 0xffc0cbff,
    PLUM: 0xdda0ddff,
    POWDERBLUE: 0xb0e0e6ff,
    PURPLE: 0x800080ff,
    REBECCAPURPLE: 0x663399ff,
    RED: 0xff0000ff,
    ROSYBROWN: 0xbc8f8fff,
    ROYALBLUE: 0x4169e1ff,
    SADDLEBROWN: 0x8b4513ff,
    SALMON: 0xfa8072ff,
    SANDYBROWN: 0xf4a460ff,
    SEAGREEN: 0x2e8b57ff,
    SEASHELL: 0xfff5eeff,
    SIENNA: 0xa0522dff,
    SILVER: 0xc0c0c0ff,
    SKYBLUE: 0x87ceebff,
    SLATEBLUE: 0x6a5acdff,
    SLATEGRAY: 0x708090ff,
    SLATEGREY: 0x708090ff,
    SNOW: 0xfffafaff,
    SPRINGGREEN: 0x00ff7fff,
    STEELBLUE: 0x4682b4ff,
    TAN: 0xd2b48cff,
    TEAL: 0x008080ff,
    THISTLE: 0xd8bfd8ff,
    TOMATO: 0xff6347ff,
    TRANSPARENT: 0x00000000,
    TURQUOISE: 0x40e0d0ff,
    VIOLET: 0xee82eeff,
    WHEAT: 0xf5deb3ff,
    WHITE: 0xffffffff,
    WHITESMOKE: 0xf5f5f5ff,
    YELLOW: 0xffff00ff,
    YELLOWGREEN: 0x9acd32ff };


  var PropertyDescriptorParsingType;
  (function (PropertyDescriptorParsingType) {
    PropertyDescriptorParsingType[PropertyDescriptorParsingType["VALUE"] = 0] = "VALUE";
    PropertyDescriptorParsingType[PropertyDescriptorParsingType["LIST"] = 1] = "LIST";
    PropertyDescriptorParsingType[PropertyDescriptorParsingType["IDENT_VALUE"] = 2] = "IDENT_VALUE";
    PropertyDescriptorParsingType[PropertyDescriptorParsingType["TYPE_VALUE"] = 3] = "TYPE_VALUE";
    PropertyDescriptorParsingType[PropertyDescriptorParsingType["TOKEN_VALUE"] = 4] = "TOKEN_VALUE";
  })(PropertyDescriptorParsingType || (PropertyDescriptorParsingType = {}));

  var BACKGROUND_CLIP;
  (function (BACKGROUND_CLIP) {
    BACKGROUND_CLIP[BACKGROUND_CLIP["BORDER_BOX"] = 0] = "BORDER_BOX";
    BACKGROUND_CLIP[BACKGROUND_CLIP["PADDING_BOX"] = 1] = "PADDING_BOX";
    BACKGROUND_CLIP[BACKGROUND_CLIP["CONTENT_BOX"] = 2] = "CONTENT_BOX";
  })(BACKGROUND_CLIP || (BACKGROUND_CLIP = {}));
  var backgroundClip = {
    name: 'background-clip',
    initialValue: 'border-box',
    prefix: false,
    type: PropertyDescriptorParsingType.LIST,
    parse: function parse(tokens) {
      return tokens.map(function (token) {
        if (isIdentToken(token)) {
          switch (token.value) {
            case 'padding-box':
              return BACKGROUND_CLIP.PADDING_BOX;
            case 'content-box':
              return BACKGROUND_CLIP.CONTENT_BOX;}

        }
        return BACKGROUND_CLIP.BORDER_BOX;
      });
    } };


  var backgroundColor = {
    name: "background-color",
    initialValue: 'transparent',
    prefix: false,
    type: PropertyDescriptorParsingType.TYPE_VALUE,
    format: 'color' };


  var parseColorStop = function parseColorStop(args) {
    var color$1 = color.parse(args[0]);
    var stop = args[1];
    return stop && isLengthPercentage(stop) ? { color: color$1, stop: stop } : { color: color$1, stop: null };
  };
  var processColorStops = function processColorStops(stops, lineLength) {
    var first = stops[0];
    var last = stops[stops.length - 1];
    if (first.stop === null) {
      first.stop = ZERO_LENGTH;
    }
    if (last.stop === null) {
      last.stop = HUNDRED_PERCENT;
    }
    var processStops = [];
    var previous = 0;
    for (var i = 0; i < stops.length; i++) {
      var stop_1 = stops[i].stop;
      if (stop_1 !== null) {
        var absoluteValue = getAbsoluteValue(stop_1, lineLength);
        if (absoluteValue > previous) {
          processStops.push(absoluteValue);
        } else
        {
          processStops.push(previous);
        }
        previous = absoluteValue;
      } else
      {
        processStops.push(null);
      }
    }
    var gapBegin = null;
    for (var i = 0; i < processStops.length; i++) {
      var stop_2 = processStops[i];
      if (stop_2 === null) {
        if (gapBegin === null) {
          gapBegin = i;
        }
      } else
      if (gapBegin !== null) {
        var gapLength = i - gapBegin;
        var beforeGap = processStops[gapBegin - 1];
        var gapValue = (stop_2 - beforeGap) / (gapLength + 1);
        for (var g = 1; g <= gapLength; g++) {
          processStops[gapBegin + g - 1] = gapValue * g;
        }
        gapBegin = null;
      }
    }
    return stops.map(function (_a, i) {
      var color = _a.color;
      return { color: color, stop: Math.max(Math.min(1, processStops[i] / lineLength), 0) };
    });
  };
  var getAngleFromCorner = function getAngleFromCorner(corner, width, height) {
    var centerX = width / 2;
    var centerY = height / 2;
    var x = getAbsoluteValue(corner[0], width) - centerX;
    var y = centerY - getAbsoluteValue(corner[1], height);
    return (Math.atan2(y, x) + Math.PI * 2) % (Math.PI * 2);
  };
  var calculateGradientDirection = function calculateGradientDirection(angle, width, height) {
    var radian = typeof angle === 'number' ? angle : getAngleFromCorner(angle, width, height);
    var lineLength = Math.abs(width * Math.sin(radian)) + Math.abs(height * Math.cos(radian));
    var halfWidth = width / 2;
    var halfHeight = height / 2;
    var halfLineLength = lineLength / 2;
    var yDiff = Math.sin(radian - Math.PI / 2) * halfLineLength;
    var xDiff = Math.cos(radian - Math.PI / 2) * halfLineLength;
    return [lineLength, halfWidth - xDiff, halfWidth + xDiff, halfHeight - yDiff, halfHeight + yDiff];
  };
  var distance = function distance(a, b) {return Math.sqrt(a * a + b * b);};
  var findCorner = function findCorner(width, height, x, y, closest) {
    var corners = [[0, 0], [0, height], [width, 0], [width, height]];
    return corners.reduce(function (stat, corner) {
      var cx = corner[0],cy = corner[1];
      var d = distance(x - cx, y - cy);
      if (closest ? d < stat.optimumDistance : d > stat.optimumDistance) {
        return {
          optimumCorner: corner,
          optimumDistance: d };

      }
      return stat;
    }, {
      optimumDistance: closest ? Infinity : -Infinity,
      optimumCorner: null }).
    optimumCorner;
  };
  var calculateRadius = function calculateRadius(gradient, x, y, width, height) {
    var rx = 0;
    var ry = 0;
    switch (gradient.size) {
      case CSSRadialExtent.CLOSEST_SIDE:
        // The ending shape is sized so that that it exactly meets the side of the gradient box closest to the gradient’s center.
        // If the shape is an ellipse, it exactly meets the closest side in each dimension.
        if (gradient.shape === CSSRadialShape.CIRCLE) {
          rx = ry = Math.min(Math.abs(x), Math.abs(x - width), Math.abs(y), Math.abs(y - height));
        } else
        if (gradient.shape === CSSRadialShape.ELLIPSE) {
          rx = Math.min(Math.abs(x), Math.abs(x - width));
          ry = Math.min(Math.abs(y), Math.abs(y - height));
        }
        break;
      case CSSRadialExtent.CLOSEST_CORNER:
        // The ending shape is sized so that that it passes through the corner of the gradient box closest to the gradient’s center.
        // If the shape is an ellipse, the ending shape is given the same aspect-ratio it would have if closest-side were specified.
        if (gradient.shape === CSSRadialShape.CIRCLE) {
          rx = ry = Math.min(distance(x, y), distance(x, y - height), distance(x - width, y), distance(x - width, y - height));
        } else
        if (gradient.shape === CSSRadialShape.ELLIPSE) {
          // Compute the ratio ry/rx (which is to be the same as for "closest-side")
          var c = Math.min(Math.abs(y), Math.abs(y - height)) / Math.min(Math.abs(x), Math.abs(x - width));
          var _a = findCorner(width, height, x, y, true),cx = _a[0],cy = _a[1];
          rx = distance(cx - x, (cy - y) / c);
          ry = c * rx;
        }
        break;
      case CSSRadialExtent.FARTHEST_SIDE:
        // Same as closest-side, except the ending shape is sized based on the farthest side(s)
        if (gradient.shape === CSSRadialShape.CIRCLE) {
          rx = ry = Math.max(Math.abs(x), Math.abs(x - width), Math.abs(y), Math.abs(y - height));
        } else
        if (gradient.shape === CSSRadialShape.ELLIPSE) {
          rx = Math.max(Math.abs(x), Math.abs(x - width));
          ry = Math.max(Math.abs(y), Math.abs(y - height));
        }
        break;
      case CSSRadialExtent.FARTHEST_CORNER:
        // Same as closest-corner, except the ending shape is sized based on the farthest corner.
        // If the shape is an ellipse, the ending shape is given the same aspect ratio it would have if farthest-side were specified.
        if (gradient.shape === CSSRadialShape.CIRCLE) {
          rx = ry = Math.max(distance(x, y), distance(x, y - height), distance(x - width, y), distance(x - width, y - height));
        } else
        if (gradient.shape === CSSRadialShape.ELLIPSE) {
          // Compute the ratio ry/rx (which is to be the same as for "farthest-side")
          var c = Math.max(Math.abs(y), Math.abs(y - height)) / Math.max(Math.abs(x), Math.abs(x - width));
          var _b = findCorner(width, height, x, y, false),cx = _b[0],cy = _b[1];
          rx = distance(cx - x, (cy - y) / c);
          ry = c * rx;
        }
        break;}

    if (Array.isArray(gradient.size)) {
      rx = getAbsoluteValue(gradient.size[0], width);
      ry = gradient.size.length === 2 ? getAbsoluteValue(gradient.size[1], height) : rx;
    }
    return [rx, ry];
  };

  var linearGradient = function linearGradient(tokens) {
    var angle$1 = deg(180);
    var stops = [];
    parseFunctionArgs(tokens).forEach(function (arg, i) {
      if (i === 0) {
        var firstToken = arg[0];
        if (firstToken.type === TokenType.IDENT_TOKEN && firstToken.value === 'to') {
          angle$1 = parseNamedSide(arg);
          return;
        } else
        if (isAngle(firstToken)) {
          angle$1 = angle.parse(firstToken);
          return;
        }
      }
      var colorStop = parseColorStop(arg);
      stops.push(colorStop);
    });
    return { angle: angle$1, stops: stops, type: CSSImageType.LINEAR_GRADIENT };
  };

  var prefixLinearGradient = function prefixLinearGradient(tokens) {
    var angle$1 = deg(180);
    var stops = [];
    parseFunctionArgs(tokens).forEach(function (arg, i) {
      if (i === 0) {
        var firstToken = arg[0];
        if (firstToken.type === TokenType.IDENT_TOKEN &&
        ['top', 'left', 'right', 'bottom'].indexOf(firstToken.value) !== -1) {
          angle$1 = parseNamedSide(arg);
          return;
        } else
        if (isAngle(firstToken)) {
          angle$1 = (angle.parse(firstToken) + deg(270)) % deg(360);
          return;
        }
      }
      var colorStop = parseColorStop(arg);
      stops.push(colorStop);
    });
    return {
      angle: angle$1,
      stops: stops,
      type: CSSImageType.LINEAR_GRADIENT };

  };

  var testRangeBounds = function testRangeBounds(document) {
    var TEST_HEIGHT = 123;
    if (document.createRange) {
      var range = document.createRange();
      if (range.getBoundingClientRect) {
        var testElement = document.createElement('boundtest');
        testElement.style.height = TEST_HEIGHT + "px";
        testElement.style.display = 'block';
        document.body.appendChild(testElement);
        range.selectNode(testElement);
        var rangeBounds = range.getBoundingClientRect();
        var rangeHeight = Math.round(rangeBounds.height);
        document.body.removeChild(testElement);
        if (rangeHeight === TEST_HEIGHT) {
          return true;
        }
      }
    }
    return false;
  };
  var testCORS = function testCORS() {return typeof new Image().crossOrigin !== 'undefined';};
  var testResponseType = function testResponseType() {return typeof new XMLHttpRequest().responseType === 'string';};
  var testSVG = function testSVG(document) {
    var img = new Image();
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    if (!ctx) {
      return false;
    }
    img.src = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'></svg>";
    try {
      ctx.drawImage(img, 0, 0);
      canvas.toDataURL();
    }
    catch (e) {
      return false;
    }
    return true;
  };
  var isGreenPixel = function isGreenPixel(data) {
    return data[0] === 0 && data[1] === 255 && data[2] === 0 && data[3] === 255;
  };
  var testForeignObject = function testForeignObject(document) {
    var canvas = document.createElement('canvas');
    var size = 100;
    canvas.width = size;
    canvas.height = size;
    var ctx = canvas.getContext('2d');
    if (!ctx) {
      return Promise.reject(false);
    }
    ctx.fillStyle = 'rgb(0, 255, 0)';
    ctx.fillRect(0, 0, size, size);
    var img = new Image();
    var greenImageSrc = canvas.toDataURL();
    img.src = greenImageSrc;
    var svg = createForeignObjectSVG(size, size, 0, 0, img);
    ctx.fillStyle = 'red';
    ctx.fillRect(0, 0, size, size);
    return loadSerializedSVG(svg).
    then(function (img) {
      ctx.drawImage(img, 0, 0);
      var data = ctx.getImageData(0, 0, size, size).data;
      ctx.fillStyle = 'red';
      ctx.fillRect(0, 0, size, size);
      var node = document.createElement('div');
      node.style.backgroundImage = "url(" + greenImageSrc + ")";
      node.style.height = size + "px";
      // Firefox 55 does not render inline <img /> tags
      return isGreenPixel(data) ?
      loadSerializedSVG(createForeignObjectSVG(size, size, 0, 0, node)) :
      Promise.reject(false);
    }).
    then(function (img) {
      ctx.drawImage(img, 0, 0);
      // Edge does not render background-images
      return isGreenPixel(ctx.getImageData(0, 0, size, size).data);
    }).
    catch(function () {return false;});
  };
  var createForeignObjectSVG = function createForeignObjectSVG(width, height, x, y, node) {
    var xmlns = 'http://www.w3.org/2000/svg';
    var svg = document.createElementNS(xmlns, 'svg');
    var foreignObject = document.createElementNS(xmlns, 'foreignObject');
    svg.setAttributeNS(null, 'width', width.toString());
    svg.setAttributeNS(null, 'height', height.toString());
    foreignObject.setAttributeNS(null, 'width', '100%');
    foreignObject.setAttributeNS(null, 'height', '100%');
    foreignObject.setAttributeNS(null, 'x', x.toString());
    foreignObject.setAttributeNS(null, 'y', y.toString());
    foreignObject.setAttributeNS(null, 'externalResourcesRequired', 'true');
    svg.appendChild(foreignObject);
    foreignObject.appendChild(node);
    return svg;
  };
  var loadSerializedSVG = function loadSerializedSVG(svg) {
    return new Promise(function (resolve, reject) {
      var img = new Image();
      img.onload = function () {return resolve(img);};
      img.onerror = reject;
      img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(new XMLSerializer().serializeToString(svg));
    });
  };
  var FEATURES = {
    get SUPPORT_RANGE_BOUNDS() {
      var value = testRangeBounds(document);
      Object.defineProperty(FEATURES, 'SUPPORT_RANGE_BOUNDS', { value: value });
      return value;
    },
    get SUPPORT_SVG_DRAWING() {
      var value = testSVG(document);
      Object.defineProperty(FEATURES, 'SUPPORT_SVG_DRAWING', { value: value });
      return value;
    },
    get SUPPORT_FOREIGNOBJECT_DRAWING() {
      var value = typeof Array.from === 'function' && typeof window.fetch === 'function' ?
      testForeignObject(document) :
      Promise.resolve(false);
      Object.defineProperty(FEATURES, 'SUPPORT_FOREIGNOBJECT_DRAWING', { value: value });
      return value;
    },
    get SUPPORT_CORS_IMAGES() {
      var value = testCORS();
      Object.defineProperty(FEATURES, 'SUPPORT_CORS_IMAGES', { value: value });
      return value;
    },
    get SUPPORT_RESPONSE_TYPE() {
      var value = testResponseType();
      Object.defineProperty(FEATURES, 'SUPPORT_RESPONSE_TYPE', { value: value });
      return value;
    },
    get SUPPORT_CORS_XHR() {
      var value = ('withCredentials' in new XMLHttpRequest());
      Object.defineProperty(FEATURES, 'SUPPORT_CORS_XHR', { value: value });
      return value;
    } };


  var Logger = /** @class */function () {
    function Logger(_a) {
      var id = _a.id,enabled = _a.enabled;
      this.id = id;
      this.enabled = enabled;
      this.start = Date.now();
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Logger.prototype.debug = function () {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      if (this.enabled) {
        // eslint-disable-next-line no-console
        if (typeof window !== 'undefined' && window.console && typeof console.debug === 'function') {
          // eslint-disable-next-line no-console
          console.debug.apply(console, [this.id, this.getTime() + "ms"].concat(args));
        } else
        {
          this.info.apply(this, args);
        }
      }
    };
    Logger.prototype.getTime = function () {
      return Date.now() - this.start;
    };
    Logger.create = function (options) {
      Logger.instances[options.id] = new Logger(options);
    };
    Logger.destroy = function (id) {
      delete Logger.instances[id];
    };
    Logger.getInstance = function (id) {
      var instance = Logger.instances[id];
      if (typeof instance === 'undefined') {
        throw new Error("No logger instance found with id " + id);
      }
      return instance;
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Logger.prototype.info = function () {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      if (this.enabled) {
        // eslint-disable-next-line no-console
        if (typeof window !== 'undefined' && window.console && typeof console.info === 'function') {
          // eslint-disable-next-line no-console
          console.info.apply(console, [this.id, this.getTime() + "ms"].concat(args));
        }
      }
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Logger.prototype.error = function () {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      if (this.enabled) {
        // eslint-disable-next-line no-console
        if (typeof window !== 'undefined' && window.console && typeof console.error === 'function') {
          // eslint-disable-next-line no-console
          console.error.apply(console, [this.id, this.getTime() + "ms"].concat(args));
        } else
        {
          this.info.apply(this, args);
        }
      }
    };
    Logger.instances = {};
    return Logger;
  }();

  var CacheStorage = /** @class */function () {
    function CacheStorage() {
    }
    CacheStorage.create = function (name, options) {
      return CacheStorage._caches[name] = new Cache(name, options);
    };
    CacheStorage.destroy = function (name) {
      delete CacheStorage._caches[name];
    };
    CacheStorage.open = function (name) {
      var cache = CacheStorage._caches[name];
      if (typeof cache !== 'undefined') {
        return cache;
      }
      throw new Error("Cache with key \"" + name + "\" not found");
    };
    CacheStorage.getOrigin = function (url) {
      var link = CacheStorage._link;
      if (!link) {
        return 'about:blank';
      }
      link.href = url;
      link.href = link.href; // IE9, LOL! - http://jsfiddle.net/niklasvh/2e48b/
      return link.protocol + link.hostname + link.port;
    };
    CacheStorage.isSameOrigin = function (src) {
      return CacheStorage.getOrigin(src) === CacheStorage._origin;
    };
    CacheStorage.setContext = function (window) {
      CacheStorage._link = window.document.createElement('a');
      CacheStorage._origin = CacheStorage.getOrigin(window.location.href);
    };
    CacheStorage.getInstance = function () {
      var current = CacheStorage._current;
      if (current === null) {
        throw new Error("No cache instance attached");
      }
      return current;
    };
    CacheStorage.attachInstance = function (cache) {
      CacheStorage._current = cache;
    };
    CacheStorage.detachInstance = function () {
      CacheStorage._current = null;
    };
    CacheStorage._caches = {};
    CacheStorage._origin = 'about:blank';
    CacheStorage._current = null;
    return CacheStorage;
  }();
  var Cache = /** @class */function () {
    function Cache(id, options) {
      this.id = id;
      this._options = options;
      this._cache = {};
    }
    Cache.prototype.addImage = function (src) {
      var result = Promise.resolve();
      if (this.has(src)) {
        return result;
      }
      if (isBlobImage(src) || isRenderable(src)) {
        this._cache[src] = this.loadImage(src);
        return result;
      }
      return result;
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Cache.prototype.match = function (src) {
      return this._cache[src];
    };
    Cache.prototype.loadImage = function (key) {
      return __awaiter(this, void 0, void 0, function () {
        var isSameOrigin, useCORS, useProxy, src;
        var _this = this;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              isSameOrigin = CacheStorage.isSameOrigin(key);
              useCORS = !isInlineImage(key) && this._options.useCORS === true && FEATURES.SUPPORT_CORS_IMAGES && !isSameOrigin;
              useProxy = !isInlineImage(key) &&
              !isSameOrigin &&
              typeof this._options.proxy === 'string' &&
              FEATURES.SUPPORT_CORS_XHR &&
              !useCORS;
              if (!isSameOrigin && this._options.allowTaint === false && !isInlineImage(key) && !useProxy && !useCORS) {
                return [2 /*return*/];
              }
              src = key;
              if (!useProxy) return [3 /*break*/, 2];
              return [4 /*yield*/, this.proxy(src)];
            case 1:
              src = _a.sent();
              _a.label = 2;
            case 2:
              Logger.getInstance(this.id).debug("Added image " + key.substring(0, 256));
              return [4 /*yield*/, new Promise(function (resolve, reject) {
                var img = new Image();
                img.onload = function () {return resolve(img);};
                img.onerror = reject;
                //ios safari 10.3 taints canvas with data urls unless crossOrigin is set to anonymous
                if (isInlineBase64Image(src) || useCORS) {
                  img.crossOrigin = 'anonymous';
                }
                img.src = src;
                if (img.complete === true) {
                  // Inline XML images may fail to parse, throwing an Error later on
                  setTimeout(function () {return resolve(img);}, 500);
                }
                if (_this._options.imageTimeout > 0) {
                  setTimeout(function () {return reject("Timed out (" + _this._options.imageTimeout + "ms) loading image");}, _this._options.imageTimeout);
                }
              })];
            case 3:return [2 /*return*/, _a.sent()];}

        });
      });
    };
    Cache.prototype.has = function (key) {
      return typeof this._cache[key] !== 'undefined';
    };
    Cache.prototype.keys = function () {
      return Promise.resolve(Object.keys(this._cache));
    };
    Cache.prototype.proxy = function (src) {
      var _this = this;
      var proxy = this._options.proxy;
      if (!proxy) {
        throw new Error('No proxy defined');
      }
      var key = src.substring(0, 256);
      return new Promise(function (resolve, reject) {
        var responseType = FEATURES.SUPPORT_RESPONSE_TYPE ? 'blob' : 'text';
        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
          if (xhr.status === 200) {
            if (responseType === 'text') {
              resolve(xhr.response);
            } else
            {
              var reader_1 = new FileReader();
              reader_1.addEventListener('load', function () {return resolve(reader_1.result);}, false);
              reader_1.addEventListener('error', function (e) {return reject(e);}, false);
              reader_1.readAsDataURL(xhr.response);
            }
          } else
          {
            reject("Failed to proxy resource " + key + " with status code " + xhr.status);
          }
        };
        xhr.onerror = reject;
        xhr.open('GET', proxy + "?url=" + encodeURIComponent(src) + "&responseType=" + responseType);
        if (responseType !== 'text' && xhr instanceof XMLHttpRequest) {
          xhr.responseType = responseType;
        }
        if (_this._options.imageTimeout) {
          var timeout_1 = _this._options.imageTimeout;
          xhr.timeout = timeout_1;
          xhr.ontimeout = function () {return reject("Timed out (" + timeout_1 + "ms) proxying " + key);};
        }
        xhr.send();
      });
    };
    return Cache;
  }();
  var INLINE_SVG = /^data:image\/svg\+xml/i;
  var INLINE_BASE64 = /^data:image\/.*;base64,/i;
  var INLINE_IMG = /^data:image\/.*/i;
  var isRenderable = function isRenderable(src) {return FEATURES.SUPPORT_SVG_DRAWING || !isSVG(src);};
  var isInlineImage = function isInlineImage(src) {return INLINE_IMG.test(src);};
  var isInlineBase64Image = function isInlineBase64Image(src) {return INLINE_BASE64.test(src);};
  var isBlobImage = function isBlobImage(src) {return src.substr(0, 4) === 'blob';};
  var isSVG = function isSVG(src) {return src.substr(-3).toLowerCase() === 'svg' || INLINE_SVG.test(src);};

  var webkitGradient = function webkitGradient(tokens) {
    var angle = deg(180);
    var stops = [];
    var type = CSSImageType.LINEAR_GRADIENT;
    var shape = CSSRadialShape.CIRCLE;
    var size = CSSRadialExtent.FARTHEST_CORNER;
    var position = [];
    parseFunctionArgs(tokens).forEach(function (arg, i) {
      var firstToken = arg[0];
      if (i === 0) {
        if (isIdentToken(firstToken) && firstToken.value === 'linear') {
          type = CSSImageType.LINEAR_GRADIENT;
          return;
        } else
        if (isIdentToken(firstToken) && firstToken.value === 'radial') {
          type = CSSImageType.RADIAL_GRADIENT;
          return;
        }
      }
      if (firstToken.type === TokenType.FUNCTION) {
        if (firstToken.name === 'from') {
          var color$1 = color.parse(firstToken.values[0]);
          stops.push({ stop: ZERO_LENGTH, color: color$1 });
        } else
        if (firstToken.name === 'to') {
          var color$1 = color.parse(firstToken.values[0]);
          stops.push({ stop: HUNDRED_PERCENT, color: color$1 });
        } else
        if (firstToken.name === 'color-stop') {
          var values = firstToken.values.filter(nonFunctionArgSeparator);
          if (values.length === 2) {
            var color$1 = color.parse(values[1]);
            var stop_1 = values[0];
            if (isNumberToken(stop_1)) {
              stops.push({
                stop: { type: TokenType.PERCENTAGE_TOKEN, number: stop_1.number * 100, flags: stop_1.flags },
                color: color$1 });

            }
          }
        }
      }
    });
    return type === CSSImageType.LINEAR_GRADIENT ?
    {
      angle: (angle + deg(180)) % deg(360),
      stops: stops,
      type: type } :

    { size: size, shape: shape, stops: stops, position: position, type: type };
  };

  var CLOSEST_SIDE = 'closest-side';
  var FARTHEST_SIDE = 'farthest-side';
  var CLOSEST_CORNER = 'closest-corner';
  var FARTHEST_CORNER = 'farthest-corner';
  var CIRCLE = 'circle';
  var ELLIPSE = 'ellipse';
  var COVER = 'cover';
  var CONTAIN = 'contain';
  var radialGradient = function radialGradient(tokens) {
    var shape = CSSRadialShape.CIRCLE;
    var size = CSSRadialExtent.FARTHEST_CORNER;
    var stops = [];
    var position = [];
    parseFunctionArgs(tokens).forEach(function (arg, i) {
      var isColorStop = true;
      if (i === 0) {
        var isAtPosition_1 = false;
        isColorStop = arg.reduce(function (acc, token) {
          if (isAtPosition_1) {
            if (isIdentToken(token)) {
              switch (token.value) {
                case 'center':
                  position.push(FIFTY_PERCENT);
                  return acc;
                case 'top':
                case 'left':
                  position.push(ZERO_LENGTH);
                  return acc;
                case 'right':
                case 'bottom':
                  position.push(HUNDRED_PERCENT);
                  return acc;}

            } else
            if (isLengthPercentage(token) || isLength(token)) {
              position.push(token);
            }
          } else
          if (isIdentToken(token)) {
            switch (token.value) {
              case CIRCLE:
                shape = CSSRadialShape.CIRCLE;
                return false;
              case ELLIPSE:
                shape = CSSRadialShape.ELLIPSE;
                return false;
              case 'at':
                isAtPosition_1 = true;
                return false;
              case CLOSEST_SIDE:
                size = CSSRadialExtent.CLOSEST_SIDE;
                return false;
              case COVER:
              case FARTHEST_SIDE:
                size = CSSRadialExtent.FARTHEST_SIDE;
                return false;
              case CONTAIN:
              case CLOSEST_CORNER:
                size = CSSRadialExtent.CLOSEST_CORNER;
                return false;
              case FARTHEST_CORNER:
                size = CSSRadialExtent.FARTHEST_CORNER;
                return false;}

          } else
          if (isLength(token) || isLengthPercentage(token)) {
            if (!Array.isArray(size)) {
              size = [];
            }
            size.push(token);
            return false;
          }
          return acc;
        }, isColorStop);
      }
      if (isColorStop) {
        var colorStop = parseColorStop(arg);
        stops.push(colorStop);
      }
    });
    return { size: size, shape: shape, stops: stops, position: position, type: CSSImageType.RADIAL_GRADIENT };
  };

  var prefixRadialGradient = function prefixRadialGradient(tokens) {
    var shape = CSSRadialShape.CIRCLE;
    var size = CSSRadialExtent.FARTHEST_CORNER;
    var stops = [];
    var position = [];
    parseFunctionArgs(tokens).forEach(function (arg, i) {
      var isColorStop = true;
      if (i === 0) {
        isColorStop = arg.reduce(function (acc, token) {
          if (isIdentToken(token)) {
            switch (token.value) {
              case 'center':
                position.push(FIFTY_PERCENT);
                return false;
              case 'top':
              case 'left':
                position.push(ZERO_LENGTH);
                return false;
              case 'right':
              case 'bottom':
                position.push(HUNDRED_PERCENT);
                return false;}

          } else
          if (isLengthPercentage(token) || isLength(token)) {
            position.push(token);
            return false;
          }
          return acc;
        }, isColorStop);
      } else
      if (i === 1) {
        isColorStop = arg.reduce(function (acc, token) {
          if (isIdentToken(token)) {
            switch (token.value) {
              case CIRCLE:
                shape = CSSRadialShape.CIRCLE;
                return false;
              case ELLIPSE:
                shape = CSSRadialShape.ELLIPSE;
                return false;
              case CONTAIN:
              case CLOSEST_SIDE:
                size = CSSRadialExtent.CLOSEST_SIDE;
                return false;
              case FARTHEST_SIDE:
                size = CSSRadialExtent.FARTHEST_SIDE;
                return false;
              case CLOSEST_CORNER:
                size = CSSRadialExtent.CLOSEST_CORNER;
                return false;
              case COVER:
              case FARTHEST_CORNER:
                size = CSSRadialExtent.FARTHEST_CORNER;
                return false;}

          } else
          if (isLength(token) || isLengthPercentage(token)) {
            if (!Array.isArray(size)) {
              size = [];
            }
            size.push(token);
            return false;
          }
          return acc;
        }, isColorStop);
      }
      if (isColorStop) {
        var colorStop = parseColorStop(arg);
        stops.push(colorStop);
      }
    });
    return { size: size, shape: shape, stops: stops, position: position, type: CSSImageType.RADIAL_GRADIENT };
  };

  var CSSImageType;
  (function (CSSImageType) {
    CSSImageType[CSSImageType["URL"] = 0] = "URL";
    CSSImageType[CSSImageType["LINEAR_GRADIENT"] = 1] = "LINEAR_GRADIENT";
    CSSImageType[CSSImageType["RADIAL_GRADIENT"] = 2] = "RADIAL_GRADIENT";
  })(CSSImageType || (CSSImageType = {}));
  var isLinearGradient = function isLinearGradient(background) {
    return background.type === CSSImageType.LINEAR_GRADIENT;
  };
  var isRadialGradient = function isRadialGradient(background) {
    return background.type === CSSImageType.RADIAL_GRADIENT;
  };
  var CSSRadialShape;
  (function (CSSRadialShape) {
    CSSRadialShape[CSSRadialShape["CIRCLE"] = 0] = "CIRCLE";
    CSSRadialShape[CSSRadialShape["ELLIPSE"] = 1] = "ELLIPSE";
  })(CSSRadialShape || (CSSRadialShape = {}));
  var CSSRadialExtent;
  (function (CSSRadialExtent) {
    CSSRadialExtent[CSSRadialExtent["CLOSEST_SIDE"] = 0] = "CLOSEST_SIDE";
    CSSRadialExtent[CSSRadialExtent["FARTHEST_SIDE"] = 1] = "FARTHEST_SIDE";
    CSSRadialExtent[CSSRadialExtent["CLOSEST_CORNER"] = 2] = "CLOSEST_CORNER";
    CSSRadialExtent[CSSRadialExtent["FARTHEST_CORNER"] = 3] = "FARTHEST_CORNER";
  })(CSSRadialExtent || (CSSRadialExtent = {}));
  var image = {
    name: 'image',
    parse: function parse(value) {
      if (value.type === TokenType.URL_TOKEN) {
        var image_1 = { url: value.value, type: CSSImageType.URL };
        CacheStorage.getInstance().addImage(value.value);
        return image_1;
      }
      if (value.type === TokenType.FUNCTION) {
        var imageFunction = SUPPORTED_IMAGE_FUNCTIONS[value.name];
        if (typeof imageFunction === 'undefined') {
          throw new Error("Attempting to parse an unsupported image function \"" + value.name + "\"");
        }
        return imageFunction(value.values);
      }
      throw new Error("Unsupported image type");
    } };

  function isSupportedImage(value) {
    return value.type !== TokenType.FUNCTION || SUPPORTED_IMAGE_FUNCTIONS[value.name];
  }
  var SUPPORTED_IMAGE_FUNCTIONS = {
    'linear-gradient': linearGradient,
    '-moz-linear-gradient': prefixLinearGradient,
    '-ms-linear-gradient': prefixLinearGradient,
    '-o-linear-gradient': prefixLinearGradient,
    '-webkit-linear-gradient': prefixLinearGradient,
    'radial-gradient': radialGradient,
    '-moz-radial-gradient': prefixRadialGradient,
    '-ms-radial-gradient': prefixRadialGradient,
    '-o-radial-gradient': prefixRadialGradient,
    '-webkit-radial-gradient': prefixRadialGradient,
    '-webkit-gradient': webkitGradient };


  var backgroundImage = {
    name: 'background-image',
    initialValue: 'none',
    type: PropertyDescriptorParsingType.LIST,
    prefix: false,
    parse: function parse(tokens) {
      if (tokens.length === 0) {
        return [];
      }
      var first = tokens[0];
      if (first.type === TokenType.IDENT_TOKEN && first.value === 'none') {
        return [];
      }
      return tokens.filter(function (value) {return nonFunctionArgSeparator(value) && isSupportedImage(value);}).map(image.parse);
    } };


  var backgroundOrigin = {
    name: 'background-origin',
    initialValue: 'border-box',
    prefix: false,
    type: PropertyDescriptorParsingType.LIST,
    parse: function parse(tokens) {
      return tokens.map(function (token) {
        if (isIdentToken(token)) {
          switch (token.value) {
            case 'padding-box':
              return 1 /* PADDING_BOX */;
            case 'content-box':
              return 2 /* CONTENT_BOX */;}

        }
        return 0 /* BORDER_BOX */;
      });
    } };


  var backgroundPosition = {
    name: 'background-position',
    initialValue: '0% 0%',
    type: PropertyDescriptorParsingType.LIST,
    prefix: false,
    parse: function parse(tokens) {
      return parseFunctionArgs(tokens).
      map(function (values) {return values.filter(isLengthPercentage);}).
      map(parseLengthPercentageTuple);
    } };


  var BACKGROUND_REPEAT;
  (function (BACKGROUND_REPEAT) {
    BACKGROUND_REPEAT[BACKGROUND_REPEAT["REPEAT"] = 0] = "REPEAT";
    BACKGROUND_REPEAT[BACKGROUND_REPEAT["NO_REPEAT"] = 1] = "NO_REPEAT";
    BACKGROUND_REPEAT[BACKGROUND_REPEAT["REPEAT_X"] = 2] = "REPEAT_X";
    BACKGROUND_REPEAT[BACKGROUND_REPEAT["REPEAT_Y"] = 3] = "REPEAT_Y";
  })(BACKGROUND_REPEAT || (BACKGROUND_REPEAT = {}));
  var backgroundRepeat = {
    name: 'background-repeat',
    initialValue: 'repeat',
    prefix: false,
    type: PropertyDescriptorParsingType.LIST,
    parse: function parse(tokens) {
      return parseFunctionArgs(tokens).
      map(function (values) {
        return values.
        filter(isIdentToken).
        map(function (token) {return token.value;}).
        join(' ');
      }).
      map(parseBackgroundRepeat);
    } };

  var parseBackgroundRepeat = function parseBackgroundRepeat(value) {
    switch (value) {
      case 'no-repeat':
        return BACKGROUND_REPEAT.NO_REPEAT;
      case 'repeat-x':
      case 'repeat no-repeat':
        return BACKGROUND_REPEAT.REPEAT_X;
      case 'repeat-y':
      case 'no-repeat repeat':
        return BACKGROUND_REPEAT.REPEAT_Y;
      case 'repeat':
      default:
        return BACKGROUND_REPEAT.REPEAT;}

  };

  var BACKGROUND_SIZE;
  (function (BACKGROUND_SIZE) {
    BACKGROUND_SIZE["AUTO"] = "auto";
    BACKGROUND_SIZE["CONTAIN"] = "contain";
    BACKGROUND_SIZE["COVER"] = "cover";
  })(BACKGROUND_SIZE || (BACKGROUND_SIZE = {}));
  var backgroundSize = {
    name: 'background-size',
    initialValue: '0',
    prefix: false,
    type: PropertyDescriptorParsingType.LIST,
    parse: function parse(tokens) {
      return parseFunctionArgs(tokens).map(function (values) {return values.filter(isBackgroundSizeInfoToken);});
    } };

  var isBackgroundSizeInfoToken = function isBackgroundSizeInfoToken(value) {
    return isIdentToken(value) || isLengthPercentage(value);
  };

  var borderColorForSide = function borderColorForSide(side) {return {
      name: "border-" + side + "-color",
      initialValue: 'transparent',
      prefix: false,
      type: PropertyDescriptorParsingType.TYPE_VALUE,
      format: 'color' };
  };
  var borderTopColor = borderColorForSide('top');
  var borderRightColor = borderColorForSide('right');
  var borderBottomColor = borderColorForSide('bottom');
  var borderLeftColor = borderColorForSide('left');

  var borderRadiusForSide = function borderRadiusForSide(side) {return {
      name: "border-radius-" + side,
      initialValue: '0 0',
      prefix: false,
      type: PropertyDescriptorParsingType.LIST,
      parse: function parse(tokens) {return parseLengthPercentageTuple(tokens.filter(isLengthPercentage));} };
  };
  var borderTopLeftRadius = borderRadiusForSide('top-left');
  var borderTopRightRadius = borderRadiusForSide('top-right');
  var borderBottomRightRadius = borderRadiusForSide('bottom-right');
  var borderBottomLeftRadius = borderRadiusForSide('bottom-left');

  var BORDER_STYLE;
  (function (BORDER_STYLE) {
    BORDER_STYLE[BORDER_STYLE["NONE"] = 0] = "NONE";
    BORDER_STYLE[BORDER_STYLE["SOLID"] = 1] = "SOLID";
  })(BORDER_STYLE || (BORDER_STYLE = {}));
  var borderStyleForSide = function borderStyleForSide(side) {return {
      name: "border-" + side + "-style",
      initialValue: 'solid',
      prefix: false,
      type: PropertyDescriptorParsingType.IDENT_VALUE,
      parse: function parse(style) {
        switch (style) {
          case 'none':
            return BORDER_STYLE.NONE;}

        return BORDER_STYLE.SOLID;
      } };
  };
  var borderTopStyle = borderStyleForSide('top');
  var borderRightStyle = borderStyleForSide('right');
  var borderBottomStyle = borderStyleForSide('bottom');
  var borderLeftStyle = borderStyleForSide('left');

  var borderWidthForSide = function borderWidthForSide(side) {return {
      name: "border-" + side + "-width",
      initialValue: '0',
      type: PropertyDescriptorParsingType.VALUE,
      prefix: false,
      parse: function parse(token) {
        if (isDimensionToken(token)) {
          return token.number;
        }
        return 0;
      } };
  };
  var borderTopWidth = borderWidthForSide('top');
  var borderRightWidth = borderWidthForSide('right');
  var borderBottomWidth = borderWidthForSide('bottom');
  var borderLeftWidth = borderWidthForSide('left');

  var color$1 = {
    name: "color",
    initialValue: 'transparent',
    prefix: false,
    type: PropertyDescriptorParsingType.TYPE_VALUE,
    format: 'color' };


  var display = {
    name: 'display',
    initialValue: 'inline-block',
    prefix: false,
    type: PropertyDescriptorParsingType.LIST,
    parse: function parse(tokens) {
      return tokens.filter(isIdentToken).reduce(function (bit, token) {
        return bit | parseDisplayValue(token.value);
      }, 0 /* NONE */);
    } };

  var parseDisplayValue = function parseDisplayValue(display) {
    switch (display) {
      case 'block':
        return 2 /* BLOCK */;
      case 'inline':
        return 4 /* INLINE */;
      case 'run-in':
        return 8 /* RUN_IN */;
      case 'flow':
        return 16 /* FLOW */;
      case 'flow-root':
        return 32 /* FLOW_ROOT */;
      case 'table':
        return 64 /* TABLE */;
      case 'flex':
      case '-webkit-flex':
        return 128 /* FLEX */;
      case 'grid':
      case '-ms-grid':
        return 256 /* GRID */;
      case 'ruby':
        return 512 /* RUBY */;
      case 'subgrid':
        return 1024 /* SUBGRID */;
      case 'list-item':
        return 2048 /* LIST_ITEM */;
      case 'table-row-group':
        return 4096 /* TABLE_ROW_GROUP */;
      case 'table-header-group':
        return 8192 /* TABLE_HEADER_GROUP */;
      case 'table-footer-group':
        return 16384 /* TABLE_FOOTER_GROUP */;
      case 'table-row':
        return 32768 /* TABLE_ROW */;
      case 'table-cell':
        return 65536 /* TABLE_CELL */;
      case 'table-column-group':
        return 131072 /* TABLE_COLUMN_GROUP */;
      case 'table-column':
        return 262144 /* TABLE_COLUMN */;
      case 'table-caption':
        return 524288 /* TABLE_CAPTION */;
      case 'ruby-base':
        return 1048576 /* RUBY_BASE */;
      case 'ruby-text':
        return 2097152 /* RUBY_TEXT */;
      case 'ruby-base-container':
        return 4194304 /* RUBY_BASE_CONTAINER */;
      case 'ruby-text-container':
        return 8388608 /* RUBY_TEXT_CONTAINER */;
      case 'contents':
        return 16777216 /* CONTENTS */;
      case 'inline-block':
        return 33554432 /* INLINE_BLOCK */;
      case 'inline-list-item':
        return 67108864 /* INLINE_LIST_ITEM */;
      case 'inline-table':
        return 134217728 /* INLINE_TABLE */;
      case 'inline-flex':
        return 268435456 /* INLINE_FLEX */;
      case 'inline-grid':
        return 536870912 /* INLINE_GRID */;}

    return 0 /* NONE */;
  };

  var FLOAT;
  (function (FLOAT) {
    FLOAT[FLOAT["NONE"] = 0] = "NONE";
    FLOAT[FLOAT["LEFT"] = 1] = "LEFT";
    FLOAT[FLOAT["RIGHT"] = 2] = "RIGHT";
    FLOAT[FLOAT["INLINE_START"] = 3] = "INLINE_START";
    FLOAT[FLOAT["INLINE_END"] = 4] = "INLINE_END";
  })(FLOAT || (FLOAT = {}));
  var _float = {
    name: 'float',
    initialValue: 'none',
    prefix: false,
    type: PropertyDescriptorParsingType.IDENT_VALUE,
    parse: function parse(_float2) {
      switch (_float2) {
        case 'left':
          return FLOAT.LEFT;
        case 'right':
          return FLOAT.RIGHT;
        case 'inline-start':
          return FLOAT.INLINE_START;
        case 'inline-end':
          return FLOAT.INLINE_END;}

      return FLOAT.NONE;
    } };


  var letterSpacing = {
    name: 'letter-spacing',
    initialValue: '0',
    prefix: false,
    type: PropertyDescriptorParsingType.VALUE,
    parse: function parse(token) {
      if (token.type === TokenType.IDENT_TOKEN && token.value === 'normal') {
        return 0;
      }
      if (token.type === TokenType.NUMBER_TOKEN) {
        return token.number;
      }
      if (token.type === TokenType.DIMENSION_TOKEN) {
        return token.number;
      }
      return 0;
    } };


  var LINE_BREAK;
  (function (LINE_BREAK) {
    LINE_BREAK["NORMAL"] = "normal";
    LINE_BREAK["STRICT"] = "strict";
  })(LINE_BREAK || (LINE_BREAK = {}));
  var lineBreak = {
    name: 'line-break',
    initialValue: 'normal',
    prefix: false,
    type: PropertyDescriptorParsingType.IDENT_VALUE,
    parse: function parse(lineBreak) {
      switch (lineBreak) {
        case 'strict':
          return LINE_BREAK.STRICT;
        case 'normal':
        default:
          return LINE_BREAK.NORMAL;}

    } };


  var lineHeight = {
    name: 'line-height',
    initialValue: 'normal',
    prefix: false,
    type: PropertyDescriptorParsingType.TOKEN_VALUE };

  var computeLineHeight = function computeLineHeight(token, fontSize) {
    if (isIdentToken(token) && token.value === 'normal') {
      return 1.2 * fontSize;
    } else
    if (token.type === TokenType.NUMBER_TOKEN) {
      return fontSize * token.number;
    } else
    if (isLengthPercentage(token)) {
      return getAbsoluteValue(token, fontSize);
    }
    return fontSize;
  };

  var listStyleImage = {
    name: 'list-style-image',
    initialValue: 'none',
    type: PropertyDescriptorParsingType.VALUE,
    prefix: false,
    parse: function parse(token) {
      if (token.type === TokenType.IDENT_TOKEN && token.value === 'none') {
        return null;
      }
      return image.parse(token);
    } };


  var LIST_STYLE_POSITION;
  (function (LIST_STYLE_POSITION) {
    LIST_STYLE_POSITION[LIST_STYLE_POSITION["INSIDE"] = 0] = "INSIDE";
    LIST_STYLE_POSITION[LIST_STYLE_POSITION["OUTSIDE"] = 1] = "OUTSIDE";
  })(LIST_STYLE_POSITION || (LIST_STYLE_POSITION = {}));
  var listStylePosition = {
    name: 'list-style-position',
    initialValue: 'outside',
    prefix: false,
    type: PropertyDescriptorParsingType.IDENT_VALUE,
    parse: function parse(position) {
      switch (position) {
        case 'inside':
          return LIST_STYLE_POSITION.INSIDE;
        case 'outside':
        default:
          return LIST_STYLE_POSITION.OUTSIDE;}

    } };


  var LIST_STYLE_TYPE;
  (function (LIST_STYLE_TYPE) {
    LIST_STYLE_TYPE[LIST_STYLE_TYPE["NONE"] = -1] = "NONE";
    LIST_STYLE_TYPE[LIST_STYLE_TYPE["DISC"] = 0] = "DISC";
    LIST_STYLE_TYPE[LIST_STYLE_TYPE["CIRCLE"] = 1] = "CIRCLE";
    LIST_STYLE_TYPE[LIST_STYLE_TYPE["SQUARE"] = 2] = "SQUARE";
    LIST_STYLE_TYPE[LIST_STYLE_TYPE["DECIMAL"] = 3] = "DECIMAL";
    LIST_STYLE_TYPE[LIST_STYLE_TYPE["CJK_DECIMAL"] = 4] = "CJK_DECIMAL";
    LIST_STYLE_TYPE[LIST_STYLE_TYPE["DECIMAL_LEADING_ZERO"] = 5] = "DECIMAL_LEADING_ZERO";
    LIST_STYLE_TYPE[LIST_STYLE_TYPE["LOWER_ROMAN"] = 6] = "LOWER_ROMAN";
    LIST_STYLE_TYPE[LIST_STYLE_TYPE["UPPER_ROMAN"] = 7] = "UPPER_ROMAN";
    LIST_STYLE_TYPE[LIST_STYLE_TYPE["LOWER_GREEK"] = 8] = "LOWER_GREEK";
    LIST_STYLE_TYPE[LIST_STYLE_TYPE["LOWER_ALPHA"] = 9] = "LOWER_ALPHA";
    LIST_STYLE_TYPE[LIST_STYLE_TYPE["UPPER_ALPHA"] = 10] = "UPPER_ALPHA";
    LIST_STYLE_TYPE[LIST_STYLE_TYPE["ARABIC_INDIC"] = 11] = "ARABIC_INDIC";
    LIST_STYLE_TYPE[LIST_STYLE_TYPE["ARMENIAN"] = 12] = "ARMENIAN";
    LIST_STYLE_TYPE[LIST_STYLE_TYPE["BENGALI"] = 13] = "BENGALI";
    LIST_STYLE_TYPE[LIST_STYLE_TYPE["CAMBODIAN"] = 14] = "CAMBODIAN";
    LIST_STYLE_TYPE[LIST_STYLE_TYPE["CJK_EARTHLY_BRANCH"] = 15] = "CJK_EARTHLY_BRANCH";
    LIST_STYLE_TYPE[LIST_STYLE_TYPE["CJK_HEAVENLY_STEM"] = 16] = "CJK_HEAVENLY_STEM";
    LIST_STYLE_TYPE[LIST_STYLE_TYPE["CJK_IDEOGRAPHIC"] = 17] = "CJK_IDEOGRAPHIC";
    LIST_STYLE_TYPE[LIST_STYLE_TYPE["DEVANAGARI"] = 18] = "DEVANAGARI";
    LIST_STYLE_TYPE[LIST_STYLE_TYPE["ETHIOPIC_NUMERIC"] = 19] = "ETHIOPIC_NUMERIC";
    LIST_STYLE_TYPE[LIST_STYLE_TYPE["GEORGIAN"] = 20] = "GEORGIAN";
    LIST_STYLE_TYPE[LIST_STYLE_TYPE["GUJARATI"] = 21] = "GUJARATI";
    LIST_STYLE_TYPE[LIST_STYLE_TYPE["GURMUKHI"] = 22] = "GURMUKHI";
    LIST_STYLE_TYPE[LIST_STYLE_TYPE["HEBREW"] = 22] = "HEBREW";
    LIST_STYLE_TYPE[LIST_STYLE_TYPE["HIRAGANA"] = 23] = "HIRAGANA";
    LIST_STYLE_TYPE[LIST_STYLE_TYPE["HIRAGANA_IROHA"] = 24] = "HIRAGANA_IROHA";
    LIST_STYLE_TYPE[LIST_STYLE_TYPE["JAPANESE_FORMAL"] = 25] = "JAPANESE_FORMAL";
    LIST_STYLE_TYPE[LIST_STYLE_TYPE["JAPANESE_INFORMAL"] = 26] = "JAPANESE_INFORMAL";
    LIST_STYLE_TYPE[LIST_STYLE_TYPE["KANNADA"] = 27] = "KANNADA";
    LIST_STYLE_TYPE[LIST_STYLE_TYPE["KATAKANA"] = 28] = "KATAKANA";
    LIST_STYLE_TYPE[LIST_STYLE_TYPE["KATAKANA_IROHA"] = 29] = "KATAKANA_IROHA";
    LIST_STYLE_TYPE[LIST_STYLE_TYPE["KHMER"] = 30] = "KHMER";
    LIST_STYLE_TYPE[LIST_STYLE_TYPE["KOREAN_HANGUL_FORMAL"] = 31] = "KOREAN_HANGUL_FORMAL";
    LIST_STYLE_TYPE[LIST_STYLE_TYPE["KOREAN_HANJA_FORMAL"] = 32] = "KOREAN_HANJA_FORMAL";
    LIST_STYLE_TYPE[LIST_STYLE_TYPE["KOREAN_HANJA_INFORMAL"] = 33] = "KOREAN_HANJA_INFORMAL";
    LIST_STYLE_TYPE[LIST_STYLE_TYPE["LAO"] = 34] = "LAO";
    LIST_STYLE_TYPE[LIST_STYLE_TYPE["LOWER_ARMENIAN"] = 35] = "LOWER_ARMENIAN";
    LIST_STYLE_TYPE[LIST_STYLE_TYPE["MALAYALAM"] = 36] = "MALAYALAM";
    LIST_STYLE_TYPE[LIST_STYLE_TYPE["MONGOLIAN"] = 37] = "MONGOLIAN";
    LIST_STYLE_TYPE[LIST_STYLE_TYPE["MYANMAR"] = 38] = "MYANMAR";
    LIST_STYLE_TYPE[LIST_STYLE_TYPE["ORIYA"] = 39] = "ORIYA";
    LIST_STYLE_TYPE[LIST_STYLE_TYPE["PERSIAN"] = 40] = "PERSIAN";
    LIST_STYLE_TYPE[LIST_STYLE_TYPE["SIMP_CHINESE_FORMAL"] = 41] = "SIMP_CHINESE_FORMAL";
    LIST_STYLE_TYPE[LIST_STYLE_TYPE["SIMP_CHINESE_INFORMAL"] = 42] = "SIMP_CHINESE_INFORMAL";
    LIST_STYLE_TYPE[LIST_STYLE_TYPE["TAMIL"] = 43] = "TAMIL";
    LIST_STYLE_TYPE[LIST_STYLE_TYPE["TELUGU"] = 44] = "TELUGU";
    LIST_STYLE_TYPE[LIST_STYLE_TYPE["THAI"] = 45] = "THAI";
    LIST_STYLE_TYPE[LIST_STYLE_TYPE["TIBETAN"] = 46] = "TIBETAN";
    LIST_STYLE_TYPE[LIST_STYLE_TYPE["TRAD_CHINESE_FORMAL"] = 47] = "TRAD_CHINESE_FORMAL";
    LIST_STYLE_TYPE[LIST_STYLE_TYPE["TRAD_CHINESE_INFORMAL"] = 48] = "TRAD_CHINESE_INFORMAL";
    LIST_STYLE_TYPE[LIST_STYLE_TYPE["UPPER_ARMENIAN"] = 49] = "UPPER_ARMENIAN";
    LIST_STYLE_TYPE[LIST_STYLE_TYPE["DISCLOSURE_OPEN"] = 50] = "DISCLOSURE_OPEN";
    LIST_STYLE_TYPE[LIST_STYLE_TYPE["DISCLOSURE_CLOSED"] = 51] = "DISCLOSURE_CLOSED";
  })(LIST_STYLE_TYPE || (LIST_STYLE_TYPE = {}));
  var listStyleType = {
    name: 'list-style-type',
    initialValue: 'none',
    prefix: false,
    type: PropertyDescriptorParsingType.IDENT_VALUE,
    parse: function parse(type) {
      switch (type) {
        case 'disc':
          return LIST_STYLE_TYPE.DISC;
        case 'circle':
          return LIST_STYLE_TYPE.CIRCLE;
        case 'square':
          return LIST_STYLE_TYPE.SQUARE;
        case 'decimal':
          return LIST_STYLE_TYPE.DECIMAL;
        case 'cjk-decimal':
          return LIST_STYLE_TYPE.CJK_DECIMAL;
        case 'decimal-leading-zero':
          return LIST_STYLE_TYPE.DECIMAL_LEADING_ZERO;
        case 'lower-roman':
          return LIST_STYLE_TYPE.LOWER_ROMAN;
        case 'upper-roman':
          return LIST_STYLE_TYPE.UPPER_ROMAN;
        case 'lower-greek':
          return LIST_STYLE_TYPE.LOWER_GREEK;
        case 'lower-alpha':
          return LIST_STYLE_TYPE.LOWER_ALPHA;
        case 'upper-alpha':
          return LIST_STYLE_TYPE.UPPER_ALPHA;
        case 'arabic-indic':
          return LIST_STYLE_TYPE.ARABIC_INDIC;
        case 'armenian':
          return LIST_STYLE_TYPE.ARMENIAN;
        case 'bengali':
          return LIST_STYLE_TYPE.BENGALI;
        case 'cambodian':
          return LIST_STYLE_TYPE.CAMBODIAN;
        case 'cjk-earthly-branch':
          return LIST_STYLE_TYPE.CJK_EARTHLY_BRANCH;
        case 'cjk-heavenly-stem':
          return LIST_STYLE_TYPE.CJK_HEAVENLY_STEM;
        case 'cjk-ideographic':
          return LIST_STYLE_TYPE.CJK_IDEOGRAPHIC;
        case 'devanagari':
          return LIST_STYLE_TYPE.DEVANAGARI;
        case 'ethiopic-numeric':
          return LIST_STYLE_TYPE.ETHIOPIC_NUMERIC;
        case 'georgian':
          return LIST_STYLE_TYPE.GEORGIAN;
        case 'gujarati':
          return LIST_STYLE_TYPE.GUJARATI;
        case 'gurmukhi':
          return LIST_STYLE_TYPE.GURMUKHI;
        case 'hebrew':
          return LIST_STYLE_TYPE.HEBREW;
        case 'hiragana':
          return LIST_STYLE_TYPE.HIRAGANA;
        case 'hiragana-iroha':
          return LIST_STYLE_TYPE.HIRAGANA_IROHA;
        case 'japanese-formal':
          return LIST_STYLE_TYPE.JAPANESE_FORMAL;
        case 'japanese-informal':
          return LIST_STYLE_TYPE.JAPANESE_INFORMAL;
        case 'kannada':
          return LIST_STYLE_TYPE.KANNADA;
        case 'katakana':
          return LIST_STYLE_TYPE.KATAKANA;
        case 'katakana-iroha':
          return LIST_STYLE_TYPE.KATAKANA_IROHA;
        case 'khmer':
          return LIST_STYLE_TYPE.KHMER;
        case 'korean-hangul-formal':
          return LIST_STYLE_TYPE.KOREAN_HANGUL_FORMAL;
        case 'korean-hanja-formal':
          return LIST_STYLE_TYPE.KOREAN_HANJA_FORMAL;
        case 'korean-hanja-informal':
          return LIST_STYLE_TYPE.KOREAN_HANJA_INFORMAL;
        case 'lao':
          return LIST_STYLE_TYPE.LAO;
        case 'lower-armenian':
          return LIST_STYLE_TYPE.LOWER_ARMENIAN;
        case 'malayalam':
          return LIST_STYLE_TYPE.MALAYALAM;
        case 'mongolian':
          return LIST_STYLE_TYPE.MONGOLIAN;
        case 'myanmar':
          return LIST_STYLE_TYPE.MYANMAR;
        case 'oriya':
          return LIST_STYLE_TYPE.ORIYA;
        case 'persian':
          return LIST_STYLE_TYPE.PERSIAN;
        case 'simp-chinese-formal':
          return LIST_STYLE_TYPE.SIMP_CHINESE_FORMAL;
        case 'simp-chinese-informal':
          return LIST_STYLE_TYPE.SIMP_CHINESE_INFORMAL;
        case 'tamil':
          return LIST_STYLE_TYPE.TAMIL;
        case 'telugu':
          return LIST_STYLE_TYPE.TELUGU;
        case 'thai':
          return LIST_STYLE_TYPE.THAI;
        case 'tibetan':
          return LIST_STYLE_TYPE.TIBETAN;
        case 'trad-chinese-formal':
          return LIST_STYLE_TYPE.TRAD_CHINESE_FORMAL;
        case 'trad-chinese-informal':
          return LIST_STYLE_TYPE.TRAD_CHINESE_INFORMAL;
        case 'upper-armenian':
          return LIST_STYLE_TYPE.UPPER_ARMENIAN;
        case 'disclosure-open':
          return LIST_STYLE_TYPE.DISCLOSURE_OPEN;
        case 'disclosure-closed':
          return LIST_STYLE_TYPE.DISCLOSURE_CLOSED;
        case 'none':
        default:
          return LIST_STYLE_TYPE.NONE;}

    } };


  var marginForSide = function marginForSide(side) {return {
      name: "margin-" + side,
      initialValue: '0',
      prefix: false,
      type: PropertyDescriptorParsingType.TOKEN_VALUE };
  };
  var marginTop = marginForSide('top');
  var marginRight = marginForSide('right');
  var marginBottom = marginForSide('bottom');
  var marginLeft = marginForSide('left');

  var OVERFLOW;
  (function (OVERFLOW) {
    OVERFLOW[OVERFLOW["VISIBLE"] = 0] = "VISIBLE";
    OVERFLOW[OVERFLOW["HIDDEN"] = 1] = "HIDDEN";
    OVERFLOW[OVERFLOW["SCROLL"] = 2] = "SCROLL";
    OVERFLOW[OVERFLOW["AUTO"] = 3] = "AUTO";
  })(OVERFLOW || (OVERFLOW = {}));
  var overflow = {
    name: 'overflow',
    initialValue: 'visible',
    prefix: false,
    type: PropertyDescriptorParsingType.LIST,
    parse: function parse(tokens) {
      return tokens.filter(isIdentToken).map(function (overflow) {
        switch (overflow.value) {
          case 'hidden':
            return OVERFLOW.HIDDEN;
          case 'scroll':
            return OVERFLOW.SCROLL;
          case 'auto':
            return OVERFLOW.AUTO;
          case 'visible':
          default:
            return OVERFLOW.VISIBLE;}

      });
    } };


  var OVERFLOW_WRAP;
  (function (OVERFLOW_WRAP) {
    OVERFLOW_WRAP["NORMAL"] = "normal";
    OVERFLOW_WRAP["BREAK_WORD"] = "break-word";
  })(OVERFLOW_WRAP || (OVERFLOW_WRAP = {}));
  var overflowWrap = {
    name: 'overflow-wrap',
    initialValue: 'normal',
    prefix: false,
    type: PropertyDescriptorParsingType.IDENT_VALUE,
    parse: function parse(overflow) {
      switch (overflow) {
        case 'break-word':
          return OVERFLOW_WRAP.BREAK_WORD;
        case 'normal':
        default:
          return OVERFLOW_WRAP.NORMAL;}

    } };


  var paddingForSide = function paddingForSide(side) {return {
      name: "padding-" + side,
      initialValue: '0',
      prefix: false,
      type: PropertyDescriptorParsingType.TYPE_VALUE,
      format: 'length-percentage' };
  };
  var paddingTop = paddingForSide('top');
  var paddingRight = paddingForSide('right');
  var paddingBottom = paddingForSide('bottom');
  var paddingLeft = paddingForSide('left');

  var TEXT_ALIGN;
  (function (TEXT_ALIGN) {
    TEXT_ALIGN[TEXT_ALIGN["LEFT"] = 0] = "LEFT";
    TEXT_ALIGN[TEXT_ALIGN["CENTER"] = 1] = "CENTER";
    TEXT_ALIGN[TEXT_ALIGN["RIGHT"] = 2] = "RIGHT";
  })(TEXT_ALIGN || (TEXT_ALIGN = {}));
  var textAlign = {
    name: 'text-align',
    initialValue: 'left',
    prefix: false,
    type: PropertyDescriptorParsingType.IDENT_VALUE,
    parse: function parse(textAlign) {
      switch (textAlign) {
        case 'right':
          return TEXT_ALIGN.RIGHT;
        case 'center':
        case 'justify':
          return TEXT_ALIGN.CENTER;
        case 'left':
        default:
          return TEXT_ALIGN.LEFT;}

    } };


  var POSITION;
  (function (POSITION) {
    POSITION[POSITION["STATIC"] = 0] = "STATIC";
    POSITION[POSITION["RELATIVE"] = 1] = "RELATIVE";
    POSITION[POSITION["ABSOLUTE"] = 2] = "ABSOLUTE";
    POSITION[POSITION["FIXED"] = 3] = "FIXED";
    POSITION[POSITION["STICKY"] = 4] = "STICKY";
  })(POSITION || (POSITION = {}));
  var position = {
    name: 'position',
    initialValue: 'static',
    prefix: false,
    type: PropertyDescriptorParsingType.IDENT_VALUE,
    parse: function parse(position) {
      switch (position) {
        case 'relative':
          return POSITION.RELATIVE;
        case 'absolute':
          return POSITION.ABSOLUTE;
        case 'fixed':
          return POSITION.FIXED;
        case 'sticky':
          return POSITION.STICKY;}

      return POSITION.STATIC;
    } };


  var textShadow = {
    name: 'text-shadow',
    initialValue: 'none',
    type: PropertyDescriptorParsingType.LIST,
    prefix: false,
    parse: function parse(tokens) {
      if (tokens.length === 1 && isIdentWithValue(tokens[0], 'none')) {
        return [];
      }
      return parseFunctionArgs(tokens).map(function (values) {
        var shadow = {
          color: COLORS.TRANSPARENT,
          offsetX: ZERO_LENGTH,
          offsetY: ZERO_LENGTH,
          blur: ZERO_LENGTH };

        var c = 0;
        for (var i = 0; i < values.length; i++) {
          var token = values[i];
          if (isLength(token)) {
            if (c === 0) {
              shadow.offsetX = token;
            } else
            if (c === 1) {
              shadow.offsetY = token;
            } else
            {
              shadow.blur = token;
            }
            c++;
          } else
          {
            shadow.color = color.parse(token);
          }
        }
        return shadow;
      });
    } };


  var TEXT_TRANSFORM;
  (function (TEXT_TRANSFORM) {
    TEXT_TRANSFORM[TEXT_TRANSFORM["NONE"] = 0] = "NONE";
    TEXT_TRANSFORM[TEXT_TRANSFORM["LOWERCASE"] = 1] = "LOWERCASE";
    TEXT_TRANSFORM[TEXT_TRANSFORM["UPPERCASE"] = 2] = "UPPERCASE";
    TEXT_TRANSFORM[TEXT_TRANSFORM["CAPITALIZE"] = 3] = "CAPITALIZE";
  })(TEXT_TRANSFORM || (TEXT_TRANSFORM = {}));
  var textTransform = {
    name: 'text-transform',
    initialValue: 'none',
    prefix: false,
    type: PropertyDescriptorParsingType.IDENT_VALUE,
    parse: function parse(textTransform) {
      switch (textTransform) {
        case 'uppercase':
          return TEXT_TRANSFORM.UPPERCASE;
        case 'lowercase':
          return TEXT_TRANSFORM.LOWERCASE;
        case 'capitalize':
          return TEXT_TRANSFORM.CAPITALIZE;}

      return TEXT_TRANSFORM.NONE;
    } };


  var transform = {
    name: 'transform',
    initialValue: 'none',
    prefix: true,
    type: PropertyDescriptorParsingType.VALUE,
    parse: function parse(token) {
      if (token.type === TokenType.IDENT_TOKEN && token.value === 'none') {
        return null;
      }
      if (token.type === TokenType.FUNCTION) {
        var transformFunction = SUPPORTED_TRANSFORM_FUNCTIONS[token.name];
        if (typeof transformFunction === 'undefined') {
          throw new Error("Attempting to parse an unsupported transform function \"" + token.name + "\"");
        }
        return transformFunction(token.values);
      }
      return null;
    } };

  var matrix = function matrix(args) {
    var values = args.filter(function (arg) {return arg.type === TokenType.NUMBER_TOKEN;}).map(function (arg) {return arg.number;});
    return values.length === 6 ? values : null;
  };
  // doesn't support 3D transforms at the moment
  var matrix3d = function matrix3d(args) {
    var values = args.filter(function (arg) {return arg.type === TokenType.NUMBER_TOKEN;}).map(function (arg) {return arg.number;});
    var a1 = values[0],b1 = values[1],_a = values[2],_b = values[3],a2 = values[4],b2 = values[5],_c = values[6],_d = values[7],_e = values[8],_f = values[9],_g = values[10],_h = values[11],a4 = values[12],b4 = values[13],_j = values[14],_k = values[15];
    return values.length === 16 ? [a1, b1, a2, b2, a4, b4] : null;
  };
  var SUPPORTED_TRANSFORM_FUNCTIONS = {
    matrix: matrix,
    matrix3d: matrix3d };


  var DEFAULT_VALUE = {
    type: TokenType.PERCENTAGE_TOKEN,
    number: 50,
    flags: FLAG_INTEGER };

  var DEFAULT = [DEFAULT_VALUE, DEFAULT_VALUE];
  var transformOrigin = {
    name: 'transform-origin',
    initialValue: '50% 50%',
    prefix: true,
    type: PropertyDescriptorParsingType.LIST,
    parse: function parse(tokens) {
      var origins = tokens.filter(isLengthPercentage);
      if (origins.length !== 2) {
        return DEFAULT;
      }
      return [origins[0], origins[1]];
    } };


  var VISIBILITY;
  (function (VISIBILITY) {
    VISIBILITY[VISIBILITY["VISIBLE"] = 0] = "VISIBLE";
    VISIBILITY[VISIBILITY["HIDDEN"] = 1] = "HIDDEN";
    VISIBILITY[VISIBILITY["COLLAPSE"] = 2] = "COLLAPSE";
  })(VISIBILITY || (VISIBILITY = {}));
  var visibility = {
    name: 'visible',
    initialValue: 'none',
    prefix: false,
    type: PropertyDescriptorParsingType.IDENT_VALUE,
    parse: function parse(visibility) {
      switch (visibility) {
        case 'hidden':
          return VISIBILITY.HIDDEN;
        case 'collapse':
          return VISIBILITY.COLLAPSE;
        case 'visible':
        default:
          return VISIBILITY.VISIBLE;}

    } };


  var WORD_BREAK;
  (function (WORD_BREAK) {
    WORD_BREAK["NORMAL"] = "normal";
    WORD_BREAK["BREAK_ALL"] = "break-all";
    WORD_BREAK["KEEP_ALL"] = "keep-all";
  })(WORD_BREAK || (WORD_BREAK = {}));
  var wordBreak = {
    name: 'word-break',
    initialValue: 'normal',
    prefix: false,
    type: PropertyDescriptorParsingType.IDENT_VALUE,
    parse: function parse(wordBreak) {
      switch (wordBreak) {
        case 'break-all':
          return WORD_BREAK.BREAK_ALL;
        case 'keep-all':
          return WORD_BREAK.KEEP_ALL;
        case 'normal':
        default:
          return WORD_BREAK.NORMAL;}

    } };


  var zIndex = {
    name: 'z-index',
    initialValue: 'auto',
    prefix: false,
    type: PropertyDescriptorParsingType.VALUE,
    parse: function parse(token) {
      if (token.type === TokenType.IDENT_TOKEN) {
        return { auto: true, order: 0 };
      }
      if (isNumberToken(token)) {
        return { auto: false, order: token.number };
      }
      throw new Error("Invalid z-index number parsed");
    } };


  var opacity = {
    name: 'opacity',
    initialValue: '1',
    type: PropertyDescriptorParsingType.VALUE,
    prefix: false,
    parse: function parse(token) {
      if (isNumberToken(token)) {
        return token.number;
      }
      return 1;
    } };


  var textDecorationColor = {
    name: "text-decoration-color",
    initialValue: 'transparent',
    prefix: false,
    type: PropertyDescriptorParsingType.TYPE_VALUE,
    format: 'color' };


  var textDecorationLine = {
    name: 'text-decoration-line',
    initialValue: 'none',
    prefix: false,
    type: PropertyDescriptorParsingType.LIST,
    parse: function parse(tokens) {
      return tokens.
      filter(isIdentToken).
      map(function (token) {
        switch (token.value) {
          case 'underline':
            return 1 /* UNDERLINE */;
          case 'overline':
            return 2 /* OVERLINE */;
          case 'line-through':
            return 3 /* LINE_THROUGH */;
          case 'none':
            return 4 /* BLINK */;}

        return 0 /* NONE */;
      }).
      filter(function (line) {return line !== 0 /* NONE */;});
    } };


  var fontFamily = {
    name: "font-family",
    initialValue: '',
    prefix: false,
    type: PropertyDescriptorParsingType.LIST,
    parse: function parse(tokens) {
      var accumulator = [];
      var results = [];
      tokens.forEach(function (token) {
        switch (token.type) {
          case TokenType.IDENT_TOKEN:
          case TokenType.STRING_TOKEN:
            accumulator.push(token.value);
            break;
          case TokenType.NUMBER_TOKEN:
            accumulator.push(token.number.toString());
            break;
          case TokenType.COMMA_TOKEN:
            results.push(accumulator.join(' '));
            accumulator.length = 0;
            break;}

      });
      if (accumulator.length) {
        results.push(accumulator.join(' '));
      }
      return results.map(function (result) {return result.indexOf(' ') === -1 ? result : "'" + result + "'";});
    } };


  var fontSize = {
    name: "font-size",
    initialValue: '0',
    prefix: false,
    type: PropertyDescriptorParsingType.TYPE_VALUE,
    format: 'length' };


  var fontWeight = {
    name: 'font-weight',
    initialValue: 'normal',
    type: PropertyDescriptorParsingType.VALUE,
    prefix: false,
    parse: function parse(token) {
      if (isNumberToken(token)) {
        return token.number;
      }
      if (isIdentToken(token)) {
        switch (token.value) {
          case 'bold':
            return 700;
          case 'normal':
          default:
            return 400;}

      }
      return 400;
    } };


  var fontVariant = {
    name: 'font-variant',
    initialValue: 'none',
    type: PropertyDescriptorParsingType.LIST,
    prefix: false,
    parse: function parse(tokens) {
      return tokens.filter(isIdentToken).map(function (token) {return token.value;});
    } };


  var FONT_STYLE;
  (function (FONT_STYLE) {
    FONT_STYLE["NORMAL"] = "normal";
    FONT_STYLE["ITALIC"] = "italic";
    FONT_STYLE["OBLIQUE"] = "oblique";
  })(FONT_STYLE || (FONT_STYLE = {}));
  var fontStyle = {
    name: 'font-style',
    initialValue: 'normal',
    prefix: false,
    type: PropertyDescriptorParsingType.IDENT_VALUE,
    parse: function parse(overflow) {
      switch (overflow) {
        case 'oblique':
          return FONT_STYLE.OBLIQUE;
        case 'italic':
          return FONT_STYLE.ITALIC;
        case 'normal':
        default:
          return FONT_STYLE.NORMAL;}

    } };


  var contains = function contains(bit, value) {return (bit & value) !== 0;};

  var content = {
    name: 'content',
    initialValue: 'none',
    type: PropertyDescriptorParsingType.LIST,
    prefix: false,
    parse: function parse(tokens) {
      if (tokens.length === 0) {
        return [];
      }
      var first = tokens[0];
      if (first.type === TokenType.IDENT_TOKEN && first.value === 'none') {
        return [];
      }
      return tokens;
    } };


  var counterIncrement = {
    name: 'counter-increment',
    initialValue: 'none',
    prefix: true,
    type: PropertyDescriptorParsingType.LIST,
    parse: function parse(tokens) {
      if (tokens.length === 0) {
        return null;
      }
      var first = tokens[0];
      if (first.type === TokenType.IDENT_TOKEN && first.value === 'none') {
        return null;
      }
      var increments = [];
      var filtered = tokens.filter(nonWhiteSpace);
      for (var i = 0; i < filtered.length; i++) {
        var counter = filtered[i];
        var next = filtered[i + 1];
        if (counter.type === TokenType.IDENT_TOKEN) {
          var increment = next && isNumberToken(next) ? next.number : 1;
          increments.push({ counter: counter.value, increment: increment });
        }
      }
      return increments;
    } };


  var counterReset = {
    name: 'counter-reset',
    initialValue: 'none',
    prefix: true,
    type: PropertyDescriptorParsingType.LIST,
    parse: function parse(tokens) {
      if (tokens.length === 0) {
        return [];
      }
      var resets = [];
      var filtered = tokens.filter(nonWhiteSpace);
      for (var i = 0; i < filtered.length; i++) {
        var counter = filtered[i];
        var next = filtered[i + 1];
        if (isIdentToken(counter) && counter.value !== 'none') {
          var reset = next && isNumberToken(next) ? next.number : 0;
          resets.push({ counter: counter.value, reset: reset });
        }
      }
      return resets;
    } };


  var quotes = {
    name: 'quotes',
    initialValue: 'none',
    prefix: true,
    type: PropertyDescriptorParsingType.LIST,
    parse: function parse(tokens) {
      if (tokens.length === 0) {
        return null;
      }
      var first = tokens[0];
      if (first.type === TokenType.IDENT_TOKEN && first.value === 'none') {
        return null;
      }
      var quotes = [];
      var filtered = tokens.filter(isStringToken);
      if (filtered.length % 2 !== 0) {
        return null;
      }
      for (var i = 0; i < filtered.length; i += 2) {
        var open_1 = filtered[i].value;
        var close_1 = filtered[i + 1].value;
        quotes.push({ open: open_1, close: close_1 });
      }
      return quotes;
    } };

  var getQuote = function getQuote(quotes, depth, open) {
    if (!quotes) {
      return '';
    }
    var quote = quotes[Math.min(depth, quotes.length - 1)];
    if (!quote) {
      return '';
    }
    return open ? quote.open : quote.close;
  };

  var boxShadow = {
    name: 'box-shadow',
    initialValue: 'none',
    type: PropertyDescriptorParsingType.LIST,
    prefix: false,
    parse: function parse(tokens) {
      if (tokens.length === 1 && isIdentWithValue(tokens[0], 'none')) {
        return [];
      }
      return parseFunctionArgs(tokens).map(function (values) {
        var shadow = {
          color: 0x000000ff,
          offsetX: ZERO_LENGTH,
          offsetY: ZERO_LENGTH,
          blur: ZERO_LENGTH,
          spread: ZERO_LENGTH,
          inset: false };

        var c = 0;
        for (var i = 0; i < values.length; i++) {
          var token = values[i];
          if (isIdentWithValue(token, 'inset')) {
            shadow.inset = true;
          } else
          if (isLength(token)) {
            if (c === 0) {
              shadow.offsetX = token;
            } else
            if (c === 1) {
              shadow.offsetY = token;
            } else
            if (c === 2) {
              shadow.blur = token;
            } else
            {
              shadow.spread = token;
            }
            c++;
          } else
          {
            shadow.color = color.parse(token);
          }
        }
        return shadow;
      });
    } };


  var CSSParsedDeclaration = /** @class */function () {
    function CSSParsedDeclaration(declaration) {
      this.backgroundClip = parse(backgroundClip, declaration.backgroundClip);
      this.backgroundColor = parse(backgroundColor, declaration.backgroundColor);
      this.backgroundImage = parse(backgroundImage, declaration.backgroundImage);
      this.backgroundOrigin = parse(backgroundOrigin, declaration.backgroundOrigin);
      this.backgroundPosition = parse(backgroundPosition, declaration.backgroundPosition);
      this.backgroundRepeat = parse(backgroundRepeat, declaration.backgroundRepeat);
      this.backgroundSize = parse(backgroundSize, declaration.backgroundSize);
      this.borderTopColor = parse(borderTopColor, declaration.borderTopColor);
      this.borderRightColor = parse(borderRightColor, declaration.borderRightColor);
      this.borderBottomColor = parse(borderBottomColor, declaration.borderBottomColor);
      this.borderLeftColor = parse(borderLeftColor, declaration.borderLeftColor);
      this.borderTopLeftRadius = parse(borderTopLeftRadius, declaration.borderTopLeftRadius);
      this.borderTopRightRadius = parse(borderTopRightRadius, declaration.borderTopRightRadius);
      this.borderBottomRightRadius = parse(borderBottomRightRadius, declaration.borderBottomRightRadius);
      this.borderBottomLeftRadius = parse(borderBottomLeftRadius, declaration.borderBottomLeftRadius);
      this.borderTopStyle = parse(borderTopStyle, declaration.borderTopStyle);
      this.borderRightStyle = parse(borderRightStyle, declaration.borderRightStyle);
      this.borderBottomStyle = parse(borderBottomStyle, declaration.borderBottomStyle);
      this.borderLeftStyle = parse(borderLeftStyle, declaration.borderLeftStyle);
      this.borderTopWidth = parse(borderTopWidth, declaration.borderTopWidth);
      this.borderRightWidth = parse(borderRightWidth, declaration.borderRightWidth);
      this.borderBottomWidth = parse(borderBottomWidth, declaration.borderBottomWidth);
      this.borderLeftWidth = parse(borderLeftWidth, declaration.borderLeftWidth);
      this.boxShadow = parse(boxShadow, declaration.boxShadow);
      this.color = parse(color$1, declaration.color);
      this.display = parse(display, declaration.display);
      this.float = parse(_float, declaration.cssFloat);
      this.fontFamily = parse(fontFamily, declaration.fontFamily);
      this.fontSize = parse(fontSize, declaration.fontSize);
      this.fontStyle = parse(fontStyle, declaration.fontStyle);
      this.fontVariant = parse(fontVariant, declaration.fontVariant);
      this.fontWeight = parse(fontWeight, declaration.fontWeight);
      this.letterSpacing = parse(letterSpacing, declaration.letterSpacing);
      this.lineBreak = parse(lineBreak, declaration.lineBreak);
      this.lineHeight = parse(lineHeight, declaration.lineHeight);
      this.listStyleImage = parse(listStyleImage, declaration.listStyleImage);
      this.listStylePosition = parse(listStylePosition, declaration.listStylePosition);
      this.listStyleType = parse(listStyleType, declaration.listStyleType);
      this.marginTop = parse(marginTop, declaration.marginTop);
      this.marginRight = parse(marginRight, declaration.marginRight);
      this.marginBottom = parse(marginBottom, declaration.marginBottom);
      this.marginLeft = parse(marginLeft, declaration.marginLeft);
      this.opacity = parse(opacity, declaration.opacity);
      var overflowTuple = parse(overflow, declaration.overflow);
      this.overflowX = overflowTuple[0];
      this.overflowY = overflowTuple[overflowTuple.length > 1 ? 1 : 0];
      this.overflowWrap = parse(overflowWrap, declaration.overflowWrap);
      this.paddingTop = parse(paddingTop, declaration.paddingTop);
      this.paddingRight = parse(paddingRight, declaration.paddingRight);
      this.paddingBottom = parse(paddingBottom, declaration.paddingBottom);
      this.paddingLeft = parse(paddingLeft, declaration.paddingLeft);
      this.position = parse(position, declaration.position);
      this.textAlign = parse(textAlign, declaration.textAlign);
      this.textDecorationColor = parse(textDecorationColor, declaration.textDecorationColor || declaration.color);
      this.textDecorationLine = parse(textDecorationLine, declaration.textDecorationLine);
      this.textShadow = parse(textShadow, declaration.textShadow);
      this.textTransform = parse(textTransform, declaration.textTransform);
      this.transform = parse(transform, declaration.transform);
      this.transformOrigin = parse(transformOrigin, declaration.transformOrigin);
      this.visibility = parse(visibility, declaration.visibility);
      this.wordBreak = parse(wordBreak, declaration.wordBreak);
      this.zIndex = parse(zIndex, declaration.zIndex);
    }
    CSSParsedDeclaration.prototype.isVisible = function () {
      return this.display > 0 && this.opacity > 0 && this.visibility === VISIBILITY.VISIBLE;
    };
    CSSParsedDeclaration.prototype.isTransparent = function () {
      return isTransparent(this.backgroundColor);
    };
    CSSParsedDeclaration.prototype.isTransformed = function () {
      return this.transform !== null;
    };
    CSSParsedDeclaration.prototype.isPositioned = function () {
      return this.position !== POSITION.STATIC;
    };
    CSSParsedDeclaration.prototype.isPositionedWithZIndex = function () {
      return this.isPositioned() && !this.zIndex.auto;
    };
    CSSParsedDeclaration.prototype.isFloating = function () {
      return this.float !== FLOAT.NONE;
    };
    CSSParsedDeclaration.prototype.isInlineLevel = function () {
      return contains(this.display, 4 /* INLINE */) ||
      contains(this.display, 33554432 /* INLINE_BLOCK */) ||
      contains(this.display, 268435456 /* INLINE_FLEX */) ||
      contains(this.display, 536870912 /* INLINE_GRID */) ||
      contains(this.display, 67108864 /* INLINE_LIST_ITEM */) ||
      contains(this.display, 134217728 /* INLINE_TABLE */);
    };
    return CSSParsedDeclaration;
  }();
  var CSSParsedPseudoDeclaration = /** @class */function () {
    function CSSParsedPseudoDeclaration(declaration) {
      this.content = parse(content, declaration.content);
      this.quotes = parse(quotes, declaration.quotes);
    }
    return CSSParsedPseudoDeclaration;
  }();
  var CSSParsedCounterDeclaration = /** @class */function () {
    function CSSParsedCounterDeclaration(declaration) {
      this.counterIncrement = parse(counterIncrement, declaration.counterIncrement);
      this.counterReset = parse(counterReset, declaration.counterReset);
    }
    return CSSParsedCounterDeclaration;
  }();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  var parse = function parse(descriptor, style) {
    var tokenizer = new Tokenizer();
    var value = style !== null && typeof style !== 'undefined' ? style.toString() : descriptor.initialValue;
    tokenizer.write(value);
    var parser = new Parser(tokenizer.read());
    switch (descriptor.type) {
      case PropertyDescriptorParsingType.IDENT_VALUE:
        var token = parser.parseComponentValue();
        return descriptor.parse(isIdentToken(token) ? token.value : descriptor.initialValue);
      case PropertyDescriptorParsingType.VALUE:
        return descriptor.parse(parser.parseComponentValue());
      case PropertyDescriptorParsingType.LIST:
        return descriptor.parse(parser.parseComponentValues());
      case PropertyDescriptorParsingType.TOKEN_VALUE:
        return parser.parseComponentValue();
      case PropertyDescriptorParsingType.TYPE_VALUE:
        switch (descriptor.format) {
          case 'angle':
            return angle.parse(parser.parseComponentValue());
          case 'color':
            return color.parse(parser.parseComponentValue());
          case 'image':
            return image.parse(parser.parseComponentValue());
          case 'length':
            var length_1 = parser.parseComponentValue();
            return isLength(length_1) ? length_1 : ZERO_LENGTH;
          case 'length-percentage':
            var value_1 = parser.parseComponentValue();
            return isLengthPercentage(value_1) ? value_1 : ZERO_LENGTH;}}


    throw new Error("Attempting to parse unsupported css format type " + descriptor.format);
  };

  var ElementContainer = /** @class */function () {
    function ElementContainer(element) {
      this.styles = new CSSParsedDeclaration(window.getComputedStyle(element, null));
      this.textNodes = [];
      this.elements = [];
      if (this.styles.transform !== null && isHTMLElementNode(element)) {
        // getBoundingClientRect takes transforms into account
        element.style.transform = 'none';
      }
      this.bounds = parseBounds(element);
      this.flags = 0;
    }
    return ElementContainer;
  }();

  var TextBounds = /** @class */function () {
    function TextBounds(text, bounds) {
      this.text = text;
      this.bounds = bounds;
    }
    return TextBounds;
  }();
  var parseTextBounds = function parseTextBounds(value, styles, node) {
    var textList = breakText(value, styles);
    var textBounds = [];
    var offset = 0;
    textList.forEach(function (text) {
      if (styles.textDecorationLine.length || text.trim().length > 0) {
        if (FEATURES.SUPPORT_RANGE_BOUNDS) {
          textBounds.push(new TextBounds(text, getRangeBounds(node, offset, text.length)));
        } else
        {
          var replacementNode = node.splitText(text.length);
          textBounds.push(new TextBounds(text, getWrapperBounds(node)));
          node = replacementNode;
        }
      } else
      if (!FEATURES.SUPPORT_RANGE_BOUNDS) {
        node = node.splitText(text.length);
      }
      offset += text.length;
    });
    return textBounds;
  };
  var getWrapperBounds = function getWrapperBounds(node) {
    var ownerDocument = node.ownerDocument;
    if (ownerDocument) {
      var wrapper = ownerDocument.createElement('html2canvaswrapper');
      wrapper.appendChild(node.cloneNode(true));
      var parentNode = node.parentNode;
      if (parentNode) {
        parentNode.replaceChild(wrapper, node);
        var bounds = parseBounds(wrapper);
        if (wrapper.firstChild) {
          parentNode.replaceChild(wrapper.firstChild, wrapper);
        }
        return bounds;
      }
    }
    return new Bounds(0, 0, 0, 0);
  };
  var getRangeBounds = function getRangeBounds(node, offset, length) {
    var ownerDocument = node.ownerDocument;
    if (!ownerDocument) {
      throw new Error('Node has no owner document');
    }
    var range = ownerDocument.createRange();
    range.setStart(node, offset);
    range.setEnd(node, offset + length);
    return Bounds.fromClientRect(range.getBoundingClientRect());
  };
  var breakText = function breakText(value, styles) {
    return styles.letterSpacing !== 0 ? toCodePoints(value).map(function (i) {return fromCodePoint(i);}) : breakWords(value, styles);
  };
  var breakWords = function breakWords(str, styles) {
    var breaker = LineBreaker(str, {
      lineBreak: styles.lineBreak,
      wordBreak: styles.overflowWrap === OVERFLOW_WRAP.BREAK_WORD ? 'break-word' : styles.wordBreak });

    var words = [];
    var bk;
    while (!(bk = breaker.next()).done) {
      if (bk.value) {
        words.push(bk.value.slice());
      }
    }
    return words;
  };

  var TextContainer = /** @class */function () {
    function TextContainer(node, styles) {
      this.text = transform$1(node.data, styles.textTransform);
      this.textBounds = parseTextBounds(this.text, styles, node);
    }
    return TextContainer;
  }();
  var transform$1 = function transform$1(text, transform) {
    switch (transform) {
      case TEXT_TRANSFORM.LOWERCASE:
        return text.toLowerCase();
      case TEXT_TRANSFORM.CAPITALIZE:
        return text.replace(CAPITALIZE, capitalize);
      case TEXT_TRANSFORM.UPPERCASE:
        return text.toUpperCase();
      default:
        return text;}

  };
  var CAPITALIZE = /(^|\s|:|-|\(|\))([a-z])/g;
  var capitalize = function capitalize(m, p1, p2) {
    if (m.length > 0) {
      return p1 + p2.toUpperCase();
    }
    return m;
  };

  var ImageElementContainer = /** @class */function (_super) {
    __extends(ImageElementContainer, _super);
    function ImageElementContainer(img) {
      var _this = _super.call(this, img) || this;
      _this.src = img.currentSrc || img.src;
      _this.intrinsicWidth = img.naturalWidth;
      _this.intrinsicHeight = img.naturalHeight;
      CacheStorage.getInstance().addImage(_this.src);
      return _this;
    }
    return ImageElementContainer;
  }(ElementContainer);

  var CanvasElementContainer = /** @class */function (_super) {
    __extends(CanvasElementContainer, _super);
    function CanvasElementContainer(canvas) {
      var _this = _super.call(this, canvas) || this;
      _this.canvas = canvas;
      _this.intrinsicWidth = canvas.width;
      _this.intrinsicHeight = canvas.height;
      return _this;
    }
    return CanvasElementContainer;
  }(ElementContainer);

  var SVGElementContainer = /** @class */function (_super) {
    __extends(SVGElementContainer, _super);
    function SVGElementContainer(img) {
      var _this = _super.call(this, img) || this;
      var s = new XMLSerializer();
      _this.svg = "data:image/svg+xml," + encodeURIComponent(s.serializeToString(img));
      _this.intrinsicWidth = img.width.baseVal.value;
      _this.intrinsicHeight = img.height.baseVal.value;
      CacheStorage.getInstance().addImage(_this.svg);
      return _this;
    }
    return SVGElementContainer;
  }(ElementContainer);

  var LIElementContainer = /** @class */function (_super) {
    __extends(LIElementContainer, _super);
    function LIElementContainer(element) {
      var _this = _super.call(this, element) || this;
      _this.value = element.value;
      return _this;
    }
    return LIElementContainer;
  }(ElementContainer);

  var OLElementContainer = /** @class */function (_super) {
    __extends(OLElementContainer, _super);
    function OLElementContainer(element) {
      var _this = _super.call(this, element) || this;
      _this.start = element.start;
      _this.reversed = typeof element.reversed === 'boolean' && element.reversed === true;
      return _this;
    }
    return OLElementContainer;
  }(ElementContainer);

  var CHECKBOX_BORDER_RADIUS = [
  {
    type: TokenType.DIMENSION_TOKEN,
    flags: 0,
    unit: 'px',
    number: 3 }];


  var RADIO_BORDER_RADIUS = [
  {
    type: TokenType.PERCENTAGE_TOKEN,
    flags: 0,
    number: 50 }];


  var reformatInputBounds = function reformatInputBounds(bounds) {
    if (bounds.width > bounds.height) {
      return new Bounds(bounds.left + (bounds.width - bounds.height) / 2, bounds.top, bounds.height, bounds.height);
    } else
    if (bounds.width < bounds.height) {
      return new Bounds(bounds.left, bounds.top + (bounds.height - bounds.width) / 2, bounds.width, bounds.width);
    }
    return bounds;
  };
  var getInputValue = function getInputValue(node) {
    var value = node.type === PASSWORD ? new Array(node.value.length + 1).join("\u2022") : node.value;
    return value.length === 0 ? node.placeholder || '' : value;
  };
  var CHECKBOX = 'checkbox';
  var RADIO = 'radio';
  var PASSWORD = 'password';
  var INPUT_COLOR = 0x2a2a2aff;
  var InputElementContainer = /** @class */function (_super) {
    __extends(InputElementContainer, _super);
    function InputElementContainer(input) {
      var _this = _super.call(this, input) || this;
      _this.type = input.type.toLowerCase();
      _this.checked = input.checked;
      _this.value = getInputValue(input);
      if (_this.type === CHECKBOX || _this.type === RADIO) {
        _this.styles.backgroundColor = 0xdededeff;
        _this.styles.borderTopColor = _this.styles.borderRightColor = _this.styles.borderBottomColor = _this.styles.borderLeftColor = 0xa5a5a5ff;
        _this.styles.borderTopWidth = _this.styles.borderRightWidth = _this.styles.borderBottomWidth = _this.styles.borderLeftWidth = 1;
        _this.styles.borderTopStyle = _this.styles.borderRightStyle = _this.styles.borderBottomStyle = _this.styles.borderLeftStyle =
        BORDER_STYLE.SOLID;
        _this.styles.backgroundClip = [BACKGROUND_CLIP.BORDER_BOX];
        _this.styles.backgroundOrigin = [0 /* BORDER_BOX */];
        _this.bounds = reformatInputBounds(_this.bounds);
      }
      switch (_this.type) {
        case CHECKBOX:
          _this.styles.borderTopRightRadius = _this.styles.borderTopLeftRadius = _this.styles.borderBottomRightRadius = _this.styles.borderBottomLeftRadius = CHECKBOX_BORDER_RADIUS;
          break;
        case RADIO:
          _this.styles.borderTopRightRadius = _this.styles.borderTopLeftRadius = _this.styles.borderBottomRightRadius = _this.styles.borderBottomLeftRadius = RADIO_BORDER_RADIUS;
          break;}

      return _this;
    }
    return InputElementContainer;
  }(ElementContainer);

  var SelectElementContainer = /** @class */function (_super) {
    __extends(SelectElementContainer, _super);
    function SelectElementContainer(element) {
      var _this = _super.call(this, element) || this;
      var option = element.options[element.selectedIndex || 0];
      _this.value = option ? option.text || '' : '';
      return _this;
    }
    return SelectElementContainer;
  }(ElementContainer);

  var TextareaElementContainer = /** @class */function (_super) {
    __extends(TextareaElementContainer, _super);
    function TextareaElementContainer(element) {
      var _this = _super.call(this, element) || this;
      _this.value = element.value;
      return _this;
    }
    return TextareaElementContainer;
  }(ElementContainer);

  var parseColor = function parseColor(value) {return color.parse(Parser.create(value).parseComponentValue());};
  var IFrameElementContainer = /** @class */function (_super) {
    __extends(IFrameElementContainer, _super);
    function IFrameElementContainer(iframe) {
      var _this = _super.call(this, iframe) || this;
      _this.src = iframe.src;
      _this.width = parseInt(iframe.width, 10) || 0;
      _this.height = parseInt(iframe.height, 10) || 0;
      _this.backgroundColor = _this.styles.backgroundColor;
      try {
        if (iframe.contentWindow &&
        iframe.contentWindow.document &&
        iframe.contentWindow.document.documentElement) {
          _this.tree = parseTree(iframe.contentWindow.document.documentElement);
          // http://www.w3.org/TR/css3-background/#special-backgrounds
          var documentBackgroundColor = iframe.contentWindow.document.documentElement ?
          parseColor(getComputedStyle(iframe.contentWindow.document.documentElement).
          backgroundColor) :
          COLORS.TRANSPARENT;
          var bodyBackgroundColor = iframe.contentWindow.document.body ?
          parseColor(getComputedStyle(iframe.contentWindow.document.body).backgroundColor) :
          COLORS.TRANSPARENT;
          _this.backgroundColor = isTransparent(documentBackgroundColor) ?
          isTransparent(bodyBackgroundColor) ?
          _this.styles.backgroundColor :
          bodyBackgroundColor :
          documentBackgroundColor;
        }
      }
      catch (e) {}
      return _this;
    }
    return IFrameElementContainer;
  }(ElementContainer);

  var LIST_OWNERS = ['OL', 'UL', 'MENU'];
  var parseNodeTree = function parseNodeTree(node, parent, root) {
    for (var childNode = node.firstChild, nextNode = void 0; childNode; childNode = nextNode) {
      nextNode = childNode.nextSibling;
      if (isTextNode(childNode) && childNode.data.trim().length > 0) {
        parent.textNodes.push(new TextContainer(childNode, parent.styles));
      } else
      if (isElementNode(childNode)) {
        var container = createContainer(childNode);
        if (container.styles.isVisible()) {
          if (createsRealStackingContext(childNode, container, root)) {
            container.flags |= 4 /* CREATES_REAL_STACKING_CONTEXT */;
          } else
          if (createsStackingContext(container.styles)) {
            container.flags |= 2 /* CREATES_STACKING_CONTEXT */;
          }
          if (LIST_OWNERS.indexOf(childNode.tagName) !== -1) {
            container.flags |= 8 /* IS_LIST_OWNER */;
          }
          parent.elements.push(container);
          if (!isTextareaElement(childNode) && !isSVGElement(childNode) && !isSelectElement(childNode)) {
            parseNodeTree(childNode, container, root);
          }
        }
      }
    }
  };
  var createContainer = function createContainer(element) {
    if (isImageElement(element)) {
      return new ImageElementContainer(element);
    }
    if (isCanvasElement(element)) {
      return new CanvasElementContainer(element);
    }
    if (isSVGElement(element)) {
      return new SVGElementContainer(element);
    }
    if (isLIElement(element)) {
      return new LIElementContainer(element);
    }
    if (isOLElement(element)) {
      return new OLElementContainer(element);
    }
    if (isInputElement(element)) {
      return new InputElementContainer(element);
    }
    if (isSelectElement(element)) {
      return new SelectElementContainer(element);
    }
    if (isTextareaElement(element)) {
      return new TextareaElementContainer(element);
    }
    if (isIFrameElement(element)) {
      return new IFrameElementContainer(element);
    }
    return new ElementContainer(element);
  };
  var parseTree = function parseTree(element) {
    var container = createContainer(element);
    container.flags |= 4 /* CREATES_REAL_STACKING_CONTEXT */;
    parseNodeTree(element, container, container);
    return container;
  };
  var createsRealStackingContext = function createsRealStackingContext(node, container, root) {
    return container.styles.isPositionedWithZIndex() ||
    container.styles.opacity < 1 ||
    container.styles.isTransformed() ||
    isBodyElement(node) && root.styles.isTransparent();
  };
  var createsStackingContext = function createsStackingContext(styles) {return styles.isPositioned() || styles.isFloating();};
  var isTextNode = function isTextNode(node) {return node.nodeType === Node.TEXT_NODE;};
  var isElementNode = function isElementNode(node) {return node.nodeType === Node.ELEMENT_NODE;};
  var isHTMLElementNode = function isHTMLElementNode(node) {
    return isElementNode(node) && typeof node.style !== 'undefined' && !isSVGElementNode(node);
  };
  var isSVGElementNode = function isSVGElementNode(element) {
    return typeof element.className === 'object';
  };
  var isLIElement = function isLIElement(node) {return node.tagName === 'LI';};
  var isOLElement = function isOLElement(node) {return node.tagName === 'OL';};
  var isInputElement = function isInputElement(node) {return node.tagName === 'INPUT';};
  var isHTMLElement = function isHTMLElement(node) {return node.tagName === 'HTML';};
  var isSVGElement = function isSVGElement(node) {return node.tagName === 'svg';};
  var isBodyElement = function isBodyElement(node) {return node.tagName === 'BODY';};
  var isCanvasElement = function isCanvasElement(node) {return node.tagName === 'CANVAS';};
  var isImageElement = function isImageElement(node) {return node.tagName === 'IMG';};
  var isIFrameElement = function isIFrameElement(node) {return node.tagName === 'IFRAME';};
  var isStyleElement = function isStyleElement(node) {return node.tagName === 'STYLE';};
  var isScriptElement = function isScriptElement(node) {return node.tagName === 'SCRIPT';};
  var isTextareaElement = function isTextareaElement(node) {return node.tagName === 'TEXTAREA';};
  var isSelectElement = function isSelectElement(node) {return node.tagName === 'SELECT';};

  var CounterState = /** @class */function () {
    function CounterState() {
      this.counters = {};
    }
    CounterState.prototype.getCounterValue = function (name) {
      var counter = this.counters[name];
      if (counter && counter.length) {
        return counter[counter.length - 1];
      }
      return 1;
    };
    CounterState.prototype.getCounterValues = function (name) {
      var counter = this.counters[name];
      return counter ? counter : [];
    };
    CounterState.prototype.pop = function (counters) {
      var _this = this;
      counters.forEach(function (counter) {return _this.counters[counter].pop();});
    };
    CounterState.prototype.parse = function (style) {
      var _this = this;
      var counterIncrement = style.counterIncrement;
      var counterReset = style.counterReset;
      var canReset = true;
      if (counterIncrement !== null) {
        counterIncrement.forEach(function (entry) {
          var counter = _this.counters[entry.counter];
          if (counter && entry.increment !== 0) {
            canReset = false;
            counter[Math.max(0, counter.length - 1)] += entry.increment;
          }
        });
      }
      var counterNames = [];
      if (canReset) {
        counterReset.forEach(function (entry) {
          var counter = _this.counters[entry.counter];
          counterNames.push(entry.counter);
          if (!counter) {
            counter = _this.counters[entry.counter] = [];
          }
          counter.push(entry.reset);
        });
      }
      return counterNames;
    };
    return CounterState;
  }();
  var ROMAN_UPPER = {
    integers: [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1],
    values: ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'] };

  var ARMENIAN = {
    integers: [
    9000,
    8000,
    7000,
    6000,
    5000,
    4000,
    3000,
    2000,
    1000,
    900,
    800,
    700,
    600,
    500,
    400,
    300,
    200,
    100,
    90,
    80,
    70,
    60,
    50,
    40,
    30,
    20,
    10,
    9,
    8,
    7,
    6,
    5,
    4,
    3,
    2,
    1],

    values: [
    'Ք',
    'Փ',
    'Ւ',
    'Ց',
    'Ր',
    'Տ',
    'Վ',
    'Ս',
    'Ռ',
    'Ջ',
    'Պ',
    'Չ',
    'Ո',
    'Շ',
    'Ն',
    'Յ',
    'Մ',
    'Ճ',
    'Ղ',
    'Ձ',
    'Հ',
    'Կ',
    'Ծ',
    'Խ',
    'Լ',
    'Ի',
    'Ժ',
    'Թ',
    'Ը',
    'Է',
    'Զ',
    'Ե',
    'Դ',
    'Գ',
    'Բ',
    'Ա'] };


  var HEBREW = {
    integers: [
    10000,
    9000,
    8000,
    7000,
    6000,
    5000,
    4000,
    3000,
    2000,
    1000,
    400,
    300,
    200,
    100,
    90,
    80,
    70,
    60,
    50,
    40,
    30,
    20,
    19,
    18,
    17,
    16,
    15,
    10,
    9,
    8,
    7,
    6,
    5,
    4,
    3,
    2,
    1],

    values: [
    'י׳',
    'ט׳',
    'ח׳',
    'ז׳',
    'ו׳',
    'ה׳',
    'ד׳',
    'ג׳',
    'ב׳',
    'א׳',
    'ת',
    'ש',
    'ר',
    'ק',
    'צ',
    'פ',
    'ע',
    'ס',
    'נ',
    'מ',
    'ל',
    'כ',
    'יט',
    'יח',
    'יז',
    'טז',
    'טו',
    'י',
    'ט',
    'ח',
    'ז',
    'ו',
    'ה',
    'ד',
    'ג',
    'ב',
    'א'] };


  var GEORGIAN = {
    integers: [
    10000,
    9000,
    8000,
    7000,
    6000,
    5000,
    4000,
    3000,
    2000,
    1000,
    900,
    800,
    700,
    600,
    500,
    400,
    300,
    200,
    100,
    90,
    80,
    70,
    60,
    50,
    40,
    30,
    20,
    10,
    9,
    8,
    7,
    6,
    5,
    4,
    3,
    2,
    1],

    values: [
    'ჵ',
    'ჰ',
    'ჯ',
    'ჴ',
    'ხ',
    'ჭ',
    'წ',
    'ძ',
    'ც',
    'ჩ',
    'შ',
    'ყ',
    'ღ',
    'ქ',
    'ფ',
    'ჳ',
    'ტ',
    'ს',
    'რ',
    'ჟ',
    'პ',
    'ო',
    'ჲ',
    'ნ',
    'მ',
    'ლ',
    'კ',
    'ი',
    'თ',
    'ჱ',
    'ზ',
    'ვ',
    'ე',
    'დ',
    'გ',
    'ბ',
    'ა'] };


  var createAdditiveCounter = function createAdditiveCounter(value, min, max, symbols, fallback, suffix) {
    if (value < min || value > max) {
      return createCounterText(value, fallback, suffix.length > 0);
    }
    return symbols.integers.reduce(function (string, integer, index) {
      while (value >= integer) {
        value -= integer;
        string += symbols.values[index];
      }
      return string;
    }, '') + suffix;
  };
  var createCounterStyleWithSymbolResolver = function createCounterStyleWithSymbolResolver(value, codePointRangeLength, isNumeric, resolver) {
    var string = '';
    do {
      if (!isNumeric) {
        value--;
      }
      string = resolver(value) + string;
      value /= codePointRangeLength;
    } while (value * codePointRangeLength >= codePointRangeLength);
    return string;
  };
  var createCounterStyleFromRange = function createCounterStyleFromRange(value, codePointRangeStart, codePointRangeEnd, isNumeric, suffix) {
    var codePointRangeLength = codePointRangeEnd - codePointRangeStart + 1;
    return (value < 0 ? '-' : '') + (
    createCounterStyleWithSymbolResolver(Math.abs(value), codePointRangeLength, isNumeric, function (codePoint) {
      return fromCodePoint(Math.floor(codePoint % codePointRangeLength) + codePointRangeStart);
    }) +
    suffix);
  };
  var createCounterStyleFromSymbols = function createCounterStyleFromSymbols(value, symbols, suffix) {
    if (suffix === void 0) {suffix = '. ';}
    var codePointRangeLength = symbols.length;
    return createCounterStyleWithSymbolResolver(Math.abs(value), codePointRangeLength, false, function (codePoint) {return symbols[Math.floor(codePoint % codePointRangeLength)];}) + suffix;
  };
  var CJK_ZEROS = 1 << 0;
  var CJK_TEN_COEFFICIENTS = 1 << 1;
  var CJK_TEN_HIGH_COEFFICIENTS = 1 << 2;
  var CJK_HUNDRED_COEFFICIENTS = 1 << 3;
  var createCJKCounter = function createCJKCounter(value, numbers, multipliers, negativeSign, suffix, flags) {
    if (value < -9999 || value > 9999) {
      return createCounterText(value, LIST_STYLE_TYPE.CJK_DECIMAL, suffix.length > 0);
    }
    var tmp = Math.abs(value);
    var string = suffix;
    if (tmp === 0) {
      return numbers[0] + string;
    }
    for (var digit = 0; tmp > 0 && digit <= 4; digit++) {
      var coefficient = tmp % 10;
      if (coefficient === 0 && contains(flags, CJK_ZEROS) && string !== '') {
        string = numbers[coefficient] + string;
      } else
      if (coefficient > 1 ||
      coefficient === 1 && digit === 0 ||
      coefficient === 1 && digit === 1 && contains(flags, CJK_TEN_COEFFICIENTS) ||
      coefficient === 1 && digit === 1 && contains(flags, CJK_TEN_HIGH_COEFFICIENTS) && value > 100 ||
      coefficient === 1 && digit > 1 && contains(flags, CJK_HUNDRED_COEFFICIENTS)) {
        string = numbers[coefficient] + (digit > 0 ? multipliers[digit - 1] : '') + string;
      } else
      if (coefficient === 1 && digit > 0) {
        string = multipliers[digit - 1] + string;
      }
      tmp = Math.floor(tmp / 10);
    }
    return (value < 0 ? negativeSign : '') + string;
  };
  var CHINESE_INFORMAL_MULTIPLIERS = '十百千萬';
  var CHINESE_FORMAL_MULTIPLIERS = '拾佰仟萬';
  var JAPANESE_NEGATIVE = 'マイナス';
  var KOREAN_NEGATIVE = '마이너스';
  var createCounterText = function createCounterText(value, type, appendSuffix) {
    var defaultSuffix = appendSuffix ? '. ' : '';
    var cjkSuffix = appendSuffix ? '、' : '';
    var koreanSuffix = appendSuffix ? ', ' : '';
    var spaceSuffix = appendSuffix ? ' ' : '';
    switch (type) {
      case LIST_STYLE_TYPE.DISC:
        return '•' + spaceSuffix;
      case LIST_STYLE_TYPE.CIRCLE:
        return '◦' + spaceSuffix;
      case LIST_STYLE_TYPE.SQUARE:
        return '◾' + spaceSuffix;
      case LIST_STYLE_TYPE.DECIMAL_LEADING_ZERO:
        var string = createCounterStyleFromRange(value, 48, 57, true, defaultSuffix);
        return string.length < 4 ? "0" + string : string;
      case LIST_STYLE_TYPE.CJK_DECIMAL:
        return createCounterStyleFromSymbols(value, '〇一二三四五六七八九', cjkSuffix);
      case LIST_STYLE_TYPE.LOWER_ROMAN:
        return createAdditiveCounter(value, 1, 3999, ROMAN_UPPER, LIST_STYLE_TYPE.DECIMAL, defaultSuffix).toLowerCase();
      case LIST_STYLE_TYPE.UPPER_ROMAN:
        return createAdditiveCounter(value, 1, 3999, ROMAN_UPPER, LIST_STYLE_TYPE.DECIMAL, defaultSuffix);
      case LIST_STYLE_TYPE.LOWER_GREEK:
        return createCounterStyleFromRange(value, 945, 969, false, defaultSuffix);
      case LIST_STYLE_TYPE.LOWER_ALPHA:
        return createCounterStyleFromRange(value, 97, 122, false, defaultSuffix);
      case LIST_STYLE_TYPE.UPPER_ALPHA:
        return createCounterStyleFromRange(value, 65, 90, false, defaultSuffix);
      case LIST_STYLE_TYPE.ARABIC_INDIC:
        return createCounterStyleFromRange(value, 1632, 1641, true, defaultSuffix);
      case LIST_STYLE_TYPE.ARMENIAN:
      case LIST_STYLE_TYPE.UPPER_ARMENIAN:
        return createAdditiveCounter(value, 1, 9999, ARMENIAN, LIST_STYLE_TYPE.DECIMAL, defaultSuffix);
      case LIST_STYLE_TYPE.LOWER_ARMENIAN:
        return createAdditiveCounter(value, 1, 9999, ARMENIAN, LIST_STYLE_TYPE.DECIMAL, defaultSuffix).toLowerCase();
      case LIST_STYLE_TYPE.BENGALI:
        return createCounterStyleFromRange(value, 2534, 2543, true, defaultSuffix);
      case LIST_STYLE_TYPE.CAMBODIAN:
      case LIST_STYLE_TYPE.KHMER:
        return createCounterStyleFromRange(value, 6112, 6121, true, defaultSuffix);
      case LIST_STYLE_TYPE.CJK_EARTHLY_BRANCH:
        return createCounterStyleFromSymbols(value, '子丑寅卯辰巳午未申酉戌亥', cjkSuffix);
      case LIST_STYLE_TYPE.CJK_HEAVENLY_STEM:
        return createCounterStyleFromSymbols(value, '甲乙丙丁戊己庚辛壬癸', cjkSuffix);
      case LIST_STYLE_TYPE.CJK_IDEOGRAPHIC:
      case LIST_STYLE_TYPE.TRAD_CHINESE_INFORMAL:
        return createCJKCounter(value, '零一二三四五六七八九', CHINESE_INFORMAL_MULTIPLIERS, '負', cjkSuffix, CJK_TEN_COEFFICIENTS | CJK_TEN_HIGH_COEFFICIENTS | CJK_HUNDRED_COEFFICIENTS);
      case LIST_STYLE_TYPE.TRAD_CHINESE_FORMAL:
        return createCJKCounter(value, '零壹貳參肆伍陸柒捌玖', CHINESE_FORMAL_MULTIPLIERS, '負', cjkSuffix, CJK_ZEROS | CJK_TEN_COEFFICIENTS | CJK_TEN_HIGH_COEFFICIENTS | CJK_HUNDRED_COEFFICIENTS);
      case LIST_STYLE_TYPE.SIMP_CHINESE_INFORMAL:
        return createCJKCounter(value, '零一二三四五六七八九', CHINESE_INFORMAL_MULTIPLIERS, '负', cjkSuffix, CJK_TEN_COEFFICIENTS | CJK_TEN_HIGH_COEFFICIENTS | CJK_HUNDRED_COEFFICIENTS);
      case LIST_STYLE_TYPE.SIMP_CHINESE_FORMAL:
        return createCJKCounter(value, '零壹贰叁肆伍陆柒捌玖', CHINESE_FORMAL_MULTIPLIERS, '负', cjkSuffix, CJK_ZEROS | CJK_TEN_COEFFICIENTS | CJK_TEN_HIGH_COEFFICIENTS | CJK_HUNDRED_COEFFICIENTS);
      case LIST_STYLE_TYPE.JAPANESE_INFORMAL:
        return createCJKCounter(value, '〇一二三四五六七八九', '十百千万', JAPANESE_NEGATIVE, cjkSuffix, 0);
      case LIST_STYLE_TYPE.JAPANESE_FORMAL:
        return createCJKCounter(value, '零壱弐参四伍六七八九', '拾百千万', JAPANESE_NEGATIVE, cjkSuffix, CJK_ZEROS | CJK_TEN_COEFFICIENTS | CJK_TEN_HIGH_COEFFICIENTS);
      case LIST_STYLE_TYPE.KOREAN_HANGUL_FORMAL:
        return createCJKCounter(value, '영일이삼사오육칠팔구', '십백천만', KOREAN_NEGATIVE, koreanSuffix, CJK_ZEROS | CJK_TEN_COEFFICIENTS | CJK_TEN_HIGH_COEFFICIENTS);
      case LIST_STYLE_TYPE.KOREAN_HANJA_INFORMAL:
        return createCJKCounter(value, '零一二三四五六七八九', '十百千萬', KOREAN_NEGATIVE, koreanSuffix, 0);
      case LIST_STYLE_TYPE.KOREAN_HANJA_FORMAL:
        return createCJKCounter(value, '零壹貳參四五六七八九', '拾百千', KOREAN_NEGATIVE, koreanSuffix, CJK_ZEROS | CJK_TEN_COEFFICIENTS | CJK_TEN_HIGH_COEFFICIENTS);
      case LIST_STYLE_TYPE.DEVANAGARI:
        return createCounterStyleFromRange(value, 0x966, 0x96f, true, defaultSuffix);
      case LIST_STYLE_TYPE.GEORGIAN:
        return createAdditiveCounter(value, 1, 19999, GEORGIAN, LIST_STYLE_TYPE.DECIMAL, defaultSuffix);
      case LIST_STYLE_TYPE.GUJARATI:
        return createCounterStyleFromRange(value, 0xae6, 0xaef, true, defaultSuffix);
      case LIST_STYLE_TYPE.GURMUKHI:
        return createCounterStyleFromRange(value, 0xa66, 0xa6f, true, defaultSuffix);
      case LIST_STYLE_TYPE.HEBREW:
        return createAdditiveCounter(value, 1, 10999, HEBREW, LIST_STYLE_TYPE.DECIMAL, defaultSuffix);
      case LIST_STYLE_TYPE.HIRAGANA:
        return createCounterStyleFromSymbols(value, 'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわゐゑをん');
      case LIST_STYLE_TYPE.HIRAGANA_IROHA:
        return createCounterStyleFromSymbols(value, 'いろはにほへとちりぬるをわかよたれそつねならむうゐのおくやまけふこえてあさきゆめみしゑひもせす');
      case LIST_STYLE_TYPE.KANNADA:
        return createCounterStyleFromRange(value, 0xce6, 0xcef, true, defaultSuffix);
      case LIST_STYLE_TYPE.KATAKANA:
        return createCounterStyleFromSymbols(value, 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヰヱヲン', cjkSuffix);
      case LIST_STYLE_TYPE.KATAKANA_IROHA:
        return createCounterStyleFromSymbols(value, 'イロハニホヘトチリヌルヲワカヨタレソツネナラムウヰノオクヤマケフコエテアサキユメミシヱヒモセス', cjkSuffix);
      case LIST_STYLE_TYPE.LAO:
        return createCounterStyleFromRange(value, 0xed0, 0xed9, true, defaultSuffix);
      case LIST_STYLE_TYPE.MONGOLIAN:
        return createCounterStyleFromRange(value, 0x1810, 0x1819, true, defaultSuffix);
      case LIST_STYLE_TYPE.MYANMAR:
        return createCounterStyleFromRange(value, 0x1040, 0x1049, true, defaultSuffix);
      case LIST_STYLE_TYPE.ORIYA:
        return createCounterStyleFromRange(value, 0xb66, 0xb6f, true, defaultSuffix);
      case LIST_STYLE_TYPE.PERSIAN:
        return createCounterStyleFromRange(value, 0x6f0, 0x6f9, true, defaultSuffix);
      case LIST_STYLE_TYPE.TAMIL:
        return createCounterStyleFromRange(value, 0xbe6, 0xbef, true, defaultSuffix);
      case LIST_STYLE_TYPE.TELUGU:
        return createCounterStyleFromRange(value, 0xc66, 0xc6f, true, defaultSuffix);
      case LIST_STYLE_TYPE.THAI:
        return createCounterStyleFromRange(value, 0xe50, 0xe59, true, defaultSuffix);
      case LIST_STYLE_TYPE.TIBETAN:
        return createCounterStyleFromRange(value, 0xf20, 0xf29, true, defaultSuffix);
      case LIST_STYLE_TYPE.DECIMAL:
      default:
        return createCounterStyleFromRange(value, 48, 57, true, defaultSuffix);}

  };

  var IGNORE_ATTRIBUTE = 'data-html2canvas-ignore';
  var DocumentCloner = /** @class */function () {
    function DocumentCloner(element, options) {
      this.options = options;
      this.scrolledElements = [];
      this.referenceElement = element;
      this.counters = new CounterState();
      this.quoteDepth = 0;
      if (!element.ownerDocument) {
        throw new Error('Cloned element does not have an owner document');
      }
      this.documentElement = this.cloneNode(element.ownerDocument.documentElement);
    }
    DocumentCloner.prototype.toIFrame = function (ownerDocument, windowSize) {
      var _this = this;
      var iframe = createIFrameContainer(ownerDocument, windowSize);
      if (!iframe.contentWindow) {
        return Promise.reject("Unable to find iframe window");
      }
      var scrollX = ownerDocument.defaultView.pageXOffset;
      var scrollY = ownerDocument.defaultView.pageYOffset;
      var cloneWindow = iframe.contentWindow;
      var documentClone = cloneWindow.document;
      /* Chrome doesn't detect relative background-images assigned in inline <style> sheets when fetched through getComputedStyle
                                                 if window url is about:blank, we can assign the url to current by writing onto the document
                                                 */
      var iframeLoad = iframeLoader(iframe).then(function () {return __awaiter(_this, void 0, void 0, function () {
          var onclone;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                this.scrolledElements.forEach(restoreNodeScroll);
                if (cloneWindow) {
                  cloneWindow.scrollTo(windowSize.left, windowSize.top);
                  if (/(iPad|iPhone|iPod)/g.test(navigator.userAgent) && (
                  cloneWindow.scrollY !== windowSize.top || cloneWindow.scrollX !== windowSize.left)) {
                    documentClone.documentElement.style.top = -windowSize.top + 'px';
                    documentClone.documentElement.style.left = -windowSize.left + 'px';
                    documentClone.documentElement.style.position = 'absolute';
                  }
                }
                onclone = this.options.onclone;
                if (typeof this.clonedReferenceElement === 'undefined') {
                  return [2 /*return*/, Promise.reject("Error finding the " + this.referenceElement.nodeName + " in the cloned document")];
                }
                if (!(documentClone.fonts && documentClone.fonts.ready)) return [3 /*break*/, 2];
                return [4 /*yield*/, documentClone.fonts.ready];
              case 1:
                _a.sent();
                _a.label = 2;
              case 2:
                if (typeof onclone === 'function') {
                  return [2 /*return*/, Promise.resolve().
                  then(function () {return onclone(documentClone);}).
                  then(function () {return iframe;})];
                }
                return [2 /*return*/, iframe];}

          });
        });});
      documentClone.open();
      documentClone.write(serializeDoctype(document.doctype) + "<html></html>");
      // Chrome scrolls the parent document for some reason after the write to the cloned window???
      restoreOwnerScroll(this.referenceElement.ownerDocument, scrollX, scrollY);
      documentClone.replaceChild(documentClone.adoptNode(this.documentElement), documentClone.documentElement);
      documentClone.close();
      return iframeLoad;
    };
    DocumentCloner.prototype.createElementClone = function (node) {
      if (isCanvasElement(node)) {
        return this.createCanvasClone(node);
      }
      /*
        if (isIFrameElement(node)) {
            return this.createIFrameClone(node);
        }
        */
      if (isStyleElement(node)) {
        return this.createStyleClone(node);
      }
      var clone = node.cloneNode(false);
      // @ts-ignore
      if (isImageElement(clone) && clone.loading === 'lazy') {
        // @ts-ignore
        clone.loading = 'eager';
      }
      return clone;
    };
    DocumentCloner.prototype.createStyleClone = function (node) {
      try {
        var sheet = node.sheet;
        if (sheet && sheet.cssRules) {
          var css = [].slice.call(sheet.cssRules, 0).reduce(function (css, rule) {
            if (rule && typeof rule.cssText === 'string') {
              return css + rule.cssText;
            }
            return css;
          }, '');
          var style = node.cloneNode(false);
          style.textContent = css;
          return style;
        }
      }
      catch (e) {
        // accessing node.sheet.cssRules throws a DOMException
        Logger.getInstance(this.options.id).error('Unable to access cssRules property', e);
        if (e.name !== 'SecurityError') {
          throw e;
        }
      }
      return node.cloneNode(false);
    };
    DocumentCloner.prototype.createCanvasClone = function (canvas) {
      if (this.options.inlineImages && canvas.ownerDocument) {
        var img = canvas.ownerDocument.createElement('img');
        try {
          img.src = canvas.toDataURL();
          return img;
        }
        catch (e) {
          Logger.getInstance(this.options.id).info("Unable to clone canvas contents, canvas is tainted");
        }
      }
      var clonedCanvas = canvas.cloneNode(false);
      try {
        clonedCanvas.width = canvas.width;
        clonedCanvas.height = canvas.height;
        var ctx = canvas.getContext('2d');
        var clonedCtx = clonedCanvas.getContext('2d');
        if (clonedCtx) {
          if (ctx) {
            clonedCtx.putImageData(ctx.getImageData(0, 0, canvas.width, canvas.height), 0, 0);
          } else
          {
            clonedCtx.drawImage(canvas, 0, 0);
          }
        }
        return clonedCanvas;
      }
      catch (e) {}
      return clonedCanvas;
    };
    /*
       createIFrameClone(iframe: HTMLIFrameElement) {
           const tempIframe = <HTMLIFrameElement>iframe.cloneNode(false);
           const iframeKey = generateIframeKey();
           tempIframe.setAttribute('data-html2canvas-internal-iframe-key', iframeKey);
            const {width, height} = parseBounds(iframe);
            this.resourceLoader.cache[iframeKey] = getIframeDocumentElement(iframe, this.options)
               .then(documentElement => {
                   return this.renderer(
                       documentElement,
                       {
                           allowTaint: this.options.allowTaint,
                           backgroundColor: '#ffffff',
                           canvas: null,
                           imageTimeout: this.options.imageTimeout,
                           logging: this.options.logging,
                           proxy: this.options.proxy,
                           removeContainer: this.options.removeContainer,
                           scale: this.options.scale,
                           foreignObjectRendering: this.options.foreignObjectRendering,
                           useCORS: this.options.useCORS,
                           target: new CanvasRenderer(),
                           width,
                           height,
                           x: 0,
                           y: 0,
                           windowWidth: documentElement.ownerDocument.defaultView.innerWidth,
                           windowHeight: documentElement.ownerDocument.defaultView.innerHeight,
                           scrollX: documentElement.ownerDocument.defaultView.pageXOffset,
                           scrollY: documentElement.ownerDocument.defaultView.pageYOffset
                       },
                   );
               })
               .then(
                   (canvas: HTMLCanvasElement) =>
                       new Promise((resolve, reject) => {
                           const iframeCanvas = document.createElement('img');
                           iframeCanvas.onload = () => resolve(canvas);
                           iframeCanvas.onerror = (event) => {
                               // Empty iframes may result in empty "data:," URLs, which are invalid from the <img>'s point of view
                               // and instead of `onload` cause `onerror` and unhandled rejection warnings
                               // https://github.com/niklasvh/html2canvas/issues/1502
                               iframeCanvas.src == 'data:,' ? resolve(canvas) : reject(event);
                           };
                           iframeCanvas.src = canvas.toDataURL();
                           if (tempIframe.parentNode && iframe.ownerDocument && iframe.ownerDocument.defaultView) {
                               tempIframe.parentNode.replaceChild(
                                   copyCSSStyles(
                                       iframe.ownerDocument.defaultView.getComputedStyle(iframe),
                                       iframeCanvas
                                   ),
                                   tempIframe
                               );
                           }
                       })
               );
           return tempIframe;
       }
       */


    DocumentCloner.prototype.cloneNode = function (node) {
      if (isTextNode(node)) {
        return document.createTextNode(node.data);
      }
      if (!node.ownerDocument) {
        return node.cloneNode(false);
      }
      var window = node.ownerDocument.defaultView;
      if (window && isElementNode(node) && (isHTMLElementNode(node) || isSVGElementNode(node))) {
        var clone = this.createElementClone(node);
        var style = window.getComputedStyle(node);
        var styleBefore = window.getComputedStyle(node, ':before');
        var styleAfter = window.getComputedStyle(node, ':after');
        if (this.referenceElement === node && isHTMLElementNode(clone)) {
          this.clonedReferenceElement = clone;
        }
        if (isBodyElement(clone)) {
          createPseudoHideStyles(clone);
        }
        var counters = this.counters.parse(new CSSParsedCounterDeclaration(style));
        var before = this.resolvePseudoContent(node, clone, styleBefore, PseudoElementType.BEFORE);
        for (var child = node.firstChild; child; child = child.nextSibling) {
          if (!isElementNode(child) ||
          !isScriptElement(child) &&
          !child.hasAttribute(IGNORE_ATTRIBUTE) && (
          typeof this.options.ignoreElements !== 'function' || !this.options.ignoreElements(child))) {
            if (!this.options.copyStyles || !isElementNode(child) || !isStyleElement(child)) {
              clone.appendChild(this.cloneNode(child));
            }
          }
        }
        if (before) {
          clone.insertBefore(before, clone.firstChild);
        }
        var after = this.resolvePseudoContent(node, clone, styleAfter, PseudoElementType.AFTER);
        if (after) {
          clone.appendChild(after);
        }
        this.counters.pop(counters);
        if (style && (this.options.copyStyles || isSVGElementNode(node)) && !isIFrameElement(node)) {
          copyCSSStyles(style, clone);
        }
        //this.inlineAllImages(clone);
        if (node.scrollTop !== 0 || node.scrollLeft !== 0) {
          this.scrolledElements.push([clone, node.scrollLeft, node.scrollTop]);
        }
        if ((isTextareaElement(node) || isSelectElement(node)) && (
        isTextareaElement(clone) || isSelectElement(clone))) {
          clone.value = node.value;
        }
        return clone;
      }
      return node.cloneNode(false);
    };
    DocumentCloner.prototype.resolvePseudoContent = function (node, clone, style, pseudoElt) {
      var _this = this;
      if (!style) {
        return;
      }
      var value = style.content;
      var document = clone.ownerDocument;
      if (!document || !value || value === 'none' || value === '-moz-alt-content' || style.display === 'none') {
        return;
      }
      this.counters.parse(new CSSParsedCounterDeclaration(style));
      var declaration = new CSSParsedPseudoDeclaration(style);
      var anonymousReplacedElement = document.createElement('html2canvaspseudoelement');
      copyCSSStyles(style, anonymousReplacedElement);
      declaration.content.forEach(function (token) {
        if (token.type === TokenType.STRING_TOKEN) {
          anonymousReplacedElement.appendChild(document.createTextNode(token.value));
        } else
        if (token.type === TokenType.URL_TOKEN) {
          var img = document.createElement('img');
          img.src = token.value;
          img.style.opacity = '1';
          anonymousReplacedElement.appendChild(img);
        } else
        if (token.type === TokenType.FUNCTION) {
          if (token.name === 'attr') {
            var attr = token.values.filter(isIdentToken);
            if (attr.length) {
              anonymousReplacedElement.appendChild(document.createTextNode(node.getAttribute(attr[0].value) || ''));
            }
          } else
          if (token.name === 'counter') {
            var _a = token.values.filter(nonFunctionArgSeparator),counter = _a[0],counterStyle = _a[1];
            if (counter && isIdentToken(counter)) {
              var counterState = _this.counters.getCounterValue(counter.value);
              var counterType = counterStyle && isIdentToken(counterStyle) ?
              listStyleType.parse(counterStyle.value) :
              LIST_STYLE_TYPE.DECIMAL;
              anonymousReplacedElement.appendChild(document.createTextNode(createCounterText(counterState, counterType, false)));
            }
          } else
          if (token.name === 'counters') {
            var _b = token.values.filter(nonFunctionArgSeparator),counter = _b[0],delim = _b[1],counterStyle = _b[2];
            if (counter && isIdentToken(counter)) {
              var counterStates = _this.counters.getCounterValues(counter.value);
              var counterType_1 = counterStyle && isIdentToken(counterStyle) ?
              listStyleType.parse(counterStyle.value) :
              LIST_STYLE_TYPE.DECIMAL;
              var separator = delim && delim.type === TokenType.STRING_TOKEN ? delim.value : '';
              var text = counterStates.
              map(function (value) {return createCounterText(value, counterType_1, false);}).
              join(separator);
              anonymousReplacedElement.appendChild(document.createTextNode(text));
            }
          }
        } else
        if (token.type === TokenType.IDENT_TOKEN) {
          switch (token.value) {
            case 'open-quote':
              anonymousReplacedElement.appendChild(document.createTextNode(getQuote(declaration.quotes, _this.quoteDepth++, true)));
              break;
            case 'close-quote':
              anonymousReplacedElement.appendChild(document.createTextNode(getQuote(declaration.quotes, --_this.quoteDepth, false)));
              break;
            default:
              // safari doesn't parse string tokens correctly because of lack of quotes
              anonymousReplacedElement.appendChild(document.createTextNode(token.value));}

        }
      });
      anonymousReplacedElement.className = PSEUDO_HIDE_ELEMENT_CLASS_BEFORE + " " + PSEUDO_HIDE_ELEMENT_CLASS_AFTER;
      var newClassName = pseudoElt === PseudoElementType.BEFORE ?
      " " + PSEUDO_HIDE_ELEMENT_CLASS_BEFORE :
      " " + PSEUDO_HIDE_ELEMENT_CLASS_AFTER;
      if (isSVGElementNode(clone)) {
        clone.className.baseValue += newClassName;
      } else
      {
        clone.className += newClassName;
      }
      return anonymousReplacedElement;
    };
    DocumentCloner.destroy = function (container) {
      if (container.parentNode) {
        container.parentNode.removeChild(container);
        return true;
      }
      return false;
    };
    return DocumentCloner;
  }();
  var PseudoElementType;
  (function (PseudoElementType) {
    PseudoElementType[PseudoElementType["BEFORE"] = 0] = "BEFORE";
    PseudoElementType[PseudoElementType["AFTER"] = 1] = "AFTER";
  })(PseudoElementType || (PseudoElementType = {}));
  var createIFrameContainer = function createIFrameContainer(ownerDocument, bounds) {
    var cloneIframeContainer = ownerDocument.createElement('iframe');
    cloneIframeContainer.className = 'html2canvas-container';
    cloneIframeContainer.style.visibility = 'hidden';
    cloneIframeContainer.style.position = 'fixed';
    cloneIframeContainer.style.left = '-10000px';
    cloneIframeContainer.style.top = '0px';
    cloneIframeContainer.style.border = '0';
    cloneIframeContainer.width = bounds.width.toString();
    cloneIframeContainer.height = bounds.height.toString();
    cloneIframeContainer.scrolling = 'no'; // ios won't scroll without it
    cloneIframeContainer.setAttribute(IGNORE_ATTRIBUTE, 'true');
    ownerDocument.body.appendChild(cloneIframeContainer);
    return cloneIframeContainer;
  };
  var iframeLoader = function iframeLoader(iframe) {
    return new Promise(function (resolve, reject) {
      var cloneWindow = iframe.contentWindow;
      if (!cloneWindow) {
        return reject("No window assigned for iframe");
      }
      var documentClone = cloneWindow.document;
      cloneWindow.onload = iframe.onload = documentClone.onreadystatechange = function () {
        cloneWindow.onload = iframe.onload = documentClone.onreadystatechange = null;
        var interval = setInterval(function () {
          if (documentClone.body.childNodes.length > 0 && documentClone.readyState === 'complete') {
            clearInterval(interval);
            resolve(iframe);
          }
        }, 50);
      };
    });
  };
  var copyCSSStyles = function copyCSSStyles(style, target) {
    // Edge does not provide value for cssText
    for (var i = style.length - 1; i >= 0; i--) {
      var property = style.item(i);
      // Safari shows pseudoelements if content is set
      if (property !== 'content') {
        target.style.setProperty(property, style.getPropertyValue(property));
      }
    }
    return target;
  };
  var serializeDoctype = function serializeDoctype(doctype) {
    var str = '';
    if (doctype) {
      str += '<!DOCTYPE ';
      if (doctype.name) {
        str += doctype.name;
      }
      if (doctype.internalSubset) {
        str += doctype.internalSubset;
      }
      if (doctype.publicId) {
        str += "\"" + doctype.publicId + "\"";
      }
      if (doctype.systemId) {
        str += "\"" + doctype.systemId + "\"";
      }
      str += '>';
    }
    return str;
  };
  var restoreOwnerScroll = function restoreOwnerScroll(ownerDocument, x, y) {
    if (ownerDocument &&
    ownerDocument.defaultView && (
    x !== ownerDocument.defaultView.pageXOffset || y !== ownerDocument.defaultView.pageYOffset)) {
      ownerDocument.defaultView.scrollTo(x, y);
    }
  };
  var restoreNodeScroll = function restoreNodeScroll(_a) {
    var element = _a[0],x = _a[1],y = _a[2];
    element.scrollLeft = x;
    element.scrollTop = y;
  };
  var PSEUDO_BEFORE = ':before';
  var PSEUDO_AFTER = ':after';
  var PSEUDO_HIDE_ELEMENT_CLASS_BEFORE = '___html2canvas___pseudoelement_before';
  var PSEUDO_HIDE_ELEMENT_CLASS_AFTER = '___html2canvas___pseudoelement_after';
  var PSEUDO_HIDE_ELEMENT_STYLE = "{\n    content: \"\" !important;\n    display: none !important;\n}";
  var createPseudoHideStyles = function createPseudoHideStyles(body) {
    createStyles(body, "." + PSEUDO_HIDE_ELEMENT_CLASS_BEFORE + PSEUDO_BEFORE + PSEUDO_HIDE_ELEMENT_STYLE + "\n         ." + PSEUDO_HIDE_ELEMENT_CLASS_AFTER + PSEUDO_AFTER + PSEUDO_HIDE_ELEMENT_STYLE);
  };
  var createStyles = function createStyles(body, styles) {
    var document = body.ownerDocument;
    if (document) {
      var style = document.createElement('style');
      style.textContent = styles;
      body.appendChild(style);
    }
  };

  var PathType;
  (function (PathType) {
    PathType[PathType["VECTOR"] = 0] = "VECTOR";
    PathType[PathType["BEZIER_CURVE"] = 1] = "BEZIER_CURVE";
  })(PathType || (PathType = {}));
  var equalPath = function equalPath(a, b) {
    if (a.length === b.length) {
      return a.some(function (v, i) {return v === b[i];});
    }
    return false;
  };
  var transformPath = function transformPath(path, deltaX, deltaY, deltaW, deltaH) {
    return path.map(function (point, index) {
      switch (index) {
        case 0:
          return point.add(deltaX, deltaY);
        case 1:
          return point.add(deltaX + deltaW, deltaY);
        case 2:
          return point.add(deltaX + deltaW, deltaY + deltaH);
        case 3:
          return point.add(deltaX, deltaY + deltaH);}

      return point;
    });
  };

  var Vector = /** @class */function () {
    function Vector(x, y) {
      this.type = PathType.VECTOR;
      this.x = x;
      this.y = y;
    }
    Vector.prototype.add = function (deltaX, deltaY) {
      return new Vector(this.x + deltaX, this.y + deltaY);
    };
    return Vector;
  }();

  var lerp = function lerp(a, b, t) {
    return new Vector(a.x + (b.x - a.x) * t, a.y + (b.y - a.y) * t);
  };
  var BezierCurve = /** @class */function () {
    function BezierCurve(start, startControl, endControl, end) {
      this.type = PathType.BEZIER_CURVE;
      this.start = start;
      this.startControl = startControl;
      this.endControl = endControl;
      this.end = end;
    }
    BezierCurve.prototype.subdivide = function (t, firstHalf) {
      var ab = lerp(this.start, this.startControl, t);
      var bc = lerp(this.startControl, this.endControl, t);
      var cd = lerp(this.endControl, this.end, t);
      var abbc = lerp(ab, bc, t);
      var bccd = lerp(bc, cd, t);
      var dest = lerp(abbc, bccd, t);
      return firstHalf ? new BezierCurve(this.start, ab, abbc, dest) : new BezierCurve(dest, bccd, cd, this.end);
    };
    BezierCurve.prototype.add = function (deltaX, deltaY) {
      return new BezierCurve(this.start.add(deltaX, deltaY), this.startControl.add(deltaX, deltaY), this.endControl.add(deltaX, deltaY), this.end.add(deltaX, deltaY));
    };
    BezierCurve.prototype.reverse = function () {
      return new BezierCurve(this.end, this.endControl, this.startControl, this.start);
    };
    return BezierCurve;
  }();
  var isBezierCurve = function isBezierCurve(path) {return path.type === PathType.BEZIER_CURVE;};

  var BoundCurves = /** @class */function () {
    function BoundCurves(element) {
      var styles = element.styles;
      var bounds = element.bounds;
      var _a = getAbsoluteValueForTuple(styles.borderTopLeftRadius, bounds.width, bounds.height),tlh = _a[0],tlv = _a[1];
      var _b = getAbsoluteValueForTuple(styles.borderTopRightRadius, bounds.width, bounds.height),trh = _b[0],trv = _b[1];
      var _c = getAbsoluteValueForTuple(styles.borderBottomRightRadius, bounds.width, bounds.height),brh = _c[0],brv = _c[1];
      var _d = getAbsoluteValueForTuple(styles.borderBottomLeftRadius, bounds.width, bounds.height),blh = _d[0],blv = _d[1];
      var factors = [];
      factors.push((tlh + trh) / bounds.width);
      factors.push((blh + brh) / bounds.width);
      factors.push((tlv + blv) / bounds.height);
      factors.push((trv + brv) / bounds.height);
      var maxFactor = Math.max.apply(Math, factors);
      if (maxFactor > 1) {
        tlh /= maxFactor;
        tlv /= maxFactor;
        trh /= maxFactor;
        trv /= maxFactor;
        brh /= maxFactor;
        brv /= maxFactor;
        blh /= maxFactor;
        blv /= maxFactor;
      }
      var topWidth = bounds.width - trh;
      var rightHeight = bounds.height - brv;
      var bottomWidth = bounds.width - brh;
      var leftHeight = bounds.height - blv;
      var borderTopWidth = styles.borderTopWidth;
      var borderRightWidth = styles.borderRightWidth;
      var borderBottomWidth = styles.borderBottomWidth;
      var borderLeftWidth = styles.borderLeftWidth;
      var paddingTop = getAbsoluteValue(styles.paddingTop, element.bounds.width);
      var paddingRight = getAbsoluteValue(styles.paddingRight, element.bounds.width);
      var paddingBottom = getAbsoluteValue(styles.paddingBottom, element.bounds.width);
      var paddingLeft = getAbsoluteValue(styles.paddingLeft, element.bounds.width);
      this.topLeftBorderBox =
      tlh > 0 || tlv > 0 ?
      getCurvePoints(bounds.left, bounds.top, tlh, tlv, CORNER.TOP_LEFT) :
      new Vector(bounds.left, bounds.top);
      this.topRightBorderBox =
      trh > 0 || trv > 0 ?
      getCurvePoints(bounds.left + topWidth, bounds.top, trh, trv, CORNER.TOP_RIGHT) :
      new Vector(bounds.left + bounds.width, bounds.top);
      this.bottomRightBorderBox =
      brh > 0 || brv > 0 ?
      getCurvePoints(bounds.left + bottomWidth, bounds.top + rightHeight, brh, brv, CORNER.BOTTOM_RIGHT) :
      new Vector(bounds.left + bounds.width, bounds.top + bounds.height);
      this.bottomLeftBorderBox =
      blh > 0 || blv > 0 ?
      getCurvePoints(bounds.left, bounds.top + leftHeight, blh, blv, CORNER.BOTTOM_LEFT) :
      new Vector(bounds.left, bounds.top + bounds.height);
      this.topLeftPaddingBox =
      tlh > 0 || tlv > 0 ?
      getCurvePoints(bounds.left + borderLeftWidth, bounds.top + borderTopWidth, Math.max(0, tlh - borderLeftWidth), Math.max(0, tlv - borderTopWidth), CORNER.TOP_LEFT) :
      new Vector(bounds.left + borderLeftWidth, bounds.top + borderTopWidth);
      this.topRightPaddingBox =
      trh > 0 || trv > 0 ?
      getCurvePoints(bounds.left + Math.min(topWidth, bounds.width + borderLeftWidth), bounds.top + borderTopWidth, topWidth > bounds.width + borderLeftWidth ? 0 : trh - borderLeftWidth, trv - borderTopWidth, CORNER.TOP_RIGHT) :
      new Vector(bounds.left + bounds.width - borderRightWidth, bounds.top + borderTopWidth);
      this.bottomRightPaddingBox =
      brh > 0 || brv > 0 ?
      getCurvePoints(bounds.left + Math.min(bottomWidth, bounds.width - borderLeftWidth), bounds.top + Math.min(rightHeight, bounds.height + borderTopWidth), Math.max(0, brh - borderRightWidth), brv - borderBottomWidth, CORNER.BOTTOM_RIGHT) :
      new Vector(bounds.left + bounds.width - borderRightWidth, bounds.top + bounds.height - borderBottomWidth);
      this.bottomLeftPaddingBox =
      blh > 0 || blv > 0 ?
      getCurvePoints(bounds.left + borderLeftWidth, bounds.top + leftHeight, Math.max(0, blh - borderLeftWidth), blv - borderBottomWidth, CORNER.BOTTOM_LEFT) :
      new Vector(bounds.left + borderLeftWidth, bounds.top + bounds.height - borderBottomWidth);
      this.topLeftContentBox =
      tlh > 0 || tlv > 0 ?
      getCurvePoints(bounds.left + borderLeftWidth + paddingLeft, bounds.top + borderTopWidth + paddingTop, Math.max(0, tlh - (borderLeftWidth + paddingLeft)), Math.max(0, tlv - (borderTopWidth + paddingTop)), CORNER.TOP_LEFT) :
      new Vector(bounds.left + borderLeftWidth + paddingLeft, bounds.top + borderTopWidth + paddingTop);
      this.topRightContentBox =
      trh > 0 || trv > 0 ?
      getCurvePoints(bounds.left + Math.min(topWidth, bounds.width + borderLeftWidth + paddingLeft), bounds.top + borderTopWidth + paddingTop, topWidth > bounds.width + borderLeftWidth + paddingLeft ? 0 : trh - borderLeftWidth + paddingLeft, trv - (borderTopWidth + paddingTop), CORNER.TOP_RIGHT) :
      new Vector(bounds.left + bounds.width - (borderRightWidth + paddingRight), bounds.top + borderTopWidth + paddingTop);
      this.bottomRightContentBox =
      brh > 0 || brv > 0 ?
      getCurvePoints(bounds.left + Math.min(bottomWidth, bounds.width - (borderLeftWidth + paddingLeft)), bounds.top + Math.min(rightHeight, bounds.height + borderTopWidth + paddingTop), Math.max(0, brh - (borderRightWidth + paddingRight)), brv - (borderBottomWidth + paddingBottom), CORNER.BOTTOM_RIGHT) :
      new Vector(bounds.left + bounds.width - (borderRightWidth + paddingRight), bounds.top + bounds.height - (borderBottomWidth + paddingBottom));
      this.bottomLeftContentBox =
      blh > 0 || blv > 0 ?
      getCurvePoints(bounds.left + borderLeftWidth + paddingLeft, bounds.top + leftHeight, Math.max(0, blh - (borderLeftWidth + paddingLeft)), blv - (borderBottomWidth + paddingBottom), CORNER.BOTTOM_LEFT) :
      new Vector(bounds.left + borderLeftWidth + paddingLeft, bounds.top + bounds.height - (borderBottomWidth + paddingBottom));
    }
    return BoundCurves;
  }();
  var CORNER;
  (function (CORNER) {
    CORNER[CORNER["TOP_LEFT"] = 0] = "TOP_LEFT";
    CORNER[CORNER["TOP_RIGHT"] = 1] = "TOP_RIGHT";
    CORNER[CORNER["BOTTOM_RIGHT"] = 2] = "BOTTOM_RIGHT";
    CORNER[CORNER["BOTTOM_LEFT"] = 3] = "BOTTOM_LEFT";
  })(CORNER || (CORNER = {}));
  var getCurvePoints = function getCurvePoints(x, y, r1, r2, position) {
    var kappa = 4 * ((Math.sqrt(2) - 1) / 3);
    var ox = r1 * kappa; // control point offset horizontal
    var oy = r2 * kappa; // control point offset vertical
    var xm = x + r1; // x-middle
    var ym = y + r2; // y-middle
    switch (position) {
      case CORNER.TOP_LEFT:
        return new BezierCurve(new Vector(x, ym), new Vector(x, ym - oy), new Vector(xm - ox, y), new Vector(xm, y));
      case CORNER.TOP_RIGHT:
        return new BezierCurve(new Vector(x, y), new Vector(x + ox, y), new Vector(xm, ym - oy), new Vector(xm, ym));
      case CORNER.BOTTOM_RIGHT:
        return new BezierCurve(new Vector(xm, y), new Vector(xm, y + oy), new Vector(x + ox, ym), new Vector(x, ym));
      case CORNER.BOTTOM_LEFT:
      default:
        return new BezierCurve(new Vector(xm, ym), new Vector(xm - ox, ym), new Vector(x, y + oy), new Vector(x, y));}

  };
  var calculateBorderBoxPath = function calculateBorderBoxPath(curves) {
    return [curves.topLeftBorderBox, curves.topRightBorderBox, curves.bottomRightBorderBox, curves.bottomLeftBorderBox];
  };
  var calculateContentBoxPath = function calculateContentBoxPath(curves) {
    return [
    curves.topLeftContentBox,
    curves.topRightContentBox,
    curves.bottomRightContentBox,
    curves.bottomLeftContentBox];

  };
  var calculatePaddingBoxPath = function calculatePaddingBoxPath(curves) {
    return [
    curves.topLeftPaddingBox,
    curves.topRightPaddingBox,
    curves.bottomRightPaddingBox,
    curves.bottomLeftPaddingBox];

  };

  var TransformEffect = /** @class */function () {
    function TransformEffect(offsetX, offsetY, matrix) {
      this.type = 0 /* TRANSFORM */;
      this.offsetX = offsetX;
      this.offsetY = offsetY;
      this.matrix = matrix;
      this.target = 2 /* BACKGROUND_BORDERS */ | 4 /* CONTENT */;
    }
    return TransformEffect;
  }();
  var ClipEffect = /** @class */function () {
    function ClipEffect(path, target) {
      this.type = 1 /* CLIP */;
      this.target = target;
      this.path = path;
    }
    return ClipEffect;
  }();
  var isTransformEffect = function isTransformEffect(effect) {
    return effect.type === 0 /* TRANSFORM */;
  };
  var isClipEffect = function isClipEffect(effect) {return effect.type === 1 /* CLIP */;};

  var StackingContext = /** @class */function () {
    function StackingContext(container) {
      this.element = container;
      this.inlineLevel = [];
      this.nonInlineLevel = [];
      this.negativeZIndex = [];
      this.zeroOrAutoZIndexOrTransformedOrOpacity = [];
      this.positiveZIndex = [];
      this.nonPositionedFloats = [];
      this.nonPositionedInlineLevel = [];
    }
    return StackingContext;
  }();
  var ElementPaint = /** @class */function () {
    function ElementPaint(element, parentStack) {
      this.container = element;
      this.effects = parentStack.slice(0);
      this.curves = new BoundCurves(element);
      if (element.styles.transform !== null) {
        var offsetX = element.bounds.left + element.styles.transformOrigin[0].number;
        var offsetY = element.bounds.top + element.styles.transformOrigin[1].number;
        var matrix = element.styles.transform;
        this.effects.push(new TransformEffect(offsetX, offsetY, matrix));
      }
      if (element.styles.overflowX !== OVERFLOW.VISIBLE) {
        var borderBox = calculateBorderBoxPath(this.curves);
        var paddingBox = calculatePaddingBoxPath(this.curves);
        if (equalPath(borderBox, paddingBox)) {
          this.effects.push(new ClipEffect(borderBox, 2 /* BACKGROUND_BORDERS */ | 4 /* CONTENT */));
        } else
        {
          this.effects.push(new ClipEffect(borderBox, 2 /* BACKGROUND_BORDERS */));
          this.effects.push(new ClipEffect(paddingBox, 4 /* CONTENT */));
        }
      }
    }
    ElementPaint.prototype.getParentEffects = function () {
      var effects = this.effects.slice(0);
      if (this.container.styles.overflowX !== OVERFLOW.VISIBLE) {
        var borderBox = calculateBorderBoxPath(this.curves);
        var paddingBox = calculatePaddingBoxPath(this.curves);
        if (!equalPath(borderBox, paddingBox)) {
          effects.push(new ClipEffect(paddingBox, 2 /* BACKGROUND_BORDERS */ | 4 /* CONTENT */));
        }
      }
      return effects;
    };
    return ElementPaint;
  }();
  var parseStackTree = function parseStackTree(parent, stackingContext, realStackingContext, listItems) {
    parent.container.elements.forEach(function (child) {
      var treatAsRealStackingContext = contains(child.flags, 4 /* CREATES_REAL_STACKING_CONTEXT */);
      var createsStackingContext = contains(child.flags, 2 /* CREATES_STACKING_CONTEXT */);
      var paintContainer = new ElementPaint(child, parent.getParentEffects());
      if (contains(child.styles.display, 2048 /* LIST_ITEM */)) {
        listItems.push(paintContainer);
      }
      var listOwnerItems = contains(child.flags, 8 /* IS_LIST_OWNER */) ? [] : listItems;
      if (treatAsRealStackingContext || createsStackingContext) {
        var parentStack = treatAsRealStackingContext || child.styles.isPositioned() ? realStackingContext : stackingContext;
        var stack = new StackingContext(paintContainer);
        if (child.styles.isPositioned() || child.styles.opacity < 1 || child.styles.isTransformed()) {
          var order_1 = child.styles.zIndex.order;
          if (order_1 < 0) {
            var index_1 = 0;
            parentStack.negativeZIndex.some(function (current, i) {
              if (order_1 > current.element.container.styles.zIndex.order) {
                index_1 = i;
                return false;
              } else
              if (index_1 > 0) {
                return true;
              }
              return false;
            });
            parentStack.negativeZIndex.splice(index_1, 0, stack);
          } else
          if (order_1 > 0) {
            var index_2 = 0;
            parentStack.positiveZIndex.some(function (current, i) {
              if (order_1 >= current.element.container.styles.zIndex.order) {
                index_2 = i + 1;
                return false;
              } else
              if (index_2 > 0) {
                return true;
              }
              return false;
            });
            parentStack.positiveZIndex.splice(index_2, 0, stack);
          } else
          {
            parentStack.zeroOrAutoZIndexOrTransformedOrOpacity.push(stack);
          }
        } else
        {
          if (child.styles.isFloating()) {
            parentStack.nonPositionedFloats.push(stack);
          } else
          {
            parentStack.nonPositionedInlineLevel.push(stack);
          }
        }
        parseStackTree(paintContainer, stack, treatAsRealStackingContext ? stack : realStackingContext, listOwnerItems);
      } else
      {
        if (child.styles.isInlineLevel()) {
          stackingContext.inlineLevel.push(paintContainer);
        } else
        {
          stackingContext.nonInlineLevel.push(paintContainer);
        }
        parseStackTree(paintContainer, stackingContext, realStackingContext, listOwnerItems);
      }
      if (contains(child.flags, 8 /* IS_LIST_OWNER */)) {
        processListItems(child, listOwnerItems);
      }
    });
  };
  var processListItems = function processListItems(owner, elements) {
    var numbering = owner instanceof OLElementContainer ? owner.start : 1;
    var reversed = owner instanceof OLElementContainer ? owner.reversed : false;
    for (var i = 0; i < elements.length; i++) {
      var item = elements[i];
      if (item.container instanceof LIElementContainer &&
      typeof item.container.value === 'number' &&
      item.container.value !== 0) {
        numbering = item.container.value;
      }
      item.listValue = createCounterText(numbering, item.container.styles.listStyleType, true);
      numbering += reversed ? -1 : 1;
    }
  };
  var parseStackingContexts = function parseStackingContexts(container) {
    var paintContainer = new ElementPaint(container, []);
    var root = new StackingContext(paintContainer);
    var listItems = [];
    parseStackTree(paintContainer, root, root, listItems);
    processListItems(paintContainer.container, listItems);
    return root;
  };

  var parsePathForBorder = function parsePathForBorder(curves, borderSide) {
    switch (borderSide) {
      case 0:
        return createPathFromCurves(curves.topLeftBorderBox, curves.topLeftPaddingBox, curves.topRightBorderBox, curves.topRightPaddingBox);
      case 1:
        return createPathFromCurves(curves.topRightBorderBox, curves.topRightPaddingBox, curves.bottomRightBorderBox, curves.bottomRightPaddingBox);
      case 2:
        return createPathFromCurves(curves.bottomRightBorderBox, curves.bottomRightPaddingBox, curves.bottomLeftBorderBox, curves.bottomLeftPaddingBox);
      case 3:
      default:
        return createPathFromCurves(curves.bottomLeftBorderBox, curves.bottomLeftPaddingBox, curves.topLeftBorderBox, curves.topLeftPaddingBox);}

  };
  var createPathFromCurves = function createPathFromCurves(outer1, inner1, outer2, inner2) {
    var path = [];
    if (isBezierCurve(outer1)) {
      path.push(outer1.subdivide(0.5, false));
    } else
    {
      path.push(outer1);
    }
    if (isBezierCurve(outer2)) {
      path.push(outer2.subdivide(0.5, true));
    } else
    {
      path.push(outer2);
    }
    if (isBezierCurve(inner2)) {
      path.push(inner2.subdivide(0.5, true).reverse());
    } else
    {
      path.push(inner2);
    }
    if (isBezierCurve(inner1)) {
      path.push(inner1.subdivide(0.5, false).reverse());
    } else
    {
      path.push(inner1);
    }
    return path;
  };

  var paddingBox = function paddingBox(element) {
    var bounds = element.bounds;
    var styles = element.styles;
    return bounds.add(styles.borderLeftWidth, styles.borderTopWidth, -(styles.borderRightWidth + styles.borderLeftWidth), -(styles.borderTopWidth + styles.borderBottomWidth));
  };
  var contentBox = function contentBox(element) {
    var styles = element.styles;
    var bounds = element.bounds;
    var paddingLeft = getAbsoluteValue(styles.paddingLeft, bounds.width);
    var paddingRight = getAbsoluteValue(styles.paddingRight, bounds.width);
    var paddingTop = getAbsoluteValue(styles.paddingTop, bounds.width);
    var paddingBottom = getAbsoluteValue(styles.paddingBottom, bounds.width);
    return bounds.add(paddingLeft + styles.borderLeftWidth, paddingTop + styles.borderTopWidth, -(styles.borderRightWidth + styles.borderLeftWidth + paddingLeft + paddingRight), -(styles.borderTopWidth + styles.borderBottomWidth + paddingTop + paddingBottom));
  };

  var calculateBackgroundPositioningArea = function calculateBackgroundPositioningArea(backgroundOrigin, element) {
    if (backgroundOrigin === 0 /* BORDER_BOX */) {
        return element.bounds;
      }
    if (backgroundOrigin === 2 /* CONTENT_BOX */) {
        return contentBox(element);
      }
    return paddingBox(element);
  };
  var calculateBackgroundPaintingArea = function calculateBackgroundPaintingArea(backgroundClip, element) {
    if (backgroundClip === BACKGROUND_CLIP.BORDER_BOX) {
      return element.bounds;
    }
    if (backgroundClip === BACKGROUND_CLIP.CONTENT_BOX) {
      return contentBox(element);
    }
    return paddingBox(element);
  };
  var calculateBackgroundRendering = function calculateBackgroundRendering(container, index, intrinsicSize) {
    var backgroundPositioningArea = calculateBackgroundPositioningArea(getBackgroundValueForIndex(container.styles.backgroundOrigin, index), container);
    var backgroundPaintingArea = calculateBackgroundPaintingArea(getBackgroundValueForIndex(container.styles.backgroundClip, index), container);
    var backgroundImageSize = calculateBackgroundSize(getBackgroundValueForIndex(container.styles.backgroundSize, index), intrinsicSize, backgroundPositioningArea);
    var sizeWidth = backgroundImageSize[0],sizeHeight = backgroundImageSize[1];
    var position = getAbsoluteValueForTuple(getBackgroundValueForIndex(container.styles.backgroundPosition, index), backgroundPositioningArea.width - sizeWidth, backgroundPositioningArea.height - sizeHeight);
    var path = calculateBackgroundRepeatPath(getBackgroundValueForIndex(container.styles.backgroundRepeat, index), position, backgroundImageSize, backgroundPositioningArea, backgroundPaintingArea);
    var offsetX = Math.round(backgroundPositioningArea.left + position[0]);
    var offsetY = Math.round(backgroundPositioningArea.top + position[1]);
    return [path, offsetX, offsetY, sizeWidth, sizeHeight];
  };
  var isAuto = function isAuto(token) {return isIdentToken(token) && token.value === BACKGROUND_SIZE.AUTO;};
  var hasIntrinsicValue = function hasIntrinsicValue(value) {return typeof value === 'number';};
  var calculateBackgroundSize = function calculateBackgroundSize(size, _a, bounds) {
    var intrinsicWidth = _a[0],intrinsicHeight = _a[1],intrinsicProportion = _a[2];
    var first = size[0],second = size[1];
    if (isLengthPercentage(first) && second && isLengthPercentage(second)) {
      return [getAbsoluteValue(first, bounds.width), getAbsoluteValue(second, bounds.height)];
    }
    var hasIntrinsicProportion = hasIntrinsicValue(intrinsicProportion);
    if (isIdentToken(first) && (first.value === BACKGROUND_SIZE.CONTAIN || first.value === BACKGROUND_SIZE.COVER)) {
      if (hasIntrinsicValue(intrinsicProportion)) {
        var targetRatio = bounds.width / bounds.height;
        return targetRatio < intrinsicProportion !== (first.value === BACKGROUND_SIZE.COVER) ?
        [bounds.width, bounds.width / intrinsicProportion] :
        [bounds.height * intrinsicProportion, bounds.height];
      }
      return [bounds.width, bounds.height];
    }
    var hasIntrinsicWidth = hasIntrinsicValue(intrinsicWidth);
    var hasIntrinsicHeight = hasIntrinsicValue(intrinsicHeight);
    var hasIntrinsicDimensions = hasIntrinsicWidth || hasIntrinsicHeight;
    // If the background-size is auto or auto auto:
    if (isAuto(first) && (!second || isAuto(second))) {
      // If the image has both horizontal and vertical intrinsic dimensions, it's rendered at that size.
      if (hasIntrinsicWidth && hasIntrinsicHeight) {
        return [intrinsicWidth, intrinsicHeight];
      }
      // If the image has no intrinsic dimensions and has no intrinsic proportions,
      // it's rendered at the size of the background positioning area.
      if (!hasIntrinsicProportion && !hasIntrinsicDimensions) {
        return [bounds.width, bounds.height];
      }
      // TODO If the image has no intrinsic dimensions but has intrinsic proportions, it's rendered as if contain had been specified instead.
      // If the image has only one intrinsic dimension and has intrinsic proportions, it's rendered at the size corresponding to that one dimension.
      // The other dimension is computed using the specified dimension and the intrinsic proportions.
      if (hasIntrinsicDimensions && hasIntrinsicProportion) {
        var width_1 = hasIntrinsicWidth ?
        intrinsicWidth :
        intrinsicHeight * intrinsicProportion;
        var height_1 = hasIntrinsicHeight ?
        intrinsicHeight :
        intrinsicWidth / intrinsicProportion;
        return [width_1, height_1];
      }
      // If the image has only one intrinsic dimension but has no intrinsic proportions,
      // it's rendered using the specified dimension and the other dimension of the background positioning area.
      var width_2 = hasIntrinsicWidth ? intrinsicWidth : bounds.width;
      var height_2 = hasIntrinsicHeight ? intrinsicHeight : bounds.height;
      return [width_2, height_2];
    }
    // If the image has intrinsic proportions, it's stretched to the specified dimension.
    // The unspecified dimension is computed using the specified dimension and the intrinsic proportions.
    if (hasIntrinsicProportion) {
      var width_3 = 0;
      var height_3 = 0;
      if (isLengthPercentage(first)) {
        width_3 = getAbsoluteValue(first, bounds.width);
      } else
      if (isLengthPercentage(second)) {
        height_3 = getAbsoluteValue(second, bounds.height);
      }
      if (isAuto(first)) {
        width_3 = height_3 * intrinsicProportion;
      } else
      if (!second || isAuto(second)) {
        height_3 = width_3 / intrinsicProportion;
      }
      return [width_3, height_3];
    }
    // If the image has no intrinsic proportions, it's stretched to the specified dimension.
    // The unspecified dimension is computed using the image's corresponding intrinsic dimension,
    // if there is one. If there is no such intrinsic dimension,
    // it becomes the corresponding dimension of the background positioning area.
    var width = null;
    var height = null;
    if (isLengthPercentage(first)) {
      width = getAbsoluteValue(first, bounds.width);
    } else
    if (second && isLengthPercentage(second)) {
      height = getAbsoluteValue(second, bounds.height);
    }
    if (width !== null && (!second || isAuto(second))) {
      height =
      hasIntrinsicWidth && hasIntrinsicHeight ?
      width / intrinsicWidth * intrinsicHeight :
      bounds.height;
    }
    if (height !== null && isAuto(first)) {
      width =
      hasIntrinsicWidth && hasIntrinsicHeight ?
      height / intrinsicHeight * intrinsicWidth :
      bounds.width;
    }
    if (width !== null && height !== null) {
      return [width, height];
    }
    throw new Error("Unable to calculate background-size for element");
  };
  var getBackgroundValueForIndex = function getBackgroundValueForIndex(values, index) {
    var value = values[index];
    if (typeof value === 'undefined') {
      return values[0];
    }
    return value;
  };
  var calculateBackgroundRepeatPath = function calculateBackgroundRepeatPath(repeat, _a, _b, backgroundPositioningArea, backgroundPaintingArea) {
    var x = _a[0],y = _a[1];
    var width = _b[0],height = _b[1];
    switch (repeat) {
      case BACKGROUND_REPEAT.REPEAT_X:
        return [
        new Vector(Math.round(backgroundPositioningArea.left), Math.round(backgroundPositioningArea.top + y)),
        new Vector(Math.round(backgroundPositioningArea.left + backgroundPositioningArea.width), Math.round(backgroundPositioningArea.top + y)),
        new Vector(Math.round(backgroundPositioningArea.left + backgroundPositioningArea.width), Math.round(height + backgroundPositioningArea.top + y)),
        new Vector(Math.round(backgroundPositioningArea.left), Math.round(height + backgroundPositioningArea.top + y))];

      case BACKGROUND_REPEAT.REPEAT_Y:
        return [
        new Vector(Math.round(backgroundPositioningArea.left + x), Math.round(backgroundPositioningArea.top)),
        new Vector(Math.round(backgroundPositioningArea.left + x + width), Math.round(backgroundPositioningArea.top)),
        new Vector(Math.round(backgroundPositioningArea.left + x + width), Math.round(backgroundPositioningArea.height + backgroundPositioningArea.top)),
        new Vector(Math.round(backgroundPositioningArea.left + x), Math.round(backgroundPositioningArea.height + backgroundPositioningArea.top))];

      case BACKGROUND_REPEAT.NO_REPEAT:
        return [
        new Vector(Math.round(backgroundPositioningArea.left + x), Math.round(backgroundPositioningArea.top + y)),
        new Vector(Math.round(backgroundPositioningArea.left + x + width), Math.round(backgroundPositioningArea.top + y)),
        new Vector(Math.round(backgroundPositioningArea.left + x + width), Math.round(backgroundPositioningArea.top + y + height)),
        new Vector(Math.round(backgroundPositioningArea.left + x), Math.round(backgroundPositioningArea.top + y + height))];

      default:
        return [
        new Vector(Math.round(backgroundPaintingArea.left), Math.round(backgroundPaintingArea.top)),
        new Vector(Math.round(backgroundPaintingArea.left + backgroundPaintingArea.width), Math.round(backgroundPaintingArea.top)),
        new Vector(Math.round(backgroundPaintingArea.left + backgroundPaintingArea.width), Math.round(backgroundPaintingArea.height + backgroundPaintingArea.top)),
        new Vector(Math.round(backgroundPaintingArea.left), Math.round(backgroundPaintingArea.height + backgroundPaintingArea.top))];}


  };

  var SMALL_IMAGE = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

  var SAMPLE_TEXT = 'Hidden Text';
  var FontMetrics = /** @class */function () {
    function FontMetrics(document) {
      this._data = {};
      this._document = document;
    }
    FontMetrics.prototype.parseMetrics = function (fontFamily, fontSize) {
      var container = this._document.createElement('div');
      var img = this._document.createElement('img');
      var span = this._document.createElement('span');
      var body = this._document.body;
      container.style.visibility = 'hidden';
      container.style.fontFamily = fontFamily;
      container.style.fontSize = fontSize;
      container.style.margin = '0';
      container.style.padding = '0';
      body.appendChild(container);
      img.src = SMALL_IMAGE;
      img.width = 1;
      img.height = 1;
      img.style.margin = '0';
      img.style.padding = '0';
      img.style.verticalAlign = 'baseline';
      span.style.fontFamily = fontFamily;
      span.style.fontSize = fontSize;
      span.style.margin = '0';
      span.style.padding = '0';
      span.appendChild(this._document.createTextNode(SAMPLE_TEXT));
      container.appendChild(span);
      container.appendChild(img);
      var baseline = img.offsetTop - span.offsetTop + 2;
      container.removeChild(span);
      container.appendChild(this._document.createTextNode(SAMPLE_TEXT));
      container.style.lineHeight = 'normal';
      img.style.verticalAlign = 'super';
      var middle = img.offsetTop - container.offsetTop + 2;
      body.removeChild(container);
      return { baseline: baseline, middle: middle };
    };
    FontMetrics.prototype.getMetrics = function (fontFamily, fontSize) {
      var key = fontFamily + " " + fontSize;
      if (typeof this._data[key] === 'undefined') {
        this._data[key] = this.parseMetrics(fontFamily, fontSize);
      }
      return this._data[key];
    };
    return FontMetrics;
  }();

  var MASK_OFFSET = 10000;
  var CanvasRenderer = /** @class */function () {
    function CanvasRenderer(options) {
      this._activeEffects = [];
      this.canvas = options.canvas ? options.canvas : document.createElement('canvas');
      this.ctx = this.canvas.getContext('2d');
      this.options = options;
      if (!options.canvas) {
        this.canvas.width = Math.floor(options.width * options.scale);
        this.canvas.height = Math.floor(options.height * options.scale);
        this.canvas.style.width = options.width + "px";
        this.canvas.style.height = options.height + "px";
      }
      this.fontMetrics = new FontMetrics(document);
      this.ctx.scale(this.options.scale, this.options.scale);
      this.ctx.translate(-options.x + options.scrollX, -options.y + options.scrollY);
      this.ctx.textBaseline = 'bottom';
      this._activeEffects = [];
      Logger.getInstance(options.id).debug("Canvas renderer initialized (" + options.width + "x" + options.height + " at " + options.x + "," + options.y + ") with scale " + options.scale);
    }
    CanvasRenderer.prototype.applyEffects = function (effects, target) {
      var _this = this;
      while (this._activeEffects.length) {
        this.popEffect();
      }
      effects.filter(function (effect) {return contains(effect.target, target);}).forEach(function (effect) {return _this.applyEffect(effect);});
    };
    CanvasRenderer.prototype.applyEffect = function (effect) {
      this.ctx.save();
      if (isTransformEffect(effect)) {
        this.ctx.translate(effect.offsetX, effect.offsetY);
        this.ctx.transform(effect.matrix[0], effect.matrix[1], effect.matrix[2], effect.matrix[3], effect.matrix[4], effect.matrix[5]);
        this.ctx.translate(-effect.offsetX, -effect.offsetY);
      }
      if (isClipEffect(effect)) {
        this.path(effect.path);
        this.ctx.clip();
      }
      this._activeEffects.push(effect);
    };
    CanvasRenderer.prototype.popEffect = function () {
      this._activeEffects.pop();
      this.ctx.restore();
    };
    CanvasRenderer.prototype.renderStack = function (stack) {
      return __awaiter(this, void 0, void 0, function () {
        var styles;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              styles = stack.element.container.styles;
              if (!styles.isVisible()) return [3 /*break*/, 2];
              this.ctx.globalAlpha = styles.opacity;
              return [4 /*yield*/, this.renderStackContent(stack)];
            case 1:
              _a.sent();
              _a.label = 2;
            case 2:return [2 /*return*/];}

        });
      });
    };
    CanvasRenderer.prototype.renderNode = function (paint) {
      return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              if (!paint.container.styles.isVisible()) return [3 /*break*/, 3];
              return [4 /*yield*/, this.renderNodeBackgroundAndBorders(paint)];
            case 1:
              _a.sent();
              return [4 /*yield*/, this.renderNodeContent(paint)];
            case 2:
              _a.sent();
              _a.label = 3;
            case 3:return [2 /*return*/];}

        });
      });
    };
    CanvasRenderer.prototype.renderTextWithLetterSpacing = function (text, letterSpacing) {
      var _this = this;
      if (letterSpacing === 0) {
        this.ctx.fillText(text.text, text.bounds.left, text.bounds.top + text.bounds.height);
      } else
      {
        var letters = toCodePoints(text.text).map(function (i) {return fromCodePoint(i);});
        letters.reduce(function (left, letter) {
          _this.ctx.fillText(letter, left, text.bounds.top + text.bounds.height);
          return left + _this.ctx.measureText(letter).width;
        }, text.bounds.left);
      }
    };
    CanvasRenderer.prototype.createFontStyle = function (styles) {
      var fontVariant = styles.fontVariant.
      filter(function (variant) {return variant === 'normal' || variant === 'small-caps';}).
      join('');
      var fontFamily = styles.fontFamily.join(', ');
      var fontSize = isDimensionToken(styles.fontSize) ?
      "" + styles.fontSize.number + styles.fontSize.unit :
      styles.fontSize.number + "px";
      return [
      [styles.fontStyle, fontVariant, styles.fontWeight, fontSize, fontFamily].join(' '),
      fontFamily,
      fontSize];

    };
    CanvasRenderer.prototype.renderTextNode = function (text, styles) {
      return __awaiter(this, void 0, void 0, function () {
        var _a, font, fontFamily, fontSize;
        var _this = this;
        return __generator(this, function (_b) {
          _a = this.createFontStyle(styles), font = _a[0], fontFamily = _a[1], fontSize = _a[2];
          this.ctx.font = font;
          text.textBounds.forEach(function (text) {
            _this.ctx.fillStyle = asString(styles.color);
            _this.renderTextWithLetterSpacing(text, styles.letterSpacing);
            var textShadows = styles.textShadow;
            if (textShadows.length && text.text.trim().length) {
              textShadows.
              slice(0).
              reverse().
              forEach(function (textShadow) {
                _this.ctx.shadowColor = asString(textShadow.color);
                _this.ctx.shadowOffsetX = textShadow.offsetX.number * _this.options.scale;
                _this.ctx.shadowOffsetY = textShadow.offsetY.number * _this.options.scale;
                _this.ctx.shadowBlur = textShadow.blur.number;
                _this.ctx.fillText(text.text, text.bounds.left, text.bounds.top + text.bounds.height);
              });
              _this.ctx.shadowColor = '';
              _this.ctx.shadowOffsetX = 0;
              _this.ctx.shadowOffsetY = 0;
              _this.ctx.shadowBlur = 0;
            }
            if (styles.textDecorationLine.length) {
              _this.ctx.fillStyle = asString(styles.textDecorationColor || styles.color);
              styles.textDecorationLine.forEach(function (textDecorationLine) {
                switch (textDecorationLine) {
                  case 1 /* UNDERLINE */:
                    // Draws a line at the baseline of the font
                    // TODO As some browsers display the line as more than 1px if the font-size is big,
                    // need to take that into account both in position and size
                    var baseline = _this.fontMetrics.getMetrics(fontFamily, fontSize).baseline;
                    _this.ctx.fillRect(text.bounds.left, Math.round(text.bounds.top + baseline), text.bounds.width, 1);
                    break;
                  case 2 /* OVERLINE */:
                    _this.ctx.fillRect(text.bounds.left, Math.round(text.bounds.top), text.bounds.width, 1);
                    break;
                  case 3 /* LINE_THROUGH */:
                    // TODO try and find exact position for line-through
                    var middle = _this.fontMetrics.getMetrics(fontFamily, fontSize).middle;
                    _this.ctx.fillRect(text.bounds.left, Math.ceil(text.bounds.top + middle), text.bounds.width, 1);
                    break;}

              });
            }
          });
          return [2 /*return*/];
        });
      });
    };
    CanvasRenderer.prototype.renderReplacedElement = function (container, curves, image) {
      if (image && container.intrinsicWidth > 0 && container.intrinsicHeight > 0) {
        var box = contentBox(container);
        var path = calculatePaddingBoxPath(curves);
        this.path(path);
        this.ctx.save();
        this.ctx.clip();
        this.ctx.drawImage(image, 0, 0, container.intrinsicWidth, container.intrinsicHeight, box.left, box.top, box.width, box.height);
        this.ctx.restore();
      }
    };
    CanvasRenderer.prototype.renderNodeContent = function (paint) {
      return __awaiter(this, void 0, void 0, function () {
        var container, curves, styles, _i, _a, child, image, e_1, image, e_2, iframeRenderer, canvas, size, bounds, x, textBounds, img, image, url, e_3, bounds;
        return __generator(this, function (_b) {
          switch (_b.label) {
            case 0:
              this.applyEffects(paint.effects, 4 /* CONTENT */);
              container = paint.container;
              curves = paint.curves;
              styles = container.styles;
              _i = 0, _a = container.textNodes;
              _b.label = 1;
            case 1:
              if (!(_i < _a.length)) return [3 /*break*/, 4];
              child = _a[_i];
              return [4 /*yield*/, this.renderTextNode(child, styles)];
            case 2:
              _b.sent();
              _b.label = 3;
            case 3:
              _i++;
              return [3 /*break*/, 1];
            case 4:
              if (!(container instanceof ImageElementContainer)) return [3 /*break*/, 8];
              _b.label = 5;
            case 5:
              _b.trys.push([5, 7,, 8]);
              return [4 /*yield*/, this.options.cache.match(container.src)];
            case 6:
              image = _b.sent();
              this.renderReplacedElement(container, curves, image);
              return [3 /*break*/, 8];
            case 7:
              e_1 = _b.sent();
              Logger.getInstance(this.options.id).error("Error loading image " + container.src);
              return [3 /*break*/, 8];
            case 8:
              if (container instanceof CanvasElementContainer) {
                this.renderReplacedElement(container, curves, container.canvas);
              }
              if (!(container instanceof SVGElementContainer)) return [3 /*break*/, 12];
              _b.label = 9;
            case 9:
              _b.trys.push([9, 11,, 12]);
              return [4 /*yield*/, this.options.cache.match(container.svg)];
            case 10:
              image = _b.sent();
              this.renderReplacedElement(container, curves, image);
              return [3 /*break*/, 12];
            case 11:
              e_2 = _b.sent();
              Logger.getInstance(this.options.id).error("Error loading svg " + container.svg.substring(0, 255));
              return [3 /*break*/, 12];
            case 12:
              if (!(container instanceof IFrameElementContainer && container.tree)) return [3 /*break*/, 14];
              iframeRenderer = new CanvasRenderer({
                id: this.options.id,
                scale: this.options.scale,
                backgroundColor: container.backgroundColor,
                x: 0,
                y: 0,
                scrollX: 0,
                scrollY: 0,
                width: container.width,
                height: container.height,
                cache: this.options.cache,
                windowWidth: container.width,
                windowHeight: container.height });

              return [4 /*yield*/, iframeRenderer.render(container.tree)];
            case 13:
              canvas = _b.sent();
              if (container.width && container.height) {
                this.ctx.drawImage(canvas, 0, 0, container.width, container.height, container.bounds.left, container.bounds.top, container.bounds.width, container.bounds.height);
              }
              _b.label = 14;
            case 14:
              if (container instanceof InputElementContainer) {
                size = Math.min(container.bounds.width, container.bounds.height);
                if (container.type === CHECKBOX) {
                  if (container.checked) {
                    this.ctx.save();
                    this.path([
                    new Vector(container.bounds.left + size * 0.39363, container.bounds.top + size * 0.79),
                    new Vector(container.bounds.left + size * 0.16, container.bounds.top + size * 0.5549),
                    new Vector(container.bounds.left + size * 0.27347, container.bounds.top + size * 0.44071),
                    new Vector(container.bounds.left + size * 0.39694, container.bounds.top + size * 0.5649),
                    new Vector(container.bounds.left + size * 0.72983, container.bounds.top + size * 0.23),
                    new Vector(container.bounds.left + size * 0.84, container.bounds.top + size * 0.34085),
                    new Vector(container.bounds.left + size * 0.39363, container.bounds.top + size * 0.79)]);

                    this.ctx.fillStyle = asString(INPUT_COLOR);
                    this.ctx.fill();
                    this.ctx.restore();
                  }
                } else
                if (container.type === RADIO) {
                  if (container.checked) {
                    this.ctx.save();
                    this.ctx.beginPath();
                    this.ctx.arc(container.bounds.left + size / 2, container.bounds.top + size / 2, size / 4, 0, Math.PI * 2, true);
                    this.ctx.fillStyle = asString(INPUT_COLOR);
                    this.ctx.fill();
                    this.ctx.restore();
                  }
                }
              }
              if (isTextInputElement(container) && container.value.length) {
                this.ctx.font = this.createFontStyle(styles)[0];
                this.ctx.fillStyle = asString(styles.color);
                this.ctx.textBaseline = 'middle';
                this.ctx.textAlign = canvasTextAlign(container.styles.textAlign);
                bounds = contentBox(container);
                x = 0;
                switch (container.styles.textAlign) {
                  case TEXT_ALIGN.CENTER:
                    x += bounds.width / 2;
                    break;
                  case TEXT_ALIGN.RIGHT:
                    x += bounds.width;
                    break;}

                textBounds = bounds.add(x, 0, 0, -bounds.height / 2 + 1);
                this.ctx.save();
                this.path([
                new Vector(bounds.left, bounds.top),
                new Vector(bounds.left + bounds.width, bounds.top),
                new Vector(bounds.left + bounds.width, bounds.top + bounds.height),
                new Vector(bounds.left, bounds.top + bounds.height)]);

                this.ctx.clip();
                this.renderTextWithLetterSpacing(new TextBounds(container.value, textBounds), styles.letterSpacing);
                this.ctx.restore();
                this.ctx.textBaseline = 'bottom';
                this.ctx.textAlign = 'left';
              }
              if (!contains(container.styles.display, 2048 /* LIST_ITEM */)) return [3 /*break*/, 20];
              if (!(container.styles.listStyleImage !== null)) return [3 /*break*/, 19];
              img = container.styles.listStyleImage;
              if (!(img.type === CSSImageType.URL)) return [3 /*break*/, 18];
              image = void 0;
              url = img.url;
              _b.label = 15;
            case 15:
              _b.trys.push([15, 17,, 18]);
              return [4 /*yield*/, this.options.cache.match(url)];
            case 16:
              image = _b.sent();
              this.ctx.drawImage(image, container.bounds.left - (image.width + 10), container.bounds.top);
              return [3 /*break*/, 18];
            case 17:
              e_3 = _b.sent();
              Logger.getInstance(this.options.id).error("Error loading list-style-image " + url);
              return [3 /*break*/, 18];
            case 18:return [3 /*break*/, 20];
            case 19:
              if (paint.listValue && container.styles.listStyleType !== LIST_STYLE_TYPE.NONE) {
                this.ctx.font = this.createFontStyle(styles)[0];
                this.ctx.fillStyle = asString(styles.color);
                this.ctx.textBaseline = 'middle';
                this.ctx.textAlign = 'right';
                bounds = new Bounds(container.bounds.left, container.bounds.top + getAbsoluteValue(container.styles.paddingTop, container.bounds.width), container.bounds.width, computeLineHeight(styles.lineHeight, styles.fontSize.number) / 2 + 1);
                this.renderTextWithLetterSpacing(new TextBounds(paint.listValue, bounds), styles.letterSpacing);
                this.ctx.textBaseline = 'bottom';
                this.ctx.textAlign = 'left';
              }
              _b.label = 20;
            case 20:return [2 /*return*/];}

        });
      });
    };
    CanvasRenderer.prototype.renderStackContent = function (stack) {
      return __awaiter(this, void 0, void 0, function () {
        var _i, _a, child, _b, _c, child, _d, _e, child, _f, _g, child, _h, _j, child, _k, _l, child, _m, _o, child;
        return __generator(this, function (_p) {
          switch (_p.label) {
            case 0:
              // https://www.w3.org/TR/css-position-3/#painting-order
              // 1. the background and borders of the element forming the stacking context.
              return [4 /*yield*/, this.renderNodeBackgroundAndBorders(stack.element)];
            case 1:
              // https://www.w3.org/TR/css-position-3/#painting-order
              // 1. the background and borders of the element forming the stacking context.
              _p.sent();
              _i = 0, _a = stack.negativeZIndex;
              _p.label = 2;
            case 2:
              if (!(_i < _a.length)) return [3 /*break*/, 5];
              child = _a[_i];
              return [4 /*yield*/, this.renderStack(child)];
            case 3:
              _p.sent();
              _p.label = 4;
            case 4:
              _i++;
              return [3 /*break*/, 2];
            case 5:
              // 3. For all its in-flow, non-positioned, block-level descendants in tree order:
              return [4 /*yield*/, this.renderNodeContent(stack.element)];
            case 6:
              // 3. For all its in-flow, non-positioned, block-level descendants in tree order:
              _p.sent();
              _b = 0, _c = stack.nonInlineLevel;
              _p.label = 7;
            case 7:
              if (!(_b < _c.length)) return [3 /*break*/, 10];
              child = _c[_b];
              return [4 /*yield*/, this.renderNode(child)];
            case 8:
              _p.sent();
              _p.label = 9;
            case 9:
              _b++;
              return [3 /*break*/, 7];
            case 10:
              _d = 0, _e = stack.nonPositionedFloats;
              _p.label = 11;
            case 11:
              if (!(_d < _e.length)) return [3 /*break*/, 14];
              child = _e[_d];
              return [4 /*yield*/, this.renderStack(child)];
            case 12:
              _p.sent();
              _p.label = 13;
            case 13:
              _d++;
              return [3 /*break*/, 11];
            case 14:
              _f = 0, _g = stack.nonPositionedInlineLevel;
              _p.label = 15;
            case 15:
              if (!(_f < _g.length)) return [3 /*break*/, 18];
              child = _g[_f];
              return [4 /*yield*/, this.renderStack(child)];
            case 16:
              _p.sent();
              _p.label = 17;
            case 17:
              _f++;
              return [3 /*break*/, 15];
            case 18:
              _h = 0, _j = stack.inlineLevel;
              _p.label = 19;
            case 19:
              if (!(_h < _j.length)) return [3 /*break*/, 22];
              child = _j[_h];
              return [4 /*yield*/, this.renderNode(child)];
            case 20:
              _p.sent();
              _p.label = 21;
            case 21:
              _h++;
              return [3 /*break*/, 19];
            case 22:
              _k = 0, _l = stack.zeroOrAutoZIndexOrTransformedOrOpacity;
              _p.label = 23;
            case 23:
              if (!(_k < _l.length)) return [3 /*break*/, 26];
              child = _l[_k];
              return [4 /*yield*/, this.renderStack(child)];
            case 24:
              _p.sent();
              _p.label = 25;
            case 25:
              _k++;
              return [3 /*break*/, 23];
            case 26:
              _m = 0, _o = stack.positiveZIndex;
              _p.label = 27;
            case 27:
              if (!(_m < _o.length)) return [3 /*break*/, 30];
              child = _o[_m];
              return [4 /*yield*/, this.renderStack(child)];
            case 28:
              _p.sent();
              _p.label = 29;
            case 29:
              _m++;
              return [3 /*break*/, 27];
            case 30:return [2 /*return*/];}

        });
      });
    };
    CanvasRenderer.prototype.mask = function (paths) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, 0);
      this.ctx.lineTo(this.canvas.width, 0);
      this.ctx.lineTo(this.canvas.width, this.canvas.height);
      this.ctx.lineTo(0, this.canvas.height);
      this.ctx.lineTo(0, 0);
      this.formatPath(paths.slice(0).reverse());
      this.ctx.closePath();
    };
    CanvasRenderer.prototype.path = function (paths) {
      this.ctx.beginPath();
      this.formatPath(paths);
      this.ctx.closePath();
    };
    CanvasRenderer.prototype.formatPath = function (paths) {
      var _this = this;
      paths.forEach(function (point, index) {
        var start = isBezierCurve(point) ? point.start : point;
        if (index === 0) {
          _this.ctx.moveTo(start.x, start.y);
        } else
        {
          _this.ctx.lineTo(start.x, start.y);
        }
        if (isBezierCurve(point)) {
          _this.ctx.bezierCurveTo(point.startControl.x, point.startControl.y, point.endControl.x, point.endControl.y, point.end.x, point.end.y);
        }
      });
    };
    CanvasRenderer.prototype.renderRepeat = function (path, pattern, offsetX, offsetY) {
      this.path(path);
      this.ctx.fillStyle = pattern;
      this.ctx.translate(offsetX, offsetY);
      this.ctx.fill();
      this.ctx.translate(-offsetX, -offsetY);
    };
    CanvasRenderer.prototype.resizeImage = function (image, width, height) {
      if (image.width === width && image.height === height) {
        return image;
      }
      var canvas = this.canvas.ownerDocument.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      var ctx = canvas.getContext('2d');
      ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, width, height);
      return canvas;
    };
    CanvasRenderer.prototype.renderBackgroundImage = function (container) {
      return __awaiter(this, void 0, void 0, function () {
        var index, _loop_1, this_1, _i, _a, backgroundImage;
        return __generator(this, function (_b) {
          switch (_b.label) {
            case 0:
              index = container.styles.backgroundImage.length - 1;
              _loop_1 = function _loop_1(backgroundImage) {
                var image, url, e_4, _a, path, x, y, width, height, pattern, _b, path, x, y, width, height, _c, lineLength, x0, x1, y0, y1, canvas, ctx, gradient_1, pattern, _d, path, left, top_1, width, height, position, x, y, _e, rx, ry, radialGradient_1, midX, midY, f, invF;
                return __generator(this, function (_f) {
                  switch (_f.label) {
                    case 0:
                      if (!(backgroundImage.type === CSSImageType.URL)) return [3 /*break*/, 5];
                      image = void 0;
                      url = backgroundImage.url;
                      _f.label = 1;
                    case 1:
                      _f.trys.push([1, 3,, 4]);
                      return [4 /*yield*/, this_1.options.cache.match(url)];
                    case 2:
                      image = _f.sent();
                      return [3 /*break*/, 4];
                    case 3:
                      e_4 = _f.sent();
                      Logger.getInstance(this_1.options.id).error("Error loading background-image " + url);
                      return [3 /*break*/, 4];
                    case 4:
                      if (image) {
                        _a = calculateBackgroundRendering(container, index, [
                        image.width,
                        image.height,
                        image.width / image.height]),
                        path = _a[0], x = _a[1], y = _a[2], width = _a[3], height = _a[4];
                        pattern = this_1.ctx.createPattern(this_1.resizeImage(image, width, height), 'repeat');
                        this_1.renderRepeat(path, pattern, x, y);
                      }
                      return [3 /*break*/, 6];
                    case 5:
                      if (isLinearGradient(backgroundImage)) {
                        _b = calculateBackgroundRendering(container, index, [null, null, null]), path = _b[0], x = _b[1], y = _b[2], width = _b[3], height = _b[4];
                        _c = calculateGradientDirection(backgroundImage.angle, width, height), lineLength = _c[0], x0 = _c[1], x1 = _c[2], y0 = _c[3], y1 = _c[4];
                        canvas = document.createElement('canvas');
                        canvas.width = width;
                        canvas.height = height;
                        ctx = canvas.getContext('2d');
                        gradient_1 = ctx.createLinearGradient(x0, y0, x1, y1);
                        processColorStops(backgroundImage.stops, lineLength).forEach(function (colorStop) {
                          return gradient_1.addColorStop(colorStop.stop, asString(colorStop.color));
                        });
                        ctx.fillStyle = gradient_1;
                        ctx.fillRect(0, 0, width, height);
                        if (width > 0 && height > 0) {
                          pattern = this_1.ctx.createPattern(canvas, 'repeat');
                          this_1.renderRepeat(path, pattern, x, y);
                        }
                      } else
                      if (isRadialGradient(backgroundImage)) {
                        _d = calculateBackgroundRendering(container, index, [
                        null,
                        null,
                        null]),
                        path = _d[0], left = _d[1], top_1 = _d[2], width = _d[3], height = _d[4];
                        position = backgroundImage.position.length === 0 ? [FIFTY_PERCENT] : backgroundImage.position;
                        x = getAbsoluteValue(position[0], width);
                        y = getAbsoluteValue(position[position.length - 1], height);
                        _e = calculateRadius(backgroundImage, x, y, width, height), rx = _e[0], ry = _e[1];
                        if (rx > 0 && rx > 0) {
                          radialGradient_1 = this_1.ctx.createRadialGradient(left + x, top_1 + y, 0, left + x, top_1 + y, rx);
                          processColorStops(backgroundImage.stops, rx * 2).forEach(function (colorStop) {
                            return radialGradient_1.addColorStop(colorStop.stop, asString(colorStop.color));
                          });
                          this_1.path(path);
                          this_1.ctx.fillStyle = radialGradient_1;
                          if (rx !== ry) {
                            midX = container.bounds.left + 0.5 * container.bounds.width;
                            midY = container.bounds.top + 0.5 * container.bounds.height;
                            f = ry / rx;
                            invF = 1 / f;
                            this_1.ctx.save();
                            this_1.ctx.translate(midX, midY);
                            this_1.ctx.transform(1, 0, 0, f, 0, 0);
                            this_1.ctx.translate(-midX, -midY);
                            this_1.ctx.fillRect(left, invF * (top_1 - midY) + midY, width, height * invF);
                            this_1.ctx.restore();
                          } else
                          {
                            this_1.ctx.fill();
                          }
                        }
                      }
                      _f.label = 6;
                    case 6:
                      index--;
                      return [2 /*return*/];}

                });
              };
              this_1 = this;
              _i = 0, _a = container.styles.backgroundImage.slice(0).reverse();
              _b.label = 1;
            case 1:
              if (!(_i < _a.length)) return [3 /*break*/, 4];
              backgroundImage = _a[_i];
              return [5 /*yield**/, _loop_1(backgroundImage)];
            case 2:
              _b.sent();
              _b.label = 3;
            case 3:
              _i++;
              return [3 /*break*/, 1];
            case 4:return [2 /*return*/];}

        });
      });
    };
    CanvasRenderer.prototype.renderBorder = function (color, side, curvePoints) {
      return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
          this.path(parsePathForBorder(curvePoints, side));
          this.ctx.fillStyle = asString(color);
          this.ctx.fill();
          return [2 /*return*/];
        });
      });
    };
    CanvasRenderer.prototype.renderNodeBackgroundAndBorders = function (paint) {
      return __awaiter(this, void 0, void 0, function () {
        var styles, hasBackground, borders, backgroundPaintingArea, side, _i, borders_1, border;
        var _this = this;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              this.applyEffects(paint.effects, 2 /* BACKGROUND_BORDERS */);
              styles = paint.container.styles;
              hasBackground = !isTransparent(styles.backgroundColor) || styles.backgroundImage.length;
              borders = [
              { style: styles.borderTopStyle, color: styles.borderTopColor },
              { style: styles.borderRightStyle, color: styles.borderRightColor },
              { style: styles.borderBottomStyle, color: styles.borderBottomColor },
              { style: styles.borderLeftStyle, color: styles.borderLeftColor }];

              backgroundPaintingArea = calculateBackgroundCurvedPaintingArea(getBackgroundValueForIndex(styles.backgroundClip, 0), paint.curves);
              if (!(hasBackground || styles.boxShadow.length)) return [3 /*break*/, 2];
              this.ctx.save();
              this.path(backgroundPaintingArea);
              this.ctx.clip();
              if (!isTransparent(styles.backgroundColor)) {
                this.ctx.fillStyle = asString(styles.backgroundColor);
                this.ctx.fill();
              }
              return [4 /*yield*/, this.renderBackgroundImage(paint.container)];
            case 1:
              _a.sent();
              this.ctx.restore();
              styles.boxShadow.
              slice(0).
              reverse().
              forEach(function (shadow) {
                _this.ctx.save();
                var borderBoxArea = calculateBorderBoxPath(paint.curves);
                var maskOffset = shadow.inset ? 0 : MASK_OFFSET;
                var shadowPaintingArea = transformPath(borderBoxArea, -maskOffset + (shadow.inset ? 1 : -1) * shadow.spread.number, (shadow.inset ? 1 : -1) * shadow.spread.number, shadow.spread.number * (shadow.inset ? -2 : 2), shadow.spread.number * (shadow.inset ? -2 : 2));
                if (shadow.inset) {
                  _this.path(borderBoxArea);
                  _this.ctx.clip();
                  _this.mask(shadowPaintingArea);
                } else
                {
                  _this.mask(borderBoxArea);
                  _this.ctx.clip();
                  _this.path(shadowPaintingArea);
                }
                _this.ctx.shadowOffsetX = shadow.offsetX.number + maskOffset;
                _this.ctx.shadowOffsetY = shadow.offsetY.number;
                _this.ctx.shadowColor = asString(shadow.color);
                _this.ctx.shadowBlur = shadow.blur.number;
                _this.ctx.fillStyle = shadow.inset ? asString(shadow.color) : 'rgba(0,0,0,1)';
                _this.ctx.fill();
                _this.ctx.restore();
              });
              _a.label = 2;
            case 2:
              side = 0;
              _i = 0, borders_1 = borders;
              _a.label = 3;
            case 3:
              if (!(_i < borders_1.length)) return [3 /*break*/, 7];
              border = borders_1[_i];
              if (!(border.style !== BORDER_STYLE.NONE && !isTransparent(border.color))) return [3 /*break*/, 5];
              return [4 /*yield*/, this.renderBorder(border.color, side, paint.curves)];
            case 4:
              _a.sent();
              _a.label = 5;
            case 5:
              side++;
              _a.label = 6;
            case 6:
              _i++;
              return [3 /*break*/, 3];
            case 7:return [2 /*return*/];}

        });
      });
    };
    CanvasRenderer.prototype.render = function (element) {
      return __awaiter(this, void 0, void 0, function () {
        var stack;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              if (this.options.backgroundColor) {
                this.ctx.fillStyle = asString(this.options.backgroundColor);
                this.ctx.fillRect(this.options.x - this.options.scrollX, this.options.y - this.options.scrollY, this.options.width, this.options.height);
              }
              stack = parseStackingContexts(element);
              return [4 /*yield*/, this.renderStack(stack)];
            case 1:
              _a.sent();
              this.applyEffects([], 2 /* BACKGROUND_BORDERS */);
              return [2 /*return*/, this.canvas];}

        });
      });
    };
    return CanvasRenderer;
  }();
  var isTextInputElement = function isTextInputElement(container) {
    if (container instanceof TextareaElementContainer) {
      return true;
    } else
    if (container instanceof SelectElementContainer) {
      return true;
    } else
    if (container instanceof InputElementContainer && container.type !== RADIO && container.type !== CHECKBOX) {
      return true;
    }
    return false;
  };
  var calculateBackgroundCurvedPaintingArea = function calculateBackgroundCurvedPaintingArea(clip, curves) {
    switch (clip) {
      case BACKGROUND_CLIP.BORDER_BOX:
        return calculateBorderBoxPath(curves);
      case BACKGROUND_CLIP.CONTENT_BOX:
        return calculateContentBoxPath(curves);
      case BACKGROUND_CLIP.PADDING_BOX:
      default:
        return calculatePaddingBoxPath(curves);}

  };
  var canvasTextAlign = function canvasTextAlign(textAlign) {
    switch (textAlign) {
      case TEXT_ALIGN.CENTER:
        return 'center';
      case TEXT_ALIGN.RIGHT:
        return 'right';
      case TEXT_ALIGN.LEFT:
      default:
        return 'left';}

  };

  var ForeignObjectRenderer = /** @class */function () {
    function ForeignObjectRenderer(options) {
      this.canvas = options.canvas ? options.canvas : document.createElement('canvas');
      this.ctx = this.canvas.getContext('2d');
      this.options = options;
      this.canvas.width = Math.floor(options.width * options.scale);
      this.canvas.height = Math.floor(options.height * options.scale);
      this.canvas.style.width = options.width + "px";
      this.canvas.style.height = options.height + "px";
      this.ctx.scale(this.options.scale, this.options.scale);
      this.ctx.translate(-options.x + options.scrollX, -options.y + options.scrollY);
      Logger.getInstance(options.id).debug("EXPERIMENTAL ForeignObject renderer initialized (" + options.width + "x" + options.height + " at " + options.x + "," + options.y + ") with scale " + options.scale);
    }
    ForeignObjectRenderer.prototype.render = function (element) {
      return __awaiter(this, void 0, void 0, function () {
        var svg, img;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              svg = createForeignObjectSVG(Math.max(this.options.windowWidth, this.options.width) * this.options.scale, Math.max(this.options.windowHeight, this.options.height) * this.options.scale, this.options.scrollX * this.options.scale, this.options.scrollY * this.options.scale, element);
              return [4 /*yield*/, loadSerializedSVG$1(svg)];
            case 1:
              img = _a.sent();
              if (this.options.backgroundColor) {
                this.ctx.fillStyle = asString(this.options.backgroundColor);
                this.ctx.fillRect(0, 0, this.options.width * this.options.scale, this.options.height * this.options.scale);
              }
              this.ctx.drawImage(img, -this.options.x * this.options.scale, -this.options.y * this.options.scale);
              return [2 /*return*/, this.canvas];}

        });
      });
    };
    return ForeignObjectRenderer;
  }();
  var loadSerializedSVG$1 = function loadSerializedSVG$1(svg) {
    return new Promise(function (resolve, reject) {
      var img = new Image();
      img.onload = function () {
        resolve(img);
      };
      img.onerror = reject;
      img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(new XMLSerializer().serializeToString(svg));
    });
  };

  var _this = undefined;
  var parseColor$1 = function parseColor$1(value) {return color.parse(Parser.create(value).parseComponentValue());};
  var html2canvas = function html2canvas(element, options) {
    if (options === void 0) {options = {};}
    return renderElement(element, options);
  };
  if (typeof window !== 'undefined') {
    CacheStorage.setContext(window);
  }
  var renderElement = function renderElement(element, opts) {return __awaiter(_this, void 0, void 0, function () {
      var ownerDocument, defaultView, instanceName, _a, width, height, left, top, defaultResourceOptions, resourceOptions, defaultOptions, options, windowBounds, documentCloner, clonedElement, container, documentBackgroundColor, bodyBackgroundColor, bgColor, defaultBackgroundColor, backgroundColor, renderOptions, canvas, renderer, root, renderer;
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            ownerDocument = element.ownerDocument;
            if (!ownerDocument) {
              throw new Error("Element is not attached to a Document");
            }
            defaultView = ownerDocument.defaultView;
            if (!defaultView) {
              throw new Error("Document is not attached to a Window");
            }
            instanceName = (Math.round(Math.random() * 1000) + Date.now()).toString(16);
            _a = isBodyElement(element) || isHTMLElement(element) ? parseDocumentSize(ownerDocument) : parseBounds(element), width = _a.width, height = _a.height, left = _a.left, top = _a.top;
            defaultResourceOptions = {
              allowTaint: false,
              imageTimeout: 15000,
              proxy: undefined,
              useCORS: false };

            resourceOptions = _assign({}, defaultResourceOptions, opts);
            defaultOptions = {
              backgroundColor: '#ffffff',
              cache: opts.cache ? opts.cache : CacheStorage.create(instanceName, resourceOptions),
              logging: true,
              removeContainer: true,
              foreignObjectRendering: false,
              scale: defaultView.devicePixelRatio || 1,
              windowWidth: defaultView.innerWidth,
              windowHeight: defaultView.innerHeight,
              scrollX: defaultView.pageXOffset,
              scrollY: defaultView.pageYOffset,
              x: left,
              y: top,
              width: Math.ceil(width),
              height: Math.ceil(height),
              id: instanceName };

            options = _assign({}, defaultOptions, resourceOptions, opts);
            windowBounds = new Bounds(options.scrollX, options.scrollY, options.windowWidth, options.windowHeight);
            Logger.create({ id: instanceName, enabled: options.logging });
            Logger.getInstance(instanceName).debug("Starting document clone");
            documentCloner = new DocumentCloner(element, {
              id: instanceName,
              onclone: options.onclone,
              ignoreElements: options.ignoreElements,
              inlineImages: options.foreignObjectRendering,
              copyStyles: options.foreignObjectRendering });

            clonedElement = documentCloner.clonedReferenceElement;
            if (!clonedElement) {
              return [2 /*return*/, Promise.reject("Unable to find element in cloned iframe")];
            }
            return [4 /*yield*/, documentCloner.toIFrame(ownerDocument, windowBounds)];
          case 1:
            container = _b.sent();
            documentBackgroundColor = ownerDocument.documentElement ?
            parseColor$1(getComputedStyle(ownerDocument.documentElement).backgroundColor) :
            COLORS.TRANSPARENT;
            bodyBackgroundColor = ownerDocument.body ?
            parseColor$1(getComputedStyle(ownerDocument.body).backgroundColor) :
            COLORS.TRANSPARENT;
            bgColor = opts.backgroundColor;
            defaultBackgroundColor = typeof bgColor === 'string' ? parseColor$1(bgColor) : bgColor === null ? COLORS.TRANSPARENT : 0xffffffff;
            backgroundColor = element === ownerDocument.documentElement ?
            isTransparent(documentBackgroundColor) ?
            isTransparent(bodyBackgroundColor) ?
            defaultBackgroundColor :
            bodyBackgroundColor :
            documentBackgroundColor :
            defaultBackgroundColor;
            renderOptions = {
              id: instanceName,
              cache: options.cache,
              canvas: options.canvas,
              backgroundColor: backgroundColor,
              scale: options.scale,
              x: options.x,
              y: options.y,
              scrollX: options.scrollX,
              scrollY: options.scrollY,
              width: options.width,
              height: options.height,
              windowWidth: options.windowWidth,
              windowHeight: options.windowHeight };

            if (!options.foreignObjectRendering) return [3 /*break*/, 3];
            Logger.getInstance(instanceName).debug("Document cloned, using foreign object rendering");
            renderer = new ForeignObjectRenderer(renderOptions);
            return [4 /*yield*/, renderer.render(clonedElement)];
          case 2:
            canvas = _b.sent();
            return [3 /*break*/, 5];
          case 3:
            Logger.getInstance(instanceName).debug("Document cloned, using computed rendering");
            CacheStorage.attachInstance(options.cache);
            Logger.getInstance(instanceName).debug("Starting DOM parsing");
            root = parseTree(clonedElement);
            CacheStorage.detachInstance();
            if (backgroundColor === root.styles.backgroundColor) {
              root.styles.backgroundColor = COLORS.TRANSPARENT;
            }
            Logger.getInstance(instanceName).debug("Starting renderer");
            renderer = new CanvasRenderer(renderOptions);
            return [4 /*yield*/, renderer.render(root)];
          case 4:
            canvas = _b.sent();
            _b.label = 5;
          case 5:
            if (options.removeContainer === true) {
              if (!DocumentCloner.destroy(container)) {
                Logger.getInstance(instanceName).error("Cannot detach cloned iframe as it is not in the DOM anymore");
              }
            }
            Logger.getInstance(instanceName).debug("Finished rendering");
            Logger.destroy(instanceName);
            CacheStorage.destroy(instanceName);
            return [2 /*return*/, canvas];}

      });
    });};

  return html2canvas;

});

/***/ }),

/***/ 24:
/*!**********************************************************************************!*\
  !*** /Users/mac/code/driver1234/node_modules/uview-ui/libs/function/timeFrom.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _timeFormat = _interopRequireDefault(__webpack_require__(/*! ../../libs/function/timeFormat.js */ 23));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/**
                                                                                                                                                                                                                                                                                          * 时间戳转为多久之前
                                                                                                                                                                                                                                                                                          * @param String timestamp 时间戳
                                                                                                                                                                                                                                                                                          * @param String | Boolean format 如果为时间格式字符串，超出一定时间范围，返回固定的时间格式；
                                                                                                                                                                                                                                                                                          * 如果为布尔值false，无论什么时间，都返回多久以前的格式
                                                                                                                                                                                                                                                                                          */
function timeFrom() {var dateTime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'yyyy-mm-dd';
  // 如果为null,则格式化当前时间
  if (!dateTime) dateTime = Number(new Date());
  // 如果dateTime长度为10或者13，则为秒和毫秒的时间戳，如果超过13位，则为其他的时间格式
  if (dateTime.toString().length == 10) dateTime *= 1000;
  var timestamp = +new Date(Number(dateTime));

  var timer = (Number(new Date()) - timestamp) / 1000;
  // 如果小于5分钟,则返回"刚刚",其他以此类推
  var tips = '';
  switch (true) {
    case timer < 300:
      tips = '刚刚';
      break;
    case timer >= 300 && timer < 3600:
      tips = parseInt(timer / 60) + '分钟前';
      break;
    case timer >= 3600 && timer < 86400:
      tips = parseInt(timer / 3600) + '小时前';
      break;
    case timer >= 86400 && timer < 2592000:
      tips = parseInt(timer / 86400) + '天前';
      break;
    default:
      // 如果format为false，则无论什么时间戳，都显示xx之前
      if (format === false) {
        if (timer >= 2592000 && timer < 365 * 86400) {
          tips = parseInt(timer / (86400 * 30)) + '个月前';
        } else {
          tips = parseInt(timer / (86400 * 365)) + '年前';
        }
      } else {
        tips = (0, _timeFormat.default)(timestamp, format);
      }}

  return tips;
}var _default =

timeFrom;exports.default = _default;

/***/ }),

/***/ 25:
/*!***************************************************************************************!*\
  !*** /Users/mac/code/driver1234/node_modules/uview-ui/libs/function/colorGradient.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 求两个颜色之间的渐变值
                                                                                                      * @param {string} startColor 开始的颜色
                                                                                                      * @param {string} endColor 结束的颜色
                                                                                                      * @param {number} step 颜色等分的份额
                                                                                                      * */
function colorGradient() {var startColor = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'rgb(0, 0, 0)';var endColor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'rgb(255, 255, 255)';var step = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;
  var startRGB = hexToRgb(startColor, false); //转换为rgb数组模式
  var startR = startRGB[0];
  var startG = startRGB[1];
  var startB = startRGB[2];

  var endRGB = hexToRgb(endColor, false);
  var endR = endRGB[0];
  var endG = endRGB[1];
  var endB = endRGB[2];

  var sR = (endR - startR) / step; //总差值
  var sG = (endG - startG) / step;
  var sB = (endB - startB) / step;
  var colorArr = [];
  for (var i = 0; i < step; i++) {
    //计算每一步的hex值 
    var hex = rgbToHex('rgb(' + Math.round(sR * i + startR) + ',' + Math.round(sG * i + startG) + ',' + Math.round(sB *
    i + startB) + ')');
    colorArr.push(hex);
  }
  return colorArr;
}

// 将hex表示方式转换为rgb表示方式(这里返回rgb数组模式)
function hexToRgb(sColor) {var str = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  sColor = sColor.toLowerCase();
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      var sColorNew = "#";
      for (var i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
      }
      sColor = sColorNew;
    }
    //处理六位的颜色值
    var sColorChange = [];
    for (var _i = 1; _i < 7; _i += 2) {
      sColorChange.push(parseInt("0x" + sColor.slice(_i, _i + 2)));
    }
    if (!str) {
      return sColorChange;
    } else {
      return "rgb(".concat(sColorChange[0], ",").concat(sColorChange[1], ",").concat(sColorChange[2], ")");
    }
  } else if (/^(rgb|RGB)/.test(sColor)) {
    var arr = sColor.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
    return arr.map(function (val) {return Number(val);});
  } else {
    return sColor;
  }
};

// 将rgb表示方式转换为hex表示方式
function rgbToHex(rgb) {
  var _this = rgb;
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  if (/^(rgb|RGB)/.test(_this)) {
    var aColor = _this.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
    var strHex = "#";
    for (var i = 0; i < aColor.length; i++) {
      var hex = Number(aColor[i]).toString(16);
      hex = String(hex).length == 1 ? 0 + '' + hex : hex; // 保证每个rgb的值为2位
      if (hex === "0") {
        hex += hex;
      }
      strHex += hex;
    }
    if (strHex.length !== 7) {
      strHex = _this;
    }
    return strHex;
  } else if (reg.test(_this)) {
    var aNum = _this.replace(/#/, "").split("");
    if (aNum.length === 6) {
      return _this;
    } else if (aNum.length === 3) {
      var numHex = "#";
      for (var _i2 = 0; _i2 < aNum.length; _i2 += 1) {
        numHex += aNum[_i2] + aNum[_i2];
      }
      return numHex;
    }
  } else {
    return _this;
  }
}


/**
  * JS颜色十六进制转换为rgb或rgba,返回的格式为 rgba（255，255，255，0.5）字符串
  * sHex为传入的十六进制的色值
  * alpha为rgba的透明度
  */
function colorToRgba(color) {var alpha = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.3;
  color = rgbToHex(color);
  // 十六进制颜色值的正则表达式
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  /* 16进制颜色转为RGB格式 */
  var sColor = color.toLowerCase();
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      var sColorNew = '#';
      for (var i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
      }
      sColor = sColorNew;
    }
    // 处理六位的颜色值
    var sColorChange = [];
    for (var _i3 = 1; _i3 < 7; _i3 += 2) {
      sColorChange.push(parseInt('0x' + sColor.slice(_i3, _i3 + 2)));
    }
    // return sColorChange.join(',')
    return 'rgba(' + sColorChange.join(',') + ',' + alpha + ')';
  } else
  {
    return sColor;
  }
}var _default =

{
  colorGradient: colorGradient,
  hexToRgb: hexToRgb,
  rgbToHex: rgbToHex,
  colorToRgba: colorToRgba };exports.default = _default;

/***/ }),

/***/ 26:
/*!******************************************************************************!*\
  !*** /Users/mac/code/driver1234/node_modules/uview-ui/libs/function/guid.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 本算法来源于简书开源代码，详见：https://www.jianshu.com/p/fdbf293d0a85
                                                                                                      * 全局唯一标识符（uuid，Globally Unique Identifier）,也称作 uuid(Universally Unique IDentifier) 
                                                                                                      * 一般用于多个组件之间,给它一个唯一的标识符,或者v-for循环的时候,如果使用数组的index可能会导致更新列表出现问题
                                                                                                      * 最可能的情况是左滑删除item或者对某条信息流"不喜欢"并去掉它的时候,会导致组件内的数据可能出现错乱
                                                                                                      * v-for的时候,推荐使用后端返回的id而不是循环的index
                                                                                                      * @param {Number} len uuid的长度
                                                                                                      * @param {Boolean} firstU 将返回的首字母置为"u"
                                                                                                      * @param {Nubmer} radix 生成uuid的基数(意味着返回的字符串都是这个基数),2-二进制,8-八进制,10-十进制,16-十六进制
                                                                                                      */
function guid() {var len = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 32;var firstU = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;var radix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  var uuid = [];
  radix = radix || chars.length;

  if (len) {
    // 如果指定uuid长度,只是取随机的字符,0|x为位运算,能去掉x的小数位,返回整数位
    for (var i = 0; i < len; i++) {uuid[i] = chars[0 | Math.random() * radix];}
  } else {
    var r;
    // rfc4122标准要求返回的uuid中,某些位为固定的字符
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';

    for (var _i = 0; _i < 36; _i++) {
      if (!uuid[_i]) {
        r = 0 | Math.random() * 16;
        uuid[_i] = chars[_i == 19 ? r & 0x3 | 0x8 : r];
      }
    }
  }
  // 移除第一个字符,并用u替代,因为第一个字符为数值时,该guuid不能用作id或者class
  if (firstU) {
    uuid.shift();
    return 'u' + uuid.join('');
  } else {
    return uuid.join('');
  }
}var _default =

guid;exports.default = _default;

/***/ }),

/***/ 27:
/*!*******************************************************************************!*\
  !*** /Users/mac/code/driver1234/node_modules/uview-ui/libs/function/color.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 为了让用户能够自定义主题，会逐步弃用此文件，各颜色通过css提供
// 为了给某些特殊场景使用和向后兼容，无需删除此文件(2020-06-20)
var color = {
  primary: "#2979ff",
  primaryDark: "#2b85e4",
  primaryDisabled: "#a0cfff",
  primaryLight: "#ecf5ff",
  bgColor: "#f3f4f6",

  info: "#909399",
  infoDark: "#82848a",
  infoDisabled: "#c8c9cc",
  infoLight: "#f4f4f5",

  warning: "#ff9900",
  warningDark: "#f29100",
  warningDisabled: "#fcbd71",
  warningLight: "#fdf6ec",

  error: "#fa3534",
  errorDark: "#dd6161",
  errorDisabled: "#fab6b6",
  errorLight: "#fef0f0",

  success: "#19be6b",
  successDark: "#18b566",
  successDisabled: "#71d5a1",
  successLight: "#dbf1e1",

  mainColor: "#303133",
  contentColor: "#606266",
  tipsColor: "#909399",
  lightColor: "#c0c4cc",
  borderColor: "#e4e7ed" };var _default =


color;exports.default = _default;

/***/ }),

/***/ 28:
/*!***********************************************************************************!*\
  !*** /Users/mac/code/driver1234/node_modules/uview-ui/libs/function/type2icon.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 根据主题type值,获取对应的图标
                                                                                                      * @param String type 主题名称,primary|info|error|warning|success
                                                                                                      * @param String fill 是否使用fill填充实体的图标  
                                                                                                      */
function type2icon() {var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'success';var fill = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  // 如果非预置值,默认为success
  if (['primary', 'info', 'error', 'warning', 'success'].indexOf(type) == -1) type = 'success';
  var iconName = '';
  // 目前(2019-12-12),info和primary使用同一个图标
  switch (type) {
    case 'primary':
      iconName = 'info-circle';
      break;
    case 'info':
      iconName = 'info-circle';
      break;
    case 'error':
      iconName = 'close-circle';
      break;
    case 'warning':
      iconName = 'error-circle';
      break;
    case 'success':
      iconName = 'checkmark-circle';
      break;
    default:
      iconName = 'checkmark-circle';}

  // 是否是实体类型,加上-fill,在icon组件库中,实体的类名是后面加-fill的
  if (fill) iconName += '-fill';
  return iconName;
}var _default =

type2icon;exports.default = _default;

/***/ }),

/***/ 29:
/*!*************************************************************************************!*\
  !*** /Users/mac/code/driver1234/node_modules/uview-ui/libs/function/randomArray.js ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 打乱数组
function randomArray() {var array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  // 原理是sort排序,Math.random()产生0<= x < 1之间的数,会导致x-0.05大于或者小于0
  return array.sort(function () {return Math.random() - 0.5;});
}var _default =

randomArray;exports.default = _default;

/***/ }),

/***/ 3:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
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

/***/ 30:
/*!*********************************************************************************!*\
  !*** /Users/mac/code/driver1234/node_modules/uview-ui/libs/function/addUnit.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = addUnit;var _test = _interopRequireDefault(__webpack_require__(/*! ./test.js */ 17));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

// 添加单位，如果有rpx，%，px等单位结尾或者值为auto，直接返回，否则加上rpx单位结尾
function addUnit() {var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'auto';var unit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'rpx';
  value = String(value);
  // 用uView内置验证规则中的number判断是否为数值
  return _test.default.number(value) ? "".concat(value).concat(unit) : value;
}

/***/ }),

/***/ 31:
/*!********************************************************************************!*\
  !*** /Users/mac/code/driver1234/node_modules/uview-ui/libs/function/random.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function random(min, max) {
  if (min >= 0 && max > 0 && max >= min) {
    var gab = max - min + 1;
    return Math.floor(Math.random() * gab + min);
  } else {
    return 0;
  }
}var _default =

random;exports.default = _default;

/***/ }),

/***/ 32:
/*!******************************************************************************!*\
  !*** /Users/mac/code/driver1234/node_modules/uview-ui/libs/function/trim.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function trim(str) {var pos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'both';
  if (pos == 'both') {
    return str.replace(/^\s+|\s+$/g, "");
  } else if (pos == "left") {
    return str.replace(/^\s*/, '');
  } else if (pos == 'right') {
    return str.replace(/(\s*$)/g, "");
  } else if (pos == 'all') {
    return str.replace(/\s+/g, "");
  } else {
    return str;
  }
}var _default =

trim;exports.default = _default;

/***/ }),

/***/ 33:
/*!*******************************************************************************!*\
  !*** /Users/mac/code/driver1234/node_modules/uview-ui/libs/function/toast.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function toast(title) {var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1500;
  uni.showToast({
    title: title,
    icon: 'none',
    duration: duration });

}var _default =

toast;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 34:
/*!***********************************************************************************!*\
  !*** /Users/mac/code/driver1234/node_modules/uview-ui/libs/function/getParent.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = getParent; // 获取父组件的参数，因为支付宝小程序不支持provide/inject的写法
// this.$parent在非H5中，可以准确获取到父组件，但是在H5中，需要多次this.$parent.$parent.xxx
function getParent(name, keys) {
  var parent = this.$parent;
  // 通过while历遍，这里主要是为了H5需要多层解析的问题
  while (parent) {
    // 父组件
    if (parent.$options.name !== name) {
      // 如果组件的name不相等，继续上一级寻找
      parent = parent.$parent;
    } else {var _ret = function () {
        var data = {};
        // 判断keys是否数组，如果传过来的是一个数组，那么直接使用数组元素值当做键值去父组件寻找
        if (Array.isArray(keys)) {
          keys.map(function (val) {
            data[val] = parent[val] ? parent[val] : '';
          });
        } else {
          // 历遍传过来的对象参数
          for (var i in keys) {
            // 如果子组件有此值则用，无此值则用父组件的值
            // 判断是否空数组，如果是，则用父组件的值，否则用子组件的值
            if (Array.isArray(keys[i])) {
              if (keys[i].length) {
                data[i] = keys[i];
              } else {
                data[i] = parent[i];
              }
            } else if (keys[i].constructor === Object) {
              // 判断是否对象，如果是对象，且有属性，那么使用子组件的值，否则使用父组件的值
              if (Object.keys(keys[i]).length) {
                data[i] = keys[i];
              } else {
                data[i] = parent[i];
              }
            } else {
              // 只要子组件有传值，即使是false值，也是“传值”了，也需要覆盖父组件的同名参数
              data[i] = keys[i] || keys[i] === false ? keys[i] : parent[i];
            }
          }
        }
        return { v: data };}();if (typeof _ret === "object") return _ret.v;
    }
  }

  return {};
}

/***/ }),

/***/ 35:
/*!*********************************************************************************!*\
  !*** /Users/mac/code/driver1234/node_modules/uview-ui/libs/function/$parent.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = $parent; // 获取父组件的参数，因为支付宝小程序不支持provide/inject的写法
// this.$parent在非H5中，可以准确获取到父组件，但是在H5中，需要多次this.$parent.$parent.xxx
// 这里默认值等于undefined有它的含义，因为最顶层元素(组件)的$parent就是undefined，意味着不传name
// 值(默认为undefined)，就是查找最顶层的$parent
function $parent() {var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
  var parent = this.$parent;
  // 通过while历遍，这里主要是为了H5需要多层解析的问题
  while (parent) {
    // 父组件
    if (parent.$options && parent.$options.name !== name) {
      // 如果组件的name不相等，继续上一级寻找
      parent = parent.$parent;
    } else {
      return parent;
    }
  }
  return false;
}

/***/ }),

/***/ 36:
/*!*****************************************************************************!*\
  !*** /Users/mac/code/driver1234/node_modules/uview-ui/libs/function/sys.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.os = os;exports.sys = sys;function os() {
  return uni.getSystemInfoSync().platform;
};

function sys() {
  return uni.getSystemInfoSync();
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 37:
/*!**********************************************************************************!*\
  !*** /Users/mac/code/driver1234/node_modules/uview-ui/libs/function/debounce.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var timeout = null;

/**
                                                                                                                         * 防抖原理：一定时间内，只有最后一次操作，再过wait毫秒后才执行函数
                                                                                                                         * 
                                                                                                                         * @param {Function} func 要执行的回调函数 
                                                                                                                         * @param {Number} wait 延时的时间
                                                                                                                         * @param {Boolean} immediate 是否立即执行 
                                                                                                                         * @return null
                                                                                                                         */
function debounce(func) {var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;var immediate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  // 清除定时器
  if (timeout !== null) clearTimeout(timeout);
  // 立即执行，此类情况一般用不到
  if (immediate) {
    var callNow = !timeout;
    timeout = setTimeout(function () {
      timeout = null;
    }, wait);
    if (callNow) typeof func === 'function' && func();
  } else {
    // 设置定时器，当最后一次操作后，timeout不会再被清除，所以在延时wait毫秒后执行func回调方法
    timeout = setTimeout(function () {
      typeof func === 'function' && func();
    }, wait);
  }
}var _default =

debounce;exports.default = _default;

/***/ }),

/***/ 38:
/*!**********************************************************************************!*\
  !*** /Users/mac/code/driver1234/node_modules/uview-ui/libs/function/throttle.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var timer, flag;
/**
                                                                                                                      * 节流原理：在一定时间内，只能触发一次
                                                                                                                      * 
                                                                                                                      * @param {Function} func 要执行的回调函数 
                                                                                                                      * @param {Number} wait 延时的时间
                                                                                                                      * @param {Boolean} immediate 是否立即执行
                                                                                                                      * @return null
                                                                                                                      */
function throttle(func) {var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;var immediate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  if (immediate) {
    if (!flag) {
      flag = true;
      // 如果是立即执行，则在wait毫秒内开始时执行
      typeof func === 'function' && func();
      timer = setTimeout(function () {
        flag = false;
      }, wait);
    }
  } else {
    if (!flag) {
      flag = true;
      // 如果是非立即执行，则在wait毫秒内的结束处执行
      timer = setTimeout(function () {
        flag = false;
        typeof func === 'function' && func();
      }, wait);
    }

  }
};var _default =
throttle;exports.default = _default;

/***/ }),

/***/ 39:
/*!******************************************************************************!*\
  !*** /Users/mac/code/driver1234/node_modules/uview-ui/libs/config/config.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 此版本发布于2020-12-17
var version = '1.8.3';var _default =

{
  v: version,
  version: version,
  // 主题名称
  type: [
  'primary',
  'success',
  'info',
  'error',
  'warning'] };exports.default = _default;

/***/ }),

/***/ 4:
/*!*********************************************!*\
  !*** /Users/mac/code/driver1234/pages.json ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 40:
/*!******************************************************************************!*\
  !*** /Users/mac/code/driver1234/node_modules/uview-ui/libs/config/zIndex.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // uniapp在H5中各API的z-index值如下：
/**
 * actionsheet: 999
 * modal: 999
 * navigate: 998
 * tabbar: 998
 * toast: 999
 */var _default =

{
  toast: 10090,
  noNetwork: 10080,
  // popup包含popup，actionsheet，keyboard，picker的值
  popup: 10075,
  mask: 10070,
  navbar: 980,
  topTips: 975,
  sticky: 970,
  indexListSticky: 965 };exports.default = _default;

/***/ }),

/***/ 41:
/*!*************************************************!*\
  !*** /Users/mac/code/driver1234/store/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _vuex = _interopRequireDefault(__webpack_require__(/*! vuex */ 8));
var _state = _interopRequireDefault(__webpack_require__(/*! ./state.js */ 42));
var _mutations = _interopRequireDefault(__webpack_require__(/*! ./mutations.js */ 43));
var _getters = _interopRequireDefault(__webpack_require__(/*! ./getters.js */ 44));
var _actions = _interopRequireDefault(__webpack_require__(/*! ./actions.js */ 45));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
_vue.default.use(_vuex.default);
var store = new _vuex.default.Store({
  state: _state.default,
  mutations: _mutations.default,
  getters: _getters.default,
  actions: _actions.default });var _default =

store;exports.default = _default;

/***/ }),

/***/ 42:
/*!*************************************************!*\
  !*** /Users/mac/code/driver1234/store/state.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var state = {
  searchInteraction: '',
  userInfo: {},
  token: '',
  location: '',
  locationModel: false,
  shareCode: '',
  buffer: '' };var _default =


state;exports.default = _default;

/***/ }),

/***/ 43:
/*!*****************************************************!*\
  !*** /Users/mac/code/driver1234/store/mutations.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var mutations = {
  setSearchInteraction: function setSearchInteraction(state, string) {
    state.searchInteraction = string;
  },
  setUserInfo: function setUserInfo(state, obj) {
    state.userInfo = obj;
  },
  setToken: function setToken(state, string) {
    state.token = string;
  },
  setLocation: function setLocation(state, string) {
    state.location = string;
  },
  setLocationModel: function setLocationModel(state, boolea) {
    state.locationModel = boolea;
  },
  setShareCode: function setShareCode(state, string) {
    state.shareCode = string;
  },
  setWXBuffer: function setWXBuffer(state, string) {
    state.buffer = string;
  } };var _default =


mutations;exports.default = _default;

/***/ }),

/***/ 44:
/*!***************************************************!*\
  !*** /Users/mac/code/driver1234/store/getters.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var getters = {
  sureCode: function sureCode(_ref) {var buffer = _ref.buffer;
    if (!buffer) {
      return '';
    }
    var base64 = wx.arrayBufferToBase64(buffer);
    return "data:image/png;base64,".concat(base64);
  } };var _default =


getters;exports.default = _default;

/***/ }),

/***/ 45:
/*!***************************************************!*\
  !*** /Users/mac/code/driver1234/store/actions.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 20));var _main = _interopRequireDefault(__webpack_require__(/*! ../main */ 0));
var _constant = __webpack_require__(/*! ../utils/constant.js */ 46);
var _amapWx = _interopRequireDefault(__webpack_require__(/*! ../static/amap-wx.130.js */ 47));
var _httpUrl = __webpack_require__(/*! ../utils/http.url.js */ 49);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}
var actions = {
  // 授权后 获取地理位置
  getAccurate: function getAccurate(_ref) {var commit = _ref.commit;
    var myAmapFun = new _amapWx.default.AMapWX({ key: _constant.MAP_KEY });
    uni.getLocation({
      type: 'wgs84',
      success: function success(_ref2) {var latitude = _ref2.latitude,longitude = _ref2.longitude;
        myAmapFun.getRegeo({
          location: "".concat(longitude, ",").concat(latitude), //经纬度
          success: function success(res) {var
            province = res[0].regeocodeData.addressComponent.province;
            // 设置城市 关闭请求模态框
            commit('setLocation', province);
            commit('setLocationModel', false);
          },
          fail: function fail(err) {
            // 暂未处理失败，后续添加
            console.log('err', err);
          } });

      } });

  },
  getUserInfo: function getUserInfo(_ref3) {var commit = _ref3.commit;
    uni.getUserInfo({
      success: function success(res) {
        console.log(res);
        commit('setUserInfo', res);
      } });

  },
  login: function login(_ref4, isAuthor) {var dispatch = _ref4.dispatch,commit = _ref4.commit,state = _ref4.state;
    if (isAuthor) {
      uni.showToast({
        icon: "loading",
        title: '登陆中',
        position: 'center' });

    }
    uni.login({
      provider: 'weixin',
      success: function () {var _success = _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee(res) {var respones, _ref5, openid, session_key, myShareCode, tokenRes, _tokenRes$access_toke, access_token;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
                  dispatch('getUserInfo');_context.next = 3;return (
                    _main.default.$u.api.getOpenId({ js_code: res.code }));case 3:respones = _context.sent;_ref5 =
                  respones || {}, openid = _ref5.openid, session_key = _ref5.session_key;
                  if (isAuthor) {
                    uni.showToast({
                      icon: "none",
                      title: '登陆成功',
                      duration: 1000,
                      position: 'center' });

                  }
                  console.log('shareCode', state.shareCode);
                  // const loginRes = await app.$u.api.login({openid:openid,shareCode:state.shareCode})
                  // const { myShareCode } = loginRes 
                  myShareCode = '123';_context.next = 10;return (
                    _main.default.$u.api.getWXToken());case 10:tokenRes = _context.sent;_tokenRes$access_toke =
                  tokenRes.access_token, access_token = _tokenRes$access_toke === void 0 ? '' : _tokenRes$access_toke;
                  wx.request({
                    url: "".concat(_httpUrl.getwxacode, "?access_token=").concat(access_token),
                    method: 'POST',
                    responseType: "arraybuffer",
                    data: JSON.stringify({ path: "pages/my?shareCode=".concat(myShareCode) }),
                    success: function success(res) {
                      commit('setWXBuffer', res.data);
                      commit('setToken', openid);
                    },
                    fill: function fill() {
                      commit('setToken', openid);
                    } });case 13:case "end":return _context.stop();}}}, _callee);}));function success(_x) {return _success.apply(this, arguments);}return success;}() });



  } };var _default =

actions;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 46:
/*!****************************************************!*\
  !*** /Users/mac/code/driver1234/utils/constant.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.SECRET = exports.APPID = exports.MAP_KEY = exports.PICTURE = exports.PHOTOGRAPH = void 0;var PHOTOGRAPH = 'photograph';exports.PHOTOGRAPH = PHOTOGRAPH;
var PICTURE = 'picture';exports.PICTURE = PICTURE;
var MAP_KEY = 'eafc0c5af4f9941bc25135721cef4dd7';exports.MAP_KEY = MAP_KEY;
var APPID = 'wxe6d3258896d7c705';exports.APPID = APPID;
var SECRET = '3bab34b832d5decd3483ff4cbc5b1095';exports.SECRET = SECRET;

/***/ }),

/***/ 47:
/*!********************************************************!*\
  !*** /Users/mac/code/driver1234/static/amap-wx.130.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function AMapWX(a) {this.key = a.key;this.requestConfig = { key: a.key, s: "rsx", platform: "WXJS", appname: a.key, sdkversion: "1.2.0", logversion: "2.0" };this.MeRequestConfig = { key: a.key, serviceName: "https://restapi.amap.com/rest/me" };}
AMapWX.prototype.getWxLocation = function (a, b) {wx.getLocation({ type: "gcj02", success: function success(c) {c = c.longitude + "," + c.latitude;wx.setStorage({ key: "userLocation", data: c });b(c);}, fail: function fail(c) {wx.getStorage({ key: "userLocation", success: function success(d) {d.data && b(d.data);} });a.fail({ errCode: "0", errMsg: c.errMsg || "" });} });};
AMapWX.prototype.getMEKeywordsSearch = function (a) {if (!a.options) return a.fail({ errCode: "0", errMsg: "\u7F3A\u5C11\u5FC5\u8981\u53C2\u6570" });var b = a.options,c = this.MeRequestConfig,d = { key: c.key, s: "rsx", platform: "WXJS", appname: a.key, sdkversion: "1.2.0", logversion: "2.0" };b.layerId && (d.layerId = b.layerId);b.keywords && (d.keywords = b.keywords);b.city && (d.city = b.city);b.filter && (d.filter = b.filter);b.sortrule && (d.sortrule = b.sortrule);b.pageNum && (d.pageNum = b.pageNum);b.pageSize && (d.pageSize = b.pageSize);b.sig && (d.sig =
  b.sig);wx.request({ url: c.serviceName + "/cpoint/datasearch/local", data: d, method: "GET", header: { "content-type": "application/json" }, success: function success(e) {(e = e.data) && e.status && "1" === e.status && 0 === e.code ? a.success(e.data) : a.fail({ errCode: "0", errMsg: e });}, fail: function fail(e) {a.fail({ errCode: "0", errMsg: e.errMsg || "" });} });};
AMapWX.prototype.getMEIdSearch = function (a) {if (!a.options) return a.fail({ errCode: "0", errMsg: "\u7F3A\u5C11\u5FC5\u8981\u53C2\u6570" });var b = a.options,c = this.MeRequestConfig,d = { key: c.key, s: "rsx", platform: "WXJS", appname: a.key, sdkversion: "1.2.0", logversion: "2.0" };b.layerId && (d.layerId = b.layerId);b.id && (d.id = b.id);b.sig && (d.sig = b.sig);wx.request({ url: c.serviceName + "/cpoint/datasearch/id", data: d, method: "GET", header: { "content-type": "application/json" }, success: function success(e) {(e = e.data) && e.status && "1" === e.status &&
      0 === e.code ? a.success(e.data) : a.fail({ errCode: "0", errMsg: e });}, fail: function fail(e) {a.fail({ errCode: "0", errMsg: e.errMsg || "" });} });};
AMapWX.prototype.getMEPolygonSearch = function (a) {if (!a.options) return a.fail({ errCode: "0", errMsg: "\u7F3A\u5C11\u5FC5\u8981\u53C2\u6570" });var b = a.options,c = this.MeRequestConfig,d = { key: c.key, s: "rsx", platform: "WXJS", appname: a.key, sdkversion: "1.2.0", logversion: "2.0" };b.layerId && (d.layerId = b.layerId);b.keywords && (d.keywords = b.keywords);b.polygon && (d.polygon = b.polygon);b.filter && (d.filter = b.filter);b.sortrule && (d.sortrule = b.sortrule);b.pageNum && (d.pageNum = b.pageNum);b.pageSize && (d.pageSize = b.pageSize);
  b.sig && (d.sig = b.sig);wx.request({ url: c.serviceName + "/cpoint/datasearch/polygon", data: d, method: "GET", header: { "content-type": "application/json" }, success: function success(e) {(e = e.data) && e.status && "1" === e.status && 0 === e.code ? a.success(e.data) : a.fail({ errCode: "0", errMsg: e });}, fail: function fail(e) {a.fail({ errCode: "0", errMsg: e.errMsg || "" });} });};
AMapWX.prototype.getMEaroundSearch = function (a) {if (!a.options) return a.fail({ errCode: "0", errMsg: "\u7F3A\u5C11\u5FC5\u8981\u53C2\u6570" });var b = a.options,c = this.MeRequestConfig,d = { key: c.key, s: "rsx", platform: "WXJS", appname: a.key, sdkversion: "1.2.0", logversion: "2.0" };b.layerId && (d.layerId = b.layerId);b.keywords && (d.keywords = b.keywords);b.center && (d.center = b.center);b.radius && (d.radius = b.radius);b.filter && (d.filter = b.filter);b.sortrule && (d.sortrule = b.sortrule);b.pageNum && (d.pageNum = b.pageNum);b.pageSize && (
  d.pageSize = b.pageSize);b.sig && (d.sig = b.sig);wx.request({ url: c.serviceName + "/cpoint/datasearch/around", data: d, method: "GET", header: { "content-type": "application/json" }, success: function success(e) {(e = e.data) && e.status && "1" === e.status && 0 === e.code ? a.success(e.data) : a.fail({ errCode: "0", errMsg: e });}, fail: function fail(e) {a.fail({ errCode: "0", errMsg: e.errMsg || "" });} });};
AMapWX.prototype.getGeo = function (a) {var b = this.requestConfig,c = a.options;b = { key: this.key, extensions: "all", s: b.s, platform: b.platform, appname: this.key, sdkversion: b.sdkversion, logversion: b.logversion };c.address && (b.address = c.address);c.city && (b.city = c.city);c.batch && (b.batch = c.batch);c.sig && (b.sig = c.sig);wx.request({ url: "https://restapi.amap.com/v3/geocode/geo", data: b, method: "GET", header: { "content-type": "application/json" }, success: function success(d) {(d = d.data) && d.status && "1" === d.status ? a.success(d) : a.fail({ errCode: "0",
        errMsg: d });}, fail: function fail(d) {a.fail({ errCode: "0", errMsg: d.errMsg || "" });} });};
AMapWX.prototype.getRegeo = function (a) {function b(d) {var e = c.requestConfig;wx.request({ url: "https://restapi.amap.com/v3/geocode/regeo", data: { key: c.key, location: d, extensions: "all", s: e.s, platform: e.platform, appname: c.key, sdkversion: e.sdkversion, logversion: e.logversion }, method: "GET", header: { "content-type": "application/json" }, success: function success(g) {if (g.data.status && "1" == g.data.status) {g = g.data.regeocode;var h = g.addressComponent,f = [],k = g.roads[0].name + "\u9644\u8FD1",m = d.split(",")[0],n = d.split(",")[1];if (g.pois &&
          g.pois[0]) {k = g.pois[0].name + "\u9644\u8FD1";var l = g.pois[0].location;l && (m = parseFloat(l.split(",")[0]), n = parseFloat(l.split(",")[1]));}h.provice && f.push(h.provice);h.city && f.push(h.city);h.district && f.push(h.district);h.streetNumber && h.streetNumber.street && h.streetNumber.number ? (f.push(h.streetNumber.street), f.push(h.streetNumber.number)) : f.push(g.roads[0].name);f = f.join("");a.success([{ iconPath: a.iconPath, width: a.iconWidth, height: a.iconHeight, name: f, desc: k, longitude: m, latitude: n, id: 0, regeocodeData: g }]);} else a.fail({ errCode: g.data.infocode,
          errMsg: g.data.info });}, fail: function fail(g) {a.fail({ errCode: "0", errMsg: g.errMsg || "" });} });}var c = this;a.location ? b(a.location) : c.getWxLocation(a, function (d) {b(d);});};
AMapWX.prototype.getWeather = function (a) {function b(g) {var h = "base";a.type && "forecast" == a.type && (h = "all");wx.request({ url: "https://restapi.amap.com/v3/weather/weatherInfo", data: { key: d.key, city: g, extensions: h, s: e.s, platform: e.platform, appname: d.key, sdkversion: e.sdkversion, logversion: e.logversion }, method: "GET", header: { "content-type": "application/json" }, success: function success(f) {if (f.data.status && "1" == f.data.status) {if (f.data.lives) {if ((f = f.data.lives) && 0 < f.length) {f = f[0];var k = { city: { text: "\u57CE\u5E02", data: f.city },
                weather: { text: "\u5929\u6C14", data: f.weather }, temperature: { text: "\u6E29\u5EA6", data: f.temperature }, winddirection: { text: "\u98CE\u5411", data: f.winddirection + "\u98CE" }, windpower: { text: "\u98CE\u529B", data: f.windpower + "\u7EA7" }, humidity: { text: "\u6E7F\u5EA6", data: f.humidity + "%" } };k.liveData = f;a.success(k);}} else f.data.forecasts && f.data.forecasts[0] && a.success({ forecast: f.data.forecasts[0] });} else a.fail({ errCode: f.data.infocode, errMsg: f.data.info });}, fail: function fail(f) {a.fail({ errCode: "0", errMsg: f.errMsg || "" });} });}
  function c(g) {wx.request({ url: "https://restapi.amap.com/v3/geocode/regeo", data: { key: d.key, location: g, extensions: "all", s: e.s, platform: e.platform, appname: d.key, sdkversion: e.sdkversion, logversion: e.logversion }, method: "GET", header: { "content-type": "application/json" }, success: function success(h) {if (h.data.status && "1" == h.data.status) {h = h.data.regeocode;if (h.addressComponent) var f = h.addressComponent.adcode;else h.aois && 0 < h.aois.length && (f = h.aois[0].adcode);b(f);} else a.fail({ errCode: h.data.infocode, errMsg: h.data.info });},
      fail: function fail(h) {a.fail({ errCode: "0", errMsg: h.errMsg || "" });} });}var d = this,e = d.requestConfig;a.city ? b(a.city) : d.getWxLocation(a, function (g) {c(g);});};
AMapWX.prototype.getPoiAround = function (a) {function b(e) {e = { key: c.key, location: e, s: d.s, platform: d.platform, appname: c.key, sdkversion: d.sdkversion, logversion: d.logversion };a.querytypes && (e.types = a.querytypes);a.querykeywords && (e.keywords = a.querykeywords);wx.request({ url: "https://restapi.amap.com/v3/place/around", data: e, method: "GET", header: { "content-type": "application/json" }, success: function success(g) {if (g.data.status && "1" == g.data.status) {if ((g = g.data) && g.pois) {for (var h = [], f = 0; f < g.pois.length; f++) {var k = 0 ==
              f ? a.iconPathSelected : a.iconPath;h.push({ latitude: parseFloat(g.pois[f].location.split(",")[1]), longitude: parseFloat(g.pois[f].location.split(",")[0]), iconPath: k, width: 22, height: 32, id: f, name: g.pois[f].name, address: g.pois[f].address });}a.success({ markers: h, poisData: g.pois });}} else a.fail({ errCode: g.data.infocode, errMsg: g.data.info });}, fail: function fail(g) {a.fail({ errCode: "0", errMsg: g.errMsg || "" });} });}var c = this,d = c.requestConfig;a.location ? b(a.location) : c.getWxLocation(a, function (e) {b(e);});};
AMapWX.prototype.getStaticmap = function (a) {function b(e) {c.push("location=" + e);a.zoom && c.push("zoom=" + a.zoom);a.size && c.push("size=" + a.size);a.scale && c.push("scale=" + a.scale);a.markers && c.push("markers=" + a.markers);a.labels && c.push("labels=" + a.labels);a.paths && c.push("paths=" + a.paths);a.traffic && c.push("traffic=" + a.traffic);e = "https://restapi.amap.com/v3/staticmap?" + c.join("&");a.success({ url: e });}var c = [];c.push("key=" + this.key);var d = this.requestConfig;c.push("s=" + d.s);c.push("platform=" + d.platform);
  c.push("appname=" + d.appname);c.push("sdkversion=" + d.sdkversion);c.push("logversion=" + d.logversion);a.location ? b(a.location) : this.getWxLocation(a, function (e) {b(e);});};
AMapWX.prototype.getInputtips = function (a) {var b = Object.assign({}, this.requestConfig);a.location && (b.location = a.location);a.keywords && (b.keywords = a.keywords);a.type && (b.type = a.type);a.city && (b.city = a.city);a.citylimit && (b.citylimit = a.citylimit);wx.request({ url: "https://restapi.amap.com/v3/assistant/inputtips", data: b, method: "GET", header: { "content-type": "application/json" }, success: function success(c) {c && c.data && c.data.tips && a.success({ tips: c.data.tips });}, fail: function fail(c) {a.fail({ errCode: "0", errMsg: c.errMsg ||
        "" });} });};
AMapWX.prototype.getDrivingRoute = function (a) {var b = Object.assign({}, this.requestConfig);a.origin && (b.origin = a.origin);a.destination && (b.destination = a.destination);a.strategy && (b.strategy = a.strategy);a.waypoints && (b.waypoints = a.waypoints);a.avoidpolygons && (b.avoidpolygons = a.avoidpolygons);a.avoidroad && (b.avoidroad = a.avoidroad);wx.request({ url: "https://restapi.amap.com/v3/direction/driving", data: b, method: "GET", header: { "content-type": "application/json" }, success: function success(c) {c && c.data && c.data.route && a.success({ paths: c.data.route.paths,
        taxi_cost: c.data.route.taxi_cost || "" });}, fail: function fail(c) {a.fail({ errCode: "0", errMsg: c.errMsg || "" });} });};
AMapWX.prototype.getWalkingRoute = function (a) {var b = Object.assign({}, this.requestConfig);a.origin && (b.origin = a.origin);a.destination && (b.destination = a.destination);wx.request({ url: "https://restapi.amap.com/v3/direction/walking", data: b, method: "GET", header: { "content-type": "application/json" }, success: function success(c) {c && c.data && c.data.route && a.success({ paths: c.data.route.paths });}, fail: function fail(c) {a.fail({ errCode: "0", errMsg: c.errMsg || "" });} });};
AMapWX.prototype.getTransitRoute = function (a) {var b = Object.assign({}, this.requestConfig);a.origin && (b.origin = a.origin);a.destination && (b.destination = a.destination);a.strategy && (b.strategy = a.strategy);a.city && (b.city = a.city);a.cityd && (b.cityd = a.cityd);wx.request({ url: "https://restapi.amap.com/v3/direction/transit/integrated", data: b, method: "GET", header: { "content-type": "application/json" }, success: function success(c) {c && c.data && c.data.route && (c = c.data.route, a.success({ distance: c.distance || "", taxi_cost: c.taxi_cost ||
        "", transits: c.transits }));}, fail: function fail(c) {a.fail({ errCode: "0", errMsg: c.errMsg || "" });} });};
AMapWX.prototype.getRidingRoute = function (a) {var b = Object.assign({}, this.requestConfig);a.origin && (b.origin = a.origin);a.destination && (b.destination = a.destination);wx.request({ url: "https://restapi.amap.com/v3/direction/riding", data: b, method: "GET", header: { "content-type": "application/json" }, success: function success(c) {c && c.data && c.data.route && a.success({ paths: c.data.route.paths });}, fail: function fail(c) {a.fail({ errCode: "0", errMsg: c.errMsg || "" });} });};module.exports.AMapWX = AMapWX;

/***/ }),

/***/ 48:
/*!****************************************************!*\
  !*** /Users/mac/code/driver1234/utils/http.api.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _http = __webpack_require__(/*! ./http.url */ 49);
var _constant = __webpack_require__(/*! ./constant.js */ 46);function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}
var install = function install(Vue, vm) {
  var getSearch = function getSearch() {var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};return vm.$u.get(_http.hotSearchUrl, {
      id: 2 });};

  var getOpenId = function getOpenId() {var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};return vm.$u.get(_http.jscode2session, _objectSpread(_objectSpread({},
    params), {}, {
      grant_type: 'authorization_code',
      appid: _constant.APPID,
      secret: _constant.SECRET }));};

  var getWXToken = function getWXToken() {var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};return vm.$u.get(_http.wxToken, {
      grant_type: 'client_credential',
      appid: _constant.APPID,
      secret: _constant.SECRET });};


  var getGetwxacode = function getGetwxacode() {var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};return vm.$u.post("".concat(_http.getwxacode, "?access_token=").concat(params.access_token), { path: params.path });};
  var login = function login() {var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};return vm.$u.get(login, params);};
  var getInfo = function getInfo() {var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};return vm.$u.post(_http.indexUrl, params);};
  vm.$u.api = { getSearch: getSearch, getInfo: getInfo, getOpenId: getOpenId, getWXToken: getWXToken, getGetwxacode: getGetwxacode, login: login };
};var _default =

{
  install: install };exports.default = _default;

/***/ }),

/***/ 49:
/*!****************************************************!*\
  !*** /Users/mac/code/driver1234/utils/http.url.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.getwxacode = exports.wxToken = exports.jscode2session = exports.location = exports.loginUrl = exports.indexUrl = exports.hotSearchUrl = exports.BASE_URL = void 0;var BASE_URL = 'XXX';exports.BASE_URL = BASE_URL;
var hotSearchUrl = '/ebapi/store_api/hot_search';exports.hotSearchUrl = hotSearchUrl;
var indexUrl = '/ebapi/public_api/index';exports.indexUrl = indexUrl;
var loginUrl = '';exports.loginUrl = loginUrl;
var location = 'https://restapi.amap.com/v3/geocode/regeo'; // 高德地图
exports.location = location;var jscode2session = 'https://api.weixin.qq.com/sns/jscode2session'; //openid
exports.jscode2session = jscode2session;var wxToken = 'https://api.weixin.qq.com/cgi-bin/token'; //获取微信token
exports.wxToken = wxToken;var getwxacode = 'https://api.weixin.qq.com/wxa/getwxacode'; //获取小程序码
exports.getwxacode = getwxacode;

/***/ }),

/***/ 50:
/*!************************************************************!*\
  !*** /Users/mac/code/driver1234/utils/http.interceptor.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _http = __webpack_require__(/*! ./http.url */ 49);
// common/http.interceptor.js

// 这里的Vue为Vue对象(非创建出来的实例)，vm为main.js中“Vue.use(httpInterceptor, app)”这一句的第二个参数，
// 为一个Vue的实例，也即每个页面的"this"
// 如果需要了解这个install方法是什么，请移步：https://uviewui.com/components/vueUse.html
var install = function install(Vue, vm) {
  // 此为自定义配置参数，具体参数见上方说明
  Vue.prototype.$u.http.setConfig({
    baseUrl: _http.BASE_URL,
    loadingText: '努力加载中~',
    loadingTime: 800
    // 设置自定义头部content-type
    // header: {
    // 	'content-type': 'xxx'
    // }
    // ......
  });
  // 请求拦截部分，如配置，每次请求前都会执行
  Vue.prototype.$u.http.interceptor.request = function (config) {
    // 引用token
    config.header.token = vm.$store.state.token;

    // 可以对某个url进行特别处理，此url参数为this.$u.get(url)中的url值
    // if(config.url == '/user/login') config.header.noToken = true; //例子
    // 最后需要将config进行return
    return config;
    // 如果return一个false值，则会取消本次请求
    // if(config.url == '/user/rest') return false; // 取消某次请求 //例子
  };
  // 响应拦截，如配置，每次请求结束都会执行本方法
  // Vue.prototype.$u.http.interceptor.response = (res) => {
  // 	return res.result;
  // }
};var _default =

{
  install: install };exports.default = _default;

/***/ }),

/***/ 8:
/*!********************************************!*\
  !*** ./node_modules/vuex/dist/vuex.esm.js ***!
  \********************************************/
/*! exports provided: default, Store, createNamespacedHelpers, install, mapActions, mapGetters, mapMutations, mapState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Store", function() { return Store; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createNamespacedHelpers", function() { return createNamespacedHelpers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "install", function() { return install; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapActions", function() { return mapActions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapGetters", function() { return mapGetters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapMutations", function() { return mapMutations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapState", function() { return mapState; });
/*!
 * vuex v3.4.0
 * (c) 2020 Evan You
 * @license MIT
 */
function applyMixin (Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if ( options === void 0 ) options = {};

      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
}

var target = typeof window !== 'undefined'
  ? window
  : typeof global !== 'undefined'
    ? global
    : {};
var devtoolHook = target.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin (store) {
  if (!devtoolHook) { return }

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  }, { prepend: true });

  store.subscribeAction(function (action, state) {
    devtoolHook.emit('vuex:action', action, state);
  }, { prepend: true });
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */

/**
 * forEach for object
 */
function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function assert (condition, msg) {
  if (!condition) { throw new Error(("[vuex] " + msg)) }
}

function partial (fn, arg) {
  return function () {
    return fn(arg)
  }
}

// Base data struct for store's module, package with some attribute and method
var Module = function Module (rawModule, runtime) {
  this.runtime = runtime;
  // Store some children item
  this._children = Object.create(null);
  // Store the origin module object which passed by programmer
  this._rawModule = rawModule;
  var rawState = rawModule.state;

  // Store the origin module's state
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors = { namespaced: { configurable: true } };

prototypeAccessors.namespaced.get = function () {
  return !!this._rawModule.namespaced
};

Module.prototype.addChild = function addChild (key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild (key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild (key) {
  return this._children[key]
};

Module.prototype.hasChild = function hasChild (key) {
  return key in this._children
};

Module.prototype.update = function update (rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild (fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter (fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction (fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties( Module.prototype, prototypeAccessors );

var ModuleCollection = function ModuleCollection (rawRootModule) {
  // register root module (Vuex.Store options)
  this.register([], rawRootModule, false);
};

ModuleCollection.prototype.get = function get (path) {
  return path.reduce(function (module, key) {
    return module.getChild(key)
  }, this.root)
};

ModuleCollection.prototype.getNamespace = function getNamespace (path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
};

ModuleCollection.prototype.update = function update$1 (rawRootModule) {
  update([], this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
    var this$1 = this;
    if ( runtime === void 0 ) runtime = true;

  if ((true)) {
    assertRawModule(path, rawModule);
  }

  var newModule = new Module(rawModule, runtime);
  if (path.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path.slice(0, -1));
    parent.addChild(path[path.length - 1], newModule);
  }

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  if (!parent.getChild(key).runtime) { return }

  parent.removeChild(key);
};

ModuleCollection.prototype.isRegistered = function isRegistered (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];

  return parent.hasChild(key)
};

function update (path, targetModule, newModule) {
  if ((true)) {
    assertRawModule(path, newModule);
  }

  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        if ((true)) {
          console.warn(
            "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
            'manual reload is needed'
          );
        }
        return
      }
      update(
        path.concat(key),
        targetModule.getChild(key),
        newModule.modules[key]
      );
    }
  }
}

var functionAssert = {
  assert: function (value) { return typeof value === 'function'; },
  expected: 'function'
};

var objectAssert = {
  assert: function (value) { return typeof value === 'function' ||
    (typeof value === 'object' && typeof value.handler === 'function'); },
  expected: 'function or object with "handler" function'
};

var assertTypes = {
  getters: functionAssert,
  mutations: functionAssert,
  actions: objectAssert
};

function assertRawModule (path, rawModule) {
  Object.keys(assertTypes).forEach(function (key) {
    if (!rawModule[key]) { return }

    var assertOptions = assertTypes[key];

    forEachValue(rawModule[key], function (value, type) {
      assert(
        assertOptions.assert(value),
        makeAssertionMessage(path, key, type, value, assertOptions.expected)
      );
    });
  });
}

function makeAssertionMessage (path, key, type, value, expected) {
  var buf = key + " should be " + expected + " but \"" + key + "." + type + "\"";
  if (path.length > 0) {
    buf += " in module \"" + (path.join('.')) + "\"";
  }
  buf += " is " + (JSON.stringify(value)) + ".";
  return buf
}

var Vue; // bind on install

var Store = function Store (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  // Auto install if it is not done yet and `window` has `Vue`.
  // To allow users to avoid auto-installation in some cases,
  // this code should be placed here. See #731
  if (!Vue && typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  if ((true)) {
    assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
    assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");
    assert(this instanceof Store, "store must be called with the new operator.");
  }

  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
  var strict = options.strict; if ( strict === void 0 ) strict = false;

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._actionSubscribers = [];
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();
  this._makeLocalGettersCache = Object.create(null);

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
  };
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
  };

  // strict mode
  this.strict = strict;

  var state = this._modules.root.state;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.forEach(function (plugin) { return plugin(this$1); });

  var useDevtools = options.devtools !== undefined ? options.devtools : Vue.config.devtools;
  if (useDevtools) {
    devtoolPlugin(this);
  }
};

var prototypeAccessors$1 = { state: { configurable: true } };

prototypeAccessors$1.state.get = function () {
  return this._vm._data.$$state
};

prototypeAccessors$1.state.set = function (v) {
  if ((true)) {
    assert(false, "use store.replaceState() to explicit replace store state.");
  }
};

Store.prototype.commit = function commit (_type, _payload, _options) {
    var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    if ((true)) {
      console.error(("[vuex] unknown mutation type: " + type));
    }
    return
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });

  this._subscribers
    .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
    .forEach(function (sub) { return sub(mutation, this$1.state); });

  if (
    ( true) &&
    options && options.silent
  ) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
      'Use the filter functionality in the vue-devtools'
    );
  }
};

Store.prototype.dispatch = function dispatch (_type, _payload) {
    var this$1 = this;

  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;

  var action = { type: type, payload: payload };
  var entry = this._actions[type];
  if (!entry) {
    if ((true)) {
      console.error(("[vuex] unknown action type: " + type));
    }
    return
  }

  try {
    this._actionSubscribers
      .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
      .filter(function (sub) { return sub.before; })
      .forEach(function (sub) { return sub.before(action, this$1.state); });
  } catch (e) {
    if ((true)) {
      console.warn("[vuex] error in before action subscribers: ");
      console.error(e);
    }
  }

  var result = entry.length > 1
    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
    : entry[0](payload);

  return new Promise(function (resolve, reject) {
    result.then(function (res) {
      try {
        this$1._actionSubscribers
          .filter(function (sub) { return sub.after; })
          .forEach(function (sub) { return sub.after(action, this$1.state); });
      } catch (e) {
        if ((true)) {
          console.warn("[vuex] error in after action subscribers: ");
          console.error(e);
        }
      }
      resolve(res);
    }, function (error) {
      try {
        this$1._actionSubscribers
          .filter(function (sub) { return sub.error; })
          .forEach(function (sub) { return sub.error(action, this$1.state, error); });
      } catch (e) {
        if ((true)) {
          console.warn("[vuex] error in error action subscribers: ");
          console.error(e);
        }
      }
      reject(error);
    });
  })
};

Store.prototype.subscribe = function subscribe (fn, options) {
  return genericSubscribe(fn, this._subscribers, options)
};

Store.prototype.subscribeAction = function subscribeAction (fn, options) {
  var subs = typeof fn === 'function' ? { before: fn } : fn;
  return genericSubscribe(subs, this._actionSubscribers, options)
};

Store.prototype.watch = function watch (getter, cb, options) {
    var this$1 = this;

  if ((true)) {
    assert(typeof getter === 'function', "store.watch only accepts a function.");
  }
  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
};

Store.prototype.replaceState = function replaceState (state) {
    var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule (path, rawModule, options) {
    if ( options === void 0 ) options = {};

  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
    assert(path.length > 0, 'cannot register the root module by using registerModule.');
  }

  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path), options.preserveState);
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule (path) {
    var this$1 = this;

  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hasModule = function hasModule (path) {
  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  return this._modules.isRegistered(path)
};

Store.prototype.hotUpdate = function hotUpdate (newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties( Store.prototype, prototypeAccessors$1 );

function genericSubscribe (fn, subs, options) {
  if (subs.indexOf(fn) < 0) {
    options && options.prepend
      ? subs.unshift(fn)
      : subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  }
}

function resetStore (store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM (store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  // reset local getters cache
  store._makeLocalGettersCache = Object.create(null);
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    // direct inline function use will lead to closure preserving oldVm.
    // using partial to return function with only arguments preserved in closure environment.
    computed[key] = partial(fn, store);
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; },
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () { return oldVm.$destroy(); });
  }
}

function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (module.namespaced) {
    if (store._modulesNamespaceMap[namespace] && ("development" !== 'production')) {
      console.error(("[vuex] duplicate namespace " + namespace + " for the namespaced module " + (path.join('/'))));
    }
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      if ((true)) {
        if (moduleName in parentState) {
          console.warn(
            ("[vuex] state field \"" + moduleName + "\" was overridden by a module with the same name at \"" + (path.join('.')) + "\"")
          );
        }
      }
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var type = action.root ? key : namespace + key;
    var handler = action.handler || action;
    registerAction(store, type, handler, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext (store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (( true) && !store._actions[type]) {
          console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (( true) && !store._mutations[type]) {
          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? function () { return store.getters; }
        : function () { return makeLocalGetters(store, namespace); }
    },
    state: {
      get: function () { return getNestedState(store.state, path); }
    }
  });

  return local
}

function makeLocalGetters (store, namespace) {
  if (!store._makeLocalGettersCache[namespace]) {
    var gettersProxy = {};
    var splitPos = namespace.length;
    Object.keys(store.getters).forEach(function (type) {
      // skip if the target getter is not match this namespace
      if (type.slice(0, splitPos) !== namespace) { return }

      // extract local getter type
      var localType = type.slice(splitPos);

      // Add a port to the getters proxy.
      // Define as getter property because
      // we do not want to evaluate the getters in this time.
      Object.defineProperty(gettersProxy, localType, {
        get: function () { return store.getters[type]; },
        enumerable: true
      });
    });
    store._makeLocalGettersCache[namespace] = gettersProxy;
  }

  return store._makeLocalGettersCache[namespace]
}

function registerMutation (store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler (payload) {
    handler.call(store, local.state, payload);
  });
}

function registerAction (store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler (payload) {
    var res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err
      })
    } else {
      return res
    }
  });
}

function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    if ((true)) {
      console.error(("[vuex] duplicate getter key: " + type));
    }
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  };
}

function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, function () {
    if ((true)) {
      assert(store._committing, "do not mutate vuex store state outside mutation handlers.");
    }
  }, { deep: true, sync: true });
}

function getNestedState (state, path) {
  return path.reduce(function (state, key) { return state[key]; }, state)
}

function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  if ((true)) {
    assert(typeof type === 'string', ("expects string as the type, but found " + (typeof type) + "."));
  }

  return { type: type, payload: payload, options: options }
}

function install (_Vue) {
  if (Vue && _Vue === Vue) {
    if ((true)) {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      );
    }
    return
  }
  Vue = _Vue;
  applyMixin(Vue);
}

/**
 * Reduce the code which written in Vue.js for getting the state.
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} states # Object's item can be a function which accept state and getters for param, you can do something for state and getters in it.
 * @param {Object}
 */
var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  if (( true) && !isValidMap(states)) {
    console.error('[vuex] mapState: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for committing the mutation
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} mutations # Object's item can be a function which accept `commit` function as the first param, it can accept anthor params. You can commit mutation and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  if (( true) && !isValidMap(mutations)) {
    console.error('[vuex] mapMutations: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedMutation () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // Get the commit method from store
      var commit = this.$store.commit;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
        if (!module) {
          return
        }
        commit = module.context.commit;
      }
      return typeof val === 'function'
        ? val.apply(this, [commit].concat(args))
        : commit.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for getting the getters
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} getters
 * @return {Object}
 */
var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  if (( true) && !isValidMap(getters)) {
    console.error('[vuex] mapGetters: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    // The namespace has been mutated by normalizeNamespace
    val = namespace + val;
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if (( true) && !(val in this.$store.getters)) {
        console.error(("[vuex] unknown getter: " + val));
        return
      }
      return this.$store.getters[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for dispatch the action
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} actions # Object's item can be a function which accept `dispatch` function as the first param, it can accept anthor params. You can dispatch action and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  if (( true) && !isValidMap(actions)) {
    console.error('[vuex] mapActions: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // get dispatch function from store
      var dispatch = this.$store.dispatch;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapActions', namespace);
        if (!module) {
          return
        }
        dispatch = module.context.dispatch;
      }
      return typeof val === 'function'
        ? val.apply(this, [dispatch].concat(args))
        : dispatch.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Rebinding namespace param for mapXXX function in special scoped, and return them by simple object
 * @param {String} namespace
 * @return {Object}
 */
var createNamespacedHelpers = function (namespace) { return ({
  mapState: mapState.bind(null, namespace),
  mapGetters: mapGetters.bind(null, namespace),
  mapMutations: mapMutations.bind(null, namespace),
  mapActions: mapActions.bind(null, namespace)
}); };

/**
 * Normalize the map
 * normalizeMap([1, 2, 3]) => [ { key: 1, val: 1 }, { key: 2, val: 2 }, { key: 3, val: 3 } ]
 * normalizeMap({a: 1, b: 2, c: 3}) => [ { key: 'a', val: 1 }, { key: 'b', val: 2 }, { key: 'c', val: 3 } ]
 * @param {Array|Object} map
 * @return {Object}
 */
function normalizeMap (map) {
  if (!isValidMap(map)) {
    return []
  }
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

/**
 * Validate whether given map is valid or not
 * @param {*} map
 * @return {Boolean}
 */
function isValidMap (map) {
  return Array.isArray(map) || isObject(map)
}

/**
 * Return a function expect two param contains namespace and map. it will normalize the namespace and then the param's function will handle the new namespace and the map.
 * @param {Function} fn
 * @return {Function}
 */
function normalizeNamespace (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  }
}

/**
 * Search a special module from store by namespace. if module not exist, print error message.
 * @param {Object} store
 * @param {String} helper
 * @param {String} namespace
 * @return {Object}
 */
function getModuleByNamespace (store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if (( true) && !module) {
    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
  }
  return module
}

var index = {
  Store: Store,
  install: install,
  version: '3.4.0',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions,
  createNamespacedHelpers: createNamespacedHelpers
};

/* harmony default export */ __webpack_exports__["default"] = (index);


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ 3)))

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map