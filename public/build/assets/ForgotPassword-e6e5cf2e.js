import{K as u,j as o,a as e,n as c}from"./app-77937ea3.js";import{L as p}from"./Layout-e26af9ac.js";import{I as f}from"./InputError-b9c8acb9.js";import{P as w}from"./PrimaryButton-4558c90f.js";import{T as g}from"./TextInput-9ca46c1b.js";import"./logo-ec0c8240.js";import"./Dropdown-4d0749b1.js";import"./FzToastContainer-0ddbac78.js";/* empty css            */function I(a,{status:s}){const{data:r,setData:m,post:i,processing:l,errors:n}=u({email:"",_token:a.csrf_token}),d=t=>{m(t.target.name,t.target.value)};return o(p,{props:a,children:[e(c,{title:"Forgot Password"}),e("div",{className:"mb-4 text-sm text-gray-600",children:"Forgot your password? No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one."}),s&&e("div",{className:"mb-4 font-medium text-sm text-green-600",children:s}),o("form",{onSubmit:t=>{t.preventDefault(),i(route("password.email"))},children:[e(g,{id:"password",type:"email",name:"email",value:r.email,className:"mt-1 block w-full",isFocused:!0,handleChange:d}),e(f,{message:n.email,className:"mt-2"}),e("div",{className:"flex items-center justify-end mt-4",children:e(w,{className:"ml-4",processing:l,children:"Email Password Reset Link"})})]})]})}export{I as default};
