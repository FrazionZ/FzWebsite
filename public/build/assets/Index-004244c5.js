import{r as c,j as a,a as e,n as A,g as P}from"./app-3a3ebf9f.js";import{L as k}from"./Layout-3fa9deaf.js";import{C as _}from"./comment-pen-d2ca9284.js";import"./Toast-ee2c2b09.js";import{P as j}from"./Paginate-8a206248.js";import{A as v}from"./Alert-bec27ae4.js";import L from"./CardThread-b4f5d38b.js";import{m as z}from"./motion-4ce3ea6a.js";import"./logo-5fe7a993.js";import"./dropdownProfile-0316b966.js";import"./iconBase-1b9d12a2.js";import"./Dropdown-dea34f7a.js";import"./index.esm-58e6b8cb.js";import"./commentForum-5f640902.js";import"./keyboard-1b14f55c.js";import"./transition-e85bebed.js";import"./index-1fa21b0c.js";import"./FzToastContainer-b1ab8111.js";import"./FzToast-34c64f0c.js";import"./bubble_warning-9cee2399.js";import"./bubble_infos-3d3cb710.js";/* empty css            */import"./twitch-8a20bcf8.js";import"./index-4d501b15.js";import"./fr-527bd058.js";import"./_commonjs-dynamic-modules-302442b1.js";import"./Language-45cbb11a.js";import"./lock-d8062005.js";function oe(r){const m="Forum",p=r.auth.user,n=r.categories;r.csrf_token;const[g,w]=c.useState(0),[d,C]=c.useState(0),[T,y]=c.useState(r.isAllowedCreateThread),[s,u]=c.useState(r.threads.data),[x,h]=c.useState(r.threads),f="forum.threads.paginate";async function S(t,i,o,l){w(t),C(i),y(o.isAllowedCreated),u(null),h(null),axios.post(route(f),{parent_id:o.id,page:l,_token:r.csrf_token}).then(N=>{let b=N.data;u(b.data),h(b)}).catch(N=>{})}return a(k,{props:r,title:m,header:e("h2",{className:"font-semibold text-xl text-gray-800 leading-tight",children:m}),children:[e(A,{title:m}),a("div",{className:"forum",children:[a("div",{className:"top",children:[a("div",{className:"justify-start icon_title w-full",children:[e("img",{src:_,alt:""}),e("span",{children:"Rédiger un Article"})]}),a("div",{className:"card",children:[e("button",{className:"btn",disabled:!T,onClick:()=>{var t;P.get(route("forum.thread.create.form",{sc_id:(t=n==null?void 0:n[g])==null?void 0:t.subcategories[d]}))},children:"Nouvelle Discussion"}),a("div",{className:"user",children:[e("span",{children:p.name}),e("img",{src:`https://auth.frazionz.net/skins/face.php?u=${p.id}`,alt:""})]})]})]}),a("div",{className:"body flex-wrap min-[1537px]:flex-nowrap",children:[e("div",{className:"menu w-full min-[1537px]:w-fit",children:n.map((t,i)=>a("div",{className:"category",children:[e("div",{className:"name",children:t.name}),e("div",{className:"subcategory",children:t.subcategories.map((o,l)=>e(z.button,{whileTap:{scale:.87},onClick:()=>{S(i,l,o,1)},className:`item ${l==d&&i==g?"active":""}`,children:o.name},l))})]},i))}),a("div",{className:"threads",children:[(s==null?void 0:s.length)<=0&&e(v,{state:"warning",children:"Aucun Threads n'est disponible dans cette catégorie"}),s==null?void 0:s.map((t,i)=>e(L,{thread:t},i)),e(j,{layout:"bottom",labelType:"Threads",routeName:f,pagination:x,parent_id:d,setList:u,setPagination:h})]})]}),n.length<=0&&e(v,{state:"warning",children:"Aucune catégories n'est disponible"})]})]})}export{oe as default};
