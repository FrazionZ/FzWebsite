import{K as u,j as t,a as e,n as f}from"./app-77937ea3.js";import{L as m}from"./Layout-e26af9ac.js";import{d as p}from"./index.esm-0300a720.js";import"./logo-ec0c8240.js";import"./Dropdown-4d0749b1.js";import"./FzToastContainer-0ddbac78.js";/* empty css            */function C(a){let r="Authentification à deux facteurs";const{data:s,setData:n,post:d,processing:c,errors:l}=u({code:"",_token:a.csrf_token});function o(i){i.preventDefault(),d("/2fa/enable")}return t(m,{props:a,title:r,header:e("h2",{className:"font-semibold text-xl text-gray-800 leading-tight",children:"Profile"}),children:[e(f,{title:r}),t("div",{className:"flex flex-col gap-5",children:[e("div",{className:"card",children:t("div",{className:"card-body flex gap-5 items-center",children:[e(p,{className:"text-5xl"}),t("span",{children:["Pour profiter de l'authentification à deux facteurs, vous pouvez télécharger Google Authenticator.",e("br",{}),"Si votre appareil n'est pas ou plus disponible, vous pouvez utiliser les codes de sauvegarde fournis après la configuration."]})]})}),t("div",{className:"twofa register",children:[e("div",{dangerouslySetInnerHTML:{__html:a.qrCode}}),t("div",{className:"flex flex-col gap-5 w-full",children:[e("form",{onSubmit:o,children:t("div",{className:"flex gap-10",children:[t("div",{className:"form-group",children:[e("label",{children:"Secret"}),e("input",{type:"text",disabled:!0,value:a.secret})]}),t("div",{className:"form-group w-full",children:[e("label",{children:"Code"}),l.code&&e("div",{children:l.code}),e("input",{type:"text",value:s.code,onChange:i=>n("code",i.target.value)})]})]})}),e("button",{className:"btn",onClick:o,type:"submit",disabled:c,children:"Continuer"})]})]})]})]})}export{C as default};
