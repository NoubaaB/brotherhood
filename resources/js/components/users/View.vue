<template>
    <v-row class="my-6">
        <v-col class="text-center">
            <v-avatar size="150" class="mx-auto" rounded="0">
                <v-img
                    alt="dashboards"
                    src="/storage/shield.gif"
                ></v-img>
            </v-avatar>
        </v-col>
    </v-row>  
    <v-row>
        <v-col>
            <Model :user_id="user_id"/>
        </v-col>
    </v-row>
</template>
<script>
import User from "@/components/users/User.vue";
import Model from "@/components/users/Model.vue";
import { useUser } from '@/stores/User';
import { useAuth } from '@/stores/Auth';
export default {
    components: {
        User,
        Model
    },
    data: function(){
        return {
            dialog:false,
            user_id:null,
        }  
    },
    created: function(){
        if (this.$route.params.id != this.auth.getAuth.id) {
            this.$router.back()
        }
        this.user_id = this.auth.getAuth.id;
    },
    computed: {
        user: function () {
            return useUser();
        },
        auth: function () {
            return useAuth();
        }
    }
}
</script>