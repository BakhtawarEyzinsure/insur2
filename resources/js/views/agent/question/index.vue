<template>
    <v-app>
        <v-row>
            <v-col cols="2">
                <navigation-bar></navigation-bar>
            </v-col>

            <v-col cols="9">
                <v-row v-if="questions">
                    <v-col cols="12">
                        <div class="text-center mt-5">
                            <div v-if="questions">
                                <v-card
                                    class="text-left mb-10"
                                    v-for="question in questions"
                                    :key="question.id"
                                >
                                    <v-expansion-panels :disabled="disabled">
                                        <v-expansion-panel>
                                            <v-expansion-panel-header>
                                                <strong>
                                                    {{ question.question }}
                                                </strong>
                                            </v-expansion-panel-header>
                                            <v-expansion-panel-content>
                                                <v-textarea
                                                    v-model.lazy="answer"
                                                >
                                                </v-textarea>
                                                <v-btn
                                                    color="primary"
                                                    @click="submit(question.id)"
                                                    >Answer</v-btn
                                                >
                                            </v-expansion-panel-content>
                                        </v-expansion-panel>
                                    </v-expansion-panels>
                                </v-card>
                            </div>
                        </div>
                    </v-col>
                </v-row>
            </v-col>
            <!-- <v-col cols="2" style="border: 1px black solid;">
                feeds
            </v-col> -->
        </v-row>
    </v-app>
</template>
<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
import { mapMutations } from "vuex";
import NavigationBar from "../components/navigationBar.vue";

export default {
    components: {
        NavigationBar
    },

    data() {
        return {
            answer: "",
            disabled: false
        };
    },

    created() {
        this.loadQuestions();
    },

    computed: {
        ...mapGetters({
            currentUser: "auth/getActiveUser",
            questions: "question/getQuestions"
        })
    },

    methods: {
        ...mapActions({
            loadQuestions: "question/loadQuestions",
            addAnswer: "answer/addAnswer"
        }),
        submit(id) {
            console.log("answer", this.answer);
            this.addAnswer({
                user_id: this.currentUser.id,
                question_id: id,
                answer: this.answer
            });
            this.loadQuestions();
        },
        expensionPanel() {
            this.answer = "";
        }
    }
};
</script>
