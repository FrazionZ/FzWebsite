var m=Object.defineProperty;var h=(t,i,s)=>i in t?m(t,i,{enumerable:!0,configurable:!0,writable:!0,value:s}):t[i]=s;var n=(t,i,s)=>(h(t,typeof i!="symbol"?i+"":i,s),s);import{a as e,F as o,j as a,b as p,n as u}from"./app-36574797.js";import{L as f}from"./Layout-51a0ccc0.js";import{n as v}from"./index.esm-02dd3503.js";import{R as c}from"./react-markdown-77349e0a.js";import{P as N}from"./pnotes-9c3a1870.js";import{W as x,U as g,A as b}from"./apple-a35168af.js";import{A as w}from"./Alert-7617d3af.js";import"./logo-ec0c8240.js";import"./FzToastContainer-b6b01518.js";import"./FzToast-ee7cf2bf.js";import"./bubble_warning-38724665.js";import"./bubble_infos-2d9e4d74.js";import"./motion-0558cbd3.js";import"./Dropdown-ca68c6cd.js";import"./iconBase-2a0d2d51.js";import"./index-4d3ed913.js";/* empty css            */import"./twitch-ab40ca14.js";import"./index-4d501b15.js";import"./index-1907b027.js";function k({pnotes:t}){return t==null?e(o,{children:"Veuillez patienter"}):t.map((i,s)=>s==0?a("div",{children:[a("div",{className:"flex items-center text-2xl gap-2",children:[e(v,{}),e("h2",{className:"text-gray",children:i.tag_name})]}),e("h3",{children:e(c,{children:i.body})}),e("br",{})]},s):a("div",{children:[e("h3",{className:"text-gray",children:i.tag_name}),e("h4",{children:e(c,{children:i.body})}),e("br",{})]},s))}const y="/build/assets/cloud_dl-675c4fc8.svg";function z({platform:t}){return t.fake?a("div",{className:"card",children:[e("img",{src:t.icon,alt:""}),a("div",{className:"infos",children:[e("div",{className:"title",children:t.name}),e("div",{className:"subtitle",children:"N/A"})]})]}):t.datas!==void 0?a("div",{className:"card",children:[e("img",{src:t.icon,alt:""}),a("div",{className:"infos",children:[e("div",{className:"title",children:t.name}),a("div",{className:"subtitle",children:[parseInt(t.datas.exe.size)," Mo - Dernière Mise à Jours le ",t.datas.date," - ",e("a",{target:"_blank",href:t.vstotal,children:"Virus Total"})]})]}),e("div",{className:"actions",children:e("a",{className:"btn",href:t.datas.exe.dl,download:"Frazionz_Launcher",children:"Download"})})]}):a("div",{className:"card",children:[e("img",{src:t.icon,alt:""}),a("div",{className:"infos",children:[e("div",{className:"title",children:t.name}),e("div",{className:"subtitle",children:"Chargement"})]})]})}class E extends p.Component{constructor(s){super(s);n(this,"title","Rejoindre le Serveur");this.state={pnotes:null,platforms:[{icon:x,name:"Windows",key:"windows",vstotal:"https://www.virustotal.com/gui/file-analysis/YTdjZWIyYTlkMjRkODA4YWNlMmZkYTEzNWIyZTQyNTY6MTY3NjI0NDA0Mw==",fake:!1},{icon:g,name:"Ubuntu (Linux)",key:"ubuntu",vstotal:"",fake:!0},{icon:b,name:"Apple",key:"apple",vstotal:"",fake:!0}]}}async componentDidMount(){for await(const[r,l]of this.state.platforms.entries())if(!l.fake){const d=await axios.get(`https://download.frazionz.net/serverNodeJS/?branch=${l.key}`);this.state.platforms[r].datas=d.data}let s=await axios.get("https://api.frazionz.net/github/launcher");console.log(s),this.setState({pnotes:s.data}),this.setState({platforms:this.state.platforms})}render(){return a(o,{children:[e(u,{title:this.title}),a(f,{props:this.props,title:this.title,children:[a("div",{className:"flex flex-col gap-[30px]",children:[a("div",{className:"icon_title",children:[e("img",{src:y,alt:""}),e("span",{children:"Télécharger le launcher"})]}),this.state.platforms.map((s,r)=>e(z,{platform:s},r))]}),a("div",{className:"flex flex-col gap-[16px] mt-[60px]",children:[e("div",{className:"icon_title",children:e("span",{children:"Un Problème avec le Launcher ?"})}),e(w,{state:"error",children:"Contactez nous sur le serveur discord ! On trouvera sûrement le problème."})]}),a("div",{className:"flex flex-col gap-[30px] mt-[120px]",children:[a("div",{className:"icon_title",children:[e("img",{src:N,alt:""}),e("span",{children:"Y'a quoi de nouveau ?"})]}),e("div",{className:"card pnotes",children:e("div",{id:"versions",children:e(k,{pnotes:this.state.pnotes})})})]})]})]})}}export{E as default};
