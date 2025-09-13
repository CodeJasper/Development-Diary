"use server";

import {
	getSuccessResponse,
	getUnauthorizedResponse,
} from "@/lib/api/genericResponses";
import getUserFromSession from "@/lib/api/getUserFromSession";
import { getPaginationParams } from "@/lib/api/pagination";
import { InsertPostInDB } from "@/lib/db/posts/createPost";
import { getPosts } from "@/lib/db/posts/getPosts";
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

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const paginationParams = getPaginationParams(searchParams);

	const posts = await getPosts(paginationParams);

	return getSuccessResponse(posts);
}
