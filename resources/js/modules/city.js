import Axios from "axios";

export const city = {
    namespaced: true,

    state: {
        cities: null,
        city: null
    },
    actions: {
        async loadCities({ commit, state }) {
            await Axios.get("/api/city")
                .then(response => {
                    if (response.status === 200) {
                        commit("setCities", response.data.data);
                        return true;
                    } else if (response.status === 500) {
                        commit("setCities", null);
                        return false;
                    } else {
                        commit("setCities", null);
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
            await Axios.post("/api/city", data)
                .then(response => {
                    if (response.status === 200) {
                        commit("setCity", response.data.data);

                        return true;
                    } else if (response.status === 500) {
                        commit("setCity", null);

                        return false;
                    } else {
                        commit("setCity", null);
                        return response.data.data;
                    }
                })
                .catch(e => {
                    let errors = e.response.data.errors;
                    console.log("i am in errors");
                    console.log(errors);
                });
        },
        async updateCity({ commit, state }, data) {
            await Axios.put("/api/city/" + data.id, data)
                .then(response => {
                    console.log("response", response.status);
                    if (response.status === 200) {
                        commit("setCity", response.data.data);
                        return true;
                    } else if (response.status === 500) {
                        commit("setCity", null);
                        return false;
                    } else {
                        commit("setCity", null);
                        return response.data.data;
                    }
                })
                .catch(e => {
                    let errors = e.response.data.errors;
                    console.log("i am in errors");
                    console.log(errors);
                });
        },
        async deleteCity({ commit, state }, data) {
            await Axios.delete("/api/city/" + data.id, data)
                .then(response => {
                    if (response.status === 200) {
                        commit("setCity", response.data.data);
                        return true;
                    } else if (response.status === 500) {
                        commit("setCity", null);
                        return false;
                    } else {
                        commit("setCity", null);
                        return response.data.data;
                    }
                })
                .catch(e => {
                    let errors = e.response.data.errors;
                    console.log("i am in errors");
                    console.log(errors);
                });
        },
        async loadCitiesByStateId({ commit, state }, data) {
            await Axios.post("/api/cities-by-state-id", data)
                .then(response => {
                    if (response.status === 200) {
                        commit("setCities", response.data.data);
                        return true;
                    } else if (response.status === 500) {
                        commit("setCities", null);
                        return false;
                    } else {
                        commit("setCities", null);
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
        setCities(state, cities) {
            state.cities = cities;
        },
        setCity(state, city) {
            state.city = city;
        }
    },

    getters: {
        getCities(state) {
            return state.cities;
        },
        getCity(state) {
            return state.city;
        }
    }
};
