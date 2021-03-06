import Vue from 'vue';
import Spinner from 'vue-simple-spinner';

//
var script = {
  name: 'Snackbard',
  components: { Spinner: Spinner },
  extends: Vue,
  props: {
    buttonText: {
      type: String,
      required: false,
      default: 'close'
    },
    buttonColor: {
      type: String,
      required: false,
      default: 'white'
    },
    color: {
      type: String,
      required: false,
      default: ''
    },
    id: {
      type: String,
      required: true
    },
    loading: {
      type: Boolean,
      required: false,
      default: false
    },
    position: {
      type: String,
      required: false,
      default: 'top',
      validator: function (value) {
        return ['top', 'bottom'].includes(value)
      }
    },
    spinnerColor: {
      type: String,
      required: false,
      default: '#ffffff'
    },
    spinnerSize: {
      type: String,
      required: false,
      default: '24'
    },
    text: {
      type: String,
      required: false,
      default: ''
    },
    timeout: {
      type: Number,
      required: false,
      default: 3000
    },
    transitionTime: {
      type: Number,
      required: true
    },
    onClick: {
      type: Function,
      required: false,
      default: function () {}
    }
  },
  data: function data () {
    return {
      show: false
    }
  },
  computed: {
    computedBackgroundColor: function computedBackgroundColor () {
      return ("background-color: " + (this.backgroundColor) + ";")
    },
    backgroundColor: function backgroundColor () {
      if (this.color === 'success') { return ' #67ac5b' }
      else if (this.color === 'error') { return '#ed5f59' }
      else if (this.color === 'warning') { return '#f7c244' }
      else if (this.color === 'info') { return '#4496ec' }
      else if (this.color) { return this.color }
      else { return '#2c2c2c' }
    },
    computedLoadingText: function computedLoadingText () {
      if (this.text) { return this.text }
      else { return 'Loading...' }
    },
    defaultText: function defaultText () {
      if (this.loading) { return 'Loading...' }
      else { return '' }
    }
  },
  created: function created () {
    var this$1 = this;

    setTimeout(function () {
      this$1.show = true;
      if (!this$1.loading && this$1.timeout !== 0) {
        setTimeout(function () {
          this$1.show = false;
        }, this$1.timeout);
      }
    }, this.transitionTime);
  },
  methods: {
    fireClickEvent: function fireClickEvent () {
      this.show = false;
      this.onClick();
      this.$emit('close');
    }
  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    var options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    var hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            var originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            var existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

var isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return function (id, style) { return addStyle(id, style); };
}
var HEAD;
var styles = {};
function addStyle(id, css) {
    var group = isOldIE ? css.media || 'default' : id;
    var style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        var code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                { style.element.setAttribute('media', css.media); }
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            var index = style.ids.size - 1;
            var textNode = document.createTextNode(code);
            var nodes = style.element.childNodes;
            if (nodes[index])
                { style.element.removeChild(nodes[index]); }
            if (nodes.length)
                { style.element.insertBefore(textNode, nodes[index]); }
            else
                { style.element.appendChild(textNode); }
        }
    }
}

