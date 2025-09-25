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
import FormLabel from "@/components/ui/forms/FormLabel";
import FormControl from "../ui/forms/FormControl";

// biome-ignore lint/suspicious/noExplicitAny: <Is not necessary here>
export type EditorJson = Record<string, any>;

export type TextEditorProps = {
	handleUpdate: (editorJson: EditorJson) => void;
	buttonNames?: EditorButtonName[];
	defaultContent?: string;
	extensionConfigurations: ExtensionConfigurations;
	placeholderText?: string;
	showError?: boolean;
	errorMessage?: string;
	label?: string;
	isRequired?: boolean;
};

const TextEditor = (props: TextEditorProps) => {
	const {
		handleUpdate,
		buttonNames = [],
		extensionConfigurations,
		defaultContent = "",
		placeholderText = "Escribe aquí...",
		errorMessage = "Este campo es requerido",
		showError = false,
		label,
		isRequired,
	} = props;
	const editorRef = useRef<HTMLDivElement | null>(null);
	const editorDebounceRef = useRef(null);
	const editorId = useId();

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

	const handleUpdateDebounce = useCallback(
		(editorJson: EditorJson) => {
			if (editorDebounceRef.current) {
				clearTimeout(editorDebounceRef.current);
			}

			const editorDebounce = setTimeout(() => {
				handleUpdate(editor?.isEmpty ? null : editorJson);
			}, 250);
			editorDebounceRef.current = editorDebounce;
		},
		[handleUpdate, editor],
	);

	const { buttonConfigurations } = useEditorButtonsState({
		buttonNames: buttonNames,
		editor: editor,
		extensionConfigurations: extensionConfigurations,
	});

	return (
		<div className="grow-1 flex flex-col min-h-96">
			<div className="grow-1">
				<FormControl className="h-full flex flex-col">
					{label && (
						<FormLabel id={editorId} isRequired={isRequired} label={label} />
					)}
					<div className="flex flex-col grow-1">
						{editor && <MenuBar buttonConfigurations={buttonConfigurations} />}
						<div className="grow-1">
							<div
								id={editorId}
								ref={editorRef}
								className="h-full overflow-y-auto"
							></div>
						</div>
					</div>
					{showError && <span className="form-error">{errorMessage}</span>}
				</FormControl>
			</div>
		</div>
	);
};

export default TextEditor;
