<template>
    <v-container
    class="mt-6 ma-auto pt-12" style="position: relative"
    fluid
    >
        <router-view/>
        <ConfirmSupprission/>
        <Progress/>
    </v-container>
</template>
<script>
import ConfirmSupprission from "@/components/global/ConfirmSupprission.vue";
import Progress from "@/components/global/Progress.vue";

export default {
    data : function(){
        return {
            
        }
    },
    components: {
        ConfirmSupprission,
        Progress
    }
}
</script>