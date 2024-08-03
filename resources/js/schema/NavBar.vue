<template>
    <v-app-bar style="z-index:3" height="10vh" width="100vw" :elevation="1" flat density="compact">
        <template v-slot:prepend>
            <v-app-bar-nav-icon v-if="auth.is_auth" @click="auth.drawer= !auth.drawer"></v-app-bar-nav-icon>
        </template>

        <v-app-bar-title class="text-center px-auto">
            <v-row dense>
                <v-col cols="5" class="text-right">
                    <img class="d-inline" height="40" :src="'/storage/atmo.gif'">                 
                </v-col>
                <v-col class="text-left my-auto">
                    <div class="d-inline pb-3">
                        Brotherhood
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
    </v-app-bar>
</template>
<script>
import { useAuth } from "@/stores/Auth.js";
import Notifications from "@/schema/Notifications.vue"
export default {
    data:function(){
        return {

        }
    },
    components: {
        Notifications
    },
    computed:{
        auth:function(){
            return useAuth();
        }
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