<template>
    <div style="width: 100%">
        <titlebar/>
        <v-container fluid>
            <v-row style="margin-top: -13px;">
                <v-layout justify-center pt-5>
                    <v-carousel cycle height="300" style="max-width: 70%; border-radius: 10px!important;"
                                hide-delimiter-background :show-arrows="false">
                        <v-carousel-item v-for="(category, i) in categories.slice(0,10)" :key="i"
                                         :src="category.imageUrl" interval="2s">
                            <v-card height="300" width="30%" color="rgba(255,255,255,0.51)" style="padding: 10px">
                                <v-container>
                                    <v-row>
                                        <v-layout>
                                            <v-sheet width="100%" height="140%" elevation="4" color="teal">
                                                <span style="color: black; font-size: 30px!important;"
                                                      class="title font-weight-regular">{{category.name}}</span>
                                            </v-sheet>
                                        </v-layout>
                                    </v-row>
                                    <v-row>
                                        <v-layout pt-3>
                                            <span style="color: black" class="title font-weight-regular">{{category.title}}</span>
                                        </v-layout>
                                    </v-row>
                                    <v-row style="margin-top: 60px;">
                                        <v-layout justify-center>
                                            <v-btn outlined color="black"
                                                   @click="selectedCategory = category; $router.push({ name: 'search'})">
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
            </v-row>
            <v-row>
                <v-layout justify-center>
                    <v-card flat height="450px" color="transparent" width="85%">
                        <v-layout justify-center pt-3>
                            <v-card-title>Popular items</v-card-title>
                        </v-layout>
                        <v-layout justify-center wrap pt-5 style="height: 400px!important;">
                            <!-- TODO: Make this use category.name for key binding when we eventually get unique names for them. -->
                            <v-card v-for="(category, index) in this.categories.slice(13,categories.length)"
                                    v-bind:key="index"
                                    max-height="100px"
                                    max-width="190px" hover flat outlined
                                    @click="selectedCategory = category; $router.push({ name: 'search'})"
                                    style="margin-right: 3%; margin-top: -10px; border-radius: 10px; "
                                    class="animated fadeIn" v-if="categories.length > 0">
                                <v-img class="white--text" height="150px" :src="category.imageUrl"
                                       lazy-src="https://picsum.photos/id/11/10/6">
                                    <v-card-title class="align-end fill-height font-weight-regular"
                                                  style="font-size: 18px!important;">Top 10 {{category.name}}
                                    </v-card-title>
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
        beforeMount: function () {
            Requests.getCategories()
                .then(response => this.categories = response.data.categories)
                .catch(error => alert("Could not get product categories" + error));
        },
        data: () => ({
            categories: [],
        })
    }
</script>

<style scoped>

</style>
