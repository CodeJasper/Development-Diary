"use server";

import { getInitialPosts } from "@/app/actions";
import { PostsList } from "@/components/posts_list/PostsList";

export default async function Page() {
	const intialPosts = await getInitialPosts();

	return (
		<section>
			<PostsList initialPosts={intialPosts} />
		</section>
	);
}
