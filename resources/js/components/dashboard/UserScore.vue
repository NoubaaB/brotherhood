<template>
    <v-col cols="12" sm="6">
      <v-card
        class="mx-auto"
        title="Users Score"
        subtitle="All user Scores"
      >
        <template v-slot:prepend>
          <v-avatar rounded="0">
            <v-img
              alt="charges-timeline"
              src="/storage/charge_yourself.gif"
            ></v-img>
          </v-avatar>
        </template>
        <template v-slot:append>
        </template>
        <v-card-text class="px-0">
            <v-expansion-panels class="pa" variant="popout">
                <v-expansion-panel
                v-for="user in user.users_activated"
                :key="user.id"
                hide-actions
                >
                <v-expansion-panel-title>
                    <v-row
                    align="center"
                    class="spacer"
                    no-gutters
                    >
                    <v-col
                        cols="2"
                    >
                        <v-avatar
                        size="36px"
                        >
                        <v-img
                            :alt="`user_${user.id}`"
                            :src="user.image"
                        ></v-img>
                        </v-avatar>
                    </v-col>

                    <v-col
                        class="hidden-xs-only text-left"
                    >
                        <strong v-html="user.name"></strong>
                    </v-col>

                    <v-col
                        class="text-no-wrap text-right"
                        cols="4"
                    >
                        <v-chip
                        v-if="user.score>0"
                        :color="`green-lighten-1`"
                        class="ms-0 me-2"
                        label
                        small
                        >
                        {{ formatFloatNumber(user.score) }} MAD
                        </v-chip>
                        <v-chip
                        v-else-if="user.score<0"
                        :color="`red-lighten-1`"
                        class="ms-0 me-2"
                        label
                        small
                        >
                        {{ formatFloatNumber(user.score) }} MAD
                        </v-chip>
                        <v-chip
                        v-else
                        :color="`grey-lighten-1`"
                        class="ms-0 me-2"
                        label
                        small
                        >
                        {{ user.score }} MAD
                        </v-chip>
                    </v-col>
                    </v-row>
                </v-expansion-panel-title>

                <v-expansion-panel-text class="px-0">
                    <UserScoreDetail :user_id="user.id"/>
                </v-expansion-panel-text>
                </v-expansion-panel>
            </v-expansion-panels>

        </v-card-text>
      </v-card>
    </v-col>
</template>
<script>
import {useDashboard} from "@/stores/Dashboard.js";
import { useUser } from "@/stores/User";
import UserScoreDetail from "./UserScoreDetail.vue";

export default {
    computed: {
        dashboard: function () {
            return useDashboard();
        },
        user: function () {
            return useUser();
        },
    },
    components: {
        UserScoreDetail
    }
}
</script>