import alikhConstants from "@/alikh.constants"
import requesthandler  from "@/plugins/RequestHandler.js"

export default {

    async getFiles(payload) {
        let resp = await requesthandler.get(alikhConstants.filesUrl, payload)
        return resp
    },

}