import{u as N}from"./Article-DoySnGlq.js";import{_ as j,u as D,i as I,r as a,o as c,f as b,h,a as i,w as t,b as n,t as d,c as o,j as s,m as S,p as H,q as L}from"./app-1OHw9Cpn.js";const g={props:{article:Object},data:function(){return{loading:!1,loading_bill:!1,on_delete:!1,pause:!1,setTimeout:null,setInterval:null,counter:1,color:"white"}},mounted:function(){},computed:{_article:function(){return N()},dashboard:function(){return D()},auth:function(){return I()}},methods:{deleteModel:function(){this.dashboard.delete_dialog=!this.dashboard.delete_dialog,this.dashboard.delete_model_name="Article",this.dashboard.deleteModel=this.deleteArticle},deleteArticle:async function(){return await this._article.deleteArticle(this.article.id).then(l=>{this.$route.params.id&&this.$router.push({name:"articles.list"})})},aditArticle:function(){this.$router.push({name:"articles.update",params:{id:this.article.id}})},viewArticle:function(){this.$router.push({name:"articles.view",params:{id:this.article.id}})},cancelBill:async function(){return this.loading_bill=!0,await this._article.cancelBill(this.article).then(l=>(this.loading_bill=!1,l))},viewBill:function(){this.$router.push({name:"bills.view",params:{id:this.article.bill_id}})},toggleBill:function(){this._article.toggleBill(this.article.id)},rollback:function(){this.pause=!0,clearTimeout(this.setTimeout),clearInterval(this.setInterval),this.on_delete=!1,this.counter=1,setTimeout(()=>{this.loading=!1,this.pause=!1},1e3)}}},p=()=>{L(l=>({"04ef6cd0":l.color}))},y=g.setup;g.setup=y?(l,_)=>(p(),y(l,_)):p;const O=["id"],q={class:"swiper-wrapper"},E={class:"swiper-slide width_card"},F={key:1},P=["innerHTML"];function G(l,_,e,J,K,r){const C=a("v-progress-linear"),v=a("v-chip"),u=a("v-icon"),w=a("v-progress-circular"),m=a("v-btn"),A=a("v-checkbox"),x=a("v-img"),B=a("v-avatar"),z=a("v-card-text"),k=a("v-spacer"),M=a("v-tooltip"),T=a("v-card-actions"),V=a("v-card");return c(),b("div",{id:e.article.id,class:"swiper-container"},[h("div",q,[h("div",E,[i(V,{hover:"",class:H(["mx-auto",{on_delete:l.on_delete,"bg-blue-grey-lighten-3":e.article.bill_id>>0&&e.article.bill_id!==!0&&!l.on_delete}])},{loader:t(()=>[i(C,{active:l.loading_bill,indeterminate:"",height:"3",color:"blue"},null,8,["active"])]),subtitle:t(()=>[n(d(e.article.date)+" | Created : ",1),r.auth.getAuth.id==e.article.user_id?(c(),o(v,{key:0,size:"x-small",color:"green"},{default:t(()=>[n("Me")]),_:1})):(c(),o(v,{key:1,size:"x-small",color:"blue"},{default:t(()=>[n(d(e.article.user.name),1)]),_:1}))]),title:t(()=>[e.article.star?(c(),o(u,{key:0,size:"small",class:"mt-0 mb-1",color:"yellow"},{default:t(()=>[n("mdi-star")]),_:1})):s("",!0),n(" "+d(e.article.product.name),1)]),append:t(()=>[l.loading?(c(),b("div",{key:0,class:"cursor-pointer",onClick:_[0]||(_[0]=(...f)=>r.rollback&&r.rollback(...f))},[i(w,{size:30,width:1,color:"primary",indeterminate:""},{default:t(()=>[l.pause?(c(),o(u,{key:0},{default:t(()=>[n(" mdi-pause ")]),_:1})):(c(),b("span",F,d(l.counter),1))]),_:1})])):s("",!0),h("div",null,[e.article.user_id==r.auth.getAuth.id?(c(),o(m,{key:0,icon:"",size:"small",variant:"outlined",color:"red"},{default:t(()=>[i(u,{onClick:r.deleteModel,color:"red"},{default:t(()=>[n(" mdi-close ")]),_:1},8,["onClick"])]),_:1})):s("",!0),!l.$route.params.id&&(e.article.bill_id===null||e.article.bill_id===!0||e.article.bill_id===!1)&&!e.article.is_private?(c(),o(A,{key:1,"model-value":!!e.article.bill_id,"hide-details":"",onClick:r.toggleBill,color:"primary"},null,8,["model-value","onClick"])):s("",!0)])]),prepend:t(()=>[i(B,{rounded:"0"},{default:t(()=>[i(x,{alt:"charges-timeline",class:"img_border_radius",src:"/storage/article.gif"})]),_:1})]),default:t(()=>[i(z,null,{default:t(()=>[h("div",{innerHTML:e.article.description.replace(/(?:\r\n|\r|\n)/g,"<br>")},null,8,P)]),_:1}),i(k),i(T,{class:"text-green bg-amber-lighten-5"},{default:t(()=>[i(u,{color:"green",class:"mx-1"},{default:t(()=>[n("mdi-cash")]),_:1}),n(d(l.formatFloatNumber(e.article.price))+" MAD ",1),i(k),e.article.bill_id>>0&&e.article.bill_id!==!0?(c(),o(m,{key:0,class:"mr-2",color:"blue-darken-1",size:"x-small",variant:"tonal",icon:"mdi-invoice-text-fast-outline",onClick:r.viewBill},null,8,["onClick"])):s("",!0),e.article.bill_id>>0&&e.article.bill_id!==!0&&e.article.user_id==r.auth.getAuth.id?(c(),o(m,{key:1,class:"mr-2",color:"deep-purple-darken-1",size:"x-small",variant:"tonal",icon:"mdi-text-box-remove",onClick:r.cancelBill},null,8,["onClick"])):s("",!0),e.article.user_id==r.auth.getAuth.id?(c(),o(m,{key:2,class:"mr-2",color:"orange",size:"x-small",variant:"tonal",icon:"mdi-pencil",onClick:r.aditArticle},null,8,["onClick"])):s("",!0),i(M,{location:"top",text:e.article.is_private?"Only Me":"To All Brotherhood"},{activator:t(({props:f})=>[i(v,S(f,{variant:"tonal",color:e.article.is_private?"red":"green"}),{default:t(()=>[i(u,{onClick:r.viewArticle},{default:t(()=>[n(d(e.article.is_private?"mdi-eye-off":"mdi-eye"),1)]),_:1},8,["onClick"])]),_:2},1040,["color"])]),_:1},8,["text"])]),_:1})]),_:1},8,["class"])])])],8,O)}const U=j(g,[["render",G]]);export{U as A};
