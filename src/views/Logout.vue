<template>
    <v-layout justify-center class="fill-height" v-bind:style="{backgroundColor: PRIMARY_COLOR}">
        Logging you out...
    </v-layout>
</template>

<script>
    import Utilities from "../components/common/Utilities";
    import API from "../components/common/API";

    export default {
        name: "Logout",
        mixins: [Utilities],
        created: function () {
            API.getRequest("auth/logout")
                .then(response => {
                    if (response.status === 200) {
                        this.$store.commit("logout");

                        // Return to requested redirect, otherwise homepage.
                        let retPath = this.$route.query.redirect;
                        if (!Utilities.isEmpty(retPath)) {
                            this.$router.push("/" + retPath);
                        } else {
                            this.$router.push("/");
                        }
                    }
                })
                .catch(() => {
                    // Just return to the homepage anyway.
                    // console.error(error);
                    this.$router.push("/");
                });
        }
    }
</script>

<style scoped>

</style>