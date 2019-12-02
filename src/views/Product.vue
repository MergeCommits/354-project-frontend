<template>
    <div>
        <titlebar></titlebar>
        <v-container style="margin-top: -33px" fluid v-if="productValidated">
            <v-row style="height: 100%">
                <v-layout justify-center fill-height pt-5 wrap>
                    <v-card flat outlined>
                        <v-container fluid>
                            <v-row>
                                <!-- Main product window. -->
                                <v-col md="7">
                                    <v-layout justify-center fill-height>
                                        <v-card class="productWindow" flat style="border-radius: 10px; width: 80%">
                                            <v-layout justify-start pl-3 style="height: 30px;">
                                                <span style="font-size: 25px !important;  color:#616161; text-align: center"
                                                      class="title font-weight-medium">{{product.name}}</span>
                                            </v-layout>
                                            <v-layout justify-start pt-1 fill-height pb-5>
                                                <v-img style="margin: 10px; border-radius: 10px;"
                                                       min-width="300px"
                                                       contain
                                                       src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Anatomy_of_a_Sunset-2.jpg"
                                                       class="grey lighten-2"></v-img>
                                            </v-layout>
                                        </v-card>
                                    </v-layout>
                                </v-col>

                                <!-- Purchase bar. -->
                                <v-col md="5" class="purchaseBar">
                                    <v-container fluid>
                                        <v-row style="margin-top: 30px">
                                            <v-card style="width: 70%; min-width: 300px; padding: 10px; border-radius: 10px" elevation="5">
                                                <v-layout style="height: 43px" justify-center>
                                                    <span class="headline font-weight-regular"
                                                          style="font-size: 20px!important;">Your price <span>${{product.price}}</span></span>
                                                    <v-icon style="margin-top: -5px; margin-left: 5px" large
                                                            :color="ACCENT_COLOR">fas fa-meteor
                                                    </v-icon>
                                                </v-layout>
                                                <v-container>
                                                    <v-row>
                                                        <v-layout justify-center
                                                                  style="margin-left: 35%; margin-right: 35%">
                                                            <v-form v-model="validQuantity">
                                                                <v-text-field v-model="quantity" type="number"
                                                                              style="min-width: 150px"
                                                                              label="Quantity"
                                                                              :color="ACCENT_COLOR"
                                                                              solo rounded
                                                                              :rules="quantityRules"
                                                                              :error-messages="quantityExceedError">
                                                                </v-text-field>
                                                            </v-form>
                                                        </v-layout>
                                                    </v-row>
                                                    <v-row>
                                                        <v-layout justify-center pl-5 pr-5>
                                                            <v-btn class="no-highlight" block :color="ACCENT_COLOR"
                                                                   width="100%" outlined
                                                                   :loading="this.$store.state.loadingShoppingCart"
                                                                   :disabled="this.$store.state.loadingShoppingCart || !this.validQuantity"
                                                                   @click="cartButtonPressed()">
                                                                <v-icon style="margin-right: 5px">
                                                                    add_shopping_cart
                                                                </v-icon>
                                                                {{addToCartLabel}}
                                                            </v-btn>
                                                        </v-layout>
                                                    </v-row>
                                                </v-container>
                                            </v-card>
                                        </v-row>
                                        <v-row style="margin-top: 20px">
                                            <v-card class="animated fadeIn"
                                                    style="border-radius: 10px; width: 70%; min-width: 300px"
                                                    tile elevation="5" v-bind:style="{border: PRIMARY_COLOR}">
                                                <v-layout wrap pt-3>
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
                                                                class="elevation-0">
                                                        </v-data-table>
                                                    </v-container>
                                                </v-layout>
                                            </v-card>
                                        </v-row>
                                    </v-container>
                                </v-col>
                            </v-row>
                        </v-container>
<!--                        v-if="canReview"-->
                        <v-container style="padding: 20px">
                            <v-form ref="form" v-model="validReview" :lazy-validation="true">
                                <v-textarea v-model="comment" required :rules="reviewRules" solo raised label="Review" />
                                <v-layout justify-center>
                                    <v-rating v-model="rating" :color="PRIMARY_COLOR" background-color="grey"
                                              full-icon="fa-meteor" empty-icon="fa-meteor" />
                                </v-layout>
                                <v-layout justify-center>
                                    <strong>Rating: {{rating}}</strong>
                                </v-layout>
                                <v-layout justify-end>
                                    <v-btn :color="ACCENT_COLOR" style="color: white"
                                           :loading="submittingReview" :disabled="!validReview"
                                           @click="submitReview()">Submit</v-btn>
                                </v-layout>
                            </v-form>
                        </v-container>
                    </v-card>
                </v-layout>
            </v-row>
        </v-container>
        <v-container v-else-if="productValidated !== null && !productValidated">
            <p v-html="errorMessage" style="text-align: center"></p>
        </v-container>
        <v-container v-else style="text-align: center">
            <v-progress-circular size="100" indeterminate :color="PRIMARY_COLOR"></v-progress-circular>
        </v-container>
    </div>
</template>

<script>
    import Utilities from "../components/common/Utilities";
    import Requests from "../components/common/Requests";
    import TitleBar from "../components/TitleBar";

    export default {
        name: "Product",
        components: {
            'titlebar': TitleBar,
        },
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
            specData: [],
            canReview: false,
            validReview: null,
            comment: null,
            rating: null,
            reviewRules: [
                value => !Utilities.isEmpty(value) || "Required."
            ],
            submittingReview: false
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
            },
            submitReview() {
                if (this.$refs.form.validate()) {
                    if (this.rating === null) {
                        alert("A rating is required!");
                        return;
                    }
                    this.submittingReview = true;
                    this.reviewAsync();
                }
            },
            async reviewAsync() {
                let jsonData = {
                    userEmail: this.getUserData("email"),
                    productPermalink: this.product["permalink"],
                    comment: this.comment,
                    score: this.rating
                };

                let response = await Requests.submitReviewAsync(jsonData);
                if (response.error) {
                    alert("Something went wrong when posting your review. Please try again in a moment.")
                } else {
                    this.comment = null;
                    this.rating = null;
                }

                this.submittingReview = false;
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
        props: ["categoryPermalink", "productPermalink"],
        created: async function () {
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

                            if (this.$store.state.isLoggedIn) {
                                let reviewResponse = await Requests.canReviewAsync(this.product["permalink"]);
                                this.canReview = !reviewResponse.error;
                            }

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
        min-width: 300px;
        width: 30%;
    }

    @media screen and (max-width: 800px) {
        .productWindow {
            min-width: 300px;
            width: 100%;
            margin: 0;
        }

        .purchaseBar {
            margin: 40px 0;
            min-width: 350px;
            width: 100%;
        }
    }

</style>
