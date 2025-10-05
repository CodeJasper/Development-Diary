import { subapaseClient } from "@/lib/supabase";

export async function moveImage(
	currentBucket: string,
	currentPath: string,
	newBucket: string,
	newPath: string,
) {
	return await subapaseClient.storage.from(currentBucket).move(currentPath, newPath, {
		destinationBucket: newBucket,
	});
}

export async function uploadImage(bucket: string, path: string, image: File) {
	const responseSupabase = await subapaseClient.storage
		.from(bucket)
		.upload(path, image);

	return responseSupabase;
}
