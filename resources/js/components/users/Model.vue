<template>  
    <v-card
    prepend-icon="mdi-account"
    title="User Profile"
    >
    <template v-slot:loader>
        <v-progress-linear
            :active="user.is_fetch"
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
                    hint="Ente Your Name"
                    label="Your Name"
                    required
                    variant="solo-filled" 
                    prepend-inner-icon="mdi-account" 
                    rounded 
                    flat 
                    @input="v$.form.name.$touch"
                    @blur="v$.form.name.$touch"
                    v-model="form.name"
                    :error-messages="
                        v$.form.name.$errors.map(
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
                    <v-text-field
                    hint="Enter Your Email"
                    label="Your Email"
                    type="email"
                    required
                    variant="solo-filled" 
                    prepend-inner-icon="mdi-email" 
                    rounded 
                    flat
                    @input="v$.form.email.$touch"
                    @blur="v$.form.email.$touch"
                    v-model="form.email"
                    :error-messages="
                        v$.form.email.$errors.map(
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
                    <v-autocomplete
                    v-model="form.image"
                    :items="images"
                    item-value="url"
                    item-text="name"
                    color="blue-grey-lighten-2"
                    label="Select Avatar"
                    chips
                    rounded 
                    flat
                    variant="solo-filled" 
                    autocomplete="off"
                    >
                        <template v-slot:chip="{ props, item }">
                            <v-chip
                            v-bind="props"
                            :prepend-avatar="item.raw.url"
                            :text="item.raw.name"
                            ></v-chip>
                        </template>
    
                        <template v-slot:item="{ props, item }">
                            <v-list-item
                            v-bind="props"
                            :prepend-avatar="item.raw.url"
                            :subtitle="item.raw.name"
                            :title="item.raw.name"
                            ></v-list-item>
                        </template>
                    </v-autocomplete>
                </v-col>
    
                <v-col
                    cols="12"
                    md="4"
                    sm="6"
                >
                    <v-text-field
                    hint="Enter Your password"
                    label="Password"
                    :prepend-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                    :type="visible ? 'text' : 'password'"
                    @click:prepend-inner="visible = !visible"
                    variant="solo-filled" 
                    rounded
                    required
                    flat
                    @input="v$.form.password.$touch"
                    @blur="v$.form.password.$touch"
                    v-model="form.password"
                    :error-messages="
                        v$.form.password.$errors.map(
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
                    <v-text-field
                    hint="Confirm Your password"
                    label="Confirm Password"
                    :prepend-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                    :type="visible ? 'text' : 'password'"
                    @click:prepend-inner="visible = !visible"
                    variant="solo-filled" 
                    rounded
                    required
                    flat
                    @input="v$.form.confirm_password.$touch"
                    @blur="v$.form.confirm_password.$touch"
                    v-model="form.confirm_password"
                    :error-messages="
                        v$.form.confirm_password.$errors.map(
                            (e) => e.$message
                        )
                    "
                    ></v-text-field>
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
        @click="submitUser"
        :variant="v$.$invalid ? 'tonal':'flat'"
        :disabled="v$.$invalid"
        :loading="user.is_fetch"
        ></v-btn>
    </v-card-actions>
    </v-card>
</template>
<script>
import { useUser } from '@/stores/User';
import { required , email , maxLength ,minLength , sameAs } from '@vuelidate/validators';
import useValidate from "@vuelidate/core";
import { useAuth } from "@/stores/Auth";
export default {
    props: {
        user_id:Number
    },
    data: function () {
        return {
            visible:false,
            form: {
                name:"",
                email:"",
                image:"/storage/users/alien_2.gif",
                password:"",
                confirm_password:"",
            },
            v$: useValidate(),
        }
    },
    computed: {
        user: function () {
            return useUser();
        },
        auth: function () {
            return useAuth();
        },
        images: function () {
            let images = [];
            for (let index = 1; index <= 10; index++) {
                images.push({
                    name: `alien ${index}`,
                    url: `/storage/users/alien_${index}.png`
                })
            }
            for (let index = 1; index <= 2; index++) {
                images.push({
                    name: `alien Animation ${index}`,
                    url: `/storage/users/alien_${index}.gif`
                })
            }
            return images
        }
    },
    mounted:function(){
        if (this.user_id) {
            this.form = this.user.users.find(user => user.id == this.user_id);
        }
    },
    methods: {
        cancelDialog: function () {
            this.$emit("cancelDialog");
        },
        submitUser: async function () {
            let request = null;
            if (this.user_id) {
                request = await this.user.updateUser(this.user_id,this.form)
            } else {
                request = await this.user.postUser(this.form)
            }
            if (this.$route.params.id == this.auth.getAuth.id) {
                this.auth.user.name = request.name;
                this.auth.user.email = request.email;
                this.auth.user.image = request.image;
            }
            this.$emit("cancelDialog");
        }
    },
    validations: function() {
        return {
            form: {
                name: {required , minLength:minLength(6), maxLength:maxLength(25)},
                email: { required, email ,minLength:minLength(6) , maxLength:maxLength(35)},
                password:{minLength:minLength(0),maxLength:maxLength(35)},
                confirm_password:{minLength:minLength(0),maxLength:maxLength(35),sameAsPassword:sameAs(this.form.password)}
            }
        }
    }
}
</script>