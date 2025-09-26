"use client";

import Link from "next/link";
import Card from "@/components/ui/card/Card";
import PostAuthor from "@/components/ui/post_author/PostAuthor";
import type { PostWithAuthor } from "@/lib/db/posts/types";

export type PostListItemProps = {
	post: PostWithAuthor;
};

export function PostListItem(props: PostListItemProps) {
	const { post } = props;

	const {
		excerpt,
		title,
		id,
		author: { userName },
		createdAt,
	} = post;

	return (
		<li key={post.id} className="list-none">
			<Card>
				<Card.Body>
					<PostAuthor
						authorName={userName}
						publishedAt={createdAt}
						className="mb-8"
					/>
					<h2 className="h3">
						<Link href={`/posts/${id}`}>{title}</Link>
					</h2>
					{excerpt && <p className="font-medium">{excerpt}</p>}
					<Link
						className="block mt-4 text-primary hover:text-primary-light font-medium"
						href={`/posts/${id}`}
					>
						Leer artículo completo →
					</Link>
				</Card.Body>
			</Card>
		</li>
	);
}
