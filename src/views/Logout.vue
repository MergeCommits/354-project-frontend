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
            const NO_AUTH = 400;

            let call = new APICall(RequestType.GET, "auth/logout", null, [SUCCESS, NO_AUTH]);
            call.performRequest()
                .then(response => {
                    switch (response.status) {
                        case SUCCESS:
                        case NO_AUTH: {
                            this.$store.commit("logout");
                            this.returnToRedirect();
                        } break;
                    }
                });
        }
    }
</script>

<style scoped>

</style>