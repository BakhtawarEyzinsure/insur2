import Axios from "axios";

export const answer = {
    namespaced: true,

    state: {
        answers: null,
        answer: null
    },
    actions: {
        async loadAnswers({ commit, state }) {
            await Axios.get("/api/answer")
                .then(response => {
                    if (response.status === 200) {
                        commit("setAnswers", response.data.data);
                        return true;
                    } else if (response.status === 500) {
                        commit("setAnswers", null);
                        return false;
                    } else {
                        commit("setAnswers", null);
                        return response.data;
                    }
                })
                .catch(e => {
                    let errors = e.response.data.errors;
                    console.log("i am in errors");
                    console.log(errors);
                });
        },
        async addAnswer({ commit, state }, data) {
            await Axios.post("/api/answer", data)
                .then(response => {
                    if (response.status === 200) {
                        commit("setAnswer", response.data.data);
                        return true;
                    } else if (response.status === 500) {
                        commit("setAnswer", null);
                        return false;
                    } else {
                        commit("setAnswer", null);
                        return response.data;
                    }
                })
                .catch(e => {
                    let errors = e.response.data.errors;
                    console.log("i am in errors");
                    console.log(errors);
                });
        },
        async updateAnswer({ commit, state }, data) {
            await Axios.put("/api/question/" + data.id, data)
                .then(response => {
                    console.log("response", response.status);
                    if (response.status === 200) {
                        commit("setAnswer", response.data.data);
                        return true;
                    } else if (response.status === 500) {
                        commit("setAnswer", null);
                        return false;
                    } else {
                        commit("setAnswer", null);
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
                        commit("setAnswer", response.data.data);
                        return true;
                    } else if (response.status === 500) {
                        commit("setAnswer", null);
                        return false;
                    } else {
                        commit("setAnswer", null);
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
        setAnswers(state, Answers) {
            state.Answers = Answers;
        },
        setAnswer(state, question) {
            state.question = question;
        }
    },

    getters: {
        getAnswers(state) {
            return state.Answers;
        },
        getAnswer(state) {
            return state.answer;
        }
    }
};
