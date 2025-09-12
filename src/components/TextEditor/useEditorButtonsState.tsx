import { type Editor, useEditorState } from "@tiptap/react";
import { useCallback, useMemo } from "react";
import type {
	EditorButtonConfiguration,
	EditorButtonName,
	ExtensionConfigurations,
	HeadingLevel,
} from "@/components/TextEditor/types";

export type useEditorButtonsStateProps = {
	editor: Editor | null;
	buttonNames: EditorButtonName[];
	extensionConfigurations: ExtensionConfigurations;
};

const HEADING_LEVELS = [1, 2, 3, 4, 5, 6];

export default function useEditorButtonsState(
	props: useEditorButtonsStateProps,
) {
	const { editor, buttonNames, extensionConfigurations } = props;

	const editorState = useEditorState({
		editor,
		selector: (ctx) => {
			return extensionConfigurations.handleExtensionStates(ctx);
		},
	});

	const getHeadingConfigurations = useCallback(() => {
		const headingConfiurations = [];
		HEADING_LEVELS.forEach((headingLevel: HeadingLevel) => {
			if (buttonNames.find((name) => name === `heading${headingLevel}`)) {
				headingConfiurations.push({
					id: `heading ${headingLevel}`,
					label: `H${headingLevel}`,
					command: () =>
						editor.chain().focus().toggleHeading({ level: headingLevel }).run(),
					isActive:
						editorState[`isHeading${headingLevel}` as keyof typeof editorState],
				});
			}
		});

		return headingConfiurations;
	}, [buttonNames.find, editor?.chain, editorState]);

	const buttonConfigurations: EditorButtonConfiguration[] = useMemo(() => {
		return [
			...(buttonNames.find((name) => name === "horizontalRule")
				? [
						{
							id: 1,
							label: <i className="bx bx-bold block"></i>,
							command: () => editor.chain().focus().toggleBold().run(),
							isActive: editorState.isBold,
							canRun: editorState.canBold,
						},
					]
				: []),
			...(buttonNames.find((name) => name === "italic")
				? [
						{
							id: 2,
							label: <i className="bx bx-italic block"></i>,
							command: () => editor.chain().focus().toggleItalic().run(),
							isActive: editorState.isItalic,
							canRun: editorState.canItalic,
						},
					]
				: []),
			...(buttonNames.find((name) => name === "underline")
				? [
						{
							id: 3,
							label: <i className="bx bx-underline block"></i>,
							command: () => editor.chain().focus().toggleUnderline().run(),
							isActive: editorState.isUnderline,
							canRun: editorState.canUnderline,
						},
					]
				: []),
			...(buttonNames.find((name) => name === "strike")
				? [
						{
							id: 4,
							label: <i className="bx bx-strikethrough block"></i>,
							command: () => editor.chain().focus().toggleStrike().run(),
							isActive: editorState.isStrike,
							canRun: editorState.canStrike,
						},
					]
				: []),
			...(buttonNames.find((name) => name === "code")
				? [
						{
							id: 5,
							label: <i className="bx bx-code block"></i>,
							command: () => editor.chain().focus().toggleCode().run(),
							isActive: editorState.isCode,
							canRun: editorState.canCode,
						},
					]
				: []),
			...(buttonNames.find((name) => name === "paragraph")
				? [
						{
							id: 6,
							label: <i className="bx bx-paragraph block"></i>,
							command: () => editor.chain().focus().setParagraph().run(),
							isActive: editorState.isParagraph,
						},
					]
				: []),
			...getHeadingConfigurations(),
			...(buttonNames.find((name) => name === "bulletList")
				? [
						{
							id: 8,
							label: <i className="bx bx-list-ul block"></i>,
							command: () => editor.chain().focus().toggleBulletList().run(),
							isActive: editorState.isBulletList,
						},
					]
				: []),
			...(buttonNames.find((name) => name === "orderedList")
				? [
						{
							id: 9,
							label: <i className="bx bx-list-ol block"></i>,
							command: () => editor.chain().focus().toggleOrderedList().run(),
							isActive: editorState.isOrderedList,
						},
					]
				: []),
			...(buttonNames.find((name) => name === "codeBlock")
				? [
						{
							id: 10,
							label: <i className="bx bx-code-alt block"></i>,
							command: () => editor.chain().focus().toggleCodeBlock().run(),
							isActive: editorState.isCodeBlock,
						},
					]
				: []),
			...(buttonNames.find((name) => name === "blockquote")
				? [
						{
							id: 11,
							label: <i className="bx bx-blockquote block"></i>,
							command: () => editor.chain().focus().toggleBlockquote().run(),
							isActive: editorState.isBlockquote,
						},
					]
				: []),
			...(buttonNames.find((name) => name === "horizontalRule")
				? [
						{
							id: 12,
							label: <i className="bx bx-move-horizontal block"></i>,
							command: () => editor.chain().focus().setHorizontalRule().run(),
						},
					]
				: []),
			...(buttonNames.find((name) => name === "undo")
				? [
						{
							id: 13,
							label: <i className="bx bx-undo block"></i>,
							command: () => editor.chain().focus().undo().run(),
							canRun: editorState.canUndo,
						},
					]
				: []),
			...(buttonNames.find((name) => name === "redo")
				? [
						{
							id: 14,
							label: <i className="bx bx-redo block"></i>,
							command: () => editor.chain().focus().redo().run(),
							canRun: editorState.canRedo,
						},
					]
				: []),
		];
	}, [editorState, buttonNames.find, editor?.chain, getHeadingConfigurations]);

	return {
		buttonStates: editorState,
		buttonConfigurations: buttonConfigurations,
	};
}
