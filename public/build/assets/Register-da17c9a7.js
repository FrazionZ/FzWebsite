import{_ as u,j as t,a as e,n as m}from"./app-e514fc58.js";import{L as p}from"./Layout-0d02a113.js";import{m as f}from"./index.esm-db316a1a.js";import"./logo-ec0c8240.js";import"./FzToastContainer-693dfff9.js";import"./FzToast-5756d4a1.js";import"./bubble_warning-38724665.js";import"./bubble_infos-2d9e4d74.js";import"./motion-3c11ff0a.js";import"./Dropdown-b187739c.js";/* empty css            */import"./iconBase-86610970.js";function w(i){let a="Authentification à deux facteurs";const{data:s,setData:n,post:c,processing:d,errors:l}=u({code:"",_token:i.csrf_token});function o(r){r.preventDefault(),c("/2fa/enable")}return t(p,{props:i,title:a,header:e("h2",{className:"font-semibold text-xl text-gray-800 leading-tight",children:"Profile"}),children:[e(m,{title:a}),t("div",{className:"flex flex-col gap-5",children:[e("div",{className:"card",children:t("div",{className:"card-body flex gap-5 items-center",children:[e(f,{className:"text-5xl"}),t("span",{children:["Pour profiter de l'authentification à deux facteurs, vous pouvez télécharger Google Authenticator.",e("br",{}),"Si votre appareil n'est pas ou plus disponible, vous pouvez utiliser les codes de sauvegarde fournis après la configuration."]})]})}),t("div",{className:"twofa register",children:[e("div",{dangerouslySetInnerHTML:{__html:i.qrCode}}),t("div",{className:"flex flex-col gap-5 w-full",children:[e("form",{onSubmit:o,children:t("div",{className:"flex gap-10",children:[t("div",{className:"form-group",children:[e("label",{children:"Secret"}),e("input",{type:"text",disabled:!0,value:i.secret})]}),t("div",{className:"form-group w-full",children:[e("label",{children:"Code"}),l.code&&e("div",{children:l.code}),e("input",{type:"text",value:s.code,onChange:r=>n("code",r.target.value)})]})]})}),e("button",{className:"btn",onClick:o,type:"submit",disabled:d,children:"Continuer"})]})]})]})]})}export{w as default};
