import{s as n,u as a,e as i,_ as o,f as c,a as r,h as d,r as h,o as u}from"./app-DoqKbSja.js";const f=n("Invoice",{state:()=>({invoices:[],dashboard:a()}),actions:{getInvoice:async function(e){return this.dashboard.fetching=!0,await i.get(`/api/invoices/${e}`).then(t=>(this.dashboard.fetching=!1,t.data.bill_id))},getInvoices:async function(){return this.dashboard.fetching=!0,await i.get("/api/invoices/").then(e=>(this.invoices=e.data.invoices,this.dashboard.fetching=!1,e.data.invoices))}},getters:{}}),l={computed:{invoice:function(){return f()}},mounted:async function(){let e=await this.invoice.getInvoice(this.$route.params.id);e&&this.$router.push({name:"bills.view",params:{id:e}})}},v={class:"text-center"},_=d("h1",null,"Redirecting To bill Section ...",-1);function g(e,t,p,m,b,$){const s=h("v-img");return u(),c("div",v,[r(s,{src:"/storage/loading.gif"}),_])}const x=o(l,[["render",g]]);export{x as default};