import{r as l,W as v,j as o,a as e,b as S,g as C}from"./app-8a029f7d.js";import N from"./SubcategoryCard-e699195f.js";import{A as k}from"./AdminLayout-433a6d6e.js";import{m as j}from"./fr-c5bef879.js";import{D}from"./draggable-3e6c01ad.js";import{T as F,B as d}from"./Toast-4be6906f.js";import{L as _}from"./Label-31837fdf.js";import"./index.esm-cd877123.js";import"./iconBase-dd4e59c0.js";import"./FzToastContainer-ac00f5d7.js";import"./FzToast-d4c5c987.js";import"./bubble_warning-9cee2399.js";import"./bubble_infos-3d3cb710.js";import"./logo-5fe7a993.js";import"./dropdownProfile-650342e3.js";import"./index.esm-f688faaa.js";import"./motion-9a42dd72.js";import"./Language-45cbb11a.js";j.locale("fr");function V(s){const[i,u]=l.useState(s.forumCategory),[c,g]=l.useState(i.subcategories),m="Forum - Catégorie";async function p(t,a){let r=c;r=r.swap(a,t),r[a].position=a,r[t].position=t,g(r)}async function f(){C.post(route("admin.forum.subcategories.swap"),{subcategories:c,_token:s.csrf_token},{onSuccess:t=>{}})}const{data:h,setData:b,post:y,processing:n,errors:B}=v({id:i.id,name:i.name,_token:s.csrf_token});async function x(t){t.preventDefault(),y(route("admin.forum.category.save"),{preserveState:!0,resetOnSuccess:!0,onFinish:a=>{},onSuccess:a=>{u(a.props.forumCategory)},onError:a=>{}})}return o(k,{children:[e(S,{title:m}),o("div",{className:"p-10",children:[e("h1",{className:"text-3xl text-white mb-5",children:m}),o("div",{className:"grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-10 dark:bg-gray-900",children:[e("div",{className:"col-span-1",children:o("form",{onSubmit:x,children:[e("div",{className:"mb-2 block",children:e(_,{htmlFor:"name",value:"Nom de la catégorie"})}),e(F,{id:"name",type:"text",placeholder:"BobbyCategory",value:h.name,disabled:n,onChange:t=>{b("name",t.target.value)},required:!0}),e(d,{className:"mt-3",disabled:n,type:"submit",children:"Sauvegarder"})]})}),o("div",{className:"col-span-1 flex flex-col justify-center gap-5",children:[e("h1",{className:"text-2xl text-white",children:"Sous catégories"}),e(D,{onPosChange:p,children:c.map((t,a)=>e(N,{subcategory:t},a))}),e("div",{className:"flex justify-end",children:e(d,{onClick:f,children:"Sauvegarder"})})]})]})]})]})}export{V as default};
