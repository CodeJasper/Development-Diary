import Image from "next/image";

export type AccountLayoutProps = {
	children: React.ReactNode;
};

export default function AccountLayout({ children }: AccountLayoutProps) {
	return (
		<div className="flex grow-1">
			<div className="grow-1">
				<div className="h-full flex flex-col lg:flex-row-reverse">
					<div className="h-1/3 lg:h-full lg:w-1/2 xl:grow">
						<Image
							width={1073}
							height={806}
							alt="login-background"
							className="h-full w-full object-cover"
							src="https://images.unsplash.com/photo-1462642109801-4ac2971a3a51?q=80&w=1073&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
						/>
					</div>
					<div className="relative max-lg:bg-gray-100 grow shadow-2xl shadow-black/50 z-99 pt-20 lg:w-1/2 xl:w-1/3">
						<div className="max-lg:max-w-sm max-lg:w-9/10 max-lg:absolute max-lg:-top-40 max-lg:left-1/2 max-lg:-translate-x-1/2 bg-white mx-auto lg:w-md max-lg:p-10 max-lg:rounded max-lg:shadow-2xl max-lg:shadow-black/50">
							{children}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
