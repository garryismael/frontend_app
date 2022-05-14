import router from "@/router";
import Auth from "@/services/auth";
import Axios from "@/utils/axios";
import httpStatus from "http-status";

const TOKEN = "token";

const AuthStore = {
    state: {
        token: localStorage.getItem("token") || "token",
        next: null,
    },
    getters: {
        authentified(state) {
            return Boolean(state.token);
        },
    },
    mutations: {
        setToken(state, { token, rememberMe }) {
            if (token) {
                state.token = token;
                if (rememberMe) localStorage.setItem(TOKEN, token);
                Axios.defaults.headers.common[
                    "Authorization"
                ] = `Bearer ${token}`;
            }
        },
        setNext(state, { next }) {
            state.next = next;
        },
        logout(state) {
            state.token = null;
            localStorage.removeItem(TOKEN);
            Axios.defaults.headers.common["Authorization"] = undefined;
            router.push({ name: "login" });
        },
    },
    actions: {
        async login({ commit }, { username, password, rememberMe = false }) {
            let data = {
                username,
                password,
            };
            let logged = false;
            try {
                const response = await Auth.login({ data });
                if (response.status === httpStatus.OK) {
                    commit({
                        type: "setToken",
                        token: response.data.token,
                        rememberMe,
                    });
                    commit({
                        type: "setNext",
                        next: "dashboard",
                    });
                    logged = true;
                }
            } finally {
                return logged;
            }
        },
    },
};

export default AuthStore;