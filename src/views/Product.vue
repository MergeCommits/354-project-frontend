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
                                   src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Anatomy_of_a_Sunset-2.jpg"
                                   class="grey lighten-2" />
                        </v-card>

                        <!-- Purchase bar. -->
                        <v-card class="purchaseBar animated fadeIn"
                                tile elevation="14" v-bind:style="{border: PRIMARY_COLOR}">
                            <v-card-title style="width: 100%">${{product.price.amount}}</v-card-title>

                            <v-col>
                                <v-form v-model="validQuantity">
                                    <v-text-field v-model="quantity"
                                                  type="number"
                                                  label="Quantity"
                                                  :rules="quantityRules"
                                                  :error-messages="quantityExceedError" />
                                </v-form>
                            </v-col>

                            <v-card-actions>
                                <v-btn class="no-highlight" block :color="ACCENT_COLOR" width="100%" outlined
                                       :loading="this.$store.state.loadingShoppingCart"
                                       :disabled="this.$store.state.loadingShoppingCart || !this.validQuantity"
                                       @click="cartButtonPressed()">
                                    <v-icon style="margin-right: 5px">add_shopping_cart</v-icon>
                                    {{addToCartLabel}}
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
    import Requests from "../components/common/Requests";

    export default {
        name: "Product",
        mixins: [Utilities],
        data: () => ({
            productValidated: null,
            errorMessage: null,
            product: null,
            quantity: null,
            validQuantity: null,
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
                if (value !== null && this.product !== null) {
                    this.quantityExceedError = this.product["quantity"] < Number(value)
                        ? ["The available quantity of this product is " + this.product["quantity"] + "."]
                        : [];
                }
            }
        },
        methods: {
            cartButtonPressed() {
                if (this.itemInCartAndSameQuantity) {
                    this.$router.push("/cart");
                } else if (this.itemFromCart !== null) {
                    this.updateCartQuantityAsync(this.itemFromCart, this.quantity);
                } else {
                    this.addToCartAsync();
                }
            },
            async addToCartAsync() {
                this.$store.commit("startCartLoad");

                if (this.$store.state.shoppingCart === null) {
                    let response = await Requests.createShoppingCartAsync();

                    if (response.error) {
                        alert("Something went wrong with creating your cart. Please try again in a moment.");
                        return;
                    }
                }

                let productData = {
                    productId: this.product["id"],
                    quantity: Number(this.quantity)
                };

                await Requests.addItemToCartAsync(productData);
                await this.updateShoppingCartAsync(); // This commits "stopCartLoad" to the store.
            }
        },
        computed: {
            itemFromCart: {
                get() {
                    if (this.$store.state.shoppingCart === null) {
                        return null;
                    }

                    for (let i = 0; i < this.$store.state.shoppingCart["lines"].length; i++) {
                        let item = this.$store.state.shoppingCart["lines"][i];
                        if (item.product["permalink"].toLowerCase() === this.productPermalink.toLowerCase()) {
                            return item;
                        }
                    }

                    return null;
                }
            },
            itemInCartAndSameQuantity: {
                get() {
                    if (this.itemFromCart === null) {
                        return false;
                    }
                    return Number(this.itemFromCart.quantity) === Number(this.quantity);
                }
            },
            addToCartLabel: {
                get() {
                    if (this.itemInCartAndSameQuantity) {
                        return "View cart";
                    }
                    if (this.itemFromCart !== null) {
                        return "Update cart";
                    }
                    return "Add to cart";
                }
            }
        },
        props: [ "categoryPermalink", "productPermalink" ],
        created: async function() {
            let url = "categories/" + this.categoryPermalink + "/products";
            let response = await Requests.queryProductAsync(url);

            if (!response.error) {
                if (response.status === Requests.HttpStatus.SUCCESS) {
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
                            ];

                            this.productValidated = true;
                            return;
                        }
                    }

                    this.productValidated = false;
                    this.errorMessage = "Could not find the product <code>" + this.productPermalink + "</code> in category <code>" + this.categoryPermalink + "</code>!";
                } else if (response.status === Requests.HttpStatus.NOT_FOUND) {
                    this.productValidated = false;
                    this.errorMessage = "Could not find the category <code>" + this.categoryPermalink + "</code>!";
                }
            }
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