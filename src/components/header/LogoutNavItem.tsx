"use client";

import { signOut } from "next-auth/react";

export default function LogoutNavItem() {
	return (
		<div className="p-4">
			<button type="button" className="p-0 border-0" onClick={() => signOut()}>
				Salir
			</button>
		</div>
	);
}
