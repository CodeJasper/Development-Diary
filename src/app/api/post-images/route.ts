import { nanoid } from "nanoid";
import {
	getForbiddenResponse,
	getSuccessResponse,
} from "@/lib/api/genericResponses";
import { createPostImageInDB } from "@/lib/db/post-images/createPostImage";
import type { PartialPostImage } from "@/lib/db/post-images/type";
import { uploadImage } from "@/lib/supabase/storage/postsImagesHelpers";

export async function POST(request: Request) {
	const formData = await request.formData();
	const image = formData.get("image") as File | string;
	const isCover = formData.get("isCover");
	const imageId = nanoid();

	const postImageObject: PartialPostImage = {
		id: imageId,
		url: "",
		isCover: Boolean(isCover),
		path: "",
		fullPath: "",
	};

	if (typeof image === "string") {
		postImageObject.url = image;
	} else {
		const uploadResponse = await uploadImage("temp", `posts/${imageId}`, image);
		const { error, data } = uploadResponse;

		if (error) {
			return getForbiddenResponse(error.message);
		}

		postImageObject.id = data?.id;
		postImageObject.url = `${process.env.SUPABASE_IMAGE_URL}${data?.fullPath}`;
		postImageObject.path = data?.path;
		postImageObject.fullPath = data?.fullPath;
	}

	const postImage = await createPostImageInDB(postImageObject);

	return getSuccessResponse(postImage);
}
