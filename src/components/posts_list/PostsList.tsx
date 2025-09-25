"use client";

import { useEffect, useState } from "react";
import { PostListItem } from "@/components/posts_list/PostListItem";
import type { PostWithAuthor } from "@/lib/db/posts/types";

export type PostsListProps = {
	initialPosts: PostWithAuthor[];
};

export function PostsList(props: PostsListProps) {
	const { initialPosts } = props;
	const [currentPosts, setCurrentPosts] = useState<PostWithAuthor[]>([]);

	useEffect(() => {
		setCurrentPosts(initialPosts);
	}, [initialPosts]);

	return (
		<div>
			{currentPosts.length === 0 ? (
				<p>No hay publicaciones disponibles.</p>
			) : (
				<ul className="m-0 space-y-8">
					{currentPosts.map((post) => (
						<PostListItem key={post.id} post={post} />
					))}
				</ul>
			)}
		</div>
	);
}
