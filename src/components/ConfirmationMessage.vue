<template>
    <div>
        <v-dialog v-model="dialog" persistent max-width="25%">
            <v-card style="border-radius: 15px">
                <v-card-title style="color: black" v-if="title" class="headline cyan darken-3">
                    {{ title }}
                </v-card-title>

                <v-card-text class="font-weight-medium pa-4" style="font-size: 14px; color: #616161">
                    {{ message }}
                </v-card-text>

                <v-divider v-if="button1 || button2"></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                            class="text-capitalize"
                            style="color: white"
                            elevation="1"
                            max-width="49%"
                            :color="ACCENT_COLOR"
                            v-if="button1"
                            @click="emitDecision(true)">
                        {{ button1 }}
                    </v-btn>
                    <v-btn
                            text
                            outlined
                            class="text-capitalize"
                            elevation="1"
                            max-width="49%"
                            v-if="button2"
                            @click="emitDecision(false)">
                        {{ button2 }}
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    import Utilities from "./common/Utilities.vue"

    export default {
        name: "ConfirmationMessage",
        mixins: [Utilities],
        data: () => ({
        }),
        props: {
            title: String,
            message: String,
            button1: String,
            button2: String,
            //persist: Boolean,
            dialog: {
                type: Boolean,
                required: true
            }
        },
        methods: {
            emitDecision(decision) {
                this.$emit("confirmation", decision);
            }
        }
    }
</script>

<style scoped>

</style>