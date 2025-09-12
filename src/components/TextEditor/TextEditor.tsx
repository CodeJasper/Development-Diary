"use client";

import { Placeholder } from "@tiptap/extensions";
import { useEditor } from "@tiptap/react";
import { useCallback, useId, useRef } from "react";
import MenuBar from "@/components/TextEditor/MenuBar";
import type {
	EditorButtonName,
	ExtensionConfigurations,
} from "@/components/TextEditor/types";
import useEditorButtonsState from "@/components/TextEditor/useEditorButtonsState";

// biome-ignore lint/suspicious/noExplicitAny: <Is not necessary here>
export type EditorJson = Record<string, any>;

export type TextEditorProps = {
	handleUpdate: (editorJson: EditorJson) => void;
	buttonNames?: EditorButtonName[];
	defaultContent?: string;
	extensionConfigurations: ExtensionConfigurations;
	placeholderText?: string;
};

const TextEditor = (props: TextEditorProps) => {
	const {
		handleUpdate,
		buttonNames = [],
		extensionConfigurations,
		defaultContent = "",
		placeholderText = "Escribe aquí...",
	} = props;
	const editorRef = useRef<HTMLDivElement | null>(null);
	const editorDebounceRef = useRef(null);
	const editorId = useId();

	const handleUpdateDebounce = useCallback(
		(editorJson: EditorJson) => {
			if (editorDebounceRef.current) {
				clearTimeout(editorDebounceRef.current);
			}

			const editorDebounce = setTimeout(() => {
				handleUpdate(editorJson);
			}, 250);
			editorDebounceRef.current = editorDebounce;
		},
		[handleUpdate],
	);

	const editor = useEditor({
		immediatelyRender: false,
		element: editorRef.current,
		onUpdate: (data) => handleUpdateDebounce(data.editor.getJSON()),
		extensions: [
			...extensionConfigurations.extensions,
			Placeholder.configure({
				placeholder: placeholderText,
				includeChildren: true,
			}),
		],
		content: defaultContent,
		editorProps: {
			attributes: {
				class: "h-full p-4 focus:outline-primary",
			},
		},
	});

	const { buttonConfigurations } = useEditorButtonsState({
		buttonNames: buttonNames,
		editor: editor,
		extensionConfigurations: extensionConfigurations,
	});

	return (
		<div className="h-full flex flex-col">
			{editor && <MenuBar buttonConfigurations={buttonConfigurations} />}
			<div className="grow-1 mt-4">
				<div
					id={editorId}
					ref={editorRef}
					className="h-full rounded overflow-y-auto"
				></div>
			</div>
		</div>
	);
};

export default TextEditor;
