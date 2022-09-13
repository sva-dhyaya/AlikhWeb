import Constansts from "./alikh.constants.js"
import { useToast } from "vue-toastification";
import { useCookies } from "vue3-cookies";

const toast = useToast()
const { cookies } = useCookies()

export default {
    getFileServeUrl(path){
        return `${window.location.origin}${Constansts.fileServeUrl}${path}`
    },
    getFileServeUrlbyId(fileId){
        return fileId?`${window.location.origin}${Constansts.fileIdServeUrl}/${fileId}`:this.getFileServeUrl("/__.ai")
    },
    setLoginCookie(userId, loginInfo) {
        cookies.config("2d");
        cookies.set("userId", userId);
        cookies.set("userInfo", loginInfo);
    },
    updateCookieByKeyName(keyName, value) {
        cookies.set(keyName, value);
    },
    unsetLoginCookie() {
        cookies.remove("userId")
        cookies.remove("userInfo")
        cookies.remove("session_id")
    },
    unsetCookie(keyName) {
        cookies.remove(keyName)
    },
    getCookieValue(cookieKey) {
        let val = cookies.get(cookieKey)
        if (cookieKey == "userInfo") {
            try {
                val = JSON.parse(val);                
            } catch (error) {
                console.warn(`Error While Parsing-->${error}`)
            }
        }
        return val
    },
    getUUID() {
        var dt = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = (dt + Math.random() * 16) % 16 | 0;
            dt = Math.floor(dt / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    },
    isUserSessionActive(){
        return this.getCookieValue("userId")?true:false
    },
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    },
    getToastNotificationOptions() {
        //Visit https://maronato.github.io/vue-toastification/ for customization
        return {
            transition: Constansts.toastTransition,
            maxToasts: Constansts.maxToastsInPage,
            newestOnTop: false,
            position: "bottom-right",
            timeout: Constansts.defaultToastTime,
            closeOnClick: true,
            pauseOnFocusLoss: true,
            pauseOnHover: true,
            draggable: true,
            draggablePercent: 0.6,
            showCloseButtonOnHover: true,
            hideProgressBar: true,
            closeButton: "button",
            icon: true,
            rtl: false
        }
    },
    successToast(message){
        if (message){
            toast.success(message)
        }else{
            console.warn(`[success_toast][Message-->${message} not provided by calling function]`)
        }
    },
    failToast(message){
        if (message){
            toast.error(message)
        }else{
            console.warn(`[failToast][Message-->${message} not provided by calling function]`)
        }
    }
}