<template>
    <div style="width: 100%">
        <titlebar>
            <v-row v-if="!selectedCategory" style="max-height: 50px">
                <v-col></v-col>
                <v-col>
                    <v-layout justify-center style="margin-top: -6px">
                        <v-btn :color="ACCENT_COLOR" dark depressed @click="categorySelected = !categorySelected">
                            <span style="margin-right: 5px">Popular</span>
                            <v-icon small>fab fa-hotjar</v-icon>
                        </v-btn>

                        <v-btn text>
                            <span>Example</span>
                            <v-icon small>mdi-heart</v-icon>
                        </v-btn>

                        <v-btn text>
                            <span>Example</span>
                            <v-icon>mdi-map-marker</v-icon>
                        </v-btn>
                        <v-menu bottom
                                offset-y
                                origin="center center">
                            <template v-slot:activator="{ on }">
                                <v-btn v-on="on" text>
                                    Example
                                    <v-icon color="#424242">keyboard_arrow_down</v-icon>
                                </v-btn>
                            </template>

                            <v-list dense class="grey lighten-4" rounded min-width="200">
                                <v-list-item>
                                    <v-list-item-action>
                                        <v-icon>fas fa-sign-in-alt</v-icon>
                                    </v-list-item-action>
                                    <v-list-item-content>
                                        <v-list-item-title class="grey--text">
                                            Test
                                        </v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                    </v-layout>
                </v-col>
                <v-col></v-col>
            </v-row>
            <v-row v-else style="max-height: 50px">
                <v-col>
                    <v-layout style="margin-top: -5px">
                        <v-btn text @click="selectedCategory=null">
                            <v-icon style="margin-right: 10px">
                                arrow_back
                            </v-icon>
                            GO back
                        </v-btn>
                    </v-layout>
                </v-col>
                <v-col>
                    <v-layout justify-center style="margin-top: -5px">
                        <v-icon large :color="ACCENT_COLOR">fab fa-hotjar</v-icon>
                        <span class="headline  font-weight-regular"
                              style="margin-left: 7px; margin-top: 5px; color:#424242; font-size: 21px!important;">
                            Top 10 {{selectedCategory.name}} Items
                        </span>
                    </v-layout>
                </v-col>
                <v-col>
                    <v-layout justify-end pr-4>
                    </v-layout>
                </v-col>
            </v-row>
        </titlebar>
        <v-container v-if="!selectedCategory">
            <v-row style="width: 100%">
                <v-layout justify-center fill-height pt-5 wrap
                          style="min-width: 110%; margin-left: -3%">
                    <!-- TODO: Make this use category.name for key binding when we eventually get unique names for them. -->
                    <v-card v-for="(category, index) in categories" v-bind:key="index" height="200px" width="300px" hover flat outlined
                            @click="selectedCategory = category"
                            style="margin-right: 3%; margin-top: 2%; border-radius: 10px">
                        <v-img class="white--text"
                               height="200px"
                               :src="category.imageUrl">
                            <v-card-title class="align-end fill-height font-weight-regular">Top 10 {{category.name}}
                            </v-card-title>
                        </v-img>
                    </v-card>
                </v-layout>
            </v-row>
        </v-container>
    </div>
