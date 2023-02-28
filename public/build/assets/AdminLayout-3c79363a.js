import{j as r,F as h,a as e,f as i,R as m,_ as g}from"./app-77937ea3.js";import{F as u}from"./FzToastContainer-0ddbac78.js";import{l as p}from"./logo-ec0c8240.js";import{G as c,F as b}from"./index.esm-0300a720.js";import{S as a}from"./Toast-383992d5.js";function v(t){return c({tag:"svg",attr:{fill:"currentColor",viewBox:"0 0 16 16"},child:[{tag:"path",attr:{d:"M1 11a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3zm5-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V2z"}}]})(t)}function x(t){return c({tag:"svg",attr:{fill:"currentColor",viewBox:"0 0 16 16"},child:[{tag:"path",attr:{d:"M13 0H6a2 2 0 0 0-2 2 2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm0 13V4a2 2 0 0 0-2-2H5a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1zM3 4a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4z"}}]})(t)}function y(t){return c({tag:"svg",attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"polygon",attr:{points:"3 11 22 2 13 21 11 13 3 11"}}]})(t)}function f(t){return c({tag:"svg",attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M169.6 377.6c-22.882 0-41.6 18.718-41.6 41.601 0 22.882 18.718 41.6 41.6 41.6s41.601-18.718 41.601-41.6c-.001-22.884-18.72-41.601-41.601-41.601zM48 51.2v41.6h41.6l74.883 151.682-31.308 50.954c-3.118 5.2-5.2 12.482-5.2 19.765 0 27.85 19.025 41.6 44.825 41.6H416v-40H177.893c-3.118 0-5.2-2.082-5.2-5.2 0-1.036 2.207-5.2 2.207-5.2l20.782-32.8h154.954c15.601 0 29.128-8.317 36.4-21.836l74.882-128.8c1.237-2.461 2.082-6.246 2.082-10.399 0-11.446-9.364-19.765-20.8-19.765H135.364L115.6 51.2H48zm326.399 326.4c-22.882 0-41.6 18.718-41.6 41.601 0 22.882 18.718 41.6 41.6 41.6S416 442.082 416 419.2c0-22.883-18.719-41.6-41.601-41.6z"}}]})(t)}function k({auth:t}){return r(h,{children:[e("aside",{id:"sidebar",className:"fixed top-0 left-0 z-20 flex flex-col flex-shrink-0 hidden w-64 h-full pt-16 font-normal duration-75 lg:flex transition-width","aria-label":"Sidebar",children:e("div",{className:"relative flex flex-col flex-1 min-h-0 pt-0 bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700",children:e("div",{className:"flex flex-col flex-1 pt-1 pb-4 overflow-y-auto",children:e("div",{className:"flex-1 space-y-1 bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700",children:e("ul",{className:"pb-2 space-y-2",children:e(a,{className:"w-full",children:e(a.Items,{className:"py-0 px-0",children:r(a.ItemGroup,{className:"py-0 px-0",children:[e(i,{href:route("admin.index"),children:e(a.Item,{icon:b,children:"Accueil"})}),r("div",{className:"categorie-sidebar",children:[e("span",{className:"title",children:"Général"}),r(a.Collapse,{icon:v,open:!0,label:"Paramètres",children:[t.permissions.includes("admin.maintenance")&&e(i,{href:route("admin.maintenance.index"),preserveState:!0,children:e(a.Item,{children:"Maintenance"})}),e(i,{href:route("admin.users.index"),preserveState:!0,children:e(a.Item,{children:"Liste des joueurs"})}),e(i,{href:route("admin.roles.index"),preserveState:!0,children:e(a.Item,{children:"Rôles"})}),e(i,{href:route("admin.index"),preserveState:!0,children:e(a.Item,{children:"Features"})}),e(i,{href:route("admin.index"),preserveState:!0,children:e(a.Item,{children:"Réseaux Sociaux"})}),e(i,{href:route("admin.index"),preserveState:!0,children:e(a.Item,{children:"CGU/CGV"})})]}),e(i,{href:route("admin.index"),preserveState:!0,children:e(a.Item,{icon:y,children:"Navigation"})})]}),r(a.Collapse,{icon:f,label:"Boutique",open:!0,children:[e(i,{href:route("admin.index"),preserveState:!0,children:e(a.Item,{children:"Liste des articles"})}),e(i,{href:route("admin.index"),preserveState:!0,children:e(a.Item,{children:"Historique d'achats"})})]}),e(i,{href:route("admin.logs.index"),preserveState:!0,children:e(a.Item,{icon:x,children:"Logs"})})]})})})})})})})}),e("div",{className:"fixed inset-0 z-10 hidden bg-gray-900/50 dark:bg-gray-900/90",id:"sidebarBackdrop"})]})}class w extends m.Component{constructor(l){super(l),this.user=l.auth.user}async componentDidMount(){this.sidebar=document.querySelector("#sidebar"),this.toggleSidebarMobile=(l,n,s,d)=>{l.classList.toggle("hidden"),n.classList.toggle("hidden"),s.classList.toggle("hidden"),d.classList.toggle("hidden")},this.toggleSidebarMobileEl=document.getElementById("toggleSidebarMobile"),this.sidebarBackdrop=document.getElementById("sidebarBackdrop"),this.toggleSidebarMobileHamburger=document.getElementById("toggleSidebarMobileHamburger"),this.toggleSidebarMobileClose=document.getElementById("toggleSidebarMobileClose"),this.toggleSidebarMobileEl.addEventListener("click",()=>{this.toggleSidebarMobile(sidebar,sidebarBackdrop,toggleSidebarMobileHamburger,toggleSidebarMobileClose)}),this.sidebarBackdrop.addEventListener("click",()=>{this.toggleSidebarMobile(sidebar,sidebarBackdrop,toggleSidebarMobileHamburger,toggleSidebarMobileClose)})}render(){return r(h,{children:[e("nav",{className:"fixed z-30 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700",children:e("div",{className:"px-3 py-3 lg:px-5 lg:pl-3",children:r("div",{className:"flex items-center justify-between",children:[r("div",{className:"flex items-center justify-start",children:[r("button",{id:"toggleSidebarMobile","aria-expanded":"true","aria-controls":"sidebar",className:"p-2 text-gray-600 rounded cursor-pointer lg:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 dark:focus:bg-gray-700 focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white",children:[e("svg",{id:"toggleSidebarMobileHamburger",className:"w-6 h-6",fill:"currentColor",viewBox:"0 0 20 20",xmlns:"http://www.w3.org/2000/svg",children:e("path",{fillRule:"evenodd",d:"M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z",clipRule:"evenodd"})}),e("svg",{id:"toggleSidebarMobileClose",className:"hidden w-6 h-6",fill:"currentColor",viewBox:"0 0 20 20",xmlns:"http://www.w3.org/2000/svg",children:e("path",{fillRule:"evenodd",d:"M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z",clipRule:"evenodd"})})]}),r("a",{href:route("index"),className:"flex ml-2 md:mr-24",children:[e("img",{src:p,className:"h-8 mr-3",alt:"FlowBite Logo"}),e("span",{className:"self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white",children:"FrazionZ"})]}),r("form",{action:"#",method:"GET",className:"hidden lg:block lg:pl-3.5",children:[e("label",{htmlFor:"topbar-search",className:"sr-only",children:"Search"}),r("div",{className:"relative mt-1 lg:w-96",children:[e("div",{className:"absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none",children:e("svg",{className:"w-5 h-5 text-gray-500 dark:text-gray-400",fill:"currentColor",viewBox:"0 0 20 20",xmlns:"http://www.w3.org/2000/svg",children:e("path",{fillRule:"evenodd",d:"M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z",clipRule:"evenodd"})})}),e("input",{type:"text",name:"email",id:"topbar-search",className:"bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500",placeholder:"Rechercher"})]})]})]}),r("div",{className:"flex items-center ml-3",children:[e("div",{children:r("button",{type:"button",className:"flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600",id:"user-menu-button-2","aria-expanded":"false","data-dropdown-toggle":"dropdown-2",children:[e("span",{className:"sr-only",children:"Open user menu"}),e("img",{className:"w-8 h-8 rounded-full",src:`https://auth.frazionz.net/skins/face.php?u=${this.user.id}`,alt:"user photo"})]})}),r("div",{className:"z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600",id:"dropdown-2",children:[r("div",{className:"px-4 py-3",role:"none",children:[e("p",{className:"text-sm text-gray-900 dark:text-white",role:"none",children:"Neil Sims"}),e("p",{className:"text-sm font-medium text-gray-900 truncate dark:text-gray-300",role:"none",children:"neil.sims@flowbite.com"})]}),r("ul",{className:"py-1",role:"none",children:[e("li",{children:e("a",{href:"#",className:"block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white",role:"menuitem",children:"Dashboard"})}),e("li",{children:e("a",{href:"#",className:"block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white",role:"menuitem",children:"Settings"})}),e("li",{children:e("a",{href:"#",className:"block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white",role:"menuitem",children:"Earnings"})}),e("li",{children:e("a",{href:"#",className:"block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white",role:"menuitem",children:"Sign out"})})]})]})]})]})})}),e("div",{className:"flex pt-16 overflow-hidden bg-gray-50 dark:bg-gray-900",children:e(k,{auth:this.props.auth})})]})}}class N{constructor(l){this.lang=l,this.loggerReplaceVar=()=>[{key:"%user_name%",value:log.userOrigin.name}]}get(l,n){let s=l.split("."),d=this.lang;for(let o=0;o<s.length;o++)d=d[s[o]];return n!==void 0&&d!==void 0&&n.map(o=>{d=d.replaceAll(o.key,o.value)}),d}replaceMonth(l){return l.replaceAll("January","Janvier").replaceAll("February","Février").replaceAll("March","Mars").replaceAll("April","Avril").replaceAll("May","Mai").replaceAll("June","Juin").replaceAll("July","Julliet").replaceAll("August","Août").replaceAll("September","Septembre").replaceAll("October","Octobre").replaceAll("November","Novembre").replaceAll("December","Décembre")}}function H({props:t,title:l,children:n}){return new N(g().props.language),r("div",{className:"bg-gray-50 dark:bg-gray-800",children:[e(w,{auth:g().props.auth}),r("div",{id:"main-content",className:"relative h-full overflow-y-auto bg-gray-50 lg:ml-64 dark:bg-gray-900",style:{minHeight:"min-height: calc(100vh - 64px)"},children:[e("main",{children:n}),r("p",{className:"my-10 text-sm text-center text-gray-500",children:["© 2020-2023",e("a",{href:" ",className:"hover:underline",target:"_blank",children:"FrazionZ"}),". All rights reserved."]})]}),e(u,{})]})}export{H as A,N as L};
