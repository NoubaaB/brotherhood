<template>
  <v-app>

    <NavBar :drawer="drawer"/>

    <NavigationDrawer v-if="auth.is_auth" :drawer="drawer"/>

    <Main/>
  
  </v-app>
</template>

<script>
  import NavBar from "@/schema/NavBar.vue";
  import NavigationDrawer from "@/schema/NavigationDrawer.vue";
  import Main from "@/schema/Main.vue";
  import { useAuth } from "@/stores/Auth.js";
  
  export default {
    data() {
      return {
        drawer: null
      }
    },
    components:{
        NavBar,
        NavigationDrawer,
        Main
    },
    computed: {
      auth: function () {
        return useAuth();
      }      
    }
  }
</script>