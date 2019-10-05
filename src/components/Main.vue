<template>
    <div>
        <v-card style="padding: 10px" flat outlined min-height="fit-content">
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
                                            Login
                                        </v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                                <v-list-item>
                                    <v-list-item-action>
                                        <v-icon>far fa-user-circle</v-icon>
                                    </v-list-item-action>
                                    <v-list-item-content>
                                        <v-list-item-title class="grey--text">
                                            Create an account
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
        </v-card>
        <v-container>
            <v-row>
                <v-layout v-if="!selectedCategory" justify-center fill-height pt-5 wrap
                          style="min-width: 110%; margin-left: -3%">
                    <v-card v-for="category in categories" height="200px" width="300px" hover flat outlined
                            @click="selectedCategory = category; "
                            style="margin-right: 3%; margin-top: 2%; border-radius: 10px">
                        <v-img class="white--text"
                               height="200px"
                               :src="category.imageUrl">
                            <v-card-title class="align-end fill-height font-weight-regular">Top 10 {{category.name}}</v-card-title>
                        </v-img>

                    </v-card>
                </v-layout>
                <v-layout v-else justify-center fill-height pt-5 wrap style="min-width: 110%; margin-left: -3%">
                    <v-container>
                        <v-row>
                            <v-col style="max-width: 10%; margin-left: -5%">
                                <v-layout fill-height justify-start style="margin-top: -46px">
                                    <v-card flat outlined
                                            style="border-radius:5px; min-height: 38em!important; min-width: 220%; margin-left: -120%; margin-bottom: 11px; padding: 10px">
                                           <v-layout justify-center>
                                               <span class="headline font-weight-regular"style="color:#424242">Filters</span>
                                           </v-layout>
                                    </v-card>
                                </v-layout>
                            </v-col>
                            <v-col style="min-width: 58%; min-height: 40em!important; margin-top: -56px">
                                <v-layout v-for="item in items.slice(0,4)" pt-3>
                                    <v-card :color="itemCardColor(item)" @mouseover="hoverItem = item"
                                            outlined width="100%" height="10em"
                                            style="border: solid #E0E0E0 1px!important; border-radius: 10px">
                                        <v-row>
                                            <v-col style="max-width:20% !important;">
                                                <v-img class="white--text"
                                                       style="border-radius: 10%; margin-left: 8.5%; margin-top: 4px"
                                                       height="125px"
                                                       width="125px"
                                                       :src="item.imageUrl">
                                                </v-img>
                                            </v-col>
                                            <v-col>
                                                <v-layout pt-1>
                                                    <span class="headline font-weight-light" style="font-size: 17px!important;">{{item.title}}</span>
                                                </v-layout>
                                                <v-layout pt-2>
                                                    <span class="headline font-weight-bold" style="font-size: 19px!important; color:#FF8F00">${{item.price}}</span>
                                                </v-layout>
                                                <v-layout v-if="hoverItem && hoverItem.name === item.name" style="margin-left: 83%; margin-top: 5%">
                                                    <v-btn text small depressed color="grey darken-2">details</v-btn>
                                                    <v-icon style="margin-left: -10px; margin-right: 10px; font-size: 12px!important;" :color="ACCENT_COLOR">arrow_forward_ios</v-icon>
                                                </v-layout>
                                            </v-col>
                                        </v-row>
                                    </v-card>
                                </v-layout>
                                <v-layout  pt-3>
                                    <v-pagination
                                            v-model="page"
                                            :color="PRIMARY_COLOR"
                                            :length="paginationLength"
                                    ></v-pagination>
                                </v-layout>
                            </v-col>
                            <v-col >
                                <v-layout style="margin-top: -43px; height: 98%; margin-right: -50%" v-if="hoverItem">
                                        <v-card style="width: 90%; padding:10px; border-radius: 10px" flat outlined>
                                            <v-container>
                                                <v-row>
                                                    <v-layout justify-center class="ml-2">
                                                        <span class="headline font-weight-regular"style="color:#424242">{{hoverItem.title}}</span>
                                                    </v-layout>
                                                </v-row>
                                                <v-row style="margin-top: 10px">
                                                    <v-col>
                                                        <v-img class="white--text"
                                                               style="border-radius: 10%; margin-top: 4px"
                                                               height="250px"
                                                               width="250px"
                                                               :src="hoverItem.imageUrl">
                                                        </v-img>
                                                    </v-col>
                                                    <v-col>
                                                        <v-layout justify-left pt-2>
                                                            <span class="headline font-weight-regular" style="font-size: 20px!important;">Category: </span>
                                                            <span class="headline font-weight-light" style="font-size: 20px!important; margin-left: 5px"> {{hoverItem.name}}</span>
                                                        </v-layout>
                                                        <v-layout pt-2>
                                                            <span class="headline font-weight-regular" style="font-size: 20px!important;">Price: </span>
                                                            <span class="headline font-weight-regular" style="font-size: 20px!important;margin-left: 5px; color:#FF8F00"> ${{hoverItem.price}}</span>
                                                        </v-layout>
                                                        <v-layout pt-2>
                                                            <span class="headline font-weight-regular" style="font-size: 20px!important;">Status: </span>
                                                            <span class="headline font-weight-regular" style="font-size: 20px!important;margin-left: 5px; color: #4CAF50">In Stock</span>
                                                        </v-layout>
                                                        <v-layout justify-center pt-2>
                                                            <span class="headline font-weight-regular" style="font-size: 20px!important;">Description: <span class="headline font-weight-light" style="font-size: 15px!important;margin-left: 1px"> {{hoverItem.title}} </span></span>
                                                        </v-layout>
                                                    </v-col>
                                                </v-row>
                                                <v-card flat outlined rounded style="padding: 10px; border-radius: 10px; margin-right: 25%; margin-left: 25%; margin-top: 20px">
                                                <v-row>
                                                    <v-layout justify-center style="margin-left: 25%; margin-right: 25%" pt-3>
                                                        <v-combobox solo rounded :color="ACCENT_COLOR" outlined dense label="Quantity" ></v-combobox>
                                                    </v-layout>
                                                </v-row>
                                                <v-row>
                                                    <v-layout justify-center style="margin-left: 15%; margin-right: 15%">
                                                        <v-btn  :color="ACCENT_COLOR" dark block>
                                                            <v-icon color="white" style="margin-right: 5px">play_arrow</v-icon>
                                                            Buy now
                                                        </v-btn>
                                                    </v-layout>
                                                </v-row>

                                                <v-row>
                                                    <v-layout justify-center style="margin-left: 15%; margin-right: 15%" pt-3 pb-3>
                                                        <v-btn block :color="ACCENT_COLOR" dark outlined>
                                                            <v-icon style="margin-right: 5px">add_shopping_cart</v-icon>
                                                             Add to cart
                                                        </v-btn>
                                                    </v-layout>
                                                </v-row>
                                                </v-card>
                                            </v-container>
                                        </v-card>
                                </v-layout>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-layout>
            </v-row>
        </v-container>
    </div>
