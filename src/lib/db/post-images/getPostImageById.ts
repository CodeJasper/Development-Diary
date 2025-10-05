import type { getPostImageByIdResponse } from "@/lib/db/post-images/type";
import { prisma } from "@/lib/prisma";

export async function getPostImageByIdInDB(
	imageId: string,
): Promise<getPostImageByIdResponse> {
	const postImage = await prisma.postImage.findUnique({
		where: {
			id: imageId,
		},
		select: {
			id: true,
			url: true,
			postId: true,
			fullPath: true,
			path: true,
			isCover: true,
		},
	});

	return postImage;
}
