import{K as f,r as w,j as a,a as e,n as g,f as h}from"./app-15af5a0b.js";import{L as N}from"./Layout-edc1af99.js";import{T as n,I as m}from"./TextInput-92eced3a.js";import{I as i}from"./InputLabel-40264566.js";import"./logo-ec0c8240.js";import"./FzToastContainer-fe4013e1.js";/* empty css            */function j(l){const{data:r,setData:d,post:u,processing:c,errors:t,reset:p}=f({name:"",email:"",password:"",password_confirmation:"",_token:l.csrf_token});w.useEffect(()=>()=>{p("password","password_confirmation")},[]);const o=s=>{d(s.target.name,s.target.type==="checkbox"?s.target.checked:s.target.value)};return a(N,{props:l,children:[e(g,{title:"Register"}),a("form",{onSubmit:s=>{s.preventDefault(),u(route("register"))},children:[a("div",{children:[e(i,{forInput:"name",value:"Name"}),e(n,{id:"name",name:"name",value:r.name,className:"mt-1 block w-full",autoComplete:"name",isFocused:!0,handleChange:o,required:!0}),e(m,{message:t.name,className:"mt-2"})]}),a("div",{className:"mt-4",children:[e(i,{forInput:"email",value:"Email"}),e(n,{id:"email",type:"email",name:"email",value:r.email,className:"mt-1 block w-full",autoComplete:"username",handleChange:o,required:!0}),e(m,{message:t.email,className:"mt-2"})]}),a("div",{className:"mt-4",children:[e(i,{forInput:"password",value:"Password"}),e(n,{id:"password",type:"password",name:"password",value:r.password,className:"mt-1 block w-full",autoComplete:"new-password",handleChange:o,required:!0}),e(m,{message:t.password,className:"mt-2"})]}),a("div",{className:"mt-4",children:[e(i,{forInput:"password_confirmation",value:"Confirm Password"}),e(n,{id:"password_confirmation",type:"password",name:"password_confirmation",value:r.password_confirmation,className:"mt-1 block w-full",autoComplete:"new-password",handleChange:o,required:!0}),e(m,{message:t.password_confirmation,className:"mt-2"})]}),a("div",{className:"flex items-center justify-end mt-4",children:[e(h,{href:route("login"),className:"underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",children:"Already registered?"}),e("button",{className:"btn",disabled:c,children:"Continuer"})]})]})]})}export{j as default};
