(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{410:function(e,t,a){e.exports=a(542)},415:function(e,t,a){},416:function(e,t,a){},539:function(e,t){},542:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(16),i=a.n(o),c=(a(415),a(399)),s=a(370),l=a(371),d=a(401),u=a(398),f=(a(416),a(571)),m=a(4),p=a(400),g=a(256),h=a(564),b=a(563),E=a(561),w=a(60),j=a(366),v=a(251),O=a(373),S=a.n(O),x=a(544),P=a(545),y=a(562),k=a(313),C=a(376),R=a.n(C),F=a(194),z=a.n(F),N=a(139),B=a.n(N),A=a(374),T=a.n(A),M=a(375),D=a.n(M),I=a(372),W=a.n(I),L=a(314),q=a(89),J=a(312),V=a(17),G=["Todos","Novo","Fazendo","Para entrega","Aguardando retirada","Finalizado"],H=[r.a.createElement(W.a,null),r.a.createElement(S.a,null),r.a.createElement(B.a,null),r.a.createElement(z.a,null),r.a.createElement(T.a,null),r.a.createElement(D.a,null)],U=Object(J.a)((function(e){return{root:{display:"flex"},drawer:Object(g.a)({},e.breakpoints.up("sm"),{width:200,flexShrink:0}),appBar:{zIndex:e.zIndex.drawer+1},menuButton:Object(g.a)({marginRight:e.spacing(2)},e.breakpoints.up("sm"),{display:"none"}),toolbar:e.mixins.toolbar,drawerPaper:{width:200}}}));var $=function(e){var t=e.window,a=U(),n=Object(V.a)(),o=r.a.useState(!1),i=Object(p.a)(o,2),c=i[0],s=i[1],l=function(){s(!c)},d=r.a.createElement("div",null,r.a.createElement("div",{className:a.toolbar}),r.a.createElement(E.a,null),r.a.createElement(x.a,null,G.map((function(t,a){return r.a.createElement(P.a,{button:!0,key:t,onClick:e.changePage.bind(e,t)},r.a.createElement(y.a,null,H[a]),r.a.createElement(k.a,{primary:t}))})))),u=void 0!==t?function(){return t().document.body}:void 0;return r.a.createElement("div",{className:a.root},r.a.createElement(b.a,null),r.a.createElement(h.a,{position:"fixed",className:a.appBar},r.a.createElement(L.a,null,r.a.createElement(v.a,{color:"inherit","aria-label":"open drawer",edge:"start",onClick:l,className:a.menuButton},r.a.createElement(R.a,null)),r.a.createElement(q.a,{variant:"h6",noWrap:!0},"Painel de pedidos"))),r.a.createElement("nav",{className:a.drawer,"aria-label":"mailbox folders"},r.a.createElement(j.a,{smUp:!0,implementation:"css"},r.a.createElement(w.a,{container:u,variant:"temporary",anchor:"rtl"===n.direction?"right":"left",open:c,onClose:l,classes:{paper:a.drawerPaper},ModalProps:{keepMounted:!0}},d)),r.a.createElement(j.a,{xsDown:!0,implementation:"css"},r.a.createElement(w.a,{classes:{paper:a.drawerPaper},variant:"permanent",open:!0},d))))},K=a(377),Q=a.n(K),X=a(384),Y=a.n(X),Z=a(393),_=a.n(Z),ee=a(210),te=a.n(ee),ae=a(391),ne=a.n(ae),re=a(260),oe=a.n(re),ie=a(259),ce=a.n(ie),se=a(385),le=a.n(se),de=a(386),ue=a.n(de),fe=a(388),me=a.n(fe),pe=a(389),ge=a.n(pe),he=a(390),be=a.n(he),Ee=a(394),we=a.n(Ee),je=a(387),ve=a.n(je),Oe=a(392),Se=a.n(Oe),xe=a(395),Pe=a.n(xe),ye=a(396),ke=a.n(ye),Ce={Add:Object(n.forwardRef)((function(e,t){return r.a.createElement(Y.a,Object.assign({},e,{ref:t}))})),Check:Object(n.forwardRef)((function(e,t){return r.a.createElement(te.a,Object.assign({},e,{ref:t}))})),Clear:Object(n.forwardRef)((function(e,t){return r.a.createElement(ce.a,Object.assign({},e,{ref:t}))})),Delete:Object(n.forwardRef)((function(e,t){return r.a.createElement(le.a,Object.assign({},e,{ref:t}))})),DetailPanel:Object(n.forwardRef)((function(e,t){return r.a.createElement(oe.a,Object.assign({},e,{ref:t}))})),Edit:Object(n.forwardRef)((function(e,t){return r.a.createElement(ue.a,Object.assign({},e,{ref:t}))})),Export:Object(n.forwardRef)((function(e,t){return r.a.createElement(ve.a,Object.assign({},e,{ref:t}))})),Filter:Object(n.forwardRef)((function(e,t){return r.a.createElement(me.a,Object.assign({},e,{ref:t}))})),FirstPage:Object(n.forwardRef)((function(e,t){return r.a.createElement(ge.a,Object.assign({},e,{ref:t}))})),LastPage:Object(n.forwardRef)((function(e,t){return r.a.createElement(be.a,Object.assign({},e,{ref:t}))})),NextPage:Object(n.forwardRef)((function(e,t){return r.a.createElement(oe.a,Object.assign({},e,{ref:t}))})),PreviousPage:Object(n.forwardRef)((function(e,t){return r.a.createElement(ne.a,Object.assign({},e,{ref:t}))})),ResetSearch:Object(n.forwardRef)((function(e,t){return r.a.createElement(ce.a,Object.assign({},e,{ref:t}))})),Search:Object(n.forwardRef)((function(e,t){return r.a.createElement(Se.a,Object.assign({},e,{ref:t}))})),SortArrow:Object(n.forwardRef)((function(e,t){return r.a.createElement(_.a,Object.assign({},e,{ref:t}))})),ThirdStateCheck:Object(n.forwardRef)((function(e,t){return r.a.createElement(we.a,Object.assign({},e,{ref:t}))})),ViewColumn:Object(n.forwardRef)((function(e,t){return r.a.createElement(Pe.a,Object.assign({},e,{ref:t}))}))};var Re=function(e){var t=[{icon:B.a,hidden:"Fazendo"===e.status,tooltip:"Fazendo",onClick:function(t,a){e.changeStatus(a,"Fazendo")}},{icon:te.a,hidden:"Finalizado"===e.status,tooltip:"Aguardando retirada"===e.status||"Para entrega"===e.status?"Finalizado":"Pronto",onClick:function(t,a){"Aguardando retirada"===e.status||"Para entrega"===e.status?e.changeStatus(a,"Finalizado"):"retirada"===a.formaentrega?e.changeStatus(a,"Aguardando retirada"):"entrega"===a.formaentrega&&e.changeStatus(a,"Para entrega")}}],a=[{icon:B.a,hidden:"Fazendo"===e.status,tooltip:"Fazendo",onClick:function(t,a){e.changeStatus(a,"Fazendo")}},{icon:z.a,hidden:"Para entrega"===e.status,tooltip:"Para entrega",onClick:function(t,a){e.changeStatus(a,"Para entrega")}},{icon:te.a,hidden:"Finalizado"===e.status,tooltip:"Finalizado",onClick:function(t,a){e.changeStatus(a,"Finalizado")}},{tooltip:"Remover pedido",icon:ke.a,onClick:function(t,a){console.log(a),e.remove(a)}}];return r.a.createElement(Q.a,{icons:Ce,columns:[{title:"N\xba do pedido",field:"id",defaultSort:"desc",width:100},{title:"Pedido",field:"pedido",width:190},{title:"Valor",field:"valor",width:100},{title:"Forma de entrega",field:"formaentrega",width:150},{title:"Endere\xe7o",field:"endereco",width:190},{title:"Status",field:"status",width:110,hidden:"Todos"!==e.status}],data:"Todos"===e.status?e.pedidos:e.pedidos.filter((function(t){return t.status===e.status})),title:e.status,options:{filterCellStyle:{display:"none"},filtering:!0,headerStyle:{fontWeight:"bold"},addRowPosition:"first",columnsButton:"true",exportButton:"true",paging:!1,draggable:!1,actionsColumnIndex:-1,actionsCellStyle:{width:40}},actions:"Finalizado"!==e.status?t:a,localization:{header:{actions:"Mudar status"},body:{emptyDataSourceMessage:"Nenhum registro para exibir"},toolbar:{searchTooltip:"Pesquisar",searchPlaceholder:"Pesquisar",showColumnsTitle:"Mostrar colunas",showColumnsAriaLabel:"Mostrar colunas",addRemoveColumns:"Adiciona ou remove colunas",exportTitle:"Baixar",exportName:"Baixar planilha"}}})},Fe={padding:"20px",position:"absolute",bottom:"0",width:"100%"};var ze=function(e){return r.a.createElement("div",{style:Fe},r.a.createElement("footer",null,r.a.createElement(q.a,{variant:"body2",color:"textSecondary",align:"center"},"\xa9 Copyright 2020 Lucas ferreira"),r.a.createElement(q.a,{variant:"body2",color:"textSecondary",align:"center"},"Email:lucasf854@gmail.com"),r.a.createElement(q.a,{variant:"body2",color:"textSecondary",align:"center"},"Whatsapp:(11)95975-6032")))},Ne=a(397),Be=a.n(Ne)()("/"),Ae=function(e){Object(d.a)(a,e);var t=Object(u.a)(a);function a(){var e;return Object(s.a)(this,a),(e=t.call(this)).changePage=function(t){t!==e.state.status&&e.setState({status:t})},e.changeStatus=function(t,a){e.setState((function(e){return{pedidos:e.pedidos.map((function(e){return e.id===t.id?(e.status=a,Be.emit("changeStatus",e),e):e}))}}))},e.remove=function(t){var a=Object(c.a)(e.state.pedidos),n=a.indexOf(t);console.log(n),-1!==n&&(a.splice(n,1),e.setState({pedidos:a}),Be.emit("remove",t))},e.state={status:"Todos",pedidos:[]},e}return Object(l.a)(a,[{key:"componentDidMount",value:function(){var e=this;return fetch("/pedidos").then((function(e){return e.json()})).then((function(t){e.setState({pedidos:t})})),Be.on("FromAPI",(function(t){console.log(t);var a=e.state.pedidos.concat(t);e.setState({pedidos:a}),console.log("in cdd:",e.state.pedidos)})),function(){return Be.disconnect()}}},{key:"render",value:function(){var e=this.props.classes;return r.a.createElement("div",{className:e.root},r.a.createElement(f.a,{container:!0},r.a.createElement(f.a,{item:!0,xs:"auto"},r.a.createElement($,{status:this.status,changePage:this.changePage})),r.a.createElement("div",{className:e.table},r.a.createElement(f.a,{item:!0,xs:"auto"},r.a.createElement(Re,{pedidos:this.state.pedidos,changeStatus:this.changeStatus,status:this.state.status,remove:this.remove})))),r.a.createElement(ze,null))}}]),a}(n.Component),Te=Object(m.a)((function(e){return{root:{display:"flex",height:"calc(100% - 60px)",minHeight:"100vh",position:"relative",paddingBottom:"100px"},table:{paddingTop:"68px",flexGrow:1,backgroundColor:e.palette.background.default,padding:e.spacing(1)}}}))(Ae);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(Te,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[410,1,2]]]);
//# sourceMappingURL=main.dcb2bbcb.chunk.js.map