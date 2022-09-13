let extended_url = "/service";

export default {
    acceptedStatusCodes: [200, 201, 206],
    rejectedStatusCodes: [400, 500, 401],
    loginUrl: `${extended_url}/login`,
    logoutUrl: `${extended_url}/logout`,
    dashboardReviewsUrl: `${extended_url}/dashboard/files/reviews`,
    fileServeUrl: `${extended_url}/serve/file`,
    fileIdServeUrl: `${extended_url}/serve/fileid`,
    filesUrl: `${extended_url}/files`,
    usersUrl: `${extended_url}/users`,
    nginxUploadUrl: `/resumableUpload`,
    defaultToastTime: 3000,
    maxToastsInPage: 20,
    toastTransition: "Vue-Toastification__bounce", //"Vue-Toastification__[bounce/fade/slideBlurred]"
}