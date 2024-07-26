<template>
    <v-app-bar style="z-index:3" height="10vh" width="100vw" :elevation="1" flat density="compact">
        <template v-slot:prepend>
            <v-app-bar-nav-icon v-if="auth.is_auth" @click="auth.drawer= !auth.drawer"></v-app-bar-nav-icon>
        </template>

        <v-app-bar-title class="text-center">Brotherhood App</v-app-bar-title>
        <template v-slot:append>
            <Notification/>
            <v-btn icon="mdi-account-edit"></v-btn>
        </template>
    </v-app-bar>
</template>
<script>
import { useAuth } from "@/stores/Auth.js";
import Notification from "./Notification.vue"
export default {
    data:function(){
        return {

        }
    },
    components: {
        Notification
    },
    computed:{
        auth:function(){
            return useAuth();
        }
    },
}
</script>