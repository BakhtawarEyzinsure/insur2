import Vue from "vue";
import VueRouter from "vue-router";
import store from "../core/store";

import frontPage from "../views/frontend/frontpage";
import login from "../views/frontend/login";
import signup from "../views/frontend/signup";
import resetPassword from "../views/frontend/resetPassword";
import addQuestion from "../views/frontend/questions/addQuestion";
import userProfile from "../views/frontend/profile/index.vue";
import admin from "../views/admin/index.vue";
import adminCategory from "../views/admin/category/index.vue";
import adminSubcategory from "../views/admin/subcategory/index.vue";
import adminQuestion from "../views/admin/question/index.vue";
import adminAgent from "../views/admin/agent/index.vue";
import agent from "../views/agent/index.vue";
import agentQuestion from "../views/agent/question/index.vue";
import agentProfile from "../views/agent/profile/index.vue";
import agency from "../views/agency/index.vue";
import agencyProfile from "../views/agency/profile/index.vue";
import agencyAgent from "../views/agency/agent/index.vue";

Vue.use(VueRouter);

const router = new VueRouter({
    scrollBehavior() {
        return { x: 0, y: 0 };
    },
    mode: "history",
    routes: [
        {
            path: "*",
            redirect: "/login"
        },
        {
            path: "/",
            name: "home",
            component: frontPage
        },
        {
            path: "/login",
            name: "login",
            component: login,
            async beforeEnter(to, from, next) {
                if (store.getters.getLoginStatus) {
                    next("/");
                } else next();
            }
        },
        {
            path: "/signup",
            name: "signup",
            component: signup
        },
        {
            path: "/reset-password",
            name: "resetPassword",
            component: resetPassword
        },
        {
            path: "/add-question",
            name: "addQuestion",
            component: addQuestion,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "/user-profile",
            name: "userProfile",
            component: userProfile,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "/admin",
            component: admin,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "/admin/category",
            name: "adminCategory",
            component: adminCategory,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "/admin/subcategory",
            name: "adminSubcategory",
            component: adminSubcategory,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "/admin/question",
            name: "adminQuestion",
            component: adminQuestion,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "/admin/agents",
            name: "adminAgent",
            component: adminAgent,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "/agent",
            component: agent,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "/agent/question",
            name: "agentQuestion",
            component: agentQuestion,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "/agent/profile",
            name: "agentProfile",
            component: agentProfile,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "/agency",
            component: agency,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "/agency/profile",
            name: "agencyProfile",
            component: agencyProfile,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "/agency/agents",
            name: "agencyAgent",
            component: agencyAgent,
            meta: {
                requiresAuth: true
            }
        }
    ]
});

// router.beforeEach(async (to, from, next) => {
//     if (store.getters.getLoginStatus == false) {
//         console.log("ok");
//         next({ name: "login" });
//     } else next();
// });

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        if (!store.getters["auth/getActiveUser"]) {
            next({
                path: "/login"
            });
        } else {
            next();
        }
    } else {
        next(); // make sure to always call next()!
    }
});

export default router;
