<template>
    <v-container v-if="!this.$store.state.loadingShoppingCart" fluid>
        <v-row style="max-height: 1em; margin-top: 10px; margin-bottom: 25px">
            <v-btn color="grey darken-2" text @click="goBack()">
                <v-icon color="grey darken-2" style="margin-right: 10px">
                    arrow_back
                </v-icon>
                GO back
            </v-btn>
        </v-row>
        <v-row style="padding-left: 15px; margin-left: 15%">
            <span class="title font-weight-regular" style="font-size: 25px!important; color: #424242">Shopping Cart</span>
        </v-row>
        <v-row style="margin-left: 15%">
            <v-col style="min-width: 50%;">
                <v-container fluid>
                    <v-row>
                        <v-card width="100%" height="fit-content" outlined style="border-radius: 10px; padding-left: 2%">
                            <v-list v-if="this.cartCount > 0" two-line>
                                <template v-for="(item, index) in this.cartItems">
                                    <v-divider v-bind:key="index" v-if="index !== 0" />
                                    <v-list-item :key="item.product.name">
                                        <v-list-item-avatar>
                                            <v-img height="70" min-width="70" :src="randURL()" />
                                        </v-list-item-avatar>
                                        <v-list-item-content>
                                            <v-list-item-title><router-link :to="'/' + item.product['categoryPermalink'] + '/' + item.product['permalink']">{{item.product.name}}</router-link></v-list-item-title>
                                            <v-list-item-subtitle>${{item.product.price.amount}}</v-list-item-subtitle>
                                        </v-list-item-content>
<!--                                        <v-text-field style="max-width: 80px"-->
<!--                                                      v-model="quantity"-->
<!--                                                      type="number"-->
<!--                                                      label="Quantity"-->
<!--                                                      :rules="quantityRules"-->
<!--                                                      :error-messages="quantityExceedError" />-->
                                        <v-layout justify-end style="padding: 10px 0 10px 20px; max-width: fit-content">
                                            <v-btn fab depressed @click="removeItemFromCart(item)">
                                                <v-icon>delete</v-icon>
                                            </v-btn>
                                        </v-layout>
                                    </v-list-item>
                                </template>
                            </v-list>
                            <span v-else>You have no items in your shopping cart.</span>
                        </v-card>
                    </v-row>
                </v-container>
            </v-col>
            <v-col>
                <v-container fluid>
                    <v-row class="checkoutRow">
                        <v-card width="25em" min-height="13.5em" height="fit-content" style="border-radius: 20px; margin-top: 10px">
                            <v-container fluid>
                                <v-row style="margin-left: 5%; margin-right: 5%; margin-bottom: 2%">
                                    <v-btn large block :disabled="!validPhone || !validAddress" :color="ACCENT_COLOR" :loading="loading" dark @click="validate">{{checkoutButton}}</v-btn>
                                </v-row>
                                <template v-for="(item, index) in this.cartItems">
                                    <v-row v-bind:key="index" class="itemCheckoutBox">
                                        <v-col><span>{{item.product.name}} X {{item.quantity}}</span></v-col>
                                        <v-col>
                                            <v-layout justify-end>${{Number(item.product.price.amount * item.quantity).toFixed(2)}}</v-layout>
                                        </v-col>
                                    </v-row>
                                </template>
                                <v-divider style="margin-top: 10px" />
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
                        <v-card v-if="this.$store.state.isLoggedIn" class="font-weight-regular" width="25em" min-height="13.5em" height="fit-content" style="border-radius: 20px; margin-top: 10px">
                            <v-container class="px-6" fluid>
<!--                                <v-radio-group v-model="selectedAddress">-->
                                    <v-row style="min-height: 50px;">
<!--                                        <v-radio value="newAddress">-->
<!--                                            <template v-slot:label>-->
<!--                                                <div>-->
                                                    <v-form v-model="validAddress" ref="addressForm" lazy-validation>
                                                        <span class="font-weight-regular">Shipping Address</span>
