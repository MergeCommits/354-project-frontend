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
                        <v-form v-if='menuPosition === "editProfile"' v-model="valid">
                            <v-container>
                                <v-row>
                                    <v-col md="5">
                                        <v-text-field required v-model="firstname" :rules="nameRules" label="First name"/>
                                    </v-col>
                                    <v-col md="5">
                                        <v-text-field required v-model="lastname" :rules="nameRules" label="Last name"/>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col md="6">
                                        <v-text-field required v-model="email" :rules="emailRules" label="E-mail"/>
                                    </v-col>
                                    <v-col md="4">
                                        <v-text-field v-model="phoneNumber" :rules="phoneNumberRules" label="Phone Number"/>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col md="10">
                                        <v-text-field v-model="shippingAddress" :rules="shippingAddressRules" label="Shipping Address"/>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col>
                                        <v-btn :disabled="!valid" class="mt-5" @click="validate()">
                                            Save
                                        </v-btn>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-form>
                        <v-form v-if='menuPosition === "managePassword"' v-model="valid">
                            <v-container>
                                <v-row>
                                    <v-col md="4">
                                        <v-text-field required label="Old Password"/>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col md="4">
                                        <v-text-field required :rules="passwordRules" label="New Password"/>
                                    </v-col>
                                    <v-col md="4">
                                        <v-text-field required :rules="passwordRules" label="Confirm Password"/>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col>
                                        <v-btn :disabled="!valid" class="mt-5" @click="validate()">
                                            Save
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
            links: [
                { icon: 'edit', text: 'Edit profile', strVal: 'editProfile' },
                { icon: 'far fa-user-circle', text: 'Manage password', strVal: 'managePassword' },
                { icon: 'security', text: 'Security', strVal: 'security' },
                { icon: 'info', text: 'About', strVal: 'about' }
            ],
            valid: false,
            firstname: "",  //TODO: Default to the registered name
            lastname: "",
            nameRules: [
                v => !!v || "Full name is required",
                v => v.length <= 26 || "Name must be less than 26 characters",
            ],
            email: "",  //TODO: Default to the registered e-mail
            emailRules: [
                v => !!v || "E-mail is required",
                v => /.+@.+/.test(v) || "E-mail must be valid"
            ],
            phoneNumber: "",
            phoneNumberRules: [
                v => !v || /^(\()?\d{3}(\))?(-|\s)?[2-9]\d{2}(-|\s)\d{4}$/.test(v) || "Phone number must be valid"
            ],
            shippingAddress: "",
            shippingAddressRules: [

            ],
            passwordRules: [

            ]
        }),
        methods: {
            isMenuComponentActive(position){
                return this.menuPosition === position;
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
