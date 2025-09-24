import Avatar from "@/components/ui/avatar/Avatar";
import { AvatarSizes } from "@/components/ui/avatar/types";
import formatLongDate from "@/lib/helpers/dates";

export type PostAuthorProps = {
	authorName: string;
	publishedAt: Date;
	className?: string;
};

export default function PostAuthor(props: PostAuthorProps) {
	const { authorName, publishedAt, className = "" } = props;

	return (
		<div className={`flex gap-4 ${className}`}>
			<Avatar userName={authorName} size={AvatarSizes.md} />
			<div className="space-y-0.5 flex flex-col">
				<span className="font-medium m-0">{authorName}</span>
				<span className="text-sm text-muted-foreground">
					{formatLongDate(publishedAt)}
				</span>
			</div>
		</div>
	);
}
