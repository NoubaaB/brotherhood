<template>
    <div v-if="article">
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
                  <Model :model="article"/>
                  <v-row>
                      <v-col cols="12" sm="6">
                          <v-divider></v-divider>
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
    </div>
</template>
<script>
import { useDashboard } from '@/stores/Dashboard';
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
            article: null,
            v$: useValidate(),
        }
    },
    mounted: async function () {
        let article = await this._article.getArticle(this.$route.params.id);
        if ((!article.id) || (this.auth.getAuth.id != article.user_id)) {
            this.$router.push({
                name: "error404"
            });
        } else {
            this.article = article;
        }
    },
    computed: {
        _article: function () {
            return useArticle();  
        },
        auth: function () {
            return useAuth();  
        },
        product: function () {
            return useProduct();  
        },
        dashboard: function () {
            return useDashboard();  
        }
    },
    methods: {
        submit: async function () {
            this.loading = true;
            await this._article.updateArticle(this.article).then(res => {
                this.loading = false;
                this.$router.push({
                    name: "articles.view",
                    params: {
                        id:this.article.id
                    }
                })
            })
        },
        backToListArticle: function () {
            this.$router.push({name:"articles.list"})
        }
    },
    validations: {
        article:
            {
                id: { required , numeric },
                date: { required },
                description: { required },
                product_id: { required },
                price: { required ,numeric },
            }
    }

}
</script>