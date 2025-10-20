"use client";

import { useCallback, useEffect, useState } from "react";
import { PostListItem } from "@/components/posts_list/PostListItem";
import Loader from "@/components/ui/loader/Loader";
import type { SimplifiedPostWithAuthor } from "@/lib/db/posts/types";
import { GetPosts } from "@/lib/services/posts";

export type PostsListProps = {
	initialPosts: SimplifiedPostWithAuthor[];
};

const DEFAULT_INDEX_TO_GET_NEXT_PAGE = 3;

export function PostsList(props: PostsListProps) {
	const { initialPosts } = props;
	const [currentPosts, setCurrentPosts] = useState<SimplifiedPostWithAuthor[]>(
		[],
	);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	const normalizePost = (post: SimplifiedPostWithAuthor) => {
		return {
			...post,
			createdAt: new Date(post.createdAt),
		};
	};

	const getIndexToGetNextPage = (postsLength: number) => {
		if (postsLength < DEFAULT_INDEX_TO_GET_NEXT_PAGE) {
			return postsLength - 1;
		}

		return postsLength - DEFAULT_INDEX_TO_GET_NEXT_PAGE;
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <Is not necessary useCallback in normalizePost>
	useEffect(() => {
		setCurrentPosts(initialPosts.map((post) => normalizePost(post)));
		setIsLoading(false);
	}, [initialPosts]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <Is not necessary useCallback in normalizePost>
	useEffect(() => {
		const getPostsPerPage = async () => {
			const response = await GetPosts(currentPage);
			setCurrentPosts((prev) => [
				...prev,
				...response.map((post) => normalizePost(post)),
			]);
		};
		if (currentPage !== 1) {
			getPostsPerPage();
		}
	}, [currentPage]);

	const loaderRef = useCallback((node: HTMLDivElement | null) => {
		if (!node) return;

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					setCurrentPage((prev) => prev + 1);
				}
			},
			{ threshold: 1 },
		);

		observer.observe(node);

		return () => observer.unobserve(node);
	}, []);

	if (isLoading) {
		return <Loader text="Cargando artículos..." />;
	}

	if (!isLoading && currentPosts.length === 0) {
		<p>No hay artículos disponibles.</p>;
	}

	return (
		<ul className="m-0 space-y-8">
			{currentPosts.map((post, index) => {
				return (
					<li key={post.id} className="list-none">
						<PostListItem post={post} />
						{index === getIndexToGetNextPage(currentPosts.length) && (
							<div ref={loaderRef} />
						)}
					</li>
				);
			})}
		</ul>
	);
}
