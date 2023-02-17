import{K as f,r as g,j as a,a as e,n as w,f as h}from"./app-abb62592.js";import{L as N}from"./Layout-949668c6.js";import{T as m,I as n}from"./TextInput-426c7382.js";import{I as i}from"./InputLabel-d4f2773c.js";import{P as v}from"./PrimaryButton-607b2873.js";import"./transition-c935a218.js";import"./use-owner-7737dc7c.js";function q(l){const{data:r,setData:d,post:u,processing:c,errors:t,reset:p}=f({name:"",email:"",password:"",password_confirmation:"",_token:l.csrf_token});g.useEffect(()=>()=>{p("password","password_confirmation")},[]);const o=s=>{d(s.target.name,s.target.type==="checkbox"?s.target.checked:s.target.value)};return a(N,{props:l,children:[e(w,{title:"Register"}),a("form",{onSubmit:s=>{s.preventDefault(),u(route("register"))},children:[a("div",{children:[e(i,{forInput:"name",value:"Name"}),e(m,{id:"name",name:"name",value:r.name,className:"mt-1 block w-full",autoComplete:"name",isFocused:!0,handleChange:o,required:!0}),e(n,{message:t.name,className:"mt-2"})]}),a("div",{className:"mt-4",children:[e(i,{forInput:"email",value:"Email"}),e(m,{id:"email",type:"email",name:"email",value:r.email,className:"mt-1 block w-full",autoComplete:"username",handleChange:o,required:!0}),e(n,{message:t.email,className:"mt-2"})]}),a("div",{className:"mt-4",children:[e(i,{forInput:"password",value:"Password"}),e(m,{id:"password",type:"password",name:"password",value:r.password,className:"mt-1 block w-full",autoComplete:"new-password",handleChange:o,required:!0}),e(n,{message:t.password,className:"mt-2"})]}),a("div",{className:"mt-4",children:[e(i,{forInput:"password_confirmation",value:"Confirm Password"}),e(m,{id:"password_confirmation",type:"password",name:"password_confirmation",value:r.password_confirmation,className:"mt-1 block w-full",autoComplete:"new-password",handleChange:o,required:!0}),e(n,{message:t.password_confirmation,className:"mt-2"})]}),a("div",{className:"flex items-center justify-end mt-4",children:[e(h,{href:route("login"),className:"underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",children:"Already registered?"}),e(v,{className:"ml-4",processing:c,children:"Register"})]})]})]})}export{q as default};
