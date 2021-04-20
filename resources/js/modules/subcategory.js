import Axios from "axios";

export const subcategory = {
    namespaced: true,

    state: {
        subcategories: null,
        subcategory: null
    },
    actions: {
        async loadSubcategories({ commit, state }) {
            await Axios.get("/api/subcategory")
                .then(response => {
                    if (response.status === 200) {
                        commit("setSubcategories", response.data.data);
                        return true;
                    } else if (response.status === 500) {
                        commit("setSubcategories", null);
                        return false;
                    } else {
                        commit("setSubcategories", null);
                        return response.data;
                    }
                })
                .catch(e => {
                    let errors = e.response.data.errors;
                });
        },
        async add({ commit, state }, data) {
            await Axios.post("/api/subcategory", data)
                .then(response => {
                    if (response.status === 200) {
                        commit("setSubcategory", response.data.data);

                        return true;
                    } else if (response.status === 500) {
                        commit("setSubcategory", null);

                        return false;
                    } else {
                        commit("setSubcategory", null);
                        return response.data.data;
                    }
                })
                .catch(e => {
                    let errors = e.response.data.errors;
                    console.log("i am in errors");
                    console.log(errors);
                });
        },
        async updateSubcategory({ commit, state }, data) {
            console.log("data");
            console.log(data);
            await Axios.put("/api/subcategory/" + data.id, data)
                .then(response => {
                    console.log("response", response.status);
                    if (response.status === 200) {
                        commit("setSubcategory", response.data.data);
                        return true;
                    } else if (response.status === 500) {
                        commit("setSubcategory", null);
                        return false;
                    } else {
                        commit("setSubcategory", null);
                        return response.data.data;
                    }
                })
                .catch(e => {
                    let errors = e.response.data.errors;
                    console.log("i am in errors");
                    console.log(errors);
                });
        },
        async deleteSubcategory({ commit, state }, data) {
            await Axios.delete("/api/subcategory/" + data.id, data)
                .then(response => {
                    if (response.status === 200) {
                        commit("setSubcategory", response.data.data);
                        return true;
                    } else if (response.status === 500) {
                        commit("setSubcategory", null);
                        return false;
                    } else {
                        commit("setSubcategory", null);
                        return response.data.data;
                    }
                })
                .catch(e => {
                    let errors = e.response.data.errors;
                    console.log("i am in errors");
                    console.log(errors);
                });
        },
        async loadSubcategoriesByCategoriesId({ commit, state }, data) {
            await Axios.post("/api/subcategories-by-category-id", data)
                .then(response => {
                    if (response.status === 200) {
                        commit("setSubcategories", response.data.data);
                        return true;
                    } else if (response.status === 500) {
                        commit("setSubcategories", null);
                        return false;
                    } else {
                        commit("setSubcategories", null);
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
        setSubcategories(state, subcategories) {
            state.subcategories = subcategories;
        },
        setSubcategory(state, subcategory) {
            state.subcategory = subcategory;
        }
    },

    getters: {
        getSubcategories(state) {
            return state.subcategories;
        },
        getSubcategory(state) {
            return state.subcategory;
        }
    }
};
