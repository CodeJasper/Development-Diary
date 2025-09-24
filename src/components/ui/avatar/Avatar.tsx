import Image from "next/image";
import { AvatarSizes } from "@/components/ui/avatar/types";

export type AvatarProps = {
	size?: AvatarSizes;
	userName?: string;
	imageUrl?: string;
};

const sizeClasses = {
	sm: "h-8 w-8 text-lg",
	md: "h-12 w-12 text-xl",
	lg: "h-16 w-16 text-2xl",
};

export default function Avatar(props: AvatarProps) {
	const { size = AvatarSizes.md, userName, imageUrl } = props;

	const initials = userName
		? userName
				.split(" ")
				.map((n) => n[0])
				.join("")
				.toUpperCase()
		: "";

	return imageUrl ? (
		<Image
			src={imageUrl}
			alt={userName || "User Avatar"}
			className={`rounded-full object-cover ${sizeClasses[size]}`}
		/>
	) : (
		<div
			className={`flex items-center justify-center rounded-full bg-muted ${sizeClasses[size]}`}
		>
			{initials || "?"}
		</div>
	);
}
