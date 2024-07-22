<template>
  <v-card>
    <v-card-text>
      <v-row align="center" justify="center" dense>
        <template v-if="!dashboard.is_fetch">
          <v-col cols="12" md="6" v-for="article in dashboard.articles" :key="article.id">
              <Article :article="article"/>
          </v-col>
        </template>
        <div v-else>
          <v-col cols="12" md="6">
            <v-card
              v-for="(index) in 3"
              class="mb-3"
              :key="index"
            >
              <v-card-text>
                <v-skeleton-loader
                  min-width="344"
                  type="list-item-avatar-two-line	, chip"
                ></v-skeleton-loader>
              </v-card-text>
            </v-card>
          </v-col>
        </div>
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