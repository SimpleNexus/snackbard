import t from"vue";import e from"vue-simple-spinner";import{normalizeComponent as o,createInjector as n}from"vue-runtime-helpers";var i=o({render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"__snackbardContainer",class:{__snackbardTop:"top"===t.position,__snackbardBottom:"bottom"===t.position},attrs:{id:t.id}},[o("transition-group",{attrs:{name:"fade"}},[o("div",{directives:[{name:"show",rawName:"v-show",value:t.show,expression:"show"}],key:"snackbard_key_"+t.id,staticClass:"__snackbardBox",style:t.computedBackgroundColor},[o("div",{staticClass:"__snackbardText"},[t.loading?o("span",[t._v("\n          "+t._s(t.computedLoadingText)+"\n        ")]):o("span",[t._v("\n          "+t._s(t.text)+"\n        ")])]),t._v(" "),t.loading?o("spinner",{attrs:{size:t.spinnerSize,"line-fg-color":t.spinnerColor,"line-bg-color":t.backgroundColor,indeterminate:""}}):o("div",{staticClass:"__snackbardButton",style:"color: "+t.buttonColor+";",on:{click:function(e){return t.fireClickEvent()}}},[t._v("\n        "+t._s(t.buttonText)+"\n      ")])],1)])],1)},staticRenderFns:[]},function(t){t&&t("data-v-7f9793e0_0",{source:'@import url(https://fonts.googleapis.com/css?family=Roboto);.__snackbardContainer[data-v-7f9793e0]{display:flex;flex-direction:row;justify-content:center;align-content:center;width:500px;z-index:1000;position:absolute;left:50%;margin-left:-250px;position:fixed}.__snackbardTop[data-v-7f9793e0]{top:0}.__snackbardBottom[data-v-7f9793e0]{bottom:0}.__snackbardBox[data-v-7f9793e0]{border-radius:3px;display:inline-flex;align-items:center;min-width:250px;max-width:500px;max-height:80px;padding:14px 24px;display:grid;grid-template-columns:3fr 1fr;grid-template-rows:auto;grid-gap:24px;grid-template-areas:"text action";box-shadow:0 1px 10px 0 rgba(0,0,0,.75)}.__snackbardText[data-v-7f9793e0]{grid-area:text;color:#fff}.__snackbardButton[data-v-7f9793e0]{grid-area:action;text-transform:uppercase;cursor:pointer;user-select:none;text-align:center}*[data-v-7f9793e0]{font-family:Roboto}.fade-enter-active[data-v-7f9793e0],.fade-leave-active[data-v-7f9793e0]{transition:all .4s ease}.fade-enter[data-v-7f9793e0],.fade-leave-to[data-v-7f9793e0]{transform:translateY(-30px);opacity:0}',map:void 0,media:void 0})},{name:"Snackbard",components:{Spinner:e},extends:t,props:{buttonText:{type:String,required:!1,default:"close"},buttonColor:{type:String,required:!1,default:"white"},color:{type:String,required:!1,default:""},id:{type:String,required:!0},loading:{type:Boolean,required:!1,default:!1},position:{type:String,required:!1,default:"top",validator:function(t){return["top","bottom"].includes(t)}},spinnerColor:{type:String,required:!1,default:"#ffffff"},spinnerSize:{type:String,required:!1,default:"24"},text:{type:String,required:!1,default:""},timeout:{type:Number,required:!1,default:3e3},transitionTime:{type:Number,required:!0},onClick:{type:Function,required:!1,default:function(){}}},data:function(){return{show:!1}},computed:{computedBackgroundColor:function(){return"background-color: "+this.backgroundColor+";"},backgroundColor:function(){return"success"===this.color?" #67ac5b":"error"===this.color?"#ed5f59":"warning"===this.color?"#f7c244":"info"===this.color?"#4496ec":"#2c2c2c"},computedLoadingText:function(){return this.text?this.text:"Loading..."},defaultText:function(){return this.loading?"Loading...":""}},created:function(){var t=this;setTimeout(function(){t.show=!0,t.loading||0===t.timeout||setTimeout(function(){t.show=!1},t.timeout)},this.transitionTime)},methods:{fireClickEvent:function(){this.show=!1,this.onClick(),this.$emit("close")}}},"data-v-7f9793e0",!1,void 0,!1,n,void 0,void 0),r=300,a={};function d(t){t.prototype.$snackbard={show:function(e){s(t,e)},loading:function(e){void 0===e&&(e={}),e.loading=!0,s(t,e)},cancel:function(t){void 0===t&&(t={}),t.text&&a.component?(a.component.loading=!1,a.component.text=t.text,t.color&&(a.component.color=t.color),setTimeout(function(){a.component&&(a.component.show=!1),a.id&&c({id:a.id,force:!0})},3e3),c({id:a.id})):(a.component&&(a.component.show=!1),a.id&&u()&&c({id:a.id,force:!0}))},success:function(e){void 0===e&&(e={}),e.text||(e.text="Success!"),e.color="success",s(t,e)},error:function(e){void 0===e&&(e={}),e.text||(e.text="Error!"),e.color="error",s(t,e)}}}function s(t,e){if(!u()){var o=document.createElement("div");o.id="__sn_snackbard",document.body.appendChild(o);var n=new(t.extend(i))({propsData:{buttonColor:e.buttonColor,buttonText:e.buttonText,color:e.color,id:"__sn_snackbard",loading:e.loading,position:e.position,spinnerSize:e.spinnerSize,spinnerColor:e.spinnerColor,text:e.text,timeout:e.timeout,transitionTime:r,onClick:e.onClick}});a.id="__sn_snackbard",a.component=n,n.$on("close",function(t){return c({id:"__sn_snackbard",force:!0})}),n.$mount("#__sn_snackbard"),e.loading||0===e.timeout||c({id:"__sn_snackbard",timeout:e.timeout})}}function c(t){var e=t.id,o=t.timeout;void 0===o&&(o=4e3);var n,i=t.force;void 0===i&&(i=!1),i?n=r:o&&(n=o+r);var d=document.getElementById(e);d&&setTimeout(function(){"remove"in Element.prototype?d.remove():d.parentNode&&d.parentNode.removeChild(d),a={}},n)}function u(){return document.querySelectorAll('[id^="__sn_snackbard"]').length>0}var l={install:d},p=null;"undefined"!=typeof window?p=window.Vue:"undefined"!=typeof global&&(p=global.Vue),p&&p.use(l),i.install=d;export default i;
