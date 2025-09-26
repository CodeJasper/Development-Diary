import { NextResponse } from "next/server";

export type Response = {
	status: number;
	headers?: Record<string, string>;
};

export function getSuccessResponse<T>(
	data?: T,
	statusCode = 200,
	headers?: Record<string, string>,
) {
	const response: Response = {
		status: statusCode,
	};

	if (headers) {
		response.headers = headers;
	}
	return NextResponse.json(data, response);
}

export function getUnauthorizedResponse(
	message = "Unauthorized",
	statusCode = 300,
) {
	return NextResponse.json(message, { status: statusCode });
}

export function getForbiddenResponse(message = "Forbidden", statusCode = 403) {
	return NextResponse.json(message, { status: statusCode });
}
