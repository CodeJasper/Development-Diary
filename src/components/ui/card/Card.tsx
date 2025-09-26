import type { PropsWithChildren } from "react";
import CardBody from "@/components/ui/card/CardBody";
import CardHeader from "@/components/ui/card/CardHeader";
import CardFooter from "./CardFooter";

export type CardProps = PropsWithChildren & {
	className?: string;
};

export default function Card(props: CardProps) {
	const { children, className = "" } = props;

	return <div className={`card ${className}`}>{children}</div>;
}

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;
