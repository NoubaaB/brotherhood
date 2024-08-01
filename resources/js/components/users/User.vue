<template>
    <v-card
    class="mx-auto"
    :title="user.name"
    >
        <template v-slot:subtitle>
            {{get_date}}
        </template>
        <template v-slot:append>
            <v-btn size="x-small" color="orange" icon="mdi-pencil" variant="tonal" @click="editUser">
            </v-btn>
        </template>
        <template v-slot:prepend>
            <v-avatar
              size="50"
            >
              <v-img
              :src="user.avatar"
              >
              </v-img>
            </v-avatar>
        </template>
    </v-card>
</template>
<script>
import { useUser } from '@/stores/User';
export default {
    props: {
        user:Object
    },
    computed: {
        _user: function () {
            return useUser();
        },
        get_date: function(){
            return moment(this.user.created_at).format("YYYY-MM-DD")
        }
    },
    methods: {
        editUser: function () {
            this.$emit("editUser",true,this.user.id)
        }
    }
}
</script>