<template>
    <v-app>
        <v-navigation-drawer permanent expand-on-hover>
            <v-list>
                <v-list-item class="px-2">
                    <v-list-item-avatar>
                        <v-img :src="currentUser.image"></v-img>
                    </v-list-item-avatar>
                </v-list-item>

                <v-list-item link>
                    <v-list-item-content>
                        <v-list-item-title class="title">
                            {{ currentUser.name }}
                        </v-list-item-title>
                        <v-list-item-subtitle>
                            {{ currentUser.email }}
                        </v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </v-list>

            <v-divider></v-divider>

            <v-list nav dense>
                <v-list-item to="/admin/category">
                    <v-list-item-icon>
                        <v-icon>mdi-folder</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Category</v-list-item-title>
                </v-list-item>
                <v-list-item link to="/admin/subcategory">
                    <v-list-item-icon>
                        <v-icon>mdi-account-multiple</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Subcategory</v-list-item-title>
                </v-list-item>
                <v-list-item link to="/admin/question">
                    <v-list-item-icon>
                        <v-icon>mdi-star</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Question</v-list-item-title>
                </v-list-item>
                <v-list-item link to="/admin/agent">
                    <v-list-item-icon>
                        <v-icon>mdi-account-multiple</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Agent</v-list-item-title>
                </v-list-item>
                <v-list-item link to="/admin/license-type">
                    <v-list-item-icon>
                        <v-icon>mdi-license</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>License Type</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
    </v-app>
</template>
<script>
import { mapGetters } from "vuex";

export default {
    data() {
        return {};
    },
    computed: {
        ...mapGetters({
            currentUser: "auth/getActiveUser"
        })
    }
};
</script>
