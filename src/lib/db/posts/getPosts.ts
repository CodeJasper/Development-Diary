import type { PaginationParams } from "@/lib/api/pagination";
import { prisma } from "@/lib/prisma";

export async function getPosts(props: PaginationParams) {
	const { perPage, skip } = props;
	const post = await prisma.post.findMany({
		skip,
		take: perPage,
		orderBy: { createdAt: "desc" },
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
