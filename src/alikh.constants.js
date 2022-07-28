let extended_url = "/service";

export default {
    acceptedStatusCodes: [200, 201, 206],
    rejectedStatusCodes: [400, 500, 401],
    loginUrl: `${extended_url}/login`,
    logoutUrl: `${extended_url}/logout`,
}