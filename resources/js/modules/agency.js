import Axios from "axios";

export const agency = {
    namespaced: true,

    state: {
        agencies: null,
        agency: null
    },
    actions: {
        async loadAgencies({ commit, state }) {
            await Axios.get("/api/agency")
                .then(response => {
                    if (response.status === 200) {
                        commit("setAgencies", response.data.data);
                        return true;
                    } else if (response.status === 500) {
                        commit("setAgencies", null);
                        return false;
                    } else {
                        commit("setAgencies", null);
                        return response.data;
                    }
                })
                .catch(e => {
                    let errors = e.response.data.errors;
                    console.log("i am in errors");
                    console.log(errors);
                });
        },
        async loadAgencyByUserId({ commit, state }, data) {
            await Axios.post("/api/agency-by-user-id", data)
                .then(response => {
                    if (response.status === 200) {
                        commit("setAgency", response.data.data);
                        return true;
                    } else if (response.status === 500) {
                        commit("setAgency", null);
                        return false;
                    } else {
                        commit("setAgency", null);
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
            await Axios.post("/api/agency", data)
                .then(response => {
                    if (response.status === 200) {
                        commit("setAgency", response.data.data);

                        return true;
                    } else if (response.status === 500) {
                        commit("setAgency", null);

                        return false;
                    } else {
                        commit("setAgency", null);
                        return response.data.data;
                    }
                })
                .catch(e => {
                    let errors = e.response.data.errors;
                    console.log("i am in errors");
                    console.log(errors);
                });
        },
        async updateAgency({ commit, state }, data) {
            console.log("data", data);
            await Axios.put("/api/agency/" + data.id, data)
                .then(response => {
                    console.log("response", response.status);
                    if (response.status === 200) {
                        commit("setAgency", response.data.data);
                        return true;
                    } else if (response.status === 500) {
                        commit("setAgency", null);
                        return false;
                    } else {
                        commit("setAgency", null);
                        return response.data.data;
                    }
                })
                .catch(e => {
                    let errors = e.response.data.errors;
                    console.log("i am in errors");
                    console.log(errors);
                });
        },
        async deleteAgency({ commit, state }, data) {
            await Axios.delete("/api/Agency/" + data.id, data)
                .then(response => {
                    if (response.status === 200) {
                        commit("setAgency", response.data.data);
                        return true;
                    } else if (response.status === 500) {
                        commit("setAgency", null);
                        return false;
                    } else {
                        commit("setAgency", null);
                        return response.data.data;
                    }
                })
                .catch(e => {
                    let errors = e.response.data.errors;
                    console.log("i am in errors");
                    console.log(errors);
                });
        },
        async updateAgencyLicenses({ commit, state }, data) {
            console.log("data", data);
            await Axios.post("/api/update-agency-licenses", data)
                .then(response => {
                    console.log("response", response.status);
                    if (response.status === 200) {
                        return true;
                    } else if (response.status === 500) {
                        return false;
                    } else {
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
        setAgencies(state, agencies) {
            state.agencies = agencies;
        },
        setAgency(state, agency) {
            state.agency = agency;
        }
    },

    getters: {
        getAgencies(state) {
            return state.agencies;
        },
        getAgency(state) {
            return state.agency;
        }
    }
};
