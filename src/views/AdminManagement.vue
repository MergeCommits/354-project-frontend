<template>
    <div>
        <v-container fluid>
            <v-divider/>
            <v-row style="margin-inline: 15%">
                <v-col md="4">
                    <v-layout justify-center="true">
                        <v-btn router style="color: #fff; background-color: #777" to="/admin-manage-console">
                            Management
                        </v-btn>
                    </v-layout>
                </v-col>
                <v-col md="4">
                    <v-layout justify-center="true">
                        <v-btn router style="color: #fff; background-color: #777" to="/admin-sales">
                            Sales
                        </v-btn>
                    </v-layout>
                </v-col>
                <v-col md="4">
                    <v-layout justify-center="true">
                        <v-btn router style="color: #fff; background-color: #777" to="/admin-profits">
                            Profits
                        </v-btn>
                    </v-layout>
                </v-col>
            </v-row>
        </v-container>
        <v-container fluid>
            <v-row class="justify-center">
                <v-select v-model="currentItem"
                          :items="options"
                          style="max-width: 60%"
                          :disabled="loading"
                          placeholder="Select user">
                </v-select>
            </v-row>
        </v-container>
        <v-container fluid v-if="currentItem" style="max-width: 25%;">
            <v-form ref="form" v-model="valid">
                <v-checkbox label="Admin Status" :disabled="loading" v-model="user.isAdmin"/>
                <v-text-field label="Email" :color="ACCENT_COLOR" outlined
                              :disabled="loading"
                              v-model="user.email"
                              :error-messages="emailError"
                              :rules="emailRules"/>
                <v-text-field v-model="password" outlined label="Password"
                              hint="You must use eight characters with at least one lowercase and uppercase letter, a number and a symbol."
                              :rules="passwordRules"
                              :disabled="loading"
                              :color="ACCENT_COLOR">
                </v-text-field>
                <v-layout justify-center="true" class="mt-6">
                    <v-btn style="color: #fff; background-color: #777" @click="patchUser()" :loading="loading" :disabled="!valid || !changeCheck">
                        Submit Changes
                    </v-btn>
                </v-layout>
            </v-form>
        </v-container>
    </div>
</template>
<script>
    import Utilities from "../components/common/Utilities"
    import Requests from "../components/common/Requests"

    export default {
        name: 'AdminManagement',
        mixins: [Utilities],
        data: () => ({
            loading: true,
            usersData: [],
            options: [],
            currentItem: null,
            valid: false,
            password: null,
            emailError: null,
            user: {
                isAdmin: null,
                email: null,
                username: null
            },
            passwordRules: [
                value => value === null || value === "" || value.length >= 8 || "A minimum of 8 characters is required",
                value => value === null || value === "" || value.length <= 32 || "Password exceeds 32 characters",
                value => value === null || value === "" || Utilities.PASSWORD_PATTERN.test(value) || "Needs to include at least one lowercase and uppercase letter, a number and a symbol"
            ],
            emailRules:[
                value => Utilities.EMAIL_PATTERN.test(value) || "Enter valid e-mail"
            ],
        }),
        methods: {
            patchUser() {
                if (this.$refs.form.validate()) {
                    this.user.email = (this.user.email && this.user.email.trim === "") ? null : this.user.email;
                    this.password = (this.password && this.password.trim === "") ? null : this.password;

                    this.loading = true;
                    this.patchUserAsync();
                }
            },
            async patchUserAsync() {
                this.emailError = await Requests.registrationHeadAsync({email: this.user.email}, "email");

                if (this.emailError.length === 0) {
                    const index = this.options.indexOf(this.currentItem);
                    let jsonPatch = {};

                    if (this.user.email !== this.usersData[index].email) {
                        jsonPatch.email = this.user.email;
                    }
                    if (this.user.isAdmin !== this.usersData[index].isAdmin) {
                        jsonPatch.is_admin = this.user.isAdmin;
                    }
                    if (this.password) {
                        jsonPatch.password = Utilities.methods.hashString(this.password);
                    }

                    let response = await Requests.patchUsersInfo(jsonPatch, this.user.username);

                    if (!response.error) {
                        response = await Requests.getUsersInfosAsync();

                        if (!response.error) {
                            this.currentItem = null;
                            this.usersData = [];
                            this.options = [];
                            this.password = null;
                            this.usersData = response.data["users"];

                            for (let i = 0; i < this.usersData.length; i++) {
                                this.options.push(this.usersData[i]["lastName"] + ", " + this.usersData[i]["firstName"] + " (" + this.usersData[i]["username"] + ")")
                            }
                        }
                    }
                }

                this.loading = false;
            }
        },
        computed: {
            changeCheck: function() {
                const index = this.options.indexOf(this.currentItem);

                return this.user.isAdmin !== this.usersData[index].isAdmin || this.user.email !== this.usersData[index].email ||
                    (this.password && this.password.trim() !== "");
            }
        },
        watch: {
            user() {
                this.emailError = null
            },
            currentItem(val) {
                if (val) {
                    const index = this.options.indexOf(val);
                    this.user.isAdmin = this.usersData[index].isAdmin;
                    this.user.email = this.usersData[index].email;
                    this.user.username = this.usersData[index].username;
                    this.password = null;
                }
            }
        },
        mounted: async function() {
            let response = await Requests.getUsersInfosAsync();

            if (!response.error) {
                this.usersData = response.data["users"];

                for (let i = 0; i < this.usersData.length; i++) {
                    this.options.push(this.usersData[i]["lastName"] + ", " + this.usersData[i]["firstName"] + " (" + this.usersData[i]["username"]+")")
                }

                this.loading = false;
            }
        },
    }
</script>

<style scoped>

</style>
