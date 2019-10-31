<template>
    <div style="width: 100%">
        <titlebar/>
        <v-container fluid>
            <v-row style="margin-top: -13px;">
                <v-layout justify-center pt-5>
                    <v-carousel cycle height="300" style="max-width: 70%; border-radius: 10px!important;"
                                hide-delimiter-background :show-arrows="false">

                        <v-carousel-item v-for="(category, i) in $store.state.inputItems" :key="i"
                                         :src="category.imageUrl" interval="2s">
                            <v-card height="300" width="30%" color="rgba(255,255,255,0.51)" style="padding: 10px">
                                <v-container>
                                    <v-row>
                                        <v-layout>
                                            <span style="color: black; font-size: 30px!important;"
                                                  class="title font-weight-regular">{{category.name}}</span>
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
            <v-row style="width: 100%">
                <v-layout justify-center>
                    <v-card flat height="450px" color="transparent" width="85%">
                        <v-layout justify-center pt-3>
                            <v-card-title>Popular items</v-card-title>
                        </v-layout>
                        <v-layout justify-center wrap fill-width
                                  pt-5 style="min-width: 100%; height: 400px!important;">
                            <!-- TODO: Make this use category.name for key binding when we eventually get unique names for them. -->
                            <v-card v-for="(category, index) in this.$store.state.inputItems" v-bind:key="index"
                                    max-height="100px"
                                    max-width="200px" hover flat outlined
                                    @click="selectedCategory = category; $router.push({ name: 'search'})"
                                    style="margin-right: 3%; margin-top: -10px; border-radius: 10px; "
                                    class="animated fadeIn">
                                <v-img class="white--text"
                                       height="150px"
                                       :src="category.imageUrl">
                                    <v-card-title class="align-end fill-height font-weight-regular"
                                                  style="font-size: 18px!important;">Top 10 {{category.name}}
                                    </v-card-title>
                                </v-img>
                            </v-card>
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

    export default {
        name: 'Main',
        components: {
            'titlebar': TitleBar,
        },
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
                {
                    name: 'Drugs',
                    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c4/PM5544_with_non-PAL_signals.png'
                }
            ],
        })
    }
</script>

<style scoped>

</style>
