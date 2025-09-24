import type { PropsWithChildren } from "react";

export type CardFooterProps = PropsWithChildren & {
	className?: string;
};

export default function CardFooter(props: CardFooterProps) {
	const { children, className = "" } = props;

	return (
		<div className="mt-8 px-8">
			<hr className="border-t border-border"></hr>
			<div className={`py-8  ${className}`}>{children}</div>
		</div>
	);
}
