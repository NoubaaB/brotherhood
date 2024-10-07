<template>
    <v-app>

      <NavBar :drawer="drawer" v-if="auth.is_activate"/>

      <NavigationDrawer v-if="auth.is_auth && auth.is_activate" :drawer="drawer"/>

      <Main class="mb-12" />
    
    </v-app>
    <v-btn
      v-if="auth.is_activate"
      v-show="showButton"
      color="blue-darken-1"
      class="floating-btn"
      @click="scrollToTop"
      icon="mdi-chevron-up"
    >
    </v-btn>
    <v-btn
      v-if="auth.is_activate"
      color="amber-darken-1"
      class="floating-btn-previous text-white"
      @click="goPrevious"
      icon="mdi-cart-plus"
    >
    </v-btn>

</template>

<script>
  import NavBar from "@/schema/NavBar.vue";
  import NavigationDrawer from "@/schema/NavigationDrawer.vue";
  import Main from "@/schema/Main.vue";
  import { useAuth } from "@/stores/Auth.js";
  
  export default {
    data() {
      return {
        drawer: null,
        showButton:false
      }
    },
    components:{
        NavBar,
        NavigationDrawer,
        Main
    },
    methods: {
      scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      handleScroll() {
        this.showButton = window.scrollY > 200;
      },
      goPrevious: function () {
        this.$router.push({
          name:"articles.create"
        });
      }
    },
    computed: {
      auth: function () {
        return useAuth();
      }      
    },
    mounted : function() {
      window.addEventListener('scroll', this.handleScroll);
    },
    beforeDestroy : function() {
      window.removeEventListener('scroll', this.handleScroll);
    }

  }
</script>
<style>
.floating-btn {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
}

.floating-btn-previous {
  position: fixed;
  bottom: 20px;
  left: 20px;
  z-index: 1000;
}

</style>