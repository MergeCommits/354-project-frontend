<template>
    <v-layout justify-center class="register" v-bind:style="{backgroundColor: PRIMARY_COLOR}">
        Logging you out...
    </v-layout>
</template>

<script>
    import Utilities from "../components/common/Utilities";

    export default {
        name: "Logout",
        mixins: [Utilities],
        created: function () {
            // Return to requested redirect, otherwise homepage.
            let retPath = this.$route.query.redirect;
            if (!Utilities.isEmpty(retPath)) {
                this.$router.push("/" + retPath);
            } else {
                this.$router.push("/");
            }
        }
    }
</script>

<style scoped>

</style>