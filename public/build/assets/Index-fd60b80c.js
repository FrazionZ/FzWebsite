import{j as r,a as e,n as c,d as i,g as o}from"./app-672b5057.js";import{A as g}from"./AdminLayout-9ef69618.js";import{L as x}from"./Language-45cbb11a.js";import{P as h}from"./Toast-e31acce0.js";import{m as d}from"./fr-4635b133.js";import"./FzToastContainer-cac936b9.js";import"./iconBase-50bc53c2.js";import"./FzToast-684b824e.js";import"./bubble_warning-9cee2399.js";import"./bubble_infos-3d3cb710.js";import"./logo-ec0c8240.js";import"./index.esm-5374c5b9.js";import"./index.esm-1d176687.js";import"./motion-8d78cff3.js";d.locale("fr");function Y(a){let s="Logs";const l=new x(a.language),n=a.logger;return r(g,{children:[e(c,{title:s}),e("div",{className:"p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700",children:e("div",{className:"w-full",children:e("h1",{className:"text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white",children:"Logs"})})}),e("div",{className:"flex flex-col",children:e("div",{className:"overflow-x-auto",children:e("div",{className:"inline-block min-w-full align-middle",children:e("div",{className:"overflow-hidden shadow",children:r("table",{className:"min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-600",children:[e("thead",{className:"bg-gray-100 dark:bg-gray-700",children:r("tr",{children:[e("th",{scope:"col",className:"p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400",children:"Action"}),e("th",{scope:"col",className:"p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400",children:"Utilisateur"}),e("th",{scope:"col",className:"p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400",children:"Cible"}),e("th",{scope:"col",className:"p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400",children:"Adresse IP"}),e("th",{scope:"col",className:"p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400",children:"Fait le"})]})}),e("tbody",{className:"bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700",children:n.data.map((t,m)=>r("tr",{className:"hover:bg-gray-100 dark:hover:bg-gray-700",children:[e("td",{className:"p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white",children:t.enum}),e("td",{className:"p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white",children:e(i,{href:route("admin.users.edit",{id:t.userOrigin.id}),children:t.userOrigin.name})}),e("td",{className:"p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white",children:t.target_id==null?"N/A":e(i,{href:route("admin.users.edit",{id:t.target.id}),children:t.target.name})}),e("td",{className:"p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white",children:t.ip}),e("td",{className:"p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white",children:l.replaceMonth(d(t.created_at).local("fr").tz("Europe/Paris").format("D MMMM YYYY à HH:mm"))})]},m))})]})})})})}),e("div",{className:"sticky bottom-0 right-0 items-center w-full p-4 bg-white border-t border-gray-200 sm:flex sm:justify-between dark:bg-gray-800 dark:border-gray-700",children:e(h,{currentPage:a.logger.current_page,layout:"pagination",showIcons:!0,totalPages:a.logger.last_page,className:"flex justify-end gap-10 items-center w-full",previousLabel:"Précédent",nextLabel:"Suivant",onPageChange:t=>{o.get(`${route("admin.logs.index")}?page=${t}`)}})})]})}export{Y as default};
