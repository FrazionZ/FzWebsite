import{a as e,_ as g,r as b,j as t,n as x,d as w}from"./app-f243bcb8.js";import{L as y}from"./Layout-1c3f9603.js";import{I as i}from"./InputLabel-36f09279.js";import{T as c}from"./TextInput-8e667271.js";import"./logo-ec0c8240.js";import"./FzToastContainer-6e99986b.js";import"./FzToast-d159b48c.js";import"./Dropdown-0a9b586c.js";/* empty css            */function N({name:s,value:o,handleChange:n}){return e("input",{type:"checkbox",name:s,value:o,className:"rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500",onChange:a=>n(a)})}function F(s,{status:o,canResetPassword:n}){const{data:a,setData:d,post:u,processing:p,errors:v,reset:f}=g({email:"",password:"",remember:"",_token:s.csrf_token});b.useEffect(()=>()=>{f("password")},[]);const m=r=>{d(r.target.name,r.target.type==="checkbox"?r.target.checked:r.target.value)},h=r=>{r.preventDefault(),u(route("login"))};let l="Se connecter";return t(y,{title:l,props:s,children:[e(x,{title:l}),o&&e("div",{className:"mb-4 font-medium text-sm text-green-600",children:o}),t("form",{onSubmit:h,children:[t("div",{children:[e(i,{forInput:"email",value:"Email"}),e(c,{id:"email",type:"email",name:"email",value:a.email,className:"mt-1 block w-full",autoComplete:"username",isFocused:!0,handleChange:m})]}),t("div",{className:"mt-4",children:[e(i,{forInput:"password",value:"Password"}),e(c,{id:"password",type:"password",name:"password",value:a.password,className:"mt-1 block w-full",autoComplete:"current-password",handleChange:m})]}),e("div",{className:"block mt-4",children:t("label",{className:"flex items-center",children:[e(N,{name:"remember",value:a.remember,handleChange:m}),e("span",{className:"ml-2 text-sm text-gray-600",children:"Remember me"})]})}),t("div",{className:"flex items-center justify-end mt-4",children:[n&&e(w,{href:route("password.request"),className:"underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",children:"Forgot your password?"}),e("button",{className:"btn",disabled:p,children:"Se connecter"})]})]})]})}export{F as default};
