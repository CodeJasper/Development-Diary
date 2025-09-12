import { NextResponse } from "next/server";

export function getSuccessResponse<T>(data: T, statusCode = 200) {
	return NextResponse.json(data, { status: statusCode });
}

export function getUnauthorizedResponse(
	message = "Unauthorized",
	statusCode = 300,
) {
	return NextResponse.json(message, { status: statusCode });
}
