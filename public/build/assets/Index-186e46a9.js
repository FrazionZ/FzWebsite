import{_ as d,j as n,a as e,n as h}from"./app-f243bcb8.js";import{A as u}from"./AdminLayout-652a21de.js";import{B as p}from"./Toast-d93510d5.js";import{C as f}from"./Card-4ada00ce.js";import{M as b}from"./Editor-3b30caff.js";import{v as x}from"./switch-32f30d77.js";import"./FzToastContainer-6e99986b.js";import"./FzToast-d159b48c.js";import"./logo-ec0c8240.js";import"./index.esm-dbfbade4.js";import"./iconBase-ac470508.js";import"./objectWithoutPropertiesLoose-df62547b.js";import"./react-markdown-516aa196.js";import"./index-4d501b15.js";import"./index-60ce1a05.js";import"./render-3bbda361.js";import"./description-8c9cb5d9.js";function I(i){let s="Maintenance";const{data:a,setData:l,post:m,processing:r,errors:g}=d({message:atob(i.message),enabled:i.enabled,_token:i.csrf_token});async function c(t){t.preventDefault(),m(route("admin.maintenance.submit"),{preserveState:!0,resetOnSuccess:!0,onFinish:o=>{},onSuccess:o=>{},onError:o=>{}})}return n(u,{children:[e(h,{title:s}),n("form",{onSubmit:c,className:"p-10",children:[e("h1",{className:"text-3xl text-white mb-5",children:s}),n(f,{children:[e("h5",{className:"text-2xl font-bold tracking-tight text-gray-900 dark:text-white",children:"Message affiché à l'accueil"}),e(b,{value:a.message,height:500,disabled:r,preview:"edit",onChange:t=>{l("message",t)}}),n("div",{className:"flex items-center gap-6 h-full",children:[e(x,{checked:a.enabled,disabled:r,onChange:t=>{l("enabled",t)},className:`${a.enabled?"":"bg-[var(--fzbg-3)]"} relative inline-flex h-6 w-11 items-center rounded-full`,children:e("span",{className:`${a.enabled?"translate-x-6":"translate-x-1"} inline-block h-4 w-4 transform rounded-full bg-white transition`})}),e("span",{className:"text-xl text-white",children:"Souhaitez-vous activer la maintenance ?"})]}),e(p,{className:"w-fit",type:"submit",disabled:r,children:"Sauvegarder"})]})]})]})}export{I as default};
