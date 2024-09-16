<template>
    <v-dialog
      v-model="dashboard.delete_dialog"
    >
      <v-list
        class="py-2"
        color="primary"
        elevation="12"
        rounded="lg"
      >
        <v-list-item
          prepend-icon="$vuetify-outline"
          :title="`Wanna Delete this ${dashboard.delete_model_name}?`"
        >
          <template v-slot:prepend>
            <div class="pe-4">
                <v-avatar rounded="0">
                    <v-img
                        alt="receipt"
                        class="img_border_radius"
                        src="/storage/trash.gif"
                    ></v-img>
                </v-avatar>
            </div>
          </template>

          <v-card>
            <v-card-actions>
                <v-btn :loading="loading" color="red" variant="tonal" @click="_delete" >
                    <v-icon>mdi-trash-can</v-icon>
                    Delete
                </v-btn>
                <v-divider vertical class="mx-5"></v-divider>
                <v-btn @click="dashboard.delete_dialog = false" color="blue" variant="outlined" >
                    Cancel
                </v-btn>
            </v-card-actions>
        </v-card>
        </v-list-item>
      </v-list>
    </v-dialog>
</template>

<script>
    import { useDashboard } from '@/stores/Dashboard';
    export default {
        props: {
            model : String,
        },
        data: function(){
            return {
                loading:false
            }
        },
        computed: {
            dashboard: function () {
                return useDashboard();
            }
        },
        methods: {
            _delete: function () {
                this.loading = true;
                this.dashboard.deleteModel().then(_ => {
                    this.loading = false;
                    this.dashboard.delete_dialog = false;
                })
            }
        }
    }
</script>

<style scoped>

</style>