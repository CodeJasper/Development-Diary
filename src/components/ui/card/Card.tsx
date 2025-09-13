import type { PropsWithChildren } from "react";

export type CardProps = PropsWithChildren & {
	className?: string;
};

export default function Card(props: CardProps) {
	const { children, className = "" } = props;
	return (
		<div
			className={`rounded-lg border border-gray-200 bg-white p-6 shadow-md ${className}`}
		>
			{children}
		</div>
	);
}
