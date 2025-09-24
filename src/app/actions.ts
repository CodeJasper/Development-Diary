import { getPaginationParams } from "@/lib/api/pagination";
import { getPostById } from "@/lib/db/posts/getPostById";
import { getPosts } from "@/lib/db/posts/getPosts";

export async function getInitialPosts() {
	const paginationParams = getPaginationParams(new URLSearchParams());
	const posts = await getPosts(paginationParams);
	return posts;
}

export async function getPostDetails(postId: string) {
	const post = await getPostById(postId);
	return post;
}
