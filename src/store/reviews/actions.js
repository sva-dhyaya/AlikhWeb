import alikhConstants from "@/alikh.constants"
import requesthandler  from "@/plugins/RequestHandler.js"

export default {

    async getReviewDashboardData(payload) {
        let resp = await requesthandler.get(alikhConstants.dashboardReviewsUrl, payload)
        return resp
    },

}