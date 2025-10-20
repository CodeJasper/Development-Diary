import type { PaginationParams } from "@/lib/api/pagination";
import type { SimplifiedPostWithAuthor } from "@/lib/db/posts/types";
import { prisma } from "@/lib/prisma";

export async function getSimplifiedPosts(
	props: PaginationParams,
): Promise<SimplifiedPostWithAuthor[]> {
	const { perPage, skip } = props;
	const posts = await prisma.post.findMany({
		skip,
		take: perPage,
		orderBy: [{ createdAt: "desc" }, { id: "desc" }],
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
				where: { isCover: true },
				take: 1,
			},
		},
	});

	return posts.map(({ images, ...post }) => ({
		...post,
		coverImage: images.length > 0 ? images[0] : null,
	})) as SimplifiedPostWithAuthor[];
}
