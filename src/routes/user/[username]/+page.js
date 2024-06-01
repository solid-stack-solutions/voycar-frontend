//Url Parameter Laden
/** @type {import('./$types').PageLoad} */
export function load({ params }) {
	return {
		post: {
			username: `${params.username}`
		}
	};
}