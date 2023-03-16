import{_ as s,j as t,a as e,n as a,d as m}from"./app-36574797.js";import{L as d}from"./Layout-51a0ccc0.js";import{P as l}from"./PrimaryButton-21fe27c9.js";import"./logo-ec0c8240.js";import"./FzToastContainer-b6b01518.js";import"./FzToast-ee7cf2bf.js";import"./bubble_warning-38724665.js";import"./bubble_infos-2d9e4d74.js";import"./motion-0558cbd3.js";import"./Dropdown-ca68c6cd.js";import"./iconBase-2a0d2d51.js";import"./index-4d3ed913.js";/* empty css            */import"./twitch-ab40ca14.js";function L({status:i}){const{post:o,processing:r}=s({});return t(d,{children:[e(a,{title:"Email Verification"}),e("div",{className:"mb-4 text-sm text-gray-600",children:"Thanks for signing up! Before getting started, could you verify your email address by clicking on the link we just emailed to you? If you didn't receive the email, we will gladly send you another."}),i==="verification-link-sent"&&e("div",{className:"mb-4 font-medium text-sm text-green-600",children:"A new verification link has been sent to the email address you provided during registration."}),e("form",{onSubmit:n=>{n.preventDefault(),o(route("verification.send"))},children:t("div",{className:"mt-4 flex items-center justify-between",children:[e(l,{processing:r,children:"Resend Verification Email"}),e(m,{href:route("logout"),method:"post",as:"button",className:"underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",children:"Log Out"})]})})]})}export{L as default};