/* script */
var __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"__snackbardContainer",class:{ '__snackbardTop': _vm.position === 'top', '__snackbardBottom': _vm.position === 'bottom' },attrs:{"id":_vm.id}},[_c('transition-group',{attrs:{"name":"fade"}},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.show),expression:"show"}],key:("snackbard_key_" + _vm.id),staticClass:"__snackbardBox",style:(_vm.computedBackgroundColor)},[_c('div',{staticClass:"__snackbardText"},[(_vm.loading)?_c('span',[_vm._v("\n          "+_vm._s(_vm.computedLoadingText)+"\n        ")]):_c('span',[_vm._v("\n          "+_vm._s(_vm.text)+"\n        ")])]),_vm._v(" "),(_vm.loading)?_c('spinner',{attrs:{"size":_vm.spinnerSize,"line-fg-color":_vm.spinnerColor,"line-bg-color":_vm.backgroundColor,"indeterminate":""}}):_c('div',{staticClass:"__snackbardButton",style:(("color: " + _vm.buttonColor + ";")),on:{"click":function($event){return _vm.fireClickEvent()}}},[_vm._v("\n        "+_vm._s(_vm.buttonText)+"\n      ")])],1)])],1)};
var __vue_staticRenderFns__ = [];

  /* style */
  var __vue_inject_styles__ = function (inject) {
    if (!inject) { return }
    inject("data-v-f7964634_0", { source: "@import url(https://fonts.googleapis.com/css?family=Roboto);.__snackbardContainer[data-v-f7964634]{display:flex;flex-direction:row;justify-content:center;align-content:center;width:500px;z-index:1000;position:absolute;left:50%;margin-left:-250px;position:fixed}.__snackbardTop[data-v-f7964634]{top:0}.__snackbardBottom[data-v-f7964634]{bottom:0}.__snackbardBox[data-v-f7964634]{border-radius:3px;display:inline-flex;align-items:center;min-width:250px;max-width:100vw;max-height:80px;padding:14px 24px;display:grid;grid-template-columns:3fr 1fr;grid-template-rows:auto;grid-gap:24px;grid-template-areas:\"text action\";box-shadow:0 1px 10px 0 rgba(0,0,0,.75)}.__snackbardText[data-v-f7964634]{grid-area:text;color:#fff}.__snackbardButton[data-v-f7964634]{grid-area:action;text-transform:uppercase;cursor:pointer;user-select:none;text-align:center}*[data-v-f7964634]{font-family:Roboto}.fade-enter-active[data-v-f7964634],.fade-leave-active[data-v-f7964634]{transition:all .4s ease}.fade-enter[data-v-f7964634],.fade-leave-to[data-v-f7964634]{transform:translateY(-30px);opacity:0}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__ = "data-v-f7964634";
  /* module identifier */
  var __vue_module_identifier__ = undefined;
  /* functional template */
  var __vue_is_functional_template__ = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var snackbard = normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    createInjector,
    undefined,
    undefined
  );

// Import vue component
var transitionTime = 300;
var openSnackbar = {};

// install function executed by Vue.use()
function install (Vue) {
  Vue.prototype.$snackbard = {
    show: function (config) {
      show(Vue, config);
    },
    loading: function (config) {
      if ( config === void 0 ) config = {};

      config.loading = true;
      show(Vue, config);
    },
    cancel: function (config) {
      if ( config === void 0 ) config = {};

      if (config.text && openSnackbar.component) {
        openSnackbar.component.loading = false;
        openSnackbar.component.text = config.text;
        if (config.color) { openSnackbar.component.color = config.color; }
        setTimeout(function () {
          if (openSnackbar.component) { openSnackbar.component.show = false; }
          if (openSnackbar.id) { destroy({ id: openSnackbar.id, force: true }); }
        }, 3000);
        destroy({ id: openSnackbar.id });
      } else {
        if (openSnackbar.component) { openSnackbar.component.show = false; }
        if (openSnackbar.id && snackbardIsAlreadyOpen()) {
          destroy({ id: openSnackbar.id, force: true });
        }
      }
    },
    success: function (config) {
      if ( config === void 0 ) config = {};

      if (!config.text) { config.text = 'Success!'; }
      config.color = 'success';
      show(Vue, config);
    },
    error: function (config) {
      if ( config === void 0 ) config = {};

      if (!config.text) { config.text = 'Error!'; }
      config.color = 'error';
      show(Vue, config);
    }
  };
}

function show (Vue, config) {
  if (!snackbardIsAlreadyOpen()) {
    var snackbardDivId = '__sn_snackbard';
    var snackbardDiv = document.createElement('div');
    snackbardDiv.id = snackbardDivId;
    document.body.appendChild(snackbardDiv);
    var Snackbar = Vue.extend(snackbard);
    var component = new Snackbar({
      propsData: {
        buttonColor: config.buttonColor,
        buttonText: config.buttonText,
        color: config.color,
        id: snackbardDivId,
        loading: config.loading,
        position: config.position,
        spinnerSize: config.spinnerSize,
        spinnerColor: config.spinnerColor,
        text: config.text,
        timeout: config.timeout,
        transitionTime: transitionTime,
        onClick: config.onClick
      }
    });
    openSnackbar.id = snackbardDivId;
    openSnackbar.component = component;
    component.$on('close', function (_) { return destroy({ id: snackbardDivId, force: true }); });
    component.$mount(("#" + snackbardDivId));
    if (!config.loading && config.timeout !== 0) { destroy({ id: snackbardDivId, timeout: config.timeout }); }
  }
}

function destroy (ref) {
  var id = ref.id;
  var timeout = ref.timeout; if ( timeout === void 0 ) timeout = 4000;
  var force = ref.force; if ( force === void 0 ) force = false;

  var deleteTimeout;
  if (force) { deleteTimeout = transitionTime; }
  else if (timeout) { deleteTimeout = timeout + transitionTime; }
  var el = document.getElementById(id);
  if (el) {
    setTimeout(function () {
      if (!('remove' in Element.prototype)) {
        if (el.parentNode) { el.parentNode.removeChild(el); }
      } else { el.remove(); }
      openSnackbar = {};
    }, deleteTimeout);
  }
}

function snackbardIsAlreadyOpen () {
  return document.querySelectorAll('[id^="__sn_snackbard"]').length > 0
}

// Create module definition for Vue.use()
var plugin = {
  install: install,
};

// To auto-install when vue is found
/* global window global */
var GlobalVue = null;
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue;
}
if (GlobalVue) {
  GlobalVue.use(plugin);
}

// Inject install function into component - allows component
// to be registered via Vue.use() as well as Vue.component()
snackbard.install = install;

// It's possible to expose named exports when writing components that can
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo'
// export const RollupDemoDirective = component

export default snackbard;
