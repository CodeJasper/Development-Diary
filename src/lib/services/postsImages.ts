import type { PostPostImageResponse } from "@/lib/db/post-images/type";

export async function postImage(
	image: File | string,
	isCover?: boolean,
): Promise<PostPostImageResponse> {
	const formData = new FormData();
	formData.append("image", image);

	if (isCover) {
		formData.append("isCover", isCover.toString());
	}

	const response: PostPostImageResponse = await fetch("/api/post-images", {
		method: "POST",
		body: formData,
	}).then((res) => res.json());

	return response;
}
