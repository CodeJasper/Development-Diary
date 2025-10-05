"use server";

import {
	getSuccessResponse,
	getUnauthorizedResponse,
} from "@/lib/api/genericResponses";
import getUserFromSession from "@/lib/api/getUserFromSession";
import { getPaginationParams } from "@/lib/api/pagination";
import { getPostImageByIdInDB } from "@/lib/db/post-images/getPostImageById";
import { InsertPostInDB } from "@/lib/db/posts/createPost";
import { getPosts } from "@/lib/db/posts/getPosts";
import { moveImage } from "@/lib/supabase/storage/postsImagesHelpers";
import type { ContentPost } from "@/lib/types/posts";

export async function POST(request: Request) {
	const user = await getUserFromSession();
	if (!user) {
		return getUnauthorizedResponse();
	}

	const body: ContentPost = await request.json();
	const postCreated = await InsertPostInDB(body, user.id);

	if (body.imageIds && body.imageIds.length > 0) {
		await Promise.allSettled(
			body.imageIds.map(async (id) => {
				const postImage = await getPostImageByIdInDB(id);
				if (!postImage?.path) return;

				const pathSlugs = postImage.path.split("/");
				const imageName = pathSlugs[pathSlugs.length - 1];

				return moveImage(
					"temp",
					postImage.path,
					"posts-images",
					`posts/${postCreated.id}/${user.id}/images/${imageName}`,
				);
			}),
		);
	}

	return getSuccessResponse(postCreated);
}

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const paginationParams = getPaginationParams(searchParams);

	const posts = await getPosts(paginationParams);

	return getSuccessResponse(posts);
}
