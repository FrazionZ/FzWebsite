import{a as e,F as l,j as r}from"./app-f243bcb8.js";import{F as s}from"./FzToast-d159b48c.js";import{T as o,B as m}from"./Toast-d93510d5.js";import"./iconBase-ac470508.js";function x({vn:a,handleNext:n}){const i=()=>{if(a.versionName=="")return s.error("Le numéro de version semble vide");if(!/^(\*|\d+(\.\d+){0,2}(\.\*)?)$/.test(a.versionName))return s.error("Le numéro de version semble invalide");n()};return e(l,{children:r("div",{className:"flex gap-4 flex-col",id:"branch_select",children:[r("div",{className:"flex flex-col",children:[e("h6",{className:"text-base text-[#fff]",style:{fontWeight:"600"},children:"Numéro de la version"}),e("i",{className:"text-white",children:"Ce numéro sera ajouter au tag final de la release"})]}),r("div",{className:"flex gap-4",children:[e(o,{type:"text",onChange:t=>{a.setVersionName(t.target.value)},value:a.versionName}),e(m,{onClick:i,children:"Suivant"})]})]})})}export{x as default};
