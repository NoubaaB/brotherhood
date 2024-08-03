import{u as R,r as i,n as g}from"./index-CgNvZbD5.js";import{u as y}from"./Article-DG9uuNlU.js";import{_ as k,j as D,r,o as h,c as M,w as d,a as l,k as U,l as f,b as q}from"./app-CfkVGWP0.js";const C={props:{model:Object},data(){return{v$:R(),loading_product:!1,search:"e"}},computed:{maxDate:function(){return moment().format("YYYY-MM-DD")},article:function(){return y()},product:function(){return D()},dateRules(){return[o=>!!o||"Date is Required"]},descriptionRules(){return[o=>!!o||"Description is Required"]},productIdRules(){return[o=>!!o||"Product is Required"]},priceRules(){return[o=>(!!o||"Price is Required")&&!isNaN(o)]}},methods:{calendarFn:function(o){return o.filter(e=>e.days.some(t=>t.text===15)).map(e=>({...e,days:e.days.map(t=>(t.classData["custom-class"]=!0,t))}))},deleteModel:function(o){this.article.deleteModel(o)},addProduct:async function(){let o=document.getElementById("_product").value;if(o==""||this.product.collect.find(e=>e.name==o))return 0;this.loading_product=!0,await this.product.postProduct(o).then(e=>{this.loading_product=!1})}},validations:{model:{date:{required:i},description:{required:i},product_id:{required:i},price:{required:i,numeric:g}}}};function N(o,e,t,Y,c,n){const p=r("VueDatePicker"),u=r("v-col"),s=r("v-text-field"),v=r("v-icon"),m=r("v-btn"),V=r("v-autocomplete"),x=r("v-switch"),b=r("v-checkbox"),_=r("v-row"),w=r("v-card-item"),P=r("v-card");return h(),M(P,{rounded:"lg",variant:"tonal",class:"my-2",color:"blue"},{default:d(()=>[l(w,null,{default:d(()=>[l(_,{"no-gutters":""},{default:d(()=>[l(u,{cols:"12",sm:"6",class:"mb-4"},{default:d(()=>[l(p,{modelValue:t.model.date,"onUpdate:modelValue":e[0]||(e[0]=a=>t.model.date=a),"enable-time-picker":!1,clearable:!1,rules:n.dateRules,vertical:"",calendar:n.calendarFn,"max-date":n.maxDate},null,8,["modelValue","rules","calendar","max-date"])]),_:1}),l(u,{cols:"12",sm:"6"},{default:d(()=>[l(s,{modelValue:t.model.description,"onUpdate:modelValue":e[1]||(e[1]=a=>t.model.description=a),variant:"solo-filled","prepend-inner-icon":"mdi-script-text",rounded:"",flat:"",label:"description",rules:n.descriptionRules},null,8,["modelValue","rules"])]),_:1}),l(u,{cols:"12",sm:"6"},{default:d(()=>[l(s,{modelValue:t.model.price,"onUpdate:modelValue":e[2]||(e[2]=a=>t.model.price=a),variant:"solo-filled","prepend-inner-icon":"mdi-cash",rounded:"",flat:"",label:"Price",rules:n.priceRules,type:"number"},null,8,["modelValue","rules"])]),_:1}),l(u,{cols:"12",sm:"6"},{default:d(()=>[l(V,{modelValue:t.model.product_id,"onUpdate:modelValue":e[3]||(e[3]=a=>t.model.product_id=a),id:"_product",items:n.product.collect,"auto-select-first":"",chips:"",onKeydown:U(f(n.addProduct,["prevent"]),["enter"]),"item-title":"name","item-value":"id","open-text":c.search,variant:"solo-filled",rounded:"",flat:"",label:"Products List",rules:n.productIdRules},{"prepend-inner":d(()=>[l(m,{color:"green",loading:c.loading_product,onClick:f(n.addProduct,["prevent"]),size:"x-small",icon:"",variant:"tonal"},{default:d(()=>[l(v,null,{default:d(()=>[q("mdi-cart-arrow-down")]),_:1})]),_:1},8,["loading","onClick"])]),_:1},8,["modelValue","items","onKeydown","open-text","rules"])]),_:1}),l(u,{cols:"12",sm:"6"},{default:d(()=>[l(_,null,{default:d(()=>[l(u,{cols:"8"},{default:d(()=>[l(x,{"hide-details":"",modelValue:t.model.is_private,"onUpdate:modelValue":e[4]||(e[4]=a=>t.model.is_private=a),inset:"",color:"blue",variant:"solo-filled","true-icon":"mdi-eye-plus",rounded:"",flat:"",label:"Private"},null,8,["modelValue"])]),_:1}),l(u,null,{default:d(()=>[l(b,{"hide-details":"",modelValue:t.model.star,"onUpdate:modelValue":e[5]||(e[5]=a=>t.model.star=a),inset:"",color:"yellow",variant:"solo-filled","true-icon":"mdi-star",flat:""},null,8,["modelValue"])]),_:1}),l(u,{cols:"2"},{default:d(()=>[l(m,{disabled:n.article.models.length<=1,class:"mt-3",size:"x-small",color:"red",variant:"tonal",icon:"mdi-close",onClick:e[6]||(e[6]=a=>n.deleteModel(t.model.id))},null,8,["disabled"])]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})}const j=k(C,[["render",N]]);export{j as M};
