import{a as h,s as d,l as f,L as m,D as g,y as v,o as b}from"./render-3bbda361.js";import{R as u,r as s}from"./app-f243bcb8.js";var c;let S=(c=u.useId)!=null?c:function(){let e=h(),[t,n]=u.useState(e?()=>d.nextId():null);return f(()=>{t===null&&n(d.nextId())},[t]),t!=null?""+t:void 0};function k(e){let t=e.parentElement,n=null;for(;t&&!(t instanceof HTMLFieldSetElement);)t instanceof HTMLLegendElement&&(n=t),t=t.parentElement;let r=(t==null?void 0:t.getAttribute("disabled"))==="";return r&&A(n)?!1:r}function A(e){if(!e)return!1;let t=e.previousElementSibling;for(;t!==null;){if(t instanceof HTMLLegendElement)return!1;t=t.previousElementSibling}return!0}let D="div";var P=(e=>(e[e.None=1]="None",e[e.Focusable=2]="Focusable",e[e.Hidden=4]="Hidden",e))(P||{});function T(e,t){let{features:n=1,...r}=e,i={ref:t,"aria-hidden":(n&2)===2?!0:void 0,style:{position:"fixed",top:1,left:1,width:1,height:0,padding:0,margin:-1,overflow:"hidden",clip:"rect(0, 0, 0, 0)",whiteSpace:"nowrap",borderWidth:"0",...(n&4)===4&&(n&2)!==2&&{display:"none"}}};return g({ourProps:i,theirProps:r,slot:{},defaultTag:D,name:"Hidden"})}let I=m(T);var x=(e=>(e.Space=" ",e.Enter="Enter",e.Escape="Escape",e.Backspace="Backspace",e.Delete="Delete",e.ArrowLeft="ArrowLeft",e.ArrowUp="ArrowUp",e.ArrowRight="ArrowRight",e.ArrowDown="ArrowDown",e.Home="Home",e.End="End",e.PageUp="PageUp",e.PageDown="PageDown",e.Tab="Tab",e))(x||{});let w=s.createContext(null);function E(){let e=s.useContext(w);if(e===null){let t=new Error("You used a <Description /> component, but it is not inside a relevant parent.");throw Error.captureStackTrace&&Error.captureStackTrace(t,E),t}return e}function R(){let[e,t]=s.useState([]);return[e.length>0?e.join(" "):void 0,s.useMemo(()=>function(n){let r=b(o=>(t(l=>[...l,o]),()=>t(l=>{let a=l.slice(),p=a.indexOf(o);return p!==-1&&a.splice(p,1),a}))),i=s.useMemo(()=>({register:r,slot:n.slot,name:n.name,props:n.props}),[r,n.slot,n.name,n.props]);return u.createElement(w.Provider,{value:i},n.children)},[t])]}let H="p";function L(e,t){let n=S(),{id:r=`headlessui-description-${n}`,...i}=e,o=E(),l=v(t);f(()=>o.register(r),[r,o.register]);let a={ref:l,...o.props,id:r};return g({ourProps:a,theirProps:i,slot:o.slot||{},defaultTag:H,name:o.name||"Description"})}let M=m(L),U=Object.assign(M,{});export{S as I,R as M,U as b,I as c,x as o,P as p,k as r};
