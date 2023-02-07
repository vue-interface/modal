import { defineComponent as P, openBlock as r, createBlock as m, resolveDynamicComponent as w, mergeProps as k, withCtx as y, renderSlot as c, createTextVNode as B, toDisplayString as $, ref as S, resolveComponent as z, createElementBlock as d, normalizeClass as g, normalizeStyle as x, withKeys as O, createCommentVNode as u, createElementVNode as p, Suspense as j, Fragment as M, renderList as E, render as D, h } from "vue";
const A = {
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
      return this.size === void 0 ? !1 : !!this.size.match(new RegExp(`^${this.sizeableClassPrefix}`));
    },
    sizeableClass() {
      return this.size ? !this.sizeableClassPrefix || this.hasSizeablePrefix ? this.size : `${this.sizeableClassPrefix}-${this.size}` : "";
    }
  }
}, I = {
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
      return this.variant === void 0 ? !1 : !!this.variant.match(new RegExp(`^${this.variantClassPrefix}`));
    },
    variantClass() {
      return this.variant ? !this.variantClassPrefix || this.hasVariantPrefix ? this.variant : `${this.variantClassPrefix}-${this.variant}` : "";
    }
  }
}, _ = P({
  mixins: [A, I],
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
      return ["btn", this.variantClass, this.sizeableClass, this.active && "active", this.block && "btn-block", this.disabled && "disabled"];
    },
    component() {
      return this.tag ? this.tag : this.$attrs.href ? "a" : "button";
    },
    variantClassPrefix() {
      return (this.variantPrefix || this.componentPrefix) + (this.outline ? "-outline" : "");
    }
  }
}), F = (e, t) => {
  const s = e.__vccOpts || e;
  for (const [o, i] of t)
    s[o] = i;
  return s;
};
function H(e, t, s, o, i, n) {
  return r(), m(w(e.component), k(e.$attrs, {
    disabled: e.disabled,
    class: e.classes,
    role: "button"
  }), {
    default: y(() => [c(e.$slots, "default", {}, () => [B($(e.label), 1)])]),
    _: 3
  }, 16, ["disabled", "class"]);
}
const V = /* @__PURE__ */ F(_, [["render", H]]);
var v = {
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
}, T = function(e, t, s, o) {
  if (!v.hasOwnProperty(s))
    throw new Error("Cannot convert to " + s);
  if (!v[s].hasOwnProperty(t))
    throw new Error("Cannot convert from " + t + " to " + s);
  var i = v[s][t] * e;
  return o !== !1 ? (o = Math.pow(10, parseInt(o) || 5), Math.round(i * o) / o) : i;
};
const L = {
  props: {
    buttons: {
      type: [Boolean, Array],
      default: void 0,
      validate(e) {
        return Array.isArray(e) || !e;
      }
    },
    cancel: {
      type: Function,
      default(e, t, s, o) {
        o(!1);
      }
    },
    cancelButton: Object,
    confirm: {
      type: Function,
      default(e, t, s, o) {
        o(!0);
      }
    },
    confirmButton: Object,
    resolve: {
      type: Function,
      default(e, t, s, o) {
        o && s.close();
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
    close(e) {
      return new Promise((t) => {
        e = e || new Event("close", {
          cancelable: !0
        });
        const s = () => {
          this.isClosing = !0, this.isShowing = !1, this.transition(() => {
            this.isClosing = !1, this.isDisplaying = !1, this.$emit("closed", e), t(this);
          });
        };
        this.$emit("close", e, this.$refs.close, this, s), e.defaultPrevented || s();
      });
    },
    buttonAttributes(e) {
      return Object.assign({
        class: null,
        disabled: !1,
        size: "md",
        variant: "primary"
      }, Object.fromEntries(
        Object.entries(e).filter(([t]) => !t.match(/^on[A-Z]/))
      ));
    },
    open() {
      return new Promise((e) => {
        const t = new Event("close", {
          cancelable: !0
        }), s = () => {
          this.isDisplaying = !0, setTimeout(() => {
            this.isShowing = !0, this.transition(() => {
              this.$emit("opened"), e(this);
            });
          });
        };
        this.$emit("open", t, s), t.defaultPrevented || s();
      });
    },
    transition(e) {
      const s = getComputedStyle(this.$refs.dialog).transitionDuration.split(",").map((o) => {
        const i = o.trim().match(/^([\d.]+)(\w+)$/);
        if (!i)
          return 0;
        const n = parseFloat(i[1]), a = i[2];
        return T(n, a, "ms");
      }).sort((o, i) => o - i).shift();
      return setTimeout(e, s);
    },
    toggle() {
      this.isShowing ? this.close() : this.open();
    }
  },
  computed: {
    triggerableClasses() {
      return {
        show: this.isShowing
      };
    },
    computedCancelButton() {
      const e = {
        variant: "secondary",
        label: "Cancel",
        name: "confirm",
        onClick: (t) => {
          this.cancel(t, e, this, (...s) => {
            this.resolve(t, e, this, ...s);
          });
        }
      };
      return this.cancelButton || e;
    },
    computedConfirmButton() {
      const e = {
        variant: "primary",
        label: "Confirm",
        name: "confirm",
        onClick: (t) => {
          this.confirm(t, e, this, (...s) => {
            this.resolve(t, e, this, ...s);
          });
        }
      };
      return this.confirmButton || e;
    },
    currentButtons() {
      if (Array.isArray(this.buttons))
        return S(this.buttons).value.map((e) => {
          const t = e.onClick || (() => {
          });
          return Object.assign(e, {
            onClick: (s) => t(s, e, this, (...o) => this.resolve(s, e, this, ...o))
          });
        });
      if (this.type === "alert")
        return [this.computedConfirmButton];
      if (this.type === "confirm")
        return [
          this.computedConfirmButton,
          this.computedCancelButton
        ];
    }
  },
  watch: {
    isShowing(e) {
      e && this.focus();
    },
    show(e) {
      e && this.open();
    }
  },
  mounted() {
    this.show && this.open();
  },
  data() {
    return {
      isClosing: !1,
      isShowing: !1,
      isDisplaying: !1
    };
  }
}, N = P({
  name: "Modal",
  components: {
    Btn: V
  },
  mixins: [
    L
  ],
  beforeRouteLeave() {
    this.close();
  },
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
    indicator: {
      type: Object,
      default: void 0
    },
    title: {
      type: String,
      default: void 0
    },
    type: {
      type: [Boolean, String],
      default: !1,
      validate(e) {
        return ["alert", "confirm"].indexOf(e) !== -1;
      }
    }
  },
  watch: {
    isShowing(e) {
      var t;
      (t = document.querySelector("body")) == null || t.classList[e ? "add" : "remove"]("modal-open");
    }
  }
});
const R = (e, t) => {
  const s = e.__vccOpts || e;
  for (const [o, i] of t)
    s[o] = i;
  return s;
}, K = { class: "modal-content" }, q = { class: "modal-header" }, Z = {
  key: 0,
  class: "modal-title"
}, G = ["disabled"], J = /* @__PURE__ */ p("span", { "aria-hidden": "true" }, "\xD7", -1), Q = [
  J
], W = { class: "modal-body" }, X = {
  key: 0,
  ref: "footer",
  class: "modal-footer"
}, Y = { class: "modal-footer-buttons" };
function U(e, t, s, o, i, n) {
  const a = z("btn");
  return r(), d("div", {
    class: g(["modal fade", { ...e.triggerableClasses }]),
    style: x({ display: e.isDisplaying ? "block" : "none" }),
    tabindex: "-1",
    onKeydown: t[2] || (t[2] = O((...l) => e.close && e.close(...l), ["esc"]))
  }, [
    c(e.$slots, "backdrop", {}, () => [
      e.backdrop && e.isDisplaying ? (r(), d("div", {
        key: 0,
        ref: "backdrop",
        class: g(["modal-backdrop fade", { show: e.isShowing }]),
        onClick: t[0] || (t[0] = (l) => e.closeable && e.close)
      }, null, 2)) : u("", !0)
    ]),
    p("div", {
      ref: "dialog",
      class: g(["modal-dialog", { "modal-dialog-centered": e.center }])
    }, [
      p("div", K, [
        c(e.$slots, "header", {}, () => [
          p("div", q, [
            c(e.$slots, "title", {}, () => [
              e.title ? (r(), d("h3", Z, $(e.title), 1)) : u("", !0)
            ]),
            c(e.$slots, "close-button", {}, () => [
              e.closeable ? (r(), d("button", {
                key: 0,
                ref: "close",
                type: "button",
                class: "close",
                "data-dismiss": "modal",
                "aria-label": "Close",
                disabled: e.isClosing,
                onClick: t[1] || (t[1] = (...l) => e.close && e.close(...l))
              }, Q, 8, G)) : u("", !0)
            ])
          ])
        ]),
        c(e.$slots, "body", {}, () => [
          (r(), m(j, null, {
            fallback: y(() => [
              (r(), m(w(e.indicator)))
            ]),
            default: y(() => [
              p("div", W, [
                c(e.$slots, "default", { ref: "content" })
              ])
            ]),
            _: 3
          }))
        ]),
        e.footer ? c(e.$slots, "footer", {
          key: 0,
          close: e.close
        }, () => [
          e.currentButtons.length ? (r(), d("div", X, [
            p("div", Y, [
              e.currentButtons.length ? (r(!0), d(M, { key: 0 }, E(e.currentButtons, (l, f) => (r(), m(a, k({
                key: `btn-${f}`
              }, l), null, 16))), 128)) : u("", !0)
            ])
          ], 512)) : u("", !0)
        ]) : u("", !0)
      ])
    ], 2)
  ], 38);
}
const C = /* @__PURE__ */ R(N, [["render", U]]);
class ee {
  constructor(t, s) {
    this.app = t, this.props = s;
  }
  mount(t) {
    t.appContext = this.app._context;
    const s = document.createElement("div");
    D(h(t), s), document.body.append(s);
  }
  register(t, s) {
    Object.defineProperty(this, t, {
      value: (o, i, n) => {
        const a = new Promise((l, f) => {
          this.mount(s({
            title: o,
            props: Object.assign({}, this.props, n),
            resolve: (b) => (l(b), a),
            reject: (b) => (f(b), a),
            promise: () => a,
            content: typeof i == "string" ? h("div", i) : i(this.app, n)
          }));
        });
        return a;
      }
    });
  }
}
const se = (e, t = {}) => {
  const s = new ee(e, t);
  s.register("alert", ({ title: o, content: i, props: n }) => h(C, Object.assign({
    title: o,
    show: !0,
    type: "alert"
  }, n), {
    default: () => h(i, Object.assign({
      ref: "content"
    }))
  })), s.register("confirm", ({ title: o, content: i, props: n }) => h(C, Object.assign({
    title: o,
    show: !0,
    type: "confirm"
  }, n), {
    default: () => h(i, Object.assign({
      ref: "content"
    }))
  })), e.provide("modal", s), e.config.globalProperties.$modal = s;
};
export {
  C as Modal,
  ee as ModalFactory,
  se as ModalPlugin
};
