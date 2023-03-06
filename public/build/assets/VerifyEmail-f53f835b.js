import{_ as s,j as t,a as e,n as a,d as m}from"./app-f243bcb8.js";import{L as d}from"./Layout-1c3f9603.js";import{P as l}from"./PrimaryButton-4e48f5b0.js";import"./logo-ec0c8240.js";import"./FzToastContainer-6e99986b.js";import"./FzToast-d159b48c.js";import"./Dropdown-0a9b586c.js";/* empty css            */function b({status:i}){const{post:o,processing:r}=s({});return t(d,{children:[e(a,{title:"Email Verification"}),e("div",{className:"mb-4 text-sm text-gray-600",children:"Thanks for signing up! Before getting started, could you verify your email address by clicking on the link we just emailed to you? If you didn't receive the email, we will gladly send you another."}),i==="verification-link-sent"&&e("div",{className:"mb-4 font-medium text-sm text-green-600",children:"A new verification link has been sent to the email address you provided during registration."}),e("form",{onSubmit:n=>{n.preventDefault(),o(route("verification.send"))},children:t("div",{className:"mt-4 flex items-center justify-between",children:[e(l,{processing:r,children:"Resend Verification Email"}),e(m,{href:route("logout"),method:"post",as:"button",className:"underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",children:"Log Out"})]})})]})}export{b as default};
