"use client";

import Link from "next/link";
import HtmlContent from "@/components/TextEditor/HtmlContent";
import Avatar from "@/components/ui/avatar/Avatar";
import { AvatarSizes } from "@/components/ui/avatar/types";
import Card from "@/components/ui/card/Card";
import PostAuthor from "@/components/ui/post_author/PostAuthor";
import type { PostWithAuthor } from "@/lib/db/posts/types";

export type PostListItemProps = {
	post: PostWithAuthor;
};

export function PostListItem(props: PostListItemProps) {
	const { post } = props;

	return (
		<li key={post.id} className="list-none">
			<Link href={`/posts/${post.id}`} className="no-underline text-inherit">
				<Card>
					<Card.Body>
						<PostAuthor
							authorName={post.author.userName}
							publishedAt={post.createdAt}
							className="mb-8"
						/>
						<div className="max-h-96 flex flex-col">
							<HtmlContent content={post.content} title={post.title} useMask />
						</div>
					</Card.Body>
				</Card>
			</Link>
		</li>
	);
}
