import{r as g,j as i,a as e,n as c,g as d}from"./app-224f2270.js";import{A as p}from"./AdminLayout-e1f1a36d.js";import{L as u}from"./Language-45cbb11a.js";import f from"./CategoryCard-a604f5e1.js";import{D as h}from"./draggable-487534d6.js";import{B as x}from"./Toast-af3afca9.js";import{m as C}from"./fr-0d086dbd.js";import"./FzToastContainer-edd11627.js";import"./FzToast-813026fc.js";import"./bubble_warning-9cee2399.js";import"./bubble_infos-3d3cb710.js";import"./logo-5fe7a993.js";import"./index.esm-d02e88c0.js";import"./iconBase-8021c47a.js";import"./dropdownProfile-5594b462.js";import"./index.esm-11b9cc7a.js";import"./motion-6a6ba2ab.js";C.locale("fr");function z(t){let s="Forum - Catégories";new u(t.language),t.auth.permissions,t.logger;const[m,y]=g.useState(t.forumCategories);async function n(r,a){let o=roles;o=o.swap(a,r),o[a].position=a,o[r].position=r,setRoles(o)}async function l(){d.post(route("admin.forum.categories.swap"),{categories:m,_token:t.csrf_token},{onSuccess:r=>{}})}return i(p,{children:[e(c,{title:s}),i("div",{className:"p-10",children:[e("h1",{className:"text-3xl text-white mb-5",children:s}),e("div",{className:"grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:gap-10 dark:bg-gray-900",children:i("div",{className:"col-span-1",children:[e(h,{onPosChange:n,children:m.map((r,a)=>e(f,{category:r},a))}),e("div",{className:"flex justify-end",children:e(x,{onClick:l,children:"Sauvegarder"})})]})})]})]})}export{z as default};
