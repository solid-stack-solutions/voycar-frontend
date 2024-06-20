// helper functions that can easily be imported anywhere go here
// Routing strings
const baseURL = "http://localhost:8080/";
export const urls = {
    get: {
        memberPersonalData: baseURL + "member/personal",
        isLoggedIn: baseURL + "user/whoami"
    },
    post: {},
    put: {},
    delete: {},
};