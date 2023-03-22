import{r as h,b as j,j as d,a as t,d as y,F as _,W as H}from"./app-64c982be.js";import{l as J}from"./logo-ec0c8240.js";import{b as ee,F as te}from"./FzToastContainer-89ae0283.js";import{m as M}from"./motion-1cf8eba9.js";import{G as U}from"./iconBase-1b0b194b.js";import{D as re}from"./Dropdown-4d4f6aeb.js";import{n as ne,o as ie}from"./index.esm-7b472f02.js";import{C as ae}from"./comments-7ee1c3c3.js";import{l as T,j as Q,L as $,y as D,o as b,u as W,D as E,I as B,p as q,s as le,a as w,r as oe,b as O}from"./keyboard-9254f896.js";import{e as se,L as ce,c as de,d as L,n as ue,C as he,h as pe,F as fe,v as me,a as Z,g as X,A as ve,t as ge}from"./transition-9f144381.js";import{A as K}from"./index-93f0ac29.js";/* empty css            */import{D as Ce,T as we}from"./twitch-d7bb7fb3.js";function ye({container:e,accept:i,walk:n,enabled:o=!0}){let l=h.useRef(i),c=h.useRef(n);h.useEffect(()=>{l.current=i,c.current=n},[i,n]),T(()=>{if(!e||!o)return;let r=se(e);if(!r)return;let a=l.current,u=c.current,m=Object.assign(g=>a(g),{acceptNode:a}),v=r.createTreeWalker(e,NodeFilter.SHOW_ELEMENT,m,!1);for(;v.nextNode();)u(v.currentNode)},[e,o,l,c])}function xe(e){throw new Error("Unexpected object: "+e)}var k=(e=>(e[e.First=0]="First",e[e.Previous=1]="Previous",e[e.Next=2]="Next",e[e.Last=3]="Last",e[e.Specific=4]="Specific",e[e.Nothing=5]="Nothing",e))(k||{});function be(e,i){let n=i.resolveItems();if(n.length<=0)return null;let o=i.resolveActiveIndex(),l=o??-1,c=(()=>{switch(e.focus){case 0:return n.findIndex(r=>!i.resolveDisabled(r));case 1:{let r=n.slice().reverse().findIndex((a,u,m)=>l!==-1&&m.length-u-1>=l?!1:!i.resolveDisabled(a));return r===-1?r:n.length-1-r}case 2:return n.findIndex((r,a)=>a<=l?!1:!i.resolveDisabled(r));case 3:{let r=n.slice().reverse().findIndex(a=>!i.resolveDisabled(a));return r===-1?r:n.length-1-r}case 4:return n.findIndex(r=>i.resolveId(r)===e.id);case 5:return null;default:xe(e)}})();return c===-1?o:c}function Y(e){return[e.screenX,e.screenY]}function Ie(){let e=h.useRef([-1,-1]);return{wasMoved(i){let n=Y(i);return e.current[0]===n[0]&&e.current[1]===n[1]?!1:(e.current=n,!0)},update(i){e.current=Y(i)}}}var Ne=(e=>(e[e.Open=0]="Open",e[e.Closed=1]="Closed",e))(Ne||{}),ke=(e=>(e[e.Pointer=0]="Pointer",e[e.Other=1]="Other",e))(ke||{}),Pe=(e=>(e[e.OpenMenu=0]="OpenMenu",e[e.CloseMenu=1]="CloseMenu",e[e.GoToItem=2]="GoToItem",e[e.Search=3]="Search",e[e.ClearSearch=4]="ClearSearch",e[e.RegisterItem=5]="RegisterItem",e[e.UnregisterItem=6]="UnregisterItem",e))(Pe||{});function A(e,i=n=>n){let n=e.activeItemIndex!==null?e.items[e.activeItemIndex]:null,o=ve(i(e.items.slice()),c=>c.dataRef.current.domRef.current),l=n?o.indexOf(n):null;return l===-1&&(l=null),{items:o,activeItemIndex:l}}let Me={[1](e){return e.menuState===1?e:{...e,activeItemIndex:null,menuState:1}},[0](e){return e.menuState===0?e:{...e,menuState:0}},[2]:(e,i)=>{var n;let o=A(e),l=be(i,{resolveItems:()=>o.items,resolveActiveIndex:()=>o.activeItemIndex,resolveId:c=>c.id,resolveDisabled:c=>c.dataRef.current.disabled});return{...e,...o,searchQuery:"",activeItemIndex:l,activationTrigger:(n=i.trigger)!=null?n:1}},[3]:(e,i)=>{let n=e.searchQuery!==""?0:1,o=e.searchQuery+i.value.toLowerCase(),l=(e.activeItemIndex!==null?e.items.slice(e.activeItemIndex+n).concat(e.items.slice(0,e.activeItemIndex+n)):e.items).find(r=>{var a;return((a=r.dataRef.current.textValue)==null?void 0:a.startsWith(o))&&!r.dataRef.current.disabled}),c=l?e.items.indexOf(l):-1;return c===-1||c===e.activeItemIndex?{...e,searchQuery:o}:{...e,searchQuery:o,activeItemIndex:c,activationTrigger:1}},[4](e){return e.searchQuery===""?e:{...e,searchQuery:"",searchActiveItemIndex:null}},[5]:(e,i)=>{let n=A(e,o=>[...o,{id:i.id,dataRef:i.dataRef}]);return{...e,...n}},[6]:(e,i)=>{let n=A(e,o=>{let l=o.findIndex(c=>c.id===i.id);return l!==-1&&o.splice(l,1),o});return{...e,...n,activationTrigger:1}}},V=h.createContext(null);V.displayName="MenuContext";function z(e){let i=h.useContext(V);if(i===null){let n=new Error(`<${e} /> is missing a parent <Menu /> component.`);throw Error.captureStackTrace&&Error.captureStackTrace(n,z),n}return i}function Se(e,i){return W(i.type,Me,e,i)}let Re=h.Fragment;function Te(e,i){let n=h.useReducer(Se,{menuState:1,buttonRef:h.createRef(),itemsRef:h.createRef(),items:[],searchQuery:"",activeItemIndex:null,activationTrigger:1}),[{menuState:o,itemsRef:l,buttonRef:c},r]=n,a=D(i);ce([c,l],(x,p)=>{var I;r({type:1}),pe(p,fe.Loose)||(x.preventDefault(),(I=c.current)==null||I.focus())},o===0);let u=b(()=>{r({type:1})}),m=h.useMemo(()=>({open:o===0,close:u}),[o,u]),v=e,g={ref:a};return j.createElement(V.Provider,{value:n},j.createElement(de,{value:W(o,{[0]:L.Open,[1]:L.Closed})},E({ourProps:g,theirProps:v,slot:m,defaultTag:Re,name:"Menu"})))}let Fe="button";function _e(e,i){var n;let o=B(),{id:l=`headlessui-menu-button-${o}`,...c}=e,[r,a]=z("Menu.Button"),u=D(r.buttonRef,i),m=q(),v=b(f=>{switch(f.key){case w.Space:case w.Enter:case w.ArrowDown:f.preventDefault(),f.stopPropagation(),a({type:0}),m.nextFrame(()=>a({type:2,focus:k.First}));break;case w.ArrowUp:f.preventDefault(),f.stopPropagation(),a({type:0}),m.nextFrame(()=>a({type:2,focus:k.Last}));break}}),g=b(f=>{switch(f.key){case w.Space:f.preventDefault();break}}),x=b(f=>{if(oe(f.currentTarget))return f.preventDefault();e.disabled||(r.menuState===0?(a({type:1}),m.nextFrame(()=>{var P;return(P=r.buttonRef.current)==null?void 0:P.focus({preventScroll:!0})})):(f.preventDefault(),a({type:0})))}),p=h.useMemo(()=>({open:r.menuState===0}),[r]),I={ref:u,id:l,type:le(e,r.buttonRef),"aria-haspopup":"menu","aria-controls":(n=r.itemsRef.current)==null?void 0:n.id,"aria-expanded":e.disabled?void 0:r.menuState===0,onKeyDown:v,onKeyUp:g,onClick:x};return E({ourProps:I,theirProps:c,slot:p,defaultTag:Fe,name:"Menu.Button"})}let Le="div",$e=Q.RenderStrategy|Q.Static;function De(e,i){var n,o;let l=B(),{id:c=`headlessui-menu-items-${l}`,...r}=e,[a,u]=z("Menu.Items"),m=D(a.itemsRef,i),v=ue(a.itemsRef),g=q(),x=he(),p=(()=>x!==null?(x&L.Open)===L.Open:a.menuState===0)();h.useEffect(()=>{let s=a.itemsRef.current;s&&a.menuState===0&&s!==(v==null?void 0:v.activeElement)&&s.focus({preventScroll:!0})},[a.menuState,a.itemsRef,v]),ye({container:a.itemsRef.current,enabled:a.menuState===0,accept(s){return s.getAttribute("role")==="menuitem"?NodeFilter.FILTER_REJECT:s.hasAttribute("role")?NodeFilter.FILTER_SKIP:NodeFilter.FILTER_ACCEPT},walk(s){s.setAttribute("role","none")}});let I=b(s=>{var F,C;switch(g.dispose(),s.key){case w.Space:if(a.searchQuery!=="")return s.preventDefault(),s.stopPropagation(),u({type:3,value:s.key});case w.Enter:if(s.preventDefault(),s.stopPropagation(),u({type:1}),a.activeItemIndex!==null){let{dataRef:N}=a.items[a.activeItemIndex];(C=(F=N.current)==null?void 0:F.domRef.current)==null||C.click()}X(a.buttonRef.current);break;case w.ArrowDown:return s.preventDefault(),s.stopPropagation(),u({type:2,focus:k.Next});case w.ArrowUp:return s.preventDefault(),s.stopPropagation(),u({type:2,focus:k.Previous});case w.Home:case w.PageUp:return s.preventDefault(),s.stopPropagation(),u({type:2,focus:k.First});case w.End:case w.PageDown:return s.preventDefault(),s.stopPropagation(),u({type:2,focus:k.Last});case w.Escape:s.preventDefault(),s.stopPropagation(),u({type:1}),O().nextFrame(()=>{var N;return(N=a.buttonRef.current)==null?void 0:N.focus({preventScroll:!0})});break;case w.Tab:s.preventDefault(),s.stopPropagation(),u({type:1}),O().nextFrame(()=>{me(a.buttonRef.current,s.shiftKey?Z.Previous:Z.Next)});break;default:s.key.length===1&&(u({type:3,value:s.key}),g.setTimeout(()=>u({type:4}),350));break}}),f=b(s=>{switch(s.key){case w.Space:s.preventDefault();break}}),P=h.useMemo(()=>({open:a.menuState===0}),[a]),R={"aria-activedescendant":a.activeItemIndex===null||(n=a.items[a.activeItemIndex])==null?void 0:n.id,"aria-labelledby":(o=a.buttonRef.current)==null?void 0:o.id,id:c,onKeyDown:I,onKeyUp:f,role:"menu",tabIndex:0,ref:m};return E({ourProps:R,theirProps:r,slot:P,defaultTag:Le,features:$e,visible:p,name:"Menu.Items"})}let Ee=h.Fragment;function ze(e,i){let n=B(),{id:o=`headlessui-menu-item-${n}`,disabled:l=!1,...c}=e,[r,a]=z("Menu.Item"),u=r.activeItemIndex!==null?r.items[r.activeItemIndex].id===o:!1,m=h.useRef(null),v=D(i,m);T(()=>{if(r.menuState!==0||!u||r.activationTrigger===0)return;let C=O();return C.requestAnimationFrame(()=>{var N,G;(G=(N=m.current)==null?void 0:N.scrollIntoView)==null||G.call(N,{block:"nearest"})}),C.dispose},[m,u,r.menuState,r.activationTrigger,r.activeItemIndex]);let g=h.useRef({disabled:l,domRef:m});T(()=>{g.current.disabled=l},[g,l]),T(()=>{var C,N;g.current.textValue=(N=(C=m.current)==null?void 0:C.textContent)==null?void 0:N.toLowerCase()},[g,m]),T(()=>(a({type:5,id:o,dataRef:g}),()=>a({type:6,id:o})),[g,o]);let x=b(()=>{a({type:1})}),p=b(C=>{if(l)return C.preventDefault();a({type:1}),X(r.buttonRef.current)}),I=b(()=>{if(l)return a({type:2,focus:k.Nothing});a({type:2,focus:k.Specific,id:o})}),f=Ie(),P=b(C=>f.update(C)),R=b(C=>{f.wasMoved(C)&&(l||u||a({type:2,focus:k.Specific,id:o,trigger:0}))}),s=b(C=>{f.wasMoved(C)&&(l||u&&a({type:2,focus:k.Nothing}))}),F=h.useMemo(()=>({active:u,disabled:l,close:x}),[u,l,x]);return E({ourProps:{id:o,ref:v,role:"menuitem",tabIndex:l===!0?void 0:-1,"aria-disabled":l===!0?!0:void 0,disabled:void 0,onClick:p,onFocus:I,onPointerEnter:P,onMouseEnter:P,onPointerMove:R,onMouseMove:R,onPointerLeave:s,onMouseLeave:s},theirProps:c,slot:F,defaultTag:Ee,name:"Menu.Item"})}let Ae=$(Te),Oe=$(_e),Ue=$(De),Be=$(ze),S=Object.assign(Ae,{Button:Oe,Items:Ue,Item:Be});function Ve({text:e,items:i,user:n}){const o={open:{opacity:1,y:0,transition:{type:"spring",stiffness:300,damping:24}},closed:{opacity:0,y:20,transition:{duration:.2}}},[l,c]=h.useState(!1);return d(M.nav,{initial:!1,animate:l?"open":"closed",className:"dropdownProfile menu",children:[d(M.button,{whileTap:{scale:.97},onClick:()=>c(!l),className:l?"isOpen":"",children:[d("div",{className:"user",children:[t("img",{src:`https://auth.frazionz.net/skins/face.php?u=${n.id}`,alt:""}),t("span",{className:"hidden lg:block",children:n.name})]}),t(M.div,{variants:{open:{rotate:180},closed:{rotate:0}},transition:{duration:.2},style:{originY:.55},className:"hidden xl:block",children:t("svg",{width:"15",height:"15",viewBox:"0 0 20 20",children:t("path",{d:"M0 7 L 20 7 L 10 16"})})})]}),t(M.ul,{variants:{open:{clipPath:"inset(0% 0% 0% 0% round 10px)",transition:{type:"spring",bounce:0,duration:.7,delayChildren:.3,staggerChildren:.05}},closed:{clipPath:"inset(10% 50% 90% 50% round 10px)",transition:{type:"spring",bounce:0,duration:.3}}},style:{pointerEvents:l?"auto":"none",width:"16rem",right:"0rem"},children:i.map((r,a)=>{if(r.type=="hyperlink")return t("a",{href:r.value,children:t(M.li,{variants:o,children:r.name})},a);if(r.type=="inerlink")return t(y,{href:r.value,method:r.method!==void 0?r.method:"get",as:r==null?void 0:r.as,children:t(M.li,{variants:o,children:r.name})},a)})})]})}function Ge({auth:e}){let i=[{value:"/profile",name:"Profil",type:"inerlink"},{value:"/profile?fastMenu=5",name:"Paramètres",type:"inerlink"}];return e.isAccessAdmin&&i.push({value:"/admin",name:"Panel Admin",type:"hyperlink"}),i.push({value:"/logout",name:"Déconnexion",method:"post",type:"inerlink",as:"a"}),t(Ve,{text:e.user.name,user:e.user,items:i})}function pt(e){return U({tag:"svg",attr:{viewBox:"0 0 24 24"},child:[{tag:"path",attr:{d:"M8.465 11.293c1.133-1.133 3.109-1.133 4.242 0l.707.707 1.414-1.414-.707-.707c-.943-.944-2.199-1.465-3.535-1.465s-2.592.521-3.535 1.465L4.929 12a5.008 5.008 0 0 0 0 7.071 4.983 4.983 0 0 0 3.535 1.462A4.982 4.982 0 0 0 12 19.071l.707-.707-1.414-1.414-.707.707a3.007 3.007 0 0 1-4.243 0 3.005 3.005 0 0 1 0-4.243l2.122-2.121z"}},{tag:"path",attr:{d:"m12 4.929-.707.707 1.414 1.414.707-.707a3.007 3.007 0 0 1 4.243 0 3.005 3.005 0 0 1 0 4.243l-2.122 2.121c-1.133 1.133-3.109 1.133-4.242 0L10.586 12l-1.414 1.414.707.707c.943.944 2.199 1.465 3.535 1.465s2.592-.521 3.535-1.465L19.071 12a5.008 5.008 0 0 0 0-7.071 5.006 5.006 0 0 0-7.071 0z"}}]})(e)}function je(e){return U({tag:"svg",attr:{viewBox:"0 0 24 24"},child:[{tag:"path",attr:{d:"m10.998 16 5-4-5-4v3h-9v2h9z"}},{tag:"path",attr:{d:"M12.999 2.999a8.938 8.938 0 0 0-6.364 2.637L8.049 7.05c1.322-1.322 3.08-2.051 4.95-2.051s3.628.729 4.95 2.051S20 10.13 20 12s-.729 3.628-2.051 4.95-3.08 2.051-4.95 2.051-3.628-.729-4.95-2.051l-1.414 1.414c1.699 1.7 3.959 2.637 6.364 2.637s4.665-.937 6.364-2.637C21.063 16.665 22 14.405 22 12s-.937-4.665-2.637-6.364a8.938 8.938 0 0 0-6.364-2.637z"}}]})(e)}function Qe(e){return U({tag:"svg",attr:{viewBox:"0 0 24 24"},child:[{tag:"path",attr:{d:"M19 8h-2v3h-3v2h3v3h2v-3h3v-2h-3zM4 8a3.91 3.91 0 0 0 4 4 3.91 3.91 0 0 0 4-4 3.91 3.91 0 0 0-4-4 3.91 3.91 0 0 0-4 4zm6 0a1.91 1.91 0 0 1-2 2 1.91 1.91 0 0 1-2-2 1.91 1.91 0 0 1 2-2 1.91 1.91 0 0 1 2 2zM4 18a3 3 0 0 1 3-3h2a3 3 0 0 1 3 3v1h2v-1a5 5 0 0 0-5-5H7a5 5 0 0 0-5 5v1h2z"}}]})(e)}function Ze(){return d(_,{children:[d("div",{className:"not_logged",children:[t(y,{className:"nav-link",href:"/login",children:"Connexion"}),t(y,{className:"nav-link",href:"/register",children:"Inscription"})]}),d("div",{className:"not_logged mobile",children:[t(y,{className:"nav-link",href:"/login",children:t(je,{})}),t(y,{className:"nav-link",href:"/register",children:t(Qe,{})})]})]})}const Ke="/build/assets/logo-78674077.png";function Ye(){var n,o;const e=(n=H().props)==null?void 0:n.auth;console.log(e);let i=[{value:"/profile",name:"Profil",type:"inerlink"},{value:"/profile?fastMenu=5",name:"Paramètres",type:"inerlink"}];return e.isAccessAdmin&&i.push({value:"/admin",name:"Panel Admin",type:"hyperlink"}),i.push({value:"/logout",name:"Déconnexion",method:"post",type:"inerlink",as:"a"}),d(S,{as:"div",className:"flex text-left",children:[t("div",{className:"flex nav-link",children:t(S.Button,{children:e!=null&&e.isLogged?t("img",{src:`https://auth.frazionz.net/skins/face.php?u=${(o=e==null?void 0:e.user)==null?void 0:o.id}`,width:"32",height:"32",alt:""}):t(ne,{})})}),t(ge,{as:h.Fragment,enter:"transition ease-out duration-100",enterFrom:"transform opacity-0 scale-95",enterTo:"transform opacity-100 scale-100",leave:"transition ease-in duration-75",leaveFrom:"transform opacity-100 scale-100",leaveTo:"transform opacity-0 scale-95",children:t(S.Items,{className:"absolute bottom-20 right-4 mt-2 w-40 divide-y divide-gray-100 rounded-md bg-[var(--fzbg-3)] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none",children:t("div",{className:"px-1 py-1 ",children:e!=null&&e.isLogged?t(_,{children:i.map((l,c)=>t(S.Item,{children:t(y,{href:l.value,method:l==null?void 0:l.method,children:t("button",{className:"text-white group flex w-full items-center rounded-md px-2 py-2",children:l==null?void 0:l.name})})}))}):d(_,{children:[t(S.Item,{children:t(y,{href:route("login"),children:t("button",{className:"text-white group flex w-full items-center rounded-md px-2 py-2",children:"Connexion"})})}),t(S.Item,{children:t(y,{href:route("register"),children:t("button",{className:"text-white group flex w-full items-center rounded-md px-2 py-2",children:"Insription"})})})]})})})})]})}function He({auth:e,navbar:i,mc:n,isHome:o,title:l,className:c}){const{url:r,component:a}=H(),[u,m]=h.useState(!1),[v,g]=h.useState(!1);h.useRef(null);async function x(p){p.preventDefault(),p.target.nodeName!=="svg"&&p.target.nodeName!=="BUTTON"&&g(!1)}return v&&window.scrollTo(0,0),v?document.body.style.overflow="hidden":document.body.style.overflow="overlay",document.body.style.overflowX="hidden",d(_,{children:[t(K,{children:t(M.div,{className:`bannerShadow ${v?"":"closed"}`,onClick:x,initial:{opacity:0,display:"none",backdropFilter:"blur(0px)"},animate:{opacity:v?"1":"0",display:"block",backdropFilter:`blur(${v?"5px":"0px"})`},exit:{opacity:0,backdropFilter:"blur(0)",display:"none",transition:{delay:.7,duration:.1}}})}),d("header",{onClick:x,children:[d("nav",{children:[d("div",{className:"menu_general",children:[t(K,{children:t(M.div,{className:"mobile_menu",children:t(y,{href:"/",children:t("img",{src:J,className:"logo",alt:"logo"})})})}),t("div",{className:`menu_subgeneral ${u?"open":"closed"}`,children:i.map((p,I)=>{if(p.type!=="dropdown"&&p.parent_id==null)return t(y,{preserveState:!0,className:`nav-link ${r==p.value?"active":""}`,href:p.value,children:p.name},I);if(p.type=="dropdown"&&p.parent_id==null){let f=[];return i.forEach((P,R)=>{P.parent_id==p.id&&f.push(P)}),t(re,{text:p.name,items:f},I)}})})]}),t("div",{className:"menu_account",children:e.isLogged?t(Ge,{auth:e}):t(Ze,{})})]}),o&&d("div",{className:"flex gap-[300px] justify-center home",children:[d("div",{className:"header-title",children:[t("span",{className:"text-white title",children:"Un serveur"}),t("span",{className:"text-white subtitle",children:"Faction"}),d("span",{className:"text-white server",children:[t("span",{className:"text-[var(--color-2)] pr-3",children:n!==null&&n.online?n.players.online:"-"}),"joueurs connectés"]})]}),t("img",{src:Ke,className:"header-logo",width:"372"})]}),!o&&t("div",{className:"title_top",children:l})]}),t("div",{className:"mobile_navbar",children:d("div",{className:"menu",children:[t(y,{href:"/",className:`nav-link ${r=="/"?"active":""}`,children:t(ee,{})}),t(y,{href:"https://boutique.frazionz.net",className:"nav-link",children:t(ie,{})}),t(y,{href:route("forum.index"),className:`nav-link ${r.startsWith("/forum")?"active":""}`,children:t(ae,{})}),t(Ye,{})]})})]})}function We(){return d("svg",{width:"128",height:"128",viewBox:"0 0 128 128",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[t("defs",{children:d("linearGradient",{id:"gradientInsta",gradientUnits:"userSpaceOnUse",fy:"90%",children:[t("stop",{offset:"0",stopColor:"white"}),t("stop",{offset:"1",stopColor:"white"})]})}),d("g",{clipPath:"url(#clip0_2036_4180)",children:[t("path",{d:"M64 11.5307C81.088 11.5307 83.1147 11.5947 89.8614 11.904C96.8374 12.224 104.021 13.8133 109.104 18.896C114.235 24.0267 115.776 31.1413 116.096 38.1387C116.405 44.8853 116.469 46.912 116.469 64C116.469 81.088 116.405 83.1147 116.096 89.8613C115.781 96.8 114.155 104.053 109.104 109.104C103.973 114.235 96.864 115.776 89.8614 116.096C83.1147 116.405 81.088 116.469 64 116.469C46.912 116.469 44.8854 116.405 38.1387 116.096C31.2534 115.781 23.904 114.117 18.896 109.104C13.792 104 12.224 96.816 11.904 89.8613C11.5947 83.1147 11.5307 81.088 11.5307 64C11.5307 46.912 11.5947 44.8853 11.904 38.1387C12.2187 31.2267 13.8614 23.9307 18.896 18.896C24.016 13.776 31.1574 12.224 38.1387 11.904C44.8854 11.5947 46.912 11.5307 64 11.5307ZM64 0C46.6187 0 44.4374 0.0746667 37.6107 0.384C27.7174 0.837333 17.8934 3.58933 10.7414 10.7413C3.5627 17.92 0.837364 27.7227 0.384031 37.6107C0.0746972 44.4373 3.05176e-05 46.6187 3.05176e-05 64C3.05176e-05 81.3813 0.0746972 83.5627 0.384031 90.3893C0.837364 100.272 3.60003 110.123 10.7414 117.259C17.9147 124.432 27.7334 127.163 37.6107 127.616C44.4374 127.925 46.6187 128 64 128C81.3814 128 83.5627 127.925 90.3894 127.616C100.277 127.163 110.112 124.405 117.259 117.259C124.443 110.075 127.163 100.277 127.616 90.3893C127.925 83.5627 128 81.3813 128 64C128 46.6187 127.925 44.4373 127.616 37.6107C127.163 27.7173 124.405 17.888 117.259 10.7413C110.096 3.57867 100.251 0.832 90.3894 0.384C83.5627 0.0746667 81.3814 0 64 0Z",fill:"url(#gradientInsta)"}),t("path",{d:"M64.114 31.25C45.9647 31.25 31.25 45.9647 31.25 64.114C31.25 82.2633 45.9647 96.978 64.114 96.978C82.2633 96.978 96.978 82.2633 96.978 64.114C96.978 45.9647 82.2633 31.25 64.114 31.25ZM64.114 85.4473C52.3327 85.4473 42.7807 75.8953 42.7807 64.114C42.7807 52.3327 52.3327 42.7807 64.114 42.7807C75.8953 42.7807 85.4473 52.3327 85.4473 64.114C85.4473 75.8953 75.8953 85.4473 64.114 85.4473Z",fill:"url(#gradientInsta)"}),t("path",{d:"M63.93 71.61C68.1715 71.61 71.61 68.1715 71.61 63.93C71.61 59.6885 68.1715 56.25 63.93 56.25C59.6885 56.25 56.25 59.6885 56.25 63.93C56.25 68.1715 59.6885 71.61 63.93 71.61Z",fill:"url(#gradientInsta)"})]}),t("defs",{children:t("clipPath",{id:"clip0_2036_4180",children:t("rect",{width:"128",height:"128",fill:"url(#gradientInsta)"})})})]})}function qe(){return d("svg",{width:"128",height:"128",viewBox:"0 0 128 128",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[t("defs",{children:d("linearGradient",{id:"gradientTiktok",gradientUnits:"userSpaceOnUse",fy:"90%",children:[t("stop",{offset:"0",stopColor:"white"}),t("stop",{offset:"1",stopColor:"white"})]})}),t("g",{clipPath:"url(#clip0_2036_4186)",children:t("path",{d:"M119.866 52.6187C108.458 52.6187 97.882 48.9707 89.2527 42.7733V87.4933C89.2527 109.829 71.082 127.995 48.7513 127.995C40.122 127.995 32.1167 125.275 25.5407 120.656C15.098 113.323 8.25 101.195 8.25 87.4933C8.25 65.1573 26.4207 46.9867 48.7567 46.9867C50.6127 46.9867 52.426 47.1413 54.2127 47.3813V52.592V69.8453C52.4847 69.3067 50.6607 68.992 48.7567 68.992C38.5593 68.992 30.2607 77.2907 30.2607 87.4933C30.2607 94.5973 34.2927 100.768 40.1807 103.867C42.746 105.216 45.6633 105.989 48.762 105.989C58.7247 105.989 66.8527 98.064 67.226 88.1867L67.242 0H89.2473C89.2473 1.90933 89.434 3.77067 89.7647 5.584C91.3167 13.968 96.2927 21.1627 103.189 25.6587C107.989 28.7893 113.717 30.6187 119.861 30.6187V52.6187H119.866Z",fill:"url(#gradientTiktok)"})}),t("defs",{children:t("clipPath",{id:"clip0_2036_4186",children:t("rect",{width:"128",height:"128",fill:"url(#gradientTiktok)"})})})]})}function Xe(){return d("svg",{width:"128",height:"128",viewBox:"0 0 128 128",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[t("defs",{children:d("linearGradient",{id:"gradientTwitter",gradientUnits:"userSpaceOnUse",fy:"90%",children:[t("stop",{offset:"0",stopColor:"white"}),t("stop",{offset:"1",stopColor:"white"})]})}),t("g",{clipPath:"url(#clip0_2036_4176)",children:t("path",{d:"M114.896 37.8898C114.971 39.0152 114.971 40.1458 114.971 41.2818C114.971 75.9858 88.5493 116.002 40.2507 116.002V115.98C25.984 116.002 12.0107 111.916 0 104.21C2.07467 104.46 4.16 104.583 6.25067 104.588C18.08 104.599 29.568 100.631 38.864 93.3245C27.6267 93.1111 17.7707 85.7832 14.3307 75.0845C18.2667 75.8418 22.32 75.6872 26.1867 74.6365C13.9307 72.1618 5.12 61.3938 5.12 48.8925C5.12 48.7805 5.12 48.6685 5.12 48.5618C8.77333 50.5991 12.8587 51.7245 17.04 51.8471C5.49867 44.1405 1.936 28.7912 8.90667 16.7912C22.24 33.1965 41.9147 43.1698 63.0293 44.2312C60.912 35.1112 63.808 25.5538 70.624 19.1378C81.2 9.19115 97.8347 9.70315 107.781 20.2792C113.664 19.1218 119.301 16.9618 124.459 13.9058C122.496 19.9858 118.395 25.1485 112.912 28.4338C118.123 27.8098 123.205 26.4178 128 24.2951C124.475 29.5698 120.037 34.1725 114.896 37.8898Z",fill:"url(#gradientTwitter)"})}),t("defs",{children:t("clipPath",{id:"clip0_2036_4176",children:t("rect",{width:"128",height:"128",fill:"url(#gradientTwitter)"})})})]})}function Je(){return d("svg",{width:"128",height:"128",viewBox:"0 0 128 128",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[t("defs",{children:d("linearGradient",{id:"gradientYoutube",gradientUnits:"userSpaceOnUse",fy:"90%",children:[t("stop",{offset:"0",stopColor:"white"}),t("stop",{offset:"1",stopColor:"white"})]})}),t("g",{clipPath:"url(#clip0_2036_4183)",children:t("path",{d:"M125.323 33.08C123.851 27.5387 119.515 23.1707 114.005 21.688C104.027 19 64 19 64 19C64 19 23.9733 19 13.9893 21.688C8.48533 23.1707 4.14933 27.5333 2.67733 33.08C0 43.128 0 64.088 0 64.088C0 64.088 0 85.048 2.67733 95.096C4.14933 100.637 8.48533 105.005 13.9947 106.488C23.9733 109.176 64 109.176 64 109.176C64 109.176 104.027 109.176 114.011 106.488C119.515 105.005 123.851 100.643 125.328 95.096C128 85.048 128 64.088 128 64.088C128 64.088 128 43.128 125.323 33.08ZM50.912 83.1227V45.0533L84.3627 64.088L50.912 83.1227Z",fill:"url(#gradientYoutube)"})}),t("defs",{children:t("clipPath",{id:"clip0_2036_4183",children:t("rect",{width:"128",height:"128",fill:"url(#gradientYoutube)"})})})]})}function ft({props:e,mc:i,title:n,isHome:o,children:l}){return d("div",{id:"app",children:[t(He,{auth:e.auth,mc:i,title:n,isHome:o,navbar:e.navbar}),t("div",{className:`content ${o?"home":"other"} flex flex-col gap-[90px]`,children:t("div",{className:"mx-8 xl:mx-[340px] pb-16",children:l})}),d("footer",{children:[d("div",{className:"network",children:[t("div",{className:"title",children:"Nos Réseaux"}),d("ul",{children:[t("li",{children:t("a",{className:"social",href:"https://discord.frazionz.net/",target:"_blank",children:t(Ce,{})})}),t("li",{children:t("a",{className:"social",href:"https://twitter.com/frazionz/",target:"_blank",children:t(Xe,{})})}),t("li",{children:t("a",{className:"social",href:"https://www.instagram.com/frazionz/",target:"_blank",children:t(We,{})})}),t("li",{children:t("a",{className:"social",href:"https://www.youtube.com/",target:"_blank",children:t(Je,{})})}),t("li",{children:t("a",{className:"social",href:"https://www.tiktok.com/@frazionz",target:"_blank",children:t(qe,{})})}),t("li",{children:t("a",{className:"social",href:"https://www.twitch.tv/frazionz",target:"_blank",children:t(we,{})})})]})]}),d("div",{className:"contact",children:[t("div",{className:"title",children:"Nous Contacter"}),t("a",{href:"mailto:contact@frazionz.net",children:"contact@frazionz.net"})]}),t("div",{className:"credits",children:d("ul",{children:[t("li",{children:"2022 - Tous droits réservés"}),t("li",{children:t("a",{href:"#",children:"Politique de Confidentialités"})}),t("li",{children:t("a",{href:"#",children:"Mentions Légales"})}),t("li",{children:t("a",{href:"#",children:"CGU/CGV"})})]})})]}),t(te,{})]})}export{pt as B,ft as L};
