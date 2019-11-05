<template>
    <v-container fluid v-if="productValidated">
        <v-row>
            <v-layout justify-center fill-height pt-5 wrap>
                <v-card>
                    <v-layout wrap justify-center style="padding: 30px;">
                        <!-- Main product window. -->
                        <v-card class="productWindow">
                            <v-card-title>
                                {{product.name}}
                            </v-card-title>
                            <v-img style="margin: 10px"
                                    src="https://cdn.discordapp.com/attachments/186878192240427009/638161021202333698/unknown.png"
                                    class="grey lighten-2"
                            />
                        </v-card>

                        <!-- Purchase bar. -->
                        <v-card class="purchaseBar animated fadeIn"
                                tile elevation="14" v-bind:style="{border: PRIMARY_COLOR}">
                            <v-card-title style="width: 100%">${{product.price.amount}}</v-card-title>

                            <v-col>
                                <v-text-field v-model="quantity"
                                              type="number"
                                              label="Quantity"
                                              :rules="quantityRules"
                                              :error-messages="quantityExceedError" />
                            </v-col>

                            <v-card-actions>
                                <v-btn class="no-highlight" block :color="ACCENT_COLOR" width="100%" dark outlined @click="addToCart()">
                                    <v-icon style="margin-right: 5px">add_shopping_cart</v-icon>
                                    Add to cart
                                </v-btn>
                            </v-card-actions>
                        </v-card>

                        <!-- Product description. -->
                        <v-layout wrap>
                            <v-container>
                                <h2>Description:</h2>
                                {{product.description}}
                            </v-container>

                            <v-container>
                                <h2>Specification:</h2>
                                <v-data-table
                                        :headers="specificationHeader"
                                        :items="specData"
                                        :items-per-page="50"
                                        hide-default-header
                                        hide-default-footer
                                        class="elevation-1" />
                            </v-container>
                        </v-layout>
                    </v-layout>
                </v-card>
            </v-layout>
        </v-row>
    </v-container>
    <v-container v-else-if="productValidated !== null && !productValidated">
        <p v-html="errorMessage" style="text-align: center"></p>
    </v-container>
    <v-container v-else style="text-align: center">
        <v-progress-circular size="100" indeterminate :color="PRIMARY_COLOR" />
    </v-container>
</template>

<script>
    import Utilities from "../components/common/Utilities";
    import {APICall, RequestType} from "../components/common/API";

    export default {
        name: "Product",
        mixins: [Utilities],
        data: () => ({
            productValidated: null,
            errorMessage: null,
            product: null,
            quantity: null,
            quantityRules: [
                value => !Utilities.isEmpty(value) || "A quantity is required.",
                value => !Utilities.isEmpty(value) && value > 0 && value < 100 || "Quantity must be between 1 and 99.",
                value => !Utilities.isEmpty(value) && !value.toString().includes(".") || "Quantity must be an integer value."
            ],
            quantityExceedError: [],
            specificationHeader: [
                {
                    text: "Description",
                    align: "left",
                    sortable: false,
                    value: "description",
                },
                {
                    text: "Value",
                    value: "value"
                }
            ],
            specData: []
        }),
        watch: {
            quantity(value) {
                this.quantityExceedError = this.product["quantity"] < Number(value)
                    ? ["The available quantity of this product is " + this.product["quantity"] + "."]
                    : [];
            }
        },
        methods: {
            // TODO: Wrap this in a sync function to stop API spam.
            async addToCart() {
                this.$store.commit("startCartLoad");
                const SUCCESS = 200;

                if (this.$store.state.shoppingCart === null) {
                    let createCartCall = new APICall(RequestType.POST, "carts", null, [SUCCESS]);
                    let cartCreated = await createCartCall.performRequest()
                        .then(response => {
                            return response.status === SUCCESS;
                        });

                    if (!cartCreated) {
                        return; // TODO: Error message.
                    }
                }

                let productData = {
                    productId: this.product["id"],
                    quantity: this.quantity
                };

                let addItemCall = new APICall(RequestType.POST, "carts/mine/items", productData, [SUCCESS]);
                await addItemCall.performRequest();

                this.updateShoppingCart(); // This commits "stopCartLoad" to the store.
            }
        },
        props: [ "categoryPermalink", "productPermalink" ],
        created: function() {
            const FOUND = 200;
            const NOT_FOUND = 404;

            let url = "categories/" + this.categoryPermalink + "/products";
            let call = new APICall(RequestType.GET, url, null, [FOUND, NOT_FOUND]);
            call.performRequest()
                .then(response => {
                    switch (response.status) {
                        case FOUND: {
                            let products = response.data["products"];
                            for (let i = 0; i < products.length; i++) {
                                if (products[i]["permalink"] === this.productPermalink.toLowerCase()) {
                                    this.product = products[i];
                                    this.specData = [
                                        {
                                            description: "Date Added",
                                            value: this.product["dateAdded"]
                                        },
                                        {
                                            description: "Category",
                                            value: this.product["category"].name
                                        },
                                        {
                                            description: "Brand",
                                            value: this.product["brand"].name
                                        },
                                        {
                                            description: "Condition",
                                            value: this.product["condition"]
                                        },
                                        {
                                            description: "Seller Contact",
                                            value: this.product["sellerInfo"].email
                                        },
                                    ];

                                    this.productValidated = true;
                                    return;
                                }
                            }

                            this.productValidated = false;
                            this.errorMessage = "Could not find the product <code>" + this.productPermalink + "</code> in category <code>" + this.categoryPermalink + "</code>!";
                        } break;

                        case NOT_FOUND: {
                            this.productValidated = false;
                            this.errorMessage = "Could not find the category <code>" + this.categoryPermalink + "</code>!";
                        } break;
                    }
                });
        }
    }
</script>

<style scoped>
    .productWindow {
        margin-right: 3%;
        width: 50%;
        min-width: 300px;
    }

    .purchaseBar {
        min-width: 250px;
        width: 30%;
    }

    @media screen and (max-width: 650px) {
        .productWindow {
            min-width: 0;
            width: 350px;
            margin: 0;
        }

        .purchaseBar {
            margin: 40px 0;
            width: 350px;
        }
    }

</style>