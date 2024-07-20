<template>
  <v-row>
    <v-avatar size="150" class="mx-auto mt-3" rounded="0">
      <v-img
        alt="create command"
        src="/storage/cart.gif"
      ></v-img>
    </v-avatar>
  </v-row>
  <v-container>
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
                        type="submit"
                        block
                        :variant="valid ? 'tonal':'flat'"
                        :disabled="valid"
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

export default {
    components: {
        Model
    },
    data() {
        return {
            loading: false,
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
        },
        valid: function () {
            let b = true;
            this.item.models.forEach(model => {
                if (!!model.date || !!model.description || !!model.price || !!model.is_private || !!model.product_id) {
                    b = false
                }
            })
            return b;
        }
    },
    methods: {
        submitModel: function () {
            
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
    }

}
</script>