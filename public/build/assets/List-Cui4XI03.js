import{s as z,u as U,e as w,v as D,_ as Y,r as i,o as c,f as b,h as f,a as e,w as n,b as p,t as $,c as V,j as A,p as F,q as L,i as O,F as I,g as P}from"./app-CgKV6O7-.js";import{u as x,r as T}from"./index-Ce0plcII.js";const y=z("Capital",{state:()=>({capitals:[],dashboard:U(),is_fetch:!1}),actions:{getData:async function(){this.dashboard.fetching=!0,await w.get("/api/capitals").then(t=>{this.dashboard.fetching=!1,this.capitals=t.data.capitals})},updateCapital:async function(t,a){return this.is_fetch=!0,a.date_start&&(a.date_start=D(a.date_start).format("YYYY-MM-DD")),a.date_end&&(a.date_end=D(a.date_end).format("YYYY-MM-DD")),await w.patch(`/api/capitals/${t}`,{...a}).then(l=>{let r=this.capitals.find(k=>k.id==t);return r&&(r.amount=l.data.capital.amount,r.date_start=l.data.capital.date_start,r.date_end=l.data.capital.date_end),this.is_fetch=!1,l.data.capital})},postCapital:async function(t){this.is_fetch=!0,t.date_start&&(t.date_start=D(t.date_start).format("YYYY-MM-DD")),t.date_end&&(t.date_end=D(t.date_end).format("YYYY-MM-DD")),await w.post("/api/capitals",{...t}).then(a=>(this.capitals.push(a.data.capital),this.is_fetch=!1,a.data.capital))},deleteCapital:async function(t){await w.delete(`/api/capitals/${t}`).then(a=>(this.capitals=this.capitals.filter(l=>t!=l.id),a))}},getters:{}}),M={props:{capital:Object},data:function(){return{loading:!1,on_delete:!1,pause:!1,setTimeout:null,setInterval:null,counter:1,color:"white"}},mounted:function(){this.$nextTick(()=>{const t="#"+this.capital.id,a=new Swiper(t,{resistanceRatio:.85,initialSlide:0,resistance:!0,allowSlideNext:!1,momentumBounce:!0,speed:150});a.on("transitionStart",()=>{this.on_delete=!0,this.loading=!0,this.setTimeout=setTimeout(()=>{this.deleteCapital().then(l=>{a.destroy()})},3e3),this.setInterval=setInterval(()=>{++this.counter},1e3)})})},computed:{_capital:function(){return y()},get_date:function(){return moment(this.capital.created_at).format("YYYY/MM/DD")}},methods:{editCapital:function(){this.$emit("editCapital",!0,this.capital.id)},deleteCapital:async function(){await this._capital.deleteCapital(this.capital.id)},rollback:function(){this.pause=!0,clearTimeout(this.setTimeout),clearInterval(this.setInterval),this.on_delete=!1,this.counter=1,setTimeout(()=>{this.loading=!1,this.pause=!1},1e3)}}},B=()=>{L(t=>({"2d1b2bf4":t.color}))},N=M.setup;M.setup=N?(t,a)=>(B(),N(t,a)):B;const R=["id"],G={class:"swiper-wrapper"},H={class:"swiper-slide"},J={key:1};function K(t,a,l,r,k,o){const h=i("v-progress-linear"),_=i("v-icon"),d=i("v-btn"),m=i("v-progress-circular"),v=i("v-img"),g=i("v-avatar"),C=i("v-card");return c(),b("div",{id:l.capital.id,class:"swiper-container"},[f("div",G,[f("div",H,[e(C,{class:F(["mx-auto",{on_delete:t.on_delete}])},{loader:n(()=>[e(h,{active:t.loading,indeterminate:"",height:"3",color:"red"},null,8,["active"])]),subtitle:n(()=>[p($(l.capital.date_start)+" ",1),e(_,null,{default:n(()=>[p("mdi-arrow-right")]),_:1}),p(" "+$(l.capital.date_end??"Now"),1)]),title:n(()=>[p($(l.capital.amount)+" MAD ",1)]),append:n(()=>[e(d,{size:"x-small",color:"orange",icon:"mdi-pencil",variant:"tonal",onClick:o.editCapital,class:"mr-2"},null,8,["onClick"]),t.loading?(c(),b("div",{key:0,class:"cursor-pointer",onClick:a[0]||(a[0]=(...s)=>o.rollback&&o.rollback(...s))},[e(m,{size:30,width:1,color:"primary",indeterminate:""},{default:n(()=>[t.pause?(c(),V(_,{key:0},{default:n(()=>[p(" mdi-pause ")]),_:1})):(c(),b("span",J,$(t.counter),1))]),_:1})])):A("",!0)]),prepend:n(()=>[e(g,{size:"50"},{default:n(()=>[e(v,{src:"/storage/line-chart.gif"})]),_:1})]),_:1},8,["class"])])])],8,R)}const Q=Y(M,[["render",K]]),W={props:{capital_id:Number},data:function(){return{visible:!1,form:{amount:null,date_start:new Date().toISOString().substr(0,10),date_end:null},v$:x()}},computed:{capital:function(){return y()},auth:function(){return O()}},mounted:function(){this.capital_id&&(this.form=this.capital.capitals.find(t=>t.id==this.capital_id))},methods:{cancelDialog:function(){this.$emit("cancelDialog")},submitCapital:async function(){let t=null;this.capital_id?t=await this.capital.updateCapital(this.capital_id,this.form):t=await this.capital.postCapital(this.form),this.$route.params.id==this.auth.getAuth.id&&(this.auth.capital.name=t.name,this.auth.capital.email=t.email,this.auth.capital.image=t.image),this.$emit("cancelDialog")}},validations:function(){return{form:{amount:{required:T},date_start:{required:T},date_end:{}}}}},X=f("span",null,"Date to starsst",-1),Z=f("span",null,"Date to End",-1),tt=f("small",{class:"text-caption text-medium-emphasis"},"*indicates required field",-1);function at(t,a,l,r,k,o){const h=i("v-progress-linear"),_=i("v-text-field"),d=i("v-col"),m=i("VueDatePicker"),v=i("v-row"),g=i("v-form"),C=i("v-card-text"),s=i("v-divider"),q=i("v-spacer"),S=i("v-btn"),E=i("v-card-actions"),j=i("v-card");return c(),V(j,{"prepend-icon":"mdi-cash-marker",title:"Capital"},{loader:n(()=>[e(h,{active:o.capital.is_fetch,indeterminate:"",height:"3",color:"blue"},null,8,["active"])]),default:n(()=>[e(C,null,{default:n(()=>[e(g,{autocomplete:"off"},{default:n(()=>[e(v,{dense:""},{default:n(()=>[e(d,{cols:"12",md:"4",sm:"6"},{default:n(()=>[e(_,{hint:"Ente Amount",label:"Amount",required:"",variant:"solo-filled","prepend-inner-icon":"mdi-cash-marker",rounded:"",type:"number",flat:"",onInput:t.v$.form.amount.$touch,onBlur:t.v$.form.amount.$touch,modelValue:t.form.amount,"onUpdate:modelValue":a[0]||(a[0]=u=>t.form.amount=u),"error-messages":t.v$.form.amount.$errors.map(u=>u.$message)},null,8,["onInput","onBlur","modelValue","error-messages"])]),_:1}),e(d,{cols:"12",md:"4",sm:"6"},{default:n(()=>[X,e(m,{modelValue:t.form.date_start,"onUpdate:modelValue":a[1]||(a[1]=u=>t.form.date_start=u),"enable-time-picker":!1,clearable:!1,vertical:""},null,8,["modelValue"])]),_:1}),e(d,{cols:"12",md:"4",sm:"6"},{default:n(()=>[Z,e(m,{modelValue:t.form.date_end,"onUpdate:modelValue":a[2]||(a[2]=u=>t.form.date_end=u),"enable-time-picker":!1,clearable:!1,vertical:""},null,8,["modelValue"])]),_:1})]),_:1}),tt]),_:1})]),_:1}),e(s),e(E,null,{default:n(()=>[e(q),t.$route.params.id?A("",!0):(c(),V(S,{key:0,text:"Close",variant:"plain",onClick:o.cancelDialog},null,8,["onClick"])),e(S,{color:"blue",text:"Save",onClick:o.submitCapital,variant:t.v$.$invalid?"tonal":"flat",disabled:t.v$.$invalid,loading:o.capital.is_fetch},null,8,["onClick","variant","disabled","loading"])]),_:1})]),_:1})}const et=Y(W,[["render",at]]),it={components:{Capital:Q,Model:et},mounted:async function(){await this.capital.getData()},data:function(){return{dialog:!1,capital_id:null}},computed:{capital:function(){return y()}},methods:{editCapital:function(t,a){this.capital_id=a,this.dialog=t},cancelDialog:function(){this.dialog=!this.dialog}}},nt={class:"mt-5"};function lt(t,a,l,r,k,o){const h=i("v-icon"),_=i("v-btn"),d=i("v-row"),m=i("Capital"),v=i("v-col"),g=i("Model"),C=i("v-dialog");return c(),b(I,null,[f("div",nt,[e(d,null,{default:n(()=>[e(_,{block:"",rounded:"",onClick:a[0]||(a[0]=s=>o.editCapital(!0,null)),color:"blue"},{default:n(()=>[e(h,{class:"md-2"},{default:n(()=>[p("mdi-plus")]),_:1}),p("Add Capital")]),_:1})]),_:1}),e(d,{align:"center",justify:"center"},{default:n(()=>[(c(!0),b(I,null,P(o.capital.capitals,s=>(c(),V(v,{cols:"12",md:"6",key:s.id},{default:n(()=>[e(m,{capital:s,onEditCapital:o.editCapital},null,8,["capital","onEditCapital"])]),_:2},1024))),128))]),_:1})]),e(C,{modelValue:t.dialog,"onUpdate:modelValue":a[1]||(a[1]=s=>t.dialog=s),"max-width":"600"},{default:n(()=>[e(g,{capital_id:t.capital_id,onCancelDialog:o.cancelDialog},null,8,["capital_id","onCancelDialog"])]),_:1},8,["modelValue"])],64)}const ct=Y(it,[["render",lt]]);export{ct as default};
