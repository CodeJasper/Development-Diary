export async function postImage(file: File) {
	const formData = new FormData();
	formData.append("file", file);

	const response = await fetch("/api/post-images", {
		method: "POST",
		body: formData,
	});

	return response;
}
