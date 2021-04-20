import Axios from "axios";

export const agent = {
    namespaced: true,

    state: {
        agents: null,
        agent: null
    },
    actions: {
        async loadAgents({ commit, state }) {
            await Axios.get("/api/agent", data)
                .then(response => {
                    if (response.status === 200) {
                        commit("setAgents", response.data.data);
                        return true;
                    } else if (response.status === 500) {
                        commit("setAgents", null);
                        return false;
                    } else {
                        commit("setAgents", null);
                        return response.data;
                    }
                })
                .catch(e => {
                    let errors = e.response.data.errors;
                    console.log("i am in errors");
                    console.log(errors);
                });
        },
        async loadAgent({ commit, state }) {
            await Axios.get("/api/agent/", data.id)
                .then(response => {
                    if (response.status === 200) {
                        commit("setAgent", response.data.data);
                        return true;
                    } else if (response.status === 500) {
                        commit("setAgent", null);
                        return false;
                    } else {
                        commit("setAgent", null);
                        return response.data;
                    }
                })
                .catch(e => {
                    let errors = e.response.data.errors;
                    console.log("i am in errors");
                    console.log(errors);
                });
        },
        async loadAgentByUserId({ commit, state }, data) {
            await Axios.post("/api/agent-by-user-id", data)
                .then(response => {
                    if (response.status === 200) {
                        commit("setAgent", response.data.data);
                        return true;
                    } else if (response.status === 500) {
                        commit("setAgent", null);
                        return false;
                    } else {
                        commit("setAgent", null);
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
            await Axios.post("/api/agent", data)
                .then(response => {
                    if (response.status === 200) {
                        commit("setAgent", response.data.data);

                        return true;
                    } else if (response.status === 500) {
                        commit("setAgent", null);

                        return false;
                    } else {
                        commit("setAgent", null);
                        return response.data.data;
                    }
                })
                .catch(e => {
                    let errors = e.response.data.errors;
                    console.log("i am in errors");
                    console.log(errors);
                });
        },
        async updateAgent({ commit, state }, data) {
            // console.log("data", data);
            await Axios.put("/api/agent/" + data.id, data)
                .then(response => {
                    console.log("response", response.status);
                    if (response.status === 200) {
                        commit("setAgent", response.data.data);
                        return true;
                    } else if (response.status === 500) {
                        commit("setAgent", null);
                        return false;
                    } else {
                        commit("setAgent", null);
                        return response.data.data;
                    }
                })
                .catch(e => {
                    let errors = e.response.data.errors;
                    console.log("i am in errors");
                    console.log(errors);
                });
        },
        async deleteAgent({ commit, state }, data) {
            await Axios.delete("/api/agent/" + data.id, data)
                .then(response => {
                    if (response.status === 200) {
                        commit("setAgent", response.data.data);
                        return true;
                    } else if (response.status === 500) {
                        commit("setAgent", null);
                        return false;
                    } else {
                        commit("setAgent", null);
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
        setAgents(state, agents) {
            state.agents = agents;
        },
        setAgent(state, agent) {
            console.log("agent", agent);
            state.agent = agent;
        }
    },

    getters: {
        getAgents(state) {
            console.log(state);
            return state.agents;
        },
        getAgent(state) {
            return state.agent;
        }
    }
};
