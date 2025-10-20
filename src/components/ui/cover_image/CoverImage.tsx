import Image from "next/image";

export type CoverImageProps = {
	src: string;
	alt: string;
	useNextImage?: boolean;
};

export default function CoverImage({
	src,
	alt,
	useNextImage = false,
}: CoverImageProps) {
	return (
		<div className="relative h-[300px]">
			{useNextImage ? (
				<Image src={src} alt={alt} fill className="object-cover rounded-lg" />
			) : (
				<>
					{/** biome-ignore lint/performance/noImgElement: Hosts are not controlled here */}
					<img
						src={src}
						alt={alt}
						className="object-cover rounded-lg h-full w-full"
					/>
				</>
			)}
		</div>
	);
}
