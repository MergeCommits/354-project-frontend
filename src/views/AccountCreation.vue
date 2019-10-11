<template>
    <v-layout justify-center pt-5 class="register" v-bind:style="{backgroundColor: PRIMARY_COLOR}">
        <v-card style="border-radius: 15px" min-height="650px" height="80%">
            <v-form ref="form" v-model="validRegistration" :lazy-validation="lazyValidation">
                <v-row style="width: 100%">
                    <v-col>
                        <v-row style="margin-top: -5%; padding-left: 10%">
                            <v-layout pt-5 justify-center>
                                <v-icon style="font-size: 100px" :color="ACCENT_COLOR">fas fa-meteor</v-icon>
                            </v-layout>
                        </v-row>
<!--                        <v-row style="padding-top: 5%; padding-left: 10%">-->
<!--                            <span style="font-size: 30px" class="font-weight-regular">The Stars</span>-->
<!--                        </v-row>-->
                        <v-row style="padding-top: 1%; padding-left: 10%">
                            <v-layout justify-center pt-1>
                                <span style="font-size: 20px;" class="font-weight-light">Create your Star account</span>
                            </v-layout>
                        </v-row>
                        <v-row style="margin-right: 5%; margin-left: 5%">
                            <v-col>
                                <v-text-field v-model="firstName" required :rules="nameRules" :color="ACCENT_COLOR" outlined label="First name"></v-text-field>
                            </v-col>
                            <v-col>
                                <v-text-field v-model="lastName" required :rules="nameRules" :color="ACCENT_COLOR" outlined label="Last name"></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row style="margin-right: 5%; margin-left: 5%; margin-top: -5%">
                            <v-col>
                                <v-text-field v-model="username" required :rules="usernameRules" :color="ACCENT_COLOR" outlined label="Username"></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row style="margin-right: 5%; margin-left: 5%; margin-top: -5%">
                            <v-col>
                                <v-text-field v-model="email" :color="ACCENT_COLOR" outlined label="Email"
                                              :rules="emailRules"
                                              validate-on-blur
                                              required>
                                </v-text-field>
                            </v-col>
                        </v-row>
                        <v-row style="margin-right: 5%; margin-left: 5%; margin-top: -5%">
                            <v-col>
                                <v-text-field outlined label="Password"
                                              required
                                              validate-on-blur
                                              :append-icon="pwVisible ? 'visibility' : 'visibility_off'"
                                              :type="pwVisible ? 'text' : 'password'"
                                              @click:append="pwVisible = !pwVisible"
                                              :color="ACCENT_COLOR"
                                              v-model="password"
                                              :rules="passwordRules">
                                </v-text-field>
                                <span style="font-size: 13px; margin-left: 1%;" class="font-weight-light">
                                        You must use eight characters with letters, numbers and symbols.
                                </span>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-layout justify-end style="margin-right: 7%">
                                    <v-btn style="margin-right: 5%; color: #fff; background-color: #777" @click="goBack()">Cancel</v-btn>
                                    <v-btn :color="PRIMARY_COLOR" style="color: #ffffff" @click="validate()">Create</v-btn>
                                </v-layout>
                            </v-col>
                        </v-row>
                    </v-col>
<!--                    <v-col class="fill-height">-->
<!--                        <v-row>-->
<!--                            <v-layout style="margin-top: 10%" pt-5 justify-center>-->
<!--                                <v-icon style="font-size: 250px" :color="ACCENT_COLOR">fas fa-meteor</v-icon>-->
<!--                            </v-layout>-->
<!--                        </v-row>-->
<!--                        <v-row>-->
<!--                            <v-layout pt-4 justify-center>-->
<!--                                        <span style="font-size: 20px" class="font-weight-light">-->
<!--                                            Wonders from the stars.-->
<!--                                        </span>-->
<!--                            </v-layout>-->
<!--                        </v-row>-->
<!--                    </v-col>-->
                </v-row>
            </v-form>
        </v-card>
    </v-layout>
</template>

<script>
    const EMAIL_PATTERN = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const PASSWORD_PATTERN = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    import Utilities from "../components/common/Utilities.vue"
    export default {
        props: {
            name: 'AccountCreation',
        },
        mixins: [Utilities],
        data: () => ({
            validRegistration: true,
            lazyValidation: true,
            firstName: null,
            lastName: null,
            email: null,
            username: null,
            password: null,
            pwVisible: false,
            nameRules: [
                value => !Utilities.isEmpty(value) || "A name is required.",
            ],
            usernameRules: [
                value => !Utilities.isEmpty(value) || "A username is required.",
            ],
            passwordRules: [
                value => !Utilities.isEmpty(value) || "A password is required.",
                value => !Utilities.isEmpty(value) && value.length >= 8 || "A minimum of 8 characters is required.",
                value => PASSWORD_PATTERN.test(value) || "Password content is not valid.",
            ],
            emailRules: [
                value => !Utilities.isEmpty(value) || "An email is required.",
                value => EMAIL_PATTERN.test(value) || "Email is not valid.",
            ]
        }),
        methods: {
            validate() {
                if (this.$refs.form.validate()) {
                    this.$router.push('/home');
                }
            }
        }
    };
</script>

<style scoped>
    .register {
        height: 100%;
    }
</style>