<template>
    <v-card rounded="lg" variant="tonal" class="my-2" color="blue">
        <v-card-item>
            <v-row no-gutters>
                <v-col cols="12" sm="6" class="mb-4">
                    <VueDatePicker v-model="model.date" :enable-time-picker="false" :clearable="false" :rules="dateRules" vertical :calendar="calendarFn" :max-date="maxDate"/>
                </v-col>
                <v-col cols="12" sm="6">
                <v-text-field v-model="model.description" variant="solo-filled" prepend-inner-icon="mdi-script-text" rounded flat label="description" :rules="descriptionRules"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                <v-autocomplete v-model="model.product_id" :items="product.collect" item-title="name" item-value="id" variant="solo-filled" prepend-inner-icon="mdi-cart-arrow-down" rounded flat label="Products List" :rules="productIdRules"></v-autocomplete>
                </v-col>
                <v-col cols="12" sm="6">
                <v-text-field v-model="model.price" variant="solo-filled" prepend-inner-icon="mdi-cash" rounded flat label="Price" :rules="priceRules" type="number"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                    <v-row>
                        <v-col cols="8">
                            <v-switch hide-details v-model="model.is_private" inset color="blue" variant="solo-filled" true-icon="mdi-eye-plus" rounded flat label="Private" ></v-switch>
                        </v-col>
                        <v-col>
                            <v-checkbox hide-details v-model="model.star" inset color="yellow" variant="solo-filled" true-icon="mdi-star" flat ></v-checkbox>
                        </v-col>
                        <v-col cols="2">
                            <v-btn class="mt-3" size="x-small" color="red" variant="tonal" icon="mdi-close" @click="deleteModel(model.id)"></v-btn>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-card-item>
    </v-card>
</template>
<script>
import { required , numeric } from '@vuelidate/validators';
import useValidate from "@vuelidate/core";
import { useArticle } from '@/stores/Article';
import { useProduct } from '@/stores/Product';

export default {
    props: {
        model:Object
    },
    data() {
        return {
            v$: useValidate(),
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
        dateRules() {
            return [
                v => !!v || "Date is Required",
            ];
        },  
        descriptionRules() {
            return [
                v => !!v || "Description is Required",
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
        }
    },
    validations: {
        model :{
            date: { required },
            description: { required },
            product_id: { required },
            price: { required ,numeric },
        }
    },
}
</script>