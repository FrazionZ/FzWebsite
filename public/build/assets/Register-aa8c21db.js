import{b as z,r as R,_ as F,j as v,a as d,n as W,d as M}from"./app-64c982be.js";import{L as G}from"./Layout-6d96430f.js";import{L as $}from"./Language-45cbb11a.js";import{I as L}from"./InputLabel-d9522ba0.js";import{T as C}from"./TextInput-dddb97b9.js";import{p as l}from"./index-4d501b15.js";import{h as B}from"./hoist-non-react-statics.cjs-657b8f1b.js";import{F as K}from"./FzSwitch-232e24b0.js";import{A as V}from"./Alert-34b6f0ed.js";import"./logo-ec0c8240.js";import"./FzToastContainer-89ae0283.js";import"./iconBase-1b0b194b.js";import"./FzToast-42bf12ec.js";import"./bubble_warning-9cee2399.js";import"./bubble_infos-3d3cb710.js";import"./motion-1cf8eba9.js";import"./Dropdown-4d4f6aeb.js";import"./index.esm-7b472f02.js";import"./comments-7ee1c3c3.js";import"./keyboard-9254f896.js";import"./transition-9f144381.js";import"./index-93f0ac29.js";/* empty css            */import"./twitch-d7bb7fb3.js";import"./switch-a39a5741.js";function S(){return S=Object.assign||function(r){for(var n=1;n<arguments.length;n++){var a=arguments[n];for(var e in a)Object.prototype.hasOwnProperty.call(a,e)&&(r[e]=a[e])}return r},S.apply(this,arguments)}function J(r,n){if(r==null)return{};var a={},e=Object.keys(r),t,c;for(c=0;c<e.length;c++)t=e[c],!(n.indexOf(t)>=0)&&(a[t]=r[t]);return a}function E(r){if(r===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return r}function Q(r,n){r.prototype=Object.create(n.prototype),r.prototype.constructor=r,r.__proto__=n}var O=function(r){Q(n,r);function n(){var e;return e=r.call(this)||this,e.handleExpired=e.handleExpired.bind(E(e)),e.handleErrored=e.handleErrored.bind(E(e)),e.handleChange=e.handleChange.bind(E(e)),e.handleRecaptchaRef=e.handleRecaptchaRef.bind(E(e)),e}var a=n.prototype;return a.getValue=function(){return this.props.grecaptcha&&this._widgetId!==void 0?this.props.grecaptcha.getResponse(this._widgetId):null},a.getWidgetId=function(){return this.props.grecaptcha&&this._widgetId!==void 0?this._widgetId:null},a.execute=function(){var t=this.props.grecaptcha;if(t&&this._widgetId!==void 0)return t.execute(this._widgetId);this._executeRequested=!0},a.executeAsync=function(){var t=this;return new Promise(function(c,f){t.executionResolve=c,t.executionReject=f,t.execute()})},a.reset=function(){this.props.grecaptcha&&this._widgetId!==void 0&&this.props.grecaptcha.reset(this._widgetId)},a.handleExpired=function(){this.props.onExpired?this.props.onExpired():this.handleChange(null)},a.handleErrored=function(){this.props.onErrored&&this.props.onErrored(),this.executionReject&&(this.executionReject(),delete this.executionResolve,delete this.executionReject)},a.handleChange=function(t){this.props.onChange&&this.props.onChange(t),this.executionResolve&&(this.executionResolve(t),delete this.executionReject,delete this.executionResolve)},a.explicitRender=function(){if(this.props.grecaptcha&&this.props.grecaptcha.render&&this._widgetId===void 0){var t=document.createElement("div");this._widgetId=this.props.grecaptcha.render(t,{sitekey:this.props.sitekey,callback:this.handleChange,theme:this.props.theme,type:this.props.type,tabindex:this.props.tabindex,"expired-callback":this.handleExpired,"error-callback":this.handleErrored,size:this.props.size,stoken:this.props.stoken,hl:this.props.hl,badge:this.props.badge}),this.captcha.appendChild(t)}this._executeRequested&&this.props.grecaptcha&&this._widgetId!==void 0&&(this._executeRequested=!1,this.execute())},a.componentDidMount=function(){this.explicitRender()},a.componentDidUpdate=function(){this.explicitRender()},a.componentWillUnmount=function(){this._widgetId!==void 0&&(this.delayOfCaptchaIframeRemoving(),this.reset())},a.delayOfCaptchaIframeRemoving=function(){var t=document.createElement("div");for(document.body.appendChild(t),t.style.display="none";this.captcha.firstChild;)t.appendChild(this.captcha.firstChild);setTimeout(function(){document.body.removeChild(t)},5e3)},a.handleRecaptchaRef=function(t){this.captcha=t},a.render=function(){var t=this.props;t.sitekey,t.onChange,t.theme,t.type,t.tabindex,t.onExpired,t.onErrored,t.size,t.stoken,t.grecaptcha,t.badge,t.hl;var c=J(t,["sitekey","onChange","theme","type","tabindex","onExpired","onErrored","size","stoken","grecaptcha","badge","hl"]);return z.createElement("div",S({},c,{ref:this.handleRecaptchaRef}))},n}(z.Component);O.displayName="ReCAPTCHA";O.propTypes={sitekey:l.string.isRequired,onChange:l.func,grecaptcha:l.object,theme:l.oneOf(["dark","light"]),type:l.oneOf(["image","audio"]),tabindex:l.number,onExpired:l.func,onErrored:l.func,size:l.oneOf(["compact","normal","invisible"]),stoken:l.string,hl:l.string,badge:l.oneOf(["bottomright","bottomleft","inline"])};O.defaultProps={onChange:function(){},theme:"light",type:"image",tabindex:0,size:"normal",badge:"bottomright"};function N(){return N=Object.assign||function(r){for(var n=1;n<arguments.length;n++){var a=arguments[n];for(var e in a)Object.prototype.hasOwnProperty.call(a,e)&&(r[e]=a[e])}return r},N.apply(this,arguments)}function X(r,n){if(r==null)return{};var a={},e=Object.keys(r),t,c;for(c=0;c<e.length;c++)t=e[c],!(n.indexOf(t)>=0)&&(a[t]=r[t]);return a}function Y(r,n){r.prototype=Object.create(n.prototype),r.prototype.constructor=r,r.__proto__=n}var m={},Z=0;function ee(r,n){return n=n||{},function(e){var t=e.displayName||e.name||"Component",c=function(w){Y(y,w);function y(g,o){var i;return i=w.call(this,g,o)||this,i.state={},i.__scriptURL="",i}var h=y.prototype;return h.asyncScriptLoaderGetScriptLoaderID=function(){return this.__scriptLoaderID||(this.__scriptLoaderID="async-script-loader-"+Z++),this.__scriptLoaderID},h.setupScriptURL=function(){return this.__scriptURL=typeof r=="function"?r():r,this.__scriptURL},h.asyncScriptLoaderHandleLoad=function(o){var i=this;this.setState(o,function(){return i.props.asyncScriptOnLoad&&i.props.asyncScriptOnLoad(i.state)})},h.asyncScriptLoaderTriggerOnScriptLoaded=function(){var o=m[this.__scriptURL];if(!o||!o.loaded)throw new Error("Script is not loaded.");for(var i in o.observers)o.observers[i](o);delete window[n.callbackName]},h.componentDidMount=function(){var o=this,i=this.setupScriptURL(),s=this.asyncScriptLoaderGetScriptLoaderID(),p=n,j=p.globalName,I=p.callbackName,A=p.scriptId;if(j&&typeof window[j]<"u"&&(m[i]={loaded:!0,observers:{}}),m[i]){var _=m[i];if(_&&(_.loaded||_.errored)){this.asyncScriptLoaderHandleLoad(_);return}_.observers[s]=function(u){return o.asyncScriptLoaderHandleLoad(u)};return}var U={};U[s]=function(u){return o.asyncScriptLoaderHandleLoad(u)},m[i]={loaded:!1,observers:U};var b=document.createElement("script");b.src=i,b.async=!0;for(var D in n.attributes)b.setAttribute(D,n.attributes[D]);A&&(b.id=A);var T=function(x){if(m[i]){var q=m[i],k=q.observers;for(var P in k)x(k[P])&&delete k[P]}};I&&typeof window<"u"&&(window[I]=function(){return o.asyncScriptLoaderTriggerOnScriptLoaded()}),b.onload=function(){var u=m[i];u&&(u.loaded=!0,T(function(x){return I?!1:(x(u),!0)}))},b.onerror=function(){var u=m[i];u&&(u.errored=!0,T(function(x){return x(u),!0}))},document.body.appendChild(b)},h.componentWillUnmount=function(){var o=this.__scriptURL;if(n.removeOnUnmount===!0)for(var i=document.getElementsByTagName("script"),s=0;s<i.length;s+=1)i[s].src.indexOf(o)>-1&&i[s].parentNode&&i[s].parentNode.removeChild(i[s]);var p=m[o];p&&(delete p.observers[this.asyncScriptLoaderGetScriptLoaderID()],n.removeOnUnmount===!0&&delete m[o])},h.render=function(){var o=n.globalName,i=this.props;i.asyncScriptOnLoad;var s=i.forwardedRef,p=X(i,["asyncScriptOnLoad","forwardedRef"]);return o&&typeof window<"u"&&(p[o]=typeof window[o]<"u"?window[o]:void 0),p.ref=s,R.createElement(e,p)},y}(R.Component),f=R.forwardRef(function(w,y){return R.createElement(c,N({},w,{forwardedRef:y}))});return f.displayName="AsyncScriptLoader("+t+")",f.propTypes={asyncScriptOnLoad:l.func},B(f,e)}}var H="onloadcallback",te="grecaptcha";function re(){return typeof window<"u"&&window.recaptchaOptions||{}}function ne(){var r=re(),n=r.useRecaptchaNet?"recaptcha.net":"www.google.com";return"https://"+n+"/recaptcha/api.js?onload="+H+"&render=explicit"}const ie=ee(ne,{callbackName:H,globalName:te})(O);function Se(r){const n=r.recaptcha_site_key,a=new $(r.language),{data:e,setData:t,post:c,processing:f,errors:w,reset:y}=F({name:"",email:"",password:"",password_confirmation:"",g_recaptcha_response:"",confirm_cguv:!1,_token:r.csrf_token});R.useEffect(()=>()=>{y("password","password_confirmation")},[]);const h=s=>{t(s.target.name,s.target.type==="checkbox"?s.target.checked:s.target.value)},g=s=>{s.preventDefault(),c(route("register"),{onFinish:p=>{},onError:p=>{}})},o="Inscription",i=Object.entries(w);return v(G,{props:r,title:o,children:[d(W,{title:o}),i.length>0&&v(V,{state:"error",className:"mb-4",children:[d("h1",{className:"text-xl",children:"Le formulaire semble incomplet et comporte des erreurs: "}),d("ul",{className:"mt-2 xl:pl-7",children:i.map((s,p)=>v("li",{className:"mb-2",children:["- ",a.get("auth.register."+s[1],[{key:":attribute",value:s[0]}])]}))})]}),v("form",{className:"flex gap-12 flex-col justify-center",onSubmit:g,children:[v("div",{className:"grid grid-cols-1 2xl:grid-cols-2 gap-6",children:[v("div",{children:[d(L,{forInput:"email",value:"Adresse Mail"}),d(C,{id:"email",type:"email",name:"email",value:e.email,className:"mt-1 block w-full",autoComplete:"username",placeholder:"bob@frazionz.net",disabled:f,handleChange:h,required:!0})]}),v("div",{children:[d(L,{forInput:"name",value:"Pseudonyme"}),d(C,{id:"name",name:"name",value:e.name,className:"mt-1 block w-full",autoComplete:"name",isFocused:!0,placeholder:"SuperBob3000",disabled:f,handleChange:h,required:!0})]}),v("div",{children:[d(L,{forInput:"password",value:"Mot de passe"}),d(C,{id:"password",type:"password",name:"password",value:e.password,className:"mt-1 block w-full",autoComplete:"new-password",placeholder:"********************",disabled:f,handleChange:h,required:!0})]}),v("div",{children:[d(L,{forInput:"password_confirmation",value:"Confirmer le Mot de passe"}),d(C,{id:"password_confirmation",type:"password",name:"password_confirmation",value:e.password_confirmation,disabled:f,className:"mt-1 block w-full",autoComplete:"new-password",placeholder:"********************",handleChange:h,required:!0})]}),d("div",{children:v(K,{large:!0,checked:e.confirm_cguv,onChange:s=>{t("confirm_cguv",s)},children:["Accepter les ",d(M,{href:"#",children:"Conditions d'utilisations"})]})}),d("div",{children:d(ie,{sitekey:n,onChange:s=>{t("captcha",s)}})})]}),d("div",{className:"flex items-center justify-center mt-4",children:d("button",{className:"btn",disabled:f,children:"S'inscrire"})})]})]})}export{Se as default};
