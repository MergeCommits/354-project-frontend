<template>
    <v-row>
        <v-layout justify-center fill-height pt-5 wrap style="min-width: 110%; margin-left: -3%">
            <v-card width="1000px" flat outlined style="padding-left: 20px; padding-right: 20px; border-radius: 10px">
                <v-container fluid>
                    <v-row>
                        <v-col style="border-right: solid grey 1px; max-width: 300px!important;">
                            <v-list>
                                <span class="title font-weight-medium" style="color:#616161; margin-bottom: 15px">Account settings</span>
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
                                <span class="title font-weight-light">Profile </span>
                                <v-divider/>
                                <v-form ref="form" v-model="validProfile">
                                    <v-row>
                                        <v-col md="5">
                                            <v-text-field v-model="first_name" :disabled="mainLoading"
                                                          :rules="[rules.fieldRequired, rules.maxLength]"
                                                          label="First name"/>
                                        </v-col>
                                        <v-col md="6">
                                            <v-text-field v-model="last_name" :disabled="mainLoading"
                                                          :rules="[rules.fieldRequired, rules.maxLength]"
                                                          label="Last name"/>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col md="7">
                                            <v-text-field v-model="email" :disabled="mainLoading"
                                                          :rules="[rules.fieldRequired, rules.validEmail]"
                                                          :error-messages="emailError" label="E-mail"/>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col md="4">
                                            <v-text-field v-model="current_password" :disabled="mainLoading"
                                                          :loading="mainLoading" type="password" @keyup.enter="validate"
                                                          :rules="[rules.fieldRequired]" :error-messages="passwordError"
                                                          label="Current Password"/>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col>
                                            <v-btn block :disabled="!validProfile || profileChangeCheck"
                                                   :loading="mainLoading" @click="validate">
                                                Update
                                            </v-btn>
                                        </v-col>
                                    </v-row>
                                </v-form>
                                <v-row style="margin-top: 20px">
                                    <v-col md="15">
                                        <span class="title font-weight-light">Saved shipping addresses</span>
                                        <v-divider/>
                                        <v-expansion-panels class="mt-2" v-model="addressPanels"
                                                            :readonly="duringAPICall" focusable>
                                            <v-expansion-panel>
                                                <v-expansion-panel-header>Address 1</v-expansion-panel-header>
                                                <v-expansion-panel-content>
                                                    <v-form ref="addressForm1" v-model="validAddress[0]">
                                                        <v-text-field v-model="addresses[0].line1"
                                                                      :rules="[rules.fieldRequired]" class="my-0"
                                                                      label="Line 1"/>
                                                        <v-text-field v-model="addresses[0].line2" class="my-0 py-0"
                                                                      label="Line 2"/>
                                                        <v-row>
                                                            <v-col md="6" class="my-0 py-0">
                                                                <v-text-field v-model="addresses[0].country"
                                                                              :rules="[rules.fieldRequired]"
                                                                              class="my-0 py-0" label="Country"/>
                                                            </v-col>
                                                            <v-col md="6" class="my-0 py-0">
                                                                <v-text-field v-model="addresses[0].state"
                                                                              :rules="[rules.fieldRequired]"
                                                                              class="my-0 py-0" label="State/Province"/>
                                                            </v-col>
                                                        </v-row>
                                                        <v-row>
                                                            <v-col md="6" class="my-0 py-0">
                                                                <v-text-field v-model="addresses[0].city"
                                                                              :rules="[rules.fieldRequired]"
                                                                              class="my-0 py-0" label="City"/>
                                                            </v-col>
                                                            <v-col md="6" class="my-0 py-0">
                                                                <v-text-field v-model="addresses[0].postalCode"
                                                                              :rules="[rules.fieldRequired]"
                                                                              class="my-0 py-0" label="Postal Code"/>
                                                            </v-col>
                                                        </v-row>
                                                        <v-btn :disabled="!validAddress[0] || addressesLoading[0][1] || !addressChangeCheck(0, addresses[0])"
                                                               :loading="addressesLoading[0][0]"
                                                               @click="saveAddress(0, addresses[0])">
                                                            Save
                                                        </v-btn>
                                                        <v-btn :disabled="addressesLoading[0][0] || addressCheck(0)"
                                                               :loading="addressesLoading[0][1]" class="mx-4"
                                                               @click="deleteAddress(0)">
                                                            Delete
                                                        </v-btn>
                                                        <v-btn :disabled="addressesLoading[0][0] || addressesLoading[0][1] || !clearCheck(0)"
                                                               @click="clearForm(0)">
                                                            Clear
                                                        </v-btn>
                                                    </v-form>
                                                </v-expansion-panel-content>
                                            </v-expansion-panel>
                                            <v-expansion-panel
                                                    v-if="getUserData('addresses') && getUserData('addresses')[0]">
                                                <v-expansion-panel-header>Address 2</v-expansion-panel-header>
                                                <v-expansion-panel-content>
                                                    <v-form ref="addressForm2" v-model="validAddress[1]">
                                                        <v-text-field v-model="addresses[1].line1"
                                                                      :rules="[rules.fieldRequired]" class="my-0"
                                                                      label="Line 1"/>
                                                        <v-text-field v-model="addresses[1].line2" class="my-0 py-0"
                                                                      label="Line 2"/>
                                                        <v-row>
                                                            <v-col md="6" class="my-0 py-0">
                                                                <v-text-field v-model="addresses[1].country"
                                                                              :rules="[rules.fieldRequired]"
                                                                              class="my-0 py-0" label="Country"/>
                                                            </v-col>
                                                            <v-col md="6" class="my-0 py-0">
                                                                <v-text-field v-model="addresses[1].state"
                                                                              :rules="[rules.fieldRequired]"
                                                                              class="my-0 py-0" label="State/Province"/>
                                                            </v-col>
                                                        </v-row>
                                                        <v-row>
                                                            <v-col md="6" class="my-0 py-0">
                                                                <v-text-field v-model="addresses[1].city"
                                                                              :rules="[rules.fieldRequired]"
                                                                              class="my-0 py-0" label="City"/>
                                                            </v-col>
                                                            <v-col md="6" class="my-0 py-0">
                                                                <v-text-field v-model="addresses[1].postalCode"
                                                                              :rules="[rules.fieldRequired]"
                                                                              class="my-0 py-0" label="Postal Code"/>
                                                            </v-col>
                                                        </v-row>
                                                        <v-btn :disabled="!validAddress[1] || addressesLoading[1][1] || !addressChangeCheck(1, addresses[1])"
                                                               :loading="addressesLoading[1][0]"
                                                               @click="saveAddress(1, addresses[1])">
                                                            Save
                                                        </v-btn>
                                                        <v-btn :disabled="addressesLoading[1][0] || addressCheck(1)"
                                                               :loading="addressesLoading[1][1]" class="mx-4"
                                                               @click="deleteAddress(1)">
                                                            Delete
                                                        </v-btn>
                                                        <v-btn :disabled="addressesLoading[1][0] || addressesLoading[1][1] || !clearCheck(1)"
                                                               @click="clearForm(1)">
                                                            Clear
                                                        </v-btn>
                                                    </v-form>
                                                </v-expansion-panel-content>
                                            </v-expansion-panel>
                                            <v-expansion-panel
                                                    v-if="getUserData('addresses') && getUserData('addresses')[1]">
                                                <v-expansion-panel-header>Address 3</v-expansion-panel-header>
                                                <v-expansion-panel-content>
                                                    <v-form ref="addressForm3" v-model="validAddress[2]">
                                                        <v-text-field v-model="addresses[2].line1"
                                                                      :rules="[rules.fieldRequired]" class="my-0"
                                                                      label="Line 1"/>
                                                        <v-text-field v-model="addresses[2].line2" class="my-0 py-0"
                                                                      label="Line 2"/>
                                                        <v-row>
                                                            <v-col md="6" class="my-0 py-0">
                                                                <v-text-field v-model="addresses[2].country"
                                                                              :rules="[rules.fieldRequired]"
                                                                              class="my-0 py-0" label="Country"/>
                                                            </v-col>
                                                            <v-col md="6" class="my-0 py-0">
                                                                <v-text-field v-model="addresses[2].state"
                                                                              :rules="[rules.fieldRequired]"
                                                                              class="my-0 py-0" label="State/Province"/>
                                                            </v-col>
                                                        </v-row>
                                                        <v-row>
                                                            <v-col md="6" class="my-0 py-0">
                                                                <v-text-field v-model="addresses[2].city"
                                                                              :rules="[rules.fieldRequired]"
                                                                              class="my-0 py-0" label="City"/>
                                                            </v-col>
                                                            <v-col md="6" class="my-0 py-0">
                                                                <v-text-field v-model="addresses[2].postalCode"
                                                                              :rules="[rules.fieldRequired]"
                                                                              class="my-0 py-0" label="Postal Code"/>
                                                            </v-col>
                                                        </v-row>
                                                        <v-btn :disabled="!validAddress[2] || addressesLoading[2][1] || !addressChangeCheck(2, addresses[2])"
                                                               :loading="addressesLoading[2][0]"
                                                               @click="saveAddress(2, addresses[2])">
                                                            Save
                                                        </v-btn>
                                                        <v-btn :disabled="addressesLoading[2][0] || addressCheck(2)"
                                                               :loading="addressesLoading[2][1]" class="mx-4"
                                                               @click="deleteAddress(2)">
                                                            Delete
                                                        </v-btn>
                                                        <v-btn :disabled="addressesLoading[2][0] || addressesLoading[2][1] || !clearCheck(2)"
                                                               @click="clearForm(2)">
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
                                            <v-text-field v-model="current_password" :disabled="mainLoading"
                                                          type="password" :rules="[rules.fieldRequired]"
                                                          :error-messages="passwordError"
                                                          label="Current Password"></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col md="4">
                                            <v-text-field :disabled="mainLoading" type="password" v-model="password"
                                                          @focus="passwordConfirm = ''"
                                                          :rules="[rules.fieldRequired, rules.passwordLength, rules.validPassword]"
                                                          label="New Password"></v-text-field>
                                        </v-col>
                                        <v-col md="4">
                                            <v-text-field :disabled="!password || mainLoading" type="password"
                                                          v-model="passwordConfirm"
                                                          :rules="[rules.fieldRequired, passwordCheck]"
                                                          label="Confirm Password"></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col>
                                            <v-btn :disabled="!validPassword" :loading="mainLoading" class="mt-5"
                                                   @click="validate">
                                                Submit
                                            </v-btn>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-form>
                            <v-container v-if="menuPosition === 'security'">
                                <v-row>
                                    <v-spacer></v-spacer>
                                    <v-icon large>security</v-icon>
                                    <v-spacer></v-spacer>
                                </v-row>
                                <v-row>
                                    <v-col style="margin-left: 15%; margin-right: 15%">
                                        <span>
                                            Our company cyber security policy outlines our guidelines and provisions for preserving the
