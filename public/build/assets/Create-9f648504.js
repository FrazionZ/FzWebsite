import{_ as n,j as r,a as t,n as c}from"./app-672b5057.js";import{L as d}from"./Layout-3ca0b6bc.js";import{M as u}from"./Editor-5b8bc3f2.js";import"./logo-ec0c8240.js";import"./FzToastContainer-cac936b9.js";import"./iconBase-50bc53c2.js";import"./FzToast-684b824e.js";import"./bubble_warning-9cee2399.js";import"./bubble_infos-3d3cb710.js";import"./motion-8d78cff3.js";import"./Dropdown-9b0b5663.js";import"./index.esm-5374c5b9.js";import"./commentForum-5f640902.js";import"./keyboard-f708b31e.js";import"./transition-a48ecbed.js";import"./index-7614422b.js";/* empty css            */import"./twitch-bbd8d24a.js";import"./objectWithoutPropertiesLoose-df62547b.js";import"./index-4d501b15.js";import"./index-71931d8b.js";function B(i){const a="Support",{data:m,setData:o,post:p,processing:l,errors:h}=n({title:"",ch_id:1,problem:"",_token:i.csrf_token});return r(d,{props:i,title:a,children:[t(c,{title:a}),r("form",{onSubmit:e=>{e.preventDefault(),p(route("support.create.handle"))},className:"flex flex-col gap-5 mt-8",children:[r("div",{className:"grid grid-cols-1 2xl:grid-cols-2 gap-8",children:[r("div",{className:"form-group",children:[t("label",{children:"Titre"}),t("input",{type:"text",disabled:l,value:m.title,onChange:e=>{o("title",e.target.value)}})]}),r("div",{className:"form-group",children:[t("label",{children:"Catégorie"}),t("select",{disabled:l,onChange:e=>{o("ch_id",e.taget.value)},children:i.categories.map((e,s)=>t("option",{value:e.id,children:e.name},s))})]})]}),r("div",{className:"form-group",children:[t("label",{children:"Quel est votre problème ?"}),t(u,{preview:"edit",value:m.problem,onChange:e=>{o("problem",e)}})]}),t("button",{disabled:l,type:"submit",className:"btn",children:"Envoyer"})]})]})}export{B as default};
