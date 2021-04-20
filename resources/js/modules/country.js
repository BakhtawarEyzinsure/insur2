import Axios from "axios";

export const country = {
    namespaced: true,

    state: {
        countries: null,
        country: null
    },
    actions: {
        async loadCountries({ commit, state }) {
            await Axios.get("/api/country")
                .then(response => {
                    if (response.status === 200) {
                        commit("setCountries", response.data.data);
                        return true;
                    } else if (response.status === 500) {
                        commit("setCountries", null);
                        return false;
                    } else {
                        commit("setCountries", null);
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
            await Axios.post("/api/country", data)
                .then(response => {
                    if (response.status === 200) {
                        commit("setcountry", response.data.data);

                        return true;
                    } else if (response.status === 500) {
                        commit("setcountry", null);

                        return false;
                    } else {
                        commit("setcountry", null);
                        return response.data.data;
                    }
                })
                .catch(e => {
                    let errors = e.response.data.errors;
                    console.log("i am in errors");
                    console.log(errors);
                });
        },
        async updatecountry({ commit, state }, data) {
            await Axios.put("/api/country/" + data.id, data)
                .then(response => {
                    console.log("response", response.status);
                    if (response.status === 200) {
                        commit("setcountry", response.data.data);
                        return true;
                    } else if (response.status === 500) {
                        commit("setcountry", null);
                        return false;
                    } else {
                        commit("setcountry", null);
                        return response.data.data;
                    }
                })
                .catch(e => {
                    let errors = e.response.data.errors;
                    console.log("i am in errors");
                    console.log(errors);
                });
        },
        async deletecountry({ commit, state }, data) {
            await Axios.delete("/api/country/" + data.id, data)
                .then(response => {
                    if (response.status === 200) {
                        commit("setcountry", response.data.data);
                        return true;
                    } else if (response.status === 500) {
                        commit("setcountry", null);
                        return false;
                    } else {
                        commit("setcountry", null);
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
        setCountries(state, countries) {
            state.countries = countries;
        },
        setcountry(state, countries) {
            state.countries = countries;
        }
    },

    getters: {
        getCountries(state) {
            return state.countries;
        },
        getCountry(state) {
            return state.country;
        }
    }
};
