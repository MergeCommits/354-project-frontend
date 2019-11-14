<template>
    <v-layout justify-center class="register" v-bind:style="{backgroundColor: PRIMARY_COLOR}">
        <v-card style="border-radius: 15px; height: fit-content; padding: 1vh 1%; min-width: 50%; margin-top: 5vh">
            <v-container v-if="this.$store.state.selfCheckComplete && !this.$store.state.isLoggedIn">
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
                                                  hint="You must use eight characters with at least one lowercase and uppercase letter, a number and a symbol."
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
                                               style="color: #ffffff" :loading="loading" @click="validate()">Create
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
            <v-container v-else style="text-align: center">
                You're already logged in!
            </v-container>
        </v-card>
    </v-layout>
</template>

<script>
    import Utilities from "../components/common/Utilities.vue";
    import Requests from "../components/common/Requests.js"

    const EMAIL_PATTERN = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const PASSWORD_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).*$/;

    export default {
        name: 'AccountCreation',
        mixins: [Utilities],
        data: () => ({
            isRegistrationValid: true,
            loading: false,
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
                value => !Utilities.isEmpty(value) || "A name is required.",
                value => value.length <= Utilities.MAX_NAME_CHARACTERS || "A maximum of " + Utilities.MAX_NAME_CHARACTERS.toString() + " characters is allowed."
            ],
            usernameRules: [
                value => !Utilities.isEmpty(value) || "A username is required.",
                value => value.length <= Utilities.MAX_NAME_CHARACTERS || "A maximum of " + Utilities.MAX_NAME_CHARACTERS.toString() + " characters is allowed."
            ],
            passwordRules: [
                value => !Utilities.isEmpty(value) || "A password is required.",
                value => !Utilities.isEmpty(value) && value.length >= 8 || "A minimum of 8 characters is required.",
                value => !Utilities.isEmpty(value) && value.length <= 32 || "Password exceeds 32 characters.",
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
            validate() {
                if (this.$refs.form.validate()) {
                    this.loading = true;
                    this.validateAsync();
                }
            },
            async validateAsync() {
                let usernameRequest = Requests.registrationHeadAsync({username: this.username}, "username");
                let emailRequest = Requests.registrationHeadAsync({email: this.email}, "email");
                this.usernameErrors = await usernameRequest;
                this.emailErrors = await emailRequest;
                if (this.emailErrors.length <= 0 && this.usernameErrors.length <= 0) {
                    let data = {
                        firstName: this.firstName,
                        lastName: this.lastName,
                        email: this.email,
                        username: this.username,
                        password: this.password
                    };
                    let response = await Requests.registrationPostAsync(data);

                    if (!response.error) {
                        this.$store.commit("login", response.data);
                        await this.updateShoppingCartAsync();
                        await this.$router.push("/home");
                        return;
                    }
                    alert("There was an error registering your account. Please try again in a moment.");
                }

                this.loading = false;
            }
        }
    };
</script>

<style scoped>
    .register {
        height: 100%;
    }
</style>
