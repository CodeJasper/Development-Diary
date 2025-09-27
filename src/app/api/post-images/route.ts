import { nanoid } from "nanoid";
import { getSuccessResponse } from "@/lib/api/genericResponses";
import { subapaseClient } from "@/lib/supabase";

export async function POST(request: Request) {
	const formData = await request.formData();
	const file = formData.get("file");
	const imageId = nanoid();
	const response = await subapaseClient.storage
		.from("temp")
		.upload(`posts/${imageId}`, file);

	return getSuccessResponse(response);
}
