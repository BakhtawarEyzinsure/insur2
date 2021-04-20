<template>
    <v-app>
        <v-row>
            <v-col cols="12" md="12" lg="2">
                <spaces></spaces>
            </v-col>

            <v-col cols="12" md="12" lg="8">
                <div class="text-left ml-5 mt-5" v-if="currentUser">
                    <h4>Hi, {{ currentUser.name }}</h4>
                </div>
                <div class="text-center mt-5">
                    <h4>AskJeewanJee</h4>

                    <div v-if="questions">
                        <v-card
                            class="text-left mb-10"
                            v-for="question in questions"
                            :key="question.id"
                        >
                            <strong> {{ question.question }} </strong>

                            <v-expansion-panels
                                v-for="answer in question.answers"
                                :key="answer.id"
                            >
                                <v-expansion-panel
                                    v-if="answer.user.status == 'A'"
                                >
                                    <v-expansion-panel-header>
                                        > Answered By: {{ answer.user.name }}
                                    </v-expansion-panel-header>
                                    <v-expansion-panel-content>
                                        {{ answer.answer }}
                                    </v-expansion-panel-content>
                                </v-expansion-panel>
                            </v-expansion-panels>
                        </v-card>
                    </div>
                </div>
            </v-col>
            <v-col cols="12" md="12" lg="2">
                <feeds></feeds>
            </v-col>
        </v-row>
    </v-app>
</template>
<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
import Feeds from "./components/feeds.vue";
import Spaces from "./components/spaces.vue";

export default {
    components: {
        Spaces,
        Feeds
    },
    data() {
        return {
            name: ""
        };
    },
    created() {
        this.loadQuestions();
    },
    computed: {
        ...mapGetters({
            currentUser: "auth/getActiveUser",
            questions: "question/getQuestions"
        }),
        setUserName() {
            this.name = this.currentUser.name;
        }
    },
    methods: {
        ...mapActions({
            loadQuestions: "question/loadQuestions"
        })
    }
};
</script>
