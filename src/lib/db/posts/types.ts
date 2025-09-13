import type { Prisma } from "@prisma/client";

export type PostWithAuthor = Prisma.PostGetPayload<{
	select: {
		id: true;
		title: true;
		content: true;
		createdAt: true;
		author: {
			select: {
				userName: true;
				name: true;
				lastName: true;
			};
		};
	};
}>;
