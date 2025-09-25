import type { PropsWithChildren } from "react";

export type FormControlProps = PropsWithChildren & {
	className?: string;
};

export default function FormControl(props: FormControlProps) {
	const { children, className } = props;
	return <div className={`form-control ${className}`}>{children}</div>;
}
