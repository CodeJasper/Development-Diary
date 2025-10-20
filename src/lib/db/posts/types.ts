import type { Prisma } from "@prisma/client";

type AuthorFields = {
	userName: true;
	name: true;
	lastName: true;
};

type CommonPostFields = {
	id: true;
	title: true;
	excerpt: true;
	createdAt: true;
	author: {
		select: AuthorFields;
	};
};

type CoverImageFields = {
	id: string;
	url: string;
	isCover: boolean;
};

export type PostWithAuthor = Prisma.PostGetPayload<{
	select: CommonPostFields & {
		images: {
			select: {
				id: true;
				url: true;
				isCover: true;
			};
		};
		content: true;
	};
}>;

export type SimplifiedPostWithAuthor = Prisma.PostGetPayload<{
	select: CommonPostFields;
}> & {
	coverImage: CoverImageFields | null;
};
