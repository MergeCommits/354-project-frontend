<template>
    <v-layout justify-center pt-5 class="" style="height: 100%!important; background-color: #00838F">
        <v-card style="margin-top: 5%; border-radius: 15px" height="70%" width="70%">
            <!-- TODO: Turn this into a v-form to add validation. -->
            <!-- TODO: Move text to localization file. -->
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
                                <v-text-field v-model="firstName" :color="ACCENT_COLOR" outlined label="First name"></v-text-field>
                            </v-col>
                            <v-col>
                                <v-text-field v-model="lastName" :color="ACCENT_COLOR" outlined label="Last name"></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row style="margin-right: 5%; margin-left: 5%; margin-top: -5%">
                            <v-col>
                                <v-text-field v-model="username" :color="ACCENT_COLOR" outlined label="Username"></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row style="margin-right: 5%; margin-left: 5%; margin-top: -5%">
                            <v-col>
                                <v-text-field v-model="email" :color="ACCENT_COLOR" outlined label="Email"
                                              :rules="[emailRules.required, emailRules.validContent]"
                                                validate-on-blur>
                                </v-text-field>
                            </v-col>
                        </v-row>
                        <v-row style="margin-right: 5%; margin-left: 5%; margin-top: -5%">
                            <v-col>
                                <v-text-field outlined label="Password"
                                              validate-on-blur
                                                :append-icon="pwVisible ? 'visibility' : 'visibility_off'"
                                                :type="pwVisible ? 'text' : 'password'"
                                                 @click:append="pwVisible = !pwVisible"
                                                :color="ACCENT_COLOR"
                                                v-model="password"
                                                :rules="[passwordRules.required, passwordRules.min, passwordRules.validContent]"
                                                style="margin-bottom: -30px">
                                </v-text-field>
                                <span style="font-size: 13px; margin-left: 1%" class="font-weight-light">
                                        You must use eight characters with letters, numbers and symbols
                                </span>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-layout justify-end style="margin-right: 7%">
                                    <v-btn style="margin-right: 5%" @click="goToMain()">Cancel</v-btn>
                                    <v-btn v-if="!this.isFormValid" color="grey darken-1" dark @click="goToMain()">Create</v-btn>
                                    <v-btn v-else :color="ACCENT_COLOR" dark @click="goToMain()">Create</v-btn>
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
    const EMAIL_PATTERN = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const PASSWORD_PATTERN = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/

    import Utilities from "./common/Utilities.vue"
    export default {
        props: {
            name: 'AccountCreation',
        },
        mixins: [Utilities],
        data: () => ({
            firstName: null,
            lastName: null,
            email: null,
            username: null,
            password: null,
            pwVisible: false,
            passwordRules: {
                required: value => !!value || "A password is required.",
                min: v => (v && v.length >= 8) || "A minimum of 8 characters is required.",
                validContent: v => PASSWORD_PATTERN.test(v) || "Password content is not valid.",
            },
            emailRules: {
                required: value => !!value || "An email is required.",
                validContent: v => EMAIL_PATTERN.test(v) || "Email is not valid.",
            }
        }),
        methods: {
            goToMain() {
                this.$emit('goToMain', true);
            }
        },
        computed: {
          isFormValid() {
                return this.firstName && this.lastName && this.email && this.password
          }
        }
    };
</script>
