import{U as s,M as o}from"./Model-B9J9vc68.js";import{_ as r,d as n,g as u,r as a,o as i,c}from"./app-CfkVGWP0.js";import"./index-CgNvZbD5.js";const d={components:{User:s,Model:o},data:function(){return{dialog:!1,user_id:null}},created:function(){this.$route.params.id!=this.auth.getAuth.id&&this.$router.back(),this.user_id=this.auth.getAuth.id},computed:{user:function(){return n()},auth:function(){return u()}}};function p(e,_,f,l,h,m){const t=a("Model");return i(),c(t,{user_id:e.user_id},null,8,["user_id"])}const k=r(d,[["render",p]]);export{k as default};