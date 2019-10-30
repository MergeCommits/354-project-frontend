<template>
    <div style="width: 100%">
        <titlebar/>
        <v-container fluid>
            <v-row style="width: 100%">
                <v-layout justify-center fill-height pt-5 wrap
                          style="min-width: 100%">
                    <!-- TODO: Make this use category.name for key binding when we eventually get unique names for them. -->
                    <div class="wrapper" v-if="this.$store.state.categorySelected == null">
                        <v-card @click="selectedCategory = categoryAttr.categoryLabel; $router.push({ name: 'search'})"
                                class="animated fadeIn" flat height="200px"
                                hover outlined style="margin-right: 3%; margin-top: 2%; border-radius: 10px"
                                v-bind:key="categoryAttr.categoryLabel"
                                v-for="categoryAttr in this.$store.state.productCategories0"
                                width="300px">
                            <v-img :src="categoryAttr.imageUrl"
                                   class="white--text"
                                   height="200px">
                                <v-card-title class="align-end fill-height font-weight-regular"> Top 10
                                    {{categoryAttr.categoryLabel}}
                                </v-card-title>
                            </v-img>
                        </v-card>
                    </div>

                    <div class="wrapper" v-if="this.$store.state.categorySelected != null">
                        <v-card @click="selectedCategory = subCatLabel; $router.push({ name: 'search'})"
                                class="animated fadeIn"
                                flat height="200px" hover outlined
                                style="margin-right: 3%; margin-top: 2%; border-radius: 10px"
                                v-bind:key="subCatLabel"
                                v-for="subCatLabel in this.$store.getters.getProductCategories1()"
                                width="300px">
                            <!--                                            <v-img class="white&#45;&#45;text"-->
                            <!--                                                   height="200px"-->
                            <!--                                                   :src="'https://picsum.photos/id/1013/500'">-->
                            <v-card-title class="align-end fill-height font-weight-regular"> {{subCatLabel}}
                            </v-card-title>
                            <!--                                            </v-img>-->
                        </v-card>
                    </div>
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
                {name: 'Drugs', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c4/PM5544_with_non-PAL_signals.png'}
            ],
        })
    }
</script>

<style scoped>

</style>
