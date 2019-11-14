<template>
    <div>
        <titlebar></titlebar>
        <v-container fluid style="margin-left: 2%; margin-right: 2%">
            <v-row style="min-height: 40em!important; margin-top: -1em">
                <v-col style="max-width: 17.50%; margin-right: -2%">
                    <v-container fluid style="margin-right: -1%; margin-left: -1%">
                    <v-layout justify-center>
                        <v-card flat outlined min-width="100%"
                                style="border-radius:5px; min-height: 42.2em!important; margin-bottom: 11px; padding: 10px">
                            <v-layout justify-center>
                            <span class="headline font-weight-regular"
                                  style="color:#424242">Filters</span>
                            </v-layout>
                            <v-layout justify-center pt-5>
                                <v-select
                                        style="margin-left: 5%; margin-right: 5%; max-width: 80%!important;"
                                        label="Sort by price"
                                        :background-color="isFilterActive(priceOrderFilter)"
                                        outlined filled dense clearable :color="this.PRIMARY_COLOR" rounded
                                        v-model="priceOrderFilter"
                                        :items="filters">
                                    Sort by
                                </v-select>
                            </v-layout>
                            <v-layout justify-center style="margin-top: -5%">
                                <v-container fluid>
                                    <v-row>
                                        <v-layout justify-center>
                                            <span class="title font-weight-light">Price range</span>
                                        </v-layout>
                                    </v-row>
                                    <v-row style="margin-left: -20px; margin-right: -20px">
                                        <v-col style="max-width: 55%!important;">
                                            <v-text-field
                                                    style="min-width: 105%!important;"
                                                    label="From"
                                                    :background-color="isFilterActive(priceRangeFilter.low)"
                                                    filled outlined dense clearable :color="this.PRIMARY_COLOR"
                                                    v-model="priceRangeFilter.low">
                                                Sort by
                                            </v-text-field>
                                        </v-col>
                                        <v-col style="max-width: 55%!important;">
                                            <v-text-field
                                                    style="max-width: 105%!important;"
                                                    label="To"
                                                    :background-color="isFilterActive(priceRangeFilter.high)"
                                                    filled outlined dense clearable :color="this.PRIMARY_COLOR"
                                                    v-model="priceRangeFilter.high">
                                                Sort by
                                            </v-text-field>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-layout>
                        </v-card>
                    </v-layout>
                    </v-container>
                </v-col>
                <v-col style="width: 45%; margin-right: -2%" v-if="areProductsReady">
                    <v-container fluid>
                        <v-layout justify-center v-for="item in items" v-bind:key="item.name">
                            <v-card @mouseover="hoverItem = item" :color="itemCardColor(item)"
                                    outlined width="100%" height="10em" class="mb-3"
                                    style="border: solid #E0E0E0 1px!important; border-radius: 10px">
                                <v-row>
                                    <v-col style="max-width:26% !important;">
                                        <!--<v-img class="white&#45;&#45;text"-->
                                        <!--style="border-radius: 10%; margin-left: 8.5%; margin-top: 2%; margin-bottom: 2%"-->
                                        <!--min-height="20%"-->
                                        <!--min-width="20%"-->
                                        <!--:src="item.photos[0]">-->
                                        <!--</v-img>-->
                                    </v-col>
                                    <v-col>
                                        <v-layout pt-1 style="min-height: 65px">
                                                    <span class="headline font-weight-light"
                                                            style="font-size: 17px!important;">{{item.name}}</span>
                                        </v-layout>
                                        <v-layout pt-2>
                                                    <span class="headline font-weight-bold"
                                                            style="font-size: 19px!important; color:#FF8F00">${{item.price.amount}}</span>
                                        </v-layout>
                                        <v-layout align-end justify-end v-if="hoverItem && hoverItem.name === item.name"
                                                    style="margin-top: 1%">
                                            <v-btn text small depressed color="grey darken-2" :to="{ name: 'product', params: { categoryPermalink: item.category.permalink, productPermalink: item.permalink }}">details
                                                <v-icon style="margin-left: 5px; margin-right: 10px; font-size: 12px!important;"
                                                        :color="ACCENT_COLOR">arrow_forward_ios
                                                </v-icon>
                                            </v-btn>
                                        </v-layout>
                                    </v-col>
                                </v-row>
                            </v-card>
                        </v-layout>
                    </v-container>
                    <v-layout pt-3>
                        <v-pagination
                                v-model="page"
                                total-visible="6"
                                :color="PRIMARY_COLOR"
                                :length="paginationLength"
                                @next="getProducts()"
                                @input="getProducts()"
                                @previous="getProducts()"
                        ></v-pagination>
                    </v-layout>
                </v-col>
                <v-col style="width: 45%; margin-right: -2%" v-else>
                    <v-layout justify-center>
                        <v-progress-circular size="100" indeterminate :color="PRIMARY_COLOR"></v-progress-circular>
                    </v-layout>
                </v-col>
                <v-col style="width: 33%; margin-right: 3%" v-if="areProductsReady">
                    <v-container fluid>
                        <v-layout fluid justify-center style=" height: 42.28em;" v-if="hoverItem">
                        <v-card style="width: 100%; padding:10px; border-radius: 10px" flat outlined>
                            <v-container fluid>
                                <v-row>
                                    <v-layout justify-center class="ml-2"
                                              style="min-height: 40px; max-height: 40px">
                                    <span class="headline font-weight-regular"
                                          style="color:#424242">{{hoverItem.name}}</span>
                                    </v-layout>
                                </v-row>
                                <v-row style="margin-top: 10px">
                                    <v-col style="width: 50%">
                                        <!--<v-img class="white&#45;&#45;text"-->
                                        <!--style="border-radius: 10%; margin-top: 4px"-->
                                        <!--height="90%"-->
                                        <!--width="99%"-->
                                        <!--:src="hoverItem.photos[0]">-->
                                        <!--</v-img>-->
                                    </v-col>
                                    <v-col style="width: 50%">
                                        <v-layout justify-left pt-2>
                                                        <span class="headline font-weight-regular"
                                                              style="font-size: 20px!important;">Category: </span>
                                            <span class="headline font-weight-light"
                                                  style="font-size: 20px!important; margin-left: 5px"> {{hoverItem.category.name}}</span>
                                        </v-layout>
                                        <v-layout pt-2>
                                                        <span class="headline font-weight-regular"
                                                              style="font-size: 20px!important;">Price: </span>
                                            <span class="headline font-weight-regular"
                                                  style="font-size: 20px!important;margin-left: 5px; color:#FF8F00"> ${{hoverItem.price.amount}}</span>
                                        </v-layout>
                                        <v-layout pt-2>
                                                        <span class="headline font-weight-regular"
                                                              style="font-size: 20px!important;">Status: </span>
                                            <span class="headliner font-weight-regular"
                                                  style="font-size: 20px!important;margin-left: 5px; color: #4CAF50">In Stock</span>
                                        </v-layout>
                                        <v-layout justify-center pt-2>
                                        <span class="headline font-weight-regular"
                                              style="font-size: 20px!important;">Description: <span
                                                class="headline font-weight-light"
                                                style="font-size: 15px!important;margin-left: 1px"> {{hoverItem.description}} </span></span>
                                        </v-layout>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-layout justify-center pt-1>
                                    <span class="headline font-weight-light"
                                          style="font-size: 20px!important; margin-left: 5px">Your price <span>${{hoverItem.price.amount}}</span></span>
                                        <v-icon style="margin-top: -5px; margin-left: 5px" large
                                                :color="ACCENT_COLOR">fas fa-meteor
                                        </v-icon>
                                    </v-layout>
                                </v-row>
                                <v-layout justify-center>
                                    <v-card flat outlined rounded
                                            style="padding: 10px; border-radius: 10px; margin-right: 25%; margin-left: 25%;
                                                    margin-top: 10px; min-width: 280px">
                                        <v-row>
                                            <v-layout justify-center style="margin-left: 25%; margin-right: 25%"
                                                      pt-3>
                                                <v-select dense :color="ACCENT_COLOR" solo rounded
                                                          label="Quantity"
                                                          :items="Array.from(Array(10).keys())"></v-select>
                                            </v-layout>
                                        </v-row>
                                        <v-row>
                                            <v-layout justify-center
                                                      style="margin-left: 15%; margin-right: 15%">
                                                <v-btn :color="ACCENT_COLOR" dark block>
                                                    <v-icon color="white" style="margin-right: 5px">play_arrow
                                                    </v-icon>
                                                    Buy now
                                                </v-btn>
                                            </v-layout>
                                        </v-row>

                                        <v-row>
                                            <v-layout justify-center style="margin-left: 15%; margin-right: 15%"
                                                      pt-3 pb-3>
                                                <v-btn block :color="ACCENT_COLOR" dark outlined
                                                       @click="addItemToCart(hoverItem)">
                                                    <v-icon style="margin-right: 5px">add_shopping_cart</v-icon>
                                                    Add to cart
                                                </v-btn>
                                            </v-layout>
                                        </v-row>
                                    </v-card>
                                </v-layout>
                            </v-container>
                        </v-card>
                    </v-layout>
                    </v-container>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
    import Utilities from "../components/common/Utilities";
    import TitleBar from "../components/TitleBar";

    export default {
        name: "Search",
        mixins: [Utilities],
        components: {
            'titlebar': TitleBar
        },
        computed: {
            items() {
                return this.$store.state.inputItems;
            },
            queryString() {
                return Utilities.dictToQueryString({
                    ...this.$route.query,
                    page: this.page - 1,
                    limit: this.ITEMS_PER_PAGE_LIMIT
                });
            },
            paginationLength() {
                let paginationLength = Math.ceil(this.$store.state.productsCount / this.ITEMS_PER_PAGE_LIMIT);
                return (paginationLength === 0) ? 1 : paginationLength;
            },
        },
        async beforeMount() {
            let query = this.$route.query;
            if ("page" in query) {
                this.page = this.$route.query["page"];
            }
            await this.$store.dispatch("fetchProducts", Utilities.dictToQueryString({
                ...this.$route.query,
                page: this.page - 1,
                limit: this.ITEMS_PER_PAGE_LIMIT
            })).then(p => this.areProductsReady = true);
        },
        data: () => ({
            ITEMS_PER_PAGE_LIMIT: 4,
            areProductsReady: false,
            priceRangeFilter: {
                low: null,
                high: null
            },
            hoverItem: null,
            page: 1,
            priceOrderFilter: null,
            filters: [{text: "Highest to Lowest", value: "highToLow"}, {text: "Lowest to Highest", value: "lowToHigh"}],
        }),
        methods: {
            itemCardColor(item) {
                return this.hoverItem && item.name === this.hoverItem.name ? "grey lighten-3" : "white";
            },
            isFilterActive(vModel) {
                return vModel ? this.ACCENT_COLOR : null;
            },
            getProducts() {
                this.areProductsReady = false;
                this.$store.dispatch('fetchProducts', this.queryString).then(response => this.areProductsReady = true)
            },
            addItemToCart(item) {
                // TODO:
            }
        }
    }
</script>

<style scoped>

</style>
