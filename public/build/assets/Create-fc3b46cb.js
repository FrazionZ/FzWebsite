import{K as f,j as a,a as e,n as g,F as b,f as v}from"./app-76c6f4b8.js";import{L as x}from"./Layout-1c8c67ee.js";import{C as o}from"./comment-pen-639ffa00.js";import{A as N}from"./Alert-d266c7df.js";import{M as C}from"./Editor-396c51a6.js";import{P as w}from"./switch-54469bd7.js";import"./logo-ec0c8240.js";/* empty css            */import"./index-4d501b15.js";import"./index.esm-a2a84cbf.js";import"./react-markdown-ecc29ba6.js";import"./render-735d4a0a.js";import"./description-ab9786b1.js";function V(i){let n="Candidature";i.auth;const c=15,u=90,{data:t,setData:s,post:m,processing:l,errors:y}=f({age:c,rank:"helper",discordTag:"",public:!0,present:"",_token:i.csrf_token});async function p(){const r=Math.max(c,Math.min(u,Number(event.target.value)));s("age",r)}async function h(r){r.preventDefault(),m(route("candidate.handleCreate"),{preserveState:!0,resetOnSuccess:!0,onFinish:d=>{},onSuccess:d=>{},onError:d=>{}})}return a(x,{title:n,props:i,children:[e(g,{title:n}),a("form",{onSubmit:h,className:"flex flex-col gap-[120px]",children:[a("div",{className:"flex flex-col gap-[30px]",children:[a("div",{className:"justify-start icon_title w-full",children:[e("img",{src:o,alt:""}),e("span",{children:"Candidater"})]}),i.feature==!1&&e(N,{state:"error",message:"Les candidatures sont temporairement désactivées"}),i.feature==!0&&a(b,{children:[e("div",{className:"alert infos w-full",children:a("span",{children:["Pour rejoindre notre équipe, merci de remplir le formulaire ci-dessous. ",e("br",{}),"Merci de suivre un maximum les conditions pour postuler.",e("br",{}),"Les conditions, et un exemple, sont présents sur ",e(v,{href:"#",children:"cette page."})]})}),a("div",{className:"flex gap-8",children:[a("div",{className:"form-group w-1/6",children:[e("label",{children:"Votre âge"}),e("input",{type:"number",className:"text-center",disabled:l,value:t.age,onChange:p})]}),a("div",{className:"form-group w-full",children:[e("label",{children:"Rôle souhaité"}),e("select",{name:"rank",value:t.rank,disabled:l,onChange:r=>{s("rank",r.target.value)},children:e("option",{value:"helper",children:"Helper"})})]})]}),a("div",{className:"flex gap-8 w-full",children:[a("div",{className:"form-group w-full",children:[e("label",{children:"Votre Tag Discord"}),e("input",{type:"text",className:"discord",disabled:l,value:t.discordTag,placeholder:"SuberBob3000#9999",onChange:r=>{s("discordTag",r.target.value)}})]}),a("div",{className:"form-group w-full",children:[e("label",{children:"Visibilité"}),a("div",{className:"flex items-center gap-6 h-full",children:[e(w,{checked:t.public,disabled:l,onChange:r=>{s("public",r)},className:`${t.public?"":"bg-[var(--fzbg-3)]"} relative inline-flex h-6 w-11 items-center rounded-full`,children:e("span",{className:`${t.public?"translate-x-6":"translate-x-1"} inline-block h-4 w-4 transform rounded-full bg-white transition`})}),e("span",{className:"text-base",children:"Souhaitez-vous que votre candidature soit publique ?"})]})]})]})]})]}),a("div",{className:"flex flex-col gap-[30px]",children:[a("div",{className:"justify-start icon_title w-full",children:[e("img",{src:o,alt:""}),e("span",{children:"A toi de jouer !"})]}),e(C,{value:t.present,height:500,disabled:l,onChange:r=>{s("present",r)}})]}),e("div",{className:"flex justify-center",children:e("button",{className:"btn",type:"submit",disabled:l,children:"Envoyer la candidature"})})]})]})}export{V as default};
