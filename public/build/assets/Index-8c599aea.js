import{j as a,a as e,n as c,d as o}from"./app-224f2270.js";import{A as n}from"./AdminLayout-e1f1a36d.js";import{L as p}from"./Language-45cbb11a.js";import{B as x}from"./Toast-af3afca9.js";import{m as d}from"./fr-0d086dbd.js";import"./FzToastContainer-edd11627.js";import"./FzToast-813026fc.js";import"./bubble_warning-9cee2399.js";import"./bubble_infos-3d3cb710.js";import"./logo-5fe7a993.js";import"./index.esm-d02e88c0.js";import"./iconBase-8021c47a.js";import"./dropdownProfile-5594b462.js";import"./index.esm-11b9cc7a.js";import"./motion-6a6ba2ab.js";d.locale("fr");function L(r){let i="Pages";const l=new p(r.language),s=r.pages;return a(n,{children:[e(c,{title:i}),e("div",{className:"p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700",children:e("div",{className:"w-full",children:e("h1",{className:"text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white",children:i})})}),e("div",{className:"flex flex-col",children:e("div",{className:"overflow-x-auto",children:e("div",{className:"inline-block min-w-full align-middle",children:e("div",{className:"overflow-hidden shadow",children:a("table",{className:"min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-600",children:[e("thead",{className:"bg-gray-100 dark:bg-gray-700",children:a("tr",{children:[e("th",{scope:"col",className:"p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400",children:"Titre"}),e("th",{scope:"col",className:"p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400",children:"slug"}),e("th",{scope:"col",className:"p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400",children:"Publié le"}),e("th",{scope:"col",className:"p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400",children:"Actions"})]})}),e("tbody",{className:"bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700",children:s.map((t,m)=>a("tr",{className:"hover:bg-gray-100 dark:hover:bg-gray-700",children:[e("td",{className:"p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white",children:t.title}),e("td",{className:"p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white",children:t.slug}),e("td",{className:"p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white",children:l.replaceMonth(d(t.created_at).local("fr").tz("Europe/Paris").format("D MMMM YYYY à HH:mm"))}),e("td",{className:"p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white",children:e(o,{href:route("admin.pages.edit",{id:t.id}),children:e(x,{children:"Editer la page"})})})]},m))})]})})})})})]})}export{L as default};
