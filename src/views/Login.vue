<template>
    <v-layout justify-center pt-5 class="login" v-bind:style="{backgroundColor: PRIMARY_COLOR}">
        <v-container>
            <v-row>
                <v-layout justify-center pt-3>
                    <v-icon color="white" style="font-size: 60px">fas fa-meteor</v-icon>
                </v-layout>
            </v-row>
            <v-row>
                <v-layout justify-center>
                    <v-card hover style="margin-top: 25px; margin-bottom: 3px; border-radius: 15px" height="96%" width="30%"
                            min-width="300px">
                        <v-container pb-5>
                            <v-form ref="form" v-model="validLogin" :lazy-validation="lazyValidation">
                                <v-row style="padding-top: 1%;">
                                    <v-layout justify-center pt-1>
                                        <span style="font-size: 15px !important;  color:#616161"
                                              class="title font-weight-medium">Log in to your Star account</span>
                                    </v-layout>
                                </v-row>
                                <v-row style="margin-right: 9%; margin-left: 9%; margin-top: 1%">
                                    <v-layout justify-center pt-3>
                                        <v-text-field v-model="email" required :rules="emailRules" :color="ACCENT_COLOR" outlined
                                                      label="Email"></v-text-field>
                                    </v-layout>
                                </v-row>
                                <v-row style="margin-right: 9%; margin-left: 9%; margin-top: -1%">
                                    <v-text-field v-model="password" required outlined label="Password"
                                                  :rules="passwordRules"
                                                  :error-messages="pwError"
                                                  :append-icon="pwVisible ? 'visibility' : 'visibility_off'"
                                                  :type="pwVisible ? 'text' : 'password'"
                                                  @click:append="pwVisible = !pwVisible"
                                                  :color="ACCENT_COLOR"
                                                  style="margin-bottom: -5%">
                                    </v-text-field>
                                </v-row>
                                <v-row style=" margin-top: -3%">
                                    <v-col>
                                        <v-layout justify-end style="margin-right: 9%; margin-left: 9%" pt-5>
                                            <v-btn block :color="ACCENT_COLOR" dark @click="validate()">Continue</v-btn>
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
                                            <v-btn block :color="ACCENT_COLOR" dark outlined router to="/home">
                                                Browse anonymously
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
                                              class="font-weight-light appLink">
                                             <router-link to="/register">Sign up for an account</router-link>
                                        </span>
                                    </v-layout>
                                </v-row>
                            </v-form>
                        </v-container>
                    </v-card>
                </v-layout>
            </v-row>
        </v-container>
    </v-layout>
</template>

<script>
    import Utilities from "../components/common/Utilities.vue"
    import {APICall, RequestType} from "../components/common/API";

    const EMAIL_PATTERN = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const PASSWORD_PATTERN = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    export default {
        name: "Login",
        mixins: [Utilities],
        data: () => ({
            validLogin: true,
            lazyValidation: true,
            email: null,
            password: null,
            pwVisible: false,
            pwError: "",
            emailRules: [
                value => !Utilities.isEmpty(value) || "An e-mail is required.",
                value => EMAIL_PATTERN.test(value) || "Email is not valid."
            ],
            passwordRules: [
                value => !Utilities.isEmpty(value) || "A password is required.",
                value => PASSWORD_PATTERN.test(value) || "Password content is not valid."
            ]
        }),
        computed: {
            loginState() {
                return this.$store.state.isLoggedIn;
            }
        },
        watch: {
            loginState(newState) {
                if (newState) { this.return(); }
            },
            // Wipe server response errors/
            email() {
                this.pwError = [];
            },
            password() {
                this.pwError = [];
            }
        },
        methods: {
            // Return to requested redirect, otherwise homepage.
            return() {
                let retPath = this.$route.query.redirect;
                if (!Utilities.isEmpty(retPath)) {
                    this.$router.push("/" + retPath);
                } else {
                    this.$router.push("/home");
                }
            },
            validate() {
                // Are the fields filled in?
                if (this.$refs.form.validate()) {
                    let jsonData = {
                        email: this.email,
                        password: this.password
                    };

                    const LOGIN = 200;
                    const ALREADY_LOGIN = 401;
                    const INVALID_INFO = 400;

                    let call = new APICall(RequestType.POST, "auth/login", jsonData, [LOGIN, ALREADY_LOGIN, INVALID_INFO]);
                    call.performRequest()
                        .then(response => {
                            switch (response.status) {
                                case LOGIN:
                                case ALREADY_LOGIN: {
                                    this.$store.commit("login", response.data);
                                    this.return();
                                } break;

                                case INVALID_INFO: {
                                    this.pwError = [response.data.message];
                                } break;
                            }
                        });
                }
            }
        }

    }
</script>

<style scoped>
    .appLink:hover {
        color: #FF8F00;
    }

    .v-application a {
        color: inherit;
        text-decoration: inherit;
    }

    .login {
        height: 100%;
    }
</style>
