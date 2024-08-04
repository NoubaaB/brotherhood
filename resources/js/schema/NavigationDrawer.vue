<template>
    <v-navigation-drawer 
    temporary 
    v-model="auth.drawer">
      <v-row class="bg-grey-lighten-4" style="align-items: baseline;">
        <v-col class="text-center mt-3">
          <v-sheet
            class="pl-3"
            color="grey-lighten-4"
          >
            <v-avatar
              size="64"
            >
              <v-img
              :src="auth.getAuth.image"
              >

              </v-img>
            </v-avatar>
          </v-sheet>
        </v-col>
        <v-col class="mb-2 text-center">
          <v-chip class="font-weight-medium mx-3">
            <v-icon>mdi-email</v-icon>
            {{auth.getAuth.email}}
          </v-chip>
        </v-col>
      </v-row>  

      <v-divider class="mt-3"></v-divider>

      <v-list v-model:opened="open" >
        <template v-for="([icon , text , url], i) in links" :key="i">
            <v-list-item 
                class="my-2 mx-2"
                :prepend-icon="icon" 
                :title="text" 
                :value="text" 
                rounded="xl" 
                color="blue-darken-1"
                :exact="true"
                :to="{'name':url}"
            ></v-list-item>
        </template>
      </v-list>
      <template v-slot:append>
        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-sheet
            class="bg-blue-lighten-5 mx-auto my-auto rounded-lg px-4 py-3"
          >
          <div class="d-flex align-center hide-menu">
            <v-avatar
              color="grey-darken-1"
              size="40"
            >
              <v-img
              :src="auth.getAuth.image"
              >

              </v-img>
            </v-avatar>
            <div class="ml-3 d-block">
              <div class="font-weight-light">
                {{auth.get_full_name}}
              </div>
            </div>
            <v-btn
            variant="text"
            icon="mdi-power"
            color="blue"
            size="large"
            @click.prevent="logout"
            rounded="lg"
            class="ma-auto">
            </v-btn>
          </div>
          </v-sheet>
        </v-list>
      </template>
    </v-navigation-drawer>
</template>
<script>
import {useAuth} from "@/stores/Auth.js";
export default {
  data:function(){
      return {
          open : null
      }
  },
  computed:{
      auth:function(){
          return useAuth();
      },
      links:function(){
          return [
              ["mdi-human-male-board-poll", "Dashboard","index"],
              ["mdi-cart-plus", "Create Articles","articles.create"],
              ["mdi-cart", "Articles","articles.list"],
              ["mdi-text-box-multiple", "Bills","bills.list"],
              ["mdi-cash-marker", "Capitals","capital.list"],
              ["mdi-account-group", "Users","users.list"],
          ]
      }
  },
  methods: {
    logout: function () {
      this.auth.logout().then(res => {
        this.$router.push({ "name": "login" });
      })
    }
  }
}
</script>