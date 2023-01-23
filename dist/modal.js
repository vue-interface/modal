import { openBlock as l, createBlock as y, resolveDynamicComponent as $, mergeProps as C, withCtx as B, renderSlot as c, createTextVNode as k, toDisplayString as P, ref as S, defineComponent as z, resolveComponent as x, createElementBlock as d, normalizeClass as g, normalizeStyle as O, withKeys as M, createCommentVNode as u, createElementVNode as h, Fragment as _, renderList as j, render as E, h as m } from "vue";
const D = {
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
}, A = {
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
}, I = {
  name: "Btn",
  mixins: [
    D,
    A
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
}, w = (e, t) => {
  const s = e.__vccOpts || e;
  for (const [n, i] of t)
    s[n] = i;
  return s;
};
function F(e, t, s, n, i, r) {
  return l(), y($(r.component), C(e.$attrs, {
    disabled: s.disabled,
    class: r.classes,
    role: "button"
  }), {
    default: B(() => [
      c(e.$slots, "default", {}, () => [
        k(P(s.label), 1)
      ])
    ]),
    _: 3
  }, 16, ["disabled", "class"]);
}
const H = /* @__PURE__ */ w(I, [["render", F]]);
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
}, V = function(e, t, s, n) {
  if (!b.hasOwnProperty(s))
    throw new Error("Cannot convert to " + s);
  if (!b[s].hasOwnProperty(t))
    throw new Error("Cannot convert from " + t + " to " + s);
  var i = b[s][t] * e;
  return n !== !1 ? (n = Math.pow(10, parseInt(n) || 5), Math.round(i * n) / n) : i;
};
const T = {
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
      default(e, t, s, n) {
        n(!1);
      }
    },
    cancelButton: Object,
    confirm: {
      type: Function,
      default(e, t, s, n) {
        n(!0);
      }
    },
    confirmButton: Object,
    resolve: {
      type: Function,
      default(e, t, s, n) {
        s.close();
      }
    },
    show: {
      type: Boolean,
      defaut: !1
    }
  },
  setup(e) {
    console.log("setup");
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
        Object.entries(e).filter(([t, s]) => !t.match(/^on[A-Z]/))
      ));
    },
    getCurrentButtons() {
      if (Array.isArray(this.buttons))
        return S(this.buttons).value.map((e) => {
          const t = e.onClick;
          return Object.assign(e, {
            onClick: (s) => t(s, e, this, (...n) => this.resolve(s, e, this, ...n))
          });
        });
      if (this.type === "alert")
        return [this.computedConfirmButton];
      if (this.type === "confirm")
        return [
          this.computedConfirmButton,
          this.computedCancelButton
        ];
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
      const s = getComputedStyle(this.$refs.dialog).transitionDuration.split(",").map((n) => {
        const [
          i,
          r,
          o
        ] = n.trim().match(/^([\d.]+)(\w+)$/);
        return V(parseFloat(r), o, "ms");
      }).sort((n, i) => n - i).shift();
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
      return this.cancelButton || {
        variant: "secondary",
        label: "Cancel",
        name: "confirm",
        onClick: (e, t, s) => {
          this.cancel(e, t, s, (...n) => {
            this.resolve(e, t, s, ...n);
          });
        }
      };
    },
    computedConfirmButton() {
      return this.confirmButton || {
        variant: "primary",
        label: "Confirm",
        name: "confirm",
        onClick: (e, t, s) => {
          this.confirm(e, t, s, (...n) => {
            this.resolve(e, t, s, ...n);
          });
        }
      };
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
      currentButtons: this.getCurrentButtons(),
      isClosing: !1,
      isShowing: !1,
      isDisplaying: !1
    };
  }
}, L = z({
  name: "Modal",
  components: {
    Btn: H
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
      validate(e) {
        return ["alert", "confirm"].indexOf(e) !== -1;
      }
    }
  },
  watch: {
    isShowing(e) {
      document.querySelector("body").classList[e ? "add" : "remove"]("modal-open");
    }
  },
  beforeRouteLeave() {
    this.close();
  }
});
const N = { class: "modal-content" }, R = { class: "modal-header" }, K = {
  key: 0,
  class: "modal-title"
}, q = ["disabled"], Z = /* @__PURE__ */ h("span", { "aria-hidden": "true" }, "\xD7", -1), G = [
  Z
], J = { class: "modal-body" }, Q = {
  key: 0,
  ref: "footer",
  class: "modal-footer"
}, W = { class: "modal-footer-buttons" };
function X(e, t, s, n, i, r) {
  const o = x("btn");
  return l(), d("div", {
    class: g(["modal fade", { ...e.triggerableClasses }]),
    style: O({ display: e.isDisplaying ? "block" : "none" }),
    tabindex: "-1",
    onKeydown: t[2] || (t[2] = M((...a) => e.close && e.close(...a), ["esc"]))
  }, [
    c(e.$slots, "backdrop", {}, () => [
      e.backdrop && e.isDisplaying ? (l(), d("div", {
        key: 0,
        ref: "backdrop",
        class: g(["modal-backdrop fade", { show: e.isShowing }]),
        onClick: t[0] || (t[0] = (a) => e.closeable && e.close)
      }, null, 2)) : u("", !0)
    ]),
    h("div", {
      ref: "dialog",
      class: g(["modal-dialog", { "modal-dialog-centered": e.center }])
    }, [
      h("div", N, [
        c(e.$slots, "header", {}, () => [
          h("div", R, [
            c(e.$slots, "title", {}, () => [
              e.title ? (l(), d("h3", K, P(e.title), 1)) : u("", !0)
            ]),
            c(e.$slots, "close-button", {}, () => [
              e.closeable ? (l(), d("button", {
                key: 0,
                ref: "close",
                type: "button",
                class: "close",
                "data-dismiss": "modal",
                "aria-label": "Close",
                disabled: e.isClosing,
                onClick: t[1] || (t[1] = (...a) => e.close && e.close(...a))
              }, G, 8, q)) : u("", !0)
            ])
          ])
        ]),
        c(e.$slots, "body", {}, () => [
          h("div", J, [
            c(e.$slots, "default")
          ])
        ]),
        e.footer ? c(e.$slots, "footer", {
          key: 0,
          close: e.close
        }, () => [
          e.currentButtons.length ? (l(), d("div", Q, [
            h("div", W, [
              e.currentButtons.length ? (l(!0), d(_, { key: 0 }, j(e.currentButtons, (a, p) => (l(), y(o, C({
                key: `btn-${p}`
              }, a), null, 16))), 128)) : u("", !0)
            ])
          ], 512)) : u("", !0)
        ]) : u("", !0)
      ])
    ], 2)
  ], 38);
}
const v = /* @__PURE__ */ w(L, [["render", X]]);
class Y {
  constructor(t) {
    this.app = t;
  }
  mount(t) {
    t.appContext = this.app._context;
    const s = document.createElement("div");
    E(m(t), s), document.body.append(s);
  }
  register(t, s) {
    Object.defineProperty(this, t, {
      value: (n, i, r) => {
        const o = new Promise((a, p) => {
          this.mount(s({
            props: r,
            title: n,
            resolve: (f) => (a(f), o),
            reject: (f) => (p(f), o),
            promise: () => o,
            content: typeof i == "string" ? m("div", i) : i(this.app, r)
          }));
        });
        return o;
      }
    });
  }
}
const ee = (e) => {
  const t = new Y(e);
  t.register("alert", ({ title: s, content: n, props: i }) => m(v, Object.assign({
    title: s,
    show: !0,
    type: "alert"
  }, i), {
    default: () => m(n, Object.assign({
      ref: "content"
    }, i))
  })), t.register("confirm", ({ title: s, content: n, props: i }) => m(v, Object.assign({
    title: s,
    show: !0,
    type: "confirm"
  }, i), {
    default: () => m(n, Object.assign({
      ref: "content"
    }, i))
  })), e.provide("modal", t), e.config.globalProperties.$modal = t;
};
export {
  v as Modal,
  Y as ModalFactory,
  ee as ModalPlugin
};
