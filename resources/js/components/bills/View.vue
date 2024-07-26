<template>
    <v-row>
        <v-avatar size="150" class="mx-auto" rounded="0">
        <v-img
            alt="dashboards"
            src="/storage/watch.gif"
        ></v-img>
        </v-avatar>
    </v-row>
    <div class="center_div">
        <v-row align="center" justify="center" class="mt-auto">
            <v-col>
                <Bill v-if="bill" :bill="bill"/>
                <v-skeleton-loader
                v-else
                    min-width="344"
                    type="list-item-avatar-two-line , list-item-two-line ,table-tfoot"
                ></v-skeleton-loader>
    
            </v-col>
        </v-row>
        <v-row class="mt-10 mx-0">
            <v-col>
                <v-btn
                    color="blue"
                    block
                    elevation="1"
                    rounded="xl"
                    text="List Bills"
                    @click="$router.push({name:'bills.list'})"
                ></v-btn>
            </v-col>
        </v-row>
    </div>
</template>
<script>
import Bill from "@/components/bills/Bill.vue"
import { useBill } from '@/stores/Bill';

export default {
    components: {
        Bill
    },
    data: function () {
        return {
            bill:null
        }
    },
    computed: {
        _bill: function () {
            return useBill();
        }
    },
    mounted: async function () {
        let bill = await this._bill.getBill(this.$route.params.id);
        if ((!bill.id)) {
            this.$router.push({
                name: "error404"
            });
        } else {
            this.bill = bill;
        }
        if (!this._bill.bills.find(__bill => __bill.id == this.$route.params.id)) {
            this._bill.bills.push(this.bill);
        };
    },
    watch: {
        bill: {
            deep: true,
            handler: function () {
                if (this.bill.articles.length == 0) {
                    this.$router.push({name:'bills.list'})
                }
            }
        }
    }
}
</script>