import type { PropsWithChildren } from "react";

export type CardBodyProps = PropsWithChildren & {
	className?: string;
};

export default function CardBody(props: CardBodyProps) {
	const { children, className = "" } = props;

	return <div className={`p-8  ${className}`}>{children}</div>;
}
