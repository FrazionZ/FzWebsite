import{W as i,a as e,F as h,j as s}from"./app-f243bcb8.js";function d({bs:l,handleNext:r}){const n=i().props.repos;async function t(a){l.setBranchSelect(a),r()}return e(h,{children:s("div",{className:"flex gap-4 flex-col",id:"branch_select",children:[s("div",{className:"flex flex-col",children:[e("h6",{className:"text-base text-[#fff]",style:{fontWeight:"600"},children:"Branche"}),e("i",{className:"text-white",children:"Séléctionner la cible vers laquelle vous souhaitez publier la version"})]}),e("div",{className:"flex gap-4",children:n.branches.map((a,c)=>e("div",{className:`card w-60 branch_item ${l.branchSelect==c?"active":""}`,onClick:()=>{t(c)},"data-branch-name":a.name,children:e("div",{className:"card-body",children:a.name})},c))})]})})}export{d as default};
