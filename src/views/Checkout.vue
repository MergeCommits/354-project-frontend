<template>
    <v-container v-if="this.$store.state.loadingShoppingCart" style="text-align: center">
        <v-progress-circular size="100" indeterminate :color="PRIMARY_COLOR" />
    </v-container>
    <v-container v-else-if="this.cartCount < 1 && !this.transactionComplete" style="text-align: center">
        <p style="text-align: center">You have no items in your cart!</p>
    </v-container>
    <v-container v-else-if="this.transactionComplete" style="text-align: center">
        <p style="text-align: center">Your transaction has been completed!</p>
        <v-btn class="white--text" large block :color="ACCENT_COLOR" router to="/home">Return to Homepage</v-btn>
    </v-container>
    <v-layout v-else justify-center style="width: 100%; padding-left: 10%; padding-right: 10%">
        <v-card width="25em" min-height="13.5em" height="fit-content" style="border-radius: 20px; margin-top: 10px; padding: 20px">
            <p style="width: 100%; text-align: center; font-size: 18px">Pay with <v-icon large color="#303F9F">fab fa-cc-paypal</v-icon></p>
            <v-divider />
            <template v-for="(item, index) in this.cartItems">
                <v-row v-bind:key="index" style="margin-left: 5%; margin-right: 5%; margin-top: 2%">
                    <v-col><span>{{item.product.name}} X {{item.quantity}}</span></v-col>
                    <v-col>
                        <v-layout justify-end>${{Number(item.product.price * item.quantity).toFixed(2)}}</v-layout>
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
            <v-row style="margin-left: 5%; margin-right: 5%; margin-top: 2%">
                <v-col>Tax (15%)</v-col>
                <v-col></v-col>
                <v-col>
                    <v-layout justify-end>${{sumItemsTax.toFixed(2)}}</v-layout>
                </v-col>
            </v-row>
            <v-row style="margin-left: 5%; margin-right: 5%; margin-top: -5%">
                <v-col>Shipping</v-col>
                <v-col>
                    <v-layout justify-end>Free</v-layout>
                </v-col>
            </v-row>
            <v-divider inset style="width: 50%; margin-top: 10px" />
            <v-row style="margin-left: 5%; margin-right: 5%">
                <v-col><span class="title font-weight-regular">Total</span></v-col>
                <v-col></v-col>
                <v-col>
                    <v-layout justify-end>
                        <span class="title font-weight-regular">${{totalPriceStr}}</span>
                    </v-layout>
                </v-col>
            </v-row>
            <v-divider style="margin-top: 10px" />
            <v-row style="margin-left: 2%; margin-right: 2%; margin-top: 2%">
                <v-form ref="form" v-model="validOrderForm" lazy-validation>
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
                    <v-text-field v-model="checkoutData.phone" label="Phone number" :rules="rules" />
                    <v-row style="margin-left: 2%; margin-right: 2%; margin-bottom: 2%">
                        <v-btn class="white--text" large block :disabled="!this.validOrderForm" :color="ACCENT_COLOR" @click="validate()">Proceed to &nbsp;<v-icon large>fab fa-paypal</v-icon></v-btn>
                    </v-row>
                </v-form>
            </v-row>
        </v-card>
    </v-layout>
</template>

<script>
    import Utilities from "../components/common/Utilities"
    import Requests from "../components/common/Requests";

    const TAX_SCALE = 0.15;

    export default {
        name: "Checkout",
        mixins: [Utilities],
        data: () => ({
            validOrderForm: true,
            transactionComplete: false,
            checkoutData: {
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
                if (this.$refs.form.validate()) {
                    this.$store.commit("startCartLoad");
                    this.validateAsync();
                }
            },
            async validateAsync() {
                this.checkoutData.fullName = this.getUserData("firstName") + " " + this.getUserData("lastName");
                let response = await Requests.checkoutAsync(this.checkoutData);
                if (response.error) {
                    alert("An error occurred while trying to checkout. Please try again in a moment.");
                } else {
                    this.transactionComplete = true;
                }

                await this.updateShoppingCartAsync();
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
                        cost += Number(items[i].product["price"]) * Number(items[i].quantity);
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