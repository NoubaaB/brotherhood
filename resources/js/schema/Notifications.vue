<template>
    <v-btn
      id="menu-activator"
      color="primary"
      varian="tonel"
      icon
    >
      <v-badge v-if="notification.unread" size="2" color="red" :content="notification.unread">
        <v-icon>mdi-bell</v-icon>
    </v-badge> 
    <v-icon v-else>mdi-bell-outline</v-icon>
    </v-btn>

    <v-menu max-height="600" :close-on-content-click="false" v-model="menu" activator="#menu-activator">
      <v-list>
        <template
          v-for="_notification in notification.notifications"
          :key="_notification.id"
        >
            <Notification :notification="_notification" :avatar="getAvatar(_notification.model)" :icon="getIcon(_notification.operation)"/> 
        </template>

        <v-list-item
          class="my-2 text-center text-teal-lighten-2"
          v-if="notification.next_page_url"
        >
            <v-list-item-title @click="notification.init()">
                See more recent activity
            </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
</template>
<script>
import Notification from "@/schema/Notification.vue"
import { useNotification } from "@/stores/Notification";
export default {
    components: {
        Notification
    },
    data() {
        return {
            avatars:[
                {
                    model: "Article",
                    avatar:"/storage/article.gif"
                },
                {
                    model: "Bill",
                    avatar:"/storage/bill.gif"
                },
                {
                    model: "Capital",
                    avatar:"/storage/capital.gif"
                },
            ],
            operations: [
                {
                    operation: "Edit",
                    icon:"mdi-pencil",
                    color:"green",
                },
                {
                    operation: "Create",
                    icon:"mdi-star",
                    color:"amber",
                },
                {
                    operation: "Delete",
                    icon:"mdi-delete-alert",
                    color:"red",
                },
            ],
            menu:false
        }
    },
    computed: {
        notification: function () {
            return useNotification()
        }
    },
    methods: {
        getAvatar: function (model) {
            return this.avatars.find(e => e.model == model).avatar;
        },
        getIcon: function (operation) {
            return this.operations.find(e => e.operation == operation);
        },
    },
    watch: {
        menu: function (val) {
            console.log("val",val)
            if (!val) {
                this.notification.decrementNotificationCounter()
            }
        }
    }
}
</script>