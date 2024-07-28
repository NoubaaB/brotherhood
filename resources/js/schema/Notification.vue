<template>
    <v-list-item
        class="my-2"
        :value="notification.created_at"
        @click="goto"
        >
        <template v-slot:prepend>
            <v-badge
            location="bottom end"
            :color="icon.color"
            >
                <v-avatar rounded="1">
                    <v-img
                        :src="avatar"
                    >
                    </v-img>
                </v-avatar>
                <template v-slot:badge>
                    <v-icon color="white">{{icon.icon}}</v-icon>
                </template>
            </v-badge>
        </template>
    
        <template v-slot:append v-if="!notification.read">
            <v-badge
            class="ml-5 mt-10"
            color="green"
            location="top start"
            dot
            >
            </v-badge>
        </template>
        <v-list-item-title>
            <p class="font-weight-bold d-inline">{{notification.trigger_user.name}}</p>
             has {{ notification.operation }} {{ notification.model }} {{ notification.model != "Delete" ? notification.text : "" }}
            <small class="d-block ml-1">{{getTimeSpan}}</small>
        </v-list-item-title>
    </v-list-item>
</template>
<script>

import { useNotification } from '@/stores/Notification';
export default {
    props: {
        notification: Object,
        avatar: String,
        icon:Object
    },
    computed: {
        getTimeSpan: function () {
            return moment(this.notification.created_at).fromNow()
        },
        _notification: function () {
            return useNotification();
        }
    },
    methods: {
        goto: function () {
            this._notification.menu = false;
            this.$router.push(this.notification.url)
        }
    }
}
</script>