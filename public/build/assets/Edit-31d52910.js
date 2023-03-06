import{r as g,_ as A,j as a,a as e,n as C,F as p,d as m,g as F}from"./app-f243bcb8.js";import{L as U,A as E}from"./AdminLayout-652a21de.js";import{a as Y,S as q}from"./Toast-d93510d5.js";import{C as D}from"./Card-4ada00ce.js";import{m as u}from"./fr-28351534.js";import{h as x}from"./index.esm-dbfbade4.js";import{D as L}from"./Dropdown-0a9b586c.js";import"./FzToastContainer-6e99986b.js";import"./FzToast-d159b48c.js";import"./logo-ec0c8240.js";import"./iconBase-ac470508.js";u.locale("fr");function W(s){let i=s.auth;const[t,y]=g.useState(s.user);let b=t.name;const f=new U(s.language);let l=s.authRoleHigh;const[k,v]=g.useState(s.tokenUsers);let c={id:t.id,username:t.name,email:t.email,_token:s.csrf_token};i.permissions.includes("admin.user.money")&&(c.money=t.money),i.permissions.includes("admin.user.ban")&&(c.banned=t.banned);const{data:n,setData:o,post:w,processing:_,errors:z}=A(c);async function N(){const r=Math.max(0,Math.min(999999999,Number(event.target.value)));o("money",r)}const h=[];s.roles.map(r=>{(l.position<r.position||l.level>=5)&&h.push({value:route("admin.users.role.attach",{id:t.id,role:r.id}),method:"get",name:r.name})});async function M(r){r.preventDefault(),w(route("admin.users.edit.save"),{preserveScroll:!0,preserveState:!0,onSuccess:d=>{y(d.props.user)},onError:()=>{}})}async function S(r){F.post(route("admin.users.token.revoke"),r,{preserveState:!0,preserveScroll:!0,resetOnSuccess:!0,onFinish:d=>{},onSuccess:d=>{v(d.props.tokenUsers)},onError:d=>{}})}return a(E,{children:[e(C,{title:b}),a("div",{className:"grid grid-cols-1 px-4 pt-6 xl:grid-cols-3 xl:gap-4 dark:bg-gray-900",children:[e("div",{className:"mb-4 col-span-full xl:mb-2",children:e("h1",{className:"text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white",children:"Edition de l'utilisateur"})}),a("div",{className:"col-span-full xl:col-auto",children:[e("div",{className:"p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800",children:a("div",{className:"items-center sm:flex xl:block 2xl:flex sm:space-x-4 xl:space-x-0 2xl:space-x-4",children:[e("img",{className:"mb-4 rounded-lg w-[64px] h-[64px] sm:mb-0 xl:mb-4 2xl:mb-0",src:`https://api.frazionz.net/user/${t.id}/skin/head`,alt:"Jese picture"}),a("div",{className:"flex flex-col gap-1",children:[e("h3",{className:"text-xl font-bold text-gray-900 dark:text-white",children:t.name}),a("div",{className:"flex gap-1 items-center",children:[t.roles.map((r,d)=>e(Y,{size:"sm",style:{background:r.color,color:"#fff"},className:"w-fit text-white",children:a("div",{className:"flex items-center gap-2",children:[e("span",{children:r.name}),l.position<r.position&&s.auth.permissions.includes("admin.user.role.edit")&&t.id!==s.auth.user.id&&e(p,{children:t.roles.length>1&&e(m,{href:route("admin.users.role.detach",{id:t.id,role:r.id}),children:e(x,{})})}),l.level>=5&&r.level>=5&&s.auth.permissions.includes("admin.user.role.edit")&&t.id!==s.auth.user.id&&e(p,{children:t.roles.length>1&&e(m,{href:route("admin.users.role.detach",{id:t.id,role:r.id}),children:e(x,{})})})]})},d)),s.roles.length!==0&&s.auth.permissions.includes("admin.user.role.edit")&&t.id!==s.auth.user.id&&e(L,{text:"+",items:h,hideArrow:!0,styleMenu:{top:"36px"},styleButton:{height:"28px",backgroundColor:"rgb(31 41 55/var(--tw-bg-opacity))",width:"fit-content",padding:"12px 6px 16px"}})]})]})]})}),s.auth.permissions.includes("admin.user.session.view")&&e("div",{className:"p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800",children:a("div",{className:"flow-root",children:[e("h3",{className:"text-xl font-semibold dark:text-white",children:"Sessions"}),e("ul",{className:"divide-y divide-gray-200 dark:divide-gray-700",children:k.map((r,d)=>e("li",{className:"py-4",children:a("div",{className:"flex items-center space-x-4",children:[e("div",{className:"flex-shrink-0",children:e("svg",{className:"w-6 h-6 dark:text-white",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",children:e("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"})})}),a("div",{className:"flex-1 min-w-0",children:[a("p",{className:"text-base font-semibold text-gray-900 truncate dark:text-white",children:[r.geo.city," -"," ",atob(r.ip)]}),a("p",{className:"text-sm font-normal text-gray-500 truncate dark:text-gray-400",children:[r.os," -"," ",r.useragent]})]}),e("div",{className:"inline-flex items-center",children:e("button",{onClick:()=>S({id:r.id,user_id:t.id}),className:"px-3 py-2 mb-3 mr-3 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-primary-300 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700",children:"Revoke"})})]})},d))})]})})]}),e("div",{className:"col-span-2",children:a("div",{className:"p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800",children:[e("h3",{className:"mb-4 text-xl font-semibold dark:text-white",children:"Informations Général"}),e("form",{onSubmit:M,children:a("div",{className:"grid grid-cols-6 gap-6",children:[a("div",{className:"col-span-6 sm:col-span-3",children:[e("label",{htmlFor:"name",className:"block mb-2 text-sm font-medium text-gray-900 dark:text-white",children:"Pseudo"}),e("input",{type:"text",onChange:r=>{o("username",r.target.value)},name:"first-name",id:"name",value:n.username,className:"shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500",placeholder:"Pseudo",required:!0})]}),a("div",{className:"col-span-6 sm:col-span-3",children:[e("label",{htmlFor:"email",className:"block mb-2 text-sm font-medium text-gray-900 dark:text-white",children:"Adresse Email"}),e("input",{type:"email",onChange:r=>{o("email",r.target.value)},name:"email",id:"email",value:n.email,className:"shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500",placeholder:"Email",required:!0})]}),a("div",{className:"col-span-6 sm:col-span-3",children:[e("label",{htmlFor:"uuid",className:"block mb-2 text-sm font-medium text-gray-900 dark:text-white",children:"UUID"}),e("input",{type:"text",name:"uuid",id:"uuid",disabled:!0,value:t.uuid,className:"shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500",placeholder:"N/A",required:!0})]}),i.permissions.includes("admin.user.money")&&a("div",{className:"col-span-6 sm:col-span-3",children:[e("label",{htmlFor:"money",className:"block mb-2 text-sm font-medium text-gray-900 dark:text-white",children:"Points boutique"}),e("input",{type:"number",onChange:N,name:"money",id:"money",value:n.money,className:"shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500",placeholder:"N/A",required:!0})]}),i.permissions.includes("admin.user.ban")&&a("div",{className:"col-span-6 sm:col-span-3",children:[e("label",{htmlFor:"role",className:"block mb-2 text-sm font-medium text-gray-900 dark:text-white",children:"Est bannis ?"}),a(q,{onChange:r=>{o("banned",r.target.value)},value:n.banned,required:!0,children:[e("option",{value:"1",children:"Oui"}),e("option",{value:"0",children:"Non"})]})]}),a("div",{className:"col-span-6 sm:col-span-3",children:[e("label",{htmlFor:"createdat",className:"block mb-2 text-sm font-medium text-gray-900 dark:text-white",children:"Inscrit depuis le"}),e("input",{type:"text",name:"createdat",id:"createdat",disabled:!0,value:u(t.created_at).local("fr").tz("Europe/Paris").format("D MMMM YYYY"),className:"shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500",placeholder:"N/A",required:!0})]}),e("div",{className:"col-span-6 sm:col-full",children:e("button",{className:"text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800",type:"submit",children:"Sauvegarder"})})]})})]})}),e("div",{className:"col-span-full",children:a(D,{children:[e("h3",{className:"text-xl font-semibold dark:text-white",children:"Logs concernant l'utilisateur"}),a("table",{className:"min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-600",children:[e("thead",{className:"bg-gray-100 dark:bg-gray-700",children:a("tr",{children:[e("th",{scope:"col",className:"p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400",children:"Action"}),e("th",{scope:"col",className:"p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400",children:"Utilisateur"}),e("th",{scope:"col",className:"p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400",children:"Cible"}),e("th",{scope:"col",className:"p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400",children:"Adresse IP"}),e("th",{scope:"col",className:"p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400",children:"Fait le"})]})}),e("tbody",{className:"bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700",children:s.logger.data.map((r,d)=>a("tr",{className:"hover:bg-gray-100 dark:hover:bg-gray-700",children:[e("td",{className:"p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white",children:r.enum}),e("td",{className:"p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white",children:e(m,{href:route("admin.users.edit",{id:r.userOrigin.id}),children:r.userOrigin.name})}),e("td",{className:"p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white",children:r.target_id==null?"N/A":e(m,{href:route("admin.users.edit",{id:r.target.id}),children:r.target.name})}),e("td",{className:"p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white",children:r.ip}),e("td",{className:"p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white",children:f.replaceMonth(u(r.created_at).local("fr").tz("Europe/Paris").format("D MMMM YYYY à HH:mm"))})]},d))})]})]})})]})]})}export{W as default};
