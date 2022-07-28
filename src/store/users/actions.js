import Utils from "../../alikh.utils.js"
import Constants from "../../alikh.constants.js"
import requesthandler  from "@/plugins/RequestHandler.js"

export default {
    async loadUserInfoFromCookies(context) {
        let session_id = Utils.getCookieValue("session_id")
        if (session_id == null) {
            Utils.unsetLoginCookie()
            context.commit("unsetUserinfo")
        } else {
            let userInfo = Utils.getCookieValue("userInfo")
            Utils.setLoginCookie(userInfo._id, userInfo)
            context.commit("setCurrentUserinfo", userInfo)
        }
    },

    async logInToServer(context, payload) {
        let resp = await requesthandler.post(Constants.loginUrl, payload)
        if (Constants.acceptedStatusCodes.includes(resp.status)){
            context.commit("setCurrentUserinfo", resp.data.user_info)
            Utils.setLoginCookie(resp.data.user_info._id, resp.data.user_info)
            return resp.data
        }else{
            return {}
        }
    },

    async logOutFromServer(context) {
        await requesthandler.delete(Constants.logoutUrl)
        context.commit("unsetUserinfo")
        Utils.unsetLoginCookie()
        this.$router.push({ name: "Home" })
        return {};
    },
}