(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["uni_modules/uview-ui/components/u-collapse-item/u-collapse-item"],{"2e59":function(n,t,e){"use strict";e.r(t);var i=e("9a6f"),u=e("c356");for(var a in u)"default"!==a&&function(n){e.d(t,n,(function(){return u[n]}))}(a);e("d089");var r,o=e("f0c5"),c=Object(o["a"])(u["default"],i["b"],i["c"],!1,null,"3e34adf6",null,!1,i["a"],r);t["default"]=c.exports},5179:function(n,t,e){"use strict";(function(n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=a(e("a34a")),u=a(e("999f"));function a(n){return n&&n.__esModule?n:{default:n}}function r(n,t,e,i,u,a,r){try{var o=n[a](r),c=o.value}catch(s){return void e(s)}o.done?t(c):Promise.resolve(c).then(i,u)}function o(n){return function(){var t=this,e=arguments;return new Promise((function(i,u){var a=n.apply(t,e);function o(n){r(a,i,u,o,c,"next",n)}function c(n){r(a,i,u,o,c,"throw",n)}o(void 0)}))}}var c={name:"u-collapse-item",mixins:[n.$u.mpMixin,n.$u.mixin,u.default],data:function(){return{elId:n.$u.guid(),animationData:{},expanded:!1,showBorder:!1,animating:!1,parentData:{accordion:!1,border:!1}}},watch:{expanded:function(n){var t=this;clearTimeout(this.timer),this.timer=null,this.timer=setTimeout((function(){t.showBorder=n}),n?10:290)}},mounted:function(){this.init()},methods:{init:function(){var t=this;if(this.updateParentData(),!this.parent)return n.$u.error("u-collapse-item必须要搭配u-collapse组件使用");var e=this.parent,i=e.value,u=e.accordion;e.children;if(u){if(n.$u.test.array(i))return n.$u.error("手风琴模式下，u-collapse组件的value参数不能为数组");this.expanded=this.name==i}else{if(!n.$u.test.array(i)&&null!==i)return n.$u.error("非手风琴模式下，u-collapse组件的value参数必须为数组");this.expanded=(i||[]).some((function(n){return n==t.name}))}this.$nextTick((function(){this.setContentAnimate()}))},updateParentData:function(){this.getParentData("u-collapse")},setContentAnimate:function(){var t=this;return o(i.default.mark((function e(){var u,a,r;return i.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.queryRect();case 2:u=e.sent,a=t.expanded?u.height:0,t.animating=!0,r=n.createAnimation({timingFunction:"ease-in-out"}),r.height(a).step({duration:t.duration}).step(),t.animationData=r.export(),n.$u.sleep(t.duration).then((function(){t.animating=!1}));case 9:case"end":return e.stop()}}),e)})))()},clickHandler:function(){this.disabled&&this.animating||this.parent&&this.parent.onChange(this)},queryRect:function(){var n=this;return new Promise((function(t){n.$uGetRect("#".concat(n.elId)).then((function(n){t(n)}))}))}}};t.default=c}).call(this,e("543d")["default"])},8969:function(n,t,e){},"9a6f":function(n,t,e){"use strict";e.d(t,"b",(function(){return u})),e.d(t,"c",(function(){return a})),e.d(t,"a",(function(){return i}));var i={uCell:function(){return Promise.all([e.e("common/vendor"),e.e("uni_modules/uview-ui/components/u-cell/u-cell")]).then(e.bind(null,"d288"))},uLine:function(){return Promise.all([e.e("common/vendor"),e.e("uni_modules/uview-ui/components/u-line/u-line")]).then(e.bind(null,"184f"))}},u=function(){var n=this,t=n.$createElement;n._self._c},a=[]},c356:function(n,t,e){"use strict";e.r(t);var i=e("5179"),u=e.n(i);for(var a in i)"default"!==a&&function(n){e.d(t,n,(function(){return i[n]}))}(a);t["default"]=u.a},d089:function(n,t,e){"use strict";var i=e("8969"),u=e.n(i);u.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'uni_modules/uview-ui/components/u-collapse-item/u-collapse-item-create-component',
    {
        'uni_modules/uview-ui/components/u-collapse-item/u-collapse-item-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("2e59"))
        })
    },
    [['uni_modules/uview-ui/components/u-collapse-item/u-collapse-item-create-component']]
]);
