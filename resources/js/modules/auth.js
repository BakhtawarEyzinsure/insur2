import Axios from "axios";
import ability from "../core/ability";

export const auth = {
    namespaced: true,
    state: {
        activeUser: JSON.parse(localStorage.getItem("user")) || null,
        loginStatus: false,
        UserVerifyTokenStatus: 0,
        token: null,
        isAdmin: false
    },
    actions: {
        async register({ commit, state }, data) {
            await Axios.post("/api/register", data)
                .then(response => {
                    if (response.status === 200) {
                        commit("setActiveUser", response.data);
                        commit("setLoginStatus", true);
                        commit("setToken", response.data.token);
                        let permissions = _.map(response.data.permissions);
                        ability.update(permissions);

                        if (
                            response.data.user_type === "admin" ||
                            response.data.user_type === "super-admin"
                        )
                            commit("setIsAdmin", true);
                        return true;
                    } else if (response.status === 500) {
                        commit("setActiveUser", null);
                        commit("setToken", "");
                        commit("setLoginStatus", false);
                        commit("setIsAdmin", false);
                        return false;
                    } else {
                        commit("setActiveUser", null);
                        commit("setToken", "");
                        commit("setLoginStatus", false);
                        commit("setIsAdmin", false);
                        return response.data;
                    }
                })
                .catch(e => {
                    let errors = e.response.data.errors;
                    console.log("i am in errors");
                    console.log(errors);
                });
        },
        async login({ commit, state }, data) {
            await Axios.post("/api/login", data).then(response => {
                if (response.status === 200) {
                    commit("setActiveUser", response.data);
                    commit("setLoginStatus", true);
                    commit("setToken", response.data.access_token);
                    if (
                        response.data.type === "admin" ||
                        response.data.type === "super-admin"
                    )
                        commit("setIsAdmin", true);
                    return true;
                } else if (response.status === 400) {
                    commit("setActiveUser", null);
                    commit("setToken", "");
                    commit("setLoginStatus", false);
                    commit("setIsAdmin", false);
                    return false;
                } else if (response.status === 500) {
                    commit("setActiveUser", null);
                    commit("setToken", "");
                    commit("setLoginStatus", false);
                    commit("setIsAdmin", false);
                    return false;
                } else {
                    commit("setActiveUser", null);
                    commit("setToken", "");
                    commit("setLoginStatus", false);
                    commit("setIsAdmin", false);
                    return response.data;
                }
            });
        },
        async logout({ commit, state }) {
            localStorage.clear();
            console.log("activeUser", state.activeUser);
            await Axios.post("/api/logout", { id: state.activeUser.id }).then(
                response => {
                    if (response.status === 200) {
                        console.log("i am logout");
                        commit("setActiveUser", null);
                        commit("setToken", "");
                        commit("setLoginStatus", false);
                        commit("setIsAdmin", false);
                    } else {
                        console.log("Could not logout:", response);
                    }
                }
            );
        },
        async verfiyUserLink({ commit, state }, data) {
            commit("setUserVerifyTokenStatus", 1);
            let response = await AuthAPI.verfiyUserLink(data);
            if (response.status === 200 && response != "false") {
                commit("setUserVerifyTokenStatus", 2);
            } else {
                commit("setUserVerifyTokenStatus", 3);
            }
        }
    },
    mutations: {
        setActiveUser(state, user) {
            localStorage.setItem("user", JSON.stringify(user));
            state.activeUser = user;
        },
        setLoginStatus(state, status) {
            state.loginStatus = status;
        },
        setUserVerifyTokenStatus(state, status) {
            state.UserVerifyTokenStatus = status;
        },
        setToken(state, token) {
            state.token = token;
        },
        setIsAdmin(state, status) {
            state.isAdmin = status;
        }
    },

    getters: {
        getActiveUser(state) {
            let user =
                state.activeUser ||
                JSON.parse(localStorage.getItem("user")) ||
                null;

            console.log("user", user);
            return user;
        },
        getLoginStatus(state) {
            return state.loginStatus;
        },
        getUserVerifyTokenStatus(state) {
            return state.UserVerifyTokenStatus;
        },
        getToken(state) {
            return state.token;
        },
        getIsAdmin(state) {
            return state.isAdmin;
        }
    }
};
