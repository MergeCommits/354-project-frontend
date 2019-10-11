<template>
    <v-layout justify-center pt-5 class="login" v-bind:style="{backgroundColor: PRIMARY_COLOR}">
        <v-container>
            <v-row>
                <v-layout justify-center pt-3>
                    <v-icon color="white" style="font-size: 60px; margin-right: 10px">fas fa-meteor</v-icon>
                </v-layout>
            </v-row>
            <v-row>
                <v-layout justify-center>
                    <v-card hover style="margin-top: 3%; border-radius: 15px" height="96%" width="30%" min-width="300px">
                        <v-form ref="form" v-model="validLogin" :lazy-validation="lazyValidation">
                            <v-row style="padding-top: 1%;">
                                <v-layout justify-center pt-1>
                                    <span style="font-size: 15px !important;  color:#616161" class="title font-weight-medium">Log in to your Star account</span>
                                </v-layout>
                            </v-row>
                            <v-row style="margin-right: 9%; margin-left: 9%; margin-top: 1%">
                                <v-layout justify-center pt-3>
                                    <v-text-field required :rules="emailRules" :color="ACCENT_COLOR" outlined label="Email"></v-text-field>
                                </v-layout>
                            </v-row>
                            <v-row style="margin-right: 9%; margin-left: 9%; margin-top: -1%">
                                    <v-text-field required outlined label="Password"
                                                  :rules="passwordRules"
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
                    </v-card>
                </v-layout>
            </v-row>
        </v-container>
    </v-layout>
</template>

<script>
    import Utilities from "../components/common/Utilities.vue"

    export default {
        name: "Login",
        mixins: [Utilities],
        data: () => ({
            validLogin: true,
            lazyValidation: true,
            pwVisible: false,
            emailRules: [
                value => (value != null) || "An e-mail is required.",
            ],
            passwordRules: [
                value => (value != null) || "A password is required.",
            ]
        }),
        methods: {
            validate() {
                // Are they fields filled in?
                if (this.$refs.form.validate()) {
                    // TODO: Check the database for validity.
                    this.$router.push('/home');
                }
            }
        }

    }
</script>

<style scoped>
.appLink:hover{
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
