<template>
    <v-row align="center" justify="center" class="mt-auto">
        <v-col class="text-center">
            <Article v-if="article" :article="article"/>
            <v-row class="mt-10 mx-0">
                <v-col>
                    <v-btn
                        color="blue"
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
                        text="Back Previous"
                        @click="$router.back()"
                    ></v-btn>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>
<script>
import Article from "@/components/articles/Article.vue"
import { useArticle } from '@/stores/Article';
import { useAuth } from "@/stores/Auth";

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
        auth: function () {
            return useAuth();
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
    }
}
</script>