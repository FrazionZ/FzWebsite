import{r as s,R,j as w,a as c,n as I,g as K}from"./app-8fbe077e.js";import{L as V}from"./Layout-ed88fc6e.js";import"./logo-ec0c8240.js";import"./transition-54bdab1d.js";import"./use-owner-8a709d1d.js";import"./use-resolve-button-type-8516e810.js";import"./index.esm-4184eea0.js";/* empty css            */var z=["alpha","numeric","alphanumeric"],Z={alpha:{type:"text",inputMode:"text",pattern:"[a-zA-Z]{1}"},alphanumeric:{type:"text",inputMode:"text",pattern:"[a-zA-Z0-9]{1}"},numeric:{type:"tel",inputMode:"numeric",pattern:"[0-9]{1}",min:"0",max:"9"}},B=s.forwardRef(function(t,d){var i=t.allowedCharacters,f=i===void 0?"alphanumeric":i,h=t.ariaLabel,p=t.autoFocus,C=p===void 0?!0:p,m=t.containerClassName,u=t.disabled,S=t.inputClassName,y=t.isPassword,k=y===void 0?!1:y,N=t.length,b=N===void 0?6:N,D=t.placeholder,E=t.onChange;if(isNaN(b)||b<1)throw new Error("Length should be a number and greater than 0");if(!z.some(function(o){return o===f}))throw new Error("Invalid value for allowedCharacters. Use alpha, numeric, or alphanumeric");var n=s.useRef([]),v=Z[f];s.useImperativeHandle(d,function(){return{focus:function(){n.current&&n.current[0].focus()},clear:function(){if(n.current){for(var e=0;e<n.current.length;e++)n.current[e].value="";n.current[0].focus()}g()}}}),s.useEffect(function(){C&&n.current[0].focus()},[]);for(var g=function(){var e=n.current.map(function(l){return l.value}).join("");E&&E(e)},L=function(e){var l=e.target,a=l.value,r=l.nextElementSibling;a.length>1?(e.target.value=a.charAt(0),r!==null&&r.focus()):a.match(v.pattern)?r!==null&&r.focus():e.target.value="",g()},P=function(e){var l=e.key,a=e.target;if(l==="Backspace"){if(a.value===""){if(a.previousElementSibling!==null){var r=a.previousElementSibling;r.value="",r.focus(),e.preventDefault()}}else a.value="";g()}},A=function(e){e.target.select()},$=function(e){for(var l=e.clipboardData.getData("Text"),a=0,r=0;r<l.length;r++){var F=l.charAt(r),M=n.current[a].value;F.match(v.pattern)&&(M||(n.current[a].value=F,n.current[a].nextElementSibling!==null&&(n.current[a].nextElementSibling.focus(),a++)))}g(),e.preventDefault()},O=[],j=function(e){O.push(R.createElement("input",Object.assign({key:e,onChange:L,onKeyDown:P,onFocus:A,onPaste:$},v,{type:k?"password":v.type,ref:function(a){n.current[e]=a},maxLength:1,className:S,autoComplete:e===0?"one-time-code":"off","aria-label":h?h+". Character "+(e+1)+".":"Character "+(e+1)+".",disabled:u,placeholder:D})))},x=0;x<b;x++)j(x);return R.createElement("div",{className:m},O)});const H=B;function Y(t){let d="Se Connecter";const[i,f]=s.useState(!1),[h,p]=s.useState();async function C(u){await p(u),u!==void 0&&u.length==6&&m(u)}async function m(u){f(!0),K.post(route("2fa.handleLogin"),{code:u,_token:t.csrf_token})}return w(V,{props:t,title:d,header:c("h2",{className:"font-semibold text-xl text-gray-800 leading-tight",children:"Profile"}),children:[c(I,{title:d}),w("div",{className:"flex flex-col items-center gap-[48px]",children:[w("div",{className:"form-group",children:[c("label",{children:"Code"}),c(H,{autoFocus:!0,containerClassName:"flex gap-[24px]",disabled:i,length:"6",allowedCharacters:"numeric",inputClassName:"w-[80px] h-[78px]",onChange:C})]}),c("button",{id:"buttonLoginAuth",disabled:i,className:"btn w-fit",onClick:()=>m(h),children:"Vérifier le code"})]})]})}export{Y as default};
