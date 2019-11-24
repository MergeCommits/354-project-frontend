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
                            <v-container v-if='menuPosition === "editProfile"'>
                                <v-form ref="form" v-model="validProfile">
                                    <v-row>
                                        <v-col md="5">
                                            <v-text-field v-model="jsonProfileData.first_name" :disabled="mainLoading" :rules="[rules.fieldRequired, rules.maxLength]" label="First name"/>
                                        </v-col>
                                        <v-col md="6">
                                            <v-text-field v-model="jsonProfileData.last_name" :disabled="mainLoading" :rules="[rules.fieldRequired, rules.maxLength]" label="Last name"/>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col md="7">
                                            <v-text-field v-model="jsonProfileData.email" :disabled="mainLoading" :rules="[rules.fieldRequired, rules.validEmail]" label="E-mail"/>
                                        </v-col>
<!--                                        <v-col md="4">-->
<!--                                            <v-text-field v-model="jsonProfileData.phoneNumber" :rules="[rules.validPhoneNumber]" label="Phone Number"/>-->
<!--                                        </v-col>-->
                                    </v-row>
                                    <v-row>
                                        <v-col>
                                            <v-btn :disabled="!validProfile || profileChangeCheck" @click="validate">
                                                Save
                                            </v-btn>
                                        </v-col>
                                    </v-row>
                                </v-form>
                                <v-row>
                                    <v-col md="11">
                                        <span class="caption font-weight-light">Saved shipping addresses</span>
                                        <v-divider></v-divider>
                                        <v-expansion-panels class="mt-2" focusable>
                                            <v-expansion-panel>
                                                <v-expansion-panel-header>Address 1</v-expansion-panel-header>
                                                <v-expansion-panel-content>
                                                    <v-form ref="addressForm1" v-model="validAddress[0]">
                                                        <v-text-field v-model="addresses[0].line1" :rules="[rules.fieldRequired]" class="my-0" label="Line 1"/>
                                                        <v-text-field v-model="addresses[0].line2" class="my-0 py-0" label="Line 2"/>
                                                        <v-row>
                                                            <v-col md="6" class="my-0 py-0">
                                                                <v-text-field v-model="addresses[0].country" :rules="[rules.fieldRequired]" class="my-0 py-0" label="Country"/>
                                                            </v-col>
                                                            <v-col md="6" class="my-0 py-0">
                                                                <v-text-field v-model="addresses[0].state" :rules="[rules.fieldRequired]" class="my-0 py-0" label="State/Province" />
                                                            </v-col>
                                                        </v-row>
                                                        <v-row>
                                                            <v-col md="6" class="my-0 py-0">
                                                                <v-text-field v-model="addresses[0].city" :rules="[rules.fieldRequired]" class="my-0 py-0" label="City"/>
                                                            </v-col>
                                                            <v-col md="6" class="my-0 py-0">
                                                                <v-text-field v-model="addresses[0].postalCode" :rules="[rules.fieldRequired]" class="my-0 py-0" label="Postal Code" />
                                                            </v-col>
                                                        </v-row>
                                                        <v-btn :disabled="!validAddress[0] || !addressChangeCheck(0, addresses[0])" :loading="addressesLoading[0]" @click="saveAddress(0, addresses[0])">
                                                            Save
                                                        </v-btn>
                                                        <v-btn :disabled="addressesLoading[0] || addressCheck(0)" class="mx-4" @click="deleteAddress(0)">
                                                            Delete
                                                        </v-btn>
                                                        <v-btn :disabled="addressesLoading[0] || !clearCheck(0)" @click="clearForm(0)">
                                                            Clear
                                                        </v-btn>
                                                    </v-form>
                                                </v-expansion-panel-content>
                                            </v-expansion-panel>
                                            <v-expansion-panel>
                                                <v-expansion-panel-header>Address 2</v-expansion-panel-header>
                                                <v-expansion-panel-content>
                                                    <v-form ref="addressForm2" v-model="validAddress[1]">
                                                        <v-text-field v-model="addresses[1].line1" :rules="[rules.fieldRequired]" class="my-0" label="Line 1"/>
                                                        <v-text-field v-model="addresses[1].line2" class="my-0 py-0" label="Line 2"/>
                                                        <v-row>
                                                            <v-col md="6" class="my-0 py-0">
                                                                <v-text-field v-model="addresses[1].country" :rules="[rules.fieldRequired]" class="my-0 py-0" label="Country"/>
                                                            </v-col>
                                                            <v-col md="6" class="my-0 py-0">
                                                                <v-text-field v-model="addresses[1].state" :rules="[rules.fieldRequired]" class="my-0 py-0" label="State/Province" />
                                                            </v-col>
                                                        </v-row>
                                                        <v-row>
                                                            <v-col md="6" class="my-0 py-0">
                                                                <v-text-field v-model="addresses[1].city" :rules="[rules.fieldRequired]" class="my-0 py-0" label="City"/>
                                                            </v-col>
                                                            <v-col md="6" class="my-0 py-0">
                                                                <v-text-field v-model="addresses[1].postalCode" :rules="[rules.fieldRequired]" class="my-0 py-0" label="Postal Code" />
                                                            </v-col>
                                                        </v-row>
                                                        <v-btn :disabled="!validAddress[1] || !addressChangeCheck(1, addresses[1])" :loading="addressesLoading[1]" @click="saveAddress(1, addresses[1])">
                                                            Save
                                                        </v-btn>
                                                        <v-btn :disabled="addressesLoading[1] || addressCheck(1)" class="mx-4" @click="deleteAddress(1)">
                                                            Delete
                                                        </v-btn>
                                                        <v-btn :disabled="addressesLoading[1] || !clearCheck(1)" @click="clearForm(1)">
                                                            Clear
                                                        </v-btn>
                                                    </v-form>
                                                </v-expansion-panel-content>
                                            </v-expansion-panel>
                                            <v-expansion-panel>
                                                <v-expansion-panel-header>Address 3</v-expansion-panel-header>
                                                <v-expansion-panel-content>
                                                    <v-form ref="addressForm3" v-model="validAddress[2]">
                                                        <v-text-field v-model="addresses[2].line1" :rules="[rules.fieldRequired]" class="my-0" label="Line 1"/>
                                                        <v-text-field v-model="addresses[2].line2" class="my-0 py-0" label="Line 2"/>
                                                        <v-row>
                                                            <v-col md="6" class="my-0 py-0">
                                                                <v-text-field v-model="addresses[2].country" :rules="[rules.fieldRequired]" class="my-0 py-0" label="Country"/>
                                                            </v-col>
                                                            <v-col md="6" class="my-0 py-0">
                                                                <v-text-field v-model="addresses[2].state" :rules="[rules.fieldRequired]" class="my-0 py-0" label="State/Province" />
                                                            </v-col>
                                                        </v-row>
                                                        <v-row>
                                                            <v-col md="6" class="my-0 py-0">
                                                                <v-text-field v-model="addresses[2].city" :rules="[rules.fieldRequired]" class="my-0 py-0" label="City"/>
                                                            </v-col>
                                                            <v-col md="6" class="my-0 py-0">
                                                                <v-text-field v-model="addresses[2].postalCode" :rules="[rules.fieldRequired]" class="my-0 py-0" label="Postal Code" />
                                                            </v-col>
                                                        </v-row>
                                                        <v-btn :disabled="!validAddress[2] || !addressChangeCheck(2, addresses[2])" :loading="addressesLoading[2]" @click="saveAddress(2, addresses[2])">
                                                            Save
                                                        </v-btn>
                                                        <v-btn :disabled="addressesLoading[2] || addressCheck(2)" class="mx-4" @click="deleteAddress(2)">
                                                            Delete
                                                        </v-btn>
                                                        <v-btn :disabled="addressesLoading[2] || !clearCheck(2)" @click="clearForm(2)">
                                                            Clear
                                                        </v-btn>
                                                    </v-form>
                                                </v-expansion-panel-content>
                                            </v-expansion-panel>
                                        </v-expansion-panels>
                                    </v-col>
                                </v-row>
                            </v-container>
                            <v-form ref="form" v-if='menuPosition === "managePassword"' v-model="validPassword">
                                <v-container>
                                    <v-row>
                                        <v-col md="4">
                                            <v-text-field v-model="jsonProfileData.current_password" type="password" :rules="[rules.fieldRequired]" label="Current Password"/>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col md="4">
                                            <v-text-field type="password" v-model="jsonProfileData.password" @focus="passwordConfirm = ''" :rules="[rules.fieldRequired, rules.passwordLength, rules.validPassword]" label="New Password"/>
                                        </v-col>
                                        <v-col md="4">
                                            <v-text-field :disabled="!jsonProfileData.password || mainLoading" type="password" v-model="passwordConfirm" :rules="[rules.fieldRequired, passwordCheck]" label="Confirm Password"/>
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
    import Requests from "../components/common/Requests";

    export default {
        name: "AccountUpdation",
        mixins:[Utilities],
        data: () => ({
            mainLoading: false,
            addressesLoading: [false, false, false],
            menuPosition: null,
            validProfile: false,
            validPassword: false,
            validAddress: [false, false, false],
            passwordConfirm: null,
            links: [
                { icon: 'edit', text: 'Edit profile', strVal: 'editProfile' },
                { icon: 'far fa-user-circle', text: 'Manage password', strVal: 'managePassword' },
                { icon: 'security', text: 'Security', strVal: 'security' },
                { icon: 'info', text: 'About', strVal: 'about' }
            ],
            jsonProfileData: {
                first_name: null,
                last_name: null,
                email: null,
                // phoneNumber: null,
                current_password: null,
                password: null
            },
            addresses: [
                {
                    line1: null,
                    line2: "",
                    country: null,
                    state: null,
                    city: null,
                    postalCode: null
                },
                {
                    line1: null,
                    line2: "",
                    country: null,
                    state: null,
                    city: null,
                    postalCode: null
                },
                {
                    line1: null,
                    line2: "",
                    country: null,
                    state: null,
                    city: null,
                    postalCode: null
                }
            ],
            rules: {
                fieldRequired: v => !!v || "Required",
                maxLength: v => !!v && (v.length <= Utilities.MAX_NAME_CHARACTERS || "Must be less than 26 characters"),
                validEmail: v => Utilities.EMAIL_PATTERN.test(v) || "E-mail must be valid",
                validPhoneNumber: v => !!v && (/^(\()?\d{3}(\))?(-|\s)?[2-9]\d{2}(-|\s)\d{4}$/.test(v) || "Phone number must be valid"),
                validPassword: v => Utilities.PASSWORD_PATTERN.test(v) || "Needs to include at least one lowercase and uppercase letter, a number and a symbol",
                passwordLength: v => !!v && (v.length >= 8 || "Password must be at least 8 characters long")
            }
        }),
        methods: {
            isMenuComponentActive(position){
                return this.menuPosition === position;
            },
            validate() {
                this.mainLoading = true;
                this.validateAsync();
            },
            async validateAsync() {
                if (this.$refs.form.validate()) {

                    let response = await Requests.updateSelfAsync(this.jsonProfileData);

                    if (!response.error) {
                        this.$store.commit("login", response.data);
                        this.mainLoading = false;
                    } else {
                        this.mainLoading = false;
                        alert("Something went wrong with updating your info. Please try again in a moment.");
                    }
                }
            },
            saveAddress(index, address) {
                this.addressesLoading[index] = true;
                this.saveAddressAsync(index, address);
            },
            async saveAddressAsync(index, address) {
                let addr = this.getUserData("addresses");

                if (addr && addr[index]) {
                    let response = await Requests.updateShippingAddress([[index, address]]);

                    if (!response.error) {
                        this.$store.commit("login", response.data);
                        this.addressesLoading[index] = false;
                    } else {
                        this.addressesLoading[index] = false;
                        alert("Something went wrong with updating your info. Please try again in a moment.");
                    }
                }
                else {
                    let response = await Requests.addShippingAddress([address]);

                    if (!response.error) {
                        this.$store.commit("login", response.data);
                        this.addressesLoading[index] = false;
                    } else {
                        this.addressesLoading[index] = false;
                        alert("Something went wrong with updating your info. Please try again in a moment.");
                    }
                }
            },
            deleteAddress(index) {
                this.addressesLoading[index] = true;
                this.deleteAddressAsync(index);
            },
            async deleteAddressAsync(index) {
                let addr = this.getUserData("addresses");

                if (addr[index]) {
                    let response = await Requests.deleteShippingAddress(index);

                    if (!response.error) {
                        this.$store.commit("login", response.data);
                        this.addressesLoading[index] = false;
                    } else {
                        this.addressesLoading[index] = false;
                        alert("Something went wrong with updating your info. Please try again in a moment.");
                    }
                }
            },
            clearForm(index) {
                switch(index) {
                    case 0:
                        this.$refs.addressForm1.reset();
                        break;
                    case 1:
                        this.$refs.addressForm2.reset();
                        break;
                    case 2:
                        this.$refs.addressForm3.reset();
                        break;
                }
            },
            importUserAddresses(addr) {
                let i = 0;

                while(addr[i]) {
                    this.addresses[i].line1 = addr[i].line1;
                    this.addresses[i].line2 = addr[i].line2 ? addr[i].line2 : null;
                    this.addresses[i].country = addr[i].country;
                    this.addresses[i].state = addr[i].state;
                    this.addresses[i].city = addr[i].city;
                    this.addresses[i].postalCode = addr[i].postalCode;

                    i++;
                }
            },
            addressChangeCheck(index, address) {
                let addr = this.getUserData("addresses");

                if (addr) {
                    return (address.line1 !== addr[index].line1 || address.line2 !== addr[index].line2 || address.country !== addr[index].country
                        || address.state !== addr[index].state || address.city !== addr[index].city || address.postalCode !== addr[index].postalCode);
                }
                else {
                    return false;
                }
            },
            clearCheck(index) {
                return !Utilities.isEmpty(this.addresses[index].line1) || !Utilities.isEmpty(this.addresses[index].line2)|| !Utilities.isEmpty(this.addresses[index].country)
                    || !Utilities.isEmpty(this.addresses[index].state)|| !Utilities.isEmpty(this.addresses[index].city) || !Utilities.isEmpty(this.addresses[index].postalCode);
            },
            addressCheck(index) {
                return !(!!this.getUserData("addresses") && !!this.getUserData("addresses")[index]);
            }
        },
        computed: {
            passwordCheck() {
                return v => (v === this.jsonProfileData.password) || "Passwords do not match";
            },
            profileChangeCheck() {
                return (this.jsonProfileData.first_name === this.getUserData("firstName") && this.jsonProfileData.last_name === this.getUserData("lastName") && this.jsonProfileData.email === this.getUserData("email"))
            }
        },
        watch: {
            menuPosition: function(v) {
                if (this.$refs.form) {
                    this.$refs.form.resetValidation();
                    if (v === "editProfile") {
                        this.jsonProfileData.first_name = this.getUserData("firstName");
                        this.jsonProfileData.last_name = this.getUserData("lastName");
                        this.jsonProfileData.email = this.getUserData("email");
                        // this.jsonProfileData.phoneNumber = this.getUserData("phoneNumber");
                    }
                    else if (v === "managePassword") {
                        /*this.jsonProfileData.current_password = null;
                        this.jsonProfileData.password = null;
                        this.passwordConfirm = null;*/
                        this.$refs.form.reset();
                    }
                }
            }
        },
        mounted() {
            this.jsonProfileData.first_name = this.getUserData("firstName");
            this.jsonProfileData.last_name = this.getUserData("lastName");
            this.jsonProfileData.email = this.getUserData("email");

            if (this.getUserData("addresses")) {
                this.importUserAddresses(this.getUserData("addresses"));
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
