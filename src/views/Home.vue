<template>
    <div style="width: 100%">
        <titlebar />
        <v-container fluid>
            <v-row style="width: 100%">
                <v-layout justify-center fill-height pt-5 wrap
                          style="min-width: 100%">
                    <!-- TODO: Make this use category.name for key binding when we eventually get unique names for them. -->
                    <v-card v-for="(category, index) in this.$store.state.inputItems" v-bind:key="index" height="200px"
                            width="300px" hover flat outlined
                            @click="selectedCategory = category; $router.push({ name: 'search'})"
                            style="margin-right: 3%; margin-top: 2%; border-radius: 10px"
                            class="animated fadeIn">
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
