import type React from "react";
import "@/global.css";
import Header from "@/components/header/Header";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<head>
				<link
					href="https://cdn.boxicons.com/fonts/basic/boxicons.min.css"
					rel="stylesheet"
				/>
			</head>
			<body className="flex flex-col min-h-dvh">
				<Header />
				<main className="grow-1 flex">{children}</main>
			</body>
		</html>
	);
}
