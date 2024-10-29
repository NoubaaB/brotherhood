<template>
    <v-dialog
      v-model="search.search_dialog"
      persistent :overlay="false"
      transition="dialog-transition"
    >
      <template v-slot:default>
        <v-card
          title="Search in Articles"
        >
          <template v-slot:prepend>
            <v-btn icon variant="tonal" color="red" size="small" @click="search.search_dialog=false">
              <v-icon>
                mdi-close
              </v-icon>
            </v-btn>
          </template>
          <v-card style="overflow: auto;">
            <v-card-text>
              <v-text-field hide-details v-model="search.text" autocomplete="off" variant="solo-filled" prepend-inner-icon="mdi-magnify" rounded flat label="Search" ></v-text-field>
            </v-card-text>
            <v-card-text v-if="search.articles.length>0">
              <div v-for="article in search.articles" :key="article.id">
                <v-card
                  class="my-2"
                  :class="{ 'bg-blue-grey-lighten-3': (article.bill_id >> 0 && article.bill_id !== true)}"
                  rounded="lg"
                  variant="flat"
                >
                  <v-card-item>
                    <v-card-title class="text-body-2 d-flex align-center">
                      <v-avatar
                        image="/storage/articles_list.gif"
                        size="x-small"
                      ></v-avatar>
                      <v-divider vertical class="mx-2"></v-divider>
                      <span class="text-medium-emphasis font-weight-bold">{{ article.date }}</span>

                      <v-spacer></v-spacer>

                      <v-avatar
                        :image="article.user.image"
                        size="x-small"
                      ></v-avatar>
                    </v-card-title>

                    <div class="py-2">
                      <div class="text-h6">Article ID : <strong>{{ article.id }}</strong></div>

                      <div v-html="article.description" class="font-weight-light text-medium-emphasis">
                        
                      </div>
                    </div>
                    <v-divider></v-divider>

                    <div class="pa-4 d-flex align-center">
                      <v-icon
                        color="disabled"
                        icon="mdi-broadcast"
                        start
                      ></v-icon>

                      <span class="text-caption text-medium-emphasis ms-1 font-weight-light">
                        {{ article.product.name }}
                      </span>

                      <v-spacer></v-spacer>
                      <div v-for="user_id in article.users_id" :key="user_id" class="mr-3">
                          <v-badge color="amber" location="bottom end">
                              <template v-slot:badge>
                                  <v-icon>mdi-hand-coin</v-icon>
                              </template>
                              <v-avatar
                              size="20"
                              >
                                  <v-img
                                  :src="user.getUserImage(user_id)"
                                  >

                                  </v-img>
                              </v-avatar>
                          </v-badge>
                      </div>
                    </div>
                  </v-card-item>
                </v-card>
                <v-divider></v-divider>
              </div>
            </v-card-text>
            <v-card-text v-else>
              <NoItemInList name="Articles"/>
            </v-card-text>
          </v-card>
          <v-card-actions>
            <v-btn
              color="primary"
              variant="tonal"
              rounded
              @click="search.searchArticles"
            >
              <v-icon class="mr-2">
                mdi-send
              </v-icon>
              Submit
            </v-btn>
            <v-btn
              text="Close"
              color="red"
              rounded
              variant="outlined"
              @click="search.search_dialog = false"
            ></v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
</template>

<script>
  import { useSearch } from '@/stores/Search';
  import { useUser } from '@/stores/User';
  import NoItemInList from "@/components/global/NoItemInList.vue";
  
  export default {
      data: function () {
        return {
            
        }    
      },
      components:{
        NoItemInList
      },
      computed: {
        search: function () {
          return useSearch();
        },
        user: function () {
          return useUser();
        }    
      }
  }
</script>