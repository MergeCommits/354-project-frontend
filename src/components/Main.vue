<template>
    <div>
        <v-card style="padding: 10px" flat outlined min-height="fit-content">
            <v-row v-if="!selectedCategory">
                <v-col></v-col>
                <v-col>
                    <v-layout justify-center>
                        <v-btn large :color="ACCENT_COLOR" dark depressed @click="categorySelected = !categorySelected">
                            <span style="margin-right: 5px">Popular</span>
                            <v-icon>fab fa-hotjar</v-icon>
                        </v-btn>

                        <v-btn text large>
                            <span>Example</span>
                            <v-icon>mdi-heart</v-icon>
                        </v-btn>

                        <v-btn text large>
                            <span>Example</span>
                            <v-icon>mdi-map-marker</v-icon>
                        </v-btn>
                        <v-menu bottom
                                offset-y
                                origin="center center">
                            <template v-slot:activator="{ on }">
                                <v-btn v-on="on" text large>
                                    Example
                                    <v-icon color="#424242" large>keyboard_arrow_down</v-icon>
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
            <v-row v-else>
                <v-col>
                    <v-layout>
                        <v-btn text @click="selectedCategory=null">
                            <v-icon style="margin-right: 10px">
                                arrow_back
                            </v-icon>
                            GO back
                        </v-btn>
                    </v-layout>
                </v-col>
                <v-col>
                    <v-layout justify-center>
                        <v-icon large :color="ACCENT_COLOR">fab fa-hotjar</v-icon>
                        <span class="headline" style="margin-left: 7px; margin-top: 5px"> Top 10 {{selectedCategory.name}} Items</span>
                    </v-layout>
                </v-col>
                <v-col>
                </v-col>
            </v-row>
        </v-card>
        <v-container>
            <v-row>
                <v-layout v-if="!selectedCategory" justify-center fill-height pt-5 wrap
                          style="min-width: 110%; margin-left: -3%">
                    <v-card v-for="category in categories" height="200px" width="300px" hover
                            @click="selectedCategory = category; "
                            style="margin-right: 3%; margin-top: 2%; border-radius: 10px">
                        <v-img class="white--text"
                               height="200px"
                               :src="category.imageUrl">
                            <v-card-title class="align-end fill-height">Top 10 {{category.name}}</v-card-title>
                        </v-img>

                    </v-card>
                </v-layout>
                <v-layout v-else justify-center fill-height pt-5 wrap style="min-width: 110%; margin-left: -3%">
                    <v-container>
                        <v-row>
                            <v-col>
                                <v-layout fill-height justify-start>
                                    <span>Filters menu</span>
                                </v-layout>
                            </v-col>
                            <v-col style="border-left: solid grey 1px; border-right: solid grey 1px; min-width: 70%; min-height: 40em!important;">
                                <v-layout justify-center>
                                    Items
                                </v-layout>
                            </v-col>
                            <v-col>

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
            ]
        }),
        methods: {}
    }
</script>

<style scoped>

</style>
