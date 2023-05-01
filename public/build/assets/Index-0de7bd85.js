import{r as o,_ as f,j as a,a as e,n as y,d as b,g as v}from"./app-224f2270.js";import{A as w}from"./AdminLayout-e1f1a36d.js";import{B as k,a as N,P}from"./Toast-af3afca9.js";import{m}from"./fr-0d086dbd.js";import{k as _}from"./index.esm-d02e88c0.js";import"./FzToastContainer-edd11627.js";import"./FzToast-813026fc.js";import"./bubble_warning-9cee2399.js";import"./bubble_infos-3d3cb710.js";import"./logo-5fe7a993.js";import"./dropdownProfile-5594b462.js";import"./iconBase-8021c47a.js";import"./index.esm-11b9cc7a.js";import"./motion-6a6ba2ab.js";import"./Language-45cbb11a.js";m.locale("fr");function K(t){const[g,h]=o.useState(t.users),[n,s]=o.useState(!1),{data:i,setData:u,post:S,processing:j,errors:z}=f({search:"",currentPage:t.users.current_page,_token:t.csrf_token});let p="Utilisateurs";async function l(r){r.preventDefault(),s(!0),axios.post(route("admin.users.search"),{search:i.search,currentPage:i.currentPage,_token:t.csrf_token}).then(function(d){h(d.data),s(!1)}).catch(function(){s(!1)})}return a(w,{children:[e(y,{title:p}),e("div",{className:"p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700",children:a("div",{className:"w-full mb-1",children:[e("div",{className:"mb-4",children:e("h1",{className:"text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white",children:"Utilisateurs"})}),a("div",{className:"sm:flex",children:[e("div",{className:"items-center hidden mb-3 sm:flex sm:divide-x sm:divide-gray-100 sm:mb-0 dark:divide-gray-700",children:e("form",{className:"lg:pr-3",onSubmit:l,children:a("div",{className:"flex items-center gap-4",children:[a("div",{className:"form-group",children:[e("label",{htmlFor:"users-search",className:"sr-only",children:"Rercher un utilisateur"}),e("div",{className:"relative mt-1 lg:w-64 xl:w-96",children:e("input",{type:"text",disabled:n,onKeyPress:r=>{r.keyCode==13&&l(r)},onChange:r=>{u("search",r.target.value)},value:i.search,name:"names",id:"users-search",className:"bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500",placeholder:"Rercher un utilisateur"})})]}),e(k,{onClick:l,className:"h-[3rem]",disabled:n,children:e(_,{})})]})})}),a("div",{className:"flex items-center ml-auto space-x-2 sm:space-x-3",children:[a("button",{type:"button","data-modal-toggle":"add-user-modal",className:"inline-flex items-center justify-center w-1/2 px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 sm:w-auto dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800",children:[e("svg",{className:"w-5 h-5 mr-2 -ml-1",fill:"currentColor",viewBox:"0 0 20 20",xmlns:"http://www.w3.org/2000/svg",children:e("path",{fillRule:"evenodd",d:"M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z",clipRule:"evenodd"})}),"Add user"]}),a("a",{href:"#",className:"inline-flex items-center justify-center w-1/2 px-3 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-primary-300 sm:w-auto dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700",children:[e("svg",{className:"w-5 h-5 mr-2 -ml-1",fill:"currentColor",viewBox:"0 0 20 20",xmlns:"http://www.w3.org/2000/svg",children:e("path",{fillRule:"evenodd",d:"M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z",clipRule:"evenodd"})}),"Export"]})]})]})]})}),e("div",{className:"flex flex-col",children:e("div",{className:"overflow-x-auto",children:e("div",{className:"inline-block min-w-full align-middle",children:e("div",{className:"overflow-hidden shadow",children:a("table",{className:"min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-600",children:[e("thead",{className:"bg-gray-100 dark:bg-gray-700",children:a("tr",{children:[e("th",{scope:"col",className:"p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400",children:"Nom"}),e("th",{scope:"col",className:"p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400",children:"Adresse Email"}),e("th",{scope:"col",className:"p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400",children:"Inscrit le"}),e("th",{scope:"col",className:"p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400",children:"Actions"})]})}),e("tbody",{className:"bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700",children:g.data.map((r,d)=>a("tr",{className:"hover:bg-gray-100 dark:hover:bg-gray-700",children:[a("td",{className:"flex items-center p-4 mr-12 space-x-6 whitespace-nowrap",children:[e("img",{className:"w-10 h-10 rounded-[4px]",src:`https://api.frazionz.net/user/${r.id}/skin/head`,alt:`avatar_${r.id}`}),a("div",{className:"text-sm font-normal text-gray-500 dark:text-gray-400",children:[e("div",{className:"text-base font-semibold text-gray-900 dark:text-white",children:r.name}),e("div",{className:"flex gap-1",children:r.role.map((c,x)=>e(N,{style:{background:c.barStyle.background,color:c.barStyle.color},className:"w-fit text-white",children:c.name},x))})]})]}),e("td",{className:"p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white",children:r.email}),e("td",{className:"p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white",children:m(r.created_at).local("fr").tz("Europe/Paris").format("D MMMM YYYY")}),e("td",{className:"p-4 space-x-2 whitespace-nowrap",children:t.auth.permissions.includes("admin.user.edit")&&a(b,{href:route("admin.users.edit",{id:r.id}),className:"inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800",children:[a("svg",{className:"w-4 h-4 mr-2",fill:"currentColor",viewBox:"0 0 20 20",xmlns:"http://www.w3.org/2000/svg",children:[e("path",{d:"M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"}),e("path",{fillRule:"evenodd",d:"M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z",clipRule:"evenodd"})]}),"Voir l'utilisateur"]})})]},d))})]})})})})}),e("div",{className:"sticky bottom-0 right-0 items-center w-full p-4 bg-white border-t border-gray-200 sm:flex sm:justify-between dark:bg-gray-800 dark:border-gray-700",children:e(P,{currentPage:t.users.current_page,layout:"pagination",showIcons:!0,totalPages:t.users.last_page,className:"flex justify-end gap-10 items-center w-full",previousLabel:"Précédent",nextLabel:"Suivant",onPageChange:r=>{v.get(`${route("admin.users.index")}?page=${r}`)}})})]})}export{K as default};
