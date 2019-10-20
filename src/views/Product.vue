<template>
    <v-container fluid>
        <v-row style="width: 100%">
            <v-layout justify-center fill-height pt-5 wrap style="min-width: 100%">
                <v-card>
                    <v-layout wrap justify-center style="padding: 30px">
                        <!-- Main product window. -->
                        <v-card style="margin-right: 3%;" width="60%" min-width="300px">
                            <v-card-title>
                                Premium Dual-Core Thing that has <code>{{this.$route.params.id}}</code> in its url path.
                            </v-card-title>
                            <v-img style="margin: 10px"
                                    src="https://media1.tenor.com/images/9c8dbe54630d66ada86d583883ba2141/tenor.gif"
                                    class="grey lighten-2"
                            />
                        </v-card>

                        <!-- Purchase bar. -->
                        <v-card class="animated fadeIn" min-width="250px"
                                tile elevation="14" width="35%" v-bind:style="{backgroundColor: PRIMARY_COLOR}">
                            <v-card-title>test{{this.$route.params.id}}</v-card-title>

                            <v-card-actions>
                                <v-btn width="100%" text>OH MY GOD</v-btn>
                            </v-card-actions>
                            <v-card-actions>
                                <v-btn width="100%" text>I STUBBED MY TOW</v-btn>
                            </v-card-actions>
                        </v-card>

                        <v-layout wrap>
                        <h2>Description:</h2>
                        You sit at the restaurant with your young son, he says he is hungry. You agree to get him dinner. You open up to the kids menu, your child is far to young for adult food. Chicken nugger stares at you from the page. You don’t understand. Your palms get sweaty and your son complains. He says he is hungry. Your mind strains, searching for an answer in a world of sweer potato and French fried. You try to order the chicken nugger, but you cannot. The words cannot escape your lips. Your son is hungry, he complains. The waitress stares at you, her head a spinning chicken nugger, her arms swinging French fried. Your son cries the tears of a chicken nugger-less child. In your mind you scream. It is raining sweer potato now, you have French fried engraved on your left temple and you do not understand. Your son weeps in the corner, he is starving. Starving for the chicken nugger.
                        </v-layout>
                    </v-layout>
                </v-card>
            </v-layout>
        </v-row>
    </v-container>
</template>

<script>
    import Utilities from "../components/common/Utilities";

    export default {
        name: "Product",
        mixins: [Utilities]
    }
</script>

<style scoped>

</style>