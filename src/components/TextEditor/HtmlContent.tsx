/** biome-ignore-all lint/security/noDangerouslySetInnerHtml: This rule is not necessary here */
"use client";

import type { JsonValue } from "@prisma/client/runtime/library";
import type { JSONContent } from "@tiptap/react";
import { useEffect, useState } from "react";
import { getGeneratedHTML } from "@/components/TextEditor/utils";

export type HtmlContent = {
	title: string;
	content: JsonValue;
	useMask?: boolean;
};

export default function HtmlContent(props: HtmlContent) {
	const { content, title, useMask = false } = props;
	const [contentHtml, setContentHtml] = useState<string | null>(null);

	useEffect(() => {
		setContentHtml(getGeneratedHTML(content as JSONContent));
	}, [content]);

	if (!contentHtml) return null;

	const maskClass =
		contentHtml?.length > 999 && useMask ? "mask-b-from-10%" : "";

	return (
		<>
			<h1>{title}</h1>
			<div
				className={`${maskClass} overflow-hidden`}
				dangerouslySetInnerHTML={{
					__html: contentHtml,
				}}
			/>
		</>
	);
}
