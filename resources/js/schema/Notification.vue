<template>
    <v-btn
      id="menu-activator"
      color="primary"
      varian="tonel"
      icon
    >
      <v-badge v-if="notification.length" size="2" color="red" content="2">
        <v-icon>mdi-bell</v-icon>
    </v-badge> 
    <v-icon v-else>mdi-bell-outline</v-icon>
    </v-btn>

    <v-menu activator="#menu-activator">
      <v-list>
        <v-list-item
          v-for="item in 10"
          :key="item"
          :value="item"
        >
          <v-list-item-title>{{ item }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
</template>
<script>
import { useNotification } from "@/stores/Notification";
export default {
    data() {
        return {
            
        }
    },
    computed: {
        notification: function () {
            return useNotification()
        }
    }
}
</script>