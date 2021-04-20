import Axios from "axios";

export const question = {
    namespaced: true,

    state: {
        questions: null,
        question: null,
        questionCategories: null
    },
    actions: {
        async loadQuestions({ commit, state }) {
            await Axios.get("/api/question")
                .then(response => {
                    if (response.status === 200) {
                        console.log("data", response.data.data);
                        commit("setQuestions", response.data.data);
                        return true;
                    } else if (response.status === 500) {
                        commit("setQuestions", null);
                        return false;
                    } else {
                        commit("setQuestions", null);
                        return response.data;
                    }
                })
                .catch(e => {
                    let errors = e.response.data.errors;
                    console.log("i am in errors");
                    console.log(errors);
                });
        },
        async addQuestion({ commit, state }, data) {
            console.log("yoho");
            console.log(data);
            await Axios.post("/api/question", data)
                .then(response => {
                    if (response.status === 200) {
                        commit("setQuestion", response.data.data);
                        return true;
                    } else if (response.status === 500) {
                        commit("setQuestion", null);
                        return false;
                    } else {
                        commit("setQuestion", null);
                        return response.data;
                    }
                })
                .catch(e => {
                    let errors = e.response.data.errors;
                    console.log("i am in errors");
                    console.log(errors);
                });
        },
        async updateQuestion({ commit, state }, data) {
            await Axios.put("/api/question/" + data.id, data)
                .then(response => {
                    console.log("response", response.status);
                    if (response.status === 200) {
                        commit("setQuestion", response.data.data);
                        return true;
                    } else if (response.status === 500) {
                        commit("setQuestion", null);
                        return false;
                    } else {
                        commit("setQuestion", null);
                        return response.data.data;
                    }
                })
                .catch(e => {
                    let errors = e.response.data.errors;
                    console.log("i am in errors");
                    console.log(errors);
                });
        },

        async deleteQuestion({ commit, state }, data) {
            await Axios.delete("/api/question/" + data.id, data)
                .then(response => {
                    if (response.status === 200) {
                        commit("setQuestion", response.data.data);
                        return true;
                    } else if (response.status === 500) {
                        commit("setQuestion", null);
                        return false;
                    } else {
                        commit("setQuestion", null);
                        return response.data.data;
                    }
                })
                .catch(e => {
                    let errors = e.response.data.errors;
                    console.log("i am in errors");
                    console.log(errors);
                });
        }
    },
    mutations: {
        setQuestions(state, questions) {
            state.questions = questions;
            console.log(state.questions);
        },
        setQuestion(state, question) {
            state.question = question;
        },
        setQuestionCategories(state, categories) {
            state.questionCategories = categories;
        }
    },

    getters: {
        getQuestions(state) {
            return state.questions;
        },
        getQuestion(state) {
            return state.question;
        },
        getQuestionCategories(state) {
            state.questionCategories = questions;
        }
    }
};
