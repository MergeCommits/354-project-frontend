<template>
    <v-layout justify-center class="makeProduct" v-bind:style="{backgroundColor: PRIMARY_COLOR}">
        <v-card style="border-radius: 15px; height: fit-content; padding: 1vh 1%; min-width: 50%; margin-top: 5vh">
            <v-container>
                <v-row>
                    <v-form ref="form" style="width: 100%" v-model="validProduct" :lazy-validation="true">
                        <v-row style="padding-top: 5%">
                            <span style="font-size: 30px; width: 100%; text-align: center" class="font-weight-regular">Create a new product</span>
                        </v-row>
                        <v-row style="margin-right: 5%; margin-left: 5%">
                            <v-col>
                                <v-text-field v-model="firstName" required :rules="nameRules" :color="ACCENT_COLOR"
                                              outlined label="First name" />
                            </v-col>
                        </v-row>
                        <v-row style="margin-right: 5%; margin-left: 5%; margin-top: -6%">
                            <v-col>
                                <v-text-field v-model="username" required :rules="usernameRules"
                                              :error-messages="usernameErrors"
                                              :color="ACCENT_COLOR" outlined label="Username" />
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-layout justify-end style="margin-right: 7%">
                                    <v-btn class="no-highlight" style="margin-right: 5%; color: #fff; background-color: #777"
                                           @click="returnConfirmation()">Cancel
                                    </v-btn>
                                    <v-btn :disabled="!validProduct" :color="PRIMARY_COLOR"
                                           style="color: #ffffff" @click="validate()">Create
                                    </v-btn>
                                </v-layout>
                            </v-col>
                        </v-row>
                    </v-form>
                </v-row>
            </v-container>
        </v-card>
    </v-layout>
</template>

<script>
    import Utilities from "../components/common/Utilities.vue";
    import {APICall, RequestType} from "../components/common/API";

    export default {
        name: 'AccountCreation',
        mixins: [Utilities],
        data: () => ({
            validProduct: true,
            usernameRules: [
                value => !Utilities.isEmpty(value) || "A username is required."
            ]
        }),
        watch: {
            // Wipe server response errors.
            username() {
                this.usernameErrors = [];
            },
            email() {
                this.emailErrors = [];
            }
        },
        methods: {
            validate() {
                if (this.$refs.form.validate()) {
                    // TODO:
                }
            },
            returnConfirmation() {
                let confirmed = confirm("Are you sure you want to exit?");
                if (confirmed) {
                    this.goBack();
                }
            }
        }
    };
</script>

<style scoped>
    .makeProduct {
        height: 100%;
    }
</style>
