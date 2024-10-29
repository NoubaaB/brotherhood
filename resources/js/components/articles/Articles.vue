<template>
  <v-card>
    <v-card-text>
      <v-row align="center" justify="center" dense>
        <template v-if="!dashboard.is_fetch">
          <template v-if="article.articles.length>0">
            <v-col cols="12" md="6" v-for="article in article.articles" :key="article.id">
                <Article :article="article" />
            </v-col>
          </template>
          <v-col v-else cols="12" md="6" class="text-center">
              <NoItemInList name="Articles"/>
          </v-col>
        </template>
        <div v-else>
          <v-col>
            <Skeleton :n="3" :type="'list-item-avatar-two-line , list-item-two-line ,table-tfoot'"/>
          </v-col>
        </div>
    </v-row>
    </v-card-text>
  </v-card>
</template>
<script>
import { useDashboard } from '@/stores/Dashboard';
import NoItemInList from "@/components/global/NoItemInList.vue";
import Skeleton from "@/components/global/Skeleton.vue";
import { useArticle } from '@/stores/Article';

import Article from "@/components/articles/Article.vue"
export default {
  components: {
    Article,
    Skeleton,
    NoItemInList
  },
  computed: {
    dashboard: function () {
      return useDashboard();
    },
    article: function () {
      return useArticle();
    }
  }
}
</script>
<style>
.img_border_radius{
    border-radius: 50%;
}
</style>