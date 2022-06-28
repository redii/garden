import db from '$lib/utils/database.js';

export async function get() {
	const images = await db.prepare('SELECT * FROM images ORDER BY id DESC').all();

	if (images) {
		return {
			body: {
				images
			}
		};
	}
}
