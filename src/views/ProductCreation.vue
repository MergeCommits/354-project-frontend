<template>
    <v-layout justify-center class="makeProduct" v-bind:style="{backgroundColor: PRIMARY_COLOR}">
        <v-card style="border-radius: 15px; height: fit-content; padding: 1vh 1%; min-width: 80%; margin-top: 5vh; margin-bottom: 5vh">
            <v-container>
                <v-row>
                    <v-form ref="form" style="width: 100%" v-model="validProduct" :lazy-validation="true">
                        <v-row style="padding-bottom: 5%">
                            <span style="font-size: 30px; width: 100%; text-align: center" class="font-weight-regular">Create a new product</span>
                        </v-row>
                        <v-row class="productRow">
                            <v-col>
                                <v-text-field v-model="name" required :rules="nameRules" :color="ACCENT_COLOR"
                                              outlined label="Product Name" />
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
                                <v-text-field v-model="price" required :rules="priceRules" :color="ACCENT_COLOR"
                                              :key="freeProduct"
                                              :disabled="freeProduct"
                                              filled label="Price" />
                            </v-col>
                            <v-col>
                                <v-checkbox v-model="freeProduct" :color="PRIMARY_COLOR"
                                            outlined label="Free?"
                                            @change="freeCheckboxCallback()" />
                            </v-col>
                        </v-row>
                        <v-row class="productRow">
                            <v-col>
                                <v-select style="width: 100%" v-model="selectedCategory" :items="categories" label="Category"
                                          item-text="name" return-object
                                          :rules="categoryRules" />
                            </v-col>
                            <v-col>
                                <v-select style="width: 100%" v-model="selectedBrand" :items="brands" label="Brand"
                                          item-text="name" return-object
                                          :rules="brandRules" />
                            </v-col>
                        </v-row>
                        <v-row class="productRow">
                            <v-col>
                                <v-text-field v-model="condition" required :rules="conditionRules"
                                              :color="ACCENT_COLOR" outlined label="Condition" />
                            </v-col>

                            <v-col>
                                <v-text-field v-model="quantity" class="mt-0 pt-0"
                                              single-line type="number"
                                              label="Quantity"
                                              :rules="quantityRules" />
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-layout justify-end style="margin-right: 7%">
                                    <v-btn class="no-highlight" style="margin-right: 5%; color: #fff; background-color: #777"
                                           @click="returnConfirmation()">Cancel
                                    </v-btn>
                                    <v-btn :disabled="!validProduct" :color="PRIMARY_COLOR"
                                           style="color: #ffffff" @click="validate()">Create
                                    </v-btn>
                                </v-layout>
                            </v-col>
                        </v-row>
                    </v-form>
                </v-row>
            </v-container>
        </v-card>
    </v-layout>
</template>

<script>
    import Utilities from "../components/common/Utilities.vue";
    import {APICall, RequestType} from "../components/common/API";

    const PRICE_PATTERN = /^\d+\.[\d]{2}$/; // At least one digit followed by a period, followed by exactly two digits.

    export default {
        name: 'AccountCreation',
        mixins: [Utilities],
        data: () => ({
            validProduct: true,
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
            freeProduct: false,
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
            condition: null,
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
        created: function() {
            const FOUND = 200;

            let categoryQuery = new APICall(RequestType.GET, "categories", null, [FOUND]);
            categoryQuery.performRequest()
                .then(response => {
                    switch (response.status) {
                        case FOUND: {
                            this.categories = response.data.categories;
                        } break;
                    }
                })

            let brandQuery = new APICall(RequestType.GET, "brands", null, [FOUND]);
            brandQuery.performRequest()
                .then(response => {
                    switch (response.status) {
                        case FOUND: {
                            this.brands = response.data.brands;
                        } break;
                    }
                })
        },
        methods: {
            validate() {
                if (this.$refs.form.validate()) {
                    let permalinkStr = encodeURI(this.name);
                    let jsonData = {
                        name: this.name,
                        description: this.description,
                        stockQuantity: this.quantity,
                        categoryId: this.selectedCategory.id,
                        taxId: 1, // Hardcoded for the time being.
                        brandId: this.selectedBrand.id,
                        condition: this.condition,
                        permalink: permalinkStr
                    };

                    const CREATED = 200;

                    let call = new APICall(RequestType.POST, "products", jsonData, [ CREATED ]);
                    call.performRequest()
                        .then(response => {
                            switch (response.status) {
                                case CREATED: {
                                    this.$router.push("/" + this.selectedCategory.permalink + "/"
                                        + response.data.permalink);
                                }
                            }
                        });
                }
            },
            returnConfirmation() {
                let confirmed = confirm("Are you sure you want to exit?");
                if (confirmed) {
                    this.goBack();
                }
            },
            freeCheckboxCallback() {
                this.price = this.freeProduct ? '0.00' : this.price;
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
