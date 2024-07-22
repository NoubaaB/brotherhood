<template>
  <v-card>
    <v-card-text>
      <v-row align="center" justify="center" dense>
        <v-col cols="12" md="6" v-for="article in dashboard.articles" :key="article.id">
          <Article :artilce="artilce" />
        </v-col>
    </v-row>
    </v-card-text>
  </v-card>
</template>
<script>
import { useDashboard } from '@/stores/Dashboard';
import Article from "@/components/articles/Article.vue"
export default {
  components: {
    Article
  },
  computed: {
    dashboard: function () {
      return useDashboard();
    }
  }
}
</script>