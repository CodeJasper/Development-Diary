"use client";

import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Card from "@/components/ui/card/Card";
import CoverImage from "@/components/ui/cover_image/CoverImage";
import PostAuthor from "@/components/ui/post_author/PostAuthor";
import type { SimplifiedPostWithAuthor } from "@/lib/db/posts/types";

export type PostListItemProps = {
	post: SimplifiedPostWithAuthor;
};

export function PostListItem(props: PostListItemProps) {
	const { post } = props;

	const {
		excerpt,
		title,
		id,
		author: { userName },
		createdAt,
		coverImage,
	} = post;

	return (
		<Card>
			<Card.Body className="px-4">
				<PostAuthor
					authorName={userName}
					publishedAt={createdAt}
					className="mb-8"
				/>
				<h2 className="h3">
					<Link href={`/posts/${id}`}>{title}</Link>
				</h2>
				{coverImage && (
					<CoverImage src={coverImage.url} alt={title} useNextImage />
				)}
				{excerpt && <p className="font-medium">{excerpt}</p>}
				<Link
					className="block mt-4 text-primary hover:text-primary-light font-medium"
					href={`/posts/${id}`}
				>
					<span className="">
						Leer artículo completo
						<ChevronRight size={16} className="inline ml-1" />
					</span>
				</Link>
			</Card.Body>
		</Card>
	);
}
