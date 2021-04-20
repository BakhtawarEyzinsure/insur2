import Axios from "axios";

export const user = {
    namespaced: true,

    state: {
        users: null,
        user: null
    },
    actions: {
        async loadAgents({ commit, state }) {
            await Axios.get("/api/user?type=agent")
                .then(response => {
                    if (response.status === 200) {
                        commit("setUsers", response.data.data);
                        return true;
                    } else if (response.status === 500) {
                        commit("setUsers", null);
                        return false;
                    } else {
                        commit("setUsers", null);
                        return response.data;
                    }
                })
                .catch(e => {
                    let errors = e.response.data.errors;
                    console.log("i am in errors");
                    console.log(errors);
                });
        },
        async loadUsers({ commit, state }, data) {
            await Axios.get("/api/user", data)
                .then(response => {
                    if (response.status === 200) {
                        commit("setUsers", response.data.data);
                        return true;
                    } else if (response.status === 500) {
                        commit("setUsers", null);
                        return false;
                    } else {
                        commit("setUsers", null);
                        return response.data;
                    }
                })
                .catch(e => {
                    let errors = e.response.data.errors;
                    console.log("i am in errors");
                    console.log(errors);
                });
        },
        async loadUser({ commit, state }, data) {
            console.log("loaduser Data", data.id);
            await Axios.get("/api/user/" + data.id)
                .then(response => {
                    if (response.status === 200) {
                        commit("setUser", response.data.data);
                        return true;
                    } else if (response.status === 500) {
                        commit("setUser", null);
                        return false;
                    } else {
                        commit("setUser", null);
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
            await Axios.post("/api/user", data)
                .then(response => {
                    if (response.status === 200) {
                        commit("setUser", response.data.data);

                        return true;
                    } else if (response.status === 500) {
                        commit("setUser", null);

                        return false;
                    } else {
                        commit("setUser", null);
                        return response.data.data;
                    }
                })
                .catch(e => {
                    let errors = e.response.data.errors;
                    console.log("i am in errors");
                    console.log(errors);
                });
        },
        async updateUser({ commit, state }, data) {
            // console.log("data", data);
            await Axios.put("/api/user/" + data.id, data)
                .then(response => {
                    console.log("response", response.status);
                    if (response.status === 200) {
                        commit("setUser", response.data.data);
                        return true;
                    } else if (response.status === 500) {
                        commit("setUser", null);
                        return false;
                    } else {
                        commit("setUser", null);
                        return response.data.data;
                    }
                })
                .catch(e => {
                    let errors = e.response.data.errors;
                    console.log("i am in errors");
                    console.log(errors);
                });
        },
        async deleteuser({ commit, state }, data) {
            await Axios.delete("/api/user/" + data.id)
                .then(response => {
                    if (response.status === 200) {
                        commit("setUser", response.data.data);
                        return true;
                    } else if (response.status === 500) {
                        commit("setUser", null);
                        return false;
                    } else {
                        commit("setUser", null);
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
        setUsers(state, Users) {
            state.users = Users;
        },
        setUser(state, user) {
            state.user = user;
        }
    },

    getters: {
        getUsers(state) {
            // console.log(state);
            return state.users;
        },
        getUser(state) {
            return state.user;
        }
    }
};
