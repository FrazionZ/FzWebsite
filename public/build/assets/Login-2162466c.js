import{a as e,_ as g,r as b,j as t,n as x,d as w}from"./app-36574797.js";import{L as y}from"./Layout-51a0ccc0.js";import{I as l}from"./InputLabel-78737940.js";import{T as c}from"./TextInput-7641731a.js";import"./logo-ec0c8240.js";import"./FzToastContainer-b6b01518.js";import"./FzToast-ee7cf2bf.js";import"./bubble_warning-38724665.js";import"./bubble_infos-2d9e4d74.js";import"./motion-0558cbd3.js";import"./Dropdown-ca68c6cd.js";import"./iconBase-2a0d2d51.js";import"./index-4d3ed913.js";/* empty css            */import"./twitch-ab40ca14.js";function N({name:o,value:s,handleChange:n}){return e("input",{type:"checkbox",name:o,value:s,className:"rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500",onChange:a=>n(a)})}function z(o,{status:s,canResetPassword:n}){const{data:a,setData:d,post:u,processing:p,errors:v,reset:f}=g({email:"",password:"",remember:"",_token:o.csrf_token});b.useEffect(()=>()=>{f("password")},[]);const m=r=>{d(r.target.name,r.target.type==="checkbox"?r.target.checked:r.target.value)},h=r=>{r.preventDefault(),u(route("login"))};let i="Se connecter";return t(y,{title:i,props:o,children:[e(x,{title:i}),s&&e("div",{className:"mb-4 font-medium text-sm text-green-600",children:s}),t("form",{onSubmit:h,children:[t("div",{children:[e(l,{forInput:"email",value:"Email"}),e(c,{id:"email",type:"email",name:"email",value:a.email,className:"mt-1 block w-full",autoComplete:"username",isFocused:!0,handleChange:m})]}),t("div",{className:"mt-4",children:[e(l,{forInput:"password",value:"Password"}),e(c,{id:"password",type:"password",name:"password",value:a.password,className:"mt-1 block w-full",autoComplete:"current-password",handleChange:m})]}),e("div",{className:"block mt-4",children:t("label",{className:"flex items-center",children:[e(N,{name:"remember",value:a.remember,handleChange:m}),e("span",{className:"ml-2 text-sm text-gray-600",children:"Remember me"})]})}),t("div",{className:"flex items-center justify-end mt-4",children:[n&&e(w,{href:route("password.request"),className:"underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",children:"Forgot your password?"}),e("button",{className:"btn",disabled:p,children:"Se connecter"})]})]})]})}export{z as default};
