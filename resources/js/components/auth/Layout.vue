<template>
    <v-card>
        <v-layout full-height>
            <v-container class="justify-center align-center">
                <v-row>
                    <v-col>
                        <v-img
                            alt="login image"
                            style="mix-blend-mode: multiply"
                            class="d-sm-none"
                            src="/storage/atmo.gif"
                        ></v-img>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <Form />
                    </v-col>
                </v-row>
            </v-container>
        </v-layout>
    </v-card>
</template>

<script>
    import Form from "@/components/auth/Form.vue";
    export default {
        components: {
            Form,
        },
    };
</script>

<style lang="scss" scoped></style>
