import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export default async function getUserFromSession() {
	const session = await auth();
	const user = await prisma.user.findUnique({
		where: { email: session.user.email },
	});

	if (!user) return null;

	return user;
}
