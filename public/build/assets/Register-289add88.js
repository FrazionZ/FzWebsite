import{_ as u,j as t,a as e,n as m}from"./app-f243bcb8.js";import{L as f}from"./Layout-1c3f9603.js";import{m as p}from"./index.esm-dbfbade4.js";import"./logo-ec0c8240.js";import"./FzToastContainer-6e99986b.js";import"./FzToast-d159b48c.js";import"./Dropdown-0a9b586c.js";/* empty css            */import"./iconBase-ac470508.js";function S(a){let r="Authentification à deux facteurs";const{data:s,setData:n,post:c,processing:d,errors:l}=u({code:"",_token:a.csrf_token});function o(i){i.preventDefault(),c("/2fa/enable")}return t(f,{props:a,title:r,header:e("h2",{className:"font-semibold text-xl text-gray-800 leading-tight",children:"Profile"}),children:[e(m,{title:r}),t("div",{className:"flex flex-col gap-5",children:[e("div",{className:"card",children:t("div",{className:"card-body flex gap-5 items-center",children:[e(p,{className:"text-5xl"}),t("span",{children:["Pour profiter de l'authentification à deux facteurs, vous pouvez télécharger Google Authenticator.",e("br",{}),"Si votre appareil n'est pas ou plus disponible, vous pouvez utiliser les codes de sauvegarde fournis après la configuration."]})]})}),t("div",{className:"twofa register",children:[e("div",{dangerouslySetInnerHTML:{__html:a.qrCode}}),t("div",{className:"flex flex-col gap-5 w-full",children:[e("form",{onSubmit:o,children:t("div",{className:"flex gap-10",children:[t("div",{className:"form-group",children:[e("label",{children:"Secret"}),e("input",{type:"text",disabled:!0,value:a.secret})]}),t("div",{className:"form-group w-full",children:[e("label",{children:"Code"}),l.code&&e("div",{children:l.code}),e("input",{type:"text",value:s.code,onChange:i=>n("code",i.target.value)})]})]})}),e("button",{className:"btn",onClick:o,type:"submit",disabled:d,children:"Continuer"})]})]})]})]})}export{S as default};
