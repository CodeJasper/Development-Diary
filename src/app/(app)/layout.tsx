import type React from "react";
import "@/global.css";
import AuthProvider from "@/components/auth_provider/AuthProvider";

export default function MainAppLayou({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="grow-1 flex">
			<div className="bg-gray-100 grow-1">
				<div className="w-full max-w-[90vw] md:w-[80vw] h-full md:max-w-7xl pt-12 mx-auto md:px-10 pb-6 flex flex-col">
					<AuthProvider>{children}</AuthProvider>
				</div>
			</div>
		</div>
	);
}
