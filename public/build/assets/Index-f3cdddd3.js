import{R as a,j as i,a as e,n as r,f as s}from"./app-76c6f4b8.js";import{L as l}from"./Layout-1c8c67ee.js";import{A as n}from"./Alert-d266c7df.js";import"./logo-ec0c8240.js";/* empty css            */import"./index-4d501b15.js";import"./index.esm-a2a84cbf.js";class x extends a.Component{constructor(t){super(t),this.title="Profil",this.status=t.status,this.mustVerifyEmail=t.mustVerifyEmail,this.TwoFA=t.auth.TwoFA,this.user=t.auth.user}render(){return i(l,{props:this.props,title:this.title,header:e("h2",{className:"font-semibold text-xl text-gray-800 leading-tight",children:"Profile"}),children:[e(r,{title:this.title}),i("div",{className:"flex flex-col gap-[60px]",children:[this.TwoFA===!1&&e("div",{className:"alert infos w-full",children:i("span",{children:["Tu peux activer la double authentification en allant ",e(s,{href:"/2fa/register",children:"ici"})]})}),this.mustVerifyEmail&&this.user.email_verified_at===null&&i("div",{className:"flex justify-between items-center gap-[60px]",children:[e(n,{state:"warning",message:"Tu dois valider ton adresse mail pour pouvoir jouer !"}),e(s,{href:route("verification.send"),data:{_token:this.props.csrf_token},method:"post",as:"button",className:"btn",children:"Renvoyer un email"}),this.status==="verification-link-sent"&&e("div",{className:"mt-2 font-medium text-sm text-green-600",children:"A new verification link has been sent to your email address."})]})]})]})}}export{x as default};
