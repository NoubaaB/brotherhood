<template>
<v-card class="mx-auto" :title="article.product.name">
    <template v-slot:subtitle>
        {{ article.date}}
    </template>

    <template v-slot:append>
        <v-btn color="red" size="x-small" icon="mdi-close" variant="tonal" @click="deleteArticle(article.id)"></v-btn>
    </template>
    <template v-slot:prepend>
        <v-avatar rounded="0">
        <v-img
            alt="charges-timeline"
            src="/storage/article.gif"
        ></v-img>
        </v-avatar>
    </template>
    <v-card-text>{{article.description}}</v-card-text>
    <v-divider></v-divider>
    <v-card-actions class="text-green bg-amber-lighten-5">
        <v-icon color="green" class="mx-1">mdi-cash</v-icon>{{ formatFloatNumber(article.price) }} MAD
    </v-card-actions>
</v-card>
</template>
<script>
import { useArticle } from '@/stores/Article';
import { useDashboard } from '@/stores/Dashboard';
export default {
    props: {
        article : Object
    },
    computed: {
        _article: function () {
            return useArticle();
        },
        dashboard: function () {
            return useDashboard();
        }
    },
    methods: {
        deleteArticle: async function (id) {
        await this._article.deleteArticle(id).then(res => {
            console.log("res",res)
        })
        }   
    }
}
</script>