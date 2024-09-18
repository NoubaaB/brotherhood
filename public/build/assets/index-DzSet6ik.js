import{D as B}from"./DatePicker-CtQGnBnF.js";import{_ as F,u as C,r as a,o as i,c as u,w as t,a as e,b as c,t as f,d as $,e as Y,f as k,F as w,g as S,h as z}from"./app-BlVN85T5.js";import{B as U}from"./Bill-BXxgFB42.js";const P={computed:{dashboard:function(){return C()},option:function(){var s,p,v,b,g,o,d,_,n,r;return{chart:{type:"bar",height:350,stacked:!0,toolbar:{show:!0},zoom:{enabled:!0}},responsive:[{breakpoint:480,options:{legend:{position:"bottom",offsetX:-10,offsetY:0}}}],plotOptions:{bar:{horizontal:!1,borderRadiusApplication:"end",borderRadiusWhenStacked:"last",dataLabels:{total:{enabled:!0,style:{fontSize:"13px",fontWeight:600}}}}},xaxis:{show:!0,type:"datetime",categories:this.dashboard.dates_format},legend:{position:"right",offsetY:40},fill:{opacity:1},annotations:{yaxis:[{y:(p=(s=this.dashboard)==null?void 0:s.capital)==null?void 0:p.amount,borderColor:"#FF0000",label:{borderColor:"#FF0000",style:{color:"#fff",background:"#FF0000"},text:`Capital : ${(b=(v=this.dashboard)==null?void 0:v.capital)==null?void 0:b.amount} DH`}}],xaxis:[{x:(o=(g=this.dashboard)==null?void 0:g.capital)==null?void 0:o.date_start,x2:(_=(d=this.dashboard)==null?void 0:d.capital)==null?void 0:_.date_end,borderColor:"#FF0000",fillColor:"#FF0000",opacity:.1,label:{borderColor:"#FF0000",style:{fontSize:"10px",color:"#fff",background:"#FF0000"},orientation:"horizontal",text:`Capital : ${(r=(n=this.dashboard)==null?void 0:n.capital)==null?void 0:r.amount} DH`}}]}}},series:function(){return[{name:"Total Spent (MAD)",data:this.dashboard.amount_you_spent},{name:"Amount You Spent In Private",data:this.dashboard.amounts_private}]}}};function T(s,p,v,b,g,o){const d=a("v-img"),_=a("v-avatar"),n=a("v-icon"),r=a("v-chip"),l=a("v-col"),m=a("v-row"),x=a("v-card-item"),y=a("apexchart"),D=a("v-card-text"),A=a("v-card");return i(),u(l,{cols:"12",sm:"6"},{default:t(()=>[e(A,{class:"mx-auto",title:"Your Daily Charges",subtitle:"Your privates and Publics Daily Charge"},{prepend:t(()=>[e(_,{rounded:"0"},{default:t(()=>[e(d,{alt:"charges-timeline",src:"/storage/charge_yourself.gif"})]),_:1})]),append:t(()=>[]),default:t(()=>[e(x,{class:"px-5 text-center"},{default:t(()=>[e(m,null,{default:t(()=>[e(l,null,{default:t(()=>[e(r,{color:"blue",variant:"tonal"},{default:t(()=>[e(n,{class:"mr-2"},{default:t(()=>[c(" mdi-cash-fast ")]),_:1}),c(" "+f(s.formatFloatNumber(o.dashboard.total_amount_you_spent))+" MAD ",1)]),_:1})]),_:1}),e(l,null,{default:t(()=>[e(r,{color:"green",variant:"tonal"},{default:t(()=>[e(n,{class:"mr-2"},{default:t(()=>[c(" mdi-cash-fast ")]),_:1}),c(" "+f(s.formatFloatNumber(o.dashboard.total_amount_private))+" MAD ",1)]),_:1})]),_:1})]),_:1}),e(m,null,{default:t(()=>[e(l,null,{default:t(()=>[e(r,{color:"indigo",variant:"tonal"},{default:t(()=>[e(n,{class:"mr-2"},{default:t(()=>[c(" mdi-cash-fast ")]),_:1}),c(" "+f(s.formatFloatNumber(o.dashboard.total_all))+" MAD ",1)]),_:1})]),_:1})]),_:1})]),_:1}),e(D,{class:"pa-0"},{default:t(()=>[e(y,{options:o.option,series:o.series},null,8,["options","series"])]),_:1})]),_:1})]),_:1})}const L=F(P,[["render",T]]),H={computed:{dashboard:function(){return C()},user:function(){return $()},option:function(){return{chart:{type:"bar",height:350,stacked:!0,toolbar:{show:!0},zoom:{enabled:!0}},responsive:[{breakpoint:480,options:{legend:{position:"bottom",offsetX:-10,offsetY:0}}}],plotOptions:{bar:{horizontal:!1,borderRadiusApplication:"end",borderRadiusWhenStacked:"last",dataLabels:{total:{enabled:!0,style:{fontSize:"13px",fontWeight:600}}}}},xaxis:{show:!0,type:"datetime",categories:this.dashboard.dates_format},legend:{position:"right",offsetY:40},fill:{opacity:1}}},series:function(){let s=[];return this.user.users.forEach(p=>{s.push({name:`${p.name} Share`,data:this.dashboard.get_amounts(p.id)})}),s}}};function O(s,p,v,b,g,o){const d=a("v-img"),_=a("v-avatar"),n=a("v-icon"),r=a("v-chip"),l=a("v-col"),m=a("v-row"),x=a("v-card-item"),y=a("apexchart"),D=a("v-card-text"),A=a("v-card");return i(),u(l,{cols:"12",sm:"6"},{default:t(()=>[e(A,{class:"mx-auto",title:"Community Charges",subtitle:"Total Charge That Community Spent Daily"},{prepend:t(()=>[e(_,{rounded:"0"},{default:t(()=>[e(d,{alt:"charges-timeline",src:"/storage/charge_brotherhood.gif"})]),_:1})]),append:t(()=>[]),default:t(()=>[e(x,{class:"px-5 text-center"},{default:t(()=>[e(m,null,{default:t(()=>[e(l,null,{default:t(()=>[e(r,{color:"blue",variant:"tonal"},{default:t(()=>[e(n,{class:"mr-2"},{default:t(()=>[c(" mdi-cash-refund ")]),_:1}),c(" "+f(s.formatFloatNumber(o.dashboard.total_none_private))+" MAD ",1)]),_:1})]),_:1}),e(l,null,{default:t(()=>[e(r,{color:"indigo-lighten-2",variant:"tonal"},{default:t(()=>[e(n,{class:"mr-2"},{default:t(()=>[c(" mdi-cash-sync ")]),_:1}),c(" "+f(s.formatFloatNumber(o.dashboard.total_brotherhood))+" MAD ",1)]),_:1})]),_:1}),e(l,null,{default:t(()=>[e(r,{color:"purple-lighten-1",variant:"tonal"},{default:t(()=>[e(n,{class:"mr-2"},{default:t(()=>[c(" mdi-cash-multiple ")]),_:1}),c(" "+f(s.formatFloatNumber(o.dashboard.total_global))+" MAD ",1)]),_:1})]),_:1})]),_:1})]),_:1}),e(D,{class:"pa-0"},{default:t(()=>[e(y,{options:o.option,series:o.series},null,8,["options","series"])]),_:1})]),_:1})]),_:1})}const R=F(H,[["render",O]]),W={computed:{dashboard:function(){return C()},option:function(){return{chart:{type:"bar",height:350,toolbar:{show:!0},zoom:{enabled:!0}},responsive:[{breakpoint:480,options:{legend:{position:"bottom",offsetX:-10,offsetY:0}}}],xaxis:{show:!0,type:"datetime",categories:this.dashboard.dates_format},legend:{position:"right",offsetY:40},fill:{opacity:1}}},series:function(){return[{name:"Amount Bills",data:this.dashboard.amount_bills},{name:"Amount Articles",data:this.dashboard.amount_articles}]}}};function G(s,p,v,b,g,o){const d=a("v-img"),_=a("v-avatar"),n=a("v-icon"),r=a("v-chip"),l=a("v-col"),m=a("v-row"),x=a("v-card-item"),y=a("apexchart"),D=a("v-card-text"),A=a("v-card");return i(),u(l,{cols:"12",sm:"6"},{default:t(()=>[e(A,{class:"mx-auto",title:"Compare Bills & Articles",subtitle:"Killing Bills"},{prepend:t(()=>[e(_,{rounded:"0"},{default:t(()=>[e(d,{alt:"bills-articles",src:"/storage/invoice.gif"})]),_:1})]),append:t(()=>[]),default:t(()=>[e(x,{class:"px-5 text-center"},{default:t(()=>[e(m,null,{default:t(()=>[e(l,null,{default:t(()=>[e(r,{color:"blue",variant:"tonal"},{default:t(()=>[e(n,{class:"mr-2"},{default:t(()=>[c(" mdi-cash-fast ")]),_:1}),c(" "+f(s.formatFloatNumber(o.dashboard.total_bills))+" MAD ",1)]),_:1})]),_:1}),e(l,null,{default:t(()=>[e(r,{color:"green",variant:"tonal"},{default:t(()=>[e(n,{class:"mr-2"},{default:t(()=>[c(" mdi-cash-refund ")]),_:1}),c(" "+f(s.formatFloatNumber(o.dashboard.total_articles))+" MAD ",1)]),_:1})]),_:1}),e(l,null,{default:t(()=>[e(r,{color:o.dashboard.total_compare>=0?"red-lighten-1":"cyan-lighten-2",variant:"tonal"},{default:t(()=>[o.dashboard.total_compare<=0?(i(),u(n,{key:0,class:"mr-2"},{default:t(()=>[c(" mdi-gauge-empty ")]),_:1})):(i(),u(n,{key:1,class:"mr-2"},{default:t(()=>[c(" mdi-gauge ")]),_:1})),c(" "+f(s.formatFloatNumber(o.dashboard.total_compare))+" MAD ",1)]),_:1},8,["color"])]),_:1})]),_:1})]),_:1}),e(D,{class:"pa-0"},{default:t(()=>[e(y,{options:o.option,series:o.series},null,8,["options","series"])]),_:1})]),_:1})]),_:1})}const V=F(W,[["render",G]]),X={computed:{dashboard:function(){return C()},chartOptions:function(){return{chart:{type:"donut",width:"350"},responsive:[{breakpoint:480,options:{legend:{position:"bottom"}}}],labels:this.dashboard.get_grouping_labels.map(s=>s.name)}},series:function(){return this.dashboard.get_grouping_series}}};function E(s,p,v,b,g,o){const d=a("v-img"),_=a("v-avatar"),n=a("apexchart"),r=a("v-card-text"),l=a("v-card"),m=a("v-col");return i(),u(m,{cols:"12",sm:"6"},{default:t(()=>[e(l,{class:"mx-auto",title:"Your Most Used Product",subtitle:"Total Product You used during This Period"},{prepend:t(()=>[e(_,{rounded:"0"},{default:t(()=>[e(d,{alt:"charges-timeline",src:"/storage/pie-chart.gif"})]),_:1})]),default:t(()=>[e(r,{class:"pa-0"},{default:t(()=>[e(n,{options:o.chartOptions,series:o.series},null,8,["options","series"])]),_:1})]),_:1})]),_:1})}const I=F(X,[["render",E]]),K={components:{Bill:U},props:{user_id:Number},data:function(){return{bills:[]}},computed:{dashbaord:function(){return C()}},mounted:function(){Y.get("/api/bills",{params:{user_id:this.user_id}}).then(s=>{this.dashbaord.score_bills=s.data.bills})},methods:{}};function j(s,p,v,b,g,o){const d=a("Bill"),_=a("v-col"),n=a("v-row"),r=a("v-expansion-panel-text");return i(),u(r,{class:"pa-0"},{default:t(()=>[(i(!0),k(w,null,S(o.dashbaord.score_bills,l=>(i(),u(n,{key:l.id},{default:t(()=>[e(_,{cols:"12"},{default:t(()=>[e(d,{bill:l},null,8,["bill"])]),_:2},1024)]),_:2},1024))),128))]),_:1})}const q=F(K,[["render",j]]),J={computed:{dashboard:function(){return C()},user:function(){return $()}},components:{UserScoreDetail:q}},Q=["innerHTML"];function Z(s,p,v,b,g,o){const d=a("v-img"),_=a("v-avatar"),n=a("v-col"),r=a("v-chip"),l=a("v-row"),m=a("v-expansion-panel-title"),x=a("UserScoreDetail"),y=a("v-expansion-panel-text"),D=a("v-expansion-panel"),A=a("v-expansion-panels"),M=a("v-card-text"),N=a("v-card");return i(),u(n,{cols:"12",sm:"6"},{default:t(()=>[e(N,{class:"mx-auto",title:"Users Score",subtitle:"All user Scores"},{prepend:t(()=>[e(_,{rounded:"0"},{default:t(()=>[e(d,{alt:"charges-timeline",src:"/storage/charge_yourself.gif"})]),_:1})]),append:t(()=>[]),default:t(()=>[e(M,{class:"px-0"},{default:t(()=>[e(A,{class:"pa",variant:"popout"},{default:t(()=>[(i(!0),k(w,null,S(o.user.users,h=>(i(),u(D,{key:h.id,"hide-actions":""},{default:t(()=>[e(m,null,{default:t(()=>[e(l,{align:"center",class:"spacer","no-gutters":""},{default:t(()=>[e(n,{cols:"2"},{default:t(()=>[e(_,{size:"36px"},{default:t(()=>[e(d,{alt:`user_${h.id}`,src:h.image},null,8,["alt","src"])]),_:2},1024)]),_:2},1024),e(n,{class:"hidden-xs-only text-left"},{default:t(()=>[z("strong",{innerHTML:h.name},null,8,Q)]),_:2},1024),e(n,{class:"text-no-wrap text-right",cols:"4"},{default:t(()=>[h.score>0?(i(),u(r,{key:0,color:"green-lighten-1",class:"ms-0 me-2",label:"",small:""},{default:t(()=>[c(f(s.formatFloatNumber(h.score))+" MAD ",1)]),_:2},1024)):h.score<0?(i(),u(r,{key:1,color:"red-lighten-1",class:"ms-0 me-2",label:"",small:""},{default:t(()=>[c(f(s.formatFloatNumber(h.score))+" MAD ",1)]),_:2},1024)):(i(),u(r,{key:2,color:"grey-lighten-1",class:"ms-0 me-2",label:"",small:""},{default:t(()=>[c(f(h.score)+" MAD ",1)]),_:2},1024))]),_:2},1024)]),_:2},1024)]),_:2},1024),e(y,{class:"px-0"},{default:t(()=>[e(x,{user_id:h.id},null,8,["user_id"])]),_:2},1024)]),_:2},1024))),128))]),_:1})]),_:1})]),_:1})]),_:1})}const tt=F(J,[["render",Z]]),et={components:{DatePicker:B,YourCharges:L,AllCharges:R,BillsArticlesCharges:V,Grouping:I,UserScore:tt},computed:{dashboard:function(){return C()}},mounted:function(){this.dashboard.getData()},watch:{"dashboard.date_start":function(){this.dashboard.getData()},"dashboard.date_end":function(){this.dashboard.getData()}}};function at(s,p,v,b,g,o){const d=a("v-img"),_=a("v-avatar"),n=a("v-row"),r=a("DatePicker"),l=a("v-col"),m=a("YourCharges"),x=a("AllCharges"),y=a("BillsArticlesCharges"),D=a("Grouping"),A=a("UserScore");return i(),k(w,null,[e(n,null,{default:t(()=>[e(_,{size:"150",class:"mx-auto",rounded:"0"},{default:t(()=>[e(d,{alt:"dashboard",src:"/storage/dashboard.gif"})]),_:1})]),_:1}),e(n,null,{default:t(()=>[e(l,null,{default:t(()=>[e(r,{StateModel:o.dashboard},null,8,["StateModel"])]),_:1})]),_:1}),e(n,null,{default:t(()=>[e(m),e(x),e(y),e(D),e(A)]),_:1})],64)}const rt=F(et,[["render",at]]);export{rt as default};