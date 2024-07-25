<template>
  <v-card>
    <v-card-text>
      <v-row align="center" justify="center" dense>
        <template v-if="!bill.is_fetch">
          <template v-if="bill.bills.length>0">
            <v-col cols="12" md="6" v-for="bill in bill.bills" :key="bill.id">
                <Bill :bill="bill" />
            </v-col>
          </template>
          <v-col v-else cols="12" md="6" class="text-center">
            <NoItemInList />
          </v-col>
        </template>
        <div v-else>
          <v-col cols="12" md="6">
            <Skeleton :n="3" :type="'avatar, text , table-tfoot'"/>
          </v-col>
        </div>
    </v-row>
    </v-card-text>
  </v-card>
</template>
<script>
import Bill from "@/components/bills/Bill.vue";
import NoItemInList from "@/components/global/NoItemInList.vue";
import Skeleton from "@/components/global/Skeleton.vue";
import { useBill } from '@/stores/Bill';
export default {
    components: {
        Bill,
        Skeleton,
        NoItemInList
    },
    mounted: async function () {
        await this.bill.getData();
    },
    computed: {
        bill: function () {
            return useBill();
        }
    }
}
</script>
<style>
.img_border_radius{
    border-radius: 50%;
}
</style>