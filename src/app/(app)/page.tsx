"use server";

import { getInitialPosts } from "@/app/actions";
import { PostsList } from "@/components/posts_list/PostsList";

export default async function Page() {
	const intialPosts = await getInitialPosts();

	return (
		<section>
			<h1 className="mb-2">Publicaciones recientes</h1>
			<p className="text-muted-foreground mb-8">
				Artículos, tutoriales y recursos para desarrolladores web modernos
			</p>
			<PostsList initialPosts={intialPosts} />
		</section>
	);
}
