// Helper functions that can easily be imported anywhere go here
// Routing strings
const baseURL = "http://localhost:8080/";
const reservation = "reservation/";
const car = "car/";
export const urls = {
    get: {
        memberPersonalData: baseURL + "member/personal",
        reservationPersonalData: baseURL + reservation + "personal",
        singleCar: baseURL + car,
    },
    post: {},
    put: {},
    delete: {},
};