</template>
<script>
    import Utilities from "../components/common/Utilities"
    import TitleBar from "../components/TitleBar";

    export default {
        name: 'Main',
        components: {
            'titlebar': TitleBar
        },
        props: ['search'],
        mixins: [Utilities],
        data: () => ({
            priceRangeFilter: {
                low: null,
                high: null
            },
            // TODO: Remove?
            selectedCategory: null,
            hoverItem: null,
            page: 1,
            priceOrderFilter: null,
            paginationLength: 5,
            filters: [{text: 'Highest to Lowest', value: 'highToLow'}, {text: 'Lowest to Highest', value: 'lowToHigh'}],
            categories: [
                {name: 'Cars', imageUrl: 'https://picsum.photos/id/1013/500'},
                {name: 'Sports', imageUrl: 'https://picsum.photos/id/1016/500'},
                {name: 'Kitchen', imageUrl: 'https://picsum.photos/id/1055/500'},
                {name: 'Drugs', imageUrl: 'https://picsum.photos/id/1024/500'},
                {name: 'Drugs', imageUrl: 'https://picsum.photos/id/1029/500'},
                {name: 'Drugs', imageUrl: 'https://picsum.photos/id/103/500'},
                {name: 'Drugs', imageUrl: 'https://picsum.photos/id/1033/500'},
                {name: 'Drugs', imageUrl: 'https://picsum.photos/id/1038/500'},
                {name: 'Drugs', imageUrl: 'https://picsum.photos/id/1026/500'}
            ],
            inputItems: [
                {
                    price: 325,
                    name: 'Cars',
                    imageUrl: 'https://picsum.photos/id/1013/500',
                    title: 'Tufoil Lubit 8 Lubit-8 with PTFE - "It takes few drops" Oil Lock Pen Stylo'
                },
                {
                    price: 3,
                    name: 'Sports',
                    imageUrl: 'https://picsum.photos/id/1016/500',
                    title: 'Few Days Left - Scorpio The Man Myth Legend Gildan Hoodie Sweatshirt'
                },
                {
                    price: 435,
                    name: 'Kitchen',
                    imageUrl: 'https://picsum.photos/id/1055/500',
                    title: 'Come Back in a Few Beers Patch Beer Iron to Sew on Patch Badge'
                },
                {
                    price: 354,
                    name: 'Drugs1',
                    imageUrl: 'https://picsum.photos/id/1024/500',
                    title: 'Dior J’Adore - Eau de Perfume 50ml - Used only a few'
                },
                {
                    price: 99,
                    name: 'Drugs2',
                    imageUrl: 'https://picsum.photos/id/1029/500',
                    title: 'Antminer A3 Very few hours used.'
                },
                {
                    price: 27,
                    name: 'Drugs3',
                    imageUrl: 'https://picsum.photos/id/103/500',
                    title: 'HE IS LEGEND-FEW (UK IMPORT) VINYL LP NEW'
                },
                {
                    price: 12,
                    name: 'Drugs4',
                    imageUrl: 'https://picsum.photos/id/1033/500',
                    title: 'For a Few Dollars More (DVD, 1998, Western Legends) GOOD'
                },
                {
                    price: 2344,
                    name: 'Drugs5',
                    imageUrl: 'https://picsum.photos/id/1038/500',
                    title: 'ROGER FIDO CANADA IPHONE ULOCK INSTANT TO FEW HRS'
                },
                {
                    price: 101,
                    name: 'Drugs6',
                    imageUrl: 'https://picsum.photos/id/1026/500',
                    title: '1951 $1.00 MS-63 FEW TONED'
                }
            ]
        }),
        methods: {
            itemCardColor(item) {
                return this.hoverItem && item.name === this.hoverItem.name ? 'grey lighten-3' : 'white';
            },
            isFilterActive(vModel) {
                return vModel ? this.ACCENT_COLOR : null
            }
        },
        computed: {
            items() {
                let validItems = this.clone(this.inputItems);
                if (this.priceOrderFilter === 'lowToHigh') {
                    validItems = validItems.sort(function (a, b) {
                        return a.price - b.price
                    });
                } else if (this.priceOrderFilter === 'highToLow') {
                    validItems = validItems.sort(function (a, b) {
                        return a.price - b.price
                    }).reverse();
                }
                if (!this.isEmpty(this.priceRangeFilter.high) && !this.isEmpty(this.priceRangeFilter)) {
                    validItems = validItems.filter(item => item.price >= this.priceRangeFilter.low && item.price <= this.priceRangeFilter.high)
                }
                if (!this.isEmpty(this.search)) {
                    validItems = validItems.filter(item => item.title.toLowerCase().includes(this.search.toLowerCase()))
                }
                return validItems;
            },
        }
    }
</script>

<style scoped>

</style>
