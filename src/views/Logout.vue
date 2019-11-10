<template>
    <v-layout justify-center class="fill-height" v-bind:style="{backgroundColor: PRIMARY_COLOR}">
        Logging you out...
    </v-layout>
</template>

<script>
    import Utilities from "../components/common/Utilities";
    import Requests from "../components/common/Requests";

    export default {
        name: "Logout",
        mixins: [Utilities],
        created: async function () {
            let response = await Requests.logoutAsync();
            if (!response.error) {
                this.$store.commit("logout");
            } else {
                alert("There was an error logging you out. Please try again in a moment.");
            }
            this.returnToRedirect();
        }
    }
</script>

<style scoped>

</style>