<template>
    <div style="width: 100%">
        <titlebar>
            <v-row style="max-height: 50px">
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
        </titlebar>
        <v-container>
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
        })
    }
</script>

<style scoped>

</style>
