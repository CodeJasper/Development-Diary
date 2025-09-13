/** biome-ignore-all lint/security/noDangerouslySetInnerHtml: This rule is not necessary here */
"use client";

import type { JSONContent } from "@tiptap/react";
import { getGeneratedHTML } from "@/components/TextEditor/utils";
import Avatar from "@/components/ui/avatar/Avatar";
import { AvatarSizes } from "@/components/ui/avatar/types";
import Card from "@/components/ui/card/Card";
import type { PostWithAuthor } from "@/lib/db/posts/types";

export type PostListItemProps = {
	post: PostWithAuthor;
};

export function PostListItem(props: PostListItemProps) {
	const { post } = props;
	const title = getGeneratedHTML(post.title as JSONContent);
	const content = getGeneratedHTML(post.content as JSONContent);

	if (!title || !content) return null;

	const maskClass = content.length > 999 ? "mask-b-from-10%" : "";

	return (
		<li key={post.id} className="list-none">
			<Card>
				<div className="mb-8 flex gap-4">
					<Avatar userName={post.author.userName} size={AvatarSizes.md} />
					<div className="space-y-0.5 flex flex-col">
						<span className="font-medium m-0">{post.author.userName}</span>
						<span className="font-medium m-0 text-gray-500">
							{post.createdAt.toLocaleDateString()}
						</span>
					</div>
				</div>
				<div className="max-h-96 flex flex-col">
					<div
						className="mb-8"
						dangerouslySetInnerHTML={{
							__html: getGeneratedHTML(post.title as JSONContent),
						}}
					/>
					<div
						className={`${maskClass} overflow-hidden`}
						dangerouslySetInnerHTML={{
							__html: getGeneratedHTML(post.content as JSONContent),
						}}
					/>
				</div>
			</Card>
		</li>
	);
}
