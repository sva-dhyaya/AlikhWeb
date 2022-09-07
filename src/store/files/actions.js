import alikhConstants from "@/alikh.constants"
import requesthandler  from "@/plugins/RequestHandler.js"

export default {

    async getFiles(context, payload) {
        let resp = await requesthandler.get(alikhConstants.filesUrl, payload)
        return resp
    },

}