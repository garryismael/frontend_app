import i18n from "@/i18n";
import Vue from "vue";
import Vuex from "vuex";
import AuthStore from "./modules/auth";
import ForfaitStore from './modules/forfait';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        auth: {
            namespaced: true,
            ...AuthStore,
        },
        forfait: {
            namespaced: true,
            ...ForfaitStore
        },
        traduction: {
            namespaced: true,
            state: {
                language: localStorage.getItem("language") || "fr",
            },
            mutations: {
                setLanguage(state, language = "fr") {
                    state.language = language;
                    localStorage.setItem("language", language);
                    i18n.locale = language;
                },
            },
        },
    },
});