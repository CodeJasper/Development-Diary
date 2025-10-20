import { getPaginationParams } from "@/lib/api/pagination";
import { getPostById } from "@/lib/db/posts/getPostById";
import { getSimplifiedPosts } from "@/lib/db/posts/getSimplifiedPosts";

export async function getInitialPosts() {
	const paginationParams = getPaginationParams(new URLSearchParams());
	const posts = await getSimplifiedPosts(paginationParams);
	return posts;
}

export async function getPostDetails(postId: string) {
	const post = await getPostById(postId);
	return post;
}
