import{r as f,R as w,j as R,a as l,f as X,_ as Le}from"./app-8fbe077e.js";import{l as Be}from"./logo-ec0c8240.js";import{l as J,V as le,j as xe,y as ce,o as P,C as Qe,u as Me,p as ye,X as ue,a as Pe,s as Ue,m as be,K as Fe}from"./transition-54bdab1d.js";import{e as je,L as He,I as Ie,n as qe,h as Ve,F as Ke,o as _,r as Ge,v as We,a as we,g as $e,A as Xe}from"./use-owner-8a709d1d.js";import{s as Ye}from"./use-resolve-button-type-8516e810.js";import{a as Je,b as Ze,c as et,d as tt,e as nt,f as rt}from"./index.esm-4184eea0.js";/* empty css            */function at({container:e,accept:t,walk:n,enabled:a=!0}){let o=f.useRef(t),i=f.useRef(n);f.useEffect(()=>{o.current=t,i.current=n},[t,n]),J(()=>{if(!e||!a)return;let r=je(e);if(!r)return;let s=o.current,u=i.current,v=Object.assign(g=>s(g),{acceptNode:s}),T=r.createTreeWalker(e,NodeFilter.SHOW_ELEMENT,v,!1);for(;T.nextNode();)u(T.currentNode)},[e,a,o,i])}function st(e){throw new Error("Unexpected object: "+e)}var O=(e=>(e[e.First=0]="First",e[e.Previous=1]="Previous",e[e.Next=2]="Next",e[e.Last=3]="Last",e[e.Specific=4]="Specific",e[e.Nothing=5]="Nothing",e))(O||{});function ot(e,t){let n=t.resolveItems();if(n.length<=0)return null;let a=t.resolveActiveIndex(),o=a??-1,i=(()=>{switch(e.focus){case 0:return n.findIndex(r=>!t.resolveDisabled(r));case 1:{let r=n.slice().reverse().findIndex((s,u,v)=>o!==-1&&v.length-u-1>=o?!1:!t.resolveDisabled(s));return r===-1?r:n.length-1-r}case 2:return n.findIndex((r,s)=>s<=o?!1:!t.resolveDisabled(r));case 3:{let r=n.slice().reverse().findIndex(s=>!t.resolveDisabled(s));return r===-1?r:n.length-1-r}case 4:return n.findIndex(r=>t.resolveId(r)===e.id);case 5:return null;default:st(e)}})();return i===-1?a:i}function Ne(e){return[e.screenX,e.screenY]}function it(){let e=f.useRef([-1,-1]);return{wasMoved(t){let n=Ne(t);return e.current[0]===n[0]&&e.current[1]===n[1]?!1:(e.current=n,!0)},update(t){e.current=Ne(t)}}}var lt=(e=>(e[e.Open=0]="Open",e[e.Closed=1]="Closed",e))(lt||{}),ct=(e=>(e[e.Pointer=0]="Pointer",e[e.Other=1]="Other",e))(ct||{}),ut=(e=>(e[e.OpenMenu=0]="OpenMenu",e[e.CloseMenu=1]="CloseMenu",e[e.GoToItem=2]="GoToItem",e[e.Search=3]="Search",e[e.ClearSearch=4]="ClearSearch",e[e.RegisterItem=5]="RegisterItem",e[e.UnregisterItem=6]="UnregisterItem",e))(ut||{});function pe(e,t=n=>n){let n=e.activeItemIndex!==null?e.items[e.activeItemIndex]:null,a=Xe(t(e.items.slice()),i=>i.dataRef.current.domRef.current),o=n?a.indexOf(n):null;return o===-1&&(o=null),{items:a,activeItemIndex:o}}let dt={[1](e){return e.menuState===1?e:{...e,activeItemIndex:null,menuState:1}},[0](e){return e.menuState===0?e:{...e,menuState:0}},[2]:(e,t)=>{var n;let a=pe(e),o=ot(t,{resolveItems:()=>a.items,resolveActiveIndex:()=>a.activeItemIndex,resolveId:i=>i.id,resolveDisabled:i=>i.dataRef.current.disabled});return{...e,...a,searchQuery:"",activeItemIndex:o,activationTrigger:(n=t.trigger)!=null?n:1}},[3]:(e,t)=>{let n=e.searchQuery!==""?0:1,a=e.searchQuery+t.value.toLowerCase(),o=(e.activeItemIndex!==null?e.items.slice(e.activeItemIndex+n).concat(e.items.slice(0,e.activeItemIndex+n)):e.items).find(r=>{var s;return((s=r.dataRef.current.textValue)==null?void 0:s.startsWith(a))&&!r.dataRef.current.disabled}),i=o?e.items.indexOf(o):-1;return i===-1||i===e.activeItemIndex?{...e,searchQuery:a}:{...e,searchQuery:a,activeItemIndex:i,activationTrigger:1}},[4](e){return e.searchQuery===""?e:{...e,searchQuery:"",searchActiveItemIndex:null}},[5]:(e,t)=>{let n=pe(e,a=>[...a,{id:t.id,dataRef:t.dataRef}]);return{...e,...n}},[6]:(e,t)=>{let n=pe(e,a=>{let o=a.findIndex(i=>i.id===t.id);return o!==-1&&a.splice(o,1),a});return{...e,...n,activationTrigger:1}}},Ee=f.createContext(null);Ee.displayName="MenuContext";function de(e){let t=f.useContext(Ee);if(t===null){let n=new Error(`<${e} /> is missing a parent <Menu /> component.`);throw Error.captureStackTrace&&Error.captureStackTrace(n,de),n}return t}function mt(e,t){return Me(t.type,dt,e,t)}let ft=f.Fragment,pt=le(function(e,t){let n=f.useReducer(mt,{menuState:1,buttonRef:f.createRef(),itemsRef:f.createRef(),items:[],searchQuery:"",activeItemIndex:null,activationTrigger:1}),[{menuState:a,itemsRef:o,buttonRef:i},r]=n,s=ce(t);He([i,o],(x,p)=>{var y;r({type:1}),Ve(p,Ke.Loose)||(x.preventDefault(),(y=i.current)==null||y.focus())},a===0);let u=P(()=>{r({type:1})}),v=f.useMemo(()=>({open:a===0,close:u}),[a,u]),T=e,g={ref:s};return w.createElement(Ee.Provider,{value:n},w.createElement(Qe,{value:Me(a,{[0]:ye.Open,[1]:ye.Closed})},ue({ourProps:g,theirProps:T,slot:v,defaultTag:ft,name:"Menu"})))}),ht="button",vt=le(function(e,t){var n;let a=Ie(),{id:o=`headlessui-menu-button-${a}`,...i}=e,[r,s]=de("Menu.Button"),u=ce(r.buttonRef,t),v=Pe(),T=P(m=>{switch(m.key){case _.Space:case _.Enter:case _.ArrowDown:m.preventDefault(),m.stopPropagation(),s({type:0}),v.nextFrame(()=>s({type:2,focus:O.First}));break;case _.ArrowUp:m.preventDefault(),m.stopPropagation(),s({type:0}),v.nextFrame(()=>s({type:2,focus:O.Last}));break}}),g=P(m=>{switch(m.key){case _.Space:m.preventDefault();break}}),x=P(m=>{if(Ge(m.currentTarget))return m.preventDefault();e.disabled||(r.menuState===0?(s({type:1}),v.nextFrame(()=>{var d;return(d=r.buttonRef.current)==null?void 0:d.focus({preventScroll:!0})})):(m.preventDefault(),s({type:0})))}),p=f.useMemo(()=>({open:r.menuState===0}),[r]),y={ref:u,id:o,type:Ye(e,r.buttonRef),"aria-haspopup":"menu","aria-controls":(n=r.itemsRef.current)==null?void 0:n.id,"aria-expanded":e.disabled?void 0:r.menuState===0,onKeyDown:T,onKeyUp:g,onClick:x};return ue({ourProps:y,theirProps:i,slot:p,defaultTag:ht,name:"Menu.Button"})}),gt="div",yt=xe.RenderStrategy|xe.Static,bt=le(function(e,t){var n,a;let o=Ie(),{id:i=`headlessui-menu-items-${o}`,...r}=e,[s,u]=de("Menu.Items"),v=ce(s.itemsRef,t),T=qe(s.itemsRef),g=Pe(),x=Ue(),p=(()=>x!==null?x===ye.Open:s.menuState===0)();f.useEffect(()=>{let c=s.itemsRef.current;!c||s.menuState===0&&c!==(T==null?void 0:T.activeElement)&&c.focus({preventScroll:!0})},[s.menuState,s.itemsRef,T]),at({container:s.itemsRef.current,enabled:s.menuState===0,accept(c){return c.getAttribute("role")==="menuitem"?NodeFilter.FILTER_REJECT:c.hasAttribute("role")?NodeFilter.FILTER_SKIP:NodeFilter.FILTER_ACCEPT},walk(c){c.setAttribute("role","none")}});let y=P(c=>{var N,h;switch(g.dispose(),c.key){case _.Space:if(s.searchQuery!=="")return c.preventDefault(),c.stopPropagation(),u({type:3,value:c.key});case _.Enter:if(c.preventDefault(),c.stopPropagation(),u({type:1}),s.activeItemIndex!==null){let{dataRef:I}=s.items[s.activeItemIndex];(h=(N=I.current)==null?void 0:N.domRef.current)==null||h.click()}$e(s.buttonRef.current);break;case _.ArrowDown:return c.preventDefault(),c.stopPropagation(),u({type:2,focus:O.Next});case _.ArrowUp:return c.preventDefault(),c.stopPropagation(),u({type:2,focus:O.Previous});case _.Home:case _.PageUp:return c.preventDefault(),c.stopPropagation(),u({type:2,focus:O.First});case _.End:case _.PageDown:return c.preventDefault(),c.stopPropagation(),u({type:2,focus:O.Last});case _.Escape:c.preventDefault(),c.stopPropagation(),u({type:1}),be().nextFrame(()=>{var I;return(I=s.buttonRef.current)==null?void 0:I.focus({preventScroll:!0})});break;case _.Tab:c.preventDefault(),c.stopPropagation(),u({type:1}),be().nextFrame(()=>{We(s.buttonRef.current,c.shiftKey?we.Previous:we.Next)});break;default:c.key.length===1&&(u({type:3,value:c.key}),g.setTimeout(()=>u({type:4}),350));break}}),m=P(c=>{switch(c.key){case _.Space:c.preventDefault();break}}),d=f.useMemo(()=>({open:s.menuState===0}),[s]),b={"aria-activedescendant":s.activeItemIndex===null||(n=s.items[s.activeItemIndex])==null?void 0:n.id,"aria-labelledby":(a=s.buttonRef.current)==null?void 0:a.id,id:i,onKeyDown:y,onKeyUp:m,role:"menu",tabIndex:0,ref:v};return ue({ourProps:b,theirProps:r,slot:d,defaultTag:gt,features:yt,visible:p,name:"Menu.Items"})}),Tt=f.Fragment,It=le(function(e,t){let n=Ie(),{id:a=`headlessui-menu-item-${n}`,disabled:o=!1,...i}=e,[r,s]=de("Menu.Item"),u=r.activeItemIndex!==null?r.items[r.activeItemIndex].id===a:!1,v=f.useRef(null),T=ce(t,v);J(()=>{if(r.menuState!==0||!u||r.activationTrigger===0)return;let h=be();return h.requestAnimationFrame(()=>{var I,F;(F=(I=v.current)==null?void 0:I.scrollIntoView)==null||F.call(I,{block:"nearest"})}),h.dispose},[v,u,r.menuState,r.activationTrigger,r.activeItemIndex]);let g=f.useRef({disabled:o,domRef:v});J(()=>{g.current.disabled=o},[g,o]),J(()=>{var h,I;g.current.textValue=(I=(h=v.current)==null?void 0:h.textContent)==null?void 0:I.toLowerCase()},[g,v]),J(()=>(s({type:5,id:a,dataRef:g}),()=>s({type:6,id:a})),[g,a]);let x=P(()=>{s({type:1})}),p=P(h=>{if(o)return h.preventDefault();s({type:1}),$e(r.buttonRef.current)}),y=P(()=>{if(o)return s({type:2,focus:O.Nothing});s({type:2,focus:O.Specific,id:a})}),m=it(),d=P(h=>m.update(h)),b=P(h=>{!m.wasMoved(h)||o||u||s({type:2,focus:O.Specific,id:a,trigger:0})}),c=P(h=>{!m.wasMoved(h)||o||!u||s({type:2,focus:O.Nothing})}),N=f.useMemo(()=>({active:u,disabled:o,close:x}),[u,o,x]);return ue({ourProps:{id:a,ref:T,role:"menuitem",tabIndex:o===!0?void 0:-1,"aria-disabled":o===!0?!0:void 0,disabled:void 0,onClick:p,onFocus:y,onPointerEnter:d,onMouseEnter:d,onPointerMove:b,onMouseMove:b,onPointerLeave:c,onMouseLeave:c},theirProps:i,slot:N,defaultTag:Tt,name:"Menu.Item"})}),B=Object.assign(pt,{Button:vt,Items:bt,Item:It});const se=f;function Et({title:e,titleId:t,...n},a){return se.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true",ref:a,"aria-labelledby":t},n),e?se.createElement("title",{id:t},e):null,se.createElement("path",{fillRule:"evenodd",d:"M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z",clipRule:"evenodd"}))}const xt=se.forwardRef(Et);var wt=xt,Nt=wt;function Rt(...e){return e.filter(Boolean).join(" ")}function Ct({text:e,items:t,user:n}){return R(B,{as:"div",className:"relative inline-block text-left nav-link",children:[l("div",{children:R(B.Button,{className:"nav-link user",children:[l("span",{className:"py-[10px] px-[24px]",children:e}),l("img",{className:"rounded-[5px] w-[48px]",src:`https://auth.frazionz.net/skins/face.php?u=${n.id}`,alt:""})]})}),l(Fe,{as:f.Fragment,enter:"transition ease-out duration-100",enterFrom:"transform opacity-0 scale-95",enterTo:"transform opacity-100 scale-100",leave:"transition ease-in duration-75",leaveFrom:"transform opacity-100 scale-100",leaveTo:"transform opacity-0 scale-95",children:l(B.Items,{className:"absolute dropdown_menu right-0 z-10 mt-2 w-56 origin-top-right shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none",children:t.map((a,o)=>l(B.Item,{children:({active:i})=>l(X,{href:a.value,method:a.method!==void 0?a.method:"get",className:Rt(i?"bg-[var(--fzbg-1)]":"","block px-4 py-2 text-[16px] leading-[24px] font-normal text-[#FFF]"),children:a.name})},o))})})]})}function _t({auth:e}){let t=[{value:"/profile",name:"Profil"},{value:"/profile/settings",name:"Paramètres"}];return e.isAdmin&&t.push({value:"/admin",name:"Panel Admin"}),t.push({value:"/logout",name:"Déconnexion",method:"post"}),l(Ct,{text:e.user.name,user:e.user,items:t})}function kt(){return R("div",{className:"not_logged",children:[l(X,{className:"nav-link",href:"/login",children:"Connexion"}),l(X,{className:"nav-link",href:"/register",children:"Inscription"})]})}const Lt="/build/assets/logo-78674077.png";function Mt(...e){return e.filter(Boolean).join(" ")}function Pt({text:e,items:t}){return R(B,{as:"div",className:"relative inline-block text-left nav-link",children:[l("div",{children:R(B.Button,{className:"nav-link",children:[e,l(Nt,{className:"-mr-1 ml-2 h-5 w-5","aria-hidden":"true"})]})}),l(Fe,{as:f.Fragment,enter:"transition ease-out duration-100",enterFrom:"transform opacity-0 scale-95",enterTo:"transform opacity-100 scale-100",leave:"transition ease-in duration-75",leaveFrom:"transform opacity-100 scale-100",leaveTo:"transform opacity-0 scale-95",children:l(B.Items,{className:"absolute dropdown_menu right-0 z-10 mt-2 w-56 origin-top-right shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none",children:t.map((n,a)=>l(B.Item,{children:({active:o})=>l(X,{href:n.value,method:n.method!==void 0?n.method:"get",className:Mt(o?"bg-[var(--fzbg-1)]":"","block px-4 py-2 text-[16px] leading-[24px] font-normal text-[#FFF]"),children:n.name})},a))})})]})}function Ft({auth:e,navbar:t,mc:n,isHome:a,title:o,className:i}){const{url:r,component:s}=Le();return R("header",{children:[R("nav",{children:[R("div",{className:"menu_general",children:[l(X,{href:"/",children:l("img",{src:Be,className:"logo",alt:"logo"})}),l("div",{className:"menu_subgeneral",children:t.map((u,v)=>{if(u.type!=="dropdown"&&u.parent_id==null)return l(X,{preserveState:!0,className:`nav-link ${r==u.value?"active":""}`,href:u.value,children:u.name},v);if(u.type=="dropdown"&&u.parent_id==null){let T=[];return t.forEach((g,x)=>{g.parent_id==u.id&&T.push(g)}),l(Pt,{text:u.name,items:T},v)}})})]}),l("div",{className:"menu_account",children:e.isLogged?l(_t,{auth:e}):l(kt,{})})]}),a&&R("div",{className:"flex gap-[300px] justify-center home",children:[R("div",{className:"header-title",children:[l("span",{className:"text-96 pacifico text-white title",children:"Un serveur"}),l("span",{className:"text-144 pacifico  text-white subtitle",children:"Faction"}),R("span",{className:"text-36 text-white server",children:[l("span",{className:"text-[var(--color-2)] pr-3",children:n!==null&&n.online?n.players.online:"-"}),"joueurs connectés"]})]}),l("img",{src:Lt,className:"header-logo",width:"372"})]}),!a&&l("div",{className:"title_top",children:o})]})}function Oe(e){var t,n,a="";if(typeof e=="string"||typeof e=="number")a+=e;else if(typeof e=="object")if(Array.isArray(e))for(t=0;t<e.length;t++)e[t]&&(n=Oe(e[t]))&&(a&&(a+=" "),a+=n);else for(t in e)e[t]&&(a&&(a+=" "),a+=t);return a}function Q(){for(var e,t,n=0,a="";n<arguments.length;)(e=arguments[n++])&&(t=Oe(e))&&(a&&(a+=" "),a+=t);return a}const ee=e=>typeof e=="number"&&!isNaN(e),G=e=>typeof e=="string",k=e=>typeof e=="function",oe=e=>G(e)||k(e)?e:null,he=e=>f.isValidElement(e)||G(e)||k(e)||ee(e);function $t(e,t,n){n===void 0&&(n=300);const{scrollHeight:a,style:o}=e;requestAnimationFrame(()=>{o.minHeight="initial",o.height=a+"px",o.transition=`all ${n}ms`,requestAnimationFrame(()=>{o.height="0",o.padding="0",o.margin="0",setTimeout(t,n)})})}function me(e){let{enter:t,exit:n,appendPosition:a=!1,collapse:o=!0,collapseDuration:i=300}=e;return function(r){let{children:s,position:u,preventExitTransition:v,done:T,nodeRef:g,isIn:x}=r;const p=a?`${t}--${u}`:t,y=a?`${n}--${u}`:n,m=f.useRef(0);return f.useLayoutEffect(()=>{const d=g.current,b=p.split(" "),c=N=>{N.target===g.current&&(d.dispatchEvent(new Event("d")),d.removeEventListener("animationend",c),d.removeEventListener("animationcancel",c),m.current===0&&N.type!=="animationcancel"&&d.classList.remove(...b))};d.classList.add(...b),d.addEventListener("animationend",c),d.addEventListener("animationcancel",c)},[]),f.useEffect(()=>{const d=g.current,b=()=>{d.removeEventListener("animationend",b),o?$t(d,T,i):T()};x||(v?b():(m.current=1,d.className+=` ${y}`,d.addEventListener("animationend",b)))},[x]),w.createElement(w.Fragment,null,s)}}function Re(e,t){return{content:e.content,containerId:e.props.containerId,id:e.props.toastId,theme:e.props.theme,type:e.props.type,data:e.props.data||{},isLoading:e.props.isLoading,icon:e.props.icon,status:t}}const M={list:new Map,emitQueue:new Map,on(e,t){return this.list.has(e)||this.list.set(e,[]),this.list.get(e).push(t),this},off(e,t){if(t){const n=this.list.get(e).filter(a=>a!==t);return this.list.set(e,n),this}return this.list.delete(e),this},cancelEmit(e){const t=this.emitQueue.get(e);return t&&(t.forEach(clearTimeout),this.emitQueue.delete(e)),this},emit(e){this.list.has(e)&&this.list.get(e).forEach(t=>{const n=setTimeout(()=>{t(...[].slice.call(arguments,1))},0);this.emitQueue.has(e)||this.emitQueue.set(e,[]),this.emitQueue.get(e).push(n)})}},re=e=>{let{theme:t,type:n,...a}=e;return w.createElement("svg",{viewBox:"0 0 24 24",width:"100%",height:"100%",fill:t==="colored"?"currentColor":`var(--toastify-icon-color-${n})`,...a})},ve={info:function(e){return w.createElement(re,{...e},w.createElement("path",{d:"M12 0a12 12 0 1012 12A12.013 12.013 0 0012 0zm.25 5a1.5 1.5 0 11-1.5 1.5 1.5 1.5 0 011.5-1.5zm2.25 13.5h-4a1 1 0 010-2h.75a.25.25 0 00.25-.25v-4.5a.25.25 0 00-.25-.25h-.75a1 1 0 010-2h1a2 2 0 012 2v4.75a.25.25 0 00.25.25h.75a1 1 0 110 2z"}))},warning:function(e){return w.createElement(re,{...e},w.createElement("path",{d:"M23.32 17.191L15.438 2.184C14.728.833 13.416 0 11.996 0c-1.42 0-2.733.833-3.443 2.184L.533 17.448a4.744 4.744 0 000 4.368C1.243 23.167 2.555 24 3.975 24h16.05C22.22 24 24 22.044 24 19.632c0-.904-.251-1.746-.68-2.44zm-9.622 1.46c0 1.033-.724 1.823-1.698 1.823s-1.698-.79-1.698-1.822v-.043c0-1.028.724-1.822 1.698-1.822s1.698.79 1.698 1.822v.043zm.039-12.285l-.84 8.06c-.057.581-.408.943-.897.943-.49 0-.84-.367-.896-.942l-.84-8.065c-.057-.624.25-1.095.779-1.095h1.91c.528.005.84.476.784 1.1z"}))},success:function(e){return w.createElement(re,{...e},w.createElement("path",{d:"M12 0a12 12 0 1012 12A12.014 12.014 0 0012 0zm6.927 8.2l-6.845 9.289a1.011 1.011 0 01-1.43.188l-4.888-3.908a1 1 0 111.25-1.562l4.076 3.261 6.227-8.451a1 1 0 111.61 1.183z"}))},error:function(e){return w.createElement(re,{...e},w.createElement("path",{d:"M11.983 0a12.206 12.206 0 00-8.51 3.653A11.8 11.8 0 000 12.207 11.779 11.779 0 0011.8 24h.214A12.111 12.111 0 0024 11.791 11.766 11.766 0 0011.983 0zM10.5 16.542a1.476 1.476 0 011.449-1.53h.027a1.527 1.527 0 011.523 1.47 1.475 1.475 0 01-1.449 1.53h-.027a1.529 1.529 0 01-1.523-1.47zM11 12.5v-6a1 1 0 012 0v6a1 1 0 11-2 0z"}))},spinner:function(){return w.createElement("div",{className:"Toastify__spinner"})}};function Ot(e){const[,t]=f.useReducer(p=>p+1,0),[n,a]=f.useState([]),o=f.useRef(null),i=f.useRef(new Map).current,r=p=>n.indexOf(p)!==-1,s=f.useRef({toastKey:1,displayedToast:0,count:0,queue:[],props:e,containerId:null,isToastActive:r,getToast:p=>i.get(p)}).current;function u(p){let{containerId:y}=p;const{limit:m}=s.props;!m||y&&s.containerId!==y||(s.count-=s.queue.length,s.queue=[])}function v(p){a(y=>p==null?[]:y.filter(m=>m!==p))}function T(){const{toastContent:p,toastProps:y,staleId:m}=s.queue.shift();x(p,y,m)}function g(p,y){let{delay:m,staleId:d,...b}=y;if(!he(p)||function(S){return!o.current||s.props.enableMultiContainer&&S.containerId!==s.props.containerId||i.has(S.toastId)&&S.updateId==null}(b))return;const{toastId:c,updateId:N,data:h}=b,{props:I}=s,F=()=>v(c),A=N==null;A&&s.count++;const C={...I,style:I.toastStyle,key:s.toastKey++,...b,toastId:c,updateId:N,data:h,closeToast:F,isIn:!1,className:oe(b.className||I.toastClassName),bodyClassName:oe(b.bodyClassName||I.bodyClassName),progressClassName:oe(b.progressClassName||I.progressClassName),autoClose:!b.isLoading&&(j=b.autoClose,W=I.autoClose,j===!1||ee(j)&&j>0?j:W),deleteToast(){const S=Re(i.get(c),"removed");i.delete(c),M.emit(4,S);const z=s.queue.length;if(s.count=c==null?s.count-s.displayedToast:s.count-1,s.count<0&&(s.count=0),z>0){const $=c==null?s.props.limit:1;if(z===1||$===1)s.displayedToast++,T();else{const q=$>z?z:$;s.displayedToast=q;for(let L=0;L<q;L++)T()}}else t()}};var j,W;C.iconOut=function(S){let{theme:z,type:$,isLoading:q,icon:L}=S,D=null;const V={theme:z,type:$};return L===!1||(k(L)?D=L(V):f.isValidElement(L)?D=f.cloneElement(L,V):G(L)||ee(L)?D=L:q?D=ve.spinner():(ne=>ne in ve)($)&&(D=ve[$](V))),D}(C),k(b.onOpen)&&(C.onOpen=b.onOpen),k(b.onClose)&&(C.onClose=b.onClose),C.closeButton=I.closeButton,b.closeButton===!1||he(b.closeButton)?C.closeButton=b.closeButton:b.closeButton===!0&&(C.closeButton=!he(I.closeButton)||I.closeButton);let H=p;f.isValidElement(p)&&!G(p.type)?H=f.cloneElement(p,{closeToast:F,toastProps:C,data:h}):k(p)&&(H=p({closeToast:F,toastProps:C,data:h})),I.limit&&I.limit>0&&s.count>I.limit&&A?s.queue.push({toastContent:H,toastProps:C,staleId:d}):ee(m)?setTimeout(()=>{x(H,C,d)},m):x(H,C,d)}function x(p,y,m){const{toastId:d}=y;m&&i.delete(m);const b={content:p,props:y};i.set(d,b),a(c=>[...c,d].filter(N=>N!==m)),M.emit(4,Re(b,b.props.updateId==null?"added":"updated"))}return f.useEffect(()=>(s.containerId=e.containerId,M.cancelEmit(3).on(0,g).on(1,p=>o.current&&v(p)).on(5,u).emit(2,s),()=>{i.clear(),M.emit(3,s)}),[]),f.useEffect(()=>{s.props=e,s.isToastActive=r,s.displayedToast=n.length}),{getToastToRender:function(p){const y=new Map,m=Array.from(i.values());return e.newestOnTop&&m.reverse(),m.forEach(d=>{const{position:b}=d.props;y.has(b)||y.set(b,[]),y.get(b).push(d)}),Array.from(y,d=>p(d[0],d[1]))},containerRef:o,isToastActive:r}}function Ce(e){return e.targetTouches&&e.targetTouches.length>=1?e.targetTouches[0].clientX:e.clientX}function _e(e){return e.targetTouches&&e.targetTouches.length>=1?e.targetTouches[0].clientY:e.clientY}function St(e){const[t,n]=f.useState(!1),[a,o]=f.useState(!1),i=f.useRef(null),r=f.useRef({start:0,x:0,y:0,delta:0,removalDistance:0,canCloseOnClick:!0,canDrag:!1,boundingRect:null,didMove:!1}).current,s=f.useRef(e),{autoClose:u,pauseOnHover:v,closeToast:T,onClick:g,closeOnClick:x}=e;function p(h){if(e.draggable){h.nativeEvent.type==="touchstart"&&h.nativeEvent.preventDefault(),r.didMove=!1,document.addEventListener("mousemove",b),document.addEventListener("mouseup",c),document.addEventListener("touchmove",b),document.addEventListener("touchend",c);const I=i.current;r.canCloseOnClick=!0,r.canDrag=!0,r.boundingRect=I.getBoundingClientRect(),I.style.transition="",r.x=Ce(h.nativeEvent),r.y=_e(h.nativeEvent),e.draggableDirection==="x"?(r.start=r.x,r.removalDistance=I.offsetWidth*(e.draggablePercent/100)):(r.start=r.y,r.removalDistance=I.offsetHeight*(e.draggablePercent===80?1.5*e.draggablePercent:e.draggablePercent/100))}}function y(h){if(r.boundingRect){const{top:I,bottom:F,left:A,right:C}=r.boundingRect;h.nativeEvent.type!=="touchend"&&e.pauseOnHover&&r.x>=A&&r.x<=C&&r.y>=I&&r.y<=F?d():m()}}function m(){n(!0)}function d(){n(!1)}function b(h){const I=i.current;r.canDrag&&I&&(r.didMove=!0,t&&d(),r.x=Ce(h),r.y=_e(h),r.delta=e.draggableDirection==="x"?r.x-r.start:r.y-r.start,r.start!==r.x&&(r.canCloseOnClick=!1),I.style.transform=`translate${e.draggableDirection}(${r.delta}px)`,I.style.opacity=""+(1-Math.abs(r.delta/r.removalDistance)))}function c(){document.removeEventListener("mousemove",b),document.removeEventListener("mouseup",c),document.removeEventListener("touchmove",b),document.removeEventListener("touchend",c);const h=i.current;if(r.canDrag&&r.didMove&&h){if(r.canDrag=!1,Math.abs(r.delta)>r.removalDistance)return o(!0),void e.closeToast();h.style.transition="transform 0.2s, opacity 0.2s",h.style.transform=`translate${e.draggableDirection}(0)`,h.style.opacity="1"}}f.useEffect(()=>{s.current=e}),f.useEffect(()=>(i.current&&i.current.addEventListener("d",m,{once:!0}),k(e.onOpen)&&e.onOpen(f.isValidElement(e.children)&&e.children.props),()=>{const h=s.current;k(h.onClose)&&h.onClose(f.isValidElement(h.children)&&h.children.props)}),[]),f.useEffect(()=>(e.pauseOnFocusLoss&&(document.hasFocus()||d(),window.addEventListener("focus",m),window.addEventListener("blur",d)),()=>{e.pauseOnFocusLoss&&(window.removeEventListener("focus",m),window.removeEventListener("blur",d))}),[e.pauseOnFocusLoss]);const N={onMouseDown:p,onTouchStart:p,onMouseUp:y,onTouchEnd:y};return u&&v&&(N.onMouseEnter=d,N.onMouseLeave=m),x&&(N.onClick=h=>{g&&g(h),r.canCloseOnClick&&T()}),{playToast:m,pauseToast:d,isRunning:t,preventExitTransition:a,toastRef:i,eventHandlers:N}}function Se(e){let{closeToast:t,theme:n,ariaLabel:a="close"}=e;return w.createElement("button",{className:`Toastify__close-button Toastify__close-button--${n}`,type:"button",onClick:o=>{o.stopPropagation(),t(o)},"aria-label":a},w.createElement("svg",{"aria-hidden":"true",viewBox:"0 0 14 16"},w.createElement("path",{fillRule:"evenodd",d:"M7.71 8.23l3.75 3.75-1.48 1.48-3.75-3.75-3.75 3.75L1 11.98l3.75-3.75L1 4.48 2.48 3l3.75 3.75L9.98 3l1.48 1.48-3.75 3.75z"})))}function Dt(e){let{delay:t,isRunning:n,closeToast:a,type:o="default",hide:i,className:r,style:s,controlledProgress:u,progress:v,rtl:T,isIn:g,theme:x}=e;const p=i||u&&v===0,y={...s,animationDuration:`${t}ms`,animationPlayState:n?"running":"paused",opacity:p?0:1};u&&(y.transform=`scaleX(${v})`);const m=Q("Toastify__progress-bar",u?"Toastify__progress-bar--controlled":"Toastify__progress-bar--animated",`Toastify__progress-bar-theme--${x}`,`Toastify__progress-bar--${o}`,{"Toastify__progress-bar--rtl":T}),d=k(r)?r({rtl:T,type:o,defaultClassName:m}):Q(m,r);return w.createElement("div",{role:"progressbar","aria-hidden":p?"true":"false","aria-label":"notification timer",className:d,style:y,[u&&v>=1?"onTransitionEnd":"onAnimationEnd"]:u&&v<1?null:()=>{g&&a()}})}const At=e=>{const{isRunning:t,preventExitTransition:n,toastRef:a,eventHandlers:o}=St(e),{closeButton:i,children:r,autoClose:s,onClick:u,type:v,hideProgressBar:T,closeToast:g,transition:x,position:p,className:y,style:m,bodyClassName:d,bodyStyle:b,progressClassName:c,progressStyle:N,updateId:h,role:I,progress:F,rtl:A,toastId:C,deleteToast:j,isIn:W,isLoading:H,iconOut:S,closeOnClick:z,theme:$}=e,q=Q("Toastify__toast",`Toastify__toast-theme--${$}`,`Toastify__toast--${v}`,{"Toastify__toast--rtl":A},{"Toastify__toast--close-on-click":z}),L=k(y)?y({rtl:A,position:p,type:v,defaultClassName:q}):Q(q,y),D=!!F||!s,V={closeToast:g,type:v,theme:$};let ne=null;return i===!1||(ne=k(i)?i(V):f.isValidElement(i)?f.cloneElement(i,V):Se(V)),w.createElement(x,{isIn:W,done:j,position:p,preventExitTransition:n,nodeRef:a},w.createElement("div",{id:C,onClick:u,className:L,...o,style:m,ref:a},w.createElement("div",{...W&&{role:I},className:k(d)?d({type:v}):Q("Toastify__toast-body",d),style:b},S!=null&&w.createElement("div",{className:Q("Toastify__toast-icon",{"Toastify--animate-icon Toastify__zoom-enter":!H})},S),w.createElement("div",null,r)),ne,w.createElement(Dt,{...h&&!D?{key:`pb-${h}`}:{},rtl:A,theme:$,delay:s,isRunning:t,isIn:W,closeToast:g,hide:T,type:v,style:N,className:c,controlledProgress:D,progress:F||0})))},fe=function(e,t){return t===void 0&&(t=!1),{enter:`Toastify--animate Toastify__${e}-enter`,exit:`Toastify--animate Toastify__${e}-exit`,appendPosition:t}},zt=me(fe("bounce",!0));me(fe("slide",!0));me(fe("zoom"));me(fe("flip"));const Te=f.forwardRef((e,t)=>{const{getToastToRender:n,containerRef:a,isToastActive:o}=Ot(e),{className:i,style:r,rtl:s,containerId:u}=e;function v(T){const g=Q("Toastify__toast-container",`Toastify__toast-container--${T}`,{"Toastify__toast-container--rtl":s});return k(i)?i({position:T,rtl:s,defaultClassName:g}):Q(g,oe(i))}return f.useEffect(()=>{t&&(t.current=a.current)},[]),w.createElement("div",{ref:a,className:"Toastify",id:u},n((T,g)=>{const x=g.length?{...r}:{...r,pointerEvents:"none"};return w.createElement("div",{className:v(T),style:x,key:`container-${T}`},g.map((p,y)=>{let{content:m,props:d}=p;return w.createElement(At,{...d,isIn:o(d.toastId),style:{...d.style,"--nth":y+1,"--len":g.length},key:`toast-${d.key}`},m)}))}))});Te.displayName="ToastContainer",Te.defaultProps={position:"top-right",transition:zt,autoClose:5e3,closeButton:Se,pauseOnHover:!0,pauseOnFocusLoss:!0,closeOnClick:!0,draggable:!0,draggablePercent:80,draggableDirection:"x",role:"alert",theme:"light"};let ge,K=new Map,Z=[],Bt=1;function De(){return""+Bt++}function Qt(e){return e&&(G(e.toastId)||ee(e.toastId))?e.toastId:De()}function te(e,t){return K.size>0?M.emit(0,e,t):Z.push({content:e,options:t}),t.toastId}function ie(e,t){return{...t,type:t&&t.type||e,toastId:Qt(t)}}function ae(e){return(t,n)=>te(t,ie(e,n))}function E(e,t){return te(e,ie("default",t))}E.loading=(e,t)=>te(e,ie("default",{isLoading:!0,autoClose:!1,closeOnClick:!1,closeButton:!1,draggable:!1,...t})),E.promise=function(e,t,n){let a,{pending:o,error:i,success:r}=t;o&&(a=G(o)?E.loading(o,n):E.loading(o.render,{...n,...o}));const s={isLoading:null,autoClose:null,closeOnClick:null,closeButton:null,draggable:null,delay:100},u=(T,g,x)=>{if(g==null)return void E.dismiss(a);const p={type:T,...s,...n,data:x},y=G(g)?{render:g}:g;return a?E.update(a,{...p,...y}):E(y.render,{...p,...y}),x},v=k(e)?e():e;return v.then(T=>u("success",r,T)).catch(T=>u("error",i,T)),v},E.success=ae("success"),E.info=ae("info"),E.error=ae("error"),E.warning=ae("warning"),E.warn=E.warning,E.dark=(e,t)=>te(e,ie("default",{theme:"dark",...t})),E.dismiss=e=>{K.size>0?M.emit(1,e):Z=Z.filter(t=>e!=null&&t.options.toastId!==e)},E.clearWaitingQueue=function(e){return e===void 0&&(e={}),M.emit(5,e)},E.isActive=e=>{let t=!1;return K.forEach(n=>{n.isToastActive&&n.isToastActive(e)&&(t=!0)}),t},E.update=function(e,t){t===void 0&&(t={}),setTimeout(()=>{const n=function(a,o){let{containerId:i}=o;const r=K.get(i||ge);return r&&r.getToast(a)}(e,t);if(n){const{props:a,content:o}=n,i={...a,...t,toastId:t.toastId||e,updateId:De()};i.toastId!==e&&(i.staleId=e);const r=i.render||o;delete i.render,te(r,i)}},0)},E.done=e=>{E.update(e,{progress:1})},E.onChange=e=>(M.on(4,e),()=>{M.off(4,e)}),E.POSITION={TOP_LEFT:"top-left",TOP_RIGHT:"top-right",TOP_CENTER:"top-center",BOTTOM_LEFT:"bottom-left",BOTTOM_RIGHT:"bottom-right",BOTTOM_CENTER:"bottom-center"},E.TYPE={INFO:"info",SUCCESS:"success",WARNING:"warning",ERROR:"error",DEFAULT:"default"},M.on(2,e=>{ge=e.containerId||e,K.set(ge,e),Z.forEach(t=>{M.emit(0,t.content,t.options)}),Z=[]}).on(3,e=>{K.delete(e.containerId||e),K.size===0&&M.off(0).off(1).off(5)});const Ae="/build/assets/bubble_error-64439674.svg",ze="/build/assets/bubble_success-abfe448a.svg",ke="/build/assets/bubble_infos-00b85e33.svg",Ut="/build/assets/bubble_warning-14c416fe.svg",U=e=>{let t={position:E.POSITION.BOTTOM_RIGHT,theme:"dark",icon:()=>{switch(e){case 0:return l("img",{src:Ae});case 1:return l("img",{src:ze});case 2:return l("img",{src:ke});case 3:return l("img",{src:Ut});default:return l("img",{src:ke})}}};return e==-1&&delete t.icon,t},jt=(e,t,n,a)=>E.promise(t,{pending:e,success:{render({data:o}){return n(o)},icon:()=>l("img",{src:ze})},error:{render({data:o}){return a(o)},icon:()=>l("img",{src:Ae})}},U(-1)),Ht=e=>{if(e.props.flash!==void 0){let t=e.props.flash.status;U(t.type);let n=t.msg;E(n,U(0))}else return E.error("Flash Message not set",U(0))},qt=e=>E.error(e,U(0)),Vt=e=>E.success(e,U(1)),Kt=e=>E.info(e,U(2)),Gt=e=>E.warning(e,U(3)),Y={processToast:jt,flash:Ht,error:qt,success:Vt,info:Kt,warning:Gt};function Wt(){const{flash:e}=Le().props;if(e.status!==null){let t=e.status.type,n=e.status.msg;switch(t){case"error":Y.error(n);break;case"success":Y.success(n);break;case"info":Y.info(n);break;case"warning":Y.warning(n);break;default:Y.info(n)}e.status=null}return l(Te,{})}function rn({props:e,mc:t,title:n,isHome:a,children:o}){return f.useState(!1),R("div",{id:"app",children:[l(Ft,{auth:e.auth,mc:t,title:n,isHome:a,navbar:e.navbar}),R("div",{className:`content ${a?"home":"other"} flex flex-col gap-[90px]`,children:[l("div",{className:"mx-[380px] pb-16",children:o}),R("footer",{children:[R("div",{className:"network",children:[l("div",{className:"title",children:"Nos Réseaux"}),R("ul",{children:[l("li",{children:l("a",{href:"https://discord.gg/sSf7NCs8Ap",target:"_blank",children:l(Je,{})})}),l("li",{children:l("a",{href:"https://twitter.com/frazionz/",target:"_blank",children:l(Ze,{})})}),l("li",{children:l("a",{href:"https://www.instagram.com/frazionz/",target:"_blank",children:l(et,{})})}),l("li",{children:l("a",{href:"https://www.youtube.com/",target:"_blank",children:l(tt,{})})}),l("li",{children:l("a",{href:"https://www.tiktok.com/@frazionz",target:"_blank",children:l(nt,{})})}),l("li",{children:l("a",{href:"https://www.twitch.tv/frazionz",target:"_blank",children:l(rt,{})})})]})]}),R("div",{className:"contact",children:[l("div",{className:"title",children:"Nous Contacter"}),l("a",{href:"mailto:contact@frazionz.net",children:"contact@frazionz.net"})]}),l("div",{className:"credits",children:R("ul",{children:[l("li",{children:"2022 - Tous droits réservés"}),l("li",{children:l("a",{href:"#",children:"Politique de Confidentialités"})}),l("li",{children:l("a",{href:"#",children:"Mentions Légales"})}),l("li",{children:l("a",{href:"#",children:"CGU/CGV"})})]})})]})]}),l(Wt,{})]})}export{ke as B,rn as L,Ut as a,ze as b,Ae as c};
