import { type NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

const ROUTES_MATCH = ["/posts/new"];

export async function authMiddleware(req: NextRequest) {
	const { pathname } = req.nextUrl;

	if (!ROUTES_MATCH.includes(pathname)) return null;

	const session = await auth();

	if (!session) {
		const loginUrl = new URL("/account/login", req.url);
		loginUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
		return NextResponse.redirect(loginUrl);
	}

	return null;
}
