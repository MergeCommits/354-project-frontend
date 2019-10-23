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

                    <v-btn @click="$router.push({ name: 'home'}).catch(err => {}); $store.state.categorySelected = null; fab = false"
                           :color="buttonColor" dark depressed
                           style="margin-right: 10px">
                        <span style="margin-right: 5px">Popular</span>
                        <v-icon small>fab fa-hotjar</v-icon>
                    </v-btn>
                    <v-btn class="animated fadeIn" v-if="$store.state.categorySelected !== null" dark
                           :color="ACCENT_COLOR" depressed
                           style="margin-right: 1%; margin-left: 1%">
                        <span style="margin-right: 5px">{{$store.state.categorySelected}}</span>
                        <v-icon small>done</v-icon>
                    </v-btn>
                    <v-speed-dial
                            v-model="fab"
                            direction="right">
                        <template v-slot:activator>
                            <v-btn
                                    v-model="fab"
                                    color="grey darken-1"
                                    text
                                    dark>
                                <span>Categories</span>
                                <v-icon v-if="fab" style="margin-left: 5px">mdi-close</v-icon>
                                <v-icon v-else style="margin-left: 5px">add</v-icon>
                            </v-btn>
                        </template>
                        <v-btn @click="$store.state.categorySelected = item;$router.push({ name: 'home'}).catch(err => {});"
                               color="grey darken-2" small
                               text v-for="(none, item) in $store.state.productCategories0"
                               style="margin-right: 1%">
                            <span style="margin-right: 5px">{{item}}</span>
                            <v-icon small>fab fa-hotjar</v-icon>
                        </v-btn>
                    </v-speed-dial>
                </v-layout>
            </v-col>
            <v-col></v-col>
        </v-row>
    </v-card>
</template>

<script>
    import Utilities from "./common/Utilities"

    export default {
        name: "TitleBar",
        mixins: [Utilities],
        data: () => ({
            fab: false,
        }),
        computed: {
            buttonColor() {
                return this.$store.state.categorySelected === null ? this.ACCENT_COLOR : 'grey darken-1'
            }
        }
    }
</script>

<style scoped>

</style>