<!--                                                        <v-expansion-panels focusable>-->
<!--                                                            <v-expansion-panel style="border-radius: 20px;">-->
<!--                                                                <v-expansion-panel-header>New Address</v-expansion-panel-header>-->
<!--                                                                <v-expansion-panel-content>-->
                                                                    <v-text-field class="my-0" v-model="jsonData.line1" label="Line 1" :rules="[rules.fieldRequired]" />
                                                                    <v-text-field class="my-0 py-0" v-model="jsonData.line2" label="Line 2"/>
                                                                    <v-row>
                                                                        <v-col md="6" class="my-0 py-0">
                                                                            <v-text-field class="my-0 py-0" v-model="jsonData.country" label="Country" :rules="[rules.fieldRequired]" />
                                                                        </v-col>
                                                                        <v-col md="6" class="my-0 py-0">
                                                                            <v-text-field class="my-0 py-0" v-model="jsonData.province" label="State/Province" :rules="[rules.fieldRequired]" />
                                                                        </v-col>
                                                                    </v-row>
                                                                    <v-row>
                                                                        <v-col md="6" class="my-0 py-0">
                                                                            <v-text-field class="my-0 py-0" v-model="jsonData.city" label="City" :rules="[rules.fieldRequired]" />
                                                                        </v-col>
                                                                        <v-col md="6" class="my-0 py-0">
                                                                            <v-text-field class="my-0 py-0" v-model="jsonData.postalCode" label="Postal Code" :rules="[rules.fieldRequired]" />
                                                                        </v-col>
                                                                    </v-row>
<!--                                                                </v-expansion-panel-content>-->
<!--                                                            </v-expansion-panel>-->
<!--                                                        </v-expansion-panels>-->
                                                    </v-form>
<!--                                                </div>-->
<!--                                            </template>-->
<!--                                        </v-radio>-->
                                    </v-row>
<!--                                    <v-row style="min-height: 50px;">-->
<!--                                        <v-radio label="Saved 1" value="address1" />-->
<!--                                    </v-row>-->
<!--                                    <v-row style="min-height: 50px;">-->
<!--                                        <v-radio label="Saved 2" value="address2" />-->
<!--                                    </v-row>-->
<!--                                    <v-row style="min-height: 50px;">-->
<!--                                        <v-radio label="Saved 3" value="address3" />-->
<!--                                    </v-row>-->
<!--                                </v-radio-group>-->
<!--                                <v-divider />-->
                                <v-form v-model="validPhone" ref="phoneForm" lazy-validation>
                                    <v-text-field v-model="jsonData.phone" label="Phone number" :rules="[rules.fieldRequired]" />
                                </v-form>
                            </v-container>
                        </v-card>
                    </v-row>
                </v-container>
            </v-col>
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
        name: "Cart",
        mixins: [Utilities],
        data: () => ({
            updatedQuantities: [],
            loading: false,
            //selectedAddress: null,    //TODO: Use when there will be a selection of saved addresses
            validAddress: true,
            validPhone: true,
            checkoutButton: null,
            jsonData: {
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
            rules: {
                fieldRequired: v => !!v || "Required"
            }
        }),
        methods: {
            getRandomInt(max) {
                return Math.floor(Math.random() * Math.floor(max));
            },
            randURL() {
                switch (this.getRandomInt(6)) {
                    case 0:
                        return "https://picsum.photos/id/1013/500";
                    case 1:
                        return "https://picsum.photos/id/1016/500";
                    case 2:
                        return "https://picsum.photos/id/1029/500";
                    case 3:
                        return "https://picsum.photos/id/102/500";
                    case 4:
                        return "https://picsum.photos/id/1023/500";
                    case 5:
                        return "https://picsum.photos/id/1038/500";
                    case 6:
                        return "https://picsum.photos/id/1055/500";
                }
            },
            async removeItemFromCart(item) {
                this.$store.commit("startCartLoad");

                const url = "carts/mine/items/" + item.product.id;
                let response = await Requests.removeItemFromCartAsync(url);

                if (!response.error) {
                    await this.updateShoppingCartAsync();
                } else {
                    alert("An error occurred while trying to remove an item. Please refresh the page.");
                }
            },
            validate() {
                let address = this.$refs.addressForm.validate();
                let phone = this.$refs.phoneForm.validate();

                if (!this.$store.state.isLoggedIn) {
                    this.$router.push("/login?redirect=cart")
                }
                else if (address && phone) {
                    this.loading = true;
                    this.validateAsync();
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
        },
        mounted: function() {
            if (this.$store.state.isLoggedIn) {
                this.jsonData.fullName = this.getUserData("firstName") + " " + this.getUserData("lastName");
                //this.jsonData.phone = this.getUserData("phone");  //TODO: When the phone number will become part of currUser
                this.checkoutButton = "Checkout";
            }
            else {
                this.checkoutButton = "Log In";
            }
        }
    }
</script>

<style scoped>
    .itemCheckoutBox {
        margin-left: 5%;
        margin-right: 5%;
        margin-bottom: -4%;
    }

    @media screen and (max-width: 847px) {
        .checkoutRow {
            justify-content: center;
        }
    }
</style>
