import alikhConstants from "@/alikh.constants"
import requesthandler  from "@/plugins/RequestHandler.js"

export default {

    async getFiles(context, payload) {
        let resp = await requesthandler.get(alikhConstants.filesUrl, payload)
        return resp
    },

    async updateFile(context, payload) {
        let resp = await requesthandler.put(`${alikhConstants.filesUrl}/${payload._id}`, payload)
        return resp
    },

    async createFile(context, payload) {
        let resp = await requesthandler.post(`${alikhConstants.filesUrl}`, payload)
        return resp
    },
    


}