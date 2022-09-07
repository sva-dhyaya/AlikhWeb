import Mutations from "./mutations.js";
import Actions from "./actions.js";
import Getters from "./getters.js";

export default {
    namespaced: true,
    state() {
        return {};
    },
    mutations: Mutations,
    actions: Actions,
    getters: Getters,
};