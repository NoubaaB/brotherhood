<template>
  <v-card>
    <v-card-text>
      <v-row align="center" justify="center" dense>
        <v-col cols="12" md="6" v-for="item in dashboard.items" :key="item.id">
          <v-card
            class="mx-auto"
            :title="item.product.name"
          >
            <template v-slot:subtitle>
              {{ item.date}}
            </template>
            
            <template v-slot:append>
              <v-btn color="red" size="x-small" icon="mdi-close" variant="tonal" @click="deleteItem(item.id)"></v-btn>
            </template>
            <template v-slot:prepend>
              <v-avatar rounded="0">
                <v-img
                  alt="charges-timeline"
                  src="/storage/item.gif"
                ></v-img>
              </v-avatar>
            </template>
            <v-card-text>{{item.description}}</v-card-text>
            <v-divider></v-divider>
            <v-card-actions class="text-green bg-amber-lighten-5">
              <v-icon color="green" class="mx-1">mdi-cash</v-icon>{{ formatFloatNumber(item.price) }} MAD
            </v-card-actions>
          </v-card>
        </v-col>
    </v-row>
    </v-card-text>
  </v-card>
</template>
<script>
import { useItem } from '@/stores/Item';
import { useDashboard } from '@/stores/Dashboard';
export default {
  computed: {
      item: function () {
          return useItem();
      },
      dashboard: function () {
          return useDashboard();
      }
  },
  methods: {
    deleteItem: async function (id) {
      await this.item.deleteItem(id).then(res => {
        console.log("res",res)
      })
    }   
  }
}
</script>