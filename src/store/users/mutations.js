export default {
    setCurrentUserinfo(state, payload) {
        if ("username" in payload){
            state.loggedInUser = payload.username
        }
        state.loggedInUserInfo = payload
        state.loggedInUserId = payload._id
    },
    unsetUserinfo(state) {
        state.loggedInUser = null
        state.loggedInUserInfo = {}
        state.loggedInUserId = null
    },
};