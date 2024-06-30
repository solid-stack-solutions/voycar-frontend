// Helper functions that can easily be imported anywhere go here
// Import 🐦
import { ConstantBackoff, handleAll, retry } from "cockatiel";

// Routing strings
const baseURL = "http://localhost:8080/";
const reservation = "reservation/";
const car = "car/";
const user = "user/";
const member = "member/";
const auth = "auth/";
const personal = "personal";
const plan = "plan/";
export const urls = {
    get: {
        memberPersonalData: baseURL + member + personal,
        isLoggedIn: baseURL + user + "whoami",
        reservationPersonalData: baseURL + reservation + personal,
        singleCar: baseURL + car,
        allPlans: baseURL + plan + "all",
    },
    post: {
        forgotPassword: baseURL + auth + "reset-token",
        resetPassword: baseURL + auth + "reset-password/",
        register: baseURL + auth + "register",
        login: baseURL + auth + "login",
        logout: baseURL + auth + "logout",
    },
    put: {
        newPersonalData: baseURL + member + personal,
        newPlanData: baseURL + plan + personal,
    },
    delete: {
        singleReservation: baseURL + reservation + personal + "/",
    },
};

// Email verification
const mailRegexPattern =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export function validateEmail(email) {
    return mailRegexPattern.test(email);
}

// Backend communication
// Policy for fetching
const retryPolicy = retry(handleAll, {
    maxAttempts: 3, // Try 3 times
    backoff: new ConstantBackoff(50), // Wait 50ms after each try
});
async function tryFetching(url, method, body, restricted) {
    return await retryPolicy.execute(async () => {
        if (method === "HEAD" || method === "GET" || method === undefined) {
            return await fetch(
                new Request(url, {
                    method: method ?? "GET", // Default to GET
                    credentials: restricted ? "include" : "omit",
                }),
            );
        } else {
            return await fetch(
                new Request(url, {
                    method: method,
                    credentials: restricted ? "include" : "omit",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(body),
                }),
            );
        }
    });
}

export async function tryFetchingRestricted(url, method, body) {
    return await tryFetching(url, method, body, true);
}

export async function tryFetchingPublic(url, method, body) {
    return await tryFetching(url, method, body, false);
}

// Formatting backend information to Frontend Text
const planNames = {
    basic: "Basic",
    reduced: "Ermäßigt",
    exclusive: "Exklusiv",
};
export function translatePlanName(backendName) {
    return planNames[backendName.toLowerCase()] ?? backendName;
}
