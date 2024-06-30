import { urls, tryFetchingRestricted } from "$lib/util.js";
let loggedIn = new Promise((resolve, reject) => {});
async function testLoggedIn() {
    try {
        const response = await tryFetchingRestricted(urls.get.isLoggedIn);
        if (response.ok) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
}

// Runs as soon as the component is mounted
export async function load() {
    return {
        loggedIn: await testLoggedIn(),
    };
}
