<template>
    <v-layout justify-center fill-height pt-5 wrap style="min-width: 110%; margin-left: -3%">
        <v-card v-for="category in categories" height="200px" width="300px" hover
                style="margin-right: 3%; margin-top: 2%; border-radius: 10px">
            <v-img  class="white--text"
                    height="200px"
                    :src="category.imageUrl">
                <v-card-title class="align-end fill-height">Top 10 {{category.name}}</v-card-title>
            </v-img>

        </v-card>
    </v-layout>
</template>
    <script>
        export default {
            name: "Main",
            data: () => ({
                categories: [
                    {name: 'cars', imageUrl:'https://picsum.photos/id/1013/4256/2832'},
                    {name: 'sports', imageUrl:'https://picsum.photos/id/1016/3844/2563'},
                    {name: 'kitchen', imageUrl:'https://picsum.photos/id/1055/5472/3648'},
                    {name: 'drugs', imageUrl:'https://picsum.photos/id/1024/1920/1280'},
                    {name: 'drugs', imageUrl:'https://picsum.photos/id/1029/4887/2759'},
                    {name: 'drugs', imageUrl:'https://picsum.photos/id/103/2592/1936'},
                    {name: 'drugs', imageUrl:'https://picsum.photos/id/1033/2048/1365'},
                    {name: 'drugs', imageUrl:'https://picsum.photos/id/1038/3914/5863'},
                    {name: 'drugs', imageUrl:'https://picsum.photos/id/1026/4621/3070'}
                ]
            })
        }
    </script>

    <style scoped>

    </style>
