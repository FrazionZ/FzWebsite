import{b as l,g as i,j as s,a as e}from"./app-672b5057.js";import{m as n}from"./motion-8d78cff3.js";import{A as c}from"./index-7614422b.js";class p extends l.Component{constructor(t){super(t),this.state={isOpen:!1},this.title=t.title,this.value=t.value,this.callSave=t.callSave,this.icon=t.icon,this.link=t.href}async formSubmitPut(){let t=!1;Object.entries(this.props.data).map(a=>{if(a[0]!=="_token"&&a[1]!==""){t=!0;return}}),t&&i.put(this.props.url,this.props.data,{preserveScroll:!0,onSuccess:()=>{i.reload()}})}render(){return s("div",{className:"card",children:[s("div",{className:"head",children:[s("div",{className:"infos",children:[typeof this.icon=="string"&&e("img",{src:this.icon,width:"32",height:"32",alt:""}),typeof this.icon=="object"&&this.icon,e("span",{children:this.title}),e("span",{className:"text-[var(--text-inactive)]",children:this.value})]}),e("div",{className:"actions",children:e(n.button,{whileTap:{scale:.97},className:"btn",onClick:()=>{this.link!==void 0?i.get(this.link):(this.state.isOpen&&this.props.method=="put"&&this.formSubmitPut(),this.setState({isOpen:!this.state.isOpen}))},children:this.state.isOpen?"Sauvegarder":"Modifier"})})]}),e(c,{initial:!1,children:this.state.isOpen&&e(n.section,{className:"content",initial:"collapsed",animate:"open",exit:"collapsed",variants:{open:{opacity:1,height:"auto"},collapsed:{opacity:0,height:0}},transition:{duration:.2,ease:[.04,.62,.23,.98]},children:this.props.children},"content")})]})}}export{p as default};
