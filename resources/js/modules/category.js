import Axios from "axios";

export const category = {
    namespaced: true,

    state: {
        categories: null,
        category: null
    },
    actions: {
        async loadCategories({ commit, state }) {
            await Axios.get("/api/category")
                .then(response => {
                    if (response.status === 200) {
                        commit("setCategories", response.data.data);
                        return true;
                    } else if (response.status === 500) {
                        commit("setCategories", null);
                        return false;
                    } else {
                        commit("setCategories", null);
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
            await Axios.post("/api/category", data)
                .then(response => {
                    if (response.status === 200) {
                        commit("setCategory", response.data.data);

                        return true;
                    } else if (response.status === 500) {
                        commit("setCategory", null);

                        return false;
                    } else {
                        commit("setCategory", null);
                        return response.data.data;
                    }
                })
                .catch(e => {
                    let errors = e.response.data.errors;
                    console.log("i am in errors");
                    console.log(errors);
                });
        },
        async updateCategory({ commit, state }, data) {
            await Axios.put("/api/category/" + data.id, data)
                .then(response => {
                    console.log("response", response.status);
                    if (response.status === 200) {
                        commit("setCategory", response.data.data);
                        return true;
                    } else if (response.status === 500) {
                        commit("setCategory", null);
                        return false;
                    } else {
                        commit("setCategory", null);
                        return response.data.data;
                    }
                })
                .catch(e => {
                    let errors = e.response.data.errors;
                    console.log("i am in errors");
                    console.log(errors);
                });
        },
        async deleteCategory({ commit, state }, data) {
            await Axios.delete("/api/category/" + data.id, data)
                .then(response => {
                    if (response.status === 200) {
                        commit("setCategory", response.data.data);
                        return true;
                    } else if (response.status === 500) {
                        commit("setCategory", null);
                        return false;
                    } else {
                        commit("setCategory", null);
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
        setCategories(state, categories) {
            state.categories = categories;
        },
        setCategory(state, category) {
            state.categories = category;
        }
    },

    getters: {
        getCategories(state) {
            return state.categories;
        },
        getCategory(state) {
            return state.category;
        }
    }
};
