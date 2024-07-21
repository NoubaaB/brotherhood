<template>
  <v-row>
    <v-avatar size="150" class="mx-auto mt-3" rounded="0">
      <v-img
        alt="create command"
        src="/storage/cart.gif"
      ></v-img>
    </v-avatar>
  </v-row>
  <v-container class="px-1">
    <v-card>
      <v-card-title>Create Item</v-card-title>
      <v-card-text>
            <Model v-for="(model,index) in item.models" :key="index" :model="model"/>
            <v-row>
                <v-col cols="12" sm="6">
                    <v-divider></v-divider>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-btn 
                        rounded
                        color="orange"
                        variant="outlined"
                        block
                        @click="addItem"
                        >
                        <v-icon>
                            mdi-plus
                        </v-icon>
                        Add New Item
                    </v-btn>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-btn 
                        rounded
                        color="blue"
                        @click="submit"
                        block
                        :variant="v$.$invalid ? 'tonal':'flat'"
                        :disabled="v$.$invalid"
                        :loading="loading"
                    >
                        <v-icon class="mr-2">
                            mdi-send
                        </v-icon>
                        Submit
                    </v-btn>
                </v-col>
            </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script>
import { v4 as uuidv4 } from 'uuid';
import { useItem } from '@/stores/Item';
import { useProduct } from '@/stores/Product';
import Model from '@/components/items/Model.vue';
import { required , numeric} from '@vuelidate/validators';
import useValidate from "@vuelidate/core";

export default {
    components: {
        Model
    },
    data() {
        return {
            loading: false,
            valid: false,
            v$: useValidate(),
        }
    },
    mounted: function () {
        this.addItem();
    }, 
    computed: {
        item: function () {
            return useItem();  
        },
        product: function () {
            return useProduct();  
        }
    },
    methods: {
        submit: async function () {
            this.loading = true;
            await this.item.postItems().then(res => {
                this.loading = false;
            })
        },
        addItem: function () {
            this.item.models.push(
            {
                id:uuidv4(),
                date: new Date().toISOString().substr(0, 10),
                description: "",
                price: null,
                is_private: false,
                product_id: null,
            }
           )
        },
    },
    validations: {
        item: {
            models: [
                {
                    date: { required },
                    description: { required },
                    product_id: { required },
                    price: { required ,numeric },
                }
            ]
         }
    }

}
</script>