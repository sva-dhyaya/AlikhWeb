export default {
    setLoginCookie(userId, loginInfo) {
        this.$cookies.config("2d");
        this.$cookies.set("userId", userId);
        this.$cookies.set("userInfo", loginInfo);
    },
    updateCookieByKeyName(keyName, value) {
        this.$cookies.set(keyName, value);
    },
    unsetLoginCookie() {
        this.$cookies.remove("userId")
        this.$cookies.remove("userInfo")
        this.$cookies.remove("session_id")
    },
    unsetCookie(keyName) {
        this.$cookies.remove(keyName)
    },
    getCookieValue(cookieKey) {
        let val = this.$cookies.get(cookieKey)
        if (cookieKey == "userInfo") {
            val = JSON.parse(val);
        }
        return val
    },

}