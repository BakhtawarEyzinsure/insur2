import Axios from "axios";

export const state = {
    namespaced: true,

    state: {
        states: null,
        state: null
    },
    actions: {
        async loadStates({ commit, state }) {
            await Axios.get("/api/state")
                .then(response => {
                    if (response.status === 200) {
                        commit("setStates", response.data.data);
                        return true;
                    } else if (response.status === 500) {
                        commit("setStates", null);
                        return false;
                    } else {
                        commit("setStates", null);
                        return response.data;
                    }
                })
                .catch(e => {
                    let errors = e.response.data.errors;
                    console.log("i am in errors");
                    console.log(errors);
                });
        },

        async add({ commit, state }, data) {
            await Axios.post("/api/state", data)
                .then(response => {
                    if (response.status === 200) {
                        commit("setstate", response.data.data);

                        return true;
                    } else if (response.status === 500) {
                        commit("setstate", null);

                        return false;
                    } else {
                        commit("setstate", null);
                        return response.data.data;
                    }
                })
                .catch(e => {
                    let errors = e.response.data.errors;
                    console.log("i am in errors");
                    console.log(errors);
                });
        },
        async updateState({ commit, state }, data) {
            await Axios.put("/api/state/" + data.id, data)
                .then(response => {
                    console.log("response", response.status);
                    if (response.status === 200) {
                        commit("setstate", response.data.data);
                        return true;
                    } else if (response.status === 500) {
                        commit("setstate", null);
                        return false;
                    } else {
                        commit("setstate", null);
                        return response.data.data;
                    }
                })
                .catch(e => {
                    let errors = e.response.data.errors;
                    console.log("i am in errors");
                    console.log(errors);
                });
        },
        async deleteState({ commit, state }, data) {
            await Axios.delete("/api/state/" + data.id, data)
                .then(response => {
                    if (response.status === 200) {
                        commit("setstate", response.data.data);
                        return true;
                    } else if (response.status === 500) {
                        commit("setstate", null);
                        return false;
                    } else {
                        commit("setstate", null);
                        return response.data.data;
                    }
                })
                .catch(e => {
                    let errors = e.response.data.errors;
                    console.log("i am in errors");
                    console.log(errors);
                });
        },
        async loadStatesByCountryId({ commit, state }, data) {
            await Axios.post("/api/states-by-country-id", data)
                .then(response => {
                    if (response.status === 200) {
                        commit("setStates", response.data.data);
                        return true;
                    } else if (response.status === 500) {
                        commit("setStates", null);
                        return false;
                    } else {
                        commit("setStates", null);
                        return response.data;
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
        setStates(state, states) {
            state.states = states;
        },
        setState(state, states) {
            state.states = states;
        }
    },

    getters: {
        getStates(state) {
            return state.states;
        },
        getState(state) {
            return state.state;
        }
    }
};
