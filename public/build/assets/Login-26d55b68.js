import{_ as g,r as b,j as t,a as e,n as x,d as w}from"./app-64c982be.js";import{L as v}from"./Layout-6d96430f.js";import{I as d}from"./InputLabel-d9522ba0.js";import{T as c}from"./TextInput-dddb97b9.js";import{F as y}from"./FzSwitch-232e24b0.js";import"./logo-ec0c8240.js";import"./FzToastContainer-89ae0283.js";import"./iconBase-1b0b194b.js";import"./FzToast-42bf12ec.js";import"./bubble_warning-9cee2399.js";import"./bubble_infos-3d3cb710.js";import"./motion-1cf8eba9.js";import"./Dropdown-4d4f6aeb.js";import"./index.esm-7b472f02.js";import"./comments-7ee1c3c3.js";import"./keyboard-9254f896.js";import"./transition-9f144381.js";import"./index-93f0ac29.js";/* empty css            */import"./twitch-d7bb7fb3.js";import"./switch-a39a5741.js";function M(s,{status:i,canResetPassword:p}){const{data:a,setData:l,post:u,processing:o,errors:N,reset:f}=g({email:"",password:"",remember:!1,_token:s.csrf_token});b.useEffect(()=>()=>{f("password")},[]);const m=r=>{l(r.target.name,r.target.type==="checkbox"?r.target.checked:r.target.value)},h=r=>{r.preventDefault(),u(route("login"))};let n="Se connecter";return t(v,{title:n,props:s,children:[e(x,{title:n}),i&&e("div",{className:"mb-4 font-medium text-sm text-green-600",children:i}),t("form",{className:"2xl:mx-[260px] flex flex-col gap-12",onSubmit:h,children:[t("div",{className:"flex flex-col gap-6",children:[t("div",{children:[e(d,{forInput:"email",value:"Email"}),e(c,{id:"email",type:"email",name:"email",value:a.email,className:"mt-1 block w-full",autoComplete:"username",placeholder:"bob@frazionz.net",disabled:o,isFocused:!0,handleChange:m})]}),t("div",{children:[e(d,{forInput:"password",value:"Password"}),e(c,{id:"password",type:"password",name:"password",value:a.password,disabled:o,placeholder:"***************",className:"mt-1 block w-full",autoComplete:"current-password",handleChange:m})]}),e("div",{children:e(y,{checked:a.remember,disabled:o,label:"Rester connecté",onChange:r=>{l("remember",r)}})})]}),t("div",{className:"flex items-center justify-center",children:[p&&e(w,{href:route("password.request"),className:"underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",children:"Forgot your password?"}),e("button",{className:"btn",disabled:o,children:"Se connecter"})]})]})]})}export{M as default};
