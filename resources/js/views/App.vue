<template>
    <v-app>
        <!-- <v-navigation-drawer app></v-navigation-drawer> -->

        <v-main>
            <toolbar></toolbar>
            <router-view></router-view>

            <!-- <v-footer>
                <v-btn icon>
                    <v-icon>mdi-magnify</v-icon>
                </v-btn>

                <v-btn icon>
                    <v-icon>mdi-heart</v-icon>
                </v-btn>

                <v-btn icon>
                    <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
            </v-footer> -->
        </v-main>
        <!-- <v-footer app></v-footer> -->
    </v-app>
</template>
<script>
import Toolbar from "./components/toolbar.vue";
// import { mapActions } from "vuex";

export default {
    components: {
        Toolbar
    }
};
</script>
