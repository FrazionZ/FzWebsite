import{j as r,F as p,a as e,d as i,W as g,r as b,b as y}from"./app-672b5057.js";import{B as x,a as f,F as v}from"./FzToastContainer-cac936b9.js";import{l as k}from"./logo-ec0c8240.js";import{l as w,m as N,n as S}from"./index.esm-5374c5b9.js";import{F as M}from"./index.esm-1d176687.js";import{G as I}from"./iconBase-50bc53c2.js";import{d as a}from"./Toast-e31acce0.js";import{m as s}from"./motion-8d78cff3.js";import{L as B}from"./Language-45cbb11a.js";function C(l){return I({tag:"svg",attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M169.6 377.6c-22.882 0-41.6 18.718-41.6 41.601 0 22.882 18.718 41.6 41.6 41.6s41.601-18.718 41.601-41.6c-.001-22.884-18.72-41.601-41.601-41.601zM48 51.2v41.6h41.6l74.883 151.682-31.308 50.954c-3.118 5.2-5.2 12.482-5.2 19.765 0 27.85 19.025 41.6 44.825 41.6H416v-40H177.893c-3.118 0-5.2-2.082-5.2-5.2 0-1.036 2.207-5.2 2.207-5.2l20.782-32.8h154.954c15.601 0 29.128-8.317 36.4-21.836l74.882-128.8c1.237-2.461 2.082-6.246 2.082-10.399 0-11.446-9.364-19.765-20.8-19.765H135.364L115.6 51.2H48zm326.399 326.4c-22.882 0-41.6 18.718-41.6 41.601 0 22.882 18.718 41.6 41.6 41.6S416 442.082 416 419.2c0-22.883-18.719-41.6-41.601-41.6z"}}]})(l)}function z({auth:l}){return r(p,{children:[e("aside",{id:"sidebar",className:"fixed top-0 left-0 z-20 flex flex-col flex-shrink-0 hidden w-64 h-full pt-16 font-normal duration-75 lg:flex transition-width","aria-label":"Sidebar",children:e("div",{className:"relative flex flex-col flex-1 min-h-0 pt-0 bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700",children:e("div",{className:"flex flex-col flex-1 pt-1 pb-4 overflow-y-auto",children:e("div",{className:"flex-1 space-y-1 bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700",children:e("ul",{className:"pb-2 space-y-2",children:e(a,{className:"w-full",children:e(a.Items,{className:"py-0 px-0",children:r(a.ItemGroup,{className:"py-0 px-0",children:[e(i,{href:route("admin.index"),children:e(a.Item,{icon:w,children:"Accueil"})}),r("div",{className:"categorie-sidebar",children:[e("span",{className:"title",children:"Général"}),r(a.Collapse,{icon:x,open:!0,label:"Paramètres",children:[l.permissions.includes("admin.maintenance")&&e(i,{href:route("admin.maintenance.index"),preserveState:!0,children:e(a.Item,{children:"Maintenance"})}),l.permissions.includes("admin.users.list")&&e(i,{href:route("admin.users.index"),preserveState:!0,children:e(a.Item,{children:"Liste des joueurs"})}),e(i,{href:route("admin.roles.index"),preserveState:!0,children:e(a.Item,{children:"Rôles"})}),e(i,{href:route("admin.index"),preserveState:!0,children:e(a.Item,{children:"Features"})}),e(i,{href:route("admin.index"),preserveState:!0,children:e(a.Item,{children:"Réseaux Sociaux"})})]}),e(i,{href:route("admin.index"),preserveState:!0,children:e(a.Item,{icon:M,children:"Navigation"})})]}),r(a.Collapse,{icon:C,label:"Boutique",open:!0,children:[e(i,{href:route("admin.index"),preserveState:!0,children:e(a.Item,{children:"Liste des articles"})}),e(i,{href:route("admin.index"),preserveState:!0,children:e(a.Item,{children:"Historique d'achats"})})]}),e(a.Collapse,{icon:N,label:"Forum",open:!0,children:e(i,{href:route("admin.forum.categories.index"),preserveState:!0,children:e(a.Item,{children:"Catégories"})})}),e(i,{href:route("admin.logs.index"),preserveState:!0,children:e(a.Item,{icon:f,children:"Logs"})}),e(i,{href:route("admin.pages.index"),preserveState:!0,children:e(a.Item,{icon:S,children:"Pages"})})]})})})})})})})}),e("div",{className:"fixed inset-0 z-10 hidden bg-gray-900/50 dark:bg-gray-900/90",id:"sidebarBackdrop"})]})}function F({text:l,items:d}){let n=g().props.auth.user,h=[{value:"/profile",name:"Profil",type:"inerlink"},{value:"/profile/settings",name:"Paramètres",type:"inerlink"}];const o={open:{opacity:1,y:0,transition:{type:"spring",stiffness:300,damping:24}},closed:{opacity:0,y:20,transition:{duration:.2}}},[c,u]=b.useState(!1);return r(s.nav,{initial:!1,animate:c?"open":"closed",className:"dropdownProfile menu",children:[e(s.button,{whileTap:{scale:.97},onClick:()=>u(!c),className:c?"isOpen":"",children:e("div",{className:"user",children:e("img",{src:`https://auth.frazionz.net/skins/face.php?u=${n.id}`,alt:""})})}),e(s.ul,{variants:{open:{clipPath:"inset(0% 0% 0% 0% round 10px)",transition:{type:"spring",bounce:0,duration:.7,delayChildren:.3,staggerChildren:.05}},closed:{clipPath:"inset(10% 50% 90% 50% round 10px)",transition:{type:"spring",bounce:0,duration:.3}}},style:{pointerEvents:c?"auto":"none"},children:h.map((t,m)=>{if(t.type=="hyperlink")return e("a",{href:t.value,children:e(s.li,{variants:o,children:t.name})},m);if(t.type=="inerlink")return e(i,{href:t.value,method:t.method!==void 0?t.method:"get",children:e(s.li,{variants:o,children:t.name})},m)})})]})}class L extends y.Component{constructor(d){super(d),this.user=d.auth.user}async componentDidMount(){this.sidebar=document.querySelector("#sidebar"),this.toggleSidebarMobile=(d,n,h,o)=>{d.classList.toggle("hidden"),n.classList.toggle("hidden"),h.classList.toggle("hidden"),o.classList.toggle("hidden")},this.toggleSidebarMobileEl=document.getElementById("toggleSidebarMobile"),this.sidebarBackdrop=document.getElementById("sidebarBackdrop"),this.toggleSidebarMobileHamburger=document.getElementById("toggleSidebarMobileHamburger"),this.toggleSidebarMobileClose=document.getElementById("toggleSidebarMobileClose"),this.toggleSidebarMobileEl.addEventListener("click",()=>{this.toggleSidebarMobile(sidebar,sidebarBackdrop,toggleSidebarMobileHamburger,toggleSidebarMobileClose)}),this.sidebarBackdrop.addEventListener("click",()=>{this.toggleSidebarMobile(sidebar,sidebarBackdrop,toggleSidebarMobileHamburger,toggleSidebarMobileClose)})}render(){return r(p,{children:[e("nav",{className:"fixed z-30 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700",children:e("div",{className:"px-3 py-3 lg:px-5 lg:pl-3",children:r("div",{className:"flex items-center justify-between",children:[r("div",{className:"flex items-center justify-start",children:[r("button",{id:"toggleSidebarMobile","aria-expanded":"true","aria-controls":"sidebar",className:"p-2 text-gray-600 rounded cursor-pointer lg:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 dark:focus:bg-gray-700 focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white",children:[e("svg",{id:"toggleSidebarMobileHamburger",className:"w-6 h-6",fill:"currentColor",viewBox:"0 0 20 20",xmlns:"http://www.w3.org/2000/svg",children:e("path",{fillRule:"evenodd",d:"M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z",clipRule:"evenodd"})}),e("svg",{id:"toggleSidebarMobileClose",className:"hidden w-6 h-6",fill:"currentColor",viewBox:"0 0 20 20",xmlns:"http://www.w3.org/2000/svg",children:e("path",{fillRule:"evenodd",d:"M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z",clipRule:"evenodd"})})]}),r(i,{href:route("index"),className:"flex ml-2 md:mr-24",children:[e("img",{src:k,className:"h-8 mr-3",alt:"FlowBite Logo"}),e("span",{className:"self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white",children:"FrazionZ"})]}),r("form",{action:"#",method:"GET",className:"hidden lg:block lg:pl-3.5",children:[e("label",{htmlFor:"topbar-search",className:"sr-only",children:"Search"}),r("div",{className:"relative mt-1 lg:w-96",children:[e("div",{className:"absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none",children:e("svg",{className:"w-5 h-5 text-gray-500 dark:text-gray-400",fill:"currentColor",viewBox:"0 0 20 20",xmlns:"http://www.w3.org/2000/svg",children:e("path",{fillRule:"evenodd",d:"M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z",clipRule:"evenodd"})})}),e("input",{type:"text",name:"email",id:"topbar-search",className:"bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500",placeholder:"Rechercher"})]})]})]}),r("div",{className:"flex items-center ml-3",children:[e("div",{children:e(F,{})}),r("div",{className:"z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600",id:"dropdown-2",children:[r("div",{className:"px-4 py-3",role:"none",children:[e("p",{className:"text-sm text-gray-900 dark:text-white",role:"none",children:"Neil Sims"}),e("p",{className:"text-sm font-medium text-gray-900 truncate dark:text-gray-300",role:"none",children:"neil.sims@flowbite.com"})]}),r("ul",{className:"py-1",role:"none",children:[e("li",{children:e(i,{href:"#",className:"block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white",role:"menuitem",children:"Dashboard"})}),e("li",{children:e(i,{href:"#",className:"block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white",role:"menuitem",children:"Settings"})}),e("li",{children:e(i,{href:"#",className:"block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white",role:"menuitem",children:"Earnings"})}),e("li",{children:e(i,{href:"#",className:"block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white",role:"menuitem",children:"Sign out"})})]})]})]})]})})}),e("div",{className:"flex pt-16 overflow-hidden bg-gray-50 dark:bg-gray-900",children:e(z,{auth:this.props.auth})})]})}}function O({props:l,title:d,children:n}){return new B(g().props.language),r("div",{className:"bg-gray-50 dark:bg-gray-800",children:[e(L,{auth:g().props.auth}),r("div",{id:"main-content",className:"relative h-full overflow-y-auto bg-gray-50 lg:ml-64 dark:bg-gray-900",style:{minHeight:"min-height: calc(100vh - 64px)"},children:[e("main",{children:n}),r("p",{className:"my-10 text-sm text-center text-gray-500",children:["© 2020-2023 ",e("a",{href:" ",className:"hover:underline",target:"_blank",children:"FrazionZ"}),". All rights reserved."]})]}),e(v,{})]})}export{O as A};
