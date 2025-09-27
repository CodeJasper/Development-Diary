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
import InputFile from "@/components/ui/forms/file/InputFile";
import Input from "@/components/ui/forms/input/Input";
import Textarea from "@/components/ui/forms/textarea/Textarea";
import { PostPost } from "@/lib/services/posts";
import { postImage } from "@/lib/services/postsImages";

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
	const coverImageFileId = useId();
	const coverImageUrlId = useId();
	const [showTitleError, setShowTitleError] = useState(false);
	const [showExcerptError, setShowExcerptError] = useState(false);
	const [showContentError, setShowContentError] = useState(false);
	const [showCoverImageUrlError, setShowCoverImageUrlError] = useState(false);
	const [imageCoverFile, setImageCoverFile] = useState<File | null>(null);
	const [imageCoverUrl, setImageCoverUrl] = useState("");

	const handleSavePost = async (title: string, excerpt: string) => {
		await PostPost({
			title: title,
			excerpt: excerpt,
			content: contentEditorJsonRef.current,
		});
	};

	const handleSaveImage = async (file: File) => {
		await postImage(file);
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

	const handleChangeCoverImageUrl = (e: ChangeEvent<HTMLInputElement>) => {
		try {
			setImageCoverFile(null);
			const url = e.target.value;
			new URL(url);
			setShowCoverImageUrlError(false);
			setImageCoverUrl(url);
		} catch {
			setShowCoverImageUrlError(true);
			setImageCoverUrl("");
		}
	};

	const handleChangeCoverImageFile = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		setImageCoverUrl("");
		setImageCoverFile(file);
		setShowCoverImageUrlError(false);
		titleInputRef.current.value = "";
		handleSaveImage(file);
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
					<div className="flex flex-col gap-2">
						<InputFile
							id={coverImageFileId}
							label="Imagen de portada"
							labelHelpText="(Mejora la apariencia del artículo)"
							name="cover_image_file"
							formFieldClassName="hidden"
							showButton
							accept="image/*"
							maxSizeMB={1}
							onChange={handleChangeCoverImageFile}
						/>
						<Input
							id={coverImageUrlId}
							placeholder="https://ejemplo.com/imagen.jpg"
							ref={titleInputRef}
							type="url"
							name="cover_image_url"
							onChange={handleChangeCoverImageUrl}
							showError={showCoverImageUrlError}
							errorMessage="Esta url no es valida"
						/>
						{(imageCoverFile || imageCoverUrl) && (
							<div className="relative h-[200px]">
								{/** biome-ignore lint/performance/noImgElement: Hosts are not controlled here */}
								<img
									className="object-cover rounded-lg w-full h-full"
									alt="Imagen de portada"
									src={
										imageCoverFile
											? URL.createObjectURL(imageCoverFile)
											: imageCoverUrl
									}
								/>
							</div>
						)}
					</div>
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
