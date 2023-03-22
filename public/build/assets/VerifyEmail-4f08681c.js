import{_ as s,j as t,a as e,n as m,d as a}from"./app-64c982be.js";import{L as d}from"./Layout-6d96430f.js";import{P as l}from"./PrimaryButton-aa86e922.js";import"./logo-ec0c8240.js";import"./FzToastContainer-89ae0283.js";import"./iconBase-1b0b194b.js";import"./FzToast-42bf12ec.js";import"./bubble_warning-9cee2399.js";import"./bubble_infos-3d3cb710.js";import"./motion-1cf8eba9.js";import"./Dropdown-4d4f6aeb.js";import"./index.esm-7b472f02.js";import"./comments-7ee1c3c3.js";import"./keyboard-9254f896.js";import"./transition-9f144381.js";import"./index-93f0ac29.js";/* empty css            */import"./twitch-d7bb7fb3.js";function A({status:i}){const{post:o,processing:r}=s({});return t(d,{children:[e(m,{title:"Email Verification"}),e("div",{className:"mb-4 text-sm text-gray-600",children:"Thanks for signing up! Before getting started, could you verify your email address by clicking on the link we just emailed to you? If you didn't receive the email, we will gladly send you another."}),i==="verification-link-sent"&&e("div",{className:"mb-4 font-medium text-sm text-green-600",children:"A new verification link has been sent to the email address you provided during registration."}),e("form",{onSubmit:n=>{n.preventDefault(),o(route("verification.send"))},children:t("div",{className:"mt-4 flex items-center justify-between",children:[e(l,{processing:r,children:"Resend Verification Email"}),e(a,{href:route("logout"),method:"post",as:"button",className:"underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",children:"Log Out"})]})})]})}export{A as default};
