import{_ as w,r as h,j as a,a as s,n as v}from"./app-e514fc58.js";import{L as g}from"./Layout-0d02a113.js";import{I as m}from"./InputError-6ef82a24.js";import{I as n}from"./InputLabel-fcf2a259.js";import{P as N}from"./PrimaryButton-b570d006.js";import{T as i}from"./TextInput-8f55dee7.js";import"./logo-ec0c8240.js";import"./FzToastContainer-693dfff9.js";import"./FzToast-5756d4a1.js";import"./bubble_warning-38724665.js";import"./bubble_infos-2d9e4d74.js";import"./motion-3c11ff0a.js";import"./Dropdown-b187739c.js";/* empty css            */function F({token:l,email:p}){const{data:o,setData:d,post:c,processing:u,errors:r,reset:f}=w({token:l,email:p,password:"",password_confirmation:"",_token:props.csrf_token});h.useEffect(()=>()=>{f("password","password_confirmation")},[]);const t=e=>{d(e.target.name,e.target.value)};return a(g,{children:[s(v,{title:"Reset Password"}),a("form",{onSubmit:e=>{e.preventDefault(),c(route("password.store"))},children:[a("div",{children:[s(n,{forInput:"email",value:"Email"}),s(i,{id:"email",type:"email",name:"email",value:o.email,className:"mt-1 block w-full",autoComplete:"username",handleChange:t}),s(m,{message:r.email,className:"mt-2"})]}),a("div",{className:"mt-4",children:[s(n,{forInput:"password",value:"Password"}),s(i,{id:"password",type:"password",name:"password",value:o.password,className:"mt-1 block w-full",autoComplete:"new-password",isFocused:!0,handleChange:t}),s(m,{message:r.password,className:"mt-2"})]}),a("div",{className:"mt-4",children:[s(n,{forInput:"password_confirmation",value:"Confirm Password"}),s(i,{type:"password",name:"password_confirmation",value:o.password_confirmation,className:"mt-1 block w-full",autoComplete:"new-password",handleChange:t}),s(m,{message:r.password_confirmation,className:"mt-2"})]}),s("div",{className:"flex items-center justify-end mt-4",children:s(N,{className:"ml-4",processing:u,children:"Reset Password"})})]})]})}export{F as default};
