(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/my/my"],{"0441":function(n,t,o){"use strict";o.r(t);var e=o("ca53"),r=o("93c2");for(var a in r)"default"!==a&&function(n){o.d(t,n,(function(){return r[n]}))}(a);o("5a1f");var s,i=o("f0c5"),u=Object(i["a"])(r["default"],e["b"],e["c"],!1,null,null,null,!1,e["a"],s);t["default"]=u.exports},"3ee8":function(n,t,o){},"5a1f":function(n,t,o){"use strict";var e=o("3ee8"),r=o.n(e);r.a},"70f1":function(n,t,o){"use strict";(function(n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o={data:function(){return{hasUserInfo:!1,form:{username:"",password:"",avatarUrl:""}}},onLoad:function(){console.log("用户信息存在否",this.$store.state.loginInfo),this.$store.state.loginInfo&&(this.hasUserInfo=!0)},onShow:function(){},computed:{loginInfo:function(){return this.$store.state.loginInfo},avatarUrl:function(){return this.hasUserInfo?this.$store.state.loginInfo.avatarUrl:"/static/img/avatar.png"}},methods:{getUserProfile:function(){var n=this;wx.getUserProfile({desc:"获取您的头像和昵称",success:function(t){console.log("点击授权获取头像和昵称",t);var o={username:t.userInfo.nickName,avatarUrl:t.userInfo.avatarUrl,password:"mimashishenme"};n.register(o),n.login(o)}})},register:function(n){this.$post("/1.1/users",n).then((function(n){console.log("注册成功",n)})).catch((function(){console.log("注册失败")}))},login:function(t){var o=this;this.$post("/1.1/login",t).then((function(t){console.log("登陆成功",t),t.data.code?n.showToast({title:t.data.error,icon:"error\t"}):(o.$store.commit("set_loginInfo",t.data),o.hasUserInfo=!0)})).catch((function(n){return console.log("登陆失败",n)}))},logout:function(){this.hasUserInfo?(this.hasUserInfo=!1,this.$store.commit("set_loginInfo","")):this.getUserProfile()}}};t.default=o}).call(this,o("543d")["default"])},"86bd":function(n,t,o){"use strict";(function(n){o("744a");e(o("66fd"));var t=e(o("0441"));function e(n){return n&&n.__esModule?n:{default:n}}wx.__webpack_require_UNI_MP_PLUGIN__=o,n(t.default)}).call(this,o("543d")["createPage"])},"93c2":function(n,t,o){"use strict";o.r(t);var e=o("70f1"),r=o.n(e);for(var a in e)"default"!==a&&function(n){o.d(t,n,(function(){return e[n]}))}(a);t["default"]=r.a},ca53:function(n,t,o){"use strict";o.d(t,"b",(function(){return r})),o.d(t,"c",(function(){return a})),o.d(t,"a",(function(){return e}));var e={uNavbar:function(){return Promise.all([o.e("common/vendor"),o.e("uni_modules/uview-ui/components/u-navbar/u-navbar")]).then(o.bind(null,"f54b"))}},r=function(){var n=this,t=n.$createElement;n._self._c},a=[]}},[["86bd","common/runtime","common/vendor"]]]);