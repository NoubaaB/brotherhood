<template>
    <v-empty-state
    headline="Whoops 404"
    :title="error.text_deactivated"
    text="🚀🚨!بتعربية تاعرابت, طلع ليك المؤشر اسي"
    :image="`/storage/${error.image_deactivated||'error-404.png'}`"
    style="margin-top:25%"
    >
    </v-empty-state>
</template>
<script>
import { useError } from '@/stores/Error';
export default {
    computed: {
        error: function () {
            return useError();
        }
    }
}
</script>