import type { PostWithAuthor } from "@/lib/db/posts/types";
import { prisma } from "@/lib/prisma";

export async function getPostById(postId: string): Promise<PostWithAuthor> {
	const post = await prisma.post.findUnique({
		where: { id: postId },
		select: {
			id: true,
			title: true,
			content: true,
			excerpt: true,
			createdAt: true,
			author: {
				select: {
					userName: true,
					name: true,
					lastName: true,
				},
			},
			images: {
				select: {
					id: true,
					url: true,
					isCover: true,
				},
			},
		},
	});

	return post;
}
