"use client";

import {
	type ChangeEvent,
	type FormEvent,
	useId,
	useRef,
	useState,
} from "react";
import TextEditor, {
	type EditorJson,
} from "@/components/TextEditor/TextEditor";
import type { EditorButtonName } from "@/components/TextEditor/types";
import { extensionConfigurationsPostContent } from "@/components/TextEditor/utils";
import Button from "@/components/ui/button/Button";
import { ButtonTypes } from "@/components/ui/button/types";
import Card from "@/components/ui/card/Card";
import Input from "@/components/ui/forms/input/Input";
import Textarea from "@/components/ui/forms/textarea/Textarea";
import { PostPost } from "@/lib/services/posts";

const CONTENT_BUTTON_NAMES: EditorButtonName[] = [
	"blockquote",
	"bold",
	"bulletList",
	"code",
	"codeBlock",
	"heading1",
	"heading2",
	"heading3",
	"heading4",
	"heading5",
	"heading6",
	"horizontalRule",
	"italic",
	"orderedList",
	"paragraph",
	"redo",
	"strike",
	"underline",
	"undo",
];

export default function Page() {
	const contentEditorJsonRef = useRef<EditorJson | null>(null);
	const titleInputRef = useRef<HTMLInputElement | null>(null);
	const excerptInputRef = useRef<HTMLTextAreaElement | null>(null);
	const titleId = useId();
	const excerptId = useId();
	const [showTitleError, setShowTitleError] = useState(false);
	const [showExcerptError, setShowExcerptError] = useState(false);
	const [showContentError, setShowContentError] = useState(false);

	const handleSavePost = async (title: string, excerpt: string) => {
		const response = await PostPost({
			title: title,
			excerpt: excerpt,
			content: contentEditorJsonRef.current,
		});
		console.log(response);
	};

	const handleUpdateContentEditorJson = (editorJson: EditorJson) => {
		contentEditorJsonRef.current = editorJson;
		setShowContentError(!editorJson);
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const form = e.currentTarget;
		const formData = new FormData(form);
		const title = formData.get("title") as string;
		const excerpt = formData.get("excerpt") as string;
		setShowTitleError(Boolean(!title));
		setShowExcerptError(Boolean(!excerpt));
		setShowContentError(Boolean(!contentEditorJsonRef.current));

		if (Boolean(title) && Boolean(contentEditorJsonRef.current)) {
			handleSavePost(title, excerpt);
		}
	};

	const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
		if (showTitleError && e.target.value) {
			setShowTitleError(false);
		} else if (!e.target.value) {
			setShowTitleError(true);
		}
	};

	const handleChangeExcerpt = (e: ChangeEvent<HTMLTextAreaElement>) => {
		if (showExcerptError && e.target.value) {
			setShowExcerptError(false);
		} else if (!e.target.value) {
			setShowExcerptError(true);
		}
	};

	return (
		<Card className="grow-1">
			<Card.Body className="h-full">
				<form
					className="h-full flex flex-col gap-6"
					onSubmit={handleSubmit}
					noValidate
				>
					<h1 className="h4 mb-0">Crear nuevo artículo</h1>
					<Input
						id={titleId}
						label="Titulo del artículo"
						placeholder="Escribe un titulo atractivo para tu artículo..."
						ref={titleInputRef}
						type="text"
						required
						name="title"
						showError={showTitleError}
						onChange={handleChangeTitle}
					/>
					<Textarea
						id={excerptId}
						label="Resumen del artículo"
						labelHelpText="(Aparecerá en la lista de artículos)"
						placeholder="Escribe un resumen breve que describa de qué trata tu artículo..."
						ref={excerptInputRef}
						maxLength={255}
						name="excerpt"
						showError={showExcerptError}
						onChange={handleChangeExcerpt}
					/>
					<hr className="border-border" />
					<TextEditor
						placeholderText="Escribe el contenido del post aquí..."
						extensionConfigurations={extensionConfigurationsPostContent}
						buttonNames={CONTENT_BUTTON_NAMES}
						handleUpdate={handleUpdateContentEditorJson}
						showError={showContentError}
						label="Contenido"
						isRequired
					/>
					<div className="flex justify-end">
						<Button type={ButtonTypes.submit}>Crear Post</Button>
					</div>
				</form>
			</Card.Body>
		</Card>
	);
}
