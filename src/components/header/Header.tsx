"use server";

import Link from "next/link";
import { auth } from "@/auth";
import LogoutNavItem from "@/components/header/LogoutNavItem";
import Button from "@/components/ui/button/Button";
import { ButtonSizes, ButtonVariants } from "@/components/ui/button/types";

export default async function Header() {
	const session = await auth();

	const getItem = (text: string, route: string) => {
		return (
			<div className="p-4" key={text}>
				<Link
					className="block p-0 rounded focus:outline-none focus:ring-2 focus:ring-secondary"
					href={route}
				>
					{text}
				</Link>
			</div>
		);
	};

	const UNAUTHORIZED_ITEMS = [
		{
			component: getItem("Ingresar", "/account/login"),
		},
		{
			component: getItem("Registrarse", "/account/register"),
		},
	];

	const AUTHORIZED_ITEMS = [
		{
			component: getItem("Perfil", "/account/profile"),
		},
		{
			component: (
				<Button
					key="create-post"
					href="/posts/new"
					variant={ButtonVariants.outline}
					size={ButtonSizes.sm}
					className="self-center"
				>
					Crear
				</Button>
			),
			// component: getItem("Crear", "/posts/new"),
		},
	];

	return (
		<header>
			<nav className="max-w-7xl mx-auto flex justify-end gap-2">
				{getItem("Inicio", "/")}
				{!session && UNAUTHORIZED_ITEMS.map((item) => item.component)}
				{session && AUTHORIZED_ITEMS.map((item) => item.component)}
				{session && <LogoutNavItem />}
			</nav>
		</header>
	);
}
