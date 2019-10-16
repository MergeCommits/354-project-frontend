<template>
    <v-container fluid style="margin-left: 10%">
        <v-row>
            <v-col style="min-width:50%">
                <v-container fluid>
                    <v-row>
                        <span class="title font-weight-regular"
                              style="font-size: 35px; color: #424242">Shopping Cart</span>
                    </v-row>
                    <v-row>
                        <v-card width="100%" height="30em" outlined>

                        </v-card>
                    </v-row>
                </v-container>
            </v-col>
            <v-col>
                <v-container fluid>
                    <v-row style="height: 33px"></v-row>
                    <v-row>
                        <v-card width="25em" height="10em" outlined>
                            <v-container fluid>
                                <v-row style="margin-left: 5%; margin-right: 5%">
                                    <v-btn large block :color="ACCENT_COLOR" dark>Checkout</v-btn>
                                </v-row>
                                <v-row style="margin-left: 5%; margin-right: 5%">
                                    <span>Items(3)</span>
                                </v-row>
                                <v-row style="margin-left: 5%; margin-right: 5%">
                                    Shipping
                                </v-row>
                                <v-divider></v-divider>
                                <v-row style="margin-left: 5%; margin-right: 5%">
                                    <v-col><span>Total</span></v-col>
                                    <v-col></v-col>
                                    <v-col><span>1000$</span></v-col>
                                </v-row>
                            </v-container>
                        </v-card>
                    </v-row>
                </v-container>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import Utilities from "../components/common/Utilities"

    export default {
        name: "Cart",
        mixins: [Utilities],
        data: () => ({}),
        computed: {
            cartItems() {
                return this.$store.state.inputItems.slice(0, 3);
            }
        }
    }
</script>

<style scoped>

</style>
