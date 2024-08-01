<template>
    <Model :user_id="user_id"/>
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