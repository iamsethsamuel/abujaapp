(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[824],{8657:function(e,a,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/updateprofile",function(){return t(1213)}])},1213:function(e,a,t){"use strict";t.r(a),t.d(a,{default:function(){return u}});var n=t(5893),r=t(7294),s=t(2672),l=t(1438),o=t(8484);function u(e){var a,t=(0,r.useContext)(o.Context),u=null!==(a=t.user)&&void 0!==a?a:{},d=(0,r.useState)(""),i=d[0],c=d[1],m=(0,r.useState)(!1),p=(m[0],m[1]),f=(0,r.useState)("Password must contain an upper and lowercase letter, number and a symbol"),h=f[0],w=f[1];return(0,r.useEffect)((function(){document.title="Update Profile"}),[]),(0,n.jsx)("div",{className:"fullscreen",children:(0,n.jsx)("div",{className:"w-full h-full max-w-xs max-w-lg max-w-xl mt-12",children:(0,n.jsxs)("form",{className:"bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4",onSubmit:function(e){e.preventDefault(),c(""),t.showLoader();var a=new FormData(e.target),n={};a.forEach((function(e,a){n[a]=e})),(0,l.j0)("/updateprofile",n).then((function(e){t.hideLoader(),e.data?document.location="/profile":c(e.err)}))},children:[(0,n.jsx)("p",{className:"text-md mb-8 text-red-500 ",children:i}),(0,n.jsx)(s.UP,{defaultValue:u.email,id:"email",required:!0,type:"email",label:"Email",placeholder:"Enter Email",name:"email"}),(0,n.jsx)(s.UP,{defaultValue:u.name,required:!0,id:"name",type:"name",label:"First and Last name",placeholder:"Enter First and Last name",name:"name"}),(0,n.jsx)(s.UP,{required:!0,defaultValue:u.picture,id:"picture",type:"url",label:"Picture URL",placeholder:"Enter a URL of your picture",name:"picture"}),(0,n.jsx)(s.UP,{id:"password",label:"Password",placeholder:"Enter Password",name:"password",type:"password",onChange:function(e){var a=e.target.value;a.length>=1&&a.length<8?w("Password is too short"):(w(null),a.match(/^(?=.*\d)/)?(w(null),a.match(/(?=.*[A-Z])/)?(w(null),a.match(/(?=.*[a-z])/)?(w(null),a.match(/(?=.*[_,!,$,_,*,(,),-,&,%,=,+])/)?w(null):w("Password must contain a symbol")):w("Password must contain an lowercase character")):w("Password must contain an Uppercase character")):w("Password must contain number"))},info:h}),(0,n.jsx)(s.UP,{id:"confirmpassword",label:"Confirm Password",placeholder:"Confirm Password",type:"password",onChange:function(e){document.getElementById("password").value===e.target.value?p(!0):p(!1)}}),(0,n.jsx)(s.zx,{type:"submit",style:{width:"100%"},children:"Update"})]})})})}}},function(e){e.O(0,[774,888,179],(function(){return a=8657,e(e.s=a);var a}));var a=e.O();_N_E=a}]);