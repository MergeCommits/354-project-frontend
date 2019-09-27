<template>
    <v-layout justify-center pt-5 class="" style="height: 100%!important; background-color: #00897B">
        <v-container>
            <v-row>
                <v-layout justify-center pt-3>
                    <v-icon color="white" style="font-size: 60px; margin-right: 10px">fas fa-meteor</v-icon>

                </v-layout>
            </v-row>
            <v-row>
                <v-layout justify-center>
                    <v-card hover style="margin-top: 3%; border-radius: 15px" height="96%" width="30%">
                        <v-container>
                            <v-row style="padding-top: 1%;">
                                <v-layout justify-center pt-1>
                                    <span style="font-size: 15px !important;  color:#616161" class="title font-weight-medium">Log in to your Star account</span>
                                </v-layout>
                            </v-row>
                            <v-row style="margin-right: 9%; margin-left: 9%; margin-top: 1%">
                                <v-layout justify-center pt-3>
                                    <v-text-field :color="ACCENT_COLOR" outlined label="Email"></v-text-field>
                                </v-layout>
                            </v-row>
                            <v-row style="margin-right: 5%; margin-left: 5%; margin-top: -5%">
                                <v-col>
                                    <v-text-field outlined label="Password"
                                                  append-icon="lock"
                                                  type="password"
                                                  :color="ACCENT_COLOR"
                                                  style="margin-bottom: -5%">
                                    </v-text-field>
                                </v-col>
                            </v-row>
                            <v-row style=" margin-top: -5%">
                                <v-col>
                                    <v-layout justify-end style="margin-right: 9%; margin-left: 9%">
                                        <v-btn block :color="ACCENT_COLOR" dark @click="goToMain()">Continue</v-btn>
                                    </v-layout>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-layout justify-center style="margin-right: 9%; margin-left: 9%">
                                   <span style="font-size: 13px; color: #616161" class="font-weight-medium">
                                           OR
                                    </span>
                                </v-layout>
                            </v-row>
                            <v-row>
                                <v-col>
                                <v-layout justify-center style="margin-right: 9%; margin-left: 9%">
                                    <v-btn block :color="ACCENT_COLOR" dark outlined @click="goToMain()">
                                        Browser anonymously
                                    </v-btn>
                                </v-layout>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-layout pt-3 justify-center style="margin-right: 9%; margin-left: 9%">
                                    <span style="font-size: 13px;margin-left: 1%" class="font-weight-light appLink">
                                           Can't login ?
                                    </span>
                                    <span style="font-size: 13px;margin-left: 6%"
                                          class="font-weight-light appLink"
                                            @click="goToFormCreation()">
                                           Sign up for an account
                                    </span>
                                </v-layout>
                            </v-row>
                        </v-container>
                    </v-card>
                </v-layout>
            </v-row>
        </v-container>
    </v-layout>
</template>

<script>
    import Utilities from "./common/Utilities.vue"

    export default {
        name: "Login",
        mixins: [Utilities],
        data: () => ({}),
        methods: {
            goToMain() {
                this.$emit('goToMain', true);
            },
            goToFormCreation() {
                this.$emit('goToFormCreation', true);
            }
        }

    }
</script>

<style scoped>
        .appLink:hover{
            color:#FF8F00
        }
</style>
