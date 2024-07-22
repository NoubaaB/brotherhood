<template>
    <v-container
    class="mt-10 ma-auto" style="position: relative"
    fluid
    >
    <KeepAlive>
        <router-view/>
    </KeepAlive>
    </v-container>
</template>
<script>
export default {
    data : function(){
        return {
            
        }
    }
}
</script>