"use server";

import {
	getSuccessResponse,
	getUnauthorizedResponse,
} from "@/lib/api/genericResponses";
import getUserFromSession from "@/lib/api/getUserFromSession";
import { InsertPostInDB } from "@/lib/db/posts/createPost";
import type { ContentPost } from "@/lib/types/posts";

export async function POST(request: Request) {
	const user = await getUserFromSession();
	if (!user) {
		return getUnauthorizedResponse();
	}

	const body: ContentPost = await request.json();
	const postCreated = await InsertPostInDB(body, user.id);

	return getSuccessResponse(postCreated);
}
