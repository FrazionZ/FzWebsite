import{a as e,K as b,r as w,j as r,n as N,f as y}from"./app-abb62592.js";import{L as v}from"./Layout-949668c6.js";import{T as c,I as d}from"./TextInput-426c7382.js";import{I as u}from"./InputLabel-d4f2773c.js";import{P as k}from"./PrimaryButton-607b2873.js";import"./transition-c935a218.js";import"./use-owner-7737dc7c.js";function C({name:t,value:o,handleChange:m}){return e("input",{type:"checkbox",name:t,value:o,className:"rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500",onChange:s=>m(s)})}function S(t,{status:o,canResetPassword:m}){const{data:s,setData:p,post:f,processing:g,errors:l,reset:h}=b({email:"",password:"",remember:"",_token:t.csrf_token});w.useEffect(()=>()=>{h("password")},[]);const n=a=>{p(a.target.name,a.target.type==="checkbox"?a.target.checked:a.target.value)},x=a=>{a.preventDefault(),f(route("login"))};let i="Se connecter";return r(v,{title:i,props:t,children:[e(N,{title:i}),o&&e("div",{className:"mb-4 font-medium text-sm text-green-600",children:o}),r("form",{onSubmit:x,children:[r("div",{children:[e(u,{forInput:"email",value:"Email"}),e(c,{id:"email",type:"email",name:"email",value:s.email,className:"mt-1 block w-full",autoComplete:"username",isFocused:!0,handleChange:n}),e(d,{message:l.email,className:"mt-2"})]}),r("div",{className:"mt-4",children:[e(u,{forInput:"password",value:"Password"}),e(c,{id:"password",type:"password",name:"password",value:s.password,className:"mt-1 block w-full",autoComplete:"current-password",handleChange:n}),e(d,{message:l.password,className:"mt-2"})]}),e("div",{className:"block mt-4",children:r("label",{className:"flex items-center",children:[e(C,{name:"remember",value:s.remember,handleChange:n}),e("span",{className:"ml-2 text-sm text-gray-600",children:"Remember me"})]})}),r("div",{className:"flex items-center justify-end mt-4",children:[m&&e(y,{href:route("password.request"),className:"underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",children:"Forgot your password?"}),e(k,{className:"ml-4",processing:g,children:"Log in"})]})]})]})}export{S as default};
