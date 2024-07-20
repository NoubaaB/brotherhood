<template>
    <v-card rounded="lg" variant="tonal" class="my-2" color="blue">
        <v-card-item>
            <v-row no-gutters>
                <v-col cols="12" sm="6" class="mb-4">
                    <VueDatePicker v-model="form.date" :enable-time-picker="false" :clearable="false" :rules="dateRules" vertical :calendar="calendarFn" :max-date="maxDate"/>
                </v-col>
                <v-col cols="12" sm="6">
                <v-text-field v-model="form.description" variant="solo-filled" prepend-inner-icon="mdi-script-text" rounded flat label="description" :rules="descriptionRules"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                <v-autocomplete v-model="form.product_id" :items="product.collect" item-title="name" item-value="id" variant="solo-filled" prepend-inner-icon="mdi-cart-arrow-down" rounded flat label="Products List" :rules="productIdRules"></v-autocomplete>
                </v-col>
                <v-col cols="12" sm="6">
                <v-text-field v-model="form.price" variant="solo-filled" prepend-inner-icon="mdi-cash" rounded flat label="Price" :rules="priceRules" type="number"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                <v-switch hide-details v-model="form.is_private" inset color="blue" variant="solo-filled" true-icon="mdi-eye-plus" rounded flat label="Private Purchase" ></v-switch>
                </v-col>
            </v-row>
        </v-card-item>
    </v-card>
</template>
<script>
import { required } from '@vuelidate/validators';
import useValidate from "@vuelidate/core";
import { useItem } from '@/stores/Item';
import { useProduct } from '@/stores/Product';
export default {
    props: {
        form:Object
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
        item: function () {
            return useItem();  
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
                v => !!v || "Price is Required",
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
        }  
    },
    validations: {
        form :{
            date: { required },
            description: { required },
            product_id: { required },
            price: { required },
        }
    },
}
</script>