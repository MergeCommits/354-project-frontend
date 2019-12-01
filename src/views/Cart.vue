<template>
    <v-container v-if="!this.$store.state.loadingShoppingCart" fluid style="padding-left: 10%; padding-right: 10%">
        <v-row>
             <span style="font-size: 25px !important; color: #616161"
                   class="title font-weight-medium">Shopping Cart</span>
        </v-row>
        <v-row>
            <v-container fluid>
                <v-row>
                    <v-card width="100%" height="fit-content" outlined style="border-radius: 10px; padding-left: 2%">
                        <v-list v-if="this.cartCount > 0" two-line>
                            <template v-for="(item, index) in this.cartItems">
                                <v-divider v-bind:key="index" v-if="index !== 0" />
                                <v-list-item :key="item.product.name" style="margin-right: 10px; padding: 0">
                                    <v-list-item-avatar style="margin-left: 10px">
                                        <v-img height="70" min-width="70" :src="randImageURL(item.product.name)" />
                                    </v-list-item-avatar>
                                    <v-list-item-content>
                                        <v-list-item-title>
                                            <router-link :to="'/' + item.product['categoryPermalink'] + '/' + item.product['permalink']">{{item.product.name}}</router-link>
                                        </v-list-item-title>
                                        <v-list-item-subtitle>${{item.product.price}}</v-list-item-subtitle>
                                    </v-list-item-content>
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
        </v-row>
        <v-row>
            <v-btn large class="white--text" :color="ACCENT_COLOR" block router to="/checkout">Checkout</v-btn>
        </v-row>
    </v-container>
    <v-container v-else style="text-align: center">
        <v-progress-circular size="100" indeterminate :color="PRIMARY_COLOR" />
    </v-container>
</template>

<script>
    import Utilities from "../components/common/Utilities"
    import Requests from "../components/common/Requests";

    export default {
        name: "Cart",
        mixins: [Utilities],
        methods: {
            randImageURL(string) {
                switch (string.length % 7) {
                    case 0: {
                        return "https://picsum.photos/id/1013/500";
                    }
                    case 1: {
                        return "https://picsum.photos/id/1016/500";
                    }
                    case 2: {
                        return "https://picsum.photos/id/1029/500";
                    }
                    case 3: {
                        return "https://picsum.photos/id/102/500";
                    }
                    case 4: {
                        return "https://picsum.photos/id/1023/500";
                    }
                    case 5: {
                        return "https://picsum.photos/id/1038/500";
                    }
                    case 6: {
                        return "https://picsum.photos/id/1055/500";
                    }
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
            }
        }
    }
</script>

<style scoped>

</style>
