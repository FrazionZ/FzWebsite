var h=Object.defineProperty;var m=(a,i,t)=>i in a?h(a,i,{enumerable:!0,configurable:!0,writable:!0,value:t}):a[i]=t;var n=(a,i,t)=>(m(a,typeof i!="symbol"?i+"":i,t),t);import{a as e,F as d,j as s,R as u,n as p}from"./app-f243bcb8.js";import{L as v}from"./Layout-1c3f9603.js";import{n as f}from"./index.esm-dbfbade4.js";import{R as c}from"./react-markdown-516aa196.js";import{P as N}from"./pnotes-9c3a1870.js";import{A as g}from"./Alert-b8f21ba3.js";import"./logo-ec0c8240.js";import"./FzToastContainer-6e99986b.js";import"./FzToast-d159b48c.js";import"./Dropdown-0a9b586c.js";/* empty css            */import"./iconBase-ac470508.js";import"./index-4d501b15.js";import"./index-60ce1a05.js";function x({pnotes:a}){return a==null?e(d,{children:"Veuillez patienter"}):a.map((i,t)=>t==0?s("div",{children:[s("div",{className:"flex items-center text-2xl gap-2",children:[e(f,{}),e("h2",{className:"text-gray",children:i.tag_name})]}),e("h3",{children:e(c,{children:i.body})}),e("br",{})]},t):s("div",{children:[e("h3",{className:"text-gray",children:i.tag_name}),e("h4",{children:e(c,{children:i.body})}),e("br",{})]},t))}const b="/build/assets/cloud_dl-675c4fc8.svg",w="/build/assets/windows-54e613f7.svg",k="/build/assets/ubuntu-dcbdf96a.svg",y="/build/assets/apple-c674ce6c.svg";function z({platform:a}){return a.fake?s("div",{className:"card",children:[e("img",{src:a.icon,alt:""}),s("div",{className:"infos",children:[e("div",{className:"title",children:a.name}),e("div",{className:"subtitle",children:"N/A"})]})]}):a.datas!==void 0?s("div",{className:"card",children:[e("img",{src:a.icon,alt:""}),s("div",{className:"infos",children:[e("div",{className:"title",children:a.name}),s("div",{className:"subtitle",children:[parseInt(a.datas.exe.size)," Mo - Dernière Mise à Jours le ",a.datas.date," - ",e("a",{target:"_blank",href:a.vstotal,children:"Virus Total"})]})]}),e("div",{className:"actions",children:e("a",{className:"btn",href:a.datas.exe.dl,download:"Frazionz_Launcher",children:"Download"})})]}):s("div",{className:"card",children:[e("img",{src:a.icon,alt:""}),s("div",{className:"infos",children:[e("div",{className:"title",children:a.name}),e("div",{className:"subtitle",children:"Chargement"})]})]})}class Z extends u.Component{constructor(t){super(t);n(this,"title","Rejoindre le Serveur");this.state={pnotes:null,platforms:[{icon:w,name:"Windows",key:"windows",vstotal:"https://www.virustotal.com/gui/file-analysis/YTdjZWIyYTlkMjRkODA4YWNlMmZkYTEzNWIyZTQyNTY6MTY3NjI0NDA0Mw==",fake:!1},{icon:k,name:"Ubuntu (Linux)",key:"ubuntu",vstotal:"",fake:!0},{icon:y,name:"Apple",key:"apple",vstotal:"",fake:!0}]}}async componentDidMount(){for await(const[l,r]of this.state.platforms.entries())if(!r.fake){const o=await axios.get(`https://download.frazionz.net/serverNodeJS/?branch=${r.key}`);this.state.platforms[l].datas=o.data}let t=await axios.get("https://api.frazionz.net/github/launcher");console.log(t),this.setState({pnotes:t.data}),this.setState({platforms:this.state.platforms})}render(){return s(d,{children:[e(p,{title:this.title}),s(v,{props:this.props,title:this.title,children:[s("div",{className:"flex flex-col gap-[30px]",children:[s("div",{className:"icon_title",children:[e("img",{src:b,alt:""}),e("span",{children:"Télécharger le launcher"})]}),this.state.platforms.map((t,l)=>e(z,{platform:t},l))]}),s("div",{className:"flex flex-col gap-[16px] mt-[60px]",children:[e("div",{className:"icon_title",children:e("span",{children:"Un Problème avec le Launcher ?"})}),e(g,{state:"error",message:"Contactez nous sur le serveur discord ! On trouvera sûrement le problème."})]}),s("div",{className:"flex flex-col gap-[30px] mt-[120px]",children:[s("div",{className:"icon_title",children:[e("img",{src:N,alt:""}),e("span",{children:"Y'a quoi de nouveau ?"})]}),e("div",{className:"card pnotes",children:e("div",{id:"versions",children:e(x,{pnotes:this.state.pnotes})})})]})]})]})}}export{Z as default};
