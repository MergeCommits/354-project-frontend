<template>
        <v-layout justify-center pt-5 class="" style="height: 100%!important; background-color: #90CAF9">
            <v-card style="margin-top: 5%; border-radius: 15px" height="70%" width="70%">
                <v-container>
                    <v-row style="width: 100%">
                        <v-col>
                            <v-row style="padding-top: 5%; padding-left: 10%">
                                <span style="font-size: 30px" class="font-weight-regular">The Stars</span>
                            </v-row>
                            <v-row style="padding-top: 1%; padding-left: 10%">
                                <span style="font-size: 20px" class="font-weight-light">Create your Star account</span>
                            </v-row>
                            <v-row style="margin-right: 5%; margin-left: 5%">
                                <v-col>
                                    <v-text-field :color="ACCENT_COLOR" outlined label="First name"></v-text-field>
                                </v-col>
                                <v-col>
                                    <v-text-field :color="ACCENT_COLOR" outlined label="Last name"></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row style="margin-right: 5%; margin-left: 5%; margin-top: -5%">
                                <v-col>
                                    <v-text-field :color="ACCENT_COLOR" outlined label="Email"></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row style="margin-right: 5%; margin-left: 5%; margin-top: -5%">
                                <v-col>
                                    <v-text-field outlined label="Password"
                                                  append-icon="lock"
                                                  type="password"
                                                  :color="ACCENT_COLOR"
                                                  style="margin-bottom: -5%">
                                    </v-text-field>
                                    <span style="font-size: 13px;margin-left: 1%" class="font-weight-light">
                                            You must use height characters with letters, numbers and symbols
                                    </span>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col>
                                    <v-layout justify-end style="margin-right: 7%">
                                        <v-btn style="margin-right: 5%" @click="goToMain()">Cancel</v-btn>
                                        <v-btn color="grey darken-1" dark @click="goToMain()">Create</v-btn>
                                    </v-layout>
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col class="fill-height">
                            <v-row>
                                <v-layout style="margin-top: 10%" pt-5 justify-center>
                                    <v-icon style="font-size: 250px" :color="ACCENT_COLOR">fas fa-meteor</v-icon>
                                </v-layout>
                            </v-row>
                            <v-row>
                                <v-layout pt-4 justify-center>
                                            <span style="font-size: 20px" class="font-weight-light">
                                                Wonders from the stars.
                                            </span>
                                </v-layout>
                            </v-row>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card>
        </v-layout>
</template>

<script>
    import Utilities from "./common/Utilities.vue"
    export default {
        props: {
            name: 'AccountCreation',
        },
        mixins: [Utilities],
        data: () => ({}),
        methods: {
            goToMain(){
                this.$emit('goToMain', true);
            }
        }
    };
</script>
