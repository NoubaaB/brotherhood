<template>
    <v-btn
      id="menu-activator"
      color="primary"
      varian="tonel"
      icon
    >
      <v-badge v-if="notification.unread" size="2" color="red" :content="notification.unread">
        <v-icon>mdi-bell-ring</v-icon>
    </v-badge> 
    <v-icon v-else>mdi-bell-outline</v-icon>
    </v-btn>

    <v-menu max-height="600" :close-on-content-click="false" v-model="notification.menu" activator="#menu-activator">
      <v-list>
        <template
            v-for="_notification in notification.getNotifications"
            :key="_notification.created_at"
        >
            <Notification :notification="_notification" :avatar="getAvatar(_notification.model)" :icon="getIcon(_notification.operation)"/> 
        </template>

        <v-list-item
          class="my-2 text-center text-teal-lighten-2"
          v-if="notification.next_page_url"
        >
            <v-list-item-title @click="notification.init()">
                <v-icon class="mr-2 mb-1">mdi-bell</v-icon>See more recent activity
            </v-list-item-title>
        </v-list-item>
        <v-list-item
            class="my-2 text-center text-red-lighten-2"
            v-else
        >
            <v-list-item-title>
                <v-icon class="mr-2 mb-1">mdi-bell-off-outline</v-icon>No more activity to show
            </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <vue3-snackbar :iconPresets="{}" top right  border="left" dense >
	<template v-slot:message-icon="{ message }">
        <v-badge
        location="bottom end"
        :color="message.icon.color"
        >
            <v-avatar rounded="1">
                <v-img
                    :src="message.avatar"
                >
                </v-img>
            </v-avatar>
            <template v-slot:badge>
                <v-icon color="white">{{message.icon.icon}}</v-icon>
            </template>
        </v-badge> 
    </template>

    </vue3-snackbar>

</template>
<script>
import Notification from "@/schema/Notification.vue"
import { useNotification } from "@/stores/Notification";
export default {
    components: {
        Notification
    },
    mounted: function(){
        this.notification.snackBar = this.$snackbar;  
    },
    computed: {
        notification: function () {
            return useNotification()
        }
    },
    methods: {
        getAvatar: function (model) {
            return this.notification.avatars.find(e => e.model == model).avatar;
        },
        getIcon: function (operation) {
            return this.notification.operations.find(e => e.operation == operation);
        },
    },
    watch: {
        "notification.menu": function (val) {
            if (!val) {
                this.notification.decrementNotificationCounter()
            }
        }
    }
}
</script>