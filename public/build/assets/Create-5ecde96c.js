import{_ as g,j as a,a as e,n as b,F as v,d as x}from"./app-224f2270.js";import{L as N}from"./Layout-3b0ace19.js";import"./FzToast-813026fc.js";import{C as d}from"./comment-pen-d2ca9284.js";import{A as m}from"./Alert-d39a1e00.js";import{M as C}from"./Editor-01a75d7e.js";import{v as w}from"./switch-a9a32562.js";import"./logo-5fe7a993.js";import"./dropdownProfile-5594b462.js";import"./iconBase-8021c47a.js";import"./motion-6a6ba2ab.js";import"./Dropdown-633105e6.js";import"./index.esm-d02e88c0.js";import"./commentForum-5f640902.js";import"./keyboard-8a80a38f.js";import"./transition-92d51b8d.js";import"./index-6d1beb2d.js";import"./FzToastContainer-edd11627.js";/* empty css            */import"./twitch-20257377.js";import"./bubble_warning-9cee2399.js";import"./bubble_infos-3d3cb710.js";import"./index-4d501b15.js";import"./objectWithoutPropertiesLoose-df62547b.js";import"./index-f6182268.js";function U(l){let s="Candidature";l.auth;const o=15,u=90,{data:t,setData:n,post:p,processing:i,errors:y}=g({age:o,rank:"helper",discordTag:"",public:!0,present:"",_token:l.csrf_token});async function h(){const r=Math.max(o,Math.min(u,Number(event.target.value)));n("age",r)}async function f(r){r.preventDefault(),p(route("candidate.handleCreate"),{preserveState:!0,resetOnSuccess:!0,onFinish:c=>{},onSuccess:c=>{},onError:c=>{}})}return a(N,{title:s,props:l,children:[e(b,{title:s}),a("form",{onSubmit:f,className:"flex flex-col gap-[120px]",children:[a("div",{className:"flex flex-col gap-[30px]",children:[a("div",{className:"justify-start icon_title w-full",children:[e("img",{src:d,alt:""}),e("span",{children:"Candidater"})]}),l.feature==!1&&e(m,{state:"error",children:"Les candidatures sont temporairement désactivées"}),l.feature==!0&&a(v,{children:[e(m,{state:"infos",className:"w-full",children:a("span",{children:["Pour rejoindre notre équipe, merci de remplir le formulaire ci-dessous. ",e("br",{}),"Merci de suivre un maximum les conditions pour postuler.",e("br",{}),"Les conditions, et un exemple, sont présents sur ",e(x,{href:"#",children:"cette page."})]})}),a("div",{className:"flex gap-8",children:[a("div",{className:"form-group w-1/6",children:[e("label",{children:"Votre âge"}),e("input",{type:"number",className:"text-center",disabled:i,value:t.age,onChange:h})]}),a("div",{className:"form-group w-full",children:[e("label",{children:"Rôle souhaité"}),e("select",{name:"rank",value:t.rank,disabled:i,onChange:r=>{n("rank",r.target.value)},children:e("option",{value:"helper",children:"Helper"})})]})]}),a("div",{className:"flex gap-8 w-full",children:[a("div",{className:"form-group w-full",children:[e("label",{children:"Votre Tag Discord"}),e("input",{type:"text",className:"discord",disabled:i,value:t.discordTag,placeholder:"SuberBob3000#9999",onChange:r=>{n("discordTag",r.target.value)}})]}),a("div",{className:"form-group w-full",children:[e("label",{children:"Visibilité"}),a("div",{className:"flex items-center gap-6 h-full",children:[e(w,{checked:t.public,disabled:i,onChange:r=>{n("public",r)},className:`${t.public?"":"bg-[var(--fzbg-3)]"} relative inline-flex h-6 w-11 items-center rounded-full`,children:e("span",{className:`${t.public?"translate-x-6":"translate-x-1"} inline-block h-4 w-4 transform rounded-full bg-white transition`})}),e("span",{className:"text-base",children:"Souhaitez-vous que votre candidature soit publique ?"})]})]})]})]})]}),a("div",{className:"flex flex-col gap-[30px]",children:[a("div",{className:"justify-start icon_title w-full",children:[e("img",{src:d,alt:""}),e("span",{children:"A toi de jouer !"})]}),e(C,{value:t.present,height:500,disabled:i,onChange:r=>{n("present",r)}})]}),e("div",{className:"flex justify-center",children:e("button",{className:"btn",type:"submit",disabled:i,children:"Envoyer la candidature"})})]})]})}export{U as default};
