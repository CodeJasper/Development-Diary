import { prisma } from "@/lib/prisma";
import type { ContentPost } from "@/lib/types/posts";

export async function InsertPostInDB(postData: ContentPost, userId: string) {
	const post = await prisma.post.create({
		data: {
			title: postData.title,
			excerpt: postData.excerpt,
			content: postData.content,
			authorId: userId,
		},
	});

	return post;
}
