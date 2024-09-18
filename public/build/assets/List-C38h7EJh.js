import{D as I}from"./DatePicker-0vwDCgZa.js";import{B as V,u as B}from"./Bill-BJySh_kK.js";import{S as L,N as F}from"./Skeleton-Cfi--aRH.js";import{_ as D,u as M,r as l,o as c,c as v,w as e,a as t,f,F as k,g as P,b as o,t as h,h as $}from"./app-CgKV6O7-.js";const A={components:{Bill:V,Skeleton:L,NoItemInList:F},mounted:async function(){await this.bill.getData()},computed:{bill:function(){return B()},dashboard:function(){return M()}}},Q={key:1};function j(a,r,w,x,y,n){const b=l("Bill"),_=l("v-col"),s=l("NoItemInList"),p=l("Skeleton"),i=l("v-row"),d=l("v-card-text"),m=l("v-card");return c(),v(m,{class:"mx-auto",style:{width:"100% !important"}},{default:e(()=>[t(d,null,{default:e(()=>[t(i,{align:"center",justify:"center",dense:""},{default:e(()=>[n.bill.is_fetch?(c(),f("div",Q,[t(_,{cols:"12",md:"6"},{default:e(()=>[t(p,{n:3,type:"list-item-avatar-two-line , table-tfoot"})]),_:1})])):(c(),f(k,{key:0},[n.bill.bills.length>0?(c(!0),f(k,{key:0},P(n.bill.bills,u=>(c(),v(_,{cols:"12",md:"6",key:u.id},{default:e(()=>[t(b,{bill:u},null,8,["bill"])]),_:2},1024))),128)):(c(),v(_,{key:1,cols:"12",md:"6",class:"text-center"},{default:e(()=>[t(s)]),_:1}))],64))]),_:1})]),_:1})]),_:1})}const z=D(A,[["render",j]]),E={components:{DatePicker:I,Bills:z},data:function(){return{loading:!1,snackbar_bill:!1}},computed:{bill:function(){return B()}},methods:{deleteBills:async function(){this.loading=!0,await this.bill.deleteBills().then(a=>{this.loading=!1,this.snackbar_bill=!0})}},mounted:function(){this.bill.getData()},watch:{"bill.date_start":function(){this.bill.getData()},"bill.date_end":function(){this.bill.getData()}}},H=$("strong",{class:"text-red"}," Has Been Deleted ",-1);function T(a,r,w,x,y,n){const b=l("v-img"),_=l("v-avatar"),s=l("v-row"),p=l("DatePicker"),i=l("v-col"),d=l("v-icon"),m=l("v-btn"),u=l("v-chip"),N=l("Bills"),S=l("v-divider"),C=l("v-snackbar");return c(),f(k,null,[t(s,null,{default:e(()=>[t(_,{size:"150",class:"mx-auto",rounded:"0"},{default:e(()=>[t(b,{alt:"bills",src:"/storage/bill.gif"})]),_:1})]),_:1}),t(s,null,{default:e(()=>[t(i,null,{default:e(()=>[t(p,{StateModel:n.bill},null,8,["StateModel"])]),_:1})]),_:1}),t(s,null,{default:e(()=>[t(i,{class:"text-center"},{default:e(()=>[t(m,{loading:a.loading,disabled:n.bill.getBillQueue.length==0,rounded:"",onClick:n.deleteBills,color:"blue"},{default:e(()=>[t(d,null,{default:e(()=>[o("mdi-text-box-plus")]),_:1}),o(" "+h(n.bill.getBillQueue.length)+" Delete Bills ",1)]),_:1},8,["loading","disabled","onClick"])]),_:1}),t(i,{class:"text-center"},{default:e(()=>[t(u,{color:"blue",variant:"tonal"},{default:e(()=>[t(d,{class:"mr-2"},{default:e(()=>[o(" mdi-cash-refund ")]),_:1}),o(" "+h(a.formatFloatNumber(n.bill.total_bills))+" MAD ",1)]),_:1})]),_:1})]),_:1}),t(s,null,{default:e(()=>[t(i,{class:"text-center"},{default:e(()=>[t(u,{class:"mt-3",color:"blue",variant:"tonal"},{default:e(()=>[t(d,{class:"mr-2"},{default:e(()=>[o(" mdi-cash-refund ")]),_:1}),o(" "+h(a.formatFloatNumber(n.bill.total_bills_filtred))+" MAD ",1)]),_:1})]),_:1})]),_:1}),t(s,{class:"center_empty"},{default:e(()=>[t(N)]),_:1}),t(C,{modelValue:a.snackbar_bill,"onUpdate:modelValue":r[1]||(r[1]=g=>a.snackbar_bill=g),color:"white"},{actions:e(()=>[t(S,{vertical:""}),t(m,{color:"pink",variant:"text",onClick:r[0]||(r[0]=g=>a.snackbar_bill=!1)},{default:e(()=>[o(" Close ")]),_:1})]),default:e(()=>[o(" Bill "),H]),_:1},8,["modelValue"])],64)}const K=D(E,[["render",T]]);export{K as default};