</template>
<script>
    import Utilities from "./common/Utilities"

    export default {
        name: "Main",
        mixins: [Utilities],
        data: () => ({
            categorySelected: false,
            selectedCategory: null,
            hoverItem: null,
            page: 1,
            paginationLength: 5,
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
            items: [
                {price: 325, name: 'Cars', imageUrl: 'https://picsum.photos/id/1013/500', title: 'Tufoil Lubit 8 Lubit-8 with PTFE - "It takes few drops" Oil Lock Pen Stylo'},
                {price: 3,name: 'Sports', imageUrl: 'https://picsum.photos/id/1016/500', title: 'Few Days Left - Scorpio The Man Myth Legend Gildan Hoodie Sweatshirt'},
                {price: 435,name: 'Kitchen', imageUrl: 'https://picsum.photos/id/1055/500', title: 'Come Back in a Few Beers Patch Beer Iron to Sew on Patch Badge'},
                {price: 354,name: 'Drugs1', imageUrl: 'https://picsum.photos/id/1024/500', title: 'Dior J’Adore - Eau de Perfume 50ml - Used only a few'},
                {price: 99,name: 'Drugs2', imageUrl: 'https://picsum.photos/id/1029/500', title: 'Antminer A3 Very few hours used.'},
                {price: 27,name: 'Drugs3', imageUrl: 'https://picsum.photos/id/103/500', title: 'HE IS LEGEND-FEW (UK IMPORT) VINYL LP NEW'},
                {price: 12,name: 'Drugs4', imageUrl: 'https://picsum.photos/id/1033/500', title: 'For a Few Dollars More (DVD, 1998, Western Legends) GOOD'},
                {price: 2344,name: 'Drugs5', imageUrl: 'https://picsum.photos/id/1038/500', title: 'ROGER FIDO CANADA IPHONE ULOCK INSTANT TO FEW HRS'},
                {price: 101,name: 'Drugs6', imageUrl: 'https://picsum.photos/id/1026/500', title: '1951 $1.00 MS-63 FEW TONED'}
            ]
        }),
        methods: {
            itemCardColor(item){
                return this.hoverItem && item.name === this.hoverItem.name ? 'grey lighten-3' : 'white';
            }
        }
    }
</script>

<style scoped>

</style>
