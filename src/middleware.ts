import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { authMiddleware } from "@/lib/middlewares/auth_middleware";
import { corsMiddleware } from "@/lib/middlewares/cors_middleware";

export async function middleware(request: NextRequest) {
	const cors = corsMiddleware(request);
	if (cors) return cors;

	const authorization = authMiddleware(request);
	if (authorization) return authorization;

	return NextResponse.next();
}

export const config = {
	matcher: ["/posts/new", "/api/:path*"],
};
