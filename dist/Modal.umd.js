(function(h,m){typeof exports=="object"&&typeof module!="undefined"?m(exports):typeof define=="function"&&define.amd?define(["exports"],m):(h=typeof globalThis!="undefined"?globalThis:h||self,m(h.Modal={}))})(this,function(h){"use strict";/*! *****************************************************************************
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
  ***************************************************************************** */var m=function(){return m=Object.assign||function(e){for(var r,n=1,i=arguments.length;n<i;n++){r=arguments[n];for(var o in r)Object.prototype.hasOwnProperty.call(r,o)&&(e[o]=r[o])}return e},m.apply(this,arguments)};function B(t){return t.toLowerCase()}var x=[/([a-z0-9])([A-Z])/g,/([A-Z])([A-Z][a-z])/g],E=/[^A-Z0-9]+/gi;function A(t,e){e===void 0&&(e={});for(var r=e.splitRegexp,n=r===void 0?x:r,i=e.stripRegexp,o=i===void 0?E:i,s=e.transform,d=s===void 0?B:s,a=e.delimiter,l=a===void 0?" ":a,c=C(C(t,n,"$1\0$2"),o,"\0"),f=0,u=c.length;c.charAt(f)==="\0";)f++;for(;c.charAt(u-1)==="\0";)u--;return c.slice(f,u).split("\0").map(d).join(l)}function C(t,e,r){return e instanceof RegExp?t.replace(e,r):e.reduce(function(n,i){return n.replace(i,r)},t)}function z(t,e){return e===void 0&&(e={}),A(t,m({delimiter:"."},e))}function T(t,e){return e===void 0&&(e={}),z(t,m({delimiter:"-"},e))}var R={props:{size:String,sizePrefix:{type:String,default(){return this.$options.name}}},computed:{sizeableClassPrefix(){return this.sizePrefix&&T(this.sizePrefix)},sizeableClass(){return!this.size||!this.sizeableClassPrefix?"":`${this.sizeableClassPrefix}-${this.size}`}}},k={props:{variant:String,variantPrefix:{type:String,default(){return this.$options.name&&this.$options.name.toLowerCase()}}},computed:{variantClassPrefix(){return this.variantPrefix},variantClass(){return!this.variant||!this.variantClassPrefix?"":`${this.variantClassPrefix}-${this.variant}`}}},I=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r(t.component,{tag:"component",class:t.classes,attrs:{disabled:t.disabled,role:"button"},on:{click:function(n){!t.disabled&&t.$emit("click",n)}}},[t._t("default",function(){return[t._v(t._s(t.label))]})],2)},L=[];function w(t,e,r,n,i,o,s,d){var a=typeof t=="function"?t.options:t;e&&(a.render=e,a.staticRenderFns=r,a._compiled=!0),n&&(a.functional=!0),o&&(a._scopeId="data-v-"+o);var l;if(s?(l=function(u){u=u||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,!u&&typeof __VUE_SSR_CONTEXT__!="undefined"&&(u=__VUE_SSR_CONTEXT__),i&&i.call(this,u),u&&u._registeredComponents&&u._registeredComponents.add(s)},a._ssrRegister=l):i&&(l=d?function(){i.call(this,(a.functional?this.parent:this).$root.$options.shadowRoot)}:i),l)if(a.functional){a._injectStyles=l;var c=a.render;a.render=function(y,j){return l.call(j),c(y,j)}}else{var f=a.beforeCreate;a.beforeCreate=f?[].concat(f,l):[l]}return{exports:t,options:a}}const D={name:"Btn",mixins:[R,k],props:{active:Boolean,block:Boolean,disabled:Boolean,label:String,outline:Boolean,tag:String,variant:{type:String,default:"primary"}},computed:{classes(){return["btn",this.variantClass,this.sizeableClass,this.active&&"active",this.block&&"btn-block",this.disabled&&"disabled"]},component(){return this.tag?this.tag:this.$attrs.to?"router-link":this.$attrs.href?"a":"button"},variantClassPrefix(){return this.variantPrefix+(this.outline?"-outline":"")}}},$={};var F=w(D,I,L,!1,H,null,null,null);function H(t){for(let e in $)this[e]=$[e]}var Z=function(){return F.exports}(),g={px:{px:1,cm:96/2.54,mm:96/25.4,in:96,pt:96/72,pc:16},cm:{px:2.54/96,cm:1,mm:.1,in:2.54,pt:2.54/72,pc:2.54/6},mm:{px:25.4/96,cm:10,mm:1,in:25.4,pt:25.4/72,pc:25.4/6},in:{px:1/96,cm:1/2.54,mm:1/25.4,in:1,pt:1/72,pc:1/6},pt:{px:.75,cm:72/2.54,mm:72/25.4,in:72,pt:1,pc:12},pc:{px:6/96,cm:6/2.54,mm:6/25.4,in:6,pt:6/72,pc:1},deg:{deg:1,grad:.9,rad:180/Math.PI,turn:360},grad:{deg:400/360,grad:1,rad:200/Math.PI,turn:400},rad:{deg:Math.PI/180,grad:Math.PI/200,rad:1,turn:Math.PI*2},turn:{deg:1/360,grad:1/400,rad:.5/Math.PI,turn:1},s:{s:1,ms:1/1e3},ms:{s:1e3,ms:1},Hz:{Hz:1,kHz:1e3},kHz:{Hz:1/1e3,kHz:1},dpi:{dpi:1,dpcm:1/2.54,dppx:1/96},dpcm:{dpi:2.54,dpcm:1,dppx:2.54/96},dppx:{dpi:96,dpcm:96/2.54,dppx:1}},N=function(t,e,r,n){if(!g.hasOwnProperty(r))throw new Error("Cannot convert to "+r);if(!g[r].hasOwnProperty(e))throw new Error("Cannot convert from "+e+" to "+r);var i=g[r][e]*t;return n!==!1?(n=Math.pow(10,parseInt(n)||5),Math.round(i*n)/n):i},X={props:{buttons:Array,cancelButton:{type:Object,default:()=>({variant:"secondary",label:"Cancel",onClick(t,e,r){r.close()}})},confirmButton:{type:Object,default:()=>({variant:"primary",label:"Confirm",onClick(t,e,r){r.close()}})},show:{type:Boolean,defaut:!1}},methods:{focus(){this.$el.focus()},close(t){return new Promise(e=>{t=t||new Event("close",{cancelable:!0});const r=()=>{this.isClosing=!0,this.isShowing=!1,this.transition(()=>{this.isClosing=!1,this.isDisplaying=!1,this.$emit("closed",t),e(this)})};this.$emit("close",t,this.$refs.close,this,r),t.defaultPrevented||r()})},buttonAttributes(t){return Object.assign({class:null,disabled:!1,size:"md",variant:"primary"},Object.fromEntries(Object.entries(t).filter(([e,r])=>!e.match(/^on[A-Z]/))))},buttonListeners(t,e){return Object.fromEntries(Object.entries(t).map(([r,n])=>[r,n,r.match(/^on([A-Z]\w+)/)]).map(([r,n,i])=>[i?String(i[1]).toLowerCase():"click",o=>{const s=()=>{i?n(o,this.currentButtons[e].attributes,this):this.close()};this.$emit(t.name||e,o,this.currentButtons[e].attributes,this,s),o.defaultPrevented||s()}]))},initializeButtons(){this.currentButtons={cancel:{attributes:this.buttonAttributes(this.cancelButton),listeners:this.buttonListeners(this.cancelButton,"cancel")},confirm:{attributes:this.buttonAttributes(this.confirmButton),listeners:this.buttonListeners(this.confirmButton,"confirm")}},this.buttons&&this.buttons.forEach((t,e)=>{this.$set(this.currentButtons,`btn-${e}`,{attributes:this.buttonAttributes(t),listeners:this.buttonListeners(t,`btn-${e}`)})})},open(){return new Promise(t=>{const e=new Event("close",{cancelable:!0}),r=()=>{this.isDisplaying=!0,setTimeout(()=>{this.isShowing=!0,this.transition(()=>{this.$emit("opened"),t(this)})})};this.$emit("open",e,r),e.defaultPrevented||r()})},transition(t){const r=getComputedStyle(this.$refs.dialog).transitionDuration.split(",").map(n=>{const[i,o,s]=n.trim().match(/^([\d.]+)(\w+)$/);return N(parseFloat(o),s,"ms")}).sort((n,i)=>n-i).shift();return setTimeout(t,r)},toggle(){this.isShowing?this.close():this.open()}},computed:{customButtons(){return Object.entries(this.currentButtons).filter(([t,e])=>!!t.match(/^btn-\d+$/)).map(([t,e])=>e)},triggerableClasses(){return{show:this.isShowing}}},watch:{isShowing(t){t&&this.focus()},show(t){t&&this.open()}},created(){this.$on("open",()=>this.initializeButtons()),this.$on("closed",()=>this.currentButtons=null)},mounted(){this.show&&this.open()},data(){return{currentButtons:null,isClosing:!1,isShowing:!1,isDisplaying:!1}}},U=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"modal fade",class:Object.assign({},t.triggerableClasses),style:{display:t.isDisplaying?"block":"none"},attrs:{tabindex:"-1"},on:{keydown:function(n){return!n.type.indexOf("key")&&t._k(n.keyCode,"esc",27,n.key,["Esc","Escape"])?null:t.close.apply(null,arguments)}}},[t._t("backdrop",function(){return[t.backdrop&&t.isDisplaying?r("div",{ref:"backdrop",staticClass:"modal-backdrop fade",class:{show:t.isShowing},on:{click:function(n){t.closeable&&t.close}}}):t._e()]}),r("div",{ref:"dialog",staticClass:"modal-dialog",class:{"modal-dialog-centered":t.center}},[r("div",{ref:"content",staticClass:"modal-content"},[t._t("header",function(){return[r("div",{staticClass:"modal-header"},[t._t("title",function(){return[t.title?r("h3",{staticClass:"modal-title"},[t._v(" "+t._s(t.title)+" ")]):t._e()]}),t._t("close-button",function(){return[t.closeable?r("button",{ref:"close",staticClass:"close",attrs:{type:"button","data-dismiss":"modal","aria-label":"Close",disabled:t.isClosing},on:{click:t.close}},[r("span",{attrs:{"aria-hidden":"true"}},[t._v("\xD7")])]):t._e()]})],2)]}),t._t("body",function(){return[r("div",{staticClass:"modal-body"},[t._t("default")],2)]}),t._t("footer",function(){return[t.type||t.currentButtons.length?r("div",{ref:"footer",staticClass:"modal-footer"},[r("div",{staticClass:"modal-footer-buttons"},[t.type==="alert"?[r("btn",t._g(t._b({ref:"confirm"},"btn",t.currentButtons.confirm.attributes,!1),t.currentButtons.confirm.listeners))]:t.type==="confirm"?[r("btn",t._g(t._b({ref:"confirm"},"btn",t.currentButtons.confirm.attributes,!1),t.currentButtons.confirm.listeners)),r("btn",t._g(t._b({ref:"cancel"},"btn",t.currentButtons.cancel.attributes,!1),t.currentButtons.cancel.listeners))]:t._l(t.customButtons,function(n,i){return r("btn",t._g(t._b({key:"btn-"+i},"btn",n.attributes,!1),n.listeners))})],2)]):t._e()]},{close:t.close})],2)])],2)},G=[],ft="";const W={name:"Modal",components:{Btn:Z},mixins:[X],props:{backdrop:{type:Boolean,default:!0},center:Boolean,closeable:{type:Boolean,default:!0},title:String,type:{type:[Boolean,String],default:!1,validate(t){return["alert","confirm"].indexOf(t)!==-1}}},watch:{isShowing(t){document.querySelector("body").classList[t?"add":"remove"]("modal-open")}},beforeRouteLeave(){this.close()}},O={};var q=w(W,U,G,!1,K,null,null,null);function K(t){for(let e in O)this[e]=O[e]}var v=function(){return q.exports}(),V=function(e){return Y(e)&&!J(e)};function Y(t){return!!t&&typeof t=="object"}function J(t){var e=Object.prototype.toString.call(t);return e==="[object RegExp]"||e==="[object Date]"||et(t)}var Q=typeof Symbol=="function"&&Symbol.for,tt=Q?Symbol.for("react.element"):60103;function et(t){return t.$$typeof===tt}function rt(t){return Array.isArray(t)?[]:{}}function b(t,e){return e.clone!==!1&&e.isMergeableObject(t)?p(rt(t),t,e):t}function nt(t,e,r){return t.concat(e).map(function(n){return b(n,r)})}function it(t,e){if(!e.customMerge)return p;var r=e.customMerge(t);return typeof r=="function"?r:p}function st(t){return Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(t).filter(function(e){return t.propertyIsEnumerable(e)}):[]}function P(t){return Object.keys(t).concat(st(t))}function S(t,e){try{return e in t}catch{return!1}}function at(t,e){return S(t,e)&&!(Object.hasOwnProperty.call(t,e)&&Object.propertyIsEnumerable.call(t,e))}function ot(t,e,r){var n={};return r.isMergeableObject(t)&&P(t).forEach(function(i){n[i]=b(t[i],r)}),P(e).forEach(function(i){at(t,i)||(S(t,i)&&r.isMergeableObject(e[i])?n[i]=it(i,r)(t[i],e[i],r):n[i]=b(e[i],r))}),n}function p(t,e,r){r=r||{},r.arrayMerge=r.arrayMerge||nt,r.isMergeableObject=r.isMergeableObject||V,r.cloneUnlessOtherwiseSpecified=b;var n=Array.isArray(e),i=Array.isArray(t),o=n===i;return o?n?r.arrayMerge(t,e,r):ot(t,e,r):b(e,r)}p.all=function(e,r){if(!Array.isArray(e))throw new Error("first argument should be an array");return e.reduce(function(n,i){return p(n,i,r)},{})};var lt=p,ct=lt;class M{constructor(e,r={}){this.$vue=e}register(e,r){return this[e]=(n,i,o={})=>{const s=this.$vue.extend(v);return new Promise((d,a)=>{new s(Object.assign({el:document.body.appendChild(document.createElement("div")),render(l){return r((c,...f)=>{if(typeof c=="function"){const[u,y]=c();return[l(u,y)]}return typeof c=="string"?c:l(c,...f)},{resolve:d,reject:a},n,i,Object.assign({},o))}}))})}}}function _(t,e){return(...r)=>{e(t,...r)}}function ut(t,e={}){t.prototype.$modal=new M(t,e),t.prototype.$modal.register("alert",(r,{resolve:n},i,o,s)=>r(v,{props:{show:!0,title:i,type:"alert"},on:{close:()=>n()}},r(o,s))),t.prototype.$modal.register("confirm",(r,{resolve:n},i,o,s)=>{let d=!1;const a=(l,c)=>{l(d=typeof c=="undefined"?d:!!c)};return r(v,ct({props:{show:!0,title:i,type:"confirm"},on:{cancel:(l,c,f,u)=>{typeof s.cancel=="function"&&s.cancel(l,c,f,_(u,a))},close:(l,c,f,u)=>{typeof s.close=="function"?s.close(l,c,f,_(u,a)):n(d)},confirm:(l,c,f,u)=>{d=!0,typeof s.confirm=="function"&&s.confirm(l,c,f,_(u,a))}}},s),r(o,s))})}h.Modal=v,h.ModalFactory=M,h.ModalPlugin=ut,Object.defineProperties(h,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});
