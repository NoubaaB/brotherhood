<template>
    <v-row>
        <v-avatar size="150" class="mx-auto" rounded="0">
        <v-img
            alt="dashboards"
            src="/storage/watch.gif"
        ></v-img>
        </v-avatar>
    </v-row>
    <div class="center_div">
        <v-row align="center" justify="center" class="mt-auto">
            <v-col>
                <Article v-if="article" :article="article"/>
                <v-skeleton-loader
                v-else
                    min-width="344"
                    type="list-item-avatar-two-line , list-item-two-line ,table-tfoot"
                ></v-skeleton-loader>
    
            </v-col>
        </v-row>
        <v-row class="mt-10 mx-0">
            <v-col>
                <v-btn
                    color="blue"
                    block
                    elevation="1"
                    rounded="xl"
                    text="List Articles"
                    @click="$router.push({name:'articles.list'})"
                ></v-btn>
            </v-col>
            <v-col>
                <v-btn
                    color="blue"
                    variant="outlined"
                    rounded="xl"
                    block
                    @click="goToCreateArticles"
                >
                    <v-icon>mdi-plus</v-icon>
                    Create New Article
                </v-btn>
            </v-col>
        </v-row>
    </div>
</template>
<script>
import Article from "@/components/articles/Article.vue"
import { useArticle } from '@/stores/Article';
import { useDashboard } from '@/stores/Dashboard';
import { useAuth } from '@/stores/Auth';
import { useError } from '@/stores/Error';

export default {
    components: {
        Article
    },
    data: function () {
        return {
            article:null
        }
    },
    computed: {
        _article: function () {
            return useArticle();
        },
        dashboard: function(){
            return useDashboard();
        },
        auth: function () {
            return useAuth();
        },
        error: function () {
            return useError();
        }
    },
    mounted: async function () {
        let article = this.dashboard.articles.find(__article => __article.id == this.$route.params.id);
        if (article) {
            if ((article.user_id != this.auth.getAuth.id) && (article.is_private == true)) {
                this.error.text = `Article N° : ${this.$route.params.id} Has been Deleted`,
                this.error.image = "delete_article.gif";

                this.$router.push({
                    name: "error404"
                });
            }            
            this.article = article;
        } else {
            article = await this._article.getArticle(this.$route.params.id).catch(error => {
                this.error.text = `Article N° : ${this.$route.params.id} Has been Deleted`,
                this.error.image = "delete_article.gif";

                this.$router.push({
                    name: "error404"
                });
            });
            if (article) {
                if ((article.user_id != this.auth.getAuth.id) && (article.is_private == true)) {
                    this.error.text = `Article N° : ${this.$route.params.id} Has been Deleted`,
                    this.error.image = "delete_article.gif";

                    this.$router.push({
                        name: "error404"
                    });
                }
                this.article = article;
                this.dashboard.articles.push(this.article);
            }
        }

    },
    methods: {
        goToCreateArticles: function () {
            this.$router.push({ name: "articles.create" });
        }
    }
}
</script>