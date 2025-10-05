import type { Prisma } from "@prisma/client";

export type PartialPostImage = {
	id: string;
	url: string;
	isCover?: boolean;
	path?: string;
	fullPath?: string;
};

export type PostImageResponse = Prisma.PostImageGetPayload<{
	select: {
		id;
		url;
		postId;
		fullPath;
		path;
		isCover;
	};
}>;

export type PostPostImageResponse = PostImageResponse;
export type getPostImageByIdResponse = PostImageResponse;
