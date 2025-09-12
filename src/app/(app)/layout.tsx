import type React from "react";
import "@/global.css";
import AuthProvider from "@/components/auth_provider/AuthProvider";

export default function MainAppLayou({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="bg-gray-100 grow-1">
			<div className="max-w-7xl h-full w-full mx-auto pt-12 px-10 pb-6 flex flex-col">
				<AuthProvider>{children}</AuthProvider>
			</div>
		</div>
	);
}
