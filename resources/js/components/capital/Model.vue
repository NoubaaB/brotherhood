<template>  
    <v-card
    prepend-icon="mdi-cash-marker"
    title="Capital"
    >
    <template v-slot:loader>
        <v-progress-linear
            :active="capital.is_fetch"
            indeterminate
            height="3"
            color="blue"
        ></v-progress-linear>
    </template>
    <v-card-text>
        <v-form autocomplete="off">
            <v-row dense>
                <v-col
                    cols="12"
                    md="4"
                    sm="6"
                >
                    <v-text-field
                    hint="Ente Amount"
                    label="Amount"
                    required
                    variant="solo-filled" 
                    prepend-inner-icon="mdi-cash-marker" 
                    rounded 
                    type="number"
                    flat 
                    @input="v$.form.amount.$touch"
                    @blur="v$.form.amount.$touch"
                    v-model="form.amount"
                    :error-messages="
                        v$.form.amount.$errors.map(
                            (e) => e.$message
                        )
                    "
                    ></v-text-field>
                </v-col>
    
                <v-col
                    cols="12"
                    md="4"
                    sm="6"
                >   
                    <span>Date to starsst</span>
                    <VueDatePicker v-model="form.date_start" :enable-time-picker="false" :clearable="false" vertical/>
                </v-col>

                <v-col
                    cols="12"
                    md="4"
                    sm="6"
                >
                    <span>Date to End</span>
                    <VueDatePicker v-model="form.date_end" :enable-time-picker="false" :clearable="false" vertical/>
                </v-col>

            </v-row>
            <small class="text-caption text-medium-emphasis">*indicates required field</small>
        </v-form>
    </v-card-text>

    <v-divider></v-divider>

    <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn
        v-if="!$route.params.id"
        text="Close"
        variant="plain"
        @click="cancelDialog"
        ></v-btn>

        <v-btn
        color="blue"
        text="Save"
        @click="submitCapital"
        :variant="v$.$invalid ? 'tonal':'flat'"
        :disabled="v$.$invalid"
        :loading="capital.is_fetch"
        ></v-btn>
    </v-card-actions>
    </v-card>
</template>
<script>
import { useCapital } from '@/stores/Capital';
import { required } from '@vuelidate/validators';
import useValidate from "@vuelidate/core";
import { useAuth } from "@/stores/Auth";
import moment from 'moment';
export default {
    props: {
        capital_id:Number
    },
    data: function () {
        return {
            visible:false,
            form: {
                amount:null,
                date_start:new Date().toISOString().substr(0, 10),
                date_end:null,
            },
            v$: useValidate(),
        }
    },
    computed: {
        capital: function () {
            return useCapital();
        },
        auth: function () {
            return useAuth();
        }
    },
    mounted:function(){
        if (this.capital_id) {
            this.form = this.capital.capitals.find(capital => capital.id == this.capital_id);
        }
    },
    methods: {
        cancelDialog: function () {
            this.$emit("cancelDialog");
        },
        submitCapital: async function () {
            let request = null;
            if (this.capital_id) {
                request = await this.capital.updateCapital(this.capital_id,this.form)
            } else {
                request = await this.capital.postCapital(this.form)
            }
            if (this.$route.params.id == this.auth.getAuth.id) {
                this.auth.capital.name = request.name;
                this.auth.capital.email = request.email;
                this.auth.capital.image = request.image;
            }
            this.$emit("cancelDialog");
        }
    },
    validations: function() {
        return {
            form: {
                amount: {required },
                date_start: { required},
                date_end: { }
            }
        }
    }
}
</script>