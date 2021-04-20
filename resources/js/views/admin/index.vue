<template>
    <v-app>
        <v-row>
            <v-col cols="2">
                <navigation-bar></navigation-bar>
            </v-col>

            <v-col cols="4">
                <div class="justify-start mt-12">
                    <user-registration-chart></user-registration-chart>
                </div>
            </v-col>
            <v-col cols="4">
                <div class="mt-3">
                    <sales-chart></sales-chart>
                </div>
            </v-col>
            <v-col cols="2" style="border: 1px black solid;">
                feeds
            </v-col>
        </v-row>
    </v-app>
</template>
<script>
import { mapGetters } from "vuex";
import NavigationBar from "./components/navigationBar.vue";
import UserRegistrationChart from "./components/userRegistrationChart.vue";
import SalesChart from "./components/salesChart.vue";

export default {
    components: {
        NavigationBar,
        UserRegistrationChart,
        SalesChart
    },
    data() {
        return {
            name: ""
        };
    },
    computed: {
        ...mapGetters({
            currentUser: "auth/getActiveUser"
        }),
        setUserName() {
            this.name = this.currentUser.name;
        }
    }
};
</script>
