import { Btn as C } from "@vue-interface/btn";
import { ref as w, defineComponent as k, resolveComponent as B, openBlock as r, createElementBlock as d, normalizeClass as y, normalizeStyle as $, withKeys as S, renderSlot as c, createCommentVNode as u, createElementVNode as m, toDisplayString as O, createBlock as b, Suspense as j, withCtx as g, resolveDynamicComponent as D, Fragment as P, renderList as A, mergeProps as E, render as F, h as p } from "vue";
import M from "css-unit-converter";
const _ = {
  props: {
    /**
     * Custom buttons for the model.
     *
     * @type {Array}
     */
    buttons: {
      type: [Boolean, Array],
      default: void 0,
      validate(e) {
        return Array.isArray(e) || !e;
      }
    },
    /**
     * The cancel button callback function.
     * 
     * @type {Function}
     */
    cancel: {
      type: Function,
      default(e, t, o, s) {
        s(!1);
      }
    },
    /**
     * The cancel button contextual object.
     *
     * @type {Object}
     */
    cancelButton: Object,
    /**
     * The confirm button callback function.
     * 
     * @type {Function}
     */
    confirm: {
      type: Function,
      default(e, t, o, s) {
        s(!0);
      }
    },
    /**
     * The confirm button contextual object.
     *
     * @type {Object}
     */
    confirmButton: Object,
    /**
     * The default resolver.
     * 
     * @property {Function}
     */
    resolve: {
      type: Function,
      default(e, t, o, s) {
        s && o.close();
      }
    },
    /**
     * Is the triggerable element showing.
     *
     * @property {Boolean}
     */
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
        const o = () => {
          this.isClosing = !0, this.isShowing = !1, this.transition(() => {
            this.isClosing = !1, this.isDisplaying = !1, this.$emit("closed", e), t(this);
          });
        };
        this.$emit("close", e, this.$refs.close, this, o), e.defaultPrevented || o();
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
        }), o = () => {
          this.isDisplaying = !0, setTimeout(() => {
            this.isShowing = !0, this.transition(() => {
              this.$emit("opened"), e(this);
            });
          });
        };
        this.$emit("open", t, o), t.defaultPrevented || o();
      });
    },
    transition(e) {
      const o = getComputedStyle(this.$refs.dialog).transitionDuration.split(",").map((s) => {
        const n = s.trim().match(/^([\d.]+)(\w+)$/);
        if (!n)
          return 0;
        const i = parseFloat(n[1]), l = n[2];
        return M(i, l, "ms");
      }).sort((s, n) => s - n).shift();
      return setTimeout(e, o);
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
          this.cancel(t, e, this, (...o) => {
            this.resolve(t, e, this, ...o);
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
          this.confirm(t, e, this, (...o) => {
            this.resolve(t, e, this, ...o);
          });
        }
      };
      return this.confirmButton || e;
    },
    currentButtons() {
      if (Array.isArray(this.buttons))
        return w(this.buttons).value.map((e) => {
          const t = e.onClick || (() => {
          });
          return Object.assign(e, {
            onClick: (o) => t(o, e, this, (...s) => this.resolve(o, e, this, ...s))
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
}, z = k({
  name: "Modal",
  components: {
    Btn: C
  },
  mixins: [
    _
  ],
  beforeRouteLeave() {
    this.close();
  },
  props: {
    /**
     * Show the modal with a backdrop.
     *
     * @type {Boolean}
     */
    backdrop: {
      type: Boolean,
      default: !0
    },
    /**
     * Is the modal centered in the screen.
     *
     * @type {Boolean}
     */
    center: Boolean,
    /**
     * Is the modal content fixed position
     *
     * @type {Boolean}
     */
    closeable: {
      type: Boolean,
      default: !0
    },
    /**
     * Should show the modal footer.
     *
     * @type {Boolean}
     */
    footer: {
      type: Boolean,
      default: !0
    },
    /**
     * Should show the modal footer.
     *
     * @type {Boolean}
     */
    indicator: {
      type: Object,
      default: void 0
    },
    /**
     * The modal title.
     *
     * @type {String}
     */
    title: {
      type: String,
      default: void 0
    },
    /**
     * Is the modal type.
     *
     * @type {Boolean}
     */
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
const L = (e, t) => {
  const o = e.__vccOpts || e;
  for (const [s, n] of t)
    o[s] = n;
  return o;
}, T = { class: "modal-content" }, K = { class: "modal-header" }, N = {
  key: 0,
  class: "modal-title"
}, V = ["disabled"], q = /* @__PURE__ */ m("span", { "aria-hidden": "true" }, "×", -1), R = [
  q
], Z = { class: "modal-body" }, G = {
  key: 0,
  ref: "footer",
  class: "modal-footer"
}, H = { class: "modal-footer-buttons" };
function I(e, t, o, s, n, i) {
  const l = B("btn");
  return r(), d("div", {
    class: y(["modal fade", { ...e.triggerableClasses }]),
    style: $({ display: e.isDisplaying ? "block" : "none" }),
    tabindex: "-1",
    onKeydown: t[2] || (t[2] = S((...a) => e.close && e.close(...a), ["esc"]))
  }, [
    c(e.$slots, "backdrop", {}, () => [
      e.backdrop && e.isDisplaying ? (r(), d("div", {
        key: 0,
        ref: "backdrop",
        class: y(["modal-backdrop fade", { show: e.isShowing }]),
        onClick: t[0] || (t[0] = (a) => e.closeable && e.close)
      }, null, 2)) : u("", !0)
    ]),
    m("div", {
      ref: "dialog",
      class: y(["modal-dialog", { "modal-dialog-centered": e.center }])
    }, [
      m("div", T, [
        c(e.$slots, "header", {}, () => [
          m("div", K, [
            c(e.$slots, "title", {}, () => [
              e.title ? (r(), d("h3", N, O(e.title), 1)) : u("", !0)
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
                onClick: t[1] || (t[1] = (...a) => e.close && e.close(...a))
              }, R, 8, V)) : u("", !0)
            ])
          ])
        ]),
        c(e.$slots, "body", {}, () => [
          (r(), b(j, null, {
            fallback: g(() => [
              (r(), b(D(e.indicator)))
            ]),
            default: g(() => [
              m("div", Z, [
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
          e.currentButtons.length ? (r(), d("div", G, [
            m("div", H, [
              e.currentButtons.length ? (r(!0), d(P, { key: 0 }, A(e.currentButtons, (a, f) => (r(), b(l, E({
                key: `btn-${f}`
              }, a), null, 16))), 128)) : u("", !0)
            ])
          ], 512)) : u("", !0)
        ]) : u("", !0)
      ])
    ], 2)
  ], 38);
}
const v = /* @__PURE__ */ L(z, [["render", I]]);
class J {
  constructor(t, o) {
    this.app = t, this.props = o;
  }
  mount(t) {
    t.appContext = this.app._context;
    const o = document.createElement("div");
    F(p(t), o), document.body.append(o);
  }
  register(t, o) {
    Object.defineProperty(this, t, {
      value: (s, n, i) => {
        const l = new Promise((a, f) => {
          this.mount(o({
            title: s,
            props: Object.assign({}, this.props, i),
            resolve: (h) => (a(h), l),
            reject: (h) => (f(h), l),
            promise: () => l,
            content: typeof n == "string" ? p("div", n) : n(this.app, i)
          }));
        });
        return l;
      }
    });
  }
}
const X = (e, t = {}) => {
  const o = new J(e, t);
  o.register("alert", ({ title: s, content: n, props: i }) => p(v, Object.assign({
    title: s,
    show: !0,
    type: "alert"
  }, i), {
    default: () => p(n, Object.assign({
      ref: "content"
    }))
  })), o.register("confirm", ({ title: s, content: n, props: i }) => p(v, Object.assign({
    title: s,
    show: !0,
    type: "confirm"
  }, i), {
    default: () => p(n, Object.assign({
      ref: "content"
    }))
  })), e.provide("modal", o), e.config.globalProperties.$modal = o;
};
export {
  v as Modal,
  J as ModalFactory,
  X as ModalPlugin
};
//# sourceMappingURL=modal.js.map
