<template>
    <v-container fluid v-if="productValidated">
        <v-row>
            <v-layout justify-center fill-height pt-5 wrap>
                <v-card>
                    <v-layout wrap justify-center style="padding: 30px;">
                        <!-- Main product window. -->
                        <v-card class="productWindow">
                            <v-card-title>
                                Product: <code>{{product.name}}</code> in Section: <code>{{product.category.name}}</code>
                            </v-card-title>
                            <v-img style="margin: 10px"
                                    src="https://cdn.discordapp.com/attachments/186878192240427009/638161021202333698/unknown.png"
                                    class="grey lighten-2"
                            />
                        </v-card>

                        <!-- Purchase bar. -->
                        <v-card class="purchaseBar animated fadeIn"
                                tile elevation="14" v-bind:style="{border: PRIMARY_COLOR}">
                            <v-card-title style="width: 100%">$599.99</v-card-title>

                            <v-card-actions>
                                <v-btn block :color="ACCENT_COLOR" width="100%" dark outlined>
                                    <v-icon style="margin-right: 5px">add_shopping_cart</v-icon>
                                    Add to cart
                                </v-btn>
                            </v-card-actions>
                        </v-card>

                        <!-- Product description. -->
                        <v-layout wrap>
                            <v-container>
                                <h2>Description:</h2>
                                You sit at the restaurant with your young son, he says he is hungry. You agree to get him dinner. You open up to the kids menu, your child is far to young for adult food. Chicken nugger stares at you from the page. You don’t understand. Your palms get sweaty and your son complains. He says he is hungry. Your mind strains, searching for an answer in a world of sweer potato and French fried. You try to order the chicken nugger, but you cannot. The words cannot escape your lips. Your son is hungry, he complains. The waitress stares at you, her head a spinning chicken nugger, her arms swinging French fried. Your son cries the tears of a chicken nugger-less child. In your mind you scream. It is raining sweer potato now, you have French fried engraved on your left temple and you do not understand. Your son weeps in the corner, he is starving. Starving for the chicken nugger.
                            </v-container>

                            <v-container>
                                <h2>Specification:</h2>
                                <v-data-table
                                        :headers="headers"
                                        :items="dummyData"
                                        :items-per-page="5"
                                        class="elevation-1"
                                ></v-data-table>
                                I stubbed my toe and this is a new line..
                            </v-container>
                        </v-layout>
                    </v-layout>
                </v-card>
            </v-layout>
        </v-row>
    </v-container>
    <v-container v-else-if="productValidated !== null && !productValidated">
        <p v-html="errorMessage" style="text-align: center;"/>
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
            headers: [
                {
                    text: "Description",
                    align: "left",
                    sortable: false,
                    value: "description",
                },
                { text: "Value", value: "value" }
            ],
            dummyData: [
                {
                    description: "Condition",
                    value: "Uh."
                },
                {
                    description: "Condition",
                    value: "Uh."
                }
            ]
        }),
        props: [ "categoryPermalink", "productPermalink" ],
        created: function() {
            // Get the section.

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
                                if (products[i].permalink === this.productPermalink.toLowerCase()) {
                                    this.product = products[i];
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
                })
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
            margin: 40px 0px;
            width: 350px;
        }
    }

</style>