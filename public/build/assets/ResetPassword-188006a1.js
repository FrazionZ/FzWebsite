import{K as f,r as h,j as a,a as s,n as v}from"./app-15af5a0b.js";import{L as g}from"./Layout-edc1af99.js";import{T as m,I as n}from"./TextInput-92eced3a.js";import{I as l}from"./InputLabel-40264566.js";import{P as N}from"./PrimaryButton-9618335b.js";import"./logo-ec0c8240.js";import"./FzToastContainer-fe4013e1.js";/* empty css            */function E({token:i,email:p}){const{data:o,setData:d,post:c,processing:u,errors:r,reset:w}=f({token:i,email:p,password:"",password_confirmation:"",_token:props.csrf_token});h.useEffect(()=>()=>{w("password","password_confirmation")},[]);const t=e=>{d(e.target.name,e.target.value)};return a(g,{children:[s(v,{title:"Reset Password"}),a("form",{onSubmit:e=>{e.preventDefault(),c(route("password.store"))},children:[a("div",{children:[s(l,{forInput:"email",value:"Email"}),s(m,{id:"email",type:"email",name:"email",value:o.email,className:"mt-1 block w-full",autoComplete:"username",handleChange:t}),s(n,{message:r.email,className:"mt-2"})]}),a("div",{className:"mt-4",children:[s(l,{forInput:"password",value:"Password"}),s(m,{id:"password",type:"password",name:"password",value:o.password,className:"mt-1 block w-full",autoComplete:"new-password",isFocused:!0,handleChange:t}),s(n,{message:r.password,className:"mt-2"})]}),a("div",{className:"mt-4",children:[s(l,{forInput:"password_confirmation",value:"Confirm Password"}),s(m,{type:"password",name:"password_confirmation",value:o.password_confirmation,className:"mt-1 block w-full",autoComplete:"new-password",handleChange:t}),s(n,{message:r.password_confirmation,className:"mt-2"})]}),s("div",{className:"flex items-center justify-end mt-4",children:s(N,{className:"ml-4",processing:u,children:"Reset Password"})})]})]})}export{E as default};
