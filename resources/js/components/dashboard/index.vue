<template>
    <v-row>
        <v-avatar size="150" class="mx-auto" rounded="0">
        <v-img
            alt="dashboard"
            src="/storage/dashboard.gif"
        ></v-img>
        </v-avatar>
    </v-row>
    <v-row>
        <v-col>
        <!-- <DatePicker/> -->
        </v-col>
    </v-row>
    <v-row>
        <Charges/>
    </v-row>
</template>
<script>
import Charges from "./Charges.vue";
export default {
    components: {
        Charges
    }
}
</script>