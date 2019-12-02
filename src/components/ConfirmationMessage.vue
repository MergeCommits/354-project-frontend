<template>
    <div>
        <v-dialog max-width="25%" persistent v-model="dialog">
            <v-card style="border-radius: 15px">
                <v-card-title class="headline cyan darken-3" style="color: black" v-if="title">
                    {{ title }}
                </v-card-title>

                <v-card-text class="font-weight-medium pa-4" style="font-size: 14px; color: #616161">
                    {{ message }}
                </v-card-text>

                <v-divider v-if="button1 || button2"></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                            :color="ACCENT_COLOR"
                            @click="emitDecision(true)"
                            class="text-capitalize"
                            elevation="1"
                            max-width="49%"
                            style="color: white"
                            v-if="button1">
                        {{ button1 }}
                    </v-btn>
                    <v-btn
                            @click="emitDecision(false)"
                            class="text-capitalize"
                            elevation="1"
                            max-width="49%"
                            outlined
                            text
                            v-if="button2">
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
        data: () => ({}),
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