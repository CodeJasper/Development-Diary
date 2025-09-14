import { generateHTML } from "@tiptap/core";
import { Document } from "@tiptap/extension-document";
import { Heading } from "@tiptap/extension-heading";
import Text from "@tiptap/extension-text";
import type { Editor, EditorStateSnapshot, JSONContent } from "@tiptap/react";
import { EDITOR_AVAILABLE_EXTENSIONS } from "@/components/TextEditor/constants";
import type { ExtensionConfigurations } from "@/components/TextEditor/types";

export const extensionConfigurationsPostTilte: ExtensionConfigurations = {
	extensions: [
		Document,
		Text,
		Heading.configure({
			levels: [1],
			HTMLAttributes: {
				class: "mb-0",
			},
		}),
	],
	handleExtensionStates: (ctx: EditorStateSnapshot<Editor>) => ({
		isHeading1: ctx.editor?.isActive("heading", { level: 1 }) ?? false,
	}),
};

export const extensionConfigurationsPostContent: ExtensionConfigurations = {
	extensions: EDITOR_AVAILABLE_EXTENSIONS,
	handleExtensionStates: (ctx: EditorStateSnapshot<Editor>) => ({
		isUnderline: ctx.editor?.isActive("underline") ?? false,
		canUnderline: ctx.editor?.can().chain().toggleUnderline().run() ?? false,
		isBold: ctx.editor?.isActive("bold") ?? false,
		canBold: ctx.editor?.can().chain().toggleBold().run() ?? false,
		isItalic: ctx.editor?.isActive("italic") ?? false,
		canItalic: ctx.editor?.can().chain().toggleItalic().run() ?? false,
		isStrike: ctx.editor?.isActive("strike") ?? false,
		canStrike: ctx.editor?.can().chain().toggleStrike().run() ?? false,
		isCode: ctx.editor?.isActive("code") ?? false,
		canCode: ctx.editor?.can().chain().toggleCode().run() ?? false,
		isParagraph: ctx.editor?.isActive("paragraph") ?? false,
		isHeading1: ctx.editor?.isActive("heading", { level: 1 }) ?? false,
		isHeading2: ctx.editor?.isActive("heading", { level: 2 }) ?? false,
		isHeading3: ctx.editor?.isActive("heading", { level: 3 }) ?? false,
		isHeading4: ctx.editor?.isActive("heading", { level: 4 }) ?? false,
		isHeading5: ctx.editor?.isActive("heading", { level: 5 }) ?? false,
		isHeading6: ctx.editor?.isActive("heading", { level: 6 }) ?? false,
		isBulletList: ctx.editor?.isActive("bulletList") ?? false,
		isOrderedList: ctx.editor?.isActive("orderedList") ?? false,
		isCodeBlock: ctx.editor?.isActive("codeBlock") ?? false,
		isBlockquote: ctx.editor?.isActive("blockquote") ?? false,
		canUndo: ctx.editor?.can().chain().undo().run() ?? false,
		canRedo: ctx.editor?.can().chain().redo().run() ?? false,
	}),
};

export const getGeneratedHTML = (content: JSONContent) => {
	if (!content) return null;
	return generateHTML(content, EDITOR_AVAILABLE_EXTENSIONS);
};
