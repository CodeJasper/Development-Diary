import type { ContentPost } from "@/lib/types/posts";

export async function PostPost(post: ContentPost) {
	const response = await fetch("/api/posts", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			title: post.title,
			content: post.content,
		}),
	}).then((res) => res.json());

	return response;
}
