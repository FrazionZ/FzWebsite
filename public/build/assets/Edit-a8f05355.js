import{j as r,a as e,r as p,K as y,n as x}from"./app-b9fa2a5c.js";import{A as k}from"./AdminLayout-1bcde9c8.js";import{m as v,u as N,c as g,H as w,a as S,B as C}from"./Toast-cb536801.js";import{C as h}from"./Card-d6f38393.js";import B from"./Permissions-333fdc1d.js";import"./FzToastContainer-f656a1dc.js";import"./logo-ec0c8240.js";import"./index.esm-44803543.js";import"./iconBase-090ce01b.js";const A=({additionalContent:o,children:a,color:c="info",icon:i,onDismiss:n,rounded:u=!0,withBorderAccent:d,className:l,theme:m={}})=>{const t=v(N().theme.alert,m);return r("div",{className:g(t.root.base,t.root.color[c],u&&t.root.rounded,d&&t.root.borderAccent,l),role:"alert",children:[r("div",{className:t.root.wrapper,"data-testid":"flowbite-alert-wrapper",children:[i&&e(i,{className:t.root.icon,"data-testid":"flowbite-alert-icon"}),e("div",{children:a}),typeof n=="function"&&e("button",{"aria-label":"Dismiss",className:g(t.closeButton.base,t.closeButton.color[c]),onClick:n,type:"button",children:e(w,{"aria-hidden":!0,className:t.closeButton.icon})})]}),o&&e("div",{children:o})]})};function U(o){const[a,c]=p.useState(o.role);let i="Edition d'un rôle";const[n,u]=p.useState(o.permissions),{data:d,setData:l,post:m,processing:t,errors:F}=y({id:a.id,name:a.name,color:a.color,description:a.description,_token:o.csrf_token});async function b(s){s.preventDefault(),m(route("admin.roles.edit.save"),{preserveScroll:!0,preserveState:!0,onSuccess:f=>{c(f.props.role)},onError:()=>{}})}return r(k,{children:[e(x,{title:i}),r("div",{className:"p-10",children:[e("h1",{className:"text-3xl text-white mb-5",children:i}),a.level>=5&&e(A,{color:"info",withBorderAccent:!0,className:"mb-4",icon:S,children:r("span",{children:[e("span",{className:"font-medium",children:"INFOS"})," ","L'affichage des permissions est désactivé sur les rôles niveau 5."]})}),r("div",{className:"grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 md:gap-4 xl:gap-4 dark:bg-gray-900",children:[e("div",{className:"col-span-1",children:r(h,{children:[e("h3",{className:" text-xl font-semibold dark:text-white",children:"Informations Général"}),e("form",{onSubmit:b,children:r("div",{className:"grid grid-cols-6 gap-6",children:[r("div",{className:"col-span-6 sm:col-span-3",children:[e("label",{htmlFor:"name",className:"block mb-2 text-sm font-medium text-gray-900 dark:text-white",children:"Nom du rôle"}),e("input",{type:"text",onChange:s=>{l("name",s.target.value)},name:"name",id:"name",value:d.name,className:"shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500",placeholder:"Pseudo",required:!0})]}),r("div",{className:"col-span-6 sm:col-span-3",children:[e("label",{htmlFor:"color",className:"block mb-2 text-sm font-medium text-gray-900 dark:text-white",children:"Couleur du badge"}),e("input",{type:"color",onChange:s=>{l("color",s.target.value)},name:"color",id:"color",value:d.color,required:!0})]}),r("div",{className:"col-span-6 sm:col-span-3",children:[e("label",{htmlFor:"description",className:"block mb-2 text-sm font-medium text-gray-900 dark:text-white",children:"Description du rôle"}),e("input",{type:"text",onChange:s=>{l("description",s.target.value)},name:"description",id:"description",value:d.description,className:"shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500",placeholder:"Pseudo",required:!0})]}),r("div",{className:"col-span-6 sm:col-span-3",children:[e("label",{htmlFor:"slug",className:"block mb-2 text-sm font-medium text-gray-900 dark:text-white",children:"Slug du rôle"}),e("input",{type:"text",onChange:s=>{l("slug",s.target.value)},name:"slug",id:"slug",value:a.slug,disabled:!0,className:"shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500",placeholder:"Pseudo",required:!0})]}),e("div",{className:"col-span-6 sm:col-full",children:e(C,{className:"w-fit",type:"submit",children:"Sauvegarder"})})]})})]})}),e("div",{className:"col-span-1",children:e(h,{children:e("h3",{className:"text-xl font-semibold dark:text-white",children:"Utilisateurs ayant ce rôle"})})})]}),a.level<5&&e(B,{role:a,permissions:n})]})]})}export{U as default};
