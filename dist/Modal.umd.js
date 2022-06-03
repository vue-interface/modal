(function(h,p){typeof exports=="object"&&typeof module!="undefined"?p(exports):typeof define=="function"&&define.amd?define(["exports"],p):(h=typeof globalThis!="undefined"?globalThis:h||self,p(h.Modal={}))})(this,function(h){"use strict";/*! *****************************************************************************
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
  ***************************************************************************** */var p=function(){return p=Object.assign||function(e){for(var r,n=1,s=arguments.length;n<s;n++){r=arguments[n];for(var i in r)Object.prototype.hasOwnProperty.call(r,i)&&(e[i]=r[i])}return e},p.apply(this,arguments)};function M(t){return t.toLowerCase()}var j=[/([a-z0-9])([A-Z])/g,/([A-Z])([A-Z][a-z])/g],B=/[^A-Z0-9]+/gi;function x(t,e){e===void 0&&(e={});for(var r=e.splitRegexp,n=r===void 0?j:r,s=e.stripRegexp,i=s===void 0?B:s,o=e.transform,f=o===void 0?M:o,a=e.delimiter,l=a===void 0?" ":a,d=_(_(t,n,"$1\0$2"),i,"\0"),c=0,u=d.length;d.charAt(c)==="\0";)c++;for(;d.charAt(u-1)==="\0";)u--;return d.slice(c,u).split("\0").map(f).join(l)}function _(t,e,r){return e instanceof RegExp?t.replace(e,r):e.reduce(function(n,s){return n.replace(s,r)},t)}function E(t,e){return e===void 0&&(e={}),x(t,p({delimiter:"."},e))}function A(t,e){return e===void 0&&(e={}),E(t,p({delimiter:"-"},e))}var z={props:{size:String,sizePrefix:{type:String,default(){return this.$options.name}}},computed:{sizeableClassPrefix(){return this.sizePrefix&&A(this.sizePrefix)},sizeableClass(){return!this.size||!this.sizeableClassPrefix?"":`${this.sizeableClassPrefix}-${this.size}`}}},T={props:{variant:String,variantPrefix:{type:String,default(){return this.$options.name&&this.$options.name.toLowerCase()}}},computed:{variantClassPrefix(){return this.variantPrefix},variantClass(){return!this.variant||!this.variantClassPrefix?"":`${this.variantClassPrefix}-${this.variant}`}}},R=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r(t.component,{tag:"component",class:t.classes,attrs:{disabled:t.disabled,role:"button"},on:{click:function(n){!t.disabled&&t.$emit("click",n)}}},[t._t("default",function(){return[t._v(t._s(t.label))]})],2)},k=[];function y(t,e,r,n,s,i,o,f){var a=typeof t=="function"?t.options:t;e&&(a.render=e,a.staticRenderFns=r,a._compiled=!0),n&&(a.functional=!0),i&&(a._scopeId="data-v-"+i);var l;if(o?(l=function(u){u=u||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,!u&&typeof __VUE_SSR_CONTEXT__!="undefined"&&(u=__VUE_SSR_CONTEXT__),s&&s.call(this,u),u&&u._registeredComponents&&u._registeredComponents.add(o)},a._ssrRegister=l):s&&(l=f?function(){s.call(this,(a.functional?this.parent:this).$root.$options.shadowRoot)}:s),l)if(a.functional){a._injectStyles=l;var d=a.render;a.render=function(ct,S){return l.call(S),d(ct,S)}}else{var c=a.beforeCreate;a.beforeCreate=c?[].concat(c,l):[l]}return{exports:t,options:a}}const I={name:"Btn",mixins:[z,T],props:{active:Boolean,block:Boolean,disabled:Boolean,label:String,outline:Boolean,tag:String,variant:{type:String,default:"primary"}},computed:{classes(){return["btn",this.variantClass,this.sizeableClass,this.active&&"active",this.block&&"btn-block",this.disabled&&"disabled"]},component(){return this.tag?this.tag:this.$attrs.to?"router-link":this.$attrs.href?"a":"button"},variantClassPrefix(){return this.variantPrefix+(this.outline?"-outline":"")}}},C={};var L=y(I,R,k,!1,F,null,null,null);function F(t){for(let e in C)this[e]=C[e]}var D=function(){return L.exports}(),g={px:{px:1,cm:96/2.54,mm:96/25.4,in:96,pt:96/72,pc:16},cm:{px:2.54/96,cm:1,mm:.1,in:2.54,pt:2.54/72,pc:2.54/6},mm:{px:25.4/96,cm:10,mm:1,in:25.4,pt:25.4/72,pc:25.4/6},in:{px:1/96,cm:1/2.54,mm:1/25.4,in:1,pt:1/72,pc:1/6},pt:{px:.75,cm:72/2.54,mm:72/25.4,in:72,pt:1,pc:12},pc:{px:6/96,cm:6/2.54,mm:6/25.4,in:6,pt:6/72,pc:1},deg:{deg:1,grad:.9,rad:180/Math.PI,turn:360},grad:{deg:400/360,grad:1,rad:200/Math.PI,turn:400},rad:{deg:Math.PI/180,grad:Math.PI/200,rad:1,turn:Math.PI*2},turn:{deg:1/360,grad:1/400,rad:.5/Math.PI,turn:1},s:{s:1,ms:1/1e3},ms:{s:1e3,ms:1},Hz:{Hz:1,kHz:1e3},kHz:{Hz:1/1e3,kHz:1},dpi:{dpi:1,dpcm:1/2.54,dppx:1/96},dpcm:{dpi:2.54,dpcm:1,dppx:2.54/96},dppx:{dpi:96,dpcm:96/2.54,dppx:1}},H=function(t,e,r,n){if(!g.hasOwnProperty(r))throw new Error("Cannot convert to "+r);if(!g[r].hasOwnProperty(e))throw new Error("Cannot convert from "+e+" to "+r);var s=g[r][e]*t;return n!==!1?(n=Math.pow(10,parseInt(n)||5),Math.round(s*n)/n):s},Z={props:{buttons:Array,cancelButton:{type:Object,default:()=>({variant:"secondary",label:"Cancel",onClick(t,e,r){this.resolve(t,e,r,!1)}})},confirmButton:{type:Object,default:()=>({variant:"primary",label:"Confirm",onClick(t,e,r){this.resolve(t,e,r,!0)}})},resolve:{type:Function,default(t,e,r,n){console.log("resolve")}},show:{type:Boolean,defaut:!1}},methods:{focus(){this.$el.focus()},close(t){return new Promise(e=>{t=t||new Event("close",{cancelable:!0});const r=()=>{this.isClosing=!0,this.isShowing=!1,this.transition(()=>{this.isClosing=!1,this.isDisplaying=!1,this.$emit("closed",t),e(this)})};this.$emit("close",t,this.$refs.close,this,r),t.defaultPrevented||r()})},buttonAttributes(t){return Object.assign({class:null,disabled:!1,size:"md",variant:"primary"},Object.fromEntries(Object.entries(t).filter(([e,r])=>!e.match(/^on[A-Z]/))))},buttonListeners(t,e){return Object.fromEntries(Object.entries(t).map(([r,n])=>[r,n,r.match(/^on([A-Z]\w+)/)]).map(([r,n,s])=>[s?String(s[1]).toLowerCase():"click",i=>{const o=this.currentButtons[e].attributes;this.$emit(t.name||e,i,o,this,(...f)=>this.resolve(i,o,this,...f)),i.defaultPrevented||(typeof n=="function"?n.call(this,i,o,this,(...f)=>this.resolve(i,o,this,...f)):this.resolve(i,o,this))}]))},initializeButtons(){this.currentButtons={cancel:{attributes:this.buttonAttributes(this.cancelButton),listeners:this.buttonListeners(this.cancelButton,"cancel")},confirm:{attributes:this.buttonAttributes(this.confirmButton),listeners:this.buttonListeners(this.confirmButton,"confirm")}},this.buttons&&this.buttons.forEach((t,e)=>{this.$set(this.currentButtons,`btn-${e}`,{attributes:this.buttonAttributes(t),listeners:this.buttonListeners(t,`btn-${e}`)})})},open(){return new Promise(t=>{const e=new Event("close",{cancelable:!0}),r=()=>{this.isDisplaying=!0,setTimeout(()=>{this.isShowing=!0,this.transition(()=>{this.$emit("opened"),t(this)})})};this.$emit("open",e,r),e.defaultPrevented||r()})},transition(t){const r=getComputedStyle(this.$refs.dialog).transitionDuration.split(",").map(n=>{const[s,i,o]=n.trim().match(/^([\d.]+)(\w+)$/);return H(parseFloat(i),o,"ms")}).sort((n,s)=>n-s).shift();return setTimeout(t,r)},toggle(){this.isShowing?this.close():this.open()}},computed:{customButtons(){return Object.entries(this.currentButtons||{}).filter(([t,e])=>!!t.match(/^btn-\d+$/)).map(([t,e])=>e)},triggerableClasses(){return{show:this.isShowing}}},watch:{isShowing(t){t&&this.focus()},show(t){t&&this.open()}},created(){this.$on("open",()=>this.initializeButtons()),this.$on("closed",()=>this.currentButtons=null)},mounted(){this.show&&this.open()},data(){return{currentButtons:null,isClosing:!1,isShowing:!1,isDisplaying:!1}}},N=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"modal fade",class:Object.assign({},t.triggerableClasses),style:{display:t.isDisplaying?"block":"none"},attrs:{tabindex:"-1"},on:{keydown:function(n){return!n.type.indexOf("key")&&t._k(n.keyCode,"esc",27,n.key,["Esc","Escape"])?null:t.close.apply(null,arguments)}}},[t._t("backdrop",function(){return[t.backdrop&&t.isDisplaying?r("div",{ref:"backdrop",staticClass:"modal-backdrop fade",class:{show:t.isShowing},on:{click:function(n){t.closeable&&t.close}}}):t._e()]}),r("div",{ref:"dialog",staticClass:"modal-dialog",class:{"modal-dialog-centered":t.center}},[r("div",{ref:"content",staticClass:"modal-content"},[t._t("header",function(){return[r("div",{staticClass:"modal-header"},[t._t("title",function(){return[t.title?r("h3",{staticClass:"modal-title"},[t._v(" "+t._s(t.title)+" ")]):t._e()]}),t._t("close-button",function(){return[t.closeable?r("button",{ref:"close",staticClass:"close",attrs:{type:"button","data-dismiss":"modal","aria-label":"Close",disabled:t.isClosing},on:{click:t.close}},[r("span",{attrs:{"aria-hidden":"true"}},[t._v("\xD7")])]):t._e()]})],2)]}),t._t("body",function(){return[r("div",{staticClass:"modal-body"},[t._t("default")],2)]}),t._t("footer",function(){return[t.customButtons.length||t.type&&t.currentButtons?r("div",{ref:"footer",staticClass:"modal-footer"},[r("div",{staticClass:"modal-footer-buttons"},[t.customButtons.length?t._l(t.customButtons,function(n,s){return r("btn",t._g(t._b({key:"btn-"+s},"btn",n.attributes,!1),n.listeners))}):t.type==="alert"?[r("btn",t._g(t._b({ref:"confirm"},"btn",t.currentButtons.confirm.attributes,!1),t.currentButtons.confirm.listeners))]:t.type==="confirm"?[r("btn",t._g(t._b({ref:"confirm"},"btn",t.currentButtons.confirm.attributes,!1),t.currentButtons.confirm.listeners)),r("btn",t._g(t._b({ref:"cancel"},"btn",t.currentButtons.cancel.attributes,!1),t.currentButtons.cancel.listeners))]:t._e()],2)]):t._e()]},{close:t.close})],2)])],2)},X=[],ut="";const U={name:"Modal",components:{Btn:D},mixins:[Z],props:{backdrop:{type:Boolean,default:!0},center:Boolean,closeable:{type:Boolean,default:!0},title:String,type:{type:[Boolean,String],default:!1,validate(t){return["alert","confirm"].indexOf(t)!==-1}}},watch:{isShowing(t){document.querySelector("body").classList[t?"add":"remove"]("modal-open")}},beforeRouteLeave(){this.close()}},w={};var G=y(U,N,X,!1,W,null,null,null);function W(t){for(let e in w)this[e]=w[e]}var v=function(){return G.exports}();class ${constructor(e){this.$vue=e}register(e,r){return this[e]=(n,s,i={})=>{const o=this.$vue.extend(v),f=new Promise(function(a,l){new o(Object.assign({el:document.body.appendChild(document.createElement("div")),render:d=>r((c,...u)=>typeof c=="string"?c:typeof c=="function"?[].concat(c(d)):d(c,...u),{promise:()=>f,resolve:c=>(a(c),f),reject:c=>(l(c),f)},n,s,Object.assign({},i))}))});return f}}}var q=function(e){return K(e)&&!V(e)};function K(t){return!!t&&typeof t=="object"}function V(t){var e=Object.prototype.toString.call(t);return e==="[object RegExp]"||e==="[object Date]"||Q(t)}var Y=typeof Symbol=="function"&&Symbol.for,J=Y?Symbol.for("react.element"):60103;function Q(t){return t.$$typeof===J}function tt(t){return Array.isArray(t)?[]:{}}function b(t,e){return e.clone!==!1&&e.isMergeableObject(t)?m(tt(t),t,e):t}function et(t,e,r){return t.concat(e).map(function(n){return b(n,r)})}function rt(t,e){if(!e.customMerge)return m;var r=e.customMerge(t);return typeof r=="function"?r:m}function nt(t){return Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(t).filter(function(e){return t.propertyIsEnumerable(e)}):[]}function O(t){return Object.keys(t).concat(nt(t))}function P(t,e){try{return e in t}catch{return!1}}function st(t,e){return P(t,e)&&!(Object.hasOwnProperty.call(t,e)&&Object.propertyIsEnumerable.call(t,e))}function it(t,e,r){var n={};return r.isMergeableObject(t)&&O(t).forEach(function(s){n[s]=b(t[s],r)}),O(e).forEach(function(s){st(t,s)||(P(t,s)&&r.isMergeableObject(e[s])?n[s]=rt(s,r)(t[s],e[s],r):n[s]=b(e[s],r))}),n}function m(t,e,r){r=r||{},r.arrayMerge=r.arrayMerge||et,r.isMergeableObject=r.isMergeableObject||q,r.cloneUnlessOtherwiseSpecified=b;var n=Array.isArray(e),s=Array.isArray(t),i=n===s;return i?n?r.arrayMerge(t,e,r):it(t,e,r):b(e,r)}m.all=function(e,r){if(!Array.isArray(e))throw new Error("first argument should be an array");return e.reduce(function(n,s){return m(n,s,r)},{})};var at=m,ot=at,lt=t=>{t.prototype.$modal=new $(t),t.prototype.$modal.register("alert",(e,{resolve:r},n,s,i)=>e(v,{props:{resolve(o,f,a,...l){return r(...l).then(()=>this.close())},show:!0,title:n,type:"alert"}},e(s,i))),t.prototype.$modal.register("confirm",(e,{resolve:r},n,s,i)=>e(v,ot({props:{resolve(o,f,a,...l){return r(...l).then(()=>this.close())},show:!0,title:n,type:"confirm"}},i),e(s)))};h.Modal=v,h.ModalFactory=$,h.ModalPlugin=lt,Object.defineProperties(h,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});
