import{a as e,K as x,r as w,j as s,n as N,f as y}from"./app-76c6f4b8.js";import{L as v}from"./Layout-1c8c67ee.js";import{T as c,I as d}from"./TextInput-a91b2b85.js";import{I as u}from"./InputLabel-6c519989.js";import"./logo-ec0c8240.js";/* empty css            */function k({name:t,value:o,handleChange:n}){return e("input",{type:"checkbox",name:t,value:o,className:"rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500",onChange:r=>n(r)})}function D(t,{status:o,canResetPassword:n}){const{data:r,setData:p,post:f,processing:g,errors:l,reset:h}=x({email:"",password:"",remember:"",_token:t.csrf_token});w.useEffect(()=>()=>{h("password")},[]);const m=a=>{p(a.target.name,a.target.type==="checkbox"?a.target.checked:a.target.value)},b=a=>{a.preventDefault(),f(route("login"))};let i="Se connecter";return s(v,{title:i,props:t,children:[e(N,{title:i}),o&&e("div",{className:"mb-4 font-medium text-sm text-green-600",children:o}),s("form",{onSubmit:b,children:[s("div",{children:[e(u,{forInput:"email",value:"Email"}),e(c,{id:"email",type:"email",name:"email",value:r.email,className:"mt-1 block w-full",autoComplete:"username",isFocused:!0,handleChange:m}),e(d,{message:l.email,className:"mt-2"})]}),s("div",{className:"mt-4",children:[e(u,{forInput:"password",value:"Password"}),e(c,{id:"password",type:"password",name:"password",value:r.password,className:"mt-1 block w-full",autoComplete:"current-password",handleChange:m}),e(d,{message:l.password,className:"mt-2"})]}),e("div",{className:"block mt-4",children:s("label",{className:"flex items-center",children:[e(k,{name:"remember",value:r.remember,handleChange:m}),e("span",{className:"ml-2 text-sm text-gray-600",children:"Remember me"})]})}),s("div",{className:"flex items-center justify-end mt-4",children:[n&&e(y,{href:route("password.request"),className:"underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",children:"Forgot your password?"}),e("button",{className:"btn",disabled:g,children:"Se connecter"})]})]})]})}export{D as default};
