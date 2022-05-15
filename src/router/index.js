import Vue from "vue";
import VueRouter from "vue-router";

import store from "@/store/index";

Vue.use(VueRouter);

const requiresAuth = (to, _, next) => {
    if (store.getters["auth/authentified"]) {
        next();
    } else {
        if (to.path !== "/login") {
            store.commit({
                type: "auth/setNext",
                next: to.path,
            });
            next({ path: "/login" });
        } else {
            next({ name: "login" });
        }
    }
};


const requiresAnon = (_, from, next) => {
    if (!store.getters["auth/authentified"]) {
        next();
    } else {
        next({ name: "dashboard" });
    }
};

const routes = [{
        path: "/",
        component: () =>
            import ("@/layouts/Layout.vue"),
        beforeEnter: requiresAuth,
        children: [{
                path: "dashboard",
                name: "dashboard",
                component: () =>
                    import ("@/views/dashboard/Dashboard.vue"),
            },
            {
                path: "",
                redirect: "dashboard",
            },
            {
                path: "users",
                name: "users",
                component: () =>
                    import ("@/views/simple-table/SimpleTable.vue"),
            },
            {
                path: "account-settings",
                name: "account-settings",
                component: () =>
                    import (
                        "@/views/pages/account-settings/AccountSettings.vue"
                    ),
            },
            {
                path: "error-404",
                name: "error-404",
                component: () =>
                    import ("@/views/Error.vue"),
                meta: {
                    layout: "blank",
                },
            },
            {
                path: "*",
                redirect: "error-404"
            }
        ],
    },
    {
        path: "/login",
        name: "login",
        component: () =>
            import ("@/views/auth/Login.vue"),
        meta: {
            layout: "blank",
        },
        beforeEnter: requiresAnon,
    },
    {
        path: "/register",
        name: "register",
        component: () =>
            import ("@/views/auth/Register.vue"),
        meta: {
            layout: "blank",
        },
        beforeEnter: requiresAnon,
    },
    {
        path: "/confirm-email",
        name: "confirm_email",
        component: () =>
            import ("@/views/auth/Confirm.vue"),
        meta: {
            layout: "blank",
        },
        beforeEnter: requiresAnon,
    },
];

const router = new VueRouter({
    mode: "history",
    routes,
});

export default router;