<template>
    <div class="mt-5">
        <v-row>
            <v-btn block rounded @click="editCapital(true,null)" color="blue"><v-icon class="md-2">mdi-plus</v-icon>Add Capital</v-btn>
        </v-row>
        <v-row align="center" justify="center">
            <v-col cols="12" md="6" v-for="capital in capital.capitals" :key="capital.id">
                <Capital :capital="capital" @editCapital="editCapital"/>
            </v-col>
        </v-row>
    </div>
    <v-dialog
      v-model="dialog"
      max-width="600"
    >
        <Model :capital_id="capital_id" @cancelDialog="cancelDialog"/>
    </v-dialog>
</template>
<script>
import Capital from "@/components/capital/Capital.vue";
import Model from "@/components/capital/Model.vue";
import { useCapital } from '@/stores/Capital';
export default {
    components: {
        Capital,
        Model
    },
    mounted: async function () {
        await this.capital.getData();  
    },
    data: function(){
        return {
            dialog:false,
            capital_id:null,
        }  
    },
    computed: {
        capital: function () {
            return useCapital();
        }
    },
    methods: {
        editCapital: function (dialog, capital_id) {
            this.capital_id = capital_id
            this.dialog = dialog;
        },
        cancelDialog: function () {
            this.dialog = !this.dialog
        }
    }
}
</script>