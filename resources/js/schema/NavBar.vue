<template>
    <v-app-bar  style="z-index:3" height="10vh" width="100vw" :elevation="1" flat density="compact">
        <template v-slot:prepend>
            <v-app-bar-nav-icon v-if="auth.is_auth" @click="auth.drawer= !auth.drawer"></v-app-bar-nav-icon>
        </template>
        <template v-if="auth.is_auth">
            <v-btn
            id="menu-activator-connected-users"
            color="primary"
            varian="tonel"
            icon
            >
                <v-badge v-if="user.connected_users.length!=0" size="2" color="green" floating :content="user.connected_users.length">
                    <v-icon size="x-small">
                        mdi-antenna
                    </v-icon>
                </v-badge> 
                <v-icon v-else size="x-small">mdi-antenna</v-icon>
            </v-btn>
            <v-menu v-if="user.connected_users.length!=0" max-height="600" :close-on-content-click="false" v-model="user.menu" activator="#menu-activator-connected-users">
                <v-list>
                    <template
                        v-for="connected_user in user.connected_users"
                        :key="connected_user.id"
                    >
                        <v-list-item
                        class="my-2 text-center text-blue-lighten-2"
                        >
                            <template v-slot:prepend>
                                <v-avatar
                                size="30"
                                >
                                    <v-img
                                    :src="connected_user.image"
                                    >
    
                                    </v-img>
                                </v-avatar>
                            </template>
                            <v-list-item-title>
                                {{ connected_user.name }}
                            </v-list-item-title>
                        </v-list-item>
                    </template>
                </v-list>
            </v-menu>
        </template>

        <v-app-bar-title class="text-center px-auto">
            <v-row dense>
                <v-col :cols="auth.is_auth?3:4" class="text-right">
                    <img class="d-inline" height="50" :src="'/storage/atmo.gif'">                 
                </v-col>
                <v-col class="text-left my-auto">
                    <div class="d-inline pb-3">
                        {{app_name}}
                    </div>
                </v-col>
            </v-row>
        </v-app-bar-title>
        <template v-slot:append>
            <div v-if="auth.is_auth">
                <Notifications/>
                <v-btn @click="editUser" icon="mdi-account-edit"></v-btn>
            </div>
        </template>
        <v-snackbar
          v-model="user.snack_bar"
        >
          {{ user.connected_user_name }} {{ user.connected_msg }}
    
          <template v-slot:actions>
            <v-btn
              color="pink"
              variant="text"
              @click="user.snack_bar = false"
            >
              Close
            </v-btn>
          </template>
        </v-snackbar>
        <v-snackbar
          v-model="user.snack_bar"
        >
          {{ user.connected_user_name }} {{ user.connected_msg }}
    
          <template v-slot:actions>
            <v-btn
              color="pink"
              variant="text"
              @click="user.snack_bar = false"
            >
              Close
            </v-btn>
          </template>
        </v-snackbar>
    </v-app-bar>
</template>
<script>
import { useAuth } from "@/stores/Auth.js";
import { useUser } from "@/stores/User.js";
import Notifications from "@/schema/Notifications.vue";
export default {
    data:function(){
        return {
            app_name :import.meta.env.VITE_APP_NAME,
        }
    },
    components: {
        Notifications
    },
    computed:{
        auth:function(){
            return useAuth();
        },
        user:function(){
            return useUser();
        },
    },
    methods: {
        editUser:function(){
            this.$router.push({
                name : "users.view",
                params:{
                    id:this.auth.getAuth.id
                }
            })
        }
    }
}
</script>

<style>
.v-toolbar-title {
    margin-inline-start: 0px !important;
}
</style>