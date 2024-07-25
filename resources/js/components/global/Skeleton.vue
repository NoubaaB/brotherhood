<template>
<v-card
    v-for="(index) in n"
    class="mb-3"
    :key="index"
>
    <v-card-text>
    <v-skeleton-loader
        min-width="344"
        :type="type"
    ></v-skeleton-loader>
    </v-card-text>
</v-card>
</template>
<script>
export default {
    props: {
        n: Number,
        type:String
    }
}
</script>