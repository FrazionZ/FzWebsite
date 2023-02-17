import{R as l,a as s,j as t}from"./app-ea394b83.js";import{p as e}from"./index-4d501b15.js";import{a as n}from"./Layout-7feb1c32.js";const i="/build/assets/bubble_error-64439674.svg",o="/build/assets/bubble_success-abfe448a.svg",r="/build/assets/bubble_infos-00b85e33.svg",b="/build/assets/bubble_warning-14c416fe.svg",p=a=>{switch(a){case"error":return{icon:i};case"success":return{icon:o};case"infos":return{icon:r};case"warning":return{icon:b};default:return{icon:r}}};class m extends l.Component{static get propTypes(){return{calltext:e.string,callfunction:e.func,closable:e.bool,state:e.any,className:e.string,message:e.string,actions:e.object}}constructor(c){super(c)}render(){return s("div",{className:`alert ${this.props.state} ${this.props.className}`,children:t("div",{className:"flex justify-between align-center w-full",children:[t("div",{className:"flex justify-between align-center w-full",children:[t("div",{className:"flex gap-[24px]",children:[s("img",{src:p(this.props.state).icon,alt:`bubble_${this.props.state}`}),s("span",{children:this.props.message})]}),this.props.closable!==void 0&&s("span",{className:"close",onClick:()=>{},children:s(n,{})})]}),this.props.callfunc!==void 0&&s("div",{className:"actions",children:s("button",{className:"btn",onClick:this.props.callfunc,children:this.props.calltext})})]})})}}export{m as A,r as B};
