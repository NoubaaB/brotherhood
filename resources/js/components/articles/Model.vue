<template>
    <v-form autocomplete="off">
        <v-card rounded="lg" variant="tonal" class="my-2" color="blue">
            <v-card-item>
                <v-row no-gutters>
                    <v-col cols="12" sm="6" class="mb-4">
                        <VueDatePicker v-model="model.date" :enable-time-picker="false" :clearable="false" :rules="dateRules" vertical :max-date="maxDate"/>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-row>
                            <v-col cols="8">
                                <v-switch :disabled="model.bill_id" hide-details v-model="model.is_private" inset color="blue" variant="solo-filled" true-icon="mdi-eye-off" false-icon="mdi-eye" rounded flat :label="model.is_private ? 'Private':'Public'" ></v-switch>
                            </v-col>
                            <v-col>
                                <v-checkbox hide-details v-model="model.star" inset color="yellow" variant="solo-filled" true-icon="mdi-star" flat ></v-checkbox>
                            </v-col>
                            <v-col cols="2">
                                <v-btn :disabled="article.models.length<=1" class="mt-3" size="x-small" color="red" variant="tonal" icon="mdi-close" @click="deleteModel(model.id)"></v-btn>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="12" sm="6">
                    <v-textarea v-model="model.description" autocomplete="off" variant="solo-filled" prepend-inner-icon="mdi-script-text" rounded flat label="description" :rules="descriptionRules" counter ></v-textarea>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-autocomplete
                            v-model="model.product_id"
                            :id="model.id+''"
                            :items="product.collect.filter(p=>model.is_private?p.user_id == auth.getAuth.id : p.user_id == null)" 
                            auto-select-first
                            chips
                            @keydown.prevent.enter="addProduct"
                            autocomplete="off"
                            item-title="name" 
                            item-value="id" 
                            :open-text="search"
                            variant="solo-filled" 
                            rounded flat label="Products List" 
                            :rules="productIdRules">
                            <template v-slot:prepend-inner>
                                <v-btn color="green" :loading="loading_product" @click.prevent="addProduct" size="x-small" icon variant="tonal">
                                    <v-icon>mdi-cart-arrow-down</v-icon>
                                </v-btn>
                            </template>
                        </v-autocomplete>
                    </v-col>
                    <v-col cols="12" sm="6">
                    <v-text-field v-model="model.price" suffix="DH" autocomplete="off" variant="solo-filled" prepend-inner-icon="mdi-cash" rounded flat label="Price" :rules="priceRules" type="number"></v-text-field>
                    </v-col>
                </v-row>
            </v-card-item>
        </v-card>
    </v-form>
</template>
<script>
import { required , numeric } from '@vuelidate/validators';
import useValidate from "@vuelidate/core";
import { useArticle } from '@/stores/Article';
import { useProduct } from '@/stores/Product';
import { useAuth } from '@/stores/Auth';

export default {
    props: {
        model:Object
    },
    data() {
        return {
            v$: useValidate(),
            loading_product: false,
            search:"e"
        }
    },
    computed: {
        maxDate: function () {
            return moment().format("YYYY-MM-DD")
        },
        article: function () {
            return useArticle();  
        },
        product: function () {
            return useProduct();  
        },
        auth: function () {
            return useAuth();  
        },
        dateRules() {
            return [
                v => !!v || "Date is Required",
            ];
        },  
        descriptionRules() {
            return [
                v => v?.length<=400 || "Description Must Be less then 400 charactaers",
            ];
        },  
        productIdRules() {
            return [
                v => !!v || "Product is Required",
            ];
        },  
        priceRules() {
            return [
                v => (!!v || "Price is Required")&&(!isNaN(v)),
            ];
        },  
    },
    methods: {
      calendarFn:function(weeks) {
        return weeks
            .filter((week) => week.days.some((day) => day.text === 15))
            .map((week) => ({
                ...week,
                days: week.days.map((day) => {
                    day.classData['custom-class'] = true;
                    return day;
                }),
            }));
        },
        deleteModel: function (id) {
            this.article.deleteModel(id)
        },
        addProduct: async function () {
            let product_name = document.getElementById(this.model.id).value;
            if (product_name == "" || !!this.product.collect.find(p => p.name == product_name)) {
                return 0;
            } else {
                this.loading_product = true;
                await this.product.postProduct(product_name,this.model.is_private?this.auth.getAuth.id:null).then(res => {
                    this.loading_product = false;
                });
            }
        }
    },
    watch:{
        "model.description": function (value) {
            // Regular expression to match arithmetic expressions or numbers followed by "dh"
            const regex = /\(([^)]+)\)\s*dh|(\d+(\.\d+)?)\s*dh/g;
            let sum = 0;
            let match;
            let numbers = [];

            // Iterate through all matches of the regex in the value string
            while ((match = regex.exec(value)) !== null) {
                let result;

                // Check if it's an arithmetic expression in parentheses (like (2*10)dh)
                if (match[1]) {
                    result = eval(match[1]);  // Evaluate the arithmetic expression inside parentheses
                    numbers.push(`(${match[1]})dh`);
                } else {
                    // Handle single numbers (like 5dh or 5.5dh)
                    result = parseFloat(match[2]);
                    numbers.push(`${result}dh`);
                }

                // Add the result to the sum
                sum += result;
            }

            // Return the final result
            this.model.price = sum;
        }
    },
    validations: {
        model :{
            date: { required },
            description: {  },
            product_id: { required },
            price: { required ,numeric },
        }
    },
}
</script>