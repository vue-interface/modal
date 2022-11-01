(function(i,t){typeof exports=="object"&&typeof module<"u"?t(exports,require("vue")):typeof define=="function"&&define.amd?define(["exports","vue"],t):(i=typeof globalThis<"u"?globalThis:i||self,t(i.Modal={},i.Vue))})(this,function(i,t){"use strict";const g={name:"Btn",mixins:[{props:{componentPrefix:String,size:String,sizePrefix:String},computed:{sizeableClassPrefix(){return this.sizePrefix||this.componentPrefix},hasSizeablePrefix(){return this.size&&!!this.size.match(new RegExp(`^${this.sizeableClassPrefix}`))},sizeableClass(){return this.size?!this.sizeableClassPrefix||this.hasSizeablePrefix?this.size:`${this.sizeableClassPrefix}-${this.size}`:""}}},{props:{componentPrefix:String,variant:String,variantPrefix:String},computed:{variantClassPrefix(){return this.variantPrefix||this.componentPrefix},hasVariantPrefix(){return this.variant&&!!this.variant.match(new RegExp(`^${this.variantClassPrefix}`))},variantClass(){return this.variant?!this.variantClassPrefix||this.hasVariantPrefix?this.variant:`${this.variantClassPrefix}-${this.variant}`:""}}}],props:{active:Boolean,block:Boolean,componentPrefix:{type:String,default:"btn"},disabled:Boolean,label:String,outline:Boolean,tag:String,variant:{type:String,default:"primary"}},computed:{classes(){return["btn",this.variantClass,this.sizeableClass,this.active&&"active",this.block&&"btn-block",this.disabled&&"disabled"]},component(){return this.tag?this.tag:this.$attrs.href?"a":"button"},variantClassPrefix(){return(this.variantPrefix||this.componentPrefix)+(this.outline?"-outline":"")}}},p=(e,n)=>{const s=e.__vccOpts||e;for(const[o,r]of n)s[o]=r;return s};function b(e,n,s,o,r,a){return t.openBlock(),t.createBlock(t.resolveDynamicComponent(a.component),t.mergeProps(e.$attrs,{disabled:s.disabled,class:a.classes,role:"button"}),{default:t.withCtx(()=>[t.renderSlot(e.$slots,"default",{},()=>[t.createTextVNode(t.toDisplayString(s.label),1)])]),_:3},16,["disabled","class"])}const y=p(g,[["render",b]]);var d={px:{px:1,cm:96/2.54,mm:96/25.4,in:96,pt:96/72,pc:16},cm:{px:2.54/96,cm:1,mm:.1,in:2.54,pt:2.54/72,pc:2.54/6},mm:{px:25.4/96,cm:10,mm:1,in:25.4,pt:25.4/72,pc:25.4/6},in:{px:1/96,cm:1/2.54,mm:1/25.4,in:1,pt:1/72,pc:1/6},pt:{px:.75,cm:72/2.54,mm:72/25.4,in:72,pt:1,pc:12},pc:{px:6/96,cm:6/2.54,mm:6/25.4,in:6,pt:6/72,pc:1},deg:{deg:1,grad:.9,rad:180/Math.PI,turn:360},grad:{deg:400/360,grad:1,rad:200/Math.PI,turn:400},rad:{deg:Math.PI/180,grad:Math.PI/200,rad:1,turn:Math.PI*2},turn:{deg:1/360,grad:1/400,rad:.5/Math.PI,turn:1},s:{s:1,ms:1/1e3},ms:{s:1e3,ms:1},Hz:{Hz:1,kHz:1e3},kHz:{Hz:1/1e3,kHz:1},dpi:{dpi:1,dpcm:1/2.54,dppx:1/96},dpcm:{dpi:2.54,dpcm:1,dppx:2.54/96},dppx:{dpi:96,dpcm:96/2.54,dppx:1}},C=function(e,n,s,o){if(!d.hasOwnProperty(s))throw new Error("Cannot convert to "+s);if(!d[s].hasOwnProperty(n))throw new Error("Cannot convert from "+n+" to "+s);var r=d[s][n]*e;return o!==!1?(o=Math.pow(10,parseInt(o)||5),Math.round(r*o)/o):r};const B={name:"Modal",components:{Btn:y},mixins:[{props:{buttons:{type:[Boolean,Array],default:void 0,validate(e){return Array.isArray(e)||!e}},cancel:{type:Function,default(e,n,s,o){o(!1)}},cancelButton:Object,confirm:{type:Function,default(e,n,s,o){o(!0)}},confirmButton:Object,resolve:{type:Function,default(e,n,s,o){s.close()}},show:{type:Boolean,defaut:!1}},setup(e){console.log("setup")},methods:{focus(){this.$el.focus()},close(e){return new Promise(n=>{e=e||new Event("close",{cancelable:!0});const s=()=>{this.isClosing=!0,this.isShowing=!1,this.transition(()=>{this.isClosing=!1,this.isDisplaying=!1,this.$emit("closed",e),n(this)})};this.$emit("close",e,this.$refs.close,this,s),e.defaultPrevented||s()})},buttonAttributes(e){return Object.assign({class:null,disabled:!1,size:"md",variant:"primary"},Object.fromEntries(Object.entries(e).filter(([n,s])=>!n.match(/^on[A-Z]/))))},getCurrentButtons(){if(Array.isArray(this.buttons))return t.ref(this.buttons).value.map(e=>{const n=e.onClick;return Object.assign(e,{onClick:s=>n(s,e,this,(...o)=>this.resolve(s,e,this,...o))})});if(this.type==="alert")return[this.computedConfirmButton];if(this.type==="confirm")return[this.computedConfirmButton,this.computedCancelButton]},open(){return new Promise(e=>{const n=new Event("close",{cancelable:!0}),s=()=>{this.isDisplaying=!0,setTimeout(()=>{this.isShowing=!0,this.transition(()=>{this.$emit("opened"),e(this)})})};this.$emit("open",n,s),n.defaultPrevented||s()})},transition(e){const s=getComputedStyle(this.$refs.dialog).transitionDuration.split(",").map(o=>{const[r,a,l]=o.trim().match(/^([\d.]+)(\w+)$/);return C(parseFloat(a),l,"ms")}).sort((o,r)=>o-r).shift();return setTimeout(e,s)},toggle(){this.isShowing?this.close():this.open()}},computed:{triggerableClasses(){return{show:this.isShowing}},computedCancelButton(){return this.cancelButton||{variant:"secondary",label:"Cancel",name:"confirm",onClick:(e,n,s)=>{this.cancel(e,n,s,(...o)=>{this.resolve(e,n,s,...o)})}}},computedConfirmButton(){return this.confirmButton||{variant:"primary",label:"Confirm",name:"confirm",onClick:(e,n,s)=>{this.confirm(e,n,s,(...o)=>{this.resolve(e,n,s,...o)})}}}},watch:{isShowing(e){e&&this.focus()},show(e){e&&this.open()}},mounted(){this.show&&this.open()},data(){return{currentButtons:this.getCurrentButtons(),isClosing:!1,isShowing:!1,isDisplaying:!1}}}],props:{backdrop:{type:Boolean,default:!0},center:Boolean,closeable:{type:Boolean,default:!0},footer:{type:Boolean,default:!0},title:String,type:{type:[Boolean,String],default:!1,validate(e){return["alert","confirm"].indexOf(e)!==-1}}},watch:{isShowing(e){document.querySelector("body").classList[e?"add":"remove"]("modal-open")}},beforeRouteLeave(){this.close()}},j="",P={ref:"content",class:"modal-content"},k={class:"modal-header"},S={key:0,class:"modal-title"},w=["disabled"],$=[t.createElementVNode("span",{"aria-hidden":"true"},"\xD7",-1)],_={class:"modal-body"},x={key:0,ref:"footer",class:"modal-footer"},z={class:"modal-footer-buttons"};function E(e,n,s,o,r,a){const l=t.resolveComponent("btn");return t.openBlock(),t.createElementBlock("div",{class:t.normalizeClass(["modal fade",{...e.triggerableClasses}]),style:t.normalizeStyle({display:e.isDisplaying?"block":"none"}),tabindex:"-1",onKeydown:n[2]||(n[2]=t.withKeys((...c)=>e.close&&e.close(...c),["esc"]))},[t.renderSlot(e.$slots,"backdrop",{},()=>[s.backdrop&&e.isDisplaying?(t.openBlock(),t.createElementBlock("div",{key:0,ref:"backdrop",class:t.normalizeClass(["modal-backdrop fade",{show:e.isShowing}]),onClick:n[0]||(n[0]=c=>s.closeable&&e.close)},null,2)):t.createCommentVNode("",!0)]),t.createElementVNode("div",{ref:"dialog",class:t.normalizeClass(["modal-dialog",{"modal-dialog-centered":s.center}])},[t.createElementVNode("div",P,[t.renderSlot(e.$slots,"header",{},()=>[t.createElementVNode("div",k,[t.renderSlot(e.$slots,"title",{},()=>[s.title?(t.openBlock(),t.createElementBlock("h3",S,t.toDisplayString(s.title),1)):t.createCommentVNode("",!0)]),t.renderSlot(e.$slots,"close-button",{},()=>[s.closeable?(t.openBlock(),t.createElementBlock("button",{key:0,ref:"close",type:"button",class:"close","data-dismiss":"modal","aria-label":"Close",disabled:e.isClosing,onClick:n[1]||(n[1]=(...c)=>e.close&&e.close(...c))},$,8,w)):t.createCommentVNode("",!0)])])]),t.renderSlot(e.$slots,"body",{},()=>[t.createElementVNode("div",_,[t.renderSlot(e.$slots,"default")])]),s.footer?t.renderSlot(e.$slots,"footer",{key:0,close:e.close},()=>[e.currentButtons.length?(t.openBlock(),t.createElementBlock("div",x,[t.createElementVNode("div",z,[e.currentButtons.length?(t.openBlock(!0),t.createElementBlock(t.Fragment,{key:0},t.renderList(e.currentButtons,(c,h)=>(t.openBlock(),t.createBlock(l,t.mergeProps({key:`btn-${h}`},c),null,16))),128)):t.createCommentVNode("",!0)])],512)):t.createCommentVNode("",!0)]):t.createCommentVNode("",!0)],512)],2)],38)}const m=p(B,[["render",E]]);class u{constructor(n){this.app=n}mount(n){n.appContext=this.app._context;const s=document.createElement("div");t.render(t.h(n),s),document.body.append(s)}register(n,s){Object.defineProperty(this,n,{value:(o,r,a)=>{const l=new Promise((c,h)=>{this.mount(s({props:a,title:o,resolve:f=>(c(f),l),reject:f=>(h(f),l),promise:()=>l,content:typeof r=="string"?t.h("div",r):r(this.app,a)}))});return l}})}}const M=e=>{const n=new u(e);n.register("alert",({title:s,content:o,props:r})=>t.h(m,Object.assign({title:s,show:!0,type:"alert"},r),{default:()=>t.h(o,{ref:"content"})})),n.register("confirm",({title:s,content:o,props:r})=>t.h(m,Object.assign({title:s,show:!0,type:"confirm"},r),{default:()=>t.h(o,{ref:"content"})})),e.provide("modal",n),e.provide("modal",e.config.globalProperties.$modal=n)};i.Modal=m,i.ModalFactory=u,i.ModalPlugin=M,Object.defineProperties(i,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});
