<template>
    <div class="text-center">
        <v-img src="/storage/loading.gif">

        </v-img>
        <h1>Redirecting To bill Section ...</h1>
    </div>
</template>
<script>
import { useInvoice } from '@/stores/Invoice';
export default {
    computed: {
        invoice: function () {
            return useInvoice();
        }
    },
    mounted: async function () {
        let bill_id = await this.invoice.getInvoice(this.$route.params.id);
        if (bill_id) {
            this.$router.push({
                name: "bills.view",
                params: {
                    id:bill_id
                }
            })
        }
    }
}
</script>