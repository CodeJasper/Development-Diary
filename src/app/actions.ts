import { getPaginationParams } from "@/lib/api/pagination";
import { getPosts } from "@/lib/db/posts/getPosts";

export async function getInitialPosts() {
	const paginationParams = getPaginationParams(new URLSearchParams());
	const posts = await getPosts(paginationParams);
	return posts;
}
