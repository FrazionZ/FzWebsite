import{R as o,j as i,a as e,F as c,n as p,f as h}from"./app-15af5a0b.js";import{p as r}from"./index-4d501b15.js";import{L as m}from"./Layout-edc1af99.js";import"./logo-ec0c8240.js";import"./FzToastContainer-fe4013e1.js";/* empty css            */let a,s,l,n;class u extends o.Component{static get propTypes(){return{bid:r.any,text:r.any,onClick:r.any,className:r.any}}constructor(t){super(t),a=t.id,s=t.text,l=t.onClick,n=t.className}render(){return i("button",{className:`btn-download-launch-game ${n}`,id:a,onClick:l,children:[e("div",{className:"label",children:s}),i("svg",{width:"368",height:"91",viewBox:"0 0 368 91",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[e("path",{d:"M61.8049 5H60.0642L58.6998 6.08103L13.8949 41.581L8.94873 45.5L13.8949 49.419L58.6998 84.919L60.0642 86H61.8049H306.195H307.936L309.3 84.919L354.105 49.419L359.051 45.5L354.105 41.581L309.3 6.08103L307.936 5H306.195H61.8049Z",stroke:"#D29334",strokeOpacity:"0.3",strokeWidth:"10"}),e("g",{filter:"url(#filter0_d_1990_4200)",children:e("path",{d:"M306.195 10H61.8049L17 41V45.5L61.8049 81H306.195L351 45.5V41L306.195 10Z",fill:"#D9D9D9",fillOpacity:"0.01",shapeRendering:"crispEdges"})}),e("mask",{id:"mask0_1990_4200",style:{maskType:"alpha"},maskUnits:"userSpaceOnUse",x:"17",y:"10",width:"334",height:"71",children:e("path",{d:"M306.195 10H61.8049L17 45.5L61.8049 81H306.195L351 45.5L306.195 10Z",fill:"url(#paint0_linear_1990_4200)"})}),i("g",{mask:"url(#mask0_1990_4200)",children:[e("path",{d:"M306.195 10H61.8049L17 45.5L61.8049 81H306.195L351 45.5L306.195 10Z",fill:"url(#paint1_linear_1990_4200)"}),i("g",{id:"hoverRect",children:[e("path",{d:"M225 10H286L258 81H197L225 10Z",fill:"white",fillOpacity:"0.2"}),e("path",{d:"M70 10H131L103 81H42L70 10Z",fill:"white",fillOpacity:"0.2"})]})]}),i("defs",{children:[i("filter",{id:"filter0_d_1990_4200",x:"17",y:"10",width:"334",height:"75",filterUnits:"userSpaceOnUse",colorInterpolationFilters:"sRGB",children:[e("feFlood",{floodOpacity:"0",result:"BackgroundImageFix"}),e("feColorMatrix",{in:"SourceAlpha",type:"matrix",values:"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0",result:"hardAlpha"}),e("feOffset",{dy:"4"}),e("feComposite",{in2:"hardAlpha",operator:"out"}),e("feColorMatrix",{type:"matrix",values:"0 0 0 0 0.290196 0 0 0 0 0.133333 0 0 0 0 0.0156863 0 0 0 1 0"}),e("feBlend",{mode:"normal",in2:"BackgroundImageFix",result:"effect1_dropShadow_1990_4200"}),e("feBlend",{mode:"normal",in:"SourceGraphic",in2:"effect1_dropShadow_1990_4200",result:"shape"})]}),i("linearGradient",{id:"paint0_linear_1990_4200",x1:"17",y1:"10",x2:"353.83",y2:"63.0217",gradientUnits:"userSpaceOnUse",children:[e("stop",{stopColor:"#F79A08"}),e("stop",{offset:"1",stopColor:"#E15100"})]}),i("linearGradient",{id:"paint1_linear_1990_4200",x1:"17",y1:"10",x2:"353.83",y2:"63.0217",gradientUnits:"userSpaceOnUse",children:[e("stop",{stopColor:"#F79A08"}),e("stop",{offset:"1",stopColor:"#E15100"})]})]})]})]})}}const f=u;class k extends o.Component{constructor(t){super(t),this.title="Accueil",this.state={mc:null}}async componentDidMount(){let t=await axios.get("https://api.mcsrvstat.us/2/194.9.172.246");this.setState({mc:t.data})}render(){return i(c,{children:[e(p,{title:this.title}),e(m,{props:this.props,mc:this.state.mc,isHome:!0,title:this.title,children:e("div",{className:"flex justify-center",children:e(h,{href:"/launcher",children:e(f,{id:"join",text:"Rejoindre"})})})})]})}}export{k as default};
