<template>
    <v-layout justify-center fill-height pt-5 wrap style="min-width: 110%; margin-left: -3%">
        <v-card height="500px" width="1000px" flat outlined style="padding-left: 20px; padding-right: 20px; border-radius: 10px">
            <v-container fluid>
                <v-row>
                    <v-col style="max-width: 300px!important;">
                        <v-layout style="border-right: solid grey 1px;">
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
                        </v-layout>
                    </v-col>
                    <v-col>
                        <v-layout justify-center>
                            <span>Profile</span>
                        </v-layout>
                        <v-form ref="form" v-if='menuPosition === "editProfile"' v-model="validProfile">
                            <v-container>
                                <v-row>
                                    <v-col md="5">
                                        <v-text-field v-model="firstname" :rules="[rules.fieldRequired, rules.maxLength]" label="First name"/>
                                    </v-col>
                                    <v-col md="5">
                                        <v-text-field v-model="lastname" :rules="[rules.fieldRequired, rules.maxLength]" label="Last name"/>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col md="6">
                                        <v-text-field v-model="email" :rules="[rules.fieldRequired, rules.validEmail]" label="E-mail"/>
                                    </v-col>
                                    <v-col md="4">
                                        <v-text-field v-model="phoneNumber" :rules="[rules.validPhoneNumber]" label="Phone Number"/>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col md="10">
                                        <v-text-field v-model="shippingAddress" label="Shipping Address"/>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col>
                                        <v-btn :disabled="!validProfile" class="mt-5" @click="validate">
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
</template>

<script>
    import Utilities from "../components/common/Utilities"

    export default {
        name: "AccountUpdation",
        mixins:[Utilities],
        data: () => ({
            menuPosition: 'editProfile',
            validProfile: false,
            validPassword: false,
            links: [
                { icon: 'edit', text: 'Edit profile', strVal: 'editProfile' },
                { icon: 'far fa-user-circle', text: 'Manage password', strVal: 'managePassword' },
                { icon: 'security', text: 'Security', strVal: 'security' },
                { icon: 'info', text: 'About', strVal: 'about' }
            ],
            firstname: "",          //
            lastname: "",           //
            email: "",              //
            phoneNumber: "",        //TODO: Add default values from back-end
            shippingAddress: "",    //
            newPassword: "",
            passwordConfirm: "",
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
                    //TODO: Connect to back-end
                }
            }
        },
        computed: {
            passwordCheck() {
                return v => (v === this.newPassword) || "Passwords do not match";
            }
        },
        watch: {
            menuPosition: function(v) {
                if (this.$refs.form) {
                    this.$refs.form.resetValidation();
                    if (v === "managePassword") {
                        this.newPassword = "";
                        this.passwordConfirm = "";
                    }
                }
            }
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
