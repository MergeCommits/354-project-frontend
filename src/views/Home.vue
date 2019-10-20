<template>
    <div style="width: 100%">
        <titlebar/>
        <v-container fluid>
            <v-row style="width: 100%">
                <v-layout justify-center fill-height pt-5 wrap
                          style="min-width: 100%">
                    <!-- TODO: Make this use category.name for key binding when we eventually get unique names for them. -->
                    <v-container fluid v-if="this.$store.state.categorySelected == null">
                        <v-card @click="selectedCategory = category; $router.push({ name: 'search'});"
                                class="animated fadeIn"
                                flat
                                height="200px" hover outlined
                                style="margin-right: 3%; margin-top: 2%; border-radius: 10px"
                                v-bind:key="index"
                                v-for="(category, index) in this.$store.state.inputItems"
                                width="300px">
                        <v-img class="white--text"
                               height="200px"
                               :src="category.imageUrl">
                            <v-card-title class="align-end fill-height font-weight-regular">Top 10 {{category.name}}
                            </v-card-title>
                        </v-img>
                        </v-card>
                    </v-container>
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
                {name: 'Drugs', imageUrl: 'https://picsum.photos/id/1026/500'}
            ],
        })
    }
</script>

<style scoped>

</style>
