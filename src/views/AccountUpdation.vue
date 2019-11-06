<template>
    <v-row>
        <v-layout justify-center fill-height pt-5 wrap style="min-width: 110%; margin-left: -3%">
            <v-card width="1000px" flat outlined style="padding-left: 20px; padding-right: 20px; border-radius: 10px">
                <v-container fluid>
                    <v-row>
                        <v-col style="border-right: solid grey 1px; max-width: 300px!important;">
                            <v-list>
                                <span class="title font-weight-medium" style="color:#616161">Account settings</span>
                                <v-list-item v-for="link in links" :key="link.text" @click="menuPosition = link.strVal"
                                             v-bind:class="{ activeListItem: isMenuComponentActive(link.strVal) }">
                                    <v-list-item-action>
                                        <v-icon>{{link.icon}}</v-icon>
                                    </v-list-item-action>
                                    <v-list-item-content>
                                        <v-list-item-title>
                                            {{link.text}}
                                        </v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list>
                        </v-col>
                        <v-col>
                            <v-form ref="form" v-if='menuPosition === "editProfile"' v-model="validProfile">
                                <v-container>
                                    <v-row>
                                        <v-col md="5">
                                            <v-text-field v-model="firstName" :rules="[rules.fieldRequired, rules.maxLength]" label="First name"/>
                                        </v-col>
                                        <v-col md="6">
                                            <v-text-field v-model="lastName" :rules="[rules.fieldRequired, rules.maxLength]" label="Last name"/>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col md="7">
                                            <v-text-field v-model="email" :rules="[rules.fieldRequired, rules.validEmail]" label="E-mail"/>
                                        </v-col>
                                        <v-col md="4">
                                            <v-text-field v-model="phoneNumber" :rules="[rules.validPhoneNumber]" label="Phone Number"/>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col md="11">
                                            <span class="caption font-weight-light">Saved shipping addresses</span>
                                            <v-divider></v-divider>
                                            <v-expansion-panels class="mt-2" focusable>
                                                <v-expansion-panel>
                                                    <v-expansion-panel-header>Address 1</v-expansion-panel-header>
                                                    <v-expansion-panel-content>
                                                        <v-text-field class="my-0" label="Line 1"/>
                                                        <v-text-field class="my-0 py-0" label="Line 2"/>
                                                        <v-row>
                                                            <v-col md="6" class="my-0 py-0">
                                                                <v-text-field class="my-0 py-0" label="Country"/>
                                                            </v-col>
                                                            <v-col md="6" class="my-0 py-0">
                                                                <v-text-field class="my-0 py-0" label="State/Province" />
                                                            </v-col>
                                                        </v-row>
                                                        <v-row>
                                                            <v-col md="6" class="my-0 py-0">
                                                                <v-text-field class="my-0 py-0" label="City"/>
                                                            </v-col>
                                                            <v-col md="6" class="my-0 py-0">
                                                                <v-text-field class="my-0 py-0" label="Postal Code" />
                                                            </v-col>
                                                        </v-row>
                                                    </v-expansion-panel-content>
                                                </v-expansion-panel>
                                                <v-expansion-panel>
                                                    <v-expansion-panel-header>Address 2</v-expansion-panel-header>
                                                    <v-expansion-panel-content>
                                                        <v-text-field class="my-0" label="Line 1"/>
                                                        <v-text-field class="my-0 py-0" label="Line 2"/>
                                                        <v-row>
                                                            <v-col md="6" class="my-0 py-0">
                                                                <v-text-field class="my-0 py-0" label="Country"/>
                                                            </v-col>
                                                            <v-col md="6" class="my-0 py-0">
                                                                <v-text-field class="my-0 py-0" label="State/Province" />
                                                            </v-col>
                                                        </v-row>
                                                        <v-row>
                                                            <v-col md="6" class="my-0 py-0">
                                                                <v-text-field class="my-0 py-0" label="City"/>
                                                            </v-col>
                                                            <v-col md="6" class="my-0 py-0">
                                                                <v-text-field class="my-0 py-0" label="Postal Code" />
                                                            </v-col>
                                                        </v-row>
                                                    </v-expansion-panel-content>
                                                </v-expansion-panel>
                                                <v-expansion-panel>
                                                    <v-expansion-panel-header>Address 3</v-expansion-panel-header>
                                                    <v-expansion-panel-content>
                                                        <v-text-field class="my-0" label="Line 1"/>
                                                        <v-text-field class="my-0 py-0" label="Line 2"/>
                                                        <v-row>
                                                            <v-col md="6" class="my-0 py-0">
                                                                <v-text-field class="my-0 py-0" label="Country"/>
                                                            </v-col>
                                                            <v-col md="6" class="my-0 py-0">
                                                                <v-text-field class="my-0 py-0" label="State/Province" />
                                                            </v-col>
                                                        </v-row>
                                                        <v-row>
                                                            <v-col md="6" class="my-0 py-0">
                                                                <v-text-field class="my-0 py-0" label="City"/>
                                                            </v-col>
                                                            <v-col md="6" class="my-0 py-0">
                                                                <v-text-field class="my-0 py-0" label="Postal Code" />
                                                            </v-col>
                                                        </v-row>
                                                    </v-expansion-panel-content>
                                                </v-expansion-panel>
                                            </v-expansion-panels>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col>
                                            <v-btn :disabled="!validProfile || changeCheck" class="mt-5" @click="validate">
                                                Save
                                            </v-btn>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-form>
                            <v-form ref="form" v-if='menuPosition === "managePassword"' v-model="validPassword">
                                <v-container>
                                    <v-row>
                                        <v-col md="4">
                                            <v-text-field type="password" :rules="[rules.fieldRequired]" label="Current Password"/>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col md="4">
                                            <v-text-field type="password" v-model="newPassword" @focus="passwordConfirm = ''" :rules="[rules.fieldRequired, rules.passwordLength, rules.validPassword]" label="New Password"/>
                                        </v-col>
                                        <v-col md="4">
                                            <v-text-field :disabled="!newPassword" type="password" v-model="passwordConfirm" :rules="[rules.fieldRequired, passwordCheck]" label="Confirm Password"/>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col>
                                            <v-btn :disabled="!validPassword" class="mt-5" @click="validate">
                                                Submit
                                            </v-btn>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-form>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card>
        </v-layout>
    </v-row>
