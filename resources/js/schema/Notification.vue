<template>
    <v-list-item
        class="my-2"
        :value="notification.id"
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
            <p class="font-weight-bold d-inline">{{notification.trigger_user.name}}</p> has {{ notification.operation }} an {{ notification.model }}
            <small class="d-block ml-1">{{getTimeSpan}}</small>
        </v-list-item-title>
    </v-list-item>
</template>
<script>

export default {
    props: {
        notification: Object,
        avatar: String,
        icon:Object
    },
    computed: {
        getTimeSpan: function () {
            return moment(this.notification.created_at).fromNow()
        }
    }
}
</script>