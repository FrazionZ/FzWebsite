import{r as g,_ as h,j as a,a as e,n as f,d as b}from"./app-a7df7f8a.js";import{T as x,B as y,a as v}from"./Toast-3ec042ab.js";import{L as N}from"./Label-7ecf0017.js";import{a as S}from"./index.esm-37132284.js";import{A as k}from"./AdminLayout-3787d352.js";import{m as w}from"./fr-2a63f698.js";import"./draggable-7ce38219.js";import{D as _}from"./Dropdown-7598edb7.js";import"./iconBase-0e804ed0.js";import"./FzToastContainer-609b9f90.js";import"./FzToast-28f71b8d.js";import"./bubble_warning-9cee2399.js";import"./bubble_infos-3d3cb710.js";import"./logo-ec0c8240.js";import"./index.esm-58a6ca22.js";import"./motion-2960c3bb.js";import"./Language-0ebcfb91.js";w.locale("fr");function K(o){const[r,d]=g.useState(o.forumSubcategory),i="Forum - Sous Catégorie - "+r.name,{data:c,setData:l,post:u,processing:m,errors:C}=h({id:r.id,name:r.name,_token:o.csrf_token}),n=[];o.roles.map(t=>{n.push({value:route("admin.forum.subcategory.role.attach"),data:{id:r.id,role:t.id,_token:o.csrf_token},method:"post",name:t.name})});async function p(t){t.preventDefault(),u(route("admin.forum.subcategory.save"),{preserveState:!0,resetOnSuccess:!0,onFinish:s=>{},onSuccess:s=>{d(s.props.forumSubcategory)},onError:s=>{}})}return a(k,{children:[e(f,{title:i}),a("div",{className:"p-10",children:[e("h1",{className:"text-3xl text-white mb-5",children:i}),a("div",{className:"grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:gap-10 dark:bg-gray-900",children:[e("div",{className:"col-span-1",children:a("form",{onSubmit:p,children:[e("div",{className:"mb-2 block",children:e(N,{htmlFor:"name",value:"Nom de la catégorie"})}),e(x,{id:"name",type:"text",placeholder:"BobbyCategory",value:c.name,disabled:m,onChange:t=>{l("name",t.target.value)},required:!0}),e(y,{className:"mt-3",disabled:m,type:"submit",children:"Sauvegarder"})]})}),a("div",{className:"col-span-1 flex flex-col justify-center gap-5",children:[e("h1",{className:"text-2xl text-white mb-5",children:"Rôles"}),a("div",{className:"flex gap-1 items-center",children:[r.roles.map((t,s)=>e(v,{size:"sm",style:{background:t.data.color,color:"#fff"},className:"w-fit text-white",children:a("div",{className:"flex items-center gap-1",children:[e("span",{children:t.data.name}),e(b,{href:route("admin.forum.subcategory.role.detach"),method:"post",data:{id:r.id,role:t.data.id,_token:o.csrf_token},children:e(S,{})})]})},s)),e(_,{text:"+",items:n,hideArrow:!0,styleMenu:{top:"36px"},styleButton:{height:"28px",backgroundColor:"rgb(31 41 55/var(--tw-bg-opacity))",width:"fit-content",padding:"12px 6px 16px"}})]})]})]})]})]})}export{K as default};
