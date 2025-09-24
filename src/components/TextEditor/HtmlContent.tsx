/** biome-ignore-all lint/security/noDangerouslySetInnerHtml: This rule is not necessary here */
"use client";

import type { JsonValue } from "@prisma/client/runtime/library";
import type { JSONContent } from "@tiptap/react";
import { useEffect, useState } from "react";
import { getGeneratedHTML } from "@/components/TextEditor/utils";

export type HtmlContent = {
	title: JsonValue;
	content: JsonValue;
	useMask?: boolean;
};

export default function HtmlContent(props: HtmlContent) {
	const { content, title, useMask = false } = props;
	const [titleHtml, setTitleHtml] = useState<string | null>(null);
	const [contentHtml, setContentHtml] = useState<string | null>(null);

	useEffect(() => {
		setTitleHtml(getGeneratedHTML(title as JSONContent));
		setContentHtml(getGeneratedHTML(content as JSONContent));
	}, [title, content]);

	if (!titleHtml || !contentHtml) return null;

	const maskClass =
		contentHtml?.length > 999 && useMask ? "mask-b-from-10%" : "";

	return (
		<>
			<div
				className="mb-8"
				dangerouslySetInnerHTML={{
					__html: titleHtml,
				}}
			/>
			<div
				className={`${maskClass} overflow-hidden`}
				dangerouslySetInnerHTML={{
					__html: contentHtml,
				}}
			/>
		</>
	);
}
