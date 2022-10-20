import { openBlock as u, createBlock as y, resolveDynamicComponent as k, mergeProps as C, withCtx as S, renderSlot as c, createTextVNode as z, toDisplayString as B, resolveComponent as x, createElementBlock as h, normalizeClass as p, normalizeStyle as _, withKeys as O, createCommentVNode as f, createElementVNode as m, Fragment as A, renderList as M, toHandlers as j, createApp as E, h as g } from "vue";
const L = {
  props: {
    componentPrefix: String,
    size: String,
    sizePrefix: String
  },
  computed: {
    sizeableClassPrefix() {
      return this.sizePrefix || this.componentPrefix;
    },
    hasSizeablePrefix() {
      return this.size && !!this.size.match(
        new RegExp(`^${this.sizeableClassPrefix}`)
      );
    },
    sizeableClass() {
      return this.size ? !this.sizeableClassPrefix || this.hasSizeablePrefix ? this.size : `${this.sizeableClassPrefix}-${this.size}` : "";
    }
  }
}, D = {
  props: {
    componentPrefix: String,
    variant: String,
    variantPrefix: String
  },
  computed: {
    variantClassPrefix() {
      return this.variantPrefix || this.componentPrefix;
    },
    hasVariantPrefix() {
      return this.variant && !!this.variant.match(
        new RegExp(`^${this.variantClassPrefix}`)
      );
    },
    variantClass() {
      return this.variant ? !this.variantClassPrefix || this.hasVariantPrefix ? this.variant : `${this.variantClassPrefix}-${this.variant}` : "";
    }
  }
}, H = {
  name: "Btn",
  mixins: [
    L,
    D
  ],
  props: {
    active: Boolean,
    block: Boolean,
    componentPrefix: {
      type: String,
      default: "btn"
    },
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
      return this.tag ? this.tag : this.$attrs.href ? "a" : "button";
    },
    variantClassPrefix() {
      return (this.variantPrefix || this.componentPrefix) + (this.outline ? "-outline" : "");
    }
  }
}, P = (t, s) => {
  const e = t.__vccOpts || t;
  for (const [i, n] of s)
    e[i] = n;
  return e;
};
function I(t, s, e, i, n, r) {
  return u(), y(k(r.component), C(t.$attrs, {
    disabled: e.disabled,
    class: r.classes,
    role: "button"
  }), {
    default: S(() => [
      c(t.$slots, "default", {}, () => [
        z(B(e.label), 1)
      ])
    ]),
    _: 3
  }, 16, ["disabled", "class"]);
}
const F = /* @__PURE__ */ P(H, [["render", I]]);
var b = {
  px: {
    px: 1,
    cm: 96 / 2.54,
    mm: 96 / 25.4,
    in: 96,
    pt: 96 / 72,
    pc: 16
  },
  cm: {
    px: 2.54 / 96,
    cm: 1,
    mm: 0.1,
    in: 2.54,
    pt: 2.54 / 72,
    pc: 2.54 / 6
  },
  mm: {
    px: 25.4 / 96,
    cm: 10,
    mm: 1,
    in: 25.4,
    pt: 25.4 / 72,
    pc: 25.4 / 6
  },
  in: {
    px: 1 / 96,
    cm: 1 / 2.54,
    mm: 1 / 25.4,
    in: 1,
    pt: 1 / 72,
    pc: 1 / 6
  },
  pt: {
    px: 0.75,
    cm: 72 / 2.54,
    mm: 72 / 25.4,
    in: 72,
    pt: 1,
    pc: 12
  },
  pc: {
    px: 6 / 96,
    cm: 6 / 2.54,
    mm: 6 / 25.4,
    in: 6,
    pt: 6 / 72,
    pc: 1
  },
  deg: {
    deg: 1,
    grad: 0.9,
    rad: 180 / Math.PI,
    turn: 360
  },
  grad: {
    deg: 400 / 360,
    grad: 1,
    rad: 200 / Math.PI,
    turn: 400
  },
  rad: {
    deg: Math.PI / 180,
    grad: Math.PI / 200,
    rad: 1,
    turn: Math.PI * 2
  },
  turn: {
    deg: 1 / 360,
    grad: 1 / 400,
    rad: 0.5 / Math.PI,
    turn: 1
  },
  s: {
    s: 1,
    ms: 1 / 1e3
  },
  ms: {
    s: 1e3,
    ms: 1
  },
  Hz: {
    Hz: 1,
    kHz: 1e3
  },
  kHz: {
    Hz: 1 / 1e3,
    kHz: 1
  },
  dpi: {
    dpi: 1,
    dpcm: 1 / 2.54,
    dppx: 1 / 96
  },
  dpcm: {
    dpi: 2.54,
    dpcm: 1,
    dppx: 2.54 / 96
  },
  dppx: {
    dpi: 96,
    dpcm: 96 / 2.54,
    dppx: 1
  }
}, V = function(t, s, e, i) {
  if (!b.hasOwnProperty(e))
    throw new Error("Cannot convert to " + e);
  if (!b[e].hasOwnProperty(s))
    throw new Error("Cannot convert from " + s + " to " + e);
  var n = b[e][s] * t;
  return i !== !1 ? (i = Math.pow(10, parseInt(i) || 5), Math.round(n * i) / i) : n;
};
const T = {
  props: {
    buttons: {
      type: [Boolean, Array],
      default: void 0,
      validate(t) {
        return Array.isArray(t) || !t;
      }
    },
    cancel: {
      type: Function,
      default(t, s, e, i) {
        i(!1);
      }
    },
    cancelButton: Object,
    confirm: {
      type: Function,
      default(t, s, e, i) {
        i(!0);
      }
    },
    confirmButton: Object,
    resolve: {
      type: Function,
      default(t, s, e, i) {
      }
    },
    show: {
      type: Boolean,
      defaut: !1
    }
  },
  methods: {
    focus() {
      this.$el.focus();
    },
    close(t) {
      return new Promise((s) => {
        t = t || new Event("close", {
          cancelable: !0
        });
        const e = () => {
          this.isClosing = !0, this.isShowing = !1, this.transition(() => {
            this.isClosing = !1, this.isDisplaying = !1, this.$emit("closed", t), s(this);
          });
        };
        this.$emit("close", t, this.$refs.close, this, e), t.defaultPrevented || e();
      });
    },
    buttonAttributes(t) {
      return Object.assign({
        class: null,
        disabled: !1,
        size: "md",
        variant: "primary"
      }, Object.fromEntries(Object.entries(t).filter(([s, e]) => !s.match(/^on[A-Z]/))));
    },
    buttonListeners(t, s) {
      return Object.fromEntries(Object.entries(t).map(([e, i]) => [e, i, e.match(/^on([A-Z]\w+)/)]).map(([e, i, n]) => [n ? String(n[1]).toLowerCase() : "click", (r) => {
        const o = this.currentButtons[s].attributes;
        this.$emit(t.name || `btn-${s}`, r, o, this, (...a) => this.resolve(r, o, this, ...a)), r.defaultPrevented || (typeof i == "function" ? i.call(this, r, o, this, (...a) => this.resolve(r, o, this, ...a)) : this.resolve(r, o, this));
      }]));
    },
    initializeButtons() {
      if (this.currentButtons = [], this.buttons === !1)
        return !1;
      Array.isArray(this.buttons) ? this.buttons.forEach((t, s) => {
        this.currentButtons.push({
          attributes: this.buttonAttributes(t),
          listeners: this.buttonListeners(t, s)
        });
      }) : this.type === "alert" ? this.currentButtons.push({
        attributes: this.buttonAttributes(this.evaluatedConfirmButton),
        listeners: this.buttonListeners(this.evaluatedConfirmButton, 0)
      }) : this.type === "confirm" && (this.currentButtons.push({
        attributes: this.buttonAttributes(this.evaluatedConfirmButton),
        listeners: this.buttonListeners(this.evaluatedConfirmButton, 0)
      }), this.currentButtons.push({
        attributes: this.buttonAttributes(this.evaluatedCancelButton),
        listeners: this.buttonListeners(this.evaluatedCancelButton, 1)
      }));
    },
    open() {
      return new Promise((t) => {
        const s = new Event("close", {
          cancelable: !0
        }), e = () => {
          this.isDisplaying = !0, setTimeout(() => {
            this.isShowing = !0, this.transition(() => {
              this.$emit("opened"), t(this);
            });
          });
        };
        this.$emit("open", s, e), this.initializeButtons(), s.defaultPrevented || e();
      });
    },
    transition(t) {
      const e = getComputedStyle(this.$refs.dialog).transitionDuration.split(",").map((i) => {
        const [n, r, o] = i.trim().match(/^([\d.]+)(\w+)$/);
        return V(parseFloat(r), o, "ms");
      }).sort((i, n) => i - n).shift();
      return setTimeout(t, e);
    },
    toggle() {
      this.isShowing ? this.close() : this.open();
    }
  },
  computed: {
    customButtons() {
      return Object.entries(this.currentButtons || {}).filter(([t, s]) => !!t.match(/^btn-\d+$/)).map(([t, s]) => s);
    },
    triggerableClasses() {
      return {
        show: this.isShowing
      };
    },
    evaluatedCancelButton() {
      return this.evaluatedCancelButton || {
        variant: "secondary",
        label: "Cancel",
        name: "confirm",
        onClick: (t, s, e) => {
          this.cancel(t, s, e, (...i) => {
            this.resolve(t, s, e, ...i);
          });
        }
      };
    },
    evaluatedConfirmButton() {
      return this.confirmButton || {
        variant: "primary",
        label: "Confirm",
        name: "confirm",
        onClick: (t, s, e) => {
          this.confirm(t, s, e, (...i) => {
            this.resolve(t, s, e, ...i);
          });
        }
      };
    }
  },
  watch: {
    isShowing(t) {
      t && this.focus();
    },
    show(t) {
      t && this.open();
    }
  },
  mounted() {
    this.show && this.open();
  },
  data() {
    return {
      currentButtons: [],
      isClosing: !1,
      isShowing: !1,
      isDisplaying: !1
    };
  }
};
const N = {
  name: "Modal",
  components: {
    Btn: F
  },
  mixins: [
    T
  ],
  props: {
    backdrop: {
      type: Boolean,
      default: !0
    },
    center: Boolean,
    closeable: {
      type: Boolean,
      default: !0
    },
    footer: {
      type: Boolean,
      default: !0
    },
    title: String,
    type: {
      type: [Boolean, String],
      default: !1,
      validate(t) {
        return ["alert", "confirm"].indexOf(t) !== -1;
      }
    }
  },
  watch: {
    isShowing(t) {
      document.querySelector("body").classList[t ? "add" : "remove"]("modal-open");
    }
  },
  beforeRouteLeave() {
    this.close();
  }
}, R = {
  ref: "content",
  class: "modal-content"
}, K = { class: "modal-header" }, Z = {
  key: 0,
  class: "modal-title"
}, q = ["disabled"], G = /* @__PURE__ */ m("span", { "aria-hidden": "true" }, "\xD7", -1), J = [
  G
], Q = { class: "modal-body" }, W = {
  key: 0,
  ref: "footer",
  class: "modal-footer"
}, X = { class: "modal-footer-buttons" };
function Y(t, s, e, i, n, r) {
  const o = x("btn");
  return u(), h("div", {
    class: p(["modal fade", { ...t.triggerableClasses }]),
    style: _({ display: t.isDisplaying ? "block" : "none" }),
    tabindex: "-1",
    onKeydown: s[2] || (s[2] = O((...a) => t.close && t.close(...a), ["esc"]))
  }, [
    c(t.$slots, "backdrop", {}, () => [
      e.backdrop && t.isDisplaying ? (u(), h("div", {
        key: 0,
        ref: "backdrop",
        class: p(["modal-backdrop fade", { show: t.isShowing }]),
        onClick: s[0] || (s[0] = (a) => e.closeable && t.close)
      }, null, 2)) : f("", !0)
    ]),
    m("div", {
      ref: "dialog",
      class: p(["modal-dialog", { "modal-dialog-centered": e.center }])
    }, [
      m("div", R, [
        c(t.$slots, "header", {}, () => [
          m("div", K, [
            c(t.$slots, "title", {}, () => [
              e.title ? (u(), h("h3", Z, B(e.title), 1)) : f("", !0)
            ]),
            c(t.$slots, "close-button", {}, () => [
              e.closeable ? (u(), h("button", {
                key: 0,
                ref: "close",
                type: "button",
                class: "close",
                "data-dismiss": "modal",
                "aria-label": "Close",
                disabled: t.isClosing,
                onClick: s[1] || (s[1] = (...a) => t.close && t.close(...a))
              }, J, 8, q)) : f("", !0)
            ])
          ])
        ]),
        c(t.$slots, "body", {}, () => [
          m("div", Q, [
            c(t.$slots, "default")
          ])
        ]),
        e.footer ? c(t.$slots, "footer", {
          key: 0,
          close: t.close
        }, () => [
          t.currentButtons.length ? (u(), h("div", W, [
            m("div", X, [
              t.currentButtons.length ? (u(!0), h(A, { key: 0 }, M(t.currentButtons, (a, d) => (u(), y(o, C({
                key: `btn-${d}`
              }, a.attributes, j(a.listeners)), null, 16))), 128)) : f("", !0)
            ])
          ], 512)) : f("", !0)
        ]) : f("", !0)
      ], 512)
    ], 2)
  ], 38);
}
const w = /* @__PURE__ */ P(N, [["render", Y]]);
class U {
  register(s, e) {
    return this[s] = (i, n, r = {}) => {
      const o = new Promise(function(a, d) {
        E({
          render() {
            return e((l, ...$) => typeof l == "string" ? l : typeof l == "function" ? [].concat(l(g, this)) : g(l, ...$), {
              promise: () => o,
              resolve: (l) => (a(l), o),
              reject: (l) => (d(l), o)
            }, i, n, Object.assign({}, r));
          }
        }).mount(document.body.appendChild(document.createElement("div")));
      });
      return o;
    };
  }
}
const v = new U();
v.register("alert", (t, {
  resolve: s
}, e, i, n) => t(w, Object.assign({
  resolve(r, o, a, ...d) {
    return s(...d).then(() => this.close());
  },
  show: !0,
  title: e,
  type: "alert"
}, n), () => t(i, {
  ref: "content"
})));
v.register("confirm", (t, {
  resolve: s
}, e, i, n) => t(w, Object.assign({
  resolve(r, o, a, ...d) {
    return s(...d).then(() => this.close());
  },
  show: !0,
  title: e,
  type: "confirm"
}, n), () => t(i, {
  ref: "content"
})));
const et = (t) => {
  t.config.globalProperties.$modal = v;
};
export {
  w as Modal,
  U as ModalFactory,
  et as ModalPlugin,
  v as factory
};
