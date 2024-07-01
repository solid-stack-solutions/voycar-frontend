import { redirect } from "@sveltejs/kit";
export async function handle({ event, resolve }) {
	const response = await resolve(event);
    if (response.status === 404){
        throw redirect(302, '/');
    }
	return response;
}