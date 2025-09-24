"use client";

import HtmlContent from "@/components/TextEditor/HtmlContent";
import Card from "@/components/ui/card/Card";
import PostAuthor from "@/components/ui/post_author/PostAuthor";
import type { PostWithAuthor } from "@/lib/db/posts/types";

export type PostDetailsProps = {
	post: PostWithAuthor;
};

export default function PostDetails(props: PostDetailsProps) {
	const { post } = props;

	return (
		<article>
			<Card>
				<Card.Header>
					<PostAuthor
						authorName={post.author.userName}
						publishedAt={post.createdAt}
					/>
				</Card.Header>
				<Card.Body className="pb-0">
					<HtmlContent content={post.content} title={post.title} />
				</Card.Body>
				<Card.Footer></Card.Footer>
			</Card>
		</article>
	);
}
