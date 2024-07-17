<template>
  <v-app id="inspire">
    <v-app-bar style="z-index:3" height="10vh" width="100vw" :elevation="1" flat density="compact">
        <template v-slot:prepend>
            <v-app-bar-nav-icon @click="drawer= !drawer"></v-app-bar-nav-icon>
        </template>

        <v-app-bar-title>Application Bar</v-app-bar-title>

        <template v-slot:append>
            <v-btn icon="mdi-heart"></v-btn>

            <v-btn icon="mdi-magnify"></v-btn>

            <v-btn icon="mdi-dots-vertical"></v-btn>
        </template>
    </v-app-bar>


    <v-navigation-drawer temporary v-model="drawer">
      <v-sheet
        class="pa-4"
        color="grey-lighten-4"
      >
        <v-avatar
          class="mb-4"
          color="grey-darken-1"
          size="64"
        ></v-avatar>

        <div>{{auth.email}}</div>
      </v-sheet>

      <v-divider></v-divider>

      <v-list>
        <v-list-item
          v-for="[icon, text] in links"
          :key="icon"
          :prepend-icon="icon"
          :title="text"
          link
        ></v-list-item>
      </v-list>
      <template v-slot:append>
        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-sheet
            class="bg-blue-lighten-5 mx-auto my-auto rounded-lg px-4 py-3"
          >
          <div class="d-flex align-center hide-menu">
            <v-avatar
              color="grey-darken-1"
              size="40"
            ></v-avatar>
            <div class="ml-3 d-block">
              <div class="font-weight-black">
                FULL_NAME
              </div>
              <div class="font-weight-light">
                function
              </div>
            </div>
            <v-btn
            variant="text"
            icon="mdi-power"
            color="blue"
            size="large"
            @click.prevent="logout()"
            rounded="lg"
            class="ma-auto">
              
            </v-btn>
          </div>
          </v-sheet>
        </v-list>
      </template>
    </v-navigation-drawer>

    <v-main>
      <v-container
        class="py-8 px-6"
        fluid
      >
        <v-row>
          <v-col
            v-for="card in cards"
            :key="card"
            cols="12"
          >
            <v-card>
              <v-list lines="two">
                <v-list-subheader :title="card"></v-list-subheader>

                <template v-for="n in 6" :key="n">
                  <v-list-item>
                    <template v-slot:prepend>
                      <v-avatar color="grey-darken-1"></v-avatar>
                    </template>

                    <v-list-item-title :title="`Message ${n}`"></v-list-item-title>

                    <v-list-item-subtitle title="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil repellendus distinctio similique"></v-list-item-subtitle>
                  </v-list-item>

                  <v-divider
                    v-if="n !== 6"
                    :key="`divider-${n}`"
                    inset
                  ></v-divider>
                </template>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
  import { ref } from 'vue'

  const cards = ['Today', 'Yesterday']
  const links = [
    ['mdi-inbox-arrow-down', 'Inbox'],
    ['mdi-send', 'Send'],
    ['mdi-delete', 'Trash'],
    ['mdi-alert-octagon', 'Spam'],
  ]

  const drawer = ref(null)
</script>

<script>
    import {useAuth} from "@/stores/Auth.js";
    export default {
        data: () => {
            return {
                cards: ['Today', 'Yesterday'],
                drawer: null,
                links: [
                    ['mdi-inbox-arrow-down', 'Inbox'],
                    ['mdi-send', 'Send'],
                    ['mdi-delete', 'Trash'],
                    ['mdi-alert-octagon', 'Spam'],
                ],
            }
        },
        computed:{
            auth:function(){
                return useAuth();
            }
        }
    }
</script>