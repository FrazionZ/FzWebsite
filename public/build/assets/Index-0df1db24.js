import{_ as p,j as t,a as e,n as c,F as h}from"./app-672b5057.js";import{L as f}from"./Layout-3ca0b6bc.js";import{A as s}from"./Alert-81a8af72.js";import"./TextInput-8bb4dea7.js";import"./logo-ec0c8240.js";import"./FzToastContainer-cac936b9.js";import"./iconBase-50bc53c2.js";import"./FzToast-684b824e.js";import"./bubble_warning-9cee2399.js";import"./bubble_infos-3d3cb710.js";import"./motion-8d78cff3.js";import"./Dropdown-9b0b5663.js";import"./index.esm-5374c5b9.js";import"./commentForum-5f640902.js";import"./keyboard-f708b31e.js";import"./transition-a48ecbed.js";import"./index-7614422b.js";/* empty css            */import"./twitch-bbd8d24a.js";import"./index-4d501b15.js";function B(r){const n="Changement de pseudo",o=r.aCAC,{data:l,setData:m,post:d,processing:i,errors:g}=p({username:r.auth.user.name,_token:r.csrf_token});async function u(a){a.preventDefault(),d(route("profile.username.handle"))}return t(f,{props:r,title:n,header:e("h2",{className:"font-semibold text-xl text-gray-800 leading-tight",children:n}),children:[e(c,{title:n}),t("div",{className:"flex flex-col gap-6",children:[e(s,{state:"infos",children:t(h,{children:["Votre pseudo doit respecter le règlement et doit être disponible.",e("br",{}),"Veuillez noter que votre stuff ainsi que l'intégralité de vos données ne seront pas perdus.",e("br",{}),"Vous ne pourez changer de pseudo que 30 jours après le dernier changement."]})}),o.result&&t(s,{state:"error",children:["Impossible de changer de pseudo, la dernière modification (",o.date,") date d'il y a moins de ",o.diff," jours."]}),t("form",{onSubmit:u,children:[t("div",{className:"form-group w-full",children:[e("label",{children:"Votre nouveau pseudo"}),e("input",{type:"text",placeholder:r.auth.user.name,value:l.username,onChange:a=>{m("username",a.target.value)},disabled:o.result||i})]}),e("button",{className:"btn mt-6",disabled:o.result||i,type:"submit",children:"Continuer"})]})]})]})}export{B as default};
