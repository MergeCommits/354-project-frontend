<template v-if="getUserData('isAdmin') === true">
    <div style="width: 100%" v-if="getUserData('isAdmin') === true">
        <v-container class="spacing-playground py-0 px-2" fluid>
            <v-row>
                <v-layout justify-center pt-4 style="alignment: center; width: 100%">
                    <v-divider></v-divider>
                    <v-btn router style="color: #fff; background-color: #777" to="/admin-manage-console">
                        Management
                    </v-btn>
                    <v-divider></v-divider>
                    <v-btn router style="color: #fff; background-color: #777" to="/admin-sales">
                        Sales
                    </v-btn>
                    <v-divider></v-divider>
                    <v-btn router style="color: #fff; background-color: #777" to="/admin-profits">
                        Profits
                    </v-btn>
                    <v-divider></v-divider>
                </v-layout>
            </v-row>
            <v-row class="light-green lighten-4 mt-4 pb-1 pt-1" justify="center">
                <v-col>
                    <date-picker range v-model="timeRange" @change="offDisp"></date-picker>
                </v-col>
                <v-col>
                    <v-btn style="color: #FF8F00; background-color: #424242" :disabled="(timeRange[0]==null)" @click="getRevenues(timeRange[0], timeRange[1])">
                        Generate Report
                    </v-btn>
                </v-col>
                <v-col v-if="timeRange[0]==null && timeRange[1]==null" :key="timeRange" style="vertical-align: center">
                    Pick Dates To View Period Revenues
                </v-col>
                <v-col v-else :key="timeRange" style="vertical-align: center">
                    from  {{timeRange[0] | moment('YYYY-MM-DD')}}  to  {{timeRange[1] | moment('YYYY-MM-DD')}}
                </v-col>
            </v-row>
            <v-row v-if="revDisplay" :key="revDisplay">
                <v-col :key="chartData" style="text-align: center; font-size: 185%">Total Revenue Is <em style="font-size: 210%">{{profits}}$</em> For This Period</v-col>
            </v-row>
            <v-row class="light-green lighten-4 mt-4 mb-2 pb-1 pt-1" v-if="revDisplay" :key="revDisplay">
                <v-col style="text-align: center">
                    <v-spacer></v-spacer>
                    <v-label class="justify-center">Sales Details</v-label>
                    <v-spacer></v-spacer>
                </v-col>
            </v-row>
            <v-row :key="chartData" class="justify-center">
                <v-simple-table v-if="revDisplay" :key="revDisplay">
                    <template v-slot:default>
                        <thead>
                        <tr>
                            <th class="text-left">Date Of Profit</th>
                            <th class="text-left">Profit Amount</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="item in chartData" :key="item">
                            <td>{{item.purchased_on}}</td>
                            <td>{{item.profit}}</td>
                        </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </v-row>
        </v-container>
        <v-container fluid>
            <v-row>
                <v-col>
                    <v-layout justify-center pt-4 style="alignment: center; width: 100%">
                        <v-btn justify-center router style="color: #fff; background-color: #777" to="/home">
                            Back Home
                        </v-btn>
                    </v-layout>
                </v-col>
                <v-col>
                    <v-text-field outlined label="Under-Construciton" disabled="true" :color="ACCENT_COLOR" v-model="fillerText">
                    </v-text-field>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>
<script>
    import Utilities from "../components/common/Utilities"
    import DatePicker from 'vue2-datepicker'
    import 'vue2-datepicker/index.css'
    import Requests from "../components/common/Requests"
    import Vue from 'vue'
    import VueMoment from 'vue-moment'
    import moment from 'moment-timezone'

    Vue.use(VueMoment, {
        moment,
    })

    export default {
        name: 'AdminProfits',
        components: {
            DatePicker
        },
        date: new Date(),
        mixins: [Utilities],
        data() {
            return {
                timeRange: [null, null],
                chartData: [],
                revDisplay: null,
                profits: 0,
                fillerText: 'Change Seller\'s Fees'
            };
        },
        methods: {
            async getRevenues(date1, date2) {
                function fdate(date) {
                    return encodeURI(date.getFullYear() + "-" + (date.getMonth() + 1).toString() + "-" + date.getDate());
                }

                this.profits = 0;
                let response = await Requests.getRevenues(fdate(date1), fdate(date2));
                if (!response.error) {
                    if (response.status === Requests.HttpStatus.SUCCESS) {
                        this.profits = response.data["revenue"]
                        this.chartData = response.data["revenue_enteries"];
                    } else if (response.status === Requests.HttpStatus.NOT_FOUND) {
                        this.errorMessage = "Could not find users";
                        this.console.error(this.errorMessage);
                    }
                }
                this.onDisp();
            },
            offDisp(){
                this.revDisplay = false;
            },
            onDisp(){
                this.revDisplay = true;
            }
        }
    }
</script>

<style scoped>

</style>
