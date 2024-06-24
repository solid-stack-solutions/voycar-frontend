// Helper functions that can easily be imported anywhere go here
// Routing strings
const baseURL = "http://localhost:8080/";

const user = "user/"
const member = "member/";
const auth = "auth/";

export const urls = {
    get: {
        memberPersonalData: baseURL + member + "personal",
        isLoggedIn: baseURL + user + "whoami",
    },
    post: {
        forgotPassword: baseURL + auth + "forgot-password",
        register: baseURL + auth + "register",
        login: baseURL + auth + "login",
        logout: baseURL + auth + "logout",
    },
    put: {},
    delete: {},
};
