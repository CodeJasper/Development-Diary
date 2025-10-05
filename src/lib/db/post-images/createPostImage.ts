import type {
	PartialPostImage,
	PostPostImageResponse,
} from "@/lib/db/post-images/type";
import { prisma } from "@/lib/prisma";

export async function createPostImageInDB(
	imageData: PartialPostImage,
): Promise<PostPostImageResponse> {
	const postImage = await prisma.postImage.create({
		data: {
			id: imageData.id,
			url: imageData.url,
			isCover: imageData.isCover,
			path: imageData.path,
			fullPath: imageData.fullPath,
		},
	});

	return postImage;
}
