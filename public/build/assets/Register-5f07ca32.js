import{_ as m,j as t,a as e,n as u}from"./app-224f2270.js";import{L as p}from"./Layout-3b0ace19.js";import{r as f}from"./index.esm-d02e88c0.js";import"./logo-5fe7a993.js";import"./dropdownProfile-5594b462.js";import"./iconBase-8021c47a.js";import"./motion-6a6ba2ab.js";import"./Dropdown-633105e6.js";import"./commentForum-5f640902.js";import"./keyboard-8a80a38f.js";import"./transition-92d51b8d.js";import"./index-6d1beb2d.js";import"./FzToastContainer-edd11627.js";import"./FzToast-813026fc.js";import"./bubble_warning-9cee2399.js";import"./bubble_infos-3d3cb710.js";/* empty css            */import"./twitch-20257377.js";function P(i){let a="Authentification à deux facteurs";const{data:n,setData:d,post:c,processing:l,errors:o}=m({code:"",_token:i.csrf_token});function s(r){r.preventDefault(),c("/2fa/enable")}return t(p,{props:i,title:a,header:e("h2",{className:"font-semibold text-xl text-gray-800 leading-tight",children:"Profile"}),children:[e(u,{title:a}),t("div",{className:"flex flex-col gap-5",children:[e("div",{className:"card",children:t("div",{className:"card-body flex gap-5 items-center",children:[e(f,{className:"text-5xl"}),t("span",{children:["Pour profiter de l'authentification à deux facteurs, vous pouvez télécharger Google Authenticator.",e("br",{}),"Si votre appareil n'est pas ou plus disponible, vous pouvez utiliser les codes de sauvegarde fournis après la configuration."]})]})}),t("div",{className:"twofa register",children:[e("div",{dangerouslySetInnerHTML:{__html:i.qrCode}}),t("div",{className:"flex flex-col gap-5 w-full",children:[e("form",{onSubmit:s,children:t("div",{className:"flex gap-10",children:[t("div",{className:"form-group",children:[e("label",{children:"Secret"}),e("input",{type:"text",disabled:!0,value:i.secret})]}),t("div",{className:"form-group w-full",children:[e("label",{children:"Code"}),o.code&&e("div",{children:o.code}),e("input",{type:"text",value:n.code,disabled:l,onChange:r=>d("code",r.target.value)})]})]})}),e("button",{className:"btn",onClick:s,type:"submit",disabled:l,children:"Continuer"})]})]})]})]})}export{P as default};
