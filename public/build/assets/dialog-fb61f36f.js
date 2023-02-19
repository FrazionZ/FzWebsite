import{r as u,R as f,c as De,d as X}from"./app-af5531a3.js";import{o as w,d as fe,V as y,y as S,b as ee,u as O,a as Le,X as R,t as te,f as pe,l as V,T as Ce,c as me,m as Fe,j as ue,s as ke,p as se}from"./transition-ae079749.js";import{n as _,b as j,a as A,S as T,N as Ae,e as Oe,I as B,L as xe,o as Me,r as Ie}from"./use-owner-f5d71e3f.js";import{h as z,s as J,F as Be,k as Ne}from"./description-787ef402.js";function ge(e,n){let t=u.useRef([]),o=w(e);u.useEffect(()=>{let r=[...t.current];for(let[a,l]of n.entries())if(t.current[a]!==l){let i=o(n,r);return t.current=n,i}},[o,...n])}function He(e,n,t){let o=fe(n);u.useEffect(()=>{function r(a){o.current(a)}return window.addEventListener(e,r,t),()=>window.removeEventListener(e,r,t)},[e,t])}var I=(e=>(e[e.Forwards=0]="Forwards",e[e.Backwards=1]="Backwards",e))(I||{});function je(){let e=u.useRef(0);return He("keydown",n=>{n.key==="Tab"&&(e.current=n.shiftKey?1:0)},!0),e}function ne(e,n,t,o){let r=fe(t);u.useEffect(()=>{e=e??window;function a(l){r.current(l)}return e.addEventListener(n,a,o),()=>e.removeEventListener(n,a,o)},[e,n,o])}let We="div";var he=(e=>(e[e.None=1]="None",e[e.InitialFocus=2]="InitialFocus",e[e.TabLock=4]="TabLock",e[e.FocusLock=8]="FocusLock",e[e.RestoreFocus=16]="RestoreFocus",e[e.All=30]="All",e))(he||{});let M=Object.assign(y(function(e,n){let t=u.useRef(null),o=S(t,n),{initialFocus:r,containers:a,features:l=30,...i}=e;ee()||(l=1);let d=_(t);Ve({ownerDocument:d},Boolean(l&16));let c=_e({ownerDocument:d,container:t,initialFocus:r},Boolean(l&2));Ye({ownerDocument:d,container:t,containers:a,previousActiveElement:c},Boolean(l&8));let s=je(),D=w(h=>{let v=t.current;v&&(b=>b())(()=>{O(s.current,{[I.Forwards]:()=>{j(v,A.First,{skipElements:[h.relatedTarget]})},[I.Backwards]:()=>{j(v,A.Last,{skipElements:[h.relatedTarget]})}})})}),x=Le(),m=u.useRef(!1),Y={ref:o,onKeyDown(h){h.key=="Tab"&&(m.current=!0,x.requestAnimationFrame(()=>{m.current=!1}))},onBlur(h){let v=new Set(a==null?void 0:a.current);v.add(t);let b=h.relatedTarget;b instanceof HTMLElement&&b.dataset.headlessuiFocusGuard!=="true"&&(ve(v,b)||(m.current?j(t.current,O(s.current,{[I.Forwards]:()=>A.Next,[I.Backwards]:()=>A.Previous})|A.WrapAround,{relativeTo:h.target}):h.target instanceof HTMLElement&&T(h.target)))}};return f.createElement(f.Fragment,null,Boolean(l&4)&&f.createElement(z,{as:"button",type:"button","data-headlessui-focus-guard":!0,onFocus:D,features:J.Focusable}),R({ourProps:Y,theirProps:i,defaultTag:We,name:"FocusTrap"}),Boolean(l&4)&&f.createElement(z,{as:"button",type:"button","data-headlessui-focus-guard":!0,onFocus:D,features:J.Focusable}))}),{features:he});function Ve({ownerDocument:e},n){let t=u.useRef(null);ne(e==null?void 0:e.defaultView,"focusout",r=>{!n||t.current||(t.current=r.target)},!0),ge(()=>{n||((e==null?void 0:e.activeElement)===(e==null?void 0:e.body)&&T(t.current),t.current=null)},[n]);let o=u.useRef(!1);u.useEffect(()=>(o.current=!1,()=>{o.current=!0,te(()=>{!o.current||(T(t.current),t.current=null)})}),[])}function _e({ownerDocument:e,container:n,initialFocus:t},o){let r=u.useRef(null),a=pe();return ge(()=>{if(!o)return;let l=n.current;!l||te(()=>{if(!a.current)return;let i=e==null?void 0:e.activeElement;if(t!=null&&t.current){if((t==null?void 0:t.current)===i){r.current=i;return}}else if(l.contains(i)){r.current=i;return}t!=null&&t.current?T(t.current):j(l,A.First)===Ae.Error&&console.warn("There are no focusable elements inside the <FocusTrap />"),r.current=e==null?void 0:e.activeElement})},[o]),r}function Ye({ownerDocument:e,container:n,containers:t,previousActiveElement:o},r){let a=pe();ne(e==null?void 0:e.defaultView,"focus",l=>{if(!r||!a.current)return;let i=new Set(t==null?void 0:t.current);i.add(n);let d=o.current;if(!d)return;let c=l.target;c&&c instanceof HTMLElement?ve(i,c)?(o.current=c,T(c)):(l.preventDefault(),l.stopPropagation(),T(d)):T(o.current)},!0)}function ve(e,n){var t;for(let o of e)if((t=o.current)!=null&&t.contains(n))return!0;return!1}let k=new Set,$=new Map;function ce(e){e.setAttribute("aria-hidden","true"),e.inert=!0}function de(e){let n=$.get(e);!n||(n["aria-hidden"]===null?e.removeAttribute("aria-hidden"):e.setAttribute("aria-hidden",n["aria-hidden"]),e.inert=n.inert)}function Ue(e,n=!0){V(()=>{if(!n||!e.current)return;let t=e.current,o=Oe(t);if(o){k.add(t);for(let r of $.keys())r.contains(t)&&(de(r),$.delete(r));return o.querySelectorAll("body > *").forEach(r=>{if(r instanceof HTMLElement){for(let a of k)if(r.contains(a))return;k.size===1&&($.set(r,{"aria-hidden":r.getAttribute("aria-hidden"),inert:r.inert}),ce(r))}}),()=>{if(k.delete(t),k.size>0)o.querySelectorAll("body > *").forEach(r=>{if(r instanceof HTMLElement&&!$.has(r)){for(let a of k)if(r.contains(a))return;$.set(r,{"aria-hidden":r.getAttribute("aria-hidden"),inert:r.inert}),ce(r)}});else for(let r of $.keys())de(r),$.delete(r)}}},[n])}let Ee=u.createContext(!1);function qe(){return u.useContext(Ee)}function K(e){return f.createElement(Ee.Provider,{value:e.force},e.children)}function Ge(e){let n=qe(),t=u.useContext(we),o=_(e),[r,a]=u.useState(()=>{if(!n&&t!==null||me.isServer)return null;let l=o==null?void 0:o.getElementById("headlessui-portal-root");if(l)return l;if(o===null)return null;let i=o.createElement("div");return i.setAttribute("id","headlessui-portal-root"),o.body.appendChild(i)});return u.useEffect(()=>{r!==null&&(o!=null&&o.body.contains(r)||o==null||o.body.appendChild(r))},[r,o]),u.useEffect(()=>{n||t!==null&&a(t.current)},[t,a,n]),r}let Xe=u.Fragment,ze=y(function(e,n){let t=e,o=u.useRef(null),r=S(Ce(s=>{o.current=s}),n),a=_(o),l=Ge(o),[i]=u.useState(()=>{var s;return me.isServer?null:(s=a==null?void 0:a.createElement("div"))!=null?s:null}),d=ee(),c=u.useRef(!1);return V(()=>{if(c.current=!1,!(!l||!i))return l.contains(i)||(i.setAttribute("data-headlessui-portal",""),l.appendChild(i)),()=>{c.current=!0,te(()=>{var s;!c.current||!l||!i||(i instanceof Node&&l.contains(i)&&l.removeChild(i),l.childNodes.length<=0&&((s=l.parentElement)==null||s.removeChild(l)))})}},[l,i]),d?!l||!i?null:De.createPortal(R({ourProps:{ref:r},theirProps:t,defaultTag:Xe,name:"Portal"}),i):null}),Je=u.Fragment,we=u.createContext(null),Ke=y(function(e,n){let{target:t,...o}=e,r={ref:S(n)};return f.createElement(we.Provider,{value:t},R({ourProps:r,theirProps:o,defaultTag:Je,name:"Popover.Group"}))}),Q=Object.assign(ze,{Group:Ke}),re=u.createContext(()=>{});re.displayName="StackContext";var Z=(e=>(e[e.Add=0]="Add",e[e.Remove=1]="Remove",e))(Z||{});function Qe(){return u.useContext(re)}function Ze({children:e,onUpdate:n,type:t,element:o,enabled:r}){let a=Qe(),l=w((...i)=>{n==null||n(...i),a(...i)});return V(()=>{let i=r===void 0||r===!0;return i&&l(0,t,o),()=>{i&&l(1,t,o)}},[l,t,o,r]),f.createElement(re.Provider,{value:l},e)}function et(e,n){return e===n&&(e!==0||1/e===1/n)||e!==e&&n!==n}const tt=typeof Object.is=="function"?Object.is:et,{useState:nt,useEffect:rt,useLayoutEffect:ot,useDebugValue:at}=X;function lt(e,n,t){const o=n(),[{inst:r},a]=nt({inst:{value:o,getSnapshot:n}});return ot(()=>{r.value=o,r.getSnapshot=n,G(r)&&a({inst:r})},[e,o,n]),rt(()=>(G(r)&&a({inst:r}),e(()=>{G(r)&&a({inst:r})})),[e]),at(o),o}function G(e){const n=e.getSnapshot,t=e.value;try{const o=n();return!tt(t,o)}catch{return!0}}function it(e,n,t){return n()}const ut=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u",st=!ut,ct=st?it:lt,dt="useSyncExternalStore"in X?(e=>e.useSyncExternalStore)(X):ct;function ft(e){return dt(e.subscribe,e.getSnapshot,e.getSnapshot)}function pt(e,n){let t=e(),o=new Set;return{getSnapshot(){return t},subscribe(r){return o.add(r),()=>o.delete(r)},dispatch(r,...a){let l=n[r].call(t,...a);l&&(t=l,o.forEach(i=>i()))}}}function mt(){let e;return{before({doc:n}){var t;let o=n.documentElement;e=((t=n.defaultView)!=null?t:window).innerWidth-o.clientWidth},after({doc:n,d:t}){let o=n.documentElement,r=o.clientWidth-o.offsetWidth,a=e-r;t.style(o,"paddingRight",`${a}px`)}}}function gt(){return/iPhone/gi.test(window.navigator.platform)||/Mac/gi.test(window.navigator.platform)&&window.navigator.maxTouchPoints>0}function ht(){if(!gt())return{};let e;return{before(){e=window.pageYOffset},after({doc:n,d:t,meta:o}){function r(l){return o.containers.flatMap(i=>i()).some(i=>i.contains(l))}t.style(n.body,"marginTop",`-${e}px`),window.scrollTo(0,0);let a=null;t.addEventListener(n,"click",l=>{if(l.target instanceof HTMLElement)try{let i=l.target.closest("a");if(!i)return;let{hash:d}=new URL(i.href),c=n.querySelector(d);c&&!r(c)&&(a=c)}catch{}},!0),t.addEventListener(n,"touchmove",l=>{l.target instanceof HTMLElement&&!r(l.target)&&l.preventDefault()},{passive:!1}),t.add(()=>{window.scrollTo(0,window.pageYOffset+e),a&&a.isConnected&&(a.scrollIntoView({block:"nearest"}),a=null)})}}}function vt(){return{before({doc:e,d:n}){n.style(e.documentElement,"overflow","hidden")}}}function Et(e){let n={};for(let t of e)Object.assign(n,t(n));return n}let P=pt(()=>new Map,{PUSH(e,n){var t;let o=(t=this.get(e))!=null?t:{doc:e,count:0,d:Fe(),meta:new Set};return o.count++,o.meta.add(n),this.set(e,o),this},POP(e,n){let t=this.get(e);return t&&(t.count--,t.meta.delete(n)),this},SCROLL_PREVENT({doc:e,d:n,meta:t}){let o={doc:e,d:n,meta:Et(t)},r=[ht(),mt(),vt()];r.forEach(({before:a})=>a==null?void 0:a(o)),r.forEach(({after:a})=>a==null?void 0:a(o))},SCROLL_ALLOW({d:e}){e.dispose()},TEARDOWN({doc:e}){this.delete(e)}});P.subscribe(()=>{let e=P.getSnapshot(),n=new Map;for(let[t]of e)n.set(t,t.documentElement.style.overflow);for(let t of e.values()){let o=n.get(t.doc)==="hidden",r=t.count!==0;(r&&!o||!r&&o)&&P.dispatch(t.count>0?"SCROLL_PREVENT":"SCROLL_ALLOW",t),t.count===0&&P.dispatch("TEARDOWN",t)}});function wt(e,n,t){let o=ft(P),r=e?o.get(e):void 0,a=r?r.count>0:!1;return V(()=>{if(!(!e||!n))return P.dispatch("PUSH",e,t),()=>P.dispatch("POP",e,t)},[n,e]),a}var bt=(e=>(e[e.Open=0]="Open",e[e.Closed=1]="Closed",e))(bt||{}),$t=(e=>(e[e.SetTitleId=0]="SetTitleId",e))($t||{});let yt={[0](e,n){return e.titleId===n.id?e:{...e,titleId:n.id}}},W=u.createContext(null);W.displayName="DialogContext";function N(e){let n=u.useContext(W);if(n===null){let t=new Error(`<${e} /> is missing a parent <Dialog /> component.`);throw Error.captureStackTrace&&Error.captureStackTrace(t,N),t}return n}function St(e,n,t=()=>[document.body]){wt(e,n,o=>{var r;return{containers:[...(r=o.containers)!=null?r:[],t]}})}function Rt(e,n){return O(n.type,yt,e,n)}let Pt="div",Tt=ue.RenderStrategy|ue.Static,Dt=y(function(e,n){let t=B(),{id:o=`headlessui-dialog-${t}`,open:r,onClose:a,initialFocus:l,__demoMode:i=!1,...d}=e,[c,s]=u.useState(0),D=ke();r===void 0&&D!==null&&(r=O(D,{[se.Open]:!0,[se.Closed]:!1}));let x=u.useRef(new Set),m=u.useRef(null),Y=S(m,n),h=u.useRef(null),v=_(m),b=e.hasOwnProperty("open")||D!==null,oe=e.hasOwnProperty("onClose");if(!b&&!oe)throw new Error("You have to provide an `open` and an `onClose` prop to the `Dialog` component.");if(!b)throw new Error("You provided an `onClose` prop to the `Dialog`, but forgot an `open` prop.");if(!oe)throw new Error("You provided an `open` prop to the `Dialog`, but forgot an `onClose` prop.");if(typeof r!="boolean")throw new Error(`You provided an \`open\` prop to the \`Dialog\`, but the value is not a boolean. Received: ${r}`);if(typeof a!="function")throw new Error(`You provided an \`onClose\` prop to the \`Dialog\`, but the value is not a function. Received: ${a}`);let E=r?0:1,[L,be]=u.useReducer(Rt,{titleId:null,descriptionId:null,panelRef:u.createRef()}),C=w(()=>a(!1)),ae=w(p=>be({type:0,id:p})),U=ee()?i?!1:E===0:!1,H=c>1,$e=u.useContext(W)!==null,ye=H?"parent":"leaf";Ue(m,H?U:!1);let le=w(()=>{var p,F;return[...Array.from((p=v==null?void 0:v.querySelectorAll("html > *, body > *, [data-headlessui-portal]"))!=null?p:[]).filter(g=>!(g===document.body||g===document.head||!(g instanceof HTMLElement)||g.contains(h.current)||L.panelRef.current&&g.contains(L.panelRef.current))),(F=L.panelRef.current)!=null?F:m.current]});xe(()=>le(),C,U&&!H),ne(v==null?void 0:v.defaultView,"keydown",p=>{p.defaultPrevented||p.key===Me.Escape&&E===0&&(H||(p.preventDefault(),p.stopPropagation(),C()))}),St(v,E===0&&!$e,le),u.useEffect(()=>{if(E!==0||!m.current)return;let p=new IntersectionObserver(F=>{for(let g of F)g.boundingClientRect.x===0&&g.boundingClientRect.y===0&&g.boundingClientRect.width===0&&g.boundingClientRect.height===0&&C()});return p.observe(m.current),()=>p.disconnect()},[E,m,C]);let[Se,Re]=Ne(),Pe=u.useMemo(()=>[{dialogState:E,close:C,setTitleId:ae},L],[E,L,C,ae]),ie=u.useMemo(()=>({open:E===0}),[E]),Te={ref:Y,id:o,role:"dialog","aria-modal":E===0?!0:void 0,"aria-labelledby":L.titleId,"aria-describedby":Se};return f.createElement(Ze,{type:"Dialog",enabled:E===0,element:m,onUpdate:w((p,F,g)=>{F==="Dialog"&&O(p,{[Z.Add](){x.current.add(g),s(q=>q+1)},[Z.Remove](){x.current.add(g),s(q=>q-1)}})})},f.createElement(K,{force:!0},f.createElement(Q,null,f.createElement(W.Provider,{value:Pe},f.createElement(Q.Group,{target:m},f.createElement(K,{force:!1},f.createElement(Re,{slot:ie,name:"Dialog.Description"},f.createElement(M,{initialFocus:l,containers:x,features:U?O(ye,{parent:M.features.RestoreFocus,leaf:M.features.All&~M.features.FocusLock}):M.features.None},R({ourProps:Te,theirProps:d,slot:ie,defaultTag:Pt,features:Tt,visible:E===0,name:"Dialog"})))))))),f.createElement(z,{features:J.Hidden,ref:h}))}),Lt="div",Ct=y(function(e,n){let t=B(),{id:o=`headlessui-dialog-overlay-${t}`,...r}=e,[{dialogState:a,close:l}]=N("Dialog.Overlay"),i=S(n),d=w(s=>{if(s.target===s.currentTarget){if(Ie(s.currentTarget))return s.preventDefault();s.preventDefault(),s.stopPropagation(),l()}}),c=u.useMemo(()=>({open:a===0}),[a]);return R({ourProps:{ref:i,id:o,"aria-hidden":!0,onClick:d},theirProps:r,slot:c,defaultTag:Lt,name:"Dialog.Overlay"})}),Ft="div",kt=y(function(e,n){let t=B(),{id:o=`headlessui-dialog-backdrop-${t}`,...r}=e,[{dialogState:a},l]=N("Dialog.Backdrop"),i=S(n);u.useEffect(()=>{if(l.panelRef.current===null)throw new Error("A <Dialog.Backdrop /> component is being used, but a <Dialog.Panel /> component is missing.")},[l.panelRef]);let d=u.useMemo(()=>({open:a===0}),[a]);return f.createElement(K,{force:!0},f.createElement(Q,null,R({ourProps:{ref:i,id:o,"aria-hidden":!0},theirProps:r,slot:d,defaultTag:Ft,name:"Dialog.Backdrop"})))}),At="div",Ot=y(function(e,n){let t=B(),{id:o=`headlessui-dialog-panel-${t}`,...r}=e,[{dialogState:a},l]=N("Dialog.Panel"),i=S(n,l.panelRef),d=u.useMemo(()=>({open:a===0}),[a]),c=w(s=>{s.stopPropagation()});return R({ourProps:{ref:i,id:o,onClick:c},theirProps:r,slot:d,defaultTag:At,name:"Dialog.Panel"})}),xt="h2",Mt=y(function(e,n){let t=B(),{id:o=`headlessui-dialog-title-${t}`,...r}=e,[{dialogState:a,setTitleId:l}]=N("Dialog.Title"),i=S(n);u.useEffect(()=>(l(o),()=>l(null)),[o,l]);let d=u.useMemo(()=>({open:a===0}),[a]);return R({ourProps:{ref:i,id:o},theirProps:r,slot:d,defaultTag:xt,name:"Dialog.Title"})}),jt=Object.assign(Dt,{Backdrop:kt,Panel:Ot,Overlay:Ct,Title:Mt,Description:Be});export{jt as g};
