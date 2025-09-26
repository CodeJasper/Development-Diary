import type { NextRequest } from "next/server";
import {
	getForbiddenResponse,
	getSuccessResponse,
} from "@/lib/api/genericResponses";

const allowedOrigins = process.env.ALLOWED_HOSTS;

export function corsMiddleware(req: NextRequest) {
	const origin = req.headers.get("origin") || "";

	if (allowedOrigins.includes("*")) return null;

	if (!allowedOrigins.includes(origin)) {
		return getForbiddenResponse();
	}

	if (req.method === "OPTIONS") {
		getSuccessResponse(null, 200, {
			"Access-Control-Allow-Origin": origin,
			"Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
			"Access-Control-Allow-Headers": "Content-Type, Authorization",
		});
	}

	return null;
}
