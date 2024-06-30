// Import urls and fetch function from util
import { urls, tryFetchingRestricted } from "$lib/util.js";

// Functions
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

// Exports the data to layout.svelte using the data prop
export async function load() {
    return {
        loggedIn: await testLoggedIn(),
    };
}
