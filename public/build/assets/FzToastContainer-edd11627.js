import{W as r,a as o}from"./app-224f2270.js";import{F as t,k as n}from"./FzToast-813026fc.js";function u(){const{flash:a}=r().props;if(a.status!==null){let e=a.status.type,s=a.status.msg;switch(e){case"error":t.error(s);break;case"success":t.success(s);break;case"info":t.info(s);break;case"warning":t.warning(s);break;default:t.info(s)}a.status=null}return o(n,{})}export{u as F};
