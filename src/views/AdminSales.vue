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
                    <v-btn style="color: #FF8F00; background-color: #424242" :disabled="(timeRange[0]==null)" @click="getSales(timeRange[0], timeRange[1])">
                        Generate Report
                    </v-btn>
                </v-col>
                <v-col v-if="timeRange[0]==null && timeRange[1]==null" :key="timeRange" style="vertical-align: center">
                    Pick Dates To View Period Sales Data
                </v-col>
                <v-col v-else :key="timeRange" style="vertical-align: center">
                    from  {{timeRange[0] | moment('YYYY-MM-DD')}}  to  {{timeRange[1] | moment('YYYY-MM-DD')}}
                </v-col>
            </v-row>
            <v-row v-if="salesDisplay" :key="salesDisplay">
                <v-col :key="chartData" style="text-align: center; font-size: 185%">There are <em style="font-size: 210%">{{chartData}}</em> sales for this period</v-col>
            </v-row>
        </v-container>
        <v-container fluid>
            <v-row class="light-green lighten-4 mt-4 mb-2 pb-1 pt-1">
                <v-col style="text-align: center">
                    <v-spacer></v-spacer>
                    <v-label class="justify-center">TOP 10 LEADER BOARD SELLERS (ALL TIME)</v-label>
                    <v-spacer></v-spacer>
                </v-col>
            </v-row>
            <v-row :key="leaderBoardData" class="justify-center">
                <v-simple-table>
                    <template v-slot:default>
                        <thead>
                        <tr>
                            <th class="text-left">Rank</th>
                            <th class="text-left">Username</th>
                            <th class="text-left">Sales</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="item in leaderBoardData" :key="item.username">
                            <td>{{item.rank}}</td>
                            <td>{{item.username}}</td>
                            <td>{{item.sales}}</td>
                        </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </v-row>
        </v-container>
        <v-container fluid>
            <v-col>
                <v-layout justify-center pt-4 style="alignment: center; width: 100%">
                    <v-btn justify-center router style="color: #fff; background-color: #777" to="/home">
                        Back Home
                    </v-btn>
                </v-layout>
            </v-col>
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
        name: 'AdminSales',
        components: {
            DatePicker
        },
        date: new Date(),
        mixins: [Utilities],
        data() {
            return {
                timeRange: [null, null],
                chartData: null,
                errorMessage: null,
                leaderBoardData: [],
                salesDisplay: false
            };
        },
        created: async function () {
            let response = await Requests.getSalesLeaders();
            if (!response.error) {
                if (response.status === Requests.HttpStatus.SUCCESS) {
                    let dat = response.data['top_sellers'];
                    for(let i = 0; i < dat.length; i++){
                        this.leaderBoardData.push({username: dat[i].username, sales: dat[i].sales, rank: i+1});
                    }
                } else if (response.status === Requests.HttpStatus.NOT_FOUND) {
                    this.errorMessage = "Could not find users";
                    this.console.error(this.errorMessage)
                }
            }
        },
        methods: {
            async getSales(date1, date2) {
                function fdate(date) {
                    return encodeURI(date.getFullYear() + "-" + (date.getMonth()+1).toString() + "-" + date.getDate());
                }
                this.chartData = 0;
                let response = await Requests.getSalesData(fdate(date1), fdate(date2));
                if (!response.error) {
                    if (response.status === Requests.HttpStatus.SUCCESS) {
                        this.chartData = response.data['numberItems'];
                    } else if (response.status === Requests.HttpStatus.NOT_FOUND) {
                        this.errorMessage = "Could not find users";
                        this.console.error(this.errorMessage);
                    }
                }
                this.onDisp();
            },
            offDisp(){
                this.salesDisplay = false;
            },
            onDisp(){
                this.salesDisplay = true;
            }
        }
    }
</script>

<style scoped>

</style>
