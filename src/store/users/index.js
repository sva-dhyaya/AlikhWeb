import usersMutations from "./mutations.js";
import usersActions from "./actions.js";
import usersGetters from "./getters.js";

export default {
    namespaced: true,
    state() {
        return {
            loggedInUser: null,
            loggedInUserInfo: {},
            loggedInUserId: null,
            ip:null
        };
    },
    mutations: usersMutations,
    actions: usersActions,
    getters: usersGetters,
};