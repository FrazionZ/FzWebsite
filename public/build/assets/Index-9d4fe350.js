import{_ as d,j as i,a as e,n as p}from"./app-224f2270.js";import{A as h}from"./AdminLayout-e1f1a36d.js";import{B as u}from"./Toast-af3afca9.js";import{C as f}from"./Card-4073e2bd.js";import{M as b}from"./Editor-01a75d7e.js";import{v as x}from"./switch-a9a32562.js";import"./FzToastContainer-edd11627.js";import"./FzToast-813026fc.js";import"./bubble_warning-9cee2399.js";import"./bubble_infos-3d3cb710.js";import"./logo-5fe7a993.js";import"./index.esm-d02e88c0.js";import"./iconBase-8021c47a.js";import"./dropdownProfile-5594b462.js";import"./index.esm-11b9cc7a.js";import"./motion-6a6ba2ab.js";import"./Language-45cbb11a.js";import"./objectWithoutPropertiesLoose-df62547b.js";import"./index-4d501b15.js";import"./index-f6182268.js";import"./keyboard-8a80a38f.js";function G(r){let s="Maintenance";const{data:a,setData:o,post:m,processing:n,errors:g}=d({message:atob(r.message),enabled:r.enabled,_token:r.csrf_token});async function c(t){t.preventDefault(),m(route("admin.maintenance.submit"),{preserveState:!0,resetOnSuccess:!0,onFinish:l=>{},onSuccess:l=>{},onError:l=>{}})}return i(h,{children:[e(p,{title:s}),i("form",{onSubmit:c,className:"p-10",children:[e("h1",{className:"text-3xl text-white mb-5",children:s}),i(f,{children:[e("h5",{className:"text-2xl font-bold tracking-tight text-gray-900 dark:text-white",children:"Message affiché à l'accueil"}),e(b,{value:a.message,height:500,disabled:n,preview:"edit",onChange:t=>{o("message",t)}}),i("div",{className:"flex items-center gap-6 h-full",children:[e(x,{checked:a.enabled,disabled:n,onChange:t=>{o("enabled",t)},className:`${a.enabled?"":"bg-[var(--fzbg-3)]"} relative inline-flex h-6 w-11 items-center rounded-full`,children:e("span",{className:`${a.enabled?"translate-x-6":"translate-x-1"} inline-block h-4 w-4 transform rounded-full bg-white transition`})}),e("span",{className:"text-xl text-white",children:"Souhaitez-vous activer la maintenance ?"})]}),e(u,{className:"w-fit",type:"submit",disabled:n,children:"Sauvegarder"})]})]})]})}export{G as default};
