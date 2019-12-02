<template>
    <v-card style="padding: 10px; overflow: auto" flat outlined min-height="fit-content">
        <v-row style="max-height: 50px">
            <v-col>
                <v-layout justify-start style="margin-top: -6px;">
                    <v-btn color="grey darken-2" text @click="goBack()">
                        <v-icon color="grey darken-2" style="margin-right: 10px">
                            arrow_back
                        </v-icon>
                        GO back
                    </v-btn>

                    <v-btn @click="$store.state.categorySelected = 'popular'; fab = false; $router.push({ name: 'home'})"
                           :color="buttonColor" dark depressed
                           style="margin-right: 10px">
                        <span style="margin-right: 5px">Popular</span>
                        <v-icon small>fab fa-hotjar</v-icon>
                    </v-btn>
                    <v-btn class="animated fadeIn" v-if="$store.state.categorySelected !== 'popular'" dark
                           :color="ACCENT_COLOR" depressed
                           style="margin-right: 1%; margin-left: 1%">
                        <span style="margin-right: 5px">{{$store.state.categorySelected}}</span>
                        <v-icon small>done</v-icon>
                    </v-btn>
                    <v-speed-dial v-model="fab" direction="right" v-if="categories.length > 0">
                        <template v-slot:activator>
                            <v-btn class="no-highlight" v-model="fab" color="grey darken-1" text dark>
                                <span>Categories</span>
                                <v-icon v-if="fab" style="margin-left: 5px">mdi-close</v-icon>
                                <v-icon v-else style="margin-left: 5px">add</v-icon>
                            </v-btn>
                        </template>
                        <v-btn @click="$router.push({ name: 'search', query: {category: category.name.toLowerCase()}});
                                        $store.state.categorySelected = category.name"
                               color="grey darken-2" small v-for="category in categories.slice(0,7)"
                               v-bind:key="category.id" text style="margin-right: 1%">
                            <span style="margin-right: 5px">{{category.name}}</span>
                            <v-icon small>fab fa-hotjar</v-icon>
                        </v-btn>
                    </v-speed-dial>
                    <v-progress-circular v-else size="30" indeterminate :color="PRIMARY_COLOR"></v-progress-circular>
                </v-layout>
            </v-col>
            <v-col></v-col>
        </v-row>
    </v-card>
</template>

<script>
    import Utilities from "./common/Utilities"
    import Requests from "./common/Requests.js"
    export default {
        name: "TitleBar",
        mixins: [Utilities],
        data: () => ({
            fab: false,
            categories: []
        }),
        computed: {
            buttonColor() {
                return this.$store.state.categorySelected === 'popular' ? this.ACCENT_COLOR : 'grey darken-1'
            }
        },
        beforeMount: async function () {
            const categoriesRequest = await Requests.getCategories();
            this.categories = categoriesRequest.data.categories;
        }
    }
</script>

<style scoped>
</style>
