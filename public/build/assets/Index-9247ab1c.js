import{r as l,j as a,a as e,n as P,g as k}from"./app-8ad97735.js";import{L as x}from"./Layout-e90d5073.js";import{C as _}from"./comment-pen-d2ca9284.js";import"./Toast-48186346.js";import{P as j}from"./Paginate-f394db2b.js";import{A as b}from"./Alert-f9231947.js";import L from"./CardThread-05918eed.js";import{m as z}from"./motion-60d2c529.js";import"./logo-ec0c8240.js";import"./FzToastContainer-b56ef26f.js";import"./FzToast-68187294.js";import"./bubble_warning-9cee2399.js";import"./bubble_infos-3d3cb710.js";import"./Dropdown-26707dbc.js";import"./iconBase-29a91d14.js";import"./index-a45f2cb9.js";/* empty css            */import"./twitch-4fc69974.js";import"./index-4d501b15.js";import"./index.esm-fa79e6a0.js";import"./fr-7c58bf92.js";import"./Language-0ebcfb91.js";import"./lock-38f14949.js";import"./comments-5900ac9a.js";function re(t){const c="Forum",g=t.auth.user,p=t.categories;t.csrf_token;const[v,C]=l.useState(0),[m,T]=l.useState(0),[y,S]=l.useState(t.isAllowedCreateThread),[s,d]=l.useState(t.threads.data),[w,u]=l.useState(t.threads);console.log(t);const f="forum.threads.paginate";async function A(i,r,n,o){C(i),T(r),S(n.isAllowedCreated),d(null),u(null),axios.post(route(f),{parent_id:n.id,page:o,_token:t.csrf_token}).then(h=>{let N=h.data;d(N.data),u(N)}).catch(h=>{console.log(h)})}return a(x,{props:t,title:c,header:e("h2",{className:"font-semibold text-xl text-gray-800 leading-tight",children:c}),children:[e(P,{title:c}),a("div",{className:"forum",children:[a("div",{className:"top",children:[a("div",{className:"justify-start icon_title w-full",children:[e("img",{src:_,alt:""}),e("span",{children:"Rédiger un Article"})]}),a("div",{className:"card",children:[e("button",{className:"btn",disabled:!y,onClick:()=>{k.get(route("forum.thread.create.form",{sc_id:m}))},children:"Nouvelle Discussion"}),a("div",{className:"user",children:[e("span",{children:g.name}),e("img",{src:`https://auth.frazionz.net/skins/face.php?u=${g.id}`,alt:""})]})]})]}),a("div",{className:"body",children:[e("div",{className:"menu",children:p.map((i,r)=>a("div",{className:"category",children:[e("div",{className:"name",children:i.name}),e("div",{className:"subcategory",children:i.subcategories.map((n,o)=>e(z.button,{whileTap:{scale:.87},onClick:()=>{A(r,o,n,1)},className:`item ${o==m&&r==v?"active":""}`,children:n.name},o))})]},r))}),a("div",{className:"threads",children:[(s==null?void 0:s.length)<=0&&e(b,{state:"warning",children:"Aucun Threads n'est disponible dans cette catégorie"}),s==null?void 0:s.map((i,r)=>e(L,{thread:i},r)),e(j,{layout:"bottom",labelType:"Threads",routeName:f,pagination:w,parent_id:m,setList:d,setPagination:u})]})]}),p.length<=0&&e(b,{state:"warning",children:"Aucune catégories n'est disponible"})]})]})}export{re as default};
