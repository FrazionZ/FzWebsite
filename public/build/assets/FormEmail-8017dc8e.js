import{W as i,r as l,j as r,a as t}from"./app-36574797.js";import d from"./ValueCard-4f576a01.js";import"./motion-0558cbd3.js";import"./index-4d3ed913.js";const f="/build/assets/envelope-65c6b108.svg";function b(v){const n=i().props.csrf_token,[m,h]=l.useState(i().props.auth.user),[s,u]=l.useState(""),[o,p]=l.useState("");let e=m.email.split("@"),c=e[0].slice(0,3)+"******"+e[0].slice(e[0].length-3,e[0].length)+"@"+e[1];return r(d,{title:"Adresse Email",icon:f,value:c,method:"put",url:route("email.update"),data:{email:s,email_confirmation:o,_token:n},children:[r("div",{className:"form-group",children:[t("label",{children:"Nouvelle adresse email"}),t("input",{type:"text",value:s,onChange:a=>u(a.target.value)})]}),r("div",{className:"form-group",children:[t("label",{children:"Confirmer nouvelle adresse email"}),t("input",{type:"text",value:o,onChange:a=>p(a.target.value)})]})]})}export{b as default};
