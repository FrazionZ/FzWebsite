import{j as e,a as r,n as s}from"./app-71455080.js";import{L as l}from"./Layout-9c6f97a0.js";import{M as p}from"./index-d99276d6.js";/* empty css                */import{L as c}from"./Language-45cbb11a.js";import{m}from"./fr-f9dbd262.js";import"./logo-5fe7a993.js";import"./dropdownProfile-b7601297.js";import"./iconBase-e8b875ef.js";import"./motion-67847c99.js";import"./Dropdown-0b37bd09.js";import"./index.esm-f4450869.js";import"./commentForum-5f640902.js";import"./keyboard-49518c1f.js";import"./transition-1d4ad1bd.js";import"./index-d5c08679.js";import"./FzToastContainer-2d515a7f.js";import"./FzToast-68d30c0b.js";import"./bubble_warning-9cee2399.js";import"./bubble_infos-3d3cb710.js";/* empty css            */import"./twitch-a961c6b4.js";m.locale("fr");function C(o){const i="Support",t=o.ticket,a=new c(o.lang),n=new p;return e(l,{props:o,title:i,children:[r(s,{title:i}),r("div",{className:"ticket view",children:e("div",{className:"infos",children:[r("span",{className:"title",children:t.title}),e("span",{className:"pub_or_up_date",children:["Publié le ",a.replaceMonth(m(t==null?void 0:t.updated_at).local("fr").tz("Europe/Paris").format("D MMMM YYYY à HH:mm"))]})]})}),r("div",{className:"card ticket view my-4",children:r("div",{className:"content",dangerouslySetInnerHTML:{__html:n.render(t==null?void 0:t.problems)}})}),r("h2",{className:"text-2xl font-bold",children:"Conversation"})]})}export{C as default};