</template>

<script>
    import Utilities from "../components/common/Utilities";
    import {APICall} from "../components/common/API";

    export default {
        name: "AccountUpdation",
        mixins:[Utilities],
        data: () => ({
            menuPosition: null,
            validProfile: false,
            validPassword: false,
            links: [
                { icon: 'edit', text: 'Edit profile', strVal: 'editProfile' },
                { icon: 'far fa-user-circle', text: 'Manage password', strVal: 'managePassword' },
                { icon: 'security', text: 'Security', strVal: 'security' },
                { icon: 'info', text: 'About', strVal: 'about' }
            ],
            // jsonData: {
            //     firstName: null,
            //     lastName: null,
            //     email: null,             //Thinking about having everything stored like this to begin with
            //     phoneNumber: null,
            //     shippingAddress: null,
            //     newPassword: null
            // },
            firstName: null,
            lastName: null,           //
            email: null,              //
            phoneNumber: null,        //TODO: Add default values from back-end
            shippingAddress: null,    //
            newPassword: null,
            passwordConfirm: null,
            rules: {
                fieldRequired: v => !!v || "Required",
                maxLength: v => !!v && (v.length <= 26 || "Must be less than 26 characters"),
                validEmail: v => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || "E-mail must be valid",
                validPhoneNumber: v => !!v && (/^(\()?\d{3}(\))?(-|\s)?[2-9]\d{2}(-|\s)\d{4}$/.test(v) || "Phone number must be valid"),
                validPassword: v => /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(v) || "Needs to include a letter, a number and a symbol",
                passwordLength: v => !!v && (v.length >= 8 || "Password must be at least 8 characters long")
            }
        }),
        methods: {
            isMenuComponentActive(position){
                return this.menuPosition === position;
            },
            validate() {
                if (this.$refs.form.validate()) {
                    let jsonData = {};

                    if (this.firstName !== this.getUserData("firstName")) {
                        jsonData.firstName = this.firstName;
                    }
                    if (this.lastName !== this.getUserData("lastName")) {
                        jsonData.lastName = this.lastName;
                    }
                    if (this.email !== this.getUserData("email")) {
                        jsonData.email = this.email;
                    }

                    const SUCCESS = 200;
                    const FAILED = 400;

                    let call = new APICall("PATCH", "users/self", jsonData, [SUCCESS, FAILED]);
                    call.performRequest()
                        .then(response => {     //This fails
                            switch (response.status) {
                                case SUCCESS: {
                                    this.$store.commit("login", response.data);
                                    this.return();
                                } break;

                                case FAILED: {
                                    console.error(response.status, response.data.message); //400 Unauthorized Access
                                } break;
                            }
                        });
                }
            }
        },
        computed: {
            passwordCheck() {
                return v => (v === this.newPassword) || "Passwords do not match";
            },
            changeCheck() {
                return (this.firstName === this.getUserData("firstName") && this.lastName === this.getUserData("lastName") && this.email === this.getUserData("email"))
            }
        },
        watch: {
            menuPosition: function(v) {
                if (this.$refs.form) {
                    this.$refs.form.resetValidation();
                    if (v === "editProfile") {
                        this.firstName = this.getUserData("firstName");
                        this.lastName = this.getUserData("lastName");
                        this.email = this.getUserData("email");
                    }
                    else if (v === "managePassword") {
                        this.newPassword = null;
                        this.passwordConfirm = null;
                    }
                }
            }
        },
        mounted() {
            this.firstName = this.getUserData("firstName");
            this.lastName = this.getUserData("lastName");
            this.email = this.getUserData("email");
        }
    }
</script>

<style>
    .activeListItem {
        border-left: solid #FF8F00;
    }

    .activeListItem .v-list-item__title, .activeListItem .v-list-item__action .v-icon {
        color: #FF8F00;
    }
</style>
