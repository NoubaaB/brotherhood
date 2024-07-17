<template>
    <v-navigation-drawer temporary v-model="auth.drawer">
      <v-sheet
        class="pa-4"
        color="grey-lighten-4"
      >
        <v-avatar
          class="mb-4"
          color="grey-darken-1"
          size="64"
        ></v-avatar>

        <div>{{auth.email}}</div>
      </v-sheet>

      <v-divider></v-divider>

      <v-list>
        <v-list-item
          v-for="[icon, text] in links"
          :key="icon"
          :prepend-icon="icon"
          :title="text"
          link
        ></v-list-item>
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
            ></v-avatar>
            <div class="ml-3 d-block">
              <div class="font-weight-black">
                FULL_NAME
              </div>
              <div class="font-weight-light">
                function
              </div>
            </div>
            <v-btn
            variant="text"
            icon="mdi-power"
            color="blue"
            size="large"
            @click.prevent="logout()"
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
            links: [
                ['mdi-inbox-arrow-down', 'Inbox'],
                ['mdi-send', 'Send'],
                ['mdi-delete', 'Trash'],
                ['mdi-alert-octagon', 'Spam'],
            ]
        }
    },
    computed:{
        auth:function(){
            return useAuth();
        }
    },
}
</script>