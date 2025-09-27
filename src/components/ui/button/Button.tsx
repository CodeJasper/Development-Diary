import Link from "next/link";
import type { PropsWithChildren } from "react";
import {
	ButtonColorClasses,
	ButtonColors,
	ButtonSizes,
	ButtonSizesClasses,
	ButtonTypes,
	ButtonVariantClasses,
	ButtonVariants,
} from "@/components/ui/button/types";

export type ButtonProps = PropsWithChildren & {
	children: React.ReactNode;
	size?: ButtonSizes;
	variant?: ButtonVariants;
	color?: ButtonColors;
	className?: string;
	type?: ButtonTypes;
	href?: string;
	onClick?: () => void;
	disabled?: boolean;
};

export default function Button(props: ButtonProps) {
	const {
		size = ButtonSizes.md,
		variant = ButtonVariants.filled,
		color = ButtonColors.primary,
		className = "",
		type = ButtonTypes.button,
		children,
		href,
		onClick,
		disabled,
	} = props;

	const getClassNames = () => {
		const classes = [
			className,
			"btn",
			ButtonSizesClasses[size],
			ButtonVariantClasses[variant],
			ButtonColorClasses[color],
		];
		return classes.join(" ").trim();
	};

	const handleClick = () => {
		if (onClick) {
			onClick();
		}
	};

	if (href) {
		return (
			<Link href={href} className={getClassNames()}>
				{children}
			</Link>
		);
	}

	return (
		<button
			disabled={disabled}
			type={type}
			className={getClassNames()}
			onClick={handleClick}
		>
			{children}
		</button>
	);
}
