import{W as h,_ as u,a as e,j as t,F as f}from"./app-672b5057.js";import{C as x,B as g}from"./Toast-e31acce0.js";import{C as N}from"./Card-3aa1d931.js";import"./iconBase-50bc53c2.js";function j({role:c,permissions:l}){const n=h().props,{data:i,setData:o,post:m,processing:k,errors:C}=u({role_id:c.id,permissions:l,_token:n.csrf_token});async function d(s){s.preventDefault(),m(route("admin.roles.edit.perms"),{preserveScroll:!0,preserveState:!0,onSuccess:r=>{},onError:()=>{}})}async function p(s,r){let a=i.permissions;a[s].hasCheck=r.target.checked,o("permissions",a)}return e("div",{className:"mt-4",children:e("div",{className:"col-span-2",children:t(N,{children:[e("h3",{className:"text-xl font-semibold dark:text-white",children:"Liste des permissions"}),t("form",{onSubmit:d,className:"flex flex-col gap-4",children:[e("ul",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-4 xl:gap-4",children:i.permissions!==null&&e(f,{children:i.permissions.map((s,r)=>t("li",{className:"flex items-center gap-5 text-white",children:[e(x,{checked:s.hasCheck,onChange:a=>{p(r,a)}}),t("div",{className:"flex flex-col",children:[e("span",{className:"text-xl",children:s.name}),e("span",{className:"text-sm",children:s.description})]})]},r))})}),e(g,{className:"w-fit",type:"submit",children:"Sauvegarder"})]})]})})})}export{j as default};
