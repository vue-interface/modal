import { openBlock as l, createBlock as y, resolveDynamicComponent as B, mergeProps as C, withCtx as k, renderSlot as c, createTextVNode as x, toDisplayString as P, ref as $, resolveComponent as S, createElementBlock as d, normalizeClass as g, normalizeStyle as z, withKeys as _, createCommentVNode as u, createElementVNode as h, Fragment as M, renderList as O, render as j, h as m } from "vue";
const E = {
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
}, A = {
  name: "Btn",
  mixins: [
    E,
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
}, w = (e, s) => {
  const t = e.__vccOpts || e;
  for (const [n, i] of s)
    t[n] = i;
  return t;
};
function I(e, s, t, n, i, r) {
  return l(), y(B(r.component), C(e.$attrs, {
    disabled: t.disabled,
    class: r.classes,
    role: "button"
  }), {
    default: k(() => [
      c(e.$slots, "default", {}, () => [
        x(P(t.label), 1)
      ])
    ]),
    _: 3
  }, 16, ["disabled", "class"]);
}
const F = /* @__PURE__ */ w(A, [["render", I]]);
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
}, H = function(e, s, t, n) {
  if (!b.hasOwnProperty(t))
    throw new Error("Cannot convert to " + t);
  if (!b[t].hasOwnProperty(s))
    throw new Error("Cannot convert from " + s + " to " + t);
  var i = b[t][s] * e;
  return n !== !1 ? (n = Math.pow(10, parseInt(n) || 5), Math.round(i * n) / n) : i;
};
const V = {
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
      default(e, s, t, n) {
        n(!1);
      }
    },
    cancelButton: Object,
    confirm: {
      type: Function,
      default(e, s, t, n) {
        n(!0);
      }
    },
    confirmButton: Object,
    resolve: {
      type: Function,
      default(e, s, t, n) {
        t.close();
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
      return new Promise((s) => {
        e = e || new Event("close", {
          cancelable: !0
        });
        const t = () => {
          this.isClosing = !0, this.isShowing = !1, this.transition(() => {
            this.isClosing = !1, this.isDisplaying = !1, this.$emit("closed", e), s(this);
          });
        };
        this.$emit("close", e, this.$refs.close, this, t), e.defaultPrevented || t();
      });
    },
    buttonAttributes(e) {
      return Object.assign({
        class: null,
        disabled: !1,
        size: "md",
        variant: "primary"
      }, Object.fromEntries(
        Object.entries(e).filter(([s, t]) => !s.match(/^on[A-Z]/))
      ));
    },
    getCurrentButtons() {
      if (Array.isArray(this.buttons))
        return $(this.buttons).value.map((e) => {
          const s = e.onClick;
          return Object.assign(e, {
            onClick: (t) => s(t, e, this, (...n) => this.resolve(t, e, this, ...n))
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
        const s = new Event("close", {
          cancelable: !0
        }), t = () => {
          this.isDisplaying = !0, setTimeout(() => {
            this.isShowing = !0, this.transition(() => {
              this.$emit("opened"), e(this);
            });
          });
        };
        this.$emit("open", s, t), s.defaultPrevented || t();
      });
    },
    transition(e) {
      const t = getComputedStyle(this.$refs.dialog).transitionDuration.split(",").map((n) => {
        const [
          i,
          r,
          o
        ] = n.trim().match(/^([\d.]+)(\w+)$/);
        return H(parseFloat(r), o, "ms");
      }).sort((n, i) => n - i).shift();
      return setTimeout(e, t);
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
        onClick: (e, s, t) => {
          this.cancel(e, s, t, (...n) => {
            this.resolve(e, s, t, ...n);
          });
        }
      };
    },
    computedConfirmButton() {
      return this.confirmButton || {
        variant: "primary",
        label: "Confirm",
        name: "confirm",
        onClick: (e, s, t) => {
          this.confirm(e, s, t, (...n) => {
            this.resolve(e, s, t, ...n);
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
}, T = {
  name: "Modal",
  components: {
    Btn: F
  },
  mixins: [
    V
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
};
const L = {
  ref: "content",
  class: "modal-content"
}, N = { class: "modal-header" }, R = {
  key: 0,
  class: "modal-title"
}, K = ["disabled"], q = /* @__PURE__ */ h("span", { "aria-hidden": "true" }, "\xD7", -1), Z = [
  q
], G = { class: "modal-body" }, J = {
  key: 0,
  ref: "footer",
  class: "modal-footer"
}, Q = { class: "modal-footer-buttons" };
function W(e, s, t, n, i, r) {
  const o = S("btn");
  return l(), d("div", {
    class: g(["modal fade", { ...e.triggerableClasses }]),
    style: z({ display: e.isDisplaying ? "block" : "none" }),
    tabindex: "-1",
    onKeydown: s[2] || (s[2] = _((...a) => e.close && e.close(...a), ["esc"]))
  }, [
    c(e.$slots, "backdrop", {}, () => [
      t.backdrop && e.isDisplaying ? (l(), d("div", {
        key: 0,
        ref: "backdrop",
        class: g(["modal-backdrop fade", { show: e.isShowing }]),
        onClick: s[0] || (s[0] = (a) => t.closeable && e.close)
      }, null, 2)) : u("", !0)
    ]),
    h("div", {
      ref: "dialog",
      class: g(["modal-dialog", { "modal-dialog-centered": t.center }])
    }, [
      h("div", L, [
        c(e.$slots, "header", {}, () => [
          h("div", N, [
            c(e.$slots, "title", {}, () => [
              t.title ? (l(), d("h3", R, P(t.title), 1)) : u("", !0)
            ]),
            c(e.$slots, "close-button", {}, () => [
              t.closeable ? (l(), d("button", {
                key: 0,
                ref: "close",
                type: "button",
                class: "close",
                "data-dismiss": "modal",
                "aria-label": "Close",
                disabled: e.isClosing,
                onClick: s[1] || (s[1] = (...a) => e.close && e.close(...a))
              }, Z, 8, K)) : u("", !0)
            ])
          ])
        ]),
        c(e.$slots, "body", {}, () => [
          h("div", G, [
            c(e.$slots, "default")
          ])
        ]),
        t.footer ? c(e.$slots, "footer", {
          key: 0,
          close: e.close
        }, () => [
          e.currentButtons.length ? (l(), d("div", J, [
            h("div", Q, [
              e.currentButtons.length ? (l(!0), d(M, { key: 0 }, O(e.currentButtons, (a, f) => (l(), y(o, C({
                key: `btn-${f}`
              }, a), null, 16))), 128)) : u("", !0)
            ])
          ], 512)) : u("", !0)
        ]) : u("", !0)
      ], 512)
    ], 2)
  ], 38);
}
const v = /* @__PURE__ */ w(T, [["render", W]]);
class X {
  constructor(s) {
    this.app = s;
  }
  mount(s) {
    s.appContext = this.app._context;
    const t = document.createElement("div");
    j(m(s), t), document.body.append(t);
  }
  register(s, t) {
    Object.defineProperty(this, s, {
      value: (n, i, r) => {
        const o = new Promise((a, f) => {
          this.mount(t({
            props: r,
            title: n,
            resolve: (p) => (a(p), o),
            reject: (p) => (f(p), o),
            promise: () => o,
            content: typeof i == "string" ? m("div", i) : i(this.app, r)
          }));
        });
        return o;
      }
    });
  }
}
const U = (e) => {
  const s = new X(e);
  s.register("alert", ({ title: t, content: n, props: i }) => m(v, Object.assign({
    title: t,
    show: !0,
    type: "alert"
  }, i), {
    default: () => m(n, {
      ref: "content"
    })
  })), s.register("confirm", ({ title: t, content: n, props: i }) => m(v, Object.assign({
    title: t,
    show: !0,
    type: "confirm"
  }, i), {
    default: () => m(n, {
      ref: "content"
    })
  })), e.provide("modal", s), e.config.globalProperties.$modal = s;
};
export {
  v as Modal,
  X as ModalFactory,
  U as ModalPlugin
};
