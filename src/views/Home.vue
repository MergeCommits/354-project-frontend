<template>
    <div style="width: 100%">
        <titlebar/>
        <v-container fluid>
            <v-row style="margin-top: -13px;">
                <v-layout justify-center pt-5 v-if="categories.length > 0">
                    <v-carousel cycle height="300" style="max-width: 70%; border-radius: 10px!important;"
                                hide-delimiter-background :show-arrows="false">
                        <v-carousel-item v-for="(category, i) in categories.slice(0,10)" :key="i"
                                         :src="category.imageUrl" interval="2s">
                            <v-card flat height="300" width="45%"
                                    style="padding: 10px; background: linear-gradient(270deg, rgba(255,255,255,0), #00838F 60%) no-repeat;">
                                <v-container>
                                    <v-row>
                                        <v-layout>
                                            <v-layout justify-left pt-3 style="margin-left: 20px">
                                                    <span style="color: white; font-size: 30px!important;"
                                                          class="title font-weight-regular">{{category.name}}</span>
                                            </v-layout>
                                        </v-layout>
                                    </v-row>
                                    <v-row>
                                        <v-layout pt-3>
                                            <span style="color: black" class="title font-weight-regular">{{category.title}}</span>
                                        </v-layout>
                                    </v-row>
                                    <v-row style="margin-top: 20px;">
                                        <v-layout justify-left style="margin-left: 5%">
                                            <v-btn outlined color="white"
                                                   @click="selectedCategory = category; $store.state.categorySelected = category.name
                                                   $router.push({ name: 'search', query: {category: category.permalink}})">
                                                Shop now
                                                <v-icon style="margin-left: 5px; font-size: 20px!important;">
                                                    arrow_forward
                                                </v-icon>
                                            </v-btn>
                                        </v-layout>
                                    </v-row>
                                </v-container>
                            </v-card>
                        </v-carousel-item>
                    </v-carousel>
                </v-layout>
                <v-layout justify-center pt-5 v-else>
                    <v-progress-circular size="30" indeterminate :color="PRIMARY_COLOR"></v-progress-circular>
                </v-layout>
            </v-row>
            <v-row>
                <v-layout justify-center>
                    <v-card flat height="450px" color="transparent" width="85%">
                        <v-layout justify-center pt-3>
                            <v-card-title v-if="displayCategories">
                                Product categories
                                <v-icon style="margin-left: 10px" :color="ACCENT_COLOR">list</v-icon>
                            </v-card-title>
                            <v-card-title v-else>
                                Popular products
                                <v-icon style="margin-left: 10px" :color="ACCENT_COLOR">fab fa-hotjar</v-icon>
                            </v-card-title>
                        </v-layout>
                        <v-layout justify-center wrap pt-5 style="height: 400px!important;" v-if="displayCategories">
                            <!-- TODO: Make this use category.name for key binding when we eventually get unique names for them. -->
                            <v-card v-for="(category, index) in this.categories.slice(13,categories.length)"
                                    v-bind:key="index"
                                    max-height="100px"
                                    max-width="190px" hover flat outlined
                                    @click="selectedCategory = category; $store.state.categorySelected = category.name;
                                    $router.push({ name: 'search', query: {category: category.permalink}})"
                                    style="margin-right: 3%; margin-top: -10px; border-radius: 10px;"
                                    class="animated fadeIn" v-if="categories.length > 0">
                                <v-img class="white--text" height="150px" :src="category.imageUrl"
                                       lazy-src="https://picsum.photos/id/11/10/6">
                                    <v-card flat max-height="27px"
                                            style="overflow: hidden; border-bottom-right-radius: 0; border-bottom-left-radius: 0">
                                        <v-layout justify-center>
                                        <span class="align-end fill-height font-weight-regular"
                                              style="color:#424242; font-size: 15px!important;">
                                           {{category.name}}</span>
                                        </v-layout>
                                    </v-card>
                                </v-img>
                            </v-card>
                            <v-progress-circular v-else size="30" indeterminate
                                                 :color="PRIMARY_COLOR"></v-progress-circular>
                        </v-layout>
                        <v-layout justify-center wrap pt-5 style="height: 400px!important;" v-else>
                            <v-card v-for="(item, index) in this.trendingItems"
                                    v-bind:key="index"
                                    max-height="100px"
                                    max-width="190px" hover flat outlined
                                    @click="selectedCategory = category; $store.state.categorySelected = category.name;
                                    $router.push({ name: 'search', query: {category: category.permalink}})"
                                    style="margin-right: 3%; margin-top: -10px; border-radius: 10px;"
                                    class="animated fadeIn" v-if="trendingItems.length > 0">
                                <v-img class="white--text" height="150px" :src="item.product.category.imageUrl"
                                       lazy-src="https://picsum.photos/id/11/10/6">
                                    <v-card flat max-height="27px"
                                            style="overflow: hidden; border-bottom-right-radius: 0; border-bottom-left-radius: 0">
                                        <v-layout justify-center>
                                        <span class="align-end fill-height font-weight-regular"
                                              style="color:#424242; font-size: 15px!important;">
                                           {{item.product.name}}</span>
                                        </v-layout>
                                    </v-card>
                                </v-img>
                            </v-card>

                            <v-progress-circular v-else size="30" indeterminate
                                                 :color="PRIMARY_COLOR"></v-progress-circular>
                        </v-layout>
                    </v-card>
                </v-layout>
            </v-row>
        </v-container>
    </div>
</template>
<script>
    import Utilities from "../components/common/Utilities"
    import TitleBar from "../components/TitleBar";
    import Requests from "../components/common/Requests.js"
    export default {
        name: 'Main',
        components: {
            'titlebar': TitleBar,
        },
        mixins: [Utilities],
        beforeMount: async function () {
            const categoriesRequest = await Requests.getCategories();
            this.categories = categoriesRequest.data.categories;

            const trendingItemsRequest = await Requests.getTrendingItems();
            this.trendingItems = trendingItemsRequest.data.top_products;

        },
        data: () => ({
            categories: [],
            trendingItems: [],
            displayCategories: true,
        }),
        watch: {
            popular(to, from) {
                to === 'true' ? this.displayCategories = false : this.displayCategories = true;
            }
        },
        computed: {
            popular() {
                if (!this.$route.query.popular) {
                    this.displayCategories = true;
                } else {
                    this.$route.query.popular === 'true' ? this.displayCategories = false : this.displayCategories = true;
                }
                return this.$route.query.popular || 1
            },
        }
    }
</script>

<style scoped>
</style>
