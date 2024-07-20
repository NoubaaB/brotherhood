<template>
    <v-empty-state
    headline="Whoops 404"
    title="Resource is Not Found"
    text="Resource Or Component is Not Exist o Deleted"
    image="/storage/error-404.png"
    style="margin-top:30%"
    >
        <template v-slot:actions>
            <v-btn
                color="blue"
                elevation="1"
                rounded="xl"
                text="Go Back Home"
                @click="$router.push({name:'index'})"
            ></v-btn>

            <v-btn
                color="blue"
                variant="outlined"
                rounded="xl"
                text="Back Previous"
                @click="$router.back()"
            ></v-btn>
        </template>
    </v-empty-state>
</template>
<script>
export default {
}
</script>