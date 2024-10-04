import{s as G,u as F,i as S,e as v,_ as H,d as J,r as c,o as s,f as b,h as o,a as n,w as t,b as r,t as h,c as u,j as f,F as w,g as C,p as K,q as P,n as R}from"./app-CyMA9q_N.js";const W=G("Bill",{state:()=>({date_start:moment().subtract(6,"days").format("YYYY-MM-DD"),date_end:new Date().toISOString().substr(0,10),is_fetch:!1,bill_checked:!1,dashboard:F(),auth:S()}),actions:{getData:async function(){this.is_fetch==!1&&(this.is_fetch=!0,this.dashboard.fetching=!0,await v.get("/api/bills",{params:{date_start:this.date_start,date_end:this.date_end}}).then(e=>{this.dashboard.bills=_.sortBy(e.data.bills,"date"),this.is_fetch=!1,this.dashboard.fetching=!1}))},getBill:async function(e){return this.dashboard.fetching=!0,await v.get(`/api/bills/${e}`).then(l=>(this.dashboard.fetching=!1,l.data.bill)).catch(l=>(this.dashboard.fetching=!1,l))},deleteBill:async function(e){return v.delete(`/api/bills/${e}`).then(l=>(this.dashboard.bills=this.dashboard.bills.filter(a=>a.id!=e),l))},deleteBills:async function(){let e=this.dashboard.bills.filter(l=>l.selected==!0).map(l=>l.id);return v.post("/api/bills_collect",{bills:e}).then(l=>(this.dashboard.bills=this.dashboard.bills.filter(a=>!e.includes(a.id)),l)).catch(l=>{console.log("error",l)})},toggleBill:function(e){let l=this.dashboard.bills.find(a=>a.id==e);l&&(l.selected=!l.selected)},cancelBill:function(){},toggleInvoice:function(e,l){v.put(`/api/invoices/${e}`,{checked:l})},unBillArticle:async function(e,l){return v.patch(`/api/articles/${e}`,{article:{bill_id:null},update_bill:!0}).then(a=>{let m=this.dashboard.bills.find(y=>y.id==l);return m?(m.articles=m.articles.filter(y=>y.id!=e),m.amount=_.sumBy(m.articles,"price"),!1):!0})}},getters:{getBillQueue:e=>e.dashboard.bills.filter(l=>l.selected===!0),total_bills:e=>_.sumBy(e.dashboard.bills,"amount"),total_bills_filtred:e=>_.sumBy(e.bills,"amount"),bills:e=>_.orderBy(e.dashboard.bills,["date","id"],["desc","desc"])}}),A={props:{bill:Object},data:function(){return{expand_articles:!1,expand_invoices:!1,loading:!1,loading_bill:!1,on_delete:!1,pause:!1,setTimeout:null,setInterval:null,counter:1,color:"white"}},mounted:function(){},computed:{_bill:function(){return W()},dashboard:function(){return F()},auth:function(){return S()},user:function(){return J()}},methods:{deleteModel:function(){this.dashboard.delete_dialog=!this.dashboard.delete_dialog,this.dashboard.delete_model_name="Bill",this.dashboard.deleteModel=this.deleteBill},deleteBill:async function(){return await this._bill.deleteBill(this.bill.id).then(e=>{this.$route.params.id&&this.$router.push({name:"bills.list"})})},aditBill:function(){this.$router.push({name:"bills.update",params:{id:this.bill.id}})},viewBill:function(){this.$router.push({name:"bills.view",params:{id:this.bill.id}})},cancelBill:async function(){return this.loading_bill=!0,await this._bill.cancelBill(this.bill).then(e=>(this.loading_bill=!1,e))},toggleBill:function(){this._bill.toggleBill(this.bill.id)},unBillArticle:async function(e,l){this.loading_bill=!0,await this._bill.unBillArticle(e,l).then(a=>{this.loading_bill=!1,a&&(this.bill.articles=this.bill.articles.filter(m=>m.id!=e),this.bill.amount=_.sumBy(this.bill.articles,"price"))})},rollback:function(){this.pause=!0,clearTimeout(this.setTimeout),clearInterval(this.setInterval),this.on_delete=!1,this.counter=1,setTimeout(()=>{this.loading=!1,this.pause=!1},1e3)},toggleInvoice:function(e){this._bill.toggleInvoice(e.id,!e.checked),e.checked=!e.checked},goTo:function(e){this.$router.push(`/articles/view/${e}`)}}},T=()=>{P(e=>({e50b12cc:e.color}))},I=A.setup;A.setup=I?(e,l)=>(T(),I(e,l)):T;const X=["id"],Z={class:"swiper-wrapper"},$={class:"swiper-slide"},ee={key:1},te={class:"text-center"},le=o("thead",null,[o("tr",null,[o("th",{class:"text-left pr-0"}," Name "),o("th",{class:"text-left px-0"}," Spent "),o("th",{class:"text-left px-0"}," Amount "),o("th",{class:"text-left"})])],-1),ie={class:"text-left pr-0"},se={class:"text-left px-0 text-red"},ae={class:"text-left px-0"},ne={class:"text-left px-0"},re={key:0,class:"bg-blue-lighten-5"},oe={class:"mr-1"},de={class:"d-inline"},ce={class:"d-inline text-green"};function ue(e,l,a,m,y,d){const V=c("v-progress-linear"),g=c("v-chip"),p=c("v-icon"),Y=c("v-card-text"),j=c("v-progress-circular"),k=c("v-btn"),D=c("v-checkbox"),B=c("v-img"),x=c("v-avatar"),M=c("v-spacer"),L=c("v-badge"),O=c("v-card-actions"),U=c("v-table"),z=c("v-expand-transition"),q=c("v-list-item"),E=c("v-list"),Q=c("v-card");return s(),b("div",{id:a.bill.id,class:"swiper-container"},[o("div",Z,[o("div",$,[n(Q,{hover:"",class:K(["mx-auto",{on_delete:e.on_delete}])},{loader:t(()=>[n(V,{active:e.loading_bill,indeterminate:"",height:"3",color:"blue"},null,8,["active"])]),subtitle:t(()=>[r(h(a.bill.date)+" | Created : ",1),d.auth.getAuth.id==a.bill.user_id?(s(),u(g,{key:0,size:"x-small",color:"green"},{default:t(()=>[r("Me")]),_:1})):(s(),u(g,{key:1,size:"x-small",color:"blue"},{default:t(()=>[r(h(a.bill.user.name),1)]),_:1}))]),title:t(()=>[r(" Bill N° : "+h(a.bill.id),1)]),append:t(()=>[e.loading?(s(),b("div",{key:0,class:"cursor-pointer",onClick:l[0]||(l[0]=(...i)=>d.rollback&&d.rollback(...i))},[n(j,{size:30,width:1,color:"primary",indeterminate:""},{default:t(()=>[e.pause?(s(),u(p,{key:0},{default:t(()=>[r(" mdi-pause ")]),_:1})):(s(),b("span",ee,h(e.counter),1))]),_:1})])):f("",!0),o("div",te,[a.bill.user_id==d.auth.getAuth.id&&d.dashboard.isLessThanTwoDays(a.bill.date)?(s(),u(k,{key:0,icon:"",size:"small",variant:"outlined",color:"red"},{default:t(()=>[n(p,{onClick:d.deleteModel,color:"red"},{default:t(()=>[r(" mdi-close ")]),_:1},8,["onClick"])]),_:1})):f("",!0),!e.$route.params.id&&d.auth.getAuth.id==a.bill.user_id?(s(),u(D,{key:1,"model-value":!!a.bill.selected,"hide-details":"",onClick:d.toggleBill,color:"primary"},null,8,["model-value","onClick"])):f("",!0),a.bill.checked?(s(),u(p,{key:2,color:"amber"},{default:t(()=>[r("mdi-seal-variant")]),_:1})):f("",!0)])]),prepend:t(()=>[n(x,{rounded:"0"},{default:t(()=>[n(B,{alt:"receipt",class:"img_border_radius",src:"/storage/receipt.gif"})]),_:1})]),default:t(()=>[n(Y,null,{default:t(()=>[n(p,{color:"green",class:"mx-3 pb-2"},{default:t(()=>[r("mdi-cash-multiple")]),_:1}),o("strong",null,h(a.bill.amount),1),r(" MAD ")]),_:1}),n(M),n(O,{class:"bg-blue-lighten-5"},{default:t(()=>[(s(!0),b(w,null,C(a.bill.invoices,i=>(s(),b("div",{key:i.id,class:"mr-3"},[n(L,{color:i.checked?"green":"yellow",location:"bottom end"},{badge:t(()=>[i.checked?(s(),u(p,{key:0},{default:t(()=>[r("mdi-check")]),_:1})):(s(),u(p,{key:1},{default:t(()=>[r("mdi-close")]),_:1}))]),default:t(()=>[n(x,{size:"20"},{default:t(()=>[n(B,{src:d.user.getUserImage(i.user_id)},null,8,["src"])]),_:2},1024)]),_:2},1032,["color"])]))),128)),n(M),n(k,{class:"mr-2",color:"deep-purple-darken-1",size:"x-small",variant:"tonal",icon:e.expand_invoices?"mdi-chevron-up":"mdi-chevron-down",onClick:l[1]||(l[1]=i=>e.expand_invoices=!e.expand_invoices)},null,8,["icon"]),n(k,{class:"mr-2",color:"blue-darken-1",size:"x-small",variant:"tonal",icon:e.expand_articles?"mdi-chevron-up":"mdi-chevron-down",onClick:l[2]||(l[2]=i=>e.expand_articles=!e.expand_articles)},null,8,["icon"]),e.$route.params.id?f("",!0):(s(),u(k,{key:0,class:"mr-2",color:"green-darken-1",size:"x-small",variant:"tonal",icon:"mdi-text-box",onClick:d.viewBill},null,8,["onClick"]))]),_:1}),n(z,null,{default:t(()=>[e.expand_invoices?(s(),u(U,{key:0},{default:t(()=>[le,o("tbody",null,[(s(!0),b(w,null,C(a.bill.invoices,i=>(s(),b("tr",{key:i.id},[o("td",ie,h(i.user.name),1),o("td",se," -"+h(e.formatFloatNumber(i.spent))+" MAD ",1),o("td",ae,[i.price>0?(s(),u(g,{key:0,variant:"tonal",color:"green"},{default:t(()=>[r(h(e.formatFloatNumber(i.price))+" MAD",1)]),_:2},1024)):i.price==0?(s(),u(g,{key:1,variant:"tonal",color:"gray"},{default:t(()=>[r(h(e.formatFloatNumber(i.price))+" MAD",1)]),_:2},1024)):(s(),u(g,{key:2,variant:"tonal",color:"red"},{default:t(()=>[r(h(e.formatFloatNumber(i.price))+" MAD",1)]),_:2},1024))]),o("td",ne,[n(D,{"model-value":!!i.checked,"hide-details":"",onClick:N=>d.toggleInvoice(i),color:"primary",disabled:d.auth.getAuth.id!=i.user_id},null,8,["model-value","onClick","disabled"])])]))),128))])]),_:1})):f("",!0)]),_:1}),n(z,null,{default:t(()=>[e.expand_articles?(s(),b("div",re,[n(E,{lines:"two",class:"bg-blue-lighten-5"},{default:t(()=>[(s(!0),b(w,null,C(a.bill.articles,i=>(s(),u(q,{key:i.id,onClick:N=>d.goTo(i.id)},{title:t(()=>[o("strong",oe,h(i.product.name),1),r(": "),d.auth.getAuth.id==i.user_id?(s(),u(g,{key:0,size:"x-small",color:"green"},{default:t(()=>[r("Me")]),_:1})):(s(),u(g,{key:1,size:"x-small",color:"blue"},{default:t(()=>[r(h(i.user.name),1)]),_:2},1024))]),subtitle:t(()=>[o("div",de,h(i.date),1),r(" | "),o("strong",ce,h(e.formatFloatNumber(i.price))+" MAD ",1)]),prepend:t(()=>[n(x,{rounded:"0"},{default:t(()=>[n(B,{alt:"charges-timeline",class:"img_border_radius",src:"/storage/article.gif"})]),_:1})]),append:t(()=>[a.bill.user_id==d.auth.getAuth.id&&d.dashboard.isLessThanTwoDays(i.date)?(s(),u(k,{key:0,color:"red-lighten-1",icon:"mdi-trash-can",variant:"tonal",size:"x-small",onClick:R(N=>d.unBillArticle(i.id,a.bill.id),["stop"])},null,8,["onClick"])):f("",!0)]),_:2},1032,["onClick"]))),128))]),_:1})])):f("",!0)]),_:1})]),_:1},8,["class"])])])],8,X)}const _e=H(A,[["render",ue]]);export{_e as B,W as u};
