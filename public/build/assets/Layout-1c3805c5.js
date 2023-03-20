import{r as C,j as t,a as e,d as h,W as z}from"./app-683f8c5f.js";import{l as M}from"./logo-ec0c8240.js";import{F as P}from"./FzToastContainer-3091199c.js";import{m as c}from"./motion-6344c4f8.js";import{D as m}from"./Dropdown-aa6c8ca6.js";import{G as x}from"./iconBase-cd6a6821.js";import{A as L}from"./index-041d5bad.js";/* empty css            */import{D as T,T as I}from"./twitch-172887c2.js";const S=(i,n,s)=>{const a=n-i;return((s-i)%a+a)%a+i};function B(...i){const n=C.useRef(0),[s,a]=C.useState(i[n.current]),o=C.useCallback(p=>{n.current=typeof p!="number"?S(0,i.length,n.current+1):p,a(i[n.current])},[i.length,...i]);return[s,o]}function U({text:i,items:n,user:s}){const a={open:{opacity:1,y:0,transition:{type:"spring",stiffness:300,damping:24}},closed:{opacity:0,y:20,transition:{duration:.2}}},[o,p]=C.useState(!1);return t(c.nav,{initial:!1,animate:o?"open":"closed",className:"dropdownProfile menu",children:[t(c.button,{whileTap:{scale:.97},onClick:()=>p(!o),className:o?"isOpen":"",children:[t("div",{className:"user",children:[e("img",{src:`https://auth.frazionz.net/skins/face.php?u=${s.id}`,alt:""}),e("span",{children:s.name})]}),e(c.div,{variants:{open:{rotate:180},closed:{rotate:0}},transition:{duration:.2},style:{originY:.55},children:e("svg",{width:"15",height:"15",viewBox:"0 0 20 20",children:e("path",{d:"M0 7 L 20 7 L 10 16"})})})]}),e(c.ul,{variants:{open:{clipPath:"inset(0% 0% 0% 0% round 10px)",transition:{type:"spring",bounce:0,duration:.7,delayChildren:.3,staggerChildren:.05}},closed:{clipPath:"inset(10% 50% 90% 50% round 10px)",transition:{type:"spring",bounce:0,duration:.3}}},style:{pointerEvents:o?"auto":"none"},children:n.map((l,g)=>{if(l.type=="hyperlink")return e("a",{href:l.value,children:e(c.li,{variants:a,children:l.name})},g);if(l.type=="inerlink")return e(h,{href:l.value,method:l.method!==void 0?l.method:"get",as:l==null?void 0:l.as,children:e(c.li,{variants:a,children:l.name})},g)})})]})}function v({auth:i}){let n=[{value:"/profile",name:"Profil",type:"inerlink"},{value:"/profile?fastMenu=5",name:"Paramètres",type:"inerlink"}];return i.isAccessAdmin&&n.push({value:"/admin",name:"Panel Admin",type:"hyperlink"}),n.push({value:"/logout",name:"Déconnexion",method:"post",type:"inerlink",as:"a"}),e(U,{text:i.user.name,user:i.user,items:n})}function w(){return t("div",{className:"not_logged",children:[e(h,{className:"nav-link",href:"/login",children:"Connexion"}),e(h,{className:"nav-link",href:"/register",children:"Inscription"})]})}const V="/build/assets/logo-78674077.png";function X(i){return x({tag:"svg",attr:{viewBox:"0 0 24 24"},child:[{tag:"path",attr:{d:"M8.465 11.293c1.133-1.133 3.109-1.133 4.242 0l.707.707 1.414-1.414-.707-.707c-.943-.944-2.199-1.465-3.535-1.465s-2.592.521-3.535 1.465L4.929 12a5.008 5.008 0 0 0 0 7.071 4.983 4.983 0 0 0 3.535 1.462A4.982 4.982 0 0 0 12 19.071l.707-.707-1.414-1.414-.707.707a3.007 3.007 0 0 1-4.243 0 3.005 3.005 0 0 1 0-4.243l2.122-2.121z"}},{tag:"path",attr:{d:"m12 4.929-.707.707 1.414 1.414.707-.707a3.007 3.007 0 0 1 4.243 0 3.005 3.005 0 0 1 0 4.243l-2.122 2.121c-1.133 1.133-3.109 1.133-4.242 0L10.586 12l-1.414 1.414.707.707c.943.944 2.199 1.465 3.535 1.465s2.592-.521 3.535-1.465L19.071 12a5.008 5.008 0 0 0 0-7.071 5.006 5.006 0 0 0-7.071 0z"}}]})(i)}function Z(i){return x({tag:"svg",attr:{viewBox:"0 0 24 24"},child:[{tag:"path",attr:{d:"M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"}}]})(i)}const N={closed:{opacity:0},open:{opacity:1}},D={closed:{transition:{staggerChildren:.2,staggerDirection:-1}},open:{transition:{staggerChildren:.2,staggerDirection:1}}};function G({auth:i,navbar:n,mc:s,isHome:a,title:o,className:p}){const{url:l,component:g}=z(),[y,E]=C.useState(!1),[_,k]=B(!1,!0);return t("header",{children:[t("nav",{children:[t("div",{className:"menu_general",children:[t("div",{className:"mobile_menu",children:[e("div",{className:"hamburger",onClick:k,children:e(Z,{})}),e(h,{href:"/",children:e("img",{src:M,className:"logo",alt:"logo"})}),e("div",{className:"menu_account",children:i.isLogged?e(v,{auth:i}):e(w,{})})]}),e(L,{children:_&&e(c.aside,{initial:{width:0},animate:{width:"100%"},exit:{width:0,transition:{delay:.7,duration:.3}},children:e(c.div,{className:"container",initial:"closed",animate:"open",exit:"closed",variants:D,children:n.map((r,d)=>{if(r.type!=="dropdown"&&r.parent_id==null)return e(c.div,{whileHover:{scale:1.1},variants:N,children:e(h,{preserveState:!0,className:`nav-link ${l==r.value?"active":""}`,href:r.value,children:r.name},d)},d);if(r.type=="dropdown"&&r.parent_id==null){let u=[];return n.forEach((f,b)=>{f.parent_id==r.id&&u.push(f)}),e(c.div,{whileHover:{scale:1.1},variants:N,children:e(m,{text:r.name,items:u},d)},d)}})})})}),e("div",{className:`menu_subgeneral ${y?"open":"closed"}`,children:n.map((r,d)=>{if(r.type!=="dropdown"&&r.parent_id==null)return e(h,{preserveState:!0,className:`nav-link ${l==r.value?"active":""}`,href:r.value,children:r.name},d);if(r.type=="dropdown"&&r.parent_id==null){let u=[];return n.forEach((f,b)=>{f.parent_id==r.id&&u.push(f)}),e(m,{text:r.name,items:u},d)}})})]}),e("div",{className:"menu_account",children:i.isLogged?e(v,{auth:i}):e(w,{})})]}),a&&t("div",{className:"flex gap-[300px] justify-center home",children:[t("div",{className:"header-title",children:[e("span",{className:"text-white title",children:"Un serveur"}),e("span",{className:"text-white subtitle",children:"Faction"}),t("span",{className:"text-white server",children:[e("span",{className:"text-[var(--color-2)] pr-3",children:s!==null&&s.online?s.players.online:"-"}),"joueurs connectés"]})]}),e("img",{src:V,className:"header-logo",width:"372"})]}),!a&&e("div",{className:"title_top",children:o})]})}function O(){return t("svg",{width:"128",height:"128",viewBox:"0 0 128 128",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[e("defs",{children:t("linearGradient",{id:"gradientInsta",gradientUnits:"userSpaceOnUse",fy:"90%",children:[e("stop",{offset:"0",stopColor:"white"}),e("stop",{offset:"1",stopColor:"white"})]})}),t("g",{clipPath:"url(#clip0_2036_4180)",children:[e("path",{d:"M64 11.5307C81.088 11.5307 83.1147 11.5947 89.8614 11.904C96.8374 12.224 104.021 13.8133 109.104 18.896C114.235 24.0267 115.776 31.1413 116.096 38.1387C116.405 44.8853 116.469 46.912 116.469 64C116.469 81.088 116.405 83.1147 116.096 89.8613C115.781 96.8 114.155 104.053 109.104 109.104C103.973 114.235 96.864 115.776 89.8614 116.096C83.1147 116.405 81.088 116.469 64 116.469C46.912 116.469 44.8854 116.405 38.1387 116.096C31.2534 115.781 23.904 114.117 18.896 109.104C13.792 104 12.224 96.816 11.904 89.8613C11.5947 83.1147 11.5307 81.088 11.5307 64C11.5307 46.912 11.5947 44.8853 11.904 38.1387C12.2187 31.2267 13.8614 23.9307 18.896 18.896C24.016 13.776 31.1574 12.224 38.1387 11.904C44.8854 11.5947 46.912 11.5307 64 11.5307ZM64 0C46.6187 0 44.4374 0.0746667 37.6107 0.384C27.7174 0.837333 17.8934 3.58933 10.7414 10.7413C3.5627 17.92 0.837364 27.7227 0.384031 37.6107C0.0746972 44.4373 3.05176e-05 46.6187 3.05176e-05 64C3.05176e-05 81.3813 0.0746972 83.5627 0.384031 90.3893C0.837364 100.272 3.60003 110.123 10.7414 117.259C17.9147 124.432 27.7334 127.163 37.6107 127.616C44.4374 127.925 46.6187 128 64 128C81.3814 128 83.5627 127.925 90.3894 127.616C100.277 127.163 110.112 124.405 117.259 117.259C124.443 110.075 127.163 100.277 127.616 90.3893C127.925 83.5627 128 81.3813 128 64C128 46.6187 127.925 44.4373 127.616 37.6107C127.163 27.7173 124.405 17.888 117.259 10.7413C110.096 3.57867 100.251 0.832 90.3894 0.384C83.5627 0.0746667 81.3814 0 64 0Z",fill:"url(#gradientInsta)"}),e("path",{d:"M64.114 31.25C45.9647 31.25 31.25 45.9647 31.25 64.114C31.25 82.2633 45.9647 96.978 64.114 96.978C82.2633 96.978 96.978 82.2633 96.978 64.114C96.978 45.9647 82.2633 31.25 64.114 31.25ZM64.114 85.4473C52.3327 85.4473 42.7807 75.8953 42.7807 64.114C42.7807 52.3327 52.3327 42.7807 64.114 42.7807C75.8953 42.7807 85.4473 52.3327 85.4473 64.114C85.4473 75.8953 75.8953 85.4473 64.114 85.4473Z",fill:"url(#gradientInsta)"}),e("path",{d:"M63.93 71.61C68.1715 71.61 71.61 68.1715 71.61 63.93C71.61 59.6885 68.1715 56.25 63.93 56.25C59.6885 56.25 56.25 59.6885 56.25 63.93C56.25 68.1715 59.6885 71.61 63.93 71.61Z",fill:"url(#gradientInsta)"})]}),e("defs",{children:e("clipPath",{id:"clip0_2036_4180",children:e("rect",{width:"128",height:"128",fill:"url(#gradientInsta)"})})})]})}function A(){return t("svg",{width:"128",height:"128",viewBox:"0 0 128 128",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[e("defs",{children:t("linearGradient",{id:"gradientTiktok",gradientUnits:"userSpaceOnUse",fy:"90%",children:[e("stop",{offset:"0",stopColor:"white"}),e("stop",{offset:"1",stopColor:"white"})]})}),e("g",{clipPath:"url(#clip0_2036_4186)",children:e("path",{d:"M119.866 52.6187C108.458 52.6187 97.882 48.9707 89.2527 42.7733V87.4933C89.2527 109.829 71.082 127.995 48.7513 127.995C40.122 127.995 32.1167 125.275 25.5407 120.656C15.098 113.323 8.25 101.195 8.25 87.4933C8.25 65.1573 26.4207 46.9867 48.7567 46.9867C50.6127 46.9867 52.426 47.1413 54.2127 47.3813V52.592V69.8453C52.4847 69.3067 50.6607 68.992 48.7567 68.992C38.5593 68.992 30.2607 77.2907 30.2607 87.4933C30.2607 94.5973 34.2927 100.768 40.1807 103.867C42.746 105.216 45.6633 105.989 48.762 105.989C58.7247 105.989 66.8527 98.064 67.226 88.1867L67.242 0H89.2473C89.2473 1.90933 89.434 3.77067 89.7647 5.584C91.3167 13.968 96.2927 21.1627 103.189 25.6587C107.989 28.7893 113.717 30.6187 119.861 30.6187V52.6187H119.866Z",fill:"url(#gradientTiktok)"})}),e("defs",{children:e("clipPath",{id:"clip0_2036_4186",children:e("rect",{width:"128",height:"128",fill:"url(#gradientTiktok)"})})})]})}function $(){return t("svg",{width:"128",height:"128",viewBox:"0 0 128 128",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[e("defs",{children:t("linearGradient",{id:"gradientTwitter",gradientUnits:"userSpaceOnUse",fy:"90%",children:[e("stop",{offset:"0",stopColor:"white"}),e("stop",{offset:"1",stopColor:"white"})]})}),e("g",{clipPath:"url(#clip0_2036_4176)",children:e("path",{d:"M114.896 37.8898C114.971 39.0152 114.971 40.1458 114.971 41.2818C114.971 75.9858 88.5493 116.002 40.2507 116.002V115.98C25.984 116.002 12.0107 111.916 0 104.21C2.07467 104.46 4.16 104.583 6.25067 104.588C18.08 104.599 29.568 100.631 38.864 93.3245C27.6267 93.1111 17.7707 85.7832 14.3307 75.0845C18.2667 75.8418 22.32 75.6872 26.1867 74.6365C13.9307 72.1618 5.12 61.3938 5.12 48.8925C5.12 48.7805 5.12 48.6685 5.12 48.5618C8.77333 50.5991 12.8587 51.7245 17.04 51.8471C5.49867 44.1405 1.936 28.7912 8.90667 16.7912C22.24 33.1965 41.9147 43.1698 63.0293 44.2312C60.912 35.1112 63.808 25.5538 70.624 19.1378C81.2 9.19115 97.8347 9.70315 107.781 20.2792C113.664 19.1218 119.301 16.9618 124.459 13.9058C122.496 19.9858 118.395 25.1485 112.912 28.4338C118.123 27.8098 123.205 26.4178 128 24.2951C124.475 29.5698 120.037 34.1725 114.896 37.8898Z",fill:"url(#gradientTwitter)"})}),e("defs",{children:e("clipPath",{id:"clip0_2036_4176",children:e("rect",{width:"128",height:"128",fill:"url(#gradientTwitter)"})})})]})}function j(){return t("svg",{width:"128",height:"128",viewBox:"0 0 128 128",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[e("defs",{children:t("linearGradient",{id:"gradientYoutube",gradientUnits:"userSpaceOnUse",fy:"90%",children:[e("stop",{offset:"0",stopColor:"white"}),e("stop",{offset:"1",stopColor:"white"})]})}),e("g",{clipPath:"url(#clip0_2036_4183)",children:e("path",{d:"M125.323 33.08C123.851 27.5387 119.515 23.1707 114.005 21.688C104.027 19 64 19 64 19C64 19 23.9733 19 13.9893 21.688C8.48533 23.1707 4.14933 27.5333 2.67733 33.08C0 43.128 0 64.088 0 64.088C0 64.088 0 85.048 2.67733 95.096C4.14933 100.637 8.48533 105.005 13.9947 106.488C23.9733 109.176 64 109.176 64 109.176C64 109.176 104.027 109.176 114.011 106.488C119.515 105.005 123.851 100.643 125.328 95.096C128 85.048 128 64.088 128 64.088C128 64.088 128 43.128 125.323 33.08ZM50.912 83.1227V45.0533L84.3627 64.088L50.912 83.1227Z",fill:"url(#gradientYoutube)"})}),e("defs",{children:e("clipPath",{id:"clip0_2036_4183",children:e("rect",{width:"128",height:"128",fill:"url(#gradientYoutube)"})})})]})}function e1({props:i,mc:n,title:s,isHome:a,children:o}){return t("div",{id:"app",children:[e(G,{auth:i.auth,mc:n,title:s,isHome:a,navbar:i.navbar}),e("div",{className:`content ${a?"home":"other"} flex flex-col gap-[90px]`,children:e("div",{className:"mx-8 xl:mx-[340px] pb-16",children:o})}),t("footer",{children:[t("div",{className:"network",children:[e("div",{className:"title",children:"Nos Réseaux"}),t("ul",{children:[e("li",{children:e("a",{className:"social",href:"https://discord.frazionz.net/",target:"_blank",children:e(T,{})})}),e("li",{children:e("a",{className:"social",href:"https://twitter.com/frazionz/",target:"_blank",children:e($,{})})}),e("li",{children:e("a",{className:"social",href:"https://www.instagram.com/frazionz/",target:"_blank",children:e(O,{})})}),e("li",{children:e("a",{className:"social",href:"https://www.youtube.com/",target:"_blank",children:e(j,{})})}),e("li",{children:e("a",{className:"social",href:"https://www.tiktok.com/@frazionz",target:"_blank",children:e(A,{})})}),e("li",{children:e("a",{className:"social",href:"https://www.twitch.tv/frazionz",target:"_blank",children:e(I,{})})})]})]}),t("div",{className:"contact",children:[e("div",{className:"title",children:"Nous Contacter"}),e("a",{href:"mailto:contact@frazionz.net",children:"contact@frazionz.net"})]}),e("div",{className:"credits",children:t("ul",{children:[e("li",{children:"2022 - Tous droits réservés"}),e("li",{children:e("a",{href:"#",children:"Politique de Confidentialités"})}),e("li",{children:e("a",{href:"#",children:"Mentions Légales"})}),e("li",{children:e("a",{href:"#",children:"CGU/CGV"})})]})})]}),e(P,{})]})}export{X as B,e1 as L};
