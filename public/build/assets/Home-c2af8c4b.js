import{b as n,j as i,a as t,F as p,n as c,d as h}from"./app-e514fc58.js";import{p as r}from"./index-4d501b15.js";import{L as m}from"./Layout-0d02a113.js";import"./logo-ec0c8240.js";import"./FzToastContainer-693dfff9.js";import"./FzToast-5756d4a1.js";import"./bubble_warning-38724665.js";import"./bubble_infos-2d9e4d74.js";import"./motion-3c11ff0a.js";import"./Dropdown-b187739c.js";/* empty css            */let a,s,l,o;class u extends n.Component{static get propTypes(){return{bid:r.any,text:r.any,onClick:r.any,className:r.any}}constructor(e){super(e),a=e.id,s=e.text,l=e.onClick,o=e.className}render(){return i("button",{className:`btn-download-launch-game ${o}`,id:a,onClick:l,children:[t("div",{className:"label",children:s}),i("svg",{width:"368",height:"91",viewBox:"0 0 368 91",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[t("path",{d:"M61.8049 5H60.0642L58.6998 6.08103L13.8949 41.581L8.94873 45.5L13.8949 49.419L58.6998 84.919L60.0642 86H61.8049H306.195H307.936L309.3 84.919L354.105 49.419L359.051 45.5L354.105 41.581L309.3 6.08103L307.936 5H306.195H61.8049Z",stroke:"#D29334",strokeOpacity:"0.3",strokeWidth:"10"}),t("g",{filter:"url(#filter0_d_1990_4200)",children:t("path",{d:"M306.195 10H61.8049L17 41V45.5L61.8049 81H306.195L351 45.5V41L306.195 10Z",fill:"#D9D9D9",fillOpacity:"0.01",shapeRendering:"crispEdges"})}),t("mask",{id:"mask0_1990_4200",style:{maskType:"alpha"},maskUnits:"userSpaceOnUse",x:"17",y:"10",width:"334",height:"71",children:t("path",{d:"M306.195 10H61.8049L17 45.5L61.8049 81H306.195L351 45.5L306.195 10Z",fill:"url(#paint0_linear_1990_4200)"})}),i("g",{mask:"url(#mask0_1990_4200)",children:[t("path",{d:"M306.195 10H61.8049L17 45.5L61.8049 81H306.195L351 45.5L306.195 10Z",fill:"url(#paint1_linear_1990_4200)"}),i("g",{id:"hoverRect",children:[t("path",{d:"M225 10H286L258 81H197L225 10Z",fill:"white",fillOpacity:"0.2"}),t("path",{d:"M70 10H131L103 81H42L70 10Z",fill:"white",fillOpacity:"0.2"})]})]}),i("defs",{children:[i("filter",{id:"filter0_d_1990_4200",x:"17",y:"10",width:"334",height:"75",filterUnits:"userSpaceOnUse",colorInterpolationFilters:"sRGB",children:[t("feFlood",{floodOpacity:"0",result:"BackgroundImageFix"}),t("feColorMatrix",{in:"SourceAlpha",type:"matrix",values:"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0",result:"hardAlpha"}),t("feOffset",{dy:"4"}),t("feComposite",{in2:"hardAlpha",operator:"out"}),t("feColorMatrix",{type:"matrix",values:"0 0 0 0 0.290196 0 0 0 0 0.133333 0 0 0 0 0.0156863 0 0 0 1 0"}),t("feBlend",{mode:"normal",in2:"BackgroundImageFix",result:"effect1_dropShadow_1990_4200"}),t("feBlend",{mode:"normal",in:"SourceGraphic",in2:"effect1_dropShadow_1990_4200",result:"shape"})]}),i("linearGradient",{id:"paint0_linear_1990_4200",x1:"17",y1:"10",x2:"353.83",y2:"63.0217",gradientUnits:"userSpaceOnUse",children:[t("stop",{stopColor:"#F79A08"}),t("stop",{offset:"1",stopColor:"#E15100"})]}),i("linearGradient",{id:"paint1_linear_1990_4200",x1:"17",y1:"10",x2:"353.83",y2:"63.0217",gradientUnits:"userSpaceOnUse",children:[t("stop",{stopColor:"#F79A08"}),t("stop",{offset:"1",stopColor:"#E15100"})]})]})]})]})}}const f=u;class O extends n.Component{constructor(e){super(e),this.title="Accueil",this.state={mc:null}}async componentDidMount(){let e=await axios.get("https://api.mcsrvstat.us/2/194.9.172.246");this.setState({mc:e.data})}render(){return i(p,{children:[t(c,{title:this.title}),t(m,{props:this.props,mc:this.state.mc,isHome:!0,title:this.title,children:t("div",{className:"flex justify-center",children:t(h,{href:"/launcher",children:t(f,{id:"join",text:"Rejoindre"})})})})]})}}export{O as default};
