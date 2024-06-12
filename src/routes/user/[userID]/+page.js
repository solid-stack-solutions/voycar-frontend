//Imports
import { users } from "../data";
import { error } from "@sveltejs/kit";

//Functions
// Load user data
export function load({ params }) {
    const user = users.find((user) => user.userID.toString() === params.userID);

    if (!user) throw error(404);

    return {
        user,
    };
}
