<template>
    <v-container v-if="!this.$store.state.loadingShoppingCart" fluid>
        <v-row style="max-height: 1em; margin-top: 10px">
            <v-btn color="grey darken-2" text @click="goBack()">
                <v-icon color="grey darken-2" style="margin-right: 10px">
                    arrow_back
                </v-icon>
                GO back
            </v-btn>
        </v-row>
        <v-row>
            <v-col style="min-width:50%">
                <v-container fluid>
                    <v-row>
                        <span class="title font-weight-regular"
                              style="font-size: 25px!important; color: #424242">Shopping Cart</span>
                    </v-row>
                    <v-row style="margin-top: 10px">
                        <v-card width="100%" height="fit-content" outlined style="border-radius: 10px; padding-left: 2%">
                            <v-list v-if="this.cartCount > 0" two-line>
                                <template v-for="(item, index) in this.cartItems">
                                    <v-divider v-bind:key="index" v-if="index !== 0" />
                                    <v-list-item :key="item.product.name">
                                        <v-list-item-avatar>
                                            <v-img height="70" min-width="70" :src="randURL()"></v-img>
                                        </v-list-item-avatar>
                                        <v-list-item-content>
                                            <v-list-item-title><a :href="'/' + item.product['categoryPermalink'] + '/' + item.product['permalink']">{{item.product.name}}</a></v-list-item-title>
                                            <v-list-item-subtitle>${{item.product.price.amount}}</v-list-item-subtitle>
                                        </v-list-item-content>
                                        <v-layout justify-end style="padding: 10px 0; max-width: 30%">
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
                    <v-row style="height: 33px"></v-row>
                    <v-row>
                        <v-card width="25em" height="13.5em" hover style="border-radius: 20px; margin-top: 10px">
                            <v-container fluid>
                                <v-row style="margin-left: 5%; margin-right: 5%">
                                    <v-btn large block :color="ACCENT_COLOR" dark>Checkout</v-btn>
                                </v-row>
                                <v-row style="margin-left: 5%; margin-right: 5%; margin-top: 2%">
                                    <v-col><span>Items ({{cartItems.length}})</span></v-col>
                                    <v-col></v-col>
                                    <v-col>
                                        <v-layout justify-end>${{totalPrice}}</v-layout>
                                    </v-col>
                                </v-row>
                                <v-row style="margin-left: 5%; margin-right: 5%; margin-top: -5%">
                                    <v-col>Shipping</v-col>
                                    <v-col></v-col>
                                    <v-col>
                                        <v-layout justify-end>Free</v-layout>
                                    </v-col>
                                </v-row>
                                <v-divider style="margin-top: 10px"></v-divider>
                                <v-row style="margin-left: 5%; margin-right: 5%">
                                    <v-col><span class="title font-weight-regular">Total</span></v-col>
                                    <v-col></v-col>
                                    <v-col>
                                        <v-layout justify-end>
                                            <span class="title font-weight-regular">${{totalPrice}}</span>
                                        </v-layout>
                                    </v-col>
                                </v-row>
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
    import {APICall, RequestType} from "../components/common/API";

    export default {
        name: "Cart",
        mixins: [Utilities],
        data: () => ({
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
            removeItemFromCart(item) {
                this.$store.commit("startCartLoad");
                const SUCCESS = 200;
                const url = "carts/mine/items/" + item.product.id;

                let createCartCall = new APICall(RequestType.DELETE, url, null, [SUCCESS]);
                createCartCall.performRequest()
                    .then(response => {
                        if (response.status === SUCCESS) {
                            this.updateShoppingCart();
                        }
                    });
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
            totalPrice: {
                get() {
                    let items = this.cartItems;
                    let cost = 0.0;
                    for (let i = 0; i < items.length; i++) {
                        cost += Number(items[i].product["price"].amount);
                    }

                    const TAX_SCALE = 0.15;
                    cost += cost * TAX_SCALE;

                    return cost.toFixed(2);
                }
            }
        }
    }
</script>

<style scoped>

</style>
