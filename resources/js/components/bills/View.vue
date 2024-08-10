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
import { useError } from '@/stores/Error';

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
        },
        error: function () {
            return useError();
        }
    },
    mounted: async function () {
        let bill = this._bill.bills.find(__bill => __bill.id == this.$route.params.id);
        if (bill) {
            this.bill = bill;
        } else {
            bill = await this._bill.getBill(this.$route.params.id).catch(error => {
                this.error.text = `Bill N°: ${this.$route.params.id} has been Deleted`;
                this.error.image = "delete_bill.gif";
                this.$router.push({
                    name: "error404"
                });
            });
            if (bill) {
                this.bill = bill;
                this._bill.bills.push(this.bill);
            }
        }
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