security of our data and technology infrastructure.
The more we rely on technology to collect, store and manage information, the more vulnerable we
become to severe security breaches. Human errors, hacker attacks and system malfunctions could
cause great financial damage and may jeopardize our company’s reputation.
For this reason, we have implemented a number of security measures. We have also prepared
instructions that may help mitigate security risks. We have outlined both provisions in this policy
                                        </span>
                                    </v-col>
                                </v-row>
                            </v-container>
                            <v-container v-if="menuPosition === 'about'">
                                <v-row>
                                    <v-spacer></v-spacer>
                                    <v-icon large :color="ACCENT_COLOR">fas fa-meteor</v-icon>
                                    <v-spacer></v-spacer>
                                </v-row>
                                <v-row>
                                    <v-col style="margin-left: 15%; margin-right: 15%">
                                        <span>
                                            Welcome to The stars, your number one source for all products. We're dedicated to giving you the very best, with a focus on dependability, customer service and uniqueness.
Founded in 2019 by 354 stars, we have come a long way from our beginnings in the back of a Concordia lab. When we first started out, our passion for eco-friendly code, drove ous to quit her day job, and gave ous the impetus to turn hard work and inspiration into to a booming online store. We now serve customers all over the campus, and are thrilled to be a part of the fair-trade wing of the industry.

