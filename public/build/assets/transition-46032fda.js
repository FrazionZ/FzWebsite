import{r as l,b}from"./app-e514fc58.js";import{l as _,u as w,b as J,p as Y,c as L,j as fe,L as K,y as Z,w as x,a as ee,o as S,s as ve,e as pe,D as te}from"./render-059e1ee3.js";let Q=l.createContext(null);Q.displayName="OpenClosedContext";var C=(e=>(e[e.Open=1]="Open",e[e.Closed=2]="Closed",e[e.Closing=4]="Closing",e[e.Opening=8]="Opening",e))(C||{});function re(){return l.useContext(Q)}function me({value:e,children:t}){return b.createElement(Q.Provider,{value:e},t)}function ne(){let e=l.useRef(!1);return _(()=>(e.current=!0,()=>{e.current=!1}),[]),e}function he(e=0){let[t,r]=l.useState(e),i=l.useCallback(s=>r(a=>a|s),[t]),d=l.useCallback(s=>Boolean(t&s),[t]),p=l.useCallback(s=>r(a=>a&~s),[r]),f=l.useCallback(s=>r(a=>a^s),[r]);return{flags:t,addFlag:i,hasFlag:d,removeFlag:p,toggleFlag:f}}function ge(e){let t={called:!1};return(...r)=>{if(!t.called)return t.called=!0,e(...r)}}function z(e,...t){e&&t.length>0&&e.classList.add(...t)}function G(e,...t){e&&t.length>0&&e.classList.remove(...t)}function be(e,t){let r=J();if(!e)return r.dispose;let{transitionDuration:i,transitionDelay:d}=getComputedStyle(e),[p,f]=[i,d].map(a=>{let[u=0]=a.split(",").filter(Boolean).map(c=>c.includes("ms")?parseFloat(c):parseFloat(c)*1e3).sort((c,g)=>g-c);return u}),s=p+f;if(s!==0){r.group(u=>{u.setTimeout(()=>{t(),u.dispose()},s),u.addEventListener(e,"transitionrun",c=>{c.target===c.currentTarget&&u.dispose()})});let a=r.addEventListener(e,"transitionend",u=>{u.target===u.currentTarget&&(t(),a())})}else t();return r.add(()=>t()),r.dispose}function Ee(e,t,r,i){let d=r?"enter":"leave",p=J(),f=i!==void 0?ge(i):()=>{};d==="enter"&&(e.removeAttribute("hidden"),e.style.display="");let s=w(d,{enter:()=>t.enter,leave:()=>t.leave}),a=w(d,{enter:()=>t.enterTo,leave:()=>t.leaveTo}),u=w(d,{enter:()=>t.enterFrom,leave:()=>t.leaveFrom});return G(e,...t.enter,...t.enterTo,...t.enterFrom,...t.leave,...t.leaveFrom,...t.leaveTo,...t.entered),z(e,...s,...u),p.nextFrame(()=>{G(e,...u),z(e,...a),be(e,()=>(G(e,...s),z(e,...t.entered),f()))}),p.dispose}function Ce({container:e,direction:t,classes:r,onStart:i,onStop:d}){let p=ne(),f=Y(),s=L(t);_(()=>{let a=J();f.add(a.dispose);let u=e.current;if(u&&s.current!=="idle"&&p.current)return a.dispose(),i.current(s.current),a.add(Ee(u,r.current,s.current==="enter",()=>{a.dispose(),d.current(s.current)})),a.dispose},[t])}function y(e=""){return e.split(" ").filter(t=>t.trim().length>1)}let H=l.createContext(null);H.displayName="TransitionContext";var Te=(e=>(e.Visible="visible",e.Hidden="hidden",e))(Te||{});function Fe(){let e=l.useContext(H);if(e===null)throw new Error("A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />.");return e}function $e(){let e=l.useContext(k);if(e===null)throw new Error("A <Transition.Child /> is used but it is missing a parent <Transition /> or <Transition.Root />.");return e}let k=l.createContext(null);k.displayName="NestingContext";function A(e){return"children"in e?A(e.children):e.current.filter(({el:t})=>t.current!==null).filter(({state:t})=>t==="visible").length>0}function le(e,t){let r=L(e),i=l.useRef([]),d=ne(),p=Y(),f=S((v,n=x.Hidden)=>{let m=i.current.findIndex(({el:o})=>o===v);m!==-1&&(w(n,{[x.Unmount](){i.current.splice(m,1)},[x.Hidden](){i.current[m].state="hidden"}}),p.microTask(()=>{var o;!A(i)&&d.current&&((o=r.current)==null||o.call(r))}))}),s=S(v=>{let n=i.current.find(({el:m})=>m===v);return n?n.state!=="visible"&&(n.state="visible"):i.current.push({el:v,state:"visible"}),()=>f(v,x.Unmount)}),a=l.useRef([]),u=l.useRef(Promise.resolve()),c=l.useRef({enter:[],leave:[],idle:[]}),g=S((v,n,m)=>{a.current.splice(0),t&&(t.chains.current[n]=t.chains.current[n].filter(([o])=>o!==v)),t==null||t.chains.current[n].push([v,new Promise(o=>{a.current.push(o)})]),t==null||t.chains.current[n].push([v,new Promise(o=>{Promise.all(c.current[n].map(([h,E])=>E)).then(()=>o())})]),n==="enter"?u.current=u.current.then(()=>t==null?void 0:t.wait.current).then(()=>m(n)):m(n)}),T=S((v,n,m)=>{Promise.all(c.current[n].splice(0).map(([o,h])=>h)).then(()=>{var o;(o=a.current.shift())==null||o()}).then(()=>m(n))});return l.useMemo(()=>({children:i,register:s,unregister:f,onStart:g,onStop:T,wait:u,chains:c}),[s,f,i,g,T,c,u])}function we(){}let xe=["beforeEnter","afterEnter","beforeLeave","afterLeave"];function X(e){var t;let r={};for(let i of xe)r[i]=(t=e[i])!=null?t:we;return r}function ye(e){let t=l.useRef(X(e));return l.useEffect(()=>{t.current=X(e)},[e]),t}let Se="div",ie=fe.RenderStrategy;function Re(e,t){let{beforeEnter:r,afterEnter:i,beforeLeave:d,afterLeave:p,enter:f,enterFrom:s,enterTo:a,entered:u,leave:c,leaveFrom:g,leaveTo:T,...v}=e,n=l.useRef(null),m=Z(n,t),o=v.unmount?x.Unmount:x.Hidden,{show:h,appear:E,initial:se}=Fe(),[F,B]=l.useState(h?"visible":"hidden"),W=$e(),{register:P,unregister:O}=W,M=l.useRef(null);l.useEffect(()=>P(n),[P,n]),l.useEffect(()=>{if(o===x.Hidden&&n.current){if(h&&F!=="visible"){B("visible");return}return w(F,{hidden:()=>O(n),visible:()=>P(n)})}},[F,n,P,O,h,o]);let U=L({enter:y(f),enterFrom:y(s),enterTo:y(a),entered:y(u),leave:y(c),leaveFrom:y(g),leaveTo:y(T)}),N=ye({beforeEnter:r,afterEnter:i,beforeLeave:d,afterLeave:p}),j=ee();l.useEffect(()=>{if(j&&F==="visible"&&n.current===null)throw new Error("Did you forget to passthrough the `ref` to the actual DOM node?")},[n,F,j]);let I=se&&!E,ue=(()=>!j||I||M.current===h?"idle":h?"enter":"leave")(),R=he(0),oe=S($=>w($,{enter:()=>{R.addFlag(C.Opening),N.current.beforeEnter()},leave:()=>{R.addFlag(C.Closing),N.current.beforeLeave()},idle:()=>{}})),ce=S($=>w($,{enter:()=>{R.removeFlag(C.Opening),N.current.afterEnter()},leave:()=>{R.removeFlag(C.Closing),N.current.afterLeave()},idle:()=>{}})),D=le(()=>{B("hidden"),O(n)},W);Ce({container:n,classes:U,direction:ue,onStart:L($=>{D.onStart(n,$,oe)}),onStop:L($=>{D.onStop(n,$,ce),$==="leave"&&!A(D)&&(B("hidden"),O(n))})}),l.useEffect(()=>{I&&(o===x.Hidden?M.current=null:M.current=h)},[h,I,F]);let q=v,de={ref:m};return E&&h&&ve.isServer&&(q={...q,className:pe(v.className,...U.current.enter,...U.current.enterFrom)}),b.createElement(k.Provider,{value:D},b.createElement(me,{value:w(F,{visible:C.Open,hidden:C.Closed})|R.flags},te({ourProps:de,theirProps:q,defaultTag:Se,features:ie,visible:F==="visible",name:"Transition.Child"})))}function Le(e,t){let{show:r,appear:i=!1,unmount:d,...p}=e,f=l.useRef(null),s=Z(f,t);ee();let a=re();if(r===void 0&&a!==null&&(r=(a&C.Open)===C.Open),![!0,!1].includes(r))throw new Error("A <Transition /> is used but it is missing a `show={true | false}` prop.");let[u,c]=l.useState(r?"visible":"hidden"),g=le(()=>{c("hidden")}),[T,v]=l.useState(!0),n=l.useRef([r]);_(()=>{T!==!1&&n.current[n.current.length-1]!==r&&(n.current.push(r),v(!1))},[n,r]);let m=l.useMemo(()=>({show:r,appear:i,initial:T}),[r,i,T]);l.useEffect(()=>{if(r)c("visible");else if(!A(g))c("hidden");else{let h=f.current;if(!h)return;let E=h.getBoundingClientRect();E.x===0&&E.y===0&&E.width===0&&E.height===0&&c("hidden")}},[r,g]);let o={unmount:d};return b.createElement(k.Provider,{value:g},b.createElement(H.Provider,{value:m},te({ourProps:{...o,as:l.Fragment,children:b.createElement(ae,{ref:s,...o,...p})},theirProps:{},defaultTag:l.Fragment,features:ie,visible:u==="visible",name:"Transition"})))}function Pe(e,t){let r=l.useContext(H)!==null,i=re()!==null;return b.createElement(b.Fragment,null,!r&&i?b.createElement(V,{ref:t,...e}):b.createElement(ae,{ref:t,...e}))}let V=K(Le),ae=K(Re),Oe=K(Pe),He=Object.assign(V,{Child:Oe,Root:V});export{re as C,C as d,ne as f,He as t};
