(this["webpackJsonpotsecret-frontend"]=this["webpackJsonpotsecret-frontend"]||[]).push([[0],{32:function(e,t,c){},33:function(e,t,c){},58:function(e,t,c){"use strict";c.r(t);var n=c(0),r=c.n(n),s=c(26),a=c.n(s),j=(c(32),c(33),c(11)),i=c(2),b=c(12),o=c(10),u=c.n(o),l=c(1);function d(){var e=Object(n.useState)(),t=Object(b.a)(e,2),c=t[0],r=t[1],s=Object(n.useRef)(),a=Object(n.useRef)();return Object(l.jsxs)("form",{children:[Object(l.jsx)("label",{children:"Password for secret (3-64 chars)"}),Object(l.jsx)("br",{}),Object(l.jsx)("input",{ref:s,type:"password"}),Object(l.jsx)("br",{}),Object(l.jsx)("label",{children:"Secret message (1-100 characters)"}),Object(l.jsx)("br",{}),Object(l.jsx)("textarea",{ref:a,type:"text"}),Object(l.jsx)("br",{}),Object(l.jsx)("button",{type:"submit",onClick:function(e){e.preventDefault(),u.a.post("".concat(f,"/v1/secret"),{password:s.current.value,message:a.current.value}).then((function(e){r(e.data.id),s.current.value="",a.current.value=""})).catch((function(e){r(null)}))},children:"Create secret"}),function(){if(c){var e="".concat(window.location.href).concat(c);return Object(l.jsxs)(l.Fragment,{children:[Object(l.jsx)("br",{}),Object(l.jsx)("span",{children:"Give this URL to the recipient: "}),Object(l.jsx)("a",{href:e,children:e})]})}return null===c?Object(l.jsx)("span",{children:"failure"}):Object(l.jsx)("span",{})}()]})}function O(){return Object(l.jsx)(d,{})}function h(e){var t=Object(n.useState)(Object(l.jsx)("div",{})),c=Object(b.a)(t,2),r=c[0],s=c[1],a=e.id,i=Object(n.useRef)();return Object(l.jsxs)("form",{children:[Object(l.jsx)(j.b,{to:"/",children:"Go back"}),Object(l.jsx)("br",{}),Object(l.jsxs)("label",{children:["Please enter in a password for secret ID: ",a]}),Object(l.jsx)("br",{}),Object(l.jsx)("input",{type:"password",ref:i}),Object(l.jsx)("button",{type:"submit",onClick:function(e){e.preventDefault(),u.a.post("".concat(f,"/v1/secret/").concat(a),{password:i.current.value}).then((function(e){s(Object(l.jsxs)("div",{children:["Secret message: ",e.data.message]}))})).catch((function(){s(Object(l.jsx)("div",{children:"Failed"}))}))},children:"Submit"}),r]})}function x(e){var t=e.match.params.id;return Object(l.jsx)(h,{id:t})}var f="https://otsecret.herokuapp.com";var p=function(){return Object(l.jsx)(j.a,{children:Object(l.jsxs)(i.c,{children:[Object(l.jsx)(i.a,{exact:!0,path:"/",children:Object(l.jsx)(O,{})}),Object(l.jsx)(i.a,{path:"/:id",component:x})]})})},v=function(e){e&&e instanceof Function&&c.e(3).then(c.bind(null,59)).then((function(t){var c=t.getCLS,n=t.getFID,r=t.getFCP,s=t.getLCP,a=t.getTTFB;c(e),n(e),r(e),s(e),a(e)}))};a.a.render(Object(l.jsx)(r.a.StrictMode,{children:Object(l.jsx)(p,{})}),document.getElementById("root")),v()}},[[58,1,2]]]);
//# sourceMappingURL=main.bce8337b.chunk.js.map