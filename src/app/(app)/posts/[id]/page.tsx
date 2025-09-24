import { getPostDetails } from "@/app/actions";
import PostDetails from "@/components/post_details/PostDetails";
import type { PageProps } from "@/lib/types/pages";

export default async function Page(props: PageProps) {
	const post = await getPostDetails(props.params.id);
	return <PostDetails post={post} />;
}
