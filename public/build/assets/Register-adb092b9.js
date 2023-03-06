import{_ as f,r as w,j as a,a as e,n as g,d as h}from"./app-f243bcb8.js";import{L as N}from"./Layout-1c3f9603.js";import{I as m}from"./InputError-6a49f6f7.js";import{I as n}from"./InputLabel-36f09279.js";import{T as i}from"./TextInput-8e667271.js";import"./logo-ec0c8240.js";import"./FzToastContainer-6e99986b.js";import"./FzToast-d159b48c.js";import"./Dropdown-0a9b586c.js";/* empty css            */function L(l){const{data:r,setData:d,post:u,processing:c,errors:t,reset:p}=f({name:"",email:"",password:"",password_confirmation:"",_token:l.csrf_token});w.useEffect(()=>()=>{p("password","password_confirmation")},[]);const o=s=>{d(s.target.name,s.target.type==="checkbox"?s.target.checked:s.target.value)};return a(N,{props:l,children:[e(g,{title:"Register"}),a("form",{onSubmit:s=>{s.preventDefault(),u(route("register"))},children:[a("div",{children:[e(n,{forInput:"name",value:"Name"}),e(i,{id:"name",name:"name",value:r.name,className:"mt-1 block w-full",autoComplete:"name",isFocused:!0,handleChange:o,required:!0}),e(m,{message:t.name,className:"mt-2"})]}),a("div",{className:"mt-4",children:[e(n,{forInput:"email",value:"Email"}),e(i,{id:"email",type:"email",name:"email",value:r.email,className:"mt-1 block w-full",autoComplete:"username",handleChange:o,required:!0}),e(m,{message:t.email,className:"mt-2"})]}),a("div",{className:"mt-4",children:[e(n,{forInput:"password",value:"Password"}),e(i,{id:"password",type:"password",name:"password",value:r.password,className:"mt-1 block w-full",autoComplete:"new-password",handleChange:o,required:!0}),e(m,{message:t.password,className:"mt-2"})]}),a("div",{className:"mt-4",children:[e(n,{forInput:"password_confirmation",value:"Confirm Password"}),e(i,{id:"password_confirmation",type:"password",name:"password_confirmation",value:r.password_confirmation,className:"mt-1 block w-full",autoComplete:"new-password",handleChange:o,required:!0}),e(m,{message:t.password_confirmation,className:"mt-2"})]}),a("div",{className:"flex items-center justify-end mt-4",children:[e(h,{href:route("login"),className:"underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",children:"Already registered?"}),e("button",{className:"btn",disabled:c,children:"Continuer"})]})]})]})}export{L as default};
