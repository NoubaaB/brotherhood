import{_ as S,d as q,r,o as u,f as $,h as b,a as s,w as n,b as y,t as C,c as V,j as D,p as O,q as R,i as F,m as I}from"./app-DoqKbSja.js";import{u as G,r as B,m as c,a as p,e as H,s as J}from"./index-BHQGTyf2.js";const k={props:{user:Object},data:function(){return{loading:!1,on_delete:!1,pause:!1,setTimeout:null,setInterval:null,counter:1,color:"white"}},mounted:function(){this.$nextTick(()=>{const e="#"+this.user.id,t=new Swiper(e,{resistanceRatio:.85,initialSlide:0,resistance:!0,allowSlideNext:!1,momentumBounce:!0,speed:150});t.on("transitionStart",()=>{this.on_delete=!0,this.loading=!0,this.setTimeout=setTimeout(()=>{this.deleteUser().then(d=>{t.destroy()})},3e3),this.setInterval=setInterval(()=>{++this.counter},1e3)})})},computed:{_user:function(){return q()},get_date:function(){return moment(this.user.created_at).format("YYYY/MM/DD")}},methods:{editUser:function(){this.$emit("editUser",!0,this.user.id)},deleteUser:async function(){await this._user.deleteUser(this.user.id)},rollback:function(){this.pause=!0,clearTimeout(this.setTimeout),clearInterval(this.setInterval),this.on_delete=!1,this.counter=1,setTimeout(()=>{this.loading=!1,this.pause=!1},1e3)}}},L=()=>{R(e=>({"60bfdeec":e.color}))},Y=k.setup;k.setup=Y?(e,t)=>(L(),Y(e,t)):L;const K=["id"],Q={class:"swiper-wrapper"},W={class:"swiper-slide"},X={key:1};function Z(e,t,d,N,T,a){const f=r("v-progress-linear"),l=r("v-btn"),i=r("v-icon"),v=r("v-progress-circular"),_=r("v-img"),h=r("v-avatar"),g=r("v-card");return u(),$("div",{id:d.user.id,class:"swiper-container"},[b("div",Q,[b("div",W,[s(g,{class:O(["mx-auto",{on_delete:e.on_delete}]),title:d.user.name},{loader:n(()=>[s(f,{active:e.loading,indeterminate:"",height:"3",color:"red"},null,8,["active"])]),subtitle:n(()=>[y(C(a.get_date),1)]),append:n(()=>[s(l,{size:"x-small",color:"orange",icon:"mdi-pencil",variant:"tonal",onClick:a.editUser,class:"mr-2"},null,8,["onClick"]),e.loading?(u(),$("div",{key:0,class:"cursor-pointer",onClick:t[0]||(t[0]=(...w)=>a.rollback&&a.rollback(...w))},[s(v,{size:30,width:1,color:"primary",indeterminate:""},{default:n(()=>[e.pause?(u(),V(i,{key:0},{default:n(()=>[y(" mdi-pause ")]),_:1})):(u(),$("span",X,C(e.counter),1))]),_:1})])):D("",!0)]),prepend:n(()=>[s(h,{size:"50"},{default:n(()=>[s(_,{src:d.user.image},null,8,["src"])]),_:1})]),_:1},8,["class","title"])])])],8,K)}const re=S(k,[["render",Z]]),x={props:{user_id:Number},data:function(){return{visible:!1,form:{name:"",email:"",activate:!0,image:"/storage/users/alien_2.gif",password:"",confirm_password:""},v$:G()}},computed:{user:function(){return q()},auth:function(){return F()},images:function(){let e=[];for(let t=1;t<=10;t++)e.push({name:`alien ${t}`,url:`/storage/users/alien_${t}.png`});for(let t=1;t<=2;t++)e.push({name:`alien Animation ${t}`,url:`/storage/users/alien_${t}.gif`});return e}},mounted:function(){this.user_id&&(this.form=this.user.users.find(e=>e.id==this.user_id))},methods:{cancelDialog:function(){this.$emit("cancelDialog")},submitUser:async function(){let e=null;this.user_id?e=await this.user.updateUser(this.user_id,this.form):e=await this.user.postUser(this.form),this.$route.params.id==this.auth.getAuth.id&&(this.auth.user.name=e.name,this.auth.user.email=e.email,this.auth.user.activate=e.activate,this.auth.user.image=e.image),this.$emit("cancelDialog")}},validations:function(){return{form:{name:{required:B,minLength:c(6),maxLength:p(25)},email:{required:B,email:H,minLength:c(6),maxLength:p(35)},password:{minLength:c(0),maxLength:p(35)},confirm_password:{minLength:c(0),maxLength:p(35),sameAsPassword:J(this.form.password)}}}}},ee=b("small",{class:"text-caption text-medium-emphasis"},"*indicates required field",-1);function te(e,t,d,N,T,a){const f=r("v-progress-linear"),l=r("v-text-field"),i=r("v-col"),v=r("v-chip"),_=r("v-list-item"),h=r("v-autocomplete"),g=r("v-switch"),w=r("v-row"),A=r("v-form"),E=r("v-card-text"),P=r("v-divider"),z=r("v-spacer"),U=r("v-btn"),M=r("v-card-actions"),j=r("v-card");return u(),V(j,{"prepend-icon":"mdi-account",title:"User Profile"},{loader:n(()=>[s(f,{active:a.user.is_fetch,indeterminate:"",height:"3",color:"blue"},null,8,["active"])]),default:n(()=>[s(E,null,{default:n(()=>[s(A,{autocomplete:"off"},{default:n(()=>[s(w,{dense:""},{default:n(()=>[s(i,{cols:"12",md:"4",sm:"6"},{default:n(()=>[s(l,{hint:"Ente Your Name",label:"Your Name",required:"",variant:"solo-filled","prepend-inner-icon":"mdi-account",rounded:"",flat:"",onInput:e.v$.form.name.$touch,onBlur:e.v$.form.name.$touch,modelValue:e.form.name,"onUpdate:modelValue":t[0]||(t[0]=o=>e.form.name=o),"error-messages":e.v$.form.name.$errors.map(o=>o.$message)},null,8,["onInput","onBlur","modelValue","error-messages"])]),_:1}),s(i,{cols:"12",md:"4",sm:"6"},{default:n(()=>[s(l,{hint:"Enter Your Email",label:"Your Email",type:"email",required:"",variant:"solo-filled","prepend-inner-icon":"mdi-email",rounded:"",flat:"",onInput:e.v$.form.email.$touch,onBlur:e.v$.form.email.$touch,modelValue:e.form.email,"onUpdate:modelValue":t[1]||(t[1]=o=>e.form.email=o),"error-messages":e.v$.form.email.$errors.map(o=>o.$message)},null,8,["onInput","onBlur","modelValue","error-messages"])]),_:1}),s(i,{cols:"12",md:"4",sm:"6"},{default:n(()=>[s(h,{modelValue:e.form.image,"onUpdate:modelValue":t[2]||(t[2]=o=>e.form.image=o),items:a.images,"item-value":"url","item-text":"name",color:"blue-grey-lighten-2",label:"Select Avatar",chips:"",rounded:"",flat:"",variant:"solo-filled",autocomplete:"off"},{chip:n(({props:o,item:m})=>[s(v,I(o,{"prepend-avatar":m.raw.url,text:m.raw.name}),null,16,["prepend-avatar","text"])]),item:n(({props:o,item:m})=>[s(_,I(o,{"prepend-avatar":m.raw.url,subtitle:m.raw.name,title:m.raw.name}),null,16,["prepend-avatar","subtitle","title"])]),_:1},8,["modelValue","items"])]),_:1}),s(i,{cols:"12",md:"4",sm:"6"},{default:n(()=>[s(l,{hint:"Enter Your password",label:"Password","prepend-inner-icon":e.visible?"mdi-eye-off":"mdi-eye",type:e.visible?"text":"password","onClick:prependInner":t[3]||(t[3]=o=>e.visible=!e.visible),variant:"solo-filled",rounded:"",required:"",flat:"",onInput:e.v$.form.password.$touch,onBlur:e.v$.form.password.$touch,modelValue:e.form.password,"onUpdate:modelValue":t[4]||(t[4]=o=>e.form.password=o),"error-messages":e.v$.form.password.$errors.map(o=>o.$message)},null,8,["prepend-inner-icon","type","onInput","onBlur","modelValue","error-messages"])]),_:1}),s(i,{cols:"12",md:"4",sm:"6"},{default:n(()=>[s(l,{hint:"Confirm Your password",label:"Confirm Password","prepend-inner-icon":e.visible?"mdi-eye-off":"mdi-eye",type:e.visible?"text":"password","onClick:prependInner":t[5]||(t[5]=o=>e.visible=!e.visible),variant:"solo-filled",rounded:"",required:"",flat:"",onInput:e.v$.form.confirm_password.$touch,onBlur:e.v$.form.confirm_password.$touch,modelValue:e.form.confirm_password,"onUpdate:modelValue":t[6]||(t[6]=o=>e.form.confirm_password=o),"error-messages":e.v$.form.confirm_password.$errors.map(o=>o.$message)},null,8,["prepend-inner-icon","type","onInput","onBlur","modelValue","error-messages"])]),_:1}),s(i,{cols:"12",md:"4",sm:"6"},{default:n(()=>[s(g,{modelValue:e.form.activate,"onUpdate:modelValue":t[7]||(t[7]=o=>e.form.activate=o),label:e.form.activate?"Activate":"Deactivate","hide-details":"",inset:"",color:"success"},null,8,["modelValue","label"])]),_:1})]),_:1}),ee]),_:1})]),_:1}),s(P),s(M,null,{default:n(()=>[s(z),e.$route.params.id?D("",!0):(u(),V(U,{key:0,text:"Close",variant:"plain",onClick:a.cancelDialog},null,8,["onClick"])),s(U,{color:"blue",text:"Save",onClick:a.submitUser,variant:e.v$.$invalid?"tonal":"flat",disabled:e.v$.$invalid,loading:a.user.is_fetch},null,8,["onClick","variant","disabled","loading"])]),_:1})]),_:1})}const ne=S(x,[["render",te]]);export{ne as M,re as U};