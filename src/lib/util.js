// Helper functions that can easily be imported anywhere go here
// Routing strings
const baseURL = "http://localhost:8080/";
const reservation = "reservation/";
const car = "car/";
const user = "user/";
const member = "member/";
const auth = "auth/";

export const urls = {
    get: {
        memberPersonalData: baseURL + member + "personal",
        isLoggedIn: baseURL + user + "whoami",
        reservationPersonalData: baseURL + reservation + "personal",
        singleCar: baseURL + car,
    },
    post: {
        forgotPassword: baseURL + auth + "forgot-password",
        register: baseURL + auth + "register",
        login: baseURL + auth + "login",
        logout: baseURL + auth + "logout",
    },
    put: {},
    delete: {
        singleReservation: baseURL + reservation + "personal",
    },
};
