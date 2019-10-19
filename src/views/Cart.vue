<template>
    <v-container fluid style="margin-left: 10%">
        <v-row style="max-height: 1em; margin-left: -10%; margin-top: 10px">
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
                        <v-card width="100%" height="fit-content" outlined style="border-radius: 10px;">
                            <v-list two-line>
                                <template v-for="(item, index) in cartItems">
                                    <v-list-item :key="item.title">
                                        <v-list-item-avatar style="margin-left: 2%">
                                            <v-img height="70" min-width="70" :src="item.imageUrl"></v-img>
                                        </v-list-item-avatar>
                                        <v-list-item-content>
                                            <v-list-item-title v-html="item.title"></v-list-item-title>
                                            <v-list-item-subtitle v-html="item.name"></v-list-item-subtitle>
                                        </v-list-item-content>
                                        <v-layout justify-end pt-5 style="max-width: 30%">
                                            <v-select dense label="Quantity" solo flat filled
                                                      style="max-width: 120px; margin-right: 10px; max-height: 80px!important;"></v-select>
                                            <v-btn fab depressed>
                                                <v-icon>delete</v-icon>
                                            </v-btn>
                                        </v-layout>
                                    </v-list-item>
                                    <v-divider v-bind:key="index" v-if="index!==cartItems.length-1"></v-divider>
                                </template>
                            </v-list>
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
                                    <v-col><span>Items(3)</span></v-col>
                                    <v-col></v-col>
                                    <v-col>
                                        <v-layout justify-end>$1000</v-layout>
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
                                            <span class="title font-weight-regular">$1000</span>
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
