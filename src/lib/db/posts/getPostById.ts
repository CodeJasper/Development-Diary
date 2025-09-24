import { prisma } from "@/lib/prisma";

export async function getPostById(postId: string) {
	const post = await prisma.post.findUnique({
		where: { id: postId },
		select: {
			id: true,
			title: true,
			content: true,
			createdAt: true,
			author: {
				select: {
					userName: true,
					name: true,
					lastName: true,
				},
			},
		},
	});

	return post;
}