We hope you enjoy our products as much as we enjoy offering them to you. If you have any questions or comments, please don't hesitate to contact us.

Sincerely,
The Stars
                                        </span>
                                    </v-col>
                                </v-row>
                            </v-container>
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
        mixins: [Utilities],
        data: () => ({
            mainLoading: false,
            addressesLoading: [[false, false], [false, false], [false, false]],
            menuPosition: 'editProfile',
            validProfile: false,
            validPassword: false,
            validAddress: [false, false, false],
            passwordConfirm: null,
            passwordError: null,
            emailError: null,
            addressPanels: [],
            links: [
                {icon: 'edit', text: 'Edit profile', strVal: 'editProfile'},
                {icon: 'far fa-user-circle', text: 'Manage password', strVal: 'managePassword'},
                {icon: 'security', text: 'Security', strVal: 'security'},
                {icon: 'info', text: 'About', strVal: 'about'}
            ],
            first_name: null,
            last_name: null,
            email: null,
            current_password: null,
            password: null,
            addresses: [
                {
                    line1: null,
                    line2: null,
                    country: null,
                    state: null,
                    city: null,
                    postalCode: null
                },
                {
                    line1: null,
                    line2: null,
                    country: null,
                    state: null,
                    city: null,
                    postalCode: null
                },
                {
                    line1: null,
                    line2: null,
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
                validPassword: v => Utilities.PASSWORD_PATTERN.test(v) || "Needs to include at least one lowercase and uppercase letter, a number and a symbol",
                passwordLength: v => !!v && (v.length >= 8 || "Password must be at least 8 characters long")
            }
        }),
        methods: {
            isMenuComponentActive(position) {
                return this.menuPosition === position;
            },
            validate() {
                this.mainLoading = true;
                this.validateAsync();
            },
            async validateAsync() {
                let jsonData;

                if (!this.password) {
                    jsonData = {
                        first_name: this.first_name,
                        last_name: this.last_name,
                        email: this.email,
                        current_password: Utilities.methods.hashString(this.current_password ? this.current_password : "")
                    }
                }
                else {
                    jsonData = {
                        current_password: Utilities.methods.hashString(this.current_password ? this.current_password : ""),
                        password: Utilities.methods.hashString(this.password)
                    }
                }

                if (this.email !== this.getUserData("email")) {
                    const emailRequest = Requests.registrationHeadAsync({email: this.email}, "email");
                    this.emailError = await emailRequest;
                }

                if (this.emailError.length === 0) {
                    const response = await Requests.updateSelfAsync(jsonData);

                    if (!response.error) {
                        if (response.status === Requests.HttpStatus.SUCCESS) {
                            this.$store.commit("login", response.data);
                            this.current_password = null;

                            if (this.password) {
                                this.$refs.form.reset();
                            }
                            else {
                                this.$refs.form.resetValidation();
                            }

                            this.mainLoading = false;
                        }
                        else {
                            this.passwordError = response.data.message;
                            this.mainLoading = false;
                        }
                    }
                    else {
                        this.mainLoading = false;
                        alert("Something went wrong with updating your info. Please try again in a moment.");
                    }
                }
                else {
                    this.mainLoading = false;
                }
            },
            saveAddress(index, address) {
                this.$set(this.addressesLoading[index], 0, true);

                for (const line in address) {
                    if (!address[line]) {
                        address[line] = "";
                    }
                }

                if (!this.duplicateAddress(address)) {
                    this.saveAddressAsync(index, address);
                }
                else {
                    this.addressPanels = [];
                    this.clearForm(index);
                    this.importUserAddresses(this.getUserData("addresses"));
                    this.$set(this.addressesLoading[index], 0, false);
                }
            },
            async saveAddressAsync(index, address) {
                const addr = this.getUserData("addresses");

                if (addr && addr[index]) {
                    const response = await Requests.updateShippingAddress([[index, address]]);

                    if (!response.error) {
                        this.$store.commit("login", response.data);
                        this.$set(this.addressesLoading[index], 0, false);
                    }
                    else {
                        this.$set(this.addressesLoading[index], 0, false);
                        alert("Something went wrong with updating your info. Please try again in a moment.");
                    }
                }
                else {
                    const response = await Requests.addShippingAddress([address]);

                    if (!response.error) {
                        this.$store.commit("login", response.data);
                        this.resetAddressData();
                        this.importUserAddresses(this.getUserData("addresses"));
                        this.$set(this.addressesLoading[index], 0, false);
                    }
                    else {
                        this.$set(this.addressesLoading[index], 0, false);
                        alert("Something went wrong with updating your info. Please try again in a moment.");
                    }
                }
            },
            deleteAddress(index) {
                this.$set(this.addressesLoading[index], 1, true);
                this.deleteAddressAsync(index);
            },
            async deleteAddressAsync(index) {
                let addr = this.getUserData("addresses");

                if (addr[index]) {
                    const response = await Requests.deleteShippingAddress([index]);

                    if (!response.error) {
                        if (addr[index + 1]) this.addressPanels = [];

                        this.$store.commit("login", response.data);
                        addr = this.getUserData("addresses");
                        this.resetAddressData();
                        this.importUserAddresses(addr);

                        if (addr && addr[1] && this.$refs.addressForm3) {
                            this.$refs.addressForm3.resetValidation();
                        }
                        else if (addr && addr[0] && this.$refs.addressForm2) {
                            this.$refs.addressForm2.resetValidation();
                        }
                        else if (this.$refs.addressForm1) {
                            this.$refs.addressForm1.resetValidation();
                        }

                        this.$set(this.addressesLoading[index], 1, false);
                    }
                    else {
                        this.$set(this.addressesLoading[index], 1, false);
                        alert("Something went wrong with updating your info. Please try again in a moment.");
                    }
                }
            },
            clearForm(index) {
                switch (index) {
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
                if (addr) {
                    addr.forEach((address, index) => Object.assign(this.addresses[index], address));
                }
            },
            addressChangeCheck(index, address) {
                const addr = this.getUserData("addresses");

                if (addr && addr[index]) {
                    return (address.line1 !== addr[index].line1 || address.line2 !== (addr[index].line2 ? addr[index].line2 : "") || address.country !== addr[index].country
                            || address.state !== addr[index].state || address.city !== addr[index].city || address.postalCode !== addr[index].postalCode);
                } else {
                    return true;
                }
            },
            clearCheck(index) {
                return !Utilities.isEmpty(this.addresses[index].line1) || !Utilities.isEmpty(this.addresses[index].line2) || !Utilities.isEmpty(this.addresses[index].country)
                       || !Utilities.isEmpty(this.addresses[index].state) || !Utilities.isEmpty(this.addresses[index].city) || !Utilities.isEmpty(this.addresses[index].postalCode);
            },
            addressCheck(index) {
                return !(!!this.getUserData("addresses") && !!this.getUserData("addresses")[index]);
            },
            resetAddressData() {
                this.addresses.forEach(address => {
                    for (const line in address) {
                        address[line] = null;
                    }
                })
            },
            duplicateAddress(pageAddress) {
                const addr = this.getUserData("addresses");
                let verdict = false;

                if (addr) {
                    addr.forEach(userAddress => {
                        if (!(pageAddress.line1 !== userAddress.line1 || pageAddress.line2 !== userAddress.line2 || pageAddress.country !== userAddress.country
                              || pageAddress.state !== userAddress.state || pageAddress.city !== userAddress.city || pageAddress.postalCode !== userAddress.postalCode)) {
                            verdict = true;
                        }
                    })
                }

                return verdict;
            }
        },
        computed: {
            passwordCheck() {
                return v => (v === this.password) || "Passwords do not match";
            },
            profileChangeCheck() {
                return (this.first_name === this.getUserData("firstName") && this.last_name === this.getUserData("lastName") && this.email === this.getUserData("email"))
            },
            duringAPICall() {
                let verdict = false;

                this.addressesLoading.forEach(panel => {
                    panel.forEach(button => {
                        if (button) verdict = true;
                    })
                });

                return verdict;
            }
        },
        watch: {
            menuPosition: function (v) {
                if (this.$refs.form) {
                    this.$refs.form.resetValidation();
                    if (v === "editProfile") {
                        this.first_name = this.getUserData("firstName");
                        this.last_name = this.getUserData("lastName");
                        this.email = this.getUserData("email");
                        this.addressPanels = [];

                        this.resetAddressData();

                        if (this.getUserData("addresses")) {
                            this.importUserAddresses(this.getUserData("addresses"));
                        }
                    }
                    else if (v === "managePassword") {
                        this.current_password = null;
                        this.password = null;
                        this.passwordConfirm = null;
                    }
                }
            },
            current_password: function () {
                this.passwordError = null;
            },
            email() {
                this.emailError = null;
            },
        },
        mounted() {
            this.first_name = this.getUserData("firstName");
            this.last_name = this.getUserData("lastName");
            this.email = this.getUserData("email");

            if (this.getUserData("addresses")) {
                this.importUserAddresses(this.getUserData("addresses"));
            }
        }
    }
</script>
