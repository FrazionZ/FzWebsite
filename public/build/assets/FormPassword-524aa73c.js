import{W as l,r as o,j as r,a as e}from"./app-672b5057.js";import c from"./ValueCard-cc8d77ee.js";import{P as m}from"./lock-9e787567.js";import"./motion-8d78cff3.js";import"./index-7614422b.js";function P(w){const p=l().props.csrf_token,[t,d]=o.useState(""),[a,u]=o.useState(""),[n,i]=o.useState("");return r(c,{title:"Mot de passe",icon:e(m,{stopColorFirst:"white",stopColorLast:"white"}),value:"****************",method:"put",url:route("password.update"),data:{current_password:t,password:a,password_confirmation:n,_token:p},children:[r("div",{className:"form-group",children:[e("label",{children:"Mot de Passe Actuel"}),e("input",{type:"password",name:"current_password",value:t,onChange:s=>{d(s.target.value)}})]}),r("div",{className:"form-group",children:[e("label",{children:"Nouveau mot de passe"}),e("input",{type:"password",value:a,onChange:s=>u(s.target.value)})]}),r("div",{className:"form-group",children:[e("label",{children:"Répéter Nouveau Mot de Passe"}),e("input",{type:"password",value:n,onChange:s=>i(s.target.value)})]})]})}export{P as default};
