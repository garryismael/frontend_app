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

const checkIfNotGoingToLogin = (to, _, next) => {
    if (to.path === "/login") {
        next({ name: "login" });
    } else {
        next({ name: "not_found_page" });
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
                path: "typography",
                name: "typography",
                component: () =>
                    import ("@/views/typography/Typography.vue"),
            },
            {
                path: "icons",
                name: "icons",
                component: () =>
                    import ("@/views/icons/Icons.vue"),
            },
            {
                path: "cards",
                name: "cards",
                component: () =>
                    import ("@/views/cards/Card.vue"),
            },
            {
                path: "simple-table",
                name: "simple-table",
                component: () =>
                    import ("@/views/simple-table/SimpleTable.vue"),
            },
            {
                path: "form-layouts",
                name: "form-layouts",
                component: () =>
                    import ("@/views/form-layouts/FormLayouts.vue"),
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