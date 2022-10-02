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
    
    async removeFile(context, payload) {
        let resp = await requesthandler.delete(`${alikhConstants.filesUrl}/${payload._id}`, payload)
        return resp
    },

    async restoreFile(context, payload) {
        let resp = await requesthandler.put(`${alikhConstants.filesUrl}/${payload._id}/restore`, payload)
        return resp
    },

    async storeDefaultMetadataDropdowns(context, payload) {
        let resp = await requesthandler.get(alikhConstants.defaultMetadataUrl, payload)
        if (resp.httpSuccess){
            context.state.defaultMetadataDropdowns = {}
            Object.assign(context.state.defaultMetadataDropdowns, resp)
        }
        return resp
    },
    


}