import { users } from "../data";
import { error } from '@sveltejs/kit';

export function load({ params }) {
	const user = users.find((user) => user.userID.toString() === params.userID);

	if (!user) throw error(404);

	return {
		user
	};
}
