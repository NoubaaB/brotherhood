<template>
    <v-container
    class="mt-6 ma-auto pt-12" style="position: relative"
    fluid
    >
        <router-view/>
        <ConfirmSupprission/>
    </v-container>
</template>
<script>
import ConfirmSupprission from "@/components/global/ConfirmSupprission.vue"
export default {
    data : function(){
        return {
            
        }
    },
    components: {
        ConfirmSupprission
    }
}
</script>