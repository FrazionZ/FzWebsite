import{j as a,a as e,n as s,d as m}from"./app-672b5057.js";import{A as l}from"./AdminLayout-9ef69618.js";import{L as o}from"./Language-45cbb11a.js";import{B as c}from"./Toast-e31acce0.js";import"./FzToastContainer-cac936b9.js";import"./iconBase-50bc53c2.js";import"./FzToast-684b824e.js";import"./bubble_warning-9cee2399.js";import"./bubble_infos-3d3cb710.js";import"./logo-ec0c8240.js";import"./index.esm-5374c5b9.js";import"./index.esm-1d176687.js";import"./motion-8d78cff3.js";function j(r){let i="Github";return new o(r.language),r.logger,a(l,{children:[e(s,{title:i}),a("table",{className:"mt-3 min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-600",children:[e("thead",{className:"bg-gray-100 dark:bg-gray-700",children:a("tr",{children:[e("th",{scope:"col",className:"p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400",children:"Nom"}),e("th",{scope:"col",className:"p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400",children:"Visiblité"}),e("th",{scope:"col",className:"p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400",children:"Créer le"}),e("th",{scope:"col",className:"p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400",children:"Actions"})]})}),e("tbody",{children:r.repos.data.map((t,d)=>a("tr",{className:"hover:bg-gray-100 dark:hover:bg-gray-700",children:[e("td",{className:"p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white",children:t.name}),e("td",{className:"p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white",children:t.visibility}),e("td",{className:"p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white",children:t.created_at}),e("td",{className:"p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white",children:e(m,{href:route("admin.github.repos.index",t.name),children:e(c,{children:"Voir le répertoire"})})})]},d))})]})]})}export{j as default};
