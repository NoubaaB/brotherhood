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
      <v-card-title>Create Article</v-card-title>
      <v-card-text>
            <Model v-for="(model,index) in article.models" :key="index" :model="model"/>
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
                        :disabled="!auth.user.activate"
                        @click="article.addArticle"
                        >
                        <v-icon>
                            mdi-plus
                        </v-icon>
                        Add New Article
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
                        :disabled="v$.$invalid || !auth.user.activate"
                        :loading="loading"
                    >
                        <v-icon class="mr-2">
                            mdi-send
                        </v-icon>
                        Submit
                    </v-btn>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-btn 
                        rounded
                        color="amber"
                        @click="backToListArticle"
                        block
                        variant="tonal"
                    >
                        <v-icon class="mr-2">
                            mdi-arrow-u-left-bottom-bold
                        </v-icon>
                        Back To List Articles
                    </v-btn>
                </v-col>
            </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script>
import { useArticle } from '@/stores/Article';
import { useProduct } from '@/stores/Product';
import { useAuth } from '@/stores/Auth';
import Model from '@/components/articles/Model.vue';
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
    computed: {
        article: function () {
            return useArticle();  
        },
        product: function () {
            return useProduct();  
        },
        auth:function(){
            return useAuth();
        },
    },
    methods: {
        submit: async function () {
            this.loading = true;
            await this.article.postArticles().then(res => {
                this.loading = false;
                this.$router.push(
                    {
                        name: "articles.list"
                    });
            });
        },
        backToListArticle: function () {
            this.$router.push({ name: "articles.list" });
        }
    },
    validations: {
        article: {
            models: [
                {
                    date: { required },
                    description: {  },
                    product_id: { required },
                    price: { required ,numeric },
                }
            ]
         }
    }

}
</script>