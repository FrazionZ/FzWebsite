import{_ as p,j as t,a as e,n as c,F as h}from"./app-224f2270.js";import{L as f}from"./Layout-3b0ace19.js";import{A as s}from"./Alert-d39a1e00.js";import"./TextInput-4d0ed9c4.js";import"./logo-5fe7a993.js";import"./dropdownProfile-5594b462.js";import"./iconBase-8021c47a.js";import"./motion-6a6ba2ab.js";import"./Dropdown-633105e6.js";import"./index.esm-d02e88c0.js";import"./commentForum-5f640902.js";import"./keyboard-8a80a38f.js";import"./transition-92d51b8d.js";import"./index-6d1beb2d.js";import"./FzToastContainer-edd11627.js";import"./FzToast-813026fc.js";import"./bubble_warning-9cee2399.js";import"./bubble_infos-3d3cb710.js";/* empty css            */import"./twitch-20257377.js";import"./index-4d501b15.js";function E(r){const n="Changement de pseudo",o=r.aCAC,{data:l,setData:m,post:d,processing:a,errors:g}=p({username:r.auth.user.name,_token:r.csrf_token});async function u(i){i.preventDefault(),d(route("profile.username.handle"))}return t(f,{props:r,title:n,header:e("h2",{className:"font-semibold text-xl text-gray-800 leading-tight",children:n}),children:[e(c,{title:n}),t("div",{className:"flex flex-col gap-6",children:[e(s,{state:"infos",children:t(h,{children:["Votre pseudo doit respecter le règlement et doit être disponible.",e("br",{}),"Veuillez noter que votre stuff ainsi que l'intégralité de vos données ne seront pas perdus.",e("br",{}),"Vous ne pourez changer de pseudo que 30 jours après le dernier changement."]})}),o.result&&t(s,{state:"error",children:["Impossible de changer de pseudo, la dernière modification (",o.date,") date d'il y a moins de ",o.diff," jours."]}),t("form",{onSubmit:u,children:[t("div",{className:"form-group w-full",children:[e("label",{children:"Votre nouveau pseudo"}),e("input",{type:"text",placeholder:r.auth.user.name,value:l.username,onChange:i=>{m("username",i.target.value)},disabled:o.result||a})]}),e("button",{className:"btn mt-6",disabled:o.result||a,type:"submit",children:"Continuer"})]})]})]})}export{E as default};
