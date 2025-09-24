import type { PropsWithChildren } from "react";

export type CardHeaderProps = PropsWithChildren & {
	className?: string;
};

export default function CardHeader(props: CardHeaderProps) {
	const { children, className = "" } = props;

	return (
		<div className={`border-b border-border p-8 pb-6 ${className}`}>
			{children}
		</div>
	);
}
