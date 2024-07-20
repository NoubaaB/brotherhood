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
            <Model v-for="(form,index) in forms" :key="index" :form="form"/>
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
            forms: [
                
            ]
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
            this.forms.forEach(form => {
                if (!!form.date || !!form.description || !!form.price || !!form.is_private || !!form.product_id) {
                    b = false
                }
            })
            return b;
        }
    },
    methods: {
        submitForm: function () {
            
        },
        addItem: function () {
           this.forms.push(JSON.parse(JSON.stringify(this.item.model))) 
        },
    }

}
</script>