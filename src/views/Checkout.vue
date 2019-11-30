<template>
    <v-container v-if="canCheckout" fluid>
        <v-row class="checkoutRow">
            <v-card width="25em" min-height="13.5em" height="fit-content" style="border-radius: 20px; margin-top: 10px">
                <v-container fluid>
                    <template v-for="(item, index) in this.cartItems">
                        <v-row v-bind:key="index" class="itemCheckoutBox">
                            <v-col><span>{{item.product.name}} X {{item.quantity}}</span></v-col>
                            <v-col>
                                <v-layout justify-end>${{Number(item.product.price.amount * item.quantity).toFixed(2)}}</v-layout>
                            </v-col>
                        </v-row>
                    </template>
                    <v-row style="margin-left: 5%; margin-right: 5%; margin-top: 2%">
                        <v-col><span>Items ({{cartItems.length}})</span></v-col>
                        <v-col></v-col>
                        <v-col>
                            <v-layout justify-end>${{sumItemsCost.toFixed(2)}}</v-layout>
                        </v-col>
                    </v-row>
                    <v-row style="margin-left: 5%; margin-right: 5%; margin-top: -5%">
                        <v-col>Tax (15%)</v-col>
                        <v-col></v-col>
                        <v-col>
                            <v-layout justify-end>${{sumItemsTax.toFixed(2)}}</v-layout>
                        </v-col>
                    </v-row>
                    <v-row style="margin-left: 5%; margin-right: 5%; margin-top: -5%">
                        <v-col>Shipping</v-col>
                        <v-col></v-col>
                        <v-col>
                            <v-layout justify-end>Free</v-layout>
                        </v-col>
                    </v-row>
                    <v-divider style="margin-top: 10px" />
                    <v-row style="margin-left: 5%; margin-right: 5%">
                        <v-col><span class="title font-weight-regular">Total</span></v-col>
                        <v-col></v-col>
                        <v-col>
                            <v-layout justify-end>
                                <span class="title font-weight-regular">${{totalPriceStr}}</span>
                            </v-layout>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card>
            <v-card v-if="this.$store.state.isLoggedIn" class="font-weight-regular" width="25em"
                    min-height="13.5em" height="fit-content"
                    style="border-radius: 20px; margin-top: 10px; padding: 10px">
                <v-container class="px-6" fluid>
                    <v-row style="min-height: 50px;">
                        <v-form v-model="validAddress" ref="addressForm" lazy-validation>
                            <span class="font-weight-regular">Shipping Address</span>
                            <v-text-field class="my-0" v-model="checkoutData.line1" label="Line 1" :rules="rules" />
                            <v-text-field class="my-0 py-0" v-model="checkoutData.line2" label="Line 2"/>
                            <v-row>
                                <v-col md="6" class="my-0 py-0">
                                    <v-text-field class="my-0 py-0" v-model="checkoutData.country" label="Country" :rules="rules" />
                                </v-col>
                                <v-col md="6" class="my-0 py-0">
                                    <v-text-field class="my-0 py-0" v-model="checkoutData.province" label="State/Province" :rules="rules" />
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col md="6" class="my-0 py-0">
                                    <v-text-field class="my-0 py-0" v-model="checkoutData.city" label="City" :rules="rules" />
                                </v-col>
                                <v-col md="6" class="my-0 py-0">
                                    <v-text-field class="my-0 py-0" v-model="checkoutData.postalCode" label="Postal Code" :rules="rules" />
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-row>
                    <v-form v-model="validPhone" ref="phoneForm" lazy-validation>
                        <v-text-field v-model="checkoutData.phone" label="Phone number" :rules="rules" />
                    </v-form>

                    <v-divider style="margin-top: 10px" />
                    <v-row style="margin-left: 5%; margin-right: 5%; margin-bottom: 2%">
                        <v-btn class="white--text" large block :disabled="this.cartCount < 1 || !this.validPhone || !this.validAddress" :color="ACCENT_COLOR" @click="validate()">Proceed to PayPal</v-btn>
                    </v-row>
                </v-container>
            </v-card>
        </v-row>
    </v-container>
    <v-container v-else style="text-align: center">
        <v-progress-circular size="100" indeterminate :color="PRIMARY_COLOR" />
    </v-container>
</template>

<script>
    import Utilities from "../components/common/Utilities"
    import Requests from "../components/common/Requests";

    const TAX_SCALE = 0.15;

    export default {
        name: "Checkout",
        mixins: [Utilities],
        data: () => ({
            canCheckout: true, // TODO: Set to false.
            validAddress: true,
            validPhone: true,
            checkoutData: {
                fullName: null,
                phone: null,
                line1: null,
                line2: "",
                city: null,
                province: null,
                country: null,
                postalCode: null,
                isExpressShipping: false,
            },
            rules: [
                value => !Utilities.isEmpty(value) || "Required."
            ]
        }),
        methods: {
            validate() {
                if (!this.$store.state.isLoggedIn) {
                    this.$router.push("/login?redirect=cart");
                }
                else {
                    let address = this.$refs.addressForm.validate();
                    let phone = this.$refs.phoneForm.validate();

                    if (address && phone) {
                        this.loading = true;
                        this.validateAsync();
                    }
                }
            },
            async validateAsync() {
                this.$store.commit("startCartLoad");

                let response = await Requests.checkoutAsync(this.jsonData);
                if (!response.error) {
                    if (response.status !== this.HttpStatus.SUCCESS) {
                        alert(response.data["message"]);
                    }
                } else {
                    alert("An error occurred while trying to checkout. Please try again in a moment.");
                }

                await this.updateShoppingCartAsync();
                this.loading = false;
            }
        },
        computed: {
            cartCount: {
                get() {
                    return this.$store.getters.cartItemCount;
                }
            },
            cartItems: {
                get() {
                    if (this.cartCount < 1) {
                        return [];
                    }
                    return this.$store.state.shoppingCart["lines"];
                }
            },
            sumItemsCost: {
                get() {
                    let items = this.cartItems;
                    let cost = 0.0;
                    for (let i = 0; i < items.length; i++) {
                        cost += Number(items[i].product["price"].amount) * Number(items[i].quantity);
                    }

                    return cost;
                }
            },
            sumItemsTax: {
                get() {
                    return this.sumItemsCost * TAX_SCALE;
                }
            },
            totalPriceStr: {
                get() {
                    let cost = this.sumItemsCost + this.sumItemsTax;
                    return cost.toFixed(2);
                }
            }
        }
    }
</script>

<style scoped>

</style>