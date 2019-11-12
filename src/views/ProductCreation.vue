<template>
    <v-layout justify-center class="makeProduct" v-bind:style="{backgroundColor: PRIMARY_COLOR}">
        <v-card style="border-radius: 15px; height: fit-content; padding: 1vh 1%; width: 40%; margin-top: 5vh; margin-bottom: 5vh">
            <v-container v-if="categoryDataLoaded && brandDataLoaded">
                <v-row>
                    <v-form ref="form" style="width: 100%" v-model="validProduct" :lazy-validation="true">
                        <v-row style="padding-bottom: 5%">
                            <v-layout justify-center>
                                <span style="font-size: 25px !important;  color:#616161; text-align: center"
                                      class="title font-weight-medium">Create a new product listing</span>
                            </v-layout>
                        </v-row>
                        <v-row class="productRow">
                            <v-col style="">
                                <v-text-field v-model="name" required :rules="nameRules" :color="ACCENT_COLOR"
                                              filled solo label="Product Name"/>
                            </v-col>
                            <v-col style="max-width: 30%; min-width: 90px">
                                <v-text-field v-model="price" required type="number"
                                              :rules="priceRules" :color="ACCENT_COLOR"
                                              rounded append-icon="attach_money"
                                              filled outlined label="Price"/>
                            </v-col>
                        </v-row>
                        <v-row class="productRow">
                            <v-col>
                                <v-textarea v-model="description" required :rules="descriptionRules"
                                            :color="ACCENT_COLOR" outlined label="Description" :hint="this.charactersLeft" />
                            </v-col>
                        </v-row>
                        <v-row class="productRow">
                            <v-col>
                                <v-select v-model="selectedCategory" :items="categories" label="Category"
                                          item-text="name" return-object outlined :color="ACCENT_COLOR"
                                          :rules="categoryRules" />
                            </v-col>
                            <v-col>
                                <v-select v-model="selectedBrand" :items="brands" label="Brand"
                                          item-text="name" return-object outlined
                                          :rules="brandRules" />
                            </v-col>
                        </v-row>
                        <v-row class="productRow" style="margin-left: 15%; margin-right: 15%">
                            <v-layout justify-center style="margin-top: -2%">
                                <v-col style="max-width: 40%">
                                    <v-select v-model="selectedCondition" :items="conditions" label="Condition" outlined
                                          :rules="conditionRules" />
                            </v-col>
                                <v-col style="max-width: 33%">
                                <v-text-field v-model="quantity"
                                              outlined
                                              type="number"
                                              label="Quantity"
                                              :rules="quantityRules" />
                            </v-col>
                            </v-layout>
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-layout justify-end style="margin-right: 7%" pt-4>
                                    <v-btn class="no-highlight" style="margin-right: 5%; color: #fff; background-color: #777"
                                           @click="returnConfirmation()">Cancel
                                    </v-btn>
                                    <v-btn :disabled="!validProduct" :color="ACCENT_COLOR"
                                           style="color: #ffffff" :loading="loading" @click="validate()">Create
                                    </v-btn>
                                </v-layout>
                            </v-col>
                        </v-row>
                    </v-form>
                </v-row>
            </v-container>
            <v-container v-else style="text-align: center">
                <v-progress-circular size="100" indeterminate :color="PRIMARY_COLOR" />
            </v-container>
        </v-card>
    </v-layout>
</template>

<script>
    import Utilities from "../components/common/Utilities.vue";
    import Requests from "../components/common/Requests";

    const PRICE_PATTERN = /^\d+[.]?(|\d\d)$/; // At least one digit that can be followed by a period and 0 or 2 digits.

    export default {
        name: 'AccountCreation',
        mixins: [Utilities],
        data: () => ({
            categoryDataLoaded: false,
            brandDataLoaded: false,
            validProduct: true,
            loading: false,
            name: null,
            nameRules: [
                value => !Utilities.isEmpty(value) || "A name is required."
            ],
            description: null,
            descriptionRules: [
                value => !Utilities.isEmpty(value) || "A description is required.",
                value => !Utilities.isEmpty(value) && value.length <= 1000 || "Description exceeds 1000 character limit."
            ],
            price: null,
            priceRules: [
                value => !Utilities.isEmpty(value) || "A price is required.",
                value => PRICE_PATTERN.test(value) || "Invalid price format. Should be \"X.XX\" where 'X' is a number."
            ],
            categories: [],
            selectedCategory: null,
            categoryRules: [
                value => !Utilities.isEmpty(value) || "A category is required."
            ],
            brands: [],
            selectedBrand: null,
            brandRules: [
                value => !Utilities.isEmpty(value) || "A brand is required."
            ],
            conditions: [
                "New",
                "Used"
            ],
            selectedCondition: null,
            conditionRules: [
                value => !Utilities.isEmpty(value) || "A condition for the product is required."
            ],
            quantity: null,
            quantityRules: [
                value => !Utilities.isEmpty(value) || "A quantity is required.",
                value => !Utilities.isEmpty(value) && value > 0 && value < 100 || "Quantity must be between 1 and 99.",
                value => !Utilities.isEmpty(value) && !value.toString().includes(".") || "Quantity must be an integer value."
            ]
        }),
        created: async function() {
            let response = await Requests.queryCategoriesAsync();

            if (!response.error) {
                this.categories = response.data["categories"];
                this.categoryDataLoaded = true;
            }

            response = await Requests.queryBrandsAsync();

            if (!response.error) {
                this.brands = response.data["brands"];
                this.brandDataLoaded = true;
            }
        },
        methods: {
            validate() {
                if (this.$refs.form.validate()) {
                    this.loading = true;
                    this.validateAsync();
                }
            },
            async validateAsync() {
                let jsonData = {
                    name: this.name,
                    description: this.description,
                    stockQuantity: Number(this.quantity),
                    categoryId: this.selectedCategory.id,
                    taxId: 1, // Hardcoded for the time being.
                    brandId: this.selectedBrand.id,
                    price: Number(this.price),
                    condition: this.selectedCondition
                };

                let response = await Requests.createProductAsync(jsonData);
                if (!response.error) {
                    await this.$router.push("/" + this.selectedCategory["permalink"] + "/"
                        + response.data["permalink"]);
                } else {
                    alert("There was an error creating the product listing.");
                    this.loading = false;
                }
            },
            returnConfirmation() {
                let confirmed = confirm("Are you sure you want to exit?");
                if (confirmed) {
                    this.goBack();
                }
            }
        },
        computed: {
            charactersLeft: {
                get: function () {
                    let remaining = 1000;
                    if (!Utilities.isEmpty(this.description)) {
                        remaining = Math.max(0, 1000 - this.description.length);
                    }

                    return remaining.toString() + " character" + (remaining !== 1 ? "s" : "") + " left.";
                }
            }
        }
    };
</script>

<style scoped>
    .makeProduct {
        height: 100%;
    }

    .productRow {
        margin-right: 5%;
        margin-left: 5%;
    }
</style>
