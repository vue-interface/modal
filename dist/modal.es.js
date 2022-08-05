/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var __assign = function() {
  __assign = Object.assign || function __assign2(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
function lowerCase(str) {
  return str.toLowerCase();
}
var DEFAULT_SPLIT_REGEXP = [/([a-z0-9])([A-Z])/g, /([A-Z])([A-Z][a-z])/g];
var DEFAULT_STRIP_REGEXP = /[^A-Z0-9]+/gi;
function noCase(input, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.splitRegexp, splitRegexp = _a === void 0 ? DEFAULT_SPLIT_REGEXP : _a, _b = options.stripRegexp, stripRegexp = _b === void 0 ? DEFAULT_STRIP_REGEXP : _b, _c = options.transform, transform = _c === void 0 ? lowerCase : _c, _d = options.delimiter, delimiter = _d === void 0 ? " " : _d;
  var result = replace(replace(input, splitRegexp, "$1\0$2"), stripRegexp, "\0");
  var start = 0;
  var end = result.length;
  while (result.charAt(start) === "\0")
    start++;
  while (result.charAt(end - 1) === "\0")
    end--;
  return result.slice(start, end).split("\0").map(transform).join(delimiter);
}
function replace(input, re, value) {
  if (re instanceof RegExp)
    return input.replace(re, value);
  return re.reduce(function(input2, re2) {
    return input2.replace(re2, value);
  }, input);
}
function dotCase(input, options) {
  if (options === void 0) {
    options = {};
  }
  return noCase(input, __assign({
    delimiter: "."
  }, options));
}
function paramCase(input, options) {
  if (options === void 0) {
    options = {};
  }
  return dotCase(input, __assign({
    delimiter: "-"
  }, options));
}
var Sizeable = {
  props: {
    size: String,
    sizePrefix: {
      type: String,
      default() {
        return this.$options.name;
      }
    }
  },
  computed: {
    sizeableClassPrefix() {
      return this.sizePrefix && paramCase(this.sizePrefix);
    },
    sizeableClass() {
      if (!this.size || !this.sizeableClassPrefix) {
        return "";
      }
      return `${this.sizeableClassPrefix}-${this.size}`;
    }
  }
};
var Variant = {
  props: {
    variant: String,
    variantPrefix: {
      type: String,
      default() {
        return this.$options.name && this.$options.name.toLowerCase();
      }
    }
  },
  computed: {
    variantClassPrefix() {
      return this.variantPrefix;
    },
    variantClass() {
      if (!this.variant || !this.variantClassPrefix) {
        return "";
      }
      return `${this.variantClassPrefix}-${this.variant}`;
    }
  }
};
var render$1 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(_vm.component, { tag: "component", class: _vm.classes, attrs: { "disabled": _vm.disabled, "role": "button" }, on: { "click": function($event) {
    !_vm.disabled && _vm.$emit("click", $event);
  } } }, [_vm._t("default", function() {
    return [_vm._v(_vm._s(_vm.label))];
  })], 2);
};
var staticRenderFns$1 = [];
function normalizeComponent(scriptExports, render2, staticRenderFns2, functionalTemplate, injectStyles, scopeId, moduleIdentifier, shadowMode) {
  var options = typeof scriptExports === "function" ? scriptExports.options : scriptExports;
  if (render2) {
    options.render = render2;
    options.staticRenderFns = staticRenderFns2;
    options._compiled = true;
  }
  if (functionalTemplate) {
    options.functional = true;
  }
  if (scopeId) {
    options._scopeId = "data-v-" + scopeId;
  }
  var hook;
  if (moduleIdentifier) {
    hook = function(context) {
      context = context || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext;
      if (!context && typeof __VUE_SSR_CONTEXT__ !== "undefined") {
        context = __VUE_SSR_CONTEXT__;
      }
      if (injectStyles) {
        injectStyles.call(this, context);
      }
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier);
      }
    };
    options._ssrRegister = hook;
  } else if (injectStyles) {
    hook = shadowMode ? function() {
      injectStyles.call(this, (options.functional ? this.parent : this).$root.$options.shadowRoot);
    } : injectStyles;
  }
  if (hook) {
    if (options.functional) {
      options._injectStyles = hook;
      var originalRender = options.render;
      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context);
        return originalRender(h, context);
      };
    } else {
      var existing = options.beforeCreate;
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
    }
  }
  return {
    exports: scriptExports,
    options
  };
}
const __vue2_script$1 = {
  name: "Btn",
  mixins: [
    Sizeable,
    Variant
  ],
  props: {
    active: Boolean,
    block: Boolean,
    disabled: Boolean,
    label: String,
    outline: Boolean,
    tag: String,
    variant: {
      type: String,
      default: "primary"
    }
  },
  computed: {
    classes() {
      return [
        "btn",
        this.variantClass,
        this.sizeableClass,
        this.active && "active",
        this.block && "btn-block",
        this.disabled && "disabled"
      ];
    },
    component() {
      if (this.tag) {
        return this.tag;
      }
      if (this.$attrs.to) {
        return "router-link";
      }
      if (this.$attrs.href) {
        return "a";
      }
      return "button";
    },
    variantClassPrefix() {
      return this.variantPrefix + (this.outline ? "-outline" : "");
    }
  }
};
const __cssModules$1 = {};
var __component__$1 = /* @__PURE__ */ normalizeComponent(__vue2_script$1, render$1, staticRenderFns$1, false, __vue2_injectStyles$1, null, null, null);
function __vue2_injectStyles$1(context) {
  for (let o in __cssModules$1) {
    this[o] = __cssModules$1[o];
  }
}
var Btn = /* @__PURE__ */ function() {
  return __component__$1.exports;
}();
var conversions = {
  "px": {
    "px": 1,
    "cm": 96 / 2.54,
    "mm": 96 / 25.4,
    "in": 96,
    "pt": 96 / 72,
    "pc": 16
  },
  "cm": {
    "px": 2.54 / 96,
    "cm": 1,
    "mm": 0.1,
    "in": 2.54,
    "pt": 2.54 / 72,
    "pc": 2.54 / 6
  },
  "mm": {
    "px": 25.4 / 96,
    "cm": 10,
    "mm": 1,
    "in": 25.4,
    "pt": 25.4 / 72,
    "pc": 25.4 / 6
  },
  "in": {
    "px": 1 / 96,
    "cm": 1 / 2.54,
    "mm": 1 / 25.4,
    "in": 1,
    "pt": 1 / 72,
    "pc": 1 / 6
  },
  "pt": {
    "px": 0.75,
    "cm": 72 / 2.54,
    "mm": 72 / 25.4,
    "in": 72,
    "pt": 1,
    "pc": 12
  },
  "pc": {
    "px": 6 / 96,
    "cm": 6 / 2.54,
    "mm": 6 / 25.4,
    "in": 6,
    "pt": 6 / 72,
    "pc": 1
  },
  "deg": {
    "deg": 1,
    "grad": 0.9,
    "rad": 180 / Math.PI,
    "turn": 360
  },
  "grad": {
    "deg": 400 / 360,
    "grad": 1,
    "rad": 200 / Math.PI,
    "turn": 400
  },
  "rad": {
    "deg": Math.PI / 180,
    "grad": Math.PI / 200,
    "rad": 1,
    "turn": Math.PI * 2
  },
  "turn": {
    "deg": 1 / 360,
    "grad": 1 / 400,
    "rad": 0.5 / Math.PI,
    "turn": 1
  },
  "s": {
    "s": 1,
    "ms": 1 / 1e3
  },
  "ms": {
    "s": 1e3,
    "ms": 1
  },
  "Hz": {
    "Hz": 1,
    "kHz": 1e3
  },
  "kHz": {
    "Hz": 1 / 1e3,
    "kHz": 1
  },
  "dpi": {
    "dpi": 1,
    "dpcm": 1 / 2.54,
    "dppx": 1 / 96
  },
  "dpcm": {
    "dpi": 2.54,
    "dpcm": 1,
    "dppx": 2.54 / 96
  },
  "dppx": {
    "dpi": 96,
    "dpcm": 96 / 2.54,
    "dppx": 1
  }
};
var cssUnitConverter = function(value, sourceUnit, targetUnit, precision) {
  if (!conversions.hasOwnProperty(targetUnit))
    throw new Error("Cannot convert to " + targetUnit);
  if (!conversions[targetUnit].hasOwnProperty(sourceUnit))
    throw new Error("Cannot convert from " + sourceUnit + " to " + targetUnit);
  var converted = conversions[targetUnit][sourceUnit] * value;
  if (precision !== false) {
    precision = Math.pow(10, parseInt(precision) || 5);
    return Math.round(converted * precision) / precision;
  }
  return converted;
};
var Triggerable = {
  props: {
    buttons: {
      type: [Boolean, Array],
      default: void 0,
      validate(value) {
        return Array.isArray(value) || !value;
      }
    },
    cancel: {
      type: Function,
      default(e, button, modal, resolve) {
        resolve(false);
      }
    },
    cancelButton: {
      type: Object,
      default() {
        return {
          variant: "secondary",
          label: "Cancel",
          name: "confirm",
          onClick: (e, button, modal) => {
            this.cancel(e, button, modal, (...args) => {
              this.resolve(e, button, modal, ...args);
            });
          }
        };
      }
    },
    confirm: {
      type: Function,
      default(e, button, modal, resolve) {
        resolve(true);
      }
    },
    confirmButton: {
      type: Object,
      default() {
        return {
          variant: "primary",
          label: "Confirm",
          name: "confirm",
          onClick: (e, button, modal) => {
            this.confirm(e, button, modal, (...args) => {
              this.resolve(e, button, modal, ...args);
            });
          }
        };
      }
    },
    resolve: {
      type: Function,
      default(e, button, modal, status) {
      }
    },
    show: {
      type: Boolean,
      defaut: false
    }
  },
  methods: {
    focus() {
      this.$el.focus();
    },
    close(e) {
      return new Promise((resolve) => {
        e = e || new Event("close", {
          cancelable: true
        });
        const handler = () => {
          this.isClosing = true;
          this.isShowing = false;
          this.transition(() => {
            this.isClosing = false;
            this.isDisplaying = false;
            this.$emit("closed", e);
            resolve(this);
          });
        };
        this.$emit("close", e, this.$refs.close, this, handler);
        if (!e.defaultPrevented) {
          handler();
        }
      });
    },
    buttonAttributes(button) {
      return Object.assign({
        class: null,
        disabled: false,
        size: "md",
        variant: "primary"
      }, Object.fromEntries(Object.entries(button).filter(([key, value]) => {
        return !key.match(/^on[A-Z]/);
      })));
    },
    buttonListeners(button, i) {
      return Object.fromEntries(Object.entries(button).map(([key, value]) => {
        return [key, value, key.match(/^on([A-Z]\w+)/)];
      }).map(([key, value, matches]) => {
        return [matches ? String(matches[1]).toLowerCase() : "click", (e) => {
          const attributes = this.currentButtons[i].attributes;
          this.$emit(button.name || `btn-${i}`, e, attributes, this, (...args) => {
            return this.resolve(e, attributes, this, ...args);
          });
          if (!e.defaultPrevented) {
            if (typeof value === "function") {
              value.call(this, e, attributes, this, (...args) => {
                return this.resolve(e, attributes, this, ...args);
              });
            } else {
              this.resolve(e, attributes, this);
            }
          }
        }];
      }));
    },
    initializeButtons() {
      this.currentButtons = [];
      if (this.buttons === false) {
        return false;
      }
      if (Array.isArray(this.buttons)) {
        this.buttons.forEach((button, i) => {
          this.currentButtons.push({
            attributes: this.buttonAttributes(button),
            listeners: this.buttonListeners(button, i)
          });
        });
      } else if (this.type === "alert") {
        this.currentButtons.push({
          attributes: this.buttonAttributes(this.confirmButton),
          listeners: this.buttonListeners(this.confirmButton, 0)
        });
      } else if (this.type === "confirm") {
        this.currentButtons.push({
          attributes: this.buttonAttributes(this.confirmButton),
          listeners: this.buttonListeners(this.confirmButton, 0)
        });
        this.currentButtons.push({
          attributes: this.buttonAttributes(this.cancelButton),
          listeners: this.buttonListeners(this.cancelButton, 1)
        });
      }
    },
    open() {
      return new Promise((resolve) => {
        const e = new Event("close", {
          cancelable: true
        });
        const handler = () => {
          this.isDisplaying = true;
          setTimeout(() => {
            this.isShowing = true;
            this.transition(() => {
              this.$emit("opened");
              resolve(this);
            });
          });
        };
        this.$emit("open", e, handler);
        if (!e.defaultPrevented) {
          handler();
        }
      });
    },
    transition(fn) {
      const styles = getComputedStyle(this.$refs.dialog);
      const value = styles.transitionDuration.split(",").map((value2) => {
        const [parsed, number, unit] = value2.trim().match(/^([\d.]+)(\w+)$/);
        return cssUnitConverter(parseFloat(number), unit, "ms");
      }).sort((a, b) => {
        return a - b;
      }).shift();
      return setTimeout(fn, value);
    },
    toggle() {
      if (!this.isShowing) {
        this.open();
      } else {
        this.close();
      }
    }
  },
  computed: {
    customButtons() {
      return Object.entries(this.currentButtons || {}).filter(([key, value]) => {
        return !!key.match(/^btn-\d+$/);
      }).map(([key, value]) => value);
    },
    triggerableClasses() {
      return {
        show: this.isShowing
      };
    }
  },
  watch: {
    isShowing(value) {
      if (value) {
        this.focus();
      }
    },
    show(value) {
      if (value) {
        this.open();
      }
    }
  },
  created() {
    this.$on("open", () => this.initializeButtons());
  },
  mounted() {
    if (this.show) {
      this.open();
    }
  },
  data() {
    return {
      currentButtons: [],
      isClosing: false,
      isShowing: false,
      isDisplaying: false
    };
  }
};
var render = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "modal fade", class: Object.assign({}, _vm.triggerableClasses), style: { display: _vm.isDisplaying ? "block" : "none" }, attrs: { "tabindex": "-1" }, on: { "keydown": function($event) {
    if (!$event.type.indexOf("key") && _vm._k($event.keyCode, "esc", 27, $event.key, ["Esc", "Escape"])) {
      return null;
    }
    return _vm.close.apply(null, arguments);
  } } }, [_vm._t("backdrop", function() {
    return [_vm.backdrop && _vm.isDisplaying ? _c("div", { ref: "backdrop", staticClass: "modal-backdrop fade", class: { "show": _vm.isShowing }, on: { "click": function($event) {
      _vm.closeable && _vm.close;
    } } }) : _vm._e()];
  }), _c("div", { ref: "dialog", staticClass: "modal-dialog", class: { "modal-dialog-centered": _vm.center } }, [_c("div", { ref: "content", staticClass: "modal-content" }, [_vm._t("header", function() {
    return [_c("div", { staticClass: "modal-header" }, [_vm._t("title", function() {
      return [_vm.title ? _c("h3", { staticClass: "modal-title" }, [_vm._v(" " + _vm._s(_vm.title) + " ")]) : _vm._e()];
    }), _vm._t("close-button", function() {
      return [_vm.closeable ? _c("button", { ref: "close", staticClass: "close", attrs: { "type": "button", "data-dismiss": "modal", "aria-label": "Close", "disabled": _vm.isClosing }, on: { "click": _vm.close } }, [_c("span", { attrs: { "aria-hidden": "true" } }, [_vm._v("\xD7")])]) : _vm._e()];
    })], 2)];
  }), _vm._t("body", function() {
    return [_c("div", { staticClass: "modal-body" }, [_vm._t("default")], 2)];
  }), _vm.footer ? _vm._t("footer", function() {
    return [_vm.currentButtons.length ? _c("div", { ref: "footer", staticClass: "modal-footer" }, [_c("div", { staticClass: "modal-footer-buttons" }, [_vm.currentButtons.length ? _vm._l(_vm.currentButtons, function(button, i) {
      return _c("btn", _vm._g(_vm._b({ key: "btn-" + i }, "btn", button.attributes, false), button.listeners));
    }) : _vm._e()], 2)]) : _vm._e()];
  }, { "close": _vm.close }) : _vm._e()], 2)])], 2);
};
var staticRenderFns = [];
var Modal_vue_vue_type_style_index_0_lang = "";
const __vue2_script = {
  name: "Modal",
  components: {
    Btn
  },
  mixins: [
    Triggerable
  ],
  props: {
    backdrop: {
      type: Boolean,
      default: true
    },
    center: Boolean,
    closeable: {
      type: Boolean,
      default: true
    },
    footer: {
      type: Boolean,
      default: true
    },
    title: String,
    type: {
      type: [Boolean, String],
      default: false,
      validate(value) {
        return ["alert", "confirm"].indexOf(value) !== -1;
      }
    }
  },
  watch: {
    isShowing(value) {
      document.querySelector("body").classList[value ? "add" : "remove"]("modal-open");
    }
  },
  beforeRouteLeave() {
    this.close();
  }
};
const __cssModules = {};
var __component__ = /* @__PURE__ */ normalizeComponent(__vue2_script, render, staticRenderFns, false, __vue2_injectStyles, null, null, null);
function __vue2_injectStyles(context) {
  for (let o in __cssModules) {
    this[o] = __cssModules[o];
  }
}
var Modal = /* @__PURE__ */ function() {
  return __component__.exports;
}();
class ModalFactory {
  constructor(vue) {
    this.$vue = vue;
  }
  register(type, callback) {
    return this[type] = (title, content, props = {}) => {
      const ModalWrapper = this.$vue.extend(Modal);
      const promise = new Promise(function(resolve, reject) {
        new ModalWrapper(Object.assign({
          el: document.body.appendChild(document.createElement("div")),
          render(h) {
            return callback((content2, ...args) => {
              if (typeof content2 === "string") {
                return content2;
              }
              if (typeof content2 === "function") {
                return [].concat(content2(h, this));
              }
              return h(content2, ...args);
            }, {
              promise: () => promise,
              resolve: (value) => {
                resolve(value);
                return promise;
              },
              reject: (value) => {
                reject(value);
                return promise;
              }
            }, title, content, Object.assign({}, props));
          }
        }));
      });
      return promise;
    };
  }
}
var isMergeableObject = function isMergeableObject2(value) {
  return isNonNullObject(value) && !isSpecial(value);
};
function isNonNullObject(value) {
  return !!value && typeof value === "object";
}
function isSpecial(value) {
  var stringValue = Object.prototype.toString.call(value);
  return stringValue === "[object RegExp]" || stringValue === "[object Date]" || isReactElement(value);
}
var canUseSymbol = typeof Symbol === "function" && Symbol.for;
var REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for("react.element") : 60103;
function isReactElement(value) {
  return value.$$typeof === REACT_ELEMENT_TYPE;
}
function emptyTarget(val) {
  return Array.isArray(val) ? [] : {};
}
function cloneUnlessOtherwiseSpecified(value, options) {
  return options.clone !== false && options.isMergeableObject(value) ? deepmerge(emptyTarget(value), value, options) : value;
}
function defaultArrayMerge(target, source, options) {
  return target.concat(source).map(function(element) {
    return cloneUnlessOtherwiseSpecified(element, options);
  });
}
function getMergeFunction(key, options) {
  if (!options.customMerge) {
    return deepmerge;
  }
  var customMerge = options.customMerge(key);
  return typeof customMerge === "function" ? customMerge : deepmerge;
}
function getEnumerableOwnPropertySymbols(target) {
  return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(target).filter(function(symbol) {
    return target.propertyIsEnumerable(symbol);
  }) : [];
}
function getKeys(target) {
  return Object.keys(target).concat(getEnumerableOwnPropertySymbols(target));
}
function propertyIsOnObject(object, property) {
  try {
    return property in object;
  } catch (_) {
    return false;
  }
}
function propertyIsUnsafe(target, key) {
  return propertyIsOnObject(target, key) && !(Object.hasOwnProperty.call(target, key) && Object.propertyIsEnumerable.call(target, key));
}
function mergeObject(target, source, options) {
  var destination = {};
  if (options.isMergeableObject(target)) {
    getKeys(target).forEach(function(key) {
      destination[key] = cloneUnlessOtherwiseSpecified(target[key], options);
    });
  }
  getKeys(source).forEach(function(key) {
    if (propertyIsUnsafe(target, key)) {
      return;
    }
    if (propertyIsOnObject(target, key) && options.isMergeableObject(source[key])) {
      destination[key] = getMergeFunction(key, options)(target[key], source[key], options);
    } else {
      destination[key] = cloneUnlessOtherwiseSpecified(source[key], options);
    }
  });
  return destination;
}
function deepmerge(target, source, options) {
  options = options || {};
  options.arrayMerge = options.arrayMerge || defaultArrayMerge;
  options.isMergeableObject = options.isMergeableObject || isMergeableObject;
  options.cloneUnlessOtherwiseSpecified = cloneUnlessOtherwiseSpecified;
  var sourceIsArray = Array.isArray(source);
  var targetIsArray = Array.isArray(target);
  var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;
  if (!sourceAndTargetTypesMatch) {
    return cloneUnlessOtherwiseSpecified(source, options);
  } else if (sourceIsArray) {
    return options.arrayMerge(target, source, options);
  } else {
    return mergeObject(target, source, options);
  }
}
deepmerge.all = function deepmergeAll(array, options) {
  if (!Array.isArray(array)) {
    throw new Error("first argument should be an array");
  }
  return array.reduce(function(prev, next) {
    return deepmerge(prev, next, options);
  }, {});
};
var deepmerge_1 = deepmerge;
var cjs = deepmerge_1;
var ModalPlugin = (Vue) => {
  Vue.prototype.$modal = new ModalFactory(Vue);
  Vue.prototype.$modal.register("alert", (createElement, {
    resolve
  }, title, content, props) => {
    return createElement(Modal, {
      props: Object.assign({
        resolve(e, button, modal, ...args) {
          return resolve(...args).then(() => this.close());
        },
        show: true,
        title,
        type: "alert"
      }, props)
    }, createElement(content, {
      ref: "content"
    }));
  });
  Vue.prototype.$modal.register("confirm", (createElement, {
    resolve
  }, title, content, props) => {
    return createElement(Modal, cjs({
      props: Object.assign({
        resolve(e, button, modal, ...args) {
          return resolve(...args).then(() => this.close());
        },
        show: true,
        title,
        type: "confirm"
      }, props)
    }, props), createElement(content, {
      ref: "content"
    }));
  });
};
export { Modal, ModalFactory, ModalPlugin };
