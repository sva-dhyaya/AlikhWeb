import axios from "axios";
import Constants from "../alikh.constants.js"

class RequestHandler {
    parse_success_response(resp){
        if (Constants.acceptedStatusCodes.includes(resp.status)) {
            resp.data.statusCode = resp.status
            resp.data.httpSuccess = true
            return resp.data
        }
        throw `Response from server-->${resp.status}, data--->${resp.data}, statusText-->${resp.statusText}`;
    }

    parse_failure_response(error){
        if (error.response) {
            if (Constants.rejectedStatusCodes.includes(error.response.status)) {
                error.response.data.statusCode = error.response.status
                error.response.data.httpSuccess = false
                return error.response.data
            }
        }
        return {}
    }

    
    async post(url, payload={}) {
        try {
            let resp = await axios.post(url, payload)
            return this.parse_success_response(resp)
        } catch (error) {
            console.error(
                `[post][RequestHandler][Error occured while posting to ${url}--->${error}]`
            );
            return this.parse_failure_response(error)
        }
    }

    async get(url, payload={}) {
        try {
            let resp = await axios.get(url, payload)
            return this.parse_success_response(resp)
        } catch (error) {
            console.error(
                `[get][RequestHandler][Error occured while getting info from ${url}--->${error}]`
            );
            return this.parse_failure_response(error)
        }
    }

    async put(url, payload={}) {
        try {
            let resp = await axios.put(url, payload)
            return this.parse_success_response(resp)
        } catch (error) {
            console.error(
                `[put][RequestHandler][Error occured while updating the info in ${url}--->${error}]`
            );
            return this.parse_failure_response(error)
        }
    }

    async delete(url, payload={}) {
        try {
            let resp = await axios.delete(url, payload)
            return this.parse_success_response(resp)
        } catch (error) {
            console.error(
                `[delete][RequestHandler][Error occured deleting the info in ${url}--->${error}]`
            );
            return this.parse_failure_response(error)
        }
    }

}

export default new RequestHandler();