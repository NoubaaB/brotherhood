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

    <v-menu activator="#menu-activator">
      <v-list>
        <v-list-item
          v-for="_notofaction in notification.notifications"
          :key="_notofaction.id"
          class="my-2"
          :value="_notofaction.id"
        >
            <template v-slot:prepend>
                <v-avatar rounded="0">
                    <v-img
                        class="img_border_radius"
                        :src="getAvatar(_notofaction.model)"
                    >
                        <v-badge
                        class="ml-5 mt-10 notification_badge"
                        location="bottom start"
                        color="red"

                        >
                        <template v-slot:badge>
                            <v-icon>{{getIcon(_notofaction.opration)}}</v-icon>
                        </template>
                        </v-badge>
                    </v-img>
                </v-avatar>
            </template>

            <template v-slot:append>
                <v-btn
                    color="grey-lighten-1"
                    icon="mdi-information"
                    variant="text"
                ></v-btn>
            </template>
            <list-item-title>
                <v-divider inset></v-divider>
            </list-item-title>
        </v-list-item>

        <v-list-item
          class="my-2 text-center text-teal-lighten-2"
        >
            <list-item-title>
                See more recent activity
            </list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
</template>
<script>
import { useNotification } from "@/stores/Notification";
export default {
    data() {
        return {
            avatars:[
                {
                    model: "article",
                    avatar:"/storage/article.gif"
                },
                {
                    model: "bill",
                    avatar:"/storage/bill.gif"
                },
                {
                    model: "capital",
                    avatar:"/storage/capital.gif"
                },
            ],
            operations: [
                {
                    operation: "edit",
                    icon:"mdi-pencil",
                    color:"yellow",
                },
                {
                    operation: "create",
                    icon:"mdi-new-box",
                    color:"amber",
                },
                {
                    operation: "delete",
                    icon:"mdi-delete-alert",
                    color:"red",
                },
            ]
        }
    },
    computed: {
        notification: function () {
            return useNotification()
        }
    },
    methods: {
        getAvatar: function (model) {
            console.log("model",model)
            return this.avatars.find(e => e.model == model).avatar;
        },
        getIcon: function (operation) {
            console.log("model",model)
            return this.operations.find(e => e.operation == operation);
        },
    }
}
</script>
 <style scoped>
 .notification_badge{
    z-index: 99999999999 !important;
    position:fixed !important;
 }
</style>