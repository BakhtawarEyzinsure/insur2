import Axios from "axios";

export const licenseType = {
    namespaced: true,

    state: {
        licenseTypes: null,
        licenseType: null
    },
    actions: {
        async loadLicenseTypes({ commit, state }) {
            await Axios.get("/api/licenseType")
                .then(response => {
                    if (response.status === 200) {
                        commit("setLicenseTypes", response.data.data);
                        return true;
                    } else if (response.status === 500) {
                        commit("setLicenseTypes", null);
                        return false;
                    } else {
                        commit("setLicenseTypes", null);
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
            await Axios.post("/api/licenseType", data)
                .then(response => {
                    if (response.status === 200) {
                        commit("setLicenseType", response.data.data);

                        return true;
                    } else if (response.status === 500) {
                        commit("setLicenseType", null);

                        return false;
                    } else {
                        commit("setLicenseType", null);
                        return response.data.data;
                    }
                })
                .catch(e => {
                    let errors = e.response.data.errors;
                    console.log("i am in errors");
                    console.log(errors);
                });
        },
        async updateLicenseType({ commit, state }, data) {
            await Axios.put("/api/licenseType/" + data.id, data)
                .then(response => {
                    console.log("response", response.status);
                    if (response.status === 200) {
                        commit("setLicenseType", response.data.data);
                        return true;
                    } else if (response.status === 500) {
                        commit("setLicenseType", null);
                        return false;
                    } else {
                        commit("setLicenseType", null);
                        return response.data.data;
                    }
                })
                .catch(e => {
                    let errors = e.response.data.errors;
                    console.log("i am in errors");
                    console.log(errors);
                });
        },
        async deleteLicenseType({ commit, state }, data) {
            await Axios.delete("/api/licenseType/" + data.id, data)
                .then(response => {
                    if (response.status === 200) {
                        commit("setLicenseType", response.data.data);
                        return true;
                    } else if (response.status === 500) {
                        commit("setLicenseType", null);
                        return false;
                    } else {
                        commit("setLicenseType", null);
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
        setLicenseTypes(state, licenseTypes) {
            state.licenseTypes = licenseTypes;
        },
        setLicenseType(state, licenseType) {
            state.licenseTypes = licenseType;
        }
    },

    getters: {
        getLicenseTypes(state) {
            return state.licenseTypes;
        },
        getLicenseType(state) {
            return state.licenseType;
        }
    }
};
