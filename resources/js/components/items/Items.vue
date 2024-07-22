<template>
  <v-card>
    <v-card-text>
      <v-row align="center" justify="center" dense>
        <v-col cols="12" md="6" v-for="item in dashboard.items" :key="item.id">
          <Item :item="item" />
        </v-col>
    </v-row>
    </v-card-text>
  </v-card>
</template>
<script>
import { useDashboard } from '@/stores/Dashboard';
import Item from "@/components/items/Item.vue"
export default {
  components: {
    Item
  },
  computed: {
    dashboard: function () {
      return useDashboard();
    }
  }
}
</script>