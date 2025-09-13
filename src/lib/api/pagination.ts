const DEFAULT_PER_PAGE = 10;
const DEFAULT_PAGE = 1;

export type PaginationParams = {
	perPage: number;
	skip: number;
};

export function getPaginationParams(
	searchParams: URLSearchParams,
): PaginationParams {
	const perPage = Number(searchParams.get("per_page")) || DEFAULT_PER_PAGE;
	const page = Number(searchParams.get("page")) || DEFAULT_PAGE;
	const skip = (page - 1) * perPage;

	return {
		perPage: perPage,
		skip,
	};
}
