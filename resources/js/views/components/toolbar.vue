<template>
    <v-toolbar dense>
        <v-btn text to="/">
            <v-icon> mdi-home </v-icon>
            <span class="hidden-md-and-down">AskJeewanJee</span>
        </v-btn>

        <v-spacer></v-spacer>

        <v-btn text v-if="user.type == 'visitor'">
            <v-icon> mdi-clipboard-list-outline </v-icon>
            <span class="hidden-md-and-down">Following</span>
        </v-btn>

        <v-btn text v-if="user.type == 'visitor'">
            <v-icon> mdi-pencil-outline </v-icon>
            <span class="hidden-md-and-down">Answer</span>
        </v-btn>

        <v-btn text v-if="user.type == 'visitor'">
            <v-icon> mdi-account-group-outline </v-icon>
            <span class="hidden-md-and-down">Spaces</span>
        </v-btn>

        <v-btn text v-if="user.type == 'visitor'">
            <v-icon> mdi-bell-outline </v-icon>
            <span class="hidden-md-and-down">Notifications</span>
        </v-btn>

        <v-btn text v-if="user.type == 'visitor'" to="/user-profile">
            <v-icon> mdi-face-profile </v-icon>
            <span class="hidden-md-and-down">Profile</span>
        </v-btn>

        <v-text-field
            v-model="search"
            prepend-inner-icon="mdi-magnify"
            placeholder="Search AskJeewanJee"
            clearable
            hide-details
            dense
            outlined
            height="40"
        ></v-text-field>

        <v-btn text icon to="/login" v-if="currentUser == null" title="Login">
            <v-icon>mdi-login</v-icon>
        </v-btn>

        <v-btn text icon @click="logoutUser" title="Logout" v-else>
            <v-icon>mdi-logout</v-icon>
        </v-btn>

        <v-btn
            to="/add-question"
            class="primary"
            v-if="
                user.type == 'agent' ||
                    user.type == 'agency' ||
                    user.type == 'visitor'
            "
        >
            Ask Question
        </v-btn>
        <v-btn
            class="success ml-3"
            @click="toDashboard"
            v-if="
                user.type == 'super-admin' ||
                    user.type == 'admin' ||
                    user.type == 'agent' ||
                    user.type == 'agency'
            "
        >
            Dashboard
        </v-btn>
        <!-- <b-button class="ml-4" variant="success">Button</b-button> -->
    </v-toolbar>
</template>
<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";

export default {
    data() {
        return {
            search: ""
        };
    },
    computed: {
        ...mapGetters({
            loginStatus: "auth/getLoginStatus",
            currentUser: "auth/getActiveUser"
        }),
        user() {
            let user = this.currentUser;
            if (user == null) {
                user = { type: "guest" };
            }
            return user;
        }
    },
    methods: {
        ...mapActions({
            logout: "auth/logout"
        }),
        async logoutUser() {
            this.logout();
            if (this.$route.path != "/") this.$router.push("/");
        },
        toDashboard() {
            if (this.currentUser.type == "admin") {
                if (this.$route.path != "/admin") this.$router.push("/admin");
            } else if (this.currentUser.type == "super-admin") {
                if (this.$route.path != "/admin") this.$router.push("/admin");
            } else if (this.currentUser.type == "agent") {
                if (this.$route.path != "/agent") this.$router.push("/agent");
            } else if (this.currentUser.type == "agency") {
                if (this.$route.path != "/agency") this.$router.push("/agency");
            }
        }
    }
};
</script>
