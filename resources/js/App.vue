<template>
  <v-app>

    <NavBar :drawer="drawer"/>

    <NavigationDrawer :drawer="drawer"/>

    <Main/>
  
  </v-app>
</template>

<script>
    import NavBar from "@/schema/NavBar.vue";
    import NavigationDrawer from "@/schema/NavigationDrawer.vue";
    import Main from "@/schema/Main.vue";

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
        }
    }
</script>