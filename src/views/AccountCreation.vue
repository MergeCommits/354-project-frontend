<template>
    <v-layout justify-center class="register" v-bind:style="{backgroundColor: PRIMARY_COLOR}">
        <v-card style="border-radius: 15px; height: fit-content; padding: 1vh 1%; min-width: 50%; margin-top: 5vh">
            <v-container>
                <v-row>
                    <v-col cols="7" style="padding: 6px">
                        <v-form ref="form" v-model="isRegistrationValid" :lazy-validation="true">
                            <v-row style="padding-top: 5%; padding-left: 10%">
                                <span style="font-size: 30px" class="font-weight-regular">The Stars</span>
                            </v-row>
                            <v-row style="padding-top: 1%; padding-left: 10%">
                                <v-layout pt-1>
                                    <span style="font-size: 20px;"
                                          class="font-weight-light">Create your Star account</span>
                                </v-layout>
                            </v-row>
                            <v-row style="margin-right: 5%; margin-left: 5%">
                                <v-col>
                                    <v-text-field v-model="firstName" required :rules="nameRules" :color="ACCENT_COLOR"
                                                  outlined label="First name"></v-text-field>
                                </v-col>
                                <v-col>
                                    <v-text-field v-model="lastName" required :rules="nameRules" :color="ACCENT_COLOR"
                                                  outlined label="Last name"></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row style="margin-right: 5%; margin-left: 5%; margin-top: -6%">
                                <v-col>
                                    <v-text-field v-model="username" required :rules="usernameRules"
                                                  :error-messages="usernameErrors"
                                                  :color="ACCENT_COLOR" outlined label="Username"></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row style="margin-right: 5%; margin-left: 5%; margin-top: -6%">
                                <v-col>
                                    <v-text-field v-model="email" :color="ACCENT_COLOR" outlined label="Email"
                                                  :rules="emailRules"
                                                  :error-messages="emailErrors"
                                                  required>
                                    </v-text-field>
                                </v-col>
                            </v-row>
                            <v-row style="margin-right: 5%; margin-left: 5%; margin-top: -6%">
                                <v-col>
                                    <v-text-field outlined label="Password" required
                                                  validate-on-blur
                                                  hint="You must use eight characters with letters, numbers and symbols."
                                                  :append-icon="isPasswordVisible ? 'visibility' : 'visibility_off'"
                                                  :type="isPasswordVisible ? 'text' : 'password'"
                                                  @click:append="isPasswordVisible = !isPasswordVisible"
                                                  :color="ACCENT_COLOR"
                                                  v-model="password"
                                                  :rules="passwordRules">
                                    </v-text-field>
                                </v-col>
                            </v-row>
                            <v-row style="margin-right: 5%; margin-left: 5%; margin-top: -6%">
                                <v-col>
                                    <v-text-field outlined label="Password Confirmation"
                                                  required
                                                  validate-on-blur
                                                  :type="isPasswordVisible ? 'text' : 'password'"
                                                  :color="ACCENT_COLOR"
                                                  v-model="passwordConfirm"
                                                  :error-messages="passwordConfirmErrors">
                                    </v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col>
                                    <v-layout justify-end style="margin-right: 7%">
                                        <v-btn style="margin-right: 5%; color: #fff; background-color: #777"
                                               @click="goBack()">Cancel
                                        </v-btn>
                                        <v-btn :disabled="!isRegistrationValid" :color="PRIMARY_COLOR"
                                               style="color: #ffffff" @click="validate()">Create
                                        </v-btn>
                                    </v-layout>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-col>
                    <v-col cols="5" align-self="center">
                        <v-row>
                            <v-layout justify-center>
                                <v-icon style="font-size: 130px" :color="ACCENT_COLOR">fas fa-meteor</v-icon>
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
    import Utilities from "../components/common/Utilities.vue";
    import Requests from "../components/common/requests.js"

    const EMAIL_PATTERN = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const PASSWORD_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,15}$/;

    export default {
        name: 'AccountCreation',
        mixins: [Utilities],
        data: () => ({
            isRegistrationValid: true,
            firstName: null,
            lastName: null,
            email: null,
            emailErrors: [],
            username: null,
            usernameErrors: [],
            password: null,
            passwordConfirm: null,
            passwordConfirmErrors: [],
            isPasswordVisible: false,
            nameRules: [
                value => !Utilities.isEmpty(value) || "A name is required."
            ],
            usernameRules: [
                value => !Utilities.isEmpty(value) || "A username is required."
            ],
            passwordRules: [
                value => !Utilities.isEmpty(value) || "A password is required.",
                value => (!Utilities.isEmpty(value) && value.length >= 8) || "A minimum of 8 characters is required.",
                value => PASSWORD_PATTERN.test(value) || "Password content is not valid."
            ],
            emailRules: [
                value => !Utilities.isEmpty(value) || "An email is required.",
                value => EMAIL_PATTERN.test(value) || "Email is not valid."
            ]
        }),
        watch: {
            // Wipe server response errors.
            username() {
                this.usernameErrors = [];
            },
            email() {
                this.emailErrors = [];
            },
            password() {
                this.passwordMatchRules();
            },
            passwordConfirm() {
                this.passwordMatchRules();
            }
        },
        methods: {
            passwordMatchRules() {
                this.passwordConfirmErrors = this.password !== this.passwordConfirm ? ["Passwords must match"] : [];
            },

            async validate() {
                if (this.$refs.form.validate()) {
                    this.usernameErrors = await Requests.headRequest({username: this.username}, "username");
                    this.emailErrors = await Requests.headRequest({email: this.email}, "email");
                    if (Requests.postRequest({
                        firstName: this.firstName,
                        lastName: this.lastName,
                        email: this.email,
                        username: this.username,
                        password: this.password
                    })) {
                        this.$router.push('/home');
                    }
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
