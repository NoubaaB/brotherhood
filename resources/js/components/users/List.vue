<template>
    <div class="mt-5">
        <v-row>
            <v-btn block rounded @click="editUser(true,null)" color="blue"><v-icon class="md-2">mdi-plus</v-icon>Add User</v-btn>
        </v-row>
        <v-row align="center" justify="center">
            <v-col cols="12" md="6" v-for="user in user.users" :key="user.id">
                <User :user="user" @editUser="editUser"/>
            </v-col>
        </v-row>
    </div>
    <v-dialog
      v-model="dialog"
      max-width="600"
    >
        <Model :user_id="user_id" @cancelDialog="cancelDialog"/>
    </v-dialog>
</template>
<script>
import User from "@/components/users/User.vue";
import Model from "@/components/users/Model.vue";
import { useUser } from '@/stores/User';
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
    computed: {
        user: function () {
            return useUser();
        }
    },
    methods: {
        editUser: function (dialog, user_id) {
            this.user_id = user_id
            this.dialog = dialog;
        },
        cancelDialog: function () {
            this.dialog = !this.dialog
        }
    }
}
</script>