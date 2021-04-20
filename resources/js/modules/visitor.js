import Axios from "axios";

export const visitor = {
    namespaced: true,

    state: {
        visitors: null,
        visitor: null
    },
    actions: {
        async loadVisitors({ commit, state }) {
            await Axios.get("/api/visitor")
                .then(response => {
                    if (response.status === 200) {
                        commit("setVisitors", response.data.data);
                        return true;
                    } else if (response.status === 500) {
                        commit("setVisitors", null);
                        return false;
                    } else {
                        commit("setVisitors", null);
                        return response.data;
                    }
                })
                .catch(e => {
                    let errors = e.response.data.errors;
                    console.log("i am in errors");
                    console.log(errors);
                });
        },
        async loadVisitorByUserId({ commit, state }, data) {
            await Axios.post("/api/visitor-by-user-id", data)
                .then(response => {
                    if (response.status === 200) {
                        commit("setVisitor", response.data.data);
                        return true;
                    } else if (response.status === 500) {
                        commit("setVisitor", null);
                        return false;
                    } else {
                        commit("setVisitor", null);
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
            await Axios.post("/api/visitor", data)
                .then(response => {
                    if (response.status === 200) {
                        commit("setVisitor", response.data.data);

                        return true;
                    } else if (response.status === 500) {
                        commit("setVisitor", null);

                        return false;
                    } else {
                        commit("setVisitor", null);
                        return response.data.data;
                    }
                })
                .catch(e => {
                    let errors = e.response.data.errors;
                    console.log("i am in errors");
                    console.log(errors);
                });
        },
        async updateVisitor({ commit, state }, data) {
            console.log("data", data);
            await Axios.put("/api/visitor/" + data.id, data)
                .then(response => {
                    console.log("response", response.status);
                    if (response.status === 200) {
                        commit("setVisitor", response.data.data);
                        return true;
                    } else if (response.status === 500) {
                        commit("setVisitor", null);
                        return false;
                    } else {
                        commit("setVisitor", null);
                        return response.data.data;
                    }
                })
                .catch(e => {
                    let errors = e.response.data.errors;
                    console.log("i am in errors");
                    console.log(errors);
                });
        },
        async deleteVisitor({ commit, state }, data) {
            await Axios.delete("/api/visitor/" + data.id, data)
                .then(response => {
                    if (response.status === 200) {
                        commit("setVisitor", response.data.data);
                        return true;
                    } else if (response.status === 500) {
                        commit("setVisitor", null);
                        return false;
                    } else {
                        commit("setVisitor", null);
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
        setVisitors(state, visitor) {
            state.visitor = visitor;
        },
        setVisitor(state, visitor) {
            state.visitor = visitor;
        }
    },

    getters: {
        getVisitors(state) {
            return state.visitors;
        },
        getVisitor(state) {
            return state.visitor;
        }
    }
};
