<template>
    <v-layout justify-center class="fill-height" v-bind:style="{backgroundColor: PRIMARY_COLOR}">
        Logging you out...
    </v-layout>
</template>

<script>
    import Utilities from "../components/common/Utilities";
    import {APICall, RequestType} from "../components/common/API";

    export default {
        name: "Logout",
        mixins: [Utilities],
        created: function () {
            const SUCCESS = 200;

            let call = new APICall(RequestType.GET, "auth/logout", null, [SUCCESS]);
            call.performRequest()
                .then(response => {
                    switch (response.status) {
                        case SUCCESS: {
                            this.$store.commit("logout");

                            // Return to requested redirect, otherwise homepage.
                            let retPath = this.$route.query.redirect;
                            if (!Utilities.isEmpty(retPath)) {
                                this.$router.push("/" + retPath);
                            } else {
                                this.$router.push("/");
                            }
                        } break;
                    }
                });
        }
    }
</script>

<style scoped>

</style>