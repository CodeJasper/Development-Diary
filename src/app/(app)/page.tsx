"use server";

import { getInitialPosts } from "@/app/actions";
import { PostsList } from "@/components/posts_list/PostsList";
import PageTitle from "@/components/ui/page_title/PageTitle";

export default async function Page() {
	const intialPosts = await getInitialPosts();

	return (
		<section>
			<PageTitle title="Publicaciones recientes" />
			<PostsList initialPosts={intialPosts} />
		</section>
	);
}
