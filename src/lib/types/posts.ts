import type { EditorJson } from "@/components/TextEditor/TextEditor";

export type ContentPost = {
	title: string;
	excerpt?: string;
	content: EditorJson;
};
