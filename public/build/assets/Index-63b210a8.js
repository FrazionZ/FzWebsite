import{r as c,j as a,a as e,n as A,g as P}from"./app-a7df7f8a.js";import{L as k}from"./Layout-12744eb1.js";import{C as _}from"./comment-pen-d2ca9284.js";import"./Toast-3ec042ab.js";import{P as j}from"./Paginate-eed80fd1.js";import{A as v}from"./Alert-236bf4cd.js";import L from"./CardThread-38ff7159.js";import{m as z}from"./motion-2960c3bb.js";import"./logo-ec0c8240.js";import"./FzToastContainer-609b9f90.js";import"./FzToast-28f71b8d.js";import"./bubble_warning-9cee2399.js";import"./bubble_infos-3d3cb710.js";import"./Dropdown-7598edb7.js";import"./iconBase-0e804ed0.js";import"./index-21b3f109.js";/* empty css            */import"./twitch-ab602aa1.js";import"./index-4d501b15.js";import"./index.esm-37132284.js";import"./fr-2a63f698.js";import"./Language-0ebcfb91.js";import"./lock-38f14949.js";import"./comments-d25c1f84.js";function re(r){const m="Forum",g=r.auth.user,n=r.categories;r.csrf_token;const[f,w]=c.useState(0),[d,C]=c.useState(0),[T,y]=c.useState(r.isAllowedCreateThread),[i,u]=c.useState(r.threads.data),[x,h]=c.useState(r.threads),N="forum.threads.paginate";async function S(t,s,o,l){w(t),C(s),y(o.isAllowedCreated),u(null),h(null),axios.post(route(N),{parent_id:o.id,page:l,_token:r.csrf_token}).then(p=>{let b=p.data;u(b.data),h(b)}).catch(p=>{console.log(p)})}return a(k,{props:r,title:m,header:e("h2",{className:"font-semibold text-xl text-gray-800 leading-tight",children:m}),children:[e(A,{title:m}),a("div",{className:"forum",children:[a("div",{className:"top",children:[a("div",{className:"justify-start icon_title w-full",children:[e("img",{src:_,alt:""}),e("span",{children:"Rédiger un Article"})]}),a("div",{className:"card",children:[e("button",{className:"btn",disabled:!T,onClick:()=>{var t;P.get(route("forum.thread.create.form",{sc_id:(t=n==null?void 0:n[f])==null?void 0:t.subcategories[d]}))},children:"Nouvelle Discussion"}),a("div",{className:"user",children:[e("span",{children:g.name}),e("img",{src:`https://auth.frazionz.net/skins/face.php?u=${g.id}`,alt:""})]})]})]}),a("div",{className:"body flex-wrap min-[1537px]:flex-nowrap",children:[e("div",{className:"menu w-full min-[1537px]:w-fit",children:n.map((t,s)=>a("div",{className:"category",children:[e("div",{className:"name",children:t.name}),e("div",{className:"subcategory",children:t.subcategories.map((o,l)=>e(z.button,{whileTap:{scale:.87},onClick:()=>{S(s,l,o,1)},className:`item ${l==d&&s==f?"active":""}`,children:o.name},l))})]},s))}),a("div",{className:"threads",children:[(i==null?void 0:i.length)<=0&&e(v,{state:"warning",children:"Aucun Threads n'est disponible dans cette catégorie"}),i==null?void 0:i.map((t,s)=>e(L,{thread:t},s)),e(j,{layout:"bottom",labelType:"Threads",routeName:N,pagination:x,parent_id:d,setList:u,setPagination:h})]})]}),n.length<=0&&e(v,{state:"warning",children:"Aucune catégories n'est disponible"})]})]})}export{re as default};
